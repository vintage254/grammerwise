"use server";

import { db } from "@/database/drizzle";
import { users, tutorApplications, type User } from "@/database/schema";
import { and, count, eq } from "drizzle-orm";

type ProgressStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Complete' | 'Available' | 'Not Available';

export async function getUserProfileCardData(userId: string) {
  try {
    const userQuery = db.select().from(users).where(eq(users.id, userId));
    
    const jobsQuery = db
      .select({ 
        worksDone: count(tutorApplications.id) 
      })
      .from(tutorApplications)
      .where(and(eq(tutorApplications.tutorId, userId), eq(tutorApplications.status, "approved")));

    const [userData, jobData] = await Promise.all([userQuery, jobsQuery]);

    if (!userData[0]) {
      throw new Error("User not found");
    }

    const user = userData[0];
    const { worksDone } = jobData[0] || { worksDone: 0 };
    const completion = user.profileCompletionPercentage ?? 0;

    // Step 1: Basic Info
    const step1Complete = completion >= 33;

    // Step 2: Verification
    let step2Status: ProgressStatus = 'Not Started';
    if (user.workflow_status === 'pending') {
      step2Status = 'Under Review';
    } else if (user.workflow_status === 'approved') {
      step2Status = 'Approved';
    } else if (user.workflow_status === 'rejected') {
      step2Status = 'Rejected';
    } else if (completion >= 66) {
      step2Status = 'Submitted';
    } else if (completion >= 33) {
      step2Status = 'In Progress';
    }

    // Step 3: Payment Setup
    const step3Complete = completion === 100;
    const step2Approved = step2Status === 'Approved';

    const completionPercentage = 
      (step1Complete ? 40 : 0) +
      (step2Approved ? 40 : 0) +
      (step3Complete ? 20 : 0);

    const progress: { step1: ProgressStatus; step2: ProgressStatus; step3: ProgressStatus } = {
      step1: step1Complete ? 'Complete' : 'In Progress',
      step2: step2Status,
      step3: step3Complete ? 'Complete' : (step2Approved ? 'Available' : 'Not Available'),
    };

    return {
      user: {
        name: user.fullName,
        profilePictureUrl: user.profilePictureUrl,
      },
      stats: {
        worksDone: worksDone || 0,
        avgRating: '0.0',
        reviewsCount: 0,
      },
      progress: {
        completionPercentage,
        ...progress
      },
    };
  } catch (error) {
    console.error("Error fetching profile card data:", error);
    return null;
  }
}

interface UpdateUserParams {
  userId: string;
  values: Partial<User>;
}

export const updateUser = async ({ userId, values }: UpdateUserParams) => {
  try {
    const updatedUser = await db
      .update(users)
      .set(values)
      .where(eq(users.id, userId))
      .returning();

    return { success: true, data: updatedUser[0] };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Could not update user" };
  }
};
