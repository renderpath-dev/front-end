# Next.js 学习指导输出检查表

## 使用方式

完成 guide 后逐项核对。每个关键项必须给出 `PASS`、`FAIL` 或 `UNKNOWN` 和 concrete evidence。任何 hard-fail 项为 `FAIL` 时继续修订，不交付为完成状态。

## 范围与来源

- [ ] 已读取最近适用的 `AGENTS.md`。
- [ ] 已检查目标 guide、相关 guides、`README.md`、`package.json` 和真实 route tree。
- [ ] 已记录安装的 Next.js、React、TypeScript 和相关 tooling versions。
- [ ] 已读取当前版本 `node_modules/next/dist/docs/` 中与章节相关的文档。
- [ ] 已打开当前线上 Next.js 官方文档，而不是只依赖模型记忆。
- [ ] React-owned behavior 使用 `react.dev` 核对。
- [ ] TypeScript-owned behavior 使用 TypeScript 官方文档核对。
- [ ] Web API behavior 使用 MDN 核对。
- [ ] Vercel-specific claims 使用 Vercel 官方文档核对。
- [ ] 项目版本与线上最新版本的差异已明确标注。
- [ ] 无法访问或无法确认的 claim 标记 `Verification Needed`。
- [ ] App Router 和 Pages Router 没有无标签混用。

## 教学质量

- [ ] H1 包含 Next.js、章节号和具体章节名称。
- [ ] 正文主要价值来自 mechanism-first explanation。
- [ ] 章节解释解决的问题和概念存在原因。
- [ ] 每个核心 `9.x` 都有足够教学内容，不是 brief overview 后直接给代码。
- [ ] 每个 required label 都绑定当前 section 的真实 route、values、modules、runtime 和 output。
- [ ] 没有可原样复制到其他章节的 generic mechanism paragraph。
- [ ] API tables、directories、code、final project 和 cheatsheet 没有替代核心解释。
- [ ] non-trivial code 后有逐行解释、执行过程、值变化、结果原因、对比和 error analysis。
- [ ] final mini project 不压倒或替代 `9.x`。
- [ ] final project 使用的每个核心概念已在对应 `9.x` 讲清楚。

## 章节结构

- [ ] `<style>` 后存在 `## 目录`。
- [ ] `## 目录` 位于 `## 0. 文件定位` 前。
- [ ] 实际 `## 0` 到 `## 18` 都在目录中。
- [ ] `## 9` 下所有 core `9.x` 都在目录中。
- [ ] 每个 `9.x` TOC target 使用 matching `#section-9-x`。
- [ ] 每个 `9.x` heading 前有 matching explicit anchor。
- [ ] anchor 和 heading 之间最多一个空行。
- [ ] 没有 duplicate anchor。
- [ ] heading 没有为了 slug 被无意义改写。
- [ ] 目录列出 final mini-project 的重要三级标题。
- [ ] 目录没有列 bold teaching labels。
- [ ] 有真实 practice/final-project files 时存在 `## 本章代码定位索引`。
- [ ] code location index 的 goal、path/snippet、type 和 section 完整。
- [ ] ordinary structural headings 使用中文。
- [ ] 没有残留 `File Positioning`、`Clear Conclusion` 或 `Technical Meaning`。
- [ ] guide body 不包含 `## 14. 最终文件清单`。
- [ ] guide body 不包含 `## 15. 如何转换成个人笔记`。
- [ ] guide body 不包含 delivery status、commands run 或 final delivery checklist。

## 核心 `9.x` labels

每个 core section 都包含并实际填写：

- [ ] `结论`
- [ ] `本节解决的问题`
- [ ] `技术意义`
- [ ] `概念解释`
- [ ] 完整的 layer boundary label
- [ ] `底层机制`
- [ ] `API / 语法规则`
- [ ] `固定文件名 / 固定方法名 / 参数签名`
- [ ] `文件结构`
- [ ] `示例代码`
- [ ] `逐行解释`
- [ ] `运行方式`
- [ ] `预期输出`
- [ ] `执行过程`
- [ ] `变量与引用变化`
- [ ] `为什么会得到这个结果`
- [ ] `对比情况`
- [ ] `常见错误为什么错`
- [ ] `与真实项目的关系`
- [ ] `与当前学习路径的关系`
- [ ] `最终记忆模型`

不适用项必须解释为什么没有该阶段或 API，不能留空。

## 机制证据链

每个 core `9.x` 至少一条 chain 包含：

- [ ] trigger。
- [ ] file convention 或 module boundary。
- [ ] server-side execution path。
- [ ] browser-side execution path 或明确不存在。
- [ ] RSC Payload / HTML / client bundle / hydration / streaming / navigation。
- [ ] concrete values、Promise、Request、Response、props、params、searchParams、cookies、headers、FormData 或 cache entry。
- [ ] TypeScript 检查内容和 runtime blind spot。
- [ ] observed output/error/behavior。
- [ ] incorrect form 违反的 exact rule。
- [ ] production recognition signal。

## Next.js ownership boundaries

- [ ] Syntax、JavaScript runtime、React runtime、Next.js convention、server、browser、Web API、TypeScript、tooling、deployment 已按相关性分开。
- [ ] Next.js 没有被描述成普通 React routing。
- [ ] folders、route segments 和 special files 的 framework ownership 清楚。
- [ ] Server Component module graph、Client module graph 和 render tree 分开。
- [ ] `"use client"` 被解释为 module graph/client bundle boundary。
- [ ] `"use server"` 被解释为 Server Function boundary，而非 Server Component marker。
- [ ] RSC Payload、HTML、client bundle 和 hydration 分开。
- [ ] initial load 与 subsequent navigation 分开。
- [ ] server-only code 和 browser-only code 分开。
- [ ] Node.js、Edge、browser 和 deployment runtime 分开。
- [ ] server-to-client props serialization 已说明。
- [ ] Server Action input 被视为 untrusted，validation/authentication/authorization 分开。

## 路由与文件约定

- [ ] Router 所属清楚。
- [ ] route segment 与 URL segment mapping 清楚。
- [ ] 固定 filenames/exports/signatures 已核对当前版本。
- [ ] `page`、`layout`、`template`、`loading`、`error`、`not-found`、`route`、`proxy` 和 metadata 仅在相关时使用。
- [ ] `route.ts` 与同 segment `page.tsx` conflict 已在相关章节说明。
- [ ] Proxy/middleware naming 和 runtime 按项目版本核对。
- [ ] `params` / `searchParams` async behavior 按项目版本核对。
- [ ] redirect、notFound 和 navigation APIs 未跨 Router 误用。

## 数据、缓存与 streaming

- [ ] direct server access、server `fetch`、client fetching 和 Route Handler 分开。
- [ ] request memoization 没有被称为 persistent cache。
- [ ] Next.js cache、router cache、browser cache、CDN 和 deployment cache 分开。
- [ ] `cacheComponents` 是否启用有项目证据。
- [ ] Cache Components 与 previous model 没有混合 defaults。
- [ ] `"use cache"`、cacheLife、cacheTag、revalidatePath、revalidateTag、updateTag 的位置与行为已核对。
- [ ] stale、expire、refresh、read-your-own-writes 等 user-observed timing 清楚。
- [ ] ISR、PPR/static shell 和 streaming 的关系按当前版本核对。
- [ ] explicit Suspense 与 `loading.tsx` scope 分开。
- [ ] Route Handler caching default 和 Cache Components behavior 分开。
- [ ] Vercel cache persistence 与 self-hosting behavior 分开。

## TypeScript 与 tooling

- [ ] TypeScript syntax、type-system behavior、emitted JavaScript 和 runtime validation 分开。
- [ ] generated route types 的生成时机已核对。
- [ ] `next-env.d.ts` 没有被当作手写文件。
- [ ] TypeScript type 没有被当作 request/body/env runtime validation。
- [ ] command 来自实际 `package.json` / docs。
- [ ] Turbopack/Webpack behavior 按当前版本核对。
- [ ] 没有声称 Turbopack 执行 type checking，除非有当前证据。
- [ ] 没有使用已移除的 `next lint`，除非目标旧版本确实支持。
- [ ] 没有引入项目不存在的 linter、formatter 或 test framework。
- [ ] testing content 使用实际工具的官方文档。

## 文件与 code-window

- [ ] `当前项目结构`、`本章文档结构`、`概念示例结构`、`真实练习结构` 和 `最终小项目结构` 按需区分。
- [ ] 每个 real path 在本地存在。
- [ ] special filenames 未为了描述性命名被重命名。
- [ ] code location index、structure、title bar、complete code 和 final response inventory 一致。
- [ ] concept examples 使用 `Snippet:` 或 `Template:`。
- [ ] snippets 没有被报告为 real delivery files。
- [ ] 缺失文件没有被标为已创建/已更新/真实文件。
- [ ] 每个 code/command/output/error example 使用 macOS title bar + fenced block。
- [ ] 每个 title bar 有 red/yellow/green dots。
- [ ] decorative UI 不在 source code 中。
- [ ] 没有 raw HTML `<pre><code>` 包裹 source code。
- [ ] fenced language identifier 正确。
- [ ] source-code 和 command blocks 不含 Chinese/CJK。
- [ ] opening style 包含 `.macos-code-window`。
- [ ] opening style 包含 `.macos-code-titlebar`。
- [ ] opening style 包含 `.macos-code-dot` 和三种 dot colors。
- [ ] opening style 包含 `.macos-code-title`。
- [ ] opening style 包含 `.macos-code-titlebar + pre`。
- [ ] opening style 包含 `.macos-code-titlebar + pre code`。

## Final mini-project、速查表、机制审计与调试路径

- [ ] section 12 明确项目只整合、不替代分节教学。
- [ ] 有 project goal、fit、structure、responsibilities、complete code、run、expected result、execution flow、errors、extensions。
- [ ] complete code 覆盖 structure 中每个 project file。
- [ ] section 13 包含 one-sentence summary、API/file convention、comparison、errors、real usage 和 minimal templates。
- [ ] section 14 是 chapter-specific mechanism recap 和 boundary audit，不是 delivery inventory。
- [ ] section 14 包含 owner / phase / runtime / output audit 和相关 graph、build/request、bundle、env evidence。
- [ ] section 15 是 debugging experiments 和 validation learning path，不是 workflow summary。
- [ ] section 15 包含 terminal、Console、Network、development/production 和 error classification 观察路径。
- [ ] 未实际执行的 section 14/15 validation item 保持 `UNKNOWN`。
- [ ] section 18 给出实际 official reading order 和 `Verification Needed`。
- [ ] Delivery Gate、自检表和 Codex 修改说明没有进入教材正文。
- [ ] final response 列出 files created/updated、commands run、limitations 和 evidence table。
- [ ] final response 在相关时提供 personal-note conversion suggestions。

## 实际验证

- [ ] Markdown 结构检查实际运行或逐项核对。
- [ ] CJK-in-code-block 检查实际运行。
- [ ] real-path existence 检查实际运行。
- [ ] lint 只有在命令实际运行成功时标记 `PASS`。
- [ ] type-check 只有在命令实际运行成功时标记 `PASS`。
- [ ] tests 只有在命令实际运行成功时标记 `PASS`。
- [ ] build 只有在命令实际运行成功时标记 `PASS`。
- [ ] route/UI/API smoke test 只有实际执行时标记 `PASS`。
- [ ] cache/revalidation behavior 只有实际观察时标记 `PASS`。
- [ ] deployment behavior 只有实际部署验证时标记 `PASS`。

## Hard-fail 条件

出现任一项即为 `FAIL`：

1. macOS code-window HTML 存在但 required selectors 不完整。
2. TOC 漏掉任一 core `9.x`。
3. 任一 core `9.x` 缺 matching explicit anchor。
4. 任一 core `9.x` 只有 labels 和 generic filler，没有具体 evidence chain。
5. mechanism paragraph 可原样复制到其他章节。
6. Next.js 被当作普通 React routing。
7. App Router 与 Pages Router APIs 无标签混用。
8. `"use server"` 被称为 Server Component marker。
9. request memoization、persistent cache、router cache 或 CDN cache 被混为一谈。
10. Cache Components 和 previous cache model 混用 defaults。
11. real path 本地不存在。
12. real title bar 与 verified structure 或 final response inventory 不一致。
13. `Snippet:` / `Template:` 被报告为 real delivery file。
14. source-code block 含 Chinese/CJK。
15. self-check 只有“已检查”“符合要求”等不可复现 claims。
16. 未运行 lint/type-check/test/build 却声称通过。
17. Vercel platform behavior 被描述为 self-hosted Next.js default。

## 证据表模板

最终回复使用：

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| 文件完整性 | PASS / FAIL / UNKNOWN | 精确路径与文件数 |
| 官方文档核对 | PASS / FAIL / UNKNOWN | 实际访问 URL 与版本 |
| 边界分离 | PASS / FAIL / UNKNOWN | 精确 heading 或 rule |
| code-window selectors | PASS / FAIL / UNKNOWN | selector count / names |
| CJK in code blocks | PASS / FAIL / UNKNOWN | 实际扫描命令和结果 |
| validation commands | PASS / FAIL / UNKNOWN | command、exit code、summary |

`UNKNOWN` 是诚实结果，不得为了看起来完整而改为 `PASS`。
