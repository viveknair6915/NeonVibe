import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { validateEmail } from '../utils/validation';
import { ChevronLeft, Check, AlertCircle } from 'lucide-react';

export const EmailPage: React.FC = () => {
  const { formData, updateFormData, goToStep, goBack, showToast } = useSignupWizard();
  const [emailInput, setEmailInput] = useState(formData.email);
  const [newsletter, setNewsletter] = useState(formData.newsletter);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = () => {
    setHasInteracted(true);
    const result = validateEmail(emailInput);
    if (!result.isValid) {
      setError(result.error || 'Please enter a valid email address.');
    } else {
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmailInput(val);

    if (hasInteracted) {
      const result = validateEmail(val);
      if (result.isValid) {
        setError(null);
      } else {
        setError(result.error || null);
      }
    }
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);

    const trimmed = emailInput.trim();
    const result = validateEmail(trimmed);

    if (!result.isValid) {
      setError(result.error || 'Please enter a valid email address.');
      showToast(result.error || 'Please enter a valid email address.', 'error');
      return;
    }

    setIsLoading(true);

    // Simulate sending OTP via API
    await new Promise((resolve) => setTimeout(resolve, 600));

    updateFormData({
      email: trimmed,
      newsletter
    });

    setIsLoading(false);
    showToast(`Verification code sent to ${trimmed}`, 'success');
    goToStep('otp');
  };

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={goBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '6px',
              marginRight: '-4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Go back to Terms"
          >
            <ChevronLeft size={24} />
          </button>
          <Logo size="md" />
        </div>
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
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '28px'
          }}
        >
          Enter your email
        </h1>

        <form onSubmit={handleProceed} noValidate style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Email Input */}
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <input
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="e.g. yourname@gmail.com"
              value={emailInput}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`custom-input ${error ? 'input-error' : ''}`}
              aria-label="Email address"
              aria-invalid={!!error}
              aria-describedby={error ? 'email-error' : undefined}
              style={{
                fontSize: '1.05rem',
                height: '56px',
                borderRadius: '12px'
              }}
            />

            {error && (
              <div id="email-error" className="input-error-text" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* PROCEED Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="SENDING..."
            disabled={isLoading || (hasInteracted && !!error)}
          >
            PROCEED
          </Button>

          {/* Newsletter Checkbox */}
          <div
            onClick={() => setNewsletter(!newsletter)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '24px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            role="checkbox"
            aria-checked={newsletter}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setNewsletter(!newsletter);
              }
            }}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                backgroundColor: newsletter ? '#ffffff' : 'transparent',
                border: `1.5px solid ${newsletter ? '#ffffff' : '#3f3f46'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
            >
              {newsletter && <Check size={14} color="#000000" strokeWidth={3} />}
            </div>
            <span
              style={{
                fontSize: '0.875rem',
                color: '#d1d1d6',
                lineHeight: 1.4
              }}
            >
              I&apos;d like to subscribe to your newsletter
            </span>
          </div>
        </form>
      </main>
    </div>
  );
};
