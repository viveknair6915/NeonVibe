import React, { useState } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { validateName } from '../utils/validation';
import { AlertCircle } from 'lucide-react';

export const NamePage: React.FC = () => {
  const { formData, updateFormData, goToStep, goBack, showToast } = useSignupWizard();
  const [name, setName] = useState(formData.name);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = () => {
    setHasInteracted(true);
    const result = validateName(name);
    if (!result.isValid) {
      setError(result.error || 'Please enter your name.');
    } else {
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);

    if (hasInteracted) {
      const result = validateName(val);
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

    const trimmed = name.trim();
    const result = validateName(trimmed);

    if (!result.isValid) {
      setError(result.error || 'Please enter your name.');
      showToast(result.error || 'Please enter your name.', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    updateFormData({ name: trimmed });
    setIsLoading(false);
    goToStep('dob');
  };

  const isFormValid = validateName(name).isValid;

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
          &ldquo;Name, please, for the party check!&rdquo;
        </h1>

        <form onSubmit={handleNext} noValidate style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ width: '100%', marginBottom: '12px' }}>
            <label
              htmlFor="name-input"
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
              NAME
            </label>
            <input
              id="name-input"
              type="text"
              autoComplete="name"
              autoFocus
              placeholder="e.g. Vivek Nair"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`custom-input ${error ? 'input-error' : ''}`}
              aria-label="Name"
              aria-invalid={!!error}
              aria-describedby={error ? 'name-error' : 'name-helper'}
              style={{
                fontSize: '1.05rem',
                height: '56px',
                borderRadius: '12px'
              }}
            />

            {error && (
              <div id="name-error" className="input-error-text" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <p
            id="name-helper"
            style={{
              fontSize: '0.8125rem',
              lineHeight: 1.45,
              color: '#8e8e93',
              marginBottom: '32px'
            }}
          >
            This is the name shown as on members and requests. Cannot be changed later.
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
