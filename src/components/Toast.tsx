import React from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSignupWizard();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '90%',
        maxWidth: '390px',
        pointerEvents: 'none'
      }}
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className="animate-fade-in"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: '#161619',
              border: `1px solid ${
                isError
                  ? 'var(--error)'
                  : isSuccess
                  ? 'var(--success)'
                  : 'rgba(255, 255, 255, 0.2)'
              }`,
              boxShadow: isError
                ? '0 6px 24px rgba(255, 69, 58, 0.3)'
                : isSuccess
                ? '0 6px 24px rgba(48, 209, 88, 0.25)'
                : '0 6px 24px rgba(0, 0, 0, 0.6)',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 500,
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isError && <AlertTriangle size={18} color="var(--error)" />}
              {isSuccess && <CheckCircle2 size={18} color="var(--success)" />}
              {!isError && !isSuccess && <Info size={18} color="var(--neon-purple)" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8e8e93',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
