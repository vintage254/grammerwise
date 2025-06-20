import { getUserProfileCardData } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import ProfileAvatar from "./ProfileAvatar";
import ProfileProgress from "./ProfileProgress";
import ProfileActions from "./ProfileActions";
import { Star } from 'lucide-react';

const ProfileCard = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return <p>Please log in to see your profile.</p>;
  }

  const data = await getUserProfileCardData(session.user.id);

  if (!data) {
    return <p>Could not load profile data.</p>;
  }

  const { user, stats, progress } = data;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-dark-200 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Avatar and Completion */}
        <div className="flex-shrink-0 md:w-1/3 flex flex-col items-center gap-4">
          <ProfileAvatar 
            imageUrl={user.profilePictureUrl}
            percentage={progress.completionPercentage}
          />
          <p className="text-lg font-semibold text-gray-700 dark:text-light-200">Profile: {progress.completionPercentage}% Complete</p>
        </div>

        {/* Right Side: User Info, Stats, and Progress */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Hello, I'm</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{user.name || 'Valued Tutor'}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">English Tutor</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-light-200">
            <div className="bg-gray-50 dark:bg-dark-300 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Works Done</p>
              <p className="text-xl font-semibold">{stats.worksDone} jobs</p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-300 p-4 rounded-lg flex flex-col">
              <p className="text-sm text-gray-500 dark:text-gray-400">Reviews</p>
              {stats.reviewsCount > 0 ? (
                 <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                    <span className="text-xl font-semibold">{stats.avgRating}</span>
                    <span className="text-sm text-gray-500">({stats.reviewsCount} reviews)</span>
                 </div>
              ) : (
                <p className="text-md">No reviews yet</p>
              )}
            </div>
          </div>

          <ProfileProgress progress={progress} />
          
          <ProfileActions progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
