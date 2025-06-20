import { CheckCircle2, Circle, CircleDot, Clock, XCircle } from 'lucide-react';

type ProgressStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Complete' | 'Available' | 'Not Available';

interface ProfileProgressProps {
  progress: {
    step1: ProgressStatus;
    step2: ProgressStatus;
    step3: ProgressStatus;
  };
}

const Step = ({ name, status }: { name: string; status: ProgressStatus }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'Complete':
      case 'Approved':
        return <CheckCircle2 className="text-green-500" size={20} />;
      case 'In Progress':
      case 'Submitted':
      case 'Available':
        return <CircleDot className="text-blue-500" size={20} />;
      case 'Under Review':
        return <Clock className="text-yellow-500" size={20} />;
      case 'Rejected':
        return <XCircle className="text-red-500" size={20} />;
      case 'Not Started':
      case 'Not Available':
      default:
        return <Circle className="text-gray-400" size={20} />;
    }
  };

  const getStatusTextColor = () => {
     switch (status) {
      case 'Complete':
      case 'Approved':
        return "text-green-500";
      case 'In Progress':
      case 'Submitted':
      case 'Available':
        return "text-blue-500";
      case 'Under Review':
        return "text-yellow-500";
      case 'Rejected':
        return "text-red-500";
      case 'Not Started':
      case 'Not Available':
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-lg">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <span className="text-gray-800 dark:text-light-200">{name}</span>
      </div>
      <span className={`font-medium ${getStatusTextColor()}`}>{status}</span>
    </div>
  );
};

const ProfileProgress = ({ progress }: ProfileProgressProps) => {
  return (
    <div className="space-y-3">
      <Step name="Step 1: Basic Info" status={progress.step1} />
      <Step name="Step 2: Verification" status={progress.step2} />
      <Step name="Step 3: Payment Setup" status={progress.step3} />
    </div>
  );
};

export default ProfileProgress;
