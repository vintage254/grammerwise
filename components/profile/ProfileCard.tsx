import ProfileAvatar from "./ProfileAvatar";
import ProfileProgress from "./ProfileProgress";
import ProfileActions from "./ProfileActions";
import ProfileStats from "./ProfileStats";

interface ProfileCardProps {
  user: {
    name: string;
    role: string;
    profilePictureUrl: string;
  };
  stats: {
    worksDone: number;
    avgRating: number;
    reviewsCount: number;
  };
  progress: {
    completionPercentage: number;
    isBasicInfoComplete: boolean;
    isVerified: 'complete' | 'pending' | 'incomplete';
    isPaymentSetup: boolean;
  };
}

const ProfileCard = ({ user, stats, progress }: ProfileCardProps) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/form2.jpg')" }}
      />
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-dark-200/60 backdrop-blur-xl" />

      {/* Content Layer */}
      <div className="relative z-10 p-6 md:p-8 text-white">
        <div className="flex flex-col items-center gap-8">
          {/* Left Side: Avatar and Completion */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <ProfileAvatar 
              imageUrl={user.profilePictureUrl}
              percentage={progress.completionPercentage}
            />
            <p className="text-lg font-semibold text-white/90">Profile: {progress.completionPercentage}% Complete</p>
          </div>

          {/* Right Side: User Info, Stats, and Progress */}
          <div className="w-full space-y-6">
            {/* Enhanced Header */}
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm uppercase tracking-wide">Hello, I'm</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {user.name || 'Valued Tutor'}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-white/80 text-lg">English Tutor</p>
              </div>
            </div>

            {/* Stats Cards */}
            <ProfileStats stats={stats} />
            
            {/* Progress Steps */}
            <ProfileProgress progress={progress} />
            
            {/* Action Buttons */}
            <ProfileActions progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
