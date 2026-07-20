# Node.js 第 8 章面试题：文件上传、Multipart 与安全下载

## 1. 为什么 `express.json()` 不能解析文件上传？

`express.json()` 只匹配 JSON media type 并按 JSON 语法解析 body；multipart body 是 boundary 分割的字节流，需要 multipart parser 读取 request stream。

## 2. 为什么不要手动设置浏览器 `multipart/form-data` header？

浏览器生成的 body boundary 必须和 header boundary 一致。手动覆盖 header 很容易缺失或错配 boundary。

## 3. Busboy 的 `file` event 给你的是什么？

它给的是文件 part 的 readable stream 和 metadata，不是完整 Buffer。服务端应消费 stream，否则 parser finish 可能无法完成。

## 4. `fileSize` limit 触发后还需要做什么？

检查 stream 的 truncated 状态或 limit event，并删除已经写入的 temp file。

## 5. 为什么上传文件先写 temp file？

temp file 是校验前的隔离区。校验失败、abort、数据库失败时可以安全删除，不污染正式 storage root。

## 6. extension、declared MIME、magic number 的信任等级有什么区别？

extension 和 declared MIME 都由客户端控制；magic number 来自真实字节但受检测库支持范围限制。

## 7. 为什么原始 filename 只能做 metadata？

filename 可能包含路径、欺骗后缀、控制字符或重复名。路径必须由 server-generated storage key 控制。

## 8. 如何防止 storage key 路径穿越？

固定 storage root，用 `path.resolve(root, key)` 得到 candidate，再用 `path.relative(root, candidate)` 确认没有以 `..` 开头且不是 absolute path。

## 9. 为什么 metadata insert 和 object copy 不是一个事务？

PostgreSQL transaction 只能覆盖数据库操作，不能回滚 filesystem copy。需要补偿删除和 orphan cleanup 策略。

## 10. 安全下载的关键顺序是什么？

先认证 session，再验证 attachment owner，再 stat/open object stream，最后设置 headers 并输出 bytes。

## 11. 为什么不要用 public static 目录提供上传文件？

static route 绕过业务授权；攻击者知道 URL 就可能直接获取字节。

## 12. 删除附件时为什么要同时处理 metadata 和 object？

metadata 表示业务可见性，object 是实际字节。只删一个会导致幽灵记录或 orphan object。

## 官方资料

- [Node.js Stream](https://nodejs.org/api/stream.html)
- [Node.js File system](https://nodejs.org/api/fs.html)
- [Node.js Path](https://nodejs.org/api/path.html)
- [Node.js Crypto](https://nodejs.org/api/crypto.html)
- [Node.js Buffer](https://nodejs.org/api/buffer.html)
- [Node.js process](https://nodejs.org/api/process.html)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [Node.js Assert](https://nodejs.org/api/assert.html)
- [MDN FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [MDN Using FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects)
- [MDN Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type)
- [MDN POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST)
- [MDN MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types)
- [MDN Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition)
- [MDN X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options)
- [Busboy README](https://github.com/mscdex/busboy)
- [file-type README](https://github.com/sindresorhus/file-type)
- [Express 5 API](https://expressjs.com/en/5x/api/)
- [Express error handling](https://expressjs.com/en/5x/guide/error-handling/)
- [Prisma CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [Prisma relation queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)
- [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)
- [Prisma config](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
- [Zod basics](https://zod.dev/basics)
- [Zod API](https://zod.dev/api)
- [npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm run](https://docs.npmjs.com/cli/v11/commands/npm-run)
- [TypeScript TSConfig](https://www.typescriptlang.org/tsconfig/)
- [TypeScript module](https://www.typescriptlang.org/tsconfig/module)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
