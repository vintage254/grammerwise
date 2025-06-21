import Image from 'next/image';

interface ProfileAvatarProps {
  imageUrl: string | null | undefined;
  percentage: number;
}

const ProfileAvatar = ({ imageUrl, percentage }: ProfileAvatarProps) => {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      {/* Gradient-bordered container for the image */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
        <div className="w-full h-full rounded-full bg-dark-200 overflow-hidden">
          <Image
            src={imageUrl || '/icons/user.svg'}
            alt="Profile"
            width={120}
            height={120}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Completion Ring SVG */}
      <div className="absolute inset-0">
        <svg className="w-full h-full transform -rotate-90">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProfileAvatar;
