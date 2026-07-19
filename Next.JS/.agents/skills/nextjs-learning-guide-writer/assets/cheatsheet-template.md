# Next.js 主题速查表

生成实际内容时，用具体主题替换标题和所有 placeholder。速查表是章节机制的压缩索引，不得引入正文没有解释的新机制。

## 一句话概念总结

用一句话说明该概念解决的问题、主要 owner 和关键 runtime boundary。

## Router 与 runtime 边界

| Concept | Router | Executes On | Client Bundle | Primary Owner |
| --- | --- | --- | --- | --- |
| Replace with actual concept | App / Pages | server / browser / build / deployment | yes / no / boundary-dependent | React / Next.js / Web API / tooling / platform |

## 常用文件约定与 API

| File / API | Layer | Purpose | Input | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- |
| Replace with actual file or API | framework convention | 说明用途 | 说明 concrete input | 说明 RSC / HTML / Response / cache effect | 说明错误规则 |

## 请求与导航链路

| Stage | Concrete Value | Owner | Observable Result |
| --- | --- | --- | --- |
| Trigger | URL / navigation / form / action | browser / React / Next.js | 说明可观察行为 |
| Server | Request / params / cache entry | Next.js / server runtime | 说明 server result |
| Transport | RSC Payload / HTML / Response | React / Next.js / Web API | 说明传输内容 |
| Browser | client bundle / hydration / navigation | React / browser | 说明 UI behavior |

## 相似概念对比

| Concept A | Concept B | Key Difference | Use A When | Use B When |
| --- | --- | --- | --- | --- |
| Server Component | Client Component | module graph、runtime 和 bundle boundary | 说明场景 | 说明场景 |
| Route Handler | Server Action | HTTP endpoint 与 mutation call path | 说明场景 | 说明场景 |
| Request memoization | Persistent cache | request-scoped reuse 与跨请求 storage | 说明场景 | 说明场景 |

## 错误类型

| Error / Symptom | Layer | Violated Rule | Correction | Recognition Signal |
| --- | --- | --- | --- | --- |
| Replace with actual error | build / type / server runtime / hydration / cache / deployment | 说明精确规则 | 说明修复 | 说明真实项目信号 |

## 真实项目使用

| Scenario | Mechanism | Server Work | Browser Work | Risk | Practical Rule |
| --- | --- | --- | --- | --- | --- |
| Replace with actual scenario | 说明 mechanism | 说明 server path | 说明 browser path | 说明风险 | 给出可执行规则 |

## 最小模板

### Server Component 模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: async server page</span>
  </div>

```tsx
type PageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { itemId } = await params;
  return <h1>Item {itemId}</h1>;
}
```
</div>

说明模板适用的 Next.js version、Router、server/client boundary、RSC output 和 runtime validation requirement。

### Route Handler 模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: JSON route handler</span>
  </div>

```ts
export async function GET(request: Request) {
  const url = new URL(request.url);
  return Response.json({ pathname: url.pathname });
}
```
</div>

说明 Web API owner、Next.js file convention、HTTP behavior 和 caching assumptions。
