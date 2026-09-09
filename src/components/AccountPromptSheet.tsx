import React from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';

interface AccountPromptSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const AccountPromptSheet: React.FC<AccountPromptSheetProps> = ({
  isOpen,
  onClose,
  onGetStarted
}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="YOU NEED AN ACCOUNT">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.5,
            color: '#d1d1d6',
            textAlign: 'center',
            margin: '8px 0 12px 0'
          }}
        >
          Create an account to join events, earn HVTs, and party with extroverts near you—all for free!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button
            onClick={() => {
              onClose();
              onGetStarted();
            }}
          >
            GET STARTED
          </Button>

          <Button variant="outline" onClick={onClose}>
            MAYBE LATER
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};
