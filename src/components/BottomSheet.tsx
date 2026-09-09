import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bottom-sheet-title"
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.2s ease'
        }}
      />

      <div
        className="animate-slide-up"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#121215',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '1px solid #2a2a30',
          padding: '16px 20px 32px 20px',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.8)',
          zIndex: 51,
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              opacity: 0.9
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: subtitle ? '4px' : '20px'
          }}
        >
          <h2
            id="bottom-sheet-title"
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8e8e93',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '50%'
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {subtitle && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '20px'
            }}
          >
            {subtitle}
          </p>
        )}

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};
