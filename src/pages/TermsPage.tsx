import React from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { ChevronLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { goToStep, goBack } = useSignupWizard();

  const handleAccept = () => {
    goToStep('email');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Top Header */}
      <header className="screen-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={goBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '6px',
              marginRight: '-4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Go back to landing"
          >
            <ChevronLeft size={24} />
          </button>
          <Logo size="md" />
        </div>
      </header>

      {/* Main Content */}
      <main
        className="screen-content animate-fade-in"
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px 24px 20px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '1.05rem',
            fontWeight: 800,
            lineHeight: 1.45,
            letterSpacing: '0.01em',
            color: '#ffffff',
            textTransform: 'uppercase'
          }}
        >
          <p>
            BY USING THIS APP, YOU&apos;RE AGREEING TO KEEP THINGS FUN, SAFE, AND RESPECTFUL... AND ALSO
            AGREEING TO OUR TERMS AND CONDITIONS.
          </p>

          <p>
            POLITENESS IS A MUST—TREAT OTHERS HOW YOU&apos;D WANT TO BE TREATED.
          </p>

          <p>
            EVERYONE HERE IS LOOKING FOR REASONS TO{' '}
            <span
              style={{
                color: 'var(--neon-purple)',
                textShadow: '0 0 12px rgba(181, 55, 242, 0.85), 0 0 24px rgba(181, 55, 242, 0.5)'
              }}
            >
              PARTY
            </span>
            , SO BRING YOUR BEST VIBE AND EXPECT THE SAME FROM OTHERS. LET&apos;S PARTY RESPONSIBLY
            AND MAKE EVERY EXPERIENCE A GREAT ONE!
          </p>
        </div>

        {/* Footer */}
        <div className="screen-footer" style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <p
            style={{
              fontSize: '0.84rem',
              color: '#d1d1d6',
              textAlign: 'center',
              marginBottom: '6px'
            }}
          >
            To proceed, accept Terms and Conditions
          </p>

          <Button onClick={handleAccept} aria-label="Accept Terms and Conditions">
            ACCEPT
          </Button>
        </div>
      </main>
    </div>
  );
};
