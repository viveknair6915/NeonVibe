export const validateEmail = (rawEmail: string): { isValid: boolean; error?: string } => {
  const email = rawEmail.trim();
  if (!email) {
    return { isValid: false, error: 'Email is required.' };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  return { isValid: true };
};

export const validateUsername = (rawUsername: string): { isValid: boolean; error?: string } => {
  const username = rawUsername.trim();
  if (!username) {
    return { isValid: false, error: 'Username is required.' };
  }

  if (rawUsername.includes(' ')) {
    return { isValid: false, error: 'Username cannot contain spaces.' };
  }

  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters.' };
  }

  if (username.length > 20) {
    return { isValid: false, error: 'Username must be at most 20 characters.' };
  }

  const validCharRegex = /^[a-zA-Z0-9_]+$/;
  if (!validCharRegex.test(username)) {
    return { isValid: false, error: 'Only letters, numbers, and underscores are allowed.' };
  }

  return { isValid: true };
};

export const validateName = (rawName: string): { isValid: boolean; error?: string } => {
  const name = rawName.trim();
  if (!name) {
    return { isValid: false, error: 'Please enter your name.' };
  }

  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }

  if (name.length > 50) {
    return { isValid: false, error: 'Name must be at most 50 characters.' };
  }

  const nameRegex = /^[a-zA-Z\s.'-]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: 'Please enter a valid name with letters only.' };
  }

  return { isValid: true };
};

export const validateOTP = (otp: string): { isValid: boolean; error?: string } => {
  if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    return { isValid: false, error: 'Please enter a complete 6-digit OTP.' };
  }
  return { isValid: true };
};
