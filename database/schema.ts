import { createId } from "@paralleldrive/cuid2";
import type { InferSelectModel } from "drizzle-orm";
import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
  boolean as pgBoolean,
  foreignKey,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  refNo: text("ref_no").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),

  // Tutor Profile Fields
  profilePictureUrl: text("profile_picture_url"),
  bio: text("bio"),
  educationLevel: text("education_level"),
  yearsOfExperience: integer("years_of_experience"),
  preferredStudentTypes: text("preferred_student_types"), // Stored as JSON string
  teachingSubjects: text("teaching_subjects"), // Stored as JSON string
  teachingCertificateUrl: text("teaching_certificate_url"),
  cvUrl: text("cv_url"),
  governmentIdUrl: text("government_id_url"),
  weeklyAvailability: text("weekly_availability"), // Stored as JSON string
  hourlyRate: integer("hourly_rate"),
  teachingMethods: text("teaching_methods"), // Stored as JSON string
  tutorPolicyAgreement: pgBoolean("tutor_policy_agreement").default(false),
  profileCompletionPercentage: integer("profile_completion_percentage").default(0),
  stripeAccountId: text("stripe_account_id"),

  // Tutor Stats
  works_done: integer("works_done").default(0),
  avg_rating: integer("avg_rating").default(0),
  reviews_count: integer("reviews_count").default(0),

  // Upstash Workflow Tracking
  workflow_status: text("workflow_status").default('pending'),
  last_email_sent: timestamp("last_email_sent", { withTimezone: true }),
  email_attempts: integer("email_attempts").default(0),
  rejection_reason: text("rejection_reason"),
});

export const jobs = pgTable("jobs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  level: varchar("level", { length: 256 }).notNull(),
  budget: varchar("budget", { length: 256 }).notNull(),
  isPublished: pgBoolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  deadline: timestamp("deadline", { withTimezone: true }).notNull(),
});

export const bidStatus = pgEnum("bid_status", ["pending", "approved", "rejected"]);

export const bids = pgTable("bids", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  jobId: text("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  tutorId: uuid("tutor_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  proposal: text("proposal").notNull(),
  status: bidStatus("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type Job = InferSelectModel<typeof jobs>;
export type Bid = InferSelectModel<typeof bids>;
