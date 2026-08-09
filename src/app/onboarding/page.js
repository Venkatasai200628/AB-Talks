'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { color, sansText, monoText, screen, GUTTER } from '../../styles/tokens';
import Button from '../../components/ui/Button';

const styles = {
  header: {
    padding: `32px ${GUTTER}px 16px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    ...sansText(700, 24, 1.15),
    color: color.ink,
    letterSpacing: '-.02em',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    ...sansText(400, 14, 1.5),
    color: color.muted,
    margin: 0,
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    padding: `0 ${GUTTER}px 32px`,
  },
  panel: {
    width: '100%',
    maxWidth: 500,
    background: color.surface,
    border: `1px solid ${color.line}`,
    borderRadius: 16,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    ...sansText(600, 16),
    color: color.ink,
    borderBottom: `1px solid ${color.line2}`,
    paddingBottom: 16,
    margin: '-8px 0 0',
  },
  label: {
    ...sansText(500, 12),
    color: color.muted2,
    marginBottom: 8,
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: `1px solid ${color.line2}`,
    background: color.surface2,
    color: color.ink,
    ...sansText(500, 14),
    outline: 'none',
    boxSizing: 'border-box',
  },
  uploadBox: {
    border: `1px dashed ${color.line3}`,
    borderRadius: 12,
    padding: '40px 16px',
    textAlign: 'center',
    background: color.surface2,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  uploadBoxActive: {
    borderColor: color.accent,
    background: color.accentWashSoft,
  },
};

const Icons = {
  Stars: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color.accent} strokeWidth="2">
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  ),
  Upload: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  File: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
};

export default function AIOnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [role, setRole] = useState('Software Engineer');
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleAnalyze = () => {
    if (!role || !fileName || analyzing) return;
    setAnalyzing(true);
    
    setTimeout(() => {
      setAnalyzing(false);
      // Auto-navigate to the AI mentor page upon completion of analysis
      router.push('/onboarding/ai');
    }, 1500);
  };

  return (
    <main style={{ ...screen, position: 'relative', overflow: 'hidden' }}>
      {/* Rich Amber Light Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '30%',
        transform: 'translate(-50%, -50%)',
        width: '120vw',
        height: '80vw',
        maxWidth: 1200,
        maxHeight: 1200,
        background: `radial-gradient(circle, ${color.accent}25 0%, transparent 60%)`,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(120px)',
      }} />

      <header style={{ ...styles.header, position: 'relative', zIndex: 1 }}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>
            {Icons.Stars} Career Guidance Center
          </h1>
          <p style={styles.subtitle}>
            Upload your resume for analysis or chat with our AI to refine your path.
          </p>
        </div>
        <a 
          href={fileName ? "/onboarding/ai" : "#"}
          onClick={(e) => {
            if (!fileName) e.preventDefault();
          }}
          style={{ 
            background: fileName ? color.accent : color.surface2, 
            color: fileName ? color.accentInk : color.muted, 
            padding: '16px 32px', 
            borderRadius: 100, 
            ...sansText(600, 16),
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: fileName ? `0 8px 32px -8px ${color.accent}` : 'none',
            transition: 'all 0.2s ease',
            cursor: fileName ? 'pointer' : 'not-allowed',
            opacity: fileName ? 1 : 0.6
          }}
          onMouseEnter={(e) => {
            if (fileName) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 12px 40px -8px ${color.accent}`;
            }
          }}
          onMouseLeave={(e) => {
            if (fileName) {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = `0 8px 32px -8px ${color.accent}`;
            }
          }}
        >
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </header>

      <section style={{ ...styles.grid, position: 'relative', zIndex: 1 }}>
        
        {/* Resume Analysis */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div style={{ background: color.greenWash, padding: 6, borderRadius: 8, display: 'flex' }}>
              {Icons.Upload}
            </div>
            Resume Analysis
          </div>
          
          <div>
            <label style={styles.label}>Target Role</label>
            <input 
              style={styles.input} 
              placeholder="e.g. Software Engineer" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div 
            style={fileName ? { ...styles.uploadBox, ...styles.uploadBoxActive } : styles.uploadBox}
            onClick={handleUploadClick}
          >
            {Icons.File}
            {fileName ? (
              <span style={{ color: color.accent, ...sansText(500, 13) }}>{fileName} uploaded</span>
            ) : (
              <span style={{ color: color.muted, ...sansText(500, 13) }}>Click to upload PDF/TXT</span>
            )}
            <input 
              type="file" 
              accept=".pdf,.txt,.doc,.docx"
              ref={fileInputRef} 
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={!role || !fileName || analyzing}
            style={{ opacity: (!role || !fileName) ? 0.5 : 1, marginTop: 'auto' }}
          >
            {analyzing ? 'Analyzing...' : 'Analyze & Suggest Tracks'}
          </Button>
        </div>
      </section>
    </main>
  );
}
