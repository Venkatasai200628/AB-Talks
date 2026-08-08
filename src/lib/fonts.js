import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

/**
 * Loaded through next/font so there is no stylesheet to author — the font
 * families come back as plain strings usable in a React style object.
 */

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const sans = spaceGrotesk.style.fontFamily;
export const mono = jetBrainsMono.style.fontFamily;
