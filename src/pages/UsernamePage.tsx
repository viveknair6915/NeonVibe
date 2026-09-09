import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { validateUsername } from '../utils/validation';
import { AlertCircle } from 'lucide-react';

export const UsernamePage: React.FC = () => {
  const { formData, updateFormData, goToStep, goBack, showToast } = useSignupWizard();
  const [username, setUsername] = useState(formData.username);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = () => {
    setHasInteracted(true);
    const result = validateUsername(username);
    if (!result.isValid) {
      setError(result.error || 'Please enter a valid username.');
    } else {
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);

    if (hasInteracted) {
      const result = validateUsername(val);
      if (result.isValid) {
        setError(null);
      } else {
        setError(result.error || null);
      }
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);

    const trimmed = username.trim();
    const result = validateUsername(trimmed);

    if (!result.isValid) {
      setError(result.error || 'Please enter a valid username.');
      showToast(result.error || 'Please enter a valid username.', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    updateFormData({ username: trimmed });
    setIsLoading(false);
    goToStep('name');
  };

  const isFormValid = validateUsername(username).isValid;

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
          Create a username that fits your vibe!
        </h1>

        <form onSubmit={handleNext} noValidate style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ width: '100%', marginBottom: '12px' }}>
            <label
              htmlFor="username-input"
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
              USERNAME
            </label>
            <input
              id="username-input"
              type="text"
              autoComplete="username"
              autoFocus
              placeholder="e.g. viveknair6915"
              value={username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`custom-input ${error ? 'input-error' : ''}`}
              aria-label="Username"
              aria-invalid={!!error}
              aria-describedby={error ? 'username-error' : 'username-helper'}
              style={{
                fontSize: '1.05rem',
                height: '56px',
                borderRadius: '12px'
              }}
            />

            {error && (
              <div id="username-error" className="input-error-text" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <p
            id="username-helper"
            style={{
              fontSize: '0.8125rem',
              lineHeight: 1.45,
              color: '#8e8e93',
              marginBottom: '32px'
            }}
          >
            All your Superlatives and Invites will come your way with this name, so make it unforgettable!
          </p>

          {/* Action Buttons */}
          <div className="screen-footer">
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="SAVING..."
              disabled={!isFormValid || isLoading}
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
        </form>
      </main>
    </div>
  );
};
