import { InputHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ width: '100%', marginBottom: '16px' }}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`custom-input ${error ? 'input-error' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined}
          {...props}
        />
        {error ? (
          <div id={`${inputId}-error`} className="input-error-text" role="alert">
            <AlertCircle size={14} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        ) : helperText ? (
          <div
            id={`${inputId}-desc`}
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginTop: '6px',
              lineHeight: 1.4
            }}
          >
            {helperText}
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
