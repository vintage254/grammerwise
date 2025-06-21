"use server";

import { db } from "@/database/drizzle";
import { bids, jobs } from "@/database/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { and, eq, gte, desc } from "drizzle-orm";

export async function createBid(jobId: string, proposal: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to place a bid." };
  }

  try {
    await db.insert(bids).values({
      jobId,
      tutorId: session.user.id,
      proposal,
    });

    revalidatePath(`/jobs/${jobId}`);
    return { success: true };
  } catch (error) {
    console.error("Error creating bid:", error);
    return { error: "Failed to place bid. Please try again." };
  }
}

export async function getUserBids() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  try {
    const userBids = await db
      .select({
        id: bids.id,
        jobTitle: jobs.title,
        status: bids.status,
        createdAt: bids.createdAt,
        jobDeadline: jobs.deadline,
      })
      .from(bids)
      .leftJoin(jobs, eq(bids.jobId, jobs.id))
      .where(
        and(
          eq(bids.tutorId, session.user.id),
          gte(jobs.deadline, new Date())
        )
      )
      .orderBy(desc(bids.createdAt));

    return userBids;
  } catch (error) {
    console.error("Error fetching user bids:", error);
    return [];
  }
}
