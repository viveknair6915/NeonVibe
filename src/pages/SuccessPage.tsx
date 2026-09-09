import React from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Sparkles } from 'lucide-react';

export const SuccessPage: React.FC = () => {
  const { formData, goToStep } = useSignupWizard();

  const firstName = formData.name ? formData.name.split(' ')[0] : 'Party Hero';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(255, 42, 133, 0.25) 0%, rgba(181, 55, 242, 0.15) 50%, transparent 80%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <header className="screen-header">
        <Logo size="md" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-pink)' }}>
          <Sparkles size={18} />
        </div>
      </header>

      <main
        className="screen-content animate-fade-in"
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: '24px',
          paddingBottom: '24px'
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#16161b',
            border: '2px solid var(--neon-pink)',
            boxShadow: '0 0 20px rgba(255, 42, 133, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px'
          }}
        >
          <span
            style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'var(--font-main)'
            }}
          >
            {firstName.charAt(0).toUpperCase()}
          </span>
        </div>

        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            letterSpacing: '0.04em',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '16px',
            lineHeight: 1.15
          }}
        >
          YOU&apos;RE IN.
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.55,
            color: '#d1d1d6',
            maxWidth: '300px',
            marginBottom: '12px'
          }}
        >
          Welcome to the club, <strong>{formData.name}</strong>!
        </p>

        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.5,
            color: '#8e8e93',
            maxWidth: '280px',
            marginBottom: '40px'
          }}
        >
          Your profile is ready. Time to find your people and make some plans.
        </p>

        <div
          style={{
            width: '100%',
            backgroundColor: '#111114',
            border: '1px solid #27272d',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '36px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Extrovert Profile
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--neon-yellow)', fontWeight: 600 }}>
              VERIFIED
            </span>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>
            {formData.name} {formData.calculatedAge ? `, ${formData.calculatedAge}` : ''}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
            @{formData.username} &bull; {formData.pronouns.join('/')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#71717a' }}>
            {formData.email}
          </div>
        </div>

        <div style={{ width: '100%', marginTop: 'auto' }}>
          <Button onClick={() => goToStep('profile')}>
            LET&apos;S PARTY
          </Button>
        </div>
      </main>
    </div>
  );
};
