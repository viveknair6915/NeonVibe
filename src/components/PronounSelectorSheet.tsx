import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { PRONOUN_OPTIONS, MAX_PRONOUNS_ALLOWED } from '../data/pronouns';
import { AlertCircle, Check } from 'lucide-react';

interface PronounSelectorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPronouns: string[];
  onConfirm: (pronouns: string[]) => void;
}

export const PronounSelectorSheet: React.FC<PronounSelectorSheetProps> = ({
  isOpen,
  onClose,
  selectedPronouns,
  onConfirm
}) => {
  const [currentSelected, setCurrentSelected] = useState<string[]>(selectedPronouns);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentSelected(selectedPronouns);
      setWarning(null);
    }
  }, [isOpen, selectedPronouns]);

  const handleToggle = (pronoun: string) => {
    if (currentSelected.includes(pronoun)) {
      setCurrentSelected(currentSelected.filter((p) => p !== pronoun));
      setWarning(null);
    } else {
      if (currentSelected.length >= MAX_PRONOUNS_ALLOWED) {
        setWarning(`Maximum ${MAX_PRONOUNS_ALLOWED} pronouns allowed.`);
        return;
      }
      setCurrentSelected([...currentSelected, pronoun]);
      setWarning(null);
    }
  };

  const handleDone = () => {
    onConfirm(currentSelected);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="SELECT PRONOUNS"
      subtitle={`Select up to ${MAX_PRONOUNS_ALLOWED} (${currentSelected.length}/${MAX_PRONOUNS_ALLOWED} selected)`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {warning && (
          <div
            className="animate-fade-in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--neon-pink)',
              fontSize: '0.8125rem',
              backgroundColor: 'var(--neon-pink-soft)',
              padding: '8px 12px',
              borderRadius: '8px',
              marginBottom: '4px'
            }}
            role="alert"
          >
            <AlertCircle size={14} />
            <span>{warning}</span>
          </div>
        )}

        <div
          style={{
            maxHeight: '340px',
            overflowY: 'auto',
            paddingRight: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
          role="group"
          aria-label="Pronoun options"
        >
          {PRONOUN_OPTIONS.map((item) => {
            const isSelected = currentSelected.includes(item);

            return (
              <div
                key={item}
                onClick={() => handleToggle(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? '#1c1c22' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  userSelect: 'none'
                }}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggle(item);
                  }
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '7px',
                    backgroundColor: isSelected ? '#ffffff' : 'transparent',
                    border: `1.5px solid ${isSelected ? '#ffffff' : '#44444c'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  {isSelected && <Check size={16} color="#000000" strokeWidth={3} />}
                </div>

                <span
                  style={{
                    fontSize: '1.05rem',
                    color: isSelected ? '#ffffff' : '#d1d1d6',
                    fontWeight: isSelected ? 600 : 400
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>

        <Button onClick={handleDone} style={{ marginTop: '16px' }}>
          CONFIRM ({currentSelected.length} SELECTED)
        </Button>
      </div>
    </BottomSheet>
  );
};
