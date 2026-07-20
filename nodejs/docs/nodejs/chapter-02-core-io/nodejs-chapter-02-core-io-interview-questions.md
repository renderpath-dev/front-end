# Node.js 第 2 章 Core I/O 面试题

## 使用方法

先用“结论—负责层—生命周期—证据”四步口述，再对照答案。答案以 Node.js Core I/O 和模块边界为范围，不把平台实现细节、文件系统语义或机器相关结果夸大为永久保证。

## 问题

### Buffer

1. Node.js 为什么需要 Buffer？它和 JavaScript string 的边界是什么？
2. `Buffer.from()`、`Buffer.alloc()` 与 `Buffer.allocUnsafe()` 分别适合什么场景？
3. `buf.subarray()` 为什么可能修改原 Buffer？怎样得到独立副本？

### Stream 与 backpressure

4. Readable、Writable、Duplex 和 Transform 的数据方向有什么区别？
5. backpressure 解决什么问题？`writable.write()` 返回 `false` 后应怎样处理？
6. `highWaterMark` 是硬内存上限吗？byte mode 与 object mode 有什么差异？
7. `pipeline()` 相比手动监听 `'data'` 事件提供了哪些机制保证？

### File System

8. `readFile()` 与 `createReadStream()` 的资源和内存边界有什么区别？
9. FileHandle 为什么必须显式关闭？为什么不能依赖自动关闭警告？
10. “temporary file + rename” 为什么常用于发布完整文件？它不保证什么？

### Path

11. `path.join()` 与 `path.resolve()` 有什么差异？
12. 为什么不能用字符串拼接处理跨平台路径或手工把 file URL 转成路径？

### EventEmitter

13. EventEmitter listener 是同步还是异步调用？这为什么重要？
14. `'error'` 事件为什么特殊？
15. `MaxListenersExceededWarning` 能证明存在内存泄漏吗？

### Process、stdin、stdout、stderr

16. `stdin`、`stdout` 与 `stderr` 在 Node.js 中是什么？为什么 stdout 和 stderr 要分开？
17. 为什么写入 stdout 时也可能需要处理 backpressure？
18. `process.exitCode = 1` 与 `process.exit(1)` 在 I/O 程序中有什么工程差异？

### CommonJS

19. CommonJS 的 require cache 怎样工作？缓存依据是什么？
20. `module.exports` 与 `exports` 是什么关系？为什么 `exports = value` 通常无效？
21. CommonJS 循环依赖为什么可能观察到部分初始化导出？

### ESM

22. ESM 的解析、链接和求值与 CommonJS 的同步包装执行有什么区别？
23. ESM live binding 与“导入时复制一个值”有什么区别？
24. ESM 循环依赖为什么可能触发 temporal dead zone？

### package.json 的 type、main、exports

25. `"type"` 如何影响 `.js`？它是否影响 `.mjs` 和 `.cjs`？
26. `"main"` 与 `"exports"` 有什么差异？两者同时存在时怎样选择？
27. 为什么添加 `"exports"` 可能成为 breaking change？

### 迷你项目设计

28. `large-file-log-processor` 如何避免把整个日志加载到内存？
29. 项目为什么需要 StringDecoder 和 remainder，而不能直接对每个 chunk 调用 `toString()` 后 split？
30. 为什么先写 temporary file，再在 pipeline 完成后 rename？错误路径应清理什么？

## 参考答案

### Buffer

#### 1

Buffer 是 Node.js 表示固定长度字节序列的对象，适合文件、socket、压缩数据和协议帧。string 表示字符序列；从 string 到 Buffer 必须经过 encoding，从 Buffer 到 string 必须按 encoding 解码。TypeScript 可以检查参数类型，但不会验证外部字节是否真符合声明的 encoding。

#### 2

`Buffer.from()` 从已有 string、array、Buffer 或 ArrayBuffer 建立字节序列；具体 overload 决定复制还是共享。`Buffer.alloc()` 分配并零填充，是普通新缓冲区的安全默认。`Buffer.allocUnsafe()` 跳过初始化，只有调用方能在任何读取前完整覆盖所有字节时才适用，否则可能观察到旧内存内容。

#### 3

`subarray()` 创建新的 view 对象，但它与源 Buffer 指向重叠的 backing store，因此写入 view 会修改源字节。独立副本可使用 `Buffer.from(view)` 或显式 copy。判断是否共享要看底层 `.buffer`、offset、范围和修改结果，不能只看变量是否是不同对象。

### Stream 与 backpressure

#### 4

Readable 从 source 向消费者交付 chunk；Writable 从生产者接收 chunk 并写向 destination。Duplex 同时有可读侧和可写侧，两侧缓冲可以独立；Transform 是一种 Duplex，其可写输入经过 `_transform()` 产生可读输出。类型名称描述数据方向和生命周期，不代表具体资源一定是文件或网络。

#### 5

backpressure 让较慢的消费者限制较快的生产者，避免 Writable 内部队列无限增长。`write()` 返回 `false` 表示缓冲达到阈值，生产者应停止继续写并等待 `'drain'`，或把连接交给 `pipe()` / `pipeline()` 管理。忽略返回值不会立刻丢数据，但会让进程继续积累内存。

#### 6

不是。`highWaterMark` 是开始施加 backpressure 的阈值，不是总内存硬上限；正在处理的 chunk、多个 Stream 缓冲和应用对象都可能增加实际内存。byte mode 通常按字节计量，object mode 按对象数量计量，因此同一个数值不能直接比较内存成本。

#### 7

`pipeline()` 连接各段 backpressure，把 error 传播到统一完成点，并在失败时销毁仍需终止的相关 Stream。Promise 版本在整条链成功结束时 fulfill，在错误时 reject。手动 `'data'` listener 会把 Readable 置于 flowing mode，但暂停、Writable drain、每段 error、finish/close 和清理仍要由应用自己正确组合。

### File System

#### 8

`readFile()` 在完成时返回整个 Buffer 或 string，峰值内存随文件大小增长。`createReadStream()` 打开 descriptor 后增量产生 Buffer chunk，使处理器可以在有界数量级缓冲下推进；但应用仍可能通过累积所有 chunk 重新制造整体内存。两者都涉及文件资源，只是交付和所有权模型不同。

#### 9

`open()` 返回的 FileHandle 包装操作系统 descriptor。显式 `close()` 会等待该 handle 上的待处理操作完成并释放资源；通常放在 `finally` 中。Node 可能对未关闭的 handle 尝试自动关闭并发出警告，但官方文档明确要求不要依赖这种不可靠行为。

#### 10

先在目标旁写 temporary file，可以避免消费者看到逐步写入的半成品；写入和关闭成功后再 `rename()` 缩小可见不完整状态的窗口。同目录通常也避免跨文件系统 rename 问题。但这不是数据库事务，也不自动保证目录项持久化、跨平台覆盖语义、并发写者协调或崩溃后的全部耐久性。

### Path

#### 11

`path.join()` 组合并规范化片段，结果不一定是绝对路径。`path.resolve()` 从右向左解析，直到形成绝对路径，并会使用当前工作目录作为必要基准。两者只计算字符串，不检查目标存在、权限、可信度或是否越过允许目录。

#### 12

Windows drive、UNC、separator 与 POSIX 根路径规则不同，字符串拼接容易制造无效或歧义路径。file URL 还有 percent-encoding、host 和 URL 语义，不能靠删除 `file:` 前缀转换。应使用 `node:path` 以及 `fileURLToPath()`、`pathToFileURL()`。

### EventEmitter

#### 13

`emit()` 默认在当前调用栈中按注册顺序同步调用 listener。listener 内的长计算、抛错或状态修改会直接影响 emit 调用者；只有 listener 自己调度 Promise、timer 或 I/O 时，后续工作才进入异步路径。因此不能把 EventEmitter 本身理解为后台队列。

#### 14

当 EventEmitter 发出 `'error'` 且没有至少一个对应 listener 时，Node 会抛出该错误、打印 stack trace，并使进程退出。资源所有者应注册 error 处理或把错误统一交给 `pipeline()` 等组合 API。仅监听其他事件不能覆盖这个特殊规则。

#### 15

不能。该 warning 表示同一 emitter 的某类 listener 数超过阈值，是重复注册或未清理的诊断信号，但也可能是有意的高 fan-out。应检查注册所有者、函数引用、移除时机和 heap/handle 证据；简单提高阈值只隐藏警告，不修复生命周期。

### Process、stdin、stdout、stderr

#### 16

`process.stdin` 是 Readable，`process.stdout` 和 `process.stderr` 是 Writable，但它们的具体同步性和 TTY/pipe 行为受目标与平台影响。stdout 用于正常程序输出，stderr 用于诊断和错误，使 shell 能独立重定向数据与错误。把业务数据写到 stderr 会破坏管道组合。

#### 17

当 stdout 连接到 pipe 或慢消费者时，Writable 内部缓冲也可能达到 highWaterMark，`write()` 会返回 `false`。大量输出程序需要等待 `'drain'` 或使用 Stream 组合，否则会积累内存。交互式 TTY 与文件重定向的表现可能不同，不能把一次机器上的速度当成通用保证。

#### 18

设置 `process.exitCode` 后，进程会在活动资源和已排队工作自然结束时带该状态退出；这给 stdout/stderr、Stream close 和 Promise 清理留下推进机会。`process.exit(1)` 会立即请求终止，可能截断异步输出或未完成写入。正常错误路径优先传播错误、清理资源并设置 exit code。

### CommonJS

#### 19

CommonJS 模块在第一次按 resolved filename 加载后进入 `require.cache`。后续 `require()` 若解析到同一文件，通常返回同一 `module.exports` 对象而不重新执行模块顶层。调用位置可能使同一 specifier 解析到不同文件；大小写差异也可能形成不同 cache key。

#### 20

CommonJS wrapper 开始时，`exports` 指向 `module.exports`。给 `exports.property` 赋值会修改同一对象；执行 `exports = value` 只让局部变量指向新值，不改变 loader 最终读取的 `module.exports`。替换整个导出值必须写 `module.exports = value`。

#### 21

为完成带环依赖图的加载，CommonJS 会把正在执行模块的当前 `module.exports` 暴露给对方，因此消费者可能拿到部分初始化对象。之后若顶层代码继续添加属性，缓存对象会更新；若依赖在初始化前读取值，则结果可能缺失。解决方式通常是拆环、导出延迟执行函数或重新安排所有权。

### ESM

#### 22

ESM 先解析 specifier、建立模块图、链接 import/export binding，再按依赖顺序求值；静态 import 不是普通函数调用。CommonJS 则为模块创建 wrapper，并由同步 `require()` 执行和返回 `module.exports`。这使两者在扩展名、URL 解析、缓存记录、循环依赖和 top-level await 上具有不同边界。

#### 23

named import 连接到 exporter 的 binding，不是在 import 时复制一个普通值。exporter 对该 binding 的合法更新会被 importer 后续读取到；importer 不能给 imported binding 重新赋值。对象内部可变性是另一个问题：live binding 描述变量绑定，不等同于深层不可变。

#### 24

ESM 在求值前已经链接依赖，但 `let`、`const`、`class` 等 lexical binding 在初始化前仍处于 temporal dead zone。循环中的模块若在对方完成初始化前读取该 binding，会得到 `ReferenceError`。拆分共享状态、延迟读取或消除顶层环比依赖执行顺序猜测更可靠。

### package.json 的 type、main、exports

#### 25

最近 package scope 中的 `"type": "module"` 使 `.js` 按 ESM 解释，`"type": "commonjs"` 使其按 CommonJS 解释。`.mjs` 始终是 ESM，`.cjs` 始终是 CommonJS，不受 `"type"` 改写。显式类型还能避免 ambiguous `.js` 的语法检测成本和工具分歧。

#### 26

`"main"` 是传统单入口字段；`"exports"` 可以定义主入口、subpath、conditions，并封装未公开路径。在受支持的 Node 版本中两者同时存在时，`"exports"` 优先。兼容旧工具时可同时保留一致的 `"main"`，但公开面应由 `"exports"` 明确定义。

#### 27

没有 `"exports"` 时，消费者可能 deep import package 内任意可达文件。添加 `"exports"` 后，未声明 subpath 会抛 `ERR_PACKAGE_PATH_NOT_EXPORTED`，即使文件仍存在，因此会破坏依赖内部路径的消费者。发布前要把现有公开入口显式映射，并把收缩公开面当作 semver 变更评估。

### 迷你项目设计

#### 28

入口使用 `createReadStream()` 产生 Buffer chunk，LineSplitter 只保留不完整 UTF-8 字节和尾部半行，LogSummaryTransform 只保留计数器，Writable 只缓冲有限输出。`pipeline()` 连接 backpressure，因此输入规模增长时不会把全部 record 放入数组。内存仍受各段 highWaterMark、当前 chunk 和状态映射影响，不是绝对常数。

#### 29

文件系统 chunk 边界不等于 UTF-8 字符边界，也不等于 NDJSON 行边界。直接逐 chunk 解码可能把多字节字符拆开，直接 split 还会把半行错误地交给 JSON parser。StringDecoder 保留不完整字符字节，remainder 保留最后一段不完整行，直到下一个 chunk 或 `_flush()` 才交付。

#### 30

直接写最终路径会让读取者在失败时看到截断 JSON。项目先把 pipeline 输出写到同目录 temporary file；只有所有 Stream 正常完成和关闭后才 `rename()` 发布结果。任何 read、transform 或 write error 都应使 pipeline reject，随后删除 temporary file、保留旧结果并设置非零退出状态。
