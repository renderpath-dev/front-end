# Node.js 第 1 章运行时基础速查表

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

Node.js 是把 V8、Node 核心 API、libuv 和操作系统能力组合起来的 JavaScript 运行时。V8 执行 JavaScript；Node 绑定宿主能力；libuv 管理事件循环和一部分异步 I/O；操作系统完成底层资源操作。

## 运行时边界

| 观察项 | Browser | Node.js |
|---|---|---|
| JavaScript 引擎 | 浏览器内置引擎 | 通常由 Node.js 内嵌 V8 |
| 主要全局对象 | `window`、`document` | `process`、`Buffer`、`globalThis` |
| UI/DOM | 浏览器宿主提供 | 默认不提供 |
| 文件、进程、OS | 浏览器沙箱限制 | Node 核心 API 提供 |
| 模块入口 | 页面/打包器/浏览器模块 | Node 模块加载器与 `package.json` |

## 调度顺序的实用规则

1. 当前同步调用栈先完成。
2. CommonJS 示例中，当前操作结束后通常先清空 `process.nextTick()` 队列，再处理 Promise 微任务。
3. 事件循环进入不同阶段处理计时器、I/O、`setImmediate()` 和关闭回调。
4. 顶层 `setTimeout(fn, 0)` 与 `setImmediate(fn)` 的先后不能作为稳定契约。
5. 在 I/O 回调中同时调度时，`setImmediate()` 通常先于 `setTimeout(fn, 0)`。
6. Node.js 20/libuv 1.45 起，计时器只在 poll 阶段之后运行；旧图示可能已经过时。

## 高频 API

| API | 用途 | 关键边界 |
|---|---|---|
| `process.argv` | 读取启动参数 | 前两项是可执行文件和入口脚本 |
| `process.env` | 读取进程环境 | 值是字符串或 `undefined` |
| `process.exitCode` | 设置自然退出状态 | 允许已排队输出和回调继续推进 |
| `process.once(signal, handler)` | 接收终止信号 | 注册后需要自己完成退出 |
| `os.availableParallelism()` | 获取建议并行度 | 不等同于“事件循环线程数” |
| `performance.now()` | 单调高精度计时 | 适合测量时长 |
| `monitorEventLoopDelay()` | 采样事件循环延迟 | 直方图原始单位是纳秒 |
| `setImmediate()` | 在 check 阶段执行 | 不是“立即同步执行” |
| `process.nextTick()` | 当前操作后优先回调 | 递归调度会饿死 I/O |

## 常用命令

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
node --version
node practices/01-runtime/01-runtime-boundary/browser-vs-node-runtime.js
node practices/01-runtime/02-event-loop/timer-immediate-order.js
node practices/01-runtime/03-process-lifecycle/process-exit-code.js failure
$LASTEXITCODE
```
</div>

## 阻塞检查

- 回调中是否存在随输入增长的长循环？
- 是否使用同步文件系统、同步加密或同步压缩 API 处理请求？
- 是否递归调度 `process.nextTick()`？
- 是否把“异步函数”误等同于“不占用 JavaScript 线程”？
- 是否测量了事件循环延迟，而不只是请求总耗时？

## 退出检查

- 正常失败优先设置 `process.exitCode`，避免不必要的 `process.exit()`。
- `SIGINT`、`SIGTERM` 处理器必须幂等。
- 停止接收新工作，再释放服务器、连接、计时器和文件资源。
- 给清理过程设置明确超时；超时策略由应用决定。
- Windows 与 POSIX 的信号支持存在差异，部署前在目标环境验证。

## TypeScript 边界

TypeScript 可检查 `process.env.NAME` 可能为 `undefined`、限制任务选项联合类型，并提供 Node API 类型；它不会改变 V8、libuv、事件循环阶段、操作系统信号或 I/O 完成时机。

## 易错结论

| 错误说法 | 正确说法 |
|---|---|
| Node.js 是一种语言 | JavaScript 是语言，Node.js 是运行时 |
| 异步等于多线程 JavaScript | JavaScript 回调通常仍在事件循环线程执行 |
| 所有异步 I/O 都在线程池 | 网络通常依赖 OS 非阻塞轮询；部分文件、DNS、加密等使用线程池 |
| `setTimeout(fn, 0)` 立即执行 | 到期只表示具备调度资格，仍需等待事件循环 |
| `process.exit()` 会等待日志写完 | 它会强制退出，可能截断异步写入 |
