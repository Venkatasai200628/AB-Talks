/**
 * The 60-day Web Dev track.
 *
 * One entry per day, in order. Each renders through the same components as
 * day 12 — this file is content, not layout.
 *
 * `requirements` accepts either a plain string (used verbatim in both the
 * Task brief and the Build checklist) or a `{ brief, check }` pair when the
 * checklist wants the shorter phrasing.
 */

export const track = 'Web Dev';

const days = [
  // ── Week 1 · A real page, shipped ──────────────────────────────────
  {
    title: 'Ship a semantic HTML page',
    blurb: 'One page, correct elements, no divs where a real tag belongs.',
    estimateMinutes: 40,
    requirements: [
      'A page that validates with no errors',
      'Headings that descend in order, h1 through h3',
      'header, nav, main and footer used for what they name',
      'Every image has alt text that says something useful',
    ],
  },
  {
    title: 'Style it with a reset and custom properties',
    blurb: 'Colours and spacing defined once, used everywhere.',
    estimateMinutes: 45,
    requirements: [
      'A reset that zeroes margins and sets box-sizing',
      'Colours declared as custom properties on :root',
      'A spacing scale — no arbitrary pixel values in components',
      'Changing one variable restyles the whole page',
    ],
  },
  {
    title: 'Build a responsive layout with Flexbox',
    blurb: 'A header and a two-column body that survive a narrow window.',
    estimateMinutes: 45,
    requirements: [
      'A header row that spaces its items apart',
      'Two columns that stack under 700px',
      'No fixed heights anywhere in the layout',
      'gap used for spacing instead of margins on children',
    ],
  },
  {
    title: 'Build a card grid with CSS Grid',
    blurb: 'Cards that reflow by themselves, without a media query per size.',
    estimateMinutes: 45,
    requirements: [
      'A grid built with repeat(auto-fill, minmax(...))',
      'Cards of equal height regardless of content length',
      'The grid reflows with no breakpoint written for it',
      'A visible focus ring on every interactive card',
    ],
  },
  {
    title: 'Make it work on a phone',
    blurb: 'Mobile-first: write the small layout, then add the wide one.',
    estimateMinutes: 40,
    requirements: [
      'Base styles target the narrow screen',
      'min-width media queries add the wider layout',
      'Nothing overflows horizontally at 320px',
      'Tap targets are at least 44px on their short side',
    ],
  },
  {
    title: 'Accessible forms: labels, errors, focus',
    blurb: 'A form a keyboard and a screen reader can both get through.',
    estimateMinutes: 50,
    requirements: [
      'Every input has a real label element bound to it',
      'Errors are announced, not only coloured red',
      'Tab order follows the visual order',
      'The invalid field receives focus on a failed submit',
    ],
  },
  {
    title: 'Deploy it — get a public URL',
    blurb: 'Something a recruiter can open without cloning anything.',
    estimateMinutes: 40,
    requirements: [
      'The site is live on a URL you can send',
      'The repo README links to it',
      'Pushing to main redeploys it',
      'It loads over HTTPS with no console errors',
    ],
  },

  // ── Week 2 · JavaScript against the DOM ────────────────────────────
  {
    title: 'Manipulate the DOM without a framework',
    blurb: 'Add, remove and update elements with the platform API.',
    estimateMinutes: 45,
    requirements: [
      'Elements created with createElement, not innerHTML strings',
      'A list you can add to and remove from',
      'The DOM is read once and cached, not queried in a loop',
      'No library of any kind on the page',
    ],
  },
  {
    title: 'Handle events, and delegate them',
    blurb: 'One listener on a parent instead of two hundred on children.',
    estimateMinutes: 45,
    requirements: [
      'A single listener handles clicks for every row',
      'event.target is narrowed with closest()',
      'Rows added later work with no new listener',
      'The listener is removed when the view goes away',
    ],
  },
  {
    title: 'Fetch and render a results list',
    blurb: 'Loading, empty and error states all have to be real screens.',
    estimateMinutes: 50,
    requirements: [
      'A loading state that appears before the data does',
      'An empty state for a search with no matches',
      'An error state for a request that fails',
      'A non-200 response is treated as an error, not as data',
    ],
  },
  {
    title: 'Persist search state in the URL',
    blurb: 'Reload the page and land on the same query, filters and page.',
    estimateMinutes: 45,
    requirements: [
      'The query lives in the query string',
      'Reloading restores the exact same view',
      'Back and forward move through previous searches',
      'The URL is shareable — someone else sees what you see',
    ],
  },

  // Day 12 — the day the design specifies. Kept verbatim.
  {
    title: 'Build a debounced search input',
    blurb: 'Filter a list of 500 records without firing a request on every keystroke.',
    brief:
      'Filter a list of 500 records without firing a request on every keystroke. Wait until typing stops, then search once.',
    recap:
      '300ms after typing stops. Cancel in-flight requests. Never let a stale response overwrite a fresh one. Empty box clears without a request.',
    estimateMinutes: 45,
    requirements: [
      {
        brief: 'A 300ms delay after the last keystroke',
        check: '300ms delay after typing stops',
      },
      {
        brief: 'One request per search, not one per letter',
        check: 'One request per search',
      },
      {
        brief: 'An old response can never overwrite a newer one',
        check: 'Old responses never overwrite new',
      },
      {
        brief: 'Clearing the box clears results with no request',
        check: 'Empty box clears without a request',
      },
    ],
    docs: [
      {
        title: 'The delay itself',
        source: 'MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout',
        body: 'setTimeout starts the 300ms clock; clearTimeout resets it every time a new key is pressed. That pair is the whole debounce.',
      },
      {
        title: 'Cancelling a request',
        source: 'MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
        body: "Pass an AbortController's signal into fetch, then call abort() before firing the next search. Catch the AbortError — it's expected, not a bug.",
      },
      {
        title: 'Debounce vs. throttle',
        source: 'LODASH',
        url: 'https://lodash.com/docs#debounce',
        body: "Debounce waits for a pause — right for search. Throttle fires at a fixed rate — right for scroll. Know which one you're building.",
      },
    ],
    readMinutes: 8,
    trap: 'requests don’t come back in the order you sent them. A slow "ab" can land after a fast "abcd" and overwrite it. That’s the race condition today’s task is really about.',
  },

  {
    title: 'Loading, empty and error, done properly',
    blurb: 'Four states per screen, and none of them is a blank rectangle.',
    estimateMinutes: 45,
    requirements: [
      'A skeleton that matches the shape of the loaded content',
      'An empty state that suggests the next action',
      'An error state with a retry that actually retries',
      'No layout shift when the real content arrives',
    ],
  },
  {
    title: 'Store and restore state with localStorage',
    blurb: 'Close the tab, come back, pick up where you left off.',
    estimateMinutes: 40,
    requirements: [
      'State is written on change and read on load',
      'A corrupt or missing value falls back to a default',
      'Quota and private-mode failures are caught',
      'Stored data carries a version key',
    ],
  },

  // ── Week 3 · The language, properly ────────────────────────────────
  {
    title: 'Array methods instead of loops',
    blurb: 'map, filter and reduce until they stop feeling clever.',
    estimateMinutes: 40,
    requirements: [
      'Every for loop replaced where a method reads better',
      'One reduce that groups a list by a key',
      'No mutation of the source array',
      'Chains stay under three links or get a name',
    ],
  },
  {
    title: 'Destructuring, spread and defaults',
    blurb: 'Pull apart objects and merge them without a helper library.',
    estimateMinutes: 35,
    requirements: [
      'Function parameters destructured with defaults',
      'Objects merged with spread, not Object.assign chains',
      'Nested access guarded with optional chaining',
      'Nothing mutated in place',
    ],
  },
  {
    title: 'Promises, async/await and failure',
    blurb: 'The happy path is a third of the work.',
    estimateMinutes: 50,
    requirements: [
      'Every await sits inside a try/catch or a caught wrapper',
      'Independent requests run with Promise.all',
      'One deliberate rejection is handled and shown to the user',
      'No unhandled promise rejections in the console',
    ],
  },
  {
    title: 'Modules: split one file into many',
    blurb: 'A file you can name in one noun is a file you can find.',
    estimateMinutes: 40,
    requirements: [
      'One responsibility per module',
      'Named exports over a default grab-bag',
      'No circular imports',
      'The entry file reads like a table of contents',
    ],
  },
  {
    title: 'Dates without a library',
    blurb: 'Intl does more than you think, and ships with the browser.',
    estimateMinutes: 40,
    requirements: [
      'Dates formatted with Intl.DateTimeFormat',
      'A relative time like "3 days ago" from Intl.RelativeTimeFormat',
      'Timezone handled explicitly, not by accident',
      'No date library in package.json',
    ],
  },
  {
    title: 'Regular expressions you can read',
    blurb: 'Write one, name it, and add the test that proves it.',
    estimateMinutes: 40,
    requirements: [
      'A regex assigned to a named constant, not inlined',
      'Groups named rather than numbered',
      'Tests covering one match, one near-miss and one empty input',
      'A comment saying what it matches in English',
    ],
  },
  {
    title: 'Write your first unit tests',
    blurb: 'Three tests that would actually catch a mistake you might make.',
    estimateMinutes: 50,
    requirements: [
      'A test runner installed and wired to npm test',
      'One test for the happy path',
      'One test for the edge case that bit you',
      'The suite runs green from a clean clone',
    ],
  },

  // ── Week 4 · React foundations ─────────────────────────────────────
  {
    title: 'Your first React component',
    blurb: 'One component, rendered, with nothing else going on.',
    estimateMinutes: 40,
    requirements: [
      'A component that returns markup from props',
      'No state anywhere in it',
      'Rendered into a real page',
      'The file name matches the component name',
    ],
  },
  {
    title: 'Props, lists and keys',
    blurb: 'Render an array without the key warning.',
    estimateMinutes: 40,
    requirements: [
      'A list rendered from data, not hard-coded',
      'Keys that come from stable ids, never the index',
      'An empty array renders the empty state',
      'No warnings in the console',
    ],
  },
  {
    title: 'useState and controlled inputs',
    blurb: 'The input shows what state says, and nothing else.',
    estimateMinutes: 45,
    requirements: [
      'Every input driven by value and onChange',
      'State updated with the functional form when it depends on the previous value',
      'A reset button that clears the form',
      'No direct DOM reads for input values',
    ],
  },
  {
    title: 'Lift state up',
    blurb: 'Two components that have to agree, sharing one source of truth.',
    estimateMinutes: 45,
    requirements: [
      'State moved to the closest common parent',
      'Children receive value and a setter through props',
      'No duplicated copy of the same state',
      'Both children stay in sync with no effect involved',
    ],
  },
  {
    title: 'useEffect and cleanup',
    blurb: 'Subscribe on mount, unsubscribe on unmount, every time.',
    estimateMinutes: 50,
    requirements: [
      'Every subscription returns a cleanup function',
      'The dependency array is honest — nothing omitted',
      'No setState called straight from an effect body',
      'Remounting twice in StrictMode causes no duplicate work',
    ],
  },
  {
    title: 'Extract a custom hook',
    blurb: 'The logic two components share moves out of both of them.',
    estimateMinutes: 45,
    requirements: [
      'A hook named use-something that returns a stable API',
      'Used by at least two components',
      'It owns its own state and cleanup',
      'The components get shorter, not longer',
    ],
  },
  {
    title: 'Composition over prop drilling',
    blurb: 'Pass elements, not fifteen props through three layers.',
    estimateMinutes: 45,
    requirements: [
      'One prop chain replaced by children or a slot prop',
      'No prop that exists only to be forwarded',
      'The middle component stops knowing about the leaf',
      'The public API of each component fits on a line',
    ],
  },

  // ── Week 5 · Real application concerns ─────────────────────────────
  {
    title: 'Client-side routing',
    blurb: 'Three routes, real URLs, working back button.',
    estimateMinutes: 45,
    requirements: [
      'Three routes that each have their own URL',
      'Back and forward behave as the user expects',
      'A 404 route for anything unmatched',
      'Deep-linking straight to a route works on reload',
    ],
  },
  {
    title: 'Fetch data in a component, properly',
    blurb: 'Race conditions and unmounted setState are the whole lesson.',
    estimateMinutes: 50,
    requirements: [
      'The request is aborted when the component unmounts',
      'A stale response never overwrites a newer one',
      'Loading and error states come from the same state machine',
      'No setState after unmount warnings',
    ],
  },
  {
    title: 'A reusable data-fetching hook',
    blurb: 'One hook, used by three screens, with caching you understand.',
    estimateMinutes: 50,
    requirements: [
      'A hook returning data, error and loading',
      'Identical requests are de-duplicated',
      'A manual refetch is exposed',
      'Used by at least three call sites',
    ],
  },
  {
    title: 'Forms with real validation',
    blurb: 'Validate on submit, then on change once a field has erred.',
    estimateMinutes: 50,
    requirements: [
      'Rules declared in one place, not scattered through handlers',
      'Errors appear on submit, then live-update per field',
      'The submit button reflects whether the form can be sent',
      'The server error path is handled too',
    ],
  },
  {
    title: 'Optimistic updates',
    blurb: 'Show the result immediately, and roll back when it fails.',
    estimateMinutes: 50,
    requirements: [
      'The UI updates before the request resolves',
      'A failure rolls the change back visibly',
      'The rollback tells the user what happened',
      'Double-submitting cannot corrupt the state',
    ],
  },
  {
    title: 'Pagination and infinite scroll',
    blurb: 'Load more without losing scroll position or duplicating rows.',
    estimateMinutes: 50,
    requirements: [
      'Pages requested one at a time, never in a burst',
      'No duplicate rows across page boundaries',
      'Scroll position survives a new page loading',
      'A keyboard user can reach the next page too',
    ],
  },
  {
    title: 'Global state without a library',
    blurb: 'Context plus a reducer, and knowing when not to reach for it.',
    estimateMinutes: 50,
    requirements: [
      'One context holding genuinely global state',
      'Updates dispatched through named actions',
      'Consumers do not re-render for state they ignore',
      'Local state stayed local where it belonged',
    ],
  },

  // ── Week 6 · Next.js ───────────────────────────────────────────────
  {
    title: 'Move it to the Next.js App Router',
    blurb: 'Same app, file-system routing, no behaviour lost.',
    estimateMinutes: 55,
    requirements: [
      'Routes expressed as folders with page files',
      'A root layout wrapping every route',
      'Every previous URL still resolves',
      'The production build passes clean',
    ],
  },
  {
    title: 'Server components vs client components',
    blurb: 'Know exactly why each file does or does not say use client.',
    estimateMinutes: 50,
    requirements: [
      'use client appears only where state or effects are used',
      'Data fetching happens on the server where it can',
      'The client bundle gets measurably smaller',
      'You can explain every boundary in one sentence each',
    ],
  },
  {
    title: 'Layouts, nesting and shared UI',
    blurb: 'The chrome that should not re-render when the page changes.',
    estimateMinutes: 45,
    requirements: [
      'A nested layout for one section of the app',
      'Shared chrome preserved across navigations',
      'State in the layout survives a route change',
      'No duplicated markup between sibling pages',
    ],
  },
  {
    title: 'Dynamic routes and params',
    blurb: 'One template, sixty URLs, and a real not-found.',
    estimateMinutes: 45,
    requirements: [
      'A dynamic segment rendering many records',
      'An unknown id renders the not-found page',
      'Params are read the way this version of Next expects',
      'Static generation used where the set is known',
    ],
  },
  {
    title: 'Route handlers: your first API',
    blurb: 'An endpoint of your own, with status codes that mean something.',
    estimateMinutes: 50,
    requirements: [
      'A GET returning JSON with the right content type',
      'A POST that validates its body before trusting it',
      'Errors return 4xx or 5xx, never 200 with a message',
      'The endpoint is called from the UI',
    ],
  },
  {
    title: 'Mutations from the server',
    blurb: 'Write data without hand-rolling a fetch for every button.',
    estimateMinutes: 50,
    requirements: [
      'A mutation that runs on the server',
      'The affected view refreshes with no full reload',
      'Pending state disables the control that started it',
      'Failures surface to the user rather than the console',
    ],
  },
  {
    title: 'Loading and error boundaries',
    blurb: 'A thrown error should cost one section, not the whole page.',
    estimateMinutes: 45,
    requirements: [
      'A loading UI shown while a route segment resolves',
      'An error boundary scoped to a segment',
      'A reset action that retries the failed segment',
      'The rest of the page stays interactive',
    ],
  },

  // ── Week 7 · Data and auth ─────────────────────────────────────────
  {
    title: 'Model your data',
    blurb: 'Tables and relations on paper before a line of code.',
    estimateMinutes: 45,
    requirements: [
      'Every entity written down with its fields and types',
      'Relations named in both directions',
      'Required versus optional decided per field',
      'One query you know will be slow, identified in advance',
    ],
  },
  {
    title: 'Connect a real database',
    blurb: 'Local, migrated, seeded, and reproducible from scratch.',
    estimateMinutes: 55,
    requirements: [
      'A schema created by a checked-in migration',
      'A seed script that fills it with usable data',
      'Credentials in environment variables, never in git',
      'A fresh clone can reach a working database',
    ],
  },
  {
    title: 'Read and write from the server',
    blurb: 'Replace the mock layer with the real one, screen by screen.',
    estimateMinutes: 55,
    requirements: [
      'One screen reading live rows',
      'One form writing a real row',
      'No secret or connection string reaches the client',
      'The mock layer is deleted, not commented out',
    ],
  },
  {
    title: 'Authentication: sessions and cookies',
    blurb: 'Sign in, stay signed in, sign out everywhere.',
    estimateMinutes: 60,
    requirements: [
      'Sign-in issues an httpOnly, secure cookie',
      'The session survives a reload and expires on time',
      'Sign-out invalidates the session server-side',
      'Passwords are hashed, never stored or logged',
    ],
  },
  {
    title: 'Protect routes and data',
    blurb: 'The check that matters is the one on the server.',
    estimateMinutes: 50,
    requirements: [
      'Every protected route checks the session server-side',
      'A signed-out user is redirected, not shown a flash of content',
      'One user cannot read another user’s rows',
      'You proved the last point by trying it',
    ],
  },
  {
    title: 'File uploads',
    blurb: 'Accept a file without accepting a problem.',
    estimateMinutes: 50,
    requirements: [
      'Type and size validated on the server',
      'Files stored outside the repo',
      'Progress shown for a slow upload',
      'A failed upload leaves nothing half-written',
    ],
  },
  {
    title: 'Rate limiting and input validation',
    blurb: 'Assume every request is hostile until it has been checked.',
    estimateMinutes: 50,
    requirements: [
      'Every endpoint validates its input against a schema',
      'A per-IP or per-user rate limit on writes',
      'Rejections return 400 or 429 with a clear reason',
      'Validation errors never echo raw input back',
    ],
  },

  // ── Week 8 · Quality ───────────────────────────────────────────────
  {
    title: 'Measure performance',
    blurb: 'Numbers first. Guessing is how you optimise the wrong thing.',
    estimateMinutes: 45,
    requirements: [
      'A Lighthouse run recorded as your baseline',
      'The largest contentful element identified by name',
      'The heaviest bundle chunk identified by name',
      'One number you intend to move, written down',
    ],
  },
  {
    title: 'Optimise images and fonts',
    blurb: 'Usually the biggest win, usually the least interesting work.',
    estimateMinutes: 45,
    requirements: [
      'Images served in a modern format at the right size',
      'Width and height set so nothing shifts on load',
      'Fonts subset and preloaded',
      'Cumulative layout shift measurably down',
    ],
  },
  {
    title: 'Code splitting and lazy loading',
    blurb: 'Do not ship the settings page to someone reading the homepage.',
    estimateMinutes: 45,
    requirements: [
      'At least one route split out of the main bundle',
      'A heavy component loaded on demand',
      'A loading state covers the gap',
      'The initial bundle is smaller than yesterday',
    ],
  },
  {
    title: 'Caching, revalidation and staleness',
    blurb: 'Decide how stale each piece of data is allowed to be.',
    estimateMinutes: 50,
    requirements: [
      'A caching strategy chosen per route, not globally',
      'Revalidation happens on a rule you can state',
      'A mutation invalidates what it made stale',
      'Nothing user-specific is cached publicly',
    ],
  },
  {
    title: 'Accessibility audit',
    blurb: 'Unplug the mouse and get through your own app.',
    estimateMinutes: 50,
    requirements: [
      'Every flow completable with the keyboard alone',
      'Contrast meets AA everywhere text sits on colour',
      'Landmarks and headings make sense read aloud',
      'Automated audit issues fixed, not suppressed',
    ],
  },
  {
    title: 'Error tracking and logging',
    blurb: 'Find out something broke before a user tells you.',
    estimateMinutes: 45,
    requirements: [
      'Client and server errors reported to one place',
      'Logs carry enough context to identify the request',
      'No secret or personal data written to a log',
      'A deliberately thrown error shows up end to end',
    ],
  },
  {
    title: 'End-to-end tests',
    blurb: 'Two tests covering the flows you cannot afford to break.',
    estimateMinutes: 55,
    requirements: [
      'A signed-out visitor completing the main flow',
      'A signed-in user completing the core action',
      'Tests run against a real build, not a dev server',
      'The suite is green twice in a row',
    ],
  },

  // ── Week 9 · Ship it ───────────────────────────────────────────────
  {
    title: 'SEO and metadata',
    blurb: 'Title, description and a share card that renders.',
    estimateMinutes: 40,
    requirements: [
      'A unique title and description per route',
      'An Open Graph image that previews correctly',
      'A sitemap and robots file that resolve',
      'The share card verified in a real preview tool',
    ],
  },
  {
    title: 'Analytics that answer a question',
    blurb: 'Pick the question first, then instrument for it.',
    estimateMinutes: 40,
    requirements: [
      'One question written down before any code',
      'Events named consistently enough to query',
      'No personal data collected',
      'A dashboard that answers the original question',
    ],
  },
  {
    title: 'CI: test and build on every push',
    blurb: 'Let the robot catch it before the reviewer does.',
    estimateMinutes: 45,
    requirements: [
      'Lint, test and build run on every push',
      'A failing check blocks the merge',
      'The pipeline finishes in under five minutes',
      'A deliberately broken commit is caught by it',
    ],
  },
  {
    title: 'Ship it, and write the case study',
    blurb: 'Sixty days of work is only proof if someone can read it.',
    estimateMinutes: 60,
    requirements: [
      'The app is live and someone else has opened it',
      'A README with the problem, the approach and the trade-offs',
      'Two screenshots and the live link at the top',
      'One decision you would make differently, written honestly',
    ],
  },
];

export default days;
