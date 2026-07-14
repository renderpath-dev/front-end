import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-13",
  "slug": "chapter-13-nextjs-ssr-rsc",
  "title": "React Chapter 13: Next.js App Router, SSR, Hydration, and Server Components",
  "sourcePath": "docs/react/chapter-13-nextjs-ssr-rsc/react-chapter-13-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-13-nextjs-app-router-ssr-hydration-and-server-components",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 13: Next.js App Router, SSR, Hydration, and Server Components"
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "chapter-code-location-index",
      "children": [
        {
          "type": "text",
          "value": "Chapter Code Location Index"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "learning goals"
          }
        ],
        [
          {
            "type": "text",
            "value": "corresponding file/fragment"
          }
        ],
        [
          {
            "type": "text",
            "value": "type"
          }
        ],
        [
          {
            "type": "text",
            "value": "is located is"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Next.js framework boundary: Why is it not just router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.1"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "App Router file-system routing: segment, page, layout"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.2"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "App Router file-system routing: segment, page, layout"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.2"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "loading.tsx, error.tsx, not-found.tsx's route boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/03-route-special-files/route-special-file-boundaries.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.3"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server Component Default Behavior and Prohibitions"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-model.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.4"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server Component Default Behavior and Prohibitions"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.4"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Client Component and \"use client\" module boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/05-client-component-boundary/client-component-boundary-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server -> Client props serialization boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-boundary.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.6"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server -> Client props serialization boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.6"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SSR, CSR, SSG, ISR and dynamic rendering"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-matrix.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.7"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SSR, CSR, SSG, ISR and dynamic rendering"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.7"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Hydration and hydration mismatch"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-lab.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Hydration and hydration mismatch"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Browser-only API guard: window, localStorage, time, random"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-model.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.9"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Browser-only API guard: window, localStorage, time, random"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.9"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Suspense streaming and segment-level pending UI"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/10-suspense-streaming-boundary/streaming-boundary-model.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.10"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "The difference between Server fetch, cache, revalidate and client fetch"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-model.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.11"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "The difference between Server fetch, cache, revalidate and client fetch"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-panel.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.11"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Route Handlers, Proxy/Middleware, Metadata and deployment runtime"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/12-route-runtime-boundaries/route-runtime-boundary-map.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SellerHub Next.js architecture mapping"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice file"
            }
          ],
          [
            {
              "type": "text",
              "value": "9.13"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SellerHub Next.js Architecture Lab"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-route-tree.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project real file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12.3"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SellerHub Next.js Architecture Lab"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project real file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12.3"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SellerHub Next.js Architecture Lab"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-architecture-lab.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project real file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12.3"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "adapter / shell"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/chapter-13-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / shell"
            }
          ],
          [
            {
              "type": "text",
              "value": "8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "adapter / shell"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/chapter-13-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / shell"
            }
          ],
          [
            {
              "type": "text",
              "value": "8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Vite app mounting adapter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/App.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / shell"
            }
          ],
          [
            {
              "type": "text",
              "value": "8"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "0-file-locations",
      "children": [
        {
          "type": "text",
          "value": "0. File Locations"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter is located at "
        },
        {
          "type": "inlineCode",
          "value": "D:/vite_ts"
        },
        {
          "type": "text",
          "value": " 's React learning route. The study guide document is "
        },
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-13-nextjs-ssr-rsc/react-chapter-13-learning-guide.md"
        },
        {
          "type": "text",
          "value": ", the root directory of the exercise source code is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/"
        },
        {
          "type": "text",
          "value": ". The current project is still a React + TypeScript + Vite learning project, not the Next.js app."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "1-problems-this-chapter-solves",
      "children": [
        {
          "type": "text",
          "value": "1. Problems This Chapter Solves"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter solves the runtime layer issues after React enters the production-level boundary framework: how URL request, App Router segment, Server Component, Client Component, SSR, streaming, hydration, Route Handler, Proxy/Middleware, Metadata, Node/Edge runtime and deployment boundary collaborate."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "2-prerequisites",
      "children": [
        {
          "type": "text",
          "value": "2. Prerequisites"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "needs to master props, state snapshot, events, forms, effects, reducers, context, async data, React Router, Suspense, lazy, quality gates, JavaScript module graph, browser Web API, TypeScript type erasure and Request/Response."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "3-learning-goals",
      "children": [
        {
          "type": "text",
          "value": "3. Learning Goals"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After completing this chapter, you should be able to explain why Next.js is not a simple replacement for React Router; be able to read App Router fixed files; be able to distinguish Server Component and Client Component; be able to determine serializable props; be able to diagnose hydration mismatch; be able to map SellerHub catalog, orders, checkout, login and API to server/client/runtime owner."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "4-recommended-learning-sequence",
      "children": [
        {
          "type": "text",
          "value": "4. Recommended Learning Sequence"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "First learn framework boundary, then App Router segment and fixed route files; then learn Server/Client Component, "
        },
        {
          "type": "inlineCode",
          "value": "\"use client\""
        },
        {
          "type": "text",
          "value": " and serialization; then learn rendering strategies, hydration, browser API guard and streaming; finally learn server cache, Route Handler, Proxy/Middleware, Metadata, runtime and SellerHub architecture."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "5-core-terminology",
      "children": [
        {
          "type": "text",
          "value": "5. Core Terminology"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "Term"
          }
        ],
        [
          {
            "type": "text",
            "value": "Chinese description"
          }
        ],
        [
          {
            "type": "text",
            "value": "Layer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Why It Matters"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "App Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "file-system routing and server/client framework boundary."
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "is more than just browser route matching."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server Component"
            }
          ],
          [
            {
              "type": "text",
              "value": "is a component executed in server render by default."
            }
          ],
          [
            {
              "type": "text",
              "value": "React RSC"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not enter the client bundle."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Client Component"
            }
          ],
          [
            {
              "type": "text",
              "value": "by "
            },
            {
              "type": "inlineCode",
              "value": "\"use client\""
            },
            {
              "type": "text",
              "value": " Create client module entry."
            }
          ],
          [
            {
              "type": "text",
              "value": "React / Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "can use state, effect, event, browser API."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Hydration"
            }
          ],
          [
            {
              "type": "text",
              "value": "client React takes over server HTML."
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM / Browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "first client render must match server output."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Route Handler"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "route.ts"
            },
            {
              "type": "text",
              "value": " handles Request/Response."
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js / Web API"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not a React component."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Proxy / Middleware"
            }
          ],
          [
            {
              "type": "text",
              "value": "request enters the redirect/rewrite boundary before route."
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js 16 Use "
            },
            {
              "type": "inlineCode",
              "value": "proxy.ts"
            },
            {
              "type": "text",
              "value": ", old information is often called Middleware."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Metadata"
            }
          ],
          [
            {
              "type": "text",
              "value": "server-side head/SEO boundary."
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not manage client state."
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "6-underlying-mental-model",
      "children": [
        {
          "type": "text",
          "value": "6. Underlying Mental Model"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is "
        },
        {
          "type": "inlineCode",
          "value": "request -> route segment match -> server render -> RSC payload / HTML -> client bundle -> hydration -> interaction"
        },
        {
          "type": "text",
          "value": ". React is responsible for component semantics, Next.js is responsible for framework convention and server/client build output, browser is responsible for DOM/event/storage/hydration target, TypeScript only does compile-time checking, deployment runtime determines Node/Edge API surface."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "7-recommended-directory-structure",
      "children": [
        {
          "type": "text",
          "value": "7. Recommended Directory Structure"
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "current-project-structure",
      "children": [
        {
          "type": "text",
          "value": "Current Project Structure"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "D:/vite_ts/\r\n  AGENTS.MD\r\n  README.md\r\n  package.json\r\n  package-lock.json\r\n  tsconfig.app.json\r\n  eslint.config.js\r\n  docs/react/chapter-13-nextjs-ssr-rsc/\r\n  src/App.tsx\r\n  src/learning/react/chapter-13-nextjs-ssr-rsc/\r\n  references/books/react/"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "chapter-document-structure",
      "children": [
        {
          "type": "text",
          "value": "Chapter Document Structure"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Document structure of this chapter",
      "value": "docs/react/chapter-13-nextjs-ssr-rsc/\r\n  react-chapter-13-learning-guide.md"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "runnable-practice-structure",
      "children": [
        {
          "type": "text",
          "value": "Runnable Practice Structure"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Real practice structure",
      "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/\r\n  chapter-13-practice-root.tsx\r\n  chapter-13-practice.css\r\n  01-framework-boundary/framework-boundary-map.tsx\r\n  02-app-router-segments/app-router-segment-tree.ts\r\n  02-app-router-segments/app-router-segment-tree-panel.tsx\r\n  03-route-special-files/route-special-file-boundaries.tsx\r\n  04-server-component-boundary/server-component-rule-model.ts\r\n  04-server-component-boundary/server-component-rule-panel.tsx\r\n  05-client-component-boundary/client-component-boundary-panel.tsx\r\n  06-serialization-boundary/serializable-props-boundary.ts\r\n  06-serialization-boundary/serializable-props-panel.tsx\r\n  07-rendering-strategies/rendering-strategy-matrix.ts\r\n  07-rendering-strategies/rendering-strategy-panel.tsx\r\n  08-hydration-mismatch/hydration-mismatch-lab.ts\r\n  08-hydration-mismatch/hydration-mismatch-panel.tsx\r\n  09-browser-api-guard/browser-api-guard-model.ts\r\n  09-browser-api-guard/browser-api-guard-panel.tsx\r\n  10-suspense-streaming-boundary/streaming-boundary-model.tsx\r\n  11-server-fetch-cache/server-fetch-cache-model.ts\r\n  11-server-fetch-cache/server-fetch-cache-panel.tsx\r\n  12-route-runtime-boundaries/route-runtime-boundary-map.tsx\r\n  sellerhub-nextjs-architecture-lab/"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "final-mini-project-structure",
      "children": [
        {
          "type": "text",
          "value": "Final Mini-Project Structure"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "final mini project structure",
      "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/\r\n  sellerhub-nextjs-route-tree.ts\r\n  sellerhub-nextjs-boundary-map.ts\r\n  sellerhub-nextjs-architecture-lab.tsx"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "concept-example-structure",
      "children": [
        {
          "type": "text",
          "value": "Concept Example Structure"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Snippet: conceptual Next.js app tree",
      "value": "Conceptual only. Do not create these files at D:/vite_ts root.\r\napp/layout.tsx\r\napp/page.tsx\r\napp/catalog/page.tsx\r\napp/catalog/[productId]/page.tsx\r\napp/catalog/loading.tsx\r\napp/catalog/error.tsx\r\napp/seller/layout.tsx\r\napp/seller/orders/page.tsx\r\napp/checkout/page.tsx\r\napp/login/page.tsx\r\napp/not-found.tsx\r\napp/api/orders/route.ts\r\nproxy.ts\r\nmiddleware.ts historical name in older docs"
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "8-running-the-examples",
      "children": [
        {
          "type": "text",
          "value": "8. Running the Examples"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run dev\r\nnpm run lint\r\nnpm run typecheck\r\nnpm run test\r\nnpm run build"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " has been mounted as "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": ". Entry files and generic CSS are adapter/shell and are not expanded as core mechanism files."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "9-section-by-section-teaching-and-practice",
      "children": [
        {
          "type": "text",
          "value": "9. Section-by-Section Teaching and Practice"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "91-why-nextjs-is-more-than-a-router",
      "children": [
        {
          "type": "text",
          "value": "9.1 Why Next.js Is More Than a Router"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Next.js is the production framework boundary of React, not the file version of React Router."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " distinguishes between React, Next.js, browser, TypeScript and deployment owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts framework boundary, RSC, hydration, and deployment runtime into runnable Vite exercises to help you identify owner, boundary, and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " framework boundary, RSC, hydration, deployment runtime."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " accesses the URL, Next.js first processes the request and segment, the Server Component outputs the HTML/RSC payload, and the Client Component then hydrates."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx",
      "value": "const frameworkLayers = [\r\n  {\r\n    layer: 'React',\r\n    owns: 'Component model, render tree, Server Component and Client Component semantics.',\r\n    doesNotOwn: 'File-system routing, server deployment, request middleware, or metadata files.',\r\n  },\r\n  {\r\n    layer: 'Next.js',\r\n    owns: 'App Router conventions, route segments, server rendering, streaming, and build output.',\r\n    doesNotOwn: 'The JavaScript language or the browser DOM APIs themselves.',\r\n  },\r\n  {\r\n    layer: 'Browser',\r\n    owns: 'DOM, events, storage, history, network APIs, and hydration target nodes.',\r\n    doesNotOwn: 'Server-only data access or route segment matching before a request is rendered.',\r\n  },\r\n  {\r\n    layer: 'TypeScript',\r\n    owns: 'Compile-time relation checks for props, route models, and serializable data shapes.',\r\n    doesNotOwn: 'Runtime validation for request data or hydration output equality.',\r\n  },\r\n]\r\n\r\nexport function FrameworkBoundaryMap() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"framework-boundary-title\">\r\n      <p className=\"chapter13-kicker\">Framework boundary</p>\r\n      <h2 id=\"framework-boundary-title\">Next.js is a React framework boundary</h2>\r\n      <p>\r\n        React Router maps client navigation to React elements. Next.js also owns server\r\n        rendering, route files, server and client module graphs, streaming, metadata,\r\n        and deployment runtime decisions.\r\n      </p>\r\n      <div className=\"chapter13-grid\">\r\n        {frameworkLayers.map((layer) => (\r\n          <article className=\"chapter13-card\" key={layer.layer}>\r\n            <h3>{layer.layer}</h3>\r\n            <dl>\r\n              <dt>Owns</dt>\r\n              <dd>{layer.owns}</dd>\r\n              <dt>Does not own</dt>\r\n              <dd>{layer.doesNotOwn}</dd>\r\n            </dl>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "framework-boundary-map"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure of this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite Router "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Next.js is the production framework boundary of React, not the file version of React Router."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-file-system-routing-with-segments-pages-and-layouts",
      "children": [
        {
          "type": "text",
          "value": "9.2 File-System Routing with Segments, Pages, and Layouts"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " segment expresses URL hierarchy, layout expresses shared shell, and page expresses leaf UI."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Understand why App Router uses fixed file names to organize route branches."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts route segment, layout.tsx, page.tsx, and dynamic segment into runnable Vite exercises to help you identify owner, boundary, and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " route segment, layout.tsx, page.tsx, dynamic segment."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Border split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " request matches segment tree, layout is combined from root to leaf, and page outputs the current route output."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree.ts",
      "value": "export type SegmentFileKind = 'layout' | 'page' | 'loading' | 'error' | 'not-found' | 'route'\r\n\r\nexport type RouteSegmentNode = {\r\n  segment: string\r\n  pathname: string\r\n  files: SegmentFileKind[]\r\n  children?: RouteSegmentNode[]\r\n}\r\n\r\nexport type FlattenedSegment = {\r\n  pathname: string\r\n  segment: string\r\n  fileList: string\r\n  depth: number\r\n}\r\n\r\nexport const sellerHubSegmentTree: RouteSegmentNode = {\r\n  segment: 'app',\r\n  pathname: '/',\r\n  files: ['layout', 'page', 'not-found'],\r\n  children: [\r\n    {\r\n      segment: 'catalog',\r\n      pathname: '/catalog',\r\n      files: ['page', 'loading', 'error'],\r\n      children: [\r\n        {\r\n          segment: '[productId]',\r\n          pathname: '/catalog/[productId]',\r\n          files: ['page', 'not-found'],\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      segment: 'seller',\r\n      pathname: '/seller',\r\n      files: ['layout'],\r\n      children: [\r\n        {\r\n          segment: 'orders',\r\n          pathname: '/seller/orders',\r\n          files: ['page', 'loading', 'error'],\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      segment: 'checkout',\r\n      pathname: '/checkout',\r\n      files: ['page'],\r\n    },\r\n    {\r\n      segment: 'api/orders',\r\n      pathname: '/api/orders',\r\n      files: ['route'],\r\n    },\r\n  ],\r\n}\r\n\r\nexport function flattenSegmentTree(\r\n  node: RouteSegmentNode,\r\n  depth = 0,\r\n): FlattenedSegment[] {\r\n  const currentSegment = {\r\n    pathname: node.pathname,\r\n    segment: node.segment,\r\n    fileList: node.files.map((file) => `${file}.tsx`).join(', '),\r\n    depth,\r\n  }\r\n\r\n  return [\r\n    currentSegment,\r\n    ...(node.children ?? []).flatMap((child) => flattenSegmentTree(child, depth + 1)),\r\n  ]\r\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree-panel.tsx",
      "value": "import {\r\n  flattenSegmentTree,\r\n  sellerHubSegmentTree,\r\n} from './app-router-segment-tree'\r\n\r\nexport function AppRouterSegmentTreePanel() {\r\n  const segments = flattenSegmentTree(sellerHubSegmentTree)\r\n\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"segment-tree-title\">\r\n      <p className=\"chapter13-kicker\">App Router</p>\r\n      <h2 id=\"segment-tree-title\">Route segments select layouts and pages</h2>\r\n      <p>\r\n        This tree is a learning model inside Vite. It mirrors an App Router structure\r\n        without creating a real Next.js root app directory.\r\n      </p>\r\n      <div className=\"chapter13-table\" role=\"table\" aria-label=\"App Router segment tree\">\r\n        <div role=\"row\" className=\"chapter13-table-row chapter13-table-head\">\r\n          <span role=\"columnheader\">Pathname</span>\r\n          <span role=\"columnheader\">Segment</span>\r\n          <span role=\"columnheader\">Special files</span>\r\n        </div>\r\n        {segments.map((segment) => (\r\n          <div role=\"row\" className=\"chapter13-table-row\" key={segment.pathname}>\r\n            <span role=\"cell\">{segment.pathname}</span>\r\n            <span role=\"cell\">{`${'  '.repeat(segment.depth)}${segment.segment}`}</span>\r\n            <span role=\"cell\">{segment.fileList}</span>\r\n          </div>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "app-router-segment-tree"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entrance renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the writing method that only relies on redirect to protect sensitive data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " segment expresses URL hierarchy, layout expresses shared shell, and page expresses leaf UI."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-route-boundaries-for-loading-error-and-not-found",
      "children": [
        {
          "type": "text",
          "value": "9.3 Route Boundaries for Loading, Error, and Not Found"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " loading, error, and not-found are route boundaries, not replacements for all local UI states."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Distinguish between pending, unexpected error and missing resource."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts loading.tsx, error.tsx, not-found.tsx, fallback into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " loading.tsx, error.tsx, not-found.tsx, fallback."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " segment pending triggers loading, throw triggers error, and not-found condition triggers not-found."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/03-route-special-files/route-special-file-boundaries.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/03-route-special-files/route-special-file-boundaries.tsx",
      "value": "const routeSpecialFiles = [\r\n  {\r\n    fileName: 'layout.tsx',\r\n    boundary: 'Shared shell',\r\n    trigger: 'Matched before child page output.',\r\n    sellerHubUse: 'Seller navigation, seller account shell, and nested child segment.',\r\n  },\r\n  {\r\n    fileName: 'page.tsx',\r\n    boundary: 'Route leaf UI',\r\n    trigger: 'Matched when URL resolves to a segment leaf.',\r\n    sellerHubUse: 'Catalog page, product detail page, checkout page, and login page.',\r\n  },\r\n  {\r\n    fileName: 'loading.tsx',\r\n    boundary: 'Pending UI',\r\n    trigger: 'Shown while route segment content streams in.',\r\n    sellerHubUse: 'Catalog skeleton and seller order loading view.',\r\n  },\r\n  {\r\n    fileName: 'error.tsx',\r\n    boundary: 'Unexpected segment error fallback',\r\n    trigger: 'Rendered after a route segment throws during rendering.',\r\n    sellerHubUse: 'Seller order fallback with retry affordance.',\r\n  },\r\n  {\r\n    fileName: 'not-found.tsx',\r\n    boundary: 'Route-level not found UI',\r\n    trigger: 'Rendered when route code raises a not-found condition.',\r\n    sellerHubUse: 'Missing product detail or unknown route branch.',\r\n  },\r\n]\r\n\r\nexport function RouteSpecialFileBoundaries() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"special-files-title\">\r\n      <p className=\"chapter13-kicker\">Special files</p>\r\n      <h2 id=\"special-files-title\">Fixed file names express route boundaries</h2>\r\n      <div className=\"chapter13-grid\">\r\n        {routeSpecialFiles.map((routeFile) => (\r\n          <article className=\"chapter13-card\" key={routeFile.fileName}>\r\n            <h3>{routeFile.fileName}</h3>\r\n            <p>{routeFile.boundary}</p>\r\n            <dl>\r\n              <dt>Trigger</dt>\r\n              <dd>{routeFile.trigger}</dd>\r\n              <dt>SellerHub</dt>\r\n              <dd>{routeFile.sellerHubUse}</dd>\r\n            </dl>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "route-special-file-boundaries"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first judge the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " loading, error, and not-found are route boundaries, not replacements for all local UI states."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-server-component-defaults-and-restrictions",
      "children": [
        {
          "type": "text",
          "value": "9.4 Server Component Defaults and Restrictions"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Server Component is executed in server render and cannot have browser interaction."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Avoid mixing server data layer and client event layer."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts Server Component, browser API, event handler, client boundary into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Server Component, browser API, event handler, client boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server render does not have DOM, storage, effect and hydrated instance, and can only output payload or reference Client Component."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-model.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-model.ts",
      "value": "export type ServerRuleStatus = 'allowed' | 'blocked'\r\n\r\nexport type ServerComponentRule = {\r\n  capability: string\r\n  status: ServerRuleStatus\r\n  reason: string\r\n}\r\n\r\nexport const serverComponentRules: ServerComponentRule[] = [\r\n  {\r\n    capability: 'Fetch product data before sending UI',\r\n    status: 'allowed',\r\n    reason: 'Server Components run during server rendering and can await server data.',\r\n  },\r\n  {\r\n    capability: 'Read browser localStorage during render',\r\n    status: 'blocked',\r\n    reason: 'The browser storage object exists only in the browser runtime.',\r\n  },\r\n  {\r\n    capability: 'Register an onClick handler',\r\n    status: 'blocked',\r\n    reason: 'Event handlers require client JavaScript and a hydrated browser tree.',\r\n  },\r\n  {\r\n    capability: 'Use component state with useState',\r\n    status: 'blocked',\r\n    reason: 'Server Component output is a render result, not an interactive component instance.',\r\n  },\r\n  {\r\n    capability: 'Render a Client Component boundary',\r\n    status: 'allowed',\r\n    reason: 'Server output can include a reference to a Client Component entry point.',\r\n  },\r\n]\r\n\r\nexport function countBlockedServerRules(rules: ServerComponentRule[]): number {\r\n  return rules.filter((rule) => rule.status === 'blocked').length\r\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx",
      "value": "import {\r\n  countBlockedServerRules,\r\n  serverComponentRules,\r\n} from './server-component-rule-model'\r\n\r\nexport function ServerComponentRulePanel() {\r\n  const blockedCount = countBlockedServerRules(serverComponentRules)\r\n\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"server-rule-title\">\r\n      <p className=\"chapter13-kicker\">Server Components</p>\r\n      <h2 id=\"server-rule-title\">Server Components default to server-only execution</h2>\r\n      <p>\r\n        The model marks which capabilities belong to the server render pass and which\r\n        require a Client Component boundary.\r\n      </p>\r\n      <p className=\"chapter13-summary\">{blockedCount} capabilities require a client boundary.</p>\r\n      <div className=\"chapter13-grid\">\r\n        {serverComponentRules.map((rule) => (\r\n          <article className=\"chapter13-card\" key={rule.capability}>\r\n            <span className={`chapter13-pill chapter13-pill-${rule.status}`}>{rule.status}</span>\r\n            <h3>{rule.capability}</h3>\r\n            <p>{rule.reason}</p>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "server-component-rule-model"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the writing method that only relies on redirect to protect sensitive data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Server Component is executed in server render and cannot have browser interaction."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-client-components-and-the-use-client-module-boundary",
      "children": [
        {
          "type": "text",
          "value": "9.5 Client Components and the use client Module Boundary"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " \"use client\" marks module entry and client dependency graph."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " controls client bundle size and lets interactions only enter small islands."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts Client Component, \"use client\", module graph, and client bundle into runnable Vite exercises to help you identify owner, boundary, and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Client Component, \"use client\", module graph, client bundle."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " bundler starts from the directive module to mark the client graph, and binds state and event after browser hydration."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/05-client-component-boundary/client-component-boundary-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/05-client-component-boundary/client-component-boundary-panel.tsx",
      "value": "import { useMemo, useState } from 'react'\r\n\r\nconst moduleGraph = [\r\n  {\r\n    moduleName: 'app/catalog/page.tsx',\r\n    environment: 'server',\r\n    reason: 'Default App Router page module without a client directive.',\r\n  },\r\n  {\r\n    moduleName: 'app/catalog/product-filter.tsx',\r\n    environment: 'client',\r\n    reason: 'The file starts with a client directive and owns interactive search state.',\r\n  },\r\n  {\r\n    moduleName: 'app/catalog/filter-options.ts',\r\n    environment: 'client',\r\n    reason: 'It is a transitive dependency of the client entry module.',\r\n  },\r\n]\r\n\r\nexport function ClientComponentBoundaryPanel() {\r\n  const [selectedEnvironment, setSelectedEnvironment] = useState<'all' | 'server' | 'client'>(\r\n    'all',\r\n  )\r\n\r\n  const visibleModules = useMemo(\r\n    () =>\r\n      moduleGraph.filter(\r\n        (moduleItem) =>\r\n          selectedEnvironment === 'all' || moduleItem.environment === selectedEnvironment,\r\n      ),\r\n    [selectedEnvironment],\r\n  )\r\n\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"client-boundary-title\">\r\n      <p className=\"chapter13-kicker\">Client boundary</p>\r\n      <h2 id=\"client-boundary-title\">Client Components start at a module boundary</h2>\r\n      <div className=\"chapter13-control-row\" aria-label=\"Module graph filter\">\r\n        {(['all', 'server', 'client'] as const).map((environment) => (\r\n          <button\r\n            className={\r\n              selectedEnvironment === environment\r\n                ? 'chapter13-button chapter13-button-active'\r\n                : 'chapter13-button'\r\n            }\r\n            key={environment}\r\n            onClick={() => setSelectedEnvironment(environment)}\r\n            type=\"button\"\r\n          >\r\n            {environment}\r\n          </button>\r\n        ))}\r\n      </div>\r\n      <div className=\"chapter13-grid\">\r\n        {visibleModules.map((moduleItem) => (\r\n          <article className=\"chapter13-card\" key={moduleItem.moduleName}>\r\n            <span className={`chapter13-pill chapter13-pill-${moduleItem.environment}`}>\r\n              {moduleItem.environment}\r\n            </span>\r\n            <h3>{moduleItem.moduleName}</h3>\r\n            <p>{moduleItem.reason}</p>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "client-component-boundary-panel"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite Router "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the writing method that only relies on redirect to protect sensitive data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " \"use client\" marks module entry and client dependency graph."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not verify external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-the-server-to-client-prop-serialization-boundary",
      "children": [
        {
          "type": "text",
          "value": "9.6 The Server-to-Client Prop Serialization Boundary"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Server -> Client props is a data channel, not an object reference channel."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " prevents runtime objects such as function, Map, Set, and Date instance from crossing environments."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts serializable props, plain object, normalized date into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " serializable props, plain object, normalized date."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Border split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server output Put props into transmittable payload, client first render can only read stable data shape."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-boundary.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-boundary.ts",
      "value": "export type SerializableCheckResult = {\r\n  label: string\r\n  valueKind: string\r\n  allowed: boolean\r\n  reason: string\r\n}\r\n\r\nconst unsafeConstructors = new Set(['Date', 'Map', 'Set', 'WeakMap', 'WeakSet'])\r\n\r\nexport function describeSerializableProp(label: string, value: unknown): SerializableCheckResult {\r\n  const valueKind = getValueKind(value)\r\n  const allowed = isProjectSafeSerializableValue(value)\r\n\r\n  return {\r\n    label,\r\n    valueKind,\r\n    allowed,\r\n    reason: allowed\r\n      ? 'The value can cross the server to client prop boundary in this project model.'\r\n      : 'Convert this value to a plain string, number, boolean, null, array, or plain object first.',\r\n  }\r\n}\r\n\r\nfunction isProjectSafeSerializableValue(value: unknown, seen = new WeakSet<object>()): boolean {\r\n  if (value === null) {\r\n    return true\r\n  }\r\n\r\n  const valueType = typeof value\r\n\r\n  if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {\r\n    return true\r\n  }\r\n\r\n  if (valueType === 'function' || valueType === 'symbol' || valueType === 'bigint') {\r\n    return false\r\n  }\r\n\r\n  if (valueType === 'undefined') {\r\n    return false\r\n  }\r\n\r\n  if (Array.isArray(value)) {\r\n    return value.every((item) => isProjectSafeSerializableValue(item, seen))\r\n  }\r\n\r\n  if (valueType === 'object') {\r\n    const objectValue = value as Record<string, unknown>\r\n    const constructorName = objectValue.constructor?.name ?? 'Object'\r\n\r\n    if (unsafeConstructors.has(constructorName)) {\r\n      return false\r\n    }\r\n\r\n    if (seen.has(objectValue)) {\r\n      return false\r\n    }\r\n\r\n    seen.add(objectValue)\r\n\r\n    return Object.values(objectValue).every((item) =>\r\n      isProjectSafeSerializableValue(item, seen),\r\n    )\r\n  }\r\n\r\n  return false\r\n}\r\n\r\nfunction getValueKind(value: unknown): string {\r\n  if (value === null) {\r\n    return 'null'\r\n  }\r\n\r\n  if (Array.isArray(value)) {\r\n    return 'array'\r\n  }\r\n\r\n  if (typeof value === 'object') {\r\n    return value.constructor?.name ?? 'object'\r\n  }\r\n\r\n  return typeof value\r\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx",
      "value": "import { describeSerializableProp } from './serializable-props-boundary'\r\n\r\nconst propChecks = [\r\n  describeSerializableProp('Product title', 'Desk lamp'),\r\n  describeSerializableProp('Product price', 42),\r\n  describeSerializableProp('Filter list', ['active', 'draft']),\r\n  describeSerializableProp('Normalized date', '2026-06-26T00:00:00.000Z'),\r\n  describeSerializableProp('Raw Date object', new Date('2026-06-26T00:00:00.000Z')),\r\n  describeSerializableProp('Callback prop', () => undefined),\r\n  describeSerializableProp('Map instance', new Map([['sku', 'lamp-01']])),\r\n]\r\n\r\nexport function SerializablePropsPanel() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"serialization-title\">\r\n      <p className=\"chapter13-kicker\">Serializable props</p>\r\n      <h2 id=\"serialization-title\">Server to Client props need a serializable shape</h2>\r\n      <p>\r\n        This project uses a strict JSON-like model to keep the learning boundary visible.\r\n        Convert special runtime objects before they cross into a Client Component.\r\n      </p>\r\n      <div className=\"chapter13-grid\">\r\n        {propChecks.map((check) => (\r\n          <article className=\"chapter13-card\" key={check.label}>\r\n            <span\r\n              className={`chapter13-pill ${\r\n                check.allowed ? 'chapter13-pill-allowed' : 'chapter13-pill-blocked'\r\n              }`}\r\n            >\r\n              {check.allowed ? 'allowed' : 'blocked'}\r\n            </span>\r\n            <h3>{check.label}</h3>\r\n            <p>{check.valueKind}</p>\r\n            <p>{check.reason}</p>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "serializable-props-boundary"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Server -> Client props is a data channel, not an object reference channel."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-ssr-csr-ssg-isr-and-dynamic-rendering",
      "children": [
        {
          "type": "text",
          "value": "9.7 SSR, CSR, SSG, ISR, and Dynamic Rendering"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " rendering strategy determines the first output owner, and hydration determines the interactive owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " selects different first-screen strategies for SellerHub catalog, orders, and checkout."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts SSR, SSG, ISR, dynamic rendering, and CSR into runnable Vite exercises to help you identify owner, boundary, and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " SSR, SSG, ISR, dynamic rendering, CSR."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Border split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " request/build/cache/browser may become the first output source respectively, and client interaction still occurs after hydration."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-matrix.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-matrix.ts",
      "value": "export type RenderingStrategy = {\r\n  name: 'SSR' | 'SSG' | 'ISR' | 'Dynamic Rendering' | 'CSR'\r\n  firstOutputOwner: string\r\n  interactionOwner: string\r\n  sellerHubFit: string\r\n}\r\n\r\nexport const renderingStrategies: RenderingStrategy[] = [\r\n  {\r\n    name: 'SSR',\r\n    firstOutputOwner: 'Server request render',\r\n    interactionOwner: 'Hydrated Client Components',\r\n    sellerHubFit: 'Personalized seller orders and checkout shell.',\r\n  },\r\n  {\r\n    name: 'SSG',\r\n    firstOutputOwner: 'Build-time prerender',\r\n    interactionOwner: 'Hydrated Client Components',\r\n    sellerHubFit: 'Marketing pages and mostly stable category pages.',\r\n  },\r\n  {\r\n    name: 'ISR',\r\n    firstOutputOwner: 'Cached static output with timed regeneration',\r\n    interactionOwner: 'Hydrated Client Components',\r\n    sellerHubFit: 'Catalog pages that can tolerate stale data windows.',\r\n  },\r\n  {\r\n    name: 'Dynamic Rendering',\r\n    firstOutputOwner: 'Server request render with dynamic inputs',\r\n    interactionOwner: 'Hydrated Client Components',\r\n    sellerHubFit: 'Dashboard summary with cookies, auth, or request-specific data.',\r\n  },\r\n  {\r\n    name: 'CSR',\r\n    firstOutputOwner: 'Browser JavaScript after boot',\r\n    interactionOwner: 'Client React tree',\r\n    sellerHubFit: 'Highly interactive internal widgets after an initial shell.',\r\n  },\r\n]"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-panel.tsx",
      "value": "import { renderingStrategies } from './rendering-strategy-matrix'\r\n\r\nexport function RenderingStrategyPanel() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"rendering-strategy-title\">\r\n      <p className=\"chapter13-kicker\">Rendering strategies</p>\r\n      <h2 id=\"rendering-strategy-title\">SSR, SSG, ISR, dynamic rendering, and CSR own different moments</h2>\r\n      <div className=\"chapter13-table\" role=\"table\" aria-label=\"Rendering strategies\">\r\n        <div role=\"row\" className=\"chapter13-table-row chapter13-table-head\">\r\n          <span role=\"columnheader\">Strategy</span>\r\n          <span role=\"columnheader\">First output</span>\r\n          <span role=\"columnheader\">SellerHub fit</span>\r\n        </div>\r\n        {renderingStrategies.map((strategy) => (\r\n          <div role=\"row\" className=\"chapter13-table-row\" key={strategy.name}>\r\n            <span role=\"cell\">{strategy.name}</span>\r\n            <span role=\"cell\">{strategy.firstOutputOwner}</span>\r\n            <span role=\"cell\">{strategy.sellerHubFit}</span>\r\n          </div>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "rendering-strategy-matrix"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure of this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite Router "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " rendering strategy determines the first output owner, and hydration determines the interactive owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-hydration-and-hydration-mismatches",
      "children": [
        {
          "type": "text",
          "value": "9.8 Hydration and Hydration Mismatches"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " hydration requires server output and first client render to match."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The first frame problem caused by differences in positioning time, random number, storage, and locale."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts hydrateRoot, server output, first client render, mismatch into a runnable Vite exercise to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " hydrateRoot, server output, first client render, mismatch."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Border split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser receives the HTML, the client bundle does the first render, and React aligns the existing DOM and binds the event."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-lab.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-lab.ts",
      "value": "export type HydrationCase = {\r\n  name: string\r\n  serverOutput: string\r\n  clientFirstOutput: string\r\n  cause: string\r\n}\r\n\r\nexport type HydrationComparison = HydrationCase & {\r\n  isMismatch: boolean\r\n  diagnosis: string\r\n}\r\n\r\nexport const hydrationCases: HydrationCase[] = [\r\n  {\r\n    name: 'Stable product count',\r\n    serverOutput: 'Products: 12',\r\n    clientFirstOutput: 'Products: 12',\r\n    cause: 'Both sides use serialized server props.',\r\n  },\r\n  {\r\n    name: 'Time during first render',\r\n    serverOutput: 'Rendered at 08:00',\r\n    clientFirstOutput: 'Rendered at 08:01',\r\n    cause: 'The first client render reads a different clock value.',\r\n  },\r\n  {\r\n    name: 'Browser storage branch',\r\n    serverOutput: 'Theme: system',\r\n    clientFirstOutput: 'Theme: dark',\r\n    cause: 'The first client render reads localStorage before hydration completes.',\r\n  },\r\n  {\r\n    name: 'Random badge',\r\n    serverOutput: 'Badge: A',\r\n    clientFirstOutput: 'Badge: B',\r\n    cause: 'Math.random creates different markup on each environment.',\r\n  },\r\n]\r\n\r\nexport function compareHydrationOutput(caseItem: HydrationCase): HydrationComparison {\r\n  const isMismatch = caseItem.serverOutput !== caseItem.clientFirstOutput\r\n\r\n  return {\r\n    ...caseItem,\r\n    isMismatch,\r\n    diagnosis: isMismatch\r\n      ? 'Fix the first client render so it matches the server snapshot.'\r\n      : 'Hydration can attach event logic to the existing HTML snapshot.',\r\n  }\r\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx",
      "value": "import {\r\n  compareHydrationOutput,\r\n  hydrationCases,\r\n} from './hydration-mismatch-lab'\r\n\r\nexport function HydrationMismatchPanel() {\r\n  const comparisons = hydrationCases.map(compareHydrationOutput)\r\n\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"hydration-title\">\r\n      <p className=\"chapter13-kicker\">Hydration</p>\r\n      <h2 id=\"hydration-title\">Hydration requires matching server and first client output</h2>\r\n      <div className=\"chapter13-grid\">\r\n        {comparisons.map((comparison) => (\r\n          <article className=\"chapter13-card\" key={comparison.name}>\r\n            <span\r\n              className={`chapter13-pill ${\r\n                comparison.isMismatch ? 'chapter13-pill-blocked' : 'chapter13-pill-allowed'\r\n              }`}\r\n            >\r\n              {comparison.isMismatch ? 'mismatch' : 'match'}\r\n            </span>\r\n            <h3>{comparison.name}</h3>\r\n            <p>Server: {comparison.serverOutput}</p>\r\n            <p>Client: {comparison.clientFirstOutput}</p>\r\n            <p>{comparison.cause}</p>\r\n            <strong>{comparison.diagnosis}</strong>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "hydration-mismatch-lab"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure of this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite Router "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " hydration requires server output and first client render to match."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-guarding-browser-only-apis-time-and-random-values",
      "children": [
        {
          "type": "text",
          "value": "9.9 Guarding Browser-Only APIs, Time, and Random Values"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser API guard should prevent both server crash and first-frame mismatch."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " allows storage/theme/search preference without destroying hydration."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts window, localStorage, useEffect, fallback into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " window, localStorage, useEffect, fallback."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Border split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server and first client render use the same fallback, and then read the browser storage and update it after the effect."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-model.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-model.ts",
      "value": "export type StorageReader = {\r\n  getItem: (key: string) => string | null\r\n}\r\n\r\nexport type BrowserPreferenceResult = {\r\n  phase: 'server-render' | 'first-client-render' | 'after-hydration'\r\n  value: string\r\n  source: string\r\n}\r\n\r\nexport function readBrowserPreferenceSafely(\r\n  storage: StorageReader | null,\r\n  key: string,\r\n  fallbackValue: string,\r\n): BrowserPreferenceResult {\r\n  if (!storage) {\r\n    return {\r\n      phase: 'server-render',\r\n      value: fallbackValue,\r\n      source: 'fallback',\r\n    }\r\n  }\r\n\r\n  const storedValue = storage.getItem(key)\r\n\r\n  return {\r\n    phase: 'after-hydration',\r\n    value: storedValue ?? fallbackValue,\r\n    source: storedValue ? 'storage' : 'fallback',\r\n  }\r\n}\r\n\r\nexport function createFirstRenderPlan(fallbackValue: string): BrowserPreferenceResult[] {\r\n  return [\r\n    {\r\n      phase: 'server-render',\r\n      value: fallbackValue,\r\n      source: 'fallback',\r\n    },\r\n    {\r\n      phase: 'first-client-render',\r\n      value: fallbackValue,\r\n      source: 'fallback',\r\n    },\r\n  ]\r\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-panel.tsx",
      "value": "import { useEffect, useState } from 'react'\r\nimport {\r\n  createFirstRenderPlan,\r\n  readBrowserPreferenceSafely,\r\n} from './browser-api-guard-model'\r\n\r\nexport function BrowserApiGuardPanel() {\r\n  const [storedPreference, setStoredPreference] = useState('system')\r\n  const firstRenderPlan = createFirstRenderPlan('system')\r\n\r\n  useEffect(() => {\r\n    const timerId = window.setTimeout(() => {\r\n      const result = readBrowserPreferenceSafely(\r\n        window.localStorage,\r\n        'sellerhub-theme',\r\n        'system',\r\n      )\r\n\r\n      setStoredPreference(result.value)\r\n    }, 0)\r\n\r\n    return () => window.clearTimeout(timerId)\r\n  }, [])\r\n\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"browser-guard-title\">\r\n      <p className=\"chapter13-kicker\">Browser API guard</p>\r\n      <h2 id=\"browser-guard-title\">Browser-only APIs belong after hydration or inside client logic</h2>\r\n      <p>\r\n        The first server output and first client render both use the same fallback.\r\n        Storage can update the UI after React has attached to the HTML.\r\n      </p>\r\n      <div className=\"chapter13-grid\">\r\n        {firstRenderPlan.map((step) => (\r\n          <article className=\"chapter13-card\" key={step.phase}>\r\n            <h3>{step.phase}</h3>\r\n            <p>Value: {step.value}</p>\r\n            <p>Source: {step.source}</p>\r\n          </article>\r\n        ))}\r\n        <article className=\"chapter13-card\">\r\n          <h3>after-hydration</h3>\r\n          <p>Value: {storedPreference}</p>\r\n          <p>Source: browser effect</p>\r\n        </article>\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "browser-api-guard-model"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entrance renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the writing method that only relies on redirect to protect sensitive data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser API guard should prevent both server crash and first-frame mismatch."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-suspense-streaming-and-segment-level-pending-ui",
      "children": [
        {
          "type": "text",
          "value": "9.10 Suspense Streaming and Segment-Level Pending UI"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Suspense boundary allows the pending UI to have a clear replacement point."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " understands the relationship between loading.tsx and segment streaming."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts Suspense, streaming, fallback, loading.tsx into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Suspense, streaming, fallback, loading.tsx."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server work is not completed, the fallback can be output first, and then replaced when the content is ready, and then the client entries are hydrated."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/10-suspense-streaming-boundary/streaming-boundary-model.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/10-suspense-streaming-boundary/streaming-boundary-model.tsx",
      "value": "import { lazy, Suspense } from 'react'\r\nimport type { ComponentType } from 'react'\r\n\r\nconst SegmentPreview = lazy(() =>\r\n  Promise.resolve<{ default: ComponentType }>({\r\n    default: function SegmentPreviewContent() {\r\n      return (\r\n        <article className=\"chapter13-card\">\r\n          <h3>catalog/page.tsx</h3>\r\n          <p>Segment content replaces the loading boundary when it is ready.</p>\r\n        </article>\r\n      )\r\n    },\r\n  }),\r\n)\r\n\r\nexport function StreamingBoundaryModel() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"streaming-title\">\r\n      <p className=\"chapter13-kicker\">Suspense streaming</p>\r\n      <h2 id=\"streaming-title\">Suspense gives the route segment a pending boundary</h2>\r\n      <p>\r\n        The Vite demo uses React lazy to show the shape of a boundary. In Next.js,\r\n        loading.tsx maps to a segment-level Suspense boundary while server work streams.\r\n      </p>\r\n      <Suspense\r\n        fallback={\r\n          <article className=\"chapter13-card\">\r\n            <h3>catalog/loading.tsx</h3>\r\n            <p>Pending segment shell</p>\r\n          </article>\r\n        }\r\n      >\r\n        <SegmentPreview />\r\n      </Suspense>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "streaming-boundary-model"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Suspense boundary allows pending UI to have a clear replacement point."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-server-fetching-caching-revalidation-and-client-fetching",
      "children": [
        {
          "type": "text",
          "value": "9.11 Server Fetching, Caching, Revalidation, and Client Fetching"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server fetch/cache/revalidate pipe server output, client fetch pipe hydrated lifecycle."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Avoid mistaking 9 fetch for Next.js server cache."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts server fetch, cache key, revalidate, client fetch into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server fetch, cache key, revalidate, client fetch."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " route request generates server cache key, serialized props enter the client, revalidate affects subsequent requests."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanism; if the React API appears, it is only used to make the mechanism exercise runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-model.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-panel.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-model.ts",
      "value": "export type FetchBoundaryStep = {\r\n  step: string\r\n  owner: string\r\n  cacheKey: string\r\n  output: string\r\n}\r\n\r\nexport const serverFetchCacheSteps: FetchBoundaryStep[] = [\r\n  {\r\n    step: 'Route request',\r\n    owner: 'Next.js App Router',\r\n    cacheKey: '/catalog?category=lighting',\r\n    output: 'Segment match and render plan',\r\n  },\r\n  {\r\n    step: 'Server fetch',\r\n    owner: 'Server Component',\r\n    cacheKey: 'GET /products?category=lighting',\r\n    output: 'Product rows and serialized props',\r\n  },\r\n  {\r\n    step: 'Client interaction',\r\n    owner: 'Client Component',\r\n    cacheKey: 'local search draft',\r\n    output: 'Filtered visible list after hydration',\r\n  },\r\n  {\r\n    step: 'Revalidate',\r\n    owner: 'Framework cache policy',\r\n    cacheKey: 'catalog products tag',\r\n    output: 'Fresh server output for later requests',\r\n  },\r\n]"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-panel.tsx",
      "value": "import { serverFetchCacheSteps } from './server-fetch-cache-model'\r\n\r\nexport function ServerFetchCachePanel() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"server-fetch-title\">\r\n      <p className=\"chapter13-kicker\">Server fetch and cache</p>\r\n      <h2 id=\"server-fetch-title\">Server fetch is not the same boundary as client effect fetch</h2>\r\n      <div className=\"chapter13-timeline\">\r\n        {serverFetchCacheSteps.map((step) => (\r\n          <article className=\"chapter13-card\" key={step.step}>\r\n            <h3>{step.step}</h3>\r\n            <p>Owner: {step.owner}</p>\r\n            <p>Cache key: {step.cacheKey}</p>\r\n            <p>Output: {step.output}</p>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "server-fetch-cache-model"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " server fetch/cache/revalidate pipe server output, client fetch pipe hydrated lifecycle."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-route-handlers-proxy-metadata-and-deployment-runtimes",
      "children": [
        {
          "type": "text",
          "value": "9.12 Route Handlers, Proxy, Metadata, and Deployment Runtimes"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Route Handler, Proxy, Metadata and runtime config are not React components."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " puts BFF, redirect, head and Node/Edge API surface into the correct layer."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts route.ts, GET(request), proxy.ts, middleware, metadata, edge runtime into runnable Vite exercises to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " route.ts, GET(request), proxy.ts, middleware, metadata, edge runtime."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " request first passes through Proxy, and then enters route/component or route handler. Metadata generates a head at the server layer."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/12-route-runtime-boundaries/route-runtime-boundary-map.tsx"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/12-route-runtime-boundaries/route-runtime-boundary-map.tsx",
      "value": "const runtimeBoundaries = [\r\n  {\r\n    boundary: 'Route Handler',\r\n    fileName: 'app/api/orders/route.ts',\r\n    functionName: 'GET(request: Request)',\r\n    runtime: 'Node or Edge, depending on route config and deployment adapter.',\r\n    sellerHubRisk: 'It returns API data. It is not a React component.',\r\n  },\r\n  {\r\n    boundary: 'Proxy',\r\n    fileName: 'proxy.ts',\r\n    functionName: 'proxy(request: NextRequest)',\r\n    runtime: 'Runs before route rendering. Next.js 16 renamed Middleware to Proxy.',\r\n    sellerHubRisk: 'Use it for redirects, not for complete authorization.',\r\n  },\r\n  {\r\n    boundary: 'Metadata',\r\n    fileName: 'app/catalog/[productId]/page.tsx',\r\n    functionName: 'generateMetadata({ params })',\r\n    runtime: 'Server render metadata boundary.',\r\n    sellerHubRisk: 'It changes head data. It does not manage client state.',\r\n  },\r\n  {\r\n    boundary: 'Runtime config',\r\n    fileName: 'page.tsx or route.ts',\r\n    functionName: \"export const runtime = 'edge'\",\r\n    runtime: 'Edge has a smaller API surface than Node.',\r\n    sellerHubRisk: 'Avoid Node-only libraries when a segment targets Edge.',\r\n  },\r\n]\r\n\r\nexport function RouteRuntimeBoundaryMap() {\r\n  return (\r\n    <section className=\"chapter13-panel\" aria-labelledby=\"route-runtime-title\">\r\n      <p className=\"chapter13-kicker\">Route runtime</p>\r\n      <h2 id=\"route-runtime-title\">Route Handlers, Proxy, Metadata, and runtime config are not UI state</h2>\r\n      <div className=\"chapter13-grid\">\r\n        {runtimeBoundaries.map((boundary) => (\r\n          <article className=\"chapter13-card\" key={boundary.boundary}>\r\n            <h3>{boundary.boundary}</h3>\r\n            <dl>\r\n              <dt>File</dt>\r\n              <dd>{boundary.fileName}</dd>\r\n              <dt>Signature</dt>\r\n              <dd>{boundary.functionName}</dd>\r\n              <dt>Runtime</dt>\r\n              <dd>{boundary.runtime}</dd>\r\n              <dt>Risk</dt>\r\n              <dd>{boundary.sellerHubRisk}</dd>\r\n            </dl>\r\n          </article>\r\n        ))}\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "route-runtime-boundary-map"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite routing "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the writing method that only relies on redirect to protect sensitive data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Route Handler, Proxy, Metadata and runtime config are not React components."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug.\r\n"
        },
        {
          "type": "text",
          "value": ""
        },
        {
          "type": "text",
          "value": ""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-sellerhub-to-a-nextjs-architecture",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping SellerHub to a Next.js Architecture"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " SellerHub needs to draw the server/client/runtime boundary diagram first, and then implement the page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " maps catalog, product detail, orders, checkout, login and API to specific owners."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "technical meaning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section puts SellerHub architecture, BFF, auth redirect, quality gate into a runnable Vite exercise to help you identify owner, boundary and failure mode before writing SellerHub."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and new concepts:"
            }
          ]
        },
        {
          "type": "text",
          "value": " SellerHub architecture, BFF, auth redirect, quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary split:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React Server Component is responsible for server output; React Client Component is responsible for hydrated interaction; Next.js App Router is responsible for segment and fixed file convention; server rendering is responsible for HTML/RSC payload; hydration occurs in the browser; Node/Edge runtime determines the server API surface; TypeScript only does compile-time relation check; bundler is responsible for module graph; deployment determines the request entry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " URL enters the request boundary, segment selects layout/page, server owner fetches data, client owner handles interaction, and quality gates verify behavior."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the Next.js API in the current Vite project. The focus is on the Next.js server/client boundary and architectural mechanisms; if the React API appears, it is only used to make the mechanism exercises runnable in Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed file name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The real file in this section is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts"
        },
        {
          "type": "text",
          "value": ". Next.js The concept file name only appears as a learning structure and does not represent the current project root directory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts",
      "value": "export type ArchitectureBoundary = {\r\n  scenario: string\r\n  serverOwner: string\r\n  clientOwner: string\r\n  risk: string\r\n  qualityGate: string\r\n}\r\n\r\nexport const sellerHubArchitectureBoundaries: ArchitectureBoundary[] = [\r\n  {\r\n    scenario: 'Catalog search',\r\n    serverOwner: 'Server Component fetches initial products.',\r\n    clientOwner: 'Client filter controls own search draft after hydration.',\r\n    risk: 'Reading localStorage during first render can create a mismatch.',\r\n    qualityGate: 'Component tests verify visible filters. Build verifies module boundaries.',\r\n  },\r\n  {\r\n    scenario: 'Product detail',\r\n    serverOwner: 'Dynamic segment resolves productId and can raise not-found.',\r\n    clientOwner: 'Client island handles wishlist or compare interaction later.',\r\n    risk: 'Returning an empty page hides missing product problems.',\r\n    qualityGate: 'Route logic tests cover missing IDs and fallback mapping.',\r\n  },\r\n  {\r\n    scenario: 'Seller orders',\r\n    serverOwner: 'Server fetch loads initial order rows with auth context.',\r\n    clientOwner: 'Status filter and sorting run in a hydrated island.',\r\n    risk: 'Proxy redirect is not final authorization for sensitive data.',\r\n    qualityGate: 'Integration tests cover protected route behavior.',\r\n  },\r\n  {\r\n    scenario: 'Checkout',\r\n    serverOwner: 'Server page can prepare stable shell and metadata.',\r\n    clientOwner: 'Form state, validation errors, pending state, and submit events.',\r\n    risk: 'Server Component event handlers are invalid.',\r\n    qualityGate: 'Form behavior tests cover submit branches.',\r\n  },\r\n  {\r\n    scenario: 'Order API',\r\n    serverOwner: 'Route Handler owns Request and Response.',\r\n    clientOwner: 'Client component consumes normalized JSON only.',\r\n    risk: 'Route Handler is not a React component and cannot render JSX.',\r\n    qualityGate: 'Network-boundary tests mock Request and Response behavior.',\r\n  },\r\n]"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "sellerhub-nextjs-boundary-map"
                },
                {
                  "type": "text",
                  "value": " First declare the model or data structure in this section to determine the owner of this mechanism."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component or pure function then converts the model into observable output to avoid hiding rules in prose."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render only displays the model; the real Next.js API is not implemented in the current Vite project."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow: "
            }
          ]
        },
        {
          "type": "text",
          "value": " Vite Router "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " lazy-load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", this entry renders this section panel. In the real Next.js project, the request first enters the App Router, selects layout/page/loading/error/not-found as the segment, and then the server output and client reference are sent to the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, server output, client first render, serialized props, route segment, module graph, request object, response object, cache key, hydration target:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section compresses these runtime entities into explicit object fields or React state. The object field represents the evidence of server/request/module/cache/hydration; the state only represents the interactive filtering or after-hydration update in the current Vite page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why do you get this result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Because the owner exists before the code form; the same TSX is placed in Server Component, Client Component, Route Handler, Proxy or browser effect, and the running environment and available APIs are different."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison writing:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is to only look at the JSX surface or URL path; the correct way to write it is to first determine the request/server/client/browser/tooling/deployment owner, and then decide whether the data can cross the boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " violates server/client boundary, serializable props, first client render consistency, browser-only API guard, Route Handler non-component or Proxy authorization limit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "How to identify similar errors:"
            }
          ]
        },
        {
          "type": "text",
          "value": " looks for the browser API in the server file, the server-only import in the client graph, time/random/storage in the first render, non-serializable props, or the way to protect sensitive data by redirect only."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Catalog, ProductDetail, SellerOrders, Checkout, Login, Orders API and auth redirect all require this boundary model to determine the first output, interactive island, BFF and quality gate."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current React learning main line:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section takes over props, state, forms, effects, reducers, async data, routing, performance and testing, and puts them into the Next.js framework boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The final memory model of this section:"
            }
          ]
        },
        {
          "type": "text",
          "value": " SellerHub needs to draw the server/client/runtime boundary diagram first, and then implement the page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " user accesses URL or triggers client event; Next.js App Router selects segment, layout, page, loading, error or not-found; Server Component generates HTML/RSC payload and serialized props; Client Component module graph enters client bundle; browser hydration matches server output and first client client render; TypeScript checks source relation but does not validate external runtime data; errors can result from boundary violation, serialization error, hydration mismatch, browser-only API crash, or auth redirect bug."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "10-api-and-syntax-index",
      "children": [
        {
          "type": "text",
          "value": "10. API and Syntax Index"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "API / File convention"
          }
        ],
        [
          {
            "type": "text",
            "value": "belongs to the layer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Fixed form"
          }
        ],
        [
          {
            "type": "text",
            "value": "Boundary of this chapter"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "layout.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js App Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "fixed file name"
            }
          ],
          [
            {
              "type": "text",
              "value": "shared shell"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js App Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "fixed file name"
            }
          ],
          [
            {
              "type": "text",
              "value": "leaf UI"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "loading.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js / Suspense"
            }
          ],
          [
            {
              "type": "text",
              "value": "fixed file name"
            }
          ],
          [
            {
              "type": "text",
              "value": "segment pending UI"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "error.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "fixed file name"
            }
          ],
          [
            {
              "type": "text",
              "value": "segment error fallback"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "not-found.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "fixed file name"
            }
          ],
          [
            {
              "type": "text",
              "value": "route-level not found"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "\"use client\""
            }
          ],
          [
            {
              "type": "text",
              "value": "React / bundler"
            }
          ],
          [
            {
              "type": "text",
              "value": "file-top directive"
            }
          ],
          [
            {
              "type": "text",
              "value": "client module entry"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<Suspense fallback={...}>"
            }
          ],
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "text",
              "value": "component API"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "hydrateRoot(domNode, reactNode)"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "function call"
            }
          ],
          [
            {
              "type": "text",
              "value": "hydration existing HTML"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "GET(request: Request)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Route Handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "Web Request signature"
            }
          ],
          [
            {
              "type": "text",
              "value": "BFF/API boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "proxy(request: NextRequest)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js Proxy"
            }
          ],
          [
            {
              "type": "text",
              "value": "request function"
            }
          ],
          [
            {
              "type": "text",
              "value": "redirect/rewrite before render"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "generateMetadata()"
            }
          ],
          [
            {
              "type": "text",
              "value": "Next.js Metadata"
            }
          ],
          [
            {
              "type": "text",
              "value": "server function"
            }
          ],
          [
            {
              "type": "text",
              "value": "head/SEO boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "window.localStorage"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser Web API"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser property"
            }
          ],
          [
            {
              "type": "text",
              "value": "not available during server render"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "11-common-mistakes",
      "children": [
        {
          "type": "text",
          "value": "11. Common Mistakes"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "Error"
          }
        ],
        [
          {
            "type": "text",
            "value": "Rules violated"
          }
        ],
        [
          {
            "type": "text",
            "value": "How to identify"
          }
        ],
        [
          {
            "type": "text",
            "value": "Correction direction"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "treats Next.js as the React Router file version"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework boundary is squashed"
            }
          ],
          [
            {
              "type": "text",
              "value": "only discusses URL, not server/client graph"
            }
          ],
          [
            {
              "type": "text",
              "value": "first draw request -> segment -> server output -> hydration"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server Component uses "
            },
            {
              "type": "inlineCode",
              "value": "useState"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "useEffect"
            }
          ],
          [
            {
              "type": "text",
              "value": "Server Component has no hydrated instance"
            }
          ],
          [
            {
              "type": "text",
              "value": "server file also processes click"
            }
          ],
          [
            {
              "type": "text",
              "value": "Remove Client Component"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "root layout write "
            },
            {
              "type": "inlineCode",
              "value": "\"use client\""
            }
          ],
          [
            {
              "type": "text",
              "value": "client module boundary is too large"
            }
          ],
          [
            {
              "type": "text",
              "value": "A large amount of server-only code into client graph"
            }
          ],
          [
            {
              "type": "text",
              "value": "only marks the interactive entrance"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server -> Client passes function / Map / Set"
            }
          ],
          [
            {
              "type": "text",
              "value": "props is not serializable"
            }
          ],
          [
            {
              "type": "text",
              "value": "TS passes but the runtime boundary is unstable"
            }
          ],
          [
            {
              "type": "text",
              "value": "to plain data"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "render medium read time/random/storage"
            }
          ],
          [
            {
              "type": "text",
              "value": "first client render does not match"
            }
          ],
          [
            {
              "type": "text",
              "value": "hydration warning or UI flicker"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses server props or effect to update"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Route Handler returns JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "Request/Response is not UI"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "route.ts"
            },
            {
              "type": "text",
              "value": " like component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Return to "
            },
            {
              "type": "inlineCode",
              "value": "Response"
            },
            {
              "type": "text",
              "value": " or JSON"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Proxy/Middleware Make full permission"
            }
          ],
          [
            {
              "type": "text",
              "value": "redirect is not equal to authorization"
            }
          ],
          [
            {
              "type": "text",
              "value": "only hides the UI, but the API is still leaked"
            }
          ],
          [
            {
              "type": "text",
              "value": "server data boundary check"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "installed in Vite project Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "Project positioning is destroyed"
            }
          ],
          [
            {
              "type": "text",
              "value": "package adds "
            },
            {
              "type": "inlineCode",
              "value": "next"
            },
            {
              "type": "text",
              "value": " or root appears "
            },
            {
              "type": "inlineCode",
              "value": "app/"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter only does mechanism simulation"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "12-final-mini-project",
      "children": [
        {
          "type": "text",
          "value": "12. Final Mini Project"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "final mini project is only used to integrate the mechanism of this chapter and does not replace the previous section teaching."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "121-project-goal",
      "children": [
        {
          "type": "text",
          "value": "12.1 Project goal"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "SellerHub Next.js Architecture Lab"
        },
        {
          "type": "text",
          "value": " uses real Vite source code to simulate conceptual app router tree, layout/page/loading/error/not-found mapping, server component data boundary, client component interaction boundary, "
        },
        {
          "type": "inlineCode",
          "value": "\"use client\""
        },
        {
          "type": "text",
          "value": " module boundary, serialized props, hydration mismatch, browser API guard, Route Handler BFF, Proxy/Middleware redirect, Metadata, Node/Edge runtime and Chapter 12 quality gate."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "final-mini-project-structure-1",
      "children": [
        {
          "type": "text",
          "value": "Final Mini-Project Structure"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "final mini project structure",
      "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/\r\n  sellerhub-nextjs-route-tree.ts\r\n  sellerhub-nextjs-boundary-map.ts\r\n  sellerhub-nextjs-architecture-lab.tsx"
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Snippet: conceptual SellerHub App Router tree",
      "value": "Conceptual only. Do not create these files at D:/vite_ts root.\r\napp/layout.tsx\r\napp/page.tsx\r\napp/catalog/page.tsx\r\napp/catalog/[productId]/page.tsx\r\napp/catalog/loading.tsx\r\napp/catalog/error.tsx\r\napp/seller/layout.tsx\r\napp/seller/orders/page.tsx\r\napp/checkout/page.tsx\r\napp/login/page.tsx\r\napp/not-found.tsx\r\napp/api/orders/route.ts\r\nproxy.ts\r\nmiddleware.ts historical name in older docs"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "123-complete-code",
      "children": [
        {
          "type": "text",
          "value": "12.3 Complete code"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-route-tree.ts",
      "value": "export type SellerHubRouteKind =\r\n  | 'layout'\r\n  | 'page'\r\n  | 'loading'\r\n  | 'error'\r\n  | 'not-found'\r\n  | 'route-handler'\r\n  | 'proxy'\r\n  | 'metadata'\r\n\r\nexport type SellerHubRouteNode = {\r\n  conceptualPath: string\r\n  kind: SellerHubRouteKind\r\n  owner: string\r\n  boundary: string\r\n}\r\n\r\nexport const sellerHubRouteTree: SellerHubRouteNode[] = [\r\n  {\r\n    conceptualPath: 'app/layout.tsx',\r\n    kind: 'layout',\r\n    owner: 'Server Component',\r\n    boundary: 'Application shell and shared metadata defaults.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/page.tsx',\r\n    kind: 'page',\r\n    owner: 'Server Component',\r\n    boundary: 'Public landing route.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/catalog/page.tsx',\r\n    kind: 'page',\r\n    owner: 'Server Component',\r\n    boundary: 'Initial product list fetch and serialized filter defaults.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/catalog/loading.tsx',\r\n    kind: 'loading',\r\n    owner: 'Route segment',\r\n    boundary: 'Instant pending UI while catalog content streams.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/catalog/error.tsx',\r\n    kind: 'error',\r\n    owner: 'Client Component',\r\n    boundary: 'Unexpected catalog segment fallback and retry.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/catalog/[productId]/page.tsx',\r\n    kind: 'page',\r\n    owner: 'Server Component',\r\n    boundary: 'Dynamic product route with productId params.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/catalog/[productId]/not-found.tsx',\r\n    kind: 'not-found',\r\n    owner: 'Route segment',\r\n    boundary: 'Missing product UI.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/seller/layout.tsx',\r\n    kind: 'layout',\r\n    owner: 'Server Component',\r\n    boundary: 'Seller workspace shell and nested route outlet.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/seller/orders/page.tsx',\r\n    kind: 'page',\r\n    owner: 'Server Component',\r\n    boundary: 'Initial seller orders fetch and serialized summary props.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/checkout/page.tsx',\r\n    kind: 'page',\r\n    owner: 'Client Component island',\r\n    boundary: 'Checkout form draft and event handlers.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/login/page.tsx',\r\n    kind: 'page',\r\n    owner: 'Client Component island',\r\n    boundary: 'Login form interaction and redirect target.',\r\n  },\r\n  {\r\n    conceptualPath: 'app/api/orders/route.ts',\r\n    kind: 'route-handler',\r\n    owner: 'BFF route boundary',\r\n    boundary: 'Request and Response API for order data.',\r\n  },\r\n  {\r\n    conceptualPath: 'proxy.ts',\r\n    kind: 'proxy',\r\n    owner: 'Request boundary',\r\n    boundary: 'Redirect unauthenticated seller paths before route render.',\r\n  },\r\n  {\r\n    conceptualPath: 'generateMetadata()',\r\n    kind: 'metadata',\r\n    owner: 'Server metadata boundary',\r\n    boundary: 'Product title, description, and social preview data.',\r\n  },\r\n]"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts",
      "value": "export type ArchitectureBoundary = {\r\n  scenario: string\r\n  serverOwner: string\r\n  clientOwner: string\r\n  risk: string\r\n  qualityGate: string\r\n}\r\n\r\nexport const sellerHubArchitectureBoundaries: ArchitectureBoundary[] = [\r\n  {\r\n    scenario: 'Catalog search',\r\n    serverOwner: 'Server Component fetches initial products.',\r\n    clientOwner: 'Client filter controls own search draft after hydration.',\r\n    risk: 'Reading localStorage during first render can create a mismatch.',\r\n    qualityGate: 'Component tests verify visible filters. Build verifies module boundaries.',\r\n  },\r\n  {\r\n    scenario: 'Product detail',\r\n    serverOwner: 'Dynamic segment resolves productId and can raise not-found.',\r\n    clientOwner: 'Client island handles wishlist or compare interaction later.',\r\n    risk: 'Returning an empty page hides missing product problems.',\r\n    qualityGate: 'Route logic tests cover missing IDs and fallback mapping.',\r\n  },\r\n  {\r\n    scenario: 'Seller orders',\r\n    serverOwner: 'Server fetch loads initial order rows with auth context.',\r\n    clientOwner: 'Status filter and sorting run in a hydrated island.',\r\n    risk: 'Proxy redirect is not final authorization for sensitive data.',\r\n    qualityGate: 'Integration tests cover protected route behavior.',\r\n  },\r\n  {\r\n    scenario: 'Checkout',\r\n    serverOwner: 'Server page can prepare stable shell and metadata.',\r\n    clientOwner: 'Form state, validation errors, pending state, and submit events.',\r\n    risk: 'Server Component event handlers are invalid.',\r\n    qualityGate: 'Form behavior tests cover submit branches.',\r\n  },\r\n  {\r\n    scenario: 'Order API',\r\n    serverOwner: 'Route Handler owns Request and Response.',\r\n    clientOwner: 'Client component consumes normalized JSON only.',\r\n    risk: 'Route Handler is not a React component and cannot render JSX.',\r\n    qualityGate: 'Network-boundary tests mock Request and Response behavior.',\r\n  },\r\n]"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-architecture-lab.tsx",
      "value": "import { sellerHubArchitectureBoundaries } from './sellerhub-nextjs-boundary-map'\r\nimport { sellerHubRouteTree } from './sellerhub-nextjs-route-tree'\r\n\r\nexport function SellerHubNextjsArchitectureLab() {\r\n  return (\r\n    <section className=\"chapter13-panel chapter13-final-project\" aria-labelledby=\"sellerhub-lab-title\">\r\n      <p className=\"chapter13-kicker\">Final mini project</p>\r\n      <h2 id=\"sellerhub-lab-title\">SellerHub Next.js Architecture Lab</h2>\r\n      <p>\r\n        This lab is an architecture simulation inside the Vite learning project. It\r\n        does not create a real Next.js app, install Next.js, or add a root app directory.\r\n      </p>\r\n\r\n      <div className=\"chapter13-section-split\">\r\n        <article className=\"chapter13-card\">\r\n          <h3>Conceptual route tree</h3>\r\n          <ul className=\"chapter13-list\">\r\n            {sellerHubRouteTree.map((routeNode) => (\r\n              <li key={routeNode.conceptualPath}>\r\n                <strong>{routeNode.conceptualPath}</strong>\r\n                <span>{routeNode.kind}</span>\r\n                <span>{routeNode.boundary}</span>\r\n              </li>\r\n            ))}\r\n          </ul>\r\n        </article>\r\n\r\n        <article className=\"chapter13-card\">\r\n          <h3>Server and client boundary map</h3>\r\n          <ul className=\"chapter13-list\">\r\n            {sellerHubArchitectureBoundaries.map((boundary) => (\r\n              <li key={boundary.scenario}>\r\n                <strong>{boundary.scenario}</strong>\r\n                <span>{boundary.serverOwner}</span>\r\n                <span>{boundary.clientOwner}</span>\r\n                <span>{boundary.risk}</span>\r\n              </li>\r\n            ))}\r\n          </ul>\r\n        </article>\r\n      </div>\r\n    </section>\r\n  )\r\n}"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "core-execution-flow",
      "children": [
        {
          "type": "text",
          "value": "Core Execution Flow"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Vite route "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-13"
        },
        {
          "type": "text",
          "value": " Load "
        },
        {
          "type": "inlineCode",
          "value": "Chapter13PracticeRoot"
        },
        {
          "type": "text",
          "value": ", final mini project reads "
        },
        {
          "type": "inlineCode",
          "value": "sellerHubRouteTree"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "sellerHubArchitectureBoundaries"
        },
        {
          "type": "text",
          "value": " and render route tree and boundary map. In the real Next.js project, the corresponding process is Proxy processing request, App Router matching segment, Server Component obtaining initial data, Client Component taking over the interactive island, Route Handler processing BFF request, and Metadata output head."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "125-runtime-type-and-toolchain-boundaries",
      "children": [
        {
          "type": "text",
          "value": "12.5 Runtime, type and toolchain boundaries"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime performs array mapping and component function; React renders the current Vite UI; browser hosts DOM, events and storage; TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "SellerHubRouteNode"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "ArchitectureBoundary"
        },
        {
          "type": "text",
          "value": "; Vite/ESLint/Vitest/build Verify the current exercise. The RSC payload, Route Handler, Proxy and Metadata of Next.js are mechanism simulations in this chapter."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "126-verification-steps",
      "children": [
        {
          "type": "text",
          "value": "12.6 Verification steps"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "run "
        },
        {
          "type": "inlineCode",
          "value": "npm run lint"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "npm run typecheck"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "npm run test"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "npm run build"
        },
        {
          "type": "text",
          "value": ". This chapter does not add new dependencies, nor does it create a real Next.js root project."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "13-extra-cheatsheet",
      "children": [
        {
          "type": "text",
          "value": "13. Extra Cheatsheet"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "Judgment problem"
          }
        ],
        [
          {
            "type": "text",
            "value": "Quick Answer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Is this the real Next.js app of the current Vite root project?"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "\"use client\""
            },
            {
              "type": "text",
              "value": " Does the entire app become a client?"
            }
          ],
          [
            {
              "type": "text",
              "value": "No, only module entry and dependency graph are marked."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Hydration mismatch?"
            }
          ],
          [
            {
              "type": "text",
              "value": "server output and first client render are inconsistent."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "typeof window"
            },
            {
              "type": "text",
              "value": " always resolve mismatch?"
            }
          ],
          [
            {
              "type": "text",
              "value": "cannot, it only prevents crashes and does not guarantee that the first frame is consistent."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Route Handler return JSX?"
            }
          ],
          [
            {
              "type": "text",
              "value": "should not return JSX."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Proxy/Middleware equivalent to permission security?"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not equal, sensitive data still needs to be verified by the server."
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "14-final-file-list",
      "children": [
        {
          "type": "text",
          "value": "14. Final File List"
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "the-study-guide-file-created-this-time",
      "children": [
        {
          "type": "text",
          "value": "The study guide file created this time"
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "docs/react/chapter-13-nextjs-ssr-rsc/react-chapter-13-learning-guide.md"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "real-practice-file-created-in-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "Real practice file created in this chapter"
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/03-route-special-files/route-special-file-boundaries.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-model.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/05-client-component-boundary/client-component-boundary-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-boundary.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-matrix.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-lab.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-model.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/10-suspense-streaming-boundary/streaming-boundary-model.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-model.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/12-route-runtime-boundaries/route-runtime-boundary-map.tsx"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "the-real-file-of-the-final-mini-project-created-in-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "The real file of the final mini project created in this chapter"
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-route-tree.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-architecture-lab.tsx"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "adaptershell-file",
      "children": [
        {
          "type": "text",
          "value": "Adapter/shell file"
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/chapter-13-practice-root.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-13-nextjs-ssr-rsc/chapter-13-practice.css"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "README.md"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "no-need-to-create-concepts-snippet",
      "children": [
        {
          "type": "text",
          "value": "No need to create concepts snippet"
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "Snippet: conceptual Next.js app tree"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "Snippet: conceptual SellerHub App Router tree"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "root directory "
                },
                {
                  "type": "inlineCode",
                  "value": "app/"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "root directory "
                },
                {
                  "type": "inlineCode",
                  "value": "pages/"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "next.config.*"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "15-turn-this-chapter-into-personal-notes",
      "children": [
        {
          "type": "text",
          "value": "15. Turn This Chapter into Personal Notes"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "compresses each section into "
        },
        {
          "type": "inlineCode",
          "value": "owner -> boundary rule -> SellerHub risk -> evidence file"
        },
        {
          "type": "text",
          "value": ". Don't just memorize the file name, write down how the server output, client first render, serialized props, and hydration target change."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "16-review-questions",
      "children": [
        {
          "type": "text",
          "value": "16. Review Questions"
        }
      ]
    },
    {
      "type": "list",
      "ordered": true,
      "start": 1,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Next.js Why is it not the file version of React Router?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "layout.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "page.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "loading.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "error.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "not-found.tsx"
                },
                {
                  "type": "text",
                  "value": " express?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Server Component Why can't I use state, effect, event handler or browser API?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "\"use client\""
                },
                {
                  "type": "text",
                  "value": " affect?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Server -> Client props Why do they need to be serializable?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What is the difference between first output owner of SSR, SSG, ISR, dynamic rendering and CSR?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Hydration mismatch Why does it happen?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Route Handler, Proxy/Middleware, Metadata, and Node/Edge runtime belong to?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "SellerHub How do catalog, product detail, seller orders, checkout, login and orders API assign owners?"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "17-final-memory-model",
      "children": [
        {
          "type": "text",
          "value": "17. Final Memory Model"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Next.js The core link of App Router is request entering the framework boundary, segment and fixed file to generate server render plan, Server Component outputs HTML/RSC payload, Client Component passes "
        },
        {
          "type": "inlineCode",
          "value": "\"use client\""
        },
        {
          "type": "text",
          "value": " enters the browser bundle, props must be serializable, and browser hydration uses first client render to take over the server HTML. Anything that reads browser-only APIs, generates random/timed output, passes non-serializable objects, confuses Route Handlers with components, or treats Proxy as full-privilege security will break this chain."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "id": "18-official-documentation-reading-list",
      "children": [
        {
          "type": "text",
          "value": "18. Official Documentation Reading List"
        }
      ]
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js App Router Docs"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Layouts and Pages"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/api-reference/directives/use-client",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js "
                    },
                    {
                      "type": "inlineCode",
                      "value": "use client"
                    },
                    {
                      "type": "text",
                      "value": " Directive"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/getting-started/server-and-client-components",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Server and Client Components"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js "
                    },
                    {
                      "type": "inlineCode",
                      "value": "loading.js"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/api-reference/file-conventions/error",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js "
                    },
                    {
                      "type": "inlineCode",
                      "value": "error.js"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/api-reference/file-conventions/not-found",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js "
                    },
                    {
                      "type": "inlineCode",
                      "value": "not-found.js"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/getting-started/route-handlers",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Route Handlers"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/api-reference/file-conventions/proxy",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Proxy file convention"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/api-reference/file-conventions/middleware",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Middleware compatibility page"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/getting-started/metadata-and-og-images",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Metadata and OG images"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://nextjs.org/docs/app/getting-started/caching-and-revalidating",
                  "children": [
                    {
                      "type": "text",
                      "value": "Next.js Caching and Revalidating"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://react.dev/reference/rsc/server-components",
                  "children": [
                    {
                      "type": "text",
                      "value": "React Server Components"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://react.dev/reference/rsc/use-client",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "use client"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react-dom/client/hydrateRoot",
                  "children": [
                    {
                      "type": "text",
                      "value": "React DOM "
                    },
                    {
                      "type": "inlineCode",
                      "value": "hydrateRoot"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/Suspense",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "Suspense"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript Handbook: The Basics"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN "
                    },
                    {
                      "type": "inlineCode",
                      "value": "Window.localStorage"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Local supporting reference: "
                },
                {
                  "type": "inlineCode",
                  "value": "references/books/react/full-stack-react-projects.pdf"
                },
                {
                  "type": "text",
                  "value": " includes older SSR/hydration topics; it is supporting material only."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Local supporting reference: "
                },
                {
                  "type": "inlineCode",
                  "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
                },
                {
                  "type": "text",
                  "value": " had no relevant "
                },
                {
                  "type": "inlineCode",
                  "value": "Next.js"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "SSR"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "hydration"
                },
                {
                  "type": "text",
                  "value": " hits in the first 80 pages checked for this chapter."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter13Content() {
  return <DocumentRenderer document={chapterDocument} />
}
