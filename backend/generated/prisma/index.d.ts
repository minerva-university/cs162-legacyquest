
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Legacy
 * 
 */
export type Legacy = $Result.DefaultSelection<Prisma.$LegacyPayload>
/**
 * Model Cohort
 * 
 */
export type Cohort = $Result.DefaultSelection<Prisma.$CohortPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TaskSubmission
 * 
 */
export type TaskSubmission = $Result.DefaultSelection<Prisma.$TaskSubmissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TaskAssigneeType: {
  all: 'all',
  cohort: 'cohort',
  legacy: 'legacy'
};

export type TaskAssigneeType = (typeof TaskAssigneeType)[keyof typeof TaskAssigneeType]


export const SubmissionStatus: {
  Submitted: 'Submitted',
  Approved: 'Approved',
  Rejected: 'Rejected'
};

export type SubmissionStatus = (typeof SubmissionStatus)[keyof typeof SubmissionStatus]

}

export type TaskAssigneeType = $Enums.TaskAssigneeType

export const TaskAssigneeType: typeof $Enums.TaskAssigneeType

export type SubmissionStatus = $Enums.SubmissionStatus

export const SubmissionStatus: typeof $Enums.SubmissionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Legacies
 * const legacies = await prisma.legacy.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Legacies
   * const legacies = await prisma.legacy.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.legacy`: Exposes CRUD operations for the **Legacy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Legacies
    * const legacies = await prisma.legacy.findMany()
    * ```
    */
  get legacy(): Prisma.LegacyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cohort`: Exposes CRUD operations for the **Cohort** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cohorts
    * const cohorts = await prisma.cohort.findMany()
    * ```
    */
  get cohort(): Prisma.CohortDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskSubmission`: Exposes CRUD operations for the **TaskSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskSubmissions
    * const taskSubmissions = await prisma.taskSubmission.findMany()
    * ```
    */
  get taskSubmission(): Prisma.TaskSubmissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Legacy: 'Legacy',
    Cohort: 'Cohort',
    Task: 'Task',
    User: 'User',
    TaskSubmission: 'TaskSubmission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "legacy" | "cohort" | "task" | "user" | "taskSubmission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Legacy: {
        payload: Prisma.$LegacyPayload<ExtArgs>
        fields: Prisma.LegacyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LegacyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LegacyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>
          }
          findFirst: {
            args: Prisma.LegacyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LegacyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>
          }
          findMany: {
            args: Prisma.LegacyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>[]
          }
          create: {
            args: Prisma.LegacyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>
          }
          createMany: {
            args: Prisma.LegacyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LegacyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>[]
          }
          delete: {
            args: Prisma.LegacyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>
          }
          update: {
            args: Prisma.LegacyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>
          }
          deleteMany: {
            args: Prisma.LegacyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LegacyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LegacyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>[]
          }
          upsert: {
            args: Prisma.LegacyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyPayload>
          }
          aggregate: {
            args: Prisma.LegacyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLegacy>
          }
          groupBy: {
            args: Prisma.LegacyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LegacyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LegacyCountArgs<ExtArgs>
            result: $Utils.Optional<LegacyCountAggregateOutputType> | number
          }
        }
      }
      Cohort: {
        payload: Prisma.$CohortPayload<ExtArgs>
        fields: Prisma.CohortFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CohortFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CohortFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>
          }
          findFirst: {
            args: Prisma.CohortFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CohortFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>
          }
          findMany: {
            args: Prisma.CohortFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>[]
          }
          create: {
            args: Prisma.CohortCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>
          }
          createMany: {
            args: Prisma.CohortCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CohortCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>[]
          }
          delete: {
            args: Prisma.CohortDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>
          }
          update: {
            args: Prisma.CohortUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>
          }
          deleteMany: {
            args: Prisma.CohortDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CohortUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CohortUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>[]
          }
          upsert: {
            args: Prisma.CohortUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CohortPayload>
          }
          aggregate: {
            args: Prisma.CohortAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCohort>
          }
          groupBy: {
            args: Prisma.CohortGroupByArgs<ExtArgs>
            result: $Utils.Optional<CohortGroupByOutputType>[]
          }
          count: {
            args: Prisma.CohortCountArgs<ExtArgs>
            result: $Utils.Optional<CohortCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TaskSubmission: {
        payload: Prisma.$TaskSubmissionPayload<ExtArgs>
        fields: Prisma.TaskSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>
          }
          findFirst: {
            args: Prisma.TaskSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>
          }
          findMany: {
            args: Prisma.TaskSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>[]
          }
          create: {
            args: Prisma.TaskSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>
          }
          createMany: {
            args: Prisma.TaskSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>[]
          }
          delete: {
            args: Prisma.TaskSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>
          }
          update: {
            args: Prisma.TaskSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.TaskSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.TaskSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskSubmissionPayload>
          }
          aggregate: {
            args: Prisma.TaskSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskSubmission>
          }
          groupBy: {
            args: Prisma.TaskSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<TaskSubmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    legacy?: LegacyOmit
    cohort?: CohortOmit
    task?: TaskOmit
    user?: UserOmit
    taskSubmission?: TaskSubmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LegacyCountOutputType
   */

  export type LegacyCountOutputType = {
    users: number
  }

  export type LegacyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | LegacyCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * LegacyCountOutputType without action
   */
  export type LegacyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyCountOutputType
     */
    select?: LegacyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LegacyCountOutputType without action
   */
  export type LegacyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type CohortCountOutputType
   */

  export type CohortCountOutputType = {
    users: number
  }

  export type CohortCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CohortCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * CohortCountOutputType without action
   */
  export type CohortCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CohortCountOutputType
     */
    select?: CohortCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CohortCountOutputType without action
   */
  export type CohortCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    submissions: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | TaskCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskSubmissionWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submissions: number
    reviews_by_user: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    reviews_by_user?: boolean | UserCountOutputTypeCountReviews_by_userArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskSubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviews_by_userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskSubmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Legacy
   */

  export type AggregateLegacy = {
    _count: LegacyCountAggregateOutputType | null
    _avg: LegacyAvgAggregateOutputType | null
    _sum: LegacySumAggregateOutputType | null
    _min: LegacyMinAggregateOutputType | null
    _max: LegacyMaxAggregateOutputType | null
  }

  export type LegacyAvgAggregateOutputType = {
    legacy_id: number | null
    points: number | null
  }

  export type LegacySumAggregateOutputType = {
    legacy_id: number | null
    points: number | null
  }

  export type LegacyMinAggregateOutputType = {
    legacy_id: number | null
    name: string | null
    location_filter: string | null
    points: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LegacyMaxAggregateOutputType = {
    legacy_id: number | null
    name: string | null
    location_filter: string | null
    points: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LegacyCountAggregateOutputType = {
    legacy_id: number
    name: number
    location_filter: number
    points: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LegacyAvgAggregateInputType = {
    legacy_id?: true
    points?: true
  }

  export type LegacySumAggregateInputType = {
    legacy_id?: true
    points?: true
  }

  export type LegacyMinAggregateInputType = {
    legacy_id?: true
    name?: true
    location_filter?: true
    points?: true
    created_at?: true
    updated_at?: true
  }

  export type LegacyMaxAggregateInputType = {
    legacy_id?: true
    name?: true
    location_filter?: true
    points?: true
    created_at?: true
    updated_at?: true
  }

  export type LegacyCountAggregateInputType = {
    legacy_id?: true
    name?: true
    location_filter?: true
    points?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LegacyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Legacy to aggregate.
     */
    where?: LegacyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Legacies to fetch.
     */
    orderBy?: LegacyOrderByWithRelationInput | LegacyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LegacyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Legacies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Legacies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Legacies
    **/
    _count?: true | LegacyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LegacyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LegacySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LegacyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LegacyMaxAggregateInputType
  }

  export type GetLegacyAggregateType<T extends LegacyAggregateArgs> = {
        [P in keyof T & keyof AggregateLegacy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLegacy[P]>
      : GetScalarType<T[P], AggregateLegacy[P]>
  }




  export type LegacyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LegacyWhereInput
    orderBy?: LegacyOrderByWithAggregationInput | LegacyOrderByWithAggregationInput[]
    by: LegacyScalarFieldEnum[] | LegacyScalarFieldEnum
    having?: LegacyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LegacyCountAggregateInputType | true
    _avg?: LegacyAvgAggregateInputType
    _sum?: LegacySumAggregateInputType
    _min?: LegacyMinAggregateInputType
    _max?: LegacyMaxAggregateInputType
  }

  export type LegacyGroupByOutputType = {
    legacy_id: number
    name: string
    location_filter: string | null
    points: number
    created_at: Date
    updated_at: Date
    _count: LegacyCountAggregateOutputType | null
    _avg: LegacyAvgAggregateOutputType | null
    _sum: LegacySumAggregateOutputType | null
    _min: LegacyMinAggregateOutputType | null
    _max: LegacyMaxAggregateOutputType | null
  }

  type GetLegacyGroupByPayload<T extends LegacyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LegacyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LegacyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LegacyGroupByOutputType[P]>
            : GetScalarType<T[P], LegacyGroupByOutputType[P]>
        }
      >
    >


  export type LegacySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    legacy_id?: boolean
    name?: boolean
    location_filter?: boolean
    points?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | Legacy$usersArgs<ExtArgs>
    _count?: boolean | LegacyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["legacy"]>

  export type LegacySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    legacy_id?: boolean
    name?: boolean
    location_filter?: boolean
    points?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["legacy"]>

  export type LegacySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    legacy_id?: boolean
    name?: boolean
    location_filter?: boolean
    points?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["legacy"]>

  export type LegacySelectScalar = {
    legacy_id?: boolean
    name?: boolean
    location_filter?: boolean
    points?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LegacyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"legacy_id" | "name" | "location_filter" | "points" | "created_at" | "updated_at", ExtArgs["result"]["legacy"]>
  export type LegacyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Legacy$usersArgs<ExtArgs>
    _count?: boolean | LegacyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LegacyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LegacyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LegacyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Legacy"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      legacy_id: number
      name: string
      location_filter: string | null
      points: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["legacy"]>
    composites: {}
  }

  type LegacyGetPayload<S extends boolean | null | undefined | LegacyDefaultArgs> = $Result.GetResult<Prisma.$LegacyPayload, S>

  type LegacyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LegacyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LegacyCountAggregateInputType | true
    }

  export interface LegacyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Legacy'], meta: { name: 'Legacy' } }
    /**
     * Find zero or one Legacy that matches the filter.
     * @param {LegacyFindUniqueArgs} args - Arguments to find a Legacy
     * @example
     * // Get one Legacy
     * const legacy = await prisma.legacy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LegacyFindUniqueArgs>(args: SelectSubset<T, LegacyFindUniqueArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Legacy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LegacyFindUniqueOrThrowArgs} args - Arguments to find a Legacy
     * @example
     * // Get one Legacy
     * const legacy = await prisma.legacy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LegacyFindUniqueOrThrowArgs>(args: SelectSubset<T, LegacyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Legacy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyFindFirstArgs} args - Arguments to find a Legacy
     * @example
     * // Get one Legacy
     * const legacy = await prisma.legacy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LegacyFindFirstArgs>(args?: SelectSubset<T, LegacyFindFirstArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Legacy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyFindFirstOrThrowArgs} args - Arguments to find a Legacy
     * @example
     * // Get one Legacy
     * const legacy = await prisma.legacy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LegacyFindFirstOrThrowArgs>(args?: SelectSubset<T, LegacyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Legacies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Legacies
     * const legacies = await prisma.legacy.findMany()
     * 
     * // Get first 10 Legacies
     * const legacies = await prisma.legacy.findMany({ take: 10 })
     * 
     * // Only select the `legacy_id`
     * const legacyWithLegacy_idOnly = await prisma.legacy.findMany({ select: { legacy_id: true } })
     * 
     */
    findMany<T extends LegacyFindManyArgs>(args?: SelectSubset<T, LegacyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Legacy.
     * @param {LegacyCreateArgs} args - Arguments to create a Legacy.
     * @example
     * // Create one Legacy
     * const Legacy = await prisma.legacy.create({
     *   data: {
     *     // ... data to create a Legacy
     *   }
     * })
     * 
     */
    create<T extends LegacyCreateArgs>(args: SelectSubset<T, LegacyCreateArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Legacies.
     * @param {LegacyCreateManyArgs} args - Arguments to create many Legacies.
     * @example
     * // Create many Legacies
     * const legacy = await prisma.legacy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LegacyCreateManyArgs>(args?: SelectSubset<T, LegacyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Legacies and returns the data saved in the database.
     * @param {LegacyCreateManyAndReturnArgs} args - Arguments to create many Legacies.
     * @example
     * // Create many Legacies
     * const legacy = await prisma.legacy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Legacies and only return the `legacy_id`
     * const legacyWithLegacy_idOnly = await prisma.legacy.createManyAndReturn({
     *   select: { legacy_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LegacyCreateManyAndReturnArgs>(args?: SelectSubset<T, LegacyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Legacy.
     * @param {LegacyDeleteArgs} args - Arguments to delete one Legacy.
     * @example
     * // Delete one Legacy
     * const Legacy = await prisma.legacy.delete({
     *   where: {
     *     // ... filter to delete one Legacy
     *   }
     * })
     * 
     */
    delete<T extends LegacyDeleteArgs>(args: SelectSubset<T, LegacyDeleteArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Legacy.
     * @param {LegacyUpdateArgs} args - Arguments to update one Legacy.
     * @example
     * // Update one Legacy
     * const legacy = await prisma.legacy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LegacyUpdateArgs>(args: SelectSubset<T, LegacyUpdateArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Legacies.
     * @param {LegacyDeleteManyArgs} args - Arguments to filter Legacies to delete.
     * @example
     * // Delete a few Legacies
     * const { count } = await prisma.legacy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LegacyDeleteManyArgs>(args?: SelectSubset<T, LegacyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Legacies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Legacies
     * const legacy = await prisma.legacy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LegacyUpdateManyArgs>(args: SelectSubset<T, LegacyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Legacies and returns the data updated in the database.
     * @param {LegacyUpdateManyAndReturnArgs} args - Arguments to update many Legacies.
     * @example
     * // Update many Legacies
     * const legacy = await prisma.legacy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Legacies and only return the `legacy_id`
     * const legacyWithLegacy_idOnly = await prisma.legacy.updateManyAndReturn({
     *   select: { legacy_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LegacyUpdateManyAndReturnArgs>(args: SelectSubset<T, LegacyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Legacy.
     * @param {LegacyUpsertArgs} args - Arguments to update or create a Legacy.
     * @example
     * // Update or create a Legacy
     * const legacy = await prisma.legacy.upsert({
     *   create: {
     *     // ... data to create a Legacy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Legacy we want to update
     *   }
     * })
     */
    upsert<T extends LegacyUpsertArgs>(args: SelectSubset<T, LegacyUpsertArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Legacies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyCountArgs} args - Arguments to filter Legacies to count.
     * @example
     * // Count the number of Legacies
     * const count = await prisma.legacy.count({
     *   where: {
     *     // ... the filter for the Legacies we want to count
     *   }
     * })
    **/
    count<T extends LegacyCountArgs>(
      args?: Subset<T, LegacyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LegacyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Legacy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LegacyAggregateArgs>(args: Subset<T, LegacyAggregateArgs>): Prisma.PrismaPromise<GetLegacyAggregateType<T>>

    /**
     * Group by Legacy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LegacyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LegacyGroupByArgs['orderBy'] }
        : { orderBy?: LegacyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LegacyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLegacyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Legacy model
   */
  readonly fields: LegacyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Legacy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LegacyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Legacy$usersArgs<ExtArgs> = {}>(args?: Subset<T, Legacy$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Legacy model
   */
  interface LegacyFieldRefs {
    readonly legacy_id: FieldRef<"Legacy", 'Int'>
    readonly name: FieldRef<"Legacy", 'String'>
    readonly location_filter: FieldRef<"Legacy", 'String'>
    readonly points: FieldRef<"Legacy", 'Int'>
    readonly created_at: FieldRef<"Legacy", 'DateTime'>
    readonly updated_at: FieldRef<"Legacy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Legacy findUnique
   */
  export type LegacyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * Filter, which Legacy to fetch.
     */
    where: LegacyWhereUniqueInput
  }

  /**
   * Legacy findUniqueOrThrow
   */
  export type LegacyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * Filter, which Legacy to fetch.
     */
    where: LegacyWhereUniqueInput
  }

  /**
   * Legacy findFirst
   */
  export type LegacyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * Filter, which Legacy to fetch.
     */
    where?: LegacyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Legacies to fetch.
     */
    orderBy?: LegacyOrderByWithRelationInput | LegacyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Legacies.
     */
    cursor?: LegacyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Legacies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Legacies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Legacies.
     */
    distinct?: LegacyScalarFieldEnum | LegacyScalarFieldEnum[]
  }

  /**
   * Legacy findFirstOrThrow
   */
  export type LegacyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * Filter, which Legacy to fetch.
     */
    where?: LegacyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Legacies to fetch.
     */
    orderBy?: LegacyOrderByWithRelationInput | LegacyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Legacies.
     */
    cursor?: LegacyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Legacies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Legacies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Legacies.
     */
    distinct?: LegacyScalarFieldEnum | LegacyScalarFieldEnum[]
  }

  /**
   * Legacy findMany
   */
  export type LegacyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * Filter, which Legacies to fetch.
     */
    where?: LegacyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Legacies to fetch.
     */
    orderBy?: LegacyOrderByWithRelationInput | LegacyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Legacies.
     */
    cursor?: LegacyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Legacies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Legacies.
     */
    skip?: number
    distinct?: LegacyScalarFieldEnum | LegacyScalarFieldEnum[]
  }

  /**
   * Legacy create
   */
  export type LegacyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * The data needed to create a Legacy.
     */
    data: XOR<LegacyCreateInput, LegacyUncheckedCreateInput>
  }

  /**
   * Legacy createMany
   */
  export type LegacyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Legacies.
     */
    data: LegacyCreateManyInput | LegacyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Legacy createManyAndReturn
   */
  export type LegacyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * The data used to create many Legacies.
     */
    data: LegacyCreateManyInput | LegacyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Legacy update
   */
  export type LegacyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * The data needed to update a Legacy.
     */
    data: XOR<LegacyUpdateInput, LegacyUncheckedUpdateInput>
    /**
     * Choose, which Legacy to update.
     */
    where: LegacyWhereUniqueInput
  }

  /**
   * Legacy updateMany
   */
  export type LegacyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Legacies.
     */
    data: XOR<LegacyUpdateManyMutationInput, LegacyUncheckedUpdateManyInput>
    /**
     * Filter which Legacies to update
     */
    where?: LegacyWhereInput
    /**
     * Limit how many Legacies to update.
     */
    limit?: number
  }

  /**
   * Legacy updateManyAndReturn
   */
  export type LegacyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * The data used to update Legacies.
     */
    data: XOR<LegacyUpdateManyMutationInput, LegacyUncheckedUpdateManyInput>
    /**
     * Filter which Legacies to update
     */
    where?: LegacyWhereInput
    /**
     * Limit how many Legacies to update.
     */
    limit?: number
  }

  /**
   * Legacy upsert
   */
  export type LegacyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * The filter to search for the Legacy to update in case it exists.
     */
    where: LegacyWhereUniqueInput
    /**
     * In case the Legacy found by the `where` argument doesn't exist, create a new Legacy with this data.
     */
    create: XOR<LegacyCreateInput, LegacyUncheckedCreateInput>
    /**
     * In case the Legacy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LegacyUpdateInput, LegacyUncheckedUpdateInput>
  }

  /**
   * Legacy delete
   */
  export type LegacyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    /**
     * Filter which Legacy to delete.
     */
    where: LegacyWhereUniqueInput
  }

  /**
   * Legacy deleteMany
   */
  export type LegacyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Legacies to delete
     */
    where?: LegacyWhereInput
    /**
     * Limit how many Legacies to delete.
     */
    limit?: number
  }

  /**
   * Legacy.users
   */
  export type Legacy$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Legacy without action
   */
  export type LegacyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
  }


  /**
   * Model Cohort
   */

  export type AggregateCohort = {
    _count: CohortCountAggregateOutputType | null
    _avg: CohortAvgAggregateOutputType | null
    _sum: CohortSumAggregateOutputType | null
    _min: CohortMinAggregateOutputType | null
    _max: CohortMaxAggregateOutputType | null
  }

  export type CohortAvgAggregateOutputType = {
    cohort_id: number | null
  }

  export type CohortSumAggregateOutputType = {
    cohort_id: number | null
  }

  export type CohortMinAggregateOutputType = {
    cohort_id: number | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CohortMaxAggregateOutputType = {
    cohort_id: number | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CohortCountAggregateOutputType = {
    cohort_id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CohortAvgAggregateInputType = {
    cohort_id?: true
  }

  export type CohortSumAggregateInputType = {
    cohort_id?: true
  }

  export type CohortMinAggregateInputType = {
    cohort_id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type CohortMaxAggregateInputType = {
    cohort_id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type CohortCountAggregateInputType = {
    cohort_id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CohortAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cohort to aggregate.
     */
    where?: CohortWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cohorts to fetch.
     */
    orderBy?: CohortOrderByWithRelationInput | CohortOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CohortWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cohorts
    **/
    _count?: true | CohortCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CohortAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CohortSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CohortMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CohortMaxAggregateInputType
  }

  export type GetCohortAggregateType<T extends CohortAggregateArgs> = {
        [P in keyof T & keyof AggregateCohort]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCohort[P]>
      : GetScalarType<T[P], AggregateCohort[P]>
  }




  export type CohortGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CohortWhereInput
    orderBy?: CohortOrderByWithAggregationInput | CohortOrderByWithAggregationInput[]
    by: CohortScalarFieldEnum[] | CohortScalarFieldEnum
    having?: CohortScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CohortCountAggregateInputType | true
    _avg?: CohortAvgAggregateInputType
    _sum?: CohortSumAggregateInputType
    _min?: CohortMinAggregateInputType
    _max?: CohortMaxAggregateInputType
  }

  export type CohortGroupByOutputType = {
    cohort_id: number
    name: string
    created_at: Date
    updated_at: Date
    _count: CohortCountAggregateOutputType | null
    _avg: CohortAvgAggregateOutputType | null
    _sum: CohortSumAggregateOutputType | null
    _min: CohortMinAggregateOutputType | null
    _max: CohortMaxAggregateOutputType | null
  }

  type GetCohortGroupByPayload<T extends CohortGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CohortGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CohortGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CohortGroupByOutputType[P]>
            : GetScalarType<T[P], CohortGroupByOutputType[P]>
        }
      >
    >


  export type CohortSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cohort_id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | Cohort$usersArgs<ExtArgs>
    _count?: boolean | CohortCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cohort"]>

  export type CohortSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cohort_id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["cohort"]>

  export type CohortSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cohort_id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["cohort"]>

  export type CohortSelectScalar = {
    cohort_id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CohortOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"cohort_id" | "name" | "created_at" | "updated_at", ExtArgs["result"]["cohort"]>
  export type CohortInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Cohort$usersArgs<ExtArgs>
    _count?: boolean | CohortCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CohortIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CohortIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CohortPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cohort"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      cohort_id: number
      name: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["cohort"]>
    composites: {}
  }

  type CohortGetPayload<S extends boolean | null | undefined | CohortDefaultArgs> = $Result.GetResult<Prisma.$CohortPayload, S>

  type CohortCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CohortFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CohortCountAggregateInputType | true
    }

  export interface CohortDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cohort'], meta: { name: 'Cohort' } }
    /**
     * Find zero or one Cohort that matches the filter.
     * @param {CohortFindUniqueArgs} args - Arguments to find a Cohort
     * @example
     * // Get one Cohort
     * const cohort = await prisma.cohort.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CohortFindUniqueArgs>(args: SelectSubset<T, CohortFindUniqueArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cohort that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CohortFindUniqueOrThrowArgs} args - Arguments to find a Cohort
     * @example
     * // Get one Cohort
     * const cohort = await prisma.cohort.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CohortFindUniqueOrThrowArgs>(args: SelectSubset<T, CohortFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cohort that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortFindFirstArgs} args - Arguments to find a Cohort
     * @example
     * // Get one Cohort
     * const cohort = await prisma.cohort.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CohortFindFirstArgs>(args?: SelectSubset<T, CohortFindFirstArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cohort that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortFindFirstOrThrowArgs} args - Arguments to find a Cohort
     * @example
     * // Get one Cohort
     * const cohort = await prisma.cohort.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CohortFindFirstOrThrowArgs>(args?: SelectSubset<T, CohortFindFirstOrThrowArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cohorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cohorts
     * const cohorts = await prisma.cohort.findMany()
     * 
     * // Get first 10 Cohorts
     * const cohorts = await prisma.cohort.findMany({ take: 10 })
     * 
     * // Only select the `cohort_id`
     * const cohortWithCohort_idOnly = await prisma.cohort.findMany({ select: { cohort_id: true } })
     * 
     */
    findMany<T extends CohortFindManyArgs>(args?: SelectSubset<T, CohortFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cohort.
     * @param {CohortCreateArgs} args - Arguments to create a Cohort.
     * @example
     * // Create one Cohort
     * const Cohort = await prisma.cohort.create({
     *   data: {
     *     // ... data to create a Cohort
     *   }
     * })
     * 
     */
    create<T extends CohortCreateArgs>(args: SelectSubset<T, CohortCreateArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cohorts.
     * @param {CohortCreateManyArgs} args - Arguments to create many Cohorts.
     * @example
     * // Create many Cohorts
     * const cohort = await prisma.cohort.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CohortCreateManyArgs>(args?: SelectSubset<T, CohortCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cohorts and returns the data saved in the database.
     * @param {CohortCreateManyAndReturnArgs} args - Arguments to create many Cohorts.
     * @example
     * // Create many Cohorts
     * const cohort = await prisma.cohort.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cohorts and only return the `cohort_id`
     * const cohortWithCohort_idOnly = await prisma.cohort.createManyAndReturn({
     *   select: { cohort_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CohortCreateManyAndReturnArgs>(args?: SelectSubset<T, CohortCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cohort.
     * @param {CohortDeleteArgs} args - Arguments to delete one Cohort.
     * @example
     * // Delete one Cohort
     * const Cohort = await prisma.cohort.delete({
     *   where: {
     *     // ... filter to delete one Cohort
     *   }
     * })
     * 
     */
    delete<T extends CohortDeleteArgs>(args: SelectSubset<T, CohortDeleteArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cohort.
     * @param {CohortUpdateArgs} args - Arguments to update one Cohort.
     * @example
     * // Update one Cohort
     * const cohort = await prisma.cohort.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CohortUpdateArgs>(args: SelectSubset<T, CohortUpdateArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cohorts.
     * @param {CohortDeleteManyArgs} args - Arguments to filter Cohorts to delete.
     * @example
     * // Delete a few Cohorts
     * const { count } = await prisma.cohort.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CohortDeleteManyArgs>(args?: SelectSubset<T, CohortDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cohorts
     * const cohort = await prisma.cohort.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CohortUpdateManyArgs>(args: SelectSubset<T, CohortUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cohorts and returns the data updated in the database.
     * @param {CohortUpdateManyAndReturnArgs} args - Arguments to update many Cohorts.
     * @example
     * // Update many Cohorts
     * const cohort = await prisma.cohort.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cohorts and only return the `cohort_id`
     * const cohortWithCohort_idOnly = await prisma.cohort.updateManyAndReturn({
     *   select: { cohort_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CohortUpdateManyAndReturnArgs>(args: SelectSubset<T, CohortUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cohort.
     * @param {CohortUpsertArgs} args - Arguments to update or create a Cohort.
     * @example
     * // Update or create a Cohort
     * const cohort = await prisma.cohort.upsert({
     *   create: {
     *     // ... data to create a Cohort
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cohort we want to update
     *   }
     * })
     */
    upsert<T extends CohortUpsertArgs>(args: SelectSubset<T, CohortUpsertArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortCountArgs} args - Arguments to filter Cohorts to count.
     * @example
     * // Count the number of Cohorts
     * const count = await prisma.cohort.count({
     *   where: {
     *     // ... the filter for the Cohorts we want to count
     *   }
     * })
    **/
    count<T extends CohortCountArgs>(
      args?: Subset<T, CohortCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CohortCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cohort.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CohortAggregateArgs>(args: Subset<T, CohortAggregateArgs>): Prisma.PrismaPromise<GetCohortAggregateType<T>>

    /**
     * Group by Cohort.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CohortGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CohortGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CohortGroupByArgs['orderBy'] }
        : { orderBy?: CohortGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CohortGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCohortGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cohort model
   */
  readonly fields: CohortFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cohort.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CohortClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Cohort$usersArgs<ExtArgs> = {}>(args?: Subset<T, Cohort$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cohort model
   */
  interface CohortFieldRefs {
    readonly cohort_id: FieldRef<"Cohort", 'Int'>
    readonly name: FieldRef<"Cohort", 'String'>
    readonly created_at: FieldRef<"Cohort", 'DateTime'>
    readonly updated_at: FieldRef<"Cohort", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cohort findUnique
   */
  export type CohortFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * Filter, which Cohort to fetch.
     */
    where: CohortWhereUniqueInput
  }

  /**
   * Cohort findUniqueOrThrow
   */
  export type CohortFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * Filter, which Cohort to fetch.
     */
    where: CohortWhereUniqueInput
  }

  /**
   * Cohort findFirst
   */
  export type CohortFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * Filter, which Cohort to fetch.
     */
    where?: CohortWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cohorts to fetch.
     */
    orderBy?: CohortOrderByWithRelationInput | CohortOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cohorts.
     */
    cursor?: CohortWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cohorts.
     */
    distinct?: CohortScalarFieldEnum | CohortScalarFieldEnum[]
  }

  /**
   * Cohort findFirstOrThrow
   */
  export type CohortFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * Filter, which Cohort to fetch.
     */
    where?: CohortWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cohorts to fetch.
     */
    orderBy?: CohortOrderByWithRelationInput | CohortOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cohorts.
     */
    cursor?: CohortWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cohorts.
     */
    distinct?: CohortScalarFieldEnum | CohortScalarFieldEnum[]
  }

  /**
   * Cohort findMany
   */
  export type CohortFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * Filter, which Cohorts to fetch.
     */
    where?: CohortWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cohorts to fetch.
     */
    orderBy?: CohortOrderByWithRelationInput | CohortOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cohorts.
     */
    cursor?: CohortWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cohorts.
     */
    skip?: number
    distinct?: CohortScalarFieldEnum | CohortScalarFieldEnum[]
  }

  /**
   * Cohort create
   */
  export type CohortCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * The data needed to create a Cohort.
     */
    data: XOR<CohortCreateInput, CohortUncheckedCreateInput>
  }

  /**
   * Cohort createMany
   */
  export type CohortCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cohorts.
     */
    data: CohortCreateManyInput | CohortCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cohort createManyAndReturn
   */
  export type CohortCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * The data used to create many Cohorts.
     */
    data: CohortCreateManyInput | CohortCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cohort update
   */
  export type CohortUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * The data needed to update a Cohort.
     */
    data: XOR<CohortUpdateInput, CohortUncheckedUpdateInput>
    /**
     * Choose, which Cohort to update.
     */
    where: CohortWhereUniqueInput
  }

  /**
   * Cohort updateMany
   */
  export type CohortUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cohorts.
     */
    data: XOR<CohortUpdateManyMutationInput, CohortUncheckedUpdateManyInput>
    /**
     * Filter which Cohorts to update
     */
    where?: CohortWhereInput
    /**
     * Limit how many Cohorts to update.
     */
    limit?: number
  }

  /**
   * Cohort updateManyAndReturn
   */
  export type CohortUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * The data used to update Cohorts.
     */
    data: XOR<CohortUpdateManyMutationInput, CohortUncheckedUpdateManyInput>
    /**
     * Filter which Cohorts to update
     */
    where?: CohortWhereInput
    /**
     * Limit how many Cohorts to update.
     */
    limit?: number
  }

  /**
   * Cohort upsert
   */
  export type CohortUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * The filter to search for the Cohort to update in case it exists.
     */
    where: CohortWhereUniqueInput
    /**
     * In case the Cohort found by the `where` argument doesn't exist, create a new Cohort with this data.
     */
    create: XOR<CohortCreateInput, CohortUncheckedCreateInput>
    /**
     * In case the Cohort was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CohortUpdateInput, CohortUncheckedUpdateInput>
  }

  /**
   * Cohort delete
   */
  export type CohortDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    /**
     * Filter which Cohort to delete.
     */
    where: CohortWhereUniqueInput
  }

  /**
   * Cohort deleteMany
   */
  export type CohortDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cohorts to delete
     */
    where?: CohortWhereInput
    /**
     * Limit how many Cohorts to delete.
     */
    limit?: number
  }

  /**
   * Cohort.users
   */
  export type Cohort$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Cohort without action
   */
  export type CohortDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    task_id: number | null
    points_on_approval: number | null
    assignee_id: number | null
  }

  export type TaskSumAggregateOutputType = {
    task_id: number | null
    points_on_approval: number | null
    assignee_id: number | null
  }

  export type TaskMinAggregateOutputType = {
    task_id: number | null
    title: string | null
    description: string | null
    due_date: Date | null
    points_on_approval: number | null
    assignee_type: $Enums.TaskAssigneeType | null
    assignee_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    task_id: number | null
    title: string | null
    description: string | null
    due_date: Date | null
    points_on_approval: number | null
    assignee_type: $Enums.TaskAssigneeType | null
    assignee_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TaskCountAggregateOutputType = {
    task_id: number
    title: number
    description: number
    due_date: number
    points_on_approval: number
    assignee_type: number
    assignee_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    task_id?: true
    points_on_approval?: true
    assignee_id?: true
  }

  export type TaskSumAggregateInputType = {
    task_id?: true
    points_on_approval?: true
    assignee_id?: true
  }

  export type TaskMinAggregateInputType = {
    task_id?: true
    title?: true
    description?: true
    due_date?: true
    points_on_approval?: true
    assignee_type?: true
    assignee_id?: true
    created_at?: true
    updated_at?: true
  }

  export type TaskMaxAggregateInputType = {
    task_id?: true
    title?: true
    description?: true
    due_date?: true
    points_on_approval?: true
    assignee_type?: true
    assignee_id?: true
    created_at?: true
    updated_at?: true
  }

  export type TaskCountAggregateInputType = {
    task_id?: true
    title?: true
    description?: true
    due_date?: true
    points_on_approval?: true
    assignee_type?: true
    assignee_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    task_id: number
    title: string
    description: string | null
    due_date: Date | null
    points_on_approval: number
    assignee_type: $Enums.TaskAssigneeType
    assignee_id: number | null
    created_at: Date
    updated_at: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    title?: boolean
    description?: boolean
    due_date?: boolean
    points_on_approval?: boolean
    assignee_type?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    submissions?: boolean | Task$submissionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    title?: boolean
    description?: boolean
    due_date?: boolean
    points_on_approval?: boolean
    assignee_type?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    title?: boolean
    description?: boolean
    due_date?: boolean
    points_on_approval?: boolean
    assignee_type?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    task_id?: boolean
    title?: boolean
    description?: boolean
    due_date?: boolean
    points_on_approval?: boolean
    assignee_type?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"task_id" | "title" | "description" | "due_date" | "points_on_approval" | "assignee_type" | "assignee_id" | "created_at" | "updated_at", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | Task$submissionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      submissions: Prisma.$TaskSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      task_id: number
      title: string
      description: string | null
      due_date: Date | null
      points_on_approval: number
      assignee_type: $Enums.TaskAssigneeType
      assignee_id: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `task_id`
     * const taskWithTask_idOnly = await prisma.task.findMany({ select: { task_id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `task_id`
     * const taskWithTask_idOnly = await prisma.task.createManyAndReturn({
     *   select: { task_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `task_id`
     * const taskWithTask_idOnly = await prisma.task.updateManyAndReturn({
     *   select: { task_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submissions<T extends Task$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Task$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly task_id: FieldRef<"Task", 'Int'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly due_date: FieldRef<"Task", 'DateTime'>
    readonly points_on_approval: FieldRef<"Task", 'Int'>
    readonly assignee_type: FieldRef<"Task", 'TaskAssigneeType'>
    readonly assignee_id: FieldRef<"Task", 'Int'>
    readonly created_at: FieldRef<"Task", 'DateTime'>
    readonly updated_at: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.submissions
   */
  export type Task$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    where?: TaskSubmissionWhereInput
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    cursor?: TaskSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskSubmissionScalarFieldEnum | TaskSubmissionScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
    legacy_id: number | null
    cohort_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
    legacy_id: number | null
    cohort_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    firebase_uid: string | null
    email: string | null
    email_verified: boolean | null
    full_name: string | null
    profile_picture_url: string | null
    disabled: boolean | null
    role: string | null
    legacy_id: number | null
    cohort_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    firebase_uid: string | null
    email: string | null
    email_verified: boolean | null
    full_name: string | null
    profile_picture_url: string | null
    disabled: boolean | null
    role: string | null
    legacy_id: number | null
    cohort_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    firebase_uid: number
    email: number
    email_verified: number
    full_name: number
    profile_picture_url: number
    disabled: number
    role: number
    legacy_id: number
    cohort_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
    legacy_id?: true
    cohort_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
    legacy_id?: true
    cohort_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    firebase_uid?: true
    email?: true
    email_verified?: true
    full_name?: true
    profile_picture_url?: true
    disabled?: true
    role?: true
    legacy_id?: true
    cohort_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    firebase_uid?: true
    email?: true
    email_verified?: true
    full_name?: true
    profile_picture_url?: true
    disabled?: true
    role?: true
    legacy_id?: true
    cohort_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    firebase_uid?: true
    email?: true
    email_verified?: true
    full_name?: true
    profile_picture_url?: true
    disabled?: true
    role?: true
    legacy_id?: true
    cohort_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    firebase_uid: string
    email: string
    email_verified: boolean | null
    full_name: string | null
    profile_picture_url: string | null
    disabled: boolean | null
    role: string
    legacy_id: number | null
    cohort_id: number | null
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    firebase_uid?: boolean
    email?: boolean
    email_verified?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    disabled?: boolean
    role?: boolean
    legacy_id?: boolean
    cohort_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    legacy?: boolean | User$legacyArgs<ExtArgs>
    cohort?: boolean | User$cohortArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    reviews_by_user?: boolean | User$reviews_by_userArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    firebase_uid?: boolean
    email?: boolean
    email_verified?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    disabled?: boolean
    role?: boolean
    legacy_id?: boolean
    cohort_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    legacy?: boolean | User$legacyArgs<ExtArgs>
    cohort?: boolean | User$cohortArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    firebase_uid?: boolean
    email?: boolean
    email_verified?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    disabled?: boolean
    role?: boolean
    legacy_id?: boolean
    cohort_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    legacy?: boolean | User$legacyArgs<ExtArgs>
    cohort?: boolean | User$cohortArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    firebase_uid?: boolean
    email?: boolean
    email_verified?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    disabled?: boolean
    role?: boolean
    legacy_id?: boolean
    cohort_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "firebase_uid" | "email" | "email_verified" | "full_name" | "profile_picture_url" | "disabled" | "role" | "legacy_id" | "cohort_id" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    legacy?: boolean | User$legacyArgs<ExtArgs>
    cohort?: boolean | User$cohortArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    reviews_by_user?: boolean | User$reviews_by_userArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    legacy?: boolean | User$legacyArgs<ExtArgs>
    cohort?: boolean | User$cohortArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    legacy?: boolean | User$legacyArgs<ExtArgs>
    cohort?: boolean | User$cohortArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      legacy: Prisma.$LegacyPayload<ExtArgs> | null
      cohort: Prisma.$CohortPayload<ExtArgs> | null
      submissions: Prisma.$TaskSubmissionPayload<ExtArgs>[]
      reviews_by_user: Prisma.$TaskSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      firebase_uid: string
      email: string
      email_verified: boolean | null
      full_name: string | null
      profile_picture_url: string | null
      disabled: boolean | null
      role: string
      legacy_id: number | null
      cohort_id: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    legacy<T extends User$legacyArgs<ExtArgs> = {}>(args?: Subset<T, User$legacyArgs<ExtArgs>>): Prisma__LegacyClient<$Result.GetResult<Prisma.$LegacyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    cohort<T extends User$cohortArgs<ExtArgs> = {}>(args?: Subset<T, User$cohortArgs<ExtArgs>>): Prisma__CohortClient<$Result.GetResult<Prisma.$CohortPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews_by_user<T extends User$reviews_by_userArgs<ExtArgs> = {}>(args?: Subset<T, User$reviews_by_userArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'Int'>
    readonly firebase_uid: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly email_verified: FieldRef<"User", 'Boolean'>
    readonly full_name: FieldRef<"User", 'String'>
    readonly profile_picture_url: FieldRef<"User", 'String'>
    readonly disabled: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'String'>
    readonly legacy_id: FieldRef<"User", 'Int'>
    readonly cohort_id: FieldRef<"User", 'Int'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.legacy
   */
  export type User$legacyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Legacy
     */
    select?: LegacySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Legacy
     */
    omit?: LegacyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LegacyInclude<ExtArgs> | null
    where?: LegacyWhereInput
  }

  /**
   * User.cohort
   */
  export type User$cohortArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cohort
     */
    select?: CohortSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cohort
     */
    omit?: CohortOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CohortInclude<ExtArgs> | null
    where?: CohortWhereInput
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    where?: TaskSubmissionWhereInput
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    cursor?: TaskSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskSubmissionScalarFieldEnum | TaskSubmissionScalarFieldEnum[]
  }

  /**
   * User.reviews_by_user
   */
  export type User$reviews_by_userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    where?: TaskSubmissionWhereInput
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    cursor?: TaskSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskSubmissionScalarFieldEnum | TaskSubmissionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TaskSubmission
   */

  export type AggregateTaskSubmission = {
    _count: TaskSubmissionCountAggregateOutputType | null
    _avg: TaskSubmissionAvgAggregateOutputType | null
    _sum: TaskSubmissionSumAggregateOutputType | null
    _min: TaskSubmissionMinAggregateOutputType | null
    _max: TaskSubmissionMaxAggregateOutputType | null
  }

  export type TaskSubmissionAvgAggregateOutputType = {
    submission_id: number | null
    task_id: number | null
    user_id: number | null
    reviewed_by_user_id: number | null
  }

  export type TaskSubmissionSumAggregateOutputType = {
    submission_id: number | null
    task_id: number | null
    user_id: number | null
    reviewed_by_user_id: number | null
  }

  export type TaskSubmissionMinAggregateOutputType = {
    submission_id: number | null
    task_id: number | null
    user_id: number | null
    status: $Enums.SubmissionStatus | null
    submitted_evidence: string | null
    submitted_at: Date | null
    is_latest: boolean | null
    reviewed_by_user_id: number | null
    reviewed_at: Date | null
    reviewer_comment: string | null
  }

  export type TaskSubmissionMaxAggregateOutputType = {
    submission_id: number | null
    task_id: number | null
    user_id: number | null
    status: $Enums.SubmissionStatus | null
    submitted_evidence: string | null
    submitted_at: Date | null
    is_latest: boolean | null
    reviewed_by_user_id: number | null
    reviewed_at: Date | null
    reviewer_comment: string | null
  }

  export type TaskSubmissionCountAggregateOutputType = {
    submission_id: number
    task_id: number
    user_id: number
    status: number
    submitted_evidence: number
    submitted_at: number
    is_latest: number
    reviewed_by_user_id: number
    reviewed_at: number
    reviewer_comment: number
    _all: number
  }


  export type TaskSubmissionAvgAggregateInputType = {
    submission_id?: true
    task_id?: true
    user_id?: true
    reviewed_by_user_id?: true
  }

  export type TaskSubmissionSumAggregateInputType = {
    submission_id?: true
    task_id?: true
    user_id?: true
    reviewed_by_user_id?: true
  }

  export type TaskSubmissionMinAggregateInputType = {
    submission_id?: true
    task_id?: true
    user_id?: true
    status?: true
    submitted_evidence?: true
    submitted_at?: true
    is_latest?: true
    reviewed_by_user_id?: true
    reviewed_at?: true
    reviewer_comment?: true
  }

  export type TaskSubmissionMaxAggregateInputType = {
    submission_id?: true
    task_id?: true
    user_id?: true
    status?: true
    submitted_evidence?: true
    submitted_at?: true
    is_latest?: true
    reviewed_by_user_id?: true
    reviewed_at?: true
    reviewer_comment?: true
  }

  export type TaskSubmissionCountAggregateInputType = {
    submission_id?: true
    task_id?: true
    user_id?: true
    status?: true
    submitted_evidence?: true
    submitted_at?: true
    is_latest?: true
    reviewed_by_user_id?: true
    reviewed_at?: true
    reviewer_comment?: true
    _all?: true
  }

  export type TaskSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskSubmission to aggregate.
     */
    where?: TaskSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskSubmissions to fetch.
     */
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskSubmissions
    **/
    _count?: true | TaskSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskSubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskSubmissionMaxAggregateInputType
  }

  export type GetTaskSubmissionAggregateType<T extends TaskSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskSubmission[P]>
      : GetScalarType<T[P], AggregateTaskSubmission[P]>
  }




  export type TaskSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskSubmissionWhereInput
    orderBy?: TaskSubmissionOrderByWithAggregationInput | TaskSubmissionOrderByWithAggregationInput[]
    by: TaskSubmissionScalarFieldEnum[] | TaskSubmissionScalarFieldEnum
    having?: TaskSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskSubmissionCountAggregateInputType | true
    _avg?: TaskSubmissionAvgAggregateInputType
    _sum?: TaskSubmissionSumAggregateInputType
    _min?: TaskSubmissionMinAggregateInputType
    _max?: TaskSubmissionMaxAggregateInputType
  }

  export type TaskSubmissionGroupByOutputType = {
    submission_id: number
    task_id: number
    user_id: number
    status: $Enums.SubmissionStatus
    submitted_evidence: string | null
    submitted_at: Date
    is_latest: boolean
    reviewed_by_user_id: number | null
    reviewed_at: Date | null
    reviewer_comment: string | null
    _count: TaskSubmissionCountAggregateOutputType | null
    _avg: TaskSubmissionAvgAggregateOutputType | null
    _sum: TaskSubmissionSumAggregateOutputType | null
    _min: TaskSubmissionMinAggregateOutputType | null
    _max: TaskSubmissionMaxAggregateOutputType | null
  }

  type GetTaskSubmissionGroupByPayload<T extends TaskSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], TaskSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type TaskSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    submission_id?: boolean
    task_id?: boolean
    user_id?: boolean
    status?: boolean
    submitted_evidence?: boolean
    submitted_at?: boolean
    is_latest?: boolean
    reviewed_by_user_id?: boolean
    reviewed_at?: boolean
    reviewer_comment?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewed_by_user?: boolean | TaskSubmission$reviewed_by_userArgs<ExtArgs>
  }, ExtArgs["result"]["taskSubmission"]>

  export type TaskSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    submission_id?: boolean
    task_id?: boolean
    user_id?: boolean
    status?: boolean
    submitted_evidence?: boolean
    submitted_at?: boolean
    is_latest?: boolean
    reviewed_by_user_id?: boolean
    reviewed_at?: boolean
    reviewer_comment?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewed_by_user?: boolean | TaskSubmission$reviewed_by_userArgs<ExtArgs>
  }, ExtArgs["result"]["taskSubmission"]>

  export type TaskSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    submission_id?: boolean
    task_id?: boolean
    user_id?: boolean
    status?: boolean
    submitted_evidence?: boolean
    submitted_at?: boolean
    is_latest?: boolean
    reviewed_by_user_id?: boolean
    reviewed_at?: boolean
    reviewer_comment?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewed_by_user?: boolean | TaskSubmission$reviewed_by_userArgs<ExtArgs>
  }, ExtArgs["result"]["taskSubmission"]>

  export type TaskSubmissionSelectScalar = {
    submission_id?: boolean
    task_id?: boolean
    user_id?: boolean
    status?: boolean
    submitted_evidence?: boolean
    submitted_at?: boolean
    is_latest?: boolean
    reviewed_by_user_id?: boolean
    reviewed_at?: boolean
    reviewer_comment?: boolean
  }

  export type TaskSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"submission_id" | "task_id" | "user_id" | "status" | "submitted_evidence" | "submitted_at" | "is_latest" | "reviewed_by_user_id" | "reviewed_at" | "reviewer_comment", ExtArgs["result"]["taskSubmission"]>
  export type TaskSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewed_by_user?: boolean | TaskSubmission$reviewed_by_userArgs<ExtArgs>
  }
  export type TaskSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewed_by_user?: boolean | TaskSubmission$reviewed_by_userArgs<ExtArgs>
  }
  export type TaskSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewed_by_user?: boolean | TaskSubmission$reviewed_by_userArgs<ExtArgs>
  }

  export type $TaskSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskSubmission"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      reviewed_by_user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      submission_id: number
      task_id: number
      user_id: number
      status: $Enums.SubmissionStatus
      submitted_evidence: string | null
      submitted_at: Date
      is_latest: boolean
      reviewed_by_user_id: number | null
      reviewed_at: Date | null
      reviewer_comment: string | null
    }, ExtArgs["result"]["taskSubmission"]>
    composites: {}
  }

  type TaskSubmissionGetPayload<S extends boolean | null | undefined | TaskSubmissionDefaultArgs> = $Result.GetResult<Prisma.$TaskSubmissionPayload, S>

  type TaskSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskSubmissionCountAggregateInputType | true
    }

  export interface TaskSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskSubmission'], meta: { name: 'TaskSubmission' } }
    /**
     * Find zero or one TaskSubmission that matches the filter.
     * @param {TaskSubmissionFindUniqueArgs} args - Arguments to find a TaskSubmission
     * @example
     * // Get one TaskSubmission
     * const taskSubmission = await prisma.taskSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskSubmissionFindUniqueArgs>(args: SelectSubset<T, TaskSubmissionFindUniqueArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskSubmissionFindUniqueOrThrowArgs} args - Arguments to find a TaskSubmission
     * @example
     * // Get one TaskSubmission
     * const taskSubmission = await prisma.taskSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionFindFirstArgs} args - Arguments to find a TaskSubmission
     * @example
     * // Get one TaskSubmission
     * const taskSubmission = await prisma.taskSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskSubmissionFindFirstArgs>(args?: SelectSubset<T, TaskSubmissionFindFirstArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionFindFirstOrThrowArgs} args - Arguments to find a TaskSubmission
     * @example
     * // Get one TaskSubmission
     * const taskSubmission = await prisma.taskSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskSubmissions
     * const taskSubmissions = await prisma.taskSubmission.findMany()
     * 
     * // Get first 10 TaskSubmissions
     * const taskSubmissions = await prisma.taskSubmission.findMany({ take: 10 })
     * 
     * // Only select the `submission_id`
     * const taskSubmissionWithSubmission_idOnly = await prisma.taskSubmission.findMany({ select: { submission_id: true } })
     * 
     */
    findMany<T extends TaskSubmissionFindManyArgs>(args?: SelectSubset<T, TaskSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskSubmission.
     * @param {TaskSubmissionCreateArgs} args - Arguments to create a TaskSubmission.
     * @example
     * // Create one TaskSubmission
     * const TaskSubmission = await prisma.taskSubmission.create({
     *   data: {
     *     // ... data to create a TaskSubmission
     *   }
     * })
     * 
     */
    create<T extends TaskSubmissionCreateArgs>(args: SelectSubset<T, TaskSubmissionCreateArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskSubmissions.
     * @param {TaskSubmissionCreateManyArgs} args - Arguments to create many TaskSubmissions.
     * @example
     * // Create many TaskSubmissions
     * const taskSubmission = await prisma.taskSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskSubmissionCreateManyArgs>(args?: SelectSubset<T, TaskSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskSubmissions and returns the data saved in the database.
     * @param {TaskSubmissionCreateManyAndReturnArgs} args - Arguments to create many TaskSubmissions.
     * @example
     * // Create many TaskSubmissions
     * const taskSubmission = await prisma.taskSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskSubmissions and only return the `submission_id`
     * const taskSubmissionWithSubmission_idOnly = await prisma.taskSubmission.createManyAndReturn({
     *   select: { submission_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskSubmission.
     * @param {TaskSubmissionDeleteArgs} args - Arguments to delete one TaskSubmission.
     * @example
     * // Delete one TaskSubmission
     * const TaskSubmission = await prisma.taskSubmission.delete({
     *   where: {
     *     // ... filter to delete one TaskSubmission
     *   }
     * })
     * 
     */
    delete<T extends TaskSubmissionDeleteArgs>(args: SelectSubset<T, TaskSubmissionDeleteArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskSubmission.
     * @param {TaskSubmissionUpdateArgs} args - Arguments to update one TaskSubmission.
     * @example
     * // Update one TaskSubmission
     * const taskSubmission = await prisma.taskSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskSubmissionUpdateArgs>(args: SelectSubset<T, TaskSubmissionUpdateArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskSubmissions.
     * @param {TaskSubmissionDeleteManyArgs} args - Arguments to filter TaskSubmissions to delete.
     * @example
     * // Delete a few TaskSubmissions
     * const { count } = await prisma.taskSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskSubmissionDeleteManyArgs>(args?: SelectSubset<T, TaskSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskSubmissions
     * const taskSubmission = await prisma.taskSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskSubmissionUpdateManyArgs>(args: SelectSubset<T, TaskSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskSubmissions and returns the data updated in the database.
     * @param {TaskSubmissionUpdateManyAndReturnArgs} args - Arguments to update many TaskSubmissions.
     * @example
     * // Update many TaskSubmissions
     * const taskSubmission = await prisma.taskSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskSubmissions and only return the `submission_id`
     * const taskSubmissionWithSubmission_idOnly = await prisma.taskSubmission.updateManyAndReturn({
     *   select: { submission_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskSubmission.
     * @param {TaskSubmissionUpsertArgs} args - Arguments to update or create a TaskSubmission.
     * @example
     * // Update or create a TaskSubmission
     * const taskSubmission = await prisma.taskSubmission.upsert({
     *   create: {
     *     // ... data to create a TaskSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskSubmission we want to update
     *   }
     * })
     */
    upsert<T extends TaskSubmissionUpsertArgs>(args: SelectSubset<T, TaskSubmissionUpsertArgs<ExtArgs>>): Prisma__TaskSubmissionClient<$Result.GetResult<Prisma.$TaskSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionCountArgs} args - Arguments to filter TaskSubmissions to count.
     * @example
     * // Count the number of TaskSubmissions
     * const count = await prisma.taskSubmission.count({
     *   where: {
     *     // ... the filter for the TaskSubmissions we want to count
     *   }
     * })
    **/
    count<T extends TaskSubmissionCountArgs>(
      args?: Subset<T, TaskSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskSubmissionAggregateArgs>(args: Subset<T, TaskSubmissionAggregateArgs>): Prisma.PrismaPromise<GetTaskSubmissionAggregateType<T>>

    /**
     * Group by TaskSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: TaskSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskSubmission model
   */
  readonly fields: TaskSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewed_by_user<T extends TaskSubmission$reviewed_by_userArgs<ExtArgs> = {}>(args?: Subset<T, TaskSubmission$reviewed_by_userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskSubmission model
   */
  interface TaskSubmissionFieldRefs {
    readonly submission_id: FieldRef<"TaskSubmission", 'Int'>
    readonly task_id: FieldRef<"TaskSubmission", 'Int'>
    readonly user_id: FieldRef<"TaskSubmission", 'Int'>
    readonly status: FieldRef<"TaskSubmission", 'SubmissionStatus'>
    readonly submitted_evidence: FieldRef<"TaskSubmission", 'String'>
    readonly submitted_at: FieldRef<"TaskSubmission", 'DateTime'>
    readonly is_latest: FieldRef<"TaskSubmission", 'Boolean'>
    readonly reviewed_by_user_id: FieldRef<"TaskSubmission", 'Int'>
    readonly reviewed_at: FieldRef<"TaskSubmission", 'DateTime'>
    readonly reviewer_comment: FieldRef<"TaskSubmission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TaskSubmission findUnique
   */
  export type TaskSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which TaskSubmission to fetch.
     */
    where: TaskSubmissionWhereUniqueInput
  }

  /**
   * TaskSubmission findUniqueOrThrow
   */
  export type TaskSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which TaskSubmission to fetch.
     */
    where: TaskSubmissionWhereUniqueInput
  }

  /**
   * TaskSubmission findFirst
   */
  export type TaskSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which TaskSubmission to fetch.
     */
    where?: TaskSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskSubmissions to fetch.
     */
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskSubmissions.
     */
    cursor?: TaskSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskSubmissions.
     */
    distinct?: TaskSubmissionScalarFieldEnum | TaskSubmissionScalarFieldEnum[]
  }

  /**
   * TaskSubmission findFirstOrThrow
   */
  export type TaskSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which TaskSubmission to fetch.
     */
    where?: TaskSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskSubmissions to fetch.
     */
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskSubmissions.
     */
    cursor?: TaskSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskSubmissions.
     */
    distinct?: TaskSubmissionScalarFieldEnum | TaskSubmissionScalarFieldEnum[]
  }

  /**
   * TaskSubmission findMany
   */
  export type TaskSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which TaskSubmissions to fetch.
     */
    where?: TaskSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskSubmissions to fetch.
     */
    orderBy?: TaskSubmissionOrderByWithRelationInput | TaskSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskSubmissions.
     */
    cursor?: TaskSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskSubmissions.
     */
    skip?: number
    distinct?: TaskSubmissionScalarFieldEnum | TaskSubmissionScalarFieldEnum[]
  }

  /**
   * TaskSubmission create
   */
  export type TaskSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskSubmission.
     */
    data: XOR<TaskSubmissionCreateInput, TaskSubmissionUncheckedCreateInput>
  }

  /**
   * TaskSubmission createMany
   */
  export type TaskSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskSubmissions.
     */
    data: TaskSubmissionCreateManyInput | TaskSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskSubmission createManyAndReturn
   */
  export type TaskSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many TaskSubmissions.
     */
    data: TaskSubmissionCreateManyInput | TaskSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskSubmission update
   */
  export type TaskSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskSubmission.
     */
    data: XOR<TaskSubmissionUpdateInput, TaskSubmissionUncheckedUpdateInput>
    /**
     * Choose, which TaskSubmission to update.
     */
    where: TaskSubmissionWhereUniqueInput
  }

  /**
   * TaskSubmission updateMany
   */
  export type TaskSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskSubmissions.
     */
    data: XOR<TaskSubmissionUpdateManyMutationInput, TaskSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which TaskSubmissions to update
     */
    where?: TaskSubmissionWhereInput
    /**
     * Limit how many TaskSubmissions to update.
     */
    limit?: number
  }

  /**
   * TaskSubmission updateManyAndReturn
   */
  export type TaskSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update TaskSubmissions.
     */
    data: XOR<TaskSubmissionUpdateManyMutationInput, TaskSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which TaskSubmissions to update
     */
    where?: TaskSubmissionWhereInput
    /**
     * Limit how many TaskSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskSubmission upsert
   */
  export type TaskSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskSubmission to update in case it exists.
     */
    where: TaskSubmissionWhereUniqueInput
    /**
     * In case the TaskSubmission found by the `where` argument doesn't exist, create a new TaskSubmission with this data.
     */
    create: XOR<TaskSubmissionCreateInput, TaskSubmissionUncheckedCreateInput>
    /**
     * In case the TaskSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskSubmissionUpdateInput, TaskSubmissionUncheckedUpdateInput>
  }

  /**
   * TaskSubmission delete
   */
  export type TaskSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
    /**
     * Filter which TaskSubmission to delete.
     */
    where: TaskSubmissionWhereUniqueInput
  }

  /**
   * TaskSubmission deleteMany
   */
  export type TaskSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskSubmissions to delete
     */
    where?: TaskSubmissionWhereInput
    /**
     * Limit how many TaskSubmissions to delete.
     */
    limit?: number
  }

  /**
   * TaskSubmission.reviewed_by_user
   */
  export type TaskSubmission$reviewed_by_userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TaskSubmission without action
   */
  export type TaskSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskSubmission
     */
    select?: TaskSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskSubmission
     */
    omit?: TaskSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskSubmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LegacyScalarFieldEnum: {
    legacy_id: 'legacy_id',
    name: 'name',
    location_filter: 'location_filter',
    points: 'points',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LegacyScalarFieldEnum = (typeof LegacyScalarFieldEnum)[keyof typeof LegacyScalarFieldEnum]


  export const CohortScalarFieldEnum: {
    cohort_id: 'cohort_id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CohortScalarFieldEnum = (typeof CohortScalarFieldEnum)[keyof typeof CohortScalarFieldEnum]


  export const TaskScalarFieldEnum: {
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

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TaskSubmissionScalarFieldEnum: {
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

  export type TaskSubmissionScalarFieldEnum = (typeof TaskSubmissionScalarFieldEnum)[keyof typeof TaskSubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TaskAssigneeType'
   */
  export type EnumTaskAssigneeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskAssigneeType'>
    


  /**
   * Reference to a field of type 'TaskAssigneeType[]'
   */
  export type ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskAssigneeType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'SubmissionStatus'
   */
  export type EnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus'>
    


  /**
   * Reference to a field of type 'SubmissionStatus[]'
   */
  export type ListEnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type LegacyWhereInput = {
    AND?: LegacyWhereInput | LegacyWhereInput[]
    OR?: LegacyWhereInput[]
    NOT?: LegacyWhereInput | LegacyWhereInput[]
    legacy_id?: IntFilter<"Legacy"> | number
    name?: StringFilter<"Legacy"> | string
    location_filter?: StringNullableFilter<"Legacy"> | string | null
    points?: IntFilter<"Legacy"> | number
    created_at?: DateTimeFilter<"Legacy"> | Date | string
    updated_at?: DateTimeFilter<"Legacy"> | Date | string
    users?: UserListRelationFilter
  }

  export type LegacyOrderByWithRelationInput = {
    legacy_id?: SortOrder
    name?: SortOrder
    location_filter?: SortOrderInput | SortOrder
    points?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type LegacyWhereUniqueInput = Prisma.AtLeast<{
    legacy_id?: number
    name?: string
    AND?: LegacyWhereInput | LegacyWhereInput[]
    OR?: LegacyWhereInput[]
    NOT?: LegacyWhereInput | LegacyWhereInput[]
    location_filter?: StringNullableFilter<"Legacy"> | string | null
    points?: IntFilter<"Legacy"> | number
    created_at?: DateTimeFilter<"Legacy"> | Date | string
    updated_at?: DateTimeFilter<"Legacy"> | Date | string
    users?: UserListRelationFilter
  }, "legacy_id" | "name">

  export type LegacyOrderByWithAggregationInput = {
    legacy_id?: SortOrder
    name?: SortOrder
    location_filter?: SortOrderInput | SortOrder
    points?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LegacyCountOrderByAggregateInput
    _avg?: LegacyAvgOrderByAggregateInput
    _max?: LegacyMaxOrderByAggregateInput
    _min?: LegacyMinOrderByAggregateInput
    _sum?: LegacySumOrderByAggregateInput
  }

  export type LegacyScalarWhereWithAggregatesInput = {
    AND?: LegacyScalarWhereWithAggregatesInput | LegacyScalarWhereWithAggregatesInput[]
    OR?: LegacyScalarWhereWithAggregatesInput[]
    NOT?: LegacyScalarWhereWithAggregatesInput | LegacyScalarWhereWithAggregatesInput[]
    legacy_id?: IntWithAggregatesFilter<"Legacy"> | number
    name?: StringWithAggregatesFilter<"Legacy"> | string
    location_filter?: StringNullableWithAggregatesFilter<"Legacy"> | string | null
    points?: IntWithAggregatesFilter<"Legacy"> | number
    created_at?: DateTimeWithAggregatesFilter<"Legacy"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Legacy"> | Date | string
  }

  export type CohortWhereInput = {
    AND?: CohortWhereInput | CohortWhereInput[]
    OR?: CohortWhereInput[]
    NOT?: CohortWhereInput | CohortWhereInput[]
    cohort_id?: IntFilter<"Cohort"> | number
    name?: StringFilter<"Cohort"> | string
    created_at?: DateTimeFilter<"Cohort"> | Date | string
    updated_at?: DateTimeFilter<"Cohort"> | Date | string
    users?: UserListRelationFilter
  }

  export type CohortOrderByWithRelationInput = {
    cohort_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type CohortWhereUniqueInput = Prisma.AtLeast<{
    cohort_id?: number
    name?: string
    AND?: CohortWhereInput | CohortWhereInput[]
    OR?: CohortWhereInput[]
    NOT?: CohortWhereInput | CohortWhereInput[]
    created_at?: DateTimeFilter<"Cohort"> | Date | string
    updated_at?: DateTimeFilter<"Cohort"> | Date | string
    users?: UserListRelationFilter
  }, "cohort_id" | "name">

  export type CohortOrderByWithAggregationInput = {
    cohort_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CohortCountOrderByAggregateInput
    _avg?: CohortAvgOrderByAggregateInput
    _max?: CohortMaxOrderByAggregateInput
    _min?: CohortMinOrderByAggregateInput
    _sum?: CohortSumOrderByAggregateInput
  }

  export type CohortScalarWhereWithAggregatesInput = {
    AND?: CohortScalarWhereWithAggregatesInput | CohortScalarWhereWithAggregatesInput[]
    OR?: CohortScalarWhereWithAggregatesInput[]
    NOT?: CohortScalarWhereWithAggregatesInput | CohortScalarWhereWithAggregatesInput[]
    cohort_id?: IntWithAggregatesFilter<"Cohort"> | number
    name?: StringWithAggregatesFilter<"Cohort"> | string
    created_at?: DateTimeWithAggregatesFilter<"Cohort"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Cohort"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    task_id?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    due_date?: DateTimeNullableFilter<"Task"> | Date | string | null
    points_on_approval?: IntFilter<"Task"> | number
    assignee_type?: EnumTaskAssigneeTypeFilter<"Task"> | $Enums.TaskAssigneeType
    assignee_id?: IntNullableFilter<"Task"> | number | null
    created_at?: DateTimeFilter<"Task"> | Date | string
    updated_at?: DateTimeFilter<"Task"> | Date | string
    submissions?: TaskSubmissionListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    task_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    points_on_approval?: SortOrder
    assignee_type?: SortOrder
    assignee_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    submissions?: TaskSubmissionOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    task_id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    due_date?: DateTimeNullableFilter<"Task"> | Date | string | null
    points_on_approval?: IntFilter<"Task"> | number
    assignee_type?: EnumTaskAssigneeTypeFilter<"Task"> | $Enums.TaskAssigneeType
    assignee_id?: IntNullableFilter<"Task"> | number | null
    created_at?: DateTimeFilter<"Task"> | Date | string
    updated_at?: DateTimeFilter<"Task"> | Date | string
    submissions?: TaskSubmissionListRelationFilter
  }, "task_id">

  export type TaskOrderByWithAggregationInput = {
    task_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    points_on_approval?: SortOrder
    assignee_type?: SortOrder
    assignee_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    task_id?: IntWithAggregatesFilter<"Task"> | number
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    due_date?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    points_on_approval?: IntWithAggregatesFilter<"Task"> | number
    assignee_type?: EnumTaskAssigneeTypeWithAggregatesFilter<"Task"> | $Enums.TaskAssigneeType
    assignee_id?: IntNullableWithAggregatesFilter<"Task"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: IntFilter<"User"> | number
    firebase_uid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    email_verified?: BoolNullableFilter<"User"> | boolean | null
    full_name?: StringNullableFilter<"User"> | string | null
    profile_picture_url?: StringNullableFilter<"User"> | string | null
    disabled?: BoolNullableFilter<"User"> | boolean | null
    role?: StringFilter<"User"> | string
    legacy_id?: IntNullableFilter<"User"> | number | null
    cohort_id?: IntNullableFilter<"User"> | number | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    legacy?: XOR<LegacyNullableScalarRelationFilter, LegacyWhereInput> | null
    cohort?: XOR<CohortNullableScalarRelationFilter, CohortWhereInput> | null
    submissions?: TaskSubmissionListRelationFilter
    reviews_by_user?: TaskSubmissionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    firebase_uid?: SortOrder
    email?: SortOrder
    email_verified?: SortOrderInput | SortOrder
    full_name?: SortOrderInput | SortOrder
    profile_picture_url?: SortOrderInput | SortOrder
    disabled?: SortOrderInput | SortOrder
    role?: SortOrder
    legacy_id?: SortOrderInput | SortOrder
    cohort_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    legacy?: LegacyOrderByWithRelationInput
    cohort?: CohortOrderByWithRelationInput
    submissions?: TaskSubmissionOrderByRelationAggregateInput
    reviews_by_user?: TaskSubmissionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    firebase_uid?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email_verified?: BoolNullableFilter<"User"> | boolean | null
    full_name?: StringNullableFilter<"User"> | string | null
    profile_picture_url?: StringNullableFilter<"User"> | string | null
    disabled?: BoolNullableFilter<"User"> | boolean | null
    role?: StringFilter<"User"> | string
    legacy_id?: IntNullableFilter<"User"> | number | null
    cohort_id?: IntNullableFilter<"User"> | number | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    legacy?: XOR<LegacyNullableScalarRelationFilter, LegacyWhereInput> | null
    cohort?: XOR<CohortNullableScalarRelationFilter, CohortWhereInput> | null
    submissions?: TaskSubmissionListRelationFilter
    reviews_by_user?: TaskSubmissionListRelationFilter
  }, "user_id" | "firebase_uid" | "email">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    firebase_uid?: SortOrder
    email?: SortOrder
    email_verified?: SortOrderInput | SortOrder
    full_name?: SortOrderInput | SortOrder
    profile_picture_url?: SortOrderInput | SortOrder
    disabled?: SortOrderInput | SortOrder
    role?: SortOrder
    legacy_id?: SortOrderInput | SortOrder
    cohort_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"User"> | number
    firebase_uid?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    email_verified?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    full_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    profile_picture_url?: StringNullableWithAggregatesFilter<"User"> | string | null
    disabled?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    role?: StringWithAggregatesFilter<"User"> | string
    legacy_id?: IntNullableWithAggregatesFilter<"User"> | number | null
    cohort_id?: IntNullableWithAggregatesFilter<"User"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TaskSubmissionWhereInput = {
    AND?: TaskSubmissionWhereInput | TaskSubmissionWhereInput[]
    OR?: TaskSubmissionWhereInput[]
    NOT?: TaskSubmissionWhereInput | TaskSubmissionWhereInput[]
    submission_id?: IntFilter<"TaskSubmission"> | number
    task_id?: IntFilter<"TaskSubmission"> | number
    user_id?: IntFilter<"TaskSubmission"> | number
    status?: EnumSubmissionStatusFilter<"TaskSubmission"> | $Enums.SubmissionStatus
    submitted_evidence?: StringNullableFilter<"TaskSubmission"> | string | null
    submitted_at?: DateTimeFilter<"TaskSubmission"> | Date | string
    is_latest?: BoolFilter<"TaskSubmission"> | boolean
    reviewed_by_user_id?: IntNullableFilter<"TaskSubmission"> | number | null
    reviewed_at?: DateTimeNullableFilter<"TaskSubmission"> | Date | string | null
    reviewer_comment?: StringNullableFilter<"TaskSubmission"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewed_by_user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TaskSubmissionOrderByWithRelationInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    submitted_evidence?: SortOrderInput | SortOrder
    submitted_at?: SortOrder
    is_latest?: SortOrder
    reviewed_by_user_id?: SortOrderInput | SortOrder
    reviewed_at?: SortOrderInput | SortOrder
    reviewer_comment?: SortOrderInput | SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    reviewed_by_user?: UserOrderByWithRelationInput
  }

  export type TaskSubmissionWhereUniqueInput = Prisma.AtLeast<{
    submission_id?: number
    AND?: TaskSubmissionWhereInput | TaskSubmissionWhereInput[]
    OR?: TaskSubmissionWhereInput[]
    NOT?: TaskSubmissionWhereInput | TaskSubmissionWhereInput[]
    task_id?: IntFilter<"TaskSubmission"> | number
    user_id?: IntFilter<"TaskSubmission"> | number
    status?: EnumSubmissionStatusFilter<"TaskSubmission"> | $Enums.SubmissionStatus
    submitted_evidence?: StringNullableFilter<"TaskSubmission"> | string | null
    submitted_at?: DateTimeFilter<"TaskSubmission"> | Date | string
    is_latest?: BoolFilter<"TaskSubmission"> | boolean
    reviewed_by_user_id?: IntNullableFilter<"TaskSubmission"> | number | null
    reviewed_at?: DateTimeNullableFilter<"TaskSubmission"> | Date | string | null
    reviewer_comment?: StringNullableFilter<"TaskSubmission"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewed_by_user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "submission_id">

  export type TaskSubmissionOrderByWithAggregationInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    submitted_evidence?: SortOrderInput | SortOrder
    submitted_at?: SortOrder
    is_latest?: SortOrder
    reviewed_by_user_id?: SortOrderInput | SortOrder
    reviewed_at?: SortOrderInput | SortOrder
    reviewer_comment?: SortOrderInput | SortOrder
    _count?: TaskSubmissionCountOrderByAggregateInput
    _avg?: TaskSubmissionAvgOrderByAggregateInput
    _max?: TaskSubmissionMaxOrderByAggregateInput
    _min?: TaskSubmissionMinOrderByAggregateInput
    _sum?: TaskSubmissionSumOrderByAggregateInput
  }

  export type TaskSubmissionScalarWhereWithAggregatesInput = {
    AND?: TaskSubmissionScalarWhereWithAggregatesInput | TaskSubmissionScalarWhereWithAggregatesInput[]
    OR?: TaskSubmissionScalarWhereWithAggregatesInput[]
    NOT?: TaskSubmissionScalarWhereWithAggregatesInput | TaskSubmissionScalarWhereWithAggregatesInput[]
    submission_id?: IntWithAggregatesFilter<"TaskSubmission"> | number
    task_id?: IntWithAggregatesFilter<"TaskSubmission"> | number
    user_id?: IntWithAggregatesFilter<"TaskSubmission"> | number
    status?: EnumSubmissionStatusWithAggregatesFilter<"TaskSubmission"> | $Enums.SubmissionStatus
    submitted_evidence?: StringNullableWithAggregatesFilter<"TaskSubmission"> | string | null
    submitted_at?: DateTimeWithAggregatesFilter<"TaskSubmission"> | Date | string
    is_latest?: BoolWithAggregatesFilter<"TaskSubmission"> | boolean
    reviewed_by_user_id?: IntNullableWithAggregatesFilter<"TaskSubmission"> | number | null
    reviewed_at?: DateTimeNullableWithAggregatesFilter<"TaskSubmission"> | Date | string | null
    reviewer_comment?: StringNullableWithAggregatesFilter<"TaskSubmission"> | string | null
  }

  export type LegacyCreateInput = {
    name: string
    location_filter?: string | null
    points?: number
    created_at?: Date | string
    updated_at?: Date | string
    users?: UserCreateNestedManyWithoutLegacyInput
  }

  export type LegacyUncheckedCreateInput = {
    legacy_id?: number
    name: string
    location_filter?: string | null
    points?: number
    created_at?: Date | string
    updated_at?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutLegacyInput
  }

  export type LegacyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location_filter?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutLegacyNestedInput
  }

  export type LegacyUncheckedUpdateInput = {
    legacy_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location_filter?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutLegacyNestedInput
  }

  export type LegacyCreateManyInput = {
    legacy_id?: number
    name: string
    location_filter?: string | null
    points?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LegacyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location_filter?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LegacyUncheckedUpdateManyInput = {
    legacy_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location_filter?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CohortCreateInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    users?: UserCreateNestedManyWithoutCohortInput
  }

  export type CohortUncheckedCreateInput = {
    cohort_id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCohortInput
  }

  export type CohortUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCohortNestedInput
  }

  export type CohortUncheckedUpdateInput = {
    cohort_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCohortNestedInput
  }

  export type CohortCreateManyInput = {
    cohort_id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CohortUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CohortUncheckedUpdateManyInput = {
    cohort_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    title: string
    description?: string | null
    due_date?: Date | string | null
    points_on_approval?: number
    assignee_type: $Enums.TaskAssigneeType
    assignee_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    submissions?: TaskSubmissionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    task_id?: number
    title: string
    description?: string | null
    due_date?: Date | string | null
    points_on_approval?: number
    assignee_type: $Enums.TaskAssigneeType
    assignee_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    submissions?: TaskSubmissionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    points_on_approval?: IntFieldUpdateOperationsInput | number
    assignee_type?: EnumTaskAssigneeTypeFieldUpdateOperationsInput | $Enums.TaskAssigneeType
    assignee_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: TaskSubmissionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    task_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    points_on_approval?: IntFieldUpdateOperationsInput | number
    assignee_type?: EnumTaskAssigneeTypeFieldUpdateOperationsInput | $Enums.TaskAssigneeType
    assignee_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: TaskSubmissionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    task_id?: number
    title: string
    description?: string | null
    due_date?: Date | string | null
    points_on_approval?: number
    assignee_type: $Enums.TaskAssigneeType
    assignee_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    points_on_approval?: IntFieldUpdateOperationsInput | number
    assignee_type?: EnumTaskAssigneeTypeFieldUpdateOperationsInput | $Enums.TaskAssigneeType
    assignee_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    task_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    points_on_approval?: IntFieldUpdateOperationsInput | number
    assignee_type?: EnumTaskAssigneeTypeFieldUpdateOperationsInput | $Enums.TaskAssigneeType
    assignee_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    legacy?: LegacyCreateNestedOneWithoutUsersInput
    cohort?: CohortCreateNestedOneWithoutUsersInput
    submissions?: TaskSubmissionCreateNestedManyWithoutUserInput
    reviews_by_user?: TaskSubmissionCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    legacy_id?: number | null
    cohort_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    submissions?: TaskSubmissionUncheckedCreateNestedManyWithoutUserInput
    reviews_by_user?: TaskSubmissionUncheckedCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserUpdateInput = {
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    legacy?: LegacyUpdateOneWithoutUsersNestedInput
    cohort?: CohortUpdateOneWithoutUsersNestedInput
    submissions?: TaskSubmissionUpdateManyWithoutUserNestedInput
    reviews_by_user?: TaskSubmissionUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    legacy_id?: NullableIntFieldUpdateOperationsInput | number | null
    cohort_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: TaskSubmissionUncheckedUpdateManyWithoutUserNestedInput
    reviews_by_user?: TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    legacy_id?: number | null
    cohort_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    legacy_id?: NullableIntFieldUpdateOperationsInput | number | null
    cohort_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskSubmissionCreateInput = {
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
    task: TaskCreateNestedOneWithoutSubmissionsInput
    user: UserCreateNestedOneWithoutSubmissionsInput
    reviewed_by_user?: UserCreateNestedOneWithoutReviews_by_userInput
  }

  export type TaskSubmissionUncheckedCreateInput = {
    submission_id?: number
    task_id: number
    user_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_by_user_id?: number | null
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionUpdateInput = {
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubmissionsNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    reviewed_by_user?: UserUpdateOneWithoutReviews_by_userNestedInput
  }

  export type TaskSubmissionUncheckedUpdateInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    task_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_by_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionCreateManyInput = {
    submission_id?: number
    task_id: number
    user_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_by_user_id?: number | null
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionUpdateManyMutationInput = {
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionUncheckedUpdateManyInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    task_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_by_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LegacyCountOrderByAggregateInput = {
    legacy_id?: SortOrder
    name?: SortOrder
    location_filter?: SortOrder
    points?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LegacyAvgOrderByAggregateInput = {
    legacy_id?: SortOrder
    points?: SortOrder
  }

  export type LegacyMaxOrderByAggregateInput = {
    legacy_id?: SortOrder
    name?: SortOrder
    location_filter?: SortOrder
    points?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LegacyMinOrderByAggregateInput = {
    legacy_id?: SortOrder
    name?: SortOrder
    location_filter?: SortOrder
    points?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LegacySumOrderByAggregateInput = {
    legacy_id?: SortOrder
    points?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CohortCountOrderByAggregateInput = {
    cohort_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CohortAvgOrderByAggregateInput = {
    cohort_id?: SortOrder
  }

  export type CohortMaxOrderByAggregateInput = {
    cohort_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CohortMinOrderByAggregateInput = {
    cohort_id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CohortSumOrderByAggregateInput = {
    cohort_id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumTaskAssigneeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskAssigneeType | EnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskAssigneeTypeFilter<$PrismaModel> | $Enums.TaskAssigneeType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TaskSubmissionListRelationFilter = {
    every?: TaskSubmissionWhereInput
    some?: TaskSubmissionWhereInput
    none?: TaskSubmissionWhereInput
  }

  export type TaskSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    task_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    due_date?: SortOrder
    points_on_approval?: SortOrder
    assignee_type?: SortOrder
    assignee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    task_id?: SortOrder
    points_on_approval?: SortOrder
    assignee_id?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    task_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    due_date?: SortOrder
    points_on_approval?: SortOrder
    assignee_type?: SortOrder
    assignee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    task_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    due_date?: SortOrder
    points_on_approval?: SortOrder
    assignee_type?: SortOrder
    assignee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    task_id?: SortOrder
    points_on_approval?: SortOrder
    assignee_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTaskAssigneeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskAssigneeType | EnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskAssigneeTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskAssigneeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskAssigneeTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskAssigneeTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type LegacyNullableScalarRelationFilter = {
    is?: LegacyWhereInput | null
    isNot?: LegacyWhereInput | null
  }

  export type CohortNullableScalarRelationFilter = {
    is?: CohortWhereInput | null
    isNot?: CohortWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    firebase_uid?: SortOrder
    email?: SortOrder
    email_verified?: SortOrder
    full_name?: SortOrder
    profile_picture_url?: SortOrder
    disabled?: SortOrder
    role?: SortOrder
    legacy_id?: SortOrder
    cohort_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    user_id?: SortOrder
    legacy_id?: SortOrder
    cohort_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    firebase_uid?: SortOrder
    email?: SortOrder
    email_verified?: SortOrder
    full_name?: SortOrder
    profile_picture_url?: SortOrder
    disabled?: SortOrder
    role?: SortOrder
    legacy_id?: SortOrder
    cohort_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    firebase_uid?: SortOrder
    email?: SortOrder
    email_verified?: SortOrder
    full_name?: SortOrder
    profile_picture_url?: SortOrder
    disabled?: SortOrder
    role?: SortOrder
    legacy_id?: SortOrder
    cohort_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    user_id?: SortOrder
    legacy_id?: SortOrder
    cohort_id?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumSubmissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusFilter<$PrismaModel> | $Enums.SubmissionStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskSubmissionCountOrderByAggregateInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    submitted_evidence?: SortOrder
    submitted_at?: SortOrder
    is_latest?: SortOrder
    reviewed_by_user_id?: SortOrder
    reviewed_at?: SortOrder
    reviewer_comment?: SortOrder
  }

  export type TaskSubmissionAvgOrderByAggregateInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    reviewed_by_user_id?: SortOrder
  }

  export type TaskSubmissionMaxOrderByAggregateInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    submitted_evidence?: SortOrder
    submitted_at?: SortOrder
    is_latest?: SortOrder
    reviewed_by_user_id?: SortOrder
    reviewed_at?: SortOrder
    reviewer_comment?: SortOrder
  }

  export type TaskSubmissionMinOrderByAggregateInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    status?: SortOrder
    submitted_evidence?: SortOrder
    submitted_at?: SortOrder
    is_latest?: SortOrder
    reviewed_by_user_id?: SortOrder
    reviewed_at?: SortOrder
    reviewer_comment?: SortOrder
  }

  export type TaskSubmissionSumOrderByAggregateInput = {
    submission_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
    reviewed_by_user_id?: SortOrder
  }

  export type EnumSubmissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutLegacyInput = {
    create?: XOR<UserCreateWithoutLegacyInput, UserUncheckedCreateWithoutLegacyInput> | UserCreateWithoutLegacyInput[] | UserUncheckedCreateWithoutLegacyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLegacyInput | UserCreateOrConnectWithoutLegacyInput[]
    createMany?: UserCreateManyLegacyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutLegacyInput = {
    create?: XOR<UserCreateWithoutLegacyInput, UserUncheckedCreateWithoutLegacyInput> | UserCreateWithoutLegacyInput[] | UserUncheckedCreateWithoutLegacyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLegacyInput | UserCreateOrConnectWithoutLegacyInput[]
    createMany?: UserCreateManyLegacyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutLegacyNestedInput = {
    create?: XOR<UserCreateWithoutLegacyInput, UserUncheckedCreateWithoutLegacyInput> | UserCreateWithoutLegacyInput[] | UserUncheckedCreateWithoutLegacyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLegacyInput | UserCreateOrConnectWithoutLegacyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLegacyInput | UserUpsertWithWhereUniqueWithoutLegacyInput[]
    createMany?: UserCreateManyLegacyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLegacyInput | UserUpdateWithWhereUniqueWithoutLegacyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLegacyInput | UserUpdateManyWithWhereWithoutLegacyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutLegacyNestedInput = {
    create?: XOR<UserCreateWithoutLegacyInput, UserUncheckedCreateWithoutLegacyInput> | UserCreateWithoutLegacyInput[] | UserUncheckedCreateWithoutLegacyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLegacyInput | UserCreateOrConnectWithoutLegacyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLegacyInput | UserUpsertWithWhereUniqueWithoutLegacyInput[]
    createMany?: UserCreateManyLegacyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLegacyInput | UserUpdateWithWhereUniqueWithoutLegacyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLegacyInput | UserUpdateManyWithWhereWithoutLegacyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutCohortInput = {
    create?: XOR<UserCreateWithoutCohortInput, UserUncheckedCreateWithoutCohortInput> | UserCreateWithoutCohortInput[] | UserUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCohortInput | UserCreateOrConnectWithoutCohortInput[]
    createMany?: UserCreateManyCohortInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCohortInput = {
    create?: XOR<UserCreateWithoutCohortInput, UserUncheckedCreateWithoutCohortInput> | UserCreateWithoutCohortInput[] | UserUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCohortInput | UserCreateOrConnectWithoutCohortInput[]
    createMany?: UserCreateManyCohortInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutCohortNestedInput = {
    create?: XOR<UserCreateWithoutCohortInput, UserUncheckedCreateWithoutCohortInput> | UserCreateWithoutCohortInput[] | UserUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCohortInput | UserCreateOrConnectWithoutCohortInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCohortInput | UserUpsertWithWhereUniqueWithoutCohortInput[]
    createMany?: UserCreateManyCohortInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCohortInput | UserUpdateWithWhereUniqueWithoutCohortInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCohortInput | UserUpdateManyWithWhereWithoutCohortInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCohortNestedInput = {
    create?: XOR<UserCreateWithoutCohortInput, UserUncheckedCreateWithoutCohortInput> | UserCreateWithoutCohortInput[] | UserUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCohortInput | UserCreateOrConnectWithoutCohortInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCohortInput | UserUpsertWithWhereUniqueWithoutCohortInput[]
    createMany?: UserCreateManyCohortInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCohortInput | UserUpdateWithWhereUniqueWithoutCohortInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCohortInput | UserUpdateManyWithWhereWithoutCohortInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TaskSubmissionCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskSubmissionCreateWithoutTaskInput, TaskSubmissionUncheckedCreateWithoutTaskInput> | TaskSubmissionCreateWithoutTaskInput[] | TaskSubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutTaskInput | TaskSubmissionCreateOrConnectWithoutTaskInput[]
    createMany?: TaskSubmissionCreateManyTaskInputEnvelope
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
  }

  export type TaskSubmissionUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskSubmissionCreateWithoutTaskInput, TaskSubmissionUncheckedCreateWithoutTaskInput> | TaskSubmissionCreateWithoutTaskInput[] | TaskSubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutTaskInput | TaskSubmissionCreateOrConnectWithoutTaskInput[]
    createMany?: TaskSubmissionCreateManyTaskInputEnvelope
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumTaskAssigneeTypeFieldUpdateOperationsInput = {
    set?: $Enums.TaskAssigneeType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskSubmissionUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskSubmissionCreateWithoutTaskInput, TaskSubmissionUncheckedCreateWithoutTaskInput> | TaskSubmissionCreateWithoutTaskInput[] | TaskSubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutTaskInput | TaskSubmissionCreateOrConnectWithoutTaskInput[]
    upsert?: TaskSubmissionUpsertWithWhereUniqueWithoutTaskInput | TaskSubmissionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskSubmissionCreateManyTaskInputEnvelope
    set?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    disconnect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    delete?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    update?: TaskSubmissionUpdateWithWhereUniqueWithoutTaskInput | TaskSubmissionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskSubmissionUpdateManyWithWhereWithoutTaskInput | TaskSubmissionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
  }

  export type TaskSubmissionUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskSubmissionCreateWithoutTaskInput, TaskSubmissionUncheckedCreateWithoutTaskInput> | TaskSubmissionCreateWithoutTaskInput[] | TaskSubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutTaskInput | TaskSubmissionCreateOrConnectWithoutTaskInput[]
    upsert?: TaskSubmissionUpsertWithWhereUniqueWithoutTaskInput | TaskSubmissionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskSubmissionCreateManyTaskInputEnvelope
    set?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    disconnect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    delete?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    update?: TaskSubmissionUpdateWithWhereUniqueWithoutTaskInput | TaskSubmissionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskSubmissionUpdateManyWithWhereWithoutTaskInput | TaskSubmissionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
  }

  export type LegacyCreateNestedOneWithoutUsersInput = {
    create?: XOR<LegacyCreateWithoutUsersInput, LegacyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: LegacyCreateOrConnectWithoutUsersInput
    connect?: LegacyWhereUniqueInput
  }

  export type CohortCreateNestedOneWithoutUsersInput = {
    create?: XOR<CohortCreateWithoutUsersInput, CohortUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CohortCreateOrConnectWithoutUsersInput
    connect?: CohortWhereUniqueInput
  }

  export type TaskSubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskSubmissionCreateWithoutUserInput, TaskSubmissionUncheckedCreateWithoutUserInput> | TaskSubmissionCreateWithoutUserInput[] | TaskSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutUserInput | TaskSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: TaskSubmissionCreateManyUserInputEnvelope
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
  }

  export type TaskSubmissionCreateNestedManyWithoutReviewed_by_userInput = {
    create?: XOR<TaskSubmissionCreateWithoutReviewed_by_userInput, TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput> | TaskSubmissionCreateWithoutReviewed_by_userInput[] | TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput | TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput[]
    createMany?: TaskSubmissionCreateManyReviewed_by_userInputEnvelope
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
  }

  export type TaskSubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskSubmissionCreateWithoutUserInput, TaskSubmissionUncheckedCreateWithoutUserInput> | TaskSubmissionCreateWithoutUserInput[] | TaskSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutUserInput | TaskSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: TaskSubmissionCreateManyUserInputEnvelope
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
  }

  export type TaskSubmissionUncheckedCreateNestedManyWithoutReviewed_by_userInput = {
    create?: XOR<TaskSubmissionCreateWithoutReviewed_by_userInput, TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput> | TaskSubmissionCreateWithoutReviewed_by_userInput[] | TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput | TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput[]
    createMany?: TaskSubmissionCreateManyReviewed_by_userInputEnvelope
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type LegacyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<LegacyCreateWithoutUsersInput, LegacyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: LegacyCreateOrConnectWithoutUsersInput
    upsert?: LegacyUpsertWithoutUsersInput
    disconnect?: LegacyWhereInput | boolean
    delete?: LegacyWhereInput | boolean
    connect?: LegacyWhereUniqueInput
    update?: XOR<XOR<LegacyUpdateToOneWithWhereWithoutUsersInput, LegacyUpdateWithoutUsersInput>, LegacyUncheckedUpdateWithoutUsersInput>
  }

  export type CohortUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CohortCreateWithoutUsersInput, CohortUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CohortCreateOrConnectWithoutUsersInput
    upsert?: CohortUpsertWithoutUsersInput
    disconnect?: CohortWhereInput | boolean
    delete?: CohortWhereInput | boolean
    connect?: CohortWhereUniqueInput
    update?: XOR<XOR<CohortUpdateToOneWithWhereWithoutUsersInput, CohortUpdateWithoutUsersInput>, CohortUncheckedUpdateWithoutUsersInput>
  }

  export type TaskSubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskSubmissionCreateWithoutUserInput, TaskSubmissionUncheckedCreateWithoutUserInput> | TaskSubmissionCreateWithoutUserInput[] | TaskSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutUserInput | TaskSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: TaskSubmissionUpsertWithWhereUniqueWithoutUserInput | TaskSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskSubmissionCreateManyUserInputEnvelope
    set?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    disconnect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    delete?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    update?: TaskSubmissionUpdateWithWhereUniqueWithoutUserInput | TaskSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskSubmissionUpdateManyWithWhereWithoutUserInput | TaskSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
  }

  export type TaskSubmissionUpdateManyWithoutReviewed_by_userNestedInput = {
    create?: XOR<TaskSubmissionCreateWithoutReviewed_by_userInput, TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput> | TaskSubmissionCreateWithoutReviewed_by_userInput[] | TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput | TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput[]
    upsert?: TaskSubmissionUpsertWithWhereUniqueWithoutReviewed_by_userInput | TaskSubmissionUpsertWithWhereUniqueWithoutReviewed_by_userInput[]
    createMany?: TaskSubmissionCreateManyReviewed_by_userInputEnvelope
    set?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    disconnect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    delete?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    update?: TaskSubmissionUpdateWithWhereUniqueWithoutReviewed_by_userInput | TaskSubmissionUpdateWithWhereUniqueWithoutReviewed_by_userInput[]
    updateMany?: TaskSubmissionUpdateManyWithWhereWithoutReviewed_by_userInput | TaskSubmissionUpdateManyWithWhereWithoutReviewed_by_userInput[]
    deleteMany?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
  }

  export type TaskSubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskSubmissionCreateWithoutUserInput, TaskSubmissionUncheckedCreateWithoutUserInput> | TaskSubmissionCreateWithoutUserInput[] | TaskSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutUserInput | TaskSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: TaskSubmissionUpsertWithWhereUniqueWithoutUserInput | TaskSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskSubmissionCreateManyUserInputEnvelope
    set?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    disconnect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    delete?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    update?: TaskSubmissionUpdateWithWhereUniqueWithoutUserInput | TaskSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskSubmissionUpdateManyWithWhereWithoutUserInput | TaskSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
  }

  export type TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userNestedInput = {
    create?: XOR<TaskSubmissionCreateWithoutReviewed_by_userInput, TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput> | TaskSubmissionCreateWithoutReviewed_by_userInput[] | TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput[]
    connectOrCreate?: TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput | TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput[]
    upsert?: TaskSubmissionUpsertWithWhereUniqueWithoutReviewed_by_userInput | TaskSubmissionUpsertWithWhereUniqueWithoutReviewed_by_userInput[]
    createMany?: TaskSubmissionCreateManyReviewed_by_userInputEnvelope
    set?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    disconnect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    delete?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    connect?: TaskSubmissionWhereUniqueInput | TaskSubmissionWhereUniqueInput[]
    update?: TaskSubmissionUpdateWithWhereUniqueWithoutReviewed_by_userInput | TaskSubmissionUpdateWithWhereUniqueWithoutReviewed_by_userInput[]
    updateMany?: TaskSubmissionUpdateManyWithWhereWithoutReviewed_by_userInput | TaskSubmissionUpdateManyWithWhereWithoutReviewed_by_userInput[]
    deleteMany?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubmissionsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviews_by_userInput = {
    create?: XOR<UserCreateWithoutReviews_by_userInput, UserUncheckedCreateWithoutReviews_by_userInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviews_by_userInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSubmissionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubmissionStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TaskUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubmissionsInput
    upsert?: TaskUpsertWithoutSubmissionsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubmissionsInput, TaskUpdateWithoutSubmissionsInput>, TaskUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateOneWithoutReviews_by_userNestedInput = {
    create?: XOR<UserCreateWithoutReviews_by_userInput, UserUncheckedCreateWithoutReviews_by_userInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviews_by_userInput
    upsert?: UserUpsertWithoutReviews_by_userInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviews_by_userInput, UserUpdateWithoutReviews_by_userInput>, UserUncheckedUpdateWithoutReviews_by_userInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTaskAssigneeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskAssigneeType | EnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskAssigneeTypeFilter<$PrismaModel> | $Enums.TaskAssigneeType
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskAssigneeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskAssigneeType | EnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskAssigneeType[] | ListEnumTaskAssigneeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskAssigneeTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskAssigneeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskAssigneeTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskAssigneeTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumSubmissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusFilter<$PrismaModel> | $Enums.SubmissionStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserCreateWithoutLegacyInput = {
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    cohort?: CohortCreateNestedOneWithoutUsersInput
    submissions?: TaskSubmissionCreateNestedManyWithoutUserInput
    reviews_by_user?: TaskSubmissionCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserUncheckedCreateWithoutLegacyInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    cohort_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    submissions?: TaskSubmissionUncheckedCreateNestedManyWithoutUserInput
    reviews_by_user?: TaskSubmissionUncheckedCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserCreateOrConnectWithoutLegacyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLegacyInput, UserUncheckedCreateWithoutLegacyInput>
  }

  export type UserCreateManyLegacyInputEnvelope = {
    data: UserCreateManyLegacyInput | UserCreateManyLegacyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutLegacyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutLegacyInput, UserUncheckedUpdateWithoutLegacyInput>
    create: XOR<UserCreateWithoutLegacyInput, UserUncheckedCreateWithoutLegacyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutLegacyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutLegacyInput, UserUncheckedUpdateWithoutLegacyInput>
  }

  export type UserUpdateManyWithWhereWithoutLegacyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutLegacyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    user_id?: IntFilter<"User"> | number
    firebase_uid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    email_verified?: BoolNullableFilter<"User"> | boolean | null
    full_name?: StringNullableFilter<"User"> | string | null
    profile_picture_url?: StringNullableFilter<"User"> | string | null
    disabled?: BoolNullableFilter<"User"> | boolean | null
    role?: StringFilter<"User"> | string
    legacy_id?: IntNullableFilter<"User"> | number | null
    cohort_id?: IntNullableFilter<"User"> | number | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
  }

  export type UserCreateWithoutCohortInput = {
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    legacy?: LegacyCreateNestedOneWithoutUsersInput
    submissions?: TaskSubmissionCreateNestedManyWithoutUserInput
    reviews_by_user?: TaskSubmissionCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserUncheckedCreateWithoutCohortInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    legacy_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    submissions?: TaskSubmissionUncheckedCreateNestedManyWithoutUserInput
    reviews_by_user?: TaskSubmissionUncheckedCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserCreateOrConnectWithoutCohortInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCohortInput, UserUncheckedCreateWithoutCohortInput>
  }

  export type UserCreateManyCohortInputEnvelope = {
    data: UserCreateManyCohortInput | UserCreateManyCohortInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCohortInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCohortInput, UserUncheckedUpdateWithoutCohortInput>
    create: XOR<UserCreateWithoutCohortInput, UserUncheckedCreateWithoutCohortInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCohortInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCohortInput, UserUncheckedUpdateWithoutCohortInput>
  }

  export type UserUpdateManyWithWhereWithoutCohortInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCohortInput>
  }

  export type TaskSubmissionCreateWithoutTaskInput = {
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
    user: UserCreateNestedOneWithoutSubmissionsInput
    reviewed_by_user?: UserCreateNestedOneWithoutReviews_by_userInput
  }

  export type TaskSubmissionUncheckedCreateWithoutTaskInput = {
    submission_id?: number
    user_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_by_user_id?: number | null
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionCreateOrConnectWithoutTaskInput = {
    where: TaskSubmissionWhereUniqueInput
    create: XOR<TaskSubmissionCreateWithoutTaskInput, TaskSubmissionUncheckedCreateWithoutTaskInput>
  }

  export type TaskSubmissionCreateManyTaskInputEnvelope = {
    data: TaskSubmissionCreateManyTaskInput | TaskSubmissionCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskSubmissionUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskSubmissionWhereUniqueInput
    update: XOR<TaskSubmissionUpdateWithoutTaskInput, TaskSubmissionUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskSubmissionCreateWithoutTaskInput, TaskSubmissionUncheckedCreateWithoutTaskInput>
  }

  export type TaskSubmissionUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskSubmissionWhereUniqueInput
    data: XOR<TaskSubmissionUpdateWithoutTaskInput, TaskSubmissionUncheckedUpdateWithoutTaskInput>
  }

  export type TaskSubmissionUpdateManyWithWhereWithoutTaskInput = {
    where: TaskSubmissionScalarWhereInput
    data: XOR<TaskSubmissionUpdateManyMutationInput, TaskSubmissionUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskSubmissionScalarWhereInput = {
    AND?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
    OR?: TaskSubmissionScalarWhereInput[]
    NOT?: TaskSubmissionScalarWhereInput | TaskSubmissionScalarWhereInput[]
    submission_id?: IntFilter<"TaskSubmission"> | number
    task_id?: IntFilter<"TaskSubmission"> | number
    user_id?: IntFilter<"TaskSubmission"> | number
    status?: EnumSubmissionStatusFilter<"TaskSubmission"> | $Enums.SubmissionStatus
    submitted_evidence?: StringNullableFilter<"TaskSubmission"> | string | null
    submitted_at?: DateTimeFilter<"TaskSubmission"> | Date | string
    is_latest?: BoolFilter<"TaskSubmission"> | boolean
    reviewed_by_user_id?: IntNullableFilter<"TaskSubmission"> | number | null
    reviewed_at?: DateTimeNullableFilter<"TaskSubmission"> | Date | string | null
    reviewer_comment?: StringNullableFilter<"TaskSubmission"> | string | null
  }

  export type LegacyCreateWithoutUsersInput = {
    name: string
    location_filter?: string | null
    points?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LegacyUncheckedCreateWithoutUsersInput = {
    legacy_id?: number
    name: string
    location_filter?: string | null
    points?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LegacyCreateOrConnectWithoutUsersInput = {
    where: LegacyWhereUniqueInput
    create: XOR<LegacyCreateWithoutUsersInput, LegacyUncheckedCreateWithoutUsersInput>
  }

  export type CohortCreateWithoutUsersInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CohortUncheckedCreateWithoutUsersInput = {
    cohort_id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CohortCreateOrConnectWithoutUsersInput = {
    where: CohortWhereUniqueInput
    create: XOR<CohortCreateWithoutUsersInput, CohortUncheckedCreateWithoutUsersInput>
  }

  export type TaskSubmissionCreateWithoutUserInput = {
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
    task: TaskCreateNestedOneWithoutSubmissionsInput
    reviewed_by_user?: UserCreateNestedOneWithoutReviews_by_userInput
  }

  export type TaskSubmissionUncheckedCreateWithoutUserInput = {
    submission_id?: number
    task_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_by_user_id?: number | null
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionCreateOrConnectWithoutUserInput = {
    where: TaskSubmissionWhereUniqueInput
    create: XOR<TaskSubmissionCreateWithoutUserInput, TaskSubmissionUncheckedCreateWithoutUserInput>
  }

  export type TaskSubmissionCreateManyUserInputEnvelope = {
    data: TaskSubmissionCreateManyUserInput | TaskSubmissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskSubmissionCreateWithoutReviewed_by_userInput = {
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
    task: TaskCreateNestedOneWithoutSubmissionsInput
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput = {
    submission_id?: number
    task_id: number
    user_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionCreateOrConnectWithoutReviewed_by_userInput = {
    where: TaskSubmissionWhereUniqueInput
    create: XOR<TaskSubmissionCreateWithoutReviewed_by_userInput, TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput>
  }

  export type TaskSubmissionCreateManyReviewed_by_userInputEnvelope = {
    data: TaskSubmissionCreateManyReviewed_by_userInput | TaskSubmissionCreateManyReviewed_by_userInput[]
    skipDuplicates?: boolean
  }

  export type LegacyUpsertWithoutUsersInput = {
    update: XOR<LegacyUpdateWithoutUsersInput, LegacyUncheckedUpdateWithoutUsersInput>
    create: XOR<LegacyCreateWithoutUsersInput, LegacyUncheckedCreateWithoutUsersInput>
    where?: LegacyWhereInput
  }

  export type LegacyUpdateToOneWithWhereWithoutUsersInput = {
    where?: LegacyWhereInput
    data: XOR<LegacyUpdateWithoutUsersInput, LegacyUncheckedUpdateWithoutUsersInput>
  }

  export type LegacyUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    location_filter?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LegacyUncheckedUpdateWithoutUsersInput = {
    legacy_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location_filter?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CohortUpsertWithoutUsersInput = {
    update: XOR<CohortUpdateWithoutUsersInput, CohortUncheckedUpdateWithoutUsersInput>
    create: XOR<CohortCreateWithoutUsersInput, CohortUncheckedCreateWithoutUsersInput>
    where?: CohortWhereInput
  }

  export type CohortUpdateToOneWithWhereWithoutUsersInput = {
    where?: CohortWhereInput
    data: XOR<CohortUpdateWithoutUsersInput, CohortUncheckedUpdateWithoutUsersInput>
  }

  export type CohortUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CohortUncheckedUpdateWithoutUsersInput = {
    cohort_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskSubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskSubmissionWhereUniqueInput
    update: XOR<TaskSubmissionUpdateWithoutUserInput, TaskSubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<TaskSubmissionCreateWithoutUserInput, TaskSubmissionUncheckedCreateWithoutUserInput>
  }

  export type TaskSubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskSubmissionWhereUniqueInput
    data: XOR<TaskSubmissionUpdateWithoutUserInput, TaskSubmissionUncheckedUpdateWithoutUserInput>
  }

  export type TaskSubmissionUpdateManyWithWhereWithoutUserInput = {
    where: TaskSubmissionScalarWhereInput
    data: XOR<TaskSubmissionUpdateManyMutationInput, TaskSubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskSubmissionUpsertWithWhereUniqueWithoutReviewed_by_userInput = {
    where: TaskSubmissionWhereUniqueInput
    update: XOR<TaskSubmissionUpdateWithoutReviewed_by_userInput, TaskSubmissionUncheckedUpdateWithoutReviewed_by_userInput>
    create: XOR<TaskSubmissionCreateWithoutReviewed_by_userInput, TaskSubmissionUncheckedCreateWithoutReviewed_by_userInput>
  }

  export type TaskSubmissionUpdateWithWhereUniqueWithoutReviewed_by_userInput = {
    where: TaskSubmissionWhereUniqueInput
    data: XOR<TaskSubmissionUpdateWithoutReviewed_by_userInput, TaskSubmissionUncheckedUpdateWithoutReviewed_by_userInput>
  }

  export type TaskSubmissionUpdateManyWithWhereWithoutReviewed_by_userInput = {
    where: TaskSubmissionScalarWhereInput
    data: XOR<TaskSubmissionUpdateManyMutationInput, TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userInput>
  }

  export type TaskCreateWithoutSubmissionsInput = {
    title: string
    description?: string | null
    due_date?: Date | string | null
    points_on_approval?: number
    assignee_type: $Enums.TaskAssigneeType
    assignee_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TaskUncheckedCreateWithoutSubmissionsInput = {
    task_id?: number
    title: string
    description?: string | null
    due_date?: Date | string | null
    points_on_approval?: number
    assignee_type: $Enums.TaskAssigneeType
    assignee_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TaskCreateOrConnectWithoutSubmissionsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    legacy?: LegacyCreateNestedOneWithoutUsersInput
    cohort?: CohortCreateNestedOneWithoutUsersInput
    reviews_by_user?: TaskSubmissionCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    legacy_id?: number | null
    cohort_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    reviews_by_user?: TaskSubmissionUncheckedCreateNestedManyWithoutReviewed_by_userInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserCreateWithoutReviews_by_userInput = {
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    legacy?: LegacyCreateNestedOneWithoutUsersInput
    cohort?: CohortCreateNestedOneWithoutUsersInput
    submissions?: TaskSubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviews_by_userInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    legacy_id?: number | null
    cohort_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    submissions?: TaskSubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviews_by_userInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviews_by_userInput, UserUncheckedCreateWithoutReviews_by_userInput>
  }

  export type TaskUpsertWithoutSubmissionsInput = {
    update: XOR<TaskUpdateWithoutSubmissionsInput, TaskUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubmissionsInput, TaskUncheckedUpdateWithoutSubmissionsInput>
  }

  export type TaskUpdateWithoutSubmissionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    points_on_approval?: IntFieldUpdateOperationsInput | number
    assignee_type?: EnumTaskAssigneeTypeFieldUpdateOperationsInput | $Enums.TaskAssigneeType
    assignee_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateWithoutSubmissionsInput = {
    task_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    points_on_approval?: IntFieldUpdateOperationsInput | number
    assignee_type?: EnumTaskAssigneeTypeFieldUpdateOperationsInput | $Enums.TaskAssigneeType
    assignee_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    legacy?: LegacyUpdateOneWithoutUsersNestedInput
    cohort?: CohortUpdateOneWithoutUsersNestedInput
    reviews_by_user?: TaskSubmissionUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    legacy_id?: NullableIntFieldUpdateOperationsInput | number | null
    cohort_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews_by_user?: TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUpsertWithoutReviews_by_userInput = {
    update: XOR<UserUpdateWithoutReviews_by_userInput, UserUncheckedUpdateWithoutReviews_by_userInput>
    create: XOR<UserCreateWithoutReviews_by_userInput, UserUncheckedCreateWithoutReviews_by_userInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviews_by_userInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviews_by_userInput, UserUncheckedUpdateWithoutReviews_by_userInput>
  }

  export type UserUpdateWithoutReviews_by_userInput = {
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    legacy?: LegacyUpdateOneWithoutUsersNestedInput
    cohort?: CohortUpdateOneWithoutUsersNestedInput
    submissions?: TaskSubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviews_by_userInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    legacy_id?: NullableIntFieldUpdateOperationsInput | number | null
    cohort_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: TaskSubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyLegacyInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    cohort_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateWithoutLegacyInput = {
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    cohort?: CohortUpdateOneWithoutUsersNestedInput
    submissions?: TaskSubmissionUpdateManyWithoutUserNestedInput
    reviews_by_user?: TaskSubmissionUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUncheckedUpdateWithoutLegacyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    cohort_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: TaskSubmissionUncheckedUpdateManyWithoutUserNestedInput
    reviews_by_user?: TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUncheckedUpdateManyWithoutLegacyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    cohort_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyCohortInput = {
    user_id?: number
    firebase_uid: string
    email: string
    email_verified?: boolean | null
    full_name?: string | null
    profile_picture_url?: string | null
    disabled?: boolean | null
    role?: string
    legacy_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateWithoutCohortInput = {
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    legacy?: LegacyUpdateOneWithoutUsersNestedInput
    submissions?: TaskSubmissionUpdateManyWithoutUserNestedInput
    reviews_by_user?: TaskSubmissionUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUncheckedUpdateWithoutCohortInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    legacy_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: TaskSubmissionUncheckedUpdateManyWithoutUserNestedInput
    reviews_by_user?: TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCohortInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    firebase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    role?: StringFieldUpdateOperationsInput | string
    legacy_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskSubmissionCreateManyTaskInput = {
    submission_id?: number
    user_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_by_user_id?: number | null
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionUpdateWithoutTaskInput = {
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    reviewed_by_user?: UserUpdateOneWithoutReviews_by_userNestedInput
  }

  export type TaskSubmissionUncheckedUpdateWithoutTaskInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_by_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionUncheckedUpdateManyWithoutTaskInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_by_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionCreateManyUserInput = {
    submission_id?: number
    task_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_by_user_id?: number | null
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionCreateManyReviewed_by_userInput = {
    submission_id?: number
    task_id: number
    user_id: number
    status?: $Enums.SubmissionStatus
    submitted_evidence?: string | null
    submitted_at?: Date | string
    is_latest?: boolean
    reviewed_at?: Date | string | null
    reviewer_comment?: string | null
  }

  export type TaskSubmissionUpdateWithoutUserInput = {
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubmissionsNestedInput
    reviewed_by_user?: UserUpdateOneWithoutReviews_by_userNestedInput
  }

  export type TaskSubmissionUncheckedUpdateWithoutUserInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    task_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_by_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionUncheckedUpdateManyWithoutUserInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    task_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_by_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionUpdateWithoutReviewed_by_userInput = {
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubmissionsNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type TaskSubmissionUncheckedUpdateWithoutReviewed_by_userInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    task_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskSubmissionUncheckedUpdateManyWithoutReviewed_by_userInput = {
    submission_id?: IntFieldUpdateOperationsInput | number
    task_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    submitted_evidence?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_latest?: BoolFieldUpdateOperationsInput | boolean
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewer_comment?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}