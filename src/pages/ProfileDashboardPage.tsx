import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { Button } from '../components/Button';
import { PassesModal } from '../components/PassesModal';
import { Flame, Footprints, ArrowRight, Plus, ChevronRight, Award, Ticket, Star, Sparkles } from 'lucide-react';

export const ProfileDashboardPage: React.FC = () => {
  const { formData, resetWizard, showToast, viewMode, goToStep } = useSignupWizard();
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'create' | 'profile'>('profile');
  const [isPassesModalOpen, setIsPassesModalOpen] = useState(false);

  const name = formData.name || 'Vivek';
  const initial = name.charAt(0).toUpperCase();
  const age = formData.calculatedAge || 23;
  const username = formData.username || 'viveknair6915';
  const pronouns = formData.pronouns.length > 0 ? formData.pronouns.join('/') : 'he/him/his';

  const handleTabChange = (tab: 'home' | 'chat' | 'create' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') goToStep('feed');
    else if (tab === 'chat') goToStep('chat');
    else if (tab === 'create') goToStep('landing');
    else if (tab === 'profile') goToStep('profile');
  };

  if (viewMode === 'website') {
    return (
      <div className="website-profile-container animate-fade-in">
        <div
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: '#0d0d12',
            border: '1px solid #23232c',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
          }}
        >
          <div
            style={{
              height: '180px',
              background: 'linear-gradient(135deg, rgba(255, 42, 133, 0.4) 0%, rgba(181, 55, 242, 0.3) 50%, #0d0d12 100%)',
              position: 'relative'
            }}
          />

          <div style={{ padding: '0 36px 28px 36px', marginTop: '-60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '24px',
                  backgroundColor: '#16161e',
                  border: '4px solid #0d0d12',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
                }}
              >
                {initial}
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>{name}</h1>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#a1a1aa' }}>{age}</span>
                  <span style={{ backgroundColor: 'rgba(255, 42, 133, 0.15)', color: 'var(--neon-pink)', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
                    VERIFIED EXTROVERT
                  </span>
                </div>
                <p style={{ color: '#8e8e93', fontSize: '0.95rem', marginTop: '4px', margin: 0 }}>
                  @{username} &bull; <span style={{ color: '#d1d1d6' }}>{pronouns}</span>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setIsPassesModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0, 122, 255, 0.12)',
                  border: '1px solid #007aff',
                  color: '#007aff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <Ticket size={16} />
                <span>3 VIP Invites</span>
              </button>

              <button
                onClick={() => showToast('Profile link copied!', 'success')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1a1a22',
                  border: '1px solid #2d2d38',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={16} color="var(--neon-pink)" />
                <span>Share Profile</span>
              </button>

              <button
                onClick={resetWizard}
                style={{
                  backgroundColor: '#1f1318',
                  border: '1px solid #4a1d2d',
                  color: '#f43f5e',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="website-profile-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: '#0d0d12',
                border: '1px solid #23232c',
                borderRadius: '20px',
                padding: '24px'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                MEMBERSHIP TIER
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Silver Club Member</span>
                <Award size={22} color="var(--badge-silver)" />
              </div>

              <div style={{ width: '100%', height: '8px', backgroundColor: '#1c1c24', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, var(--neon-yellow), #ffaa00)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8e8e93' }}>
                <span>Silver Tier</span>
                <span style={{ color: 'var(--neon-yellow)', fontWeight: 700 }}>20 HVTS TO GOLD</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#0d0d12',
                border: '1px solid #23232c',
                borderRadius: '20px',
                padding: '24px'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                YOUR SUPERLATIVES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ backgroundColor: '#14141c', border: '1px solid #282836', borderRadius: '14px', padding: '16px 8px', textAlign: 'center' }}>
                  <Flame size={26} color="var(--neon-pink)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>Party Starter</div>
                </div>
                <div style={{ backgroundColor: '#14141c', border: '1px solid #282836', borderRadius: '14px', padding: '16px 8px', textAlign: 'center' }}>
                  <Footprints size={26} color="#00d2ff" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>Night Owl</div>
                </div>
                <div style={{ backgroundColor: '#14141c', border: '1px solid #282836', borderRadius: '14px', padding: '16px 8px', textAlign: 'center' }}>
                  <Sparkles size={26} color="var(--neon-yellow)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>Top Vibe</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: '#0d0d12',
                border: '1px solid #23232c',
                borderRadius: '20px',
                padding: '28px'
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '20px' }}>
                Your Memories &amp; Attended Events
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div
                  style={{
                    height: '140px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #ff007f 0%, #ff8c00 60%, #ffd700 100%)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 30px rgba(255, 0, 127, 0.25)'
                  }}
                >
                  Summer Rooftop Opening<br />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, opacity: 0.9 }}>18 Photo Drops</span>
                </div>

                <div
                  onClick={() => goToStep('landing')}
                  style={{
                    height: '140px',
                    borderRadius: '16px',
                    border: '2px dashed #363642',
                    backgroundColor: '#111116',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    gap: '10px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <Plus size={28} color="var(--neon-pink)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Host Another Event</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PassesModal
          isOpen={isPassesModalOpen}
          onClose={() => setIsPassesModalOpen(false)}
          onCreateEvent={() => goToStep('landing')}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <main
        className="screen-content"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      <div
        style={{
          width: '100%',
          height: '200px',
          background: 'linear-gradient(180deg, #2a2a30 0%, #151518 70%, #000000 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <span
          style={{
            fontSize: '9rem',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-main)',
            letterSpacing: '-0.05em',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.6)'
          }}
        >
          {initial}
        </span>
      </div>

      <div style={{ padding: '0 20px', marginTop: '-10px', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px'
              }}
            >
              {name}
              <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#a1a1aa' }}>
                {age}
              </span>
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#8e8e93', marginTop: '4px' }}>
              @{username} <span style={{ marginLeft: '6px' }}>{pronouns}</span>
            </p>
          </div>

          <div
            onClick={() => showToast('Profile sharing link copied!', 'success')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#1c1c22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid #2a2a32'
            }}
            role="button"
            aria-label="Share profile"
          >
            <Sparkles size={18} color="var(--neon-pink)" />
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#8e8e93',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}
          >
            CLUB
          </div>
          <div
            style={{
              backgroundColor: '#101014',
              border: '1px solid #282830',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Bronze Club Member
            </span>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'var(--badge-bronze)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Award size={16} color="#ffffff" />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '10px',
              fontSize: '0.8125rem',
              color: '#d1d1d6',
              fontWeight: 600
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--neon-yellow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Star size={11} color="#000000" fill="#000000" />
            </div>
            <span>50 HVTS TO IVORY CLUB</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid #1a1a20',
            borderBottom: '1px solid #1a1a20',
            padding: '16px 0',
            marginTop: '24px',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>0</div>
            <div style={{ fontSize: '0.7rem', color: '#71717a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              EVENTS
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>0</div>
            <div style={{ fontSize: '0.7rem', color: '#71717a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              SUPERLATIVES
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>0</div>
            <div style={{ fontSize: '0.7rem', color: '#71717a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              HVTS
            </div>
          </div>
        </div>

        <div style={{ marginTop: '28px' }}>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#ffffff',
              textAlign: 'center',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            SUPERLATIVES
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div
              style={{
                height: '95px',
                border: '1.5px dashed #2f2f38',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0b0b0e'
              }}
            >
              <Flame size={24} color="#71717a" />
            </div>
            <div
              style={{
                height: '95px',
                border: '1.5px dashed #2f2f38',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0b0b0e'
              }}
            >
              <Footprints size={24} color="#71717a" />
            </div>
            <div
              style={{
                height: '95px',
                border: '1.5px dashed #2f2f38',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0b0b0e'
              }}
            >
              <ArrowRight size={24} color="#71717a" />
            </div>
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.775rem',
              color: '#71717a',
              marginTop: '12px'
            }}
          >
            No Superlatives awarded to you yet
          </p>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#ffffff',
              textAlign: 'center',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            MEMORIES
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div
              style={{
                height: '120px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #ff007f 0%, #ff8c00 60%, #ffd700 100%)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                lineHeight: 1.25,
                boxShadow: '0 4px 20px rgba(255, 0, 127, 0.3)'
              }}
            >
              Memories<br />show here
            </div>

            <div
              onClick={() => showToast('Event creation opens soon!', 'info')}
              style={{
                height: '120px',
                border: '1.5px dashed #2f2f38',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                backgroundColor: '#0b0b0e'
              }}
              role="button"
              aria-label="Create Event"
            >
              <Plus size={24} color="#8e8e93" />
              <span style={{ fontSize: '0.75rem', color: '#8e8e93', fontWeight: 600 }}>
                Create Event
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#ffffff',
              textAlign: 'center',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            PASSES
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                border: '1.5px dashed #ff9500',
                borderRadius: '14px',
                padding: '16px 18px',
                backgroundColor: '#0a0a0c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => setIsPassesModalOpen(true)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      backgroundColor: '#ff9500',
                      color: '#000000',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 5px',
                      borderRadius: '4px'
                    }}
                  >
                    VIP
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                    VIP Passes
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#8e8e93', margin: '4px 0 0 0' }}>
                  Skip the line at any event
                </p>
              </div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#1a1a20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight size={18} color="#ffffff" />
              </div>
            </div>

            <div
              style={{
                border: '1.5px dashed #007aff',
                borderRadius: '14px',
                padding: '16px 18px',
                backgroundColor: '#0a0a0c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => setIsPassesModalOpen(true)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ticket size={18} color="#007aff" />
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                    Invite Passes
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#8e8e93', margin: '4px 0 0 0' }}>
                  You have 3 invite passes
                </p>
              </div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#1a1a20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight size={18} color="#ffffff" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '10px'
            }}
          >
            Spotlight for Business
          </div>

          <button
            onClick={() => showToast('Spotlight program details opening...', 'info')}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #2b56f5 0%, #7928ca 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.875rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(43, 86, 245, 0.3)'
            }}
          >
            EXTROVERTS SPOTLIGHT
          </button>

          <p style={{ fontSize: '0.75rem', color: '#71717a', marginTop: '8px', lineHeight: 1.4 }}>
            Own a party place in your city? Get it featured turn your party spot into the city hotspot!
          </p>
        </div>

        <div style={{ marginTop: '36px', marginBottom: '32px' }}>
          <Button variant="outline" onClick={resetWizard}>
            LOG OUT / RESTART WIZARD
          </Button>
        </div>
      </div>
    </main>

    <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <PassesModal
        isOpen={isPassesModalOpen}
        onClose={() => setIsPassesModalOpen(false)}
        onPurchase={() => showToast('Passes purchased successfully!', 'success')}
        onCreateEvent={() => showToast('Event creation opening...', 'info')}
      />
    </div>
  );
};
