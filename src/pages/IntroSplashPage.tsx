import React from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroSplashPageProps {
  onContinue: () => void;
}

export const IntroSplashPage: React.FC<IntroSplashPageProps> = ({ onContinue }) => {
  const { viewMode } = useSignupWizard();

  // ==========================================
  // DESKTOP WEBSITE INTRO HERO
  // ==========================================
  if (viewMode === 'website') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          backgroundColor: '#050508'
        }}
      >
        {/* Background ambient lighting */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 42, 133, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 80% 25%, rgba(0, 112, 243, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(181, 55, 242, 0.2) 0%, transparent 60%)
            `,
            filter: 'blur(50px)',
            opacity: 0.9,
            pointerEvents: 'none'
          }}
        />

        <div
          className="animate-slide-up"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '820px',
            backgroundColor: 'rgba(12, 12, 18, 0.85)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '32px',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.9), 0 0 60px rgba(255, 42, 133, 0.15)'
          }}
        >
          <Logo size="lg" />

          <div style={{ marginTop: '28px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 42, 133, 0.12)',
                border: '1px solid rgba(255, 42, 133, 0.35)',
                borderRadius: '9999px',
                padding: '6px 16px',
                marginBottom: '16px'
              }}
            >
              <Sparkles size={14} color="var(--neon-pink)" />
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--neon-pink)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                AN APP ONLY FOR
              </span>
            </div>

            <h1
              style={{
                fontSize: '3.6rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.1,
                textShadow: '0 0 30px rgba(255, 42, 133, 0.3)'
              }}
            >
              EXTROVERTS
            </h1>
          </div>

          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#d1d1d6',
              maxWidth: '560px',
              marginTop: '16px',
              textAlign: 'center'
            }}
          >
            Curated social nightlife, rooftop hangouts, and private party experiences for extroverts in your city.
          </p>

          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.5,
              color: '#ff4d6d',
              maxWidth: '460px',
              marginTop: '12px',
              textAlign: 'center'
            }}
          >
            <strong style={{ color: '#ff2a5f' }}>Warning:</strong> Entering may lead to spontaneous dancing and unsolicited high-fives!
          </p>

          {/* 3 Value Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%', margin: '36px 0' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid #23232e', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🍸</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Live Nightlife</div>
              <div style={{ fontSize: '0.75rem', color: '#8e8e93', marginTop: '4px' }}>Top parties &amp; club lounges</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid #23232e', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>⚡</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Before-Hours</div>
              <div style={{ fontSize: '0.75rem', color: '#8e8e93', marginTop: '4px' }}>Host private hangouts</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid #23232e', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🎟️</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>VIP Passes</div>
              <div style={{ fontSize: '0.75rem', color: '#8e8e93', marginTop: '4px' }}>Skip lines &amp; earn HVTS</div>
            </div>
          </div>

          {/* Action Button */}
          <div style={{ width: '100%', maxWidth: '340px' }}>
            <Button onClick={onContinue} aria-label="Continue to Extroverts">
              <span>EXPLORE EXTROVERTS</span>
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTIC MOBILE SPLASH VIEW (1:1 WhatsApp)
  // ==========================================
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#050508'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 25% 25%, #ff5e3a 0%, transparent 45%),
            radial-gradient(circle at 75% 20%, #0070f3 0%, transparent 40%),
            radial-gradient(circle at 80% 65%, #00d2ff 0%, transparent 45%),
            radial-gradient(circle at 35% 85%, #7928ca 0%, #050508 70%)
          `,
          filter: 'blur(30px)',
          opacity: 0.9,
          pointerEvents: 'none'
        }}
      />

      {/* Centered Showcase Card */}
      <div
        className="animate-slide-up"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          minHeight: '560px',
          backgroundColor: 'rgba(10, 10, 14, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '32px',
          padding: '40px 28px 32px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 94, 58, 0.15)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Logo size="lg" />

          <div style={{ marginTop: '36px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: '8px',
                opacity: 0.9
              }}
            >
              AN APP ONLY FOR
            </span>
            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.15
              }}
            >
              EXTROVERTS
            </h1>
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: '#ff4d6d',
              maxWidth: '300px',
              marginTop: '28px',
              textAlign: 'center'
            }}
          >
            <strong style={{ color: '#ff2a5f' }}>Warning:</strong> Entering may lead to spontaneous dancing and
            unsolicited high-fives!
          </p>
        </div>

        {/* Action Button */}
        <div style={{ width: '100%', marginTop: '32px' }}>
          <Button onClick={onContinue} aria-label="Continue to Extroverts">
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};
