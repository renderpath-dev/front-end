# Node.js 第 5 章速查表：PostgreSQL、SQL 持久化、Prisma ORM 与数据库边界

## 一句话模型

Node.js process 负责请求、验证、业务流程和资源生命周期；PostgreSQL 负责持久化 rows、约束、索引和事务；Prisma 提供类型化 ORM 与 migration workflow，但不替代数据库机制。

## process memory vs database table

| 对比项 | Process memory | PostgreSQL table |
| --- | --- | --- |
| 生命周期 | 跟随当前 Node.js process | 独立于 Node.js process |
| 数据位置 | V8 heap 中的对象、数组、Map | PostgreSQL 管理的 rows |
| 重启后 | 消失 | 保留 |
| 约束能力 | 只能靠应用逻辑 | `NOT NULL`、`UNIQUE`、`FOREIGN KEY`、`CHECK` |
| 测试意义 | 适合验证 service/repository contract | 适合验证真实 persistence boundary |

## SQL DDL / DML 快速对照

| 类别 | 命令 | 作用 |
| --- | --- | --- |
| DDL | `CREATE TABLE` | 定义 table、columns、constraints |
| DML | `INSERT` | 创建 rows |
| DML | `UPDATE` | 修改 rows |
| DML | `DELETE` | 删除 rows |
| DML extension | `RETURNING` | 返回被修改的 rows |

## PostgreSQL constraints

| Constraint | 数据库层意义 | 应用层常见误解 |
| --- | --- | --- |
| `NOT NULL` | column 不允许 `NULL` | Zod `min(1)` 可以替代 |
| `UNIQUE` | 值或组合值必须唯一 | service 先查再写就足够 |
| `FOREIGN KEY` | child row 必须引用有效 parent row | `notebookId: string` 就证明引用存在 |
| `CHECK` | row 必须满足表达式 | enum type 能替代数据库检查 |

## `RETURNING`

| 写法 | 返回内容 | 典型用途 |
| --- | --- | --- |
| `INSERT ... RETURNING id` | 新 row 的 id | 创建 API 返回资源 id |
| `UPDATE ... RETURNING *` | 修改后的 row | 返回最新状态 |
| `DELETE ... RETURNING id` | 被删除 row 的 id | 确认删除目标 |

## Parameterized query

| 规则 | 说明 |
| --- | --- |
| SQL text 与 values 分离 | 使用 `$1`、`$2` 和 values array |
| 保护 values | 用户输入作为数据绑定，不参与 SQL grammar |
| 不保护 identifiers | table name、column name 不能用 `$1` 参数化 |
| 不执行 unsafe demo | 不要运行字符串拼接 SQL |

## node-postgres pool / client / transaction

| 场景 | 正确选择 | 原因 |
| --- | --- | --- |
| 单条独立 query | `pool.query()` | pool 借连接、执行、归还 |
| transaction | `const client = await pool.connect()` | `BEGIN`、DML、`COMMIT` 必须同一 database session |
| cleanup | `client.release()` / `pool.end()` | 释放外部 socket 资源 |
| result inspection | `result.rows` 与 `result.rowCount` 分开看 | `rowCount` 不等于 `rows.length` 的通用替代 |

## Prisma schema

| 部分 | 作用 |
| --- | --- |
| `datasource` | 指定 database provider 和 connection URL 来源 |
| `generator` | 指定 Prisma Client 生成方式和 output |
| `model` | 描述 persistence model |
| `@relation` | 描述 relation fields 和 references |
| `@@index` | 描述 database index |
| `@@unique` | 描述 database unique constraint |

## Prisma Migrate command boundary

| Command | 环境边界 | 作用 |
| --- | --- | --- |
| `prisma migrate dev` | development | 创建并应用开发 migration |
| `prisma migrate reset` | development/test | 重置数据库，具有破坏性 |
| `prisma migrate deploy` | production/staging | 应用已有 pending migrations |
| `prisma generate` | tooling | 从 schema 生成 Prisma Client |

## Prisma Client CRUD

| API | 语义 | 注意点 |
| --- | --- | --- |
| `create` | 创建 row | 受数据库 constraints 约束 |
| `findMany` | 查询集合 | 需要 filter、sort、pagination |
| `findUnique` | 按 unique 条件查询 | 条件必须是 unique identity |
| `update` | 更新 row | missing record 需要错误映射 |
| `delete` | 删除 row | relation rule 可能阻止删除 |

## `select` / `include`

| API | 作用 | 边界 |
| --- | --- | --- |
| `select` | 选择字段 | 控制读取 shape，不等于 DTO |
| `include` | 加载 relation | 控制 relation loading，不等于 API contract |

## Repository replacement

| 层 | 责任 |
| --- | --- |
| Controller | HTTP input/output adaptation |
| Service | business result and domain error |
| Repository contract | persistence-independent interface |
| Memory repository | process-local practice implementation |
| Prisma repository | database-backed implementation |

## Database error mapping

| Database / Prisma signal | Domain / HTTP direction |
| --- | --- |
| unique violation / `P2002` | conflict error |
| missing record / `P2025` | not found error |
| foreign key violation / `P2003` | invalid reference error |
| unknown database failure | internal error without raw detail |

## Seed / test reset checklist

| Check | Rule |
| --- | --- |
| Seed uses `upsert` when possible | repeatable without duplicates |
| Test reset checks `NODE_ENV=test` | avoid destructive reset outside tests |
| Delete child rows before parent rows | respect foreign key relation |
| Tests disconnect PrismaClient | avoid hanging resources |

## 常见错误

| Mistake | Correction |
| --- | --- |
| 用 TypeScript type 替代 database constraint | TypeScript、Zod、database constraint 都要有明确边界 |
| 用多次 `pool.query()` 拼 transaction | 用 checked-out `client` |
| 在 request handler 中 `new PrismaClient()` | 集中创建并复用 PrismaClient |
| 直接返回 Prisma record | 映射成 response DTO |
| 把 `migrate reset` 放进启动脚本 | 只在 development/test 明确执行 |

## 官方资料名称

- PostgreSQL 18 SQL language、constraints、`RETURNING`、indexes、`EXPLAIN`、transactions、isolation
- node-postgres Pool、Queries、Transactions、Result
- Prisma ORM schema、data model、CRUD、transactions、Migrate workflow、error reference
- Express 5 API and error handling
- Zod documentation
- Node.js `process`、`test`、`assert`
- npm `package.json`、scripts、install、run
- TypeScript TSConfig and modules reference
