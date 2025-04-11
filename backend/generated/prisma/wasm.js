
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
} = require('./runtime/wasm.js')


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
  legacy_id: 'legacy_id',
  cohort_id: 'cohort_id',
  role: 'role',
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
  reviewed_by_user_id: 'reviewed_by_user_id',
  reviewed_at: 'reviewed_at',
  reviewer_comment: 'reviewer_comment',
  is_latest: 'is_latest'
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
    "rootEnvPath": "../../.env",
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// =============================================\n// Define ENUM Types\n// =============================================\n\nenum TaskAssigneeType {\n  all\n  cohort\n  legacy\n}\n\nenum SubmissionStatus {\n  Submitted\n  Approved\n  Rejected\n}\n\n// =============================================\n// Table: legacies\n// =============================================\nmodel Legacy {\n  legacy_id       Int      @id @default(autoincrement())\n  name            String   @unique @db.VarChar(255)\n  location_filter String?  @db.VarChar(255)\n  points          Int      @default(0)\n  created_at      DateTime @default(now())\n  updated_at      DateTime @updatedAt\n\n  users User[] // Relation field\n\n  @@index([points(sort: Desc)], name: \"idx_legacies_points\")\n  @@index([location_filter], name: \"idx_legacies_location\")\n  @@map(\"legacies\")\n}\n\n// =============================================\n// Table: cohorts\n// =============================================\nmodel Cohort {\n  cohort_id  Int      @id @default(autoincrement())\n  name       String   @unique @db.VarChar(100)\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  users User[] // Relation field\n\n  @@map(\"cohorts\")\n}\n\n// =============================================\n// Table: tasks\n// =============================================\nmodel Task {\n  task_id            Int              @id @default(autoincrement())\n  title              String           @db.VarChar(255)\n  description        String?          @db.Text\n  due_date           DateTime?        @db.Date\n  points_on_approval Int              @default(0)\n  assignee_type      TaskAssigneeType\n  assignee_id        Int? // References cohort_id or legacy_id\n  created_at         DateTime         @default(now())\n  updated_at         DateTime         @updatedAt\n\n  submissions TaskSubmission[] // Relation field\n  // Check constraint cannot be directly mapped in Prisma Schema,\n  // It needs to be handled either in the application logic or via a raw SQL migration alteration.\n  // Prisma doesn't support CHECK constraints directly in the schema model definition.\n  // @@check(\"(assignee_type = 'all' AND assignee_id IS NULL) OR (assignee_type != 'all' AND assignee_id IS NOT NULL)\", name: \"check_task_assignee\")\n\n  @@index([assignee_type, assignee_id], name: \"idx_tasks_assignee\")\n  @@map(\"tasks\")\n}\n\n// =============================================\n// Table: users\n// =============================================\nmodel User {\n  user_id             Int      @id @default(autoincrement())\n  firebase_uid        String   @unique @db.VarChar(128)\n  email               String   @db.VarChar(255) // Keep email even if not unique in DB for sync purposes\n  email_verified      Boolean? @default(false)\n  full_name           String?  @db.VarChar(255)\n  profile_picture_url String?  @db.VarChar(512)\n  disabled            Boolean? @default(false)\n  legacy_id           Int?\n  cohort_id           Int?\n  role                String   @default(\"student\") @db.VarChar(50)\n  created_at          DateTime @default(now())\n  updated_at          DateTime @updatedAt\n\n  legacy          Legacy?          @relation(fields: [legacy_id], references: [legacy_id], onDelete: SetNull)\n  cohort          Cohort?          @relation(fields: [cohort_id], references: [cohort_id], onDelete: SetNull)\n  submissions     TaskSubmission[] @relation(\"UserSubmissions\")\n  reviews_by_user TaskSubmission[] @relation(\"ReviewerSubmissions\")\n  // The unique index on firebase_uid is handled by the @unique directive above\n\n  @@index([email], name: \"idx_users_email\")\n  @@map(\"users\")\n}\n\n// =============================================\n// Table: task_submissions\n// =============================================\nmodel TaskSubmission {\n  submission_id       Int              @id @default(autoincrement())\n  task_id             Int\n  user_id             Int\n  status              SubmissionStatus @default(Submitted)\n  submitted_evidence  String?          @db.Text\n  submitted_at        DateTime         @default(now())\n  reviewed_by_user_id Int?\n  reviewed_at         DateTime?\n  reviewer_comment    String?          @db.Text\n  is_latest           Boolean          @default(true)\n\n  task             Task  @relation(fields: [task_id], references: [task_id], onDelete: Cascade)\n  user             User  @relation(\"UserSubmissions\", fields: [user_id], references: [user_id], onDelete: Cascade)\n  reviewed_by_user User? @relation(\"ReviewerSubmissions\", fields: [reviewed_by_user_id], references: [user_id], onDelete: SetNull)\n\n  @@index([task_id], name: \"idx_submissions_task_id\")\n  @@index([user_id], name: \"idx_submissions_user_id\")\n  @@index([reviewed_by_user_id], name: \"idx_submissions_reviewed_by\")\n  @@index([status], name: \"idx_submissions_status\")\n  @@index([user_id, task_id, is_latest(sort: Desc), submitted_at(sort: Desc)], name: \"idx_submissions_user_task_latest\")\n  @@map(\"task_submissions\")\n}\n",
  "inlineSchemaHash": "abc2a06e64843cc994779486ff76cba907f6fc2bec78aa13df0c39c75184ea37",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Legacy\":{\"fields\":[{\"name\":\"legacy_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location_filter\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"points\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"LegacyToUser\"}],\"dbName\":\"legacies\"},\"Cohort\":{\"fields\":[{\"name\":\"cohort_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CohortToUser\"}],\"dbName\":\"cohorts\"},\"Task\":{\"fields\":[{\"name\":\"task_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"due_date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"points_on_approval\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"assignee_type\",\"kind\":\"enum\",\"type\":\"TaskAssigneeType\"},{\"name\":\"assignee_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"submissions\",\"kind\":\"object\",\"type\":\"TaskSubmission\",\"relationName\":\"TaskToTaskSubmission\"}],\"dbName\":\"tasks\"},\"User\":{\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"firebase_uid\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email_verified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"full_name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"profile_picture_url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"disabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"legacy_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"cohort_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"legacy\",\"kind\":\"object\",\"type\":\"Legacy\",\"relationName\":\"LegacyToUser\"},{\"name\":\"cohort\",\"kind\":\"object\",\"type\":\"Cohort\",\"relationName\":\"CohortToUser\"},{\"name\":\"submissions\",\"kind\":\"object\",\"type\":\"TaskSubmission\",\"relationName\":\"UserSubmissions\"},{\"name\":\"reviews_by_user\",\"kind\":\"object\",\"type\":\"TaskSubmission\",\"relationName\":\"ReviewerSubmissions\"}],\"dbName\":\"users\"},\"TaskSubmission\":{\"fields\":[{\"name\":\"submission_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"task_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"SubmissionStatus\"},{\"name\":\"submitted_evidence\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submitted_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviewed_by_user_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"reviewed_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviewer_comment\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"is_latest\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"task\",\"kind\":\"object\",\"type\":\"Task\",\"relationName\":\"TaskToTaskSubmission\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserSubmissions\"},{\"name\":\"reviewed_by_user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReviewerSubmissions\"}],\"dbName\":\"task_submissions\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
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

