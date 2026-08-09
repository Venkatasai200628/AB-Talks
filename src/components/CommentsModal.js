'use client';

import { mockReviews } from '../lib/mockData';
import { color, sansText, monoText, labelTight, GUTTER } from '../styles/tokens';
import Button from './ui/Button';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: GUTTER,
  },
  modal: {
    background: color.surface,
    border: `1px solid ${color.line}`,
    borderRadius: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.2s ease-out',
  },
  header: {
    padding: '24px 24px 16px',
    borderBottom: `1px solid ${color.line}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    background: color.surface,
    zIndex: 2,
  },
  title: {
    ...labelTight,
    color: color.ink,
    fontSize: 13,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: color.muted,
    fontSize: 24,
    cursor: 'pointer',
    lineHeight: 1,
    padding: 4,
  },
  content: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  reviewCard: {
    background: color.surface2,
    border: `1px solid ${color.line2}`,
    borderRadius: 16,
    padding: 16,
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: color.surface3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sansText(600, 13),
    color: color.ink,
  },
  reviewerName: {
    ...sansText(600, 14),
    color: color.ink,
  },
  reviewerTrack: {
    ...monoText(500, 10.5),
    color: color.accent,
    background: color.accentWashSoft,
    padding: '2px 6px',
    borderRadius: 4,
    marginTop: 2,
    display: 'inline-block',
  },
  reviewText: {
    ...sansText(400, 13, 1.5),
    color: color.ink2,
    fontStyle: 'italic',
  }
};

export default function CommentsModal({ onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.title}>STUDENT COMMENTS</div>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        
        <div style={styles.content}>
          {mockReviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <div style={styles.reviewerInfo}>
                <div style={styles.reviewerAvatar}>{review.avatar}</div>
                <div>
                  <div style={styles.reviewerName}>{review.name}</div>
                  <div style={styles.reviewerTrack}>{review.track} Cohort</div>
                </div>
              </div>
              <p style={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
