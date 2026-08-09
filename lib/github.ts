const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionWeek {
  firstDay: string;
  days: ContributionDay[];
}

export interface ContributionCalendar {
  total: number;
  weeks: ContributionWeek[];
}

interface GithubContributionDay {
  date: unknown;
  contributionCount: unknown;
  contributionLevel: unknown;
}

interface GithubContributionWeek {
  firstDay: unknown;
  contributionDays: unknown;
}

interface GithubContributionCalendar {
  totalContributions: unknown;
  weeks: unknown;
}

interface GithubResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: GithubContributionCalendar;
      };
    } | null;
  };
  errors?: unknown[];
}

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CONTRIBUTION_QUERY = `
  query ContributionCalendar($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function isDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function normalizeDay(value: unknown): ContributionDay | null {
  if (!value || typeof value !== 'object') return null;

  const day = value as GithubContributionDay;
  if (!isDate(day.date) || !isNonNegativeInteger(day.contributionCount)) return null;
  if (typeof day.contributionLevel !== 'string' || !(day.contributionLevel in LEVELS)) return null;

  return {
    date: day.date,
    count: day.contributionCount,
    level: LEVELS[day.contributionLevel],
  };
}

function normalizeWeek(value: unknown): ContributionWeek | null {
  if (!value || typeof value !== 'object') return null;

  const week = value as GithubContributionWeek;
  if (!isDate(week.firstDay) || !Array.isArray(week.contributionDays)) return null;

  const days = week.contributionDays.map(normalizeDay);
  if (days.some((day): day is null => day === null)) return null;

  return {
    firstDay: week.firstDay,
    days: (days as ContributionDay[]).sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export function normalizeContributionCalendar(value: unknown): ContributionCalendar | null {
  if (!value || typeof value !== 'object') return null;

  const calendar = value as GithubContributionCalendar;
  if (!isNonNegativeInteger(calendar.totalContributions) || !Array.isArray(calendar.weeks)) {
    return null;
  }

  const weeks = calendar.weeks.map(normalizeWeek);
  if (weeks.some((week): week is null => week === null)) return null;

  return {
    total: calendar.totalContributions,
    weeks: (weeks as ContributionWeek[]).sort((a, b) => a.firstDay.localeCompare(b.firstDay)),
  };
}

export function getRecentWeeks(calendar: ContributionCalendar, count = 26): ContributionWeek[] {
  return calendar.weeks.slice(Math.max(calendar.weeks.length - count, 0));
}

export async function getContributionCalendar(username: string): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || !username) return null;

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username },
      }),
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as GithubResponse;
    if (payload.errors?.length || !payload.data?.user?.contributionsCollection?.contributionCalendar) {
      return null;
    }

    return normalizeContributionCalendar(
      payload.data.user.contributionsCollection.contributionCalendar
    );
  } catch {
    return null;
  }
}
