import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { AfterPartyCard } from '../components/AfterPartyCard';
import { BottomNavigation } from '../components/BottomNavigation';
import { AccountPromptSheet } from '../components/AccountPromptSheet';
import { Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { goToStep, formData, viewMode } = useSignupWizard();
  const [showPromptSheet, setShowPromptSheet] = useState(false);

  const isRegistered = Boolean(formData.username && formData.name);

  const handleCreate = () => {
    goToStep('terms');
  };

  const handleAfterPartyClick = () => {
    if (isRegistered) {
      goToStep('profile');
    } else {
      setShowPromptSheet(true);
    }
  };

  const handleTabChange = (tab: 'home' | 'chat' | 'create' | 'profile') => {
    if (tab === 'home') {
      goToStep('feed');
    } else if (tab === 'chat') {
      goToStep('chat');
    } else if (tab === 'profile') {
      if (isRegistered) {
        goToStep('profile');
      } else {
        setShowPromptSheet(true);
      }
    }
  };

  // ==========================================
  // DESKTOP WEBSITE VIEW LAYOUT
  // ==========================================
  if (viewMode === 'website') {
    return (
      <div className="website-before-hours-container animate-fade-in">
        {/* Hero Section */}
        <section className="website-hero-section">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 42, 133, 0.12)',
              border: '1px solid rgba(255, 42, 133, 0.35)',
              borderRadius: '9999px',
              padding: '8px 20px',
              marginBottom: '20px'
            }}
          >
            <Sparkles size={16} color="var(--neon-pink)" />
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--neon-pink)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Before-Hours Exclusive Lounge
            </span>
          </div>

          {/* Glowing Neon Sign */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px 0 24px 0',
              userSelect: 'none'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '3.8rem',
                color: '#ff2a85',
                textShadow: '0 0 8px #ff2a85, 0 0 20px #ff2a85, 0 0 40px rgba(255, 42, 133, 0.8)',
                lineHeight: 1.1,
                transform: 'rotate(-2deg)',
                display: 'inline-block'
              }}
            >
              take it as a
            </span>

            <div style={{ margin: '12px 0' }}>
              <h1
                style={{
                  fontFamily: '"Monoton", "Audiowide", var(--font-main)',
                  fontSize: '4.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: '#ffe600',
                  textShadow:
                    '0 0 8px #ffe600, 0 0 24px #ffe600, 0 0 48px rgba(255, 230, 0, 0.85), 0 0 80px rgba(255, 200, 0, 0.6)',
                  lineHeight: 1.1,
                  margin: 0
                }}
              >
                NEON SIGN
              </h1>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '3.8rem',
                color: '#ff2a85',
                textShadow: '0 0 8px #ff2a85, 0 0 20px #ff2a85, 0 0 40px rgba(255, 42, 133, 0.8)',
                lineHeight: 1.1,
                transform: 'rotate(-1deg)',
                display: 'inline-block'
              }}
            >
              from the god
            </span>
          </div>

          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#d1d1d6',
              fontWeight: 500,
              maxWidth: '640px',
              margin: '0 auto 16px auto'
            }}
          >
            Curate private parties, host social hangouts, or discover exclusive before-hours events with fellow extroverts.
          </p>
        </section>

        {/* 2-Column Action Hub */}
        <section className="website-action-grid">
          {/* Card 1: Host / Create */}
          <div
            style={{
              backgroundColor: '#0c0c12',
              border: '1px solid rgba(255, 42, 133, 0.3)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 42, 133, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255, 42, 133, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 42, 133, 0.15)',
                  color: 'var(--neon-pink)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '16px'
                }}
              >
                CREATE SOCIAL EVENT
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '12px', color: '#ffffff' }}>
                Host Your Next Event
              </h2>

              <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Have a club table, rooftop, or private lounge in mind? Host a social hangout, curate your guestlist, and connect attendees before the music starts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                  <span style={{ color: 'var(--neon-pink)', fontWeight: 800 }}>⚡</span>
                  <span>Instant Silver &amp; Gold member status boost</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                  <span style={{ color: 'var(--neon-pink)', fontWeight: 800 }}>👥</span>
                  <span>Verified 18+ attendee guestlist &amp; approval</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                  <span style={{ color: 'var(--neon-pink)', fontWeight: 800 }}>💬</span>
                  <span>Auto-created private party group chat</span>
                </div>
              </div>
            </div>

            <Button onClick={handleCreate} aria-label="Create - Start Onboarding">
              CREATE EVENT NOW
            </Button>
          </div>

          {/* Card 2: After Party */}
          <div
            style={{
              backgroundColor: '#0c0c12',
              border: '1px dashed rgba(255, 42, 133, 0.45)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(181, 55, 242, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(181, 55, 242, 0.15)',
                  color: 'var(--neon-purple)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '16px'
                }}
              >
                EVENT RECAPS &amp; MEMORIES
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '12px', color: '#ffffff' }}>
                After Party Lounge
              </h2>

              <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Relive high-energy nights, browse exclusive photo drops from past gatherings, and keep in touch with the extroverts you met on the dancefloor.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                  <span style={{ color: 'var(--neon-purple)', fontWeight: 800 }}>📸</span>
                  <span>High-resolution party photo galleries</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                  <span style={{ color: 'var(--neon-purple)', fontWeight: 800 }}>🌟</span>
                  <span>Attended party badges &amp; superlatives</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                  <span style={{ color: 'var(--neon-purple)', fontWeight: 800 }}>🎟️</span>
                  <span>Exclusive VIP passes for upcoming weekends</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAfterPartyClick}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 42, 133, 0.1)',
                border: '1px solid var(--neon-pink)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--neon-pink)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 42, 133, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 42, 133, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              EXPLORE AFTER PARTY
            </button>
          </div>
        </section>

        {/* 3-Column Community Benefits */}
        <section className="website-features-grid">
          <div
            style={{
              backgroundColor: '#0a0a0e',
              border: '1px solid #1f1f26',
              borderRadius: '18px',
              padding: '24px'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>🍸</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Curated Venues &amp; Tables
            </h3>
            <p style={{ color: '#8e8e93', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Hand-picked nightclubs, secret speakeasies, and rooftop terraces reserved specifically for our community.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#0a0a0e',
              border: '1px solid #1f1f26',
              borderRadius: '18px',
              padding: '24px'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>⚡</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Strictly Extroverts
            </h3>
            <p style={{ color: '#8e8e93', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Strict 18+ verified members only. Real-world social vibes where everyone is there to mingle and connect.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#0a0a0e',
              border: '1px solid #1f1f26',
              borderRadius: '18px',
              padding: '24px'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>🎟️</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              VIP Pass System
            </h3>
            <p style={{ color: '#8e8e93', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Earn HVTS credits, unlock free guest passes, skip the general admission queue, and claim complimentary bottle service.
            </p>
          </div>
        </section>

        {/* Account Prompt Bottom Sheet */}
        <AccountPromptSheet
          isOpen={showPromptSheet}
          onClose={() => setShowPromptSheet(false)}
          onGetStarted={() => goToStep('terms')}
        />
      </div>
    );
  }

  // ==========================================
  // AUTHENTIC MOBILE VIEW (WhatsApp Reference 1:1)
  // ==========================================
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Mobile-only Header */}
      <header className="screen-header">
        <Logo size="md" onClick={() => goToStep('feed')} />
        <span className="header-status-badge">BEFORE-HOURS</span>
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
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: '20px',
          paddingBottom: '32px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Top category chip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 42, 133, 0.1)',
              border: '1px solid rgba(255, 42, 133, 0.3)',
              borderRadius: '9999px',
              padding: '6px 16px',
              marginBottom: '12px'
            }}
          >
            <Sparkles size={14} color="var(--neon-pink)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--neon-pink)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Host A Social Event
            </span>
          </div>

          {/* Neon Center Hero Graphic */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '16px 0 28px 0',
              userSelect: 'none'
            }}
          >
            {/* "take it as a" */}
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '3.2rem',
                color: '#ff2a85',
                textShadow: '0 0 6px #ff2a85, 0 0 16px #ff2a85, 0 0 32px rgba(255, 42, 133, 0.7)',
                lineHeight: 1.1,
                transform: 'rotate(-2deg)',
                display: 'inline-block'
              }}
            >
              take it as a
            </span>

            {/* "NEON SIGN" */}
            <div
              style={{
                margin: '10px 0',
                position: 'relative'
              }}
            >
              <h1
                style={{
                  fontFamily: '"Monoton", "Audiowide", var(--font-main)',
                  fontSize: '3.4rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: '#ffe600',
                  textShadow:
                    '0 0 5px #ffe600, 0 0 16px #ffe600, 0 0 32px rgba(255, 230, 0, 0.8), 0 0 60px rgba(255, 200, 0, 0.5)',
                  lineHeight: 1.15,
                  margin: 0
                }}
              >
                NEON SIGN
              </h1>
            </div>

            {/* "from the god" */}
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '3.2rem',
                color: '#ff2a85',
                textShadow: '0 0 6px #ff2a85, 0 0 16px #ff2a85, 0 0 32px rgba(255, 42, 133, 0.7)',
                lineHeight: 1.1,
                transform: 'rotate(-1deg)',
                display: 'inline-block'
              }}
            >
              from the god
            </span>
          </div>

          {/* Subtitle Message */}
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.5,
              color: '#ffffff',
              fontWeight: 500,
              maxWidth: '320px',
              marginBottom: '32px'
            }}
          >
            Your planned events and<br />
            group chats appear here
          </p>

          {/* CREATE Button */}
          <div style={{ width: '100%', maxWidth: '400px', marginBottom: '32px' }}>
            <Button onClick={handleCreate} aria-label="Create - Start Onboarding">
              CREATE
            </Button>
          </div>

          {/* AFTER PARTY Card */}
          <div style={{ width: '100%', maxWidth: '400px', marginTop: 'auto' }}>
            <AfterPartyCard onClick={handleAfterPartyClick} />
          </div>
        </div>
      </main>

      {/* Mobile-only Bottom Navigation */}
      <BottomNavigation activeTab="create" onTabChange={handleTabChange} />

      {/* Account Prompt Bottom Sheet */}
      <AccountPromptSheet
        isOpen={showPromptSheet}
        onClose={() => setShowPromptSheet(false)}
        onGetStarted={() => goToStep('terms')}
      />
    </div>
  );
};
