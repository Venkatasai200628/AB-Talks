import { Fragment } from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';
import LoginButtonWithModal from '../components/LoginButtonWithModal';
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
    alignItems: 'center',
    margin: `32px ${GUTTER}px 0`,
    padding: '16px 18px',
    background: color.surface,
    border: `1px solid ${color.line}`,
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
  proofBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  proofDivider: { width: 1, height: 40, background: color.line3 },
  proofValue: { ...monoText(700, 22) },
  proofLabel: { ...monoText(500, 10), color: color.muted2, letterSpacing: '0.05em' },
  steps: {
    ...bareList,
    margin: `20px ${GUTTER}px 0`,
    borderTop: `1px solid ${color.line2}`,
    borderBottom: `1px solid ${color.line2}`,
  },
  stepNum: { flex: 'none', width: 20, paddingTop: 2, ...monoText(400, 11), color: color.accent },
  stepTitle: { ...sansText(600, 14.5), color: color.ink },
  stepDesc: { ...sansText(400, 12.5, 1.45), color: color.muted, margin: '2px 0 0' },
  cta: { padding: `18px ${GUTTER}px 26px` },
};

const proofTone = { accent: color.accent, green: color.green };

export default function LandingPage() {
  return (
    <main style={{ ...screen, position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Light Orange Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '40vw',
        maxWidth: 800,
        maxHeight: 400,
        background: 'radial-gradient(ellipse, rgba(255, 160, 80, 0.12) 0%, rgba(10,10,11,0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(80px)',
      }} />

      <header style={{ ...styles.appbar, position: 'relative', zIndex: 1 }}>
        <span style={styles.brand}>ABTALKS</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ThemeToggle />
          <LoginButtonWithModal navLinkStyle={styles.appbarLink} hoverColor={color.ink}>
            Log in
          </LoginButtonWithModal>
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
            <div style={styles.proofBlock}>
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
