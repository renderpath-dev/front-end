import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-07",
  "slug": "chapter-07-effects-and-refs",
  "title": "React Chapter 7: Effects, Refs, and External-System Synchronization",
  "sourcePath": "docs/react/chapter-07-effects-and-refs/react-chapter-07-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-7-effects-refs-and-external-system-synchronization",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 7: Effects, Refs, and External-System Synchronization"
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
              "value": "General entrance of this chapter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/chapter-07-practice-root.tsx"
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
              "value": "8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "This chapter shares the style"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/chapter-07-practice.css"
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
              "value": "8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "pure render"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/01-pure-render-boundary/pure-render-boundary.tsx"
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
              "value": "event / effect boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/02-event-handler-vs-effect/event-handler-vs-effect.tsx"
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
              "value": "mutable ref"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/03-ref-mutable-value/ref-mutable-value.tsx"
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
              "value": "DOM ref"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/04-dom-node-ref/dom-node-ref.tsx"
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
              "value": "setup / cleanup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/05-effect-setup-cleanup/effect-setup-cleanup.tsx"
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
              "value": "dependency array"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/06-effect-dependencies/effect-dependencies.tsx"
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
              "value": "stale closure"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/07-stale-closure/stale-closure-interval.tsx"
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
              "value": "timer cleanup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/08-timer-cleanup/timer-cleanup.tsx"
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
              "value": "document title"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/09-document-title-sync/document-title-sync.tsx"
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
              "value": "async cleanup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/10-async-effect-cleanup/async-effect-cleanup.tsx"
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
              "value": "derived data"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/11-derived-data-without-effect/derived-data-without-effect.tsx"
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
              "value": "typed refs"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/12-typed-refs-effects/typed-refs-effects.tsx"
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
              "value": "Execute side effect in render"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: side effect during render"
            }
          ],
          [
            {
              "type": "text",
              "value": "Concept snippet"
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
              "value": "Empty dependency masks reactive value"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: missing dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "Concept snippet"
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
              "value": "stale interval callback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: stale interval closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "Concept snippet"
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
              "value": "derived state effect"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: redundant derived state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Concept snippet"
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
              "value": "mini project type"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mini project data"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mini project input"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-input.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mini project result"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-results.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mini project owner"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mini project style"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project file"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Vite mount adapter"
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
              "value": "has updated the entrance file"
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
          "value": "This document is Chapter 7 of the current React + TypeScript + Vite learning route. Topic by local "
        },
        {
          "type": "inlineCode",
          "value": "README.md"
        },
        {
          "type": "text",
          "value": " are jointly confirmed:"
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Effects and Refs"
            }
          ]
        },
        {
          "type": "text",
          "value": ". The goal is not to remember how to write two Hooks, but to establish the boundaries between \"pure render, user events, React synchronization process, browser external system, TypeScript static check\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter inherits: the props input of Chapter 3, the state snapshot and event handler of Chapter 4, the derived list of Chapter 5, and the controlled form of Chapter 6. It does not introduce router, backend, TanStack Query, React Hook Form, Zod, Prisma or new dependencies."
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
          "value": "component function will be called repeatedly by React. If you change the DOM directly in the function body, start the timer or write "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": ", a discarded render may also leave real external effects. On the other hand, put all the logic into "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": " will generate redundant render, dependency errors and stale closure."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The judgment sequence established in this chapter is:"
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
                  "value": "Is this the JSX calculation from props/state? Stay in render."
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
                  "value": "Is this triggered by a specific user operation? Put in the corresponding event handler."
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
                  "value": "Is this an external system that the component's currently visible state must continue to match? Use effects to describe setup, dependencies, and cleanup."
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
                  "value": "Is this a value that needs to be preserved across renders, but changes should not trigger the UI? Use ref."
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
                  "value": "UI Is this value required to be displayed? If so, use state instead of just modifying ref."
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
      "id": "2-prerequisites",
      "children": [
        {
          "type": "text",
          "value": "2. Prerequisites"
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
            "value": "Pre-concept"
          }
        ],
        [
          {
            "type": "text",
            "value": "Purpose of this chapter"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "function and closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "Each time render creates new bindings, the asynchronous callback will retain the lexical environment when it was created."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "state snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect setup and handler both read the snapshot of the corresponding render."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "event callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "When the user's intention is clear, the side effect should occur directly in the handler."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "immutable state"
            }
          ],
          [
            {
              "type": "text",
              "value": "can continue to update the render data using setters without using ref to bypass React."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "conditional rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "mount/unmount subcomponent observable cleanup."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "controlled input"
            }
          ],
          [
            {
              "type": "text",
              "value": "search query is state; DOM node identity is obtained through ref."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "browser API"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "focus()"
            },
            {
              "type": "text",
              "value": ", timer, "
            },
            {
              "type": "inlineCode",
              "value": "document.title"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "AbortController"
            },
            {
              "type": "text",
              "value": " does not belong to React."
            }
          ]
        ]
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
          "value": "After completing this chapter, you should be able to:"
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
                  "type": "text",
                  "value": "Explain why render must remain purely computational."
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
                  "value": "Determine whether the logic belongs to render, event handler or effect."
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
                  "value": "Explanation "
                },
                {
                  "type": "inlineCode",
                  "value": "useRef"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "current"
                },
                {
                  "type": "text",
                  "value": " mutation and the reason why render is not triggered."
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
                  "value": "uses typed ref to access the input DOM node and process the initial "
                },
                {
                  "type": "inlineCode",
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": "."
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
                  "value": "predicts the execution order of setup, cleanup, dependency changes, unmount and Strict Mode."
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
                  "value": "derives the dependency array from the reactive values read by the effect, rather than manually \"selecting\" dependencies."
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
                  "value": "Identify stale closure and fix it with correct dependency, functional updater or refactoring responsibility."
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
                  "value": "cleanup timer, subscription and obsolete async result."
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
                  "value": "directly calculates derived data in render to avoid "
                },
                {
                  "type": "inlineCode",
                  "value": "effect + state"
                },
                {
                  "type": "text",
                  "value": " mirror."
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
                  "value": "maps the mechanism to the search, modal, draft, dashboard and request scenarios of SellerHub."
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
      "id": "4-recommended-learning-sequence",
      "children": [
        {
          "type": "text",
          "value": "4. Recommended Learning Sequence"
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
                  "value": "First divide pure render and side effect."
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
                  "value": "further distinguishes event-specific logic and render-caused synchronization."
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
                  "value": "Learn why the ref object can be retained across renders and why it does not drive the UI."
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
                  "value": "Give ref to JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "ref"
                },
                {
                  "type": "text",
                  "value": " attribute, observe React writing to the DOM node when committing."
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
                  "value": "Learn the setup/cleanup symmetric process of effect."
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
                  "value": "Deduces dependencies from reactive values, and then analyzes the closure snapshot."
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
                  "value": "uses timer, document title, browser subscription and async to simulate and verify cleanup."
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
                  "value": "Finally, delete unnecessary effects first, and then combine necessary synchronization into Seller Search Sync Workspace."
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
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "term"
          }
        ],
        [
          {
            "type": "text",
            "value": "accurately defines"
          }
        ],
        [
          {
            "type": "text",
            "value": "belongs to the layer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "pure render"
            }
          ],
          [
            {
              "type": "text",
              "value": "is the same as props/state/context should compute the same JSX without modifying the external observable state"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Convention / JavaScript"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "side effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "Change the external state of the function or call the operation of the external system"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "The external synchronization process"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "setup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Start or update the function"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Stop or cancel the function of the last setup"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reactive value"
            }
          ],
          [
            {
              "type": "text",
              "value": "The value declared in props, state and component body and read by effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "React / tooling"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "dependency array"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect inline constant length list of reactive values read"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ref object"
            }
          ],
          [
            {
              "type": "text",
              "value": "React "
            },
            {
              "type": "inlineCode",
              "value": "{ current }"
            },
            {
              "type": "text",
              "value": " object"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework / JS object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DOM ref"
            }
          ],
          [
            {
              "type": "text",
              "value": "commit after "
            },
            {
              "type": "inlineCode",
              "value": "current"
            },
            {
              "type": "text",
              "value": " points to the ref"
            }
          ],
          [
            {
              "type": "text",
              "value": "React / browser"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "stale closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "callback continue reading old render lexical bindings"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "abort / ignore"
            }
          ],
          [
            {
              "type": "text",
              "value": "Cancel operation or prevent expired completion update UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / JavaScript"
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
      "type": "code",
      "language": "txt",
      "label": "Underlying mental model",
      "value": "React calls component -> pure render calculates JSX\n  -> React commits DOM changes and ref.current values\n  -> browser may paint\n  -> React runs effect setup for the committed render\n\nnext committed render with changed dependencies\n  -> cleanup from the previous render snapshot\n  -> setup from the next render snapshot\n\nunmount\n  -> final cleanup"
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "JavaScript runtime behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": function invocation creates bindings; closure retains old bindings; object property is mutable; timer callback executes asynchronously."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "React framework behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": React retains hook cells, compares dependencies, schedules setup after commit, and runs cleanup before resynchronizing or unmounting."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Browser platform behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": DOM node, focus, timer, document title, online event and abort signal are browser capabilities."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript type-system behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Check "
                },
                {
                  "type": "inlineCode",
                  "value": "HTMLInputElement | null"
                },
                {
                  "type": "text",
                  "value": ", event type and timer handle; the type is erased after emit."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Tooling behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "eslint-plugin-react-hooks"
                },
                {
                  "type": "text",
                  "value": " Check Hook rules and dependencies; "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " Check type; Vite converts TSX and bundles."
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
      "id": "7-recommended-directory-structure",
      "children": [
        {
          "type": "text",
          "value": "7. Recommended Directory Structure"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "adopts \"one synchronization mechanism and one directory\" is that effect bugs usually come from mixed responsibilities. The numbers fix the learning sequence, and the descriptive file names indicate the goals. The final project is only responsible for the combination and does not replace individual exercises."
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
      "value": "README.md\npackage.json\ntsconfig.app.json\neslint.config.js\nsrc/\n  App.tsx\n  sudoku/\n  learning/react/\n    chapter-05-rendering-data/\n    chapter-06-forms/\ndocs/react/\n  chapter-05-rendering-data/\n  chapter-06-forms/"
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
      "value": "docs/react/chapter-07-effects-and-refs/\n  react-chapter-07-learning-guide.md"
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
      "value": "src/learning/react/chapter-07-effects-and-refs/\n  chapter-07-practice-root.tsx\n  chapter-07-practice.css\n  01-pure-render-boundary/pure-render-boundary.tsx\n  02-event-handler-vs-effect/event-handler-vs-effect.tsx\n  03-ref-mutable-value/ref-mutable-value.tsx\n  04-dom-node-ref/dom-node-ref.tsx\n  05-effect-setup-cleanup/effect-setup-cleanup.tsx\n  06-effect-dependencies/effect-dependencies.tsx\n  07-stale-closure/stale-closure-interval.tsx\n  08-timer-cleanup/timer-cleanup.tsx\n  09-document-title-sync/document-title-sync.tsx\n  10-async-effect-cleanup/async-effect-cleanup.tsx\n  11-derived-data-without-effect/derived-data-without-effect.tsx\n  12-typed-refs-effects/typed-refs-effects.tsx"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The following snippet is only used for error comparison and no file creation is required:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Snippet: side effect during render\nSnippet: missing dependency\nSnippet: stale interval closure\nSnippet: redundant derived state\nSnippet: unsafe ref access"
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
      "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/\n  seller-search-types.ts\n  seller-search-data.ts\n  seller-search-input.tsx\n  seller-search-results.tsx\n  seller-search-sync-workspace.tsx\n  seller-search-sync-mini-project.css"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "src/sudoku/main.tsx"
        },
        {
          "type": "text",
          "value": " already has "
        },
        {
          "type": "inlineCode",
          "value": "StrictMode"
        },
        {
          "type": "text",
          "value": " with React root. This chapter does not modify it; root level "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " only switches to "
        },
        {
          "type": "inlineCode",
          "value": "Chapter07PracticeRoot"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/chapter-07-practice-root.tsx",
      "value": "import { PureRenderBoundary } from './01-pure-render-boundary/pure-render-boundary'\nimport { EventHandlerVsEffect } from './02-event-handler-vs-effect/event-handler-vs-effect'\nimport { RefMutableValue } from './03-ref-mutable-value/ref-mutable-value'\nimport { DomNodeRef } from './04-dom-node-ref/dom-node-ref'\nimport { EffectSetupCleanup } from './05-effect-setup-cleanup/effect-setup-cleanup'\nimport { EffectDependencies } from './06-effect-dependencies/effect-dependencies'\nimport { StaleClosureInterval } from './07-stale-closure/stale-closure-interval'\nimport { TimerCleanup } from './08-timer-cleanup/timer-cleanup'\nimport { DocumentTitleSync } from './09-document-title-sync/document-title-sync'\nimport { AsyncEffectCleanup } from './10-async-effect-cleanup/async-effect-cleanup'\nimport { DerivedDataWithoutEffect } from './11-derived-data-without-effect/derived-data-without-effect'\nimport { TypedRefsEffects } from './12-typed-refs-effects/typed-refs-effects'\nimport { SellerSearchSyncWorkspace } from './seller-search-sync-mini-project/seller-search-sync-workspace'\nimport './chapter-07-practice.css'\n\nconst practiceSections = [\n  { id: 'pure-render', component: <PureRenderBoundary /> },\n  { id: 'event-effect', component: <EventHandlerVsEffect /> },\n  { id: 'mutable-ref', component: <RefMutableValue /> },\n  { id: 'dom-ref', component: <DomNodeRef /> },\n  { id: 'setup-cleanup', component: <EffectSetupCleanup /> },\n  { id: 'dependencies', component: <EffectDependencies /> },\n  { id: 'stale-closure', component: <StaleClosureInterval /> },\n  { id: 'timer-cleanup', component: <TimerCleanup /> },\n  { id: 'document-title', component: <DocumentTitleSync /> },\n  { id: 'async-cleanup', component: <AsyncEffectCleanup /> },\n  { id: 'derived-data', component: <DerivedDataWithoutEffect /> },\n  { id: 'typed-refs', component: <TypedRefsEffects /> },\n]\n\nexport function Chapter07PracticeRoot() {\n  return (\n    <main className=\"chapter-seven-shell\">\n      <header className=\"chapter-seven-header\">\n        <p className=\"chapter-seven-eyebrow\">React Chapter 07</p>\n        <h1>Effects, Refs, and External Synchronization</h1>\n        <p>\n          Separate render calculations, user-driven events, retained mutable references,\n          and synchronization processes before applying them to SellerHub workflows.\n        </p>\n      </header>\n\n      <section aria-labelledby=\"chapter-seven-practice-title\">\n        <div className=\"chapter-seven-section-heading\">\n          <div>\n            <p>Mechanism practice</p>\n            <h2 id=\"chapter-seven-practice-title\">One synchronization boundary per directory</h2>\n          </div>\n          <p>Use each card to predict setup, cleanup, dependency, and render behavior.</p>\n        </div>\n\n        <div className=\"chapter-seven-practice-grid\">\n          {practiceSections.map((practice) => (\n            <div id={practice.id} key={practice.id}>\n              {practice.component}\n            </div>\n          ))}\n        </div>\n      </section>\n\n      <SellerSearchSyncWorkspace />\n    </main>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line by line and execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " imports identifies each mechanism directory; array only saves JSX elements and stable IDs; root first renders the practice grid, and then renders the final project. There is no new business state here, each child has its own corresponding mechanism."
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-07-effects-and-refs/chapter-07-practice.css",
      "value": ":root {\n  color: #172033;\n  background: #eef3f4;\n  font-family:\n    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    sans-serif;\n}\n\nbody { margin: 0; }\n\nbutton,\ninput,\nselect { font: inherit; }\n\n.chapter-seven-shell {\n  width: min(100% - 32px, 1180px);\n  margin: 0 auto;\n  padding: 56px 0 72px;\n}\n\n.chapter-seven-header { max-width: 900px; margin-bottom: 48px; }\n\n.chapter-seven-eyebrow,\n.chapter-seven-section-heading > div > p,\n.practice-label,\n.project-eyebrow {\n  margin: 0;\n  color: #0f766e;\n  font-size: 0.75rem;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.chapter-seven-header h1 {\n  margin: 10px 0 0;\n  color: #172033;\n  font-size: clamp(2.2rem, 6vw, 4.7rem);\n  line-height: 1;\n}\n\n.chapter-seven-header > p:last-child {\n  margin: 22px 0 0;\n  color: #526077;\n  font-size: 1.08rem;\n  line-height: 1.7;\n}\n\n.chapter-seven-section-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 20px;\n}\n\n.chapter-seven-section-heading h2 {\n  margin: 6px 0 0;\n  color: #172033;\n  font-size: 1.8rem;\n}\n\n.chapter-seven-section-heading > p {\n  max-width: 430px;\n  margin: 0;\n  color: #667085;\n  text-align: right;\n}\n\n.chapter-seven-practice-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.practice-card {\n  height: 100%;\n  box-sizing: border-box;\n  padding: 22px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.practice-card h3 {\n  margin: 8px 0 18px;\n  color: #172033;\n  font-size: 1.15rem;\n}\n\n.practice-card p:not(.practice-label) { color: #667085; line-height: 1.55; }\n\n.practice-card label {\n  display: grid;\n  gap: 6px;\n  margin-bottom: 12px;\n  color: #344054;\n  font-size: 0.9rem;\n  font-weight: 750;\n}\n\n.practice-card input,\n.practice-card select {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 9px 10px;\n  color: #172033;\n  border: 1px solid #94a3b8;\n  border-radius: 7px;\n  background: #ffffff;\n}\n\n.practice-card button {\n  padding: 9px 12px;\n  color: #ffffff;\n  border: 1px solid #0f766e;\n  border-radius: 7px;\n  background: #0f766e;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n.button-row { display: flex; flex-wrap: wrap; gap: 8px; }\n.practice-card .status-positive { color: #067647; font-weight: 800; }\n.practice-card .status-negative { color: #b42318; font-weight: 800; }\n\n@media (max-width: 960px) {\n  .chapter-seven-practice-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n\n@media (max-width: 640px) {\n  .chapter-seven-shell {\n    width: min(100% - 20px, 1180px);\n    padding: 36px 0 48px;\n  }\n\n  .chapter-seven-section-heading { align-items: start; flex-direction: column; }\n  .chapter-seven-section-heading > p { text-align: left; }\n  .chapter-seven-practice-grid { grid-template-columns: 1fr; }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line by line and execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " shared CSS defines page, grid, card, form control and responsive layout; it only affects browser presentation and does not participate in Hook lifecycle."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/App.tsx",
      "value": "import { Chapter07PracticeRoot } from './learning/react/chapter-07-effects-and-refs/chapter-07-practice-root'\n\nfunction App() {\n  return <Chapter07PracticeRoot />\n}\n\nexport default App"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line by line and execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " import analyzes the general entrance of this chapter; "
        },
        {
          "type": "inlineCode",
          "value": "App"
        },
        {
          "type": "text",
          "value": " returns the component element; "
        },
        {
          "type": "inlineCode",
          "value": "createRoot"
        },
        {
          "type": "text",
          "value": " call causes React to render the entire chapter. "
        },
        {
          "type": "inlineCode",
          "value": "App"
        },
        {
          "type": "text",
          "value": " does not save the state of this chapter, nor is it responsible for concept implementation."
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run dev"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": ", operate 12 mechanism cards in sequence, and then operate the final project. "
        },
        {
          "type": "inlineCode",
          "value": "setup -> cleanup -> setup"
        },
        {
          "type": "text",
          "value": "; After correct cleanup, the results visible to the user should be consistent with production."
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
      "type": "heading",
      "depth": 3,
      "id": "91-pure-rendering-and-side-effects",
      "children": [
        {
          "type": "text",
          "value": "9.1 Pure Rendering and Side Effects"
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "pure render"
        },
        {
          "type": "text",
          "value": " refers to the render phase that only performs repeatable calculations; "
        },
        {
          "type": "inlineCode",
          "value": "side effect"
        },
        {
          "type": "text",
          "value": " refers to modifying the observable state outside the function; "
        },
        {
          "type": "inlineCode",
          "value": "render phase"
        },
        {
          "type": "text",
          "value": " is responsible for calculating UI description; "
        },
        {
          "type": "inlineCode",
          "value": "commit phase"
        },
        {
          "type": "text",
          "value": " allows React to apply the confirmed results to the DOM. \"Pure\" here does not mean \"there are no variables inside the function\", but that the same input will not additionally change the browser or other external systems due to different calls."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime allows ordinary functions to modify global objects and call timers; React framework relies on component render to be called repeatedly, so render is required to remain pure; browser platform actually executes "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": ", timer and DOM mutation; TypeScript only checks expressions and types, and does not prove function purity; tooling can find typical problems through Hooks lint and some purity rules, but developers still need to judge observable side effects."
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
          "value": " React calls component and gets JSX description first, and then decides whether to commit. If the component has started the timer when it is called, the timer will not be automatically canceled even if the render is replaced by a subsequent render or there is no commit. Pure render only creates local primitive, array, object or JSX values; if these values ​​do not escape to the outside, they can be discarded along with the calculation."
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
          "value": " There are no new APIs in this section, the focus is on responsibility boundaries and runtime mechanisms. "
        },
        {
          "type": "inlineCode",
          "value": "quantity * unitPrice"
        },
        {
          "type": "text",
          "value": " is render-time pure calculation; "
        },
        {
          "type": "inlineCode",
          "value": "onClick={() => ...}"
        },
        {
          "type": "text",
          "value": " Just give the function value to React, and the function will not be executed during render."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " No new fixed React methods are added in this section. Existing JSX event prop must be written as "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": "; setter updater continue to use "
        },
        {
          "type": "inlineCode",
          "value": "(currentValue) => nextValue"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "window.setInterval()"
        },
        {
          "type": "text",
          "value": " is a browser API used to identify error levels and does not belong to render syntax."
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
        },
        {
          "type": "text",
          "value": " First look at how the error snippet changes the browser immediately in render, and then look at how the real practice file only calculates "
        },
        {
          "type": "inlineCode",
          "value": "totalPrice"
        },
        {
          "type": "text",
          "value": "."
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
          "value": " React may call, pause, or discard render multiple times. Only pure calculation allows these scheduling choices to not change the external world."
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
          "value": " component body should calculate JSX from props, state, context. Modifying the DOM, starting the timer, writing storage or document title are all side effects and cannot occur in render."
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
          "value": " Why the ordinary JavaScript function can call any API, but the React component function requires the purity convention? Because React treats it as a repeatable calculation step, not a one-time command."
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
              "value": "Level boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript allows side effects; React stipulates render purity; the browser performs real external changes; TypeScript does not judge business purity; ESLint can detect the misuse of some Hooks, but cannot prove the purity of any function."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: side effect during render",
      "value": "function OrderSummary({ openOrderCount }: { openOrderCount: number }) {\n  document.title = `Orders (${openOrderCount})`\n  window.setInterval(refreshOrders, 5000)\n\n  return <p>{openOrderCount} open orders</p>\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Error execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Each component invocation immediately writes the title and creates a new interval; even if React discards the render, the browser timer already exists. When correcting, put title into the dependency correct effect, pair timer setup with clear cleanup; if refresh is only triggered by buttons, put event handler."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/01-pure-render-boundary/pure-render-boundary.tsx",
      "value": "import { useState } from 'react'\n\nexport function PureRenderBoundary() {\n  const [quantity, setQuantity] = useState(2)\n  const unitPrice = 48\n  const totalPrice = quantity * unitPrice\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Pure render</p>\n      <h3>Calculate UI without a side effect</h3>\n      <p>\n        {quantity} items at ${unitPrice} produce a render-time total of ${totalPrice}.\n      </p>\n      <button onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}>\n        Add one item\n      </button>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " state is the only variable render input; "
        },
        {
          "type": "inlineCode",
          "value": "unitPrice"
        },
        {
          "type": "text",
          "value": " is a constant; "
        },
        {
          "type": "inlineCode",
          "value": "totalPrice"
        },
        {
          "type": "text",
          "value": " is calculated directly for each render; button only hands the callback to React and does not call the setter during render."
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
          "value": " first render gets "
        },
        {
          "type": "inlineCode",
          "value": "2 * 48 = 96"
        },
        {
          "type": "text",
          "value": "; handler queue updater after click; React calls component again with quantity 3; new render gets 144 and commits text."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Old "
        },
        {
          "type": "inlineCode",
          "value": "quantity"
        },
        {
          "type": "text",
          "value": " binding remains 2; the new render creates a binding with the value 3. "
        },
        {
          "type": "inlineCode",
          "value": "totalPrice"
        },
        {
          "type": "text",
          "value": " has no state identity and there is no synchronization problem."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is completely determined by the current snapshot, so there is no need for an effect or a second state."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Do not adjust "
        },
        {
          "type": "inlineCode",
          "value": "document.title = ..."
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "setInterval(...)"
        },
        {
          "type": "text",
          "value": ". They are actually executed on every render; they should be moved to handlers or effects depending on the triggering reason."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "totalPrice"
        },
        {
          "type": "text",
          "value": " only relies on the primitive values ​​of the current render. The calculation will not register the listener, create the timer or change the global object; therefore, React will only get the description once or multiple times. The setter only enters the update queue after click, and the external observable changes are aligned with the interaction."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const totalPrice = quantity * unitPrice"
        },
        {
          "type": "text",
          "value": " One render will get the current result; if the total is saved in state and updated in Effect, the old total will be committed first, and then a cascading render will be generated. If you write title in render, the number of calls to component will change the browser state."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " render violates the rule of \"render must be pure and reproducible\"; putting derived total in Effect violates the rule of \"values ​​that can be calculated from current inputs do not establish a second state\"."
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
          "value": " When I see the assignment, network call, timer, subscription, DOM method or setter of the component top level, I ask \"React only calls it but does not commit, has the external world changed?\" The answer is yes, it is not pure render."
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
          "value": " product subtotal, inventory badge, filtered products, and checkout total should be calculated first from current props/state in render; external changes such as analytics, autosave, title, etc. will then enter the handler or Effect according to the reason."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section reuses the state snapshot in Chapter 4 and the derived list in Chapter 5, and defines the entry conditions for Effect in Chapter 7: not \"use Effect when the value changes\", but \"use Effect only when synchronization with external systems is really needed\"."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " render is a retryable calculation, not a command execution area; JSX is calculated first, and then the real side effect is processed by the Effect after event or commit."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-event-handlers-vs-effects",
      "children": [
        {
          "type": "text",
          "value": "9.2 Event Handlers vs. Effects"
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
          "value": " The same piece of side-effect code can be written in handler or effect, but the \"reason\" expressed in the two positions is different. This section solves how to select the location based on the triggering reason to avoid mistaken execution of business commands that should only occur once during initial mount, irrelevant state change, or page recovery."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "event-specific logic"
        },
        {
          "type": "text",
          "value": " is the logic directly triggered by a clear interaction; "
        },
        {
          "type": "inlineCode",
          "value": "reactive synchronization"
        },
        {
          "type": "text",
          "value": " is committed UI. As long as it is in a certain state, it must continue to match the external system; "
        },
        {
          "type": "inlineCode",
          "value": "cause"
        },
        {
          "type": "text",
          "value": " indicates why the logic occurs, not just when it runs."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime executes handler and effect callback; React framework calls handler after browser event and arranges effect synchronization after commit; browser platform generates click event and saves it "
        },
        {
          "type": "inlineCode",
          "value": "document.body.dataset"
        },
        {
          "type": "text",
          "value": "; TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "WorkspaceMode"
        },
        {
          "type": "text",
          "value": " union and callback parameters; tooling check "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": "."
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
          "value": " click handler Starting from the reason \"the user selects a certain mode\", queue "
        },
        {
          "type": "inlineCode",
          "value": "workspaceMode"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "lastAction"
        },
        {
          "type": "text",
          "value": "; React render/commit After the next snapshot, the effect does not care which button the mode comes from, and is only responsible for making the body dataset match the committed mode. This way user intent and external synchronization will not impersonate each other."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "onClick={handler}"
        },
        {
          "type": "text",
          "value": " Register event handler; "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, [workspaceMode])"
        },
        {
          "type": "text",
          "value": " declares a synchronization process driven by committed mode. Do not call "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": " instead of click command, and do not call the handler directly in render."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " fixed JSX prop is "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": "; Effect signature is "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, dependencies?)"
        },
        {
          "type": "text",
          "value": ", where setup returns "
        },
        {
          "type": "inlineCode",
          "value": "void"
        },
        {
          "type": "text",
          "value": " or cleanup function; in this example, the domain handler signature is "
        },
        {
          "type": "inlineCode",
          "value": "handleModeChange(nextMode: WorkspaceMode): void"
        },
        {
          "type": "text",
          "value": "."
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
        },
        {
          "type": "text",
          "value": " Real practice leaves the action message in the handler and "
        },
        {
          "type": "inlineCode",
          "value": "document.body.dataset.sellerWorkspace"
        },
        {
          "type": "text",
          "value": " is put into the effect."
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
          "value": " event handler expresses \"what the user did\"; effect expresses \"which external system the current committed UI needs to continue to be consistent with.\" Confusing the two loses the triggering cause."
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
          "value": " Clearly, business actions caused by click, submit, and change are placed in the handler. No matter which interaction creates state, external synchronization must be maintained before the effect is released."
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
          "value": " handler is executed after the browser event; effect setup is executed after the corresponding render commit. Both closure capture render snapshot, but the trigger timing and semantics are different."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/02-event-handler-vs-effect/event-handler-vs-effect.tsx",
      "value": "import { useEffect, useState } from 'react'\n\ntype WorkspaceMode = 'catalog' | 'orders'\n\nexport function EventHandlerVsEffect() {\n  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('catalog')\n  const [lastAction, setLastAction] = useState('No action recorded.')\n\n  useEffect(() => {\n    document.body.dataset.sellerWorkspace = workspaceMode\n    return () => {\n      delete document.body.dataset.sellerWorkspace\n    }\n  }, [workspaceMode])\n\n  function handleModeChange(nextMode: WorkspaceMode): void {\n    setWorkspaceMode(nextMode)\n    setLastAction(`The user selected ${nextMode} mode.`)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Event or effect</p>\n      <h3>Separate intent from synchronization</h3>\n      <div className=\"button-row\">\n        <button onClick={() => handleModeChange('catalog')}>Catalog</button>\n        <button onClick={() => handleModeChange('orders')}>Orders</button>\n      </div>\n      <p>Current mode: {workspaceMode}</p>\n      <p aria-live=\"polite\">{lastAction}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " union limits the mode; the handler records the intent generated by click; the effect reads the committed mode and synchronizes it to the browser DOM dataset; cleanup undoes its own old writes."
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
          "value": " click calls the handler and queues state update twice; renders once after React batching; commit updates text; old effect cleanup deletes old attributes; new setup writes next mode."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "workspaceMode"
        },
        {
          "type": "text",
          "value": " is not modified; next render creates a new string binding. "
        },
        {
          "type": "inlineCode",
          "value": "document.body"
        },
        {
          "type": "text",
          "value": " is a browser object outside the React tree."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The user action message needs to be retained for the reason of click, so it is in the handler; the dataset must be consistent with the mode generated by any source, so it is in the effect."
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
              "value": "Comparison error:"
            }
          ]
        },
        {
          "type": "text",
          "value": " if effect monitors "
        },
        {
          "type": "inlineCode",
          "value": "workspaceMode"
        },
        {
          "type": "text",
          "value": ", initial mount or other state sources may trigger business actions by mistake. Business commands should stay in the handler that generated them."
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
          "value": " handler retains the information \"which interaction resulted in the operation\"; Effect only sees committed mode, so it is suitable for expressing \"as long as mode is X, the external system should be X\". Both can perform side effects, but the data source and cause are different."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "handleCheckoutSubmit()"
        },
        {
          "type": "text",
          "value": " and reserve submit cause; Effect according to "
        },
        {
          "type": "inlineCode",
          "value": "workspaceMode"
        },
        {
          "type": "text",
          "value": " Update dataset does not care about mode source. If the sending order is placed in Effect, initial mount, state restore or other update paths may be triggered."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Putting user command in Effect violates the rule of \"event-specific logic stays in the corresponding handler\"; putting continuous external sync in only a certain button handler violates the rule of \"external system must match the current state generated from any source\"."
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
          "value": " asked \"If the page enters the same state due to URL restore, parent prop or other handlers, should this logic also be executed?\" Only when the answer is \"Yes, synchronization must continue\", it will tend to Effect; when the answer is \"No, only because of this click\", it will stay in the handler."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "Save product"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Place order"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Export report"
        },
        {
          "type": "text",
          "value": " is event commands; focus synchronization of document title, global subscription, and visible modal is Effects."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section extends the event handler in Chapter 4 and the form submit in Chapter 6 forward: the handler is still responsible for the user's intention, and Effect only adds the responsibility of \"external synchronization caused by render\"."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " handler answers \"what the user just did\"; Effect answers \"which external system the currently submitted UI must be consistent with.\""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-using-useref-to-preserve-mutable-values",
      "children": [
        {
          "type": "text",
          "value": "9.3 Using useRef to Preserve Mutable Values"
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
          "value": " Ordinary local variables cannot be retained across renders, and state update will request render; this section solves how to save values such as timer handle, request sequence, interaction counter, etc. that \"do not participate in UI calculations but need to be remembered across renders\"."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "ref object"
        },
        {
          "type": "text",
          "value": " is a common JavaScript object that React retains identity for component instance; "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " is a variable property; "
        },
        {
          "type": "inlineCode",
          "value": "non-render value"
        },
        {
          "type": "text",
          "value": " indicates that the value change itself should not change JSX."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime executes common property read/write; React framework returns the same ref object across renders, but does not subscribe to "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " mutation; browser platform This section does not participate in count saving; TypeScript from "
        },
        {
          "type": "inlineCode",
          "value": "useRef(0)"
        },
        {
          "type": "text",
          "value": " derives "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " is number; tooling will limit the unsafe ref read/write during render, but will not turn mutation into state update."
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
          "value": " Hook corresponds to the internal hook cell of React; the first call creates a ref object, and subsequent renders retrieve the same object. "
        },
        {
          "type": "inlineCode",
          "value": "interactionCountRef.current += 1"
        },
        {
          "type": "text",
          "value": " replaces the number property but does not call the React setter, so the update queue is empty and the component will not be re-called due to this mutation."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "useRef<T>(initialValue)"
        },
        {
          "type": "text",
          "value": " created ref; by "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": " read and write. Only put the value in ref if it is not used in the current JSX; if the UI must respond to changes, use state."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " is the fixed property name of React ref object; the calling form is "
        },
        {
          "type": "inlineCode",
          "value": "useRef(initialValue)"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "useRef<Type>(initialValue)"
        },
        {
          "type": "text",
          "value": ". Don't create your own "
        },
        {
          "type": "inlineCode",
          "value": "ref.value"
        },
        {
          "type": "text",
          "value": " and looking forward to JSX "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " mechanism identification."
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
        },
        {
          "type": "text",
          "value": " Real practice first silently increments "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": ", and then the second handler copies the current ref value to the state to intuitively see that \"remember\" and \"trigger render\" are two different things."
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
          "value": " Some values need to be saved across render, but are not UI inputs, such as timer ID, request sequence, and previous pointer position. state will trigger render; ordinary local variables are rebuilt each time render occurs; ref fills the boundary between the two."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "useRef(initialValue)"
        },
        {
          "type": "text",
          "value": " returns a React object that retains identity. Modify "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": " is an ordinary object property mutation and does not queue render."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/03-ref-mutable-value/ref-mutable-value.tsx",
      "value": "import { useRef, useState } from 'react'\n\nexport function RefMutableValue() {\n  const interactionCountRef = useRef(0)\n  const [visibleSnapshot, setVisibleSnapshot] = useState(0)\n\n  function handleSilentIncrement(): void {\n    interactionCountRef.current += 1\n  }\n\n  function handleReadSnapshot(): void {\n    setVisibleSnapshot(interactionCountRef.current)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Mutable ref value</p>\n      <h3>A ref remembers without rendering</h3>\n      <div className=\"button-row\">\n        <button onClick={handleSilentIncrement}>Increment ref</button>\n        <button onClick={handleReadSnapshot}>Read into state</button>\n      </div>\n      <p>Last rendered ref snapshot: {visibleSnapshot}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " ref saves the real mutable count; state only saves the snapshot that needs to be displayed; the first handler only mutates; the second handler hands the current ref value to the setter."
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
          "value": " continuously clicks the Increment ref, JavaScript immediately changes the "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": ", React does not render; after clicking Read into state, the setter queue renders and the paragraph displays the new value."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "interactionCountRef"
        },
        {
          "type": "text",
          "value": " object identity is stable across renders, "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " digits are replaced; "
        },
        {
          "type": "inlineCode",
          "value": "visibleSnapshot"
        },
        {
          "type": "text",
          "value": " is an immutable snapshot of each render."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React does not track any object property mutations, only state setters and other React update sources."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " If the value must be displayed in real time, use state directly. Don't expect the UI to refresh automatically after modifying the ref, and don't read and write business refs in render at will, because concurrent render requires purity."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " mutation only changes ordinary object properties and does not call the React update API; until "
        },
        {
          "type": "inlineCode",
          "value": "setVisibleSnapshot"
        },
        {
          "type": "text",
          "value": " queue state update, React generates next render and reads the visible value."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " local variable is rebuilt in each render; state is saved across renders and setter triggers render; ref is saved across renders but mutation does not trigger render. The selection is based on whether the value needs to participate in the current UI calculation."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " uses ref to save the page count but displays it directly in JSX, which violates the rule that \"visible facts must be driven by React traceable input\"; modifying ref at will during render violates purity, because the discarded render may still leave mutations."
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
          "value": " if DevTools/console in "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " has changed but the page remains unchanged. This is normal behavior of ref and is not a React fault. If you want to force render because of this, it usually means that the value should be state."
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
          "value": " request sequence, timer handle, previous focus target and imperative widget handle can use ref; cart count, pending status, product draft and other visible facts must use state."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Chapter 4 uses state to create component memory; this section adds \"memory that does not drive render\" to prepare for the subsequent DOM ref, timer cleanup and async request identity."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " ref is a box that React retains identity, JavaScript can be mutated, and the UI will not automatically subscribe; state is used for visible facts, and ref is used for invisible handles."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-using-refs-to-access-dom-nodes",
      "children": [
        {
          "type": "text",
          "value": "9.4 Using Refs to Access DOM Nodes"
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
          "value": " JSX describes the DOM, but focus, scroll, selection and measurement require real nodes. This section solves how the component can obtain the committed node of React without searching and taking over the DOM lifecycle by itself."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "DOM ref"
        },
        {
          "type": "text",
          "value": " Save browser node identity; JSX "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " attribute gives the ref object to React; "
        },
        {
          "type": "inlineCode",
          "value": "imperative browser API"
        },
        {
          "type": "text",
          "value": " is an API that needs to issue commands to specific nodes; "
        },
        {
          "type": "inlineCode",
          "value": "null boundary"
        },
        {
          "type": "text",
          "value": " means that the node does not exist before commit or after unmount."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime reads "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " and call method; React framework sets node during commit and restores null when unmount; browser platform implements "
        },
        {
          "type": "inlineCode",
          "value": "HTMLInputElement"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": "; TypeScript use "
        },
        {
          "type": "inlineCode",
          "value": "HTMLInputElement | null"
        },
        {
          "type": "text",
          "value": " describes lifecycle; tooling/IDE provides DOM method diagnostics based on element type."
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
          "value": " initial render only creates element description, and there is no input instance; commit creates or reuses node, and writes reference to ref object. The handler only reads the current node when click arrives. If the input is unmounted, React will clear the assignment to prevent the ref from permanently pointing to a node that is no longer managed."
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
          "value": " uses "
        },
        {
          "type": "inlineCode",
          "value": "const inputRef = useRef<HTMLInputElement>(null)"
        },
        {
          "type": "text",
          "value": " creates typed ref, then write "
        },
        {
          "type": "inlineCode",
          "value": "<input ref={inputRef}>"
        },
        {
          "type": "text",
          "value": ". The focus triggered by a clear click is placed in the handler; the focus triggered by the node appearing on the page is considered the effect."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JSX fixed attribute is "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": "; ref fixed property is "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": "; browser method is "
        },
        {
          "type": "inlineCode",
          "value": "focus(options?)"
        },
        {
          "type": "text",
          "value": ", return "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": ". This example uses "
        },
        {
          "type": "inlineCode",
          "value": "inputRef.current?.focus()"
        },
        {
          "type": "text",
          "value": " handles null."
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
        },
        {
          "type": "text",
          "value": " Real file display safe focus; "
        },
        {
          "type": "inlineCode",
          "value": "Snippet: unsafe ref access"
        },
        {
          "type": "text",
          "value": " shows why direct dereference before commit fails."
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
          "value": " React manages DOM creation and updates, but imperative browser APIs such as focus, scroll, and measurement require specific nodes. JSX "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " attribute tells React to maintain this reference at commit time."
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
          "value": " is rendered for the first time, the DOM has not yet been created, "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " is "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": ". After commit, React writes the input node to "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": "; clear back to "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/04-dom-node-ref/dom-node-ref.tsx",
      "value": "import { useRef } from 'react'\n\nexport function DomNodeRef() {\n  const searchInputRef = useRef<HTMLInputElement>(null)\n\n  function handleFocusSearch(): void {\n    searchInputRef.current?.focus()\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">DOM ref</p>\n      <h3>Call a browser API from an event</h3>\n      <label>\n        Product search\n        <input ref={searchInputRef} placeholder=\"Search inventory\" />\n      </label>\n      <button onClick={handleFocusSearch}>Focus search</button>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " generic parameter description target node API; initial value is "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": "; input "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " attribute hands the object to React; the handler uses optional chaining to handle the null boundary, and then calls browser "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": "."
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
          "value": " render only generates JSX; commit creates input and writes "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": "; browser event triggers handler after click; handler is for real "
        },
        {
          "type": "inlineCode",
          "value": "HTMLInputElement"
        },
        {
          "type": "text",
          "value": " adjust "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": "; browser updates active element."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " ref object identity remains unchanged, "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " from "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " becomes a DOM node. focus state belongs to browser, not React state."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React is responsible for node lifecycle, browser is responsible for focus behavior, and TypeScript only ensures that callable methods and null checks are correct."
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
              "value": "Comparison error:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Write directly in render "
        },
        {
          "type": "inlineCode",
          "value": "searchInputRef.current.focus()"
        },
        {
          "type": "text",
          "value": " may read null and violate purity. The focus caused by click is placed in the handler; the focus caused by the appearance of component is considered as effect."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: unsafe ref access",
      "value": "const inputRef = useRef<HTMLInputElement>(null)\ninputRef.current.focus()"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "error execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " initial render React has not yet created the input node, "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " is null; TypeScript will report that it may be null, and the runtime will throw an error after forcibly bypassing the type. "
        },
        {
          "type": "inlineCode",
          "value": "inputRef.current?.focus()"
        },
        {
          "type": "text",
          "value": "."
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
          "value": " JSX "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " is not a query expression that immediately evaluates to node; React only writes "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": ", browser focus can only take effect on real existing elements."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " click reads the committed node in the handler; after the modal appears, the focus is automatically read by Effect and the committed node is read; the direct focus of render is both premature and causes a browser side effect in the calculation phase."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is non-null assertion, call "
        },
        {
          "type": "inlineCode",
          "value": "current.focus()"
        },
        {
          "type": "text",
          "value": " violates both null lifecycle and render purity rules; use "
        },
        {
          "type": "inlineCode",
          "value": "document.querySelector"
        },
        {
          "type": "text",
          "value": " bypassing ref weakens React's expression of node ownership."
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
          "value": " When encountering \"possibly null\", first render crash, pointing to the old element or focus jumping repeatedly after node switching, check whether the read occurs before commit, whether the owner is stable, and whether the triggering reason is an event or an effect."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "ProductSearchInput"
        },
        {
          "type": "text",
          "value": ", the first field focus after the modal is opened, and the field focus after validation failure all require DOM ref, but the triggering reasons for the three may belong to the handler or Effect respectively."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section connects the JSX attribute in Chapter 2 and the event handler in Chapter 4 to the browser DOM API, and establishes the node lifecycle foundation for subsequent modal and accessibility learning."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React puts the real node into "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": "; When the DOM method is called is determined by the triggering reason, any read must respect the null boundary."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-effect-setup-and-cleanup",
      "children": [
        {
          "type": "text",
          "value": "9.5 Effect Setup and Cleanup"
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
          "value": " component is visible will not be automatically removed by the browser when the component is unmounted. This section addresses who owns the synchronization process, and how to reliably stop the old process when a dependency changes or unmounts."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "setup"
        },
        {
          "type": "text",
          "value": " starts synchronization; "
        },
        {
          "type": "inlineCode",
          "value": "cleanup"
        },
        {
          "type": "text",
          "value": " Stop or cancel the same setup; "
        },
        {
          "type": "inlineCode",
          "value": "subscription ownership"
        },
        {
          "type": "text",
          "value": " means that the component that created the listener is also responsible for dismantling it; "
        },
        {
          "type": "inlineCode",
          "value": "symmetric cleanup"
        },
        {
          "type": "text",
          "value": " indicates that stop operation and start operation use the same resource identity."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript closure lets cleanup retain the callback references created by setup; React determines the cleanup/setup calling sequence; the browser saves global listeners and dispatches online/offline events; TypeScript checks the listener and boolean state; tooling confirms that the Effect dependency array is complete."
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
          "value": " commit, setup creates two function objects and registers them. cleanup closure captures these two objects, so "
        },
        {
          "type": "inlineCode",
          "value": "removeEventListener"
        },
        {
          "type": "text",
          "value": " can find the old listener by target, event type, and callback identity. If the component is setup again, a new set of callbacks will be created and managed by a new cleanup."
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
          "value": " Effect setup can return cleanup; subscription must be "
        },
        {
          "type": "inlineCode",
          "value": "addEventListener"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "removeEventListener"
        },
        {
          "type": "text",
          "value": " pairs. An empty dependency array is only true if the setup does not read changing reactive values."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " uses "
        },
        {
          "type": "inlineCode",
          "value": "window.addEventListener(type, listener)"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "window.removeEventListener(type, listener)"
        },
        {
          "type": "text",
          "value": "; event type string is fixed to "
        },
        {
          "type": "inlineCode",
          "value": "'online'"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "'offline'"
        },
        {
          "type": "text",
          "value": "; Effect form is "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(() => { ...; return () => { ... } }, [])"
        },
        {
          "type": "text",
          "value": "."
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
        },
        {
          "type": "text",
          "value": " The real exercise uses browser connectivity subscription to demonstrate the callback identity symmetric relationship between setup and cleanup."
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
          "value": " effect is not a \"mount callback\", but a synchronization process that can be started and stopped repeatedly. setup connects to the current external system, and cleanup cancels the same setup."
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
          "value": " React runs the old cleanup before the new setup of changed dependencies and runs the last cleanup when unmounting. Subscriptions must be released using the same target, event type, and callback reference."
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
              "value": "Level boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser saves listeners; JavaScript function identity determines whether it can be removed; React arranges setup / cleanup; TypeScript checks listener signature; hooks linter checks dependencies."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/05-effect-setup-cleanup/effect-setup-cleanup.tsx",
      "value": "import { useEffect, useState } from 'react'\n\nexport function EffectSetupCleanup() {\n  const [isOnline, setIsOnline] = useState(() => navigator.onLine)\n\n  useEffect(() => {\n    function handleOnline(): void {\n      setIsOnline(true)\n    }\n\n    function handleOffline(): void {\n      setIsOnline(false)\n    }\n\n    window.addEventListener('online', handleOnline)\n    window.addEventListener('offline', handleOffline)\n\n    return () => {\n      window.removeEventListener('online', handleOnline)\n      window.removeEventListener('offline', handleOffline)\n    }\n  }, [])\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Setup and cleanup</p>\n      <h3>Subscribe to browser connectivity</h3>\n      <p className={isOnline ? 'status-positive' : 'status-negative'}>\n        Browser status: {isOnline ? 'Online' : 'Offline'}\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " lazy initializer reads the browser status in the initial render; declares two stable-for-that-setup callbacks in the setup and subscribes to them; cleanup uses the same reference to deactivate; the empty array is legal because the setup does not read the changing reactive value in the component body."
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
          "value": " commit; browser connectivity event adjusts handler; setter queue render; cleanup removes listeners when unmount or Strict Mode stress-test."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Each setup creates a new pair of callbacks, but the corresponding cleanup closure retains the same pair of references. The boolean of state will not change until the next render."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " listener ownership and component visibility are aligned; the component no longer responds to global events when it is not on the page."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Writing a new arrow function in cleanup cannot remove the old callback. The function reference created by setup must be reused."
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
          "value": " browser registers listener according to function identity; cleanup closure retains the same function objects created by setup, so remove can hit. React is only responsible for calling cleanup and will not automatically infer and delete the browser subscription."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Symmetrical writing method Register "
        },
        {
          "type": "inlineCode",
          "value": "handleOnline"
        },
        {
          "type": "text",
          "value": " and remove the same reference in cleanup; wrong way of writing is to create "
        },
        {
          "type": "inlineCode",
          "value": "() => setIsOnline(true)"
        },
        {
          "type": "text",
          "value": ", even if the source code of the two functions is the same, they are not the same object."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Forgot that cleanup violates \"the owner who creates a persistent resource is responsible for stopping the resource\"; use the new callback to remove the violation of the browser event listener identity rule."
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
          "value": " component is triggered multiple times after an event is repeatedly mounted, is still updated after unmounting, and the number of logs continues to grow in Strict Mode. This usually indicates that the listener, connection, or timer has not been cleaned symmetrically."
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
          "value": " online/offline prompt, unsaved changes warning, global keyboard shortcut and external inventory subscription must be completed by the visible owner subscribe/unsubscribe."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " 4 only handles React JSX events; this section handles global subscription outside the React tree for the first time, and understands Effect as a start/stop process rather than a life cycle name list."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Each setup is only responsible for starting a synchronization cycle, and each cleanup ends it with the same resource identity; React arranges the timing, and the browser saves the resource."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-dependency-arrays-and-resynchronization",
      "children": [
        {
          "type": "text",
          "value": "9.6 Dependency Arrays and Resynchronization"
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
          "value": " Effect closure will read the values of a certain render; if these values change and the effect is not resynchronized, the external system will still be aligned with the old snapshot. This section addresses where dependencies come from, what React compares to, and why you can't suppress lint warnings with empty arrays."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "reactive value"
        },
        {
          "type": "text",
          "value": " includes props, state and values declared in component body and read by effect; "
        },
        {
          "type": "inlineCode",
          "value": "dependency array"
        },
        {
          "type": "text",
          "value": " is a statement of reactive reads; "
        },
        {
          "type": "inlineCode",
          "value": "re-synchronization"
        },
        {
          "type": "text",
          "value": " is stop old process and then start next process; "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " is React's rule for comparing dependencies in the same location."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript closure fixes this render bindings; React framework saves the last dependency list and uses "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " compares and arranges cleanup/setup; the browser platform holds the synchronized dataset or connection; TypeScript only checks the dependency expressions type and does not judge omissions; "
        },
        {
          "type": "inlineCode",
          "value": "eslint-plugin-react-hooks"
        },
        {
          "type": "text",
          "value": " statically analyzes reactive reads in setup/cleanup and reports missing items."
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
          "value": " initial commit and setup capture "
        },
        {
          "type": "inlineCode",
          "value": "all"
        },
        {
          "type": "text",
          "value": ". next render produces "
        },
        {
          "type": "inlineCode",
          "value": "warehouse"
        },
        {
          "type": "text",
          "value": "; React compares the primitive string before and after, and finds differences. First call capture "
        },
        {
          "type": "inlineCode",
          "value": "all"
        },
        {
          "type": "text",
          "value": ", and then call the capture "
        },
        {
          "type": "inlineCode",
          "value": "warehouse"
        },
        {
          "type": "text",
          "value": ". Cleanup does not read the \"latest channel\", but ends the old synchronization cycle it created."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup)"
        },
        {
          "type": "text",
          "value": " is resynchronized after each commit; "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, [])"
        },
        {
          "type": "text",
          "value": " indicates no changed reactive dependency; "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, [a, b])"
        },
        {
          "type": "text",
          "value": " means resynchronization when a or b changes. The dependency list must be inline and of fixed length."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Effect signature is "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, dependencies?)"
        },
        {
          "type": "text",
          "value": "; dependencies are "
        },
        {
          "type": "inlineCode",
          "value": "[dep1, dep2]"
        },
        {
          "type": "text",
          "value": "; in this example, "
        },
        {
          "type": "inlineCode",
          "value": "inventoryChannel"
        },
        {
          "type": "text",
          "value": ", so "
        },
        {
          "type": "inlineCode",
          "value": "[inventoryChannel]"
        },
        {
          "type": "text",
          "value": ". There is no independent keyword magic of \"run only once\"."
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
        },
        {
          "type": "text",
          "value": " Real practice showing primitive dependency stop-old/start-new; "
        },
        {
          "type": "inlineCode",
          "value": "Snippet: missing dependency"
        },
        {
          "type": "text",
          "value": " Show "
        },
        {
          "type": "inlineCode",
          "value": "[]"
        },
        {
          "type": "text",
          "value": " is inconsistent with the actual reading of the effect body."
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
          "value": " dependency array is not a list of commands \"when you want to run\", but a statement of reactive values read by effect setup / cleanup. React uses "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " compares the same position value to determine whether resynchronization is needed."
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
          "value": " props, state, and variables/functions declared in the component body and read by the effect may all be dependencies. Can't lie to reduce the number of runs."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/06-effect-dependencies/effect-dependencies.tsx",
      "value": "import { useEffect, useState } from 'react'\n\nconst inventoryChannels = ['all', 'warehouse', 'storefront'] as const\ntype InventoryChannel = (typeof inventoryChannels)[number]\n\nexport function EffectDependencies() {\n  const [inventoryChannel, setInventoryChannel] = useState<InventoryChannel>('all')\n\n  useEffect(() => {\n    document.body.dataset.inventoryChannel = inventoryChannel\n    return () => {\n      delete document.body.dataset.inventoryChannel\n    }\n  }, [inventoryChannel])\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Reactive dependency</p>\n      <h3>Re-synchronize when a dependency changes</h3>\n      <label>\n        Inventory channel\n        <select\n          onChange={(event) => setInventoryChannel(event.currentTarget.value as InventoryChannel)}\n          value={inventoryChannel}\n        >\n          {inventoryChannels.map((channel) => (\n            <option key={channel} value={channel}>\n              {channel}\n            </option>\n          ))}\n        </select>\n      </label>\n      <p>External dataset value: {inventoryChannel}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " readonly tuple produces finite union; effect setup and cleanup are both created by the current render closure; setup reads "
        },
        {
          "type": "inlineCode",
          "value": "inventoryChannel"
        },
        {
          "type": "text",
          "value": ", so dependency must contain it; select handler queue next value."
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
          "value": " initial commit write "
        },
        {
          "type": "inlineCode",
          "value": "all"
        },
        {
          "type": "text",
          "value": "; select "
        },
        {
          "type": "inlineCode",
          "value": "warehouse"
        },
        {
          "type": "text",
          "value": " after render/commit; React compare "
        },
        {
          "type": "inlineCode",
          "value": "all"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "warehouse"
        },
        {
          "type": "text",
          "value": ", execute the old cleanup first, and then execute the new setup."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The old cleanup captures the old render environment; the new setup captures the new channel. "
        },
        {
          "type": "inlineCode",
          "value": "document.body"
        },
        {
          "type": "text",
          "value": " identity is stable, but the dataset property is replaced."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " dependency change indicates that the old synchronization fact no longer matches the committed UI and requires stop old / start new."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: missing dependency",
      "value": "useEffect(() => {\n  connectToInventory(inventoryChannel)\n}, [])"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " empty array claims setup does not depend on any reactive value, but body reads "
        },
        {
          "type": "inlineCode",
          "value": "inventoryChannel"
        },
        {
          "type": "text",
          "value": ". It will permanently connect the initial snapshot. The dependency should be added, or the effect should be restructured so that it no longer reads the value; the dependency corresponding to the lint warning cannot be deleted."
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
          "value": " Effect closure does not automatically read the latest render; dependency comparison tells React when the old closure no longer represents the current UI. After the channel is declared, React will stop the process of capturing the old channel and start the process of capturing the next channel."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "[inventoryChannel]"
        },
        {
          "type": "text",
          "value": " resynchronizes with channel changes; "
        },
        {
          "type": "inlineCode",
          "value": "[]"
        },
        {
          "type": "text",
          "value": " is only suitable for setups with no changed reactive reads; omitting the second parameter will resynchronize each commit. The three writing methods have different semantics and are not performance level switches."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Deleting the dependency to eliminate the warning violates \"dependencies are determined by reactive reads in the Effect code\"; directly using the newly created object each time render as a dependency may violate the design requirement of \"stabilize/remove unnecessary object dependencies first\"."
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
          "value": " When you see the missing dependency of Hooks lint, the external connection still uses the old ID, and Effect frequently disconnects and reconnects, check the missing reactive read and unstable object/function identity respectively instead of disabling the rule first."
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
          "value": " product search query, selected shop, order ID and subscription channel are changed, the old request/subscription must be cleaned up; the theme-independent listener may legally use the empty array."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section connects Chapter 4 render snapshot and JavaScript closure to Effect lifecycle, which is the core bridge for understanding async race, autosave and subsequent custom Hook dependencies."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The dependency array is not \"when do I want it to run\", but \"what potentially changing render values ​​have been read by the synchronization process this time\"."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-stale-closures",
      "children": [
        {
          "type": "text",
          "value": "9.7 Stale Closures"
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
          "value": " When a timer, promise callback or subscription callback is executed later, why does it still read the old state when it was created? This section reduces the problem to JavaScript closure and React render snapshot, instead of misdiagnosing it as timer or React update failure."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "lexical closure"
        },
        {
          "type": "text",
          "value": " reserves bindings where the function is created; "
        },
        {
          "type": "inlineCode",
          "value": "stale closure"
        },
        {
          "type": "text",
          "value": " is the snapshot to which the callback belongs and is no longer the current UI snapshot; "
        },
        {
          "type": "inlineCode",
          "value": "functional updater"
        },
        {
          "type": "text",
          "value": " Give the transition function to React and let React provide the current state in the update queue."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript The runtime determines which binding the closure reads; React creates a new state snapshot each time it renders, and provides the current queued value when calling the functional updater; the browser timer is only responsible for calling the callback later; TypeScript can confirm that the updater parameter is number, but does not detect the semantic stale read; Hooks Lint can discover some stale closures through dependency analysis, but whether the functional updater is suitable still depends on the business mechanism."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "setElapsedSeconds(elapsedSeconds + 1)"
        },
        {
          "type": "text",
          "value": " will solidify the number of setup render into interval closure; if the initial value is 0, 1 will be requested every tick. Change to "
        },
        {
          "type": "inlineCode",
          "value": "setElapsedSeconds(currentSeconds => currentSeconds + 1)"
        },
        {
          "type": "text",
          "value": ", closure no longer reads "
        },
        {
          "type": "inlineCode",
          "value": "elapsedSeconds"
        },
        {
          "type": "text",
          "value": ", React passes in the current value when processing each queued update."
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
          "value": " There are no new APIs in this section, the focus is on responsibility boundaries and runtime mechanisms. Functional updater is suitable for transitions where \"next state only depends on previous state\"; if the external synchronization of the effect does read a certain prop/state, dependency should be declared, and updater or ref cannot be used to hide the true relationship."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " state setter accepts "
        },
        {
          "type": "inlineCode",
          "value": "nextState"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "(previousState) => nextState"
        },
        {
          "type": "text",
          "value": "; in this example the updater is "
        },
        {
          "type": "inlineCode",
          "value": "(currentSeconds: number) => number"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "setInterval(callback, delay)"
        },
        {
          "type": "text",
          "value": " is only responsible for scheduling callbacks and will not refresh the lexical environment for callbacks."
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
        },
        {
          "type": "text",
          "value": " uses functional updater for real practice; "
        },
        {
          "type": "inlineCode",
          "value": "elapsedSeconds"
        },
        {
          "type": "text",
          "value": ", used to compare the data sources of two callbacks."
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
          "value": " stale closure is the normal result of JavaScript lexical closure, not React secretly caching variables. Each render callback sees the bindings that created it."
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
          "value": " If interval only needs to calculate the next state based on the previous state, the functional updater can remove the reading of a certain snapshot value. If the external synchronization itself depends on the reactive value, the dependency should be declared instead of always hidden with ref."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/07-stale-closure/stale-closure-interval.tsx",
      "value": "import { useEffect, useState } from 'react'\n\nexport function StaleClosureInterval() {\n  const [elapsedSeconds, setElapsedSeconds] = useState(0)\n\n  useEffect(() => {\n    const intervalId = window.setInterval(() => {\n      setElapsedSeconds((currentSeconds) => currentSeconds + 1)\n    }, 1000)\n    return () => window.clearInterval(intervalId)\n  }, [])\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Closure boundary</p>\n      <h3>Read previous state in the updater</h3>\n      <p>Mounted for {elapsedSeconds} seconds.</p>\n      <button onClick={() => setElapsedSeconds(0)}>Reset visible counter</button>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " setup creates a browser interval; callback does not read "
        },
        {
          "type": "inlineCode",
          "value": "elapsedSeconds"
        },
        {
          "type": "text",
          "value": ", only hand over the updater function to React; React provides the latest pending state when calling the updater; cleanup uses the interval ID to stop the process."
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
          "value": " timer queue updater every second; React calls the updater with current state and renders. When Reset is adjacent to tick, React is calculated in the order of update queue and does not depend on 0 when interval is created."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " interval callback closure retains the setter, but the setter identity is stable; each updater parameter is the current queued value passed in by React."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " callback describes state transition instead of reading the stale number of setup render."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: stale interval closure",
      "value": "useEffect(() => {\n  const intervalId = window.setInterval(() => {\n    setElapsedSeconds(elapsedSeconds + 1)\n  }, 1000)\n  return () => window.clearInterval(intervalId)\n}, [])"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " setup always sees initial "
        },
        {
          "type": "inlineCode",
          "value": "elapsedSeconds"
        },
        {
          "type": "text",
          "value": ", so queue 1 is repeated. A functional updater is used here; if the external process of the callback really requires a certain latest prop, the dependencies should be redesigned or the official \"separate events from effects\" mode should be adopted instead of mechanically applying the updater."
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
          "value": " stale callback is not overwritten by JavaScript; it correctly reads 0 when it was created. The functional updater changes the data flow: the timer callback no longer reads the old snapshot, but receives the current state when React processes the queue."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "setCount(count + 1)"
        },
        {
          "type": "text",
          "value": " depends on count in closure; "
        },
        {
          "type": "inlineCode",
          "value": "setCount(current => current + 1)"
        },
        {
          "type": "text",
          "value": " relies on the current queued value provided by React; putting count in dependency will rebuild the interval every tick. Although the semantics work, it introduces unnecessary process churn."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Switching to ref for all stale problems violates \"do not hide the real reactive dependency\"; blindly adding an empty array violates \"the changed values read by the closure must be declared or reconstructed\"; blindly adding count to dependency may ignore more appropriate functional transitions."
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
          "value": " timer value is stuck, async log is always initial prop, and subscription callback uses old filter, locate the render at which the callback was created, and list the bindings it reads; then determine whether to resynchronize, use functional updater, or separate event logic."
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
          "value": " checkout autosave timer, order polling counter, delayed toast and search request completion may all catch the old draft/query/status; the solution depends on whether the external process should be rebuilt as the value changes."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section directly reuses the state snapshot, batching and functional updater in Chapter 4, and explains why each Effect has an independent closure for 9.10 async obsolete result."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " closure does not \"get old\", it always belongs to the render that created it; the real question is whether the old callback is still allowed to represent the current UI."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-timer-cleanup-and-strict-mode",
      "children": [
        {
          "type": "text",
          "value": "9.8 Timer Cleanup and Strict Mode"
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
          "value": " timer is held by the browser, and component unmount will not automatically stop it; the development environment Strict Mode will additionally execute setup/cleanup to expose the asymmetric process. This section solves how to make timer lifetime consistent with owner component lifetime."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "timer handle"
        },
        {
          "type": "text",
          "value": " is the process identifier returned by the browser; "
        },
        {
          "type": "inlineCode",
          "value": "resource lifetime"
        },
        {
          "type": "text",
          "value": " is the time interval from creation to clearing of timer; "
        },
        {
          "type": "inlineCode",
          "value": "Strict Mode stress-test"
        },
        {
          "type": "text",
          "value": " is an additional development-only setup → cleanup → setup, used to verify whether the cleanup is complete."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript callback executes state updater; React schedules Effect lifecycle and executes additional test cycles in Strict Mode; browser creates interval, assigns ID, and calls callback periodically; TypeScript according to "
        },
        {
          "type": "inlineCode",
          "value": "window.setInterval"
        },
        {
          "type": "text",
          "value": " deduces handle; tooling will not clear the timer for you, but lint can check the Effect structure and dependencies."
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
          "value": " child commits, the setup gets the interval ID; each tick is just a browser callback. After the parent switches the conditional branch, React unmounts the child and calls cleanup. Cleanup passes the same ID to the browser. Mounting again is a new component instance, hook cells and interval process."
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
          "value": " After creating the duration timer, the matching clear method must be called in cleanup. Do not use the ref flag to prevent the second setup of Strict Mode; instead, let setup → cleanup → setup and a single setup of production produce equivalent results for users."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "window.setInterval(callback, delay)"
        },
        {
          "type": "text",
          "value": " returns interval ID; "
        },
        {
          "type": "inlineCode",
          "value": "window.clearInterval(intervalId)"
        },
        {
          "type": "text",
          "value": " stops it; Effect cleanup is a parameterless function and returns "
        },
        {
          "type": "inlineCode",
          "value": "void"
        },
        {
          "type": "text",
          "value": "."
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
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "InventoryPollingProcess"
        },
        {
          "type": "text",
          "value": " has its own timer; parent passes mount/unmount to show whether cleanup actually stops the old process."
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
          "value": " timer is a persistent process held by the browser. Removing the React component will not automatically cancel the timer; only cleanup will align process lifetime and owner lifetime."
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
          "value": " setup creates a timer, and cleanup returns the same timer ID. The Strict Mode development environment executes setup/cleanup/setup an additional time, which is a stress-test, not \"the effect breaks for no reason\"."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/08-timer-cleanup/timer-cleanup.tsx",
      "value": "import { useEffect, useState } from 'react'\n\nfunction InventoryPollingProcess() {\n  const [pollCount, setPollCount] = useState(0)\n\n  useEffect(() => {\n    const intervalId = window.setInterval(() => {\n      setPollCount((currentCount) => currentCount + 1)\n    }, 1500)\n    return () => window.clearInterval(intervalId)\n  }, [])\n\n  return <p>Completed polling cycles: {pollCount}</p>\n}\n\nexport function TimerCleanup() {\n  const [isPollingVisible, setIsPollingVisible] = useState(true)\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Timer cleanup</p>\n      <h3>Stop a process when its owner leaves</h3>\n      <button onClick={() => setIsPollingVisible((currentValue) => !currentValue)}>\n        {isPollingVisible ? 'Unmount polling process' : 'Mount polling process'}\n      </button>\n      {isPollingVisible ? <InventoryPollingProcess /> : <p>Polling process is unmounted.</p>}\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " child owns interval and count; parent only controls whether the child exists; when the conditional branch becomes false, React unmounts the child and calls its effect cleanup."
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
          "value": " mount after interval tick; click unmount and then cleanup to clear the ID; mount again is a new component instance, new state and new interval."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Each mount has independent hook cells and interval ID. Queue updates will not continue after the old ID is cleared."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " cleanup cancels the browser process created by setup, so that neither development stress-test nor real unmount leaks timers."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " only saves the interval ID but not "
        },
        {
          "type": "inlineCode",
          "value": "clearInterval"
        },
        {
          "type": "text",
          "value": " will still leak. When two setup logs appear in Strict Mode, do not use the ref flag to prevent the second setup; cleanup should be completed."
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
          "value": " interval belongs to the browser process, not to the React tree. Only when cleanup returns the ID returned by setup to the browser will the old callback stop; the extra cycle of Strict Mode only exposes the missing cleanup earlier."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Correct Effect still has only one active interval after development goes through setup → cleanup → setup; when cleanup is missing, two intervals coexist, and the count doubles, and will continue to accumulate each time it is remounted."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " believes that \"production is setup only once, so no cleanup is needed\", which violates the resource lifetime rule; using ref guard to skip the second setup to cover up the bug cannot solve the real unmount/remount leak."
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
          "value": " development, network/timer is still running after closing the panel, and the frequency increases after reopening, check whether the correct ID is saved and call the matching clear method in cleanup."
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
          "value": " order status refresh placeholder, autosave debounce, and local success message timer must stop the old timer when the filter conditions change, the page leaves, or the component is unmounted."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section applies the general setup/cleanup of 9.5 to timer, and uses Strict Mode to verify the model, and establish resource lifetime intuition for 9.10 async cleanup."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " timer is held by the browser, and the Effect owner ends it with the ID; Strict Mode is not the cause of repeated bugs, but the missing cleanup detector."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-synchronizing-the-document-title",
      "children": [
        {
          "type": "text",
          "value": "9.9 Synchronizing the Document Title"
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
          "value": " dashboard page hopes that the browser tab title will continue to reflect the current open order count, but the title does not belong to the React JSX tree. This section addresses how to synchronize the committed state to the document and restore the previous external value when the owner leaves."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "external document state"
        },
        {
          "type": "text",
          "value": " is the browser state outside the React tree; "
        },
        {
          "type": "inlineCode",
          "value": "restore cleanup"
        },
        {
          "type": "text",
          "value": " not only stops the process, but also cancels the property write; "
        },
        {
          "type": "inlineCode",
          "value": "single owner"
        },
        {
          "type": "text",
          "value": " indicates that multiple components competing for the same global property should be avoided during the same period."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript performs string interpolation and property assignment; React arranges resynchronization according to count dependency; browser implements "
        },
        {
          "type": "inlineCode",
          "value": "Document.title"
        },
        {
          "type": "text",
          "value": " and update the tab/title element; TypeScript learns from the DOM library that title is a string; tooling checks Effect dependency, but cannot automatically discover business conflicts of multiple title owners."
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
          "value": " Each setup first reads the current external title and then writes the current count. When count changes, the old cleanup first restores the old value, and the new setup then takes over the title with next snapshot. When unmounting, the last cleanup returns the value before the component took over."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": " is readable and writable; the continuous synchronization effect on the committed state is not in the render assignment. If the application already has a unified title manager, it should be managed by a unique owner to avoid independent overwriting of each card."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser property is fixed to "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": ", value must be string; in this example, Effect dependencies are fixed to "
        },
        {
          "type": "inlineCode",
          "value": "[openOrderCount]"
        },
        {
          "type": "text",
          "value": ". There is no new React Hook in this section, continue to use "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, dependencies)"
        },
        {
          "type": "text",
          "value": "."
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
        },
        {
          "type": "text",
          "value": " Real practice save "
        },
        {
          "type": "inlineCode",
          "value": "previousTitle"
        },
        {
          "type": "text",
          "value": ", sync "
        },
        {
          "type": "inlineCode",
          "value": "Orders (count)"
        },
        {
          "type": "text",
          "value": " and restored by cleanup."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": " is a browser document property, not a JSX output. It should be synchronized with the committed React state and restore the previous value when the owner leaves."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/09-document-title-sync/document-title-sync.tsx",
      "value": "import { useEffect, useState } from 'react'\n\nexport function DocumentTitleSync() {\n  const [openOrderCount, setOpenOrderCount] = useState(3)\n\n  useEffect(() => {\n    const previousTitle = document.title\n    document.title = `Orders (${openOrderCount})`\n    return () => {\n      document.title = previousTitle\n    }\n  }, [openOrderCount])\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Document synchronization</p>\n      <h3>Keep the browser tab title current</h3>\n      <p>Open orders: {openOrderCount}</p>\n      <div className=\"button-row\">\n        <button onClick={() => setOpenOrderCount((currentCount) => currentCount + 1)}>\n          Add order\n        </button>\n        <button onClick={() => setOpenOrderCount((currentCount) => Math.max(0, currentCount - 1))}>\n          Resolve order\n        </button>\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " setup first saves the old value of the external system and then writes the current count; cleanup restores the old title observed in this setup; dependency indicates that the count change needs to be resynchronized."
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
          "value": " count React commit paragraph after update; old cleanup restores previous title; new setup writes next title. When unmounting, the last cleanup restores the title before the owner took over."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Each effect closure has its own "
        },
        {
          "type": "inlineCode",
          "value": "previousTitle"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "openOrderCount"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "document"
        },
        {
          "type": "text",
          "value": " is a stable global object, and its "
        },
        {
          "type": "inlineCode",
          "value": "title"
        },
        {
          "type": "text",
          "value": " string property changed."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " title is consistent with the component synchronization process."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " render will change the browser in uncommitted render. A title that is only temporarily changed once by an explicit click should be re-evaluated as to whether continuous synchronization is really needed."
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
          "value": " Effect only takes over the title after commit. When the dependency changes, the old value is returned first and then the next value is written. Therefore, the browser tab remains consistent with the confirmed UI; the title will not be changed in advance when render is abandoned."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " render assignment is executed every time component invocation; Effect synchronization only corresponds to committed snapshot; a title write in the event handler is only suitable for clarifying the interaction command and does not express continuous consistency."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " write "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": " violates purity; writing titles to multiple components at the same time violates the single-owner principle; fixed writing of a title in cleanup may overwrite the value set by other owners before entering this page."
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
          "value": " title flashes, does not recover after leaving the page, and when different cards cover each other, check whether there are multiple owners, whether the previous value is saved, and whether the dependency corresponds to the data actually read by the title."
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
          "value": " seller dashboard can display open orders or pending tasks; product editor can display draft name. Real applications are usually managed uniformly by the route/page-level owner instead of writing titles directly for each leaf component."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section applies the Effect model to the minimum browser property, allowing learners to understand the boundary between React state and global document before entering router/page metadata."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": " is the external global state; the page owner takes over in Effect, resynchronizes with the dependency, and returns it in cleanup."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-aborting-or-ignoring-obsolete-async-effects",
      "children": [
        {
          "type": "text",
          "value": "9.10 Aborting or Ignoring Obsolete Async Effects"
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
          "value": " query A's asynchronous task may complete later than query B, and the old completion thus overwrites the new UI. Cleanup can declare the old process invalid when a dependency changes, but it must be clear that \"cancelling the underlying work\" and \"ignoring expired results\" are two related but different lines of defense."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "race condition"
        },
        {
          "type": "text",
          "value": " indicates that multiple operation completion orders are not guaranteed by the startup sequence; "
        },
        {
          "type": "inlineCode",
          "value": "obsolete result"
        },
        {
          "type": "text",
          "value": " is the result that no longer matches current criteria; "
        },
        {
          "type": "inlineCode",
          "value": "abort"
        },
        {
          "type": "text",
          "value": " requests an external operation that supports signal to stop; "
        },
        {
          "type": "inlineCode",
          "value": "ignore flag"
        },
        {
          "type": "text",
          "value": " blocks old closure commit result; "
        },
        {
          "type": "inlineCode",
          "value": "request identity"
        },
        {
          "type": "text",
          "value": " can further confirm whether completion still belongs to the latest process."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript event loop will run timer/promise callback in the future, and closure retains the respective query and ignore binding; React first cleanup the old Effect after query change, then setup the new Effect, and handle the state update generated by completion; browser provides timer and "
        },
        {
          "type": "inlineCode",
          "value": "AbortController"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "AbortSignal"
        },
        {
          "type": "text",
          "value": "; TypeScript checks status union, string array and controller APIs, but does not verify response freshness; tooling checks query dependency and cannot replace runtime race guard."
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
          "value": " Each setup creates independent ignore binding and timeout IDs. After next query commit, old cleanup sets the old binding to true and clear timer; if the real async chain has entered the subsequent stage that cannot be canceled, the old callback can still be completed, but "
        },
        {
          "type": "inlineCode",
          "value": "if (!ignore)"
        },
        {
          "type": "text",
          "value": " will reject state update. The new setup's ignore is still false, so only the latest process has permission to write the UI."
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
          "value": " supports signal operation using "
        },
        {
          "type": "inlineCode",
          "value": "const controller = new AbortController()"
        },
        {
          "type": "text",
          "value": ", incoming "
        },
        {
          "type": "inlineCode",
          "value": "controller.signal"
        },
        {
          "type": "text",
          "value": ", cleanup adjust "
        },
        {
          "type": "inlineCode",
          "value": "controller.abort()"
        },
        {
          "type": "text",
          "value": "; Regardless of abort or not, it is necessary to evaluate whether the async steps after completion still require ignore/request-ID guard. Do not use async function directly as Effect setup, because setup cannot return Promise as cleanup."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "AbortController"
        },
        {
          "type": "text",
          "value": " fixed property is "
        },
        {
          "type": "inlineCode",
          "value": "signal"
        },
        {
          "type": "text",
          "value": ", fixed method is "
        },
        {
          "type": "inlineCode",
          "value": "abort(reason?)"
        },
        {
          "type": "text",
          "value": "; timer uses "
        },
        {
          "type": "inlineCode",
          "value": "setTimeout(callback, delay)"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "clearTimeout(id)"
        },
        {
          "type": "text",
          "value": "; Effect setup returns cleanup function and does not return Promise. In this example, the handler type is "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": "."
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
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "ignore + clearTimeout"
        },
        {
          "type": "text",
          "value": " simulates obsolete result protection; the final project is combined with "
        },
        {
          "type": "inlineCode",
          "value": "AbortController + requestSequenceRef"
        },
        {
          "type": "text",
          "value": " shows double protection, but this section does not expand the project code."
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
          "value": " promise or timer completion order is not necessarily equal to startup order. Cleanup cannot \"rewind\" network responses that have already occurred, but it can cancel operations that support abort and prevent obsolete completion from updating the UI."
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
          "value": " Each setup has its own ignore flag/controller. When dependencies change, cleanup marks the old process as invalid; only the current process can commit result."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/10-async-effect-cleanup/async-effect-cleanup.tsx",
      "value": "import { useEffect, useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\nconst productNames = ['Desk Lamp', 'Mechanical Keyboard', 'Monitor Stand', 'USB-C Hub']\n\nexport function AsyncEffectCleanup() {\n  const [query, setQuery] = useState('desk')\n  const [suggestions, setSuggestions] = useState<string[]>([])\n  const [status, setStatus] = useState<'pending' | 'success'>('pending')\n\n  useEffect(() => {\n    let ignore = false\n    const timeoutId = window.setTimeout(() => {\n      const nextSuggestions = productNames.filter((productName) =>\n        productName.toLowerCase().includes(query.toLowerCase()),\n      )\n      if (!ignore) {\n        setSuggestions(nextSuggestions)\n        setStatus('success')\n      }\n    }, query.length % 2 === 0 ? 700 : 300)\n\n    return () => {\n      ignore = true\n      window.clearTimeout(timeoutId)\n    }\n  }, [query])\n\n  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {\n    setQuery(event.currentTarget.value)\n    setStatus('pending')\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Async cleanup</p>\n      <h3>Ignore an obsolete async result</h3>\n      <label>\n        Suggestion query\n        <input onChange={handleQueryChange} value={query} />\n      </label>\n      <p>{status === 'pending' ? 'Loading suggestions...' : `${suggestions.length} matches`}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " creates an independent "
        },
        {
          "type": "inlineCode",
          "value": "ignore"
        },
        {
          "type": "text",
          "value": " and timeout ID; callback reads the query of the setup; cleanup also cancels the timer and makes the old callback unable to set state even if it continues to complete; handler is responsible for the pending transition generated by user operations."
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
          "value": " Fast input generates multiple renders; each query change first cleanup previous timeout, and then setup next; only the last completion that has not been ignored writes suggestions."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "query"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "ignore"
        },
        {
          "type": "text",
          "value": " are independent of each other. The cleanup mutation is the boolean binding captured by the closure, not the React state."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " obsolete process has lost the permission to update the UI, and the completion order no longer overrides the current criteria."
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
              "value": "Comparison error:"
            }
          ]
        },
        {
          "type": "text",
          "value": " only use "
        },
        {
          "type": "inlineCode",
          "value": "AbortController"
        },
        {
          "type": "text",
          "value": " When canceling fetch, the asynchronous chain after fetch still needs to be considered; the official document recommends explicitly ignore obsolete result. The real data layer can be managed later by TanStack Query, etc., but it is not introduced in this chapter."
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
          "value": " Each Effect closure has an independent ignore binding; cleanup only sets the binding of the old closure to true. Regardless of the completion order, only the latest closure that has not been cleaned can pass the guard and queue state update."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "clearTimeout"
        },
        {
          "type": "text",
          "value": " can prevent timers that have not yet been triggered; "
        },
        {
          "type": "inlineCode",
          "value": "abort()"
        },
        {
          "type": "text",
          "value": " can notify the operation that supports signal to cancel; ignore/request-ID guard controls whether completion has the right to write UI. The three solutions are at different levels and can be combined rather than substituted for each other."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " async Effect does not cleanup and violates \"old process must not affect next snapshot\"; only checking response arrival without checking criteria identity violates current UI ownership; write "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(async () => ...)"
        },
        {
          "type": "text",
          "value": " violates Effect setup and can only return cleanup or void signatures."
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
          "value": " After fast switching query, the result is rolled back, the loading state does not match the input, and when the state is still set after unmounting, artificial delay is used to make the old request slower, and the request criteria, cleanup and completion sequence are recorded."
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
          "value": " race may occur in product search, SKU lookup, shipping quote, and seller dashboard refresh. Before introducing TanStack Query, first master abort/ignore, and then you can understand what lifecycle the data library manages for you."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section combines Chapter 5 branches, Chapter 6 controlled input, and Chapter 7 to form the minimum mechanism model for subsequent real data fetching."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " cleanup cannot overwrite an old closure that has been created; it either cancels the old work or revokes the old completion's qualification to write UI, preferably both."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-when-an-effect-is-unnecessary",
      "children": [
        {
          "type": "text",
          "value": "9.11 When an Effect Is Unnecessary"
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
          "value": " Beginners easily misunderstand \"the value will change with the state\" as \"needs effect synchronization\", so they store derived data such as filter result, full name, total price, etc. into the second state. This section solves how to delete unnecessary Effects first, maintaining a single source of truth and one render."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "derived data"
        },
        {
          "type": "text",
          "value": " can be completely calculated by current props/state; "
        },
        {
          "type": "inlineCode",
          "value": "redundant state"
        },
        {
          "type": "text",
          "value": " Repeatedly save deducible facts; "
        },
        {
          "type": "inlineCode",
          "value": "cascading render"
        },
        {
          "type": "text",
          "value": " is an additional render caused by the Effect set state after commit; "
        },
        {
          "type": "inlineCode",
          "value": "single source of truth"
        },
        {
          "type": "text",
          "value": " means that only the minimum underivable state is saved."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript array "
        },
        {
          "type": "inlineCode",
          "value": "filter()"
        },
        {
          "type": "text",
          "value": " synchronously calculates a new array in component invocation; React uses the same snapshot to calculate and commit input and result; the browser only displays the post-commit DOM, no additional external system is required; TypeScript checks the array element and state type; tooling may report setState synchronized in Effect, but the most important fix is to delete redundant state, rather than changing to setState."
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
          "value": " query setter requests next render; next invocation directly uses next query filter module-level array, and the result belongs to the same snapshot as the input value and is committed once. If using Effect set "
        },
        {
          "type": "inlineCode",
          "value": "visibleNames"
        },
        {
          "type": "text",
          "value": ", the first commit still carries the old result, and Effect queues for the second render, resulting in temporary inconsistency and extra work."
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
          "value": " There are no new APIs in this section, the focus is on responsibility boundaries and runtime mechanisms. pure "
        },
        {
          "type": "inlineCode",
          "value": "filter"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " and string normalization are placed directly in render; memoization will be discussed in the subsequent performance chapter only when it is proven to be expensive by measurement. Effect cannot be used as calculation cache."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "Array.prototype.filter(predicate)"
        },
        {
          "type": "text",
          "value": " returns a new array and should not mutate the source; the state setter only updates the minimum input "
        },
        {
          "type": "inlineCode",
          "value": "query"
        },
        {
          "type": "text",
          "value": ". There are no fixed React effect properties to add in this section."
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
        },
        {
          "type": "text",
          "value": " Only the query is saved for real exercises, and "
        },
        {
          "type": "inlineCode",
          "value": "useEffect + useState"
        },
        {
          "type": "text",
          "value": " mirror "
        },
        {
          "type": "inlineCode",
          "value": "visibleNames"
        },
        {
          "type": "text",
          "value": ", used to compare render times and consistency."
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
          "value": " effect runs after commit. If the effect only calculates another state based on the state, it will first commit the stale UI and then queue the second render, creating redundant state and synchronization risks."
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
          "value": " from current props/state is calculated directly in render; the command after the user clicks is directly in handler; only external synchronization uses effect."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/11-derived-data-without-effect/derived-data-without-effect.tsx",
      "value": "import { useState } from 'react'\n\nconst inventoryNames = ['Desk Lamp', 'Mechanical Keyboard', 'Monitor Stand', 'USB-C Hub']\n\nexport function DerivedDataWithoutEffect() {\n  const [query, setQuery] = useState('')\n  const visibleNames = inventoryNames.filter((inventoryName) =>\n    inventoryName.toLowerCase().includes(query.toLowerCase()),\n  )\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">No effect required</p>\n      <h3>Derive filtered results during render</h3>\n      <label>\n        Local filter\n        <input onChange={(event) => setQuery(event.currentTarget.value)} value={query} />\n      </label>\n      <p>{visibleNames.join(', ') || 'No matching products'}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " query is minimal state; filter is pure array calculation; visible names do not store state; JSX immediately reads the result of the same render."
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
          "value": " input change queue query; the next render directly calculates the next array and commits input and result at once."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " filter creates a new array each time, but it is only used in the current render; there is no second state snapshot that can be inconsistent with the query."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " derived value and source state are generated in the same calculation, and no after-commit synchronization is required."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: redundant derived state",
      "value": "const [visibleNames, setVisibleNames] = useState<string[]>([])\n\nuseEffect(() => {\n  setVisibleNames(inventoryNames.filter((name) => name.includes(query)))\n}, [query])"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This will commit an additional time to the old results, and then effect queue the new results. Remove state and effects, compute them in render; discuss memoization only if it is actually expensive and confirmed by measurement."
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
          "value": " pure filter directly reads the next query in the next render, so the input and result come from the same snapshot; the Effect version must wait for the first commit before setting the result, which naturally requires an extra round of stale commit and render."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " derived list, full name and subtotal are calculated directly; after clicking Buy, a request is sent to the handler; Effect is used only for browser subscription, title or network synchronization. The basis for judgment is the data source and external system, not whether the code \"changes with the state\"."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Establishing state for derived data violates single source of truth; Effect immediately sets state and violates \"Effect is used for external synchronization rather than ordinary data conversion\"; in order to avoid additional render, changing it to ref will cause the UI to lose the React update source."
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
          "value": " Effect body only reads props/state, calculates the value, and then calls this component setter, and there is no external system such as browser/network/widget/subscription, try first to delete the state and Effect and calculate them in render."
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
          "value": " filtered products, checkout total, stock label, and form completion percentage are usually derived data; product search remote result and draft persistence are external synchronization."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section recycles the form values of Chapter 5, filter/map and Chapter 6, prevents excessive use after Chapter 7 learns Effect, and maintains minimal state for subsequent state architecture."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Effect is not a tool for \"calculating B after state A changes\"; B that can be calculated from the current snapshot is calculated in render, and only the smallest state that cannot be deduced is saved."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-typescript-boundaries-for-refs-and-effects",
      "children": [
        {
          "type": "text",
          "value": "9.12 TypeScript Boundaries for Refs and Effects"
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
          "value": " DOM node is null before commit, and browser timer handle has different meanings from business number; this section solves how to let the type system accurately express ref lifecycle, element-specific API and cleanup handle without mistaking compile-time annotation for runtime guarantee."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "generic type argument"
        },
        {
          "type": "text",
          "value": " specifies ref target; "
        },
        {
          "type": "inlineCode",
          "value": "DOM interface"
        },
        {
          "type": "text",
          "value": " Description element-specific methods; "
        },
        {
          "type": "inlineCode",
          "value": "nullable ref"
        },
        {
          "type": "text",
          "value": " expresses node lifecycle; "
        },
        {
          "type": "inlineCode",
          "value": "ReturnType<typeof window.setTimeout>"
        },
        {
          "type": "text",
          "value": " deduces handle from the actual browser function; "
        },
        {
          "type": "inlineCode",
          "value": "type erasure"
        },
        {
          "type": "text",
          "value": " indicates that these annotations do not enter the browser JavaScript."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime only sees ordinary ref objects and timer IDs; React maintains DOM ref assignment and calls cleanup; browser implements input node, focus and timer; TypeScript checks for null narrowing, event currentTarget and handle; "
        },
        {
          "type": "inlineCode",
          "value": "tsc"
        },
        {
          "type": "text",
          "value": "/IDE reports an error at compile time, and JavaScript built by Vite will not perform type verification."
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
          "value": " initial "
        },
        {
          "type": "inlineCode",
          "value": "inputRef.current"
        },
        {
          "type": "text",
          "value": " is null; after commit, React writes "
        },
        {
          "type": "inlineCode",
          "value": "HTMLInputElement"
        },
        {
          "type": "text",
          "value": ". The timeout ref changes from null to handle. Subsequent input will first clear the old handle and then write the new handle; cleanup reads the latest handle in the same stable ref object. TypeScript allows clear calls after null check through control-flow narrowing."
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
          "value": " DOM ref writing "
        },
        {
          "type": "inlineCode",
          "value": "useRef<HTMLInputElement>(null)"
        },
        {
          "type": "text",
          "value": "; timer ref written as "
        },
        {
          "type": "inlineCode",
          "value": "useRef<ReturnType<typeof window.setTimeout> | null>(null)"
        },
        {
          "type": "text",
          "value": "; type-only import uses "
        },
        {
          "type": "inlineCode",
          "value": "import type"
        },
        {
          "type": "text",
          "value": ". The type only describes the boundary, the runtime still must optional chaining/null check and cleanup."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " ref fixed property is "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": "; input event uses "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": "; timeout methods are "
        },
        {
          "type": "inlineCode",
          "value": "window.setTimeout(callback, delay)"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "window.clearTimeout(handle)"
        },
        {
          "type": "text",
          "value": "; Effect cleanup returns "
        },
        {
          "type": "inlineCode",
          "value": "void"
        },
        {
          "type": "text",
          "value": "."
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
        },
        {
          "type": "text",
          "value": " real practice demonstrates typed DOM ref, typed timer ref, event type and unmount cleanup at the same time."
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
          "value": " TypeScript can limit "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " points to the DOM interface, timer handle and event element, but does not create DOM, run cleanup or prevent null at runtime."
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
          "value": " DOM ref uses specific element generic and "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " initial value; timer ref clear handle or null; effect callback returns "
        },
        {
          "type": "inlineCode",
          "value": "void"
        },
        {
          "type": "text",
          "value": " or cleanup function, cleanup itself should return "
        },
        {
          "type": "inlineCode",
          "value": "void"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/12-typed-refs-effects/typed-refs-effects.tsx",
      "value": "import { useEffect, useRef, useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\nexport function TypedRefsEffects() {\n  const inputRef = useRef<HTMLInputElement>(null)\n  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)\n  const [draftName, setDraftName] = useState('Desk Lamp')\n  const [savedName, setSavedName] = useState('Desk Lamp')\n\n  useEffect(() => {\n    return () => {\n      if (timeoutRef.current !== null) {\n        window.clearTimeout(timeoutRef.current)\n      }\n    }\n  }, [])\n\n  function handleDraftChange(event: ChangeEvent<HTMLInputElement>): void {\n    const nextName = event.currentTarget.value\n    setDraftName(nextName)\n    if (timeoutRef.current !== null) {\n      window.clearTimeout(timeoutRef.current)\n    }\n    timeoutRef.current = window.setTimeout(() => {\n      setSavedName(nextName)\n    }, 500)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">TypeScript boundary</p>\n      <h3>Type DOM and timer refs explicitly</h3>\n      <label>\n        Draft product name\n        <input ref={inputRef} onChange={handleDraftChange} value={draftName} />\n      </label>\n      <button onClick={() => inputRef.current?.focus()}>Focus typed input</button>\n      <p>Last delayed save: {savedName || 'Empty draft'}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "HTMLInputElement"
        },
        {
          "type": "text",
          "value": " exposed "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": "; timer type is derived from browser function; cleanup after null-check; typed change event guarantees "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.value"
        },
        {
          "type": "text",
          "value": " is string."
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
          "value": " clears the old timeout and starts a new timeout for each input event; continued input within 500ms will replace the ref handle; the final callback updates the saved state; unmount cleanup clears the last handle."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " DOM ref and timer ref are two stable objects; their "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " refers to node and numeric handle respectively; state snapshots drive visible text."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " ref saves external handles that do not participate in render, and state saves the values that need to be displayed. Each has clear responsibilities."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is written as "
        },
        {
          "type": "inlineCode",
          "value": "useRef<HTMLElement>(null)"
        },
        {
          "type": "text",
          "value": " will lose input-specific type precision; omitting the null boundary will cover up the fact that the node does not exist before commit. Correct typing does not replace runtime cleanup."
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
          "value": " generic and DOM lib types let the compiler know "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " and null boundary; the runtime still uses React to write the node, the browser returns the timer handle, and JavaScript performs cleanup. There is no automatic null check after type erasure."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "HTMLInputElement"
        },
        {
          "type": "text",
          "value": " reserved input-specific API; broad "
        },
        {
          "type": "inlineCode",
          "value": "HTMLElement"
        },
        {
          "type": "text",
          "value": " can only guarantee the basic element API; the wrong non-null assertion allows compilation to pass but does not change the initial null; "
        },
        {
          "type": "inlineCode",
          "value": "ReturnType"
        },
        {
          "type": "text",
          "value": " is more reliable than handwriting the handle type that does not match the environment."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " excessively wide DOM type violates type precision; removing null violates real lifecycle; treating TypeScript annotation as runtime validation violates type erasure boundary; cleanup omission is a runtime resource bug rather than a type bug."
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
          "value": " IDE checks the element interface when it prompts that the method does not exist; checks the commit timing when it prompts possible null; and checks whether it relies on non-null assertion or mistakenly believes that type will generate a guard when the build passes but the runtime still crashes."
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
          "value": " search input, modal dialog, form field, timer handle and request status should all have specific types to make the component boundaries readable, but the external API response still requires a subsequent runtime validation solution."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section continues Chapter 2 TSX check, Chapter 3 typed props, Chapter 6 typed events, applies the type to the DOM and Effect resources of Chapter 7 without changing the JavaScript runtime model."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " TypeScript describes \"what may be\" ref and Effect resources, React/browser determines \"when they exist and how they change\"; static types cannot replace runtime guard and cleanup."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-effects-and-refs-to-sellerhub",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping Effects and Refs to SellerHub"
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
          "value": " After learning the API, you may still not know whether to choose render, handler, ref or Effect in the real page. This section maps the mechanism of the previous section 12 to the SellerHub scenario, and requires identifying the \"trigger cause, external system, owner, cleanup\" before selecting a tool."
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
          "value": " Scenario mapping prevents using Hook names as architectural solutions. The same is focus, the focus after button click belongs to the handler, the focus after modal committed appearance belongs to Effect; the same is search, local filtering belongs to render, and remote request synchronization only enters the async Effect or subsequent data layer."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "mechanism mapping"
        },
        {
          "type": "text",
          "value": " is to infer the technical layer from business facts; "
        },
        {
          "type": "inlineCode",
          "value": "resource owner"
        },
        {
          "type": "text",
          "value": " is responsible for setup/cleanup; "
        },
        {
          "type": "inlineCode",
          "value": "external-system boundary"
        },
        {
          "type": "text",
          "value": " marks a browser, network or subscription outside the React tree; "
        },
        {
          "type": "inlineCode",
          "value": "migration path"
        },
        {
          "type": "text",
          "value": " means that the current ownership judgment will be retained when the router/data library is introduced in the future."
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
              "value": "boundary: JavaScript runtime/React framework/browser platform/TypeScript type system/tooling:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript closure and async scheduling explain handler/timer/request behavior; React manages render, state, refs and Effect lifecycle; browser provides focus, title, navigation event, timer; TypeScript describes SellerHub domain values and DOM/event type; tooling verifies Hook calls and dependencies, but cannot replace the scene owner design."
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
          "value": " asks each scenario in turn: whether UI facts can be calculated from the current state; whether they are directly triggered by a certain interaction; whether there is an external system that needs to be continuously synchronized while the component is visible; which component creates the resource; how to stop when dependency changes and unmounts. The answer determines the logical position, rather than writing "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": " Additional reasons."
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
          "value": " There are no new APIs in this section, the focus is on responsibility boundaries and runtime mechanisms. Reuse the previous render calculation, event handler, "
        },
        {
          "type": "inlineCode",
          "value": "useRef"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": ", cleanup, dependency array and abort/ignore modes."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " No new fixed names are added in this section. Continue to comply with "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useEffect(setup, dependencies?)"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "document.title"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": ", timer clear methods and "
        },
        {
          "type": "inlineCode",
          "value": "AbortController.abort()"
        },
        {
          "type": "text",
          "value": " etc. already have a contract."
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
        },
        {
          "type": "text",
          "value": " No new code blocks are added in this section to avoid expanding the final project; the following table itself is a mechanism selection exercise, and the previous real files and final project provide executable implementations."
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "SellerHub Scene"
          }
        ],
        [
          {
            "type": "text",
            "value": "Preferred mechanism"
          }
        ],
        [
          {
            "type": "text",
            "value": "reason"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "ProductSearchInput"
            },
            {
              "type": "text",
              "value": " The Focus button"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM ref + event handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "is explicitly triggered by click."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "FilterPanel"
            },
            {
              "type": "text",
              "value": " is opened focus"
            }
          ],
          [
            {
              "type": "text",
              "value": "open state + effect + DOM ref"
            }
          ],
          [
            {
              "type": "text",
              "value": "focus is triggered by panel committed appearance."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Checkout draft autosave"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled state + timer/async effect cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "draft changes require synchronization of external persistence."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "unsaved changes warning"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect subscription + cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Subscribe browser navigation boundary."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "order status refresh placeholder"
            }
          ],
          [
            {
              "type": "text",
              "value": "timer effect + cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "visible dashboard has polling process."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "dashboard document title"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect + dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "tab title continues to match current page facts."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "local success feedback timer"
            }
          ],
          [
            {
              "type": "text",
              "value": "event handler starts command, cleanup management timer"
            }
          ],
          [
            {
              "type": "text",
              "value": "User action generates feedback, and the owner is responsible for stopping the timer."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "async product search"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect cleanup + abort/ignore"
            }
          ],
          [
            {
              "type": "text",
              "value": "obsolete criteria should not override current UI."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "modal focus management"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM ref; effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "node only exists after modal commit."
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter only establishes the mechanism and does not implement the real API, modal system, router or data-fetching library. When entering the real SellerHub, first retain the ownership and cleanup models here, and then replace the simulated external system with the actual boundary."
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
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " There is no new source code in this section; the table maps scenarios to mechanics row by row. The first column gives the business facts, the second column selects the render/handler/ref/Effect combination, and the third column explains the selection basis. The point is not to copy the name but to reproduce the judgment process."
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
          "value": " Take FilterPanel as an example: click handler first queues the open state, React renders and commits the panel and input node, Effect observes the open dependency and then calls focus; when the panel is closed or unmounted, cleanup ends and the corresponding external process is completed. Taking the local product filter as an example, it is calculated directly in render without entering Effect."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " query, open, draft and order status belong to their respective render snapshots; "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " changes from null to node with commit; timer/request refs retain handle across renders; each time Effect closure captures this criterion, cleanup ends the resources owned by the closure."
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
          "value": " All scenarios can be reduced to the same set of mechanism issues: whether it can be purely calculated, whether it is triggered by a clear event, whether there is an external system, who owns the resource, and when to resynchronize or cleanup. A business name change does not change the underlying rules."
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
              "value": "comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " local product filtering and remote product search seem to be both search, the former is render calculation, and the latter involves async external system; the Focus button and modal autofocus seem to be focus, the former is event command, and the latter is triggered by committed appearance."
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " uses Effect when it sees \"will change\" and violates the boundary of responsibility; concentrating all external logic into page-level Large Effect violates \"an Effect describes an independent synchronization process\"; introducing data/form library in advance will cover up the lifecycle mechanism that must be mastered in this chapter."
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
          "value": " Fill in four items before writing code for the new SellerHub requirement: trigger, current React inputs, external resource, cleanup. Effect is usually not needed when external resources cannot be written; when cleanup cannot be written, the owner is usually not clear yet."
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
          "value": " This section is the SellerHub migration table, covering ProductSearchInput, FilterPanel, checkout draft, unsaved warning, order refresh, dashboard title, feedback timer, async search and modal focus."
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
              "value": "and the current learning path:"
            }
          ]
        },
        {
          "type": "text",
          "value": " It puts Chapter 3 props owner, Chapter 4 Chapter state/events, Chapter 5 render branches, chapter 6 forms are combined with this chapter refs/effects to lay the boundaries for subsequent routers, data fetching, custom hooks and the real SellerHub page."
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " first determines whether the fact belongs to render, event or external synchronization, and then selects state/ref/Effect; API is the result, and owner, cause, dependency and cleanup are the starting point of the design."
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
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "API / Syntax"
          }
        ],
        [
          {
            "type": "text",
            "value": "Function"
          }
        ],
        [
          {
            "type": "text",
            "value": "Key boundary"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "useRef(initialValue)"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns a cross-render stable ref object"
            }
          ],
          [
            {
              "type": "text",
              "value": "mutation does not trigger render."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "ref.current"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save mutable value or commit after DOM node"
            }
          ],
          [
            {
              "type": "text",
              "value": "render front DOM ref may be null."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<input ref={inputRef}>"
            }
          ],
          [
            {
              "type": "text",
              "value": "Let React manage node assignment"
            }
          ],
          [
            {
              "type": "text",
              "value": "writing occurs on commit."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useEffect(setup, dependencies?)"
            }
          ],
          [
            {
              "type": "text",
              "value": "declares external synchronization"
            }
          ],
          [
            {
              "type": "text",
              "value": "Return to "
            },
            {
              "type": "inlineCode",
              "value": "undefined"
            },
            {
              "type": "text",
              "value": "."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "return cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Stop or cancel the current setup"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependency change before running, unmount."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "has no second parameter"
            }
          ],
          [
            {
              "type": "text",
              "value": "resynchronizes"
            }
          ],
          [
            {
              "type": "text",
              "value": "is rarely the clearest choice."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "[]"
            }
          ],
          [
            {
              "type": "text",
              "value": "setup will change if not read reactive value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Development Strict Mode will still stress-test."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "[a, b]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "a"
            },
            {
              "type": "text",
              "value": " or "
            },
            {
              "type": "inlineCode",
              "value": "b"
            },
            {
              "type": "text",
              "value": " to "
            },
            {
              "type": "inlineCode",
              "value": "Object.is"
            },
            {
              "type": "text",
              "value": " Resynchronize"
            }
          ],
          [
            {
              "type": "text",
              "value": "must cover all reactive reads."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "functional updater"
            }
          ],
          [
            {
              "type": "text",
              "value": "calculates next state"
            }
          ],
          [
            {
              "type": "text",
              "value": "avoids reading stale snapshot."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "AbortController"
            }
          ],
          [
            {
              "type": "text",
              "value": "Issue abort signal"
            }
          ],
          [
            {
              "type": "text",
              "value": "still needs to prevent subsequent asynchronous chain expiration results."
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
            "value": "root cause"
          }
        ],
        [
          {
            "type": "text",
            "value": "Identification method"
          }
        ],
        [
          {
            "type": "text",
            "value": "Correction"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "render in DOM/title/timer"
            }
          ],
          [
            {
              "type": "text",
              "value": "Treat the calculation phase as the command phase"
            }
          ],
          [
            {
              "type": "text",
              "value": "re-render times change external result"
            }
          ],
          [
            {
              "type": "text",
              "value": "moves to handler or effect."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "effect + state"
            },
            {
              "type": "text",
              "value": " Save derived data"
            }
          ],
          [
            {
              "type": "text",
              "value": "Duplicate source of truth"
            }
          ],
          [
            {
              "type": "text",
              "value": "first displays stale UI and then render"
            }
          ],
          [
            {
              "type": "text",
              "value": "render is calculated directly."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "click business logic put effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "lost specific trigger reason"
            }
          ],
          [
            {
              "type": "text",
              "value": "initial mount may also execute"
            }
          ],
          [
            {
              "type": "text",
              "value": "is put back into the handler."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "forgot timer/subscription cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "external process does not stop with unmount"
            }
          ],
          [
            {
              "type": "text",
              "value": "Duplicate callback or update"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns symmetric cleanup."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "effect reads the changed value but writes "
            },
            {
              "type": "inlineCode",
              "value": "[]"
            }
          ],
          [
            {
              "type": "text",
              "value": "closure fixed initial snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "hooks lint warning, old value behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "declares dependency or refactoring."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "is lint warning delete dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "Hide synchronous input in React"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect no longer matches UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "Modify the effect code instead of suppress."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "looks forward to UI update after modifying ref"
            }
          ],
          [
            {
              "type": "text",
              "value": "ref mutation does not queue render"
            }
          ],
          [
            {
              "type": "text",
              "value": "console value changes, page remains unchanged"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses state for visible values."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "render directly "
            },
            {
              "type": "inlineCode",
              "value": "ref.current.focus()"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM is not committed and render is impure"
            }
          ],
          [
            {
              "type": "text",
              "value": "null error or duplicate focus"
            }
          ],
          [
            {
              "type": "text",
              "value": "handler / effect + null check."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "interval reads old state"
            }
          ],
          [
            {
              "type": "text",
              "value": "closure capture setup snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "count stuck at the same value"
            }
          ],
          [
            {
              "type": "text",
              "value": "functional updater or correct dependency."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DOM ref type too wide/missing null"
            }
          ],
          [
            {
              "type": "text",
              "value": "type model does not match lifecycle"
            }
          ],
          [
            {
              "type": "text",
              "value": "API is not available or unsafe assertion"
            }
          ],
          [
            {
              "type": "text",
              "value": "Specific DOM type + null boundary."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "async old results overwrite new query"
            }
          ],
          [
            {
              "type": "text",
              "value": "completion race"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI criteria are inconsistent with result"
            }
          ],
          [
            {
              "type": "text",
              "value": "cleanup abort + ignore obsolete result."
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
      "type": "heading",
      "depth": 3,
      "id": "project-goal",
      "children": [
        {
          "type": "text",
          "value": "Project Goal"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Seller Search Sync Workspace"
        },
        {
          "type": "text",
          "value": " is a local mechanism exercise for SellerHub product search. It does not request the backend: local array filtering represents pure derived data; delayed synchronization represents an external process before the data layer is introduced; document title represents browser synchronization."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "why-it-fits-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "Why It Fits This Chapter"
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
                  "value": "requestSequenceRef"
                },
                {
                  "type": "text",
                  "value": " saves the request sequence that does not participate in render."
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
                  "value": "searchInputRef"
                },
                {
                  "type": "text",
                  "value": " gets the DOM input and explicitly click handler focus."
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
                  "value": "browser dataset effect and simulated async effect are each responsible for only one synchronization process."
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
                  "value": "Both effects have cleanup and accurate dependencies."
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
                  "value": "visible products are directly derived from render without using effects."
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
                  "value": "stale async closure lost update permission through controller, request ID and cleanup."
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
                  "value": "All refs, props, domain objects and status have type TypeScript."
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
      "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/\n  seller-search-types.ts\n  seller-search-data.ts\n  seller-search-input.tsx\n  seller-search-results.tsx\n  seller-search-sync-workspace.tsx\n  seller-search-sync-mini-project.css"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "file-responsibilities",
      "children": [
        {
          "type": "text",
          "value": "File Responsibilities"
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
            "value": "File"
          }
        ],
        [
          {
            "type": "text",
            "value": "Responsibilities"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-search-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain category, product and sync status types."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-search-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "local typed product fixtures and category options."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-search-input.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled query/category input and input ref wiring."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-search-results.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "render status, empty or product list based on props."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-search-sync-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "state owner, derived filter, refs, effects and handlers."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-search-sync-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "The final project has independent layout and visual state."
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "complete-code",
      "children": [
        {
          "type": "text",
          "value": "Complete Code"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-types.ts",
      "value": "export type SellerProductCategory = 'all' | 'accessories' | 'lighting' | 'workspace'\n\nexport type SellerProduct = {\n  id: string\n  name: string\n  category: Exclude<SellerProductCategory, 'all'>\n  price: number\n  stock: number\n}\n\nexport type SearchSyncStatus = 'pending' | 'success'"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " category union serves both select and product category; "
        },
        {
          "type": "inlineCode",
          "value": "Exclude"
        },
        {
          "type": "text",
          "value": " prohibits real product from using filter-only "
        },
        {
          "type": "inlineCode",
          "value": "all"
        },
        {
          "type": "text",
          "value": "; status union is only allowed in the synchronization phase of this project."
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
              "value": "execution and type boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " These statements only participate in compile time and do not exist after emit. The runtime product object is still a normal JavaScript object, and external data is not automatically validated by these types."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-data.ts",
      "value": "import type { SellerProduct, SellerProductCategory } from './seller-search-types'\n\nexport const sellerProductCategories: SellerProductCategory[] = [\n  'all',\n  'accessories',\n  'lighting',\n  'workspace',\n]\n\nexport const sellerProducts: SellerProduct[] = [\n  {\n    id: 'product-keyboard',\n    name: 'Mechanical Keyboard',\n    category: 'accessories',\n    price: 89,\n    stock: 24,\n  },\n  {\n    id: 'product-hub',\n    name: 'USB-C Hub',\n    category: 'accessories',\n    price: 54,\n    stock: 11,\n  },\n  {\n    id: 'product-lamp',\n    name: 'Adjustable Desk Lamp',\n    category: 'lighting',\n    price: 42,\n    stock: 8,\n  },\n  {\n    id: 'product-stand',\n    name: 'Aluminum Monitor Stand',\n    category: 'workspace',\n    price: 68,\n    stock: 16,\n  },\n]"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " type-only import does not generate runtime dependency; the two exported arrays are module-level stable values; domain IDs provide stable identity for list keys."
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
              "value": "execution flow and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " module creates arrays when loaded for the first time, and reuses them in subsequent renders; filter will create a new result array, but will not mutation fixtures."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " stable module data is not a reactive value, and effects do not need to list it as dependency; the real API data should still enter the clear state/data layer in the future."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-input.tsx",
      "value": "import type { ChangeEvent, RefObject } from 'react'\nimport type { SellerProductCategory } from './seller-search-types'\nimport { sellerProductCategories } from './seller-search-data'\n\ntype SellerSearchInputProps = {\n  category: SellerProductCategory\n  inputRef: RefObject<HTMLInputElement | null>\n  onCategoryChange: (category: SellerProductCategory) => void\n  onQueryChange: (query: string) => void\n  query: string\n}\n\nexport function SellerSearchInput({\n  category,\n  inputRef,\n  onCategoryChange,\n  onQueryChange,\n  query,\n}: SellerSearchInputProps) {\n  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {\n    onQueryChange(event.currentTarget.value)\n  }\n\n  return (\n    <div className=\"seller-search-controls\">\n      <label>\n        Product query\n        <input\n          onChange={handleQueryChange}\n          placeholder=\"Search product names\"\n          ref={inputRef}\n          value={query}\n        />\n      </label>\n\n      <label>\n        Category\n        <select\n          onChange={(event) =>\n            onCategoryChange(event.currentTarget.value as SellerProductCategory)\n          }\n          value={category}\n        >\n          {sellerProductCategories.map((categoryOption) => (\n            <option key={categoryOption} value={categoryOption}>\n              {categoryOption}\n            </option>\n          ))}\n        </select>\n      </label>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " props leaves state ownership in parent; "
        },
        {
          "type": "inlineCode",
          "value": "RefObject<HTMLInputElement | null>"
        },
        {
          "type": "text",
          "value": " Clear the boundaries before and after commit; typed handler reads string from input; select cast narrows DOM string to known options."
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
          "value": " parent render passes values, callbacks and ref object; when committing, React puts the input node into the ref; change event calls the child adapter, and then calls the parent handler."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " child does not modify the props object; the ref object is a stable reference that the parent and React jointly connect to the DOM identity."
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
              "value": "Bugs and fixes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Don't call focus in child render; don't treat uncontrolled DOM value as parent state. The current controlled values ​​are always provided by the parent snapshot."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-results.tsx",
      "value": "import type { SearchSyncStatus, SellerProduct } from './seller-search-types'\n\ntype SellerSearchResultsProps = {\n  products: SellerProduct[]\n  status: SearchSyncStatus\n  syncedCriteria: string\n}\n\nexport function SellerSearchResults({\n  products,\n  status,\n  syncedCriteria,\n}: SellerSearchResultsProps) {\n  return (\n    <section aria-labelledby=\"seller-search-results-title\" className=\"seller-search-results\">\n      <div className=\"seller-search-results-heading\">\n        <div>\n          <p className=\"project-eyebrow\">Derived during render</p>\n          <h3 id=\"seller-search-results-title\">Visible inventory</h3>\n        </div>\n        <span className={`sync-badge sync-badge-${status}`}>\n          {status === 'pending' ? 'Syncing' : 'Synchronized'}\n        </span>\n      </div>\n\n      <p className=\"sync-summary\">\n        Last external sync: {syncedCriteria || 'Waiting for the first result'}\n      </p>\n\n      {products.length === 0 ? (\n        <p className=\"seller-search-empty\">No products match the current render inputs.</p>\n      ) : (\n        <ul className=\"seller-product-list\">\n          {products.map((product) => (\n            <li key={product.id}>\n              <div>\n                <strong>{product.name}</strong>\n                <span>{product.category}</span>\n              </div>\n              <div className=\"seller-product-metrics\">\n                <span>${product.price}</span>\n                <span>{product.stock} in stock</span>\n              </div>\n            </li>\n          ))}\n        </ul>\n      )}\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " component read-only typed props; status union selects label/class; empty branch and success list are clearly separated; domain ID is the key."
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
          "value": " parent Each render first derives products and then calls the results component; this component purely calculates JSX and does not initiate requests or copy state."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "products"
        },
        {
          "type": "text",
          "value": " array may be a new reference every time it is rendered, but it only participates in render; no effect is rerun due to array identity."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " presentation component does not have synchronization, so it is easy to predict and reuse."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-workspace.tsx",
      "value": "import { useEffect, useRef, useState } from 'react'\nimport { sellerProducts } from './seller-search-data'\nimport { SellerSearchInput } from './seller-search-input'\nimport { SellerSearchResults } from './seller-search-results'\nimport type { SearchSyncStatus, SellerProductCategory } from './seller-search-types'\nimport './seller-search-sync-mini-project.css'\n\nexport function SellerSearchSyncWorkspace() {\n  const [query, setQuery] = useState('')\n  const [category, setCategory] = useState<SellerProductCategory>('all')\n  const [searchStatus, setSearchStatus] = useState<SearchSyncStatus>('pending')\n  const [syncedCriteria, setSyncedCriteria] = useState('')\n  const searchInputRef = useRef<HTMLInputElement>(null)\n  const requestSequenceRef = useRef(0)\n\n  const normalizedQuery = query.trim().toLowerCase()\n  const visibleProducts = sellerProducts.filter((product) => {\n    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery)\n    const matchesCategory = category === 'all' || product.category === category\n    return matchesQuery && matchesCategory\n  })\n\n  useEffect(() => {\n    document.body.dataset.sellerSearchResultCount = String(visibleProducts.length)\n\n    return () => {\n      delete document.body.dataset.sellerSearchResultCount\n    }\n  }, [visibleProducts.length])\n\n  useEffect(() => {\n    const requestId = requestSequenceRef.current + 1\n    requestSequenceRef.current = requestId\n    const controller = new AbortController()\n    const timeoutId = window.setTimeout(() => {\n      if (!controller.signal.aborted && requestId === requestSequenceRef.current) {\n        const criteria = `${query || 'all names'} / ${category}`\n        setSyncedCriteria(criteria)\n        setSearchStatus('success')\n      }\n    }, 550)\n\n    return () => {\n      controller.abort()\n      window.clearTimeout(timeoutId)\n    }\n  }, [category, query])\n\n  function handleQueryChange(nextQuery: string): void {\n    setQuery(nextQuery)\n    setSearchStatus('pending')\n  }\n\n  function handleCategoryChange(nextCategory: SellerProductCategory): void {\n    setCategory(nextCategory)\n    setSearchStatus('pending')\n  }\n\n  return (\n    <section className=\"seller-search-project\" aria-labelledby=\"seller-search-project-title\">\n      <header className=\"seller-search-project-header\">\n        <div>\n          <p className=\"project-eyebrow\">SellerHub learning connection</p>\n          <h2 id=\"seller-search-project-title\">Seller Search Sync Workspace</h2>\n          <p>\n            Keep local derived results separate from browser and asynchronous synchronization.\n          </p>\n        </div>\n        <button onClick={() => searchInputRef.current?.focus()}>Focus product search</button>\n      </header>\n\n      <SellerSearchInput\n        category={category}\n        inputRef={searchInputRef}\n        onCategoryChange={handleCategoryChange}\n        onQueryChange={handleQueryChange}\n        query={query}\n      />\n\n      <SellerSearchResults\n        products={visibleProducts}\n        status={searchStatus}\n        syncedCriteria={syncedCriteria}\n      />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Four states express input and external sync feedback respectively; two refs respectively save DOM identity and non-render request sequence; filter is calculated in render; two effects separately synchronize browser dataset and simulated request; handlers retain user operation semantics."
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
          "value": " is input by handler queue query/pending; React render immediately gets the local filtered list and commits; old async cleanup abort/clear; next setup startup delay; current completion update synced criteria/status; the second render shows success."
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
              "value": "Variable and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " query/category is a snapshot; visibleProducts is a new array for each render; dataset effect only depends on primitive length; request ref object identity is stable, "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " increments but does not render; each controller and timeout ID only belong to one setup."
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
              "value": "get the result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " local filtering is UI calculation, so it is updated immediately; simulated external sync is after-commit process, so pending/success is displayed independently. The old process is aborted and cleared at the same time, and loses write permission through sequence guard."
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
              "value": "stale closure comparison:"
            }
          ]
        },
        {
          "type": "text",
          "value": " If the timeout callback does not have cleanup and request guard, the old query closure may be completed after the new query and overwrite "
        },
        {
          "type": "inlineCode",
          "value": "syncedCriteria"
        },
        {
          "type": "text",
          "value": ". There is no attempt here to \"automatically bring new\" the old closure, but to explicitly declare the old process obsolete."
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
              "value": "common mistakes and corrections:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Don't put "
        },
        {
          "type": "inlineCode",
          "value": "visibleProducts"
        },
        {
          "type": "text",
          "value": " save state and update with effect; do not put the entire new array into title dependencies; do not increment request ref in render; do not omit query/category dependency."
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-mini-project.css",
      "value": ".seller-search-project {\n  margin-top: 56px;\n  padding: 30px;\n  color: #172033;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  background: #ffffff;\n}\n\n.seller-search-project-header,\n.seller-search-results-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n}\n\n.seller-search-project-header h2,\n.seller-search-results-heading h3 {\n  margin: 6px 0 0;\n}\n\n.seller-search-project-header > div > p:last-child {\n  max-width: 680px;\n  color: #526077;\n  line-height: 1.6;\n}\n\n.seller-search-project button {\n  padding: 10px 14px;\n  color: #ffffff;\n  border: 1px solid #0f766e;\n  border-radius: 7px;\n  background: #0f766e;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n.seller-search-controls {\n  display: grid;\n  grid-template-columns: minmax(0, 2fr) minmax(180px, 1fr);\n  gap: 16px;\n  margin-top: 28px;\n}\n\n.seller-search-controls label {\n  display: grid;\n  gap: 7px;\n  color: #344054;\n  font-size: 0.9rem;\n  font-weight: 800;\n}\n\n.seller-search-controls input,\n.seller-search-controls select {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 11px 12px;\n  color: #172033;\n  border: 1px solid #94a3b8;\n  border-radius: 7px;\n  background: #ffffff;\n}\n\n.seller-search-results {\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid #d8dee9;\n}\n\n.sync-badge {\n  padding: 6px 10px;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n\n.sync-badge-pending {\n  color: #92400e;\n  background: #fef3c7;\n}\n\n.sync-badge-success {\n  color: #166534;\n  background: #dcfce7;\n}\n\n.sync-summary,\n.seller-search-empty {\n  color: #667085;\n}\n\n.seller-product-list {\n  display: grid;\n  gap: 10px;\n  margin: 20px 0 0;\n  padding: 0;\n  list-style: none;\n}\n\n.seller-product-list li {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 14px 16px;\n  border: 1px solid #d8dee9;\n  border-radius: 7px;\n  background: #f8fafc;\n}\n\n.seller-product-list li > div {\n  display: grid;\n  gap: 4px;\n}\n\n.seller-product-list span {\n  color: #667085;\n  font-size: 0.88rem;\n}\n\n.seller-product-metrics {\n  justify-items: end;\n}\n\n@media (max-width: 680px) {\n  .seller-search-project {\n    padding: 22px;\n  }\n\n  .seller-search-project-header,\n  .seller-search-results-heading,\n  .seller-product-list li {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .seller-search-controls {\n    grid-template-columns: 1fr;\n  }\n\n  .seller-product-metrics {\n    justify-items: start;\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " project, controls, results and list use independent classes; pending/success visual state comes from typed status; media query is changed to single column in narrow screen."
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
              "value": "execution and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " CSS is bundled by Vite and handed to the browser style engine; it does not participate in React state, effect dependencies, or TypeScript runtime."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "how-to-run-it",
      "children": [
        {
          "type": "text",
          "value": "How to Run It"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run dev"
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
                  "value": "Click "
                },
                {
                  "type": "inlineCode",
                  "value": "Focus product search"
                },
                {
                  "type": "text",
                  "value": ", confirm input to get focus."
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
                  "value": "Quickly enter multiple queries, confirm that the local list changes immediately, and the sync badge first changes to pending and then to success."
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
                  "value": "Switch category and confirm that old delayed process does not cover latest criteria."
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
                  "value": "observes "
                },
                {
                  "type": "inlineCode",
                  "value": "document.body.dataset.sellerSearchResultCount"
                },
                {
                  "type": "text",
                  "value": "."
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
      "id": "expected-output-and-interaction",
      "children": [
        {
          "type": "text",
          "value": "Expected Output and Interaction"
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
                  "type": "text",
                  "value": "focus button focuses the input through the DOM ref without changing the query state."
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
                  "value": "list render-time filter from current query/category."
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
                  "value": "delayed status only accepts latest criteria completion."
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
                  "value": "body dataset always saves the currently visible quantity; cleanup deletes this field when leaving the project owner."
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
      "id": "core-execution-flow",
      "children": [
        {
          "type": "text",
          "value": "Core Execution Flow"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "final mini project execution process",
      "value": "user input event\n  -> handler queues query/category and pending state\n  -> render derives visible products\n  -> commit updates controlled fields and list\n  -> previous async cleanup aborts and clears timer\n  -> next async setup starts for current criteria\n  -> current completion queues success feedback"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "common-mistakes",
      "children": [
        {
          "type": "text",
          "value": "Common Mistakes"
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
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "visibleProducts"
                },
                {
                  "type": "text",
                  "value": " put state: Repeat source of truth."
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
                  "value": "useEffect(..., [])"
                },
                {
                  "type": "text",
                  "value": " reads query/category: fixed initial snapshot."
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
                  "value": "only clear timer does not process real fetch subsequent chain: expired callback may still write UI."
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
                  "value": "Use ref to save the status that needs to be displayed: mutation does not render."
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
                  "value": "in render call "
                },
                {
                  "type": "inlineCode",
                  "value": "focus()"
                },
                {
                  "type": "text",
                  "value": " or modify the browser dataset: destroy purity."
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
      "id": "optional-extensions",
      "children": [
        {
          "type": "text",
          "value": "Optional Extensions"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is only expanded in subsequent chapters: real API, TanStack Query, route search params, modal focus trap, autosave persistence. Preserve current ownership, cleanup and derived-data boundaries when expanding."
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
      "type": "heading",
      "depth": 3,
      "id": "one-sentence-concept-summary",
      "children": [
        {
          "type": "text",
          "value": "One-Sentence Concept Summary"
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
              "value": "render only calculates; event handler responds to specific intent; effect synchronizes committed UI and external system; ref saves mutable identity/value that React does not need to track render."
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "decision-table",
      "children": [
        {
          "type": "text",
          "value": "Decision table"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "Question"
          }
        ],
        [
          {
            "type": "text",
            "value": "is"
          }
        ],
        [
          {
            "type": "text",
            "value": "No"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "be calculated from current props/state?"
            }
          ],
          [
            {
              "type": "text",
              "value": "render calculate"
            }
          ],
          [
            {
              "type": "text",
              "value": "Continue to judge"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "triggered by an explicit user event?"
            }
          ],
          [
            {
              "type": "text",
              "value": "event handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "Continue to judge"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "be synchronized with component visibility/current state from external systems?"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "Normal function/module logic"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "value changes need to be displayed immediately?"
            }
          ],
          [
            {
              "type": "text",
              "value": "state"
            }
          ],
          [
            {
              "type": "text",
              "value": "can be considered ref"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "setup starts a persistent process?"
            }
          ],
          [
            {
              "type": "text",
              "value": "usually requires cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check whether the external write still needs to be undone"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "dependencies-quick-check",
      "children": [
        {
          "type": "text",
          "value": "dependencies quick check"
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
            "value": "written as"
          }
        ],
        [
          {
            "type": "text",
            "value": "Semantics"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "useEffect(setup)"
            }
          ],
          [
            {
              "type": "text",
              "value": "resynchronizes after each committed render."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useEffect(setup, [])"
            }
          ],
          [
            {
              "type": "text",
              "value": "setup does not rely on changing reactive values."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useEffect(setup, [query])"
            }
          ],
          [
            {
              "type": "text",
              "value": "query changes when stop old / start new."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Delete dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not an optimization, usually a stale closure bug."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "object/function Create a new"
            }
          ],
          [
            {
              "type": "text",
              "value": "identity changes may cause excessive resynchronization and the creation location should be reconstructed."
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "minimum-template",
      "children": [
        {
          "type": "text",
          "value": "Minimum template"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: external synchronization",
      "value": "useEffect(() => {\n  const connection = connect(resourceId)\n\n  return () => {\n    connection.disconnect()\n  }\n}, [resourceId])"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line by line and execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " setup use current "
        },
        {
          "type": "inlineCode",
          "value": "resourceId"
        },
        {
          "type": "text",
          "value": " Establish a connection; cleanup before dependency change disconnects the old connection; next setup connects the new resource; performs the final cleanup when unmounting."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: typed DOM ref",
      "value": "const inputRef = useRef<HTMLInputElement>(null)\n\nfunction handleFocus(): void {\n  inputRef.current?.focus()\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line by line and execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " generic selects the input DOM interface; initial null matches pre-commit; handler reads the current node at event time and calls browser focus."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The following names only mark concept fragments, error comparisons or templates and do not belong to the final document list:"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "Name"
          }
        ],
        [
          {
            "type": "text",
            "value": "role"
          }
        ],
        [
          {
            "type": "text",
            "value": "state"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "Snippet: side effect during render"
            }
          ],
          [
            {
              "type": "text",
              "value": "render error comparison"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Snippet: missing dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependency error comparison"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Snippet: stale interval closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "stale closure error comparison"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Snippet: redundant derived state"
            }
          ],
          [
            {
              "type": "text",
              "value": "redundant state error comparison"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Snippet: unsafe ref access"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM null boundary prompt"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Template: external synchronization"
            }
          ],
          [
            {
              "type": "text",
              "value": "setup / cleanup minimal template"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Template: typed DOM ref"
            }
          ],
          [
            {
              "type": "text",
              "value": "typed DOM ref minimal template"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create"
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
      "id": "study-guide-document-for-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "Study guide document for this chapter"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "File"
          }
        ],
        [
          {
            "type": "text",
            "value": "role"
          }
        ],
        [
          {
            "type": "text",
            "value": "state"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "docs/react/chapter-07-effects-and-refs/react-chapter-07-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 7 Chapter Mechanism Explanation, Exercises and Project Documents"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "general-practice-files-for-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "General practice files for this chapter"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "File"
          }
        ],
        [
          {
            "type": "text",
            "value": "role"
          }
        ],
        [
          {
            "type": "text",
            "value": "state"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/chapter-07-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Summary of all exercises and final project"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/chapter-07-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter's shared page and practice card style"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/01-pure-render-boundary/pure-render-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "pure render exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/02-event-handler-vs-effect/event-handler-vs-effect.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "event / effect boundary exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/03-ref-mutable-value/ref-mutable-value.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "mutable ref exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/04-dom-node-ref/dom-node-ref.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM ref and focus practice"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/05-effect-setup-cleanup/effect-setup-cleanup.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "subscription setup / cleanup exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/06-effect-dependencies/effect-dependencies.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "reactive dependencies exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/07-stale-closure/stale-closure-interval.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "stale closure correction exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/08-timer-cleanup/timer-cleanup.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "timer ownership exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/09-document-title-sync/document-title-sync.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "document title Synchronization exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/10-async-effect-cleanup/async-effect-cleanup.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "obsolete async result Protection exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/11-derived-data-without-effect/derived-data-without-effect.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Delete unnecessary effects Practice"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/12-typed-refs-effects/typed-refs-effects.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript DOM/timer ref Exercise"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "final-mini-project-file",
      "children": [
        {
          "type": "text",
          "value": "final mini project file"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "File"
          }
        ],
        [
          {
            "type": "text",
            "value": "role"
          }
        ],
        [
          {
            "type": "text",
            "value": "state"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain and status type"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "local typed fixtures"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-input.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled search controls and ref wiring"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-results.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "derived result rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "state/ref/effect owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Small project independent style"
            }
          ],
          [
            {
              "type": "text",
              "value": "has created"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "entrance-and-route-update-file",
      "children": [
        {
          "type": "text",
          "value": "entrance and route update file"
        }
      ]
    },
    {
      "type": "table",
      "align": [
        null,
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "File"
          }
        ],
        [
          {
            "type": "text",
            "value": "role"
          }
        ],
        [
          {
            "type": "text",
            "value": "state"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "README.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 7 Chapter state and location index"
            }
          ],
          [
            {
              "type": "text",
              "value": "has been updated"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/App.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current chapter mount adapter"
            }
          ],
          [
            {
              "type": "text",
              "value": "has been updated"
            }
          ]
        ]
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
                  "value": "Write an external system name for each effect; if you cannot write it out, delete the effect first and think again."
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
                  "value": "Write symmetric cleanup for each setup, indicating when the old process stops."
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
                  "value": "List the reactive values read by setup/cleanup above the dependency array, and then check them one by one."
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
                  "value": "draws initial render, commit, setup, dependency change, cleanup, next setup, and unmount."
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
                  "value": "Mark \"DOM identity\", \"timer ID\", \"request sequence\" or other non-render purpose for each ref."
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
                  "value": "Change an effect to render calculation, and then compare the number of renders with the number of sources of truth."
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
                  "value": "uses SellerHub scenario to write three columns: trigger reason, owner, and external system."
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
                  "value": "Why does React component render have to be pure?"
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
                  "value": "event handler and effect?"
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
                  "value": "useRef"
                },
                {
                  "type": "text",
                  "value": "? Why doesn't mutation render?"
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
                  "value": "DOM ref "
                },
                {
                  "type": "inlineCode",
                  "value": "current"
                },
                {
                  "type": "text",
                  "value": " change from null to node?"
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
                  "value": "effect dependency changes, what is the order of cleanup and next setup?"
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
                  "value": "dependency array a \"scheduling option\" or a reactive read statement?"
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
                  "value": "Why "
                },
                {
                  "type": "inlineCode",
                  "value": "[]"
                },
                {
                  "type": "text",
                  "value": " Possible to make stale closure?"
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
                  "value": "functional updater How to fix interval reading of old state?"
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
                  "value": "Strict Mode Why perform additional setup/cleanup?"
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
                  "value": "timer, event subscription and async request how to cleanup respectively?"
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
                  "value": "Why should derived filtered list not use effect + state?"
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
                  "value": "HTMLInputElement"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": " and timer handle types solve respectively?"
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
                  "value": "TypeScript Why can't the request result be verified at runtime?"
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
                  "value": "SellerHub Which mechanism do search focus, modal focus, autosave, polling, and title belong to?"
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Keep render pure first."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " render only turns current inputs into JSX."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "retains the trigger reason."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Make it clear that the logic of user action remains in the handler."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Effect is a synchronization process."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " It is not an ordinary calculation or lifecycle callback collection."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Setup is paired with cleanup."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " stop old before starting new; unmount must stop final."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Dependencies are determined by code."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Read the reactive value and declare it, or refactor the code so that it is no longer needed."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Closure belongs to a certain render."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " stale value is the result of lexical environment."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Ref does not drive the UI."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " It is suitable for DOM nodes and non-render mutable handles; visible facts use state."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Browser is an external system."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " focus, title, timer, events, and abort are not React APIs."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript only does static checking."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " runtime lifecycle is still executed by JavaScript, React and browser."
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Delete unnecessary effects first."
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " is only reserved when it actually steps out of React and synchronizes with external systems."
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
      "id": "18-official-documentation-reading-list",
      "children": [
        {
          "type": "text",
          "value": "18. Official Documentation Reading List"
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "react-official-document-main-basis",
      "children": [
        {
          "type": "text",
          "value": "React official document (main basis)"
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
                  "href": "https://react.dev/learn/referencing-values-with-refs",
                  "children": [
                    {
                      "type": "text",
                      "value": "Referencing Values with Refs"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": The difference between ref object, mutable current, ref and state."
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
                  "href": "https://react.dev/learn/manipulating-the-dom-with-refs",
                  "children": [
                    {
                      "type": "text",
                      "value": "Manipulating the DOM with Refs"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": DOM node, focus and safe DOM boundary after commit."
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
                  "href": "https://react.dev/learn/synchronizing-with-effects",
                  "children": [
                    {
                      "type": "text",
                      "value": "Synchronizing with Effects"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": effect / event, setup, dependencies, cleanup, Strict Mode."
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
                  "href": "https://react.dev/learn/lifecycle-of-reactive-effects",
                  "children": [
                    {
                      "type": "text",
                      "value": "Lifecycle of Reactive Effects"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": start/stop synchronization and reactive values."
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
                  "href": "https://react.dev/learn/separating-events-from-effects",
                  "children": [
                    {
                      "type": "text",
                      "value": "Separating Events from Effects"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": event-specific logic and reactive synchronization."
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
                  "href": "https://react.dev/learn/removing-effect-dependencies",
                  "children": [
                    {
                      "type": "text",
                      "value": "Removing Effect Dependencies"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Fix dependency issue instead of suppress linter."
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
                  "href": "https://react.dev/learn/you-might-not-need-an-effect",
                  "children": [
                    {
                      "type": "text",
                      "value": "You Might Not Need an Effect"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Derived data and user events do not require effects."
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
                  "href": "https://react.dev/reference/react/useRef",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "useRef"
                    },
                    {
                      "type": "text",
                      "value": " reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/useEffect",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "useEffect"
                    },
                    {
                      "type": "text",
                      "value": " reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Parameters, return values, caveats and client-only behavior."
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
      "id": "typescript-official-document",
      "children": [
        {
          "type": "text",
          "value": "TypeScript Official document"
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
                  "href": "https://www.typescriptlang.org/docs/handbook/dom-manipulation.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "DOM Manipulation"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "HTMLElement"
                },
                {
                  "type": "text",
                  "value": ", specific element interfaces and null boundary."
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
                  "href": "https://www.typescriptlang.org/docs/handbook/jsx.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "JSX"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": TSX static check with emitted JavaScript boundary."
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
      "id": "mdn-browser-platform-document",
      "children": [
        {
          "type": "text",
          "value": "MDN browser platform document"
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Document/title",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Document.title"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Read and set browser document title."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "HTMLElement.focus()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": programmatic focus and browser behavior."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "setInterval()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "clearInterval()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": timer ID and stop process."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "AbortController"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": abort signal and cancelable asynchronous operation."
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
      "id": "local-auxiliary-information",
      "children": [
        {
          "type": "text",
          "value": "Local auxiliary information"
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
                  "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
                },
                {
                  "type": "text",
                  "value": ": side effect on page 80–88, "
                },
                {
                  "type": "inlineCode",
                  "value": "useEffect"
                },
                {
                  "type": "text",
                  "value": ", dependency and cleanup introduction."
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
                  "value": "references/books/react/full-stack-react-projects.pdf"
                },
                {
                  "type": "text",
                  "value": ": It is only used as the organization and historical writing background of the old project, and is not used as the basis for modern Hook behavior."
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
          "type": "text",
          "value": "Local PDF summarizes effects into component lifecycles and tends to centralize local storage writes from handlers to effects. This chapter is revised according to the current React official model to \"externally synchronized independent start/stop process\", and first determines whether the logic is triggered by a clear event or does not require effect at all. Official documentation takes precedence over simplified representations of PDFs."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter07Content() {
  return <DocumentRenderer document={chapterDocument} />
}
