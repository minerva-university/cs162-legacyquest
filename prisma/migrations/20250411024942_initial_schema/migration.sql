-- CreateEnum
CREATE TYPE "TaskAssigneeType" AS ENUM ('all', 'cohort', 'legacy');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('Submitted', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "legacies" (
    "legacy_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon_url" VARCHAR(512),
    "location_filter" VARCHAR(255),
    "points" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legacies_pkey" PRIMARY KEY ("legacy_id")
);

-- CreateTable
CREATE TABLE "cohorts" (
    "cohort_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cohorts_pkey" PRIMARY KEY ("cohort_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "due_date" DATE,
    "points_on_approval" INTEGER NOT NULL DEFAULT 0,
    "assignee_type" "TaskAssigneeType" NOT NULL,
    "assignee_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "firebase_uid" VARCHAR(128) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified" BOOLEAN DEFAULT false,
    "full_name" VARCHAR(255),
    "profile_picture_url" VARCHAR(512),
    "disabled" BOOLEAN DEFAULT false,
    "legacy_id" INTEGER,
    "cohort_id" INTEGER,
    "role" VARCHAR(50) NOT NULL DEFAULT 'student',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "task_submissions" (
    "submission_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'Submitted',
    "submitted_evidence" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_by_user_id" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "reviewer_comment" TEXT,
    "is_latest" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "task_submissions_pkey" PRIMARY KEY ("submission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "legacies_name_key" ON "legacies"("name");

-- CreateIndex
CREATE INDEX "idx_legacies_points" ON "legacies"("points" DESC);

-- CreateIndex
CREATE INDEX "idx_legacies_location" ON "legacies"("location_filter");

-- CreateIndex
CREATE UNIQUE INDEX "cohorts_name_key" ON "cohorts"("name");

-- CreateIndex
CREATE INDEX "idx_tasks_assignee" ON "tasks"("assignee_type", "assignee_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uid_key" ON "users"("firebase_uid");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_submissions_task_id" ON "task_submissions"("task_id");

-- CreateIndex
CREATE INDEX "idx_submissions_user_id" ON "task_submissions"("user_id");

-- CreateIndex
CREATE INDEX "idx_submissions_reviewed_by" ON "task_submissions"("reviewed_by_user_id");

-- CreateIndex
CREATE INDEX "idx_submissions_status" ON "task_submissions"("status");

-- CreateIndex
CREATE INDEX "idx_submissions_user_task_latest" ON "task_submissions"("user_id", "task_id", "is_latest" DESC, "submitted_at" DESC);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_legacy_id_fkey" FOREIGN KEY ("legacy_id") REFERENCES "legacies"("legacy_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cohort_id_fkey" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("cohort_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_submissions" ADD CONSTRAINT "task_submissions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_submissions" ADD CONSTRAINT "task_submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_submissions" ADD CONSTRAINT "task_submissions_reviewed_by_user_id_fkey" FOREIGN KEY ("reviewed_by_user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
