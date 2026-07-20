# Node.js 第 8 章：文件上传、Multipart、流式存储、文件元数据与安全下载边界

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
  - [9.1 Browser FormData and multipart boundary](#91-browser-formdata-and-multipart-boundary)
  - [9.2 Why `express.json()` does not parse file uploads](#92-why-expressjson-does-not-parse-file-uploads)
  - [9.3 Busboy parser model：request stream → field event → file event](#93-busboy-parser-modelrequest-stream-field-event-file-event)
  - [9.4 Upload limits：fileSize、files、fields、parts](#94-upload-limitsfilesizefilesfieldsparts)
  - [9.5 Stream backpressure and `pipeline`](#95-stream-backpressure-and-pipeline)
  - [9.6 Temporary files and cleanup responsibility](#96-temporary-files-and-cleanup-responsibility)
  - [9.7 Hashing uploaded bytes with `crypto.createHash`](#97-hashing-uploaded-bytes-with-cryptocreatehash)
  - [9.8 File validation：extension、MIME header、magic number](#98-file-validationextensionmime-headermagic-number)
  - [9.9 User filename safety：metadata, not storage path](#99-user-filename-safetymetadata-not-storage-path)
  - [9.10 Storage key generation：random id, extension, owner boundary](#910-storage-key-generationrandom-id-extension-owner-boundary)
  - [9.11 Safe local storage path：root containment and traversal defense](#911-safe-local-storage-pathroot-containment-and-traversal-defense)
  - [9.12 Object-store adapter boundary：local filesystem now, cloud later](#912-object-store-adapter-boundarylocal-filesystem-now-cloud-later)
  - [9.13 PostgreSQL attachment metadata](#913-postgresql-attachment-metadata)
  - [9.14 Metadata and file write consistency：why this is not one transaction](#914-metadata-and-file-write-consistencywhy-this-is-not-one-transaction)
  - [9.15 Note owner authorization for attachments](#915-note-owner-authorization-for-attachments)
  - [9.16 Controlled download：auth before bytes](#916-controlled-downloadauth-before-bytes)
  - [9.17 Download headers：Content-Type、Content-Disposition、ETag、nosniff](#917-download-headerscontent-typecontent-dispositionetagnosniff)
  - [9.18 Soft delete and object cleanup policy](#918-soft-delete-and-object-cleanup-policy)
  - [9.19 Upload abort, stream error, truncated file, and cleanup](#919-upload-abort-stream-error-truncated-file-and-cleanup)
  - [9.20 Integration testing multipart upload and download](#920-integration-testing-multipart-upload-and-download)
  - [9.21 Chapter integration: notes-attachments-api](#921-chapter-integration-notes-attachments-api)
- [10. API 与规则索引](#10-api-与规则索引)
- [11. 常见错误对照表](#11-常见错误对照表)
- [12. 调试与验证方法](#12-调试与验证方法)
- [13. 分项练习说明](#13-分项练习说明)
- [14. 最终迷你项目](#14-最终迷你项目)
- [15. 知识迁移与真实项目场景](#15-知识迁移与真实项目场景)
- [16. 本章复盘任务](#16-本章复盘任务)
- [17. 最终心智模型](#17-最终心智模型)
- [18. 官方资料](#18-官方资料)

## 本章代码定位索引

| 学习目标 | 文件或片段 | 可观察证据 |
| --- | --- | --- |
| 理解 multipart 边界 | `practices/08-file-upload-storage/01-multipart-basics/formdata-boundary.ts` | `Content-Type` 包含 `boundary=` |
| 区分 JSON parser 与 multipart parser | `practices/08-file-upload-storage/01-multipart-basics/content-type-check.ts` | `application/json` 与 `multipart/form-data` 判定不同 |
| 观察 Busboy 事件模型 | `practices/08-file-upload-storage/01-multipart-basics/busboy-file-event.ts` | `field` 与 `file` 事件顺序可打印 |
| 验证上传限制 | `practices/08-file-upload-storage/01-multipart-basics/busboy-limits.ts` | `fileSize`、`files`、`fields`、`parts` 可触发限制事件 |
| 练习流式临时文件 | `practices/08-file-upload-storage/02-streaming-files/pipeline-to-temp-file.ts` | `pipeline` 写入临时文件并输出大小 |
| 练习字节哈希 | `practices/08-file-upload-storage/02-streaming-files/hash-while-streaming.ts` | `sha256` 来自真实字节 |
| 校验扩展名、MIME、magic number | `practices/08-file-upload-storage/03-file-validation/magic-number-validation.ts` | `file-type` 返回 `ext` 与 `mime` |
| 练习安全存储路径 | `practices/08-file-upload-storage/04-storage-boundary/safe-storage-path.ts` | `path.relative` 检测逃逸 |
| 练习下载响应头 | `practices/08-file-upload-storage/05-download-boundary/download-headers.ts` | 生成下载所需 headers |
| 完成附件 API | `mini-projects/notes-attachments-api/src/modules/attachments/attachments.service.ts` | 上传、下载、删除围绕 owner 授权和对象存储边界 |

## 0. 章前定位

前七章已经建立了 Express、Prisma、认证、CSRF、错误处理中间件、缓存和后台任务边界。本章只把“受保护的 notes API”扩展到文件附件，不重新讲登录、笔记 CRUD、Redis 或队列。核心变化是：请求体不再只是 JSON，而是带边界的 multipart 字节流；数据库不再保存业务对象的全部内容，而是保存文件元数据和存储键。

本章的最终边界是本地 filesystem object-store adapter。云对象存储、CDN、病毒扫描、图片处理属于后续演进，只作为边界提醒，不在本章实现。

## 1. 学习目标

- 解释浏览器如何用 `FormData` 生成 `multipart/form-data; boundary=...`。
- 解释为什么 `express.json()` 不解析文件上传。
- 用 Busboy 从 request stream 中解析 `field` 和 `file`。
- 用 `fileSize`、`files`、`fields`、`parts` 建立上传上限。
- 用 `pipeline`、临时文件、cleanup、hash、magic number、metadata 和 owner 授权搭建可解释的上传链路。
- 用受控下载端点代替公开静态目录。

## 2. 前置知识

- Chapter 01–07 的 HTTP 请求/响应、Express middleware、Prisma repository、session cookie、CSRF、owner authorization、错误处理中间件。
- Node stream 的 readable/writable 概念。
- PostgreSQL metadata 与 filesystem bytes 是两个不同一致性域。

## 3. 环境与运行基线

本章使用 Node 26、ESM、TypeScript `NodeNext`、Express 5、Prisma 7 风格配置、Busboy、file-type、Node built-in test runner 与 Supertest。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/notes-attachments-api
cp .env.example .env
npm install
npm run prisma:generate
npm run typecheck
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
Set-Location mini-projects\notes-attachments-api
Copy-Item .env.example .env
npm install
npm run prisma:generate
npm run typecheck
```
</div>

如果本地 PostgreSQL 可用，再执行迁移和 integration tests；如果数据库不可用，本章仍然可以完成静态代码阅读、类型检查和练习文件观察。

## 4. 第一性原理

文件上传不是“一个很大的 JSON 字段”。上传文件时，HTTP body 是一段被 boundary 分割的字节流。字段和文件只是 multipart body 里的不同 part。Node 进程收到的是 request stream；服务端必须边读边限制、边写临时文件、边清理失败状态，不能等整个文件进入内存后再决定。

安全边界来自多个机制叠加：认证证明“谁在请求”，owner 授权证明“这个 note 属于谁”，Busboy limits 控制请求体规模，magic number 证明字节类型，storage key 避免用户控制路径，download endpoint 保证授权发生在字节输出之前。

## 5. 技术边界模型

| 边界 | 本章实现 | 不在本章实现 |
| --- | --- | --- |
| 上传解析 | Busboy direct parser | Multer 抽象封装 |
| 存储 | local filesystem object-store adapter | S3/GCP/Azure/CDN |
| 校验 | extension allowlist + declared MIME recording + magic number | 病毒扫描、图片重编码 |
| 元数据 | PostgreSQL `Attachment` row | 把文件内容塞进数据库字段 |
| 下载 | owner check before stream | public static uploads directory |
| 清理 | temp/object cleanup policy | Redis/BullMQ 深入调度 |

## 6. 底层机制模型

链路顺序是：`HTTP request` → `Content-Type` boundary 检查 → `Busboy` 解析 → `file` stream → `pipeline` 写临时文件 → `sha256` 与 magic number 校验 → 生成 `storageKey` → 复制到 object store → Prisma 插入 metadata → 删除临时文件 → 返回 metadata。下载顺序是：session → owner check → metadata lookup → object stat → set headers → stream bytes。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: upload mechanism order</span>
  </div>

```txt
request stream
multipart boundary
Busboy field/file events
pipeline to temp file
sha256 and magic number validation
storage key generation
object copy
Prisma Attachment metadata insert
temp cleanup
metadata response without internal path
```
</div>

## 7. 核心术语

| 术语 | 含义 | 常见误解 |
| --- | --- | --- |
| `boundary` | multipart body 中分割 part 的字节标记 | 手动乱写 header 会让 body 与 header 不一致 |
| `file` event | Busboy 识别到文件 part 时给出的 readable stream | 不是完整文件 Buffer |
| temp file | 校验完成前的临时落点 | 不应成为长期存储位置 |
| magic number | 文件头字节特征 | 不是所有格式都可检测 |
| storage key | 服务端生成的对象标识 | 不是用户文件名 |
| metadata | 数据库中的文件业务记录 | 不应包含内部绝对路径 |
| controlled download | 授权后再输出字节 | 不是 `express.static` 公开目录 |

## 8. 本章实践路线

先用 `practices/08-file-upload-storage` 分开观察 multipart、stream、validation、storage、download，再把这些机制组合进 `mini-projects/notes-attachments-api`。分项练习负责机制可观察，最终项目负责把机制放进受保护 API。

## 9. 核心教学

<a id="91-browser-formdata-and-multipart-boundary"></a>
### 9.1 Browser FormData and multipart boundary

浏览器构造 `FormData` 时，body 与 header 是一组配套结果。`boundary` 是 body 中每个 part 的分隔符，所以不要手动覆盖浏览器生成的 `Content-Type`。

**机制说明**：`FormData` 保存的是字段名到值的 entry list，值可以是 string、`Blob` 或 `File`。当浏览器把它作为 `fetch()` 的 `body` 发送时，浏览器会把 entry list 编码成 `multipart/form-data` body，并生成一个只属于这次 body 的 `boundary`。这个 `boundary` 同时出现在 `Content-Type` header 和 body 分隔线里；如果你手动写 `Content-Type: multipart/form-data`，浏览器就不能把真实 boundary 写进去，服务端 parser 只能看到缺失或错配的边界。

**对比情况**：正确写法是只传 `body: formData`，让浏览器生成 header；错误写法是手动覆盖 `Content-Type`。MDN 的 warning 指向的就是这个错配：header 里的 boundary 是 parser 找 part 的索引，body 里的 boundary 是真实分隔符，二者不一致时 Busboy 无法可靠切分字段和文件。

**常见错误**：把 `multipart/form-data` 当成普通字符串 header 固定下来。这个错误通常表现为服务端报 missing boundary、unsupported content type，或者没有任何 `field` / `file` event。

**与真实项目的关系**：最终项目的服务端检查 `boundary=`，但客户端侧的正确责任是不要手动覆盖浏览器生成的 multipart header。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/01-multipart-basics/formdata-boundary.ts</span>
  </div>

```ts
const form = new FormData();
form.append("title", "avatar");
form.append("file", new Blob([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], { type: "image/png" }), "avatar.png");

const request = new Request("http://example.test/upload", {
  method: "POST",
  body: form
});

console.log({
  contentType: request.headers.get("content-type"),
  hasBoundary: request.headers.get("content-type")?.includes("boundary=") ?? false
});
```
</div>

<a id="92-why-expressjson-does-not-parse-file-uploads"></a>
### 9.2 Why `express.json()` does not parse file uploads

`express.json()` 只处理 JSON media type；multipart 不是 JSON 语法，也不能被 JSON parser 还原成文件。它会跳过不匹配的 content type，让后续 Busboy 读取原始 request stream。

**机制说明**：`express.json()` 是 Express 的 JSON body parser，它只在请求 media type 表示 JSON 时读取 body 并执行 JSON parse。multipart body 不是 JSON 语法，而是由 boundary、part header、空行和 part bytes 组成的结构化字节流。文件 part 可能非常大，不能被当成一个 JSON 字段塞进 `request.body`。

**底层机制**：当请求是 `multipart/form-data; boundary=...` 时，JSON parser 不会把文件变成 `request.body.file`。后续 Busboy 必须直接读取原始 request stream，因为文件 bytes 仍在 stream 里，而不是已经被 Express 解析成对象属性。

**常见错误**：在 upload route 里写 `request.body.file`。这个错误违反了 Express parser 的 media-type 边界，也会隐藏一个更严重的问题：即使有 parser 帮你生成对象，也不应该把大文件完整缓冲到内存。

**与真实项目的关系**：最终项目保留 `express.json({ limit: "1mb" })` 处理普通 JSON route，但 upload route 把 multipart request 交给 Busboy。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/01-multipart-basics/content-type-check.ts</span>
  </div>

```ts
export function isMultipartRequest(contentType: string | undefined): boolean {
  return contentType?.toLowerCase().startsWith("multipart/form-data;") === true &&
    contentType.toLowerCase().includes("boundary=");
}

console.log(isMultipartRequest("multipart/form-data; boundary=abc123"));
console.log(isMultipartRequest("application/json"));
```
</div>

<a id="93-busboy-parser-modelrequest-stream-field-event-file-event"></a>
### 9.3 Busboy parser model：request stream → field event → file event

Busboy 的关键不是“把上传变成一个对象”，而是把请求流拆成事件。文本字段和文件字段按网络到达顺序出现，不能假设字段先于文件。

**机制说明**：Busboy 是 streaming parser。它接收 `request.headers` 和 request stream，根据 multipart boundary 识别一个个 part；普通字段触发 `field` event，文件字段触发 `file` event。`file` event 给出的第二个参数是 readable stream，不是完整 `Buffer`，所以你必须消费它、pipe 它或 `resume()` 丢弃它。

**执行过程**：字段和文件按网络 body 的实际顺序到达。攻击者可以让 file part 先出现、field part 后出现，因此 field order 不能作为安全边界；owner authorization、file count、field name、size limit 必须由服务端规则判断，不能靠“表单顺序看起来正常”。

**常见错误**：假设所有 text fields 一定先于 file event，或者在 `file` event 中等待一个还没到达的 field 决定是否继续写入。这个错误会让上传处理依赖客户端可控制的 part 顺序。

**与真实项目的关系**：最终项目只接受一个字段名为 `file` 的文件 stream；其他业务归属来自 URL 中的 `noteId` 和认证上下文，不依赖 multipart field 顺序。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/01-multipart-basics/busboy-file-event.ts</span>
  </div>

```ts
import Busboy from "busboy";
import { Readable } from "node:stream";

const boundary = "demo-boundary";
const body = [
  `--${boundary}`,
  `Content-Disposition: form-data; name="title"`,
  "",
  "avatar",
  `--${boundary}`,
  `Content-Disposition: form-data; name="file"; filename="avatar.png"`,
  "Content-Type: image/png",
  "",
  "png-bytes",
  `--${boundary}--`,
  ""
].join("\r\n");

const parser = Busboy({
  headers: {
    "content-type": `multipart/form-data; boundary=${boundary}`
  }
});

parser.on("field", (name, value) => {
  console.log({ event: "field", name, value });
});

parser.on("file", (name, file, info) => {
  const chunks: Buffer[] = [];
  file.on("data", (chunk: Buffer) => chunks.push(chunk));
  file.on("end", () => {
    console.log({
      event: "file",
      name,
      filename: info.filename,
      mimeType: info.mimeType,
      bytes: Buffer.concat(chunks).length
    });
  });
});

Readable.from(Buffer.from(body)).pipe(parser);
```
</div>

<a id="94-upload-limitsfilesizefilesfieldsparts"></a>
### 9.4 Upload limits：fileSize、files、fields、parts

上传限制必须放在 parser 层。否则服务端可能在业务校验之前就已经读取了过多字节或过多 part。

**机制说明**：Busboy 的 `limits` 是 parser 层控制点。`fileSize` 限制单个文件 bytes，`files` 限制 file part 数量，`fields` 限制非文件字段数量，`parts` 限制总 part 数量，`headerPairs` 限制每个 part 可解析的 header 键值对数量。这些限制发生在业务 service 之前，可以尽早停止不可接受的输入规模。

**底层机制**：当 `fileSize` 到达上限时，file stream 会触发 `limit` event，并在结束后带有 `truncated` 状态。只在 app-level validation 里检查大小太晚，因为此时服务端可能已经读入或写入了过多 bytes。

**常见错误**：只在文件落盘后用 `stat()` 检查大小。这个错误不能阻止大请求占用 socket、parser、临时文件和磁盘写入资源。

**与真实项目的关系**：最终项目把 `fileSize`、`files`、`fields`、`parts` 和 `headerPairs` 放在 `upload-limits.ts`，并在 `multipart-parser.ts` 中处理 limit events 和 truncated file。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/01-multipart-basics/busboy-limits.ts</span>
  </div>

```ts
import Busboy from "busboy";
import { Readable } from "node:stream";

const boundary = "limit-boundary";
const body = [
  `--${boundary}`,
  `Content-Disposition: form-data; name="file"; filename="large.bin"`,
  "Content-Type: application/octet-stream",
  "",
  "abcdef",
  `--${boundary}--`,
  ""
].join("\r\n");

const parser = Busboy({
  headers: {
    "content-type": `multipart/form-data; boundary=${boundary}`
  },
  limits: {
    fileSize: 3,
    files: 1,
    fields: 2,
    parts: 3
  }
});

parser.on("file", (_name, file) => {
  file.on("limit", () => console.log("fileSize limit reached"));
  file.resume();
});

parser.on("filesLimit", () => console.log("files limit reached"));
parser.on("fieldsLimit", () => console.log("fields limit reached"));
parser.on("partsLimit", () => console.log("parts limit reached"));
parser.on("finish", () => console.log("parser finished"));

Readable.from(Buffer.from(body)).pipe(parser);
```
</div>

<a id="95-stream-backpressure-and-pipeline"></a>
### 9.5 Stream backpressure and `pipeline`

`pipeline` 把 readable、transform、writable 连接成一个可等待的完成边界；当任一流失败，错误会传播，调用方才能清理临时文件。

**机制说明**：上传 file stream 是 readable，临时文件 write stream 是 writable。readable 推出 chunks，writable 根据内部缓冲和 high-water mark 表达接收能力；当 writable 跟不上时，backpressure 会让上游暂停或减速。`pipeline()` 把 readable、transform、writable 连接成一个 completion boundary。

**错误传播**：手写 `file.on("data")` 并把 chunks push 到数组，会绕开 backpressure、放大内存风险，还容易漏掉 `error`、`close`、`abort`。`pipeline()` 会在任一 stream 出错时 reject，让调用方进入 cleanup 分支。

**常见错误**：为了“简单”把整个文件读成 `Buffer.concat(chunks)`。这个错误在小样例里能跑，在真实上传里会把内存变成攻击面。

**与真实项目的关系**：最终项目用 `pipeline(uploadStream, meter, createWriteStream(tempPath))` 连接上传流、计量/hash transform 和临时文件写入。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/02-streaming-files/pipeline-to-temp-file.ts</span>
  </div>

```ts
import { createReadStream, createWriteStream } from "node:fs";
import { mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const directory = await mkdtemp(path.join(tmpdir(), "upload-pipeline-"));
const source = path.join(directory, "source.bin");
const target = path.join(directory, "temp-upload.bin");

await writeFile(source, Buffer.alloc(1024, 7));
await pipeline(createReadStream(source), createWriteStream(target));

console.log((await stat(target)).size);
await rm(directory, { recursive: true, force: true });
```
</div>

<a id="96-temporary-files-and-cleanup-responsibility"></a>
### 9.6 Temporary files and cleanup responsibility

临时文件属于服务端责任。任何 validation、storage、Prisma、request abort 失败，都不能留下无限增长的 temp 文件。

**机制说明**：temp file 是“尚未成为正式对象”的隔离区。上传开始后，Busboy file stream 通过 `pipeline` 写入 `TEMP_UPLOAD_DIR`；只有 size、extension、declared MIME、magic number、hash、owner 和 storage copy 都通过后，文件才会进入 object store root。

**生命周期**：validation failure、stream error、request abort、Busboy limit、Prisma metadata insert failure 都要进入 cleanup。临时文件不是缓存，也不是最终存储；它的存在时间应该只覆盖本次 upload transaction-like workflow。

**常见错误**：把 temp path 直接写进数据库，或 validation 失败后只返回错误不删除文件。前者会把不可信文件提升为正式对象，后者会造成磁盘泄漏。

**与真实项目的关系**：最终项目的 `removeTempFile()` 在 parser failure 和 service `finally` 分支里都被调用，保证失败和成功路径都清理 temp file。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/02-streaming-files/cleanup-on-error.ts</span>
  </div>

```ts
import { createWriteStream } from "node:fs";
import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const directory = await mkdtemp(path.join(tmpdir(), "upload-cleanup-"));
const target = path.join(directory, "failed.tmp");

const failAfterFirstChunk = new Transform({
  transform(chunk: Buffer, _encoding, callback) {
    callback(null, chunk);
    this.destroy(new Error("simulated stream failure"));
  }
});

try {
  await pipeline(Readable.from([Buffer.from("abc"), Buffer.from("def")]), failAfterFirstChunk, createWriteStream(target));
} catch (error) {
  await rm(target, { force: true });
  console.log(error instanceof Error ? error.message : "unknown error");
}

await stat(target).catch((error: NodeJS.ErrnoException) => console.log(error.code));
await rm(directory, { recursive: true, force: true });
```
</div>

<a id="97-hashing-uploaded-bytes-with-cryptocreatehash"></a>
### 9.7 Hashing uploaded bytes with `crypto.createHash`

哈希必须来自上传字节，而不是文件名、Content-Type 或客户端声明。`sha256` 可用于完整性记录和下载 ETag。

**机制说明**：`crypto.createHash("sha256")` 接收的是真实 bytes。哈希值不能来自 original filename、declared MIME、扩展名或客户端提交的字段，因为这些值都可以被伪造。对上传 bytes 做 hash 后，metadata 里的 `sha256` 才能表达对象内容身份。

**两种时机**：可以在 streaming transform 中边写 temp file 边 hash，也可以 temp file 写完后重新 read stream hash。前者节省一次读取，后者实现更直观；两者的共同规则是 hash 输入必须是文件 bytes。

**常见错误**：把 `filename + size` 当作完整性标识。两个不同文件可以同名同大小，攻击者也能控制 filename。

**与真实项目的关系**：最终项目在 multipart parser 的 transform 中累加 `sha256`，下载时用它生成 `ETag`，metadata 中也保存同一个 hash。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/02-streaming-files/hash-while-streaming.ts</span>
  </div>

```ts
import { createHash } from "node:crypto";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const hash = createHash("sha256");
const hashing = new Transform({
  transform(chunk: Buffer, _encoding, callback) {
    hash.update(chunk);
    callback(null, chunk);
  }
});

await pipeline(Readable.from([Buffer.from("file bytes")]), hashing);
console.log(hash.digest("hex"));
```
</div>

<a id="98-file-validationextensionmime-headermagic-number"></a>
### 9.8 File validation：extension、MIME header、magic number

扩展名和声明 MIME 是用户可控 metadata，只能作为第一层 allowlist。magic number 检查读取真实字节，但也有格式支持范围。

**机制说明**：文件类型校验有三层信号：extension allowlist、declared MIME、magic number。extension 来自 filename，declared MIME 来自 multipart part 的 `Content-Type`，两者都由客户端控制；magic number 来自文件头 bytes，可信度更高，但它只是格式识别，不是 malware scanner。

**格式边界**：最终项目聚焦 PNG、JPEG、PDF，因为这些格式能被 `file-type` 从 magic number 中检测出来。plain text 没有稳定的二进制 signature，可以作为边界讨论，但不进入本章最终项目的 allowlist。

**常见错误**：只检查 `.png` 后缀或 `image/png` header。这个错误违反 OWASP 的 defense-in-depth 思路：单一信号不足以证明上传内容安全。

**与真实项目的关系**：最终项目先从 original name 得到 extension，再用 `fileTypeFromFile()` 检测 bytes，最后要求 extension 与 detected MIME 匹配。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/03-file-validation/magic-number-validation.ts</span>
  </div>

```ts
import { fileTypeFromBuffer } from "file-type";

const pngSignature = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52
]);

const detected = await fileTypeFromBuffer(pngSignature);
console.log(detected);
```
</div>

<a id="99-user-filename-safetymetadata-not-storage-path"></a>
### 9.9 User filename safety：metadata, not storage path

用户文件名可以保存为展示 metadata，但不能拼接进磁盘路径。路径由服务端生成的 storage key 决定。

**机制说明**：original filename 是展示 metadata，不是 filesystem path。服务端可以保存它用于列表和下载 filename，但必须先做 basename 提取、Unicode normalization、字符替换和长度限制，避免路径分隔符、控制字符、过长字符串和 header injection。

**路径边界**：即使清洗后的 filename 看起来安全，也不应该决定 storage path。路径属于服务端对象存储层，应该由 owner、note、随机 attachment id 和 extension 生成。

**常见错误**：直接 `path.join(storageRoot, info.filename)`。这个错误让客户端输入参与路径解析，可能造成覆盖、逃逸或不可预测的文件名冲突。

**与真实项目的关系**：最终项目用 `safeOriginalName()` 生成 display metadata，用 `createStorageKey()` 生成真正的 object key。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/03-file-validation/filename-safety.ts</span>
  </div>

```ts
import path from "node:path";

export function safeOriginalName(rawName: string | undefined): string {
  const basename = path.basename(rawName ?? "upload.bin").normalize("NFC");
  const sanitized = basename.replace(/[^A-Za-z0-9._ -]/g, "_").slice(0, 160);
  return sanitized.length > 0 ? sanitized : "upload.bin";
}

console.log(safeOriginalName("../../secret.txt"));
console.log(safeOriginalName("résumé.pdf"));
```
</div>

<a id="910-storage-key-generationrandom-id-extension-owner-boundary"></a>
### 9.10 Storage key generation：random id, extension, owner boundary

storage key 要表达服务端对象归属边界：owner、note、attachment 随机 id、扩展名。随机 id 避免撞名和路径猜测。

**机制说明**：storage key 是服务端内部对象标识。它把 owner id、note id、attachments 目录、随机 id 和扩展名组合起来，表达“这个对象归属于哪个用户和哪条 note”。随机 id 避免用户通过文件名猜测、覆盖或枚举对象。

**公开边界**：storage key 是 internal metadata，不是 public URL。API response 可以返回 `downloadUrl` 这种受控 endpoint，但不能把 storage key 当作静态资源地址，也不应该暴露 filesystem absolute path。

**常见错误**：把 original filename 当 storage key，或者把 storage key 直接暴露给客户端作为访问路径。前者让用户控制对象名，后者容易把内部存储布局泄漏给外部。

**与真实项目的关系**：最终项目的 `createStorageKey()` 生成 `owners/{ownerId}/notes/{noteId}/attachments/{uuid}{extension}`，repository 的 DTO 不返回 `storageKey`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/04-storage-boundary/storage-key-generation.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";

export function createStorageKey(ownerId: string, noteId: string, extension: string): string {
  return `owners/${ownerId}/notes/${noteId}/attachments/${randomUUID()}${extension}`;
}

console.log(createStorageKey("owner-1", "note-1", ".png"));
```
</div>

<a id="911-safe-local-storage-pathroot-containment-and-traversal-defense"></a>
### 9.11 Safe local storage path：root containment and traversal defense

安全路径不是简单判断 absolute path。必须先固定 root，再用 `path.resolve` 和 `path.relative` 验证 candidate 没有逃逸 root。

**机制说明**：safe local path 的目标是 root containment：所有对象路径都必须留在 `STORAGE_ROOT` 下面。正确做法是先 `path.resolve(root)` 得到固定 root，再 `path.resolve(root, storageKey)` 得到 candidate，最后用 `path.relative(root, candidate)` 判断 candidate 是否逃出 root。

**攻击模型**：只检查 raw string 里有没有 `".."` 不够。攻击者可以利用分隔符差异、绝对路径、编码/规范化差异或组合路径绕过字符串检查。路径安全判断必须在操作系统路径语义下完成。

**常见错误**：用 `storageKey.includes("..")` 当安全检查。这个错误把字符串模式误认为 path resolution。

**与真实项目的关系**：最终项目所有本地 object-store 操作都通过 `resolveStoragePath()`，不让 service 直接拼接绝对路径。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/04-storage-boundary/safe-storage-path.ts</span>
  </div>

```ts
import path from "node:path";

export function resolveSafeStoragePath(root: string, storageKey: string): string {
  const rootPath = path.resolve(root);
  const candidate = path.resolve(rootPath, storageKey);
  const relative = path.relative(rootPath, candidate);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Storage key escapes the storage root");
  }

  return candidate;
}

console.log(resolveSafeStoragePath("./storage", "owners/u1/file.png"));
try {
  console.log(resolveSafeStoragePath("./storage", "../secret.txt"));
} catch (error) {
  console.log(error instanceof Error ? error.message : "unknown error");
}
```
</div>

<a id="912-object-store-adapter-boundarylocal-filesystem-now-cloud-later"></a>
### 9.12 Object-store adapter boundary：local filesystem now, cloud later

object-store adapter 把业务层和本地 filesystem 隔开。本章实现 local adapter，未来替换云对象存储时不改变 controller/service 主流程。

**机制说明**：object-store adapter 把业务 service 和具体存储实现隔开。接口只暴露 `putFile`、`createReadStream`、`stat`、`deleteFile`：上传复制对象，下载打开 readable stream，响应前读取大小/mtime，删除时清理对象。

**替换边界**：本章 local filesystem adapter 是学习用 object store。未来替换云对象存储时，service 的主流程仍然是 validate → key → put → metadata → download；变化应该集中在 adapter 实现，而不是 controller 和 authorization 逻辑。

**常见错误**：让 controller 直接调用 `fs.createReadStream(path.join(...))`。这个错误把 HTTP 层、路径安全层和存储实现耦合在一起。

**与真实项目的关系**：最终项目的 attachment service 只依赖 `objectStore` 能力，不需要知道对象最终来自本地磁盘还是未来远端存储。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/04-storage-boundary/local-object-store.ts</span>
  </div>

```ts
import { createReadStream } from "node:fs";
import { copyFile, mkdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

type StoredObject = {
  storageKey: string;
  byteSize: number;
};

class LocalObjectStore {
  constructor(private readonly root: string) {}

  async putFile(sourcePath: string, storageKey: string): Promise<StoredObject> {
    const targetPath = path.resolve(this.root, storageKey);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    return { storageKey, byteSize: (await stat(targetPath)).size };
  }

  createReadStream(storageKey: string) {
    return createReadStream(path.resolve(this.root, storageKey));
  }
}

const root = path.join(tmpdir(), "local-object-store-demo");
const source = path.join(root, "source.bin");
await mkdir(root, { recursive: true });
await writeFile(source, Buffer.from("stored bytes"));

const store = new LocalObjectStore(root);
console.log(await store.putFile(source, "owners/u1/file.bin"));
store.createReadStream("owners/u1/file.bin").destroy();
await rm(root, { recursive: true, force: true });
```
</div>

<a id="913-postgresql-attachment-metadata"></a>
### 9.13 PostgreSQL attachment metadata

PostgreSQL 保存 attachment metadata：owner、note、原始名、storage key、MIME、大小、hash、状态。真实字节留在对象存储层。

**机制说明**：PostgreSQL 适合保存 attachment metadata：`ownerId`、`noteId`、`originalName`、`storedName`、`storageKey`、declared MIME、detected MIME、extension、byte size、sha256、status 和 timestamps。这些字段支持权限判断、列表、下载 headers、删除状态和审计。

**数据边界**：普通 CRUD row 不适合保存大文件 bytes。把 bytes 放进常规业务表会放大数据库体积、备份成本、查询压力和事务锁影响。数据库记录“文件是什么、属于谁、在哪里”，对象存储保存“文件 bytes”。

**常见错误**：把 absolute storage path 返回给 API client。这个错误泄漏服务器目录结构，也让客户端误以为可以绕过 controlled download。

**与真实项目的关系**：最终项目的 `Attachment` relation 同时连到 owner 和 note；DTO 返回 metadata 与 download endpoint，不返回 internal path 或 storage key。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.repository.ts</span>
  </div>

```ts
import { AttachmentStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../db/prisma.js";
import type { AttachmentDto, AttachmentRecord } from "./attachments.types.js";

export function toAttachmentDto(attachment: AttachmentRecord): AttachmentDto {
  return {
    id: attachment.id,
    noteId: attachment.noteId,
    originalName: attachment.originalName,
    storedName: attachment.storedName,
    mimeType: attachment.mimeType,
    detectedMimeType: attachment.detectedMimeType,
    extension: attachment.extension,
    byteSize: Number(attachment.byteSize),
    sha256: attachment.sha256,
    status: attachment.status,
    createdAt: attachment.createdAt.toISOString(),
    updatedAt: attachment.updatedAt.toISOString(),
    deletedAt: attachment.deletedAt?.toISOString() ?? null,
    downloadUrl: attachment.status === AttachmentStatus.READY ? `/attachments/${attachment.id}/download` : null
  };
}

export async function createAttachmentMetadata(input: {
  ownerId: string;
  noteId: string;
  originalName: string;
  storedName: string;
  storageKey: string;
  mimeType: string;
  detectedMimeType: string;
  extension: string;
  byteSize: number;
  sha256: string;
}): Promise<AttachmentRecord> {
  return prisma.attachment.create({
    data: {
      ...input,
      byteSize: BigInt(input.byteSize)
    }
  });
}

export async function listReadyAttachments(input: { ownerId: string; noteId: string }): Promise<AttachmentRecord[]> {
  return prisma.attachment.findMany({
    where: {
      ownerId: input.ownerId,
      noteId: input.noteId,
      status: AttachmentStatus.READY
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function findAttachmentById(id: string): Promise<AttachmentRecord | null> {
  return prisma.attachment.findUnique({ where: { id } });
}

export async function softDeleteAttachment(id: string): Promise<AttachmentRecord> {
  return prisma.attachment.update({
    where: { id },
    data: {
      status: AttachmentStatus.DELETED,
      deletedAt: new Date()
    }
  });
}
```
</div>

<a id="914-metadata-and-file-write-consistencywhy-this-is-not-one-transaction"></a>
### 9.14 Metadata and file write consistency：why this is not one transaction

数据库事务不能包住 filesystem copy。复制对象成功但 metadata 写失败时，需要补偿删除对象；metadata 成功但删除对象失败时，需要后续清理策略。

**机制说明**：filesystem write 和 database write 不属于同一个 atomic transaction。PostgreSQL 可以回滚 metadata insert，但不能自动回滚已经复制到 storage root 的 object；同样，metadata 已经写入后，如果 object deletion 失败，数据库也不会自动知道磁盘状态。

**补偿策略**：上传流程先 copy object，再 insert metadata；如果 insert 失败，就删除刚复制的 object。删除流程先把 metadata 标成 `DELETED`，再删除 object；如果 object deletion 失败，需要后续 orphan cleanup 或人工检查。

**常见错误**：把 `await prisma.$transaction(...)` 当成 filesystem copy 的保护伞。这个错误混淆了数据库事务和操作系统文件副作用。

**与真实项目的关系**：最终项目在 service catch 分支删除已复制对象，在 finally 分支删除 temp file，并把 orphan cleanup 作为未来策略边界。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/04-storage-boundary/metadata-file-consistency.ts</span>
  </div>

```ts
type UploadStep = "write-temp" | "validate" | "copy-object" | "insert-metadata" | "cleanup-temp";

const compensationPolicy: Record<UploadStep, string> = {
  "write-temp": "remove temp file",
  validate: "remove temp file",
  "copy-object": "delete copied object if metadata insert fails",
  "insert-metadata": "record READY attachment after copy succeeds",
  "cleanup-temp": "ignore missing temp file"
};

console.log(compensationPolicy);

export {};
```
</div>

<a id="915-note-owner-authorization-for-attachments"></a>
### 9.15 Note owner authorization for attachments

附件属于 note 的 owner。上传前先确认 note owner，避免攻击者把文件挂到别人的 note 上。

**机制说明**：附件权限来自 note ownership。上传时，服务端必须先用 authenticated user 和 `noteId` 查询 note owner，再决定是否继续最终化上传；否则攻击者可以把文件挂到别人的 note 上。metadata、download、delete 也要验证 attachment owner。

**CSRF 边界**：CSRF 保护的是 cookie-authenticated 的 state-changing request。`POST /notes/:noteId/attachments` 会创建对象和 metadata，`DELETE /attachments/:attachmentId` 会修改状态并删除对象，因此需要 CSRF。`GET /attachments/:attachmentId` 和 `GET /attachments/:attachmentId/download` 仍然需要 authentication 和 owner authorization，但本章学习项目中它们不改变服务器状态，所以不放 CSRF middleware。

**常见错误**：把“已登录”当成“拥有这个 note”。认证只回答用户是谁，授权才回答这个资源是否属于该用户。

**与真实项目的关系**：最终项目把 `authenticateSession` 放在 app-level route mount，把 CSRF 放在 upload/delete route-level middleware，把 owner check 放在 service 层。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.service.ts</span>
  </div>

```ts
import type { Request } from "express";
import type { Readable } from "node:stream";
import { HttpError } from "../../shared/errors/http-error.js";
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { objectStore } from "../../storage/local-object-store.js";
import { createStorageKey, storedNameFromStorageKey } from "../../storage/storage-key.js";
import { removeTempFile } from "../../storage/temp-files.js";
import { parseMultipartUpload } from "../../uploads/multipart-parser.js";
import { validateUploadedFile } from "../../uploads/file-validation.js";
import { contentDispositionAttachment } from "../../uploads/filename.js";
import * as notesService from "../notes/notes.service.js";
import * as repository from "./attachments.repository.js";
import type { AttachmentDto } from "./attachments.types.js";

export async function upload(auth: AuthContext, noteId: string, request: Request): Promise<AttachmentDto> {
  await notesService.requireOwnedNote(auth, noteId);
  const parsed = await parseMultipartUpload(request);
  let storageKey: string | undefined;

  try {
    const validatedFile = await validateUploadedFile(parsed.file);
    storageKey = createStorageKey({
      ownerId: auth.userId,
      noteId,
      extension: validatedFile.extension
    });

    const storedObject = await objectStore.putFile({
      sourcePath: validatedFile.tempPath,
      storageKey
    });

    const attachment = await repository.createAttachmentMetadata({
      ownerId: auth.userId,
      noteId,
      originalName: validatedFile.originalName,
      storedName: storedNameFromStorageKey(storageKey),
      storageKey,
      mimeType: validatedFile.declaredMimeType,
      detectedMimeType: validatedFile.detectedMimeType,
      extension: validatedFile.extension,
      byteSize: storedObject.byteSize,
      sha256: validatedFile.sha256
    });

    return repository.toAttachmentDto(attachment);
  } catch (error) {
    if (storageKey) {
      await objectStore.deleteFile(storageKey);
    }
    throw error;
  } finally {
    await removeTempFile(parsed.file.tempPath);
  }
}

export async function listForNote(auth: AuthContext, noteId: string): Promise<AttachmentDto[]> {
  await notesService.requireOwnedNote(auth, noteId);
  const attachments = await repository.listReadyAttachments({
    ownerId: auth.userId,
    noteId
  });
  return attachments.map(repository.toAttachmentDto);
}

export async function getById(auth: AuthContext, attachmentId: string): Promise<AttachmentDto> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  return repository.toAttachmentDto(attachment);
}

export async function openDownload(auth: AuthContext, attachmentId: string): Promise<{
  stream: Readable;
  headers: Record<string, string>;
}> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  const stat = await objectStore.stat(attachment.storageKey);
  const stream = objectStore.createReadStream(attachment.storageKey);

  return {
    stream,
    headers: {
      "Content-Type": attachment.detectedMimeType,
      "Content-Length": String(stat.byteSize),
      "Content-Disposition": contentDispositionAttachment(attachment.originalName),
      "ETag": `"sha256-${attachment.sha256}"`,
      "X-Content-Type-Options": "nosniff"
    }
  };
}

export async function removeById(auth: AuthContext, attachmentId: string): Promise<void> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  await repository.softDeleteAttachment(attachment.id);
  await objectStore.deleteFile(attachment.storageKey);
}

async function requireReadyAttachment(auth: AuthContext, attachmentId: string) {
  const attachment = await repository.findAttachmentById(attachmentId);
  if (!attachment || attachment.status !== "READY") {
    throw new HttpError(404, "Attachment was not found.", "ATTACHMENT_NOT_FOUND");
  }

  authorizeOwner(auth, attachment.ownerId);
  return attachment;
}
```
</div>

<a id="916-controlled-downloadauth-before-bytes"></a>
### 9.16 Controlled download：auth before bytes

受控下载的核心是先授权再打开 stream。不要先创建文件流、再发现用户无权访问。

**机制说明**：controlled download 的顺序是先查 metadata 并做 owner authorization，再打开 object stream。这样无权用户不会触发 filesystem read，也不会让错误处理路径在已经打开私有文件之后才发现权限失败。

**Express 错误流**：下载可能在 headers 或 body 已经开始发送后失败。Express custom error middleware 有四个参数；如果 `response.headersSent` 已经为 true，就不能再安全写 JSON error body，必须 `next(error)` 委托给 Express 默认错误处理。这个规则对 streaming download 特别重要。

**常见错误**：用 `express.static` 暴露 uploads 目录。static route 不知道业务 owner，也不会在每次下载前执行 attachment authorization。

**与真实项目的关系**：最终项目的 `openDownload()` 在创建 read stream 前调用 `requireReadyAttachment()`；`errorMiddleware` 在 headers sent 后调用 `next(error)`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.service.ts</span>
  </div>

```ts
import type { Request } from "express";
import type { Readable } from "node:stream";
import { HttpError } from "../../shared/errors/http-error.js";
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { objectStore } from "../../storage/local-object-store.js";
import { createStorageKey, storedNameFromStorageKey } from "../../storage/storage-key.js";
import { removeTempFile } from "../../storage/temp-files.js";
import { parseMultipartUpload } from "../../uploads/multipart-parser.js";
import { validateUploadedFile } from "../../uploads/file-validation.js";
import { contentDispositionAttachment } from "../../uploads/filename.js";
import * as notesService from "../notes/notes.service.js";
import * as repository from "./attachments.repository.js";
import type { AttachmentDto } from "./attachments.types.js";

export async function upload(auth: AuthContext, noteId: string, request: Request): Promise<AttachmentDto> {
  await notesService.requireOwnedNote(auth, noteId);
  const parsed = await parseMultipartUpload(request);
  let storageKey: string | undefined;

  try {
    const validatedFile = await validateUploadedFile(parsed.file);
    storageKey = createStorageKey({
      ownerId: auth.userId,
      noteId,
      extension: validatedFile.extension
    });

    const storedObject = await objectStore.putFile({
      sourcePath: validatedFile.tempPath,
      storageKey
    });

    const attachment = await repository.createAttachmentMetadata({
      ownerId: auth.userId,
      noteId,
      originalName: validatedFile.originalName,
      storedName: storedNameFromStorageKey(storageKey),
      storageKey,
      mimeType: validatedFile.declaredMimeType,
      detectedMimeType: validatedFile.detectedMimeType,
      extension: validatedFile.extension,
      byteSize: storedObject.byteSize,
      sha256: validatedFile.sha256
    });

    return repository.toAttachmentDto(attachment);
  } catch (error) {
    if (storageKey) {
      await objectStore.deleteFile(storageKey);
    }
    throw error;
  } finally {
    await removeTempFile(parsed.file.tempPath);
  }
}

export async function listForNote(auth: AuthContext, noteId: string): Promise<AttachmentDto[]> {
  await notesService.requireOwnedNote(auth, noteId);
  const attachments = await repository.listReadyAttachments({
    ownerId: auth.userId,
    noteId
  });
  return attachments.map(repository.toAttachmentDto);
}

export async function getById(auth: AuthContext, attachmentId: string): Promise<AttachmentDto> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  return repository.toAttachmentDto(attachment);
}

export async function openDownload(auth: AuthContext, attachmentId: string): Promise<{
  stream: Readable;
  headers: Record<string, string>;
}> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  const stat = await objectStore.stat(attachment.storageKey);
  const stream = objectStore.createReadStream(attachment.storageKey);

  return {
    stream,
    headers: {
      "Content-Type": attachment.detectedMimeType,
      "Content-Length": String(stat.byteSize),
      "Content-Disposition": contentDispositionAttachment(attachment.originalName),
      "ETag": `"sha256-${attachment.sha256}"`,
      "X-Content-Type-Options": "nosniff"
    }
  };
}

export async function removeById(auth: AuthContext, attachmentId: string): Promise<void> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  await repository.softDeleteAttachment(attachment.id);
  await objectStore.deleteFile(attachment.storageKey);
}

async function requireReadyAttachment(auth: AuthContext, attachmentId: string) {
  const attachment = await repository.findAttachmentById(attachmentId);
  if (!attachment || attachment.status !== "READY") {
    throw new HttpError(404, "Attachment was not found.", "ATTACHMENT_NOT_FOUND");
  }

  authorizeOwner(auth, attachment.ownerId);
  return attachment;
}
```
</div>

<a id="917-download-headerscontent-typecontent-dispositionetagnosniff"></a>
### 9.17 Download headers：Content-Type、Content-Disposition、ETag、nosniff

下载 headers 决定浏览器如何处理字节。`nosniff`、`Content-Disposition`、`ETag` 和准确 MIME 都属于下载安全边界的一部分。

**机制说明**：download headers 把 metadata 转成浏览器可执行的响应规则。`Content-Type` 应该使用检测后的 MIME，`Content-Length` 来自 object stat，`Content-Disposition` 使用安全 filename 让浏览器按 attachment 下载，`ETag` 可以基于 sha256 表示内容身份，`X-Content-Type-Options: nosniff` 要求浏览器不要把响应猜成另一种类型。

**文件名边界**：`Content-Disposition` 里的 filename 也来自用户可控 original name，所以要使用 fallback filename 和 encoded filename，避免分隔符、引号和非 ASCII 字符破坏 header 结构。

**常见错误**：把 declared MIME 原样作为下载 `Content-Type`，或省略 `nosniff`。前者让客户端声明影响下载解释，后者给浏览器 MIME sniffing 留空间。

**与真实项目的关系**：最终项目在 service 中集中生成下载 headers，controller 只负责 `response.set(headers)` 和 `pipeline(stream, response)`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.controller.ts</span>
  </div>

```ts
import { pipeline } from "node:stream/promises";
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./attachments.service.js";

export const upload: RequestHandler = async (request, response, next) => {
  try {
    const attachment = await service.upload(requireAuthContext(response), routeParam(request.params.noteId), request);
    sendResponse(response, 201, attachment);
  } catch (error) {
    next(error);
  }
};

export const listForNote: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.listForNote(requireAuthContext(response), routeParam(request.params.noteId)));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.getById(requireAuthContext(response), routeParam(request.params.attachmentId)));
  } catch (error) {
    next(error);
  }
};

export const download: RequestHandler = async (request, response, next) => {
  try {
    const result = await service.openDownload(requireAuthContext(response), routeParam(request.params.attachmentId));
    response.set(result.headers);
    await pipeline(result.stream, response);
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    await service.removeById(requireAuthContext(response), routeParam(request.params.attachmentId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

<a id="918-soft-delete-and-object-cleanup-policy"></a>
### 9.18 Soft delete and object cleanup policy

删除附件通常先软删 metadata，再删除对象。这样审计和恢复策略有入口，也能记录删除时间。

**机制说明**：soft delete 是 metadata state transition：`READY` 变成 `DELETED`，并记录 `deletedAt`。object cleanup 是存储层动作：删除、隔离或延迟清理 bytes。二者相关但不是同一个操作。

**审计与清理**：metadata 的 `DELETED` 状态让 API 能在删除后返回 not found，同时保留审计入口；object 删除释放磁盘空间。如果 object 删除失败，metadata 仍能阻止后续 download，但需要 cleanup policy 处理残留对象。

**常见错误**：只删除数据库记录，不处理对象；或只删除对象，不改 metadata。前者产生 orphan object，后者产生指向缺失对象的 ready metadata。

**与真实项目的关系**：最终项目先 `softDeleteAttachment()`，再 `objectStore.deleteFile()`；删除后的 metadata/download 查询只接受 `READY` 状态。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/08-file-upload-storage/05-download-boundary/soft-delete-boundary.ts</span>
  </div>

```ts
type AttachmentState = {
  status: "READY" | "DELETED";
  deletedAt: Date | null;
  storageKey: string;
};

export function markDeleted(attachment: AttachmentState, now: Date): AttachmentState {
  return {
    ...attachment,
    status: "DELETED",
    deletedAt: now
  };
}

console.log(markDeleted({
  status: "READY",
  deletedAt: null,
  storageKey: "owners/u1/notes/n1/attachments/file.pdf"
}, new Date("2026-01-01T00:00:00.000Z")));
```
</div>

<a id="919-upload-abort-stream-error-truncated-file-and-cleanup"></a>
### 9.19 Upload abort, stream error, truncated file, and cleanup

上传失败不是单一错误。request abort、stream error、Busboy limit、file truncation、validation failure 都必须进入 cleanup。

**机制说明**：上传失败至少有四类：request aborted 表示客户端连接提前断开；stream error 表示 readable、transform 或 writable 之一失败；parser limit 表示 Busboy 的 size/parts/files/fields/headerPairs 规则被触发；validation failure 表示文件落到 temp 后不符合 extension/MIME/magic-number 规则。

**cleanup 中心化**：这些失败进入不同事件或 Promise reject，但清理目标一致：停止继续写入、删除 temp file、必要时删除已经复制的 object、返回合适 HTTP error。cleanup 不能散落在 happy path 后面。

**常见错误**：只处理 validation error，不处理 `request.on("aborted")` 或 `pipeline()` reject。这个错误会在真实网络断连和磁盘错误时留下临时文件。

**与真实项目的关系**：最终项目在 parser 的 `fail()` 分支清理 temp paths，在 service 的 catch/finally 里清理 object 和 temp file。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/multipart-parser.ts</span>
  </div>

```ts
import { createWriteStream } from "node:fs";
import { createHash } from "node:crypto";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import Busboy from "busboy";
import type { Request } from "express";
import { HttpError } from "../shared/errors/http-error.js";
import { createTempUploadPath, ensureUploadDirectories, removeTempFile } from "../storage/temp-files.js";
import { safeOriginalName } from "./filename.js";
import { uploadLimits } from "./upload-limits.js";
import type { ParsedMultipartUpload, ParsedUploadFile } from "./upload-types.js";

type BusboyFileStream = NodeJS.ReadableStream & {
  truncated?: boolean;
  resume(): void;
  on(event: "limit", listener: () => void): BusboyFileStream;
};

export async function parseMultipartUpload(request: Request): Promise<ParsedMultipartUpload> {
  await ensureUploadDirectories();

  const contentType = request.headers["content-type"];
  if (typeof contentType !== "string" || !contentType.toLowerCase().startsWith("multipart/form-data;") || !contentType.toLowerCase().includes("boundary=")) {
    throw new HttpError(415, "Request must use multipart/form-data with a boundary.", "MULTIPART_REQUIRED");
  }

  return new Promise((resolve, reject) => {
    const tempPaths: string[] = [];
    const fields: Record<string, string> = {};
    let parsedFile: ParsedUploadFile | undefined;
    let writeTask: Promise<void> | undefined;
    let settled = false;
    let fileCount = 0;

    const fail = (error: unknown): void => {
      if (settled) {
        return;
      }
      settled = true;
      for (const tempPath of tempPaths) {
        void removeTempFile(tempPath);
      }
      reject(error);
    };

    const parser = Busboy({
      headers: request.headers,
      limits: uploadLimits
    });

    parser.on("field", (name, value) => {
      fields[name] = value;
    });

    parser.on("file", (fieldName, file, info) => {
      const uploadStream = file as BusboyFileStream;
      fileCount += 1;

      if (fieldName !== "file" || fileCount > 1) {
        uploadStream.resume();
        fail(new HttpError(400, "Exactly one file field named file is required.", "UPLOAD_FILE_FIELD_INVALID"));
        return;
      }

      const tempPath = createTempUploadPath();
      tempPaths.push(tempPath);
      const hash = createHash("sha256");
      let byteSize = 0;
      let truncated = false;

      uploadStream.on("limit", () => {
        truncated = true;
      });

      const meter = new Transform({
        transform(chunk: Buffer, _encoding, callback) {
          byteSize += chunk.length;
          hash.update(chunk);
          callback(null, chunk);
        }
      });

      writeTask = pipeline(uploadStream, meter, createWriteStream(tempPath))
        .then(() => {
          parsedFile = {
            fieldName,
            originalName: safeOriginalName(info.filename),
            declaredMimeType: info.mimeType,
            encoding: info.encoding,
            tempPath,
            byteSize,
            sha256: hash.digest("hex"),
            truncated: truncated || uploadStream.truncated === true
          };
        })
        .catch(fail);
    });

    parser.on("filesLimit", () => fail(new HttpError(413, "Only one file is allowed.", "UPLOAD_FILES_LIMIT")));
    parser.on("fieldsLimit", () => fail(new HttpError(413, "Too many text fields.", "UPLOAD_FIELDS_LIMIT")));
    parser.on("partsLimit", () => fail(new HttpError(413, "Too many multipart parts.", "UPLOAD_PARTS_LIMIT")));
    parser.on("error", fail);

    request.on("aborted", () => fail(new HttpError(499, "Upload request was aborted.", "UPLOAD_ABORTED")));

    parser.on("finish", async () => {
      if (settled) {
        return;
      }

      try {
        await writeTask;

        if (!parsedFile) {
          throw new HttpError(400, "A file field named file is required.", "UPLOAD_FILE_REQUIRED");
        }

        if (parsedFile.truncated) {
          throw new HttpError(413, "Uploaded file is too large.", "UPLOAD_FILE_TOO_LARGE");
        }

        settled = true;
        resolve({ fields, file: parsedFile });
      } catch (error) {
        fail(error);
      }
    });

    request.pipe(parser);
  });
}
```
</div>

<a id="920-integration-testing-multipart-upload-and-download"></a>
### 9.20 Integration testing multipart upload and download

integration test 要真的发送 multipart body，并检查上传、metadata、download headers、删除后不可访问。

**机制说明**：multipart integration test 必须真的构造 multipart request。Supertest 的 `.attach("file", path, options)` 会发送文件 part，让 Express、Busboy、limits、temp file、magic-number validation、Prisma metadata、download headers 和 delete behavior 在同一条链路里被验证。

**测试观察点**：上传测试检查 status、metadata、detected MIME、缺失 internal storage path；下载测试检查 auth 后响应 headers；删除测试检查删除后 metadata/download 不再可见。owner isolation 需要用另一个 authenticated agent 访问同一 attachment 证明授权边界。

**常见错误**：只 unit test `validateUploadedFile()`。unit test 能证明函数规则，不能证明 multipart boundary、router middleware、cookie auth、CSRF、Busboy stream 和 response headers 的组合行为。

**与真实项目的关系**：最终项目保留 Node built-in test runner 和 Supertest，不引入 Vitest 或前端 UI。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tests/upload.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writeInvalidFixture, writePngFixture } from "./helpers/files.js";

test("uploads one validated png attachment", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const response = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.originalName, "diagram.png");
  assert.equal(response.body.data.detectedMimeType, "image/png");
  assert.equal(response.body.data.storageKey, undefined);

  await removeFixtureDirectory(fixtureDirectory);
});

test("rejects extension and bytes mismatch", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const invalidPath = await writeInvalidFixture(fixtureDirectory);

  const response = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", invalidPath, { filename: "fake.png", contentType: "image/png" });

  assert.equal(response.status, 415);
  await removeFixtureDirectory(fixtureDirectory);
});
```
</div>

<a id="921-chapter-integration-notes-attachments-api"></a>
### 9.21 Chapter integration: notes-attachments-api

最终项目把前面机制合成一个 notes attachments API，但仍保持本地 filesystem 边界，不引入云、前端或后台队列。

**机制说明**：最终链路只需要在这里完整串一次：authenticated multipart request → Busboy parser → temp file → parser limits → byte hash → magic-number validation → generated storage key → safe storage path → PostgreSQL metadata → controlled download → cleanup。

**责任分层**：route 层负责 authentication、CSRF placement 和 request validation；parser 层负责 multipart events、limits 和 temp file；upload validation 层负责 extension/MIME/magic-number；storage 层负责 root containment 和 object operations；repository 层负责 metadata；service 层负责 owner authorization、compensation 和 lifecycle ordering。

**常见错误**：把这些机制压成“upload middleware handles files”。这个说法看似简洁，但会掩盖 boundary、stream、storage、metadata、auth 和 cleanup 的责任边界。

**与真实项目的关系**：`notes-attachments-api` 的目标不是生产云存储模板，而是把本章所有文件上传和安全下载机制放在一个可 typecheck、可迁移、可测试的 backend API 中。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/app.ts</span>
  </div>

```ts
import express from "express";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { requireCsrfToken } from "./shared/auth/csrf.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { corsMiddleware } from "./shared/middleware/cors.js";
import { notFound } from "./shared/middleware/not-found.js";
import { apiRateLimit } from "./shared/middleware/rate-limit.js";
import { requestId } from "./shared/middleware/request-id.js";
import { securityHeaders } from "./shared/middleware/security-headers.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebookRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { attachmentRoutes, noteAttachmentsRoutes } from "./modules/attachments/attachments.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestId);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(apiRateLimit);
app.use(express.json({ limit: "1mb" }));

app.use("/auth", authRoutes);
app.use("/notes/:noteId/attachments", authenticateSession, noteAttachmentsRoutes);
app.use("/attachments", authenticateSession, attachmentRoutes);
app.use("/notebooks", authenticateSession, requireCsrfToken, notebookRoutes);
app.use("/notes", authenticateSession, requireCsrfToken, notesRoutes);

app.use(notFound);
app.use(errorMiddleware);
```
</div>

## 10. API 与规则索引

| API 或规则 | 作用 | 本章位置 |
| --- | --- | --- |
| `POST /notes/:noteId/attachments` | 上传一个 `file` 字段 | `src/modules/attachments/attachments.routes.ts` |
| `GET /notes/:noteId/attachments` | 列出 note 的 ready attachments | `src/modules/attachments/attachments.service.ts` |
| `GET /attachments/:attachmentId` | 返回 metadata，不暴露内部路径 | `src/modules/attachments/attachments.repository.ts` |
| `GET /attachments/:attachmentId/download` | owner 授权后流式下载 | `src/modules/attachments/attachments.controller.ts` |
| `DELETE /attachments/:attachmentId` | 软删 metadata 并删除对象 | `src/modules/attachments/attachments.service.ts` |
| `fileSize/files/fields/parts` | parser 层限制 | `src/uploads/upload-limits.ts` |
| `path.resolve` + `path.relative` | storage root containment | `src/storage/storage-path.ts` |
| `file-type` | magic number 检测 | `src/uploads/file-validation.ts` |

## 11. 常见错误对照表

| 错误 | 机制原因 | 修正方式 |
| --- | --- | --- |
| 手动设置浏览器 `Content-Type: multipart/form-data` | header 缺少或错配真实 boundary | 让浏览器根据 `FormData` 自动生成 header |
| 用 `express.json()` 读取文件 | multipart 不是 JSON 语法 | 对 multipart route 使用 Busboy 读取 request stream |
| 信任 `filename` | 客户端可控，可能包含路径或欺骗后缀 | 仅保存为 metadata；路径用 server-generated `storageKey` |
| 信任 MIME header | 客户端可伪造 | 记录声明值，但用 magic number 做类型判断 |
| 文件放在 public static 目录 | 绕过鉴权直接访问字节 | 使用受控 download endpoint |
| 认为 DB transaction 覆盖文件复制 | filesystem 不在 PostgreSQL transaction 内 | 设计补偿删除和 orphan cleanup |

## 12. 调试与验证方法

用 curl 或 Supertest 观察 multipart 请求，用 Node `--test` 执行 integration tests，用 `npm run typecheck` 保证 TypeScript 与 Prisma generated client 一致。环境变量命令要同时给出 POSIX 和 Windows PowerShell 形式。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd practices/08-file-upload-storage
npm install
npm run typecheck
npm exec tsx -- 01-multipart-basics/formdata-boundary.ts
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
Set-Location practices\08-file-upload-storage
npm install
npm run typecheck
npm exec tsx -- 01-multipart-basics\formdata-boundary.ts
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/notes-attachments-api
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notes_attachments_api?schema=public"
npm run prisma:generate
npm run typecheck
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
Set-Location mini-projects\notes-attachments-api
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/notes_attachments_api?schema=public"
npm run prisma:generate
npm run typecheck
```
</div>

## 13. 分项练习说明

| 练习组 | 文件 | 观察点 |
| --- | --- | --- |
| `01-multipart-basics` | `practices/08-file-upload-storage/01-multipart-basics/busboy-file-event.ts` | 对应上传、流、校验、存储或下载机制 |
| `01-multipart-basics` | `practices/08-file-upload-storage/01-multipart-basics/busboy-limits.ts` | 对应上传、流、校验、存储或下载机制 |
| `01-multipart-basics` | `practices/08-file-upload-storage/01-multipart-basics/content-type-check.ts` | 对应上传、流、校验、存储或下载机制 |
| `01-multipart-basics` | `practices/08-file-upload-storage/01-multipart-basics/field-order-boundary.ts` | 对应上传、流、校验、存储或下载机制 |
| `01-multipart-basics` | `practices/08-file-upload-storage/01-multipart-basics/formdata-boundary.ts` | 对应上传、流、校验、存储或下载机制 |
| `02-streaming-files` | `practices/08-file-upload-storage/02-streaming-files/abort-upload-boundary.ts` | 对应上传、流、校验、存储或下载机制 |
| `02-streaming-files` | `practices/08-file-upload-storage/02-streaming-files/byte-count-transform.ts` | 对应上传、流、校验、存储或下载机制 |
| `02-streaming-files` | `practices/08-file-upload-storage/02-streaming-files/cleanup-on-error.ts` | 对应上传、流、校验、存储或下载机制 |
| `02-streaming-files` | `practices/08-file-upload-storage/02-streaming-files/hash-while-streaming.ts` | 对应上传、流、校验、存储或下载机制 |
| `02-streaming-files` | `practices/08-file-upload-storage/02-streaming-files/pipeline-to-temp-file.ts` | 对应上传、流、校验、存储或下载机制 |
| `03-file-validation` | `practices/08-file-upload-storage/03-file-validation/extension-allowlist.ts` | 对应上传、流、校验、存储或下载机制 |
| `03-file-validation` | `practices/08-file-upload-storage/03-file-validation/filename-safety.ts` | 对应上传、流、校验、存储或下载机制 |
| `03-file-validation` | `practices/08-file-upload-storage/03-file-validation/magic-number-validation.ts` | 对应上传、流、校验、存储或下载机制 |
| `03-file-validation` | `practices/08-file-upload-storage/03-file-validation/mime-header-mistake.ts` | 对应上传、流、校验、存储或下载机制 |
| `03-file-validation` | `practices/08-file-upload-storage/03-file-validation/validation-result-model.ts` | 对应上传、流、校验、存储或下载机制 |
| `04-storage-boundary` | `practices/08-file-upload-storage/04-storage-boundary/local-object-store.ts` | 对应上传、流、校验、存储或下载机制 |
| `04-storage-boundary` | `practices/08-file-upload-storage/04-storage-boundary/metadata-file-consistency.ts` | 对应上传、流、校验、存储或下载机制 |
| `04-storage-boundary` | `practices/08-file-upload-storage/04-storage-boundary/orphan-cleanup-policy.ts` | 对应上传、流、校验、存储或下载机制 |
| `04-storage-boundary` | `practices/08-file-upload-storage/04-storage-boundary/safe-storage-path.ts` | 对应上传、流、校验、存储或下载机制 |
| `04-storage-boundary` | `practices/08-file-upload-storage/04-storage-boundary/storage-key-generation.ts` | 对应上传、流、校验、存储或下载机制 |
| `05-download-boundary` | `practices/08-file-upload-storage/05-download-boundary/content-disposition-filename.ts` | 对应上传、流、校验、存储或下载机制 |
| `05-download-boundary` | `practices/08-file-upload-storage/05-download-boundary/download-headers.ts` | 对应上传、流、校验、存储或下载机制 |
| `05-download-boundary` | `practices/08-file-upload-storage/05-download-boundary/etag-from-hash.ts` | 对应上传、流、校验、存储或下载机制 |
| `05-download-boundary` | `practices/08-file-upload-storage/05-download-boundary/soft-delete-boundary.ts` | 对应上传、流、校验、存储或下载机制 |
| `05-download-boundary` | `practices/08-file-upload-storage/05-download-boundary/stream-download.ts` | 对应上传、流、校验、存储或下载机制 |

## 14. 最终迷你项目

最终项目是 `mini-projects/notes-attachments-api`。它继承 protected notes API，并新增附件上传、metadata、下载和删除边界。

### 14.1 项目目标

- `POST /notes/:noteId/attachments` 接收 exactly one `file` field。
- 上传先校验 note owner，再解析 multipart bytes。
- 文件先写入 temp，再做 hash、extension、declared MIME、magic number 校验。
- storage key 由服务端生成，并通过 local object-store adapter 复制文件。
- Prisma `Attachment` row 保存 metadata，不暴露绝对路径。
- 下载和删除都先做 owner authorization。

### 14.2 运行命令

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/notes-attachments-api
cp .env.example .env
npm install
npm run prisma:generate
npm run typecheck
npm run prisma:migrate:dev
npm test
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
Set-Location mini-projects\notes-attachments-api
Copy-Item .env.example .env
npm install
npm run prisma:generate
npm run typecheck
npm run prisma:migrate:dev
npm test
```
</div>

### 14.3 完整项目代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/package.json</span>
  </div>

```json
{
  "name": "notes-attachments-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "typecheck": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev",
    "seed": "prisma db seed",
    "test": "node --import tsx --test tests/upload.integration.test.ts tests/download.integration.test.ts tests/delete-attachment.integration.test.ts"
  },
  "dependencies": {
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "busboy": "^1.6.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-rate-limit": "^8.6.0",
    "file-type": "^21.0.0",
    "helmet": "^8.3.0",
    "pg": "^8.22.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/busboy": "^1.5.4",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "^26.1.1",
    "@types/pg": "^8.20.0",
    "@types/supertest": "^7.2.1",
    "prisma": "^7.8.0",
    "supertest": "^7.2.2",
    "tsx": "^4.23.1",
    "typescript": "^7.0.2"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "engines": {
    "node": ">=26"
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tsconfig.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "lib": ["ES2022", "DOM"]
  },
  "include": ["**/*.ts"]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/.env.example</span>
  </div>

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notes_attachments_api?schema=public"
PORT=3008
NODE_ENV=development
CORS_ALLOWED_ORIGINS="http://localhost:5173"
SESSION_COOKIE_NAME="notes_attachments_session"
COOKIE_SECURE=false
SESSION_TTL_SECONDS=28800
MAX_UPLOAD_BYTES=5242880
STORAGE_ROOT="./storage/objects"
TEMP_UPLOAD_DIR="./storage/tmp"
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/prisma.config.ts</span>
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
    <span class="macos-code-title">mini-projects/notes-attachments-api/prisma/schema.prisma</span>
  </div>

```txt
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum Role {
  USER
  ADMIN
}

enum NoteStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

enum AttachmentStatus {
  READY
  DELETED
}

model User {
  id           String       @id @default(uuid()) @db.Uuid
  email        String       @unique @db.VarChar(320)
  passwordHash String       @db.Text
  role         Role         @default(USER)
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  sessions     Session[]
  notebooks    Notebook[]
  notes        Note[]
  attachments  Attachment[] @relation("AttachmentOwner")
}

model Session {
  id            String    @id @default(uuid()) @db.Uuid
  userId        String    @db.Uuid
  tokenHash     String    @unique @db.VarChar(96)
  csrfTokenHash String?   @db.VarChar(96)
  userAgent     String?   @db.VarChar(512)
  ipHash        String?   @db.VarChar(96)
  createdAt     DateTime  @default(now())
  expiresAt     DateTime
  revokedAt     DateTime?
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
}

model Notebook {
  id        String   @id @default(uuid()) @db.Uuid
  ownerId   String   @db.Uuid
  name      String   @db.VarChar(120)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  owner     User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  notes     Note[]

  @@index([ownerId])
  @@unique([ownerId, name])
}

model Note {
  id          String       @id @default(uuid()) @db.Uuid
  ownerId     String       @db.Uuid
  notebookId  String       @db.Uuid
  title       String       @db.VarChar(160)
  body        String       @default("")
  status      NoteStatus   @default(ACTIVE)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  owner       User         @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  notebook    Notebook     @relation(fields: [notebookId], references: [id], onDelete: Cascade)
  attachments Attachment[]

  @@index([ownerId])
  @@index([notebookId])
  @@index([status, createdAt])
  @@unique([notebookId, title])
}

model Attachment {
  id               String           @id @default(uuid()) @db.Uuid
  ownerId          String           @db.Uuid
  noteId           String           @db.Uuid
  originalName     String           @db.VarChar(255)
  storedName       String           @db.VarChar(160)
  storageKey       String           @unique @db.VarChar(512)
  mimeType         String           @db.VarChar(160)
  detectedMimeType String           @db.VarChar(160)
  extension        String           @db.VarChar(16)
  byteSize         BigInt
  sha256           String           @db.Char(64)
  status           AttachmentStatus @default(READY)
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  deletedAt        DateTime?
  owner            User             @relation("AttachmentOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  note             Note             @relation(fields: [noteId], references: [id], onDelete: Cascade)

  @@index([ownerId, noteId])
  @@index([ownerId, status])
  @@index([noteId, createdAt])
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/prisma/seed.ts</span>
  </div>

```ts
import "dotenv/config";
import { prisma, disconnectPrisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/shared/auth/password-hashing.js";

async function main(): Promise<void> {
  await prisma.attachment.deleteMany();
  await prisma.note.deleteMany();
  await prisma.notebook.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "learner@example.com",
      passwordHash: await hashPassword("Password12345!")
    }
  });

  const notebook = await prisma.notebook.create({
    data: {
      ownerId: user.id,
      name: "Upload Notes"
    }
  });

  await prisma.note.create({
    data: {
      ownerId: user.id,
      notebookId: notebook.id,
      title: "Attachment boundaries",
      body: "Store metadata in PostgreSQL and bytes outside the public route tree."
    }
  });
}

await main()
  .finally(async () => {
    await disconnectPrisma();
  });
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/app.ts</span>
  </div>

```ts
import express from "express";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { requireCsrfToken } from "./shared/auth/csrf.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { corsMiddleware } from "./shared/middleware/cors.js";
import { notFound } from "./shared/middleware/not-found.js";
import { apiRateLimit } from "./shared/middleware/rate-limit.js";
import { requestId } from "./shared/middleware/request-id.js";
import { securityHeaders } from "./shared/middleware/security-headers.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebookRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { attachmentRoutes, noteAttachmentsRoutes } from "./modules/attachments/attachments.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestId);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(apiRateLimit);
app.use(express.json({ limit: "1mb" }));

app.use("/auth", authRoutes);
app.use("/notes/:noteId/attachments", authenticateSession, noteAttachmentsRoutes);
app.use("/attachments", authenticateSession, attachmentRoutes);
app.use("/notebooks", authenticateSession, requireCsrfToken, notebookRoutes);
app.use("/notes", authenticateSession, requireCsrfToken, notesRoutes);

app.use(notFound);
app.use(errorMiddleware);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/server.ts</span>
  </div>

```ts
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { app } from "./app.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("HTTP server started.", { port: config.PORT });
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(async () => {
      await disconnectPrisma();
      process.exit(0);
    });
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/config/env.ts</span>
  </div>

```ts
import "dotenv/config";
import path from "node:path";
import { z } from "zod";

const rawEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().int().min(1).max(65535).default(3008),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SESSION_COOKIE_NAME: z.string().min(1).default("notes_attachments_session"),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  SESSION_TTL_SECONDS: z.coerce.number().int().min(60).default(28800),
  MAX_UPLOAD_BYTES: z.coerce.number().int().min(1).max(20 * 1024 * 1024).default(5 * 1024 * 1024),
  STORAGE_ROOT: z.string().min(1).default("./storage/objects"),
  TEMP_UPLOAD_DIR: z.string().min(1).default("./storage/tmp")
});

const parsed = rawEnvSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(z.prettifyError(parsed.error));
}

const raw = parsed.data;

export const config = {
  ...raw,
  CORS_ALLOWED_ORIGINS: raw.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean),
  STORAGE_ROOT: path.resolve(process.cwd(), raw.STORAGE_ROOT),
  TEMP_UPLOAD_DIR: path.resolve(process.cwd(), raw.TEMP_UPLOAD_DIR)
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/db/prisma.ts</span>
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
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/db/prisma-errors.ts</span>
  </div>

```ts
import { Prisma } from "../generated/prisma/client.js";

export function isPrismaKnownRequestError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export function isUniqueConstraintError(error: unknown): boolean {
  return isPrismaKnownRequestError(error) && error.code === "P2002";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/storage/object-store.ts</span>
  </div>

```ts
import type { Readable } from "node:stream";

export type StoredObject = {
  storageKey: string;
  byteSize: number;
};

export type ObjectStoreStat = {
  byteSize: number;
  updatedAt: Date;
};

export interface ObjectStore {
  putFile(input: { sourcePath: string; storageKey: string }): Promise<StoredObject>;
  createReadStream(storageKey: string): Readable;
  stat(storageKey: string): Promise<ObjectStoreStat>;
  deleteFile(storageKey: string): Promise<void>;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/storage/local-object-store.ts</span>
  </div>

```ts
import { createReadStream } from "node:fs";
import { copyFile, mkdir, rm, stat as fsStat } from "node:fs/promises";
import path from "node:path";
import { config } from "../config/env.js";
import type { ObjectStore, ObjectStoreStat, StoredObject } from "./object-store.js";
import { resolveStoragePath } from "./storage-path.js";

export class LocalObjectStore implements ObjectStore {
  constructor(private readonly root: string) {}

  async putFile(input: { sourcePath: string; storageKey: string }): Promise<StoredObject> {
    const targetPath = resolveStoragePath(this.root, input.storageKey);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(input.sourcePath, targetPath);
    const stat = await fsStat(targetPath);
    return {
      storageKey: input.storageKey,
      byteSize: stat.size
    };
  }

  createReadStream(storageKey: string) {
    return createReadStream(resolveStoragePath(this.root, storageKey));
  }

  async stat(storageKey: string): Promise<ObjectStoreStat> {
    const stat = await fsStat(resolveStoragePath(this.root, storageKey));
    return {
      byteSize: stat.size,
      updatedAt: stat.mtime
    };
  }

  async deleteFile(storageKey: string): Promise<void> {
    await rm(resolveStoragePath(this.root, storageKey), { force: true });
  }
}

export const objectStore = new LocalObjectStore(config.STORAGE_ROOT);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/storage/storage-path.ts</span>
  </div>

```ts
import path from "node:path";
import { HttpError } from "../shared/errors/http-error.js";

export function resolveStoragePath(root: string, storageKey: string): string {
  const rootPath = path.resolve(root);
  const candidatePath = path.resolve(rootPath, storageKey);
  const relativePath = path.relative(rootPath, candidatePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new HttpError(400, "Storage key escapes the storage root.", "STORAGE_KEY_INVALID");
  }

  return candidatePath;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/storage/storage-key.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";

export function createStorageKey(input: {
  ownerId: string;
  noteId: string;
  extension: string;
}): string {
  return `owners/${input.ownerId}/notes/${input.noteId}/attachments/${randomUUID()}${input.extension}`;
}

export function storedNameFromStorageKey(storageKey: string): string {
  const segments = storageKey.split("/");
  return segments.at(-1) ?? storageKey;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/storage/temp-files.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { config } from "../config/env.js";

export async function ensureUploadDirectories(): Promise<void> {
  await mkdir(config.TEMP_UPLOAD_DIR, { recursive: true });
  await mkdir(config.STORAGE_ROOT, { recursive: true });
}

export function createTempUploadPath(): string {
  return path.join(config.TEMP_UPLOAD_DIR, `${randomUUID()}.upload`);
}

export async function removeTempFile(filePath: string | undefined): Promise<void> {
  if (!filePath) {
    return;
  }

  await rm(filePath, { force: true });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/multipart-parser.ts</span>
  </div>

```ts
import { createWriteStream } from "node:fs";
import { createHash } from "node:crypto";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import Busboy from "busboy";
import type { Request } from "express";
import { HttpError } from "../shared/errors/http-error.js";
import { createTempUploadPath, ensureUploadDirectories, removeTempFile } from "../storage/temp-files.js";
import { safeOriginalName } from "./filename.js";
import { uploadLimits } from "./upload-limits.js";
import type { ParsedMultipartUpload, ParsedUploadFile } from "./upload-types.js";

type BusboyFileStream = NodeJS.ReadableStream & {
  truncated?: boolean;
  resume(): void;
  on(event: "limit", listener: () => void): BusboyFileStream;
};

export async function parseMultipartUpload(request: Request): Promise<ParsedMultipartUpload> {
  await ensureUploadDirectories();

  const contentType = request.headers["content-type"];
  if (typeof contentType !== "string" || !contentType.toLowerCase().startsWith("multipart/form-data;") || !contentType.toLowerCase().includes("boundary=")) {
    throw new HttpError(415, "Request must use multipart/form-data with a boundary.", "MULTIPART_REQUIRED");
  }

  return new Promise((resolve, reject) => {
    const tempPaths: string[] = [];
    const fields: Record<string, string> = {};
    let parsedFile: ParsedUploadFile | undefined;
    let writeTask: Promise<void> | undefined;
    let settled = false;
    let fileCount = 0;

    const fail = (error: unknown): void => {
      if (settled) {
        return;
      }
      settled = true;
      for (const tempPath of tempPaths) {
        void removeTempFile(tempPath);
      }
      reject(error);
    };

    const parser = Busboy({
      headers: request.headers,
      limits: uploadLimits
    });

    parser.on("field", (name, value) => {
      fields[name] = value;
    });

    parser.on("file", (fieldName, file, info) => {
      const uploadStream = file as BusboyFileStream;
      fileCount += 1;

      if (fieldName !== "file" || fileCount > 1) {
        uploadStream.resume();
        fail(new HttpError(400, "Exactly one file field named file is required.", "UPLOAD_FILE_FIELD_INVALID"));
        return;
      }

      const tempPath = createTempUploadPath();
      tempPaths.push(tempPath);
      const hash = createHash("sha256");
      let byteSize = 0;
      let truncated = false;

      uploadStream.on("limit", () => {
        truncated = true;
      });

      const meter = new Transform({
        transform(chunk: Buffer, _encoding, callback) {
          byteSize += chunk.length;
          hash.update(chunk);
          callback(null, chunk);
        }
      });

      writeTask = pipeline(uploadStream, meter, createWriteStream(tempPath))
        .then(() => {
          parsedFile = {
            fieldName,
            originalName: safeOriginalName(info.filename),
            declaredMimeType: info.mimeType,
            encoding: info.encoding,
            tempPath,
            byteSize,
            sha256: hash.digest("hex"),
            truncated: truncated || uploadStream.truncated === true
          };
        })
        .catch(fail);
    });

    parser.on("filesLimit", () => fail(new HttpError(413, "Only one file is allowed.", "UPLOAD_FILES_LIMIT")));
    parser.on("fieldsLimit", () => fail(new HttpError(413, "Too many text fields.", "UPLOAD_FIELDS_LIMIT")));
    parser.on("partsLimit", () => fail(new HttpError(413, "Too many multipart parts.", "UPLOAD_PARTS_LIMIT")));
    parser.on("error", fail);

    request.on("aborted", () => fail(new HttpError(499, "Upload request was aborted.", "UPLOAD_ABORTED")));

    parser.on("finish", async () => {
      if (settled) {
        return;
      }

      try {
        await writeTask;

        if (!parsedFile) {
          throw new HttpError(400, "A file field named file is required.", "UPLOAD_FILE_REQUIRED");
        }

        if (parsedFile.truncated) {
          throw new HttpError(413, "Uploaded file is too large.", "UPLOAD_FILE_TOO_LARGE");
        }

        settled = true;
        resolve({ fields, file: parsedFile });
      } catch (error) {
        fail(error);
      }
    });

    request.pipe(parser);
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/upload-limits.ts</span>
  </div>

```ts
import { config } from "../config/env.js";

export const uploadLimits = {
  fileSize: config.MAX_UPLOAD_BYTES,
  files: 1,
  fields: 4,
  parts: 5,
  headerPairs: 200
} as const;
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/upload-types.ts</span>
  </div>

```ts
export type ParsedUploadFile = {
  fieldName: string;
  originalName: string;
  declaredMimeType: string;
  encoding: string;
  tempPath: string;
  byteSize: number;
  sha256: string;
  truncated: boolean;
};

export type ParsedMultipartUpload = {
  fields: Record<string, string>;
  file: ParsedUploadFile;
};

export type AllowedFileType = {
  extension: ".png" | ".jpg" | ".jpeg" | ".pdf";
  detectedMimeType: "image/png" | "image/jpeg" | "application/pdf";
};

export type ValidatedUploadFile = ParsedUploadFile & AllowedFileType;
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/file-validation.ts</span>
  </div>

```ts
import { fileTypeFromFile } from "file-type";
import { HttpError } from "../shared/errors/http-error.js";
import { allowedExtension } from "./filename.js";
import type { ValidatedUploadFile, ParsedUploadFile } from "./upload-types.js";

const detectedMimeByExtension = new Map<string, Set<string>>([
  [".png", new Set(["image/png"])],
  [".jpg", new Set(["image/jpeg"])],
  [".jpeg", new Set(["image/jpeg"])],
  [".pdf", new Set(["application/pdf"])]
]);

export async function validateUploadedFile(file: ParsedUploadFile): Promise<ValidatedUploadFile> {
  const extension = toUploadExtension(file.originalName);
  const detected = await fileTypeFromFile(file.tempPath);

  if (!detected) {
    throw new HttpError(415, "File type could not be detected.", "FILE_TYPE_UNKNOWN");
  }

  const allowedMimeTypes = detectedMimeByExtension.get(extension);
  if (!allowedMimeTypes?.has(detected.mime)) {
    throw new HttpError(415, "File extension and detected file type do not match.", "FILE_TYPE_MISMATCH", {
      extension,
      declaredMimeType: file.declaredMimeType,
      detectedMimeType: detected.mime
    });
  }

  return {
    ...file,
    extension,
    detectedMimeType: detected.mime as ValidatedUploadFile["detectedMimeType"]
  };
}

function toUploadExtension(filename: string): ValidatedUploadFile["extension"] {
  try {
    return allowedExtension(filename);
  } catch {
    throw new HttpError(415, "File extension is not allowed.", "FILE_EXTENSION_UNSUPPORTED");
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/file-hash.ts</span>
  </div>

```ts
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export function createHashingTransform(onChunk: (chunk: Buffer) => void): Transform {
  const hash = createHash("sha256");
  return new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      hash.update(chunk);
      onChunk(chunk);
      callback(null, chunk);
    },
    final(callback) {
      this.emit("sha256", hash.digest("hex"));
      callback();
    }
  });
}

export async function hashFile(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  await pipeline(
    createReadStream(filePath),
    new Transform({
      transform(chunk: Buffer, _encoding, callback) {
        hash.update(chunk);
        callback(null, chunk);
      }
    })
  );
  return hash.digest("hex");
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/uploads/filename.ts</span>
  </div>

```ts
import path from "node:path";

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".pdf"]);

export function safeOriginalName(rawName: string | undefined): string {
  const basename = path.basename(rawName ?? "upload.bin").normalize("NFC");
  const sanitized = basename.replace(/[^A-Za-z0-9._ -]/g, "_").slice(0, 160);
  return sanitized.length > 0 ? sanitized : "upload.bin";
}

export function allowedExtension(filename: string): ".png" | ".jpg" | ".jpeg" | ".pdf" {
  const extension = path.extname(filename).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error("Unsupported file extension.");
  }
  return extension as ".png" | ".jpg" | ".jpeg" | ".pdf";
}

export function contentDispositionAttachment(originalName: string): string {
  const fallbackName = originalName.replace(/[^A-Za-z0-9._-]/g, "_");
  const encodedName = encodeURIComponent(originalName).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
  return `attachment; filename="${fallbackName}"; filename*=UTF-8''${encodedName}`;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/auth/auth.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

export const authRoutes = Router();

authRoutes.post("/register", validateRequest({ body: registerSchema }), controller.register);
authRoutes.post("/login", validateRequest({ body: loginSchema }), controller.login);
authRoutes.post("/logout", authenticateSession, requireCsrfToken, controller.logout);
authRoutes.get("/me", authenticateSession, controller.me);
authRoutes.get("/csrf", authenticateSession, controller.csrf);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/auth/auth.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { clearSessionCookie, setSessionCookie } from "../../shared/cookies/session-cookie.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { issueCsrfTokenForSession } from "../../shared/auth/csrf.js";
import * as authService from "./auth.service.js";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const result = await authService.register(request.body, {
      userAgent: request.header("user-agent") ?? undefined,
      ip: request.ip
    });
    setSessionCookie(response, result.sessionToken);
    sendResponse(response, 201, { user: result.user });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (request, response, next) => {
  try {
    const result = await authService.login(request.body, {
      userAgent: request.header("user-agent") ?? undefined,
      ip: request.ip
    });
    setSessionCookie(response, result.sessionToken);
    sendResponse(response, 200, { user: result.user });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await authService.logout(auth.sessionId);
    clearSessionCookie(response);
    sendResponse(response, 200, { loggedOut: true });
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, {
      user: {
        id: auth.userId,
        email: auth.email,
        role: auth.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const csrf: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    const csrfToken = await issueCsrfTokenForSession(auth.sessionId);
    sendResponse(response, 200, { csrfToken });
  } catch (error) {
    next(error);
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/auth/auth.service.ts</span>
  </div>

```ts
import { HttpError } from "../../shared/errors/http-error.js";
import { hashPassword, verifyPassword } from "../../shared/auth/password-hashing.js";
import { createSessionToken, hashIpAddress, hashSessionToken } from "../../shared/auth/session-token.js";
import * as userRepository from "../users/users.repository.js";
import * as authRepository from "./auth.repository.js";
import type { AuthRequestMetadata, AuthResult } from "./auth.types.js";

export async function register(input: { email: string; password: string }, metadata: AuthRequestMetadata): Promise<AuthResult> {
  const existingUser = await userRepository.findUserByEmail(input.email);
  if (existingUser) {
    throw new HttpError(409, "Email is already registered.", "EMAIL_TAKEN");
  }

  const user = await userRepository.createUser({
    email: input.email,
    passwordHash: await hashPassword(input.password)
  });

  const sessionToken = await createSession(user.id, metadata);
  return { user: userRepository.toPublicUser(user), sessionToken };
}

export async function login(input: { email: string; password: string }, metadata: AuthRequestMetadata): Promise<AuthResult> {
  const user = await userRepository.findUserByEmail(input.email);
  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    throw new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
  }

  const sessionToken = await createSession(user.id, metadata);
  return { user: userRepository.toPublicUser(user), sessionToken };
}

export async function logout(sessionId: string): Promise<void> {
  await authRepository.revokeSession(sessionId);
}

async function createSession(userId: string, metadata: AuthRequestMetadata): Promise<string> {
  const sessionToken = createSessionToken();
  await authRepository.createSession({
    userId,
    tokenHash: hashSessionToken(sessionToken),
    userAgent: metadata.userAgent,
    ipHash: hashIpAddress(metadata.ip)
  });
  return sessionToken;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/auth/auth.repository.ts</span>
  </div>

```ts
import { config } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";

export async function createSession(input: {
  userId: string;
  tokenHash: string;
  userAgent?: string;
  ipHash?: string;
}) {
  return prisma.session.create({
    data: {
      ...input,
      expiresAt: new Date(Date.now() + config.SESSION_TTL_SECONDS * 1000)
    }
  });
}

export async function revokeSession(sessionId: string): Promise<void> {
  await prisma.session.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() }
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/auth/auth.schema.ts</span>
  </div>

```ts
import { z } from "zod";

const emailSchema = z.string().trim().email().max(320).transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(12).max(128)
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128)
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/auth/auth.types.ts</span>
  </div>

```ts
import type { PublicUser } from "../users/users.types.js";

export type AuthRequestMetadata = {
  userAgent?: string;
  ip?: string;
};

export type AuthResult = {
  user: PublicUser;
  sessionToken: string;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/users/users.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { PublicUser, UserRecord } from "./users.types.js";

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString()
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(input: { email: string; passwordHash: string }): Promise<UserRecord> {
  return prisma.user.create({ data: input });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/users/users.types.ts</span>
  </div>

```ts
import type { Role, User } from "../../generated/prisma/client.js";

export type UserRecord = User;

export type PublicUser = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notebooks/notebooks.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { notebookNotesRoutes } from "../notes/notebook-notes.routes.js";
import * as controller from "./notebooks.controller.js";
import { createNotebookSchema, notebookParamsSchema, updateNotebookSchema } from "./notebooks.schema.js";

export const notebookRoutes = Router();

notebookRoutes.get("/", controller.list);
notebookRoutes.post("/", validateRequest({ body: createNotebookSchema }), controller.create);
notebookRoutes.use("/:notebookId/notes", notebookNotesRoutes);
notebookRoutes.get("/:notebookId", validateRequest({ params: notebookParamsSchema }), controller.getById);
notebookRoutes.put("/:notebookId", validateRequest({ params: notebookParamsSchema, body: updateNotebookSchema }), controller.updateById);
notebookRoutes.delete("/:notebookId", validateRequest({ params: notebookParamsSchema }), controller.removeById);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notebooks/notebooks.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notebooks.service.js";

export const list: RequestHandler = async (_request, response, next) => {
  try {
    sendResponse(response, 200, await service.list(requireAuthContext(response)));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 201, await service.create(requireAuthContext(response), request.body));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.getById(requireAuthContext(response), routeParam(request.params.notebookId)));
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.updateById(requireAuthContext(response), routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    await service.removeById(requireAuthContext(response), routeParam(request.params.notebookId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notebooks/notebooks.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import * as repository from "./notebooks.repository.js";
import type { NotebookDto } from "./notebooks.types.js";

export async function list(auth: AuthContext): Promise<NotebookDto[]> {
  const notebooks = await repository.listNotebooks(auth.userId);
  return notebooks.map(repository.toNotebookDto);
}

export async function create(auth: AuthContext, input: { name: string }): Promise<NotebookDto> {
  return repository.toNotebookDto(await repository.createNotebook({ ownerId: auth.userId, name: input.name }));
}

export async function getById(auth: AuthContext, notebookId: string): Promise<NotebookDto> {
  const notebook = await requireOwnedNotebook(auth, notebookId);
  return repository.toNotebookDto(notebook);
}

export async function updateById(auth: AuthContext, notebookId: string, input: { name: string }): Promise<NotebookDto> {
  await requireOwnedNotebook(auth, notebookId);
  return repository.toNotebookDto(await repository.updateNotebook(notebookId, input));
}

export async function removeById(auth: AuthContext, notebookId: string): Promise<void> {
  await requireOwnedNotebook(auth, notebookId);
  await repository.deleteNotebook(notebookId);
}

export async function requireOwnedNotebook(auth: AuthContext, notebookId: string) {
  const notebook = await repository.findNotebookById(notebookId);
  if (!notebook) {
    throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  }
  authorizeOwner(auth, notebook.ownerId);
  return notebook;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notebooks/notebooks.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { NotebookDto, NotebookRecord } from "./notebooks.types.js";

export function toNotebookDto(notebook: NotebookRecord): NotebookDto {
  return {
    id: notebook.id,
    name: notebook.name,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString()
  };
}

export async function listNotebooks(ownerId: string): Promise<NotebookRecord[]> {
  return prisma.notebook.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" }
  });
}

export async function findNotebookById(id: string): Promise<NotebookRecord | null> {
  return prisma.notebook.findUnique({ where: { id } });
}

export async function createNotebook(input: { ownerId: string; name: string }): Promise<NotebookRecord> {
  return prisma.notebook.create({ data: input });
}

export async function updateNotebook(id: string, input: { name: string }): Promise<NotebookRecord> {
  return prisma.notebook.update({
    where: { id },
    data: input
  });
}

export async function deleteNotebook(id: string): Promise<void> {
  await prisma.notebook.delete({ where: { id } });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notebooks/notebooks.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const notebookParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const createNotebookSchema = z.object({
  name: z.string().trim().min(1).max(120)
});

export const updateNotebookSchema = createNotebookSchema;
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notebooks/notebooks.types.ts</span>
  </div>

```ts
import type { Notebook } from "../../generated/prisma/client.js";

export type NotebookRecord = Notebook;

export type NotebookDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notebook-notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./notes.controller.js";
import { createNoteSchema, listNotesQuerySchema, noteParamsSchema } from "./notes.schema.js";

export const notebookNotesRoutes = Router({ mergeParams: true });

notebookNotesRoutes.get("/", validateRequest({ params: noteParamsSchema.pick({ notebookId: true }), query: listNotesQuerySchema }), controller.list);
notebookNotesRoutes.post("/", validateRequest({ params: noteParamsSchema.pick({ notebookId: true }), body: createNoteSchema }), controller.create);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./notes.controller.js";
import { noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRoutes = Router();

notesRoutes.get("/:noteId", validateRequest({ params: noteIdParamsSchema }), controller.getById);
notesRoutes.patch("/:noteId", validateRequest({ params: noteIdParamsSchema, body: updateNoteSchema }), controller.updateById);
notesRoutes.delete("/:noteId", validateRequest({ params: noteIdParamsSchema }), controller.removeById);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notes.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notes.service.js";

export const list: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.list(auth, {
      notebookId: routeParam(request.params.notebookId),
      status: request.query.status as never,
      limit: Number(request.query.limit),
      offset: Number(request.query.offset)
    }));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 201, await service.create(auth, routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.getById(requireAuthContext(response), routeParam(request.params.noteId)));
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.updateById(requireAuthContext(response), routeParam(request.params.noteId), request.body));
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    await service.removeById(requireAuthContext(response), routeParam(request.params.noteId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notes.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import * as notebooksService from "../notebooks/notebooks.service.js";
import * as repository from "./notes.repository.js";
import type { NoteDto, NoteStatus } from "./notes.types.js";

export async function list(auth: AuthContext, input: {
  notebookId: string;
  status?: NoteStatus;
  limit: number;
  offset: number;
}): Promise<NoteDto[]> {
  await notebooksService.requireOwnedNotebook(auth, input.notebookId);
  const notes = await repository.listNotes({
    ownerId: auth.userId,
    notebookId: input.notebookId,
    status: input.status,
    limit: input.limit,
    offset: input.offset
  });
  return notes.map(repository.toNoteDto);
}

export async function create(auth: AuthContext, notebookId: string, input: {
  title: string;
  body: string;
  status: NoteStatus;
}): Promise<NoteDto> {
  await notebooksService.requireOwnedNotebook(auth, notebookId);
  const note = await repository.createNote({
    ownerId: auth.userId,
    notebookId,
    title: input.title,
    body: input.body,
    status: input.status
  });
  return repository.toNoteDto(note);
}

export async function getById(auth: AuthContext, noteId: string): Promise<NoteDto> {
  return repository.toNoteDto(await requireOwnedNote(auth, noteId));
}

export async function updateById(auth: AuthContext, noteId: string, input: Partial<{
  title: string;
  body: string;
  status: NoteStatus;
}>): Promise<NoteDto> {
  await requireOwnedNote(auth, noteId);
  return repository.toNoteDto(await repository.updateNote(noteId, input));
}

export async function removeById(auth: AuthContext, noteId: string): Promise<void> {
  await requireOwnedNote(auth, noteId);
  await repository.deleteNote(noteId);
}

export async function requireOwnedNote(auth: AuthContext, noteId: string) {
  const note = await repository.findNoteById(noteId);
  if (!note) {
    throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  }
  authorizeOwner(auth, note.ownerId);
  return note;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notes.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { NoteDto, NoteRecord, NoteStatus } from "./notes.types.js";

export function toNoteDto(note: NoteRecord): NoteDto {
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

export async function listNotes(input: {
  ownerId: string;
  notebookId: string;
  status?: NoteStatus;
  limit: number;
  offset: number;
}): Promise<NoteRecord[]> {
  return prisma.note.findMany({
    where: {
      ownerId: input.ownerId,
      notebookId: input.notebookId,
      status: input.status
    },
    orderBy: { createdAt: "desc" },
    take: input.limit,
    skip: input.offset
  });
}

export async function findNoteById(id: string): Promise<NoteRecord | null> {
  return prisma.note.findUnique({ where: { id } });
}

export async function createNote(input: {
  ownerId: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
}): Promise<NoteRecord> {
  return prisma.note.create({ data: input });
}

export async function updateNote(id: string, input: Partial<Pick<NoteRecord, "title" | "body" | "status">>): Promise<NoteRecord> {
  return prisma.note.update({
    where: { id },
    data: input
  });
}

export async function deleteNote(id: string): Promise<void> {
  await prisma.note.delete({ where: { id } });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notes.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const noteStatusSchema = z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]);

export const noteParamsSchema = z.object({
  notebookId: z.string().uuid(),
  noteId: z.string().uuid()
});

export const noteIdParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const notebookOnlyParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const listNotesQuerySchema = z.object({
  status: noteStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().max(10000).default(""),
  status: noteStatusSchema.default("ACTIVE")
});

export const updateNoteSchema = createNoteSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required."
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/notes/notes.types.ts</span>
  </div>

```ts
import type { Note, NoteStatus } from "../../generated/prisma/client.js";

export type NoteRecord = Note;
export type { NoteStatus };

export type NoteDto = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./attachments.controller.js";
import { attachmentParamsSchema, noteAttachmentParamsSchema } from "./attachments.schema.js";

export const noteAttachmentsRoutes = Router({ mergeParams: true });
export const attachmentRoutes = Router();

noteAttachmentsRoutes.post("/", requireCsrfToken, validateRequest({ params: noteAttachmentParamsSchema }), controller.upload);
noteAttachmentsRoutes.get("/", validateRequest({ params: noteAttachmentParamsSchema }), controller.listForNote);

attachmentRoutes.get("/:attachmentId", validateRequest({ params: attachmentParamsSchema }), controller.getById);
attachmentRoutes.get("/:attachmentId/download", validateRequest({ params: attachmentParamsSchema }), controller.download);
attachmentRoutes.delete("/:attachmentId", requireCsrfToken, validateRequest({ params: attachmentParamsSchema }), controller.removeById);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.controller.ts</span>
  </div>

```ts
import { pipeline } from "node:stream/promises";
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./attachments.service.js";

export const upload: RequestHandler = async (request, response, next) => {
  try {
    const attachment = await service.upload(requireAuthContext(response), routeParam(request.params.noteId), request);
    sendResponse(response, 201, attachment);
  } catch (error) {
    next(error);
  }
};

export const listForNote: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.listForNote(requireAuthContext(response), routeParam(request.params.noteId)));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    sendResponse(response, 200, await service.getById(requireAuthContext(response), routeParam(request.params.attachmentId)));
  } catch (error) {
    next(error);
  }
};

export const download: RequestHandler = async (request, response, next) => {
  try {
    const result = await service.openDownload(requireAuthContext(response), routeParam(request.params.attachmentId));
    response.set(result.headers);
    await pipeline(result.stream, response);
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    await service.removeById(requireAuthContext(response), routeParam(request.params.attachmentId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.service.ts</span>
  </div>

```ts
import type { Request } from "express";
import type { Readable } from "node:stream";
import { HttpError } from "../../shared/errors/http-error.js";
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { objectStore } from "../../storage/local-object-store.js";
import { createStorageKey, storedNameFromStorageKey } from "../../storage/storage-key.js";
import { removeTempFile } from "../../storage/temp-files.js";
import { parseMultipartUpload } from "../../uploads/multipart-parser.js";
import { validateUploadedFile } from "../../uploads/file-validation.js";
import { contentDispositionAttachment } from "../../uploads/filename.js";
import * as notesService from "../notes/notes.service.js";
import * as repository from "./attachments.repository.js";
import type { AttachmentDto } from "./attachments.types.js";

export async function upload(auth: AuthContext, noteId: string, request: Request): Promise<AttachmentDto> {
  await notesService.requireOwnedNote(auth, noteId);
  const parsed = await parseMultipartUpload(request);
  let storageKey: string | undefined;

  try {
    const validatedFile = await validateUploadedFile(parsed.file);
    storageKey = createStorageKey({
      ownerId: auth.userId,
      noteId,
      extension: validatedFile.extension
    });

    const storedObject = await objectStore.putFile({
      sourcePath: validatedFile.tempPath,
      storageKey
    });

    const attachment = await repository.createAttachmentMetadata({
      ownerId: auth.userId,
      noteId,
      originalName: validatedFile.originalName,
      storedName: storedNameFromStorageKey(storageKey),
      storageKey,
      mimeType: validatedFile.declaredMimeType,
      detectedMimeType: validatedFile.detectedMimeType,
      extension: validatedFile.extension,
      byteSize: storedObject.byteSize,
      sha256: validatedFile.sha256
    });

    return repository.toAttachmentDto(attachment);
  } catch (error) {
    if (storageKey) {
      await objectStore.deleteFile(storageKey);
    }
    throw error;
  } finally {
    await removeTempFile(parsed.file.tempPath);
  }
}

export async function listForNote(auth: AuthContext, noteId: string): Promise<AttachmentDto[]> {
  await notesService.requireOwnedNote(auth, noteId);
  const attachments = await repository.listReadyAttachments({
    ownerId: auth.userId,
    noteId
  });
  return attachments.map(repository.toAttachmentDto);
}

export async function getById(auth: AuthContext, attachmentId: string): Promise<AttachmentDto> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  return repository.toAttachmentDto(attachment);
}

export async function openDownload(auth: AuthContext, attachmentId: string): Promise<{
  stream: Readable;
  headers: Record<string, string>;
}> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  const stat = await objectStore.stat(attachment.storageKey);
  const stream = objectStore.createReadStream(attachment.storageKey);

  return {
    stream,
    headers: {
      "Content-Type": attachment.detectedMimeType,
      "Content-Length": String(stat.byteSize),
      "Content-Disposition": contentDispositionAttachment(attachment.originalName),
      "ETag": `"sha256-${attachment.sha256}"`,
      "X-Content-Type-Options": "nosniff"
    }
  };
}

export async function removeById(auth: AuthContext, attachmentId: string): Promise<void> {
  const attachment = await requireReadyAttachment(auth, attachmentId);
  await repository.softDeleteAttachment(attachment.id);
  await objectStore.deleteFile(attachment.storageKey);
}

async function requireReadyAttachment(auth: AuthContext, attachmentId: string) {
  const attachment = await repository.findAttachmentById(attachmentId);
  if (!attachment || attachment.status !== "READY") {
    throw new HttpError(404, "Attachment was not found.", "ATTACHMENT_NOT_FOUND");
  }

  authorizeOwner(auth, attachment.ownerId);
  return attachment;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.repository.ts</span>
  </div>

```ts
import { AttachmentStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../db/prisma.js";
import type { AttachmentDto, AttachmentRecord } from "./attachments.types.js";

export function toAttachmentDto(attachment: AttachmentRecord): AttachmentDto {
  return {
    id: attachment.id,
    noteId: attachment.noteId,
    originalName: attachment.originalName,
    storedName: attachment.storedName,
    mimeType: attachment.mimeType,
    detectedMimeType: attachment.detectedMimeType,
    extension: attachment.extension,
    byteSize: Number(attachment.byteSize),
    sha256: attachment.sha256,
    status: attachment.status,
    createdAt: attachment.createdAt.toISOString(),
    updatedAt: attachment.updatedAt.toISOString(),
    deletedAt: attachment.deletedAt?.toISOString() ?? null,
    downloadUrl: attachment.status === AttachmentStatus.READY ? `/attachments/${attachment.id}/download` : null
  };
}

export async function createAttachmentMetadata(input: {
  ownerId: string;
  noteId: string;
  originalName: string;
  storedName: string;
  storageKey: string;
  mimeType: string;
  detectedMimeType: string;
  extension: string;
  byteSize: number;
  sha256: string;
}): Promise<AttachmentRecord> {
  return prisma.attachment.create({
    data: {
      ...input,
      byteSize: BigInt(input.byteSize)
    }
  });
}

export async function listReadyAttachments(input: { ownerId: string; noteId: string }): Promise<AttachmentRecord[]> {
  return prisma.attachment.findMany({
    where: {
      ownerId: input.ownerId,
      noteId: input.noteId,
      status: AttachmentStatus.READY
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function findAttachmentById(id: string): Promise<AttachmentRecord | null> {
  return prisma.attachment.findUnique({ where: { id } });
}

export async function softDeleteAttachment(id: string): Promise<AttachmentRecord> {
  return prisma.attachment.update({
    where: { id },
    data: {
      status: AttachmentStatus.DELETED,
      deletedAt: new Date()
    }
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const noteAttachmentParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const attachmentParamsSchema = z.object({
  attachmentId: z.string().uuid()
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/modules/attachments/attachments.types.ts</span>
  </div>

```ts
import type { Attachment } from "../../generated/prisma/client.js";

export type AttachmentRecord = Attachment;

export type AttachmentDto = {
  id: string;
  noteId: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  detectedMimeType: string;
  extension: string;
  byteSize: number;
  sha256: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  downloadUrl: string | null;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/auth/auth-context.ts</span>
  </div>

```ts
import type { Response } from "express";
import type { Role } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/http-error.js";

export type AuthContext = {
  userId: string;
  email: string;
  role: Role;
  sessionId: string;
};

export function attachAuthContext(response: Response, auth: AuthContext): void {
  response.locals.auth = auth;
}

export function requireAuthContext(response: Response): AuthContext {
  const auth = response.locals.auth as AuthContext | undefined;
  if (!auth) {
    throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
  }
  return auth;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/auth/authenticate-session.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { config } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import { HttpError } from "../errors/http-error.js";
import { parseCookieHeader } from "../cookies/cookie-parser.js";
import { attachAuthContext } from "./auth-context.js";
import { hashSessionToken } from "./session-token.js";

export const authenticateSession: RequestHandler = async (request, response, next) => {
  try {
    const cookies = parseCookieHeader(request.headers.cookie);
    const token = cookies.get(config.SESSION_COOKIE_NAME);

    if (!token) {
      throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
    }

    const tokenHash = hashSessionToken(token);
    const session = await prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
      throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
    }

    attachAuthContext(response, {
      userId: session.userId,
      email: session.user.email,
      role: session.user.role,
      sessionId: session.id
    });

    next();
  } catch (error) {
    next(error);
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/auth/authorize-owner.ts</span>
  </div>

```ts
import type { AuthContext } from "./auth-context.js";
import { HttpError } from "../errors/http-error.js";

export function authorizeOwner(auth: AuthContext, ownerId: string): void {
  if (auth.userId !== ownerId) {
    throw new HttpError(403, "The resource does not belong to the authenticated user.", "OWNER_REQUIRED");
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/auth/csrf.ts</span>
  </div>

```ts
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";
import { prisma } from "../../db/prisma.js";
import { HttpError } from "../errors/http-error.js";
import { requireAuthContext } from "./auth-context.js";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function createCsrfToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashCsrfToken(token: string): string {
  return createHash("sha256").update("csrf:" + token, "utf8").digest("base64url");
}

export async function issueCsrfTokenForSession(sessionId: string): Promise<string> {
  const token = createCsrfToken();
  await prisma.session.update({
    where: { id: sessionId },
    data: { csrfTokenHash: hashCsrfToken(token) }
  });
  return token;
}

export const requireCsrfToken: RequestHandler = async (request, response, next) => {
  try {
    if (SAFE_METHODS.has(request.method)) {
      next();
      return;
    }

    const auth = requireAuthContext(response);
    const token = request.header("x-csrf-token");
    if (!token) {
      throw new HttpError(403, "CSRF token is required.", "CSRF_REQUIRED");
    }

    const session = await prisma.session.findUnique({
      where: { id: auth.sessionId },
      select: { csrfTokenHash: true }
    });

    if (!session?.csrfTokenHash || !isHashMatch(hashCsrfToken(token), session.csrfTokenHash)) {
      throw new HttpError(403, "CSRF token is invalid.", "CSRF_INVALID");
    }

    next();
  } catch (error) {
    next(error);
  }
};

function isHashMatch(candidateHash: string, expectedHash: string): boolean {
  const candidate = Buffer.from(candidateHash, "base64url");
  const expected = Buffer.from(expectedHash, "base64url");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/auth/password-hashing.ts</span>
  </div>

```ts
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt:${salt}:${derivedKey.toString("base64url")}`;
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  const [algorithm, salt, expectedKey] = passwordHash.split(":");
  if (algorithm !== "scrypt" || !salt || !expectedKey) {
    return false;
  }

  const candidateKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const expected = Buffer.from(expectedKey, "base64url");
  return candidateKey.length === expected.length && timingSafeEqual(candidateKey, expected);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/auth/session-token.ts</span>
  </div>

```ts
import { createHash, randomBytes } from "node:crypto";

export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update("session:" + token, "utf8").digest("base64url");
}

export function hashIpAddress(ip: string | undefined): string | undefined {
  return ip ? createHash("sha256").update("ip:" + ip, "utf8").digest("base64url") : undefined;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/cookies/session-cookie.ts</span>
  </div>

```ts
import type { Response } from "express";
import { config } from "../../config/env.js";

export function setSessionCookie(response: Response, token: string): void {
  const attributes = [
    `${config.SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${config.SESSION_TTL_SECONDS}`
  ];

  if (config.COOKIE_SECURE) {
    attributes.push("Secure");
  }

  response.setHeader("Set-Cookie", attributes.join("; "));
}

export function clearSessionCookie(response: Response): void {
  response.setHeader("Set-Cookie", `${config.SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/cookies/cookie-parser.ts</span>
  </div>

```ts
export function parseCookieHeader(header: string | undefined): Map<string, string> {
  const cookies = new Map<string, string>();

  for (const part of header?.split(";") ?? []) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (!rawName || rawValue.length === 0) {
      continue;
    }

    cookies.set(rawName, decodeURIComponent(rawValue.join("=")));
  }

  return cookies;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/errors/http-error.ts</span>
  </div>

```ts
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/errors/error-middleware.ts</span>
  </div>

```ts
import type { ErrorRequestHandler } from "express";
import { isPrismaKnownRequestError } from "../../db/prisma-errors.js";
import { isHttpError } from "./http-error.js";

export const errorMiddleware: ErrorRequestHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (isHttpError(error)) {
    response.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details ?? []
      }
    });
    return;
  }

  if (isPrismaKnownRequestError(error)) {
    response.status(409).json({
      error: {
        code: error.code,
        message: "Database constraint violation.",
        details: []
      }
    });
    return;
  }

  response.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error.",
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
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/middleware/not-found.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../errors/http-error.js";

export const notFound: RequestHandler = (request, _response, next) => {
  next(new HttpError(404, `Route ${request.method} ${request.path} was not found.`, "ROUTE_NOT_FOUND"));
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/middleware/request-id.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestId: RequestHandler = (request, response, next) => {
  const id = request.header("x-request-id") ?? randomUUID();
  response.locals.requestId = id;
  response.setHeader("x-request-id", id);
  next();
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/middleware/security-headers.ts</span>
  </div>

```ts
import helmet from "helmet";

export const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: "same-site" }
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/middleware/cors.ts</span>
  </div>

```ts
import cors from "cors";
import { config } from "../../config/env.js";

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || config.CORS_ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed."));
  },
  credentials: true
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/middleware/rate-limit.ts</span>
  </div>

```ts
import rateLimit from "express-rate-limit";

export const apiRateLimit = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/validation/validate-request.ts</span>
  </div>

```ts
import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validateRequest(schemas: RequestSchemas): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params) as Request["params"];
    }

    if (schemas.query) {
      request.query = schemas.query.parse(request.query) as Request["query"];
    }

    next();
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/logging/logger.ts</span>
  </div>

```ts
type LogFields = Record<string, unknown>;

export const logger = {
  info(message: string, fields: LogFields = {}): void {
    console.log(JSON.stringify({ level: "info", message, ...fields }));
  },
  error(message: string, fields: LogFields = {}): void {
    console.error(JSON.stringify({ level: "error", message, ...fields }));
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/src/shared/responses/send-response.ts</span>
  </div>

```ts
import type { Response } from "express";

export function sendResponse(response: Response, status: number, data: unknown): void {
  response.status(status).json({ data });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/openapi/openapi.yaml</span>
  </div>

```txt
openapi: 3.1.0
info:
  title: Notes Attachments API
  version: 1.0.0
paths:
  /auth/register:
    post:
      summary: Register a user and create a session.
  /auth/login:
    post:
      summary: Create a session.
  /auth/logout:
    post:
      summary: Revoke the current session.
  /auth/me:
    get:
      summary: Return the authenticated user.
  /auth/csrf:
    get:
      summary: Issue a CSRF token for unsafe methods.
  /notebooks:
    get:
      summary: List owned notebooks.
    post:
      summary: Create an owned notebook.
  /notebooks/{notebookId}/notes:
    get:
      summary: List notes in an owned notebook.
    post:
      summary: Create a note in an owned notebook.
  /notes/{noteId}:
    get:
      summary: Return an owned note.
    patch:
      summary: Update an owned note.
    delete:
      summary: Delete an owned note.
  /notes/{noteId}/attachments:
    post:
      summary: Upload exactly one file field named file.
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              required:
                - file
              properties:
                file:
                  type: string
                  format: binary
    get:
      summary: List ready attachments for an owned note.
  /attachments/{attachmentId}:
    get:
      summary: Return attachment metadata without internal storage paths.
    delete:
      summary: Soft delete attachment metadata and remove the stored object.
  /attachments/{attachmentId}/download:
    get:
      summary: Download bytes after owner authorization.
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tests/helpers/database.ts</span>
  </div>

```ts
import request from "supertest";
import { app } from "../../src/app.js";
import { prisma } from "../../src/db/prisma.js";

export async function resetDatabase(): Promise<void> {
  await prisma.attachment.deleteMany();
  await prisma.note.deleteMany();
  await prisma.notebook.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
}

export async function createAuthenticatedNote() {
  const agent = request.agent(app);
  const email = `learner-${Date.now()}@example.com`;

  const registerResponse = await agent
    .post("/auth/register")
    .send({ email, password: "Password12345!" });

  const userId = registerResponse.body.data.user.id as string;
  const csrfResponse = await agent.get("/auth/csrf");
  const csrfToken = csrfResponse.body.data.csrfToken as string;

  const notebook = await prisma.notebook.create({
    data: {
      ownerId: userId,
      name: "Upload Tests"
    }
  });

  const note = await prisma.note.create({
    data: {
      ownerId: userId,
      notebookId: notebook.id,
      title: "Attachment Test",
      body: "Attach files to this note."
    }
  });

  return { agent, userId, csrfToken, notebook, note };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tests/helpers/files.ts</span>
  </div>

```ts
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64"
);

export async function createFixtureDirectory(): Promise<string> {
  const directory = path.join(tmpdir(), `notes-attachments-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  await mkdir(directory, { recursive: true });
  return directory;
}

export async function writePngFixture(directory: string, filename = "diagram.png"): Promise<string> {
  const filePath = path.join(directory, filename);
  await writeFile(filePath, onePixelPng);
  return filePath;
}

export async function writeInvalidFixture(directory: string, filename = "fake.png"): Promise<string> {
  const filePath = path.join(directory, filename);
  await writeFile(filePath, Buffer.from("not a png"));
  return filePath;
}

export async function removeFixtureDirectory(directory: string): Promise<void> {
  await rm(directory, { recursive: true, force: true });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tests/upload.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writeInvalidFixture, writePngFixture } from "./helpers/files.js";

test("uploads one validated png attachment", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const response = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.originalName, "diagram.png");
  assert.equal(response.body.data.detectedMimeType, "image/png");
  assert.equal(response.body.data.storageKey, undefined);

  await removeFixtureDirectory(fixtureDirectory);
});

test("rejects extension and bytes mismatch", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const invalidPath = await writeInvalidFixture(fixtureDirectory);

  const response = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", invalidPath, { filename: "fake.png", contentType: "image/png" });

  assert.equal(response.status, 415);
  await removeFixtureDirectory(fixtureDirectory);
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tests/download.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writePngFixture } from "./helpers/files.js";

test("downloads attachment only after owner authorization", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const uploadResponse = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  const attachmentId = uploadResponse.body.data.id as string;
  const downloadResponse = await agent.get(`/attachments/${attachmentId}/download`);

  assert.equal(downloadResponse.status, 200);
  assert.equal(downloadResponse.headers["content-type"], "image/png");
  assert.equal(downloadResponse.headers["x-content-type-options"], "nosniff");
  assert.match(downloadResponse.headers["content-disposition"], /attachment/);
  assert.match(downloadResponse.headers.etag, /^"sha256-[a-f0-9]{64}"$/);

  await removeFixtureDirectory(fixtureDirectory);
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/tests/delete-attachment.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writePngFixture } from "./helpers/files.js";

test("soft deletes metadata and removes stored object", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const uploadResponse = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  const attachmentId = uploadResponse.body.data.id as string;
  const deleteResponse = await agent
    .delete(`/attachments/${attachmentId}`)
    .set("x-csrf-token", csrfToken);

  assert.equal(deleteResponse.status, 200);

  const getResponse = await agent.get(`/attachments/${attachmentId}`);
  assert.equal(getResponse.status, 404);

  await removeFixtureDirectory(fixtureDirectory);
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/notes-attachments-api/README.md</span>
  </div>

````txt
# Notes Attachments API

This mini project extends the protected notes API with multipart uploads, local object storage, PostgreSQL attachment metadata, owner-checked downloads, and soft deletion.

## Setup

Copy the sample environment file from the project directory:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Install dependencies and generate the Prisma client:

```bash
npm install
npm run prisma:generate
```

Run type checking:

```bash
npm run typecheck
```

Run database migrations and integration tests when PostgreSQL is available:

```bash
npm run prisma:migrate:dev
npm test
```

## Upload boundary

`POST /notes/:noteId/attachments` accepts exactly one multipart field named `file`. The server parses the request with Busboy, writes bytes to a temporary file, hashes the bytes, validates extension plus detected magic-number MIME type, copies the object through a local object-store adapter, then inserts attachment metadata.

## Download boundary

`GET /attachments/:attachmentId/download` performs session authentication and owner authorization before opening the object stream. The response includes `Content-Type`, `Content-Length`, `Content-Disposition`, `ETag`, and `X-Content-Type-Options`.
````
</div>

## 15. 知识迁移与真实项目场景

迁移到真实项目时，最容易变化的是 object-store adapter，而不是 controller 的业务边界。云对象存储、CDN、病毒扫描、图片处理、异步清理任务都可以接在 adapter 或后续 worker 层，但本章保留本地 filesystem，以便先看清 request stream、metadata 和 owner 授权机制。

## 16. 本章复盘任务

- 画出 upload request 从 browser 到 Busboy、temp file、object store、Prisma metadata 的完整链路。
- 解释 `express.json()` 为什么不会把 multipart body 解析成 `request.body.file`。
- 指出原始 filename、declared MIME、extension、magic number 各自的可信度。
- 解释为什么 metadata insert 和 filesystem copy 不是同一个 transaction。
- 写出下载前必须完成的 auth 和 owner check。

## 17. 最终心智模型

文件上传 API 的本质是“受控字节入口 + 元数据索引 + 受控字节出口”。入口负责限制、解析、临时存储、校验和清理；索引负责用 PostgreSQL 记录业务归属和对象键；出口负责先授权再输出字节。只要 filename 不控制路径、bytes 不走 public static、download 不绕过 owner check，这个模型就能在本地 filesystem 和未来 object storage 之间平滑迁移。

## 18. 官方资料

- [Node.js Stream](https://nodejs.org/api/stream.html)：stream/promises.pipeline models backpressure, completion, and error propagation.
- [Node.js File system](https://nodejs.org/api/fs.html)：fs and fs/promises provide file handles, streams, stat, mkdir, copy, and removal operations.
- [Node.js Path](https://nodejs.org/api/path.html)：path.resolve and path.relative support root containment checks; path.isAbsolute alone is not traversal defense.
- [Node.js Crypto](https://nodejs.org/api/crypto.html)：crypto.createHash hashes uploaded bytes for integrity and ETag generation.
- [Node.js Buffer](https://nodejs.org/api/buffer.html)：Buffer represents fixed-length byte sequences used by stream chunks and magic-number checks.
- [Node.js process](https://nodejs.org/api/process.html)：process signal handling defines server shutdown cleanup boundaries.
- [Node.js Test Runner](https://nodejs.org/api/test.html)：node --test runs integration tests without a separate test framework.
- [Node.js Assert](https://nodejs.org/api/assert.html)：node:assert/strict supplies test assertions.
- [MDN FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)：FormData builds multipart field and file parts.
- [MDN Using FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects)：Browser-generated multipart requests include a boundary parameter.
- [MDN Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type)：Content-Type declares media type but client-provided upload MIME is not trust proof.
- [MDN POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST)：POST supports multipart/form-data request bodies.
- [MDN MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types)：MIME type declarations are metadata, not byte verification.
- [MDN Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition)：Content-Disposition controls attachment download filenames.
- [MDN X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options)：nosniff prevents MIME type sniffing in supported browsers.
- [Busboy README](https://github.com/mscdex/busboy)：Busboy parses multipart request streams, emits field and file events, exposes limits, and warns against trusting filename.
- [file-type README](https://github.com/sindresorhus/file-type)：file-type detects file type from magic numbers and returns ext and mime or undefined.
- [Express 5 API](https://expressjs.com/en/5x/api/)：Express 5 request, response, routing, and built-in parsers are the HTTP framework boundary.
- [Express error handling](https://expressjs.com/en/5x/guide/error-handling/)：Express 5 forwards rejected async handlers to error middleware.
- [Prisma CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)：Prisma Client creates, reads, updates, and deletes metadata rows.
- [Prisma relation queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)：Relation queries model owner, note, and attachment boundaries.
- [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)：Database transactions do not make filesystem object writes atomic.
- [Prisma config](https://www.prisma.io/docs/orm/reference/prisma-config-reference)：Prisma v7 config moves datasource URL and seed command into prisma.config.ts.
- [Zod basics](https://zod.dev/basics)：Zod validates JSON bodies, route params, and query strings.
- [Zod API](https://zod.dev/api)：Zod schemas define request boundary contracts.
- [npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)：package.json defines scripts, dependencies, private flag, and engines.
- [npm run](https://docs.npmjs.com/cli/v11/commands/npm-run)：npm run executes local project scripts.
- [TypeScript TSConfig](https://www.typescriptlang.org/tsconfig/)：TSConfig defines NodeNext type-checking boundaries.
- [TypeScript module](https://www.typescriptlang.org/tsconfig/module)：module NodeNext aligns TypeScript with Node ESM behavior.
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)：Upload security requires extension allowlists, file type validation, size limits, filename safety, and storage outside webroot.
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)：Input validation should allowlist expected values.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)：Authorization checks must be enforced server-side for each resource.
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)：REST responses should avoid exposing sensitive internal implementation details.
