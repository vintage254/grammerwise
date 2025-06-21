'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { User, ShieldCheck, CreditCard } from 'lucide-react';
import ProfileSetupForm from '@/components/ProfileSetupForm';
import VerificationForm from '@/components/VerificationForm';
import PayoutForm from '@/components/PayoutForm';
import { type User as UserSchemaType } from '@/database/schema';

interface ProfileCompletionCardProps {
  user: UserSchemaType;
  initialStep: 'profile' | 'verification' | 'payout';
  progress: {
    isBasicInfoComplete: boolean;
    isVerified: 'complete' | 'pending' | 'incomplete';
  };
}

const NavItem = ({ icon, title, subtitle, isActive, onClick, disabled }: { icon: React.ReactNode; title: string; subtitle: string; isActive: boolean; onClick: () => void; disabled?: boolean; }) => (
  <div className="relative group flex justify-center">
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
      className={`p-3 lg:p-4 rounded-lg transition-all duration-200 ${
        isActive ? 'bg-white/20 shadow-md' : 'bg-white/5 hover:bg-white/10'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
    </button>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 md:left-full md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:translate-x-0 md:ml-4 w-max max-w-xs px-3 py-2 text-sm font-medium text-white bg-dark-400 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-10 text-center md:text-left">
      <p className="font-semibold">{title}</p>
      <p className="text-white/80 text-xs">{subtitle}</p>
      {disabled && (
        <p className="mt-1 text-xs font-semibold text-yellow-400">
          Complete previous steps to unlock
        </p>
      )}
      {/* Desktop Arrow */}
      <div className="hidden md:block absolute top-1/2 -left-1 w-2 h-2 bg-dark-400 transform -translate-y-1/2 rotate-45" />
      {/* Mobile Arrow */}
      <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-400 transform rotate-45" />
    </div>
  </div>
);

const ProfileCompletionCard = ({ user, initialStep, progress }: ProfileCompletionCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeForm = searchParams.get('step') || initialStep;

  const handleNavigation = (step: string) => {
    router.push(`?step=${step}`, { scroll: false });
  };

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'profile':
        return <ProfileSetupForm user={user} />;
      case 'verification':
        return <VerificationForm user={user} />;
      case 'payout':
        return <PayoutForm user={user} />;
      default:
        return <ProfileSetupForm user={user} />;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl shadow-2xl border border-white/10">
      {/* Background and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl"
        style={{ backgroundImage: "url('/images/form2.jpg')" }}
      />
      <div className="absolute inset-0 bg-dark-200/80 backdrop-blur-xl rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Icon Navigation */}
        <div className="flex flex-row items-center justify-around md:flex-col md:justify-start md:items-stretch p-4 md:p-6 gap-4 border-b md:border-b-0 md:border-r border-white/10">
          <NavItem
            icon={<User className="h-5 w-5 lg:h-6 lg:w-6" />}
            title="Step 1: Basic Info"
            subtitle="Provide your personal details"
            isActive={activeForm === 'profile'}
            onClick={() => handleNavigation('profile')}
          />
          <NavItem
            icon={<ShieldCheck className="h-5 w-5 lg:h-6 lg:w-6" />}
            title="Step 2: Verification"
            subtitle="Verify your identity"
            isActive={activeForm === 'verification'}
            onClick={() => handleNavigation('verification')}
            disabled={!progress.isBasicInfoComplete}
          />
          <NavItem
            icon={<CreditCard className="h-5 w-5 lg:h-6 lg:w-6" />}
            title="Step 3: Payout Setup"
            subtitle="Connect your payment account"
            isActive={activeForm === 'payout'}
            onClick={() => handleNavigation('payout')}
            disabled={progress.isVerified !== 'complete'}
          />
        </div>

        {/* Right Form Display */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white/5 min-w-0">
          {renderActiveForm()}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;
