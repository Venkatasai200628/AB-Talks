import './globals.css';
import { ChallengeProvider } from '../lib/challengeState';

export const metadata = {
  title: 'ABTalks — 60 days of code',
  description:
    'A free 60-day coding challenge for students in India. One small task each morning, pushed to GitHub and posted to LinkedIn — sixty days, sixty pieces of real work.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChallengeProvider>
          <div className="shell">{children}</div>
        </ChallengeProvider>
      </body>
    </html>
  );
}
