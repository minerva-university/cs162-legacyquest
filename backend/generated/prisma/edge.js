
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.LegacyScalarFieldEnum = {
  legacy_id: 'legacy_id',
  name: 'name',
  location_filter: 'location_filter',
  points: 'points',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CohortScalarFieldEnum = {
  cohort_id: 'cohort_id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TaskScalarFieldEnum = {
  task_id: 'task_id',
  title: 'title',
  description: 'description',
  due_date: 'due_date',
  points_on_approval: 'points_on_approval',
  assignee_type: 'assignee_type',
  assignee_id: 'assignee_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.UserScalarFieldEnum = {
  user_id: 'user_id',
  firebase_uid: 'firebase_uid',
  email: 'email',
  email_verified: 'email_verified',
  full_name: 'full_name',
  profile_picture_url: 'profile_picture_url',
  disabled: 'disabled',
  role: 'role',
  legacy_id: 'legacy_id',
  cohort_id: 'cohort_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TaskSubmissionScalarFieldEnum = {
  submission_id: 'submission_id',
  task_id: 'task_id',
  user_id: 'user_id',
  status: 'status',
  submitted_evidence: 'submitted_evidence',
  submitted_at: 'submitted_at',
  is_latest: 'is_latest',
  reviewed_by_user_id: 'reviewed_by_user_id',
  reviewed_at: 'reviewed_at',
  reviewer_comment: 'reviewer_comment'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.TaskAssigneeType = exports.$Enums.TaskAssigneeType = {
  all: 'all',
  cohort: 'cohort',
  legacy: 'legacy'
};

exports.SubmissionStatus = exports.$Enums.SubmissionStatus = {
  Submitted: 'Submitted',
  Approved: 'Approved',
  Rejected: 'Rejected'
};

exports.Prisma.ModelName = {
  Legacy: 'Legacy',
  Cohort: 'Cohort',
  Task: 'Task',
  User: 'User',
  TaskSubmission: 'TaskSubmission'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\adama\\Documents\\Minerva University\\Courses\\Third Year\\Spring 2025 Courses\\CS162\\CS162 Final Project LegcyQuest\\cs162-legacyquest\\backend\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\adama\\Documents\\Minerva University\\Courses\\Third Year\\Spring 2025 Courses\\CS162\\CS162 Final Project LegcyQuest\\cs162-legacyquest\\backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://legacyquest_owner:npg_A3hlRCFXq2Vm@ep-square-math-a68ipd2t-pooler.us-west-2.aws.neon.tech/legacyquest?sslmode=require"
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\n// =============================================================================\n// Schema Configuration\n// =============================================================================\n\ngenerator client {\n  provider        = \"prisma-client-js\" // Specifies Prisma Client for JavaScript/TypeScript\n  previewFeatures = [\"driverAdapters\"] // Enables features like the Neon serverless driver adapter\n  output          = \"../generated/prisma\" // Output directory for the generated Prisma Client\n}\n\ndatasource db {\n  provider = \"postgresql\" // Database provider (PostgreSQL for Neon)\n  url      = env(\"DATABASE_URL\") // Database connection URL from .env file\n}\n\n// =============================================================================\n// ENUM Definitions\n// =============================================================================\n\n/// Defines how a task can be assigned.\nenum TaskAssigneeType {\n  all // Assigned to everyone\n  cohort // Assigned to a specific cohort (using assignee_id)\n  legacy // Assigned to a specific legacy (using assignee_id)\n}\n\n/// Defines the possible statuses for a task submission.\nenum SubmissionStatus {\n  Submitted // Initial status when user submits evidence\n  Approved // Status when a reviewer approves the submission\n  Rejected // Status when a reviewer rejects the submission\n}\n\n// =============================================================================\n// Model: Legacy\n// Represents a \"Legacy\" group within the application.\n// =============================================================================\nmodel Legacy {\n  legacy_id       Int      @id @default(autoincrement()) // Primary key\n  name            String   @unique @db.VarChar(255) // Unique name of the legacy\n  location_filter String?  @db.VarChar(255) // Optional filter for location-based rankings/features\n  points          Int      @default(0) // Total points accumulated by the legacy\n  created_at      DateTime @default(now()) // Timestamp of creation\n  updated_at      DateTime @updatedAt // Timestamp of last update\n\n  // Relation: A Legacy can have many Users.\n  // This is the inverse side of the one-to-many relation with User (legacy field).\n  users User[]\n\n  @@index([points(sort: Desc)], name: \"idx_legacies_points\") // Index for efficient sorting/querying by points\n  @@index([location_filter], name: \"idx_legacies_location\") // Index for filtering by location\n  @@map(\"legacies\") // Maps this model to the \"legacies\" table in the database\n}\n\n// =============================================================================\n// Model: Cohort\n// Represents a user cohort (e.g., based on start date).\n// =============================================================================\nmodel Cohort {\n  cohort_id  Int      @id @default(autoincrement()) // Primary key\n  name       String   @unique @db.VarChar(100) // Unique name of the cohort (e.g., \"M24\")\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  // Relation: A Cohort can have many Users.\n  // Inverse side of the one-to-many relation with User (cohort field).\n  users User[]\n\n  @@map(\"cohorts\")\n}\n\n// =============================================================================\n// Model: Task\n// Represents a task that can be assigned to users.\n// =============================================================================\nmodel Task {\n  task_id            Int              @id @default(autoincrement()) // Primary key\n  title              String           @db.VarChar(255) // Title of the task\n  description        String?          @db.Text // Optional detailed description\n  due_date           DateTime?        @db.Date // Optional due date (Date only, no time)\n  points_on_approval Int              @default(0) // Points awarded when a submission for this task is approved\n  assignee_type      TaskAssigneeType // Type of assignment (all, cohort, legacy)\n  assignee_id        Int? // ID of the cohort or legacy if assignee_type is cohort/legacy; null if 'all'\n  created_at         DateTime         @default(now())\n  updated_at         DateTime         @updatedAt\n\n  // Relation: A Task can have many TaskSubmissions.\n  submissions TaskSubmission[]\n\n  // Note on CHECK constraint for assignee_id based on assignee_type:\n  // Prisma schema doesn't directly support complex CHECK constraints.\n  // This logic (assignee_id MUST be null if type is 'all', MUST NOT be null otherwise)\n  // needs to be enforced either in:\n  // 1. Application logic (before creating/updating tasks).\n  // 2. A raw SQL migration (`ALTER TABLE tasks ADD CONSTRAINT ...`).\n  // @@check(...) // This Prisma syntax is illustrative, not directly supported.\n\n  // Index for efficient querying of tasks based on their assignment\n  @@index([assignee_type, assignee_id], name: \"idx_tasks_assignee\")\n  @@map(\"tasks\")\n}\n\n// =============================================================================\n// Model: User\n// Represents an application user, linking Firebase Auth to local data.\n// =============================================================================\nmodel User {\n  user_id             Int      @id @default(autoincrement()) // Primary key for internal use\n  // --- Authentication & Core Info ---\n  firebase_uid        String   @unique @db.VarChar(128) // **KEY FIELD**: Unique ID from Firebase Authentication. Links this record to Firebase.\n  email               String   @unique @db.VarChar(255) // User's email address (synced from Firebase). Enforced unique.\n  email_verified      Boolean? @default(false) // Whether the email was verified by Firebase.\n  full_name           String?  @db.VarChar(255) // User's full name (synced from Firebase, but preserved on link if exists).\n  profile_picture_url String?  @db.VarChar(512) // URL to the user's profile picture (synced from Firebase).\n  disabled            Boolean? @default(false) // Flag to disable user access (application level).\n  role                String   @default(\"student\") @db.VarChar(50) // Application-specific role (e.g., student, admin, reviewer).\n\n  // --- Application Specific Associations ---\n  legacy_id Int? // Foreign key linking to the Legacy table.\n  cohort_id Int? // Foreign key linking to the Cohort table.\n\n  // --- Timestamps ---\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  // --- Relations ---\n  // Relation: A User belongs to one Legacy (optional).\n  // onDelete: SetNull means if the Legacy is deleted, user.legacy_id becomes null.\n  legacy          Legacy?          @relation(fields: [legacy_id], references: [legacy_id], onDelete: SetNull)\n  // Relation: A User belongs to one Cohort (optional).\n  // onDelete: SetNull means if the Cohort is deleted, user.cohort_id becomes null.\n  cohort          Cohort?          @relation(fields: [cohort_id], references: [cohort_id], onDelete: SetNull)\n  // Relation: A User can have many TaskSubmissions.\n  submissions     TaskSubmission[] @relation(\"UserSubmissions\") // Named relation for clarity\n  // Relation: A User can be the reviewer for many TaskSubmissions.\n  reviews_by_user TaskSubmission[] @relation(\"ReviewerSubmissions\") // Named relation for clarity\n  // Index on email is now automatically created because of @unique\n  // @@index([email], name: \"idx_users_email\") // This index is no longer needed explicitly\n  // Unique index on firebase_uid is automatically created by the @unique directive.\n\n  @@map(\"users\") // Maps to the \"users\" table\n}\n\n// =============================================================================\n// Model: TaskSubmission\n// Represents a user's submission for a specific task.\n// =============================================================================\nmodel TaskSubmission {\n  submission_id      Int              @id @default(autoincrement()) // Primary key\n  // --- Foreign Keys & Core Info ---\n  task_id            Int // Links to the Task being submitted for\n  user_id            Int // Links to the User who made the submission\n  status             SubmissionStatus @default(Submitted) // Current status of the submission\n  submitted_evidence String?          @db.Text // Content of the evidence submitted by the user\n  submitted_at       DateTime         @default(now()) // Timestamp when the submission was created/submitted\n  is_latest          Boolean          @default(true) // Flag to easily identify the most recent submission for a user/task pair\n\n  // --- Review Information ---\n  reviewed_by_user_id Int? // Foreign key linking to the User who reviewed this submission\n  reviewed_at         DateTime? // Timestamp when the review occurred\n  reviewer_comment    String?   @db.Text // Optional comments from the reviewer\n\n  // --- Relations ---\n  // Relation: A Submission belongs to one Task.\n  // onDelete: Cascade means if the Task is deleted, this submission is also deleted.\n  task             Task  @relation(fields: [task_id], references: [task_id], onDelete: Cascade)\n  // Relation: A Submission belongs to one User (the submitter).\n  // onDelete: Cascade means if the User is deleted, this submission is also deleted.\n  user             User  @relation(\"UserSubmissions\", fields: [user_id], references: [user_id], onDelete: Cascade)\n  // Relation: A Submission is reviewed by one User (optional, the reviewer).\n  // onDelete: SetNull means if the reviewer User is deleted, reviewed_by_user_id becomes null.\n  reviewed_by_user User? @relation(\"ReviewerSubmissions\", fields: [reviewed_by_user_id], references: [user_id], onDelete: SetNull)\n\n  // --- Indexes for efficient querying ---\n  @@index([task_id], name: \"idx_submissions_task_id\")\n  @@index([user_id], name: \"idx_submissions_user_id\")\n  @@index([reviewed_by_user_id], name: \"idx_submissions_reviewed_by\")\n  @@index([status], name: \"idx_submissions_status\")\n  // Compound index useful for finding the latest submission for a user/task quickly\n  @@index([user_id, task_id, is_latest(sort: Desc), submitted_at(sort: Desc)], name: \"idx_submissions_user_task_latest\")\n  @@map(\"task_submissions\") // Maps to the \"task_submissions\" table\n}\n",
  "inlineSchemaHash": "8c48760e8dd940f41518122e4e755c6ccf18bec86f3bc9e9523f218a1775d986",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Legacy\":{\"dbName\":\"legacies\",\"schema\":null,\"fields\":[{\"name\":\"legacy_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location_filter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"points\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"LegacyToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Cohort\":{\"dbName\":\"cohorts\",\"schema\":null,\"fields\":[{\"name\":\"cohort_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"CohortToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Task\":{\"dbName\":\"tasks\",\"schema\":null,\"fields\":[{\"name\":\"task_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"due_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"points_on_approval\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignee_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskAssigneeType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignee_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"submissions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskSubmission\",\"nativeType\":null,\"relationName\":\"TaskToTaskSubmission\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":\"users\",\"schema\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firebase_uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"128\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"512\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"disabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"default\":\"student\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"legacy_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cohort_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"legacy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Legacy\",\"nativeType\":null,\"relationName\":\"LegacyToUser\",\"relationFromFields\":[\"legacy_id\"],\"relationToFields\":[\"legacy_id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cohort\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Cohort\",\"nativeType\":null,\"relationName\":\"CohortToUser\",\"relationFromFields\":[\"cohort_id\"],\"relationToFields\":[\"cohort_id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"submissions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskSubmission\",\"nativeType\":null,\"relationName\":\"UserSubmissions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviews_by_user\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TaskSubmission\",\"nativeType\":null,\"relationName\":\"ReviewerSubmissions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TaskSubmission\":{\"dbName\":\"task_submissions\",\"schema\":null,\"fields\":[{\"name\":\"submission_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"task_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SubmissionStatus\",\"nativeType\":null,\"default\":\"Submitted\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"submitted_evidence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"submitted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_latest\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewed_by_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewer_comment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"task\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Task\",\"nativeType\":null,\"relationName\":\"TaskToTaskSubmission\",\"relationFromFields\":[\"task_id\"],\"relationToFields\":[\"task_id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"UserSubmissions\",\"relationFromFields\":[\"user_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewed_by_user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"ReviewerSubmissions\",\"relationFromFields\":[\"reviewed_by_user_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"TaskAssigneeType\":{\"values\":[{\"name\":\"all\",\"dbName\":null},{\"name\":\"cohort\",\"dbName\":null},{\"name\":\"legacy\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Defines how a task can be assigned.\"},\"SubmissionStatus\":{\"values\":[{\"name\":\"Submitted\",\"dbName\":null},{\"name\":\"Approved\",\"dbName\":null},{\"name\":\"Rejected\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Defines the possible statuses for a task submission.\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

