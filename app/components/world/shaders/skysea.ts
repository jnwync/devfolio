/**
 * One full-screen program: sky above the horizon, water below it.
 *
 * Everything is stylised and cheap: a three-stop sky, a hashed star field
 * that fades with daylight, a little value-noise haze by day, an orb with a
 * soft glow, and a perspective water plane whose slopes come from three
 * octaves of value noise. Light on the water is a glitter lane under the
 * orb, a pointer highlight, decaying ripple rings and, in the closing
 * scene, the green beacon reflected straight down. Colours arrive in linear
 * RGB from the CSS tokens and are gamma-encoded at the end.
 */

export const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragment = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uDay;
uniform float uHour;
uniform float uHorizon;
uniform vec3 uOrb;        // x, y (from top), radius as a fraction of height
uniform float uOrbOn;
uniform vec3 uPointer;    // x, y (from top), activity
uniform vec4 uRipples[8]; // x, y (from top), age, strength
uniform vec4 uDim;        // left, top (from top), width, height
uniform float uDimAmount;
uniform vec3 uBeacon;     // x, y (from top), on
uniform vec4 uLights[14]; // x, y (from top), strength, hover
uniform float uLightCount;
uniform vec3 uSkyTop;
uniform vec3 uSkyHorizon;
uniform vec3 uSeaFar;
uniform vec3 uSeaNear;
uniform vec3 uOrbColor;
uniform vec3 uGlow;
uniform vec3 uBeaconColor;

varying vec2 vUv;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);          // aspect-corrected, y up
  float horizon = 1.0 - uHorizon;              // in uv space (y up)
  vec2 orb = vec2(uOrb.x * aspect, 1.0 - uOrb.y);
  float orbR = max(uOrb.z, 0.004);

  // ---------- sky ----------
  float skyT = clamp((uv.y - horizon) / max(1.0 - horizon, 0.001), 0.0, 1.0);
  vec3 sky = mix(uSkyHorizon, uSkyTop, pow(skyT, 0.65));

  // first light / last light: the horizon warms as the day ends
  float ending = smoothstep(0.78, 1.0, uHour);
  sky = mix(sky, uGlow * 0.55 + uSkyHorizon * 0.45, ending * (1.0 - skyT) * 0.55);

  // stars: a sparse hashed field with slow twinkle, night only
  vec2 sp = p * 140.0;
  vec2 cell = floor(sp);
  vec2 f = fract(sp);
  float h = hash21(cell);
  float star = 0.0;
  if (h > 0.982) {
    vec2 c = vec2(hash21(cell + 7.3), hash21(cell + 2.9)) * 0.8 + 0.1;
    float d = length(f - c);
    float tw = 0.7 + 0.3 * sin(uTime * (0.6 + h * 3.0) + h * 60.0);
    star = smoothstep(0.09, 0.0, d) * tw * smoothstep(0.982, 1.0, h);
  }
  // (stars are added after the night luminance cap below)

  // daytime haze near the horizon
  float haze = fbm(vec2(p.x * 1.6, uv.y * 3.0) + vec2(uTime * 0.012, 0.0));
  sky += uSkyHorizon * haze * (1.0 - skyT) * uDay * 0.18;

  // the orb and its glow: tight, so text passing over it keeps its contrast
  float od = length(p - orb);
  float glow = exp(-(od * od) / (orbR * orbR * 16.0)) * 0.34 + exp(-od / (orbR * 4.5)) * 0.1;
  // The stack's lights are scaled down at night so they stay under the
  // luminance cap as soft gradients instead of flattening into plateaus.
  float lightScale = mix(0.14, 1.0, uDay);
  float halos = 0.0;
  for (int i = 0; i < 14; i++) {
    if (float(i) >= uLightCount) break;
    vec4 l = uLights[i];
    if (l.z <= 0.0) continue;
    vec2 lp = vec2(l.x * aspect, 1.0 - l.y);
    float ld = length(p - lp);
    halos += (exp(-ld * ld * 2600.0) * (0.35 + 0.45 * l.w) + exp(-ld * ld * 9000.0) * 0.5) * l.z * lightScale;
  }
  vec3 skyLit = sky + uGlow * (glow * uOrbOn + halos);
  float disc = 1.0 - smoothstep(orbR * 0.88, orbR, od);
  skyLit = mix(skyLit, uOrbColor, disc * uOrbOn);

  // ---------- sea ----------
  float depth = clamp((horizon - uv.y) / max(horizon, 0.001), 0.0, 1.0);   // 0 at the horizon, 1 at the bottom
  float persp = 1.0 / (depth * 5.0 + 0.09);
  vec2 wp = vec2((uv.x - 0.5) * aspect * persp * 4.0, persp * 2.2 + uTime * 0.09);
  float e = 0.06;
  float h0 = fbm(wp * 1.9);
  float hx = fbm(wp * 1.9 + vec2(e, 0.0));
  float hy = fbm(wp * 1.9 + vec2(0.0, e));
  vec2 slope = vec2(hx - h0, hy - h0) * 14.0;

  vec3 sea = mix(uSeaFar, uSeaNear, smoothstep(0.0, 1.0, pow(depth, 0.8)));
  sea = mix(uSkyHorizon, sea, smoothstep(0.0, 0.07, depth));   // atmosphere at the horizon

  // a faint sheen everywhere: sky light on the facing slopes, so the
  // water reads as water and not as a gradient
  float facing = clamp(1.0 - abs(slope.y * 0.9 + slope.x * (uv.x - uOrb.x) * 2.0), 0.0, 1.0);
  float sparkle = pow(facing, 7.0);
  sea += uSkyHorizon * sparkle * (0.05 + 0.07 * (1.0 - depth));

  // glitter lane under the orb
  float laneW = 0.003 + 0.08 * depth;
  float lane = exp(-pow((uv.x - uOrb.x) * aspect, 2.0) / laneW);
  float orbAbove = smoothstep(-0.02, 0.06, uHorizon - uOrb.y);
  sea += uGlow * lane * sparkle * uOrbOn * orbAbove * (0.7 - 0.4 * depth) * (0.4 + 0.6 * (1.0 - uDay));

  // pointer light on the water
  vec2 pp = vec2(uPointer.x * aspect, 1.0 - uPointer.y);
  float pd = length(p - pp);
  sea += uGlow * exp(-pd * pd * 70.0) * uPointer.z * (0.25 + 0.5 * sparkle) * 0.6;

  // ripples
  for (int i = 0; i < 8; i++) {
    vec4 r = uRipples[i];
    if (r.w <= 0.0) continue;
    vec2 rp = vec2(r.x * aspect, 1.0 - r.y);
    float rd = length(p - rp);
    float age = r.z;
    float ring = sin((rd - age * 0.22) * 90.0) * exp(-age * 1.4) * exp(-rd * rd * 40.0) * smoothstep(0.0, 0.05, age) * r.w;
    sea += uGlow * ring * 0.07;
  }

  // the stack's points of light: a diffused glow while a light is still
  // under the water line, a lane beneath it once it has surfaced
  for (int i = 0; i < 14; i++) {
    if (float(i) >= uLightCount) break;
    vec4 l = uLights[i];
    if (l.z <= 0.0) continue;
    vec2 lp = vec2(l.x * aspect, 1.0 - l.y);
    float under = smoothstep(-0.015, 0.015, l.y - uHorizon);   // 1 below the horizon
    float ld = length(p - lp);
    float blob = exp(-ld * ld * 900.0) * (0.35 + 0.25 * sin(uTime * 1.7 + float(i))) * under;
    float laneL = exp(-pow((uv.x - l.x) * aspect, 2.0) / (0.0006 + 0.01 * depth));
    float below = smoothstep(0.0, 0.05, horizon - uv.y) * (1.0 - smoothstep(0.0, 0.45, horizon - uv.y));
    sea += uGlow * (blob + laneL * below * (0.25 + 0.55 * sparkle) * (1.0 - under)) * l.z * (0.6 + 0.4 * l.w) * lightScale;
  }

  // the beacon reflected straight down
  float beaconLane = exp(-pow((uv.x - uBeacon.x) * aspect, 2.0) / (0.0012 + 0.02 * depth));
  sea += uBeaconColor * beaconLane * (0.35 + 0.65 * sparkle) * uBeacon.z * (0.7 - 0.4 * depth);

  // At night nothing but the moon and the stars may get brighter than a
  // fixed luminance, so muted text stays AA wherever it sits on the world.
  float capY = mix(0.034, 10.0, uDay);
  float seaY = dot(sea, vec3(0.2126, 0.7152, 0.0722));
  sea *= min(1.0, capY / max(seaY, 0.0001));
  vec3 skyCapped = sky + uGlow * (glow * uOrbOn + halos);
  float skyY = dot(skyCapped, vec3(0.2126, 0.7152, 0.0722));
  skyCapped *= min(1.0, capY / max(skyY, 0.0001));
  skyCapped += vec3(0.95, 0.96, 0.9) * star * (1.0 - uDay) * (0.15 + 0.85 * skyT);
  skyLit = mix(skyCapped, uOrbColor, disc * uOrbOn);

  vec3 col = uv.y >= horizon ? skyLit : sea;

  // An opaque plate sitting on the water casts a shadow onto it: a soft
  // band above the plate's edge, darkest where the two meet. uDim is
  // (left, top, width, height) in viewport units, y measured from the top.
  float shadeX = smoothstep(uDim.x - 0.02, uDim.x + 0.02, uv.x) * (1.0 - smoothstep(uDim.x + uDim.z - 0.02, uDim.x + uDim.z + 0.02, uv.x));
  float shadeEdge = 1.0 - uDim.y - uDim.w;
  float shade = 1.0 - smoothstep(shadeEdge, shadeEdge + max(uDim.w, 0.001), uv.y);
  col *= 1.0 - shadeX * shade * shade * uDimAmount;

  // dither, then gamma
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.004;
  col = pow(max(col, 0.0), vec3(1.0 / 2.2));
  gl_FragColor = vec4(col, 1.0);
}
`;
