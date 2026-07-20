# Node.js 第 2 章 Core I/O 速查表

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

## 一句话模型

Node.js Core I/O 把路径和模块说明符解析成资源边界，把文件或标准流中的字节表示为 Buffer，再由 Stream、Events 和模块加载器控制数据流动、错误传播、资源关闭与代码公开面。

## Buffer 速查

| API / 属性 | 作用 | 关键边界 |
| --- | --- | --- |
| `Buffer.from(string, encoding)` | 按 encoding 把字符编码为字节 | 默认 encoding 是 UTF-8 |
| `Buffer.from(buffer)` | 复制 Buffer 字节 | 新 backing store |
| `Buffer.alloc(size)` | 分配并零填充 | 安全默认 |
| `Buffer.allocUnsafe(size)` | 分配但不初始化 | 使用前必须完整覆盖 |
| `buf.subarray(start, end)` | 建立共享视图 | 修改会影响源 |
| `buf.toString(encoding)` | 按 encoding 解码字节 | 错误 encoding 会改变结果 |
| `buf.length` | 字节长度 | 不等于字符数 |

## Encoding 速查

| Encoding | 典型用途 | 注意点 |
| --- | --- | --- |
| `utf8` | 通用文本 | 多字节字符可能跨 chunk |
| `utf16le` | UTF-16 little-endian 数据 | 字节数通常不是字符数 |
| `latin1` | 单字节兼容数据 | 不能表示全部 Unicode 字符 |
| `hex` | 字节的十六进制文本表示 | 两个 hex 字符表示一个 byte |
| `base64` | 二进制到文本传输 | 是编码，不是加密 |
| `base64url` | URL-safe Base64 | 字符表和 padding 规则不同 |

## Buffer 分配与共享规则

- 普通新缓冲区优先使用 `Buffer.alloc()`。
- 已有文本或字节序列使用 `Buffer.from()`。
- `Buffer.allocUnsafe()` 只适合能立即完整覆盖全部字节的路径。
- `subarray()` 和 Buffer 的 `slice()` 都共享底层内存；需要独立所有权时使用 `Buffer.from(view)`。
- `Buffer.from(arrayBuffer, offset, length)` 可与 ArrayBuffer 共享内存；不要只根据对象数量判断是否复制。
- TypeScript 只能检查 API 类型，不能证明两个 view 是否共享 backing store。

## Stream 类型比较

| 类型 | 数据方向 | 关键实现点 |
| --- | --- | --- |
| `Readable` | source → consumer | `_read()`、`push()`、`end` |
| `Writable` | producer → destination | `_write()`、`write()`、`finish` |
| `Duplex` | 可读且可写 | 两侧缓冲和生命周期相互独立 |
| `Transform` | writable input → readable output | `_transform()`、可选 `_flush()` |

## Backpressure 快速模型

`producer → writable queue → consumer`

- `writable.write(chunk) === true`：内部队列仍可接受当前生产速度。
- `writable.write(chunk) === false`：生产者应暂停，等待 `'drain'`。
- `highWaterMark` 是施加 backpressure 的阈值，不是硬内存上限。
- byte mode 通常按字节计量；object mode 按对象数量计量。
- `pipe()` 和 `pipeline()` 会协调常见的 backpressure 路径。

## pipeline 与手动 data listener

| 方式 | Backpressure | 错误传播 | 完成点 | 适用场景 |
| --- | --- | --- | --- | --- |
| `pipeline()` | 自动连接上下游流控 | 统一传播并销毁相关 Stream | callback 或 Promise | 多段生产数据链 |
| 手动 `'data'` listener | 应用自己暂停/恢复或等待 drain | 每段都要显式处理 | 需要自行组合 | 需要特殊分支控制的事件消费 |

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: bounded stream copy</span>
  </div>

```mjs
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('input.bin'),
  createWriteStream('output.bin'),
);
```
</div>

## File System API 家族

| 家族 | 完成模型 | Event loop 影响 | 典型用途 |
| --- | --- | --- | --- |
| callback API | callback | 等待异步完成 | 需要 callback 风格集成 |
| `node:fs/promises` | Promise | 等待异步完成 | `async` / `await` 控制流 |
| sync API | 直接返回或抛错 | 当前 JavaScript 线程同步等待 | 启动脚本或受控小任务 |
| Stream API | chunk + Stream 生命周期 | 增量推进 | 大文件和数据管道 |

`readFile()` 在完成时提供整体 Buffer/string；`createReadStream()` 分块读取；`open()` 返回 FileHandle，适合精细控制 offset、读取范围和资源生命周期。

## FileHandle 生命周期检查

- [ ] `open()` 成功后明确谁拥有 FileHandle。
- [ ] 读取/写入使用实际返回的 `bytesRead` 或 `bytesWritten`。
- [ ] `close()` 放在 `finally` 或等价清理路径。
- [ ] 不依赖垃圾回收或进程警告代替显式关闭。
- [ ] 并发操作是否有明确顺序，而不是假设 Promise 自动串行。
- [ ] 错误路径是否仍能关闭 descriptor。

## Path API 速查

| API | 作用 | 不保证 |
| --- | --- | --- |
| `path.join(...segments)` | 组合并规范化片段 | 不保证绝对路径 |
| `path.resolve(...segments)` | 从右向左解析绝对路径 | 不保证存在或安全 |
| `path.dirname(path)` | 取得父目录部分 | 不访问文件系统 |
| `path.basename(path)` | 取得末段名称 | 不验证文件类型 |
| `path.extname(path)` | 取得末段扩展名 | 不识别内容格式 |
| `path.relative(from, to)` | 计算相对路径 | 不执行权限检查 |
| `path.posix` / `path.win32` | 显式使用某套路径规则 | 不改变实际操作系统 |

文件 URL 与文件系统路径使用 `fileURLToPath()`、`pathToFileURL()` 转换，不要手工裁剪 `file:` 前缀。

## EventEmitter 速查

| API / 事件 | 规则 |
| --- | --- |
| `on(name, listener)` | 重复注册会产生多个 listener |
| `once(name, listener)` | 第一次调用后自动移除 |
| `off(name, listener)` | 需要相同函数引用 |
| `emit(name, ...args)` | 默认按注册顺序同步调用 |
| `'error'` | 没有 listener 时会抛错并终止进程 |
| `setMaxListeners()` | 调整警告阈值，不修复 listener 所有权问题 |

## CommonJS 速查

- 入口通常使用 `.cjs`，或在 `"type": "commonjs"` package scope 中使用 `.js`。
- `require(specifier)` 同步解析并执行模块。
- cache key 基于 resolved filename；解析到同一文件时通常返回同一 exports 对象。
- `module.exports` 是最终导出值；`exports` 初始只是它的别名。
- 循环依赖可能观察到“部分完成”的 exports。
- 需要重复执行逻辑时导出函数，不要依赖清空 cache。

## ESM 速查

- `.mjs` 始终按 ESM 处理；`"type": "module"` 控制 scope 内的 `.js`。
- 静态 `import` 在求值前完成解析、链接和实例化。
- 相对 specifier 通常必须写完整扩展名。
- named export 是 live binding，importer 读取 exporter 当前 binding。
- `import()` 返回 Promise，可从 CommonJS 或 ESM 使用。
- 循环依赖中的 lexical binding 可能仍处于 temporal dead zone。

## package.json type / main / exports

| 字段 | 作用 | 关键规则 |
| --- | --- | --- |
| `"type"` | 决定最近 package scope 内 `.js` 的模块格式 | 不改变 `.mjs` / `.cjs` |
| `"main"` | 传统 package 主入口 | 只能表达单个传统入口 |
| `"exports"` | 定义公开入口、subpath 和 conditions | 存在时优先于 `main` 并封装未声明 subpath |

package boundary 由最近的 `package.json` 决定。`"exports"` 中 condition 的对象键顺序具有匹配意义；常见 condition 包括 `"import"`、`"require"`、`"node"` 和 `"default"`。

## 常见错误

| 症状 | 原因 | 修正 |
| --- | --- | --- |
| 修改 view 后源 Buffer 改变 | 把共享视图当成 copy | `Buffer.from(view)` |
| 中文跨 chunk 乱码 | 直接逐 chunk 解码 | 使用 `StringDecoder` 或正确 decoder |
| 内存随文件增长 | 累积所有 chunk/record | 增量 Transform |
| Writable 队列持续增长 | 忽略 `write() === false` | 等待 `'drain'` 或使用 `pipeline()` |
| descriptor 泄漏 | FileHandle 未关闭 | `try/finally` + `close()` |
| Windows 路径失败 | 手拼 `/` 或 `\` | 使用 `node:path` |
| emitter 导致进程退出 | `'error'` 没有 listener | 在资源所有者处处理或传播 |
| `exports = value` 不生效 | 只重绑定局部别名 | `module.exports = value` |
| ESM 相对导入失败 | 缺少扩展名或路径错误 | 使用完整相对 specifier |
| deep import 被拒绝 | subpath 未公开 | 通过 `"exports"` 暴露或使用公开入口 |

## 官方资料

- [Node.js Buffer API](https://nodejs.org/api/buffer.html)
- [Node.js Stream API](https://nodejs.org/api/stream.html)
- [Node.js File System API](https://nodejs.org/api/fs.html)
- [Node.js Path API](https://nodejs.org/api/path.html)
- [Node.js Events API](https://nodejs.org/api/events.html)
- [Node.js Process API](https://nodejs.org/api/process.html)
- [Node.js CommonJS Modules](https://nodejs.org/api/modules.html)
- [Node.js ECMAScript Modules](https://nodejs.org/api/esm.html)
- [Node.js Packages](https://nodejs.org/api/packages.html)
