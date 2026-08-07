// Short interview-prep explanations for each topic, keyed by topic id.
// Shown in the detail popup when a topic row is clicked.
export const TOPIC_DETAILS = {
  // ---- C# Fundamentals ----
  oop: "The four pillars: Encapsulation hides internal state behind methods/properties; Inheritance lets a class reuse/extend a base class; Polymorphism lets a call resolve to different behaviour at runtime (virtual/override) or compile time (overloading); Abstraction exposes only what's necessary via interfaces/abstract classes. Interview angle: be ready to give a real example from your own codebase for each.",
  ModernDevelopment: "Composition ('has-a') builds objects out of other objects and is generally preferred over Inheritance ('is-a') because it avoids fragile base-class problems and deep hierarchies. Aggregation is a looser form of composition where the contained object can outlive the container (e.g. a Department holds Employees, but Employees exist independently). Modern C# favours composition + interfaces + DI over deep inheritance trees.",
  solid: "Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be usable wherever the base type is expected), Interface Segregation (many small interfaces beat one fat one), Dependency Inversion (depend on abstractions, not concretions). Interviewers often ask for a violation you've refactored.",
  di: "Dependency Injection supplies a class's dependencies from the outside (usually via constructor) instead of the class creating them itself, which decouples code and makes it testable. In ASP.NET Core it's built into the framework via IServiceCollection with three lifetimes: Singleton, Scoped, Transient. Know the difference between DI (the pattern) and an IoC container (the tool that wires it up).",
  iface: "An interface defines a contract with no implementation (default interface methods aside) and a class can implement many; an abstract class can hold shared state/implementation and fields but a class can only inherit one. Rule of thumb: use an interface for 'can-do' capability contracts, an abstract class when you want to share code across closely related types.",
  "value-ref": "Value types (struct, int, bool, enum) are stored on the stack (or inline) and copied by value; reference types (class, string, array) live on the heap and variables hold a pointer to them. Passing a value type into a method copies it — mutating it inside doesn't affect the caller unless you pass by ref/out. Boxing/unboxing converts a value type to object and back, which has a perf cost worth mentioning.",
  nullable: "Nullable reference types (C# 8+, enabled via <Nullable>enable</Nullable>) make the compiler track and warn when a reference-typed variable might be null, using `?` to mark intentionally-nullable types. It's a compile-time-only feature (no runtime enforcement) aimed at catching NullReferenceException bugs earlier — a good story about migrating a legacy codebase to it scores well.",
  exceptions: "Use exceptions for exceptional/unexpected conditions, not normal control flow; catch specific exception types (most-specific first), avoid empty catch blocks, and use `finally`/`using` for cleanup. Know the difference between `throw;` (preserves stack trace) and `throw ex;` (resets it), and when to create custom exception types vs use built-in ones.",
  disposable: "IDisposable exposes a Dispose() method to release unmanaged resources (file handles, DB connections, sockets) deterministically; the `using` statement/declaration guarantees Dispose() is called even if an exception is thrown, by compiling to a try/finally. Know the difference from the GC-driven finalizer path and the standard Dispose(bool) pattern for classes with both managed and unmanaged resources.",
  records: "Records (C# 9+) are reference types (or `record struct` for value semantics) with built-in value-based equality, `with` non-destructive mutation, and concise positional syntax — ideal for immutable DTOs. Classes have identity-based equality by default and are typically mutable. A common interview follow-up: how does record equality actually work under the hood (compiler-generated Equals/GetHashCode).",
  cs12: "Notable recent features: primary constructors on classes/structs, collection expressions (`[1, 2, 3]`), default lambda parameters, `ref readonly` parameters, and inline arrays. Also worth knowing from C# 11/10: raw string literals, required members, and file-scoped types. Interviewers like to see you've kept up with the language rather than being stuck on C# 6/7 idioms.",
  pattern: "Pattern matching lets you branch on both the shape and value of data: type patterns (`is Foo f`), property patterns (`{ Status: 200 }`), relational/logical patterns (`> 0 and < 10`), and switch expressions that return a value. It replaces a lot of verbose `if/else` and casting chains with concise, readable, exhaustively-checked code.",
  extension: "Extension methods let you 'add' a method to an existing type without modifying it or using inheritance, by writing a static method in a static class with `this` on the first parameter. LINQ itself is implemented entirely as extension methods on IEnumerable<T>. Watch for the gotcha: they're resolved at compile time based on the static type, not polymorphically.",
  delegates: "A delegate is a type-safe function pointer/reference to a method. `Func<T,...>` returns a value, `Action<T,...>` returns void, `Predicate<T>` returns bool. They're the backbone of LINQ, events, and callback-style APIs, and multicast delegates can hold references to more than one method (invoked in order).",
  events: "Events are a publish/subscribe wrapper around a (usually multicast) delegate, conventionally typed as `EventHandler`/`EventHandler<T>`, that restrict outside code to only += / -= (not direct invocation or reassignment). A classic interview trap: forgetting to unsubscribe causes a memory leak because the publisher holds a reference to the subscriber, keeping it alive.",
  reflection: "Reflection (System.Reflection) lets code inspect and invoke types, methods, and properties at runtime — used by serializers, DI containers, and ORMs like EF Core under the hood. It's powerful but has a real performance cost and bypasses compile-time safety, so it's usually wrapped and cached rather than used directly in hot paths.",
  attributes: "Attributes are declarative metadata attached to code elements (classes, methods, properties) and read via reflection at runtime — e.g. `[Required]` for validation, `[HttpGet]` for routing, `[Serializable]`. You can define custom attributes by inheriting from `System.Attribute`. Know a couple of built-in ones you use regularly (`[JsonPropertyName]`, `[Authorize]`, etc.).",
  span: "`Span<T>` is a stack-only, allocation-free view over contiguous memory (array, string, stackalloc'd memory) that avoids copies and heap allocations — heavily used internally in .NET's high-performance string/parsing APIs. Because it's a `ref struct` it can't be boxed, stored on the heap, or used in async methods, which is a common interview gotcha.",

  // ---- Async Programming ----
  "async-await": "`async`/`await` lets you write asynchronous, non-blocking code that reads like synchronous code: the compiler transforms it into a state machine that frees the thread while waiting on I/O and resumes when the awaited Task completes. It does NOT create a new thread by itself — that's a common misconception worth correcting in an interview.",
  "task-thread": "A `Thread` is an OS-level construct that's expensive to create and blocks while waiting; a `Task` is a higher-level abstraction representing future work, usually run on the thread pool, and is what async/await is built on. Use Task for I/O-bound work (it doesn't need a dedicated thread while awaiting); Thread is rarely needed directly today.",
  "when-all": "`Task.WhenAll` runs multiple tasks concurrently and asynchronously awaits all of them, throwing an AggregateException only if you inspect `.Exception` (a plain `await` re-throws the first exception). Contrast with sequential `await`ing one at a time, and with `Task.WaitAll` which blocks synchronously — a good perf-story topic (parallel API calls).",
  "state-machine": "The compiler rewrites an `async` method into a class implementing a state machine (IAsyncStateMachine) with a `MoveNext()` method, so execution can pause at each `await` and resume later without blocking a thread. Understanding this explains why `async void` is dangerous (exceptions can't be awaited/caught by the caller) and why stack traces look different.",
  "sync-ctx": "SynchronizationContext captures 'where' continuations after `await` should resume — in classic ASP.NET/WinForms/WPF it marshals back to the original context (e.g. UI thread), which is why blocking with `.Result`/`.Wait()` there can deadlock. ASP.NET Core has no SynchronizationContext by default, which is one reason `ConfigureAwait(false)` matters less there than in older frameworks.",
  "async-api": "Guidelines: expose async methods ending in `Async`, avoid `async void` (except event handlers), don't block on async code with `.Result`/`.Wait()`, propagate `CancellationToken` through the call chain, and avoid unnecessary `Task.Run` wrapping for I/O-bound work. Good interview answer: explain the 'async all the way down' principle.",
  "task-run": "`Task.Run` queues work to the thread pool and is meant for CPU-bound work; using it to wrap I/O-bound calls (like an HTTP or DB call that already has a native async API) wastes a thread pool thread for no benefit and can hurt scalability under load. Classic senior-level distinction interviewers probe for.",
  deadlocks: "In async code, a deadlock classically happens when you block synchronously (`.Result`/`.Wait()`) on an async call from a context with a captured SynchronizationContext — the continuation can't get back onto that thread because it's blocked waiting. Fix: `await` all the way up the call stack, or use `ConfigureAwait(false)` where appropriate.",
  "configure-await": "`ConfigureAwait(false)` tells the awaiter not to try to resume on the original SynchronizationContext, avoiding the deadlock scenario above and reducing context-switch overhead — recommended in library code that doesn't need UI-thread affinity. It's largely a non-issue in ASP.NET Core (no SynchronizationContext), but still relevant for shared/library code and older app types.",
  cancellation: "`CancellationToken` is the standard cooperative-cancellation mechanism: a `CancellationTokenSource` creates a token, callers pass it down the async call chain, and long-running code periodically checks `token.IsCancellationRequested` or calls `token.ThrowIfCancellationRequested()`. ASP.NET Core automatically supplies one tied to the client disconnecting, which you should wire into your DB/HTTP calls.",
  parallel: "The `System.Threading.Tasks.Parallel` class (Parallel.For/ForEach) and PLINQ (`.AsParallel()`) split CPU-bound work across multiple threads/cores for data-parallelism — different from async/await, which is about not blocking on I/O. Know the tradeoffs: thread-pool contention, need for thread-safety on shared state, and that it's the wrong tool for I/O-bound work.",
  producer: "Producer/Consumer decouples work generation from processing via a shared queue — in modern .NET, `System.Threading.Channels` (`Channel<T>`) is the idiomatic async-friendly implementation, replacing older BlockingCollection-based patterns. Common use case: buffering incoming messages while a background worker processes them at a controlled rate.",

  // ---- LINQ ----
  where: "`Where` filters a sequence by predicate, `Select` projects/transforms each element, `OrderBy`/`OrderByDescending` sort, and `GroupBy` buckets elements by a key — all are extension methods on `IEnumerable<T>`/`IQueryable<T>` and (mostly) execute lazily. Chaining them fluently is the core LINQ idiom interviewers expect you to read and write comfortably.",
  first: "`First()` throws `InvalidOperationException` if the sequence is empty; `FirstOrDefault()` returns `default(T)` (null for reference types, 0/false/etc. for value types) instead. Use `First` when an empty result indicates a bug you want to surface loudly, `FirstOrDefault` when 'not found' is an expected, handled case.",
  enumerable: "`IEnumerable<T>` executes in-memory/in-process, one item at a time; `IQueryable<T>` builds an expression tree that's translated (e.g. by EF Core) into SQL and executed at the database. Filtering with `IQueryable` before materializing (`.ToList()`) pushes the work to the DB; filtering after pulls everything into memory first — a very common EF Core performance interview question.",
  deferred: "LINQ queries (other than terminal operators like `ToList`/`Count`/`First`) don't execute when defined — they execute when enumerated (foreach, ToList, etc.), which is called deferred/lazy execution. This means the query re-runs each time it's enumerated and can produce different results if the underlying data changes between enumerations — a classic 'gotcha' interviewers probe.",
  "any-count": "`Any()` stops at the first match and is O(1)-ish for the check (short-circuits); `Count()` enumerates the entire sequence to produce an exact number. For an existence check, always prefer `Any()` over `Count() > 0` — a small but telling performance-awareness answer.",
  single: "`Single()` throws if there isn't exactly one matching element (zero OR more than one); `SingleOrDefault()` throws only if there's more than one, returning default if there are zero. Use them when you're asserting uniqueness (e.g. lookup by primary key) rather than just picking the first match.",
  join: "`Join` performs an inner-join-style correlation between two sequences based on matching keys, similar to SQL INNER JOIN, returning a flattened result via a result selector. In EF Core, explicit `Join` is less common than navigation-property-based queries, but it's still asked about for raw LINQ-to-Objects scenarios and multi-source joins.",
  selectmany: "`SelectMany` flattens a sequence of sequences into a single sequence (e.g. Orders → each Order's LineItems → one flat list of LineItems), unlike `Select` which would give you a sequence of sequences. It's also what enables LINQ query-syntax's multiple `from` clauses and cross-join-like behaviour.",
  expr: "Expression trees (`Expression<Func<T,bool>>`) represent code as data — a traversable tree of nodes — rather than compiled IL, which is what lets EF Core take a C# lambda and translate it into SQL instead of just executing it in-process. Knowing the difference between `Func<T,bool>` (compiled delegate) and `Expression<Func<T,bool>>` (inspectable tree) is a strong signal of EF/LINQ depth.",

  // ---- .NET API Development ----
  http: "Request comes in → Kestrel (the built-in web server) hands it to the ASP.NET Core middleware pipeline → each middleware runs in order (routing, auth, exception handling, etc.) → the matched endpoint/controller action executes → response flows back out through the pipeline in reverse. Being able to narrate this end-to-end is a very common interview ask.",
  minimal: "Minimal APIs (.NET 6+) let you define HTTP endpoints with a single delegate (`app.MapGet(\"/x\", () => ...)`) without controllers/attributes/boilerplate, using the same DI, model binding, and filter pipeline under the hood. Good for small services/microservices; controllers still make sense for larger, more structured APIs.",
  routing: "ASP.NET Core routing maps incoming request URLs+verbs to endpoints, either via attribute routing (`[HttpGet(\"api/orders/{id}\")]`) on controllers or via `Map*` calls in Minimal APIs, using an endpoint routing system that also powers middleware short-circuiting and authorization policy application per-endpoint.",
  middleware: "Middleware are components chained in the request pipeline (`app.Use...`) that can inspect/modify the request, call the next component, then inspect/modify the response on the way back out — order matters a lot (e.g. UseExceptionHandler and UseAuthentication need to be positioned correctly). Being able to sketch a typical pipeline order is a strong interview answer.",
  rest: "REST APIs model resources as URLs and use HTTP verbs semantically: GET (read, safe/idempotent), POST (create), PUT (full replace, idempotent), PATCH (partial update), DELETE (remove). Also expect questions on proper status codes (200/201/204/400/401/403/404/409/500) and statelessness as a core REST constraint.",
  jwt: "JSON Web Tokens are signed (and optionally encrypted) tokens carrying claims (user id, roles, expiry) that the API validates on each request without a server-side session lookup — enabling stateless auth, which scales well across multiple API instances. Know the three parts (header.payload.signature) and that the payload is base64-encoded, not encrypted, unless you explicitly use JWE.",
  versioning: "Common approaches: URL segment (`/v1/orders`), query string (`?api-version=1.0`), or custom header — each with tradeoffs around caching, discoverability, and client simplicity. .NET has the `Asp.Versioning` package (formerly Microsoft.AspNetCore.Mvc.Versioning) to formalise this rather than hand-rolling it.",
  "global-ex": "A centralised exception-handling middleware (custom middleware, `UseExceptionHandler`, or `IExceptionHandler` in .NET 8+) catches unhandled exceptions once, logs them, and returns a consistent error response (often following the RFC 7807 'ProblemDetails' shape) instead of leaking stack traces or scattering try/catch across every controller action.",
  filters: "Action/Result/Exception/Authorization filters are ASP.NET Core MVC's way to run cross-cutting logic (validation, logging, auth checks) around controller actions without duplicating code in every action — conceptually similar to middleware but scoped to MVC and aware of action-specific context like model binding results.",
  "di-life": "Singleton — one instance for the app's lifetime, shared by everyone (careful with thread-safety and per-request state); Scoped — one instance per HTTP request (typical for DbContext); Transient — a new instance every time it's requested. A very common bug/interview question: injecting a Scoped service into a Singleton throws or causes captured-instance bugs.",
  health: "Health check endpoints (`AddHealthChecks()`/`MapHealthChecks`) let orchestrators (Kubernetes liveness/readiness probes, load balancers) know whether an instance is up and its dependencies (DB, downstream APIs) are reachable, so unhealthy instances can be restarted or pulled from rotation automatically.",
  rate: "Rate limiting caps how many requests a client can make in a window (fixed window, sliding window, token bucket, concurrency limiter) to protect the API from abuse/overload — built into ASP.NET Core via `Microsoft.AspNetCore.RateLimiting` since .NET 7, or handled at the gateway/API Management layer.",

  // ---- Auth & Security ----
  jwt2: "See JWT under API Development — same token format, but in this section the focus is typically on how the API validates it (`AddJwtBearer`, checking signature/issuer/audience/expiry) and issues it after login.",
  oauth: "OAuth2 is an authorization framework — it lets a user grant a third-party app limited access to their resources without sharing credentials, via flows like Authorization Code (with PKCE for public clients) and Client Credentials (machine-to-machine). Important distinction: OAuth2 is about authorization/delegated access, not identity.",
  oidc: "OpenID Connect is an identity layer built on top of OAuth2 — it adds the ID Token (a JWT proving who the user is) alongside OAuth2's access token, which is purely about authorization. If someone asks 'is OAuth2 for authentication or authorization', the correct answer is authorization — OIDC is what adds authentication.",
  authn: "Authentication answers 'who are you' (login, verifying identity); Authorization answers 'what are you allowed to do' (permissions/roles/policies), and always happens after authentication. In ASP.NET Core these are two distinct middleware (`UseAuthentication` then `UseAuthorization`) and it's important they're in that order.",
  "token-refresh": "Access tokens are short-lived (minutes) and sent with every API request; refresh tokens are longer-lived, stored securely, and used only to obtain a new access token without forcing the user to log in again — refresh tokens should be rotated and revocable to limit damage if one leaks.",
  claims: "Claims are key/value assertions about a user embedded in a token or identity (e.g. `sub`, `email`, `role`), forming the `ClaimsPrincipal`/`ClaimsIdentity` that ASP.NET Core's `User` object is built from. Authorization policies and `[Authorize(Roles=...)]` ultimately just check claims present on this principal.",
  role: "Role-based authorization checks membership in a coarse-grained role (`[Authorize(Roles = \"Admin\")]`), which is simple but inflexible when permissions need to be more granular or combined logically — that's when policy-based authorization is preferred instead.",
  policy: "Policy-based authorization defines named, composable rules (`AddAuthorization(o => o.AddPolicy(\"CanEditOrders\", p => p.RequireClaim(...)))`) evaluated via requirement/handler classes, giving far more flexibility than plain roles — e.g. combining multiple claims or custom business logic in the authorization decision.",
  tls: "TLS encrypts data in transit and authenticates the server (and optionally the client) via certificates; HTTPS is just HTTP over TLS. Know the basics of the handshake (cert exchange, key negotiation), why HSTS matters, and that ASP.NET Core's `UseHttpsRedirection`/`UseHsts` enforce it at the app level.",
  owasp: "The OWASP Top 10 lists the most critical web app security risks — e.g. Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Authentication Failures, and SSRF. You don't need all ten memorised verbatim, but being able to discuss SQL injection, XSS, and broken auth with concrete mitigations is expected.",

  // ---- SQL Server & Database ----
  "sql-q": "Comfort with SELECT/JOIN/GROUP BY/subqueries/CTEs and being able to reason about what a query returns and roughly how it performs is table-stakes — interviewers often hand you a schema and ask you to write or debug a query live.",
  sprocs: "Stored procedures are precompiled, named SQL routines stored in the database — useful for encapsulating complex logic close to the data, reducing round-trips, and centralising permissions, but they can also make logic harder to source-control/test and create tighter coupling to a specific database engine versus EF Core/Dapper-based approaches.",
  "db-perf": "Be ready to talk through a real investigation: identify the slow query (execution plan, missing index, table/index scan vs seek), check for N+1 query patterns from an ORM, look at blocking/locking, and validate indexing strategy against actual query patterns rather than guessing.",
  indexes: "An index is a separate data structure (usually a B-tree) that lets the engine find rows without scanning the whole table, at the cost of extra storage and slower writes (every insert/update/delete must also maintain the index). Over-indexing is a real anti-pattern worth mentioning — indexes aren't free.",
  clustered: "A clustered index determines the physical storage order of the table's rows — there can be only one per table (often the primary key) — while non-clustered indexes are separate structures with pointers back to the data, and a table can have many. Choosing the right clustered key (narrow, ever-increasing, stable) is a classic design discussion.",
  "exec-plans": "An execution plan shows how the query optimizer will actually retrieve the data (scan vs seek, join type used, estimated vs actual row counts) — reading one to spot a missing index or a bad cardinality estimate is a strong practical skill interviewers like to see demonstrated, even briefly.",
  joins: "INNER JOIN returns only matching rows in both tables; LEFT JOIN returns all rows from the left table plus matches (nulls where no match); RIGHT JOIN is the mirror; FULL JOIN returns all rows from both sides, matched where possible. Be ready to sketch these with a simple two-table example.",
  tx: "A transaction groups multiple statements into a single all-or-nothing unit of work with ACID guarantees (Atomicity, Consistency, Isolation, Durability) — `BEGIN TRAN`/`COMMIT`/`ROLLBACK` in SQL, or `DbContext.Database.BeginTransaction()`/`SaveChanges()` implicit transactions in EF Core.",
  isolation: "Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable, Snapshot) trade off consistency guarantees against concurrency/performance — e.g. Read Uncommitted allows dirty reads for speed, Serializable prevents all anomalies but can cause heavy blocking. SQL Server's default is Read Committed.",
  deadlock: "A database deadlock happens when two transactions each hold a lock the other needs, and neither can proceed — SQL Server detects this and kills one as the 'deadlock victim'. Mitigations: consistent access ordering across transactions, shorter transactions, appropriate indexing to reduce lock scope, and retry logic on the victim.",
  normal: "Normalisation organises tables to reduce data redundancy and avoid update/insert/delete anomalies, typically up to 3NF in practice (1NF: atomic columns, 2NF: no partial dependency on a composite key, 3NF: no transitive dependency on non-key columns). Denormalisation is a deliberate, documented performance tradeoff, not a mistake, when done for the right reasons.",
  "ef-dapper": "EF Core gives you a full ORM with change tracking, migrations, and LINQ-to-SQL translation — great for productivity and complex object graphs, at some performance cost. Dapper is a lightweight micro-ORM that maps raw SQL results to objects with minimal overhead — great when you need hand-tuned, high-performance queries. Many real systems use both, choosing per use case.",

  // ---- Entity Framework ----
  dbctx: "`DbContext` represents a session with the database — it should be short-lived (typically Scoped, one per HTTP request) because it tracks entities and holds a connection; reusing a long-lived context leads to bloated change tracking and stale-data bugs. `DbContextFactory` is the recommended pattern when you need contexts outside the normal request scope.",
  tracking: "By default, EF Core tracks every entity it loads so it can detect changes and generate the right UPDATE statements on `SaveChanges()` — this has a real memory/CPU cost that adds up on large read-heavy queries, which is exactly why `AsNoTracking()` exists for read-only scenarios.",
  migrations: "Migrations are EF Core's version-controlled way to evolve the database schema alongside your model changes (`Add-Migration`, `Update-Database`), generating C# migration classes with Up/Down methods that translate into the actual SQL DDL — enabling repeatable, auditable schema changes across environments.",
  lazy: "Lazy loading defers fetching a related entity until it's actually accessed (requires virtual navigation properties + a proxy), which is convenient but a classic source of N+1 query bugs. Eager loading (`Include()`) fetches related data up front in the same query — generally the safer default for known access patterns.",
  notrack: "`AsNoTracking()` tells EF Core not to track the returned entities for changes, which reduces memory usage and speeds up read-only queries significantly — but if you then try to modify and save one of those entities, the changes won't be picked up unless you re-attach it, which is exactly the interview follow-up to expect.",
  repo: "The Repository pattern wraps data-access logic behind an interface (e.g. `IOrderRepository`) to decouple business logic from EF Core specifics and ease testing/mocking — though with EF Core's own `DbSet<T>` already being a reasonably good abstraction, there's a genuine ongoing debate about whether Repository adds value or just an extra layer; be ready to argue both sides.",
  uow: "Unit of Work groups multiple repository operations into a single transaction that's committed or rolled back together — `DbContext` itself already implements this pattern (all tracked changes are saved atomically on one `SaveChanges()` call), which is why an explicit UoW wrapper is sometimes considered redundant on top of EF Core.",

  // ---- Architecture & Design ----
  mono: "A monolith deploys all functionality as a single unit — simpler to develop, test, and deploy initially, but scaling, deploying, and reasoning about it gets harder as it grows. Microservices split functionality into independently deployable services — better isolation and independent scaling, at the cost of operational complexity (networking, data consistency, observability).",
  micro: "Benefits: independent deployability and scaling per service, technology flexibility per team, fault isolation (one service failing doesn't necessarily take down the whole system), and smaller, more focused codebases per team. Tradeoffs (be ready to mention these too): distributed system complexity, network latency, data consistency across services, and much higher operational overhead.",
  docker: "Docker packages an app plus its dependencies into a portable, consistent container image; Kubernetes orchestrates many containers across a cluster of machines — scheduling, scaling, restarting failed containers, service discovery, rolling updates. Simple mental model: Docker builds and runs a single container, Kubernetes manages a fleet of them in production.",
  clean: "Clean Architecture arranges code in concentric layers (Entities/Domain at the centre, then Use Cases/Application, then Interface Adapters, then Frameworks/Infrastructure at the outside) with the Dependency Rule: dependencies only point inward, so business logic never depends on frameworks, UI, or databases — keeping the core testable and swappable.",
  hex: "Hexagonal (Ports & Adapters) architecture isolates the core application logic behind 'ports' (interfaces) with 'adapters' plugged in for each external concern (a REST adapter, a DB adapter, a message-queue adapter) — conceptually very close to Clean Architecture's goal of keeping the domain independent of infrastructure, described with a different metaphor.",
  cqrs: "Command Query Responsibility Segregation splits the read model from the write model — writes (commands) go through one path optimised for consistency/validation, reads (queries) go through a separate, often denormalised/optimised path — useful when read and write workloads have very different scaling or complexity needs, but adds real complexity and isn't needed for most CRUD apps.",
  "event-driven": "Services communicate by publishing and reacting to events rather than direct synchronous calls, which decouples producers from consumers and improves resilience/scalability, at the cost of harder-to-trace flows, eventual consistency, and the need for good observability/tracing across the event chain.",
  gateway: "An API Gateway is a single entry point that sits in front of multiple backend services, handling cross-cutting concerns like routing, auth, rate limiting, and aggregation — clients talk to one place instead of knowing about every downstream service, simplifying the client and centralising cross-cutting policy.",
  "svc-comms": "Services can talk synchronously via REST/gRPC (simple, but couples availability — if the callee is down, the call fails immediately) or asynchronously via messaging/events (queues, pub/sub — more resilient and decoupled, but adds eventual consistency and more moving parts). Choosing the right one per interaction is a common system-design discussion.",

  // ---- Messaging & Integration ----
  rabbit: "RabbitMQ is a traditional message broker implementing AMQP, supporting flexible routing via exchanges (direct, topic, fanout) to queues — strong for complex routing patterns, with built-in features like message acknowledgement, dead-lettering, and delivery guarantees you configure per-queue.",
  sqs: "AWS SQS is a fully-managed, simple, highly-durable queue service (standard = at-least-once/best-effort ordering, FIFO = exactly-once processing/strict ordering) commonly used to decouple producers and consumers in AWS-based architectures without running your own broker infrastructure.",
  kinesis: "AWS Kinesis is a real-time streaming data service (think managed Kafka-alternative) built around shards/partitions that multiple consumers can read from independently and replay — suited to high-throughput event streaming, analytics pipelines, and scenarios needing multiple independent consumers of the same event stream, unlike SQS which is more point-to-point.",
  "q-topic": "A Queue delivers each message to exactly one consumer (point-to-point, good for distributing work across workers); a Topic delivers each message to every subscriber (publish/subscribe, good for broadcasting an event to multiple independent systems). Choosing between them is a fundamental messaging design decision.",
  pubsub: "Publish/Subscribe decouples producers from consumers entirely — a publisher emits an event without knowing who (if anyone) is listening, and any number of subscribers can react independently — enabling loosely-coupled, extensible event-driven systems where new consumers can be added without touching the producer.",
  retry: "Failed message processing is usually retried with a backoff strategy (fixed, exponential, exponential + jitter) to handle transient failures without hammering a struggling downstream system — after a configured number of attempts, the message is typically routed to a Dead Letter Queue rather than retried forever.",
  dlq: "A Dead Letter Queue holds messages that repeatedly failed processing (after retries are exhausted) or were rejected/expired, so they don't block the main queue and can be inspected/reprocessed manually later — an essential safety valve in any production messaging system.",
  idem: "Idempotency means processing the same message/request more than once produces the same result as processing it once — critical in messaging systems that offer at-least-once delivery, since duplicates are expected. Typically achieved by tracking a unique message/request id and short-circuiting if it's already been processed.",
  eventual: "Eventual consistency accepts that after a write, different parts of a distributed system may briefly see stale data before all replicas/consumers catch up — a deliberate tradeoff for availability/scalability (see the CAP theorem) that's normal in event-driven and multi-service architectures, as long as the business can tolerate the brief inconsistency window.",

  // ---- Cloud & DevOps ----
  azure: "Azure VMs are IaaS — you manage the OS/patching/scaling yourself; Azure SQL is PaaS — Microsoft manages the underlying server/patching/backups/high-availability, you just manage the database/schema. Knowing where a given Azure service sits on the IaaS/PaaS/SaaS spectrum is a common framing question.",
  aws: "EC2 is AWS's core IaaS virtual machine offering — you choose instance type/size, manage the OS, and can attach storage (EBS) and networking (VPC/security groups) around it. Good to mention scaling approaches (Auto Scaling Groups) and how it compares to more managed compute options (ECS/Fargate/Lambda).",
  cicd: "Continuous Integration automatically builds/tests every code change (catching integration issues early); Continuous Deployment/Delivery automates pushing validated builds through environments toward production. In practice this is expressed as YAML pipelines (GitHub Actions, Azure DevOps) with stages for build, test, and deploy, often gated by approvals for production.",
  docker2: "A Dockerfile defines how to build an image (base image, copy files, install deps, entrypoint); an image is a built, immutable artifact; a container is a running instance of that image. Multi-stage builds (build in one stage, copy only the output into a slim runtime stage) are a common .NET-specific optimisation worth mentioning.",
  k8s: "A Pod is the smallest deployable unit (one or more tightly-coupled containers sharing network/storage); a Deployment manages a set of replica Pods, handling rollouts/rollbacks and self-healing; a Service gives Pods a stable network identity/load-balancing (since Pod IPs are ephemeral); Ingress routes external HTTP(S) traffic into Services; ConfigMap/Secret externalise configuration and sensitive values from the container image.",
  iac: "Infrastructure as Code defines cloud resources declaratively in version-controlled files instead of manual console clicks — Terraform (cloud-agnostic, HCL) and CloudFormation (AWS-native, YAML/JSON) are the two most commonly asked-about tools, both enabling repeatable, reviewable, and auditable infrastructure changes.",
  monitoring: "Logs record discrete events (what happened, with context, for debugging); Metrics are numeric time-series measurements (CPU%, request rate, latency) good for dashboards/trends; Alerts fire when a metric crosses a threshold or an anomaly is detected, so humans get notified before/when something breaks. A mature answer connects all three into one observability story.",

  // ---- Testing ----
  unit: "Unit tests exercise a single unit of logic (a method/class) in isolation, with dependencies mocked/faked, running fast and giving precise failure localisation — the base of the 'testing pyramid'. Interviewers often want to see you can identify what's actually worth unit testing (business logic) versus what isn't (trivial getters/framework wiring).",
  integration: "Integration tests exercise multiple components working together (e.g. a real DbContext against a test database, or a full HTTP request through `WebApplicationFactory`) to catch issues unit tests with mocks can't — slower and fewer in number than unit tests, but higher confidence that the pieces actually work together.",
  mocking: "Moq (and similar libraries) let you create fake implementations of interfaces/dependencies with configurable, verifiable behaviour (`mock.Setup(...)`, `mock.Verify(...)`), so a unit test can isolate the class under test from its real dependencies (database, HTTP clients, etc.) entirely.",
  xunit: "xUnit and NUnit are the two dominant .NET test frameworks — xUnit is more common in newer/ASP.NET Core projects, uses `[Fact]`/`[Theory]` for parameterised tests, and creates a fresh test class instance per test (no shared mutable state by default, unlike some other frameworks' `[SetUp]` pattern).",

  // ---- Performance & Troubleshooting ----
  mem: "Walk through a real memory investigation: capture a memory dump (dotnet-dump / Task Manager+WinDbg / Azure diagnostics), analyse it for large object heap growth, retained object graphs, and suspected leaks (often event handler subscriptions or static collections that never get cleared), then confirm the fix reduced memory under load.",
  logs: "Event Viewer surfaces OS/app-level errors and crashes on Windows; structured application logs (via Serilog/ILogger, correlation ids) give you the request-level narrative; combined with production debugging tools (Application Insights, dotnet-trace, remote debugging where allowed) this is how you reconstruct what actually happened during an incident.",
  cpu: "Investigating high CPU: check Application Insights/metrics for which endpoint/process is spiking, capture a CPU profile (dotnet-trace, Application Insights Profiler) to see hot call stacks, look for tight loops, inefficient LINQ/regex, or unexpected synchronous blocking causing thread pool starvation which can masquerade as CPU pressure.",
  memleak: "In .NET, 'leaks' usually mean objects that should be garbage-collectable are still reachable — common causes: forgotten event subscriptions, static collections that only grow, undisposed `IDisposable` resources, or captured closures in long-lived caches. A memory dump comparison (before/after a load pattern) is the standard diagnostic technique.",
  thread: "Thread pool starvation happens when too many threads are blocked (often by synchronous-over-async calls like `.Result`) leaving none available to process new incoming work, causing requests to queue and latency to spike even though CPU looks idle — a strong 'production incident' story to have ready.",
  slowq: "Diagnosing a slow query: capture the actual SQL EF Core/Dapper is generating, run it with an execution plan, check for missing indexes, table scans, or an N+1 query pattern (one query per row instead of one query total) coming from an ORM navigation property being lazily loaded in a loop.",
  appins: "Application Insights (Azure Monitor) auto-collects requests, dependencies (DB/HTTP calls), exceptions, and custom telemetry, with distributed tracing across services via correlation ids — the go-to tool for answering 'why was this specific request slow' in a production ASP.NET Core app.",
  profiling: "Profiling tools (dotnet-trace, PerfView, Visual Studio Profiler, Application Insights Profiler) capture where time/CPU/allocations are actually going in a running app, rather than guessing — knowing at least one of these well enough to describe a real profiling session is a strong senior-level signal.",

  // ---- AI Engineering ----
  layers: "A useful mental model for explaining AI systems in an interview: (1) the base foundation model, (2) fine-tuning/alignment on top of it, (3) retrieval/context (RAG, tools) that grounds it in real data, (4) orchestration/agents that chain reasoning and tool calls, (5) the application layer/UX that end users actually interact with.",
  agents: "An AI agent uses a model in a loop — plan, call tools/APIs, observe results, decide next steps — to accomplish multi-step tasks rather than just answering a single prompt. Tools like Claude Code/Claude agents extend this to real developer workflows: reading/writing files, running commands, and iterating based on results.",
  tokens: "Tokens are the sub-word units models process text as, and cost/context-window limits are measured in them; the KV (key/value) cache stores intermediate attention state from previously processed tokens so the model doesn't recompute them for every new token generated, which is what makes long-context generation practically fast.",
  copilot: "GitHub Copilot gives inline, context-aware code suggestions and chat-based help directly in the IDE, speeding up boilerplate, test-writing, and unfamiliar-API lookups — a good interview answer explains where it genuinely saves time (boilerplate, scaffolding) versus where you still need to review carefully (business logic correctness, security).",
  "ai-code": "Beyond autocomplete, AI-assisted coding now includes agentic tools that can plan, edit multiple files, run tests, and iterate — the developer's role shifts toward reviewing, directing, and validating rather than typing every line, which is worth framing as a productivity multiplier rather than a replacement for engineering judgement.",
  "resp-ai": "Responsible AI covers things like avoiding harmful/biased outputs, being transparent about AI involvement, protecting user data/privacy, and having human oversight for consequential decisions — relevant to mention if you've built anything AI-assisted at work, especially around code review and data handling.",
  prompt: "Prompt engineering is about clearly specifying context, constraints, examples, and desired output format to get reliable results from a model — practical techniques include few-shot examples, explicit step-by-step instructions, and structured output requests (e.g. asking for JSON with a defined schema).",
  rag: "Retrieval-Augmented Generation grounds a model's answers in your own data by retrieving relevant documents/chunks (usually via vector/embedding search) and injecting them into the prompt as context, so the model can answer accurately about information it wasn't trained on — a common practical building block for internal knowledge-base or documentation assistants.",
};

// C# code examples shown alongside the explanation in the detail popup, keyed by topic id.
// Not every topic has (or needs) one -- infra/config-only or purely conceptual topics are omitted.
export const TOPIC_CODE = {
  // ---- C# Fundamentals ----
  oop: `public class Account {
    private decimal _balance;                 // Encapsulation
    public decimal Balance => _balance;
    public virtual void ApplyInterest() => _balance += _balance * 0.01m; // Polymorphism (virtual)
}

public class SavingsAccount : Account {       // Inheritance
    public override void ApplyInterest() => // Polymorphism (override)
        base.ApplyInterest();
}

public interface IAccount { decimal Balance { get; } } // Abstraction`,

  ModernDevelopment: `// Composition ("has-a") preferred over deep inheritance
public class Engine { public void Start() { } }

public class Car {
    private readonly Engine _engine = new();   // Composition
    public void Start() => _engine.Start();
}

// Aggregation: Employees exist independently of Department
public class Department {
    public List<Employee> Employees { get; } = new();
}`,

  solid: `// Single Responsibility + Dependency Inversion
public interface IInvoicePrinter { void Print(Invoice invoice); }

public class Invoice {
    public void CalculateTotal() { /* only pricing logic here */ }
}

public class InvoicePrinter : IInvoicePrinter {
    public void Print(Invoice invoice) { /* only printing logic here */ }
}`,

  di: `// Program.cs
builder.Services.AddSingleton<IEmailSender, SmtpEmailSender>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IReportGenerator, ReportGenerator>();

// Constructor injection
public class OrderService {
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo) => _repo = repo;
}`,

  iface: `public interface IShape { double Area(); }           // contract only

public abstract class Shape {
    protected string Name;                              // shared state
    public abstract double Area();                       // no implementation
    public void Describe() => Console.WriteLine(Name);   // shared implementation
}

public class Circle : Shape, IShape {
    public double Radius;
    public override double Area() => Math.PI * Radius * Radius;
}`,

  "value-ref": `struct Point { public int X, Y; }     // value type
class Box { public int Width; }        // reference type

void Mutate(Point p) => p.X = 99;      // copy -- caller unaffected
void MutateRef(Box b) => b.Width = 99; // same object -- caller sees change

object boxed = new Point { X = 1 };    // boxing (heap allocation)
Point unboxed = (Point)boxed;          // unboxing`,

  nullable: `#nullable enable
public class Customer {
    public string Name { get; set; } = "";   // never null
    public string? MiddleName { get; set; }  // explicitly nullable
}

string? city = customer.MiddleName;
Console.WriteLine(city.Length);   // compiler warning: possible null reference`,

  exceptions: `try {
    ProcessOrder(order);
}
catch (ValidationException ex) {          // most specific first
    _logger.LogWarning(ex, "Invalid order");
}
catch (Exception ex) {
    _logger.LogError(ex, "Unexpected error");
    throw;          // preserves original stack trace (NOT "throw ex;")
}
finally {
    connection.Close();
}`,

  disposable: `public class FileLogger : IDisposable {
    private readonly StreamWriter _writer = new("log.txt");
    public void Dispose() => _writer.Dispose();
}

using var logger = new FileLogger();   // Dispose() guaranteed, even on exception
logger.Write("hello");`,

  records: `public record PersonDto(string Name, int Age);   // value equality, immutable

var a = new PersonDto("Sam", 30);
var b = a with { Age = 31 };   // non-destructive mutation
Console.WriteLine(a == new PersonDto("Sam", 30));  // true -- value-based equality

public class PersonEntity {   // reference/identity equality by default
    public string Name; public int Age;
}`,

  cs12: `// Primary constructor (C# 12)
public class Order(int id, string customer) {
    public int Id { get; } = id;
    public string Customer { get; } = customer;
}

int[] numbers = [1, 2, 3];              // collection expression
void Greet(string name = "world") { }   // works with lambdas too`,

  pattern: `object result = GetResult();

string message = result switch {
    HttpResponseMessage { StatusCode: HttpStatusCode.OK } => "success",
    int n when n < 0 => "negative",
    Order { Total: > 100 } => "big order",
    null => "nothing returned",
    _ => "unknown",
};`,

  extension: `public static class StringExtensions {
    public static bool IsNullOrBlank(this string? s) =>
        string.IsNullOrWhiteSpace(s);
}

if (customerName.IsNullOrBlank()) { ... }   // reads like an instance method`,

  delegates: `Func<int, int, int> add = (a, b) => a + b;
Action<string> log = msg => Console.WriteLine(msg);
Predicate<int> isEven = n => n % 2 == 0;

int sum = add(2, 3);
log("done");`,

  events: `public class Button {
    public event EventHandler<EventArgs>? Clicked;
    public void SimulateClick() => Clicked?.Invoke(this, EventArgs.Empty);
}

var button = new Button();
button.Clicked += (s, e) => Console.WriteLine("clicked!");
button.Clicked -= handler;   // unsubscribe to avoid a leaked reference`,

  reflection: `Type type = typeof(Customer);
foreach (var prop in type.GetProperties())
    Console.WriteLine($"{prop.Name}: {prop.PropertyType}");

object instance = Activator.CreateInstance(type)!;
type.GetProperty("Name")!.SetValue(instance, "Sam");`,

  attributes: `[AttributeUsage(AttributeTargets.Property)]
public class MaxLengthAttribute : Attribute {
    public int Length { get; }
    public MaxLengthAttribute(int length) => Length = length;
}

public class Customer {
    [MaxLength(50)]
    public string Name { get; set; } = "";
}
// read via: prop.GetCustomAttribute<MaxLengthAttribute>()`,

  span: `Span<int> numbers = stackalloc int[3] { 1, 2, 3 }; // no heap allocation
Span<char> slice = "Hello, World".AsSpan(0, 5);       // view over existing memory

int Sum(ReadOnlySpan<int> values) {
    int total = 0;
    foreach (var v in values) total += v;
    return total;
}`,

  // ---- Async Programming ----
  "async-await": `public async Task<Order> GetOrderAsync(int id) {
    var order = await _db.Orders.FindAsync(id);   // thread freed while waiting
    return order;
}`,

  "task-thread": `// Thread -- expensive, dedicated OS resource
var thread = new Thread(() => DoWork());
thread.Start();

// Task -- lightweight, thread-pool based, ideal for I/O
Task<string> task = _httpClient.GetStringAsync(url);
string result = await task;`,

  "when-all": `var task1 = _httpClient.GetStringAsync(url1);
var task2 = _httpClient.GetStringAsync(url2);
var task3 = _httpClient.GetStringAsync(url3);

string[] results = await Task.WhenAll(task1, task2, task3); // runs concurrently`,

  "state-machine": `public async Task<int> ComputeAsync() {
    int a = await Step1Async();   // compiler generates a state machine --
    int b = await Step2Async();   // execution pauses/resumes at each await
    return a + b;                 // without blocking a thread
}`,

  "sync-ctx": `// Classic ASP.NET/WPF/WinForms -- captures SynchronizationContext
private async void Button_Click(object sender, EventArgs e) {
    var data = await FetchDataAsync();  // resumes back on UI thread
    label.Text = data;                  // safe here
}

// ASP.NET Core has no SynchronizationContext by default`,

  "async-api": `public async Task<Order> GetOrderAsync(
    int id, CancellationToken cancellationToken = default) {
    return await _db.Orders
        .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
}
// avoid: public async void GetOrder() { ... }  -- exceptions can't be caught`,

  "task-run": `// CPU-bound -- Task.Run makes sense
await Task.Run(() => ComputeHeavyMatrix(data));

// I/O-bound -- DON'T wrap it, just await the native async API
var response = await _httpClient.GetAsync(url);   // no Task.Run needed`,

  deadlocks: `// Deadlock-prone: blocking on async from a captured context
public string GetData() {
    var task = _service.GetDataAsync();
    return task.Result;    // can deadlock in classic ASP.NET/WPF/WinForms
}

// Fix: await all the way up
public async Task<string> GetDataAsync() => await _service.GetDataAsync();`,

  "configure-await": `public async Task<string> LoadAsync() {
    var data = await _repository.GetAsync().ConfigureAwait(false);
    return Process(data);   // doesn't need to resume on original context
}
// recommended in library code; largely moot in ASP.NET Core`,

  cancellation: `var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

public async Task ProcessAsync(CancellationToken token) {
    while (!token.IsCancellationRequested) {
        await DoUnitOfWorkAsync(token);
    }
    token.ThrowIfCancellationRequested();
}
await ProcessAsync(cts.Token);`,

  parallel: `Parallel.ForEach(orders, order => {
    ValidateOrder(order);          // CPU-bound work split across cores
});

var results = orders.AsParallel()
    .Where(o => o.Total > 100)
    .Select(o => o.Id)
    .ToList();`,

  producer: `var channel = Channel.CreateUnbounded<Order>();

// Producer
await channel.Writer.WriteAsync(newOrder);

// Consumer
await foreach (var order in channel.Reader.ReadAllAsync()) {
    ProcessOrder(order);
}`,

  // ---- LINQ ----
  where: `var results = orders
    .Where(o => o.Total > 100)
    .OrderByDescending(o => o.Date)
    .GroupBy(o => o.CustomerId)
    .Select(g => new { CustomerId = g.Key, Count = g.Count() });`,

  first: `var order = orders.First(o => o.Id == 5);          // throws if none found
var maybeOrder = orders.FirstOrDefault(o => o.Id == 5); // returns null if none found`,

  enumerable: `IEnumerable<Order> inMemory = orders.Where(o => o.Total > 100); // runs in process

IQueryable<Order> query = _db.Orders.Where(o => o.Total > 100);  // translated to SQL
var list = await query.ToListAsync();  // executes at the database`,

  deferred: `var query = orders.Where(o => o.Total > 100);  // not executed yet

orders.Add(newOrder);
foreach (var o in query) { }  // executes NOW -- includes newOrder

var materialized = query.ToList(); // forces immediate execution`,

  "any-count": `bool hasBigOrders = orders.Any(o => o.Total > 1000);  // short-circuits -- fast
int bigOrderCount = orders.Count(o => o.Total > 1000); // enumerates everything

// prefer Any() over Count() > 0 for existence checks`,

  single: `var order = orders.Single(o => o.Id == id);           // throws if 0 or >1 match
var maybeOrder = orders.SingleOrDefault(o => o.Id == id); // throws only if >1`,

  join: `var results =
    from o in orders
    join c in customers on o.CustomerId equals c.Id
    select new { o.Id, c.Name };

// method syntax
orders.Join(customers, o => o.CustomerId, c => c.Id, (o, c) => new { o.Id, c.Name });`,

  selectmany: `var allLineItems = orders.SelectMany(o => o.LineItems); // flattened List<LineItem>

// vs Select, which would give IEnumerable<IEnumerable<LineItem>>
var nested = orders.Select(o => o.LineItems);`,

  expr: `Expression<Func<Order, bool>> expr = o => o.Total > 100;  // inspectable tree
Func<Order, bool> compiled = expr.Compile();                // runnable delegate

// EF Core walks the Expression tree and translates it into SQL
var big = await _db.Orders.Where(expr).ToListAsync();`,

  // ---- .NET API Development ----
  http: `var app = builder.Build();
app.UseExceptionHandler();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();   // matched endpoint executes here
app.Run();`,

  minimal: `var app = builder.Build();

app.MapGet("/orders/{id}", async (int id, IOrderRepository repo) =>
    await repo.GetAsync(id) is { } order ? Results.Ok(order) : Results.NotFound());

app.Run();`,

  routing: `[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase {
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id) => Ok(await _repo.GetAsync(id));
}`,

  middleware: `public class RequestTimingMiddleware {
    private readonly RequestDelegate _next;
    public RequestTimingMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context) {
        var sw = Stopwatch.StartNew();
        await _next(context);           // call the next middleware
        Console.WriteLine(sw.ElapsedMilliseconds); // runs on the way back out
    }
}`,

  rest: `[HttpGet("{id}")]     public async Task<IActionResult> Get(int id) => Ok(default);
[HttpPost]            public async Task<IActionResult> Create(OrderDto dto) => Ok(default);
[HttpPut("{id}")]     public async Task<IActionResult> Replace(int id, OrderDto dto) => NoContent();
[HttpDelete("{id}")]  public async Task<IActionResult> Delete(int id) => NoContent();`,

  jwt: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
        };
    });`,

  versioning: `[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/orders")]
public class OrdersController : ControllerBase { }

builder.Services.AddApiVersioning(o => o.DefaultApiVersion = new ApiVersion(1, 0));`,

  "global-ex": `// .NET 8+ IExceptionHandler
public class GlobalExceptionHandler : IExceptionHandler {
    public async ValueTask<bool> TryHandleAsync(
        HttpContext context, Exception exception, CancellationToken ct) {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new ProblemDetails {
            Title = "An unexpected error occurred" }, ct);
        return true;
    }
}`,

  filters: `public class ValidateModelFilter : IActionFilter {
    public void OnActionExecuting(ActionExecutingContext context) {
        if (!context.ModelState.IsValid)
            context.Result = new BadRequestObjectResult(context.ModelState);
    }
    public void OnActionExecuted(ActionExecutedContext context) { }
}`,

  "di-life": `builder.Services.AddSingleton<ICacheService, MemoryCacheService>(); // one for app lifetime
builder.Services.AddScoped<AppDbContext>();                          // one per HTTP request
builder.Services.AddTransient<IEmailBuilder, EmailBuilder>();        // new every time

// Bug: injecting a Scoped service into a Singleton throws at runtime`,

  health: `builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>()
    .AddUrlGroup(new Uri("https://api.partner.com/health"), "partner-api");

app.MapHealthChecks("/health");`,

  rate: `builder.Services.AddRateLimiter(options => {
    options.AddFixedWindowLimiter("fixed", opt => {
        opt.PermitLimit = 100;
        opt.Window = TimeSpan.FromMinutes(1);
    });
});
app.UseRateLimiter();`,

  // ---- Auth & Security ----
  jwt2: `[Authorize]
[HttpGet("me")]
public IActionResult GetProfile() {
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    return Ok(userId);
}`,

  authn: `app.UseAuthentication();   // who are you -- must run first
app.UseAuthorization();    // what are you allowed to do

[Authorize]                      // requires authentication
[Authorize(Roles = "Admin")]     // + requires the Admin role`,

  claims: `var claims = new List<Claim> {
    new(ClaimTypes.NameIdentifier, user.Id.ToString()),
    new(ClaimTypes.Email, user.Email),
    new("role", "Manager"),
};
var identity = new ClaimsIdentity(claims, "jwt");
var principal = new ClaimsPrincipal(identity);`,

  role: `[Authorize(Roles = "Admin,Manager")]
[HttpDelete("{id}")]
public IActionResult Delete(int id) => NoContent();`,

  policy: `builder.Services.AddAuthorization(options => {
    options.AddPolicy("CanEditOrders", policy =>
        policy.RequireClaim("department", "Sales")
              .RequireRole("Manager"));
});

[Authorize(Policy = "CanEditOrders")]
public IActionResult Edit(int id) => NoContent();`,

  owasp: `// SQL injection -- vulnerable
var sql = $"SELECT * FROM Users WHERE Name = '{userInput}'";

// safe -- parameterized
var users = await _db.Users
    .Where(u => u.Name == userInput)   // EF Core parameterizes automatically
    .ToListAsync();`,

  // ---- SQL Server & Database (via EF Core / Dapper) ----
  "sql-q": `// Dapper
var orders = await connection.QueryAsync<Order>(
    "SELECT * FROM Orders WHERE CustomerId = @Id", new { Id = customerId });`,

  sprocs: `using var cmd = new SqlCommand("usp_GetCustomerOrders", connection) {
    CommandType = CommandType.StoredProcedure
};
cmd.Parameters.AddWithValue("@CustomerId", customerId);
using var reader = await cmd.ExecuteReaderAsync();`,

  joins: `var results = _db.Orders
    .Join(_db.Customers, o => o.CustomerId, c => c.Id, (o, c) => new { o, c }); // INNER JOIN

var leftJoin = _db.Customers
    .GroupJoin(_db.Orders, c => c.Id, o => o.CustomerId, (c, orders) => new { c, orders })
    .SelectMany(x => x.orders.DefaultIfEmpty(), (x, o) => new { x.c, o }); // LEFT JOIN`,

  tx: `using var transaction = await _db.Database.BeginTransactionAsync();
try {
    _db.Orders.Add(order);
    await _db.SaveChangesAsync();
    _db.Payments.Add(payment);
    await _db.SaveChangesAsync();
    await transaction.CommitAsync();
} catch {
    await transaction.RollbackAsync();
    throw;
}`,

  isolation: `using var transaction = await _db.Database
    .BeginTransactionAsync(IsolationLevel.Serializable);
// ... operations that must not see phantom/dirty reads
await transaction.CommitAsync();`,

  "ef-dapper": `// EF Core -- full ORM, change tracking, LINQ-to-SQL
var order = await _db.Orders.Include(o => o.LineItems).FirstOrDefaultAsync(o => o.Id == id);

// Dapper -- thin, hand-tuned mapping
var order2 = await connection.QuerySingleAsync<Order>(
    "SELECT * FROM Orders WHERE Id = @Id", new { Id = id });`,

  // ---- Entity Framework ----
  dbctx: `builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));   // Scoped by default -- one per request

// for long-lived scenarios:
builder.Services.AddDbContextFactory<AppDbContext>();`,

  tracking: `var trackedOrders = await _db.Orders.ToListAsync();       // tracked -- costs memory/CPU
order.Total = 150;
await _db.SaveChangesAsync();  // EF diffs tracked snapshot to generate the UPDATE`,

  migrations: `// PM> Add-Migration AddOrderDiscount
// PM> Update-Database
public partial class AddOrderDiscount : Migration {
    protected override void Up(MigrationBuilder mb) =>
        mb.AddColumn<decimal>(name: "Discount", table: "Orders", nullable: false, defaultValue: 0m);
}`,

  lazy: `public class Order {
    public virtual ICollection<LineItem> LineItems { get; set; } // lazy loading (proxy)
}

// eager loading -- safer default
var orders = await _db.Orders.Include(o => o.LineItems).ToListAsync();`,

  notrack: `var orders = await _db.Orders.AsNoTracking().ToListAsync(); // faster, read-only

order.Total = 200;
await _db.SaveChangesAsync();   // change NOT picked up -- not tracked!`,

  repo: `public interface IOrderRepository {
    Task<Order?> GetAsync(int id);
    Task AddAsync(Order order);
}

public class OrderRepository : IOrderRepository {
    private readonly AppDbContext _db;
    public OrderRepository(AppDbContext db) => _db = db;
    public Task<Order?> GetAsync(int id) => _db.Orders.FindAsync(id).AsTask();
    public Task AddAsync(Order order) { _db.Orders.Add(order); return _db.SaveChangesAsync(); }
}`,

  uow: `// DbContext itself already acts as a Unit of Work
_db.Orders.Add(order);
_db.Payments.Add(payment);
await _db.SaveChangesAsync();   // both committed atomically in one call`,

  // ---- Architecture & Design ----
  hex: `public interface IOrderRepository { Task SaveAsync(Order order); }  // port

public class OrderService {         // core application logic -- knows nothing about SQL/REST
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo) => _repo = repo;
}

public class SqlOrderRepository : IOrderRepository { }  // adapter`,

  cqrs: `public record CreateOrderCommand(int CustomerId, decimal Total);
public record GetOrderQuery(int Id);

public class CreateOrderHandler {
    public Task Handle(CreateOrderCommand cmd) { /* writes, validation */ return Task.CompletedTask; }
}
public class GetOrderHandler {
    public Task<OrderDto> Handle(GetOrderQuery query) { /* optimised reads */ return null!; }
}`,

  "event-driven": `public record OrderPlacedEvent(int OrderId, decimal Total);

// publisher
await _eventBus.PublishAsync(new OrderPlacedEvent(order.Id, order.Total));

// consumer (decoupled -- doesn't know who publishes)
public class SendConfirmationEmailHandler : IEventHandler<OrderPlacedEvent> {
    public Task Handle(OrderPlacedEvent e) => _email.SendAsync(e.OrderId);
}`,

  // ---- Messaging & Integration ----
  rabbit: `using var channel = connection.CreateModel();
channel.QueueDeclare("orders", durable: true, exclusive: false, autoDelete: false);

var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(order));
channel.BasicPublish(exchange: "", routingKey: "orders", body: body);`,

  sqs: `var client = new AmazonSQSClient();
await client.SendMessageAsync(new SendMessageRequest {
    QueueUrl = queueUrl,
    MessageBody = JsonSerializer.Serialize(order)
});`,

  pubsub: `public interface IEventHandler<T> { Task Handle(T @event); }

public class OrderPlacedHandler : IEventHandler<OrderPlacedEvent> {
    public Task Handle(OrderPlacedEvent e) => _shippingService.ScheduleAsync(e.OrderId);
}
// publisher has no reference to OrderPlacedHandler -- fully decoupled`,

  retry: `var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt))); // exp backoff

await retryPolicy.ExecuteAsync(() => _httpClient.GetAsync(url));`,

  idem: `if (await _db.ProcessedMessages.AnyAsync(m => m.MessageId == message.Id))
    return;   // already processed -- short-circuit duplicate

await ProcessAsync(message);
_db.ProcessedMessages.Add(new ProcessedMessage(message.Id));
await _db.SaveChangesAsync();`,

  // ---- Testing ----
  unit: `public class OrderCalculatorTests {
    [Fact]
    public void ApplyDiscount_ReducesTotal() {
        var calculator = new OrderCalculator();
        var result = calculator.ApplyDiscount(100m, 0.1m);
        Assert.Equal(90m, result);
    }
}`,

  integration: `public class OrdersApiTests : IClassFixture<WebApplicationFactory<Program>> {
    private readonly HttpClient _client;
    public OrdersApiTests(WebApplicationFactory<Program> factory) => _client = factory.CreateClient();

    [Fact]
    public async Task Get_ReturnsOrder() {
        var response = await _client.GetAsync("/api/orders/1");
        response.EnsureSuccessStatusCode();
    }
}`,

  mocking: `var mockRepo = new Mock<IOrderRepository>();
mockRepo.Setup(r => r.GetAsync(1)).ReturnsAsync(new Order { Id = 1 });

var service = new OrderService(mockRepo.Object);
var order = await service.GetOrderAsync(1);

mockRepo.Verify(r => r.GetAsync(1), Times.Once);`,

  xunit: `public class MathTests {
    [Fact]
    public void Add_ReturnsSum() => Assert.Equal(5, Calculator.Add(2, 3));

    [Theory]
    [InlineData(2, 3, 5)]
    [InlineData(-1, 1, 0)]
    public void Add_VariousInputs(int a, int b, int expected) =>
        Assert.Equal(expected, Calculator.Add(a, b));
}`,

  // ---- Performance & Troubleshooting ----
  logs: `_logger.LogInformation(
    "Order {OrderId} placed by {CustomerId} for {Total:C}",
    order.Id, order.CustomerId, order.Total);   // structured logging, not string concat`,

  memleak: `public class Publisher {
    public event EventHandler? Updated;
}

// leak: subscriber never unsubscribes, so Publisher keeps it alive forever
publisher.Updated += Subscriber_OnUpdated;
// fix:
publisher.Updated -= Subscriber_OnUpdated;`,

  thread: `// causes thread-pool starvation under load
var result = _httpClient.GetAsync(url).Result;   // blocks a pool thread

// fix -- frees the thread while waiting
var result2 = await _httpClient.GetAsync(url);`,

  slowq: `// N+1 -- one query per order, executed in a loop
foreach (var order in await _db.Orders.ToListAsync())
    Console.WriteLine(order.Customer.Name);   // triggers a query per iteration

// fixed -- one query total
var orders = await _db.Orders.Include(o => o.Customer).ToListAsync();`,

  appins: `_telemetryClient.TrackEvent("OrderPlaced", new Dictionary<string, string> {
    ["OrderId"] = order.Id.ToString()
});
_telemetryClient.TrackDependency("Sql", "GetOrder", data, start, duration, success);`,
};
