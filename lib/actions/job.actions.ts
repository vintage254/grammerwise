"use server";

import { db } from "@/database/drizzle";
import { jobs, tutorApplications } from "@/database/schema";
import { and, eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface ApplyForJobParams {
  jobId: string;
  tutorId: string;
  coverLetter?: string;
}

export const applyForJob = async (params: ApplyForJobParams) => {
  try {
    const { jobId, tutorId, coverLetter } = params;

    // Check if the job exists and is published
    const job = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, jobId), eq(jobs.isPublished, true)),
    });

    if (!job) {
      return { success: false, error: "This job is not available for applications." };
    }

    // Check if the tutor has already applied
    const existingApplication = await db.query.tutorApplications.findFirst({
        where: and(eq(tutorApplications.jobId, jobId), eq(tutorApplications.tutorId, tutorId))
    });

    if (existingApplication) {
        return { success: false, error: "You have already applied for this job." };
    }

    await db.insert(tutorApplications).values({
      jobId,
      tutorId,
      coverLetter,
      status: "pending",
    });

    revalidatePath("/jobs");
    revalidatePath(`/jobs/${jobId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to apply for job:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
};

export const getTutorApplications = async (tutorId: string) => {
    try {
        const applications = await db.query.tutorApplications.findMany({
            where: eq(tutorApplications.tutorId, tutorId),
            with: {
                job: true, // Include job details with each application
            },
            orderBy: [desc(tutorApplications.createdAt)],
        });

        return { success: true, data: applications };
    } catch (error) {
        console.error("Failed to fetch tutor applications:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}
