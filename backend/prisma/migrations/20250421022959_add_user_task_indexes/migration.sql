-- CreateIndex
CREATE INDEX "idx_tasks_due_date" ON "tasks"("due_date");

-- CreateIndex
CREATE INDEX "idx_users_legacy_id" ON "users"("legacy_id");

-- CreateIndex
CREATE INDEX "idx_users_cohort_id" ON "users"("cohort_id");
