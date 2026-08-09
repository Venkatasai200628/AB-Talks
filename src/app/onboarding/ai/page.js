'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { color, sansText, monoText, screen, GUTTER } from '../../../styles/tokens';
import CommentsModal from '../../../components/CommentsModal';

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
    maxWidth: 600,
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
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    minHeight: 300,
    overflowY: 'auto',
  },
  chatMessageRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    animation: 'fadeIn 0.5s ease-out',
  },
  chatBubble: {
    background: color.surface2,
    border: `1px solid ${color.line2}`,
    borderRadius: '4px 16px 16px 16px',
    padding: '12px 16px',
    ...sansText(400, 13, 1.5),
    color: color.ink2,
    maxWidth: '90%',
  },
  chatInputWrapper: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginTop: 'auto',
    borderTop: `1px solid ${color.line2}`,
    paddingTop: 16,
  },
  chatInput: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 24,
    border: `1px solid ${color.line2}`,
    background: color.surface2,
    color: color.ink,
    ...sansText(400, 13),
    outline: 'none',
  },
  commentsBtn: {
    ...monoText(500, 11),
    background: 'none',
    border: `1px solid ${color.line2}`,
    color: color.muted,
    padding: '8px 16px',
    borderRadius: 24,
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: 24,
  }
};

const Icons = {
  Stars: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color.accent} strokeWidth="2">
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  ),
  Chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Bot: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 12 }}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
};

export default function AIOptionsPage() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your career assistant. I can help you analyze your resume gaps, suggest projects, or refine your roadmap. Ask me anything!"
    }
  ]);

  useEffect(() => {
    // Simulate AI analysis delay
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: 2,
          sender: 'ai',
          text: "✅ I've analyzed your resume and cross-referenced it with comments and outcomes from past users with similar profiles! Based on your gaps for \"Software Engineer\", I have generated new customized projects for you in the Project Lab."
        }
      ]);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), sender: 'ai', text: "Great! I recommend checking out the Web Dev track for full-stack experience. Anything else you'd like to ask?" }
      ]);
    }, 1000);
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
            Your AI career mentor is ready to help you plan your next steps.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <button style={{ ...styles.commentsBtn, marginTop: 0, whiteSpace: 'nowrap', padding: '6px 12px', fontSize: 11 }} onClick={() => setShowComments(true)}>
            View Student Comments
          </button>
          <a 
            href="/onboarding/tracks" 
            style={{ 
              background: color.accent, 
              color: color.accentInk, 
              padding: '16px 32px', 
              borderRadius: 100, 
              ...sansText(600, 16),
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: `0 8px 32px -8px ${color.accent}`,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 12px 40px -8px ${color.accent}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = `0 8px 32px -8px ${color.accent}`;
            }}
          >
            Next
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </header>

      <section style={{ ...styles.grid, position: 'relative', zIndex: 1 }}>
        
        {/* AI Chat Panel */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div style={{ background: color.amberWash, padding: 6, borderRadius: 8, display: 'flex' }}>
              {Icons.Chat}
            </div>
            Career Mentor AI
          </div>

          <div style={styles.chatArea}>
            {messages.map(msg => (
              <div key={msg.id} style={{ ...styles.chatMessageRow, flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                {msg.sender === 'ai' && Icons.Bot}
                <div style={{ ...styles.chatBubble, background: msg.sender === 'user' ? color.accentWashSoft : color.surface2, borderColor: msg.sender === 'user' ? color.accentEdge : color.line2, borderRadius: msg.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.chatInputWrapper}>
            <input 
              style={styles.chatInput}
              placeholder="Ask about your resume..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            />
            <div onClick={handleSendChat}>
              {Icons.Send}
            </div>
          </div>
        </div>
      </section>

      {showComments && <CommentsModal onClose={() => setShowComments(false)} />}
    </main>
  );
}
