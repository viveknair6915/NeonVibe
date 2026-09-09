import { DateValidationResult } from '../types';

export const calculateAge = (day: number, month: number, year: number): number | null => {
  const birthDate = new Date(year, month - 1, day);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const validateDOB = (
  dayStr: string,
  monthStr: string,
  yearStr: string
): DateValidationResult => {
  const dTrim = dayStr.trim();
  const mTrim = monthStr.trim();
  const yTrim = yearStr.trim();

  if (!dTrim || !mTrim || !yTrim) {
    return {
      isValid: false,
      age: null,
      error: 'Please enter your complete date of birth.'
    };
  }

  const day = parseInt(dTrim, 10);
  const month = parseInt(mTrim, 10);
  const year = parseInt(yTrim, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return {
      isValid: false,
      age: null,
      error: 'Please enter a valid date of birth.'
    };
  }

  // Month check 1-12
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      age: null,
      error: 'Month must be between 01 and 12.'
    };
  }

  // Day check 1-31
  if (day < 1 || day > 31) {
    return {
      isValid: false,
      age: null,
      error: 'Day must be between 01 and 31.'
    };
  }

  // Year check reasonable human span
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return {
      isValid: false,
      age: null,
      error: 'Please enter a valid year.'
    };
  }

  // Exact calendar validity check (e.g. Feb 29, April 31)
  const testDate = new Date(year, month - 1, day);
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day
  ) {
    return {
      isValid: false,
      age: null,
      error: 'Please enter a valid calendar date.'
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (testDate > today) {
    return {
      isValid: false,
      age: null,
      error: 'Please enter a valid date of birth.'
    };
  }

  const age = calculateAge(day, month, year);
  if (age === null || age < 0) {
    return {
      isValid: false,
      age: null,
      error: 'Please enter a valid date of birth.'
    };
  }

  if (age < 18) {
    return {
      isValid: false,
      age,
      error: 'You must be 18 or older to continue.'
    };
  }

  return {
    isValid: true,
    age
  };
};

export const formatDOB = (day: string, month: string, year: string): string => {
  if (!day || !month || !year) return '';
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');
  return `${paddedDay}/${paddedMonth}/${year}`;
};
