import React, { useRef, useEffect } from 'react';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  error = false,
  disabled = false
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  useEffect(() => {
    const firstEmptyIndex = digits.findIndex((d) => !d);
    const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    if (inputsRef.current[targetIndex] && !disabled) {
      inputsRef.current[targetIndex]?.focus();
    }
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;

    const onlyDigits = val.replace(/\D/g, '');
    if (!onlyDigits) return;

    if (onlyDigits.length > 1) {
      handlePastedDigits(onlyDigits);
      return;
    }

    const char = onlyDigits[onlyDigits.length - 1];
    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join('').slice(0, 6);
    onChange(combined);

    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newDigits = [...digits];
      
      if (newDigits[index]) {
        newDigits[index] = '';
        onChange(newDigits.join(''));
      } else if (index > 0) {
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    handlePastedDigits(pasteData);
  };

  const handlePastedDigits = (pasted: string) => {
    const cleaned = pasted.replace(/\D/g, '').slice(0, 6);
    if (cleaned) {
      onChange(cleaned);
      const nextIndex = Math.min(cleaned.length, 5);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
        width: '100%',
        margin: '24px 0 12px 0'
      }}
      role="group"
      aria-label="6-digit verification code"
    >
      {Array.from({ length: 6 }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        return (
          <div
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <input
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digits[index]}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              aria-label={`Digit ${index + 1}`}
              style={{
                width: '100%',
                height: '52px',
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: `2.5px solid ${
                  error
                    ? 'var(--error)'
                    : isFilled
                    ? '#ffffff'
                    : '#383842'
                }`,
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: 700,
                fontFamily: 'var(--font-main)',
                outline: 'none',
                transition: 'border-color 0.2s ease, transform 0.15s ease',
                caretColor: '#ff2a85',
                borderRadius: '0'
              }}
              onFocus={(e) => {
                e.target.select();
                e.target.style.borderBottomColor = 'var(--neon-pink)';
              }}
              onBlur={(e) => {
                e.target.style.borderBottomColor = error
                  ? 'var(--error)'
                  : isFilled
                  ? '#ffffff'
                  : '#383842';
              }}
            />
            {isFilled && (
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: error ? 'var(--error)' : '#ffffff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '12px',
                  pointerEvents: 'none',
                  display: 'none'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
