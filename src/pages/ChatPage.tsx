import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { BottomNavigation } from '../components/BottomNavigation';
import { Send, Search, CheckCheck, ChevronLeft } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  time: string;
  senderName?: string;
}

export const ChatPage: React.FC = () => {
  const { goToStep, viewMode } = useSignupWizard();
  const [activeChatId, setActiveChatId] = useState<string>('chat-1');
  const [isMobileThreadOpen, setIsMobileThreadOpen] = useState<boolean>(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({
    'chat-1': 0,
    'chat-2': 2,
    'chat-3': 0
  });
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'chat-1': [
      { id: '1', sender: 'other', text: 'Hey Vivek! Welcome to The Royal Fitness Club event group!', time: '2:30 PM', senderName: 'Rahul (Host)' },
      { id: '2', sender: 'other', text: 'We reserved the rooftop deck at K2 Resto Lounge. Drinks start at 8:00 PM!', time: '2:32 PM', senderName: 'Rahul (Host)' },
      { id: '3', sender: 'user', text: 'Awesome! Looking forward to meeting everyone tonight.', time: '2:35 PM' }
    ],
    'chat-2': [
      { id: '1', sender: 'other', text: 'Hey everyone, the afterparty kicks off right after the lounge closes!', time: '1:15 PM', senderName: 'Elena' },
      { id: '2', sender: 'other', text: 'Anyone needing VIP guest passes let me know now.', time: '1:20 PM', senderName: 'Elena' }
    ],
    'chat-3': [
      { id: '1', sender: 'other', text: 'Welcome to Extroverts VIP! You have 3 complimentary guest passes active on your account.', time: 'Yesterday', senderName: 'VIP Concierge' }
    ]
  });

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setUnreadCounts((prev) => ({
      ...prev,
      [chatId]: 0
    }));
    setIsMobileThreadOpen(true);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      time: 'Just now'
    };
    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
    setInputMessage('');
  };

  const handleTabChange = (tab: 'home' | 'chat' | 'create' | 'profile') => {
    if (tab === 'home') goToStep('feed');
    else if (tab === 'create') goToStep('landing');
    else if (tab === 'profile') goToStep('profile');
  };

  const conversations = [
    {
      id: 'chat-1',
      name: 'The Royal Fitness Club',
      lastMsg: 'Awesome! Looking forward to meeting everyone...',
      time: '2:35 PM',
      avatar: 'RFC',
      badge: 'Event Chat',
      online: true
    },
    {
      id: 'chat-2',
      name: 'Extroverts Lounge Afterparty',
      lastMsg: 'Elena: Anyone needing VIP guest passes...',
      time: '1:20 PM',
      avatar: 'K2',
      badge: 'Group',
      online: true
    },
    {
      id: 'chat-3',
      name: 'Extroverts VIP Concierge',
      lastMsg: 'Welcome to Extroverts VIP! You have 3 passes...',
      time: 'Yesterday',
      avatar: '⭐',
      badge: 'Official',
      online: false
    }
  ];

  const currentChat = conversations.find((c) => c.id === activeChatId) || conversations[0];
  const currentMessages = messages[activeChatId] || [];
  const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  if (viewMode === 'website') {
    return (
      <div
        className="website-chat-container animate-fade-in"
        style={{
          width: '100%',
          height: '720px',
          display: 'flex',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #23232c',
          backgroundColor: '#0c0c11',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}
      >
        <aside
          style={{
            width: '340px',
            borderRight: '1px solid #1f1f28',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#09090d'
          }}
        >
          <div style={{ padding: '20px', borderBottom: '1px solid #1c1c24' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>Messages &amp; Chats</h2>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: totalUnread > 0 ? 'rgba(255, 42, 133, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                  color: totalUnread > 0 ? 'var(--neon-pink)' : '#22c55e',
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}
              >
                {totalUnread > 0 ? `${totalUnread} UNREAD` : 'ALL READ'}
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#71717a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search event chats..."
                style={{
                  width: '100%',
                  backgroundColor: '#14141a',
                  border: '1px solid #282832',
                  borderRadius: '10px',
                  padding: '9px 12px 9px 36px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((conv) => {
              const unread = unreadCounts[conv.id] || 0;
              const isActive = activeChatId === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectChat(conv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #14141a',
                    backgroundColor: isActive ? 'rgba(255, 42, 133, 0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--neon-pink)' : '3px solid transparent',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#181820', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid #09090d' }} />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {conv.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#71717a' }}>{conv.time}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#a1a1aa', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conv.lastMsg}
                    </p>
                  </div>

                  {unread > 0 && (
                    <div style={{ backgroundColor: 'var(--neon-pink)', color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {unread}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0c0c11' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #1f1f28', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0e0e14' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#181820', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                {currentChat.avatar}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{currentChat.name}</h3>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#22222c', color: '#a1a1aa', padding: '2px 8px', borderRadius: '9999px' }}>
                    {currentChat.badge}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  Active now
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => goToStep('feed')}
                style={{ backgroundColor: 'rgba(255, 42, 133, 0.1)', border: '1px solid var(--neon-pink)', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                View Event Info
              </button>
            </div>
          </div>

          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.sender === 'other' && msg.senderName && (
                  <span style={{ fontSize: '0.725rem', color: '#8e8e93', marginBottom: '4px', marginLeft: '6px' }}>
                    {msg.senderName}
                  </span>
                )}
                <div
                  style={{
                    backgroundColor: msg.sender === 'user' ? 'var(--neon-pink)' : '#181820',
                    color: '#ffffff',
                    padding: '12px 18px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(255, 42, 133, 0.3)' : 'none'
                  }}
                >
                  {msg.text}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#52525b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {msg.time}
                  {msg.sender === 'user' && <CheckCheck size={14} color="var(--neon-pink)" />}
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px 20px', borderTop: '1px solid #1f1f28', backgroundColor: '#09090d', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Message ${currentChat.name}...`}
              style={{
                flex: 1,
                backgroundColor: '#14141a',
                border: '1px solid #282832',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'var(--neon-pink)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(255, 42, 133, 0.4)',
                transition: 'all 0.15s ease'
              }}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isMobileThreadOpen) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#000000',
          color: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <header
          className="screen-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#0a0a0e',
            borderBottom: '1px solid #1c1c24',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setIsMobileThreadOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                cursor: 'pointer'
              }}
              aria-label="Back to messages list"
            >
              <ChevronLeft size={24} />
            </button>

            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#1c1c24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              {currentChat.avatar}
            </div>

            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                {currentChat.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span>Active now</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => goToStep('feed')}
            style={{
              backgroundColor: 'rgba(255, 42, 133, 0.12)',
              border: '1px solid var(--neon-pink)',
              color: 'var(--neon-pink)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Info
          </button>
        </header>

        <main
          className="screen-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.sender === 'other' && msg.senderName && (
                <span style={{ fontSize: '0.7rem', color: '#8e8e93', marginBottom: '3px', marginLeft: '6px' }}>
                  {msg.senderName}
                </span>
              )}
              <div
                style={{
                  backgroundColor: msg.sender === 'user' ? 'var(--neon-pink)' : '#181820',
                  color: '#ffffff',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 3px 16px' : '16px 16px 16px 3px',
                  fontSize: '0.875rem',
                  lineHeight: 1.45,
                  boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(255, 42, 133, 0.3)' : 'none'
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: '0.675rem', color: '#52525b', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {msg.time}
                {msg.sender === 'user' && <CheckCheck size={13} color="var(--neon-pink)" />}
              </span>
            </div>
          ))}
        </main>

        <footer
          style={{
            padding: '12px 14px',
            backgroundColor: '#0a0a0d',
            borderTop: '1px solid #1c1c24',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0
          }}
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${currentChat.name}...`}
            style={{
              flex: 1,
              backgroundColor: '#14141a',
              border: '1px solid #282832',
              borderRadius: '12px',
              padding: '10px 14px',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'var(--neon-pink)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(255, 42, 133, 0.4)'
            }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </footer>
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
        overflow: 'hidden'
      }}
    >
      <header className="screen-header">
        <Logo size="md" />
        <span className="header-status-badge">MESSAGES</span>
      </header>

      <main
        className="screen-content animate-fade-in"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {conversations.map((conv) => {
            const unread = unreadCounts[conv.id] || 0;
            return (
              <div
                key={conv.id}
                onClick={() => handleSelectChat(conv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#111116',
                  border: '1px solid #23232c',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, transform 0.1s ease'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#1c1c24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid #111116' }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>{conv.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#71717a' }}>{conv.time}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#a1a1aa', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conv.lastMsg}
                  </p>
                </div>

                {unread > 0 && (
                  <div style={{ backgroundColor: 'var(--neon-pink)', color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {unread}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <BottomNavigation activeTab="chat" onTabChange={handleTabChange} />
    </div>
  );
};

export default ChatPage;
