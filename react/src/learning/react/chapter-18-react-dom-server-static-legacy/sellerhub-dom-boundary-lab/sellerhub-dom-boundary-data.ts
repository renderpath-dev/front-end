export type RemovedApiMigration = {
  legacyApi: string
  replacement: string
  boundary: string
  guidance: string
}

export type DecisionRow = {
  scenario: string
  preferredBoundary: string
  avoid: string
  evidence: string
}

export type LegacyApiGuidance = {
  api: string
  readFor: string
  modernPreference: string
  keepWhen: string
}

export const removedApiMigrations: RemovedApiMigration[] = [
  {
    legacyApi: 'ReactDOM.render',
    replacement: 'createRoot(container).render(<App />)',
    boundary: 'Client root',
    guidance: 'Use the modern root object for client-rendered apps.',
  },
  {
    legacyApi: 'ReactDOM.hydrate',
    replacement: 'hydrateRoot(container, <App />)',
    boundary: 'Hydration root',
    guidance: 'Use only when matching server-generated HTML already exists.',
  },
  {
    legacyApi: 'findDOMNode',
    replacement: 'Explicit refs',
    boundary: 'DOM node ownership',
    guidance: 'Attach a ref to the node you own instead of asking React to find one.',
  },
  {
    legacyApi: 'unmountComponentAtNode',
    replacement: 'root.unmount()',
    boundary: 'Root lifecycle',
    guidance: 'Unmount through the root object that owns the tree.',
  },
  {
    legacyApi: 'renderToNodeStream',
    replacement: 'renderToPipeableStream',
    boundary: 'Node stream server rendering',
    guidance: 'Use the modern streaming API in a Node server runtime.',
  },
  {
    legacyApi: 'renderToStaticNodeStream',
    replacement: 'prerenderToNodeStream or renderToStaticMarkup',
    boundary: 'Static server rendering',
    guidance: 'Choose a static API or non-interactive static markup intentionally.',
  },
]

export const legacyApiGuidance: LegacyApiGuidance[] = [
  {
    api: 'createElement',
    readFor: 'JSX transform output and generated element objects.',
    modernPreference: 'Write JSX for application components.',
    keepWhen: 'A library builds elements from a schema or plugin registry.',
  },
  {
    api: 'Children',
    readFor: 'Unknown children traversal in library boundaries.',
    modernPreference: 'Prefer explicit arrays, props, or named slots.',
    keepWhen: 'A component library must inspect opaque children from users.',
  },
  {
    api: 'cloneElement',
    readFor: 'Prop injection into an existing React element.',
    modernPreference: 'Prefer explicit props, render props, or context before prop injection.',
    keepWhen: 'A library boundary must preserve the child element while adding behavior.',
  },
  {
    api: 'Component and PureComponent',
    readFor: 'Class instance state, lifecycle methods, and shallow comparison.',
    modernPreference: 'Write function components for new code.',
    keepWhen: 'A stable legacy library or migration layer still owns class components.',
  },
  {
    api: 'createRef and forwardRef',
    readFor: 'Legacy ref object and wrapper-based ref forwarding.',
    modernPreference: 'Use ref as a prop where React 19 library boundaries allow it.',
    keepWhen: 'A published component API must support older consumers.',
  },
]

export const domBoundaryDecisions: DecisionRow[] = [
  {
    scenario: 'Help desk modal must escape an overflow-hidden panel.',
    preferredBoundary: 'createPortal to a stable modal root.',
    avoid: 'Creating a second React root for modal content.',
    evidence: 'The modal keeps React context and event ownership from the caller tree.',
  },
  {
    scenario: 'Scroll to a newly inserted escalation note before measuring it.',
    preferredBoundary: 'flushSync only around the urgent insertion.',
    avoid: 'Wrapping every state update in flushSync.',
    evidence: 'Measurement is read after the forced commit, not during render.',
  },
  {
    scenario: 'Seller dashboard likely needs a font and analytics script.',
    preferredBoundary: 'Resource hint decision owned by the app shell or framework.',
    avoid: 'Confusing preload with React lazy code splitting.',
    evidence: 'The hint targets browser connection or fetch work, not component rendering.',
  },
  {
    scenario: 'Current Vite page starts from empty client HTML.',
    preferredBoundary: 'createRoot in the browser entry.',
    avoid: 'hydrateRoot without server-generated matching markup.',
    evidence: 'Hydration requires existing HTML rendered by React on the server or build.',
  },
  {
    scenario: 'Audit an old plugin using cloneElement and findDOMNode.',
    preferredBoundary: 'Library boundary review plus migration table.',
    avoid: 'Blind rewrite without knowing consumer contracts.',
    evidence: 'Removed APIs need replacement, while some legacy APIs may remain as adapters.',
  },
]

export const resourcePreloadDecisions: DecisionRow[] = [
  {
    scenario: 'Connect to a seller image CDN before the first image URL is known.',
    preferredBoundary: 'prefetchDNS or preconnect',
    avoid: 'Using React.lazy for network connection setup.',
    evidence: 'The browser can resolve DNS or open a connection before the module graph changes.',
  },
  {
    scenario: 'Fetch a critical dashboard stylesheet before navigation completes.',
    preferredBoundary: 'preload with as="style"',
    avoid: 'Waiting for the component to render before discovering the stylesheet.',
    evidence: 'A resource hint asks the browser to fetch the asset earlier.',
  },
  {
    scenario: 'Prepare an ESM analytics module that is likely needed soon.',
    preferredBoundary: 'preloadModule or preinitModule',
    avoid: 'Assuming this replaces Vite dynamic import chunk loading.',
    evidence: 'The hint is about browser fetching and evaluation, not React component suspension.',
  },
]

export const serverStaticCards = [
  {
    title: 'Blocking string rendering',
    api: 'renderToString / renderToStaticMarkup',
    boundary: 'Server runtime',
    note: 'A Vite client page can document the boundary but should not pretend to run a production server.',
  },
  {
    title: 'Streaming server rendering',
    api: 'renderToPipeableStream / renderToReadableStream',
    boundary: 'Node stream or Web stream runtime',
    note: 'Streaming ownership belongs to a server or framework that controls response headers and hydration scripts.',
  },
  {
    title: 'Static prerender and resume',
    api: 'prerender / prerenderToNodeStream / resume family',
    boundary: 'Static or framework runtime',
    note: 'These APIs are not ordinary business component APIs and are modeled here as reading boundaries.',
  },
]
