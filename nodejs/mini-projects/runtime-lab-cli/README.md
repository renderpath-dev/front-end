# runtime-lab-cli

`runtime-lab-cli` 是一个零依赖的 Node.js 运行时观察实验。它输出进程与操作系统信息，分别运行阻塞任务和异步任务，并用 `monitorEventLoopDelay()` 记录事件循环延迟。

<style>
.macos-code-window { margin: 1rem 0; overflow: hidden; border: 1px solid #d0d7de; border-radius: 10px; }
.macos-code-titlebar { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: #f6f8fa; }
.macos-code-dot { width: 12px; height: 12px; border-radius: 50%; }
.macos-code-dot.red { background: #ff5f57; }
.macos-code-dot.yellow { background: #febc2e; }
.macos-code-dot.green { background: #28c840; }
.macos-code-filename { margin-left: 6px; color: #57606a; font: 12px/1.2 ui-monospace, SFMono-Regular, Consolas, monospace; }
.macos-code-window + pre { margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0; }
</style>

## 运行要求

- Node.js 20 或更高版本。
- 在当前 `runtime-lab-cli` 目录运行命令。
- 项目没有第三方依赖，不需要安装依赖。

## 快速开始

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot red"></span>
    <span class="macos-code-dot yellow"></span>
    <span class="macos-code-dot green"></span>
    <span class="macos-code-filename">PowerShell</span>
  </div>
</div>

```powershell
npm.cmd run demo:both
```

也可以设置环境标签并直接传入参数：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot red"></span>
    <span class="macos-code-dot yellow"></span>
    <span class="macos-code-dot green"></span>
    <span class="macos-code-filename">PowerShell</span>
  </div>
</div>

```powershell
$env:RUNTIME_LAB_LABEL = "chapter-01"
npm.cmd start -- --task=both --block-ms=150 --async-ms=150
```

支持的参数：

- `--task=block|async|both`
- `--block-ms=<positive-number>`
- `--async-ms=<positive-number>`

## 如何阅读结果

- `runtimeInfo` 对应当前 Node.js 进程和宿主操作系统的快照。
- 阻塞任务的 `delayMilliseconds.max` 通常接近或高于 `--block-ms`，因为 JavaScript 线程在忙循环期间无法推进事件循环。
- 异步计时任务会耗费墙钟时间，但通常不会制造与等待时长相等的事件循环阻塞。
- 具体版本、进程 ID、内存、主机名和延迟数值因机器和运行时负载而变化。

典型输出形状如下，数值不是固定断言：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot red"></span>
    <span class="macos-code-dot yellow"></span>
    <span class="macos-code-dot green"></span>
    <span class="macos-code-filename">Terminal output</span>
  </div>
</div>

```text
Runtime lab: runtime-foundations
{
  "nodeVersion": "v26.x.x",
  "platform": "win32",
  "architecture": "x64"
}
Blocking task: {
  taskResult: 120,
  delayMilliseconds: { mean: 30, max: 125, percentile99: 125 }
}
Async task: {
  taskResult: 120,
  delayMilliseconds: { mean: 10, max: 12, percentile99: 12 }
}
```

## 文件职责

- `src/index.js`：解析命令行参数和环境变量，编排实验。
- `src/runtime-info.js`：读取 `process`、`os` 和内存信息。
- `src/task-simulator.js`：提供 CPU 阻塞任务与基于计时器的异步任务。
- `src/event-loop-delay.js`：启用、采样和关闭事件循环延迟直方图。

## 故障排查

- `--task must be block, async, or both.`：`--task` 使用了不支持的值。
- `--block-ms must be a positive number.`：参数不是大于零的有限数。
- PowerShell 找不到 `npm` 脚本时，使用 `npm.cmd`。
- 延迟数据与示例不同是正常现象；比较数量级和阻塞/异步两种机制，不要比较固定数值。
