export const dynamic = 'force-dynamic';

import JobList from "@/components/JobList";
import JobsHero from "@/components/JobsHero";
import JobFilter from "@/components/JobFilter";
import { db } from "@/database/drizzle";
import { jobs as jobsTable, bids as bidsTable, Job } from "@/database/schema";
import redis from '@/database/redis';
import { and, desc, gte, lte, sql, eq, notInArray } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

interface JobsPageProps {
  searchParams: {
    budget?: string;
    deadline?: string;
    level?: string;
  };
}

const JobsPage = async ({ searchParams }: JobsPageProps) => {
  const session = await auth();

  if (session?.user?.status !== 'APPROVED') {
    redirect('/?unverified=true');
  }
  const userId = session?.user?.id;

  const budget = searchParams.budget || 'any';
  const deadline = searchParams.deadline || 'all';
  const level = searchParams.level || 'all';
  const cacheKey = `jobs:${budget}:${deadline}:${level}:${userId || 'guest'}`;

  let allJobs: Job[] | null = null;

  try {
    const cachedData = await redis.get<Job[]>(cacheKey);
    if (cachedData) {
      allJobs = cachedData;
    }
  } catch (error) {
    console.error("Redis error:", error);
  }

  if (!allJobs) {
    const conditions = [eq(jobsTable.isPublished, true)];

    if (userId) {
      const userBidsQuery = db
        .select({ jobId: bidsTable.jobId })
        .from(bidsTable)
        .where(eq(bidsTable.tutorId, userId));
      
      conditions.push(notInArray(jobsTable.id, userBidsQuery));
    }

    if (searchParams.budget) {
      conditions.push(sql`budget ilike ${'%' + searchParams.budget + '%'}`);
    }

    if (searchParams.deadline && searchParams.deadline !== 'all') {
      const now = new Date();
      if (searchParams.deadline === 'soon') {
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        conditions.push(and(gte(jobsTable.deadline, now), lte(jobsTable.deadline, sevenDaysFromNow))!);
      } else if (searchParams.deadline === 'new') {
        const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        conditions.push(gte(jobsTable.createdAt, threeDaysAgo));
      }
    }

    if (searchParams.level && searchParams.level !== 'all') {
      conditions.push(eq(jobsTable.level, searchParams.level));
    }

    const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0];

    allJobs = await db
      .select()
      .from(jobsTable)
      .where(whereClause)
      .orderBy(desc(jobsTable.createdAt));

    try {
      const twoDaysInSeconds = 2 * 24 * 60 * 60;
      await redis.set(cacheKey, JSON.stringify(allJobs), { ex: twoDaysInSeconds });
    } catch (error) {
      console.error("Redis set error:", error);
    }
  }

  return (
    <>
      <JobsHero />
      <main className="container py-12">
        <JobFilter />
        <JobList jobs={allJobs} title="All Available Jobs" />
      </main>
    </>
  );
};

export default JobsPage;
