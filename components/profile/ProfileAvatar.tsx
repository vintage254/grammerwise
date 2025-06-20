import Image from 'next/image';

interface ProfileAvatarProps {
  imageUrl: string | null | undefined;
  percentage: number;
}

const ProfileAvatar = ({ imageUrl, percentage }: ProfileAvatarProps) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="8"
          className="stroke-gray-200 dark:stroke-gray-700"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="8"
          className="stroke-blue-500"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <Image
          src={imageUrl || '/icons/user.svg'} 
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
