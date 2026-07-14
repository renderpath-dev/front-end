import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-10",
  "slug": "chapter-10-routing-url-state",
  "title": "React Chapter 10: Routing, URL State, and Navigation",
  "sourcePath": "docs/react/chapter-10-routing-url-state/react-chapter-10-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-10-routing-url-state-and-navigation",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 10: Routing, URL State, and Navigation"
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
              "value": "distinguishes between client navigation and document navigation"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/01-client-routing-boundary/client-routing-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "Observe location how to choose route branch"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/02-route-matching-tree/route-matching-tree.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "distinguishes between Link and NavLink intent"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/03-link-navlink-intent/link-navlink-intent.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "Understand nested route and Outlet ownership"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/04-nested-layout-outlet/nested-layout-outlet.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "handles dynamic param's string/undefined boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/05-dynamic-route-params/dynamic-route-params.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "models the filter conditions as URL search params"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/06-search-params-url-state/search-params-url-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "Compare URL, local and Context state owner"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/07-url-local-context-state/url-local-context-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "is called after the event completes navigate"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/08-programmatic-navigation/event-driven-navigation.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "uses splat route to provide fallback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/09-not-found-route/not-found-fallback-route.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "Understand front-end UI guard and back-end permission boundaries"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/10-protected-route-placeholder/protected-route-placeholder.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "Use route param key to clear reset state"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/11-route-state-reset/route-param-state-reset.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "Connect route param to abortable async criteria"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/12-route-params-async-criteria/route-param-async-criteria.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism exercise"
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
              "value": "mounts BrowserRouter, practice page and final workspace"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/chapter-10-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "entrance adapter"
            }
          ],
          [
            {
              "type": "text",
              "value": "7, 8, 14"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "provides exercises in this chapter and workspace general style"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/chapter-10-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "chapter shell CSS"
            }
          ],
          [
            {
              "type": "text",
              "value": "7, 14"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "integration SellerHub route architecture"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project"
            }
          ],
          [
            {
              "type": "text",
              "value": "12"
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
          "value": "This chapter is located after Chapter 9 async data. Chapter 9 can already convert a clear criteria into pending, success, empty or error UI; Chapter 10 adds another owner: browser URL. "
        },
        {
          "type": "inlineCode",
          "value": "productId"
        },
        {
          "type": "text",
          "value": ", order "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " and catalog "
        },
        {
          "type": "inlineCode",
          "value": "category"
        },
        {
          "type": "text",
          "value": " can enter the address bar, so it can still re-express \"what the user is looking at\" when refreshing, going back, forward, and copying links."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter only uses "
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Declarative mode"
            }
          ]
        },
        {
          "type": "text",
          "value": ": "
        },
        {
          "type": "inlineCode",
          "value": "BrowserRouter"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Routes"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Route"
        },
        {
          "type": "text",
          "value": " and ordinary React elements. No loaders, actions, framework mode, SSR, Server Components or backend APIs are introduced."
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
          "value": "does not have a router, developers often use local state to switch \"pages\". This changes the JSX without having a shareable URL, History entry, Back/Forward semantics or direct access path. The other extreme is that all internal navigation is written "
        },
        {
          "type": "inlineCode",
          "value": "<a href>"
        },
        {
          "type": "text",
          "value": "; the browser will request a new document, and the current JavaScript heap and React tree end together with the old document."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The core problem solved in this chapter is: how to make the URL a bounded application state, allowing React Router to select a route branch based on the current location, while retaining the accessibility and historical semantics of browser navigation; and how to determine whether a value should belong to the URL, component, context, or only one history entry."
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
                      "value": "Props and component composition:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " route element is still a React element, and layout is still organized through composition."
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
                      "value": "State snapshot and event handler:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "navigate()"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "setSearchParams()"
                },
                {
                  "type": "text",
                  "value": " should be triggered by events or logic that synchronizes external locations and should not be called in render."
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
                      "value": "Effects and cleanup:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " route param becomes request criteria, old requests still need to be abort or ignored."
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
                      "value": "State owner, Context and key:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " URL is not the owner of all states; route branch changes are not automatically equal to all state resets."
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
                      "value": "Async lifecycle: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " product detail still requires runtime validation and obsolete-result protection."
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
                      "value": "Browser URL, History API and "
                    },
                    {
                      "type": "inlineCode",
                      "value": "URLSearchParams"
                    },
                    {
                      "type": "text",
                      "value": ": "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " React Router builds on these browser platform capabilities and does not replace their semantics."
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
                  "value": "tracks History entry, location, route matches, route elements and React commit from one click."
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
                  "value": "Explain why "
                },
                {
                  "type": "inlineCode",
                  "value": "Link"
                },
                {
                  "type": "text",
                  "value": " usually retains the current document, while normal internal "
                },
                {
                  "type": "inlineCode",
                  "value": "<a href>"
                },
                {
                  "type": "text",
                  "value": " will start document navigation."
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
                  "value": "configure nested routes, layout route, index route, dynamic segment and splat fallback."
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
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "useParams()"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "useSearchParams()"
                },
                {
                  "type": "text",
                  "value": " is treated as an untrusted boundary and narrowed."
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
                  "value": "Select the correct owner for URL state, local state, Context state and location state."
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
                  "value": "determines that navigation should use "
                },
                {
                  "type": "inlineCode",
                  "value": "Link"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "NavLink"
                },
                {
                  "type": "text",
                  "value": " or "
                },
                {
                  "type": "inlineCode",
                  "value": "useNavigate()"
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
                  "value": "explains why route change is possible and preserve state is possible, and when to use "
                },
                {
                  "type": "inlineCode",
                  "value": "key={productId}"
                },
                {
                  "type": "text",
                  "value": " explicit reset."
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
                  "value": "Connect the route params to the async request criteria in Chapter 9 and clear the obsolete request."
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
                  "value": "Description protected route is only the front-end UI boundary, not the back-end authorization."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "First understand browser document navigation and session history, and then learn route matching; otherwise, it is easy to misunderstand router as \"switch that displays components\". Then learn Link/NavLink, nested Outlet, params and search params, because these APIs all depend on the current location. Finally, ownership, programmatic navigation, fallback, UI guard, identity and async criteria are discussed. These topics require the state/effect mental model from previous chapters."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The recommended sequence is: "
        },
        {
          "type": "inlineCode",
          "value": "BrowserRouter"
        },
        {
          "type": "text",
          "value": " boundary -> location and matching -> declarative links -> nested layout -> dynamic/search URL values -> state ownership -> event navigation -> fallback/guard -> identity -> async criteria -> SellerHub architecture."
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
              "value": "document navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "The browser requests and loads document's navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser platform"
            }
          ],
          [
            {
              "type": "text",
              "value": "old JavaScript realm and React tree will end"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "client-side routing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Update URL and UI branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router + History API"
            }
          ],
          [
            {
              "type": "text",
              "value": "retains the SPA runtime and provides URL/history semantics"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "location"
            }
          ],
          [
            {
              "type": "text",
              "value": "router represents the current pathname, search, hash, state, key"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "route matching and input of URL values"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "history entry"
            }
          ],
          [
            {
              "type": "text",
              "value": "Item in session history stack"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser History API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Back/Forward selected entry, not React state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "route tree"
            }
          ],
          [
            {
              "type": "text",
              "value": "path pattern and element hierarchical configuration"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "nested ownership and matching structural source"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "route branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "current location matched parent-to-leaf routes"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "determines which group of route elements will be rendered this time"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "dynamic segment"
            }
          ],
          [
            {
              "type": "text",
              "value": "to "
            },
            {
              "type": "inlineCode",
              "value": ":"
            },
            {
              "type": "text",
              "value": " declared path fragment"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "generates runtime route params"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "search params"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "?"
            },
            {
              "type": "text",
              "value": " The query after key/value strings"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser URL + React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "fits the shareable filter"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "location state"
            }
          ],
          [
            {
              "type": "text",
              "value": "The value"
            }
          ],
          [
            {
              "type": "text",
              "value": "History API + React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "is suitable for redirect intent, but not suitable as persistent data"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "layout route"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides element nesting, but does not need to add path segment route"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "expression sharing UI owner"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "The slot"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router component"
            }
          ],
          [
            {
              "type": "text",
              "value": "has no Outlet, and the matching child has no render position"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "navigation intent"
            }
          ],
          [
            {
              "type": "text",
              "value": "The user's intention to go to a locatable resource"
            }
          ],
          [
            {
              "type": "text",
              "value": "Architecture convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "is expressed first by Link/NavLink"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "UI guard"
            }
          ],
          [
            {
              "type": "text",
              "value": "is determined based on the front-end auth placeholder route element"
            }
          ],
          [
            {
              "type": "text",
              "value": "Architecture convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "can only improve the UI and cannot authorize backend operations"
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
          "value": "once declarative client navigation can be split into eight layers:"
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
                      "value": "Browser platform: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " When the user clicks the anchor, the browser first forms the navigation intent; React Router only intercepts the same-document client navigation that it can handle safely."
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
                      "value": "History API: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " router push or replace a session history entry; Back/Forward select a different entry in the future."
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
                      "value": "React Router: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "BrowserRouter"
                },
                {
                  "type": "text",
                  "value": " read location, "
                },
                {
                  "type": "inlineCode",
                  "value": "Routes"
                },
                {
                  "type": "text",
                  "value": " uses path patterns to calculate parent-to-leaf branches."
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
                      "value": "React framework: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " The selected route elements enter the React tree; React preserves or resets component state based on type, position and key."
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
                      "value": "JavaScript runtime: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " params/search params/location state are all objects or strings; handler, parser and async closure are executed at runtime."
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
                      "value": "TypeScript type system: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " checks API calls and union narrowing, but does not check whether the URL manually entered by the user complies with the business rules."
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
                      "value": "Architecture convention: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " team decides which values are shareable, recoverable, public, and therefore should go into the URL; which are private draft or cross-tier service state."
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
                      "value": "Tooling: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Vite converts TSX and provides SPA fallback during development; the production host still needs to fallback the unknown application path to "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "navigation intent -> history entry -> location -> route matching -> route branch -> route elements -> React identity -> committed UI"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The following files actually exist after this mission. "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " is only responsible for mounting the chapter entrance, and the core mechanism is not stacked in the entrance."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "D:/vite_ts/\n  package.json\n  package-lock.json\n  README.md\n  src/\n    App.tsx\n    learning/react/chapter-10-routing-url-state/\n      chapter-10-practice-root.tsx\n      chapter-10-practice.css\n      01-client-routing-boundary/client-routing-boundary.tsx\n      02-route-matching-tree/route-matching-tree.tsx\n      03-link-navlink-intent/link-navlink-intent.tsx\n      04-nested-layout-outlet/nested-layout-outlet.tsx\n      05-dynamic-route-params/dynamic-route-params.tsx\n      06-search-params-url-state/search-params-url-state.tsx\n      07-url-local-context-state/url-local-context-state.tsx\n      08-programmatic-navigation/event-driven-navigation.tsx\n      09-not-found-route/not-found-fallback-route.tsx\n      10-protected-route-placeholder/protected-route-placeholder.tsx\n      11-route-state-reset/route-param-state-reset.tsx\n      12-route-params-async-criteria/route-param-async-criteria.tsx\n      sellerhub-routing-workspace/\n        sellerhub-catalog-data.ts\n        sellerhub-product-request.ts\n        sellerhub-workspace-layout.tsx\n        sellerhub-catalog-page.tsx\n        sellerhub-product-detail-page.tsx\n        sellerhub-seller-layout.tsx\n        sellerhub-orders-page.tsx\n        sellerhub-checkout-page.tsx\n        sellerhub-login-page.tsx\n        sellerhub-protected-route.tsx\n        sellerhub-not-found-page.tsx\n        sellerhub-routing-workspace.tsx"
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
      "value": "docs/react/chapter-10-routing-url-state/\n  react-chapter-10-learning-guide.md"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "01"
        },
        {
          "type": "text",
          "value": " to "
        },
        {
          "type": "inlineCode",
          "value": "12"
        },
        {
          "type": "text",
          "value": " corresponds to 9.1 to 9.12. Numbering fixes the learning sequence, directory name expression mechanism, and file name expression executable target. 9.13 is a schema mapping and does not forge additional exercise files; it reads the conclusion of the previous 12 section and maps it to the final workspace."
        }
      ]
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
          "value": "For error comparison in this chapter, priority is given to using the text and error table. If "
        },
        {
          "type": "inlineCode",
          "value": "Snippet:"
        },
        {
          "type": "text",
          "value": ", which only represents a short error fragment, is not a path that needs to be created, and will not enter the final file list."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The final project is placed independently on "
        },
        {
          "type": "inlineCode",
          "value": "sellerhub-routing-workspace/"
        },
        {
          "type": "text",
          "value": ". Route tree, pages, layout, guard, mock request and domain data each have clear modules; chapter adapter and general CSS do not enter the complete project code repeatedly."
        }
      ]
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
          "type": "text",
          "value": "React Router installed as "
        },
        {
          "type": "inlineCode",
          "value": "react-router@7.18.0"
        },
        {
          "type": "text",
          "value": ", compatible with the current peer/engine range of React 19.2.4, React DOM 19.2.4, and Node 26.3.0. The project uses Declarative mode and does not mix data routers."
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
          "value": "Open the local URL output by Vite. The default route will replace to "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "/practice"
        },
        {
          "type": "text",
          "value": " displays 12 independent mechanism exercises. The development server can handle these client routes; production deployment must configure SPA fallback by the host, otherwise "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/lamp-101"
        },
        {
          "type": "text",
          "value": " may be returned by the server 404 before React starts."
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
      "id": "91-client-side-routing-vs-full-page-navigation",
      "children": [
        {
          "type": "text",
          "value": "9.1 Client-Side Routing vs. Full-Page Navigation"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Client-side routing is not \"without navigation\", but within the same document, the router uses the History API to update the location, and then lets React submit a new route branch. Ordinary internal "
        },
        {
          "type": "inlineCode",
          "value": "<a href=\"/catalog\">"
        },
        {
          "type": "text",
          "value": " still expresses a valid link, but the browser will request the target document by default; after the request is successful, the JavaScript heap, React root, Context and local state of the old document no longer exist."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves \"Why both controls are rendered as anchor but have different running results\". It's important to preserve true anchor semantics: users can still use the keyboard, right-click, copy addresses, and create new tabs. "
        },
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": " does not downgrade navigation to a normal button; it performs client navigation on handleable clicks, still obeying the browser in modifier key, external URL, or explicit document reload scenarios."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concepts are document navigation, client navigation, and same-document route transition. Browser platform determines the anchor's default action; History API saves session entries; React Router's "
        },
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": " handles navigation intent and updates location; React render elements according to new branch; JavaScript runtime executes click handler; TypeScript checks "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": " prop, but does not verify the existence of the target business page; the architecture convention stipulates that the internal locatable resources within the application use Link; Vite only provides document and module tooling during the development period."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "<Link to=\"/catalog\">"
        },
        {
          "type": "text",
          "value": " is "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": "; normal anchor uses "
        },
        {
          "type": "inlineCode",
          "value": "href"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "useLocation(): Location"
        },
        {
          "type": "text",
          "value": " returns the current router location. Don't put "
        },
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": " is written without "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": ", do not replace all anchors with "
        },
        {
          "type": "inlineCode",
          "value": "onClick={() => navigate(...)}"
        },
        {
          "type": "text",
          "value": ", that will lose the native link interaction."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/01-client-routing-boundary/client-routing-boundary.tsx",
      "value": "import { Link, useLocation } from 'react-router'\n\nexport function ClientRoutingBoundary() {\n  const location = useLocation()\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">01 / Navigation boundary</p>\n      <h2>Client navigation and document navigation</h2>\n      <p>\n        The router location is <code>{location.pathname + location.search}</code>.\n      </p>\n      <div className=\"routing-practice-actions\">\n        <Link to=\"/catalog\">Client navigation to catalog</Link>\n        <a href=\"/catalog\">Full document request to catalog</a>\n      </div>\n      <p className=\"routing-practice-note\">\n        Both controls have an anchor destination. The Link lets React Router handle the\n        same-origin click without requesting a new document.\n      </p>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "imports both declarative link and location reader. "
        },
        {
          "type": "inlineCode",
          "value": "location"
        },
        {
          "type": "text",
          "value": " is the router value read in this render; "
        },
        {
          "type": "inlineCode",
          "value": "pathname + search"
        },
        {
          "type": "text",
          "value": " lets you see the current input of the router. "
        },
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": " generates a targeted anchor and registers router navigation; the next line is normal "
        },
        {
          "type": "inlineCode",
          "value": "<a>"
        },
        {
          "type": "text",
          "value": " does not have router handling, so browser document request is retained. The copywriting of the two is deliberately different to avoid mistaking the visual similarity for the same operating mechanism."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "Click "
        },
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": ", the browser generates click and navigation intent; React Router determines that the same-origin click can be processed by the client router, blocks document navigation, writes/replaces History entry, and creates a new location object. "
        },
        {
          "type": "inlineCode",
          "value": "BrowserRouter"
        },
        {
          "type": "text",
          "value": " changes, the component of the consumer location obtains a new render snapshot, and the route matcher selects "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": " branch, React commit catalog elements. Click "
        },
        {
          "type": "inlineCode",
          "value": "<a href>"
        },
        {
          "type": "text",
          "value": ", the browser initiates a document request; re-execute the Vite bundle after the new document is loaded, and the old "
        },
        {
          "type": "inlineCode",
          "value": "location"
        },
        {
          "type": "text",
          "value": " object, component state cells and closures are all destroyed."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by clicking two different anchors; the specific runtime values are "
        },
        {
          "type": "inlineCode",
          "value": "to='/catalog'"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "href='/catalog'"
        },
        {
          "type": "text",
          "value": ". The former lets router push location, and the latter lets browser load document; TypeScript can only check JSX props, and cannot promise that the server will respond to "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": " returns SPA document. Both UIs may display the Catalog at the end, but the former retains the current runtime and the latter rebuilds the runtime. If the input boxes draft, Context or React DevTools tree are all reset after internal navigation, along with a new document request from the Network panel, misuse of the ordinary "
        },
        {
          "type": "inlineCode",
          "value": "<a href>"
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
              "value": "comparison, error rules and identification methods:"
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
          "value": "External sites, file downloads or addresses that explicitly require reload should use ordinary anchors; internal client routes within applications usually use Link. The error rule is not \"Never use "
        },
        {
          "type": "inlineCode",
          "value": "<a>"
        },
        {
          "type": "text",
          "value": "\", but does not distinguish between document resource and router-owned location. Another mistake is to put "
        },
        {
          "type": "inlineCode",
          "value": "href=\"#\""
        },
        {
          "type": "text",
          "value": " is used as navigation, and then change the state in click: URL/history. The page cannot be accurately described, and refreshing and copying the link are invalid."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "Catalog to Product Detail, Seller Orders to Checkout are all locatable application resources, and Link/NavLink should be used. Only external documents such as payment providers and help centers use ordinary anchors. This section connects the event in Chapter 4, the state owner in Chapter 8 and the browser navigation."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": " retains the anchor intent and hands over the handleable internal navigation to the router; "
        },
        {
          "type": "inlineCode",
          "value": "<a href>"
        },
        {
          "type": "text",
          "value": " defaults to passing the target to the browser document loader. The judgment is based on \"who owns the target resource and navigation lifecycle\", not the label appearance."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-router-locations-route-trees-and-route-matching",
      "children": [
        {
          "type": "text",
          "value": "9.2 Router Locations, Route Trees, and Route Matching"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Router does not select the page by component file name. It reads the pathname of the current location, matches the preconfigured route tree with the pathname, and obtains the route branch from parent to leaf; only the elements on the branch enter this React tree."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section explains why URL changes change the component tree, not just the address bar text. Understanding matching as pure input and output can help debug problems such as \"the URL is correct but the page is empty\", \"wrong child is matched\", \"params are overwritten\" and other problems: the input is location, the configuration is route objects/elements, and the output is ordered matches."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concepts are location, route tree, path pattern, route branch and match params. Browser/History is responsible for current entry; React Router reads pathname and performs ranked matching; React only processes elements handed over by matcher; JavaScript runtime creates "
        },
        {
          "type": "inlineCode",
          "value": "matches"
        },
        {
          "type": "text",
          "value": " array and params objects; TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "RouteObject[]"
        },
        {
          "type": "text",
          "value": " structure does not check that the address bar string must be hit; architecture convention determines whether the route tree can express page ownership; tooling only packages configuration."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "matchRoutes(routes, location)"
        },
        {
          "type": "text",
          "value": " returns matches or "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": ". Each match contains "
        },
        {
          "type": "inlineCode",
          "value": "route"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "pathname"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "params"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "path: '*'"
        },
        {
          "type": "text",
          "value": " is the fallback pattern; "
        },
        {
          "type": "inlineCode",
          "value": "index: true"
        },
        {
          "type": "text",
          "value": " represents the default child of the parent URL. Dynamic segments must have unique names, otherwise the key of the params object with the same name will be overwritten."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/02-route-matching-tree/route-matching-tree.tsx",
      "value": "import { matchRoutes, useLocation } from 'react-router'\nimport type { RouteObject } from 'react-router'\n\nconst learningRouteTree: RouteObject[] = [\n  {\n    path: '/',\n    children: [\n      { index: true },\n      { path: 'catalog' },\n      { path: 'catalog/:productId' },\n      {\n        path: 'seller',\n        children: [{ index: true }, { path: 'orders' }],\n      },\n      { path: '*' },\n    ],\n  },\n]\n\nexport function RouteMatchingTree() {\n  const location = useLocation()\n  const matches = matchRoutes(learningRouteTree, location)\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">02 / Route matching</p>\n      <h2>Location selects one route branch</h2>\n      <p>\n        Current pathname: <code>{location.pathname}</code>\n      </p>\n      <ol className=\"routing-match-list\">\n        {matches?.map((match, index) => (\n          <li key={`${match.pathname}-${index}`}>\n            <code>{match.route.path ?? (match.route.index ? '(index)' : '(layout)')}</code>\n            <span>{JSON.stringify(match.params)}</span>\n          </li>\n        )) ?? <li>No route branch matched.</li>}\n      </ol>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "RouteObject[]"
        },
        {
          "type": "text",
          "value": " only describes patterns and nesting and does not create DOM. The children of the root route express index, catalog, product detail, seller subtree and fallback. component reads "
        },
        {
          "type": "inlineCode",
          "value": "location"
        },
        {
          "type": "text",
          "value": ", then hand over the route tree and the entire location to "
        },
        {
          "type": "inlineCode",
          "value": "matchRoutes"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "matches?.map"
        },
        {
          "type": "text",
          "value": " displays each level in parent-to-leaf order; the key combines pathname and index, because parent/leaf may share part of the pathname."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "when location from "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": " becomes "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/lamp-101"
        },
        {
          "type": "text",
          "value": ", History entry and location object change first; "
        },
        {
          "type": "inlineCode",
          "value": "learningRouteTree"
        },
        {
          "type": "text",
          "value": " module constant reference remains unchanged. matcher hits "
        },
        {
          "type": "inlineCode",
          "value": "/"
        },
        {
          "type": "text",
          "value": ", then hit "
        },
        {
          "type": "inlineCode",
          "value": "catalog/:productId"
        },
        {
          "type": "text",
          "value": ", create "
        },
        {
          "type": "inlineCode",
          "value": "params = { productId: 'lamp-101' }"
        },
        {
          "type": "text",
          "value": ". New "
        },
        {
          "type": "inlineCode",
          "value": "matches"
        },
        {
          "type": "text",
          "value": " array is different from the old array, and the component renders a different list. React Router in real "
        },
        {
          "type": "inlineCode",
          "value": "<Routes>"
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
              "value": "mechanism evidence chain:"
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
          "value": "trigger is to navigate to "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": "; JavaScript Read "
        },
        {
          "type": "inlineCode",
          "value": "location.pathname"
        },
        {
          "type": "text",
          "value": ", matcher returns "
        },
        {
          "type": "inlineCode",
          "value": "/"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "seller"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "orders"
        },
        {
          "type": "text",
          "value": " matches; React Router's location context value is the change source, and React render displays three layers of branches; TypeScript only confirms "
        },
        {
          "type": "inlineCode",
          "value": "learningRouteTree"
        },
        {
          "type": "text",
          "value": " meets "
        },
        {
          "type": "inlineCode",
          "value": "RouteObject[]"
        },
        {
          "type": "text",
          "value": ", will not prove "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orderz"
        },
        {
          "type": "text",
          "value": " is spelled correctly. If you delete "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": ", unknown path gets "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": "; if the route tree has "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": ", leaf is fallback. In the real project, I saw that the URL changed but "
        },
        {
          "type": "inlineCode",
          "value": "matches"
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
          "value": ", give priority to checking pattern instead of blindly checking component CSS."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "uses "
        },
        {
          "type": "inlineCode",
          "value": "if (window.location.pathname === ...)"
        },
        {
          "type": "text",
          "value": " scattered in components will duplicate matching rules and lose nested branch and params parsing. Errors also include writing the child path as an absolute path that does not meet the expectations, or repeating "
        },
        {
          "type": "inlineCode",
          "value": ":id"
        },
        {
          "type": "text",
          "value": ". Recognition signals are parent layout misses, params object incomplete, or fallback seizing pages that should exist."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "SellerHub of "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": " is not two unrelated pages, but a branch of root workspace -> protected boundary -> seller layout -> orders leaf. The conditional rendering in Chapter 5 only selects JSX within existing components; route matching first determines which component owners exist."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Location is the input, route tree is the rule, and route branch is the output. React Router matches first, and React then renders branch elements; TypeScript does not match the runtime URL."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-link-navlink-and-navigation-intent",
      "children": [
        {
          "type": "text",
          "value": "9.3 Link, NavLink, and Navigation Intent"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Link"
        },
        {
          "type": "text",
          "value": " expresses \"go to a route\"; "
        },
        {
          "type": "inlineCode",
          "value": "NavLink"
        },
        {
          "type": "text",
          "value": " exposes active state to render callback on this basis. Only navigation controls do require the current matching style or "
        },
        {
          "type": "inlineCode",
          "value": "aria-current"
        },
        {
          "type": "text",
          "value": " semantics."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section avoids two misuses: using button + navigate for all navigation, or using NavLink for all links. The former loses anchor capabilities, and the latter spreads active matching logic to places where it is not needed. Navigation intent should be expressed by declarative link, and program flow should use imperative navigation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concept is active match, "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": " with render callback. Browser provides anchor interaction; History saves the target entry; React Router parses "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": " and calculate "
        },
        {
          "type": "inlineCode",
          "value": "isActive"
        },
        {
          "type": "text",
          "value": "; React uses callback to return class string; JavaScript runtime calls "
        },
        {
          "type": "inlineCode",
          "value": "navLinkClassName"
        },
        {
          "type": "text",
          "value": "; TypeScript checks the callback parameter; architecture convention distinguishes global nav from normal content links; tooling preserves these imports."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "fixed props include "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "className"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "className"
        },
        {
          "type": "text",
          "value": " can receive "
        },
        {
          "type": "inlineCode",
          "value": "({ isActive }) => string"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": " requires matching in "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": " is often used to avoid "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": " in "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/lamp-101"
        },
        {
          "type": "text",
          "value": ", it is still regarded as a precise leaf; whether to use it depends on the navigation level intention."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/03-link-navlink-intent/link-navlink-intent.tsx",
      "value": "import { Link, NavLink } from 'react-router'\n\nfunction navLinkClassName({ isActive }: { isActive: boolean }): string {\n  return isActive ? 'routing-intent-link routing-intent-link-active' : 'routing-intent-link'\n}\n\nexport function LinkNavLinkIntent() {\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">03 / Navigation intent</p>\n      <h2>Link moves; NavLink also reports active state</h2>\n      <nav aria-label=\"Navigation intent practice\" className=\"routing-practice-actions\">\n        <NavLink className={navLinkClassName} end to=\"/catalog\">\n          Catalog\n        </NavLink>\n        <NavLink className={navLinkClassName} to=\"/seller\">\n          Seller area\n        </NavLink>\n        <Link className=\"routing-intent-link\" to=\"/checkout\">\n          Checkout\n        </Link>\n      </nav>\n      <p className=\"routing-practice-note\">\n        Use NavLink only when the UI needs the current match state. Use Link for ordinary\n        navigation intent.\n      </p>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "helper only include "
        },
        {
          "type": "inlineCode",
          "value": "isActive"
        },
        {
          "type": "text",
          "value": " boolean and returns a stable CSS class string. Catalog NavLink Use "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": ", Seller NavLink allows descendant route to continue to be active. Checkout does not require active state, so Link is used. "
        },
        {
          "type": "inlineCode",
          "value": "nav"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "aria-label"
        },
        {
          "type": "text",
          "value": " explains that these anchors constitute the navigation area, rather than just relying on style hints."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "location is "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders?status=pending"
        },
        {
          "type": "text",
          "value": ", React Router compares each "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": " and pathname; Seller's descendant match makes "
        },
        {
          "type": "inlineCode",
          "value": "isActive=true"
        },
        {
          "type": "text",
          "value": ", Catalog's "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": " match is false, Checkout Link does not run active callback. When the new location generates a new render, the helper is called again and returns the corresponding class. The search string does not change the pathname match, so switching order status will not deactivate the Seller nav."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by clicking on Seller area; Link click updates History entry to "
        },
        {
          "type": "inlineCode",
          "value": "/seller"
        },
        {
          "type": "text",
          "value": ", Router generates a new location, NavLink reads the matching result and uses "
        },
        {
          "type": "inlineCode",
          "value": "{ isActive: true }"
        },
        {
          "type": "text",
          "value": " calls JavaScript helper, React commit active class. TypeScript only confirms that the callback receives boolean, and does not guarantee that the CSS class exists. If "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": " is removed, the Catalog will still be active under product detail; this may not be a bug. The key depends on whether the link expresses section or exact page. \"Multiple nav items are highlighted at the same time\" in real projects is usually an active boundary configuration error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "button onClick={() => navigate('/catalog')}"
        },
        {
          "type": "text",
          "value": " is suitable for \"go after completing the process\" and is not suitable for ordinary navigation menus; it lacks the copy link and new tab default capabilities. Replacing all normal content links with NavLink would make components needlessly dependent on location. When identifying, ask: Does this control represent destination? Is active state required?"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "SellerDashboardLayout uses NavLink because the sidebar needs to display the current branch; the View Product of the product card uses Link because the card only provides destination. It distinguishes the Chapter 3 props callback from the render callback injected by the router."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Link = declarative destination; NavLink = destination + current match state; useNavigate = event/process The imperative transition after completion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-nested-routes-layout-routes-and-outlet",
      "children": [
        {
          "type": "text",
          "value": "9.4 Nested Routes, Layout Routes, and Outlet"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Nested routes express both URL hierarchy and UI ownership. Parent route element is responsible for sharing layout, and the matched child route element can only pass the parent's "
        },
        {
          "type": "inlineCode",
          "value": "<Outlet />"
        },
        {
          "type": "text",
          "value": " enters tree; without Outlet, child may successfully match but have no render slot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves \"Why "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": " is correct, the sidebar appears, but the orders content is not displayed.\" Using layout as the route element owner allows header/sidebar to maintain the same tree position during child navigation instead of copying a layout for each page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concepts are nested route, layout route, index route and Outlet. Browser/History only knows "
        },
        {
          "type": "inlineCode",
          "value": "/practice/layout/orders"
        },
        {
          "type": "text",
          "value": "; React Router automatically adds the parent path to the child path and constructs a nested branch; React retains the position of the parent element and only replaces the outlet subtree; JavaScript runtime creates route element objects; TypeScript checks "
        },
        {
          "type": "inlineCode",
          "value": "Route"
        },
        {
          "type": "text",
          "value": " props; architecture convention makes shared UI belong to parent owner; Vite does not participate in nesting."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "<Route path=\"...\" element={...}>"
        },
        {
          "type": "text",
          "value": " are "
        },
        {
          "type": "inlineCode",
          "value": "path"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "element"
        },
        {
          "type": "text",
          "value": " and nested children; "
        },
        {
          "type": "inlineCode",
          "value": "index"
        },
        {
          "type": "text",
          "value": " route can no longer have children. "
        },
        {
          "type": "inlineCode",
          "value": "<Outlet />"
        },
        {
          "type": "text",
          "value": " has no required parameters. No "
        },
        {
          "type": "inlineCode",
          "value": "path"
        },
        {
          "type": "text",
          "value": " can only add element nesting; there is no "
        },
        {
          "type": "inlineCode",
          "value": "element"
        },
        {
          "type": "text",
          "value": " can only add path prefix. This section uses the most direct form of parent path + element."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/04-nested-layout-outlet/nested-layout-outlet.tsx",
      "value": "import { Link, Outlet, Route, Routes } from 'react-router'\n\nfunction PracticeLayout() {\n  return (\n    <div className=\"routing-outlet-frame\">\n      <strong>Persistent practice layout</strong>\n      <nav aria-label=\"Nested route practice\" className=\"routing-practice-actions\">\n        <Link to=\"/practice/layout\">Overview</Link>\n        <Link to=\"/practice/layout/orders\">Orders</Link>\n      </nav>\n      <Outlet />\n    </div>\n  )\n}\n\nfunction LayoutOverview() {\n  return <p>The index route renders into the parent Outlet.</p>\n}\n\nfunction LayoutOrders() {\n  return <p>The child orders route replaces only the Outlet content.</p>\n}\n\nexport function NestedLayoutOutlet() {\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">04 / Nested layout</p>\n      <h2>Parent layout owns shared UI; Outlet owns the child slot</h2>\n      <div className=\"routing-practice-actions\">\n        <Link to=\"/practice/layout\">Open nested layout</Link>\n        <Link to=\"/practice/layout/orders\">Open nested orders</Link>\n      </div>\n      <Routes>\n        <Route element={<PracticeLayout />} path=\"/practice/layout\">\n          <Route element={<LayoutOverview />} index />\n          <Route element={<LayoutOrders />} path=\"orders\" />\n        </Route>\n      </Routes>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "PracticeLayout"
        },
        {
          "type": "text",
          "value": " provides persistent label, nested links and unique Outlet. Overview is the index child, there is no additional segment; the relative value of the Orders child is "
        },
        {
          "type": "inlineCode",
          "value": "path=\"orders\""
        },
        {
          "type": "text",
          "value": " is automatically combined into "
        },
        {
          "type": "inlineCode",
          "value": "/practice/layout/orders"
        },
        {
          "type": "text",
          "value": ". The outer component retains the links that open the exercise and uses a separate Routes tree to map the two URLs to the parent/child elements."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "navigates to "
        },
        {
          "type": "inlineCode",
          "value": "/practice/layout"
        },
        {
          "type": "text",
          "value": ", matcher returns parent and index child; React render "
        },
        {
          "type": "inlineCode",
          "value": "PracticeLayout"
        },
        {
          "type": "text",
          "value": ", Outlet reads the child element in route context and render "
        },
        {
          "type": "inlineCode",
          "value": "LayoutOverview"
        },
        {
          "type": "text",
          "value": ". Navigate to "
        },
        {
          "type": "inlineCode",
          "value": "/practice/layout/orders"
        },
        {
          "type": "text",
          "value": ", the parent route element type and position remain unchanged, and the child element of Outlet changes from Overview to Orders. If the parent layout has local state, it will usually be retained; when the child is replaced by a different element type, the child state will be unloaded."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by clicking Orders; History entry is changed to "
        },
        {
          "type": "inlineCode",
          "value": "/practice/layout/orders"
        },
        {
          "type": "text",
          "value": "; matcher's branch starts from "
        },
        {
          "type": "inlineCode",
          "value": "[layout,index]"
        },
        {
          "type": "text",
          "value": " becomes "
        },
        {
          "type": "inlineCode",
          "value": "[layout,orders]"
        },
        {
          "type": "text",
          "value": "; route context put "
        },
        {
          "type": "inlineCode",
          "value": "LayoutOrders"
        },
        {
          "type": "text",
          "value": " is given to Outlet; React retains "
        },
        {
          "type": "inlineCode",
          "value": "PracticeLayout"
        },
        {
          "type": "text",
          "value": " identity, only replaces the Outlet subtree. TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "element"
        },
        {
          "type": "text",
          "value": " is ReactNode-compatible, but it does not check whether the outlet is actually placed in the parent JSX. If the Outlet is deleted, the URL and branch may still be correct, but the child has no visible output; in real projects, \"layout is visible and leaf disappears\" is the primary identification signal."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Copying the Seller sidebar into each page can temporarily display the same UI, but change the owner: each route change may rebuild the sidebar state and generate duplicate code. Write the child path as "
        },
        {
          "type": "inlineCode",
          "value": "/orders"
        },
        {
          "type": "text",
          "value": " will change the intention to absolute pattern, which is easy to break away from the parent. Also check route tree nesting, relative path and outlet location when debugging."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "SellerHubWorkspaceLayout"
        },
        {
          "type": "text",
          "value": " has the main navigation, "
        },
        {
          "type": "inlineCode",
          "value": "SellerHubSellerLayout"
        },
        {
          "type": "text",
          "value": " has a seller sidebar, and each uses an outlet to receive children. It directly follows Chapter 8 \"state owner is determined by tree position\": route tree now becomes another way to declare the organization owner."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Nested route generates nested branch; layout element has shared UI; Outlet is the render slot of child branch. URL nesting and UI ownership can be related, but only if the route tree explicitly declares it."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-dynamic-route-parameters-and-the-typescript-string-boundary",
      "children": [
        {
          "type": "text",
          "value": "9.5 Dynamic Route Parameters and the TypeScript String Boundary"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "path=\"catalog/:productId\""
        },
        {
          "type": "text",
          "value": " only indicates the name of the segment, but does not indicate that it is a valid product ID. "
        },
        {
          "type": "inlineCode",
          "value": "useParams<'productId'>()"
        },
        {
          "type": "text",
          "value": " comes from the runtime URL, which is still "
        },
        {
          "type": "inlineCode",
          "value": "string | undefined"
        },
        {
          "type": "text",
          "value": "; TypeScript generic will not change the address bar content into a verified domain value."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves the problem of \"Whether it is possible to directly request "
        },
        {
          "type": "inlineCode",
          "value": "/api/products/${productId}"
        },
        {
          "type": "text",
          "value": "\". Route config, matching and business existence are three different issues: pattern can match any string, param may be missing due to the calling location or route configuration, and even if it exists, it may be "
        },
        {
          "type": "inlineCode",
          "value": "missing-999"
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
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concepts are dynamic segment, params object, string boundary and runtime validation. Browser performs URL processing on path; React Router extracts segments from matched pathname; React component reads route context; JavaScript uses string to check map; TypeScript passes "
        },
        {
          "type": "inlineCode",
          "value": "useParams<'productId'>()"
        },
        {
          "type": "text",
          "value": " restricts visible keys but does not run verification; architecture convention determines ID grammar; tooling provides diagnosis but does not intercept user input URLs."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "dynamic segment uses fixed prefix "
        },
        {
          "type": "inlineCode",
          "value": ":"
        },
        {
          "type": "text",
          "value": ". The signature of this chapter is "
        },
        {
          "type": "inlineCode",
          "value": "useParams<'productId'>(): Readonly<Params<'productId'>>"
        },
        {
          "type": "text",
          "value": ", the actual property can still be missing. Multiple dynamic segments must use unique names. Business narrowing should first check "
        },
        {
          "type": "inlineCode",
          "value": "if (!productId)"
        },
        {
          "type": "text",
          "value": ", then do the format, allow-list or runtime parser."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/05-dynamic-route-params/dynamic-route-params.tsx",
      "value": "import { Link, Route, Routes, useParams } from 'react-router'\n\nconst productNames: Record<string, string> = {\n  'lamp-101': 'Arc Desk Lamp',\n  'chair-204': 'Mesh Task Chair',\n}\n\nfunction ProductParamResult() {\n  const { productId } = useParams<'productId'>()\n\n  if (!productId) {\n    return <p className=\"routing-error-text\">The matched route did not provide productId.</p>\n  }\n\n  const productName = productNames[productId]\n\n  return (\n    <div className=\"routing-result-box\">\n      <p>\n        Runtime param: <code>{productId}</code>\n      </p>\n      <p>{productName ?? 'No local product matches this string.'}</p>\n    </div>\n  )\n}\n\nexport function DynamicRouteParams() {\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">05 / Dynamic params</p>\n      <h2>A dynamic path segment becomes a string parameter</h2>\n      <div className=\"routing-practice-actions\">\n        <Link to=\"/practice/products/lamp-101\">Known product</Link>\n        <Link to=\"/practice/products/missing-999\">Unknown product</Link>\n      </div>\n      <Routes>\n        <Route element={<ProductParamResult />} path=\"/practice/products/:productId\" />\n      </Routes>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "productNames"
        },
        {
          "type": "text",
          "value": " is a local domain lookup, not a route config. "
        },
        {
          "type": "inlineCode",
          "value": "useParams<'productId'>()"
        },
        {
          "type": "text",
          "value": " only declares the key that this component is concerned with. Missing check narrows subsequent binding to string; subsequent bracket lookup may still return "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": ", so the UI uses nullish fallback. Two Links prove that \"matching is successful\" and \"domain entity exists\" are not the same conclusion."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, variable changes and result reasons:"
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
          "value": "After clicking Known Product, the History pathname changes to "
        },
        {
          "type": "inlineCode",
          "value": "/practice/products/lamp-101"
        },
        {
          "type": "text",
          "value": ". Route pattern matches and creates "
        },
        {
          "type": "inlineCode",
          "value": "{ productId: 'lamp-101' }"
        },
        {
          "type": "text",
          "value": "; component render reads string, lookup gets "
        },
        {
          "type": "inlineCode",
          "value": "'Arc Desk Lamp'"
        },
        {
          "type": "text",
          "value": ". After clicking Unknown Product, the same route element still matches, and the params object becomes "
        },
        {
          "type": "inlineCode",
          "value": "{ productId: 'missing-999' }"
        },
        {
          "type": "text",
          "value": ", lookup returns "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": ", so fallback is displayed instead of route-level 404."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by changing the dynamic segment; Router creates a new params object from pathname and provides it through route context; React calls the same "
        },
        {
          "type": "inlineCode",
          "value": "ProductParamResult"
        },
        {
          "type": "text",
          "value": " type; TypeScript in "
        },
        {
          "type": "inlineCode",
          "value": "if (!productId)"
        },
        {
          "type": "text",
          "value": ", we only know that it is a string, but we cannot know "
        },
        {
          "type": "inlineCode",
          "value": "productNames[productId]"
        },
        {
          "type": "text",
          "value": " exists. If using non-null assertion "
        },
        {
          "type": "inlineCode",
          "value": "productId!"
        },
        {
          "type": "text",
          "value": " and directly request, the code violates the rule of \"external runtime string must be verified\". In real projects, the URL can be manually changed to any value, and "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": " criteria or API frequent 404 are both error signals."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Route not found handles \"no pattern matching\", entity not found handles \"pattern matches but resource does not exist\". Mix the two into one "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": " route loses precise error semantics. Do not use "
        },
        {
          "type": "inlineCode",
          "value": "as ProductId"
        },
        {
          "type": "text",
          "value": " fake check; type assertion disappears in emitted JavaScript."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "/catalog/:productId"
        },
        {
          "type": "text",
          "value": " hands productId to Chapter 9 async lifecycle; first check param, then initiate request, and then verify "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " response. It strings TypeScript narrowing, route matching and async criteria into a boundary chain."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Dynamic segment generates named runtime string; generic constraint key, value is not verified; route match is not equal to domain match."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-search-parameters-as-url-state",
      "children": [
        {
          "type": "text",
          "value": "9.6 Search Parameters as URL State"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Search params are suitable for small string states that can be shared, refreshed, rolled back, and used to request criteria, such as "
        },
        {
          "type": "inlineCode",
          "value": "status=pending"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "URLSearchParams.get()"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "string | null"
        },
        {
          "type": "text",
          "value": ", so any URL input must be parsed into a supported union."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves the problem of \"why not only put "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": "\". If the filter is only in local state, copying the link, refreshing or browsing history cannot restore the user's view; if the entire order object JSON is put into the query, the URL will become unstable, public and difficult to evolve. URL state should express identity and filtering criteria and not host large private objects."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "is query string, "
        },
        {
          "type": "inlineCode",
          "value": "URLSearchParams"
        },
        {
          "type": "text",
          "value": ", search entry and parser. The Browser URL layer is responsible for encoding the query; the History record contains the location of search; React Router provides "
        },
        {
          "type": "inlineCode",
          "value": "[searchParams, setSearchParams]"
        },
        {
          "type": "text",
          "value": "; React render reads the parsed status; "
        },
        {
          "type": "inlineCode",
          "value": "includes"
        },
        {
          "type": "text",
          "value": " executes runtime allow-list; TypeScript union only constrains parser output; architecture convention determines which filters can be made public; tooling does not verify the address bar."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useSearchParams(defaultInit?)"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "[URLSearchParams, SetURLSearchParams]"
        },
        {
          "type": "text",
          "value": ". The fixing method is "
        },
        {
          "type": "inlineCode",
          "value": "get"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "set"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "delete"
        },
        {
          "type": "text",
          "value": "; This example uses setter object to generate a new search. "
        },
        {
          "type": "inlineCode",
          "value": "setSearchParams({ status: 'pending' })"
        },
        {
          "type": "text",
          "value": " will navigate to the new search; it is not an ordinary local setter."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/06-search-params-url-state/search-params-url-state.tsx",
      "value": "import { useSearchParams } from 'react-router'\n\nconst orderStatuses = ['all', 'pending', 'shipped'] as const\n\ntype OrderStatus = (typeof orderStatuses)[number]\n\nfunction parseOrderStatus(value: string | null): OrderStatus {\n  return orderStatuses.includes(value as OrderStatus) ? (value as OrderStatus) : 'all'\n}\n\nexport function SearchParamsUrlState() {\n  const [searchParams, setSearchParams] = useSearchParams()\n  const status = parseOrderStatus(searchParams.get('status'))\n\n  function selectStatus(nextStatus: OrderStatus): void {\n    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })\n  }\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">06 / URL state</p>\n      <h2>Search params hold shareable filter criteria</h2>\n      <div className=\"routing-segmented-control\" role=\"group\" aria-label=\"Order status filter\">\n        {orderStatuses.map((option) => (\n          <button\n            aria-pressed={status === option}\n            key={option}\n            onClick={() => selectStatus(option)}\n            type=\"button\"\n          >\n            {option}\n          </button>\n        ))}\n      </div>\n      <p>\n        Parsed status: <code>{status}</code>\n      </p>\n      <p className=\"routing-practice-note\">\n        URLSearchParams returns runtime strings. The parser narrows unknown URL input to the\n        supported union.\n      </p>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "readonly tuple produces both runtime allow-list and TypeScript union. parser accepts "
        },
        {
          "type": "inlineCode",
          "value": "string | null"
        },
        {
          "type": "text",
          "value": ", input will be returned only if allow-list is hit, otherwise it will return to "
        },
        {
          "type": "inlineCode",
          "value": "'all'"
        },
        {
          "type": "text",
          "value": ". The component reads raw value from search params, and the UI only consumes parsed status. Click the button to call the setter; remove redundant params when selecting all to keep the canonical URL simple."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "user clicks pending, handler closure receives "
        },
        {
          "type": "inlineCode",
          "value": "'pending'"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "setSearchParams"
        },
        {
          "type": "text",
          "value": " created containing "
        },
        {
          "type": "inlineCode",
          "value": "?status=pending"
        },
        {
          "type": "text",
          "value": " 's navigation. History stack adds entry, Router location "
        },
        {
          "type": "inlineCode",
          "value": "search"
        },
        {
          "type": "text",
          "value": " changes, and the next render gets the new "
        },
        {
          "type": "inlineCode",
          "value": "URLSearchParams"
        },
        {
          "type": "text",
          "value": " view, "
        },
        {
          "type": "inlineCode",
          "value": "get"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "'pending'"
        },
        {
          "type": "text",
          "value": ", parser returns union member. Manually enter "
        },
        {
          "type": "inlineCode",
          "value": "?status=hacked"
        },
        {
          "type": "text",
          "value": ", the route still matches, but the parser returns all."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by status button or address bar query; Browser URL/History entry saves query string; React Router constructs URLSearchParams from location.search; JavaScript parser reads raw string; React uses parsed status Decision "
        },
        {
          "type": "inlineCode",
          "value": "aria-pressed"
        },
        {
          "type": "text",
          "value": "; TypeScript only guarantees "
        },
        {
          "type": "inlineCode",
          "value": "selectStatus"
        },
        {
          "type": "text",
          "value": " passes in union and cannot constrain the address bar. If you write "
        },
        {
          "type": "inlineCode",
          "value": "const status = searchParams.get('status') as OrderStatus"
        },
        {
          "type": "text",
          "value": ", illegal values will enter the UI and request criteria; in real projects, seeing unknown filters leading to empty requests or wrong cache keys is an identification signal."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Local state is suitable for uncommitted input, popover open or temporary selection; search params is suitable for catalog category, sort, page and seller order status. Don't put tokens, passwords, full checkout drafts, or large objects that change frequently; URLs will appear in history, logs, copy links, and Referer scenarios."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main line of learning:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "/catalog?category=lighting&q=lamp"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders?status=pending"
        },
        {
          "type": "text",
          "value": " can directly become the committed request criteria of Chapter 9. Chapter 6 form draft You can leave local state first, submit search and then enter the URL."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Search params are public, serializable, string-based URL state; parse after reading, canonicalize when writing, and do not use TypeScript assertion as runtime validation."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-choosing-between-url-local-and-context-state",
      "children": [
        {
          "type": "text",
          "value": "9.7 Choosing Between URL, Local, and Context State"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "State owner is determined by recovery and sharing requirements: the navigation/filter state that can be restored through a link belongs to the URL; the draft that only serves the current component instance belongs to the local state; only stable preferences or service values that are shared across multiple layers of components and are not suitable for the URL may belong to the Context."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves the problem of \"since the Context can be shared globally, why do we need the URL\" and \"since the URL can be saved, why not put all drafts in it\". Repeatedly saving the same category to URL, local state and Context will create synchronization problems; the correct approach is to select a source owner and other values ​​​​are directly read or derived."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "There is no new React Router API in this section, the focus is on URL state and route architecture boundaries. Browser/History has category query; React state cell has "
        },
        {
          "type": "inlineCode",
          "value": "draftNote"
        },
        {
          "type": "text",
          "value": " snapshot; Context provider has currency value; JavaScript reads three runtime values; TypeScript checks string union, state setter and context shape respectively; architecture convention selects owner according to shareability/privacy; tooling will not make ownership decisions for the team."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "still uses "
        },
        {
          "type": "inlineCode",
          "value": "useSearchParams()"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useState('')"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "createContext<T | null>(null)"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "useContext()"
        },
        {
          "type": "text",
          "value": ". The fixed object property of Context is "
        },
        {
          "type": "inlineCode",
          "value": "currency"
        },
        {
          "type": "text",
          "value": ", not a framework requirement; URL param "
        },
        {
          "type": "inlineCode",
          "value": "category"
        },
        {
          "type": "text",
          "value": " is also an application protocol and requires a parser to become a domain category."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/07-url-local-context-state/url-local-context-state.tsx",
      "value": "import { createContext, useContext, useState } from 'react'\nimport { useSearchParams } from 'react-router'\n\ntype WorkspacePreferences = {\n  currency: 'USD' | 'EUR'\n}\n\nconst WorkspacePreferencesContext = createContext<WorkspacePreferences | null>(null)\n\nfunction StateBoundaryContent() {\n  const [searchParams, setSearchParams] = useSearchParams()\n  const [draftNote, setDraftNote] = useState('')\n  const preferences = useContext(WorkspacePreferencesContext)\n  const category = searchParams.get('category') ?? 'all'\n\n  if (!preferences) {\n    throw new Error('StateBoundaryContent requires WorkspacePreferencesContext')\n  }\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">07 / State ownership</p>\n      <h2>URL, local state, and Context have different owners</h2>\n      <label className=\"routing-field\">\n        <span>Shareable category</span>\n        <select\n          onChange={(event) => setSearchParams({ category: event.currentTarget.value })}\n          value={category}\n        >\n          <option value=\"all\">All</option>\n          <option value=\"office\">Office</option>\n          <option value=\"lighting\">Lighting</option>\n        </select>\n      </label>\n      <label className=\"routing-field\">\n        <span>Private unsaved note</span>\n        <input\n          onChange={(event) => setDraftNote(event.currentTarget.value)}\n          placeholder=\"Keep this out of the URL\"\n          value={draftNote}\n        />\n      </label>\n      <dl className=\"routing-boundary-list\">\n        <div>\n          <dt>URL state</dt>\n          <dd>{category}</dd>\n        </div>\n        <div>\n          <dt>Local draft</dt>\n          <dd>{draftNote || 'empty'}</dd>\n        </div>\n        <div>\n          <dt>Context preference</dt>\n          <dd>{preferences.currency}</dd>\n        </div>\n      </dl>\n    </article>\n  )\n}\n\nexport function UrlLocalContextState() {\n  return (\n    <WorkspacePreferencesContext.Provider value={{ currency: 'USD' }}>\n      <StateBoundaryContent />\n    </WorkspacePreferencesContext.Provider>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Context type only contains workspace-wide currency. content reads router search, local state cell and nearest provider simultaneously. Category select writes URL, note input writes local state, and definition list displays three owners side by side. null guard makes missing provider an explicit runtime error rather than a non-null assertion."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, variable changes and result reasons:"
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
          "value": "When lighting is selected, the search of History entry becomes "
        },
        {
          "type": "inlineCode",
          "value": "?category=lighting"
        },
        {
          "type": "text",
          "value": ", the local draft state cell of the component remains unchanged, and the Context value object also remains unchanged. When entering note, there is only "
        },
        {
          "type": "inlineCode",
          "value": "draftNote"
        },
        {
          "type": "text",
          "value": " update queue and next render snapshot change, but the URL remains unchanged. After refreshing the document, the URL category can be re-read; the local draft and in this case the memory-only Context will be re-initialized."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "triggers select change and input change respectively; the former calls router setter and generates location/search change, and the latter calls React setter and generates state snapshot; provider still provides "
        },
        {
          "type": "inlineCode",
          "value": "{currency:'USD'}"
        },
        {
          "type": "text",
          "value": ". TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "currency"
        },
        {
          "type": "text",
          "value": " union and input string, but category raw value is not verified. If you create another local "
        },
        {
          "type": "inlineCode",
          "value": "category"
        },
        {
          "type": "text",
          "value": " and using Effect to synchronize the URL will generate two source owners; in a real project, the Back button changes the URL but the select does not change, Effect loops or the first render flashes, which are all repeated state signals."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Context does not provide history, bookmark or share semantics; URL is not suitable for sensitive/private draft; local state does not refresh across. Ask item by item when judging: Does it require link recovery? Should it be made public? Does it only belong to the current instance? Does it have to be shared across deep subtrees?"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "Catalog category puts URL, Checkout shipping note puts local state, currency/user capability can be provided by app-level Context or future auth service. It reuses the source-of-truth principle in Chapter 8 and adds the URL to the owner candidate."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "URL, component and Context are not three synchronized copies, but three ownerships. A fact selects only one owner, and other UI reads or derives from owner."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-programmatic-navigation-in-event-driven-flows",
      "children": [
        {
          "type": "text",
          "value": "9.8 Programmatic Navigation in Event-Driven Flows"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useNavigate()"
        },
        {
          "type": "text",
          "value": " is suitable for changing the location after an explicit event or process is completed, such as submit success, logout completion or wizard step completion. Do not call navigate directly based on conditions in the render body; render must describe the UI, and navigation is an external action that will modify the History."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section distinguishes between navigation intent and navigation consequence. Ordinary \"Go to Checkout\" should use Link; \"Return to Catalog after the order is successfully created\" does not have a new destination link that the user can open in advance, so it is suitable to call navigate in the success handler."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concepts are imperative navigation, history delta, push/replace and location state. Browser/History processes entry; React Router returns navigation function; React event system calls handler; JavaScript closure holds "
        },
        {
          "type": "inlineCode",
          "value": "navigate"
        },
        {
          "type": "text",
          "value": "; TypeScript Press "
        },
        {
          "type": "inlineCode",
          "value": "NavigateFunction"
        },
        {
          "type": "text",
          "value": " Check "
        },
        {
          "type": "inlineCode",
          "value": "(to, options?)"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "(delta)"
        },
        {
          "type": "text",
          "value": "; architecture convention limits the calling timing; tooling does not determine when the business process is completed."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "installation version is "
        },
        {
          "type": "inlineCode",
          "value": "navigate(to, options?): void | Promise<void>"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "navigate(delta): void | Promise<void>"
        },
        {
          "type": "text",
          "value": ". Declarative mode In this example, the return value can be ignored. Commonly used options are "
        },
        {
          "type": "inlineCode",
          "value": "replace"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "navigate(-1)"
        },
        {
          "type": "text",
          "value": " requests history delta. There is no guarantee that the previous page in the application will exist, so it cannot be used as the only key process exit."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/08-programmatic-navigation/event-driven-navigation.tsx",
      "value": "import { useNavigate } from 'react-router'\n\nexport function EventDrivenNavigation() {\n  const navigate = useNavigate()\n\n  function completePracticeCheckout(): void {\n    navigate('/checkout?step=review', {\n      state: { source: 'programmatic-navigation-practice' },\n    })\n  }\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">08 / Programmatic navigation</p>\n      <h2>Navigate after an explicit event completes</h2>\n      <div className=\"routing-practice-actions\">\n        <button onClick={completePracticeCheckout} type=\"button\">\n          Complete step and review checkout\n        </button>\n        <button onClick={() => navigate(-1)} type=\"button\">\n          Go back one history entry\n        </button>\n      </div>\n      <p className=\"routing-practice-note\">\n        The navigate function is called inside event handlers, never while the component is\n        rendering.\n      </p>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useNavigate"
        },
        {
          "type": "text",
          "value": " obtains function from router context. "
        },
        {
          "type": "inlineCode",
          "value": "completePracticeCheckout"
        },
        {
          "type": "text",
          "value": " is the event callback; when calling, pathname/search and an entry-local state object are handed over to the router. The second button uses number overload to request the rollback of an entry. Both calls occur after onClick, not during component render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "The first render only creates the handler closure and buttons, and does not modify the URL. After clicking Complete, React calls closure, JavaScript calls navigate, and Router push "
        },
        {
          "type": "inlineCode",
          "value": "/checkout?step=review"
        },
        {
          "type": "text",
          "value": " and transfer the state to the history entry; the location object is subsequently updated, and the route branch is switched to Checkout. "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": " does not appear in the address bar and should not be treated as a durable database. Browsers can usually retain history state in the same session history entry, but directly opening, copying the URL, creating a new session, or reconstructing the entry cannot restore it, so the code must have a fallback."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by button click; handler closure reads "
        },
        {
          "type": "inlineCode",
          "value": "navigate"
        },
        {
          "type": "text",
          "value": " function; History new entry; Router location contains pathname/search/state; React render Checkout route element; TypeScript check "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": " can be delivered, but the receiving end shape is not verified. If "
        },
        {
          "type": "inlineCode",
          "value": "if (done) navigate('/catalog')"
        },
        {
          "type": "text",
          "value": ", each render may modify the external location and trigger a new render, violating render purity; warnings, repeated history entries, flickers or navigation loops are identification signals in real projects."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "When the user directly selects the destination, priority is given to Link/NavLink; when the process result drives the destination, navigate is used. "
        },
        {
          "type": "inlineCode",
          "value": "replace: true"
        },
        {
          "type": "text",
          "value": " is suitable for scenarios where you do not want Back to return to a one-time intermediate page, such as replacing the login entry after a successful login; the default for normal page browsing is push."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "Checkout all belong to the event/process flow. Chapter 7 has distinguished event logic and Effect synchronization; navigation also first asks \"whether it is caused by a specific event.\""
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Render describes the UI under the current location; Link describes the optional destination; navigate submits the history transition after the event or process is completed."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-not-found-routes-and-fallback-matching",
      "children": [
        {
          "type": "text",
          "value": "9.9 Not-Found Routes and Fallback Matching"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Not found route is the fallback of route matching, not that the network request failed, nor that the product entity does not exist. "
        },
        {
          "type": "inlineCode",
          "value": "path=\"*\""
        },
        {
          "type": "text",
          "value": " captures locations that have not been previously handled by more specific branching, and renders a resumable UI."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves the problem that unknown URLs only display blank. Whether the Router can match the path and whether the page's internal request can obtain the entity are two-level errors: "
        },
        {
          "type": "inlineCode",
          "value": "/does-not-exist"
        },
        {
          "type": "text",
          "value": " belongs to route fallback; "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/missing-999"
        },
        {
          "type": "text",
          "value": " may match the product route, but get not found in the resource layer."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "is splat/catchall, fallback branch and route-level not found. Browser allows users to enter any same-origin path; History saves it; React Router ranked matching considers specific patterns first, then uses "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": "; React render fallback element; "
        },
        {
          "type": "inlineCode",
          "value": "matchRoutes"
        },
        {
          "type": "text",
          "value": " returns leaf match; TypeScript only checks the route object shape; architecture convention determines the fallback recovery entry; tooling/host must also roll back the direct request to the SPA document."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "Fallback pattern fixed writing "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": ", a more local catchall can be written "
        },
        {
          "type": "inlineCode",
          "value": "files/*"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "matchRoutes(routeObjects, location)"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "RouteMatch[] | null"
        },
        {
          "type": "text",
          "value": ". There is no new browser API in this section, the focus is on the two-layer boundary between route matching fallback and server SPA fallback."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/09-not-found-route/not-found-fallback-route.tsx",
      "value": "import { matchRoutes } from 'react-router'\nimport type { RouteObject } from 'react-router'\nimport { useState } from 'react'\n\nconst fallbackRouteTree: RouteObject[] = [\n  { path: '/catalog' },\n  { path: '/catalog/:productId' },\n  { path: '*' },\n]\n\nexport function NotFoundFallbackRoute() {\n  const [candidatePath, setCandidatePath] = useState('/unknown/path')\n  const matches = matchRoutes(fallbackRouteTree, candidatePath)\n  const leafPath = matches?.at(-1)?.route.path ?? 'no match'\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">09 / Fallback matching</p>\n      <h2>A splat route handles unmatched locations</h2>\n      <label className=\"routing-field\">\n        <span>Candidate pathname</span>\n        <input\n          onChange={(event) => setCandidatePath(event.currentTarget.value)}\n          value={candidatePath}\n        />\n      </label>\n      <p>\n        Leaf match: <code>{leafPath}</code>\n      </p>\n      <p className=\"routing-practice-note\">\n        Remove the star route and unknown paths produce no route element instead of a useful\n        fallback screen.\n      </p>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Route tree first declares two specific patterns, and then declares splat. "
        },
        {
          "type": "inlineCode",
          "value": "candidatePath"
        },
        {
          "type": "text",
          "value": " is a practice input and does not change the browser URL; "
        },
        {
          "type": "inlineCode",
          "value": "matchRoutes"
        },
        {
          "type": "text",
          "value": " purely calculates the matching result. "
        },
        {
          "type": "inlineCode",
          "value": ".at(-1)"
        },
        {
          "type": "text",
          "value": " reads branch leaf, optional chaining processes "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": ", fallback string allows no match after removing splat to be observed."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, variable changes and result reasons:"
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
          "value": "Enter "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/lamp-101"
        },
        {
          "type": "text",
          "value": ", the local state snapshot changes, and the matcher selects "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/:productId"
        },
        {
          "type": "text",
          "value": " and create productId param. Enter "
        },
        {
          "type": "inlineCode",
          "value": "/unknown/path"
        },
        {
          "type": "text",
          "value": ", the specific patterns do not match, "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": " becomes leaf. If "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": ", the same input gets "
        },
        {
          "type": "inlineCode",
          "value": "matches=null"
        },
        {
          "type": "text",
          "value": ", React displays "
        },
        {
          "type": "inlineCode",
          "value": "no match"
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
              "value": "mechanism evidence chain:"
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
          "value": "is triggered by editing candidate string; JavaScript state update generates a new snapshot, "
        },
        {
          "type": "inlineCode",
          "value": "matchRoutes"
        },
        {
          "type": "text",
          "value": " reads the stable route tree and new string; this exercise does not change the History entry, the real route navigation will change the location; React displays the leaf pattern; TypeScript ensures that the optional access is legal, but does not guarantee that the user path has a specific route. If "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": " is placed in the wrong route subtree, which may only capture local descendants instead of the entire site; in a real project, \"some unknown paths show fallback and others are blank\" prompts that tree ownership needs to be checked."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Router fallback element works after React has been started; production server pairs directly "
        },
        {
          "type": "inlineCode",
          "value": "/unknown/path"
        },
        {
          "type": "text",
          "value": " must first return "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": ", otherwise the router will have no chance to run. Do not merge API 404, entity not found and route not found into the same state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "SellerHub of "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": " route displays requested pathname and Catalog recovery link; the invalid response of product detail is left on the product page. It follows the principle of \"Differentiating UI state branches\" in Chapter 5/9."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Splat is route-tree fallback; SPA host fallback is document-serving configuration; entity 404 is data layer. Three 404 must be diagnosed in layers."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-protected-route-placeholders-and-the-authentication-boundary",
      "children": [
        {
          "type": "text",
          "value": "9.10 Protected-Route Placeholders and the Authentication Boundary"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Protected route placeholder can only choose to display child or redirect login based on the auth state known by the front end. It cannot prevent users from viewing downloaded JavaScript, nor can it authorize API, database or real order operations; a true security boundary must be verified by the backend on each request."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves \"Whether hiding the Seller link is equivalent to protecting the Seller API\". UI guard improves navigation flow, prevents non-logged-in users from entering meaningless pages, and saves redirect intent; it is not a security mechanism. Writing this boundary into the route architecture prevents front-end conditional rendering from being mistaken for access control."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "is UI guard, "
        },
        {
          "type": "inlineCode",
          "value": "Navigate"
        },
        {
          "type": "text",
          "value": " element, redirect intent and auth placeholder. Browser/History saves login entry; React Router's Navigate replaces location in commit-related routing flow; React local state saves this example auth boolean; JavaScript runtime guard reads location.state unknown; TypeScript checks props but does not verify the real session; architecture convention combines UI guard with backend authorization Separation; tooling provides no security guarantees."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "<Navigate to=\"/login\" replace state={{ from }} />"
        },
        {
          "type": "text",
          "value": " are "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "replace"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "<Outlet />"
        },
        {
          "type": "text",
          "value": " Continue child branch when allowed. "
        },
        {
          "type": "inlineCode",
          "value": "useLocation()"
        },
        {
          "type": "text",
          "value": " reads the current location; "
        },
        {
          "type": "inlineCode",
          "value": "location.state"
        },
        {
          "type": "text",
          "value": " should be pressed "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " thinking to do runtime guard. "
        },
        {
          "type": "inlineCode",
          "value": "replace"
        },
        {
          "type": "text",
          "value": " Avoid Back and immediately return to guard and redirect again."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/10-protected-route-placeholder/protected-route-placeholder.tsx",
      "value": "import { useState } from 'react'\nimport { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router'\n\ntype RedirectLocationState = {\n  from?: string\n}\n\nfunction readRedirectPath(state: unknown): string {\n  if (\n    typeof state === 'object' &&\n    state !== null &&\n    'from' in state &&\n    typeof (state as RedirectLocationState).from === 'string'\n  ) {\n    return (state as RedirectLocationState).from ?? '/practice/protected'\n  }\n\n  return '/practice/protected'\n}\n\nfunction ProtectedPracticeRoute({ isAuthenticated }: { isAuthenticated: boolean }) {\n  const location = useLocation()\n\n  if (!isAuthenticated) {\n    return (\n      <Navigate\n        replace\n        state={{ from: location.pathname + location.search }}\n        to=\"/practice/login\"\n      />\n    )\n  }\n\n  return <Outlet />\n}\n\nfunction ProtectedPracticeContent() {\n  return <p className=\"routing-success-text\">The UI guard allowed this route element.</p>\n}\n\nfunction PracticeLoginPlaceholder() {\n  const location = useLocation()\n  const redirectPath = readRedirectPath(location.state)\n\n  return (\n    <div className=\"routing-result-box\">\n      <p>This is a local UI login placeholder.</p>\n      <p>\n        Intended destination: <code>{redirectPath}</code>\n      </p>\n    </div>\n  )\n}\n\nexport function ProtectedRoutePlaceholder() {\n  const [isAuthenticated, setIsAuthenticated] = useState(false)\n\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">10 / UI access boundary</p>\n      <h2>A protected route placeholder is not backend authorization</h2>\n      <label className=\"routing-toggle-row\">\n        <input\n          checked={isAuthenticated}\n          onChange={(event) => setIsAuthenticated(event.currentTarget.checked)}\n          type=\"checkbox\"\n        />\n        <span>Local auth placeholder</span>\n      </label>\n      <div className=\"routing-practice-actions\">\n        <Link to=\"/practice/protected\">Open protected practice route</Link>\n        <Link to=\"/practice/login\">Open login placeholder</Link>\n      </div>\n      <Routes>\n        <Route element={<ProtectedPracticeRoute isAuthenticated={isAuthenticated} />}>\n          <Route element={<ProtectedPracticeContent />} path=\"/practice/protected\" />\n        </Route>\n        <Route element={<PracticeLoginPlaceholder />} path=\"/practice/login\" />\n      </Routes>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "readRedirectPath"
        },
        {
          "type": "text",
          "value": " accepts unknown and verifies object, property and string step by step. Guard reads the current location; returns Navigate when false and Outlet when true. Practice root local state is just a switchable teaching placeholder. The protected child is nested under the guard route, and the login route is parallel to it."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, object changes and result reasons:"
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
          "value": "Click Protected when auth is not checked, History comes first "
        },
        {
          "type": "inlineCode",
          "value": "/practice/protected"
        },
        {
          "type": "text",
          "value": ", matcher creates guard + child branch; guard render Navigate, router replace is "
        },
        {
          "type": "inlineCode",
          "value": "/practice/login"
        },
        {
          "type": "text",
          "value": " and comes with "
        },
        {
          "type": "inlineCode",
          "value": "{from:'/practice/protected'}"
        },
        {
          "type": "text",
          "value": ". The Login component reads the state from this entry and verifies it. After checking auth, "
        },
        {
          "type": "inlineCode",
          "value": "isAuthenticated"
        },
        {
          "type": "text",
          "value": " state snapshot changes; when navigating again, guard returns to Outlet and child element enters the tree."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by Protected Link; History location, guard prop, Navigate element, redirect location and state object change in sequence; React state cell only saves local boolean; TypeScript checks boolean prop and helper return string, and does not know whether the user is actually logged in. If you only hide Seller NavLink without guard route, manually entering the URL will still display the page; even if guard is complete, direct calls to the API must still allow the server to reject unauthorized requests. The Network response is still successful but the UI is hidden, which is an identifying signal that backend authorization is missing."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "UI guard is presentation/navigation boundary; backend authorization is trust boundary. Location state can save redirect intent, but it is not encoded in the URL and is not suitable as business data that must be persistent; open "
        },
        {
          "type": "inlineCode",
          "value": "/login"
        },
        {
          "type": "text",
          "value": ", the helper must fall back to "
        },
        {
          "type": "inlineCode",
          "value": "/seller"
        },
        {
          "type": "text",
          "value": " or other safe default path."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "Seller routes use placeholder guard, Catalog/Checkout remains public. This chapter does not implement real auth; in the future, the SellerHub backend will still need to authorize seller orders, product mutation and other interfaces. It combines the 8 chapter Context/auth state owner with the route branch."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Guard determines which route element is displayed on the front end; the server determines whether the operation is allowed. The former improves UX, the latter builds security."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-route-changes-component-identity-and-state-reset",
      "children": [
        {
          "type": "text",
          "value": "9.11 Route Changes, Component Identity, and State Reset"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Route param changes do not necessarily uninstall the component. If the matcher still selects the same route element type and it is in the same React tree position, the local state is usually retained; when the business requires each product to have an independent draft, validated "
        },
        {
          "type": "inlineCode",
          "value": "productId"
        },
        {
          "type": "text",
          "value": " as "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ", explicitly change identity and reset state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves the problem of \"why the input box still retains lamp draft after switching from lamp to chair\". The URL changed is not the same as the React component identity changed. Router determines the route element, and React determines whether the state cell is reused based on type, position, and key. These are two consecutive but different mechanisms."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "The new concepts are route element identity, React tree position, and keyed reset. Browser/History changes the productId segment; React Router gives new params to the same route element; React reuses the state cell if it sees the same type/position, and destroys the old identity when the key changes; JavaScript creates new props binding; TypeScript checks productId string; architecture convention determines whether to keep or reset the draft; tooling does not infer business intent."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "There is no new React Router API in this section, the focus is on the boundary between route param and React identity. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is a special property of React and will not be passed into the component as a normal prop. "
        },
        {
          "type": "inlineCode",
          "value": "key={productId}"
        },
        {
          "type": "text",
          "value": " represents different productId corresponding to different named positions; do not add random keys everywhere in order to \"ensure updates\", otherwise the state will be lost every time you render."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/11-route-state-reset/route-param-state-reset.tsx",
      "value": "import { useState } from 'react'\nimport { Link, Route, Routes, useParams } from 'react-router'\n\nfunction ProductDraftEditor({ productId }: { productId: string }) {\n  const [draftTitle, setDraftTitle] = useState(`Draft for ${productId}`)\n\n  return (\n    <div className=\"routing-result-box\">\n      <p>\n        Editor identity: <code>{productId}</code>\n      </p>\n      <label className=\"routing-field\">\n        <span>Local draft title</span>\n        <input\n          onChange={(event) => setDraftTitle(event.currentTarget.value)}\n          value={draftTitle}\n        />\n      </label>\n    </div>\n  )\n}\n\nfunction KeyedProductEditorRoute() {\n  const { productId } = useParams<'productId'>()\n\n  if (!productId) {\n    return <p className=\"routing-error-text\">Missing productId.</p>\n  }\n\n  return <ProductDraftEditor key={productId} productId={productId} />\n}\n\nexport function RouteParamStateReset() {\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">11 / Component identity</p>\n      <h2>A route param can choose whether local state resets</h2>\n      <div className=\"routing-practice-actions\">\n        <Link to=\"/practice/editor/lamp-101\">Edit lamp</Link>\n        <Link to=\"/practice/editor/chair-204\">Edit chair</Link>\n      </div>\n      <Routes>\n        <Route element={<KeyedProductEditorRoute />} path=\"/practice/editor/:productId\" />\n      </Routes>\n      <p className=\"routing-practice-note\">\n        Changing productId changes the key, so React discards the previous editor state cell.\n      </p>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Editor reads the productId of the first mount. Route wrapper first narrows param, and then passes the same string as key and prop at the same time. Links change param; Route still selects "
        },
        {
          "type": "inlineCode",
          "value": "KeyedProductEditorRoute"
        },
        {
          "type": "text",
          "value": ", but its child "
        },
        {
          "type": "inlineCode",
          "value": "ProductDraftEditor"
        },
        {
          "type": "text",
          "value": " key will change. The purpose of separating the wrapper from the editor is to place the identity selection at a clear boundary after getting the param."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, variables and identity changes:"
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
          "value": "is mounted for the first time on the lamp route, the React is key "
        },
        {
          "type": "inlineCode",
          "value": "lamp-101"
        },
        {
          "type": "text",
          "value": " creates editor state cell, the initial title is "
        },
        {
          "type": "inlineCode",
          "value": "Draft for lamp-101"
        },
        {
          "type": "text",
          "value": ". After the user edits, the cell saves the new draft. After navigating chair, location.params changes to chair; wrapper is the same as type/position and continues to exist; child key changes from lamp to chair, React uninstalls the old editor, discards the old cell, and creates title "
        },
        {
          "type": "inlineCode",
          "value": "Draft for chair-204"
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
              "value": "mechanism evidence chain:"
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
          "value": "is triggered by switching Edit link; History entry and params object change; Router still returns the same route element type; React compares the key of child fiber, finds the difference and creates a new identity; JavaScript re-execute "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " initializer; TypeScript only checks the key/prop receiving string and does not determine the reset policy. If you delete the key, the old draft will be retained across productId; in the real project, the title shows chair but the input is still lamp content, which is a signal that the identity is inconsistent with the business entity."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Some states should be retained: for example, seller layout's sidebar collapse in "
        },
        {
          "type": "inlineCode",
          "value": "/seller"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": ". Do not use "
        },
        {
          "type": "inlineCode",
          "value": "key={Math.random()}"
        },
        {
          "type": "text",
          "value": ", it will remount every render. First determine whether the state \"belongs to the route component instance\" or \"belongs to the specific param entity\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "Product editor, conversation, checkout order and other entity-specific drafts often require param-key reset; workspace layout state usually requires preserve. This section directly applies the 8 state in Chapter preserving/resetting, but the trigger source is changed to route param."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Router changes props/params, React determines the identity. Param change itself does not reset; key is an explicit identity policy."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-route-parameters-as-async-request-criteria",
      "children": [
        {
          "type": "text",
          "value": "9.12 Route Parameters as Async Request Criteria"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Route param can become Chapter 9 async request criteria, but URL switching may let the old Promise settle later than the new Promise. Effect must rely on narrowed productId, and abort or ignore obsolete result in cleanup to prevent old product response from overwriting the current route UI."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section solves the race condition when quickly switching from slow lamp route to fast chair route. Router is only responsible for providing the current param and will not automatically cancel the request created by the component itself. Request ownership still belongs to the component/custom hook that initiated the Effect."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "are route-driven criteria, effect closure, AbortController and obsolete result. Browser URL/History provides productId; React Router parses param; React Effect closure captures the render's productId; JavaScript Promise settles asynchronously with timer; browser AbortController Send abort signal; TypeScript checks union action and unknown error; architecture convention makes URL become committed criteria; tooling lint checks dependency array."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "Effect dependency is "
        },
        {
          "type": "inlineCode",
          "value": "[productId]"
        },
        {
          "type": "text",
          "value": ", cleanup calls "
        },
        {
          "type": "inlineCode",
          "value": "controller.abort()"
        },
        {
          "type": "text",
          "value": " and set "
        },
        {
          "type": "inlineCode",
          "value": "ignore=true"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "AbortSignal"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "DOMException"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "setTimeout"
        },
        {
          "type": "text",
          "value": " belongs to the browser platform. Reducer actions "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": " string is the application protocol. When Route param is missing, Effect returns directly without sending a request."
        }
      ]
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
      "label": "src/learning/react/chapter-10-routing-url-state/12-route-params-async-criteria/route-param-async-criteria.tsx",
      "value": "import { useEffect, useReducer } from 'react'\nimport { Link, Route, Routes, useParams } from 'react-router'\n\ntype ProductRequestState =\n  | { status: 'idle' }\n  | { status: 'pending'; productId: string }\n  | { status: 'success'; productId: string; summary: string }\n  | { status: 'error'; productId: string; message: string }\n\ntype ProductRequestAction =\n  | { type: 'request'; productId: string }\n  | { type: 'resolve'; productId: string; summary: string }\n  | { type: 'reject'; productId: string; message: string }\n\nfunction assertNever(action: never): never {\n  throw new Error(`Unhandled product request action: ${JSON.stringify(action)}`)\n}\n\nfunction productRequestReducer(\n  _state: ProductRequestState,\n  action: ProductRequestAction,\n): ProductRequestState {\n  switch (action.type) {\n    case 'request':\n      return { status: 'pending', productId: action.productId }\n    case 'resolve':\n      return { status: 'success', productId: action.productId, summary: action.summary }\n    case 'reject':\n      return { status: 'error', productId: action.productId, message: action.message }\n    default:\n      return assertNever(action)\n  }\n}\n\nfunction requestProductSummary(productId: string, signal: AbortSignal): Promise<string> {\n  return new Promise((resolve, reject) => {\n    const timerId = window.setTimeout(() => {\n      resolve(`Loaded async criteria for ${productId}`)\n    }, productId === 'lamp-101' ? 700 : 300)\n\n    signal.addEventListener(\n      'abort',\n      () => {\n        window.clearTimeout(timerId)\n        reject(new DOMException('Request aborted', 'AbortError'))\n      },\n      { once: true },\n    )\n  })\n}\n\nfunction AsyncProductCriteriaResult() {\n  const { productId } = useParams<'productId'>()\n  const [requestState, dispatch] = useReducer(productRequestReducer, { status: 'idle' })\n\n  useEffect(() => {\n    if (!productId) {\n      return\n    }\n\n    const controller = new AbortController()\n    let ignore = false\n\n    dispatch({ type: 'request', productId })\n\n    void requestProductSummary(productId, controller.signal)\n      .then((summary) => {\n        if (!ignore) {\n          dispatch({ type: 'resolve', productId, summary })\n        }\n      })\n      .catch((error: unknown) => {\n        if (!ignore && !(error instanceof DOMException && error.name === 'AbortError')) {\n          dispatch({\n            type: 'reject',\n            productId,\n            message: error instanceof Error ? error.message : 'Unknown request failure',\n          })\n        }\n      })\n\n    return () => {\n      ignore = true\n      controller.abort()\n    }\n  }, [productId])\n\n  if (!productId) {\n    return <p className=\"routing-error-text\">Missing productId request criterion.</p>\n  }\n\n  if (requestState.status === 'pending') {\n    return <p>Loading {requestState.productId}...</p>\n  }\n\n  if (requestState.status === 'success') {\n    return <p className=\"routing-success-text\">{requestState.summary}</p>\n  }\n\n  if (requestState.status === 'error') {\n    return <p className=\"routing-error-text\">{requestState.message}</p>\n  }\n\n  return <p>Select a product route.</p>\n}\n\nexport function RouteParamAsyncCriteria() {\n  return (\n    <article className=\"routing-practice-panel\">\n      <p className=\"routing-practice-kicker\">12 / Async route criteria</p>\n      <h2>Route params can drive an abortable request lifecycle</h2>\n      <div className=\"routing-practice-actions\">\n        <Link to=\"/practice/async/lamp-101\">Load lamp slowly</Link>\n        <Link to=\"/practice/async/chair-204\">Load chair quickly</Link>\n      </div>\n      <Routes>\n        <Route element={<AsyncProductCriteriaResult />} path=\"/practice/async/:productId\" />\n      </Routes>\n    </article>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Discriminated state/action unions prohibit contradictory flags. Reducer only calculates transition; all known "
        },
        {
          "type": "inlineCode",
          "value": "action.type"
        },
        {
          "type": "text",
          "value": " is processed, the action in the default branch must be narrowed to "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": ". When adding an action but missing a case in the future, "
        },
        {
          "type": "inlineCode",
          "value": "assertNever(action)"
        },
        {
          "type": "text",
          "value": " will generate a TypeScript error instead of silently returning to the old state. Mock request receives productId and signal, and makes the lamp slower than the chair. Route component reads param; Effect creates controller/ignore binding for the snapshot, dispatches pending, and then processes Promise. Cleanup simultaneously blocks handler dispatch and stops browser timer. Render branches only read reducer state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow, closure and request changes:"
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
          "value": "navigation lamp, Effect A captures "
        },
        {
          "type": "inlineCode",
          "value": "'lamp-101'"
        },
        {
          "type": "text",
          "value": ", request A plan 700ms. Navigate chair immediately, React runs A cleanup first: "
        },
        {
          "type": "inlineCode",
          "value": "ignoreA=true"
        },
        {
          "type": "text",
          "value": ", signalA aborted; then Effect B captures "
        },
        {
          "type": "inlineCode",
          "value": "'chair-204'"
        },
        {
          "type": "text",
          "value": " and plan 300ms. B dispatch success after resolve; A Even if an external transport cannot really be canceled, then/catch will no longer submit the old result due to ignore."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is triggered by dynamic Link; History and params change; React cleanup old effect closure before starting new closure when dependency changes; JavaScript Promise settlement and browser abort signal run independently; reducer state cell changes from idle -> pending chair -> success chair; TypeScript checks action payload, but does not cancel it Promise. If dependency array is "
        },
        {
          "type": "inlineCode",
          "value": "[]"
        },
        {
          "type": "text",
          "value": " or cleanup is missing, the URL displays chair and the UI finally displays lamp; this \"pathname criteria is inconsistent with the rendered entity ID\" is a race signal."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "If the request is initiated by explicit button, it can be left in the event handler; here the request must be synchronized with the committed route param, so the Effect is reasonable. Abort can save resources, and ignore prevents the submission of results that cannot be canceled or settled; the two can be combined rather than replacing each other."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
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
          "value": "ProductDetailPage uses productId to request products; Catalog search params can form product-list criteria; Seller Orders status can form order-list criteria. This section directly reuses Chapter 7 Effect cleanup and Chapter 9 async lifecycle."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Route param is committed criteria; each Effect closure only represents one criteria snapshot; criteria changes first clean up the old synchronization, and then allow new results to update the current UI."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-sellerhub-route-architecture",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping SellerHub Route Architecture"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub route architecture should express resources and layout ownership first, and then connect local state, Context and async data. The URL is responsible for \"which resource/filter view the user is in\", the route tree is responsible for \"which layout/page owners exist\", and the React state is responsible for \"the temporary interaction data of these owners\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Problems solved in this section and technical significance:"
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
          "value": "This section maps the previous 12 section into a route tree that can be discussed but is not equal to a complete product. It prevents arbitrarily spelling paths based on page files, and prevents all filters from being placed in Context, all drafts from being placed in URLs, and UI guard being used as a security system."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords, hierarchical boundaries and underlying mechanisms:"
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
          "value": "There are no new APIs in this section, the focus is on URL state and route architecture boundaries. Browser/History provides recoverable navigation; React Router provides branch/layout/params; React maintains identities by branch; JavaScript executes parser, guards and requests; TypeScript constrains route-adjacent values; architecture convention definition public/private, layout owner and trust boundary; Vite/host is responsible for bundle and SPA document fallback."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "API / Grammar rules and fixed names:"
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
          "value": "This section reuses "
        },
        {
          "type": "inlineCode",
          "value": "Route"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Outlet"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "NavLink"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useParams"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useSearchParams"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useNavigate"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Navigate"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ". The fixed URL protocol is a project convention: "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/catalog/:productId"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/seller"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/checkout"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/login"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "*"
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
              "value": "SellerHub Mapping table:"
            }
          ]
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
            "value": "Route"
          }
        ],
        [
          {
            "type": "text",
            "value": "Owner / Element"
          }
        ],
        [
          {
            "type": "text",
            "value": "State boundary"
          }
        ],
        [
          {
            "type": "text",
            "value": "Follow-up connection"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "/catalog?category=lighting&q=lamp"
            }
          ],
          [
            {
              "type": "text",
              "value": "CatalogPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "category/q belongs to URL; you can enter draft first local"
            }
          ],
          [
            {
              "type": "text",
              "value": "product-list async criteria"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "/catalog/:productId"
            }
          ],
          [
            {
              "type": "text",
              "value": "ProductDetailPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "productId is string param; resource is async state"
            }
          ],
          [
            {
              "type": "text",
              "value": "abort, runtime validation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "/seller"
            }
          ],
          [
            {
              "type": "text",
              "value": "Protected UI guard + SellerDashboardLayout"
            }
          ],
          [
            {
              "type": "text",
              "value": "auth placeholder does not belong to URL"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real backend authorization"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "/seller/orders?status=pending"
            }
          ],
          [
            {
              "type": "text",
              "value": "SellerOrdersPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "status belongs to URL"
            }
          ],
          [
            {
              "type": "text",
              "value": "order-list async criteria"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "/checkout?step=review"
            }
          ],
          [
            {
              "type": "text",
              "value": "CheckoutPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "step can be URL; shipping note is private local draft"
            }
          ],
          [
            {
              "type": "text",
              "value": "form submission"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "/login"
            }
          ],
          [
            {
              "type": "text",
              "value": "LoginPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "redirect intent available location.state + fallback"
            }
          ],
          [
            {
              "type": "text",
              "value": "auth service"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "*"
            }
          ],
          [
            {
              "type": "text",
              "value": "NotFoundPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "requested pathname from location"
            }
          ],
          [
            {
              "type": "text",
              "value": "host SPA fallback"
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "execution flow and value changes:"
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
          "value": "user clicks product from catalog: History adds product detail entry from search URL; matcher is cut from Catalog leaf to ProductDetail leaf; root layout is retained and product route param is created; ProductDetail Effect uses param as criteria. The user enters Seller Orders: guard checks auth placeholder, seller layout enters branch, and Outlet renders Orders; when status search changes, layout identity is retained and only orders criteria are updated."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "to "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders?status=pending"
        },
        {
          "type": "text",
          "value": " is evidence: Link/NavLink generates navigation intent, History entry saves pathname/search, Router branch is workspace layout -> guard -> seller layout -> orders, React retains the tree positions of two layouts, and Orders parser puts raw "
        },
        {
          "type": "inlineCode",
          "value": "'pending'"
        },
        {
          "type": "text",
          "value": " is narrowed to domain status, TypeScript does not verify the address bar, and future request hooks will use parsed status. If status is placed in Context, copying URL/Back cannot be restored; if only nav is hidden without server authorization, the API is still exposed. Real projects can locate errors by comparing URL, React tree, Network criteria and server response."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error rules and identification methods:"
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
          "value": "Route tree is not a backend route table, nor is it a database schema. Don't serialize checkout drafts, auth tokens, or full product objects into URLs just to \"look consistent\"; and don't use location.state instead of shareable productId. During Architecture review, check: whether the URL can be interpreted, whether the owner is single, whether the layout has an outlet, whether the guard is clearly marked as UI boundary, and whether the async criteria can be cancelled."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the current main line of learning:"
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
          "value": "Chapter 3 props connection route elements; Chapter 4 events driver navigation; Chapter 5 renderstate branches; Chapter 6 local form draft; Chapter Chapter 7 effect cleanup; Chapter 8 owner/reducer/context/custom hook; Chapter 9 request lifecycle; This chapter binds these mechanisms to the location and route tree."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub is the public navigation state, the route tree is the UI ownership map, the React state is the branch internal interaction state, the async layer consumes verified URL criteria, and the backend is the permission security boundary."
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
            "value": "Layer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Signature / Fixed names"
          }
        ],
        [
          {
            "type": "text",
            "value": "Purpose of this chapter"
          }
        ],
        [
          {
            "type": "text",
            "value": "Common Mistake"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "BrowserRouter"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "basename"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "children"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "window"
            }
          ],
          [
            {
              "type": "text",
              "value": "reads browser history/location and provides router context"
            }
          ],
          [
            {
              "type": "text",
              "value": "is nested with another Router"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Routes"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "children"
            },
            {
              "type": "text",
              "value": ", optional "
            },
            {
              "type": "inlineCode",
              "value": "location"
            }
          ],
          [
            {
              "type": "text",
              "value": "is calculated from Route elements branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it was just a normal conditional wrapper"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Route"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "path"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "element"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "index"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "children"
            }
          ],
          [
            {
              "type": "text",
              "value": "Definition pattern and element ownership"
            }
          ],
          [
            {
              "type": "text",
              "value": "index route then declares children"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Link"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router + anchor"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "to"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "replace"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "state"
            }
          ],
          [
            {
              "type": "text",
              "value": "declarative destination"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use button instead of ordinary link"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "NavLink"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router + anchor"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "to"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "end"
            },
            {
              "type": "text",
              "value": ", callback props"
            }
          ],
          [
            {
              "type": "text",
              "value": "destination + active state"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not understand descendant active matching"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "context?"
            }
          ],
          [
            {
              "type": "text",
              "value": "render matched child element"
            }
          ],
          [
            {
              "type": "text",
              "value": "parent layout is missing Outlet"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useLocation"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "(): Location"
            }
          ],
          [
            {
              "type": "text",
              "value": "read pathname/search/state/key"
            }
          ],
          [
            {
              "type": "text",
              "value": "Treat location object as a normal mutable object"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useParams"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "<K extends string>(): Readonly<Params<K>>"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read dynamic segments"
            }
          ],
          [
            {
              "type": "text",
              "value": "assertion replaces runtime validation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useSearchParams"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router + URLSearchParams"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "(): [URLSearchParams, SetURLSearchParams]"
            }
          ],
          [
            {
              "type": "text",
              "value": "read/update query strings"
            }
          ],
          [
            {
              "type": "text",
              "value": "Treat the setter as local state setter"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useNavigate"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "(to, options?)"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "(delta)"
            }
          ],
          [
            {
              "type": "text",
              "value": "event/process-driven navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Called in render"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Navigate"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "to"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "replace"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "state"
            }
          ],
          [
            {
              "type": "text",
              "value": "declarative redirect element"
            }
          ],
          [
            {
              "type": "text",
              "value": "as security boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "matchRoutes"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "`(routes, location) => matches"
            }
          ],
          [
            {
              "type": "text",
              "value": "null`"
            }
          ],
          [
            {
              "type": "text",
              "value": "Observation route branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "treats entity not found as no route match"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "history.pushState"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser History API"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "(state, unused, url?)"
            }
          ],
          [
            {
              "type": "text",
              "value": "router client navigation platform foundation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Forgot to synchronize the application after direct operation UI"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "URLSearchParams"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser URL API"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "get"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "set"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "delete"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "toString"
            }
          ],
          [
            {
              "type": "text",
              "value": "parsing/serialization query"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes the full URL directly to constructor"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "key"
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
              "value": "special JSX attribute"
            }
          ],
          [
            {
              "type": "text",
              "value": "Press param explicit reset identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "random key causes remount"
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
            "value": "Type"
          }
        ],
        [
          {
            "type": "text",
            "value": "Violated Rule"
          }
        ],
        [
          {
            "type": "text",
            "value": "Correction"
          }
        ],
        [
          {
            "type": "text",
            "value": "How to Recognize Later"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "internal route uses normal "
            },
            {
              "type": "inlineCode",
              "value": "<a href>"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser/runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "document navigation will end the current runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses Link/NavLink"
            }
          ],
          [
            {
              "type": "text",
              "value": "Network A new document appears, and the state is completely lost after the request"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thinks that the URL only changes the display text"
            }
          ],
          [
            {
              "type": "text",
              "value": "Router architecture"
            }
          ],
          [
            {
              "type": "text",
              "value": "location is matcher input"
            }
          ],
          [
            {
              "type": "text",
              "value": "checks matches with route branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "address change is accompanied by component tree change"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "directly asserts "
            },
            {
              "type": "inlineCode",
              "value": "productId as string"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type/runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "assertion does not do runtime validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "missing check + domain parser"
            }
          ],
          [
            {
              "type": "text",
              "value": "Manual URL generated undefined/invalid request"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Write complex object into query"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL architecture"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL should be stable, readable and shareable"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only save ID/small criteria"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL is too long, version migration is difficult, and information leaks"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "can be shared filter only local state"
            }
          ],
          [
            {
              "type": "text",
              "value": "State owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "local state does not participate history/share"
            }
          ],
          [
            {
              "type": "text",
              "value": "use search params"
            }
          ],
          [
            {
              "type": "text",
              "value": ""
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Private draft put URL"
            }
          ],
          [
            {
              "type": "text",
              "value": "Privacy/architecture"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL is the public string boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "use local/form state"
            }
          ],
          [
            {
              "type": "text",
              "value": "draft appears in the address bar, blog or shared link"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "relies on location.state as persistent data"
            }
          ],
          [
            {
              "type": "text",
              "value": "History architecture"
            }
          ],
          [
            {
              "type": "text",
              "value": "entry state is not equal to URL/durable store"
            }
          ],
          [
            {
              "type": "text",
              "value": "The receiving end provides fallback; important values enter URL/store"
            }
          ],
          [
            {
              "type": "text",
              "value": "New tabs, direct URLs, or new sessions cannot be restored"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Call navigate in render"
            }
          ],
          [
            {
              "type": "text",
              "value": "React purity"
            }
          ],
          [
            {
              "type": "text",
              "value": "render should not modify external history"
            }
          ],
          [
            {
              "type": "text",
              "value": "moves to the correct trigger point"
            }
          ],
          [
            {
              "type": "text",
              "value": "redirect loop, repeated entries, flashing"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "nested parent No Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "Router rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "child branch requires render slot"
            }
          ],
          [
            {
              "type": "text",
              "value": "put Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL/match is correct but child does not display"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "fallback misplaced subtree"
            }
          ],
          [
            {
              "type": "text",
              "value": "Route matching"
            }
          ],
          [
            {
              "type": "text",
              "value": "splat only takes effect in its route scope"
            }
          ],
          [
            {
              "type": "text",
              "value": "places "
            },
            {
              "type": "inlineCode",
              "value": "*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Some unknown paths fallback, some are blank"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Treat UI guard as real permission security"
            }
          ],
          [
            {
              "type": "text",
              "value": "Security boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "client code is not a trusted execution environment"
            }
          ],
          [
            {
              "type": "text",
              "value": "Backend per request authorize"
            }
          ],
          [
            {
              "type": "text",
              "value": "Direct API call is still successful"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "param changed draft unexpectedly retained"
            }
          ],
          [
            {
              "type": "text",
              "value": "React identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "same type/position will preserve state"
            }
          ],
          [
            {
              "type": "text",
              "value": "By entity use stable key"
            }
          ],
          [
            {
              "type": "text",
              "value": "The title and draft belong to different entities"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "param request None cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Async effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "obsolete closure can still submit results"
            }
          ],
          [
            {
              "type": "text",
              "value": "abort + ignore + correct dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL is inconsistent with the final resource ID"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "is saved with Context route/filter state"
            }
          ],
          [
            {
              "type": "text",
              "value": "State owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context has no URL/history semantics"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL As owner, Context only shares other values"
            }
          ],
          [
            {
              "type": "text",
              "value": "Back does not update filter, refresh and lose condition"
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
          "value": "SellerHub Routing Workspace"
        },
        {
          "type": "text",
          "value": " uses a Declarative route tree to connect public catalog, dynamic product detail, protected seller layout, seller order status URL state, checkout event navigation, login redirect intent and not-found fallback. It uses local mock request/auth, which only verifies the routing architecture and does not implement the complete SellerHub."
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
      "value": "src/learning/react/chapter-10-routing-url-state/\n  sellerhub-routing-workspace/\n    sellerhub-catalog-data.ts\n    sellerhub-product-request.ts\n    sellerhub-workspace-layout.tsx\n    sellerhub-catalog-page.tsx\n    sellerhub-product-detail-page.tsx\n    sellerhub-seller-layout.tsx\n    sellerhub-orders-page.tsx\n    sellerhub-checkout-page.tsx\n    sellerhub-login-page.tsx\n    sellerhub-protected-route.tsx\n    sellerhub-not-found-page.tsx\n    sellerhub-routing-workspace.tsx"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "123-file-responsibility",
      "children": [
        {
          "type": "text",
          "value": "12.3 File Responsibility"
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
            "value": "Responsibility"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-catalog-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines domain unions, products and order counts."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-product-request.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides a local request that receives productId/AbortSignal and returns unknown."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-workspace-layout.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "has global navigation and root Outlet."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-catalog-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "parses category/query search params into visible products."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-product-detail-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "narrow route param, execute abortable request, verify unknown response."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-seller-layout.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "has seller sidebar and nested Outlet."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-orders-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "models order status as URL state."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-checkout-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Separate step URL state from private local draft, and navigate after the event."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-login-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Verify redirect location state and complete local login flow."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-protected-route.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides front-end UI guard and login redirect."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-not-found-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "displays unmatched pathname and recovery link."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-routing-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "has auth placeholder and complete route tree."
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "124-complete-code",
      "children": [
        {
          "type": "text",
          "value": "12.4 Complete code"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-catalog-data.ts",
      "value": "export type SellerHubCategory = 'all' | 'lighting' | 'office'\n\nexport type SellerHubProduct = {\n  id: string\n  name: string\n  category: Exclude<SellerHubCategory, 'all'>\n  price: number\n}\n\nexport type SellerOrderStatus = 'all' | 'pending' | 'shipped'\n\nexport const sellerHubProducts: SellerHubProduct[] = [\n  { id: 'lamp-101', name: 'Arc Desk Lamp', category: 'lighting', price: 89 },\n  { id: 'chair-204', name: 'Mesh Task Chair', category: 'office', price: 249 },\n  { id: 'light-305', name: 'Studio Floor Light', category: 'lighting', price: 139 },\n]\n\nexport const sellerOrderCounts: Record<Exclude<SellerOrderStatus, 'all'>, number> = {\n  pending: 4,\n  shipped: 11,\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This file only defines reusable domain values and does not read the router. "
        },
        {
          "type": "inlineCode",
          "value": "all"
        },
        {
          "type": "text",
          "value": " is a UI filter, not a product category, so the product type uses "
        },
        {
          "type": "inlineCode",
          "value": "Exclude"
        },
        {
          "type": "text",
          "value": " removes it; TypeScript checks object literals, browser runtime only gets plain arrays/objects."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-product-request.ts",
      "value": "import { sellerHubProducts } from './sellerhub-catalog-data'\n\nexport function requestSellerHubProduct(productId: string, signal: AbortSignal): Promise<unknown> {\n  return new Promise((resolve, reject) => {\n    const timerId = window.setTimeout(() => {\n      const product = sellerHubProducts.find((candidate) => candidate.id === productId)\n      resolve(product ?? { error: 'Product not found' })\n    }, productId === 'lamp-101' ? 650 : 350)\n\n    signal.addEventListener(\n      'abort',\n      () => {\n        window.clearTimeout(timerId)\n        reject(new DOMException('Request aborted', 'AbortError'))\n      },\n      { once: true },\n    )\n  })\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "request function looks for local data according to the incoming criteria and intentionally returns "
        },
        {
          "type": "inlineCode",
          "value": "Promise<unknown>"
        },
        {
          "type": "text",
          "value": ", forces the consumer to verify the response at runtime. AbortSignal listener clears timer and rejects AbortError; it simulates request lifecycle and does not pretend to be a real backend."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-workspace-layout.tsx",
      "value": "import { NavLink, Outlet } from 'react-router'\n\ntype SellerHubWorkspaceLayoutProps = {\n  isSellerAuthenticated: boolean\n}\n\nfunction workspaceLinkClassName({ isActive }: { isActive: boolean }): string {\n  return isActive ? 'sellerhub-nav-link sellerhub-nav-link-active' : 'sellerhub-nav-link'\n}\n\nexport function SellerHubWorkspaceLayout({\n  isSellerAuthenticated,\n}: SellerHubWorkspaceLayoutProps) {\n  return (\n    <section aria-labelledby=\"sellerhub-workspace-title\" className=\"sellerhub-workspace\">\n      <header className=\"sellerhub-workspace-header\">\n        <div>\n          <p className=\"routing-practice-kicker\">Final project</p>\n          <h2 id=\"sellerhub-workspace-title\">SellerHub Routing Workspace</h2>\n        </div>\n        <span className=\"sellerhub-auth-status\">\n          {isSellerAuthenticated ? 'Seller session placeholder: active' : 'Seller session placeholder: off'}\n        </span>\n      </header>\n      <nav aria-label=\"SellerHub workspace\" className=\"sellerhub-main-nav\">\n        <NavLink className={workspaceLinkClassName} to=\"/catalog\">\n          Catalog\n        </NavLink>\n        <NavLink className={workspaceLinkClassName} to=\"/seller\">\n          Seller\n        </NavLink>\n        <NavLink className={workspaceLinkClassName} to=\"/checkout\">\n          Checkout\n        </NavLink>\n        <NavLink className={workspaceLinkClassName} to=\"/login\">\n          Login\n        </NavLink>\n      </nav>\n      <div className=\"sellerhub-route-stage\">\n        <Outlet />\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Root layout does not know the specific child page, it only has workspace header, NavLinks and Outlet. Auth boolean is only used to display placeholder state; route security is not determined by this text. When the Location changes, NavLink callbacks recalculate the active class, and the Outlet receives the new child element."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-catalog-page.tsx",
      "value": "import { Link, useSearchParams } from 'react-router'\nimport { sellerHubProducts } from './sellerhub-catalog-data'\nimport type { SellerHubCategory } from './sellerhub-catalog-data'\n\nconst sellerHubCategories: SellerHubCategory[] = ['all', 'lighting', 'office']\n\nfunction parseCategory(value: string | null): SellerHubCategory {\n  return sellerHubCategories.includes(value as SellerHubCategory)\n    ? (value as SellerHubCategory)\n    : 'all'\n}\n\nexport function SellerHubCatalogPage() {\n  const [searchParams, setSearchParams] = useSearchParams()\n  const category = parseCategory(searchParams.get('category'))\n  const searchQuery = searchParams.get('q')?.trim().toLowerCase() ?? ''\n  const visibleProducts = sellerHubProducts.filter((product) => {\n    const matchesCategory = category === 'all' || product.category === category\n    const matchesQuery = product.name.toLowerCase().includes(searchQuery)\n    return matchesCategory && matchesQuery\n  })\n\n  function updateSearchParam(name: 'category' | 'q', value: string): void {\n    const nextParams = new URLSearchParams(searchParams)\n\n    if (!value || value === 'all') {\n      nextParams.delete(name)\n    } else {\n      nextParams.set(name, value)\n    }\n\n    setSearchParams(nextParams)\n  }\n\n  return (\n    <section>\n      <div className=\"sellerhub-page-heading\">\n        <div>\n          <p>Public route</p>\n          <h3>Catalog</h3>\n        </div>\n        <code>/catalog?category={category}&amp;q={searchQuery || '...'}</code>\n      </div>\n      <div className=\"sellerhub-filter-row\">\n        <label className=\"routing-field\">\n          <span>Category URL state</span>\n          <select\n            onChange={(event) => updateSearchParam('category', event.currentTarget.value)}\n            value={category}\n          >\n            {sellerHubCategories.map((option) => (\n              <option key={option} value={option}>\n                {option}\n              </option>\n            ))}\n          </select>\n        </label>\n        <label className=\"routing-field\">\n          <span>Search URL state</span>\n          <input\n            onChange={(event) => updateSearchParam('q', event.currentTarget.value)}\n            placeholder=\"Search products\"\n            value={searchParams.get('q') ?? ''}\n          />\n        </label>\n      </div>\n      <div className=\"sellerhub-product-grid\">\n        {visibleProducts.map((product) => (\n          <article className=\"sellerhub-product-card\" key={product.id}>\n            <span>{product.category}</span>\n            <h4>{product.name}</h4>\n            <p>${product.price}</p>\n            <Link to={`/catalog/${product.id}`}>View product route</Link>\n          </article>\n        ))}\n      </div>\n      {visibleProducts.length === 0 && <p>No products match the URL criteria.</p>}\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Catalog parse raw category to union, normalize q to lowercase, and derive visible products from source array. The update function copies the current URL SearchParams to avoid category and q overwriting each other when updating; the default value is deleted to maintain the canonical URL. Product card Link Put the stable domain ID into path."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-product-detail-page.tsx",
      "value": "import { useEffect, useReducer } from 'react'\nimport { Link, useParams } from 'react-router'\nimport { requestSellerHubProduct } from './sellerhub-product-request'\nimport type { SellerHubProduct } from './sellerhub-catalog-data'\n\ntype ProductDetailState =\n  | { status: 'pending'; productId: string }\n  | { status: 'success'; product: SellerHubProduct }\n  | { status: 'error'; message: string }\n\ntype ProductDetailAction =\n  | { type: 'request'; productId: string }\n  | { type: 'resolve'; product: SellerHubProduct }\n  | { type: 'reject'; message: string }\n\nfunction assertNever(action: never): never {\n  throw new Error(`Unhandled product detail action: ${JSON.stringify(action)}`)\n}\n\nfunction productDetailReducer(\n  _state: ProductDetailState,\n  action: ProductDetailAction,\n): ProductDetailState {\n  switch (action.type) {\n    case 'request':\n      return { status: 'pending', productId: action.productId }\n    case 'resolve':\n      return { status: 'success', product: action.product }\n    case 'reject':\n      return { status: 'error', message: action.message }\n    default:\n      return assertNever(action)\n  }\n}\n\nfunction isSellerHubProduct(value: unknown): value is SellerHubProduct {\n  if (typeof value !== 'object' || value === null) {\n    return false\n  }\n\n  const candidate = value as Record<string, unknown>\n\n  return (\n    typeof candidate.id === 'string' &&\n    typeof candidate.name === 'string' &&\n    (candidate.category === 'lighting' || candidate.category === 'office') &&\n    typeof candidate.price === 'number'\n  )\n}\n\nfunction SellerHubProductResource({ productId }: { productId: string }) {\n  const [resourceState, dispatch] = useReducer(productDetailReducer, {\n    status: 'pending',\n    productId,\n  })\n\n  useEffect(() => {\n    const controller = new AbortController()\n    let ignore = false\n\n    dispatch({ type: 'request', productId })\n\n    void requestSellerHubProduct(productId, controller.signal)\n      .then((value) => {\n        if (ignore) {\n          return\n        }\n\n        if (isSellerHubProduct(value)) {\n          dispatch({ type: 'resolve', product: value })\n        } else {\n          dispatch({ type: 'reject', message: 'Product response failed runtime validation.' })\n        }\n      })\n      .catch((error: unknown) => {\n        if (!ignore && !(error instanceof DOMException && error.name === 'AbortError')) {\n          dispatch({\n            type: 'reject',\n            message: error instanceof Error ? error.message : 'Unknown product request failure.',\n          })\n        }\n      })\n\n    return () => {\n      ignore = true\n      controller.abort()\n    }\n  }, [productId])\n\n  if (resourceState.status === 'pending') {\n    return <p>Loading product {resourceState.productId}...</p>\n  }\n\n  if (resourceState.status === 'error') {\n    return <p className=\"routing-error-text\">{resourceState.message}</p>\n  }\n\n  return (\n    <article className=\"sellerhub-detail-card\">\n      <span>{resourceState.product.category}</span>\n      <h3>{resourceState.product.name}</h3>\n      <p>${resourceState.product.price}</p>\n      <Link to=\"/checkout\">Continue to checkout</Link>\n    </article>\n  )\n}\n\nexport function SellerHubProductDetailPage() {\n  const { productId } = useParams<'productId'>()\n\n  if (!productId) {\n    return <p className=\"routing-error-text\">The route did not provide productId.</p>\n  }\n\n  return (\n    <section>\n      <div className=\"sellerhub-page-heading\">\n        <div>\n          <p>Dynamic route and async criteria</p>\n          <h3>Product detail</h3>\n        </div>\n        <code>/catalog/{productId}</code>\n      </div>\n      <SellerHubProductResource key={productId} productId={productId} />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Route wrapper first narrows the param, and then uses the same value as key/prop. Resource reducer manages the life cycle and uses "
        },
        {
          "type": "inlineCode",
          "value": "assertNever(action)"
        },
        {
          "type": "text",
          "value": " ensures that when action union adds new members, cases must be added simultaneously; Effect creates a controller for each product snapshot; unknown response passes through type guard first. When quickly switching products, cleanup makes the old closure uncommitable. Chapter 8 identity and Chapter 9 async lifecycle are integrated here."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-seller-layout.tsx",
      "value": "import { NavLink, Outlet } from 'react-router'\n\nfunction sellerLinkClassName({ isActive }: { isActive: boolean }): string {\n  return isActive ? 'sellerhub-subnav-link sellerhub-subnav-link-active' : 'sellerhub-subnav-link'\n}\n\nexport function SellerHubSellerLayout() {\n  return (\n    <section className=\"sellerhub-seller-layout\">\n      <aside>\n        <p>Protected UI placeholder</p>\n        <nav aria-label=\"Seller dashboard\">\n          <NavLink className={sellerLinkClassName} end to=\"/seller\">\n            Dashboard\n          </NavLink>\n          <NavLink className={sellerLinkClassName} to=\"/seller/orders\">\n            Orders\n          </NavLink>\n        </nav>\n      </aside>\n      <div className=\"sellerhub-seller-content\">\n        <Outlet />\n      </div>\n    </section>\n  )\n}\n\nexport function SellerHubDashboardHome() {\n  return (\n    <div>\n      <p>Nested index route</p>\n      <h3>Seller dashboard</h3>\n      <p>The seller layout remains mounted while its Outlet changes.</p>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Seller layout is the second layer owner: sidebar maintains position in Dashboard/Orders switch, Outlet subtree changes. Dashboard uses "
        },
        {
          "type": "inlineCode",
          "value": "end"
        },
        {
          "type": "text",
          "value": ", so enter "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": " will not be highlighted at the same time as Orders."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-orders-page.tsx",
      "value": "import { useSearchParams } from 'react-router'\nimport { sellerOrderCounts } from './sellerhub-catalog-data'\nimport type { SellerOrderStatus } from './sellerhub-catalog-data'\n\nconst sellerOrderStatuses: SellerOrderStatus[] = ['all', 'pending', 'shipped']\n\nfunction parseSellerOrderStatus(value: string | null): SellerOrderStatus {\n  return sellerOrderStatuses.includes(value as SellerOrderStatus)\n    ? (value as SellerOrderStatus)\n    : 'all'\n}\n\nexport function SellerHubOrdersPage() {\n  const [searchParams, setSearchParams] = useSearchParams()\n  const status = parseSellerOrderStatus(searchParams.get('status'))\n  const visibleCount =\n    status === 'all' ? sellerOrderCounts.pending + sellerOrderCounts.shipped : sellerOrderCounts[status]\n\n  function selectStatus(nextStatus: SellerOrderStatus): void {\n    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })\n  }\n\n  return (\n    <section>\n      <div className=\"sellerhub-page-heading\">\n        <div>\n          <p>Nested route with URL filter</p>\n          <h3>Seller orders</h3>\n        </div>\n        <code>/seller/orders?status={status}</code>\n      </div>\n      <div className=\"routing-segmented-control\" role=\"group\" aria-label=\"Seller order status\">\n        {sellerOrderStatuses.map((option) => (\n          <button\n            aria-pressed={status === option}\n            key={option}\n            onClick={() => selectStatus(option)}\n            type=\"button\"\n          >\n            {option}\n          </button>\n        ))}\n      </div>\n      <p className=\"sellerhub-order-count\">{visibleCount} orders match the current URL state.</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Orders parser narrows any query string into three states, and then derives visibleCount from counts. Changing status updates history/search without modifying the seller layout identity; real requests in the future can directly consume the parsed status instead of copying it to the Context."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-checkout-page.tsx",
      "value": "import { useState } from 'react'\nimport { useLocation, useNavigate, useSearchParams } from 'react-router'\n\ntype CheckoutStep = 'shipping' | 'review'\n\nfunction parseCheckoutStep(value: string | null): CheckoutStep {\n  return value === 'review' ? 'review' : 'shipping'\n}\n\nexport function SellerHubCheckoutPage() {\n  const [searchParams] = useSearchParams()\n  const [shippingNote, setShippingNote] = useState('')\n  const navigate = useNavigate()\n  const location = useLocation()\n  const step = parseCheckoutStep(searchParams.get('step'))\n\n  function continueToReview(): void {\n    navigate('/checkout?step=review', { state: location.state })\n  }\n\n  function placeLocalOrder(): void {\n    navigate('/catalog', { replace: true, state: { checkoutComplete: true } })\n  }\n\n  return (\n    <section>\n      <div className=\"sellerhub-page-heading\">\n        <div>\n          <p>URL step and local draft boundary</p>\n          <h3>Checkout</h3>\n        </div>\n        <code>/checkout?step={step}</code>\n      </div>\n      <label className=\"routing-field\">\n        <span>Private shipping note</span>\n        <textarea\n          onChange={(event) => setShippingNote(event.currentTarget.value)}\n          placeholder=\"This local draft is not stored in the URL\"\n          value={shippingNote}\n        />\n      </label>\n      <p>Current step: {step}</p>\n      <div className=\"routing-practice-actions\">\n        {step === 'shipping' ? (\n          <button onClick={continueToReview} type=\"button\">\n            Continue to review\n          </button>\n        ) : (\n          <button onClick={placeLocalOrder} type=\"button\">\n            Place local order\n          </button>\n        )}\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Checkout step is the restorable URL state and the shipping note is the private local draft. Both navigations are in click handlers: Continue push review entry, Place Order replace current checkout entry. Location state is passed through but not the checkout data owner."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-login-page.tsx",
      "value": "import { useLocation, useNavigate } from 'react-router'\n\ntype SellerHubLoginPageProps = {\n  onLogin: () => void\n}\n\ntype LoginLocationState = {\n  from?: string\n}\n\nfunction getRedirectDestination(state: unknown): string {\n  if (\n    typeof state === 'object' &&\n    state !== null &&\n    'from' in state &&\n    typeof (state as LoginLocationState).from === 'string'\n  ) {\n    return (state as LoginLocationState).from ?? '/seller'\n  }\n\n  return '/seller'\n}\n\nexport function SellerHubLoginPage({ onLogin }: SellerHubLoginPageProps) {\n  const location = useLocation()\n  const navigate = useNavigate()\n  const redirectDestination = getRedirectDestination(location.state)\n\n  function completeLocalLogin(): void {\n    onLogin()\n    navigate(redirectDestination, { replace: true })\n  }\n\n  return (\n    <section className=\"sellerhub-login-panel\">\n      <p>Local auth placeholder</p>\n      <h3>Seller login</h3>\n      <p>\n        Redirect destination: <code>{redirectDestination}</code>\n      </p>\n      <button onClick={completeLocalLogin} type=\"button\">\n        Activate local seller session\n      </button>\n      <p className=\"routing-practice-note\">\n        This route changes local UI access only. A backend must still authorize every protected\n        operation.\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Login treats location.state as unknown; guard fails or the user enters directly "
        },
        {
          "type": "inlineCode",
          "value": "/login"
        },
        {
          "type": "text",
          "value": " rollback "
        },
        {
          "type": "inlineCode",
          "value": "/seller"
        },
        {
          "type": "text",
          "value": ". Click handler first updates workspace-owned auth state, and then replaces it to destination. It doesn't create tokens, doesn't call APIs, and doesn't claim to have real authentication."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-protected-route.tsx",
      "value": "import { Navigate, Outlet, useLocation } from 'react-router'\n\ntype SellerHubProtectedRouteProps = {\n  isSellerAuthenticated: boolean\n}\n\nexport function SellerHubProtectedRoute({\n  isSellerAuthenticated,\n}: SellerHubProtectedRouteProps) {\n  const location = useLocation()\n\n  if (!isSellerAuthenticated) {\n    return (\n      <Navigate\n        replace\n        state={{ from: location.pathname + location.search }}\n        to=\"/login\"\n      />\n    )\n  }\n\n  return <Outlet />\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Guard is false, it returns the redirect element and saves the current pathname/search; when it is true, it only provides Outlet and does not copy the seller layout. It is a pathless layout boundary in the route branch and does not add a URL segment."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-not-found-page.tsx",
      "value": "import { Link, useLocation } from 'react-router'\n\nexport function SellerHubNotFoundPage() {\n  const location = useLocation()\n\n  return (\n    <section className=\"sellerhub-not-found\">\n      <p>Fallback route</p>\n      <h3>Page not found</h3>\n      <p>\n        No route branch handles <code>{location.pathname}</code>.\n      </p>\n      <Link to=\"/catalog\">Return to catalog</Link>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Fallback page displays the actual unmatched pathname and provides a declarative recovery destination. It does not handle product response errors, nor is it responsible for server HTTP 404."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-routing-workspace.tsx",
      "value": "import { useState } from 'react'\nimport { Navigate, Route, Routes } from 'react-router'\nimport { SellerHubCatalogPage } from './sellerhub-catalog-page'\nimport { SellerHubCheckoutPage } from './sellerhub-checkout-page'\nimport { SellerHubLoginPage } from './sellerhub-login-page'\nimport { SellerHubNotFoundPage } from './sellerhub-not-found-page'\nimport { SellerHubOrdersPage } from './sellerhub-orders-page'\nimport { SellerHubProductDetailPage } from './sellerhub-product-detail-page'\nimport { SellerHubProtectedRoute } from './sellerhub-protected-route'\nimport { SellerHubDashboardHome, SellerHubSellerLayout } from './sellerhub-seller-layout'\nimport { SellerHubWorkspaceLayout } from './sellerhub-workspace-layout'\n\nexport function SellerHubRoutingWorkspace() {\n  const [isSellerAuthenticated, setIsSellerAuthenticated] = useState(false)\n\n  return (\n    <Routes>\n      <Route\n        element={\n          <SellerHubWorkspaceLayout isSellerAuthenticated={isSellerAuthenticated} />\n        }\n      >\n        <Route element={<Navigate replace to=\"/catalog\" />} index />\n        <Route element={<SellerHubCatalogPage />} path=\"catalog\" />\n        <Route element={<SellerHubProductDetailPage />} path=\"catalog/:productId\" />\n        <Route\n          element={\n            <SellerHubProtectedRoute isSellerAuthenticated={isSellerAuthenticated} />\n          }\n        >\n          <Route element={<SellerHubSellerLayout />} path=\"seller\">\n            <Route element={<SellerHubDashboardHome />} index />\n            <Route element={<SellerHubOrdersPage />} path=\"orders\" />\n          </Route>\n        </Route>\n        <Route element={<SellerHubCheckoutPage />} path=\"checkout\" />\n        <Route\n          element={<SellerHubLoginPage onLogin={() => setIsSellerAuthenticated(true)} />}\n          path=\"login\"\n        />\n        <Route element={<SellerHubNotFoundPage />} path=\"not-found\" />\n        <Route element={<SellerHubNotFoundPage />} path=\"*\" />\n      </Route>\n    </Routes>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Workspace is the owner of the auth placeholder and the composition root of the route tree. Root layout has no path, so only UI nesting is added; index Navigate puts "
        },
        {
          "type": "inlineCode",
          "value": "/"
        },
        {
          "type": "text",
          "value": " canonicalize to "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": "; guard route has no path and only wraps the seller branch; Seller route then has index/orders children; finally "
        },
        {
          "type": "inlineCode",
          "value": "*"
        },
        {
          "type": "text",
          "value": " provides fallback. Declarative mode is always used here, no loader, action or RouterProvider."
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
                  "type": "inlineCode",
                  "value": "chapter-10-practice-root.tsx"
                },
                {
                  "type": "text",
                  "value": " uses BrowserRouter to create browser history/location context, and replaces non- "
                },
                {
                  "type": "inlineCode",
                  "value": "/practice"
                },
                {
                  "type": "text",
                  "value": " location is handed over to workspace."
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
                  "value": "Workspace Routes calculate branch; root layout render leaf through Outlet."
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
                  "value": "/catalog"
                },
                {
                  "type": "text",
                  "value": " derives products from search params; click card Link to create "
                },
                {
                  "type": "inlineCode",
                  "value": "/catalog/:productId"
                },
                {
                  "type": "text",
                  "value": " entry."
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
                  "value": "Product detail narrow productId, use it as key and abortable request criteria, and verify unknown response."
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
                  "value": "/seller/orders"
                },
                {
                  "type": "text",
                  "value": " passes through UI guard first; replace to "
                },
                {
                  "type": "inlineCode",
                  "value": "/login"
                },
                {
                  "type": "text",
                  "value": ", replace the local login event back to the intended destination."
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
                  "value": "Seller layout retains sidebar owner, Orders leaf derives count from status query."
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
                  "value": "Checkout Put step in URL, shipping note in local state, and navigate after the event is completed."
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
                  "value": "Unknown path enter "
                },
                {
                  "type": "inlineCode",
                  "value": "*"
                },
                {
                  "type": "text",
                  "value": " leaf; Whether a direct document request reaches the router is still determined by the production host fallback."
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
      "id": "126-mechanism-boundaries-and-common-mistakes",
      "children": [
        {
          "type": "text",
          "value": "12.6 Mechanism boundaries and common mistakes"
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "URL vs local: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " catalog/order filter can be shared, checkout note is not public; do not synchronize two states with bidirectional Effect."
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
                      "value": "Router vs React: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Router changes to branch/params, React presses type/position/key preserve/reset cells."
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
                      "value": "TypeScript vs runtime: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " generics and unions do not validate address bar or unknown response, parser/type guard must exist."
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
                      "value": "UI guard vs security: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "isSellerAuthenticated"
                },
                {
                  "type": "text",
                  "value": " only affects elements; the real API must still be authorized on the server."
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
                      "value": "History state vs durable data: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " redirect intent has fallback; do not put order, auth or checkout draft only in location.state."
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
                      "value": "Client route vs host: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " build success does not mean that the production server has SPA fallback configured."
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
      "id": "13-extra-cheatsheet",
      "children": [
        {
          "type": "text",
          "value": "13. Extra Cheatsheet"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "One sentence summary:"
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
          "value": "React Router interprets the browser location as a route branch; the URL is saved to share the navigation state, and React saves the interaction state within the branch. TypeScript only checks the code relationship without verifying the runtime URL."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Common API:"
            }
          ]
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
            "value": "API"
          }
        ],
        [
          {
            "type": "text",
            "value": "Use when"
          }
        ],
        [
          {
            "type": "text",
            "value": "Avoid when"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "Link"
            }
          ],
          [
            {
              "type": "text",
              "value": "User selected internal destination"
            }
          ],
          [
            {
              "type": "text",
              "value": "Automatic jump after process completion"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "NavLink"
            }
          ],
          [
            {
              "type": "text",
              "value": "Navigation requires active state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Normal content link"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "Parent route to display child element"
            }
          ],
          [
            {
              "type": "text",
              "value": "has no nested child"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useParams"
            }
          ],
          [
            {
              "type": "text",
              "value": "read dynamic segment"
            }
          ],
          [
            {
              "type": "text",
              "value": "requires query/filter value"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useSearchParams"
            }
          ],
          [
            {
              "type": "text",
              "value": "read/write shareable string criteria"
            }
          ],
          [
            {
              "type": "text",
              "value": "private draft or complex object"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useNavigate"
            }
          ],
          [
            {
              "type": "text",
              "value": "event/process jump to"
            }
          ],
          [
            {
              "type": "text",
              "value": "Normal navigation menu"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Navigate"
            }
          ],
          [
            {
              "type": "text",
              "value": "route branch declarative redirect"
            }
          ],
          [
            {
              "type": "text",
              "value": "backend authorization"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "key={param}"
            }
          ],
          [
            {
              "type": "text",
              "value": "entity change should reset local state"
            }
          ],
          [
            {
              "type": "text",
              "value": "layout state should preserve"
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Similar concept comparison:"
            }
          ]
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
            "value": "Concept A"
          }
        ],
        [
          {
            "type": "text",
            "value": "Concept B"
          }
        ],
        [
          {
            "type": "text",
            "value": "Key Difference"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "path param"
            }
          ],
          [
            {
              "type": "text",
              "value": "search param"
            }
          ],
          [
            {
              "type": "text",
              "value": "resource identity/hierarchy vs optional filter/criteria"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "search params"
            }
          ],
          [
            {
              "type": "text",
              "value": "local state"
            }
          ],
          [
            {
              "type": "text",
              "value": "can share historical state vs component instance state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "location.state"
            }
          ],
          [
            {
              "type": "text",
              "value": "search params"
            }
          ],
          [
            {
              "type": "text",
              "value": "entry-local hidden value vs URL-visible value"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "layout route"
            }
          ],
          [
            {
              "type": "text",
              "value": "path prefix route"
            }
          ],
          [
            {
              "type": "text",
              "value": "The former can provide element/Outlet, and the latter can only combine path"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "route not found"
            }
          ],
          [
            {
              "type": "text",
              "value": "entity not found"
            }
          ],
          [
            {
              "type": "text",
              "value": "No pattern match vs pattern match No data after"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "UI guard"
            }
          ],
          [
            {
              "type": "text",
              "value": "backend authorization"
            }
          ],
          [
            {
              "type": "text",
              "value": "UX boundary vs trust/security boundary"
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Error type quick check:"
            }
          ]
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
            "value": "Signal"
          }
        ],
        [
          {
            "type": "text",
            "value": "Likely cause"
          }
        ],
        [
          {
            "type": "text",
            "value": "First check"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "All state reset"
            }
          ],
          [
            {
              "type": "text",
              "value": "document navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Whether to use "
            },
            {
              "type": "inlineCode",
              "value": "<a href>"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "URL is correct, child is blank"
            }
          ],
          [
            {
              "type": "text",
              "value": "missing Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "Parent layout JSX"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Multiple nav item active"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "end"
            },
            {
              "type": "text",
              "value": "/nesting intent"
            }
          ],
          [
            {
              "type": "text",
              "value": "NavLink patterns"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Back after filter unchanged"
            }
          ],
          [
            {
              "type": "text",
              "value": "duplicate local filter state"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL unique owner"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Details ID is inconsistent with data"
            }
          ],
          [
            {
              "type": "text",
              "value": "obsolete async result"
            }
          ],
          [
            {
              "type": "text",
              "value": "Effect cleanup/dependencies"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "After switching entity, draft does not reset"
            }
          ],
          [
            {
              "type": "text",
              "value": "same React identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "need stable param key"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Direct URL Production environment 404"
            }
          ],
          [
            {
              "type": "text",
              "value": "host no SPA fallback"
            }
          ],
          [
            {
              "type": "text",
              "value": "server rewrite configure"
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real project use:"
            }
          ]
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
            "value": "Scenario"
          }
        ],
        [
          {
            "type": "text",
            "value": "Route mechanism"
          }
        ],
        [
          {
            "type": "text",
            "value": "State owner"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Catalog filters"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "useSearchParams"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Product detail"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": ":productId"
            },
            {
              "type": "text",
              "value": " + parser"
            }
          ],
          [
            {
              "type": "text",
              "value": "URL -> async resource"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Seller sidebar"
            }
          ],
          [
            {
              "type": "text",
              "value": "nested Route + Outlet"
            }
          ],
          [
            {
              "type": "text",
              "value": "Parent layout"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Checkout note"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled textarea"
            }
          ],
          [
            {
              "type": "text",
              "value": "Local state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Login redirect"
            }
          ],
          [
            {
              "type": "text",
              "value": "location.state + fallback"
            }
          ],
          [
            {
              "type": "text",
              "value": "History entry intent"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Seller access"
            }
          ],
          [
            {
              "type": "text",
              "value": "guard + backend auth"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI + server are respectively responsible for"
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Minimum template:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: declarative nested routes",
      "value": "import { Outlet, Route, Routes } from 'react-router'\n\nfunction Layout() {\n  return <Outlet />\n}\n\nexport function AppRoutes() {\n  return (\n    <Routes>\n      <Route element={<Layout />}>\n        <Route element={<p>Home</p>} index />\n        <Route element={<p>Item</p>} path=\"items/:itemId\" />\n        <Route element={<p>Not found</p>} path=\"*\" />\n      </Route>\n    </Routes>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This template only shows the route nesting shape and is not the actual document of this chapter. Real pages still require narrow params, select state owner, and configure production SPA fallback."
        }
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
            "value": "Role"
          }
        ],
        [
          {
            "type": "text",
            "value": "Status"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "docs/react/chapter-10-routing-url-state/react-chapter-10-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 10 Study Guide."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/chapter-10-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "BrowserRouter with chapter mount adapter."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/chapter-10-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "chapter common page and workspace style."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/01-client-routing-boundary/client-routing-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Client/document navigation exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/02-route-matching-tree/route-matching-tree.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Route matching branch exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/03-link-navlink-intent/link-navlink-intent.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Link/NavLink intent practice."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/04-nested-layout-outlet/nested-layout-outlet.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Nested Outlet Exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/05-dynamic-route-params/dynamic-route-params.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Dynamic param boundary exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/06-search-params-url-state/search-params-url-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Search params URL state Exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/07-url-local-context-state/url-local-context-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "State owner comparison exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/08-programmatic-navigation/event-driven-navigation.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Event-driven navigation exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/09-not-found-route/not-found-fallback-route.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Fallback matching exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/10-protected-route-placeholder/protected-route-placeholder.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI guard boundary practice."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/11-route-state-reset/route-param-state-reset.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Param-key identity exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/12-route-params-async-criteria/route-param-async-criteria.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Route-driven async criteria exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-catalog-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "SellerHub local domain data."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-product-request.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Abortable local product request."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-workspace-layout.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Root layout and Outlet."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-catalog-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Catalog URL filters."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-product-detail-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Product param/async page."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-seller-layout.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Seller nested layout."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-orders-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Seller order status URL state."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-checkout-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Checkout URL/local boundary."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-login-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Login redirect flow."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-protected-route.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Seller UI guard."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-not-found-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Route fallback page."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-routing-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final route tree composition root."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved"
            }
          ]
        ]
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Template: declarative nested routes"
        },
        {
          "type": "text",
          "value": " does not need to be created and is not a final file."
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
          "value": "recommends building a \"navigation evidence chain\" card for each 9.x, leaving only seven lines: trigger, old/new URL, History push/replace, matched branch, rendered elements, state preserve/reset, runtime validation. Then write the owner for each route of SellerHub: URL values, layout owner, local state, async criteria, security boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Don't memorize the API first when practicing. Open Browser DevTools: Check the anchor in Elements, check whether document request appears in Network, check the identity component in Console/React DevTools, and check the history semantics in the address bar and Back/Forward. Only if you can use these evidences to explain the results can you master the routing mechanism."
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
                  "value": "Client navigation and full page navigation change and retain what?"
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
                  "value": "Location, route tree, route branch and route element What is the relationship?"
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
                  "value": ", when to use NavLink, and when to use useNavigate?"
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
                  "value": "Parent route is matched but the child is not displayed?"
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
                  "value": "useParams<'productId'>()"
                },
                {
                  "type": "text",
                  "value": " prove that productId is valid?"
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
                  "value": "Which filters should enter the search params, and which drafts should not enter the URL?"
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
                  "value": "Location state and search params?"
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
                  "value": "Protected route not a security boundary?"
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
                  "value": "Param change Why is it possible to preserve local state?"
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
                  "value": "key={productId}"
                },
                {
                  "type": "text",
                  "value": " How to change React identity?"
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
                  "value": "Route param drives request, why do we need abort/ignore?"
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
                  "value": "Router fallback, entity not found and server 404?"
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
                  "value": "production host Why must SPA fallback be configured?"
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
                  "value": "SellerHub "
                },
                {
                  "type": "inlineCode",
                  "value": "/seller/orders?status=pending"
                },
                {
                  "type": "text",
                  "value": "?"
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
          "value": "Think of React Router as an interpreter between browser location and React tree:"
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
                  "value": "users generate navigation through Link, address bar, Back/Forward or navigate."
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
                  "value": "Browser History Select or create entry; location becomes new pathname/search/state/key."
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
                  "value": "Router uses location to match the route tree and obtains the parent-to-leaf branch."
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
                  "value": "Layout elements enter the React tree, and Outlet receives child elements."
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
                  "value": "Params/search params are still runtime strings; TypeScript does not perform business verification for them."
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
                  "value": "React is determined automatically by type, position and key preserve/reset state, not by \"URL looks different\"."
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
                  "value": "URL saves shareable criteria; local state saves private interactions; Context shares non-URL owner value."
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
                  "value": "Route-driven async work is still cleanup by Effect/request owner."
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
                  "value": "UI guard only selects the front-end branch, and backend authorization establishes trust."
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
          "value": "Final formula:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Browser navigation -> History location -> Router branch -> React identity -> validated URL values -> UI / async criteria"
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
      "id": "react-router-7180-official-document",
      "children": [
        {
          "type": "text",
          "value": "React Router 7.18.0 Official Document"
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
                  "type": "link",
                  "href": "https://reactrouter.com/start/declarative/installation",
                  "children": [
                    {
                      "type": "text",
                      "value": "Installation - Declarative mode"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm from "
                },
                {
                  "type": "inlineCode",
                  "value": "react-router"
                },
                {
                  "type": "text",
                  "value": " imports BrowserRouter."
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
                  "href": "https://reactrouter.com/start/declarative/routing",
                  "children": [
                    {
                      "type": "text",
                      "value": "Routing"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on reading nested routes, layout routes, index routes, dynamic segments, splats and linking."
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
                  "href": "https://reactrouter.com/start/declarative/navigating",
                  "children": [
                    {
                      "type": "text",
                      "value": "Navigating"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Compare Link, NavLink and useNavigate; the official recommendation is to use links for normal navigation."
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
                  "href": "https://reactrouter.com/start/declarative/url-values",
                  "children": [
                    {
                      "type": "text",
                      "value": "URL Values"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Read route params, search params and location object."
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
                  "value": "Local installation package type: "
                },
                {
                  "type": "inlineCode",
                  "value": "node_modules/react-router/dist/development/index.d.ts"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "index-react-server-client-*.d.ts"
                },
                {
                  "type": "text",
                  "value": ", used to check "
                },
                {
                  "type": "inlineCode",
                  "value": "NavigateFunction"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useParams"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useSearchParams"
                },
                {
                  "type": "text",
                  "value": ", Route/Link/Outlet props."
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
      "id": "react-official-document",
      "children": [
        {
          "type": "text",
          "value": "React official document"
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
                  "type": "link",
                  "href": "https://react.dev/learn/preserving-and-resetting-state",
                  "children": [
                    {
                      "type": "text",
                      "value": "Preserving and Resetting State"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on understanding the relationship between state and tree position, type, and key."
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
                  "value": ": Review dependency changes, cleanup and obsolete results."
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
      "id": "mdn-browser-platform-documentation",
      "children": [
        {
          "type": "text",
          "value": "MDN Browser platform documentation"
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
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API",
                  "children": [
                    {
                      "type": "text",
                      "value": "Working with the History API"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Understand pushState, replaceState, popstate and SPA history entries."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/History/pushState",
                  "children": [
                    {
                      "type": "text",
                      "value": "History.pushState()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm state, unused, same-origin URL parameters."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams",
                  "children": [
                    {
                      "type": "text",
                      "value": "URLSearchParams"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm get/set/delete/serialization behavior for query string."
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
      "ordered": true,
      "start": 1,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "Narrowing"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "string | undefined"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": " is narrowed to domain values."
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
                  "value": ": Review Route elements, props and TSX compile-time checking."
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
                  "value": "references/books/react/full-stack-react-projects.pdf"
                },
                {
                  "type": "text",
                  "value": " show the historical React Router architecture and navigation scenario, but "
                },
                {
                  "type": "inlineCode",
                  "value": "Switch"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "component"
                },
                {
                  "type": "text",
                  "value": " prop, "
                },
                {
                  "type": "inlineCode",
                  "value": "withRouter"
                },
                {
                  "type": "text",
                  "value": ", class components and the old Material UI writing method are no longer the modern default in this chapter; they are only used to compare routing issues and do not reuse the API."
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
                  "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
                },
                {
                  "type": "text",
                  "value": " is used to assist in understanding the criteria string; this book does not replace the React Router official routing document."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter10Content() {
  return <DocumentRenderer document={chapterDocument} />
}
