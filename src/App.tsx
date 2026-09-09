import React, { useState } from 'react';
import { SignupProvider, useSignupWizard } from './context/SignupContext';
import { ToastContainer } from './components/Toast';
import { DesktopNavbar } from './components/DesktopNavbar';
import { PassesModal } from './components/PassesModal';
import { IntroSplashPage } from './pages/IntroSplashPage';
import { LandingPage } from './pages/LandingPage';
import { FeedEventsPage } from './pages/FeedEventsPage';
import { ChatPage } from './pages/ChatPage';
import { TermsPage } from './pages/TermsPage';
import { EmailPage } from './pages/EmailPage';
import { OTPPage } from './pages/OTPPage';
import { UsernamePage } from './pages/UsernamePage';
import { NamePage } from './pages/NamePage';
import { DateOfBirthPage } from './pages/DateOfBirthPage';
import { PronounsPage } from './pages/PronounsPage';
import { SuccessPage } from './pages/SuccessPage';
import { ProfileDashboardPage } from './pages/ProfileDashboardPage';
import { WizardStep } from './types';
import { Monitor } from 'lucide-react';

const WizardRouter: React.FC = () => {
  const { currentStep, goToStep, viewMode, setViewMode } = useSignupWizard();
  const [isPassesModalOpen, setIsPassesModalOpen] = useState(false);

  const renderStep = () => {
    switch (currentStep) {
      case 'splash':
        return <IntroSplashPage onContinue={() => goToStep('feed')} />;
      case 'feed':
        return <FeedEventsPage />;
      case 'landing':
        return <LandingPage />;
      case 'chat':
        return <ChatPage />;
      case 'terms':
        return <TermsPage />;
      case 'email':
        return <EmailPage />;
      case 'otp':
        return <OTPPage />;
      case 'username':
        return <UsernamePage />;
      case 'name':
        return <NamePage />;
      case 'dob':
        return <DateOfBirthPage />;
      case 'pronouns':
        return <PronounsPage />;
      case 'success':
        return <SuccessPage />;
      case 'profile':
        return <ProfileDashboardPage />;
      default:
        return <IntroSplashPage onContinue={() => goToStep('feed')} />;
    }
  };

  const wizardSteps: WizardStep[] = [
    'terms',
    'email',
    'otp',
    'username',
    'name',
    'dob',
    'pronouns'
  ];
  const isInsideWizard = wizardSteps.includes(currentStep);
  const currentWizardStepIndex = wizardSteps.indexOf(currentStep) + 1;

  const showDesktopNavbar = viewMode === 'website' && currentStep !== 'splash';

  return (
    <div className={viewMode === 'website' ? 'mode-website' : 'mode-mobile'}>
      <div className="desktop-backdrop" />

      {showDesktopNavbar && (
        <div className="desktop-nav-container">
          <DesktopNavbar onOpenPasses={() => setIsPassesModalOpen(true)} />
        </div>
      )}

      {viewMode === 'mobile' && (
        <div className="mobile-simulator-bar">
          <button
            onClick={() => setViewMode('website')}
            className="mobile-exit-btn"
            title="Switch to full desktop website view"
          >
            <Monitor size={15} />
            <span>Switch to Website View</span>
          </button>
        </div>
      )}

      <div className="app-container">
        {isInsideWizard && (
          <div
            className="signup-progress-bar"
            role="progressbar"
            aria-valuenow={currentWizardStepIndex}
            aria-valuemin={1}
            aria-valuemax={wizardSteps.length}
            aria-label={`Step ${currentWizardStepIndex} of ${wizardSteps.length}`}
          >
            <div
              style={{
                height: '100%',
                width: `${(currentWizardStepIndex / wizardSteps.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--neon-pink) 0%, var(--neon-purple) 100%)',
                boxShadow: '0 0 8px var(--neon-pink)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        )}

        <div className="app-page-wrapper">
          {viewMode === 'website' && isInsideWizard ? (
            <div className="wizard-card-wrapper animate-fade-in">
              {renderStep()}
            </div>
          ) : (
            renderStep()
          )}
        </div>

        <ToastContainer />
      </div>

      <PassesModal
        isOpen={isPassesModalOpen}
        onClose={() => setIsPassesModalOpen(false)}
        onCreateEvent={() => goToStep('landing')}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SignupProvider>
      <WizardRouter />
    </SignupProvider>
  );
};

export default App;
