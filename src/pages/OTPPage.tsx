import React, { useState, useEffect } from 'react';
import { useSignupWizard } from '../context/SignupContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { OTPInput } from '../components/OTPInput';
import { Info, AlertCircle } from 'lucide-react';

const DEMO_OTP = '123456';

export const OTPPage: React.FC = () => {
  const { formData, updateFormData, goToStep, goBack, showToast } = useSignupWizard();
  const [otp, setOtp] = useState(formData.otp);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  useEffect(() => {
    let timer: number;
    if (resendCountdown > 0) {
      timer = window.setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
    if (error) {
      setError(null);
    }

    if (newOtp.length === 6) {
      verifyCode(newOtp);
    }
  };

  const verifyCode = async (codeToVerify: string) => {
    if (codeToVerify.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 650));

    if (codeToVerify === DEMO_OTP) {
      updateFormData({ otp: codeToVerify });
      setIsVerifying(false);
      showToast('OTP verified successfully!', 'success');
      goToStep('username');
    } else {
      setIsVerifying(false);
      const errMsg = 'Incorrect OTP. Please try again.';
      setError(errMsg);
      showToast(errMsg, 'error');
    }
  };

  const handleResend = () => {
    if (resendCountdown > 0) return;

    setOtp('');
    setError(null);
    setResendCountdown(30);
    showToast(`New OTP sent! (Demo code: ${DEMO_OTP})`, 'info');
  };

  const targetEmail = formData.email || 'your email';

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
      <header className="screen-header" style={{ justifyContent: 'center' }}>
        <Logo size="md" />
      </header>

      <main
        className="screen-content animate-fade-in"
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '24px'
        }}
      >
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}
        >
          ENTER OTP
        </h1>

        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          error={!!error}
          disabled={isVerifying}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '28px'
          }}
        >
          {resendCountdown > 0 ? (
            <span style={{ fontSize: '0.8125rem', color: '#71717a' }}>
              Resend in {resendCountdown}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Resend OTP
            </button>
          )}
        </div>

        {error && (
          <div
            className="input-error-text animate-fade-in"
            style={{ marginBottom: '20px' }}
            role="alert"
          >
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Button
            onClick={() => verifyCode(otp)}
            isLoading={isVerifying}
            loadingText="VERIFYING..."
            disabled={otp.length !== 6 || isVerifying}
          >
            VERIFY
          </Button>

          <Button variant="secondary" onClick={goBack} disabled={isVerifying}>
            GO BACK
          </Button>
        </div>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              color: '#8e8e93',
              fontSize: '0.8125rem',
              lineHeight: 1.45
            }}
          >
            <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>A 6-digit OTP has been sent to {targetEmail}.</span>
          </div>

          <div
            style={{
              backgroundColor: '#131317',
              border: '1px solid #24242c',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.75rem',
              color: 'var(--neon-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Demo verification code: <strong>{DEMO_OTP}</strong></span>
            <button
              onClick={() => handleOtpChange(DEMO_OTP)}
              style={{
                background: 'transparent',
                border: '1px solid var(--neon-yellow)',
                color: 'var(--neon-yellow)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              Fill Demo OTP
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
