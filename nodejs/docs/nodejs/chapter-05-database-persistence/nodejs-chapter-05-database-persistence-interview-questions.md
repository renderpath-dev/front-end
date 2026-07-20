# Node.js 第 5 章面试题：PostgreSQL、SQL 持久化、Prisma ORM 与数据库边界

## 1. process memory 和 database persistence 的核心区别是什么？

process memory 属于当前 Node.js process 的 V8 heap，进程退出后由操作系统回收；database persistence 属于 PostgreSQL server 管理的数据存储，独立于当前 Node process。memory repository 适合验证分层接口，不能证明数据重启后存在、数据库约束成立或事务原子性成立。

## 2. relational model 中 table、row、column、primary key、foreign key 分别是什么？

table 是同类关系数据的集合；row 是一条记录；column 是每条 row 的字段定义；primary key 唯一识别一条 row；foreign key 让 child row 引用 parent table 的有效 row。TypeScript 的 `notebookId: string` 只证明应用值是 string，不证明 referenced row 存在。

## 3. primary key 和 foreign key 为什么不是同一种约束？

primary key 解决 row identity 问题，目标是唯一定位当前 table 中的一行。foreign key 解决 relation integrity 问题，目标是保证当前 row 引用另一个 table 中存在的 row。前者建立身份，后者建立跨表合法引用。

## 4. 为什么 TypeScript 和 Zod 不能替代 database constraints？

TypeScript 是 compile-time static checking，运行时会被擦除；Zod 是 request/env 等 runtime input validation；database constraints 是 PostgreSQL 在 row write/update 时执行的数据完整性规则。HTTP body 通过 Zod 不代表数据库里没有重复值，也不代表 foreign key 一定存在。

## 5. SQL injection 的机制是什么？parameterized query 为什么能防住 value injection？

SQL injection 发生在 untrusted input 被拼接进 SQL text 并改变 SQL grammar 时。Parameterized query 把 SQL text 与 values array 分离，PostgreSQL 把 `$1`、`$2` 当 value placeholders 处理，用户输入不参与 SQL parser 的结构解析。它保护 values，不保护 table name 或 column name。

## 6. `pool.query()` 和 checked-out `client` 的边界是什么？

`pool.query()` 适合单条独立 query，因为 pool 可以借出任意连接执行并归还。Transaction 需要同一个 database session，所以必须 `pool.connect()` 拿到 checked-out client，并在同一个 client 上执行 `BEGIN`、后续语句、`COMMIT` 或 `ROLLBACK`。

## 7. 为什么 transaction 必须使用同一个 client？

Transaction state 存在于 PostgreSQL session 中，不存在于 JavaScript call stack 中。连接池可能把不同 `pool.query()` 分配给不同 session；如果 `BEGIN` 和后续写入不在同一个 session，就不属于同一个 transaction context。

## 8. PostgreSQL `RETURNING` 解决什么问题？

`RETURNING` 让 `INSERT`、`UPDATE`、`DELETE` 在修改 row 的同时返回受影响 row。创建 API 可以直接拿到数据库生成的 id 和 timestamps；更新 API 可以直接返回更新后的状态；删除 API 可以确认实际删除目标。

## 9. index 和 `EXPLAIN` 的关系是什么？

Index 是 PostgreSQL planner 可选择的 access path。`EXPLAIN` 展示 planner 为某个 query shape 选择的 plan。Index 可能改善符合其 column order 和 predicate 的 read path，但会增加存储和 write maintenance 成本。

## 10. ORM 抽象了什么？没有抽象什么？

Prisma 抽象了 generated client、typed CRUD、relation query、transactions 和 migration workflow。它没有抽象掉 PostgreSQL constraints、indexes、transaction atomicity、connection lifecycle、database error mapping，也不让 Prisma model 自动等于 public response DTO。

## 11. Prisma schema 的核心组成是什么？

Prisma schema 通常包含 datasource、generator 和 data model。datasource 指向数据库 provider 和 URL 来源；generator 决定 Prisma Client 生成方式；models、relations、indexes 和 unique rules 描述持久化模型，并影响 generated client 与 migrations。

## 12. `prisma migrate dev`、`reset`、`deploy` 怎么区分？

`prisma migrate dev` 用在 development，用于创建并应用 migration；`prisma migrate reset` 会重置数据库，适合 development/test，不适合共享或生产数据；`prisma migrate deploy` 用于 production/staging 应用已有 pending migrations，不负责交互式生成新 migration。

## 13. Prisma Client CRUD 的机制链是什么？

Repository 调用 `prisma.model.method()`；TypeScript 检查参数 shape；generated client 把调用转为数据库 query；PostgreSQL 执行查询或写入并检查 constraints；Prisma 返回 record 或抛出 known request error；repository 把 persistence record 映射为 domain model；service 决定业务 result。

## 14. `select` 和 `include` 怎么区分？

`select` 控制字段选择，用于缩小返回字段；`include` 控制 relation loading，用于加载关联 records。两者都只控制读取 shape，不等于 public API contract。Response DTO 仍应由应用显式设计。

## 15. 为什么 repository replacement 是 Chapter 04 到 Chapter 05 的关键？

Chapter 04 的 repository contract 让 service 不依赖具体存储。Chapter 05 可以把 memory repository 替换为 Prisma repository，而 controller 和 service 的大部分逻辑仍保持稳定。这样业务层依赖 contract，存储层拥有 database detail。

## 16. database error mapping 为什么要分两步？

第一步把 Prisma/database error 映射为 domain error，例如 conflict、not found、invalid reference。第二步把 domain error 映射为 HTTP status 和 public error code。这样可以保留内部诊断能力，同时避免把 raw database message、SQL 或 connection detail 泄漏给 client。

## 17. seed data 和 test reset 的边界是什么？

Seed data 准备可重复初始状态，通常使用 `upsert` 避免重复。Test reset 是破坏性清理，需要 `NODE_ENV=test` guard，并按 foreign key 方向删除 child rows 再删除 parent rows。它们都不应该隐式运行在生产或共享数据库上。

## 18. persistence integration test 应该断言什么？

它应该同时断言 HTTP response 和 database state。Supertest 证明 Express pipeline、validation、controller 和 error middleware；Prisma read-back 证明 repository 确实写入 PostgreSQL；reset helper 证明每个 test 都从干净数据库状态开始。

## 19. `persistent-notes-api` 的分层设计是什么？

`app.ts` 组合 Express middleware 和 routers；controllers 适配 HTTP；schemas 进行 Zod runtime validation；services 处理 business result 和 domain errors；repositories 拥有 Prisma queries；`src/db/prisma.ts` 集中创建 PrismaClient；error middleware 输出统一 error shape。

## 20. 为什么不能在 controller 中直接写 Prisma 查询？

Controller 的职责是 HTTP adaptation。直接写 Prisma 查询会把 HTTP layer、business decision、persistence implementation 绑在一起，使测试、错误映射、repository replacement 和后续迁移都变困难。数据库访问应该集中在 repository。
