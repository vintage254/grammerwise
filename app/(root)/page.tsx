import ProfileCard from "@/components/profile/ProfileCard";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, jobs } from "@/database/schema";
import { eq, desc } from "drizzle-orm";
import JobList from "@/components/JobList";
import CompactHero from '@/components/CompactHero';

const Home = async () => {
  const session = await auth();
  const recentJobs = await db.select().from(jobs).where(eq(jobs.isPublished, true)).orderBy(desc(jobs.createdAt)).limit(3);

  // For guests, show the hero and job list
  if (!session?.user?.id) {
    return (
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CompactHero />
        <JobList title="Recent Jobs" jobs={recentJobs} layout="list" />
      </main>
    );
  }

  // For logged-in users, fetch their full profile
  const userProfile = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userProfile) {
    return <p>Could not load user profile. Please try again later.</p>;
  }

  const completionPercentage = userProfile.profileCompletionPercentage ?? 0;
  const userStatus = userProfile.status;

  // Prepare props for ProfileCard
  const user = {
    name: userProfile.fullName,
    role: userProfile.role ?? 'USER',
    profilePictureUrl: userProfile.profilePictureUrl ?? '/images/default-avatar.png',
  };

  const stats = {
    worksDone: userProfile.works_done ?? 0,
    avgRating: userProfile.avg_rating ?? 0,
    reviewsCount: userProfile.reviews_count ?? 0,
  };

  type VerificationStatus = 'complete' | 'pending' | 'incomplete';

  const getVerificationStatus = (): VerificationStatus => {
    if (userStatus === 'APPROVED') return 'complete';
    if (userStatus === 'PENDING') return 'pending';
    return 'incomplete';
  };

  const progress = {
    completionPercentage: completionPercentage,
    isBasicInfoComplete: completionPercentage >= 33,
    isVerified: getVerificationStatus(),
    isPaymentSetup: completionPercentage >= 100,
  };

  // Determine which form to show initially.
  let initialStep: 'profile' | 'verification' | 'payout' = 'profile';
  if (!progress.isBasicInfoComplete) {
    initialStep = 'profile';
  } else if (progress.isVerified !== 'complete') {
    initialStep = 'verification';
  } else if (!progress.isPaymentSetup) {
    initialStep = 'payout';
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* --- Profile Cards Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-12">
        <div className="lg:col-span-3">
          <ProfileCard user={user} stats={stats} progress={progress} />
        </div>
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-8">
            <ProfileCompletionCard user={userProfile} initialStep={initialStep} progress={progress} />
          </div>
        </div>
      </div>

      {/* --- Compact Hero Section --- */}
      <CompactHero />

      {/* --- Job Listing Section --- */}
      <div>
        <JobList title="Recent Jobs" jobs={recentJobs} layout="list" />
      </div>
    </div>
  );
};

export default Home;
