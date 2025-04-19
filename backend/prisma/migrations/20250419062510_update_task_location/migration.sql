/*
  Warnings:

  - You are about to drop the column `assignee_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `assignee_type` on the `tasks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_tasks_assignee";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "assignee_id",
DROP COLUMN "assignee_type",
ADD COLUMN     "location" VARCHAR(255);

-- DropEnum
DROP TYPE "TaskAssigneeType";

-- CreateIndex
CREATE INDEX "idx_tasks_location" ON "tasks"("location");
