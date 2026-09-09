import React from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from './Logo';
import { Smartphone, Monitor, Award, Ticket, User, Sparkles } from 'lucide-react';

interface DesktopNavbarProps {
  onOpenPasses: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ onOpenPasses }) => {
  const { currentStep, goToStep, viewMode, setViewMode, formData } = useSignupWizard();

  const isRegistered = Boolean(formData.username && formData.name);

  return (
    <header className="desktop-navbar">
      {/* Brand & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <div
          onClick={() => goToStep('feed')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <Logo size="md" />
          <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.04em', color: '#ffffff' }}>
            EXTROVERTS
          </span>
        </div>

        {/* Nav links */}
        <nav className="desktop-nav-links" aria-label="Desktop navigation">
          <button
            className={`desktop-nav-link ${currentStep === 'feed' ? 'active' : ''}`}
            onClick={() => goToStep('feed')}
          >
            Explore Events
          </button>
          <button
            className={`desktop-nav-link ${currentStep === 'landing' ? 'active' : ''}`}
            onClick={() => goToStep('landing')}
          >
            Before-Hours
          </button>
          <button
            className={`desktop-nav-link ${currentStep === 'chat' ? 'active' : ''}`}
            onClick={() => goToStep('chat')}
          >
            Messages
          </button>
          <button
            className="desktop-nav-link"
            onClick={onOpenPasses}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Ticket size={16} color="#007aff" />
            <span>VIP &amp; Passes</span>
          </button>
        </nav>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* View Mode Switcher Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#131318',
            border: '1px solid #2a2a34',
            borderRadius: '9999px',
            padding: '3px'
          }}
        >
          <button
            onClick={() => setViewMode('website')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: viewMode === 'website' ? '#ffffff' : 'transparent',
              color: viewMode === 'website' ? '#000000' : '#8e8e93',
              transition: 'all 0.2s ease'
            }}
            title="Full responsive website mode"
          >
            <Monitor size={14} />
            <span>Website</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: viewMode === 'mobile' ? '#ffffff' : 'transparent',
              color: viewMode === 'mobile' ? '#000000' : '#8e8e93',
              transition: 'all 0.2s ease'
            }}
            title="Mobile phone simulation view"
          >
            <Smartphone size={14} />
            <span>Mobile App</span>
          </button>
        </div>

        {/* Club status pill */}
        <div
          className="desktop-status-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#121216',
            border: '1px solid #282830',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          <Award size={16} color="var(--badge-silver)" />
          <span>Silver Member</span>
        </div>

        {/* User profile / Signup CTA */}
        {isRegistered ? (
          <button
            onClick={() => goToStep('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              color: '#000000',
              border: 'none',
              borderRadius: '9999px',
              padding: '7px 16px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <User size={15} />
            <span>{formData.name.split(' ')[0]}</span>
          </button>
        ) : (
          <button
            onClick={() => goToStep('terms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--neon-pink)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(255, 42, 133, 0.4)'
            }}
          >
            <Sparkles size={16} />
            <span>GET STARTED</span>
          </button>
        )}
      </div>
    </header>
  );
};
