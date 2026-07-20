# Node.js 第 5 章：PostgreSQL、SQL 持久化、Prisma ORM 与数据库边界

<style>
.macos-code-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  margin: 16px 0;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  flex: 0 0 auto;
}

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #ffbd2e;
}

.macos-code-dot-green {
  background: #28c840;
}

.macos-code-title {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #c9d1d9;
}

.macos-code-titlebar + pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: transparent;
  border-radius: 0 0 12px 12px;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
</style>

> 适用基线：Node.js v26.3.0；npm 11.16.0；TypeScript strict mode；Express 5；PostgreSQL；node-postgres；Prisma ORM v7 文档模型。  
> 本章边界：只学习数据库持久化、SQL 基础、node-postgres 连接与事务、Prisma schema/client/migrate、repository replacement、数据库错误映射与持久化集成测试；不学习 authentication、Redis、Docker、NestJS、Fastify、部署或数据库管理。

## 目录

- [0. 章前定位](#0-章前定位)
- [1. 学习目标](#1-学习目标)
- [2. 前置知识](#2-前置知识)
- [3. 环境与运行基线](#3-环境与运行基线)
- [4. 第一性原理](#4-第一性原理)
- [5. 技术边界模型](#5-技术边界模型)
- [6. 底层机制模型](#6-底层机制模型)
- [7. 核心术语](#7-核心术语)
- [8. 本章实践路线](#8-本章实践路线)
- [9. 核心教学](#9-核心教学)
  - [9.1 process memory 与 database persistence 的边界](#section-9-1)
  - [9.2 relational model：table、row、column、primary key、foreign key](#section-9-2)
  - [9.3 DDL 与 DML：CREATE TABLE、INSERT、UPDATE、DELETE](#section-9-3)
  - [9.4 PostgreSQL constraints：NOT NULL、UNIQUE、FOREIGN KEY、CHECK](#section-9-4)
  - [9.5 PostgreSQL CRUD 与 RETURNING](#section-9-5)
  - [9.6 SQL injection 与 parameterized query](#section-9-6)
  - [9.7 node-postgres pool、client、query result](#section-9-7)
  - [9.8 transaction client boundary：为什么 transaction 必须使用同一个 client](#section-9-8)
  - [9.9 indexes、query shape 与 EXPLAIN 入门](#section-9-9)
  - [9.10 ORM 是什么：Prisma 抽象了什么，没有抽象什么](#section-9-10)
  - [9.11 Prisma schema：datasource、generator、model、relation、index](#section-9-11)
  - [9.12 Prisma Migrate：dev、reset、deploy 的边界](#section-9-12)
  - [9.13 Prisma Client CRUD：create、findMany、findUnique、update、delete](#section-9-13)
  - [9.14 Prisma filtering、sorting、pagination](#section-9-14)
  - [9.15 select / include 与 response shaping](#section-9-15)
  - [9.16 repository replacement：memory repository 到 Prisma repository](#section-9-16)
  - [9.17 database error mapping：Prisma error 到 domain / HTTP error](#section-9-17)
  - [9.18 seed data 与 test database reset](#section-9-18)
  - [9.19 integration tests with persisted data](#section-9-19)
  - [9.20 connection lifecycle：PrismaClient、process shutdown、test cleanup](#section-9-20)
  - [9.21 Chapter integration: persistent-notes-api](#section-9-21)
- [10. API 与规则索引](#10-api-与规则索引)
- [11. 常见错误对照表](#11-常见错误对照表)
- [12. 调试与验证方法](#12-调试与验证方法)
- [13. 分项练习说明](#13-分项练习说明)
- [14. 最终迷你项目](#14-最终迷你项目)
  - [14.1 项目目标](#141-项目目标)
  - [14.2 最终迷你项目结构](#142-最终迷你项目结构)
  - [14.3 完整项目代码](#143-完整项目代码)
  - [14.4 运行与测试](#144-运行与测试)
  - [14.5 执行与生命周期](#145-执行与生命周期)
  - [14.6 常见错误](#146-常见错误)
- [15. 知识迁移与真实项目场景](#15-知识迁移与真实项目场景)
- [16. 本章复盘任务](#16-本章复盘任务)
- [17. 最终心智模型](#17-最终心智模型)
- [18. 官方资料](#18-官方资料)

## 本章代码定位索引

| 学习目标 | 文件或片段 | 可观察证据 |
| --- | --- | --- |
| 建立表、关系、约束和索引 | `practices/05-database-persistence/01-sql-model/schema.sql` | `notebooks` 与 `notes` 通过 `notebook_id` 形成一对多关系 |
| 观察数据库约束错误 | `practices/05-database-persistence/01-sql-model/constraints-demo.sql` | `NOT NULL`、`UNIQUE`、`FOREIGN KEY`、`CHECK` 会拒绝非法写入 |
| 理解 `RETURNING` | `practices/05-database-persistence/01-sql-model/returning-crud.sql` | `INSERT`、`UPDATE`、`DELETE` 直接返回受影响行 |
| 理解 query shape 与索引 | `practices/05-database-persistence/01-sql-model/explain-index-demo.sql` | `EXPLAIN` 展示 planner 选择的查询计划 |
| 区分 independent query 与连接生命周期 | `practices/05-database-persistence/02-node-postgres/pg-pool-query.ts` | `pool.query()` 执行单条独立 SQL 并在 `finally` 关闭 pool |
| 理解参数化查询 | `practices/05-database-persistence/02-node-postgres/parameterized-query.ts` | SQL 文本与 `$1` 参数数组分离 |
| 理解 transaction client boundary | `practices/05-database-persistence/02-node-postgres/transaction-client-boundary.ts` | `BEGIN`、写入、`COMMIT`、`ROLLBACK` 都在同一个 checked-out client 上 |
| 理解 row 到 DTO 的映射 | `practices/05-database-persistence/02-node-postgres/row-mapper-boundary.ts` | snake_case row 被转换为 camelCase response DTO |
| 理解 Prisma schema 与 Client | `practices/05-database-persistence/03-prisma-basics/schema.prisma` | datasource、generator、model、relation、index 同时存在 |
| 替换 Chapter 04 memory repository | `practices/05-database-persistence/04-repository-replacement/prisma-repository.ts` | 同一个 repository contract 可以背靠 Prisma 查询 |
| 保护 test database reset | `practices/05-database-persistence/05-test-data/reset-test-database.ts` | `NODE_ENV=test` 是 destructive reset 的运行边界 |
| 综合应用持久化 API | `mini-projects/persistent-notes-api/src/app.ts` | Express app 组合 validation、routes、not-found、error middleware |

## 0. 章前定位

Chapter 04 已经建立 TypeScript backend 的分层边界：`app.ts` 与 `server.ts` 分离，controller 适配 HTTP，service 表达业务结果，repository 隔离数据访问，Zod 处理 runtime validation。本章只替换“数据保存在哪里”这一个核心问题：从进程内存转向 PostgreSQL 持久化，并用 Prisma 作为最终项目的数据访问实现。

Phase 5 在路线图中还包含 auth、cache、file upload 与 API security。本章只取其中的数据库持久化切片。认证、Redis、Docker 与部署属于后续章节边界。

## 1. 学习目标

完成本章后，你应该能做到：

- 解释 process memory 与 database persistence 的生命周期差异。
- 用 SQL 描述 table、row、column、primary key、foreign key、constraint、index 与 transaction。
- 说明 TypeScript、Zod、PostgreSQL constraint 分别能证明什么、不能证明什么。
- 使用 node-postgres 的 `Pool`、`pool.query()`、checked-out `client` 与 parameterized query。
- 解释为什么 transaction 不能由多次 `pool.query()` 拼接。
- 读懂 Prisma schema 中 datasource、generator、model、relation、index 的边界。
- 区分 `prisma migrate dev`、`prisma migrate reset`、`prisma migrate deploy`。
- 用 Prisma Client 完成 CRUD、filtering、sorting、pagination、`select`、`include`。
- 把 Prisma errors 映射为 public domain / HTTP errors，而不是泄漏数据库原始错误。
- 写出带数据库 reset guard 的 persistence integration tests。

## 2. 前置知识

本章假设你已经理解：

- Chapter 01 的 `process.env`、process lifecycle、exit code、signal。
- Chapter 02 的 resource lifecycle、module import、`finally` cleanup。
- Chapter 03 的 Express request/response pipeline、Zod validation、error middleware、Supertest。
- Chapter 04 的 app/server split、repository contract、service result、DTO 与 OpenAPI contract。

不需要提前精通 PostgreSQL 管理、Docker、数据库调优或 Prisma 高级特性。

## 3. 环境与运行基线

本章使用 Node.js 运行 TypeScript 源码时，项目命令交给 npm scripts 和 `tsx`。数据库行为依赖真实 PostgreSQL 实例；如果没有本地数据库，仍然可以阅读代码、理解 schema、检查静态结构，但数据库迁移、seed 与 integration tests 需要等 `DATABASE_URL` 指向可用数据库后再运行。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
node -v
npm -v
npm run prisma:generate
npm run prisma:migrate:dev
npm test
```
</div>

这组命令分别验证 runtime、package manager、Prisma Client generation、development migration 与数据库集成测试。`prisma:migrate:reset` 不属于普通运行基线，因为它会重置数据库。

## 4. 第一性原理

进程内存只能跟随当前 Node.js process 存活。进程退出、崩溃、重启或被部署平台替换后，`Map`、数组、对象中的数据都会消失。持久化数据库解决的是“数据独立于当前进程继续存在”的问题。

PostgreSQL 不是 Node.js 的一部分。Node.js 通过 TCP socket 与 PostgreSQL server 通信；node-postgres 是底层 driver；Prisma 是 ORM 和代码生成工具；Express 只是 HTTP pipeline。把这些层混在一起会导致两个常见错误：在 controller 里写数据库细节，或者以为 TypeScript/Zod 能替代数据库约束。

## 5. 技术边界模型

| Layer | 本章责任 | 不负责什么 |
| --- | --- | --- |
| SQL language | 描述表结构、查询、写入、事务语义 | 不管理 Node process lifecycle |
| PostgreSQL database behavior | 保存数据、检查约束、维护索引、执行事务 | 不验证 HTTP body 形状 |
| Node runtime behavior | 读取 env、执行 async code、管理 process signal | 不决定 SQL constraint 是否成立 |
| node-postgres driver behavior | pool、client、query、parameter binding | 不生成 Prisma Client |
| Prisma ORM behavior | schema、generated client、CRUD abstraction | 不消除数据库约束和事务边界 |
| Prisma migration behavior | schema diff、migration files、deploy pending migrations | 不代表生产发布流程完整 |
| Express framework convention | route、middleware、error flow、response | 不保存数据 |
| TypeScript type system | 静态检查 DTO、repository contract、service result | 不验证外部输入和数据库真实行 |
| Zod runtime validation | 检查 HTTP body、params、query、env | 不替代 foreign key、unique、check |
| npm tooling behavior | 安装依赖、运行 scripts | 不证明数据库已可连接 |

## 6. 底层机制模型

一次创建 note 的完整路径可以压缩为：

1. HTTP request 进入 Express。
2. `express.json()` 把 body stream 解析为 JavaScript object。
3. Zod schema 把 untrusted runtime value 解析为 typed input。
4. Controller 读取 validated input，调用 service。
5. Service 决定业务结果模型，并把持久化操作委托给 repository。
6. Repository 调用 Prisma Client。
7. Prisma Client 根据 generated client 和 adapter 发送数据库查询。
8. PostgreSQL 检查 table、foreign key、unique、check、transaction 规则。
9. 数据库返回 row 或错误。
10. Repository 把 persistence model 映射为 domain object。
11. Service 把成功或 domain error 交给 controller。
12. Controller 和 error middleware 输出 public response shape。

## 7. 核心术语

| Concept | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| Process memory | JavaScript runtime | 当前 Node.js process 内的对象、数组、Map | 误以为重启后还存在 |
| Table | PostgreSQL | 关系数据集合，由 columns 定义 row shape | 把 table 当成 TypeScript type |
| Primary key | PostgreSQL constraint | 唯一识别一行 | 用业务名称代替稳定 id |
| Foreign key | PostgreSQL constraint | 约束一行引用另一张表的有效行 | 只在 service 里检查引用 |
| Parameterized query | driver / SQL protocol | SQL text 与 value binding 分离 | 拼接用户输入 |
| Pool | node-postgres | 复用数据库连接 | 每个请求创建新 pool |
| Transaction | PostgreSQL / driver | 多条语句作为一个原子单元 | 用不同 client 拼接事务 |
| Prisma schema | Prisma tooling | datasource、generator、model、relation、index 配置 | 把 Prisma model 当 public DTO |
| Migration | Prisma tooling / database | 从 schema change 生成并应用数据库变更 | 在生产使用 reset |
| Repository contract | architecture | 隔离业务层与 persistence implementation | 在 controller 直接调用 ORM |

## 8. 本章实践路线

先用 SQL 文件看到数据库自己的约束和返回行为，再用 node-postgres 暴露 connection、query、transaction 的底层边界，随后用 Prisma 学习 ORM 抽象与 migration workflow，最后把 Chapter 04 的 memory repository 替换为 Prisma-backed repository，并用 integration tests 检查数据确实落在 PostgreSQL。

## 9. 核心教学

<a id="section-9-1"></a>

### 9.1 process memory 与 database persistence 的边界

**结论：**

`Map` 保存的是当前 JavaScript process 的内存引用；PostgreSQL 保存的是进程外数据库系统中的 rows。重启 Node.js process 会清空 memory repository，但不会自动删除数据库 rows。

**本节解决的问题：**

Chapter 04 的 memory repository 适合解释分层，但不能模拟真实业务系统的持久化、约束、事务和并发行为。

**机制证据链：**

触发点是 `POST /notebooks`；Express 生成 request/response 对象；Zod 解析 body；service 调用 repository；memory repository 只写入 `Map`，Prisma repository 会发送 database query；PostgreSQL 写入 row；HTTP response 只代表本次请求结果；错误形态中，重启后 memory 数据消失，而 PostgreSQL row 仍可查询。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: memory boundary</span>
  </div>

```ts
const notes = new Map<string, { id: string; title: string }>();

notes.set("note_1", { id: "note_1", title: "Only in this process" });

console.log(notes.get("note_1"));
```
</div>

**机制解释：**

`notes` 是当前 V8 heap 中的对象引用；`notes.set()` 修改的是进程内数据结构；Node.js 退出时 OS 回收该进程内存。数据库持久化则需要 driver 通过 socket 把 query 交给 PostgreSQL，PostgreSQL 再把 row 写入自己的存储和事务日志。

**常见错误：**

把 memory repository 的测试通过等同于数据库行为通过。违反的规则是：进程内对象不能证明数据库约束、事务原子性、连接生命周期或持久化结果。

**最终记忆模型：**

Memory repository 证明分层；database repository 证明持久化。

<a id="section-9-2"></a>

### 9.2 relational model：table、row、column、primary key、foreign key

**结论：**

Relational model 用 table 表达集合，用 row 表达记录，用 column 表达字段，用 primary key 识别一行，用 foreign key 表达跨表引用。

**本节解决的问题：**

Notebook 与 Note 是一对多关系：一个 notebook 可以有多条 notes；每条 note 必须属于一个有效 notebook。

**机制证据链：**

触发点是执行 `schema.sql`；SQL parser 读取 `CREATE TABLE`；PostgreSQL 创建 relation metadata；`notes.notebook_id` 引用 `notebooks.id`；插入 note 时 database engine 检查 referenced row；TypeScript 只能检查字段类型，不能证明数据库中真的有对应 notebook。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/01-sql-model/schema.sql</span>
  </div>

```sql
CREATE TABLE notebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(120) NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notebook_id uuid NOT NULL REFERENCES notebooks(id) ON DELETE CASCADE,
  title varchar(160) NOT NULL,
  body text NOT NULL DEFAULT '',
  status varchar(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'ARCHIVED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (notebook_id, title)
);

CREATE INDEX notes_notebook_created_at_idx ON notes(notebook_id, created_at DESC);
CREATE INDEX notes_status_created_at_idx ON notes(status, created_at DESC);
```
</div>

**机制解释：**

`notebooks.id` 是 parent row identity；`notes.notebook_id` 是 child row reference；`REFERENCES notebooks(id)` 把写入规则交给 PostgreSQL。`ON DELETE CASCADE` 表示 parent 删除时 database 可以删除 child rows。

**常见错误：**

只在 TypeScript 中写 `notebookId: string`。这只说明 JavaScript value 是 string，不说明这个 string 在数据库里对应有效 row。

**最终记忆模型：**

Table shape 属于数据库；TypeScript type 只是应用层静态描述。

<a id="section-9-3"></a>

### 9.3 DDL 与 DML：CREATE TABLE、INSERT、UPDATE、DELETE

**结论：**

DDL 改变数据库结构，DML 改变或读取数据内容。`CREATE TABLE` 属于 DDL；`INSERT`、`UPDATE`、`DELETE` 属于 DML。

**本节解决的问题：**

学习时要区分“定义数据能长什么样”和“对数据做了什么操作”，否则会把 migration、seed、业务请求混成同一种动作。

**机制证据链：**

触发点是 SQL command；DDL 更新 catalog metadata；DML 根据现有 table metadata 读写 rows；PostgreSQL 在 DML 执行时检查 DDL 定义出的 constraints；Node.js 只等待 driver promise resolve 或 reject。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: DDL and DML</span>
  </div>

```txt
CREATE TABLE notebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(120) NOT NULL UNIQUE
);

INSERT INTO notebooks (name)
VALUES ('SQL Basics');

UPDATE notebooks
SET name = 'SQL Persistence'
WHERE name = 'SQL Basics';

DELETE FROM notebooks
WHERE name = 'SQL Persistence';
```
</div>

**机制解释：**

第一条语句创建 table definition；后三条语句操作 rows。DML 不会改变 column definition，但会触发 `NOT NULL`、`UNIQUE`、foreign key 等规则。

**常见错误：**

把 `prisma migrate dev` 当成业务数据写入命令。它是 migration workflow，用来改变 schema，不是 controller 处理 HTTP request 的路径。

**最终记忆模型：**

DDL 定义结构；DML 改变数据。

<a id="section-9-4"></a>

### 9.4 PostgreSQL constraints：NOT NULL、UNIQUE、FOREIGN KEY、CHECK

**结论：**

Constraints 是 database-layer integrity rules。它们在 PostgreSQL 内部执行，不能被 TypeScript type 或 Zod schema 替代。

**本节解决的问题：**

HTTP request 可以绕过前端，service 也可能有 bug。最终数据完整性必须由数据库约束兜底。

**机制证据链：**

触发点是 `INSERT`；JavaScript value 被 driver 传给数据库；TypeScript 编译期已结束；Zod 只检查本次 request value；PostgreSQL 在写入 row 前检查 `NOT NULL`、`UNIQUE`、`FOREIGN KEY`、`CHECK`；违反规则时 query promise reject；controller 不能把 raw database error 直接返回给 client。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/01-sql-model/constraints-demo.sql</span>
  </div>

```txt
INSERT INTO notebooks (name) VALUES ('Learning');

INSERT INTO notebooks (name) VALUES (NULL);

INSERT INTO notebooks (name) VALUES ('Learning');

INSERT INTO notes (notebook_id, title, status)
VALUES ('00000000-0000-0000-0000-000000000000', 'Missing notebook', 'ACTIVE');
```
</div>

**机制解释：**

第二条违反 `NOT NULL`；第三条违反 `UNIQUE`; 第四条违反 foreign key。错误来自 PostgreSQL，不来自 TypeScript。

**常见错误：**

只在 Zod 中写 `z.string().min(1)`，却不在数据库中写 `NOT NULL` 或 `UNIQUE`。这违反了“外部输入验证不等于存储完整性”的边界。

**最终记忆模型：**

Zod 保护 request boundary；constraints 保护 data boundary。

<a id="section-9-5"></a>

### 9.5 PostgreSQL CRUD 与 RETURNING

**结论：**

PostgreSQL 的 `RETURNING` 可以让 `INSERT`、`UPDATE`、`DELETE` 在修改 row 的同时返回修改后的或受影响的 row，避免为了拿到结果再写一条额外 `SELECT`。

**本节解决的问题：**

创建资源后 API 通常要返回 `id`、timestamp 或最新状态。`RETURNING` 把修改与结果绑定在同一条数据库命令里。

**机制证据链：**

触发点是 DML command；PostgreSQL 执行 row modification；默认值如 `gen_random_uuid()` 和 `now()` 在数据库侧产生；`RETURNING` output list 根据实际受影响 row 计算结果；driver 收到 result rows；controller 返回 response DTO。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/01-sql-model/returning-crud.sql</span>
  </div>

```txt
INSERT INTO notebooks (name)
VALUES ('SQL Returning')
RETURNING id, name, created_at;

UPDATE notes
SET status = 'ARCHIVED', updated_at = now()
WHERE title = 'First persisted note'
RETURNING id, title, status, updated_at;

DELETE FROM notes
WHERE title = 'First persisted note'
RETURNING id, title;
```
</div>

**机制解释：**

`RETURNING` 返回的是修改语句实际作用到的 rows。没有匹配 row 时返回空 rows，而不是自动抛出 not found error。

**常见错误：**

写完 `INSERT` 后立刻用非唯一条件 `SELECT` 最新数据。违反的规则是：查询结果应该绑定到实际修改的 row，而不是依赖竞争条件下可能变化的筛选条件。

**最终记忆模型：**

需要“写入后的真实行”时优先想到 `RETURNING`。

<a id="section-9-6"></a>

### 9.6 SQL injection 与 parameterized query

**结论：**

Parameterized query 把 SQL text 和 untrusted values 分开，让 value 作为数据绑定，而不是作为 SQL syntax 执行。
本节的核心边界是：SQL text 与 values 分离。

**本节解决的问题：**

HTTP body、params、query 都是外部输入。把它们拼进 SQL 字符串会让攻击者改变 SQL 结构。

**机制证据链：**

触发点是 request value 或 CLI argument；JavaScript 读到 string；TypeScript 只能知道它是 string；Zod 可以检查长度和格式；node-postgres 把 query text 和 values array 分开发给 PostgreSQL；PostgreSQL 把 `$1` 当 value placeholder；错误形式是字符串拼接改变 SQL syntax。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/02-node-postgres/parameterized-query.ts</span>
  </div>

```ts
const result = await pool.query(
  "INSERT INTO notebooks (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET updated_at = now() RETURNING id, name",
  [notebookName]
);
```
</div>

**机制解释：**

SQL text 中只有 `$1` 这个 placeholder；`notebookName` 不参与 SQL parser 的 grammar。参数化只保护 values，不保护 table name 或 column name 等 identifiers。

**常见错误：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: unsafe SQL construction</span>
  </div>

```ts
const sql = `SELECT * FROM notebooks WHERE name = '${notebookName}'`;
```
</div>

这个错误违反了 SQL text 与 value binding 分离的规则。

**最终记忆模型：**

用户输入只能当 value 绑定，不能当 SQL syntax 拼接。

<a id="section-9-7"></a>

### 9.7 node-postgres pool、client、query result

**结论：**

`Pool` 负责复用连接；`pool.query()` 适合独立单条 query；query result 的 `rows` 与 `rowCount` 含义不同。

**本节解决的问题：**

数据库连接是外部资源，不应在每个操作中无边界创建和遗留。

**机制证据链：**

触发点是 TypeScript script；Node process 读取 `DATABASE_URL`；`new Pool()` 创建连接池对象；`pool.query()` 借用连接执行 SQL 并归还；PostgreSQL 返回 command tag 和 rows；`finally` 调用 `pool.end()` 关闭资源；错误形式是不关闭 pool 导致 process 持续存活。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/02-node-postgres/pg-pool-query.ts</span>
  </div>

```ts
const pool = new Pool({ connectionString });

try {
  const result = await pool.query("SELECT NOW() AS now");
  console.log({
    rowCount: result.rowCount,
    now: result.rows[0]?.now
  });
} finally {
  await pool.end();
}
```
</div>

**机制解释：**

`result.rows` 是返回行数组；`rowCount` 来自 PostgreSQL command tag，不应该被当作 `rows.length` 的替代品。

**常见错误：**

在 request handler 内部创建新的 `Pool`。违反的规则是：连接池应集中拥有生命周期，而不是跟每次 HTTP request 绑定。

**最终记忆模型：**

Pool 是资源所有者；query result 是数据库响应，不是 domain model。

<a id="section-9-8"></a>

### 9.8 transaction client boundary：为什么 transaction 必须使用同一个 client

**结论：**

node-postgres transaction 必须使用同一个 checked-out `client`。`BEGIN`、后续语句、`COMMIT`、`ROLLBACK` 需要落在同一个数据库 session 上。

**本节解决的问题：**

连接池会把不同 `pool.query()` 分配到不同连接。用多次 `pool.query()` 拼 transaction 会让语句不在同一个 transaction context 内。

**机制证据链：**

触发点是 `pool.connect()`；driver 从 pool 借出 client；`BEGIN` 在该 client 的 server session 上打开 transaction；后续 insert/update 复用同一 session；错误时 `ROLLBACK` 撤销该 transaction 的已执行变更；`client.release()` 归还连接；TypeScript 无法证明两条 SQL 使用同一物理连接。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/02-node-postgres/transaction-client-boundary.ts</span>
  </div>

```ts
const client = await pool.connect();

try {
  await client.query("BEGIN");
  await client.query("INSERT INTO notebooks (name) VALUES ($1)", ["Transaction Notebook"]);
  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
```
</div>

**机制解释：**

Transaction state 属于 database session；checked-out client 才能保证每条语句进入同一个 session。

**常见错误：**

`await pool.query("BEGIN"); await pool.query(...); await pool.query("COMMIT");` 违反 transaction client boundary。

**最终记忆模型：**

Transaction 绑定 client，不绑定 JavaScript 函数。

<a id="section-9-9"></a>

### 9.9 indexes、query shape 与 EXPLAIN 入门

**结论：**

Index 可以改善某些 read query path，但会增加存储和写入维护成本。`EXPLAIN` 展示 PostgreSQL planner 选择的 query plan。

**本节解决的问题：**

不是所有慢查询都靠“加索引”解决；索引必须匹配实际 `WHERE`、`ORDER BY`、join shape。

**机制证据链：**

触发点是 `EXPLAIN SELECT`；PostgreSQL planner 根据 table statistics、available indexes、query predicates 选择 plan；index 存在时 planner 可能选择 index scan；insert/update/delete 需要维护相关 index；Node.js driver 只接收文本 plan rows。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/01-sql-model/explain-index-demo.sql</span>
  </div>

```txt
CREATE INDEX IF NOT EXISTS notes_notebook_created_at_idx
ON notes(notebook_id, created_at DESC);

EXPLAIN
SELECT id, title, status
FROM notes
WHERE notebook_id = '00000000-0000-0000-0000-000000000000'
ORDER BY created_at DESC;
```
</div>

**机制解释：**

这个 index 的 leading column 是 `notebook_id`，可以服务按 notebook 过滤并按 `created_at DESC` 排序的 query shape。

**常见错误：**

给每个 column 都建 index。违反的规则是：index 是读路径优化结构，不是免费约束。

**最终记忆模型：**

先看 query shape，再判断 index。

<a id="section-9-10"></a>

### 9.10 ORM 是什么：Prisma 抽象了什么，没有抽象什么

**结论：**

Prisma 抽象了类型化 client、CRUD API、relation query 与 migration workflow，但没有消除数据库约束、连接生命周期、transaction 原子性、错误映射和 response DTO 边界。

**本节解决的问题：**

ORM 容易让学习者以为“不会 SQL 也能做数据库”。真实工程中仍然需要理解表、关系、索引、约束和事务。

**机制证据链：**

触发点是 `prisma.note.create()`；JavaScript 调用 generated client method；TypeScript 检查参数 shape；Prisma runtime 生成数据库 query；PostgreSQL 执行 constraints 和 transaction behavior；Prisma 把数据库错误封装成 client error；service 必须把它映射为 domain error。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: ORM boundary</span>
  </div>

```ts
const note = await prisma.note.create({
  data: {
    notebookId,
    title,
    body
  }
});
```
</div>

**机制解释：**

`create()` 是 ORM API；foreign key 是否有效仍由 PostgreSQL 检查。Prisma model 也不是 response DTO，返回前仍要映射。

**常见错误：**

在 controller 中直接返回 Prisma record。违反的规则是：persistence model 不等于 public API contract。

**最终记忆模型：**

ORM 简化访问，不取消边界。

<a id="section-9-11"></a>

### 9.11 Prisma schema：datasource、generator、model、relation、index

**结论：**

Prisma schema 是 Prisma CLI 和 Prisma Client generation 的配置源，包含 datasource、generator 和 data model。

**本节解决的问题：**

应用需要一个单一位置描述数据库 provider、client 输出位置、models、relations、indexes 与 constraints。

**机制证据链：**

触发点是 `prisma generate` 或 migration command；Prisma CLI 读取 `schema.prisma`；datasource 在 schema 中声明 PostgreSQL provider；`prisma.config.ts` 提供 datasource URL；generator 决定生成 client；model/relation/index 影响 generated TypeScript API 和 migration SQL；Node.js runtime 运行的是生成后的 client code，而不是 `.prisma` 文件本身。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/03-prisma-basics/schema.prisma</span>
  </div>

```txt
generator client {
  provider = "prisma-client"
  output   = "./generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```
</div>

**机制解释：**

在 Prisma ORM v7 中，`schema.prisma` 的 `datasource` 声明数据库 provider；连接 URL 放在 `prisma.config.ts` 的 `datasource.url` 中。`generator` 属于 tooling behavior；`model` 属于 persistence schema description；`@@index` 和 `@@unique` 会影响数据库结构。

**常见错误：**

改完 schema 后不运行 `prisma generate`。违反的规则是：generated client 不是自动随着文本文件在运行时变化。

**最终记忆模型：**

Schema 是源；Client 是生成物。

<a id="section-9-12"></a>

### 9.12 Prisma Migrate：dev、reset、deploy 的边界

**结论：**

`prisma migrate dev` 面向 development；`prisma migrate reset` 会重置数据库；`prisma migrate deploy` 用于 production/staging 应用 pending migrations。

**本节解决的问题：**

数据库结构变更不是普通代码热更新。不同环境需要不同 migration command。

**机制证据链：**

触发点是 npm script；npm 运行 Prisma CLI；CLI 读取 schema 和 migration history；development command 可以创建新 migration；deploy command 应用已有 pending migration；reset command 删除并重建数据；PostgreSQL 执行 DDL；TypeScript 不参与数据库结构变更。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/package.json</span>
  </div>

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:migrate:reset": "prisma migrate reset"
  }
}
```
</div>

**机制解释：**

`dev` 是开发过程中的 schema 演进命令；`deploy` 不负责生成新 migration；`reset` 是 destructive workflow。

**常见错误：**

把 `migrate reset` 放进普通启动脚本。违反的规则是：启动服务不应该隐式删除数据库数据。

**最终记忆模型：**

dev 创建，deploy 应用，reset 重建。

<a id="section-9-13"></a>

### 9.13 Prisma Client CRUD：create、findMany、findUnique、update、delete

**结论：**

Prisma Client CRUD 是类型化 ORM 操作，它会生成数据库 query，但仍受 PostgreSQL constraints 约束。

**本节解决的问题：**

把 repository 从 SQL string 或 memory map 迁移到 Prisma method calls。

**机制证据链：**

触发点是 repository method；TypeScript 检查 `data`、`where`、`orderBy` shape；Prisma runtime 发送 query；PostgreSQL 执行 row operation；Prisma 返回 record 或抛错；repository 映射为 domain model；service 决定 result。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.repository.ts</span>
  </div>

```ts
const notebook = await prisma.notebook.create({
  data: {
    name: input.name
  }
});
```
</div>

**机制解释：**

`create` 会写 row；`findMany` 会查询集合；`findUnique` 依赖 unique 条件；`update` 和 `delete` 没找到目标时可能产生 Prisma known request error。

**常见错误：**

用 `findUnique` 查询非 unique column。违反的规则是：unique lookup 需要 schema 中的 unique identity。

**最终记忆模型：**

CRUD method 是 typed gateway；database 仍是执行者。

<a id="section-9-14"></a>

### 9.14 Prisma filtering、sorting、pagination

**结论：**

Filtering 决定 `where`，sorting 决定 `orderBy`，pagination 决定 `take` 与 `skip`。这些 API 改变的是 query shape。

**本节解决的问题：**

列表接口不能无限返回所有 rows，也不能在没有排序规则时做不稳定分页。

**机制证据链：**

触发点是 query string；Express 把 URL query 解析为 strings；Zod coercion 把 public `limit` / `offset` 转成 number，再 transform 为 repository 使用的 `take` / `skip`；TypeScript 接收 `ListNotesQuery`; repository 把 `status`、`take`、`skip`、`order` 交给 Prisma；PostgreSQL 根据 filter、order、index 产生 query plan；HTTP response 返回 page data。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.repository.ts</span>
  </div>

```ts
const notes = await prisma.note.findMany({
  where: {
    notebookId,
    status: query.status
  },
  orderBy: { createdAt: query.order },
  take: query.take,
  skip: query.skip
});
```
</div>

**机制解释：**

`query.status` 为 `undefined` 时 Prisma 不需要添加该 filter；`take` 和 `skip` 对应 offset pagination。排序字段应与业务稳定性和索引设计一起考虑。

**常见错误：**

没有 `orderBy` 就使用 `skip`。违反的规则是：分页需要稳定顺序，否则下一页可能重复或遗漏。

**最终记忆模型：**

List endpoint = filter + order + limit。

<a id="section-9-15"></a>

### 9.15 select / include 与 response shaping

**结论：**

`select` 决定返回哪些字段；`include` 决定是否加载 relation。它们属于 data loading 与 response shaping 的边界，不等于 public DTO 设计本身。

**本节解决的问题：**

API 不应该把数据库 record 的所有字段直接暴露给 client。

**机制证据链：**

触发点是 repository query；TypeScript 根据 `select` 或 `include` 推断返回类型；Prisma 生成对应 query；PostgreSQL 返回字段和 relation rows；repository/controller 再映射为 response DTO；错误形式是把 persistence shape 直接作为 API contract。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/03-prisma-basics/prisma-select-include.ts</span>
  </div>

```ts
const selected = await prisma.notebook.findMany({
  select: {
    id: true,
    name: true
  }
});

const included = await prisma.notebook.findMany({
  include: {
    notes: true
  }
});
```
</div>

**机制解释：**

`select` 缩小字段；`include` 扩展 relation。二者影响数据库读出的 shape，但公共 response 仍应该由 DTO 明确声明。

**常见错误：**

把 `include: { notes: true }` 当成 API 设计完成。违反的规则是：relation loading 不是 response contract。

**最终记忆模型：**

select/include 控制读取 shape；DTO 控制公开 shape。

<a id="section-9-16"></a>

### 9.16 repository replacement：memory repository 到 Prisma repository

**结论：**

Repository contract 让 service 不依赖具体存储实现。memory repository 和 Prisma repository 可以实现同一组行为，但它们的资源边界不同。

**本节解决的问题：**

升级 Chapter 04 时，不应该让 service/controller 到处散落 Prisma 调用。

**机制证据链：**

触发点是 service 调用 `repository.create()`；TypeScript 检查 repository interface；memory implementation 写 `Map`; Prisma implementation 调用 generated client；PostgreSQL 执行 constraints；返回值被映射为同一个 domain model；测试可以针对 contract 验证共同行为。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/05-database-persistence/04-repository-replacement/repository-contract.ts</span>
  </div>

```ts
export type NotesRepository = {
  create(record: CreateNoteRecord): Promise<Note>;
  findById(id: string): Promise<Note | undefined>;
  listByNotebook(notebookId: string): Promise<Note[]>;
  delete(id: string): Promise<boolean>;
};
```
</div>

**机制解释：**

Interface 是 TypeScript compile-time boundary；真正存储行为在 implementation 中发生。Service 只依赖 contract，所以替换实现不会改变 HTTP layer。

**常见错误：**

在 service 中同时使用 memory map 和 Prisma。违反的规则是：一个边界应有一个明确的数据所有者。

**最终记忆模型：**

Contract 稳定业务；implementation 改变存储。

<a id="section-9-17"></a>

### 9.17 database error mapping：Prisma error 到 domain / HTTP error

**结论：**

数据库错误要先映射为 domain error，再映射为 HTTP error。不要把 raw database error message 返回给 client。

**本节解决的问题：**

Unique violation、missing record、foreign key violation 是业务上可解释的失败；未知数据库错误则应统一隐藏细节。

**机制证据链：**

触发点是 Prisma query reject；JavaScript catch 得到 `unknown`; TypeScript 要求先 narrow；Prisma known request error 提供 code；service 映射成 domain error；controller 映射成 `HttpError`; error middleware 输出 public response；日志可记录内部信号，但 client 不能看到 raw SQL 或 connection detail。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/db/prisma-errors.ts</span>
  </div>

```ts
if (error instanceof Prisma.PrismaClientKnownRequestError) {
  if (error.code === "P2002") {
    return { code: "UNIQUE_CONSTRAINT" };
  }
}
```
</div>

**机制解释：**

`P2002` 这种 code 是 Prisma error reference 中的稳定诊断入口；HTTP response 使用应用定义的 public code，例如 `NOTEBOOK_NAME_CONFLICT`。

**常见错误：**

`response.status(500).send(String(error))` 会泄漏内部实现。违反的规则是：public API error shape 必须和 database internals 解耦。

**最终记忆模型：**

Database error 是内部证据；HTTP error 是公共契约。

<a id="section-9-18"></a>

### 9.18 seed data 与 test database reset

**结论：**

Seed data 用于准备可重复的初始数据；test reset 用于隔离测试。Reset 必须有安全 guard。

**本节解决的问题：**

持久化测试会留下 rows。没有清理策略，测试之间会互相污染。

**机制证据链：**

触发点是 `npm run seed` 或 test `beforeEach`; Node process 读取 `NODE_ENV` 与 `DATABASE_URL`; Prisma Client 连接数据库；seed 用 `upsert` 避免重复；reset 在 `NODE_ENV=test` 下删除 child rows 再删除 parent rows；PostgreSQL foreign key 决定删除顺序；测试断言观察干净数据库状态。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/tests/helpers/database.ts</span>
  </div>

```ts
export async function resetTestDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Refusing to reset database outside NODE_ENV=test");
  }

  await prisma.$transaction([
    prisma.note.deleteMany(),
    prisma.notebook.deleteMany()
  ]);
}
```
</div>

**机制解释：**

`notes` 是 child table，`notebooks` 是 parent table。先删 child 可以避免 foreign key violation。`NODE_ENV=test` 是 destructive operation 的应用层 guard。

**常见错误：**

在 reset helper 中无条件 `deleteMany()`。违反的规则是：破坏性测试工具不能对 development 或 production 数据库开放。

**最终记忆模型：**

Seed 可重复；reset 要带保险。

<a id="section-9-19"></a>

### 9.19 integration tests with persisted data

**结论：**

Persistence integration test 要同时观察 HTTP response 和数据库 row state。只断言 response 不足以证明数据持久化。

**本节解决的问题：**

一个 controller 可能返回成功，但 repository 没写入数据库；一个 repository 可能写入数据库，但 response DTO 错误。

**机制证据链：**

触发点是 Node test runner 执行 test file；Supertest 直接调用 Express app；request 进入 middleware pipeline；repository 写 PostgreSQL；test 再用 Prisma 读取数据库；`node:assert/strict` 比较 response 与 stored row；`after` disconnect Prisma。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/tests/persistent-notes.integration.test.ts</span>
  </div>

```ts
const response = await request(app)
  .post("/notebooks")
  .send({ name: "Work" })
  .expect(201);

const stored = await prisma.notebook.findUnique({
  where: { id: response.body.data.id }
});

assert.equal(stored?.name, "Work");
```
</div>

**机制解释：**

Supertest 证明 HTTP pipeline；Prisma read-back 证明 database state。两者结合才是持久化边界测试。

**常见错误：**

测试只 mock repository。违反的规则是：mock 测试不能证明 migration、constraint、adapter、database lifecycle。

**最终记忆模型：**

Integration test 需要穿过边界并读回证据。

<a id="section-9-20"></a>

### 9.20 connection lifecycle：PrismaClient、process shutdown、test cleanup

**结论：**

`PrismaClient` 应集中创建并复用；process shutdown 和 test cleanup 要显式断开数据库资源。

**本节解决的问题：**

在每个 request handler 中创建 `PrismaClient` 会造成连接膨胀；测试结束不 disconnect 会留下未关闭资源。

**机制证据链：**

触发点是 module import；Node.js ESM loader evaluates `src/db/prisma.ts`; 单例 `prisma` 被多个 repository import 复用；HTTP request 不创建新 client；`SIGINT`/`SIGTERM` 触发 shutdown handler；server close 后调用 `$disconnect`; test `after` 也断开资源；错误形式是 process 因活动连接无法退出。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/db/prisma.ts</span>
  </div>

```ts
const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
```
</div>

**机制解释：**

ESM module caching 让多个 import 共享同一个 exported object。资源关闭不应该散落在 controller 中，而应该跟 process lifecycle 和 test lifecycle 对齐。

**常见错误：**

在 route handler 中 `new PrismaClient()`。违反的规则是：connection owner 应该集中，request handler 不拥有数据库连接池生命周期。

**最终记忆模型：**

Client 单例负责连接入口；shutdown/test cleanup 负责出口。

<a id="section-9-21"></a>

### 9.21 Chapter integration: persistent-notes-api

**结论：**

`persistent-notes-api` 把本章机制连接成一条完整路径：HTTP input → validation → controller → service → repository → Prisma → PostgreSQL → DTO → unified response。

**本节解决的问题：**

单独学习 SQL、driver、ORM 不足以形成后端工程能力；最终项目要求你把边界组合起来。

**机制证据链：**

触发点是 `POST /notebooks/:notebookId/notes`; Express Router 匹配 route；Zod 校验 params/body；controller 调 service；service 判断 notebook 引用；repository 调 Prisma；PostgreSQL 检查 foreign key 和 unique constraint；Prisma 返回 record；controller 映射 DTO；response helper 输出 `{ ok: true, data }`; 错误时 error middleware 输出 `{ ok: false, error }`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/app.ts</span>
  </div>

```ts
app.use(requestIdMiddleware);
app.use(express.json({ limit: "32kb" }));
app.use("/notebooks", notebooksRouter);
app.use("/notes", notesRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
```
</div>

**机制解释：**

Middleware order 是 HTTP lifecycle 的骨架：先标记 request id，再解析 JSON，再进入 route，最后由 not-found 和 error middleware 处理未完成路径。

**常见错误：**

把 database query 写在 controller 中。违反的规则是：controller 只适配 HTTP，repository 才拥有 persistence detail。

**最终记忆模型：**

API 的每一层都只拥有自己的边界。

## 10. API 与规则索引

| Rule / API | Responsible layer | 本章用法 | 常见误用 |
| --- | --- | --- | --- |
| `CREATE TABLE` | PostgreSQL DDL | 定义 `notebooks`、`notes` | 当作业务写入命令 |
| `NOT NULL` / `UNIQUE` / `FOREIGN KEY` / `CHECK` | PostgreSQL constraints | 保护数据完整性 | 用 TypeScript/Zod 替代 |
| `RETURNING` | PostgreSQL DML | 返回受影响 rows | 写入后用弱条件二次查询 |
| `$1`, `$2` | node-postgres query values | 参数化 values | 参数化 table/column identifiers |
| `Pool` | node-postgres resource owner | 独立 query 和 client checkout | 每个 request 创建 pool |
| `client.query("BEGIN")` | node-postgres transaction | 同一 client 上打开 transaction | 用多次 `pool.query()` 拼接 |
| `generator client` | Prisma tooling | 生成 Prisma Client | 改 schema 后不 generate |
| `prisma migrate dev` | Prisma migration development | 创建和应用开发 migration | 用于生产启动 |
| `prisma migrate deploy` | Prisma production/staging migration | 应用 pending migrations | 生成新 migration |
| `prisma migrate reset` | Prisma destructive reset | development/test 重建数据库 | 放入普通启动脚本 |
| `prisma.$transaction([])` | Prisma transaction | 独立操作原子执行 | 期望它隐藏所有并发设计 |
| `select` / `include` | Prisma read shape | 控制字段与 relation loading | 替代 DTO |
| `express.json()` | Express middleware | 解析 JSON body | 相信 `req.body` 已可信 |
| `z.safeParse()` | Zod runtime validation | 校验 body/params/query/env | 替代数据库 constraints |
| `node:test` / `node:assert/strict` | Node test runner | integration test execution/assertion | 当作数据库模拟器 |

## 11. 常见错误对照表

| Symptom | Violated Rule | Mechanism Cause | Evidence | Correction |
| --- | --- | --- | --- | --- |
| 重启后数据消失 | process memory 不是 persistence | 数据只存在 V8 heap | 重启后 `Map` 为空 | 使用 PostgreSQL repository |
| duplicate name 进入数据库 | 缺少 `UNIQUE` constraint | 应用层检查不可靠 | 相同 name 多行 | 在数据库和 Prisma schema 中声明 unique |
| transaction 部分写入 | transaction 不在同一 client | 多个 pool query 可能走不同 session | 第二条失败但第一条已提交 | `pool.connect()` 后复用 client |
| API 泄漏数据库错误 | raw error 不应公开 | error middleware 直接输出 `String(error)` | response 包含 SQL/internal message | 映射 public error code |
| 测试互相污染 | test data 未 reset | 持久化 rows 留在数据库 | 后一测试受前一测试影响 | `beforeEach` reset 并加 `NODE_ENV=test` guard |
| 分页结果不稳定 | pagination 缺少排序 | database 无稳定 order guarantee | 翻页重复或遗漏 | 添加业务稳定 `orderBy` |
| process 不退出 | 连接资源未关闭 | pool/client 仍保持 socket | test runner 挂起 | `finally` 或 `after` 调用 disconnect |

## 12. 调试与验证方法

定位数据库问题时按负责层拆分：

1. Request boundary：检查 URL、method、headers、body 是否进入正确 route。
2. Validation boundary：检查 Zod schema 是否把 raw string 转成 expected type。
3. Service boundary：检查 service result 是 domain success 还是 domain error。
4. Repository boundary：检查 Prisma query 的 `where`、`data`、`select`、`include`。
5. Database boundary：检查 constraint、index、transaction、row state。
6. Lifecycle boundary：检查 PrismaClient、Pool、client 是否关闭。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
NODE_ENV=test npm test
```
</div>

Windows PowerShell 使用 `$env:` 设置当前命令前的环境变量。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: Windows PowerShell</span>
  </div>

```powershell
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
$env:NODE_ENV = "test"; npm test
```
</div>

这组命令用于学习如何观察 schema generation、migration、seed 与 persistence tests，不代表所有环境都已经有可用数据库。

## 13. 分项练习说明

- `01-sql-model`：只看数据库层，重点观察 table、constraint、`RETURNING`、`EXPLAIN`。
- `02-node-postgres`：只看 driver 层，重点观察 pool、parameter values、checked-out client、row mapper。
- `03-prisma-basics`：只看 ORM 层，重点观察 schema、generated client、CRUD、select/include、transaction、error mapping。
- `04-repository-replacement`：连接 Chapter 04 的 repository contract，观察 memory implementation 与 Prisma implementation 的替换点。
- `05-test-data`：观察 seed 与 reset 的安全边界，尤其是 destructive helper 的 `NODE_ENV=test` guard。

## 14. 最终迷你项目

最终小项目只用于整合本章机制，不替代前面的分节教学。你应该先理解每个 `9.x` 小节，再把它们组合成 `persistent-notes-api`。

### 14.1 项目目标

`persistent-notes-api` 提供 notebooks 与 notes 的 REST API。它保留 Chapter 04 的 TypeScript backend boundaries，并把 repository 实现替换为 Prisma + PostgreSQL。项目刻意不加入 authentication、Redis、Docker、NestJS、Fastify 或 deployment，以免掩盖本章的数据库边界。

### 14.2 最终迷你项目结构

| Path | Responsibility | Boundary |
| --- | --- | --- |
| `package.json` | npm scripts 与依赖声明 | tooling |
| `tsconfig.json` | TypeScript strict / NodeNext 配置 | type system / tooling |
| `.env.example` | 安全环境变量模板 | runtime configuration |
| `prisma.config.ts` | Prisma CLI 配置 | migration tooling |
| `prisma/schema.prisma` | PostgreSQL datasource 与 data model | ORM / database schema |
| `prisma/seed.ts` | 可重复 seed workflow | database initialization |
| `src/app.ts` | Express app composition | HTTP framework |
| `src/server.ts` | listen lifecycle 与 shutdown | process lifecycle |
| `src/config/env.ts` | Zod env parsing | runtime validation |
| `src/db/prisma.ts` | centralized PrismaClient | connection lifecycle |
| `src/db/prisma-errors.ts` | Prisma error mapping | database error boundary |
| `src/modules/notebooks/*` | notebook route/controller/service/repository/schema/types | feature module |
| `src/modules/notes/*` | note route/controller/service/repository/schema/types | feature module |
| `src/shared/*` | shared errors, middleware, validation, logging, response helper | cross-cutting boundary |
| `openapi/openapi.yaml` | public API contract | contract |
| `tests/*` | persistence integration tests | testing boundary |

### 14.3 完整项目代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/package.json</span>
  </div>

```json
{
  "name": "persistent-notes-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "typecheck": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:migrate:reset": "prisma migrate reset",
    "seed": "tsx prisma/seed.ts",
    "test": "node --import tsx --test tests/persistent-notes.integration.test.ts"
  },
  "dependencies": {
    "@prisma/adapter-pg": "^7.0.0",
    "@prisma/client": "^7.0.0",
    "express": "^5.2.1",
    "pg": "^8.13.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^26.0.0",
    "@types/pg": "^8.11.11",
    "@types/supertest": "^7.0.0",
    "dotenv": "^17.0.0",
    "prisma": "^7.0.0",
    "supertest": "^7.2.2",
    "tsx": "^4.20.0",
    "typescript": "^7.0.0"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "engines": {
    "node": ">=22"
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/tsconfig.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "types": ["node"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "tests/**/*.ts", "prisma/**/*.ts", "prisma.config.ts"]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/.env.example</span>
  </div>

```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/persistent_notes_api?schema=public"
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/prisma.config.ts</span>
  </div>

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL")
  }
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/prisma/schema.prisma</span>
  </div>

```txt
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum NoteStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

model Notebook {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @unique @db.VarChar(120)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  notes     Note[]
}

model Note {
  id         String     @id @default(uuid()) @db.Uuid
  notebookId String     @db.Uuid
  title      String     @db.VarChar(160)
  body       String     @default("")
  status     NoteStatus @default(ACTIVE)
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  notebook   Notebook   @relation(fields: [notebookId], references: [id], onDelete: Cascade)

  @@index([notebookId])
  @@index([status, createdAt])
  @@unique([notebookId, title])
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/prisma/seed.ts</span>
  </div>

```ts
import { prisma } from "../src/db/prisma.js";

async function seed(): Promise<void> {
  const notebook = await prisma.notebook.upsert({
    where: { name: "Seed Notebook" },
    update: {},
    create: { name: "Seed Notebook" }
  });

  await prisma.note.upsert({
    where: {
      notebookId_title: {
        notebookId: notebook.id,
        title: "Seed Note"
      }
    },
    update: {
      body: "Seed data can be re-applied without duplicates."
    },
    create: {
      notebookId: notebook.id,
      title: "Seed Note",
      body: "Seed data can be re-applied without duplicates."
    }
  });
}

try {
  await seed();
} finally {
  await prisma.$disconnect();
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/app.ts</span>
  </div>

```ts
import express from "express";
import { notebooksRouter } from "./modules/notebooks/notebooks.routes.js";
import { notesRouter } from "./modules/notes/notes.routes.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { requestIdMiddleware } from "./shared/middleware/request-id.js";
import { sendResponse } from "./shared/responses/send-response.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestIdMiddleware);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  sendResponse(response, 200, { status: "ok" });
});

app.use("/notebooks", notebooksRouter);
app.use("/notes", notesRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/server.ts</span>
  </div>

```ts
import { app } from "./app.js";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("server started", {
    port: config.PORT,
    nodeEnv: config.NODE_ENV
  });
});

async function closeServer(signal: NodeJS.Signals): Promise<void> {
  logger.info("server shutdown requested", { signal });

  server.close(async (error) => {
    if (error) {
      logger.error("server shutdown failed", { signal }, error);
      process.exitCode = 1;
    }

    await disconnectPrisma();
    logger.info("server stopped", { signal });
  });
}

process.once("SIGINT", (signal) => {
  void closeServer(signal);
});

process.once("SIGTERM", (signal) => {
  void closeServer(signal);
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/config/env.ts</span>
  </div>

```ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  DATABASE_URL: z.string().url()
});

export type AppConfig = z.infer<typeof envSchema>;

export function parseEnv(rawEnv: NodeJS.ProcessEnv = process.env): AppConfig {
  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    throw new Error("Invalid environment configuration");
  }

  return result.data;
}

export const config = parseEnv();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/db/prisma.ts</span>
  </div>

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { config } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/db/prisma-errors.ts</span>
  </div>

```ts
import { Prisma } from "../generated/prisma/client.js";

export type DatabaseErrorCode =
  | "UNIQUE_CONSTRAINT"
  | "MISSING_RECORD"
  | "RELATION_CONSTRAINT"
  | "DATABASE_FAILURE";

export type DatabaseError = {
  code: DatabaseErrorCode;
};

export function mapPrismaError(error: unknown): DatabaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { code: "UNIQUE_CONSTRAINT" };
    }

    if (error.code === "P2025") {
      return { code: "MISSING_RECORD" };
    }

    if (error.code === "P2003") {
      return { code: "RELATION_CONSTRAINT" };
    }
  }

  return { code: "DATABASE_FAILURE" };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNotebook, deleteNotebook, getNotebook, listNotebooks, updateNotebook } from "./notebooks.controller.js";
import { createNotebookNote, listNotebookNotes } from "../notes/notes.controller.js";
import { createNotebookSchema, notebookIdParamsSchema, updateNotebookSchema } from "./notebooks.schema.js";
import { createNoteSchema, listNotesQuerySchema } from "../notes/notes.schema.js";

export const notebooksRouter = Router();

notebooksRouter.get("/", listNotebooks);
notebooksRouter.post("/", validateRequest("body", createNotebookSchema), createNotebook);
notebooksRouter.get("/:notebookId", validateRequest("params", notebookIdParamsSchema), getNotebook);
notebooksRouter.patch(
  "/:notebookId",
  validateRequest("params", notebookIdParamsSchema),
  validateRequest("body", updateNotebookSchema),
  updateNotebook
);
notebooksRouter.delete("/:notebookId", validateRequest("params", notebookIdParamsSchema), deleteNotebook);
notebooksRouter.get(
  "/:notebookId/notes",
  validateRequest("params", notebookIdParamsSchema),
  validateRequest("query", listNotesQuerySchema),
  listNotebookNotes
);
notebooksRouter.post(
  "/:notebookId/notes",
  validateRequest("params", notebookIdParamsSchema),
  validateRequest("body", createNoteSchema),
  createNotebookNote
);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../../shared/errors/http-error.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { getValidated } from "../../shared/validation/validate-request.js";
import { notebooksService } from "./notebooks.service.js";
import type {
  CreateNotebookInput,
  Notebook,
  NotebookDomainError,
  NotebookIdParams,
  NotebookResponseDto,
  UpdateNotebookInput
} from "./notebooks.types.js";

function toNotebookResponseDto(notebook: Notebook): NotebookResponseDto {
  return {
    id: notebook.id,
    name: notebook.name,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString()
  };
}

function mapNotebookErrorToHttpError(error: NotebookDomainError): HttpError {
  if (error.code === "NOTEBOOK_NOT_FOUND") {
    return new HttpError(404, error.code, "Notebook was not found");
  }

  if (error.code === "NOTEBOOK_NAME_CONFLICT") {
    return new HttpError(409, error.code, "Notebook name already exists");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected database failure");
}

export const listNotebooks: RequestHandler = async (_request, response) => {
  const result = await notebooksService.listNotebooks();

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data.map(toNotebookResponseDto));
};

export const createNotebook: RequestHandler = async (_request, response) => {
  const input = getValidated<CreateNotebookInput>(response, "body");
  const result = await notebooksService.createNotebook(input);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNotebookResponseDto(result.data));
};

export const getNotebook: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const result = await notebooksService.getNotebook(params.notebookId);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNotebookResponseDto(result.data));
};

export const updateNotebook: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const input = getValidated<UpdateNotebookInput>(response, "body");
  const result = await notebooksService.updateNotebook(params.notebookId, input);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNotebookResponseDto(result.data));
};

export const deleteNotebook: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const result = await notebooksService.deleteNotebook(params.notebookId);

  if (!result.ok) {
    throw mapNotebookErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data);
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.service.ts</span>
  </div>

```ts
import { mapPrismaError } from "../../db/prisma-errors.js";
import { notebooksRepository } from "./notebooks.repository.js";
import type {
  CreateNotebookInput,
  Notebook,
  NotebookDomainError,
  NotebooksRepository,
  ServiceResult,
  UpdateNotebookInput
} from "./notebooks.types.js";

function notFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTEBOOK_NOT_FOUND",
      message: `Notebook ${id} was not found`
    }
  };
}

function toNotebookError(error: unknown): NotebookDomainError {
  const databaseError = mapPrismaError(error);

  if (databaseError.code === "UNIQUE_CONSTRAINT") {
    return { code: "NOTEBOOK_NAME_CONFLICT", message: "Notebook name already exists" };
  }

  if (databaseError.code === "MISSING_RECORD") {
    return { code: "NOTEBOOK_NOT_FOUND", message: "Notebook was not found" };
  }

  return { code: "DATABASE_FAILURE", message: "Database operation failed" };
}

export function createNotebooksService(repository: NotebooksRepository) {
  return {
    async listNotebooks(): Promise<ServiceResult<Notebook[]>> {
      try {
        return { ok: true, data: await repository.list() };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async createNotebook(input: CreateNotebookInput): Promise<ServiceResult<Notebook>> {
      try {
        return { ok: true, data: await repository.create(input) };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async getNotebook(id: string): Promise<ServiceResult<Notebook>> {
      try {
        const notebook = await repository.findById(id);
        return notebook ? { ok: true, data: notebook } : notFound(id);
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async updateNotebook(id: string, input: UpdateNotebookInput): Promise<ServiceResult<Notebook>> {
      try {
        return { ok: true, data: await repository.update(id, input) };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    },

    async deleteNotebook(id: string): Promise<ServiceResult<{ id: string }>> {
      try {
        const deleted = await repository.delete(id);
        return { ok: true, data: { id: deleted.id } };
      } catch (error) {
        return { ok: false, error: toNotebookError(error) };
      }
    }
  };
}

export const notebooksService = createNotebooksService(notebooksRepository);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { Notebook as PrismaNotebook } from "../../generated/prisma/client.js";
import type { CreateNotebookInput, Notebook, NotebooksRepository, UpdateNotebookInput } from "./notebooks.types.js";

function toNotebook(record: PrismaNotebook): Notebook {
  return {
    id: record.id,
    name: record.name,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

export class PrismaNotebooksRepository implements NotebooksRepository {
  async list(): Promise<Notebook[]> {
    const notebooks = await prisma.notebook.findMany({
      orderBy: { name: "asc" }
    });

    return notebooks.map(toNotebook);
  }

  async create(input: CreateNotebookInput): Promise<Notebook> {
    const notebook = await prisma.notebook.create({
      data: {
        name: input.name
      }
    });

    return toNotebook(notebook);
  }

  async findById(id: string): Promise<Notebook | undefined> {
    const notebook = await prisma.notebook.findUnique({
      where: { id }
    });

    return notebook ? toNotebook(notebook) : undefined;
  }

  async update(id: string, input: UpdateNotebookInput): Promise<Notebook> {
    const notebook = await prisma.notebook.update({
      where: { id },
      data: input
    });

    return toNotebook(notebook);
  }

  async delete(id: string): Promise<Notebook> {
    const notebook = await prisma.notebook.delete({
      where: { id }
    });

    return toNotebook(notebook);
  }
}

export const notebooksRepository = new PrismaNotebooksRepository();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const notebookIdParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const createNotebookSchema = z.object({
  name: z.string().trim().min(1).max(120)
});

export const updateNotebookSchema = z.object({
  name: z.string().trim().min(1).max(120).optional()
}).refine((value) => value.name !== undefined, {
  message: "At least one field is required"
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notebooks/notebooks.types.ts</span>
  </div>

```ts
import type { NoteResponseDto } from "../notes/notes.types.js";

export type Notebook = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NotebookResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type NotebookWithNotesResponseDto = NotebookResponseDto & {
  notes: NoteResponseDto[];
};

export type CreateNotebookInput = {
  name: string;
};

export type UpdateNotebookInput = {
  name?: string;
};

export type NotebookIdParams = {
  notebookId: string;
};

export type NotebooksRepository = {
  list(): Promise<Notebook[]>;
  create(input: CreateNotebookInput): Promise<Notebook>;
  findById(id: string): Promise<Notebook | undefined>;
  update(id: string, input: UpdateNotebookInput): Promise<Notebook>;
  delete(id: string): Promise<Notebook>;
};

export type NotebookDomainErrorCode =
  | "NOTEBOOK_NOT_FOUND"
  | "NOTEBOOK_NAME_CONFLICT"
  | "DATABASE_FAILURE";

export type NotebookDomainError = {
  code: NotebookDomainErrorCode;
  message: string;
};

export type ServiceResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: NotebookDomainError };
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { deleteNote, getNote, updateNote } from "./notes.controller.js";
import { noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRouter = Router();

notesRouter.get("/:noteId", validateRequest("params", noteIdParamsSchema), getNote);
notesRouter.patch(
  "/:noteId",
  validateRequest("params", noteIdParamsSchema),
  validateRequest("body", updateNoteSchema),
  updateNote
);
notesRouter.delete("/:noteId", validateRequest("params", noteIdParamsSchema), deleteNote);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../../shared/errors/http-error.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { getValidated } from "../../shared/validation/validate-request.js";
import type { NotebookIdParams } from "../notebooks/notebooks.types.js";
import { notesService } from "./notes.service.js";
import type {
  CreateNoteInput,
  ListNotesQuery,
  Note,
  NoteDomainError,
  NoteIdParams,
  NoteResponseDto,
  UpdateNoteInput
} from "./notes.types.js";

function toNoteResponseDto(note: Note): NoteResponseDto {
  return {
    id: note.id,
    notebookId: note.notebookId,
    title: note.title,
    body: note.body,
    status: note.status,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  };
}

function mapNoteErrorToHttpError(error: NoteDomainError): HttpError {
  if (error.code === "NOTEBOOK_NOT_FOUND" || error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Requested resource was not found");
  }

  if (error.code === "NOTE_TITLE_CONFLICT") {
    return new HttpError(409, error.code, "Note title already exists in this notebook");
  }

  if (error.code === "INVALID_REFERENCE") {
    return new HttpError(400, error.code, "Referenced resource was invalid");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected database failure");
}

export const listNotebookNotes: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const query = getValidated<ListNotesQuery>(response, "query");
  const result = await notesService.listNotebookNotes(params.notebookId, query);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data.map(toNoteResponseDto));
};

export const createNotebookNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const input = getValidated<CreateNoteInput>(response, "body");
  const result = await notesService.createNotebookNote(params.notebookId, input);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNoteResponseDto(result.data));
};

export const getNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.getNote(params.noteId);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const updateNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const input = getValidated<UpdateNoteInput>(response, "body");
  const result = await notesService.updateNote(params.noteId, input);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const deleteNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.deleteNote(params.noteId);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data);
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.service.ts</span>
  </div>

```ts
import { mapPrismaError } from "../../db/prisma-errors.js";
import { notebooksRepository } from "../notebooks/notebooks.repository.js";
import { notesRepository } from "./notes.repository.js";
import type {
  CreateNoteInput,
  ListNotesQuery,
  Note,
  NoteDomainError,
  NotesRepository,
  ServiceResult,
  UpdateNoteInput
} from "./notes.types.js";

function notFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTE_NOT_FOUND",
      message: `Note ${id} was not found`
    }
  };
}

function notebookNotFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTEBOOK_NOT_FOUND",
      message: `Notebook ${id} was not found`
    }
  };
}

function toNoteError(error: unknown): NoteDomainError {
  const databaseError = mapPrismaError(error);

  if (databaseError.code === "UNIQUE_CONSTRAINT") {
    return { code: "NOTE_TITLE_CONFLICT", message: "Note title already exists in this notebook" };
  }

  if (databaseError.code === "MISSING_RECORD") {
    return { code: "NOTE_NOT_FOUND", message: "Note was not found" };
  }

  if (databaseError.code === "RELATION_CONSTRAINT") {
    return { code: "INVALID_REFERENCE", message: "Referenced notebook was not found" };
  }

  return { code: "DATABASE_FAILURE", message: "Database operation failed" };
}

export function createNotesService(repository: NotesRepository) {
  return {
    async listNotebookNotes(notebookId: string, query: ListNotesQuery): Promise<ServiceResult<Note[]>> {
      try {
        const notebook = await notebooksRepository.findById(notebookId);

        if (!notebook) {
          return notebookNotFound(notebookId);
        }

        return { ok: true, data: await repository.listByNotebook(notebookId, query) };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async createNotebookNote(notebookId: string, input: CreateNoteInput): Promise<ServiceResult<Note>> {
      try {
        return { ok: true, data: await repository.create({ notebookId, ...input }) };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async getNote(id: string): Promise<ServiceResult<Note>> {
      try {
        const note = await repository.findById(id);
        return note ? { ok: true, data: note } : notFound(id);
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async updateNote(id: string, input: UpdateNoteInput): Promise<ServiceResult<Note>> {
      try {
        return { ok: true, data: await repository.update(id, input) };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    },

    async deleteNote(id: string): Promise<ServiceResult<{ id: string }>> {
      try {
        const deleted = await repository.delete(id);
        return { ok: true, data: { id: deleted.id } };
      } catch (error) {
        return { ok: false, error: toNoteError(error) };
      }
    }
  };
}

export const notesService = createNotesService(notesRepository);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { Note as PrismaNote } from "../../generated/prisma/client.js";
import type { CreateNoteRecord, ListNotesQuery, Note, NoteStatus, NotesRepository, UpdateNoteRecord } from "./notes.types.js";

function toNote(record: PrismaNote): Note {
  return {
    id: record.id,
    notebookId: record.notebookId,
    title: record.title,
    body: record.body,
    status: record.status as NoteStatus,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

export class PrismaNotesRepository implements NotesRepository {
  async listByNotebook(notebookId: string, query: ListNotesQuery): Promise<Note[]> {
    const notes = await prisma.note.findMany({
      where: {
        notebookId,
        status: query.status
      },
      orderBy: { createdAt: query.order },
      take: query.take,
      skip: query.skip
    });

    return notes.map(toNote);
  }

  async create(record: CreateNoteRecord): Promise<Note> {
    const note = await prisma.note.create({
      data: {
        notebookId: record.notebookId,
        title: record.title,
        body: record.body ?? "",
        status: record.status ?? "ACTIVE"
      }
    });

    return toNote(note);
  }

  async findById(id: string): Promise<Note | undefined> {
    const note = await prisma.note.findUnique({
      where: { id }
    });

    return note ? toNote(note) : undefined;
  }

  async update(id: string, input: UpdateNoteRecord): Promise<Note> {
    const note = await prisma.note.update({
      where: { id },
      data: input
    });

    return toNote(note);
  }

  async delete(id: string): Promise<Note> {
    const note = await prisma.note.delete({
      where: { id }
    });

    return toNote(note);
  }
}

export const notesRepository = new PrismaNotesRepository();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const noteIdParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const listNotesQuerySchema = z.object({
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  order: z.enum(["asc", "desc"]).default("desc")
}).transform((query) => ({
  status: query.status,
  take: query.limit,
  skip: query.offset,
  order: query.order
}));

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().max(5000).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("ACTIVE")
});

export const updateNoteSchema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  body: z.string().trim().max(5000).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional()
}).refine((value) => value.title !== undefined || value.body !== undefined || value.status !== undefined, {
  message: "At least one field is required"
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/modules/notes/notes.types.ts</span>
  </div>

```ts
export type NoteStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type Note = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteResponseDto = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = {
  title: string;
  body?: string;
  status?: NoteStatus;
};

export type UpdateNoteInput = {
  title?: string;
  body?: string;
  status?: NoteStatus;
};

export type NoteIdParams = {
  noteId: string;
};

export type ListNotesQuery = {
  status?: NoteStatus;
  take: number;
  skip: number;
  order: "asc" | "desc";
};

export type CreateNoteRecord = CreateNoteInput & {
  notebookId: string;
};

export type UpdateNoteRecord = UpdateNoteInput;

export type NotesRepository = {
  listByNotebook(notebookId: string, query: ListNotesQuery): Promise<Note[]>;
  create(record: CreateNoteRecord): Promise<Note>;
  findById(id: string): Promise<Note | undefined>;
  update(id: string, input: UpdateNoteRecord): Promise<Note>;
  delete(id: string): Promise<Note>;
};

export type NoteDomainErrorCode =
  | "NOTEBOOK_NOT_FOUND"
  | "NOTE_NOT_FOUND"
  | "NOTE_TITLE_CONFLICT"
  | "INVALID_REFERENCE"
  | "DATABASE_FAILURE";

export type NoteDomainError = {
  code: NoteDomainErrorCode;
  message: string;
};

export type ServiceResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: NoteDomainError };
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/errors/http-error.ts</span>
  </div>

```ts
export type PublicErrorDetails = Array<{
  path: string;
  message: string;
}>;

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: PublicErrorDetails;

  constructor(statusCode: number, code: string, message: string, details?: PublicErrorDetails) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/errors/error-middleware.ts</span>
  </div>

```ts
import type { ErrorRequestHandler } from "express";
import { HttpError } from "./http-error.js";
import { logger } from "../logging/logger.js";

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  const requestId = typeof response.locals.requestId === "string" ? response.locals.requestId : undefined;

  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details ?? []
      }
    });
    return;
  }

  logger.error("Unhandled request failure", {
    requestId,
    method: request.method,
    path: request.path
  }, error);

  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error",
      details: []
    }
  });
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/middleware/request-id.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestIdMiddleware: RequestHandler = (request, response, next) => {
  const incomingRequestId = request.header("x-request-id");
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0 ? incomingRequestId : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("x-request-id", requestId);
  next();
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/middleware/not-found.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../errors/http-error.js";

export const notFoundMiddleware: RequestHandler = (request) => {
  throw new HttpError(404, "ROUTE_NOT_FOUND", `Route ${request.method} ${request.path} was not found`);
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/validation/validate-request.ts</span>
  </div>

```ts
import type { RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import { ZodError } from "zod";
import { HttpError, type PublicErrorDetails } from "../errors/http-error.js";

type RequestTarget = "body" | "params" | "query";

type ValidationStore = Partial<Record<RequestTarget, unknown>>;

function getValidationStore(response: Response): ValidationStore {
  const existingStore = response.locals.validated;

  if (existingStore && typeof existingStore === "object") {
    return existingStore as ValidationStore;
  }

  const store: ValidationStore = {};
  response.locals.validated = store;
  return store;
}

function toPublicDetails(error: ZodError): PublicErrorDetails {
  return error.issues.map((issue) => ({
    path: issue.path.map(String).join("."),
    message: issue.message
  }));
}

export function validateRequest(target: RequestTarget, schema: ZodType): RequestHandler {
  return (request, response, next) => {
    const value = request[target];
    const result = schema.safeParse(value);

    if (!result.success) {
      next(new HttpError(400, "VALIDATION_ERROR", "Invalid request", toPublicDetails(result.error)));
      return;
    }

    const store = getValidationStore(response);
    store[target] = result.data;
    next();
  };
}

export function getValidated<TValue>(response: Response, target: RequestTarget): TValue {
  const store = getValidationStore(response);

  if (!(target in store)) {
    throw new HttpError(500, "VALIDATION_STATE_MISSING", "Validated request data was missing");
  }

  return store[target] as TValue;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/logging/logger.ts</span>
  </div>

```ts
type LogLevel = "info" | "warn" | "error";

type LogFields = Record<string, string | number | boolean | null | undefined>;

function serializeError(error: unknown): LogFields {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message
    };
  }

  return {
    errorMessage: "Unknown error"
  };
}

function writeLog(level: LogLevel, message: string, fields: LogFields = {}, error?: unknown) {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...fields,
    ...(error === undefined ? {} : serializeError(error))
  };

  const line = JSON.stringify(entry);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.log(line);
}

export const logger = {
  info(message: string, fields?: LogFields) {
    writeLog("info", message, fields);
  },

  warn(message: string, fields?: LogFields) {
    writeLog("warn", message, fields);
  },

  error(message: string, fields?: LogFields, error?: unknown) {
    writeLog("error", message, fields, error);
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/src/shared/responses/send-response.ts</span>
  </div>

```ts
import type { Response } from "express";

export type SuccessResponse<TData> = {
  ok: true;
  data: TData;
};

export function sendResponse<TData>(response: Response, statusCode: number, data: TData) {
  response.status(statusCode).json({
    ok: true,
    data
  } satisfies SuccessResponse<TData>);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/openapi/openapi.yaml</span>
  </div>

```txt
openapi: 3.1.0
info:
  title: Persistent Notes API
  version: 1.0.0
servers:
  - url: http://localhost:3000
paths:
  /health:
    get:
      summary: Read service health
      responses:
        "200":
          description: Service is ready to accept requests
  /notebooks:
    get:
      summary: List notebooks
      responses:
        "200":
          description: Notebook list
    post:
      summary: Create notebook
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateNotebookRequest"
      responses:
        "201":
          description: Notebook created
        "409":
          description: Notebook name already exists
  /notebooks/{notebookId}:
    get:
      summary: Read notebook
      parameters:
        - $ref: "#/components/parameters/NotebookId"
      responses:
        "200":
          description: Notebook found
        "404":
          description: Notebook not found
    patch:
      summary: Update notebook
      parameters:
        - $ref: "#/components/parameters/NotebookId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateNotebookRequest"
      responses:
        "200":
          description: Notebook updated
    delete:
      summary: Delete notebook
      parameters:
        - $ref: "#/components/parameters/NotebookId"
      responses:
        "200":
          description: Notebook deleted
  /notebooks/{notebookId}/notes:
    get:
      summary: List notes in a notebook
      parameters:
        - $ref: "#/components/parameters/NotebookId"
        - name: status
          in: query
          schema:
            $ref: "#/components/schemas/NoteStatus"
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
        - name: offset
          in: query
          schema:
            type: integer
            minimum: 0
      responses:
        "200":
          description: Notes in notebook
    post:
      summary: Create note in a notebook
      parameters:
        - $ref: "#/components/parameters/NotebookId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateNoteRequest"
      responses:
        "201":
          description: Note created
  /notes/{noteId}:
    get:
      summary: Read note
      parameters:
        - $ref: "#/components/parameters/NoteId"
      responses:
        "200":
          description: Note found
    patch:
      summary: Update note
      parameters:
        - $ref: "#/components/parameters/NoteId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateNoteRequest"
      responses:
        "200":
          description: Note updated
    delete:
      summary: Delete note
      parameters:
        - $ref: "#/components/parameters/NoteId"
      responses:
        "200":
          description: Note deleted
components:
  parameters:
    NotebookId:
      name: notebookId
      in: path
      required: true
      schema:
        type: string
        format: uuid
    NoteId:
      name: noteId
      in: path
      required: true
      schema:
        type: string
        format: uuid
  schemas:
    NoteStatus:
      type: string
      enum:
        - DRAFT
        - ACTIVE
        - ARCHIVED
    CreateNotebookRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 120
    UpdateNotebookRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 120
    CreateNoteRequest:
      type: object
      required:
        - title
      properties:
        title:
          type: string
          minLength: 1
          maxLength: 160
        body:
          type: string
          maxLength: 5000
        status:
          $ref: "#/components/schemas/NoteStatus"
    UpdateNoteRequest:
      type: object
      properties:
        title:
          type: string
          minLength: 1
          maxLength: 160
        body:
          type: string
          maxLength: 5000
        status:
          $ref: "#/components/schemas/NoteStatus"
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/tests/helpers/database.ts</span>
  </div>

```ts
import { prisma } from "../../src/db/prisma.js";

export async function resetTestDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Refusing to reset database outside NODE_ENV=test");
  }

  await prisma.$transaction([
    prisma.note.deleteMany(),
    prisma.notebook.deleteMany()
  ]);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/tests/persistent-notes.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";
import { app } from "../src/app.js";
import { prisma } from "../src/db/prisma.js";
import { resetTestDatabase } from "./helpers/database.js";

describe("persistent notes api", () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("creates a notebook and stores it in PostgreSQL", async () => {
    const response = await request(app)
      .post("/notebooks")
      .send({ name: "Work" })
      .expect(201);

    assert.equal(response.body.ok, true);
    assert.equal(response.body.data.name, "Work");

    const stored = await prisma.notebook.findUnique({
      where: { id: response.body.data.id }
    });

    assert.equal(stored?.name, "Work");
  });

  it("creates notes inside a notebook and reads them through the API", async () => {
    const notebookResponse = await request(app)
      .post("/notebooks")
      .send({ name: "Learning" })
      .expect(201);

    const noteResponse = await request(app)
      .post(`/notebooks/${notebookResponse.body.data.id}/notes`)
      .send({
        title: "Prisma boundary",
        body: "Prisma records are mapped before reaching the response.",
        status: "ACTIVE"
      })
      .expect(201);

    const listResponse = await request(app)
      .get(`/notebooks/${notebookResponse.body.data.id}/notes?status=ACTIVE&limit=10&offset=0`)
      .expect(200);

    assert.equal(noteResponse.body.data.title, "Prisma boundary");
    assert.equal(listResponse.body.data.length, 1);
    assert.equal(listResponse.body.data[0].id, noteResponse.body.data.id);
  });

  it("maps unique notebook names to public conflict errors", async () => {
    await request(app).post("/notebooks").send({ name: "Inbox" }).expect(201);

    const response = await request(app)
      .post("/notebooks")
      .send({ name: "Inbox" })
      .expect(409);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "NOTEBOOK_NAME_CONFLICT");
  });

  it("rejects invalid input before the repository boundary", async () => {
    const response = await request(app)
      .post("/notebooks")
      .send({ name: "" })
      .expect(400);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
  });
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/persistent-notes-api/README.md</span>
  </div>

````txt
# Persistent Notes API

This mini project practices PostgreSQL persistence boundaries, Prisma ORM, repository replacement, unified error responses, and database-backed integration tests.

## Technology boundary

- Runtime: Node.js
- HTTP framework: Express 5
- Language: TypeScript strict mode
- Runtime validation: Zod
- Database: PostgreSQL
- ORM: Prisma
- Test runner: Node built-in test runner with Supertest

This project intentionally excludes authentication, Redis, Docker, NestJS, Fastify, and production deployment.

## Environment variables

Copy `.env.example` to `.env`, then adjust `DATABASE_URL` for your local PostgreSQL database.

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/persistent_notes_api?schema=public"
PORT=3000
NODE_ENV=development
```

## Commands

```bash
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
npm test
npm run dev
```

`prisma:migrate:reset` clears and rebuilds the development database. Use it only against a development or test database.

## API response shape

Success response:

```json
{
  "ok": true,
  "data": {}
}
```

Error response:

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  }
}
```

## Data boundary

Controllers adapt HTTP. Services own business results and domain errors. Repositories own Prisma queries. Prisma models are persistence models, not public response DTOs.
````
</div>

环境变量模板文件位于 `mini-projects/persistent-notes-api/.env.example`。复制到 `.env` 后再填写本地学习数据库连接。

### 14.4 运行与测试

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/persistent-notes-api
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
NODE_ENV=test npm test
npm run dev
```
</div>

Windows PowerShell 对应命令如下。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: Windows PowerShell</span>
  </div>

```powershell
cd mini-projects/persistent-notes-api
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
$env:NODE_ENV = "test"; npm test
npm run dev
```
</div>

运行前必须确认 `.env` 中的 `DATABASE_URL` 指向学习用 PostgreSQL 数据库。测试前应使用独立 test database，避免 reset helper 作用到开发数据。

### 14.5 执行与生命周期

启动时，`server.ts` 导入 `app.ts`，`app.ts` 导入 routers，routers 导入 controllers，controllers 导入 services，services 导入 repositories，repositories 导入 centralized PrismaClient。`PrismaClient` 的创建发生在 module evaluation 阶段，不发生在每个 request handler 内。

请求进入后，`requestIdMiddleware` 先创建或沿用 request id；`express.json()` 解析 body；route-specific `validateRequest()` 把 runtime input 放入 `response.locals.validated`; controller 读取 validated input；service 返回 `ServiceResult`; repository 访问 PostgreSQL；response helper 或 error middleware 统一输出 response。

如果错误发生时 response headers 已经发送，custom error middleware 不能再重新发送 JSON body，必须调用 `next(error)` 把错误交回 Express 默认错误处理边界。否则 Node.js HTTP response 已经越过 header boundary，后续 `response.status().json()` 会制造新的发送错误。

关闭时，`SIGINT` 或 `SIGTERM` 触发 `server.close()`，然后调用 `disconnectPrisma()`。测试时，`beforeEach` reset test data，`after` 断开 PrismaClient。

### 14.6 常见错误

- 如果 `DATABASE_URL` 缺失，`src/config/env.ts` 会在启动阶段抛出 `Invalid environment configuration`，这说明 runtime config boundary 没通过。
- 如果先删除 parent table rows，再删除 child table rows，可能遇到 foreign key violation。应按 relation 方向清理。
- 如果 controller 直接调用 Prisma，service 和 repository contract 会失去意义，后续替换或测试会变困难。
- 如果把 `prisma migrate reset` 用在共享数据库，会造成数据丢失。该命令只适合 development/test 边界。

## 15. 知识迁移与真实项目场景

真实项目里，持久化边界通常是多个团队最容易混乱的地方：前端以为 TypeScript 类型足够，后端以为 Zod 足够，数据库以为 ORM 已经表达全部约束。可维护的做法是分层保留证据：request validation 保护入口，service 表达业务规则，database constraints 保护数据完整性，migration history 记录结构演进，integration tests 证明真实 persistence path。

迁移到其他 ORM 或 query builder 时，本章模型仍然成立：schema、client、migration、repository、error mapping、test reset 都要重新找到对应实现。迁移到 production 环境时，还要另行验证 connection pool sizing、backup、observability、deployment 和 secret management。

## 16. 本章复盘任务

1. 解释为什么 TypeScript 的 `notebookId: string` 不能证明 foreign key 成立。
2. 画出 `POST /notebooks/:notebookId/notes` 从 request 到 PostgreSQL row 的机制链。
3. 对比 `pool.query()` 与 checked-out `client.query()` 在 transaction 中的差异。
4. 说明 `RETURNING` 为什么能减少一次额外 `SELECT`。
5. 找出 Prisma model、domain model、response DTO 的不同字段和不同责任。
6. 解释 `prisma migrate dev`、`prisma migrate reset`、`prisma migrate deploy` 的环境边界。
7. 为一个 unique constraint error 设计 domain error 和 HTTP response。
8. 说明 integration test 为什么要同时断言 HTTP response 和 database state。

## 17. 最终心智模型

把本章压缩成一句话：Node.js process 负责接收请求、验证输入、组织业务流程和管理资源生命周期；PostgreSQL 负责持久化 rows、执行约束、索引和事务；node-postgres 暴露底层连接与 SQL 边界；Prisma 提供类型化 ORM 和 migration workflow；repository、service、controller 把这些机制隔离成可维护的工程边界。

## 18. 官方资料

- Node.js：
  - [`node:process`](https://nodejs.org/api/process.html)
  - [`node:test`](https://nodejs.org/api/test.html)
  - [`node:assert`](https://nodejs.org/api/assert.html)
- PostgreSQL：
  - [SQL tutorial](https://www.postgresql.org/docs/current/tutorial-sql.html)
  - [`CREATE TABLE`](https://www.postgresql.org/docs/current/sql-createtable.html)
  - [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
  - [`INSERT`](https://www.postgresql.org/docs/current/sql-insert.html)
  - [`UPDATE`](https://www.postgresql.org/docs/current/sql-update.html)
  - [`DELETE`](https://www.postgresql.org/docs/current/sql-delete.html)
  - [`RETURNING`](https://www.postgresql.org/docs/current/dml-returning.html)
  - [Indexes](https://www.postgresql.org/docs/current/indexes.html)
  - [`EXPLAIN`](https://www.postgresql.org/docs/current/using-explain.html)
  - [Transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- node-postgres：
  - [Pool API](https://node-postgres.com/apis/pool)
  - [Queries](https://node-postgres.com/features/queries)
  - [Transactions](https://node-postgres.com/features/transactions)
  - [Result object](https://node-postgres.com/apis/result)
- Prisma ORM：
  - [Prisma config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
  - [Prisma schema overview](https://www.prisma.io/docs/orm/prisma-schema/overview)
  - [Data sources](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)
  - [Generating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client)
  - [Database drivers](https://www.prisma.io/docs/orm/core-concepts/supported-databases/database-drivers)
  - [PostgreSQL connector](https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql)
  - [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
  - [Filtering and sorting](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting)
  - [Pagination](https://www.prisma.io/docs/orm/prisma-client/queries/pagination)
  - [Select fields](https://www.prisma.io/docs/orm/prisma-client/queries/select-fields)
  - [Relation queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)
  - [Transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)
  - [Migrate development and production workflow](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)
  - [Error reference](https://www.prisma.io/docs/orm/reference/error-reference)
- Express：
  - [Express 5.x API reference](https://expressjs.com/en/5x/api.html)
  - [Error handling guide](https://expressjs.com/en/5x/guide/error-handling/)
- Zod：
  - [Basics](https://zod.dev/basics)
  - [API reference](https://zod.dev/api)
- npm CLI：
  - [`package.json`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
  - [`npm install`](https://docs.npmjs.com/cli/v11/commands/npm-install/)
  - [`npm run`](https://docs.npmjs.com/cli/v11/commands/npm-run/)
  - [Scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)
- TypeScript：
  - [TSConfig reference](https://www.typescriptlang.org/tsconfig/)
  - [Modules reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
