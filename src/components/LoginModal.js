'use client';

import { color, sansText, monoText } from '../styles/tokens';
import Button from './ui/Button';

export default function LoginModal({ onClose }) {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 11, 0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '24px',
    animation: 'overlayFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const modalStyle = {
    background: color.surface,
    border: `1px solid ${color.line2}`,
    borderRadius: 20,
    padding: 40,
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    position: 'relative',
    animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'none',
    border: 'none',
    color: color.muted,
    cursor: 'pointer',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background 0.2s, color 0.2s',
    ...sansText(400, 18)
  };

  const inputStyle = {
    width: '100%',
    background: color.surface2,
    border: `1px solid ${color.line}`,
    borderRadius: 12,
    padding: '14px 16px',
    color: color.ink,
    ...sansText(400, 15),
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    ...monoText(500, 11),
    color: color.muted2,
    marginBottom: 10,
    display: 'block',
    letterSpacing: '.05em'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button 
          style={closeButtonStyle} 
          onClick={onClose} 
          aria-label="Close"
          onMouseOver={(e) => { e.currentTarget.style.color = color.ink; e.currentTarget.style.background = color.surface3; }}
          onMouseOut={(e) => { e.currentTarget.style.color = color.muted; e.currentTarget.style.background = 'transparent'; }}
        >
          ✕
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ ...sansText(700, 26, 1.2), color: color.ink, margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>Welcome back</h2>
          <p style={{ ...sansText(400, 15, 1.5), color: color.muted, margin: 0 }}>Log in to access your ABTALKS dashboard.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              style={inputStyle} 
              onFocus={(e) => { e.currentTarget.style.borderColor = color.accent; e.currentTarget.style.boxShadow = `0 0 0 1px ${color.accent}`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = color.line; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>PASSWORD</label>
              <a href="#" style={{ ...sansText(400, 13), color: color.muted, textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseOver={(e) => e.currentTarget.style.color = color.ink}
                 onMouseOut={(e) => e.currentTarget.style.color = color.muted}
              >
                Forgot?
              </a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={inputStyle} 
              onFocus={(e) => { e.currentTarget.style.borderColor = color.accent; e.currentTarget.style.boxShadow = `0 0 0 1px ${color.accent}`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = color.line; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        <Button onClick={() => {
           window.location.href = '/dashboard';
        }} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
          Log in
        </Button>
      </div>
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
