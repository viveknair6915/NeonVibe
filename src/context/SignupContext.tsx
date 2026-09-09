import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WizardStep, SignupFormData, ToastMessage, ToastType } from '../types';

export type ViewMode = 'website' | 'mobile';

interface SignupContextType {
  currentStep: WizardStep;
  viewMode: ViewMode;
  formData: SignupFormData;
  toasts: ToastMessage[];
  isSubmitting: boolean;
  goToStep: (step: WizardStep) => void;
  setViewMode: (mode: ViewMode) => void;
  goNext: () => void;
  goBack: () => void;
  updateFormData: (updates: Partial<SignupFormData>) => void;
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  resetWizard: () => void;
  setIsSubmitting: (loading: boolean) => void;
}

const STORAGE_KEY = 'neonvibe_wizard_v2';

const INITIAL_FORM_DATA: SignupFormData = {
  email: '',
  newsletter: false,
  otp: '',
  username: '',
  name: '',
  dateOfBirth: {
    day: '',
    month: '',
    year: ''
  },
  calculatedAge: null,
  pronouns: []
};

const STEP_ORDER: WizardStep[] = [
  'splash',
  'feed',
  'landing',
  'chat',
  'terms',
  'email',
  'otp',
  'username',
  'name',
  'dob',
  'pronouns',
  'success',
  'profile'
];

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep && STEP_ORDER.includes(parsed.currentStep)) {
          return parsed.currentStep;
        }
      }
    } catch {
    }
    return 'splash';
  });

  const [viewMode, setViewMode] = useState<ViewMode>('website');

  const [formData, setFormData] = useState<SignupFormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) {
          return {
            ...INITIAL_FORM_DATA,
            ...parsed.formData,
            otp: ''
          };
        }
      }
    } catch {
    }
    return INITIAL_FORM_DATA;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentStep,
          formData
        })
      );
    } catch {
    }
  }, [currentStep, formData]);

  const updateFormData = (updates: Partial<SignupFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates
    }));
  };

  const goToStep = (step: WizardStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (currentStep === 'splash') {
      goToStep('feed');
      return;
    }
    if (currentStep === 'feed') {
      goToStep('landing');
      return;
    }
    if (currentStep === 'landing') {
      goToStep('terms');
      return;
    }

    const wizardSequence: WizardStep[] = [
      'terms',
      'email',
      'otp',
      'username',
      'name',
      'dob',
      'pronouns',
      'success',
      'profile'
    ];

    const currentIndex = wizardSequence.indexOf(currentStep);
    if (currentIndex >= 0 && currentIndex < wizardSequence.length - 1) {
      goToStep(wizardSequence[currentIndex + 1]);
    }
  };

  const goBack = () => {
    const wizardSequence: WizardStep[] = [
      'feed',
      'landing',
      'terms',
      'email',
      'otp',
      'username',
      'name',
      'dob',
      'pronouns',
      'success',
      'profile'
    ];

    const currentIndex = wizardSequence.indexOf(currentStep);
    if (currentIndex > 0) {
      goToStep(wizardSequence[currentIndex - 1]);
    } else {
      goToStep('feed');
    }
  };

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetWizard = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep('splash');
    showToast('Reset to opening splash screen', 'info');
  };

  return (
    <SignupContext.Provider
      value={{
        currentStep,
        viewMode,
        formData,
        toasts,
        isSubmitting,
        goToStep,
        setViewMode,
        goNext,
        goBack,
        updateFormData,
        showToast,
        removeToast,
        resetWizard,
        setIsSubmitting
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupWizard = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignupWizard must be used within a SignupProvider');
  }
  return context;
};
