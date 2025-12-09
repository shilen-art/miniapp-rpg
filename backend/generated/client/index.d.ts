
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model WalletLink
 * 
 */
export type WalletLink = $Result.DefaultSelection<Prisma.$WalletLinkPayload>
/**
 * Model BetaAccess
 * 
 */
export type BetaAccess = $Result.DefaultSelection<Prisma.$BetaAccessPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.walletLink`: Exposes CRUD operations for the **WalletLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WalletLinks
    * const walletLinks = await prisma.walletLink.findMany()
    * ```
    */
  get walletLink(): Prisma.WalletLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.betaAccess`: Exposes CRUD operations for the **BetaAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BetaAccesses
    * const betaAccesses = await prisma.betaAccess.findMany()
    * ```
    */
  get betaAccess(): Prisma.BetaAccessDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.1
   * Query Engine version: f09f2815f091dbba658cdcd2264306d88bb5bda6
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    WalletLink: 'WalletLink',
    BetaAccess: 'BetaAccess'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "walletLink" | "betaAccess"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      WalletLink: {
        payload: Prisma.$WalletLinkPayload<ExtArgs>
        fields: Prisma.WalletLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>
          }
          findFirst: {
            args: Prisma.WalletLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>
          }
          findMany: {
            args: Prisma.WalletLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>[]
          }
          create: {
            args: Prisma.WalletLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>
          }
          createMany: {
            args: Prisma.WalletLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>[]
          }
          delete: {
            args: Prisma.WalletLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>
          }
          update: {
            args: Prisma.WalletLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>
          }
          deleteMany: {
            args: Prisma.WalletLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>[]
          }
          upsert: {
            args: Prisma.WalletLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLinkPayload>
          }
          aggregate: {
            args: Prisma.WalletLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWalletLink>
          }
          groupBy: {
            args: Prisma.WalletLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletLinkCountArgs<ExtArgs>
            result: $Utils.Optional<WalletLinkCountAggregateOutputType> | number
          }
        }
      }
      BetaAccess: {
        payload: Prisma.$BetaAccessPayload<ExtArgs>
        fields: Prisma.BetaAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BetaAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BetaAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>
          }
          findFirst: {
            args: Prisma.BetaAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BetaAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>
          }
          findMany: {
            args: Prisma.BetaAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>[]
          }
          create: {
            args: Prisma.BetaAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>
          }
          createMany: {
            args: Prisma.BetaAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BetaAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>[]
          }
          delete: {
            args: Prisma.BetaAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>
          }
          update: {
            args: Prisma.BetaAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>
          }
          deleteMany: {
            args: Prisma.BetaAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BetaAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BetaAccessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>[]
          }
          upsert: {
            args: Prisma.BetaAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetaAccessPayload>
          }
          aggregate: {
            args: Prisma.BetaAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBetaAccess>
          }
          groupBy: {
            args: Prisma.BetaAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<BetaAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.BetaAccessCountArgs<ExtArgs>
            result: $Utils.Optional<BetaAccessCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    user?: UserOmit
    walletLink?: WalletLinkOmit
    betaAccess?: BetaAccessOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    walletLinks: number
    betaAccess: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    walletLinks?: boolean | UserCountOutputTypeCountWalletLinksArgs
    betaAccess?: boolean | UserCountOutputTypeCountBetaAccessArgs
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
  export type UserCountOutputTypeCountWalletLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletLinkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBetaAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BetaAccessWhereInput
  }


  /**
   * Models
   */

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
    id: number | null
    telegramId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    telegramId: bigint | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    telegramId: bigint | null
    username: string | null
    firstName: string | null
    lastName: string | null
    locale: string | null
    createdAt: Date | null
    lastSeenAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    telegramId: bigint | null
    username: string | null
    firstName: string | null
    lastName: string | null
    locale: string | null
    createdAt: Date | null
    lastSeenAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    firstName: number
    lastName: number
    locale: number
    createdAt: number
    lastSeenAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    telegramId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    telegramId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    locale?: true
    createdAt?: true
    lastSeenAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    locale?: true
    createdAt?: true
    lastSeenAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    locale?: true
    createdAt?: true
    lastSeenAt?: true
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
    id: number
    telegramId: bigint
    username: string | null
    firstName: string
    lastName: string | null
    locale: string | null
    createdAt: Date
    lastSeenAt: Date
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
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    locale?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
    walletLinks?: boolean | User$walletLinksArgs<ExtArgs>
    betaAccess?: boolean | User$betaAccessArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    locale?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    locale?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    locale?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "firstName" | "lastName" | "locale" | "createdAt" | "lastSeenAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    walletLinks?: boolean | User$walletLinksArgs<ExtArgs>
    betaAccess?: boolean | User$betaAccessArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      walletLinks: Prisma.$WalletLinkPayload<ExtArgs>[]
      betaAccess: Prisma.$BetaAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      telegramId: bigint
      username: string | null
      firstName: string
      lastName: string | null
      locale: string | null
      createdAt: Date
      lastSeenAt: Date
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
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
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
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
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
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
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
    walletLinks<T extends User$walletLinksArgs<ExtArgs> = {}>(args?: Subset<T, User$walletLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    betaAccess<T extends User$betaAccessArgs<ExtArgs> = {}>(args?: Subset<T, User$betaAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly telegramId: FieldRef<"User", 'BigInt'>
    readonly username: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly locale: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly lastSeenAt: FieldRef<"User", 'DateTime'>
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
   * User.walletLinks
   */
  export type User$walletLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    where?: WalletLinkWhereInput
    orderBy?: WalletLinkOrderByWithRelationInput | WalletLinkOrderByWithRelationInput[]
    cursor?: WalletLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletLinkScalarFieldEnum | WalletLinkScalarFieldEnum[]
  }

  /**
   * User.betaAccess
   */
  export type User$betaAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    where?: BetaAccessWhereInput
    orderBy?: BetaAccessOrderByWithRelationInput | BetaAccessOrderByWithRelationInput[]
    cursor?: BetaAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BetaAccessScalarFieldEnum | BetaAccessScalarFieldEnum[]
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
   * Model WalletLink
   */

  export type AggregateWalletLink = {
    _count: WalletLinkCountAggregateOutputType | null
    _avg: WalletLinkAvgAggregateOutputType | null
    _sum: WalletLinkSumAggregateOutputType | null
    _min: WalletLinkMinAggregateOutputType | null
    _max: WalletLinkMaxAggregateOutputType | null
  }

  export type WalletLinkAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type WalletLinkSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type WalletLinkMinAggregateOutputType = {
    id: number | null
    userId: number | null
    chain: string | null
    address: string | null
    isActive: boolean | null
    createdAt: Date | null
    lastVerifiedAt: Date | null
  }

  export type WalletLinkMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    chain: string | null
    address: string | null
    isActive: boolean | null
    createdAt: Date | null
    lastVerifiedAt: Date | null
  }

  export type WalletLinkCountAggregateOutputType = {
    id: number
    userId: number
    chain: number
    address: number
    isActive: number
    createdAt: number
    lastVerifiedAt: number
    _all: number
  }


  export type WalletLinkAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type WalletLinkSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type WalletLinkMinAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    address?: true
    isActive?: true
    createdAt?: true
    lastVerifiedAt?: true
  }

  export type WalletLinkMaxAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    address?: true
    isActive?: true
    createdAt?: true
    lastVerifiedAt?: true
  }

  export type WalletLinkCountAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    address?: true
    isActive?: true
    createdAt?: true
    lastVerifiedAt?: true
    _all?: true
  }

  export type WalletLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletLink to aggregate.
     */
    where?: WalletLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLinks to fetch.
     */
    orderBy?: WalletLinkOrderByWithRelationInput | WalletLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WalletLinks
    **/
    _count?: true | WalletLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletLinkMaxAggregateInputType
  }

  export type GetWalletLinkAggregateType<T extends WalletLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateWalletLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWalletLink[P]>
      : GetScalarType<T[P], AggregateWalletLink[P]>
  }




  export type WalletLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletLinkWhereInput
    orderBy?: WalletLinkOrderByWithAggregationInput | WalletLinkOrderByWithAggregationInput[]
    by: WalletLinkScalarFieldEnum[] | WalletLinkScalarFieldEnum
    having?: WalletLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletLinkCountAggregateInputType | true
    _avg?: WalletLinkAvgAggregateInputType
    _sum?: WalletLinkSumAggregateInputType
    _min?: WalletLinkMinAggregateInputType
    _max?: WalletLinkMaxAggregateInputType
  }

  export type WalletLinkGroupByOutputType = {
    id: number
    userId: number
    chain: string
    address: string
    isActive: boolean
    createdAt: Date
    lastVerifiedAt: Date | null
    _count: WalletLinkCountAggregateOutputType | null
    _avg: WalletLinkAvgAggregateOutputType | null
    _sum: WalletLinkSumAggregateOutputType | null
    _min: WalletLinkMinAggregateOutputType | null
    _max: WalletLinkMaxAggregateOutputType | null
  }

  type GetWalletLinkGroupByPayload<T extends WalletLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletLinkGroupByOutputType[P]>
            : GetScalarType<T[P], WalletLinkGroupByOutputType[P]>
        }
      >
    >


  export type WalletLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    lastVerifiedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletLink"]>

  export type WalletLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    lastVerifiedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletLink"]>

  export type WalletLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    lastVerifiedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletLink"]>

  export type WalletLinkSelectScalar = {
    id?: boolean
    userId?: boolean
    chain?: boolean
    address?: boolean
    isActive?: boolean
    createdAt?: boolean
    lastVerifiedAt?: boolean
  }

  export type WalletLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "chain" | "address" | "isActive" | "createdAt" | "lastVerifiedAt", ExtArgs["result"]["walletLink"]>
  export type WalletLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WalletLink"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      chain: string
      address: string
      isActive: boolean
      createdAt: Date
      lastVerifiedAt: Date | null
    }, ExtArgs["result"]["walletLink"]>
    composites: {}
  }

  type WalletLinkGetPayload<S extends boolean | null | undefined | WalletLinkDefaultArgs> = $Result.GetResult<Prisma.$WalletLinkPayload, S>

  type WalletLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletLinkCountAggregateInputType | true
    }

  export interface WalletLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WalletLink'], meta: { name: 'WalletLink' } }
    /**
     * Find zero or one WalletLink that matches the filter.
     * @param {WalletLinkFindUniqueArgs} args - Arguments to find a WalletLink
     * @example
     * // Get one WalletLink
     * const walletLink = await prisma.walletLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletLinkFindUniqueArgs>(args: SelectSubset<T, WalletLinkFindUniqueArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WalletLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletLinkFindUniqueOrThrowArgs} args - Arguments to find a WalletLink
     * @example
     * // Get one WalletLink
     * const walletLink = await prisma.walletLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkFindFirstArgs} args - Arguments to find a WalletLink
     * @example
     * // Get one WalletLink
     * const walletLink = await prisma.walletLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletLinkFindFirstArgs>(args?: SelectSubset<T, WalletLinkFindFirstArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkFindFirstOrThrowArgs} args - Arguments to find a WalletLink
     * @example
     * // Get one WalletLink
     * const walletLink = await prisma.walletLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WalletLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WalletLinks
     * const walletLinks = await prisma.walletLink.findMany()
     * 
     * // Get first 10 WalletLinks
     * const walletLinks = await prisma.walletLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletLinkWithIdOnly = await prisma.walletLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletLinkFindManyArgs>(args?: SelectSubset<T, WalletLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WalletLink.
     * @param {WalletLinkCreateArgs} args - Arguments to create a WalletLink.
     * @example
     * // Create one WalletLink
     * const WalletLink = await prisma.walletLink.create({
     *   data: {
     *     // ... data to create a WalletLink
     *   }
     * })
     * 
     */
    create<T extends WalletLinkCreateArgs>(args: SelectSubset<T, WalletLinkCreateArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WalletLinks.
     * @param {WalletLinkCreateManyArgs} args - Arguments to create many WalletLinks.
     * @example
     * // Create many WalletLinks
     * const walletLink = await prisma.walletLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletLinkCreateManyArgs>(args?: SelectSubset<T, WalletLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WalletLinks and returns the data saved in the database.
     * @param {WalletLinkCreateManyAndReturnArgs} args - Arguments to create many WalletLinks.
     * @example
     * // Create many WalletLinks
     * const walletLink = await prisma.walletLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WalletLinks and only return the `id`
     * const walletLinkWithIdOnly = await prisma.walletLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WalletLink.
     * @param {WalletLinkDeleteArgs} args - Arguments to delete one WalletLink.
     * @example
     * // Delete one WalletLink
     * const WalletLink = await prisma.walletLink.delete({
     *   where: {
     *     // ... filter to delete one WalletLink
     *   }
     * })
     * 
     */
    delete<T extends WalletLinkDeleteArgs>(args: SelectSubset<T, WalletLinkDeleteArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WalletLink.
     * @param {WalletLinkUpdateArgs} args - Arguments to update one WalletLink.
     * @example
     * // Update one WalletLink
     * const walletLink = await prisma.walletLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletLinkUpdateArgs>(args: SelectSubset<T, WalletLinkUpdateArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WalletLinks.
     * @param {WalletLinkDeleteManyArgs} args - Arguments to filter WalletLinks to delete.
     * @example
     * // Delete a few WalletLinks
     * const { count } = await prisma.walletLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletLinkDeleteManyArgs>(args?: SelectSubset<T, WalletLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WalletLinks
     * const walletLink = await prisma.walletLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletLinkUpdateManyArgs>(args: SelectSubset<T, WalletLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletLinks and returns the data updated in the database.
     * @param {WalletLinkUpdateManyAndReturnArgs} args - Arguments to update many WalletLinks.
     * @example
     * // Update many WalletLinks
     * const walletLink = await prisma.walletLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WalletLinks and only return the `id`
     * const walletLinkWithIdOnly = await prisma.walletLink.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends WalletLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WalletLink.
     * @param {WalletLinkUpsertArgs} args - Arguments to update or create a WalletLink.
     * @example
     * // Update or create a WalletLink
     * const walletLink = await prisma.walletLink.upsert({
     *   create: {
     *     // ... data to create a WalletLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WalletLink we want to update
     *   }
     * })
     */
    upsert<T extends WalletLinkUpsertArgs>(args: SelectSubset<T, WalletLinkUpsertArgs<ExtArgs>>): Prisma__WalletLinkClient<$Result.GetResult<Prisma.$WalletLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WalletLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkCountArgs} args - Arguments to filter WalletLinks to count.
     * @example
     * // Count the number of WalletLinks
     * const count = await prisma.walletLink.count({
     *   where: {
     *     // ... the filter for the WalletLinks we want to count
     *   }
     * })
    **/
    count<T extends WalletLinkCountArgs>(
      args?: Subset<T, WalletLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WalletLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletLinkAggregateArgs>(args: Subset<T, WalletLinkAggregateArgs>): Prisma.PrismaPromise<GetWalletLinkAggregateType<T>>

    /**
     * Group by WalletLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLinkGroupByArgs} args - Group by arguments.
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
      T extends WalletLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletLinkGroupByArgs['orderBy'] }
        : { orderBy?: WalletLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WalletLink model
   */
  readonly fields: WalletLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WalletLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WalletLink model
   */
  interface WalletLinkFieldRefs {
    readonly id: FieldRef<"WalletLink", 'Int'>
    readonly userId: FieldRef<"WalletLink", 'Int'>
    readonly chain: FieldRef<"WalletLink", 'String'>
    readonly address: FieldRef<"WalletLink", 'String'>
    readonly isActive: FieldRef<"WalletLink", 'Boolean'>
    readonly createdAt: FieldRef<"WalletLink", 'DateTime'>
    readonly lastVerifiedAt: FieldRef<"WalletLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WalletLink findUnique
   */
  export type WalletLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * Filter, which WalletLink to fetch.
     */
    where: WalletLinkWhereUniqueInput
  }

  /**
   * WalletLink findUniqueOrThrow
   */
  export type WalletLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * Filter, which WalletLink to fetch.
     */
    where: WalletLinkWhereUniqueInput
  }

  /**
   * WalletLink findFirst
   */
  export type WalletLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * Filter, which WalletLink to fetch.
     */
    where?: WalletLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLinks to fetch.
     */
    orderBy?: WalletLinkOrderByWithRelationInput | WalletLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletLinks.
     */
    cursor?: WalletLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletLinks.
     */
    distinct?: WalletLinkScalarFieldEnum | WalletLinkScalarFieldEnum[]
  }

  /**
   * WalletLink findFirstOrThrow
   */
  export type WalletLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * Filter, which WalletLink to fetch.
     */
    where?: WalletLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLinks to fetch.
     */
    orderBy?: WalletLinkOrderByWithRelationInput | WalletLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletLinks.
     */
    cursor?: WalletLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletLinks.
     */
    distinct?: WalletLinkScalarFieldEnum | WalletLinkScalarFieldEnum[]
  }

  /**
   * WalletLink findMany
   */
  export type WalletLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * Filter, which WalletLinks to fetch.
     */
    where?: WalletLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLinks to fetch.
     */
    orderBy?: WalletLinkOrderByWithRelationInput | WalletLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WalletLinks.
     */
    cursor?: WalletLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLinks.
     */
    skip?: number
    distinct?: WalletLinkScalarFieldEnum | WalletLinkScalarFieldEnum[]
  }

  /**
   * WalletLink create
   */
  export type WalletLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a WalletLink.
     */
    data: XOR<WalletLinkCreateInput, WalletLinkUncheckedCreateInput>
  }

  /**
   * WalletLink createMany
   */
  export type WalletLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WalletLinks.
     */
    data: WalletLinkCreateManyInput | WalletLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WalletLink createManyAndReturn
   */
  export type WalletLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * The data used to create many WalletLinks.
     */
    data: WalletLinkCreateManyInput | WalletLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletLink update
   */
  export type WalletLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a WalletLink.
     */
    data: XOR<WalletLinkUpdateInput, WalletLinkUncheckedUpdateInput>
    /**
     * Choose, which WalletLink to update.
     */
    where: WalletLinkWhereUniqueInput
  }

  /**
   * WalletLink updateMany
   */
  export type WalletLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WalletLinks.
     */
    data: XOR<WalletLinkUpdateManyMutationInput, WalletLinkUncheckedUpdateManyInput>
    /**
     * Filter which WalletLinks to update
     */
    where?: WalletLinkWhereInput
    /**
     * Limit how many WalletLinks to update.
     */
    limit?: number
  }

  /**
   * WalletLink updateManyAndReturn
   */
  export type WalletLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * The data used to update WalletLinks.
     */
    data: XOR<WalletLinkUpdateManyMutationInput, WalletLinkUncheckedUpdateManyInput>
    /**
     * Filter which WalletLinks to update
     */
    where?: WalletLinkWhereInput
    /**
     * Limit how many WalletLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletLink upsert
   */
  export type WalletLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the WalletLink to update in case it exists.
     */
    where: WalletLinkWhereUniqueInput
    /**
     * In case the WalletLink found by the `where` argument doesn't exist, create a new WalletLink with this data.
     */
    create: XOR<WalletLinkCreateInput, WalletLinkUncheckedCreateInput>
    /**
     * In case the WalletLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletLinkUpdateInput, WalletLinkUncheckedUpdateInput>
  }

  /**
   * WalletLink delete
   */
  export type WalletLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
    /**
     * Filter which WalletLink to delete.
     */
    where: WalletLinkWhereUniqueInput
  }

  /**
   * WalletLink deleteMany
   */
  export type WalletLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletLinks to delete
     */
    where?: WalletLinkWhereInput
    /**
     * Limit how many WalletLinks to delete.
     */
    limit?: number
  }

  /**
   * WalletLink without action
   */
  export type WalletLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLink
     */
    select?: WalletLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLink
     */
    omit?: WalletLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLinkInclude<ExtArgs> | null
  }


  /**
   * Model BetaAccess
   */

  export type AggregateBetaAccess = {
    _count: BetaAccessCountAggregateOutputType | null
    _avg: BetaAccessAvgAggregateOutputType | null
    _sum: BetaAccessSumAggregateOutputType | null
    _min: BetaAccessMinAggregateOutputType | null
    _max: BetaAccessMaxAggregateOutputType | null
  }

  export type BetaAccessAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type BetaAccessSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type BetaAccessMinAggregateOutputType = {
    id: number | null
    userId: number | null
    reason: string | null
    grantedAt: Date | null
    revokedAt: Date | null
  }

  export type BetaAccessMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    reason: string | null
    grantedAt: Date | null
    revokedAt: Date | null
  }

  export type BetaAccessCountAggregateOutputType = {
    id: number
    userId: number
    reason: number
    grantedAt: number
    revokedAt: number
    _all: number
  }


  export type BetaAccessAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type BetaAccessSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type BetaAccessMinAggregateInputType = {
    id?: true
    userId?: true
    reason?: true
    grantedAt?: true
    revokedAt?: true
  }

  export type BetaAccessMaxAggregateInputType = {
    id?: true
    userId?: true
    reason?: true
    grantedAt?: true
    revokedAt?: true
  }

  export type BetaAccessCountAggregateInputType = {
    id?: true
    userId?: true
    reason?: true
    grantedAt?: true
    revokedAt?: true
    _all?: true
  }

  export type BetaAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BetaAccess to aggregate.
     */
    where?: BetaAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BetaAccesses to fetch.
     */
    orderBy?: BetaAccessOrderByWithRelationInput | BetaAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BetaAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BetaAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BetaAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BetaAccesses
    **/
    _count?: true | BetaAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BetaAccessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BetaAccessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BetaAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BetaAccessMaxAggregateInputType
  }

  export type GetBetaAccessAggregateType<T extends BetaAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateBetaAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBetaAccess[P]>
      : GetScalarType<T[P], AggregateBetaAccess[P]>
  }




  export type BetaAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BetaAccessWhereInput
    orderBy?: BetaAccessOrderByWithAggregationInput | BetaAccessOrderByWithAggregationInput[]
    by: BetaAccessScalarFieldEnum[] | BetaAccessScalarFieldEnum
    having?: BetaAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BetaAccessCountAggregateInputType | true
    _avg?: BetaAccessAvgAggregateInputType
    _sum?: BetaAccessSumAggregateInputType
    _min?: BetaAccessMinAggregateInputType
    _max?: BetaAccessMaxAggregateInputType
  }

  export type BetaAccessGroupByOutputType = {
    id: number
    userId: number
    reason: string
    grantedAt: Date
    revokedAt: Date | null
    _count: BetaAccessCountAggregateOutputType | null
    _avg: BetaAccessAvgAggregateOutputType | null
    _sum: BetaAccessSumAggregateOutputType | null
    _min: BetaAccessMinAggregateOutputType | null
    _max: BetaAccessMaxAggregateOutputType | null
  }

  type GetBetaAccessGroupByPayload<T extends BetaAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BetaAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BetaAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BetaAccessGroupByOutputType[P]>
            : GetScalarType<T[P], BetaAccessGroupByOutputType[P]>
        }
      >
    >


  export type BetaAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reason?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["betaAccess"]>

  export type BetaAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reason?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["betaAccess"]>

  export type BetaAccessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reason?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["betaAccess"]>

  export type BetaAccessSelectScalar = {
    id?: boolean
    userId?: boolean
    reason?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
  }

  export type BetaAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "reason" | "grantedAt" | "revokedAt", ExtArgs["result"]["betaAccess"]>
  export type BetaAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BetaAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BetaAccessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BetaAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BetaAccess"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      reason: string
      grantedAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["betaAccess"]>
    composites: {}
  }

  type BetaAccessGetPayload<S extends boolean | null | undefined | BetaAccessDefaultArgs> = $Result.GetResult<Prisma.$BetaAccessPayload, S>

  type BetaAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BetaAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BetaAccessCountAggregateInputType | true
    }

  export interface BetaAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BetaAccess'], meta: { name: 'BetaAccess' } }
    /**
     * Find zero or one BetaAccess that matches the filter.
     * @param {BetaAccessFindUniqueArgs} args - Arguments to find a BetaAccess
     * @example
     * // Get one BetaAccess
     * const betaAccess = await prisma.betaAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BetaAccessFindUniqueArgs>(args: SelectSubset<T, BetaAccessFindUniqueArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BetaAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BetaAccessFindUniqueOrThrowArgs} args - Arguments to find a BetaAccess
     * @example
     * // Get one BetaAccess
     * const betaAccess = await prisma.betaAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BetaAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, BetaAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BetaAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessFindFirstArgs} args - Arguments to find a BetaAccess
     * @example
     * // Get one BetaAccess
     * const betaAccess = await prisma.betaAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BetaAccessFindFirstArgs>(args?: SelectSubset<T, BetaAccessFindFirstArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BetaAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessFindFirstOrThrowArgs} args - Arguments to find a BetaAccess
     * @example
     * // Get one BetaAccess
     * const betaAccess = await prisma.betaAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BetaAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, BetaAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BetaAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BetaAccesses
     * const betaAccesses = await prisma.betaAccess.findMany()
     * 
     * // Get first 10 BetaAccesses
     * const betaAccesses = await prisma.betaAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const betaAccessWithIdOnly = await prisma.betaAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BetaAccessFindManyArgs>(args?: SelectSubset<T, BetaAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BetaAccess.
     * @param {BetaAccessCreateArgs} args - Arguments to create a BetaAccess.
     * @example
     * // Create one BetaAccess
     * const BetaAccess = await prisma.betaAccess.create({
     *   data: {
     *     // ... data to create a BetaAccess
     *   }
     * })
     * 
     */
    create<T extends BetaAccessCreateArgs>(args: SelectSubset<T, BetaAccessCreateArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BetaAccesses.
     * @param {BetaAccessCreateManyArgs} args - Arguments to create many BetaAccesses.
     * @example
     * // Create many BetaAccesses
     * const betaAccess = await prisma.betaAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BetaAccessCreateManyArgs>(args?: SelectSubset<T, BetaAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BetaAccesses and returns the data saved in the database.
     * @param {BetaAccessCreateManyAndReturnArgs} args - Arguments to create many BetaAccesses.
     * @example
     * // Create many BetaAccesses
     * const betaAccess = await prisma.betaAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BetaAccesses and only return the `id`
     * const betaAccessWithIdOnly = await prisma.betaAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BetaAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, BetaAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BetaAccess.
     * @param {BetaAccessDeleteArgs} args - Arguments to delete one BetaAccess.
     * @example
     * // Delete one BetaAccess
     * const BetaAccess = await prisma.betaAccess.delete({
     *   where: {
     *     // ... filter to delete one BetaAccess
     *   }
     * })
     * 
     */
    delete<T extends BetaAccessDeleteArgs>(args: SelectSubset<T, BetaAccessDeleteArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BetaAccess.
     * @param {BetaAccessUpdateArgs} args - Arguments to update one BetaAccess.
     * @example
     * // Update one BetaAccess
     * const betaAccess = await prisma.betaAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BetaAccessUpdateArgs>(args: SelectSubset<T, BetaAccessUpdateArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BetaAccesses.
     * @param {BetaAccessDeleteManyArgs} args - Arguments to filter BetaAccesses to delete.
     * @example
     * // Delete a few BetaAccesses
     * const { count } = await prisma.betaAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BetaAccessDeleteManyArgs>(args?: SelectSubset<T, BetaAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BetaAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BetaAccesses
     * const betaAccess = await prisma.betaAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BetaAccessUpdateManyArgs>(args: SelectSubset<T, BetaAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BetaAccesses and returns the data updated in the database.
     * @param {BetaAccessUpdateManyAndReturnArgs} args - Arguments to update many BetaAccesses.
     * @example
     * // Update many BetaAccesses
     * const betaAccess = await prisma.betaAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BetaAccesses and only return the `id`
     * const betaAccessWithIdOnly = await prisma.betaAccess.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends BetaAccessUpdateManyAndReturnArgs>(args: SelectSubset<T, BetaAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BetaAccess.
     * @param {BetaAccessUpsertArgs} args - Arguments to update or create a BetaAccess.
     * @example
     * // Update or create a BetaAccess
     * const betaAccess = await prisma.betaAccess.upsert({
     *   create: {
     *     // ... data to create a BetaAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BetaAccess we want to update
     *   }
     * })
     */
    upsert<T extends BetaAccessUpsertArgs>(args: SelectSubset<T, BetaAccessUpsertArgs<ExtArgs>>): Prisma__BetaAccessClient<$Result.GetResult<Prisma.$BetaAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BetaAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessCountArgs} args - Arguments to filter BetaAccesses to count.
     * @example
     * // Count the number of BetaAccesses
     * const count = await prisma.betaAccess.count({
     *   where: {
     *     // ... the filter for the BetaAccesses we want to count
     *   }
     * })
    **/
    count<T extends BetaAccessCountArgs>(
      args?: Subset<T, BetaAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BetaAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BetaAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BetaAccessAggregateArgs>(args: Subset<T, BetaAccessAggregateArgs>): Prisma.PrismaPromise<GetBetaAccessAggregateType<T>>

    /**
     * Group by BetaAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaAccessGroupByArgs} args - Group by arguments.
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
      T extends BetaAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BetaAccessGroupByArgs['orderBy'] }
        : { orderBy?: BetaAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BetaAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBetaAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BetaAccess model
   */
  readonly fields: BetaAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BetaAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BetaAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BetaAccess model
   */
  interface BetaAccessFieldRefs {
    readonly id: FieldRef<"BetaAccess", 'Int'>
    readonly userId: FieldRef<"BetaAccess", 'Int'>
    readonly reason: FieldRef<"BetaAccess", 'String'>
    readonly grantedAt: FieldRef<"BetaAccess", 'DateTime'>
    readonly revokedAt: FieldRef<"BetaAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BetaAccess findUnique
   */
  export type BetaAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * Filter, which BetaAccess to fetch.
     */
    where: BetaAccessWhereUniqueInput
  }

  /**
   * BetaAccess findUniqueOrThrow
   */
  export type BetaAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * Filter, which BetaAccess to fetch.
     */
    where: BetaAccessWhereUniqueInput
  }

  /**
   * BetaAccess findFirst
   */
  export type BetaAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * Filter, which BetaAccess to fetch.
     */
    where?: BetaAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BetaAccesses to fetch.
     */
    orderBy?: BetaAccessOrderByWithRelationInput | BetaAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BetaAccesses.
     */
    cursor?: BetaAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BetaAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BetaAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BetaAccesses.
     */
    distinct?: BetaAccessScalarFieldEnum | BetaAccessScalarFieldEnum[]
  }

  /**
   * BetaAccess findFirstOrThrow
   */
  export type BetaAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * Filter, which BetaAccess to fetch.
     */
    where?: BetaAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BetaAccesses to fetch.
     */
    orderBy?: BetaAccessOrderByWithRelationInput | BetaAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BetaAccesses.
     */
    cursor?: BetaAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BetaAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BetaAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BetaAccesses.
     */
    distinct?: BetaAccessScalarFieldEnum | BetaAccessScalarFieldEnum[]
  }

  /**
   * BetaAccess findMany
   */
  export type BetaAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * Filter, which BetaAccesses to fetch.
     */
    where?: BetaAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BetaAccesses to fetch.
     */
    orderBy?: BetaAccessOrderByWithRelationInput | BetaAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BetaAccesses.
     */
    cursor?: BetaAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BetaAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BetaAccesses.
     */
    skip?: number
    distinct?: BetaAccessScalarFieldEnum | BetaAccessScalarFieldEnum[]
  }

  /**
   * BetaAccess create
   */
  export type BetaAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a BetaAccess.
     */
    data: XOR<BetaAccessCreateInput, BetaAccessUncheckedCreateInput>
  }

  /**
   * BetaAccess createMany
   */
  export type BetaAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BetaAccesses.
     */
    data: BetaAccessCreateManyInput | BetaAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BetaAccess createManyAndReturn
   */
  export type BetaAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * The data used to create many BetaAccesses.
     */
    data: BetaAccessCreateManyInput | BetaAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BetaAccess update
   */
  export type BetaAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a BetaAccess.
     */
    data: XOR<BetaAccessUpdateInput, BetaAccessUncheckedUpdateInput>
    /**
     * Choose, which BetaAccess to update.
     */
    where: BetaAccessWhereUniqueInput
  }

  /**
   * BetaAccess updateMany
   */
  export type BetaAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BetaAccesses.
     */
    data: XOR<BetaAccessUpdateManyMutationInput, BetaAccessUncheckedUpdateManyInput>
    /**
     * Filter which BetaAccesses to update
     */
    where?: BetaAccessWhereInput
    /**
     * Limit how many BetaAccesses to update.
     */
    limit?: number
  }

  /**
   * BetaAccess updateManyAndReturn
   */
  export type BetaAccessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * The data used to update BetaAccesses.
     */
    data: XOR<BetaAccessUpdateManyMutationInput, BetaAccessUncheckedUpdateManyInput>
    /**
     * Filter which BetaAccesses to update
     */
    where?: BetaAccessWhereInput
    /**
     * Limit how many BetaAccesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BetaAccess upsert
   */
  export type BetaAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the BetaAccess to update in case it exists.
     */
    where: BetaAccessWhereUniqueInput
    /**
     * In case the BetaAccess found by the `where` argument doesn't exist, create a new BetaAccess with this data.
     */
    create: XOR<BetaAccessCreateInput, BetaAccessUncheckedCreateInput>
    /**
     * In case the BetaAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BetaAccessUpdateInput, BetaAccessUncheckedUpdateInput>
  }

  /**
   * BetaAccess delete
   */
  export type BetaAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
    /**
     * Filter which BetaAccess to delete.
     */
    where: BetaAccessWhereUniqueInput
  }

  /**
   * BetaAccess deleteMany
   */
  export type BetaAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BetaAccesses to delete
     */
    where?: BetaAccessWhereInput
    /**
     * Limit how many BetaAccesses to delete.
     */
    limit?: number
  }

  /**
   * BetaAccess without action
   */
  export type BetaAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BetaAccess
     */
    select?: BetaAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BetaAccess
     */
    omit?: BetaAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetaAccessInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    locale: 'locale',
    createdAt: 'createdAt',
    lastSeenAt: 'lastSeenAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletLinkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    chain: 'chain',
    address: 'address',
    isActive: 'isActive',
    createdAt: 'createdAt',
    lastVerifiedAt: 'lastVerifiedAt'
  };

  export type WalletLinkScalarFieldEnum = (typeof WalletLinkScalarFieldEnum)[keyof typeof WalletLinkScalarFieldEnum]


  export const BetaAccessScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    reason: 'reason',
    grantedAt: 'grantedAt',
    revokedAt: 'revokedAt'
  };

  export type BetaAccessScalarFieldEnum = (typeof BetaAccessScalarFieldEnum)[keyof typeof BetaAccessScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    telegramId?: BigIntFilter<"User"> | bigint | number
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    locale?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastSeenAt?: DateTimeFilter<"User"> | Date | string
    walletLinks?: WalletLinkListRelationFilter
    betaAccess?: BetaAccessListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    locale?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    walletLinks?: WalletLinkOrderByRelationAggregateInput
    betaAccess?: BetaAccessOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    telegramId?: bigint | number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    locale?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastSeenAt?: DateTimeFilter<"User"> | Date | string
    walletLinks?: WalletLinkListRelationFilter
    betaAccess?: BetaAccessListRelationFilter
  }, "id" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    locale?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
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
    id?: IntWithAggregatesFilter<"User"> | number
    telegramId?: BigIntWithAggregatesFilter<"User"> | bigint | number
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    locale?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastSeenAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WalletLinkWhereInput = {
    AND?: WalletLinkWhereInput | WalletLinkWhereInput[]
    OR?: WalletLinkWhereInput[]
    NOT?: WalletLinkWhereInput | WalletLinkWhereInput[]
    id?: IntFilter<"WalletLink"> | number
    userId?: IntFilter<"WalletLink"> | number
    chain?: StringFilter<"WalletLink"> | string
    address?: StringFilter<"WalletLink"> | string
    isActive?: BoolFilter<"WalletLink"> | boolean
    createdAt?: DateTimeFilter<"WalletLink"> | Date | string
    lastVerifiedAt?: DateTimeNullableFilter<"WalletLink"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WalletLinkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    lastVerifiedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WalletLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    chain_address?: WalletLinkChainAddressCompoundUniqueInput
    AND?: WalletLinkWhereInput | WalletLinkWhereInput[]
    OR?: WalletLinkWhereInput[]
    NOT?: WalletLinkWhereInput | WalletLinkWhereInput[]
    userId?: IntFilter<"WalletLink"> | number
    chain?: StringFilter<"WalletLink"> | string
    address?: StringFilter<"WalletLink"> | string
    isActive?: BoolFilter<"WalletLink"> | boolean
    createdAt?: DateTimeFilter<"WalletLink"> | Date | string
    lastVerifiedAt?: DateTimeNullableFilter<"WalletLink"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "chain_address">

  export type WalletLinkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    lastVerifiedAt?: SortOrderInput | SortOrder
    _count?: WalletLinkCountOrderByAggregateInput
    _avg?: WalletLinkAvgOrderByAggregateInput
    _max?: WalletLinkMaxOrderByAggregateInput
    _min?: WalletLinkMinOrderByAggregateInput
    _sum?: WalletLinkSumOrderByAggregateInput
  }

  export type WalletLinkScalarWhereWithAggregatesInput = {
    AND?: WalletLinkScalarWhereWithAggregatesInput | WalletLinkScalarWhereWithAggregatesInput[]
    OR?: WalletLinkScalarWhereWithAggregatesInput[]
    NOT?: WalletLinkScalarWhereWithAggregatesInput | WalletLinkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WalletLink"> | number
    userId?: IntWithAggregatesFilter<"WalletLink"> | number
    chain?: StringWithAggregatesFilter<"WalletLink"> | string
    address?: StringWithAggregatesFilter<"WalletLink"> | string
    isActive?: BoolWithAggregatesFilter<"WalletLink"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WalletLink"> | Date | string
    lastVerifiedAt?: DateTimeNullableWithAggregatesFilter<"WalletLink"> | Date | string | null
  }

  export type BetaAccessWhereInput = {
    AND?: BetaAccessWhereInput | BetaAccessWhereInput[]
    OR?: BetaAccessWhereInput[]
    NOT?: BetaAccessWhereInput | BetaAccessWhereInput[]
    id?: IntFilter<"BetaAccess"> | number
    userId?: IntFilter<"BetaAccess"> | number
    reason?: StringFilter<"BetaAccess"> | string
    grantedAt?: DateTimeFilter<"BetaAccess"> | Date | string
    revokedAt?: DateTimeNullableFilter<"BetaAccess"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BetaAccessOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BetaAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BetaAccessWhereInput | BetaAccessWhereInput[]
    OR?: BetaAccessWhereInput[]
    NOT?: BetaAccessWhereInput | BetaAccessWhereInput[]
    userId?: IntFilter<"BetaAccess"> | number
    reason?: StringFilter<"BetaAccess"> | string
    grantedAt?: DateTimeFilter<"BetaAccess"> | Date | string
    revokedAt?: DateTimeNullableFilter<"BetaAccess"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BetaAccessOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: BetaAccessCountOrderByAggregateInput
    _avg?: BetaAccessAvgOrderByAggregateInput
    _max?: BetaAccessMaxOrderByAggregateInput
    _min?: BetaAccessMinOrderByAggregateInput
    _sum?: BetaAccessSumOrderByAggregateInput
  }

  export type BetaAccessScalarWhereWithAggregatesInput = {
    AND?: BetaAccessScalarWhereWithAggregatesInput | BetaAccessScalarWhereWithAggregatesInput[]
    OR?: BetaAccessScalarWhereWithAggregatesInput[]
    NOT?: BetaAccessScalarWhereWithAggregatesInput | BetaAccessScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BetaAccess"> | number
    userId?: IntWithAggregatesFilter<"BetaAccess"> | number
    reason?: StringWithAggregatesFilter<"BetaAccess"> | string
    grantedAt?: DateTimeWithAggregatesFilter<"BetaAccess"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"BetaAccess"> | Date | string | null
  }

  export type UserCreateInput = {
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
    walletLinks?: WalletLinkCreateNestedManyWithoutUserInput
    betaAccess?: BetaAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
    walletLinks?: WalletLinkUncheckedCreateNestedManyWithoutUserInput
    betaAccess?: BetaAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletLinks?: WalletLinkUpdateManyWithoutUserNestedInput
    betaAccess?: BetaAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletLinks?: WalletLinkUncheckedUpdateManyWithoutUserNestedInput
    betaAccess?: BetaAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletLinkCreateInput = {
    chain: string
    address: string
    isActive?: boolean
    createdAt?: Date | string
    lastVerifiedAt?: Date | string | null
    user: UserCreateNestedOneWithoutWalletLinksInput
  }

  export type WalletLinkUncheckedCreateInput = {
    id?: number
    userId: number
    chain: string
    address: string
    isActive?: boolean
    createdAt?: Date | string
    lastVerifiedAt?: Date | string | null
  }

  export type WalletLinkUpdateInput = {
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutWalletLinksNestedInput
  }

  export type WalletLinkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletLinkCreateManyInput = {
    id?: number
    userId: number
    chain: string
    address: string
    isActive?: boolean
    createdAt?: Date | string
    lastVerifiedAt?: Date | string | null
  }

  export type WalletLinkUpdateManyMutationInput = {
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletLinkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BetaAccessCreateInput = {
    reason: string
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutBetaAccessInput
  }

  export type BetaAccessUncheckedCreateInput = {
    id?: number
    userId: number
    reason: string
    grantedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type BetaAccessUpdateInput = {
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBetaAccessNestedInput
  }

  export type BetaAccessUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BetaAccessCreateManyInput = {
    id?: number
    userId: number
    reason: string
    grantedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type BetaAccessUpdateManyMutationInput = {
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BetaAccessUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type WalletLinkListRelationFilter = {
    every?: WalletLinkWhereInput
    some?: WalletLinkWhereInput
    none?: WalletLinkWhereInput
  }

  export type BetaAccessListRelationFilter = {
    every?: BetaAccessWhereInput
    some?: BetaAccessWhereInput
    none?: BetaAccessWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WalletLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BetaAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    locale?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    locale?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    locale?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
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

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WalletLinkChainAddressCompoundUniqueInput = {
    chain: string
    address: string
  }

  export type WalletLinkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    lastVerifiedAt?: SortOrder
  }

  export type WalletLinkAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type WalletLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    lastVerifiedAt?: SortOrder
  }

  export type WalletLinkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    lastVerifiedAt?: SortOrder
  }

  export type WalletLinkSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BetaAccessCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type BetaAccessAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BetaAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type BetaAccessMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type BetaAccessSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type WalletLinkCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletLinkCreateWithoutUserInput, WalletLinkUncheckedCreateWithoutUserInput> | WalletLinkCreateWithoutUserInput[] | WalletLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletLinkCreateOrConnectWithoutUserInput | WalletLinkCreateOrConnectWithoutUserInput[]
    createMany?: WalletLinkCreateManyUserInputEnvelope
    connect?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
  }

  export type BetaAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<BetaAccessCreateWithoutUserInput, BetaAccessUncheckedCreateWithoutUserInput> | BetaAccessCreateWithoutUserInput[] | BetaAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BetaAccessCreateOrConnectWithoutUserInput | BetaAccessCreateOrConnectWithoutUserInput[]
    createMany?: BetaAccessCreateManyUserInputEnvelope
    connect?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
  }

  export type WalletLinkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletLinkCreateWithoutUserInput, WalletLinkUncheckedCreateWithoutUserInput> | WalletLinkCreateWithoutUserInput[] | WalletLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletLinkCreateOrConnectWithoutUserInput | WalletLinkCreateOrConnectWithoutUserInput[]
    createMany?: WalletLinkCreateManyUserInputEnvelope
    connect?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
  }

  export type BetaAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BetaAccessCreateWithoutUserInput, BetaAccessUncheckedCreateWithoutUserInput> | BetaAccessCreateWithoutUserInput[] | BetaAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BetaAccessCreateOrConnectWithoutUserInput | BetaAccessCreateOrConnectWithoutUserInput[]
    createMany?: BetaAccessCreateManyUserInputEnvelope
    connect?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WalletLinkUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletLinkCreateWithoutUserInput, WalletLinkUncheckedCreateWithoutUserInput> | WalletLinkCreateWithoutUserInput[] | WalletLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletLinkCreateOrConnectWithoutUserInput | WalletLinkCreateOrConnectWithoutUserInput[]
    upsert?: WalletLinkUpsertWithWhereUniqueWithoutUserInput | WalletLinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletLinkCreateManyUserInputEnvelope
    set?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    disconnect?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    delete?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    connect?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    update?: WalletLinkUpdateWithWhereUniqueWithoutUserInput | WalletLinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletLinkUpdateManyWithWhereWithoutUserInput | WalletLinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletLinkScalarWhereInput | WalletLinkScalarWhereInput[]
  }

  export type BetaAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<BetaAccessCreateWithoutUserInput, BetaAccessUncheckedCreateWithoutUserInput> | BetaAccessCreateWithoutUserInput[] | BetaAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BetaAccessCreateOrConnectWithoutUserInput | BetaAccessCreateOrConnectWithoutUserInput[]
    upsert?: BetaAccessUpsertWithWhereUniqueWithoutUserInput | BetaAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BetaAccessCreateManyUserInputEnvelope
    set?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    disconnect?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    delete?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    connect?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    update?: BetaAccessUpdateWithWhereUniqueWithoutUserInput | BetaAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BetaAccessUpdateManyWithWhereWithoutUserInput | BetaAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BetaAccessScalarWhereInput | BetaAccessScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WalletLinkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletLinkCreateWithoutUserInput, WalletLinkUncheckedCreateWithoutUserInput> | WalletLinkCreateWithoutUserInput[] | WalletLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletLinkCreateOrConnectWithoutUserInput | WalletLinkCreateOrConnectWithoutUserInput[]
    upsert?: WalletLinkUpsertWithWhereUniqueWithoutUserInput | WalletLinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletLinkCreateManyUserInputEnvelope
    set?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    disconnect?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    delete?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    connect?: WalletLinkWhereUniqueInput | WalletLinkWhereUniqueInput[]
    update?: WalletLinkUpdateWithWhereUniqueWithoutUserInput | WalletLinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletLinkUpdateManyWithWhereWithoutUserInput | WalletLinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletLinkScalarWhereInput | WalletLinkScalarWhereInput[]
  }

  export type BetaAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BetaAccessCreateWithoutUserInput, BetaAccessUncheckedCreateWithoutUserInput> | BetaAccessCreateWithoutUserInput[] | BetaAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BetaAccessCreateOrConnectWithoutUserInput | BetaAccessCreateOrConnectWithoutUserInput[]
    upsert?: BetaAccessUpsertWithWhereUniqueWithoutUserInput | BetaAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BetaAccessCreateManyUserInputEnvelope
    set?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    disconnect?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    delete?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    connect?: BetaAccessWhereUniqueInput | BetaAccessWhereUniqueInput[]
    update?: BetaAccessUpdateWithWhereUniqueWithoutUserInput | BetaAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BetaAccessUpdateManyWithWhereWithoutUserInput | BetaAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BetaAccessScalarWhereInput | BetaAccessScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletLinksInput = {
    create?: XOR<UserCreateWithoutWalletLinksInput, UserUncheckedCreateWithoutWalletLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletLinksInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutWalletLinksNestedInput = {
    create?: XOR<UserCreateWithoutWalletLinksInput, UserUncheckedCreateWithoutWalletLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletLinksInput
    upsert?: UserUpsertWithoutWalletLinksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletLinksInput, UserUpdateWithoutWalletLinksInput>, UserUncheckedUpdateWithoutWalletLinksInput>
  }

  export type UserCreateNestedOneWithoutBetaAccessInput = {
    create?: XOR<UserCreateWithoutBetaAccessInput, UserUncheckedCreateWithoutBetaAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutBetaAccessInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBetaAccessNestedInput = {
    create?: XOR<UserCreateWithoutBetaAccessInput, UserUncheckedCreateWithoutBetaAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutBetaAccessInput
    upsert?: UserUpsertWithoutBetaAccessInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBetaAccessInput, UserUpdateWithoutBetaAccessInput>, UserUncheckedUpdateWithoutBetaAccessInput>
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type WalletLinkCreateWithoutUserInput = {
    chain: string
    address: string
    isActive?: boolean
    createdAt?: Date | string
    lastVerifiedAt?: Date | string | null
  }

  export type WalletLinkUncheckedCreateWithoutUserInput = {
    id?: number
    chain: string
    address: string
    isActive?: boolean
    createdAt?: Date | string
    lastVerifiedAt?: Date | string | null
  }

  export type WalletLinkCreateOrConnectWithoutUserInput = {
    where: WalletLinkWhereUniqueInput
    create: XOR<WalletLinkCreateWithoutUserInput, WalletLinkUncheckedCreateWithoutUserInput>
  }

  export type WalletLinkCreateManyUserInputEnvelope = {
    data: WalletLinkCreateManyUserInput | WalletLinkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BetaAccessCreateWithoutUserInput = {
    reason: string
    grantedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type BetaAccessUncheckedCreateWithoutUserInput = {
    id?: number
    reason: string
    grantedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type BetaAccessCreateOrConnectWithoutUserInput = {
    where: BetaAccessWhereUniqueInput
    create: XOR<BetaAccessCreateWithoutUserInput, BetaAccessUncheckedCreateWithoutUserInput>
  }

  export type BetaAccessCreateManyUserInputEnvelope = {
    data: BetaAccessCreateManyUserInput | BetaAccessCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WalletLinkUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletLinkWhereUniqueInput
    update: XOR<WalletLinkUpdateWithoutUserInput, WalletLinkUncheckedUpdateWithoutUserInput>
    create: XOR<WalletLinkCreateWithoutUserInput, WalletLinkUncheckedCreateWithoutUserInput>
  }

  export type WalletLinkUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletLinkWhereUniqueInput
    data: XOR<WalletLinkUpdateWithoutUserInput, WalletLinkUncheckedUpdateWithoutUserInput>
  }

  export type WalletLinkUpdateManyWithWhereWithoutUserInput = {
    where: WalletLinkScalarWhereInput
    data: XOR<WalletLinkUpdateManyMutationInput, WalletLinkUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletLinkScalarWhereInput = {
    AND?: WalletLinkScalarWhereInput | WalletLinkScalarWhereInput[]
    OR?: WalletLinkScalarWhereInput[]
    NOT?: WalletLinkScalarWhereInput | WalletLinkScalarWhereInput[]
    id?: IntFilter<"WalletLink"> | number
    userId?: IntFilter<"WalletLink"> | number
    chain?: StringFilter<"WalletLink"> | string
    address?: StringFilter<"WalletLink"> | string
    isActive?: BoolFilter<"WalletLink"> | boolean
    createdAt?: DateTimeFilter<"WalletLink"> | Date | string
    lastVerifiedAt?: DateTimeNullableFilter<"WalletLink"> | Date | string | null
  }

  export type BetaAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: BetaAccessWhereUniqueInput
    update: XOR<BetaAccessUpdateWithoutUserInput, BetaAccessUncheckedUpdateWithoutUserInput>
    create: XOR<BetaAccessCreateWithoutUserInput, BetaAccessUncheckedCreateWithoutUserInput>
  }

  export type BetaAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: BetaAccessWhereUniqueInput
    data: XOR<BetaAccessUpdateWithoutUserInput, BetaAccessUncheckedUpdateWithoutUserInput>
  }

  export type BetaAccessUpdateManyWithWhereWithoutUserInput = {
    where: BetaAccessScalarWhereInput
    data: XOR<BetaAccessUpdateManyMutationInput, BetaAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type BetaAccessScalarWhereInput = {
    AND?: BetaAccessScalarWhereInput | BetaAccessScalarWhereInput[]
    OR?: BetaAccessScalarWhereInput[]
    NOT?: BetaAccessScalarWhereInput | BetaAccessScalarWhereInput[]
    id?: IntFilter<"BetaAccess"> | number
    userId?: IntFilter<"BetaAccess"> | number
    reason?: StringFilter<"BetaAccess"> | string
    grantedAt?: DateTimeFilter<"BetaAccess"> | Date | string
    revokedAt?: DateTimeNullableFilter<"BetaAccess"> | Date | string | null
  }

  export type UserCreateWithoutWalletLinksInput = {
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
    betaAccess?: BetaAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletLinksInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
    betaAccess?: BetaAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletLinksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletLinksInput, UserUncheckedCreateWithoutWalletLinksInput>
  }

  export type UserUpsertWithoutWalletLinksInput = {
    update: XOR<UserUpdateWithoutWalletLinksInput, UserUncheckedUpdateWithoutWalletLinksInput>
    create: XOR<UserCreateWithoutWalletLinksInput, UserUncheckedCreateWithoutWalletLinksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletLinksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletLinksInput, UserUncheckedUpdateWithoutWalletLinksInput>
  }

  export type UserUpdateWithoutWalletLinksInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    betaAccess?: BetaAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletLinksInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    betaAccess?: BetaAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBetaAccessInput = {
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
    walletLinks?: WalletLinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBetaAccessInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName: string
    lastName?: string | null
    locale?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string
    walletLinks?: WalletLinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBetaAccessInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBetaAccessInput, UserUncheckedCreateWithoutBetaAccessInput>
  }

  export type UserUpsertWithoutBetaAccessInput = {
    update: XOR<UserUpdateWithoutBetaAccessInput, UserUncheckedUpdateWithoutBetaAccessInput>
    create: XOR<UserCreateWithoutBetaAccessInput, UserUncheckedCreateWithoutBetaAccessInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBetaAccessInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBetaAccessInput, UserUncheckedUpdateWithoutBetaAccessInput>
  }

  export type UserUpdateWithoutBetaAccessInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletLinks?: WalletLinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBetaAccessInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletLinks?: WalletLinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletLinkCreateManyUserInput = {
    id?: number
    chain: string
    address: string
    isActive?: boolean
    createdAt?: Date | string
    lastVerifiedAt?: Date | string | null
  }

  export type BetaAccessCreateManyUserInput = {
    id?: number
    reason: string
    grantedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type WalletLinkUpdateWithoutUserInput = {
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletLinkUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletLinkUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BetaAccessUpdateWithoutUserInput = {
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BetaAccessUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BetaAccessUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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