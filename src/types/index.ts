export type WizardStep =
  | 'splash'
  | 'feed'
  | 'landing'
  | 'chat'
  | 'terms'
  | 'email'
  | 'otp'
  | 'username'
  | 'name'
  | 'dob'
  | 'pronouns'
  | 'success'
  | 'profile';

export interface SignupFormData {
  email: string;
  newsletter: boolean;
  otp: string;
  username: string;
  name: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  calculatedAge: number | null;
  pronouns: string[];
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface DateValidationResult {
  isValid: boolean;
  age: number | null;
  error?: string;
}
