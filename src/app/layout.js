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
  themeColor: color.bg,
};

const body = {
  margin: 0,
  color: color.ink,
  fontFamily: sans,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={body}>
        <ChallengeProvider>
          <AppShell>{children}</AppShell>
        </ChallengeProvider>
      </body>
    </html>
  );
}
