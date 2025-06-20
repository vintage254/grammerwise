'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ProgressStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Complete' | 'Available' | 'Not Available';

interface ProfileActionsProps {
  progress: {
    step1: ProgressStatus;
    step2: ProgressStatus;
    step3: ProgressStatus;
  };
}

const ProfileActions = ({ progress }: ProfileActionsProps) => {
  const router = useRouter();

  // The main UserProfile component on the homepage ('/') handles showing the correct form
  const handleEditProfileClick = () => {
    router.push('/');
    router.refresh(); // Ensure the server component re-renders to show the right form
  };

  const getEditButtonText = () => {
    if (progress.step1 !== 'Complete') return 'Complete Step 1';
    if (progress.step2 !== 'Approved' && progress.step2 !== 'Complete' && progress.step2 !== 'Under Review' && progress.step2 !== 'Rejected') return 'Complete Step 2';
    if (progress.step2 === 'Approved' && progress.step3 !== 'Complete') return 'Complete Step 3';
    if (progress.step2 === 'Rejected') return 'Re-submit Step 2';
    return 'Edit Profile';
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <Button onClick={handleEditProfileClick} className="flex-1">
        {getEditButtonText()}
      </Button>
      <Link href="/jobs" passHref legacyBehavior>
        <a className="flex-1">
          <Button variant="secondary" className="w-full">
            View Jobs
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default ProfileActions;
