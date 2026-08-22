'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ComponentProps } from 'react';

/**
 * Same-document View Transition for client-side navigations: the click
 * freezes the old view, pushes the route, and releases the capture one
 * frame after the new route paints — so elements sharing a
 * `view-transition-name` (project title → case-study title) morph across
 * pages. Browsers without the API, modified clicks, and reduced-motion
 * users all get a plain navigation.
 */

let resolveNavigation: (() => void) | null = null;

/** Mounted once in the root layout; releases the pending capture when the
 *  route actually changes. */
export function ViewTransitionSettler() {
  const pathname = usePathname();

  useEffect(() => {
    // Resolve synchronously: by effect time React has committed the new
    // route's DOM, and rendering is frozen during capture, so any deferred
    // release (rAF) would never fire and the transition would abort.
    if (resolveNavigation) {
      const release = resolveNavigation;
      resolveNavigation = null;
      release();
    }
  }, [pathname]);

  return null;
}

export default function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          typeof document.startViewTransition !== 'function' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        event.preventDefault();
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              resolveNavigation = resolve;
              router.push(typeof href === 'string' ? href : String(href));
              // Never leave the page frozen if the route fails to change.
              window.setTimeout(() => {
                if (resolveNavigation === resolve) {
                  resolveNavigation = null;
                  resolve();
                }
              }, 1000);
            })
        );
      }}
    >
      {children}
    </Link>
  );
}
