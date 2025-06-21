'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProfileActionsProps {
  progress: {
    isBasicInfoComplete: boolean;
    isVerified: 'complete' | 'pending' | 'incomplete';
    isPaymentSetup: boolean;
  };
}

const ProfileActions = ({ progress }: ProfileActionsProps) => {
  const router = useRouter();

  const handleViewBidsClick = () => {
    router.push('/my-bids');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full">
      <Button
        onClick={handleViewBidsClick}
        className="w-full text-white font-bold bg-white/10 border-2 border-white/20 backdrop-blur-md rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        View Your Bids Status
      </Button>
      <Button
        variant="secondary"
        onClick={() => router.push('/jobs')}
        className="w-full text-dark-100 font-bold bg-accent-500 rounded-full shadow-lg hover:bg-accent-600 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        View Jobs
      </Button>
    </div>
  );
};

export default ProfileActions;
