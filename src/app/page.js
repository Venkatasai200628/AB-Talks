import { Fragment } from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';
import HoverLink from '../components/ui/HoverLink';
import ThemeToggle from '../components/ThemeToggle';
import { landingProof, landingSteps } from '../lib/mockData';
import { bareList, color, eyebrow, GUTTER, monoText, sansText, screen } from '../styles/tokens';

const styles = {
  appbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `18px ${GUTTER}px 16px`,
    borderBottom: `1px solid ${color.line}`,
  },
  brand: { ...monoText(700, 13), color: color.ink, letterSpacing: '-.02em' },
  navLink: { ...monoText(400, 12), color: color.muted },
  appbarLink: { ...monoText(400, 12), color: color.muted },
  hero: { padding: `22px ${GUTTER}px 0` },
  title: {
    ...sansText(700, 31, 1.14),
    color: color.ink,
    letterSpacing: '-.032em',
    margin: '12px 0 0',
  },
  lead: { ...sansText(400, 15, 1.55), color: color.ink4, margin: '14px 0 0' },
  proof: {
    display: 'flex',
    gap: 16,
    margin: `20px ${GUTTER}px 0`,
    padding: '14px 18px',
    background: color.surface,
    border: `1px solid ${color.line}`,
    borderRadius: 14,
  },
  proofDivider: { width: 1, background: color.line2 },
  proofValue: { ...monoText(700, 19) },
  proofLabel: { ...monoText(400, 9.5), color: color.muted2, marginTop: 4 },
  steps: {
    ...bareList,
    margin: `20px ${GUTTER}px 0`,
    borderTop: `1px solid ${color.line2}`,
    borderBottom: `1px solid ${color.line2}`,
  },
  stepNum: { flex: 'none', width: 20, paddingTop: 2, ...monoText(400, 11), color: color.accent },
  stepTitle: { ...sansText(600, 14.5), color: color.ink },
  stepDesc: { ...sansText(400, 12.5, 1.45), color: color.muted, marginTop: 2 },
  cta: { padding: `18px ${GUTTER}px 26px` },
};

const proofTone = { accent: color.accent, green: color.green };

export default function LandingPage() {
  return (
    <main style={screen}>
      <header style={styles.appbar}>
        <span style={styles.brand}>ABTALKS</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ThemeToggle />
          <Link href="/onboarding" style={styles.appbarLink}>
            Log in
          </Link>
        </div>
      </header>

      <section style={styles.hero}>
        <p style={{ ...eyebrow, letterSpacing: '.16em' }}>FREE · 60 DAYS · FOR STUDENTS IN INDIA</p>
        <h1 style={styles.title}>60 days of code. Proof you can show a recruiter.</h1>
        <p style={styles.lead}>
          One small task each morning. Push the code, post what you learned. Sixty days, sixty
          pieces of real work.
        </p>
      </section>

      <section style={styles.proof} aria-label="What finishing looks like">
        {landingProof.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <div style={styles.proofDivider} aria-hidden="true" />}
            <div>
              <div style={{ ...styles.proofValue, color: proofTone[stat.tone] ?? color.ink }}>
                {stat.value}
              </div>
              <div style={styles.proofLabel}>{stat.label}</div>
            </div>
          </Fragment>
        ))}
      </section>

      <ol style={styles.steps}>
        {landingSteps.map((step, i) => (
          <li
            key={step.num}
            style={{
              display: 'flex',
              gap: 14,
              padding: '13px 0',
              borderBottom:
                i === landingSteps.length - 1 ? 'none' : `1px solid ${color.line}`,
            }}
          >
            <span style={styles.stepNum} aria-hidden="true">
              {step.num}
            </span>
            <div>
              <div style={styles.stepTitle}>{step.title}</div>
              <div style={styles.stepDesc}>{step.desc}</div>
            </div>
          </li>
        ))}
      </ol>

      <div style={styles.cta}>
        <Button href="/onboarding">Start Day 1 — it&apos;s free</Button>
      </div>
    </main>
  );
}
