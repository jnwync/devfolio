import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { getContributionCalendar, type ContributionDay, type ContributionWeek } from '@/lib/github';

const MOBILE_WEEK_COUNT = 26;

function formatDayLabel(day: ContributionDay): string {
  const date = new Date(`${day.date}T00:00:00Z`);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date);

  return `${day.count.toLocaleString()} contribution${day.count === 1 ? '' : 's'} on ${formattedDate}`;
}

function formatMonth(firstDay: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(
    new Date(`${firstDay}T00:00:00Z`)
  );
}

function dayOfWeek(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay() + 1;
}

function ContributionGrid({ weeks, total }: { weeks: ContributionWeek[]; total: number }) {
  return (
    <div className="github-calendar-wrap">
      <p className="sr-only">
        {total.toLocaleString()} GitHub contributions in the last year. The visual calendar
        shows contribution intensity by day.
      </p>
      <div
        className="github-calendar-grid"
        style={{ '--week-count': weeks.length } as React.CSSProperties}
        aria-hidden="true"
      >
        {weeks.map((week, index) => {
          const isOlderThanMobileWindow = index < weeks.length - MOBILE_WEEK_COUNT;
          const startsMonth = new Date(`${week.firstDay}T00:00:00Z`).getUTCDate() <= 7;

          return (
            <div
              key={week.firstDay}
              className={`github-calendar-week${isOlderThanMobileWindow ? ' github-calendar-week--older' : ''}`}
            >
              <span className="github-calendar-month">{startsMonth ? formatMonth(week.firstDay) : ''}</span>
              <div className="github-calendar-days">
                {week.days.map((day) => (
                  <span
                    key={day.date}
                    className={`github-calendar-cell github-calendar-cell--${day.level}`}
                    style={{ gridRow: dayOfWeek(day.date) }}
                    title={formatDayLabel(day)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="sm:hidden">Recent 6 months shown</span>
        <span className="hidden sm:inline">Rolling 12 months</span>
        <span className="inline-flex items-center gap-2" aria-hidden="true">
          Less
          <span className="github-calendar-cell github-calendar-cell--0" />
          <span className="github-calendar-cell github-calendar-cell--1" />
          <span className="github-calendar-cell github-calendar-cell--2" />
          <span className="github-calendar-cell github-calendar-cell--3" />
          <span className="github-calendar-cell github-calendar-cell--4" />
          More
        </span>
      </div>
    </div>
  );
}

export default async function GithubActivity() {
  const { personal } = portfolioData;
  const calendar = await getContributionCalendar(personal.githubUsername);
  const githubUrl = `https://github.com/${personal.githubUsername}`;

  return (
    <section
      aria-labelledby="github-activity-heading"
      className="editorial-rule relative overflow-hidden py-20 md:py-28"
    >
      <div className="section-shell relative z-10">
        <header className="rv mb-12 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="section-kicker">GitHub activity</p>
            <h2 id="github-activity-heading" className="section-heading">
              Public activity, in context.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
            GitHub activity is supporting evidence alongside the shipped work and experience above.
          </p>
        </header>

        {calendar ? (
          <div className="border-y border-border py-6 sm:py-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <p className="text-base leading-7 text-muted-foreground">
                <span className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  {calendar.total.toLocaleString()}
                </span>{' '}
                contributions in the last year.
              </p>
                <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary"
              >
                View GitHub profile
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ContributionGrid weeks={calendar.weeks} total={calendar.total} />
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-5 border-y border-border py-6 sm:py-8">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              The live activity calendar is unavailable right now. You can still browse the
              source of the work and current public activity on GitHub.
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary"
            >
              View GitHub profile
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
