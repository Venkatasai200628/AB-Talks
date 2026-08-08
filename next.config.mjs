import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the home directory makes Turbopack's automatic
  // root detection walk too far up. Pin the root to this project.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
