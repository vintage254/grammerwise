import { Briefcase, Star } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    worksDone: number;
    avgRating: number | null;
    reviewsCount: number;
  };
}

const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 hover:bg-white/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Briefcase className="text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-white/70 text-sm">Works Done</p>
            <p className="text-white text-xl font-bold">{stats.worksDone} jobs</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 hover:bg-white/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500/20 p-2 rounded-lg">
            <Star className="text-yellow-400" size={20} />
          </div>
          <div>
            <p className="text-white/70 text-sm">Rating</p>
            <p className="text-white text-xl font-bold">
              {stats.reviewsCount > 0 ? `${stats.avgRating?.toFixed(1)} (${stats.reviewsCount})` : 'New'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
