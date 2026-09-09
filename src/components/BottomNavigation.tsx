import React from 'react';
import { Home, MessageSquare, PlusSquare, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab?: 'home' | 'chat' | 'create' | 'profile';
  onTabChange?: (tab: 'home' | 'chat' | 'create' | 'profile') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'home',
  onTabChange
}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'chat', icon: MessageSquare, label: 'Chats' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'profile', icon: User, label: 'Profile' }
  ] as const;

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        width: '100%',
        height: '64px',
        minHeight: '64px',
        maxHeight: '64px',
        backgroundColor: '#0a0a0c',
        borderTop: '1px solid #1a1a20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 12px',
        position: 'relative',
        flexShrink: 0,
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.7)'
      }}
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isActive ? '#ffffff' : '#6b7280',
              padding: '8px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'color 0.15s ease, transform 0.15s ease'
            }}
            aria-label={tab.label}
          >
            <Icon
              size={24}
              strokeWidth={isActive ? 2.5 : 1.8}
              style={{
                filter: isActive ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))' : 'none'
              }}
            />
          </button>
        );
      })}
    </nav>
  );
};
