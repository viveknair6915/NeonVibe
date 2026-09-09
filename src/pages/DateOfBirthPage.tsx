import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { DatePickerSheet } from '../components/DatePickerSheet';
import { formatDOB } from '../utils/age';
import { Calendar, AlertCircle } from 'lucide-react';

export const DateOfBirthPage: React.FC = () => {
  const { formData, updateFormData, goToStep, goBack, showToast } = useSignupWizard();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { day, month, year } = formData.dateOfBirth;
  const hasDOB = Boolean(day && month && year && formData.calculatedAge !== null);

  const handleConfirmDOB = (d: string, m: string, y: string, age: number) => {
    updateFormData({
      dateOfBirth: { day: d, month: m, year: y },
      calculatedAge: age
    });
    setError(null);
    showToast(`Age verified: ${age} years old`, 'success');
  };

  const handleNext = async () => {
    if (!hasDOB || formData.calculatedAge === null) {
      setError('Please enter your date of birth.');
      setIsSheetOpen(true);
      return;
    }

    if (formData.calculatedAge < 18) {
      setError('You must be 18 or older to continue.');
      showToast('You must be 18 or older to continue.', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsLoading(false);
    goToStep('pronouns');
  };

  const displayText = hasDOB
    ? `${formData.calculatedAge} years old (${formatDOB(day, month, year)})`
    : '';

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
      <header className="screen-header">
        <Logo size="md" />
        <span className="header-status-badge">GETTING READY</span>
      </header>

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
          How many years have you been partying?
        </h1>

        <div style={{ width: '100%', marginBottom: '16px' }}>
          <label
            htmlFor="age-display"
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
            AGE
          </label>

          <div
            id="age-display"
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
            aria-label="Select Date of Birth"
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
                color: hasDOB ? '#ffffff' : '#52525b',
                fontWeight: hasDOB ? 600 : 400
              }}
            >
              {displayText || 'Select your date of birth'}
            </span>
            <Calendar size={18} color="#8e8e93" />
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
          You must be at least 18 years old to join events and connect with extroverts.
        </p>

        <div className="screen-footer">
          <Button
            onClick={handleNext}
            isLoading={isLoading}
            loadingText="SAVING..."
            disabled={!hasDOB || (formData.calculatedAge !== null && formData.calculatedAge < 18) || isLoading}
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

      <DatePickerSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onConfirm={handleConfirmDOB}
        initialDay={day}
        initialMonth={month}
        initialYear={year}
      />
    </div>
  );
};
