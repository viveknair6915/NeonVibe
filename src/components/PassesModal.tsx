import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Ticket, Zap, Star, Link as LinkIcon, X, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface PassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: () => void;
  onCreateEvent?: () => void;
}

export const PassesModal: React.FC<PassesModalProps> = ({
  isOpen,
  onClose,
  onPurchase,
  onCreateEvent
}) => {
  const { viewMode, showToast } = useSignupWizard();
  const [selectedTier, setSelectedTier] = useState<'6' | '15' | 'season'>('6');

  if (!isOpen) return null;

  const handlePurchase = (passesCount: string, price: string) => {
    onPurchase?.();
    showToast(`Purchased ${passesCount} VIP Passes for ${price}! Added to your club wallet!`, 'success');
    onClose();
  };

  if (viewMode === 'website') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflowY: 'auto'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="passes-modal-title"
      >
        <div
          className="animate-slide-up"
          style={{
            width: '100%',
            maxWidth: '760px',
            backgroundColor: '#0c0c14',
            borderRadius: '28px',
            border: '1px solid rgba(0, 122, 255, 0.35)',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 112, 243, 0.2)',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '140px',
              background: 'radial-gradient(ellipse at top, rgba(0, 122, 255, 0.35) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            }}
            aria-label="Close passes modal"
          >
            <X size={18} />
          </button>

          <div style={{ padding: '32px 36px 20px 36px', position: 'relative', zIndex: 5 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(0, 122, 255, 0.15)',
                border: '1px solid rgba(0, 122, 255, 0.4)',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#007aff',
                letterSpacing: '0.06em',
                marginBottom: '12px'
              }}
            >
              <Ticket size={14} />
              <span>VIP PASSES &amp; CREW INVITES</span>
            </div>

            <h2
              id="passes-modal-title"
              style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              You have 3 Active Invites!
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginTop: '6px' }}>
              Add your crew to private hangouts, grant priority club access, and earn HVTS rewards.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: '24px',
              padding: '0 36px 36px 36px',
              position: 'relative',
              zIndex: 5
            }}
          >
            <div
              style={{
                backgroundColor: '#101018',
                border: '1px solid #20202c',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                  VIP Pass Privileges
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#e4e4e7' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(0, 122, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LinkIcon size={16} color="#007aff" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>Invite past the limit</div>
                      <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Bring your circle even if general RSVP is full</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#e4e4e7' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(0, 122, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Zap size={16} color="#007aff" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>Instant queue bypass</div>
                      <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Priority entry barcode for all partner clubs</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#e4e4e7' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(255, 230, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Star size={16} color="var(--neon-yellow)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>Earn 2x HVTS Points</div>
                      <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Accelerates your Gold Tier promotion</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#e4e4e7' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(255, 42, 133, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Sparkles size={16} color="var(--neon-pink)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>Host Privileges</div>
                      <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Distribute passes to guests at events you host</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #1c1c24' }}>
                <div style={{ fontSize: '0.8rem', color: '#8e8e93', marginBottom: '10px' }}>
                  Want to host a private event?
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    onCreateEvent?.();
                    onClose();
                  }}
                >
                  HOST EVENT HERE
                </Button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#101018',
                border: '1px solid #20202c',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
                  Purchase Extra Passes
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div
                    onClick={() => setSelectedTier('6')}
                    style={{
                      border: selectedTier === '6' ? '2px solid #007aff' : '1px solid #262634',
                      backgroundColor: selectedTier === '6' ? 'rgba(0, 122, 255, 0.1)' : '#161622',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: selectedTier === '6' ? '5px solid #007aff' : '2px solid #52525b', backgroundColor: '#000000' }} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>6 VIP Passes</div>
                          <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>₹53 per invite &bull; Never expires</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, backgroundColor: '#ffffff', color: '#000000', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          NEW
                        </span>
                        <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#ffffff', marginTop: '2px' }}>
                          ₹320.00
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedTier('15')}
                    style={{
                      border: selectedTier === '15' ? '2px solid #007aff' : '1px solid #262634',
                      backgroundColor: selectedTier === '15' ? 'rgba(0, 122, 255, 0.1)' : '#161622',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: selectedTier === '15' ? '5px solid #007aff' : '2px solid #52525b', backgroundColor: '#000000' }} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>15 VIP Passes</div>
                          <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>₹46 per invite &bull; Save 15%</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, backgroundColor: 'var(--neon-pink)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          POPULAR
                        </span>
                        <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#ffffff', marginTop: '2px' }}>
                          ₹699.00
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedTier('season')}
                    style={{
                      border: selectedTier === 'season' ? '2px solid #007aff' : '1px solid #262634',
                      backgroundColor: selectedTier === 'season' ? 'rgba(0, 122, 255, 0.1)' : '#161622',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: selectedTier === 'season' ? '5px solid #007aff' : '2px solid #52525b', backgroundColor: '#000000' }} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>Season Pass</div>
                          <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Unlimited invites for 3 months</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, backgroundColor: 'var(--neon-yellow)', color: '#000000', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          VIP BEST
                        </span>
                        <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#ffffff', marginTop: '2px' }}>
                          ₹1,499.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Button
                  onClick={() => {
                    const price = selectedTier === '6' ? '₹320.00' : selectedTier === '15' ? '₹699.00' : '₹1,499.00';
                    const count = selectedTier === '6' ? '6' : selectedTier === '15' ? '15' : 'Season';
                    handlePurchase(count, price);
                  }}
                >
                  PURCHASE SELECTED PASSES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        overflowY: 'auto'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="passes-modal-title"
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'linear-gradient(180deg, #18a0fb 0%, #0070f3 15%, #000000 35%, #000000 100%)',
          borderRadius: '24px',
          border: '1px solid #22222a',
          padding: '24px 20px',
          color: '#ffffff',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 112, 243, 0.35)',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close passes modal"
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              marginBottom: '8px'
            }}
          >
            <Ticket size={32} color="#ffffff" />
          </div>
          <h2
            id="passes-modal-title"
            style={{
              fontSize: '1.625rem',
              fontWeight: 900,
              color: '#ffffff',
              margin: 0
            }}
          >
            You have 3 Invites!
          </h2>
        </div>

        <div
          style={{
            backgroundColor: '#0a0a0d',
            borderRadius: '20px',
            border: '1px solid #1f1f26',
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Add your crew with VIP Passes
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d1d1d6' }}>
              <LinkIcon size={18} color="#ffffff" />
              <span>Invite more than the limit</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d1d1d6' }}>
              <Zap size={18} color="#ffffff" />
              <span>Instant access to your folks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d1d1d6' }}>
              <Star size={18} color="#ffffff" />
              <span>Members get more HVTs</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              borderRadius: '14px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px',
                color: '#555555'
              }}
            >
              New
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>6 passes</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>₹320.00</span>
            </div>
          </div>

          <div style={{ fontSize: '0.8125rem', color: '#a1a1aa' }}>
            ₹320.00 for 6 Invites
          </div>

          <Button
            onClick={() => {
              handlePurchase('6', '₹320.00');
            }}
          >
            PURCHASE
          </Button>

          <div style={{ fontSize: '0.75rem', color: '#71717a', textAlign: 'center', marginTop: '4px' }}>
            No of Invites you have: 3
          </div>
          <div style={{ fontSize: '0.75rem', color: '#52525b', textAlign: 'center' }}>
            Six Invites (Extroverts -Party•Hangout•Vibe)
          </div>

          <div style={{ fontSize: '0.8rem', color: '#d1d1d6', textAlign: 'center', marginTop: '6px' }}>
            Invite at events you host
          </div>

          <Button
            variant="outline"
            onClick={() => {
              onCreateEvent?.();
              onClose();
            }}
          >
            CREATE
          </Button>

          <Button variant="secondary" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      </div>
    </div>
  );
};
