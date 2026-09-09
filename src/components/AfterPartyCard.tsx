import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

interface AfterPartyCardProps {
  onClick?: () => void;
}

export const AfterPartyCard: React.FC<AfterPartyCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        backgroundColor: '#0a0a0c',
        border: '1.5px dashed var(--neon-pink)',
        borderRadius: '16px',
        padding: '16px 18px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 0 15px rgba(255, 42, 133, 0.12)',
        position: 'relative'
      }}
      role="button"
      tabIndex={0}
      aria-label="After Party - See your complete events and share memories"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Star
            size={20}
            color="var(--neon-pink)"
            strokeWidth={2.2}
            style={{ filter: 'drop-shadow(0 0 4px rgba(255, 42, 133, 0.6))' }}
          />
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            AFTER PARTY
          </span>
        </div>

        {/* Circular arrow button */}
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#1e1e24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <ChevronRight size={18} color="#ffffff" strokeWidth={2.5} />
        </div>
      </div>

      <p
        style={{
          fontSize: '0.8rem',
          color: '#a1a1aa',
          margin: 0,
          paddingLeft: '30px',
          lineHeight: 1.35
        }}
      >
        See your complete events and share memories
      </p>
    </div>
  );
};
