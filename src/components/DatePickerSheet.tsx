import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { validateDOB } from '../utils/age';
import { AlertCircle } from 'lucide-react';

interface DatePickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (day: string, month: string, year: string, age: number) => void;
  initialDay?: string;
  initialMonth?: string;
  initialYear?: string;
}

export const DatePickerSheet: React.FC<DatePickerSheetProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialDay = '',
  initialMonth = '',
  initialYear = ''
}) => {
  const [day, setDay] = useState(initialDay);
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [error, setError] = useState<string | null>(null);

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDay(initialDay);
      setMonth(initialMonth);
      setYear(initialYear);
      setError(null);
      setTimeout(() => {
        dayRef.current?.focus();
      }, 150);
    }
  }, [isOpen, initialDay, initialMonth, initialYear]);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    setError(null);

    if (val.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    setError(null);

    if (val.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
    setError(null);
  };

  const handleKeyDown = (
    field: 'day' | 'month' | 'year',
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace') {
      if (field === 'year' && !year) {
        monthRef.current?.focus();
      } else if (field === 'month' && !month) {
        dayRef.current?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const result = validateDOB(day, month, year);
    if (!result.isValid) {
      setError(result.error || 'Please enter a valid date of birth.');
      return;
    }

    if (result.age !== null) {
      onConfirm(day, month, year, result.age);
      onClose();
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="DATE OF BIRTH">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="dob-day"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              DAY
            </label>
            <input
              id="dob-day"
              ref={dayRef}
              type="text"
              inputMode="numeric"
              placeholder="DD"
              value={day}
              onChange={handleDayChange}
              onKeyDown={(e) => handleKeyDown('day', e)}
              maxLength={2}
              style={{
                width: '100%',
                height: '54px',
                backgroundColor: '#0a0a0c',
                border: `1px solid ${error ? 'var(--error)' : '#2e2e34'}`,
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 600,
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label
              htmlFor="dob-month"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              MONTH
            </label>
            <input
              id="dob-month"
              ref={monthRef}
              type="text"
              inputMode="numeric"
              placeholder="MM"
              value={month}
              onChange={handleMonthChange}
              onKeyDown={(e) => handleKeyDown('month', e)}
              maxLength={2}
              style={{
                width: '100%',
                height: '54px',
                backgroundColor: '#0a0a0c',
                border: `1px solid ${error ? 'var(--error)' : '#2e2e34'}`,
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 600,
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ flex: 1.5 }}>
            <label
              htmlFor="dob-year"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              YEAR
            </label>
            <input
              id="dob-year"
              ref={yearRef}
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              value={year}
              onChange={handleYearChange}
              onKeyDown={(e) => handleKeyDown('year', e)}
              maxLength={4}
              style={{
                width: '100%',
                height: '54px',
                backgroundColor: '#0a0a0c',
                border: `1px solid ${error ? 'var(--error)' : '#2e2e34'}`,
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 600,
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        {error && (
          <div
            className="animate-fade-in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--error)',
              fontSize: '0.84rem',
              backgroundColor: 'var(--error-bg)',
              padding: '10px 14px',
              borderRadius: '10px'
            }}
            role="alert"
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <Button onClick={handleSubmit} style={{ marginTop: '8px' }}>
          PROCEED
        </Button>
      </div>
    </BottomSheet>
  );
};
