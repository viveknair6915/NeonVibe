import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { BottomNavigation } from '../components/BottomNavigation';
import { AccountPromptSheet } from '../components/AccountPromptSheet';
import { PassesModal } from '../components/PassesModal';
import { Award, Star, Bell, MessageSquare, Coffee, Clock, Calendar, MapPin, Sparkles, PlusCircle } from 'lucide-react';

export const FeedEventsPage: React.FC = () => {
  const { goToStep, showToast, formData } = useSignupWizard();
  const [showPromptSheet, setShowPromptSheet] = useState(false);
  const [showPassesModal, setShowPassesModal] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<Record<string, boolean>>({});

  const isRegistered = Boolean(formData.username && formData.name);

  const handleJoin = (eventId: string, eventTitle: string) => {
    if (!isRegistered) {
      setShowPromptSheet(true);
    } else {
      const isAlreadyJoined = joinedEvents[eventId];
      setJoinedEvents((prev) => ({ ...prev, [eventId]: !isAlreadyJoined }));
      if (!isAlreadyJoined) {
        showToast(`Joined ${eventTitle}! See you there 🎉`, 'success');
      } else {
        showToast(`Left ${eventTitle}`, 'info');
      }
    }
  };

  const handleTabChange = (tab: 'home' | 'chat' | 'create' | 'profile') => {
    if (tab === 'create') {
      goToStep('landing');
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        color: '#ffffff'
      }}
    >
      {/* Mobile-only Header (Hidden in Website mode via CSS) */}
      <header className="screen-header">
        <Logo size="md" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            onClick={() => setShowPassesModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #3f3f46',
              borderRadius: '9999px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: '#121216'
            }}
            role="button"
            aria-label="View VIP status"
          >
            <span style={{ color: 'var(--neon-yellow)' }}>VIP</span>
            <span>0</span>
          </div>
          <Bell
            size={20}
            color="#ffffff"
            style={{ cursor: 'pointer' }}
            onClick={() => showToast('No new notifications', 'info')}
          />
          <MessageSquare
            size={20}
            color="#ffffff"
            style={{ cursor: 'pointer' }}
            onClick={() => goToStep('chat')}
          />
        </div>
      </header>

      {/* Main Feed Content */}
      <main
        className="screen-content"
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          paddingTop: '8px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Desktop Header Banner */}
        <div
          className="desktop-feed-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '4px'
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
              Live Nightlife &amp; Parties
            </h1>
            <p style={{ color: '#8e8e93', fontSize: '0.9rem', marginTop: '4px' }}>
              Curated social events for extroverts in your city tonight
            </p>
          </div>

          {/* Club Status Pill */}
          <div
            style={{
              backgroundColor: '#111116',
              border: '1px solid #282832',
              borderRadius: '16px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Your Club Status
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                Silver Club Member
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--neon-yellow)', fontWeight: 700 }}>
              <Star size={14} fill="var(--neon-yellow)" />
              <span>20 HVTS TO GOLD</span>
            </div>
          </div>
        </div>

        {/* Action Banner to Host / Create */}
        <div
          className="desktop-feed-action"
          onClick={() => goToStep('landing')}
          style={{
            background: 'linear-gradient(90deg, rgba(255, 42, 133, 0.12) 0%, rgba(181, 55, 242, 0.12) 100%)',
            border: '1px solid rgba(255, 42, 133, 0.25)',
            borderRadius: '14px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, transform 0.15s ease'
          }}
          role="button"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PlusCircle size={22} color="var(--neon-pink)" />
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              Want to host a private party or social hangout? Create your event here
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-pink)', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>HOST EVENT</span>
            <Sparkles size={16} />
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingTop: '8px',
            paddingBottom: '8px',
            flexShrink: 0,
            scrollbarWidth: 'none'
          }}
        >
          {['All Parties', 'Tonight', 'This Weekend', 'VIP Lounges', 'Rooftops', 'Fitness & Social'].map((cat, idx) => (
            <button
              key={cat}
              style={{
                backgroundColor: idx === 0 ? 'rgba(255, 42, 133, 0.15)' : '#121216',
                color: idx === 0 ? 'var(--neon-pink)' : '#a1a1aa',
                border: idx === 0 ? '1px solid var(--neon-pink)' : '1px solid #282832',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onClick={() => showToast(`Filtering by ${cat}`, 'info')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid (3 cols on website, 1 col on mobile) */}
        <div className="events-grid">
          {/* Event Card 1: The Royal Fitness Club (WhatsApp Image 2026-09-08 at 2.59.19 PM (1).jpeg) */}
          <div
            style={{
              backgroundColor: '#0d0d10',
              border: '1px solid #23232a',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            {/* Banner Artwork */}
            <div
              style={{
                height: '160px',
                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #4c0519 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textAlign: 'center',
                padding: '16px',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                THE ROYAL FITNESS CLUB
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '4px' }}>
                Packages &bull; Training &bull; Membership
              </span>
            </div>

            {/* Card Content */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Hi</h2>
                  <span style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>
                    PRIVATE PARTY
                  </span>
                </div>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--badge-silver)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Award size={16} color="#000000" />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '14px 0'
                }}
              >
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#ffffff' }}>
                  @rahulxkumar
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#eab308',
                    color: '#000000',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  <Coffee size={14} />
                  <span>Coffee Break</span>
                </div>
              </div>

              {/* Date & Time Container */}
              <div
                style={{
                  backgroundColor: '#141418',
                  border: '1px solid #22222a',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#8e8e93" /> 2:41 PM
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#8e8e93" /> 03/10/26
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: '#a1a1aa',
                    lineHeight: 1.35
                  }}
                >
                  <MapPin size={14} color="#8e8e93" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>K2 Resto Lounge (Dine Out Cafe And Restaurant Bhopal), Kahjuri Sadak, Kolu ...</span>
                </div>
              </div>

              <button
                onClick={() => handleJoin('event-1', 'The Royal Fitness Club')}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: joinedEvents['event-1'] ? '#16a34a' : '#ffffff',
                  color: joinedEvents['event-1'] ? '#ffffff' : '#000000',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease'
                }}
              >
                {joinedEvents['event-1'] ? 'JOINED ✓' : 'JOIN'}
              </button>
            </div>
          </div>

          {/* Event Card 2: Extroverts Lounge (WhatsApp Image 2026-09-08 at 2.59.19 PM (2).jpeg) */}
          <div
            style={{
              backgroundColor: '#0d0d10',
              border: '1px solid #23232a',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            {/* Banner Artwork */}
            <div
              style={{
                height: '160px',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textAlign: 'center',
                padding: '16px'
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                EXTROVERTS LOUNGE
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '4px' }}>
                Nightlife &bull; Music &bull; Social Vibe
              </span>
            </div>

            {/* Card Content */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Let&apos;s hang out at</h2>
                  <span style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>
                    PRIVATE PARTY
                  </span>
                </div>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--badge-silver)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Award size={16} color="#000000" />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '14px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#ffffff' }}>
                    @punisher_12
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      backgroundColor: '#27272a',
                      color: '#a1a1aa',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    New
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#eab308',
                    color: '#000000',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  <Coffee size={14} />
                  <span>Coffee Break</span>
                </div>
              </div>

              {/* Date & Time Container */}
              <div
                style={{
                  backgroundColor: '#141418',
                  border: '1px solid #22222a',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#8e8e93" /> 12:15 PM
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#8e8e93" /> 25/09/26
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: '#a1a1aa',
                    lineHeight: 1.35
                  }}
                >
                  <MapPin size={14} color="#8e8e93" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Kahaniverse: Cafe In Bhopal | Best Cafe In Bhopal | Aesthetic Cafe In Bhopal, Sh...</span>
                </div>
              </div>

              <button
                onClick={() => handleJoin('event-2', "Let's hang out at")}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: joinedEvents['event-2'] ? '#16a34a' : '#ffffff',
                  color: joinedEvents['event-2'] ? '#ffffff' : '#000000',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease'
                }}
              >
                {joinedEvents['event-2'] ? 'JOINED ✓' : 'JOIN'}
              </button>
            </div>
          </div>

          {/* Event Card 3: Neon Skyline Rooftop Party */}
          <div
            style={{
              backgroundColor: '#0d0d10',
              border: '1px solid #23232a',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div
              style={{
                height: '160px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #082f49 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textAlign: 'center',
                padding: '16px'
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                NEON SKYLINE ROOFTOP
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '4px' }}>
                Deep House &bull; Cocktails &bull; VIP Tables
              </span>
            </div>

            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Skyline Sessions</h2>
                  <span style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>
                    ROOFTOP PARTY
                  </span>
                </div>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--neon-yellow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Star size={16} color="#000000" fill="#000000" />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '14px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#ffffff' }}>
                    @dj_alyssa
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(255, 42, 133, 0.2)',
                      color: 'var(--neon-pink)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    VIP Host
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  <Sparkles size={14} />
                  <span>Rooftop</span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#141418',
                  border: '1px solid #22222a',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#8e8e93" /> 10:00 PM
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#8e8e93" /> Tonight
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: '#a1a1aa',
                    lineHeight: 1.35
                  }}
                >
                  <MapPin size={14} color="#8e8e93" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>The High Roller Rooftop Lounge, Downtown Sky Tower ...</span>
                </div>
              </div>

              <button
                onClick={() => handleJoin('event-3', 'Skyline Sessions')}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: joinedEvents['event-3'] ? '#16a34a' : '#ffffff',
                  color: joinedEvents['event-3'] ? '#ffffff' : '#000000',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease'
                }}
              >
                {joinedEvents['event-3'] ? 'JOINED ✓' : 'JOIN'}
              </button>
            </div>
          </div>

          {/* Event Card 4: Velvet Underground Speakeasy */}
          <div
            style={{
              backgroundColor: '#0d0d10',
              border: '1px solid #23232a',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div
              style={{
                height: '160px',
                background: 'linear-gradient(135deg, #701a75 0%, #4a044e 50%, #2e0236 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textAlign: 'center',
                padding: '16px'
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                VELVET SPEAKEASY
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '4px' }}>
                Techno &bull; Secret Bar &bull; 18+ Only
              </span>
            </div>

            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>After Midnight</h2>
                  <span style={{ fontSize: '0.75rem', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>
                    SECRET PARTY
                  </span>
                </div>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--badge-silver)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Award size={16} color="#000000" />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '14px 0'
                }}
              >
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#ffffff' }}>
                  @marcus_vibe
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#a855f7',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  <Sparkles size={14} />
                  <span>Speakeasy</span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#141418',
                  border: '1px solid #22222a',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#8e8e93" /> 11:30 PM
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#8e8e93" /> Friday
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: '#a1a1aa',
                    lineHeight: 1.35
                  }}
                >
                  <MapPin size={14} color="#8e8e93" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>The Vault Speakeasy, Secret Basement Entrance, 4th Avenue ...</span>
                </div>
              </div>

              <button
                onClick={() => handleJoin('event-4', 'After Midnight')}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: joinedEvents['event-4'] ? '#16a34a' : '#ffffff',
                  color: joinedEvents['event-4'] ? '#ffffff' : '#000000',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease'
                }}
              >
                {joinedEvents['event-4'] ? 'JOINED ✓' : 'JOIN'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile-only Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabChange={handleTabChange} />

      {/* Account Prompt Bottom Sheet */}
      <AccountPromptSheet
        isOpen={showPromptSheet}
        onClose={() => setShowPromptSheet(false)}
        onGetStarted={() => goToStep('terms')}
      />

      {/* Passes VIP Modal */}
      <PassesModal
        isOpen={showPassesModal}
        onClose={() => setShowPassesModal(false)}
        onPurchase={() => showToast('Passes purchased successfully!', 'success')}
        onCreateEvent={() => goToStep('landing')}
      />
    </div>
  );
};
