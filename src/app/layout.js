import AppShell from '../components/AppShell';
import { ChallengeProvider } from '../lib/challengeState';
import { color, sans } from '../styles/tokens';

export const metadata = {
  title: 'ABTalks — 60 days of code',
  description:
    'A free 60-day coding challenge for students in India. One small task each morning, pushed to GitHub and posted to LinkedIn — sixty days, sixty pieces of real work.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: color.bg,
};

const body = {
  margin: 0,
  color: color.ink,
  fontFamily: sans,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

const lightThemeCSS = `
  html, body {
    height: 100%;
    overflow: hidden; /* Lock viewport so ONLY AppShell scrolls */
    margin: 0;
    padding: 0;
    width: 100%;
  }

  [data-theme="light"] {
    --color-bg: #ffffff;
    --color-surface: #f4f2ee;
    --color-surface2: #eae7e0;
    --color-surface3: #d4d2cc;
    --color-line: rgba(0,0,0,0.08);
    --color-line2: rgba(0,0,0,0.12);
    --color-line3: rgba(0,0,0,0.2);
    --color-ink: #0a0a0b;
    --color-ink2: #26262b;
    --color-ink3: #4a4a52;
    --color-ink4: #6e6e78;
    --color-muted: #5c5c64;
    --color-muted2: #6e6e78;
    --color-muted3: #9a9aa4;
    --color-faint: #b4b4bd;
    --color-faint2: #d4d2cc;
    --color-hairline: #d4d2cc;
    --color-grid-0: transparent;
    --color-grid-1: #ffcfbe;
    --color-grid-2: #ff9d79;
    --color-grid-3: #ff6d3a;
    --color-grid-4: #ff5c2b;
    --color-track: #e0ded8;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: lightThemeCSS }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body style={body}>
        <ChallengeProvider>
          <AppShell>
            {children}
          </AppShell>
        </ChallengeProvider>
      </body>
    </html>
  );
}
