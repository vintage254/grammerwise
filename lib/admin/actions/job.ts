"use server";

import { db } from "@/database/drizzle";
import { jobs, tutorApplications } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Job } from "@/lib/types";

interface CreateJobParams {
  title: string;
  description: string;
  level?: string | null;
  languageFocus?: string | null;
  budget?: string | null;
  isPublished?: boolean | null;
}

// Action to create a new job posting
// Action to get all job postings
export const getJobs = async (): Promise<{ success: true; data: Job[] } | { success: false; message: string; data?: undefined }> => {
  try {
    const allJobs = await db.select().from(jobs);
        return { success: true, data: allJobs as Job[] };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { success: false, message: "Failed to fetch jobs." };
  }
};

export const createJob = async (params: CreateJobParams) => {
  try {
    const newJob = await db.insert(jobs).values(params).returning();
    revalidatePath("/admin/jobs");
    return { success: true, data: newJob[0] };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, message: "Failed to create job." };
  }
};

// Action to approve a tutor's application
export const approveApplication = async (applicationId: string) => {
  try {
    await db
      .update(tutorApplications)
      .set({ status: "approved" })
      .where(eq(tutorApplications.id, applicationId));

    revalidatePath("/admin/applications");
    return { success: true };
  } catch (error) {
    console.error("Error approving application:", error);
    return { success: false, message: "Failed to approve application." };
  }
};

// Action to reject a tutor's application
export const rejectApplication = async (applicationId: string) => {
  try {
    await db
      .update(tutorApplications)
      .set({ status: "rejected" })
      .where(eq(tutorApplications.id, applicationId));

    revalidatePath("/admin/applications");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting application:", error);
    return { success: false, message: "Failed to reject application." };
  }
};
