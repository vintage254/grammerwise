import { Check, Clock, CreditCard } from 'lucide-react';

interface ProfileProgressProps {
  progress: {
    isBasicInfoComplete: boolean;
    isVerified: 'complete' | 'pending' | 'incomplete';
    isPaymentSetup: boolean;
  };
}

const ProgressStep = ({ icon, title, subtitle, status }: { icon: React.ReactNode; title: string; subtitle: string; status: 'Complete' | 'Under Review' | 'Not Available' }) => {
  const statusStyles = {
    'Complete': 'text-green-400',
    'Under Review': 'text-yellow-400',
    'Not Available': 'text-white/50',
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">{title}</p>
        <p className="text-white/60 text-sm">{subtitle}</p>
      </div>
      <span className={`text-sm font-medium ${statusStyles[status]}`}>{status}</span>
    </div>
  );
};

const ProfileProgress = ({ progress }: ProfileProgressProps) => {
  const getVerificationStatus = () => {
    if (progress.isVerified === 'complete') return 'Complete';
    if (progress.isVerified === 'pending') return 'Under Review';
    return 'Not Available';
  };

  return (
    <div className="space-y-3">
      <ProgressStep
        icon={<Check size={20} className="text-green-400" />}
        title="Step 1: Basic Info"
        subtitle="Profile information"
        status={progress.isBasicInfoComplete ? 'Complete' : 'Not Available'}
      />
      <ProgressStep
        icon={<Clock size={20} className="text-yellow-400" />}
        title="Step 2: Verification"
        subtitle="Identity verification"
        status={getVerificationStatus()}
      />
      <ProgressStep
        icon={<CreditCard size={20} className="text-white/80" />}
        title="Step 3: Payment Setup"
        subtitle="Connect your account"
        status={progress.isPaymentSetup ? 'Complete' : 'Not Available'}
      />
    </div>
  );
};

export default ProfileProgress;
