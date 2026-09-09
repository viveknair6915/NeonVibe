import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText,
  disabled,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case 'secondary':
      case 'outline':
        return 'btn-secondary';
      case 'primary':
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      className={`${getButtonClass()} ${className}`}
      disabled={disabled || isLoading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        position: 'relative'
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={`spinner ${variant === 'secondary' ? 'spinner-light' : ''}`} />
          {loadingText ? <span>{loadingText}</span> : children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
