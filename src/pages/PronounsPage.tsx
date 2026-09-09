import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { PronounSelectorSheet } from '../components/PronounSelectorSheet';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const PronounsPage: React.FC = () => {
  const { formData, updateFormData, goToStep, goBack, showToast } = useSignupWizard();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedList = formData.pronouns || [];
  const hasSelected = selectedList.length > 0;

  const handleConfirmPronouns = (newPronouns: string[]) => {
    updateFormData({ pronouns: newPronouns });
    if (newPronouns.length > 0) {
      setError(null);
    }
  };

  const handleNext = async () => {
    if (selectedList.length === 0) {
      setError('Please select at least one pronoun.');
      setIsSheetOpen(true);
      return;
    }

    setIsLoading(true);
    // Simulate final profile generation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    showToast('Profile completed successfully!', 'success');
    goToStep('success');
  };

  const formattedPronouns = selectedList.join('/');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Top Header */}
      <header className="screen-header">
        <Logo size="md" />
        <span className="header-status-badge">GETTING READY</span>
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
          paddingTop: '20px'
        }}
      >
        <h1
          style={{
            fontSize: '1.625rem',
            fontWeight: 800,
            lineHeight: 1.28,
            color: '#ffffff',
            marginBottom: '32px'
          }}
        >
          Which pronouns feel right for you?
        </h1>

        <div style={{ width: '100%', marginBottom: '12px' }}>
          <label
            htmlFor="pronouns-input"
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#8e8e93',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            PRONOUNS
          </label>

          {/* Selector trigger */}
          <div
            id="pronouns-input"
            onClick={() => setIsSheetOpen(true)}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: '#0a0a0c',
              border: `1px solid ${error ? 'var(--error)' : '#2b2b30'}`,
              borderRadius: '12px',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            role="button"
            tabIndex={0}
            aria-label="Select pronouns"
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setIsSheetOpen(true);
              }
            }}
          >
            <span
              style={{
                fontSize: '1.05rem',
                color: hasSelected ? '#ffffff' : '#52525b',
                fontWeight: hasSelected ? 600 : 400
              }}
            >
              {formattedPronouns || 'Select pronouns (e.g. he/him/his)'}
            </span>
            <ChevronDown size={18} color="#8e8e93" />
          </div>

          {error && (
            <div className="input-error-text" role="alert">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <p
          style={{
            fontSize: '0.8125rem',
            lineHeight: 1.45,
            color: '#8e8e93',
            marginBottom: '32px'
          }}
        >
          Select the pronouns that feel right for you.
        </p>

        {/* Action Buttons */}
        <div className="screen-footer">
          <Button
            onClick={handleNext}
            isLoading={isLoading}
            loadingText="SAVING..."
            disabled={!hasSelected || isLoading}
          >
            NEXT
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={goBack}
            disabled={isLoading}
          >
            BACK
          </Button>
        </div>
      </main>

      {/* Pronoun Selector Bottom Sheet */}
      <PronounSelectorSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        selectedPronouns={selectedList}
        onConfirm={handleConfirmPronouns}
      />
    </div>
  );
};
