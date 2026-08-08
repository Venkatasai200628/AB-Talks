import { Fragment } from 'react';
import Link from 'next/link';
import { landingProof, landingSteps } from '../lib/mockData';

export default function LandingPage() {
  return (
    <main className="screen">
      <header className="appbar">
        <span className="appbar__brand">ABTALKS</span>
        <Link href="/dashboard" className="appbar__link">
          Log in
        </Link>
      </header>

      <section className="hero">
        <p className="eyebrow eyebrow--wide">FREE · 60 DAYS · FOR STUDENTS IN INDIA</p>
        <h1 className="hero__title">60 days of code. Proof you can show a recruiter.</h1>
        <p className="hero__lead">
          One small task each morning. Push the code, post what you learned. Sixty days, sixty
          pieces of real work.
        </p>
      </section>

      <section className="proof" aria-label="What finishing looks like">
        {landingProof.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <div className="proof__divider" aria-hidden="true" />}
            <div>
              <div className={`proof__value${stat.tone ? ` proof__value--${stat.tone}` : ''}`}>
                {stat.value}
              </div>
              <div className="proof__label">{stat.label}</div>
            </div>
          </Fragment>
        ))}
      </section>

      <ol className="steps">
        {landingSteps.map((step) => (
          <li key={step.num} className="step">
            <span className="step__num" aria-hidden="true">
              {step.num}
            </span>
            <div>
              <div className="step__title">{step.title}</div>
              <div className="step__desc">{step.desc}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="hero__cta">
        <Link href="/dashboard" className="btn btn--primary">
          Start Day 1 — it&apos;s free
        </Link>
      </div>
    </main>
  );
}
