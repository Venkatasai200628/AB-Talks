# ABTalks — 60-day challenge

A redesign of the ABTalks student experience: a free 60-day coding challenge where
students build something small each day and post the proof to GitHub and LinkedIn.

Designed mobile-first at 390px, for a student on a phone late at night after college.

## Route map

```text
/
/dashboard
/day/12
```

## Live deployment

_Not yet deployed._

## Running it

```bash
npm install && npm run dev
```

Then open http://localhost:3000.

## The three screens

**`/` — Landing.** For someone who has never heard of ABTalks. It answers what it is,
what it costs, and what they get, in that order: the promise, proof that finishing means
something (days done, post reach, interviews), the three steps of a day, one CTA.

**`/dashboard` — Home.** Current streak, today's task, progress through the challenge,
overall completion, and standing plus badges. The 60-day grid is the centrepiece: one
cell per day, shaded by how much that day shipped.

**`/day/12` — A challenge day.** Three tabs behind a fixed header. **Task** is the brief,
what to build, and the docs to read first. **Build** is the working session, an upload,
and the four acceptance checks. **Submit** is the two links that close the day.

## Edge cases

The brief calls for a first day with no streak, a missed day, and an empty profile.
Each is a seeded account state, openable directly. Nothing extra renders on the plain
routes — the same components just draw whatever the data says.

| State | URL |
|---|---|
| Typical — day 12, streak intact | `/dashboard` |
| First day, no streak | `/dashboard?state=new` |
| Broken streak, days 9 and 10 missed | `/dashboard?state=missed` |
| Empty profile, nothing set up | `/dashboard?state=empty` |

What changes on its own, because it is derived rather than hard-coded:

- **Standing** falls back to *not ranked yet* with a line saying how to get ranked.
- **Badges** are earned from the data — the streak badge unlocks at 7, the no-freeze
  badge is lost once a freeze is spent.
- **Rank movement** turns amber and flips to ▼ when a student falls.
- **The spine** marks a missed day *missed — nothing sent* instead of a commit time.
- **The profile** degrades to a placeholder name and *NO TRACK PICKED* with no cohort.

Day-level states are reachable too: a finished day (`/day/5`) opens read-only, a day
not yet reached (`/day/40`) is locked, and `/day/99` is refused.

## The thoughtful bits

**The grid is shaded by output, not attendance.** Most streak products draw a binary
tick — you showed up or you didn't. Shading by how much a day actually produced means a
heavy Saturday reads differently from a scraped-through Tuesday, and nine weeks of it is
a picture of effort a student can put in front of a recruiter.

**Every day names its trap.** Day 12 doesn't just say "build a debounced search input";
it says the requests won't come back in the order you sent them. The failure a student
would otherwise hit at 1am is stated up front, which is the difference between a task
that teaches and a task that just takes the evening.

**Docs before the editor.** Each day carries two or three short reads with a sentence on
why each one matters, so a student starts from the right primitives instead of the first
search result.

**The acceptance checks are the spec.** The four things that must be true appear as the
brief on the Task tab and as a checklist on the Build tab — the same sentences, so
"done" is never a judgement call.

## How it is built

Next.js App Router, React 19, no CSS.

Styling lives in React style objects on the components. `src/styles/tokens.js` holds the
design system as plain JavaScript — colours, the type ramp, and `sansText(700, 31, 1.14)`
helpers that read like a design spec. Fonts load through `next/font`. Since inline styles
have no pseudo-classes, hover and focus are React state (`useHover`, `Button`, `HoverLink`).

```
src/
  app/            routes: /, /dashboard, /day/[id]
  components/     DayGrid, ProgressRing, StreakPill, day panes, ui primitives
  lib/
    curriculum.js   all 60 days: title, brief, four requirements
    profiles.js     the seeded account states
    mockData.js     the challenge itself and the landing copy
    challengeState.js  the store — reads like an API, backed by localStorage
  styles/tokens.js
```

There is no server, database, or auth — out of scope. `challengeState.js` stands in for
the backend: pages call `submitDay`, `isSubmitted` and `dayStatus` rather than touching
storage, so pointing them at a real API later is a change in one file. Submissions
persist to `localStorage`, so a day you close out survives a refresh.
