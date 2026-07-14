import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-11",
  "slug": "chapter-11-performance-memoization",
  "title": "React Chapter 11: Performance, Memoization, and Code Splitting",
  "sourcePath": "docs/react/chapter-11-performance-memoization/react-chapter-11-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-11-performance-memoization-and-code-splitting",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 11: Performance, Memoization, and Code Splitting"
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
              "value": "distinguishes render work from DOM commit"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/01-render-commit-boundary/render-commit-boundary.tsx"
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
              "value": "Understand the default impact of parent render on child function"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/02-parent-child-render/parent-child-render-boundary.tsx"
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
              "value": "Observe type, position and key identity"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/03-reconciliation-key-identity/reconciliation-key-identity.tsx"
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
              "value": "Verify memo's shallow props comparison"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/04-react-memo-shallow-compare/react-memo-shallow-compare.tsx"
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
              "value": "Compare object reference identity"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/05-referential-equality-props/referential-equality-props.tsx"
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
              "value": "Caching expensive pure derived results"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/06-usememo-derived-data/usememo-expensive-derived-data.tsx"
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
              "value": "Observation callback identity dependency"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/07-usecallback-identity/usecallback-function-identity.tsx"
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
              "value": "combination memo and stable callback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/08-memo-callback-composition/memo-callback-composition.tsx"
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
              "value": "uses state colocation to reduce render owner"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/09-state-colocation/state-colocation-render-scope.tsx"
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
              "value": "Stable Context provider value"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/10-context-value-boundary/context-value-identity-boundary.tsx"
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
              "value": "Use Profiler to obtain commit timing"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/11-profiler-evidence/profiler-render-evidence.tsx"
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
              "value": "Observe lazy module Promise and Suspense"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-suspense-code-splitting.tsx"
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
              "value": "provides lazy default export module"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-dashboard-panel.tsx"
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
              "value": "Mount chapter Router, practice page and final workspace"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/chapter-11-practice-root.tsx"
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
              "value": "provides chapter and workspace common styles"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/chapter-11-practice.css"
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
              "value": "provides SellerHub typed mock data"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-data.ts"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "Isolate expensive product derivation calculation"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/derive-visible-products.ts"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "Create product row memo boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-product-row.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "combines catalog draft, URL and memoization"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/product-catalog-performance-page.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "Create order row memo boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-order-row.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "compares cheap filter and stable callback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/seller-orders-performance-page.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "define preferences Context contract"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-context.ts"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "Stable Provider value identity"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-provider.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "Show dashboard expensive calculation"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/dashboard-performance-page.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "provides eager route shell"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-layout.tsx"
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
        ],
        [
          [
            {
              "type": "text",
              "value": "Combination of lazy routes, Suspense and Profiler"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-workspace.tsx"
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
          "value": "This chapter is located after routing. Chapter 10 makes Catalog, Orders and Dashboard different route branches; Chapter 11 begins to determine whether the work in these branches comes from component calculation, descendant render, reconciliation, DOM commit, browser layout/paint, or is it loaded for the first time JavaScript chunk."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter uses the existing React 19.2, TypeScript, Vite and React Router in the current project, without adding new dependencies or configuring React Compiler. The official documentation states that React Compiler can automatically apply equivalent memoization, but the current project does not have a compiler setup; therefore, the manual API in this chapter is only used for understanding the mechanism and evidence-based optimization, and is not used as a global default writing method."
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
          "value": "\"The component is rendered again\" is not a complete performance diagnosis. After the Component function is called, it may just produce cheap new JSX objects; reconciliation may find no difference in DOM output; the browser may also not need layout or paint. Conversely, a page that only renders once may still be slow due to large bundles, network chunks, expensive calculations, or layout thrashing."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter establishes a sequence: first confirm the perceptible problems, then distinguish the work layer, then correct the owner, derived data, key and component boundary, and finally use "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "lazy"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "Suspense"
        },
        {
          "type": "text",
          "value": ". Optimization must change the measured cost, not just expose the source code to more cached APIs."
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
                      "value": "Props with readonly input:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "memo"
                },
                {
                  "type": "text",
                  "value": " compares the before and after props values without changing the props data flow."
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
                      "value": "State snapshot with owner:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " state determines where update starts to affect the subtree."
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
                      "value": "List key and identity:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " key also affects correctness, state preserve/reset and reconciliation work."
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
                      "value": "Pure render: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": " calculation, memoized component and ordinary component must maintain render purity."
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
                      "value": "Effects and dependencies:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " dependency array is not \"write less and faster\", missing dependency will produce stale behavior."
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
                      "value": "Derived data: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " filter/sort/summary can be derived in render by default; only cache results if proven expensive."
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
                      "value": "Routing: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " route pages are a natural code-splitting boundary, but this chapter does not use loader/action."
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
                      "value": "Async boundary: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "Suspense"
                },
                {
                  "type": "text",
                  "value": " is valid for lazy code and will not automatically observe data requests in Effect."
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
                  "value": "explains the order and responsibility layer of render, reconciliation, commit, layout and paint."
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
                  "value": "Determines whether the child function is called and actually generates a DOM mutation."
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
                  "value": "uses element type, position and key to explain state preserve, remount and list reorder."
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
                  "value": "Description "
                },
                {
                  "type": "inlineCode",
                  "value": "memo"
                },
                {
                  "type": "text",
                  "value": " compare to, and why state/context still allows memoized component render."
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
                  "value": "uses "
                },
                {
                  "type": "inlineCode",
                  "value": "Object.is"
                },
                {
                  "type": "text",
                  "value": " and referential equality explain the \"always new\" prop of object/array/function."
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
                  "value": "distinguishes "
                },
                {
                  "type": "inlineCode",
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "useCallback"
                },
                {
                  "type": "text",
                  "value": " 's function identity cache."
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
                  "value": "prove "
                },
                {
                  "type": "inlineCode",
                  "value": "memo + useCallback/useMemo"
                },
                {
                  "type": "text",
                  "value": " combination pay off, and when is it just complexity."
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
                  "value": "Prioritizes narrowing the work scope through state colocation and provider boundary."
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
                  "value": "Reading Profiler's "
                },
                {
                  "type": "inlineCode",
                  "value": "actualDuration"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "baseDuration"
                },
                {
                  "type": "text",
                  "value": ", phase and commit evidence."
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
                  "value": "lazy"
                },
                {
                  "type": "text",
                  "value": " 's module Promise cache, Suspense fallback and Vite chunk output."
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
                  "value": "selects different optimization layers for the product rows, order rows, dashboard metrics and route pages of SellerHub."
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
          "value": "first learn render/commit and parent-child default calls to avoid directly equating \"re-render\" with \"rebuilding DOM\". Then learn reconciliation/key, because memoization is based on correct tree identity. Then learn memo shallow comparison, reference identity, useMemo, useCallback and combination conditions in sequence. Finally, higher-level state colocation, Context boundary, Profiler evidence and code splitting are processed."
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
          "value": "render -> reconciliation -> identity -> memo comparison -> cache dependencies -> owner boundaries -> measurement -> chunk loading"
        },
        {
          "type": "text",
          "value": ". This order makes optimization the result of inference rather than an API manifest."
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
              "value": "render phase"
            }
          ],
          [
            {
              "type": "text",
              "value": "React calls component and calculates new UI description"
            }
          ],
          [
            {
              "type": "text",
              "value": "React render behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "must be pure here and can be repeated or discarded"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reconciliation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Compare the old and new element trees and decide to keep/replace identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "React reconciliation"
            }
          ],
          [
            {
              "type": "text",
              "value": "re-render is not equal to DOM rebuild"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "commit phase"
            }
          ],
          [
            {
              "type": "text",
              "value": "Apply the required changes to host DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "React + browser boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only differences require mutation"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "referential equality"
            }
          ],
          [
            {
              "type": "text",
              "value": "Do the two values point to the same object/function"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "shallow comparison using identity"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "shallow props comparison"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "Object.is"
            }
          ],
          [
            {
              "type": "text",
              "value": "React memoization"
            }
          ],
          [
            {
              "type": "text",
              "value": "An always-new prop will make memo invalid"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "memo cache"
            }
          ],
          [
            {
              "type": "text",
              "value": "React saved component result, calculation result or function reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "React memoization"
            }
          ],
          [
            {
              "type": "text",
              "value": "only reuses"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "state colocation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Place the transient state in the owner who least needs it"
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
              "value": "Narrow down from the source update scope"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "context value identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "Provider before and after value of "
            },
            {
              "type": "inlineCode",
              "value": "Object.is"
            },
            {
              "type": "text",
              "value": " results"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Context"
            }
          ],
          [
            {
              "type": "text",
              "value": "The new object will notify all consumers"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "actualDuration"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current Profiler commit subtree render time"
            }
          ],
          [
            {
              "type": "text",
              "value": "Tooling/profiling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Observe the real work after optimization"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "baseDuration"
            }
          ],
          [
            {
              "type": "text",
              "value": "Estimated time to render the entire subtree without optimization"
            }
          ],
          [
            {
              "type": "text",
              "value": "Tooling/profiling"
            }
          ],
          [
            {
              "type": "text",
              "value": "and actualDuration comparison memo effect"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "dynamic import"
            }
          ],
          [
            {
              "type": "text",
              "value": "Asynchronously loads the Promise expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript + bundler"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides syntax boundaries for chunk split"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "lazy component"
            }
          ],
          [
            {
              "type": "text",
              "value": "cache load Promise with default component of React component type"
            }
          ],
          [
            {
              "type": "text",
              "value": "React code loading"
            }
          ],
          [
            {
              "type": "text",
              "value": "is triggered when the first render occurs. module load"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Suspense fallback"
            }
          ],
          [
            {
              "type": "text",
              "value": "The alternative shown when child suspend React node"
            }
          ],
          [
            {
              "type": "text",
              "value": "React rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "processing waits for UI, does not process error"
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
          "value": "performance investigation is carried out according to the following nine layers:"
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
                      "value": "Trigger: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Which state, props, context, route or lazy render triggered work?"
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
                  "value": " create?"
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
                      "value": "React render: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Which component functions are called? Is render pure?"
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
                      "value": "Reconciliation: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " correspond?"
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
                      "value": "Memoization: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " props/dependencies Which item passed or failed "
                },
                {
                  "type": "inlineCode",
                  "value": "Object.is"
                },
                {
                  "type": "text",
                  "value": "? What is cache reused?"
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
                      "value": "Commit/browser: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Is there really DOM mutation, style recalculation, layout or paint?"
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
                      "value": "Code loading: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " dynamic import generate network chunk request, module evaluation and Promise settlement?"
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
                      "value": "TypeScript: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " only checks props/callback/result types, does not measure runtime cost, and does not automatically optimize the code."
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
                      "value": "Evidence: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Profiler, React DevTools, Performance/Network panels and production build explain?"
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
          "value": "observable slowdown -> locate expensive layer -> fix ownership/identity -> measure -> add the smallest effective optimization"
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
      "value": "D:/vite_ts/\n  package.json\n  package-lock.json\n  README.md\n  src/\n    App.tsx\n    learning/react/chapter-11-performance-memoization/\n      chapter-11-practice-root.tsx\n      chapter-11-practice.css\n      01-render-commit-boundary/render-commit-boundary.tsx\n      02-parent-child-render/parent-child-render-boundary.tsx\n      03-reconciliation-key-identity/reconciliation-key-identity.tsx\n      04-react-memo-shallow-compare/react-memo-shallow-compare.tsx\n      05-referential-equality-props/referential-equality-props.tsx\n      06-usememo-derived-data/usememo-expensive-derived-data.tsx\n      07-usecallback-identity/usecallback-function-identity.tsx\n      08-memo-callback-composition/memo-callback-composition.tsx\n      09-state-colocation/state-colocation-render-scope.tsx\n      10-context-value-boundary/context-value-identity-boundary.tsx\n      11-profiler-evidence/profiler-render-evidence.tsx\n      12-lazy-suspense-code-splitting/\n        lazy-dashboard-panel.tsx\n        lazy-suspense-code-splitting.tsx\n      sellerhub-performance-workspace/\n        sellerhub-performance-data.ts\n        derive-visible-products.ts\n        memoized-product-row.tsx\n        product-catalog-performance-page.tsx\n        memoized-order-row.tsx\n        seller-orders-performance-page.tsx\n        performance-preferences-context.ts\n        performance-preferences-provider.tsx\n        dashboard-performance-page.tsx\n        sellerhub-performance-layout.tsx\n        sellerhub-performance-workspace.tsx"
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
      "value": "docs/react/chapter-11-performance-memoization/\n  react-chapter-11-learning-guide.md"
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
          "value": " corresponds to 9.1 to 9.12. No. 9.12 has two files because the lazy loader and the loaded module are both ends of the code-splitting boundary. 9.13 only maps the architecture and does not forge the 13 exercise directory."
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
          "value": "error comparison if using "
        },
        {
          "type": "inlineCode",
          "value": "Snippet:"
        },
        {
          "type": "text",
          "value": " only explains invalid optimization or wrong dependency. It does not mean that real files need to be created, and it will not enter the final file list."
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
          "value": "The final project separates domain data, pure derivation, memoized rows, Context boundary, three lazy pages, layout and route composition. Chapter adapter/CSS is only responsible for mounting and styling, and does not repeat the complete code in the text."
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
          "value": "Visit "
        },
        {
          "type": "inlineCode",
          "value": "/performance/practice"
        },
        {
          "type": "text",
          "value": " Run independent mechanism exercises, visit "
        },
        {
          "type": "inlineCode",
          "value": "/performance/catalog"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/performance/orders"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "/performance/dashboard"
        },
        {
          "type": "text",
          "value": " observe page-level lazy chunks. The Network panel for DevTools should display the corresponding module/chunk when the page is first accessed; the production build output is used to verify the actual chunking results for Vite. During the development period, Strict Mode may repeatedly call render/calculation to discover impure logic. Therefore, timing evidence should be understood in conjunction with the production build and the target device, and Strict Mode should not be deleted to reduce logs."
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
      "id": "91-render-and-commit-are-different-phases",
      "children": [
        {
          "type": "text",
          "value": "9.1 Render and Commit Are Different Phases"
        }
      ]
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
          "value": " React calls component function to calculate the next UI which is render; writing necessary changes to DOM is commit. The occurrence of re-render does not mean that every DOM node is rebuilt."
        }
      ]
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
          "value": " Avoid mistaking \"the function is executed again\", \"virtual tree is compared\" and \"browser DOM is modified\" as the same action."
        }
      ]
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
          "value": " Performance analysis must first confirm whether the cost occurs in render calculation, React reconciliation, DOM mutation, or browser layout/paint; otherwise the optimization goal will be misaligned."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and hierarchical boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "render"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "commit"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "reconciliation"
        },
        {
          "type": "text",
          "value": ". JavaScript runtime executes component function; React framework calculates and submits minimum DOM changes; browser platform saves the real DOM state such as input node and completes layout/paint; TypeScript only checks JSX, state and handler types; tooling converts TSX during development, and Strict Mode may additionally call render To expose impure logic. There is no new API in this section, the focus is on render work, identity and performance boundaries; the specific focus is the separation of responsibilities between render, commit and browser work."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism and fixed rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " state update adds a render to the queue. React calls the component, compares this output with the last output, and only modifies the changed DOM attributes, text, or nodes during the commit phase. "
        },
        {
          "type": "inlineCode",
          "value": "data-render-version"
        },
        {
          "type": "text",
          "value": " is a common DOM attribute; "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " only gives the initial value to uncontrolled input, and subsequent edited values are held by the browser node."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Complete example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/01-render-commit-boundary/render-commit-boundary.tsx",
      "value": "import { useState } from 'react'\n\nexport function RenderCommitBoundary() {\n  const [renderVersion, setRenderVersion] = useState(0)\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">01 / Render and commit</p>\n      <h2>A re-render does not require rebuilding every DOM node</h2>\n      <p data-render-version={renderVersion}>Rendered description version: {renderVersion}</p>\n      <label className=\"performance-field\">\n        <span>Uncontrolled DOM value</span>\n        <input defaultValue=\"Edit this value before rendering again\" />\n      </label>\n      <button onClick={() => setRenderVersion((version) => version + 1)} type=\"button\">\n        Queue another render\n      </button>\n      <p className=\"performance-practice-note\">\n        The paragraph changes. The existing input node keeps its browser-owned edited value.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "useState(0)"
        },
        {
          "type": "text",
          "value": " creates the current render snapshot; click the handler to use the updater function to queue updates; React calls "
        },
        {
          "type": "inlineCode",
          "value": "RenderCommitBoundary"
        },
        {
          "type": "text",
          "value": "; paragraph text and "
        },
        {
          "type": "inlineCode",
          "value": "data-render-version"
        },
        {
          "type": "text",
          "value": " changes, but the type, position and props of the input can still be reused; commit only updates the DOM related to the paragraph. First manually edit the input, and then click the button. You can see that the value held by the browser has not been cleared."
        }
      ]
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
          "value": "renderVersion"
        },
        {
          "type": "text",
          "value": " from "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": " becomes "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": ", the old handler closure reads its own snapshot, but the updater parameter receives the latest value in the queue. The JSX object is newly evaluated; the existing input DOM node identity is maintained; there are no ref or effect closures."
        }
      ]
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
          "value": " React render is \"the next UI description\", not a \"must rebuild DOM\" command. The input of the same type/position is matched by reconciliation, so the browser-owned value continues to stay on the same node."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Handwriting "
        },
        {
          "type": "inlineCode",
          "value": "container.innerHTML = ..."
        },
        {
          "type": "text",
          "value": " will replace the subtree, usually losing the input node identity. When you see \"Log executed twice\", don't directly assert that the DOM has been updated twice; use Elements mutation, Profiler commit and node identity to confirm respectively. Treating the number of renders as the number of DOM mutations violates the render/commit layering rule."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " SellerHub is entered in the search box, the page component may render, but the unchanged DOM does not need to be completely rebuilt. This section takes over the state snapshot and establishes the premise of \"first locating the layer where the cost occurs\" for memo, Profiler and code splitting."
        }
      ]
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
          "value": "state update -> render calculation -> reconciliation -> necessary commit -> browser layout/paint"
        },
        {
          "type": "text",
          "value": ", these stages are related but not equivalent."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-parent-and-child-render-boundaries",
      "children": [
        {
          "type": "text",
          "value": "9.2 Parent and Child Render Boundaries"
        }
      ]
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
          "value": " parent state is updated, React will continue to call its descendant component functions by default; being called by child does not mean that its DOM will change."
        }
      ]
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
          "value": " Explain why the child function may still execute when \"child props have not changed\", and why this does not automatically constitute a performance issue."
        }
      ]
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
          "value": " Only after confirming that descendant render work is expensive and can be skipped, "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " has a clear goal."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keyword and hierarchical boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "parent render"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "descendant render"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "bailout"
        },
        {
          "type": "text",
          "value": ". JavaScript runtime just calls functions in sequence; React decides which descendants to continue calculating from the updated position; browser only sees the final commit; TypeScript checks component return value and handler; tooling/Profiler can provide development evidence. There is no new API in this section, the focus is on render work, identity and performance boundaries; the specific focus is the difference between default render propagation and DOM commit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Updating parent's own state will generate the next element tree starting from parent. Normal children recalculate by default; React compares its output afterwards. "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " is an optional bailout boundary, not the component's default semantics."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Full example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/02-parent-child-render/parent-child-render-boundary.tsx",
      "value": "import { useState } from 'react'\n\nfunction StaticSellerSummary() {\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Seller summary</strong>\n      <p>12 active products and 4 pending orders</p>\n    </section>\n  )\n}\n\nexport function ParentChildRenderBoundary() {\n  const [searchDraft, setSearchDraft] = useState('')\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">02 / Parent and child</p>\n      <h2>Parent state updates call descendant component functions by default</h2>\n      <label className=\"performance-field\">\n        <span>Parent-owned search draft</span>\n        <input\n          onChange={(event) => setSearchDraft(event.currentTarget.value)}\n          placeholder=\"Type to update the parent\"\n          value={searchDraft}\n        />\n      </label>\n      <p>\n        Parent snapshot: <code>{searchDraft || 'empty'}</code>\n      </p>\n      <StaticSellerSummary />\n      <p className=\"performance-practice-note\">\n        React can call StaticSellerSummary again while committing no changes inside its DOM output.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " input changes, "
        },
        {
          "type": "inlineCode",
          "value": "setSearchDraft"
        },
        {
          "type": "text",
          "value": " updates parent snapshot; React calls "
        },
        {
          "type": "inlineCode",
          "value": "ParentChildRenderBoundary"
        },
        {
          "type": "text",
          "value": ", also evaluate "
        },
        {
          "type": "inlineCode",
          "value": "<StaticSellerSummary />"
        },
        {
          "type": "text",
          "value": "; summary returns the same content, reconciliation cannot find the DOM differences that need to be submitted. You can temporarily use Profiler to observe render, but you should not leave the teaching log permanently in the component body."
        }
      ]
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
          "value": "searchDraft"
        },
        {
          "type": "text",
          "value": " String changes; input handler and JSX elements are new JS references every render; "
        },
        {
          "type": "inlineCode",
          "value": "StaticSellerSummary"
        },
        {
          "type": "text",
          "value": " function definition is stable module binding; summary has no state, ref or effect closure."
        }
      ]
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
          "value": " React's default correctness model continues to calculate descendants from the updated component, and then shrinks the commit through reconciliation, instead of deeply comparing all props before deciding whether to call each function."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is mechanically added to the outer layer of each child with "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " increases comparison and cognitive costs. First use Profiler to confirm the "
        },
        {
          "type": "inlineCode",
          "value": "actualDuration"
        },
        {
          "type": "text",
          "value": " has interactive effects; if the child is cheap, the default recalculation is usually simpler. The wrong rule is \"Treat the number of renders as a user-perceivable bottleneck without evidence.\""
        }
      ]
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
        },
        {
          "type": "text",
          "value": " catalog is placed in a high-level layout, the render scope will be expanded; only after understanding the default propagation can we judge whether state colocation, component composition, or memoization is more appropriate."
        }
      ]
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
          "value": " parent render drives descendant calculation by default; whether the DOM changes is determined by subsequent reconciliation/commit."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-reconciliation-keys-and-state-identity",
      "children": [
        {
          "type": "text",
          "value": "9.3 Reconciliation, Keys, and State Identity"
        }
      ]
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
          "value": " React via component type, tree position and "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " identifies who the state belongs to; "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is first and foremost a identity/correctness tool, not a memoization API."
        }
      ]
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
          "value": " explains why the index key associates the row state with the wrong business object when rearranging the list."
        }
      ]
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
          "value": " identity error will cause behavioral bugs first, and then talk about performance. Stable domain IDs allow React to correctly reuse or reset instances."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and hierarchical boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "reconciliation"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "state identity"
        },
        {
          "type": "text",
          "value": ". JavaScript of "
        },
        {
          "type": "inlineCode",
          "value": "reverse()"
        },
        {
          "type": "text",
          "value": "/spread generates a new array; React uses type/position/key to match fiber/component state; the browser DOM node is reused or moved with the matching results; TypeScript only constrains "
        },
        {
          "type": "inlineCode",
          "value": "keyMode"
        },
        {
          "type": "text",
          "value": " union cannot determine whether the key has business stability; tooling will not find the semantic errors of the index key for you. There is no new API in this section, the focus is on render work, identity and performance boundaries; the specific focus is the reconciliation identity rule."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism and fixed attribute name:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is a special attribute reserved by React and will not be passed into "
        },
        {
          "type": "inlineCode",
          "value": "CatalogDraftRow"
        },
        {
          "type": "text",
          "value": ". Sibling keys under the same parent must be unique and stable during the data life cycle. The rearranged list should use "
        },
        {
          "type": "inlineCode",
          "value": "item.id"
        },
        {
          "type": "text",
          "value": ", do not use the current "
        },
        {
          "type": "inlineCode",
          "value": "index"
        },
        {
          "type": "text",
          "value": " or random value when rendering."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Complete example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/03-reconciliation-key-identity/reconciliation-key-identity.tsx",
      "value": "import { useState } from 'react'\n\ntype CatalogItem = {\n  id: string\n  name: string\n}\n\nconst catalogItems: CatalogItem[] = [\n  { id: 'lamp-101', name: 'Arc Desk Lamp' },\n  { id: 'chair-204', name: 'Mesh Task Chair' },\n  { id: 'light-305', name: 'Studio Floor Light' },\n]\n\nfunction CatalogDraftRow({ item }: { item: CatalogItem }) {\n  const [draftLabel, setDraftLabel] = useState(item.name)\n\n  return (\n    <li className=\"performance-list-row\">\n      <code>{item.id}</code>\n      <input\n        aria-label={`Draft label for ${item.name}`}\n        onChange={(event) => setDraftLabel(event.currentTarget.value)}\n        value={draftLabel}\n      />\n    </li>\n  )\n}\n\nexport function ReconciliationKeyIdentity() {\n  const [isReversed, setIsReversed] = useState(false)\n  const [keyMode, setKeyMode] = useState<'stable' | 'index'>('stable')\n  const visibleItems = isReversed ? [...catalogItems].reverse() : catalogItems\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">03 / Reconciliation identity</p>\n      <h2>Type, position, and key determine which state is preserved</h2>\n      <div className=\"performance-control-row\">\n        <button onClick={() => setIsReversed((reversed) => !reversed)} type=\"button\">\n          Reverse rows\n        </button>\n        <label>\n          Key mode\n          <select\n            onChange={(event) => setKeyMode(event.currentTarget.value as 'stable' | 'index')}\n            value={keyMode}\n          >\n            <option value=\"stable\">Stable domain ID</option>\n            <option value=\"index\">Array index</option>\n          </select>\n        </label>\n      </div>\n      <ul className=\"performance-list\">\n        {visibleItems.map((item, index) => (\n          <CatalogDraftRow item={item} key={keyMode === 'stable' ? item.id : index} />\n        ))}\n      </ul>\n      <p className=\"performance-practice-note\">\n        Edit a row, then reverse it. Index keys preserve state by position instead of product ID.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Each row initializes its own "
        },
        {
          "type": "inlineCode",
          "value": "draftLabel"
        },
        {
          "type": "text",
          "value": ". Reverse after editing the second line: "
        },
        {
          "type": "inlineCode",
          "value": "item.id"
        },
        {
          "type": "text",
          "value": " follows the product, React matches the state with the same ID; "
        },
        {
          "type": "inlineCode",
          "value": "0/1/2"
        },
        {
          "type": "text",
          "value": " remains in the position. The business item is changed but the row state is still retained according to the position, so the input content mismatches the product ID."
        }
      ]
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
          "value": "visibleItems"
        },
        {
          "type": "text",
          "value": " is a new array in the reversed branch; item objects are still the original references; "
        },
        {
          "type": "inlineCode",
          "value": "isReversed"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "keyMode"
        },
        {
          "type": "text",
          "value": " is parent snapshots; the state of each row exists in an independent identity slot managed by React; there is no ref/effect."
        }
      ]
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
          "value": " state is not stored in JSX tag, but is associated by React according to tree identity. index describes the \"current location\", not \"this product\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "key={Math.random()}"
        },
        {
          "type": "text",
          "value": " will generate a new identity for each render, causing remount and state to be lost; "
        },
        {
          "type": "inlineCode",
          "value": "key={index}"
        },
        {
          "type": "text",
          "value": " is prone to mismatching during insertion, deletion, and sorting. The identification method is to check whether the list changes and whether the key comes from a stable domain identity."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " Products, orders, and notifications should all use database/domain ID. It inherits the list key in Chapter 5 and explains that the correctness of reconciliation is a prerequisite for subsequent memoized rows."
        }
      ]
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
          "value": "key"
        },
        {
          "type": "text",
          "value": " tells React \"which sibling this is\" and the stable key protects the business identity; it does not cache computations."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-memo-and-shallow-prop-comparison",
      "children": [
        {
          "type": "text",
          "value": "9.4 "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " and Shallow Prop Comparison"
        }
      ]
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
          "value": "memo(Component)"
        },
        {
          "type": "text",
          "value": " is available in parent render when all props pass "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " comparison has not changed, and one render of the component is skipped; this is a performance optimization, not a semantic guarantee."
        }
      ]
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
          "value": " create "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": ", and avoid misunderstanding it as \"component never re-render\"."
        }
      ]
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
          "value": " For children who are expensive and often receive the same props, memo bailout can reduce the render work; for cheap children, the gain may outweigh the cost."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New API and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "memo(Component, arePropsEqual?)"
        },
        {
          "type": "text",
          "value": " returns the memoized component; the default is to use it item by item JavaScript "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": ". React will still render due to component own state or read context updates; browser does not understand memo; TypeScript retains the props contract of wrapped component; tooling/React Compiler may change the necessity of manual memo, but this project does not configure React Compiler."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is "
        },
        {
          "type": "inlineCode",
          "value": "const Memoized = memo(function Name(props) { ... })"
        },
        {
          "type": "text",
          "value": ". This chapter does not use a custom comparator because omitting function props can cause stale closure and deep comparisons can be slower than render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Full example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/04-react-memo-shallow-compare/react-memo-shallow-compare.tsx",
      "value": "import { memo, useState } from 'react'\n\ntype OrderSummaryProps = {\n  pendingCount: number\n}\n\nconst MemoizedOrderSummary = memo(function OrderSummary({ pendingCount }: OrderSummaryProps) {\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Memoized order summary</strong>\n      <p>{pendingCount} pending orders</p>\n    </section>\n  )\n})\n\nexport function ReactMemoShallowCompare() {\n  const [pendingCount, setPendingCount] = useState(4)\n  const [isCompact, setIsCompact] = useState(false)\n\n  return (\n    <article className={isCompact ? 'performance-practice-panel performance-panel-compact' : 'performance-practice-panel'}>\n      <p className=\"performance-practice-kicker\">04 / React.memo</p>\n      <h2>memo can skip a child when every prop is shallowly equal</h2>\n      <div className=\"performance-control-row\">\n        <button onClick={() => setIsCompact((compact) => !compact)} type=\"button\">\n          Toggle parent density\n        </button>\n        <button onClick={() => setPendingCount((count) => count + 1)} type=\"button\">\n          Add pending order\n        </button>\n      </div>\n      <MemoizedOrderSummary pendingCount={pendingCount} />\n      <p className=\"performance-practice-note\">\n        Density changes only parent state. Count changes the memoized child prop.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " Packaging "
        },
        {
          "type": "inlineCode",
          "value": "OrderSummary"
        },
        {
          "type": "text",
          "value": ". Switch "
        },
        {
          "type": "inlineCode",
          "value": "isCompact"
        },
        {
          "type": "text",
          "value": " only changes the parent class; pass in the child's primitive "
        },
        {
          "type": "inlineCode",
          "value": "pendingCount"
        },
        {
          "type": "text",
          "value": " still passes "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": ", React can bailout. After increasing the order count from "
        },
        {
          "type": "inlineCode",
          "value": "4"
        },
        {
          "type": "text",
          "value": " to "
        },
        {
          "type": "inlineCode",
          "value": "5"
        },
        {
          "type": "text",
          "value": ", comparison failed, child render and submit new text."
        }
      ]
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
          "value": " The two state snapshots are independent; the primitive count is compared by value; the parent's JSX/handlers are new references, but they are not "
        },
        {
          "type": "inlineCode",
          "value": "MemoizedOrderSummary"
        },
        {
          "type": "text",
          "value": " props; child None state/ref/effect closure."
        }
      ]
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
          "value": "memo"
        },
        {
          "type": "text",
          "value": " compares the props passed to the wrapped component. It does not compare all states of the parent, and it does not guarantee that cross-context/state updates will be skipped."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Normal "
        },
        {
          "type": "inlineCode",
          "value": "OrderSummary"
        },
        {
          "type": "text",
          "value": " will be recalculated with parent by default. Mechanical memoization, reliance on custom deep comparator, or thinking that memo repair is not pure render all violate the API's \"pure component + performance optimization\" premise. Use Profiler to compare "
        },
        {
          "type": "inlineCode",
          "value": "actualDuration"
        },
        {
          "type": "text",
          "value": " and check if the props are stable most of the time."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " SellerHub A large list of rows is a typical candidate: row rendering is costly, the quantity is large, and a single selection usually only changes a small number of props. This section is function/object props identity and "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " pave the way."
        }
      ]
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
          "value": "memo = props Object.is comparison + optional render bailout"
        },
        {
          "type": "text",
          "value": "; not cache data, not blocking state/context, not a correctness tool."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-referential-equality-for-object-and-function-props",
      "children": [
        {
          "type": "text",
          "value": "9.5 Referential Equality for Object and Function Props"
        }
      ]
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
          "value": " objects are the same, which does not mean that they are the same reference; inline object/function will make "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " 's shallow comparison sees prop changes."
        }
      ]
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
          "value": " explains why child has been "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " wrapper, may still be re-executed on every parent render."
        }
      ]
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
          "value": " memoization is valid depends on prop identity; JavaScript reference semantics must be understood first before deciding whether to stabilize the reference."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New keywords and hierarchical boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "referential equality"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "stable reference"
        },
        {
          "type": "text",
          "value": ". JavaScript runtime allocates a new object every time it evaluates object literal; React "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " uses "
        },
        {
          "type": "inlineCode",
          "value": "Object.is(previousProp, nextProp)"
        },
        {
          "type": "text",
          "value": "; browser and TypeScript will not automatically merge other content objects; tooling will not change this runtime identity. There is no new API in this section, the focus is on render work, identity and performance boundaries; the specific focus is the connection between JavaScript identity and React shallow comparison."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " primitive is always stable by value; object, array, and function are compared by reference. References to module-level immutable values ​​are stable within module lifetime, but can only be used for values ​​that do not depend on component state/props."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Full example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/05-referential-equality-props/referential-equality-props.tsx",
      "value": "import { memo, useState } from 'react'\n\ntype PricingPolicy = {\n  currency: 'USD'\n  taxRate: number\n}\n\nconst stablePricingPolicy: PricingPolicy = {\n  currency: 'USD',\n  taxRate: 0.08,\n}\n\nconst MemoizedPricingPolicy = memo(function PricingPolicyView({\n  policy,\n}: {\n  policy: PricingPolicy\n}) {\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Pricing policy</strong>\n      <p>\n        {policy.currency} / {policy.taxRate * 100}% tax\n      </p>\n    </section>\n  )\n})\n\nexport function ReferentialEqualityProps() {\n  const [parentTick, setParentTick] = useState(0)\n  const [useStableReference, setUseStableReference] = useState(false)\n  const policy = useStableReference\n    ? stablePricingPolicy\n    : { currency: 'USD' as const, taxRate: 0.08 }\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">05 / Referential equality</p>\n      <h2>Equal object contents do not imply equal object identity</h2>\n      <label className=\"performance-toggle-row\">\n        <input\n          checked={useStableReference}\n          onChange={(event) => setUseStableReference(event.currentTarget.checked)}\n          type=\"checkbox\"\n        />\n        <span>Reuse a stable module-level policy object</span>\n      </label>\n      <button onClick={() => setParentTick((tick) => tick + 1)} type=\"button\">\n        Re-render parent ({parentTick})\n      </button>\n      <MemoizedPricingPolicy policy={policy} />\n      <p className=\"performance-practice-note\">\n        The inline object is new on every parent render, so Object.is reports a changed prop.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " unstable mode evaluates "
        },
        {
          "type": "inlineCode",
          "value": "{ currency, taxRate }"
        },
        {
          "type": "text",
          "value": ", get a new reference; even if the fields are the same, "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " is false, child re-renders. stable mode reuse module binding, "
        },
        {
          "type": "inlineCode",
          "value": "parentTick"
        },
        {
          "type": "text",
          "value": " is updated, the policy reference remains unchanged and the memo can be bailed out."
        }
      ]
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
          "value": "parentTick"
        },
        {
          "type": "text",
          "value": " snapshot increment; inline "
        },
        {
          "type": "inlineCode",
          "value": "policy"
        },
        {
          "type": "text",
          "value": " identity changes every time; "
        },
        {
          "type": "inlineCode",
          "value": "stablePricingPolicy"
        },
        {
          "type": "text",
          "value": " identity remains unchanged; the same field primitive value cannot override the outer object identity. No ref/effect closure."
        }
      ]
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
          "value": " shallow comparison does not recursively check object contents, which makes comparison costs predictable and avoids arbitrary deep structure comparisons."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Incorrectly moving objects that rely on dynamic values to the module scope for memo will cause shared or expired data. Ask first if the object is static; consider it dynamic and expensive/as a memo prop "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": ". Seeing memoized child still render in React DevTools/Profiler, you should check object/array/function props identity one by one."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " filter options, context value, and row callbacks may destroy bailout due to inline allocation. This section connects the common JavaScript object model with the following "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
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
              "value": "Final memory model:"
            }
          ]
        },
        {
          "type": "text",
          "value": " content equality is not equal to reference equality; React shallow comparison observes reference and does not deeply compare business data for you."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-usememo-for-expensive-pure-derivations",
      "children": [
        {
          "type": "text",
          "value": "9.6 "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " for Expensive Pure Derivations"
        }
      ]
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
          "value": "useMemo(calculateValue, dependencies)"
        },
        {
          "type": "text",
          "value": " caches the calculation result; it only needs to be recalculated when the dependency changes. It should only be used for pure computation and performance optimization."
        }
      ]
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
          "value": " distinguishes between \"derived data can be recalculated every time\" and \"computation is really expensive and worth caching\"."
        }
      ]
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
          "value": " expensive on stable input filter/sort/aggregation, "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " can avoid duplication of unrelated render work; cheap expressions will increase dependency management costs."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New API and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " is React Hook; JavaScript executes callback and generates result; React saves result/dependency tuple and uses "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " compares each dependency; browser does not participate in cache; TypeScript infers result type but does not guarantee pure calculation; tooling's Strict Mode in development may call calculation twice to discover mutations."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const cachedValue = useMemo(calculateValue, dependencies)"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "calculateValue"
        },
        {
          "type": "text",
          "value": " must be parameterless, pure, synchronous return value; dependency list must be inline, fixed length, and contain all reactive values read in calculation; it cannot be used to guarantee program correctness."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Full example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/06-usememo-derived-data/usememo-expensive-derived-data.tsx",
      "value": "import { useMemo, useState } from 'react'\n\ntype Product = {\n  id: number\n  name: string\n  revenue: number\n}\n\nconst products: Product[] = Array.from({ length: 120 }, (_, index) => ({\n  id: index + 1,\n  name: `Product ${String(index + 1).padStart(3, '0')}`,\n  revenue: ((index * 37) % 500) + 50,\n}))\n\nfunction deriveVisibleProducts(query: string, sortDirection: 'asc' | 'desc') {\n  let checksum = 0\n\n  for (let index = 0; index < 40_000; index += 1) {\n    checksum = (checksum + index) % 997\n  }\n\n  const normalizedQuery = query.trim().toLowerCase()\n  const visibleProducts = products\n    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))\n    .sort((left, right) =>\n      sortDirection === 'asc' ? left.revenue - right.revenue : right.revenue - left.revenue,\n    )\n\n  return { checksum, visibleProducts }\n}\n\nexport function UseMemoExpensiveDerivedData() {\n  const [query, setQuery] = useState('')\n  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')\n  const [isHighlighted, setIsHighlighted] = useState(false)\n  const result = useMemo(\n    () => deriveVisibleProducts(query, sortDirection),\n    [query, sortDirection],\n  )\n\n  return (\n    <article className={isHighlighted ? 'performance-practice-panel performance-panel-highlighted' : 'performance-practice-panel'}>\n      <p className=\"performance-practice-kicker\">06 / useMemo result cache</p>\n      <h2>Cache an expensive pure derivation behind stable dependencies</h2>\n      <label className=\"performance-field\">\n        <span>Product query</span>\n        <input onChange={(event) => setQuery(event.currentTarget.value)} value={query} />\n      </label>\n      <div className=\"performance-control-row\">\n        <button\n          onClick={() => setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))}\n          type=\"button\"\n        >\n          Sort {sortDirection}\n        </button>\n        <button onClick={() => setIsHighlighted((highlighted) => !highlighted)} type=\"button\">\n          Toggle unrelated highlight\n        </button>\n      </div>\n      <p>\n        {result.visibleProducts.length} products / checksum {result.checksum}\n      </p>\n      <p className=\"performance-practice-note\">\n        Highlight updates re-render the component but reuse the cached derivation result.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " module-level products remain stable. The first render executes loop/filter/sort; when query or sort changes, dependency comparison fails and is recalculated; when only highlight is switched, the component still renders, but React returns the previous result reference and no longer performs derivation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, snapshot and cache changes:"
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
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "sortDirection"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "isHighlighted"
        },
        {
          "type": "text",
          "value": " are each state snapshot; "
        },
        {
          "type": "inlineCode",
          "value": "result"
        },
        {
          "type": "text",
          "value": " reuses the same reference when the dependencies are the same, and replaces it with a new object when the dependencies change; calculation closure captures the current query/sort; there is no ref/effect."
        }
      ]
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
          "value": " React associates result and dependency list to the current Hook slot. The cache hit is determined by the dependency identity and is not automatically determined by the function body content or runtime."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " directly calls "
        },
        {
          "type": "inlineCode",
          "value": "deriveVisibleProducts"
        },
        {
          "type": "text",
          "value": " is recalculated every time render is performed, but the logic is still correct. Leaking dependency will return stale result; mutate props/state in calculation will be amplified by Strict Mode double call. First use Profiler/CPU evidence to prove that the calculation is expensive, and then add "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": ", and confirm that removing it does not change the correct results."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " catalog big data filter/sort, dashboard aggregation are candidates; simple "
        },
        {
          "type": "inlineCode",
          "value": "orders.filter"
        },
        {
          "type": "text",
          "value": " is not necessarily required. This section connects the derived list in Chapter 5 with measurement driver performance optimization."
        }
      ]
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
          "value": "useMemo = cache calculation result by reactive dependencies"
        },
        {
          "type": "text",
          "value": "; Not state, not effect, not permanent cache."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-usecallback-for-function-identity",
      "children": [
        {
          "type": "text",
          "value": "9.7 "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " for Function Identity"
        }
      ]
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
          "value": "useCallback(fn, dependencies)"
        },
        {
          "type": "text",
          "value": " caches function reference and does not execute "
        },
        {
          "type": "inlineCode",
          "value": "fn"
        },
        {
          "type": "text",
          "value": " also does not cache the call results."
        }
      ]
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
          "value": " Explain why inline callback is a new reference every render, and when stable callback has observable value."
        }
      ]
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
          "value": " When function is a memoized child prop or other Hook dependency, stable identity can prevent meaningless failures; otherwise "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " usually has no profit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New API and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript creates closure; React saves function/dependencies and returns the same reference at the same dependency time; browser only calls handler when event; TypeScript checks parameters and return types; Effect only resynchronizes after dependency identity changes. "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": " is only used to observe identity, not an optimization tool."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const cachedFn = useCallback(fn, dependencies)"
        },
        {
          "type": "text",
          "value": "; The dependency list rules are the same as other Hooks. Using functional state updater can reduce the dependency generated just to read the old state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Complete example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/07-usecallback-identity/usecallback-function-identity.tsx",
      "value": "import { useCallback, useEffect, useState } from 'react'\n\ntype CallbackIdentityReporterProps = {\n  label: string\n  onAction: () => void\n}\n\nfunction CallbackIdentityReporter({ label, onAction }: CallbackIdentityReporterProps) {\n  useEffect(() => {\n    console.info(`${label} callback identity changed`)\n  }, [label, onAction])\n\n  return <button onClick={onAction} type=\"button\">Run {label} callback</button>\n}\n\nexport function UseCallbackFunctionIdentity() {\n  const [parentTick, setParentTick] = useState(0)\n  const [actionCount, setActionCount] = useState(0)\n  const stableAction = useCallback(() => {\n    setActionCount((count) => count + 1)\n  }, [])\n  const inlineAction = () => {\n    setActionCount((count) => count + 1)\n  }\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">07 / useCallback identity</p>\n      <h2>useCallback caches a function reference, not its execution result</h2>\n      <button onClick={() => setParentTick((tick) => tick + 1)} type=\"button\">\n        Re-render parent ({parentTick})\n      </button>\n      <div className=\"performance-control-row\">\n        <CallbackIdentityReporter label=\"inline\" onAction={inlineAction} />\n        <CallbackIdentityReporter label=\"stable\" onAction={stableAction} />\n      </div>\n      <p>Actions completed: {actionCount}</p>\n      <p className=\"performance-practice-note\">\n        Watch the console: the inline dependency changes on each render; the cached callback does not.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "inlineAction"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "stableAction"
        },
        {
          "type": "text",
          "value": " is reused when the empty dependency remains unchanged. After clicking the parent tick, both reporters are rendered due to the default propagation of the parent. However, after the commit, the Effect dependency of the inline reporter has changed, but that of the stable reporter has not. Both use the functional updater to increment the count when the callback is clicked."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, closures and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "parentTick"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "actionCount"
        },
        {
          "type": "text",
          "value": " is snapshots; inline closure reference changes every time; cached closure reference is stable and does not capture actionCount, so it will not be stale; Effect closure is replaced when dependency changes. No ref."
        }
      ]
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
          "value": " function expression is an object-like reference value. "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " does not make function faster, it only controls which closure reference React returns."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is added to the ordinary button handler separately with "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " usually has no benefit; empty dependency but reading changing state will produce stale closure. Identification asks \"Who observed this function identity?\" If there are no memoized children or Hook dependencies, caching is usually not necessary."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " product/order row of "
        },
        {
          "type": "inlineCode",
          "value": "onSelect"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "onOpen"
        },
        {
          "type": "text",
          "value": " are memoized child props; stabilizing them allows the other props of the row to stabilize and bailout."
        }
      ]
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
          "value": "useCallback = cache function reference"
        },
        {
          "type": "text",
          "value": "; The function is still running on event and the closure is still subject to dependency rules."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-combining-memo-with-usecallback",
      "children": [
        {
          "type": "text",
          "value": "9.8 Combining "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " with "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        }
      ]
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
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " is kept passed to "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " child; when one of the two is missing, this specific bailout link may not be established."
        }
      ]
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
          "value": " combines independent APIs into a verifiable optimization mechanism."
        }
      ]
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
          "value": " When the parent has unrelated state and child render is expensive, stable data props + stable callback + memoized child can be used to reduce render work."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New concepts and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "memoization composition"
        },
        {
          "type": "text",
          "value": ". JavaScript closure reference is the comparison object; React first compares child props and then decides bailout; browser event triggers cached handler; TypeScript checks "
        },
        {
          "type": "inlineCode",
          "value": "(productId: string) => void"
        },
        {
          "type": "text",
          "value": " contract; Profiler can prove whether the combination is worth it. There is no new API in this section, the focus is on render work, identity and performance boundaries; the specific focus is "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
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
              "value": "Fixed rule:"
            }
          ]
        },
        {
          "type": "text",
          "value": " child must be pure; each prop passed in must be stable or indeed unchanged; callback dependencies must be complete. Stable callbacks alone cannot offset another object prop that is created each time."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Complete example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/08-memo-callback-composition/memo-callback-composition.tsx",
      "value": "import { memo, useCallback, useState } from 'react'\n\ntype ProductActionRowProps = {\n  productId: string\n  productName: string\n  onRestock: (productId: string) => void\n}\n\nconst MemoizedProductActionRow = memo(function ProductActionRow({\n  productId,\n  productName,\n  onRestock,\n}: ProductActionRowProps) {\n  return (\n    <section className=\"performance-result-box\">\n      <strong>{productName}</strong>\n      <button onClick={() => onRestock(productId)} type=\"button\">\n        Restock\n      </button>\n    </section>\n  )\n})\n\nexport function MemoCallbackComposition() {\n  const [searchDraft, setSearchDraft] = useState('')\n  const [lastRestockedId, setLastRestockedId] = useState<string | null>(null)\n  const handleRestock = useCallback((productId: string) => {\n    setLastRestockedId(productId)\n  }, [])\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">08 / memo and useCallback</p>\n      <h2>Stable callback identity matters when a memoized child receives it</h2>\n      <label className=\"performance-field\">\n        <span>Unrelated parent search draft</span>\n        <input\n          onChange={(event) => setSearchDraft(event.currentTarget.value)}\n          value={searchDraft}\n        />\n      </label>\n      <MemoizedProductActionRow\n        onRestock={handleRestock}\n        productId=\"lamp-101\"\n        productName=\"Arc Desk Lamp\"\n      />\n      <p>Last restocked: {lastRestockedId ?? 'none'}</p>\n      <p className=\"performance-practice-note\">\n        Without useCallback, a new onRestock function would invalidate the memo comparison.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " typing update parent "
        },
        {
          "type": "inlineCode",
          "value": "searchDraft"
        },
        {
          "type": "text",
          "value": "; primitive product props remain unchanged, "
        },
        {
          "type": "inlineCode",
          "value": "handleRestock"
        },
        {
          "type": "text",
          "value": " reference also remains unchanged, all memo comparisons pass, and row can be skipped. When Restock is clicked, the child's local wrapper calls the stable parent callback and updates "
        },
        {
          "type": "inlineCode",
          "value": "lastRestockedId"
        },
        {
          "type": "text",
          "value": "; if the ID starts from "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " becomes "
        },
        {
          "type": "inlineCode",
          "value": "lamp-101"
        },
        {
          "type": "text",
          "value": ", parent render, but child props can still be equal."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variable, closure and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " search/last ID snapshots change; "
        },
        {
          "type": "inlineCode",
          "value": "handleRestock"
        },
        {
          "type": "text",
          "value": " closure is stable and only calls stable setter; "
        },
        {
          "type": "inlineCode",
          "value": "() => onRestock(productId)"
        },
        {
          "type": "text",
          "value": " will be created when the child renders, but it is not a comparison prop passed in from the parent. None ref/effect."
        }
      ]
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
          "value": " bailout occurs before entering the wrapped child; React compares the three props passed in by parent. The inner event wrapper is only recreated when the child actually renders."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " will be "
        },
        {
          "type": "inlineCode",
          "value": "onRestock={(id) => setLastRestockedId(id)}"
        },
        {
          "type": "text",
          "value": " directly will generate a new function every time, destroying shallow equality. If the child itself is cheap, the portfolio may still have no perceived benefit. The identification path is Profiler -> changed props -> JS identity -> dependencies."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " A large number of product/order rows receive stable domain objects and shared action callbacks, which are the core optimization boundaries of the final project."
        }
      ]
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
          "value": "memo child"
        },
        {
          "type": "text",
          "value": " only has a chance to bailout when \"all props identity is stable\"; "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " is only responsible for the function prop."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-state-colocation-before-memoization",
      "children": [
        {
          "type": "text",
          "value": "9.9 State Colocation Before Memoization"
        }
      ]
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
          "value": " Putting the transient state into the minimum necessary owner is usually more straightforward than adding memoization to an overly large subtree."
        }
      ]
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
          "value": " Avoid treating the large render scope caused by high-level state as the only way to rely on "
        },
        {
          "type": "inlineCode",
          "value": "memo"
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
          "value": " state colocation also improves ownership, readability and render scope without introducing dependency/cache invalidation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New concepts and hierarchical boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "state colocation"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "render scope"
        },
        {
          "type": "text",
          "value": ". JavaScript function scope expresses ownership; React schedules updates starting from the state owner; browser only submits changes; TypeScript constrains local union/string; tooling cannot replace component boundary design. There are no new APIs in this section, the focus is on render work, identity and performance boundaries; the specific focus is state ownership and render boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying mechanism and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " state update takes the component holding the Hook as the update starting point. If sibling does not need this state, it should not unconditionally lift state up for \"centralized management\". It is only promoted when multiple components actually share the same source of truth."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Complete example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/09-state-colocation/state-colocation-render-scope.tsx",
      "value": "import { useState } from 'react'\n\nfunction LocalOrderFilterDraft() {\n  const [statusDraft, setStatusDraft] = useState('all')\n\n  return (\n    <label className=\"performance-field\">\n      <span>Locally owned status draft</span>\n      <select\n        onChange={(event) => setStatusDraft(event.currentTarget.value)}\n        value={statusDraft}\n      >\n        <option value=\"all\">All</option>\n        <option value=\"pending\">Pending</option>\n        <option value=\"shipped\">Shipped</option>\n      </select>\n    </label>\n  )\n}\n\nfunction StableSellerSummary() {\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Independent seller summary</strong>\n      <p>$18,420 monthly revenue</p>\n    </section>\n  )\n}\n\nexport function StateColocationRenderScope() {\n  const [shellDensity, setShellDensity] = useState<'comfortable' | 'compact'>('comfortable')\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">09 / State colocation</p>\n      <h2>Move transient state to the smallest owner before adding memoization</h2>\n      <button\n        onClick={() =>\n          setShellDensity((density) => (density === 'comfortable' ? 'compact' : 'comfortable'))\n        }\n        type=\"button\"\n      >\n        Shell density: {shellDensity}\n      </button>\n      <LocalOrderFilterDraft />\n      <StableSellerSummary />\n      <p className=\"performance-practice-note\">\n        Editing the draft updates its component, not this parent or the independent summary.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " status draft is located at "
        },
        {
          "type": "inlineCode",
          "value": "LocalOrderFilterDraft"
        },
        {
          "type": "text",
          "value": ". When modifying select, React updates from the child and does not call parent and sibling summary. The parent is updated only after switching density, and descendants are calculated according to the default rules."
        }
      ]
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
          "value": "statusDraft"
        },
        {
          "type": "text",
          "value": " belongs to child snapshot; "
        },
        {
          "type": "inlineCode",
          "value": "shellDensity"
        },
        {
          "type": "text",
          "value": " belongs to the parent snapshot; the two states queues/identities are separated. select event closure updated with child render; no ref/effect."
        }
      ]
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
          "value": " React The update starting point is determined by the state owner. The ownership structure of the component tree naturally forms the render work boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "statusDraft"
        },
        {
          "type": "text",
          "value": " into parent, and then add "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": ", can partially skip the work, but let the irrelevant parent render every time. The identification method is to draw the \"who reads, who writes\" relationship; the state of only one local consumer should be moved down first."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " catalog is left in the filter form, and the URL state is written after submission; this reduces the impact of typing on the product list, and also takes over the state ownership and URL state chapters."
        }
      ]
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
          "value": " Narrow the state owner first, then evaluate the memo; the least affected tree is often the best optimization."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-context-value-identity-and-consumer-updates",
      "children": [
        {
          "type": "text",
          "value": "9.10 Context Value Identity and Consumer Updates"
        }
      ]
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
          "value": " Context provider's "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " by "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " determines whether it has changed; even if the consumer is changed by "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " package will also be updated when the context value read changes."
        }
      ]
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
          "value": " explains how inline context object/function causes all consumers to be updated after the provider owner's unrelated render."
        }
      ]
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
          "value": " Under high-frequency providers, stable value identity can reduce irrelevant consumer work; but more importantly, keep the context granularity reasonable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New API and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "createContext"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useContext"
        },
        {
          "type": "text",
          "value": ", Provider "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", and "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": ". JavaScript object/function references constitute value identity; React propagates changed context; browser does not understand context; "
        },
        {
          "type": "inlineCode",
          "value": "PerformancePreferences | null"
        },
        {
          "type": "text",
          "value": " forces processing of missing provider; tooling can be used with React DevTools/Profiler to observe consumer updates."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "createContext(defaultValue)"
        },
        {
          "type": "text",
          "value": " is only used when there is no matching provider; "
        },
        {
          "type": "inlineCode",
          "value": "useContext(Context)"
        },
        {
          "type": "text",
          "value": " reads the latest provider; the fixed prop name of provider is "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " only compares props and cannot intercept the context subscribed by the component itself."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Full example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/10-context-value-boundary/context-value-identity-boundary.tsx",
      "value": "import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react'\n\ntype Density = 'comfortable' | 'compact'\n\ntype PerformancePreferences = {\n  density: Density\n  toggleDensity: () => void\n}\n\nconst PerformancePreferencesContext = createContext<PerformancePreferences | null>(null)\n\nconst MemoizedPreferenceConsumer = memo(function PreferenceConsumer() {\n  const preferences = useContext(PerformancePreferencesContext)\n\n  if (!preferences) {\n    throw new Error('PreferenceConsumer requires PerformancePreferencesContext')\n  }\n\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Context consumer</strong>\n      <p>Density: {preferences.density}</p>\n      <button onClick={preferences.toggleDensity} type=\"button\">\n        Toggle density\n      </button>\n    </section>\n  )\n})\n\nexport function ContextValueIdentityBoundary() {\n  const [density, setDensity] = useState<Density>('comfortable')\n  const [unrelatedTick, setUnrelatedTick] = useState(0)\n  const toggleDensity = useCallback(() => {\n    setDensity((currentDensity) =>\n      currentDensity === 'comfortable' ? 'compact' : 'comfortable',\n    )\n  }, [])\n  const contextValue = useMemo(\n    () => ({ density, toggleDensity }),\n    [density, toggleDensity],\n  )\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">10 / Context value identity</p>\n      <h2>Consumers update when the provided value changes by Object.is</h2>\n      <button onClick={() => setUnrelatedTick((tick) => tick + 1)} type=\"button\">\n        Re-render provider owner ({unrelatedTick})\n      </button>\n      <PerformancePreferencesContext.Provider value={contextValue}>\n        <MemoizedPreferenceConsumer />\n      </PerformancePreferencesContext.Provider>\n      <p className=\"performance-practice-note\">\n        The memoized value stays stable during unrelated owner updates.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "toggleDensity"
        },
        {
          "type": "text",
          "value": " is stable under empty dependencies; "
        },
        {
          "type": "inlineCode",
          "value": "contextValue"
        },
        {
          "type": "text",
          "value": " becomes a new object only when density changes. Unrelated tick updates render owner, but provider value passes "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": ", memoized consumer can be skipped. After clicking the consumer button, the density changes and the value changes, and React must update the consumer."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variable, closure and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "density"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "unrelatedTick"
        },
        {
          "type": "text",
          "value": " is snapshots; toggle closure is stable and reads the latest value through functional updater; context value is reused when density remains unchanged; consumer reads the current context for each actual render. None ref/effect."
        }
      ]
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
          "value": " context subscription is an independent update channel, not an ordinary prop. Stable provider values ​​avoid issuing meaningless context changes."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "value={{ density, toggleDensity: () => ... }}"
        },
        {
          "type": "text",
          "value": " generates two layers of new references each time. Add "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " But the unstable provider value cannot be resolved. Check provider "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " is inline, whether the context is too large, and whether the consumer reads frequently changing but unnecessary fields."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " density/preferences is a cross-page configuration suitable for context; catalog filter is not. The final project splits the context contract and provider to avoid Fast Refresh export conflicts and maintain value identity."
        }
      ]
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
          "value": " context consumer driven by provider value identity; "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " does not block real context updates."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-using-the-profiler-to-make-evidence-based-decisions",
      "children": [
        {
          "type": "text",
          "value": "9.11 Using the Profiler to Make Evidence-Based Decisions"
        }
      ]
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
          "value": "<Profiler id onRender>"
        },
        {
          "type": "text",
          "value": " measures the committed render cost of its subtree; measure first, then select state colocation, memoization or code boundary."
        }
      ]
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
          "value": " converts \"feels slow\" and \"renders many times\" into comparable duration/phase evidence."
        }
      ]
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
          "value": " Profiler can display "
        },
        {
          "type": "inlineCode",
          "value": "actualDuration"
        },
        {
          "type": "text",
          "value": " and use "
        },
        {
          "type": "inlineCode",
          "value": "baseDuration"
        },
        {
          "type": "text",
          "value": " Estimated cost baseline without memoization."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New API and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "Profiler"
        },
        {
          "type": "text",
          "value": " is a React instrumentation component; JavaScript callback receives timing arguments; React calls "
        },
        {
          "type": "inlineCode",
          "value": "onRender"
        },
        {
          "type": "text",
          "value": "; browser timing API provides clock but Profiler is not equal to complete layout/paint trace; "
        },
        {
          "type": "inlineCode",
          "value": "ProfilerOnRenderCallback"
        },
        {
          "type": "text",
          "value": " verification signature; development tooling has profiling overhead, production profiling build is turned off by default."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name and signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " required props is "
        },
        {
          "type": "inlineCode",
          "value": "id: string"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "onRender: ProfilerOnRenderCallback"
        },
        {
          "type": "text",
          "value": ". The main parameter is "
        },
        {
          "type": "inlineCode",
          "value": "id"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "phase"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "actualDuration"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "baseDuration"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "startTime"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "commitTime"
        },
        {
          "type": "text",
          "value": "; The callback only records evidence and should not update the state to form a loop."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Full example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/11-profiler-evidence/profiler-render-evidence.tsx",
      "value": "import { Profiler, useState } from 'react'\nimport type { ProfilerOnRenderCallback } from 'react'\n\nfunction DashboardMetricPanel({ orderCount }: { orderCount: number }) {\n  let checksum = 0\n\n  for (let index = 0; index < 50_000; index += 1) {\n    checksum = (checksum + orderCount + index) % 1_009\n  }\n\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Dashboard metric</strong>\n      <p>{orderCount} orders / checksum {checksum}</p>\n    </section>\n  )\n}\n\nconst handleProfileRender: ProfilerOnRenderCallback = (\n  id,\n  phase,\n  actualDuration,\n  baseDuration,\n  startTime,\n  commitTime,\n) => {\n  console.info('Profiler evidence', {\n    actualDuration,\n    baseDuration,\n    commitTime,\n    id,\n    phase,\n    startTime,\n  })\n}\n\nexport function ProfilerRenderEvidence() {\n  const [orderCount, setOrderCount] = useState(12)\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">11 / Profiler evidence</p>\n      <h2>Measure a committed subtree before choosing an optimization</h2>\n      <button onClick={() => setOrderCount((count) => count + 1)} type=\"button\">\n        Add order\n      </button>\n      <Profiler id=\"DashboardMetricPanel\" onRender={handleProfileRender}>\n        <DashboardMetricPanel orderCount={orderCount} />\n      </Profiler>\n      <p className=\"performance-practice-note\">\n        Inspect actualDuration and baseDuration in the browser console.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " dashboard calculation is executed in render; React calls typed callback after completing subtree commit. The first phase is mount, and the subsequent phase is update; "
        },
        {
          "type": "inlineCode",
          "value": "actualDuration"
        },
        {
          "type": "text",
          "value": " is the time spent on this render, "
        },
        {
          "type": "inlineCode",
          "value": "baseDuration"
        },
        {
          "type": "text",
          "value": " Estimate the cost of the entire subtree without using memo optimization."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables and evidence changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " orderCount snapshot is incremented; checksum is a local variable for each render; callback is a stable module binding; Profiler values are newly generated for each commit, and there is no ref/effect closure."
        }
      ]
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
          "value": " Profiler instrument records React render work; it does not automatically optimize and does not fully measure network, DOM layout, paint, or device-level interaction latency."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "console.time"
        },
        {
          "type": "text",
          "value": " placed in render can easily be misread by Strict Mode/aborted work; only looking at the development value once is also unreliable. interaction/data/device should be fixed, compared multiple times, combined with React DevTools Profiler, Performance panel and production-like build."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " Use Profiler to compare catalog typing, filter commit, row selection and route navigation to determine whether the bottleneck is calculation, child render or chunk loading."
        }
      ]
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
          "value": " Profiler provides React render evidence; real performance conclusions need to be supported by repeatable scenarios and browser/network evidence."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-lazy-suspense-and-code-splitting",
      "children": [
        {
          "type": "text",
          "value": "9.12 "
        },
        {
          "type": "inlineCode",
          "value": "lazy"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Suspense"
        },
        {
          "type": "text",
          "value": ", and Code Splitting"
        }
      ]
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
          "value": "lazy(load)"
        },
        {
          "type": "text",
          "value": " delayed execution dynamic "
        },
        {
          "type": "inlineCode",
          "value": "import()"
        },
        {
          "type": "text",
          "value": " and cache Promise/resolved component; "
        },
        {
          "type": "inlineCode",
          "value": "Suspense"
        },
        {
          "type": "text",
          "value": " render "
        },
        {
          "type": "inlineCode",
          "value": "fallback"
        },
        {
          "type": "text",
          "value": ". This solves the problem of JavaScript delivery, which does not automatically obtain business data."
        }
      ]
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
          "value": " distinguishes render optimization from bundle/code delivery optimization, and clarifies the responsibilities of React, JavaScript module, Vite and browser network."
        }
      ]
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
          "value": " page/feature boundary can reduce initial JavaScript, while excessive subdivision will increase request, fallback and maintenance costs."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New API and layered boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript "
        },
        {
          "type": "inlineCode",
          "value": "import()"
        },
        {
          "type": "text",
          "value": " returns Promise and resolves module namespace; React "
        },
        {
          "type": "inlineCode",
          "value": "lazy"
        },
        {
          "type": "text",
          "value": " read module "
        },
        {
          "type": "inlineCode",
          "value": "default"
        },
        {
          "type": "text",
          "value": " export and let subtree suspend; "
        },
        {
          "type": "inlineCode",
          "value": "Suspense"
        },
        {
          "type": "text",
          "value": " Receive fixed prop "
        },
        {
          "type": "inlineCode",
          "value": "fallback"
        },
        {
          "type": "text",
          "value": "; Vite/Rollup Build dynamic import into independent chunks and process preload/common chunks; browser requests, parses, and executes chunks; TypeScript checks module/default component shape."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const LazyComponent = lazy(() => import('./module'))"
        },
        {
          "type": "text",
          "value": " should be declared outside the component; the loaded module must provide default export; use "
        },
        {
          "type": "inlineCode",
          "value": "<Suspense fallback={...}>"
        },
        {
          "type": "text",
          "value": " surrounds a subtree that may be suspended. Ordinary Effect/event data fetching will not automatically trigger Suspense."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "complete example, load target:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-dashboard-panel.tsx",
      "value": "export default function LazyDashboardPanel() {\n  return (\n    <section className=\"performance-result-box\">\n      <strong>Lazy dashboard panel loaded</strong>\n      <p>This module arrived through a dynamic import chunk.</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "complete example, lazy boundary:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-suspense-code-splitting.tsx",
      "value": "import { lazy, Suspense, useState } from 'react'\n\nconst LazyDashboardPanel = lazy(() => import('./lazy-dashboard-panel'))\n\nexport function LazySuspenseCodeSplitting() {\n  const [showPanel, setShowPanel] = useState(false)\n\n  return (\n    <article className=\"performance-practice-panel\">\n      <p className=\"performance-practice-kicker\">12 / Lazy code boundary</p>\n      <h2>lazy caches a module promise; Suspense renders the loading fallback</h2>\n      <button onClick={() => setShowPanel((visible) => !visible)} type=\"button\">\n        {showPanel ? 'Hide lazy panel' : 'Load lazy panel'}\n      </button>\n      {showPanel && (\n        <Suspense fallback={<p className=\"performance-loading-state\">Loading code chunk...</p>}>\n          <LazyDashboardPanel />\n        </Suspense>\n      )}\n      <p className=\"performance-practice-note\">\n        This boundary loads component code. It does not fetch dashboard data.\n      </p>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and mechanism evidence chain:"
            }
          ]
        },
        {
          "type": "text",
          "value": " initial show is false, and lazy module is not requested. When it is first displayed, React calls the load function, and the dynamic import request chunk generated by Vite; when the Promise is pending, the boundary displays fallback; after the module is parsed and the default component is available, React retries render and commits the panel. Hiding and showing again will reuse the lazy cache and will not call load again."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, Promise and reference changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "showPanel"
        },
        {
          "type": "text",
          "value": " snapshot changes; module-scope Lazy component identity is stable; first request creates Promise, React caches Promise and resolved component; Suspense fallback is an alternative UI for pending render. No ref/effect closure."
        }
      ]
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
          "value": "import()"
        },
        {
          "type": "text",
          "value": " is the language/host module loading mechanism. Vite converts statically analyzable dynamic import into chunk graph, and React only coordinates the render state of \"component code not ready\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " static import will put the module into the current eager graph; declare "
        },
        {
          "type": "inlineCode",
          "value": "lazy"
        },
        {
          "type": "text",
          "value": " will create a new component type and reset the state each time; missing default export will fail after load; treating data fetch Effect as a Suspense source violates the support boundary. Network panel and "
        },
        {
          "type": "inlineCode",
          "value": "vite build"
        },
        {
          "type": "text",
          "value": " chunk names are direct evidence of code splitting."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " catalog/orders/dashboard is a natural page boundary; commonly used shell/navigation remains eager and the page implementation is lazy. It takes over routing and leaves a boundary for future framework/data APIs, but this chapter does not introduce a new data library."
        }
      ]
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
          "value": "dynamic import -> bundler chunk -> browser request -> lazy promise -> Suspense fallback -> resolved component commit"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-performance-decisions-to-sellerhub",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping Performance Decisions to SellerHub"
        }
      ]
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
          "value": " SellerHub The optimization sequence should be: confirm the interaction target, measure the bottleneck, correct the state/component boundary, then select memoization or code splitting, and finally retest."
        }
      ]
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
          "value": " Translate API knowledge into reviewable engineering decisions instead of adding cache to all components."
        }
      ]
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
          "value": " Different problems belong to different layers: typing lag may be render scope/derivation, slow navigation may be chunk/network, layout shift may be browser/CSS; a single React API cannot cover them all."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "New concepts and hierarchical boundaries:"
            }
          ]
        },
        {
          "type": "text",
          "value": " There are no new APIs in this section, the focus is on render work, identity and performance boundaries. JavaScript layer looks at calculation and reference allocation; React layer looks at update source, render tree, memo/context; browser layer looks at network, DOM, layout, paint; TypeScript layer only provides contracts and does not improve runtime speed; tooling layer uses Profiler, Network, Performance and build output Gather evidence."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "The underlying decision rule:"
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
            "value": "SellerHub Scene"
          }
        ],
        [
          {
            "type": "text",
            "value": "Confirm first"
          }
        ],
        [
          {
            "type": "text",
            "value": "Priority means"
          }
        ],
        [
          {
            "type": "text",
            "value": "should not be done first"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Catalog typing"
            }
          ],
          [
            {
              "type": "text",
              "value": "draft owner, derived list whether to calculate"
            }
          ],
          [
            {
              "type": "text",
              "value": "state colocation; updated after submission URL"
            }
          ],
          [
            {
              "type": "text",
              "value": "Full tree "
            },
            {
              "type": "inlineCode",
              "value": "memo"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Product/order rows"
            }
          ],
          [
            {
              "type": "text",
              "value": "row quantity, render cost, changed props"
            }
          ],
          [
            {
              "type": "text",
              "value": "stable domain object, stable callback, "
            },
            {
              "type": "inlineCode",
              "value": "memo"
            }
          ],
          [
            {
              "type": "text",
              "value": "custom deep comparator"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Dashboard aggregation"
            }
          ],
          [
            {
              "type": "text",
              "value": "calculation duration, dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "pure function + "
            },
            {
              "type": "inlineCode",
              "value": "useMemo"
            }
          ],
          [
            {
              "type": "text",
              "value": "Copy the result into state/Effect"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Preferences"
            }
          ],
          [
            {
              "type": "text",
              "value": "provider value identity, context granularity"
            }
          ],
          [
            {
              "type": "text",
              "value": "split context; stable value"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "memo"
            },
            {
              "type": "text",
              "value": " blocks real context change"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Route navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "initial JS, chunk waterfall, fallback"
            }
          ],
          [
            {
              "type": "text",
              "value": "route-level "
            },
            {
              "type": "inlineCode",
              "value": "lazy"
            },
            {
              "type": "text",
              "value": " + "
            },
            {
              "type": "inlineCode",
              "value": "Suspense"
            }
          ],
          [
            {
              "type": "text",
              "value": "Each small icon separate chunk"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Unclear \"slow\""
            }
          ],
          [
            {
              "type": "text",
              "value": "reproducible interaction"
            }
          ],
          [
            {
              "type": "text",
              "value": "Profiler + browser evidence"
            }
          ],
          [
            {
              "type": "text",
              "value": "Guess"
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
              "value": "concept sample code:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This decision record is only used to review the judgment steps and is not a real document that needs to be created."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: performance decision record",
      "value": "type PerformanceDecision = {\n  interaction: string\n  measuredProblem: string\n  change: string\n  evidence: string\n}\n\nconst catalogDecision: PerformanceDecision = {\n  interaction: 'Commit catalog filters',\n  measuredProblem: 'The expensive visible-list derivation repeats for unrelated updates',\n  change: 'Keep draft state local and memoize only the pure committed derivation',\n  evidence: 'Compare Profiler durations before and after the boundary change',\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain and change tracking:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Take catalog as an example: local draft only updates form; URL search params changes after submit; page render gets new committed query; "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " dependency changes and generates new visible products array; memoized rows compares product/callback props; React commit necessary list changes; browser draws the results. There is no ref/effect closure here, the callback closure is kept correct by full dependencies or functional updater."
        }
      ]
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
          "value": " Each method targets different invalidation sources. state colocation changes the update starting point, "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " changes child bailout, "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " changes calculation reuse, "
        },
        {
          "type": "inlineCode",
          "value": "useCallback"
        },
        {
          "type": "text",
          "value": " changes function identity, lazy changes delivery time."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparison, error and identification:"
            }
          ]
        },
        {
          "type": "text",
          "value": " \"Using memo will make it faster\" violates the evidence-first principle; \"bundle becomes smaller, so interaction must be faster\" ignores request/parsing/fallback; \"TypeScript will optimize types\" confuses compile time and runtime. When identifying similar errors, it is required to state metric, layer, invalidation source, before/after evidence."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the main line of learning:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This chapter combines props, state, lists, effects, context, reducers, and routing into a performance perspective; the final project is not a complete SellerHub, but a controlled workspace that verifies the boundaries of these mechanisms."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Location of follow-up tools:"
            }
          ]
        },
        {
          "type": "text",
          "value": " virtualization solves the DOM/paint scale of ultra-long visible lists; server pagination first reduces transmission and client data volume; TanStack Query cache management server-state request/cache lifecycle, does not replace render memoization; React Compiler can automate part component/value memoization, but does not fix state ownership, network, or key correctness. This chapter only identifies the boundaries, not installing or configuring them."
        }
      ]
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
          "value": "measure -> locate layer -> reduce invalidation/work/delivery -> measure again"
        },
        {
          "type": "text",
          "value": "; When there is no evidence, simple and correct code takes precedence."
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
            "value": "API / Syntax"
          }
        ],
        [
          {
            "type": "text",
            "value": "Save or compare what"
          }
        ],
        [
          {
            "type": "text",
            "value": "Applicable conditions"
          }
        ],
        [
          {
            "type": "text",
            "value": "is not responsible for anything"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "memo(Component)"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "Object.is"
            },
            {
              "type": "text",
              "value": " shallow compare props"
            }
          ],
          [
            {
              "type": "text",
              "value": "expensive child often receives the same props"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not block itself state/context update"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useMemo(calculate, deps)"
            }
          ],
          [
            {
              "type": "text",
              "value": "calculation result and deps"
            }
          ],
          [
            {
              "type": "text",
              "value": "Expensive pure derivation, stable dependence"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not guarantee correctness and does not perform side effects"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useCallback(fn, deps)"
            }
          ],
          [
            {
              "type": "text",
              "value": "function reference and deps"
            }
          ],
          [
            {
              "type": "text",
              "value": "function identity was observed by memo/dependency"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not cache the call results and does not make the function faster"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<Profiler id onRender>"
            }
          ],
          [
            {
              "type": "text",
              "value": "committed subtree timing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Repeatable render measurement"
            }
          ],
          [
            {
              "type": "text",
              "value": "Incomplete coverage network/layout/paint"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "lazy(load)"
            }
          ],
          [
            {
              "type": "text",
              "value": "load Promise with resolved default component"
            }
          ],
          [
            {
              "type": "text",
              "value": "larger page/feature code boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Does not obtain business data and does not process error"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<Suspense fallback>"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending subtree replacement UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "lazy or other Suspense-enabled source"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not error boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "import('./module')"
            }
          ],
          [
            {
              "type": "text",
              "value": "Promise/module namespace"
            }
          ],
          [
            {
              "type": "text",
              "value": "bundler statically analyzable dynamic import"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not automatically optimized by TypeScript"
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
              "value": "sibling identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "list reorder, explicit reset identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not passed as a normal prop and is not cached render"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Object.is(a, b)"
            }
          ],
          [
            {
              "type": "text",
              "value": "SameValue equality"
            }
          ],
          [
            {
              "type": "text",
              "value": "React deps/props/context identity model"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not recursively compare object content"
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
            "value": "Observable Consequences"
          }
        ],
        [
          {
            "type": "text",
            "value": "Identification and correction"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "child function is called, it is assumed that the DOM is reconstructed"
            }
          ],
          [
            {
              "type": "text",
              "value": "render is not equal to commit"
            }
          ],
          [
            {
              "type": "text",
              "value": "Error optimization target"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses Profiler + DOM mutation to confirm"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "are covered by "
            },
            {
              "type": "inlineCode",
              "value": "memo"
            }
          ],
          [
            {
              "type": "text",
              "value": "memo There must be expensive work that can be skipped"
            }
          ],
          [
            {
              "type": "text",
              "value": "Comparison and cognitive cost increase"
            }
          ],
          [
            {
              "type": "text",
              "value": "First measure the stable props and duration"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "useMemo"
            }
          ],
          [
            {
              "type": "text",
              "value": "cache only serves explicit income"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependency noise"
            }
          ],
          [
            {
              "type": "text",
              "value": "cheap derivation directly counts as"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thinks "
            },
            {
              "type": "inlineCode",
              "value": "useCallback"
            },
            {
              "type": "text",
              "value": " Make calls faster"
            }
          ],
          [
            {
              "type": "text",
              "value": "It only caches identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "Zero income when there is no consumer"
            }
          ],
          [
            {
              "type": "text",
              "value": "found observation identity memo/Hook"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "memo child received inline object/function"
            }
          ],
          [
            {
              "type": "text",
              "value": "shallow compare see new reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "bailout failed"
            }
          ],
          [
            {
              "type": "text",
              "value": "Shrink props or stabilize by evidence reference"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "is memo twisted state owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture takes precedence over cache"
            }
          ],
          [
            {
              "type": "text",
              "value": "ownership is complex and dependent on"
            }
          ],
          [
            {
              "type": "text",
              "value": "first state colocation"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "dependency Write less"
            }
          ],
          [
            {
              "type": "text",
              "value": "reactive dependency must be complete"
            }
          ],
          [
            {
              "type": "text",
              "value": "stale result/closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read value and dependency check"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useMemo"
            },
            {
              "type": "text",
              "value": " in request, storage, "
            },
            {
              "type": "inlineCode",
              "value": "setState"
            }
          ],
          [
            {
              "type": "text",
              "value": "render calculation must be pure"
            }
          ],
          [
            {
              "type": "text",
              "value": "Repeat side effect or render loop"
            }
          ],
          [
            {
              "type": "text",
              "value": "moved to event/effect/ correctly external boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Provider inline value"
            }
          ],
          [
            {
              "type": "text",
              "value": "context value compare"
            }
          ],
          [
            {
              "type": "text",
              "value": "consumers unrelated updates"
            }
          ],
          [
            {
              "type": "text",
              "value": "Narrow context; memoize value"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "random key"
            }
          ],
          [
            {
              "type": "text",
              "value": "key must be stable"
            }
          ],
          [
            {
              "type": "text",
              "value": "loses"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses domain ID"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reorder list using index key"
            }
          ],
          [
            {
              "type": "text",
              "value": "index is not a business identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "row state misalignment"
            }
          ],
          [
            {
              "type": "text",
              "value": "is stable to use sibling key"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thinks "
            },
            {
              "type": "inlineCode",
              "value": "lazy"
            },
            {
              "type": "text",
              "value": " acceleration data request"
            }
          ],
          [
            {
              "type": "text",
              "value": "lazy only loads code module"
            }
          ],
          [
            {
              "type": "text",
              "value": "The data timing has not changed at all"
            }
          ],
          [
            {
              "type": "text",
              "value": "separates code loading from data lifecycle"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "lazy subtree no Suspense"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending code requires fallback boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "nearest boundary missing/UX broken"
            }
          ],
          [
            {
              "type": "text",
              "value": "is surrounded by"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Every small component is lazy"
            }
          ],
          [
            {
              "type": "text",
              "value": "chunk boundary should have sufficient granularity"
            }
          ],
          [
            {
              "type": "text",
              "value": "requests are too fragmented and fallback is frequent"
            }
          ],
          [
            {
              "type": "text",
              "value": "priority route/page/large feature"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Optimize"
            }
          ],
          [
            {
              "type": "text",
              "value": "evidence-first"
            }
          ],
          [
            {
              "type": "text",
              "value": "Optimization problem does not exist"
            }
          ],
          [
            {
              "type": "text",
              "value": "Fixed scene, record before/after"
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
          "value": "SellerHub Performance Workspace"
        },
        {
          "type": "text",
          "value": " uses local mock products/orders to combine three page-like routes: catalog shows local draft, committed URL state, expensive derived list, memoized rows and stable callbacks; orders shows cheap derivation without mechanical "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": "; dashboard displays controlled expensive calculation; workspace uses Context, Profiler, "
        },
        {
          "type": "inlineCode",
          "value": "lazy"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "Suspense"
        },
        {
          "type": "text",
          "value": " establishes page-level boundaries."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "122-file-responsibility",
      "children": [
        {
          "type": "text",
          "value": "12.2 File Responsibility"
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
              "value": "sellerhub-performance-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "typed immutable mock products/orders"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "derive-visible-products.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure expensive derivation that can be independently reasoned"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "memoized-product-row.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "catalog memoized row with typed callback prop"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-catalog-performance-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "local draft, URL commit, memo/callback composition"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "memoized-order-row.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "orders memoized row"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-performance-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "cheap filter, status URL state, stable open callback"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "performance-preferences-context.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context contract and typed consumer hook"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "performance-preferences-provider.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "stable provider value and state owner"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "dashboard-performance-page.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "expensive dashboard metric and unrelated state"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-performance-layout.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "shared eager shell, navigation, context consumer"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-performance-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "route-level lazy imports, Suspense, Profiler"
            }
          ]
        ]
      ]
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
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-data.ts",
      "value": "export type PerformanceProduct = {\n  id: string\n  name: string\n  category: 'lighting' | 'office'\n  price: number\n  inventory: number\n}\n\nexport type PerformanceOrder = {\n  id: string\n  customer: string\n  status: 'pending' | 'shipped'\n  total: number\n}\n\nexport const performanceProducts: PerformanceProduct[] = Array.from(\n  { length: 80 },\n  (_, index) => ({\n    id: `product-${String(index + 1).padStart(3, '0')}`,\n    name: `${index % 2 === 0 ? 'Studio Light' : 'Task Chair'} ${index + 1}`,\n    category: index % 2 === 0 ? 'lighting' : 'office',\n    price: 60 + ((index * 29) % 240),\n    inventory: 3 + ((index * 11) % 40),\n  }),\n)\n\nexport const performanceOrders: PerformanceOrder[] = Array.from(\n  { length: 60 },\n  (_, index) => ({\n    id: `order-${String(index + 1).padStart(3, '0')}`,\n    customer: `Customer ${index + 1}`,\n    status: index % 3 === 0 ? 'pending' : 'shipped',\n    total: 75 + ((index * 47) % 500),\n  }),\n)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "PerformanceProduct"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "PerformanceOrder"
        },
        {
          "type": "text",
          "value": " is compile-time contracts; browser runtime only gets arrays/objects. stable module arrays let row "
        },
        {
          "type": "inlineCode",
          "value": "product"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "order"
        },
        {
          "type": "text",
          "value": " references can be reused when there are no data changes."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/derive-visible-products.ts",
      "value": "import type { PerformanceProduct } from './sellerhub-performance-data'\n\nexport type ProductSort = 'price-asc' | 'price-desc'\n\nexport type VisibleProductResult = {\n  checksum: number\n  products: PerformanceProduct[]\n}\n\nexport function deriveVisibleProducts(\n  products: PerformanceProduct[],\n  query: string,\n  sort: ProductSort,\n): VisibleProductResult {\n  let checksum = 0\n\n  for (let index = 0; index < 80_000; index += 1) {\n    checksum = (checksum + index + products.length) % 2_009\n  }\n\n  const normalizedQuery = query.trim().toLowerCase()\n  const visibleProducts = products\n    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))\n    .sort((left, right) =>\n      sort === 'price-asc' ? left.price - right.price : right.price - left.price,\n    )\n\n  return { checksum, products: visibleProducts }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This function only reads parameters and returns the new result/array without mutate source. Artificial loops make teaching scenarios measurable; real projects should first demonstrate costs with real data and Profiler, rather than manufacturing calculations."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-product-row.tsx",
      "value": "import { memo } from 'react'\nimport type { PerformanceProduct } from './sellerhub-performance-data'\n\ntype MemoizedProductRowProps = {\n  product: PerformanceProduct\n  onSelect: (productId: string) => void\n}\n\nexport const MemoizedProductRow = memo(function ProductRow({\n  product,\n  onSelect,\n}: MemoizedProductRowProps) {\n  return (\n    <li className=\"sellerhub-performance-row\">\n      <div>\n        <strong>{product.name}</strong>\n        <span>{product.category} / {product.inventory} in stock</span>\n      </div>\n      <span>${product.price}</span>\n      <button onClick={() => onSelect(product.id)} type=\"button\">\n        Inspect\n      </button>\n    </li>\n  )\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "row is "
        },
        {
          "type": "inlineCode",
          "value": "product"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "onSelect"
        },
        {
          "type": "text",
          "value": " reference are all stable. TypeScript checks the callback parameter, but does not check whether the parent creates a new function each time."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/product-catalog-performance-page.tsx",
      "value": "import { useCallback, useMemo, useState } from 'react'\nimport type { FormEvent } from 'react'\nimport { useSearchParams } from 'react-router'\nimport { deriveVisibleProducts } from './derive-visible-products'\nimport type { ProductSort } from './derive-visible-products'\nimport { MemoizedProductRow } from './memoized-product-row'\nimport { performanceProducts } from './sellerhub-performance-data'\n\ntype CatalogFilterFormProps = {\n  initialQuery: string\n  initialSort: ProductSort\n  onCommit: (query: string, sort: ProductSort) => void\n}\n\nfunction CatalogFilterForm({ initialQuery, initialSort, onCommit }: CatalogFilterFormProps) {\n  const [queryDraft, setQueryDraft] = useState(initialQuery)\n  const [sortDraft, setSortDraft] = useState<ProductSort>(initialSort)\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>): void {\n    event.preventDefault()\n    onCommit(queryDraft, sortDraft)\n  }\n\n  return (\n    <form className=\"sellerhub-performance-filters\" onSubmit={handleSubmit}>\n      <label className=\"performance-field\">\n        <span>Local query draft</span>\n        <input onChange={(event) => setQueryDraft(event.currentTarget.value)} value={queryDraft} />\n      </label>\n      <label className=\"performance-field\">\n        <span>Sort draft</span>\n        <select\n          onChange={(event) => setSortDraft(event.currentTarget.value as ProductSort)}\n          value={sortDraft}\n        >\n          <option value=\"price-asc\">Price ascending</option>\n          <option value=\"price-desc\">Price descending</option>\n        </select>\n      </label>\n      <button type=\"submit\">Commit filters to URL</button>\n    </form>\n  )\n}\n\nfunction parseSort(value: string | null): ProductSort {\n  return value === 'price-asc' ? 'price-asc' : 'price-desc'\n}\n\nexport default function ProductCatalogPerformancePage() {\n  const [searchParams, setSearchParams] = useSearchParams()\n  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)\n  const committedQuery = searchParams.get('q') ?? ''\n  const committedSort = parseSort(searchParams.get('sort'))\n  const visibleResult = useMemo(\n    () => deriveVisibleProducts(performanceProducts, committedQuery, committedSort),\n    [committedQuery, committedSort],\n  )\n  const handleCommitFilters = useCallback(\n    (query: string, sort: ProductSort) => {\n      const nextParams = new URLSearchParams()\n\n      if (query.trim()) {\n        nextParams.set('q', query.trim())\n      }\n\n      nextParams.set('sort', sort)\n      setSearchParams(nextParams)\n    },\n    [setSearchParams],\n  )\n  const handleSelectProduct = useCallback((productId: string) => {\n    setSelectedProductId(productId)\n  }, [])\n\n  return (\n    <section>\n      <div className=\"sellerhub-performance-heading\">\n        <div>\n          <p>Lazy route page</p>\n          <h3>Catalog performance boundary</h3>\n        </div>\n        <code>{visibleResult.products.length} visible / checksum {visibleResult.checksum}</code>\n      </div>\n      <CatalogFilterForm\n        initialQuery={committedQuery}\n        initialSort={committedSort}\n        key={`${committedQuery}:${committedSort}`}\n        onCommit={handleCommitFilters}\n      />\n      <p>Selected product: {selectedProductId ?? 'none'}</p>\n      <ul className=\"sellerhub-performance-list\">\n        {visibleResult.products.slice(0, 12).map((product) => (\n          <MemoizedProductRow\n            key={product.id}\n            onSelect={handleSelectProduct}\n            product={product}\n          />\n        ))}\n      </ul>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The input draft state sinks to the form, so typing does not trigger page derivation; after submit updates the URL, committed dependencies change, "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " recalculated. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " explicitly resets the form draft according to committed criteria. Error comparison is to promote draft to page and recalculate the list on each keypress, or pass inline callback to memoized rows."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-order-row.tsx",
      "value": "import { memo } from 'react'\nimport type { PerformanceOrder } from './sellerhub-performance-data'\n\ntype MemoizedOrderRowProps = {\n  onOpen: (orderId: string) => void\n  order: PerformanceOrder\n}\n\nexport const MemoizedOrderRow = memo(function OrderRow({\n  onOpen,\n  order,\n}: MemoizedOrderRowProps) {\n  return (\n    <li className=\"sellerhub-performance-row\">\n      <div>\n        <strong>{order.id}</strong>\n        <span>{order.customer} / {order.status}</span>\n      </div>\n      <span>${order.total}</span>\n      <button onClick={() => onOpen(order.id)} type=\"button\">\n        Open\n      </button>\n    </li>\n  )\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "order row uses the same mechanism as product row: domain object + typed stable action prop. No custom comparator is written here to keep correctness and comparison cost predictable."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/seller-orders-performance-page.tsx",
      "value": "import { useCallback, useState } from 'react'\nimport { useSearchParams } from 'react-router'\nimport { MemoizedOrderRow } from './memoized-order-row'\nimport { performanceOrders } from './sellerhub-performance-data'\nimport type { PerformanceOrder } from './sellerhub-performance-data'\n\ntype OrderStatus = 'all' | PerformanceOrder['status']\n\nfunction parseStatus(value: string | null): OrderStatus {\n  return value === 'pending' || value === 'shipped' ? value : 'all'\n}\n\nexport default function SellerOrdersPerformancePage() {\n  const [searchParams, setSearchParams] = useSearchParams()\n  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null)\n  const status = parseStatus(searchParams.get('status'))\n  const visibleOrders = performanceOrders.filter(\n    (order) => status === 'all' || order.status === status,\n  )\n  const handleOpenOrder = useCallback((orderId: string) => {\n    setOpenedOrderId(orderId)\n  }, [])\n\n  function selectStatus(nextStatus: OrderStatus): void {\n    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })\n  }\n\n  return (\n    <section>\n      <div className=\"sellerhub-performance-heading\">\n        <div>\n          <p>Lazy route page</p>\n          <h3>Seller orders render boundary</h3>\n        </div>\n        <code>{visibleOrders.length} orders</code>\n      </div>\n      <div className=\"performance-segmented-control\" role=\"group\" aria-label=\"Order status\">\n        {(['all', 'pending', 'shipped'] as const).map((option) => (\n          <button\n            aria-pressed={status === option}\n            key={option}\n            onClick={() => selectStatus(option)}\n            type=\"button\"\n          >\n            {option}\n          </button>\n        ))}\n      </div>\n      <p>Opened order: {openedOrderId ?? 'none'}</p>\n      <ul className=\"sellerhub-performance-list\">\n        {visibleOrders.slice(0, 14).map((order) => (\n          <MemoizedOrderRow key={order.id} onOpen={handleOpenOrder} order={order} />\n        ))}\n      </ul>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This page is intentionally not memoize "
        },
        {
          "type": "inlineCode",
          "value": "performanceOrders.filter"
        },
        {
          "type": "text",
          "value": ": 60 The screening of local mock data is cheap and direct calculation is more clear. This is \"Not all derived data needs to be "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": "\" intentional contrast; row callback identity is the actual observation boundary of memoized child."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-context.ts",
      "value": "import { createContext, useContext } from 'react'\n\nexport type Density = 'comfortable' | 'compact'\n\nexport type PerformancePreferences = {\n  density: Density\n  toggleDensity: () => void\n}\n\nexport const PerformancePreferencesContext = createContext<PerformancePreferences | null>(null)\n\nexport function usePerformancePreferences(): PerformancePreferences {\n  const preferences = useContext(PerformancePreferencesContext)\n\n  if (!preferences) {\n    throw new Error('usePerformancePreferences requires PerformancePreferencesProvider')\n  }\n\n  return preferences\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Context contract is separated from the provider component, so that the consumer hook only exposes typed non-null result. Runtime guard handles missing providers; TypeScript type does not automatically check for provider presence in the browser."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-provider.tsx",
      "value": "import { useCallback, useMemo, useState } from 'react'\nimport type { ReactNode } from 'react'\nimport { PerformancePreferencesContext } from './performance-preferences-context'\nimport type { Density } from './performance-preferences-context'\n\nexport function PerformancePreferencesProvider({ children }: { children: ReactNode }) {\n  const [density, setDensity] = useState<Density>('comfortable')\n  const toggleDensity = useCallback(() => {\n    setDensity((currentDensity) =>\n      currentDensity === 'comfortable' ? 'compact' : 'comfortable',\n    )\n  }, [])\n  const value = useMemo(() => ({ density, toggleDensity }), [density, toggleDensity])\n\n  return (\n    <PerformancePreferencesContext.Provider value={value}>\n      {children}\n    </PerformancePreferencesContext.Provider>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Provider's callback and value identity only become invalid when the semantic dependency changes. The error comparison is "
        },
        {
          "type": "inlineCode",
          "value": "value={{ density, toggleDensity: () => ... }}"
        },
        {
          "type": "text",
          "value": ", which will notify consumers every time the provider renders."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/dashboard-performance-page.tsx",
      "value": "import { useMemo, useState } from 'react'\nimport { performanceOrders, performanceProducts } from './sellerhub-performance-data'\n\nfunction calculateDashboardMetric(sampleSize: number) {\n  let checksum = 0\n\n  for (let index = 0; index < sampleSize * 20_000; index += 1) {\n    checksum = (checksum + index + performanceOrders.length) % 4_009\n  }\n\n  const revenue = performanceOrders\n    .slice(0, sampleSize)\n    .reduce((total, order) => total + order.total, 0)\n  const lowInventory = performanceProducts.filter((product) => product.inventory < 10).length\n\n  return { checksum, lowInventory, revenue }\n}\n\nexport default function DashboardPerformancePage() {\n  const [sampleSize, setSampleSize] = useState(12)\n  const [noteDraft, setNoteDraft] = useState('')\n  const metric = useMemo(() => calculateDashboardMetric(sampleSize), [sampleSize])\n\n  return (\n    <section>\n      <div className=\"sellerhub-performance-heading\">\n        <div>\n          <p>Lazy route page</p>\n          <h3>Dashboard metric calculation</h3>\n        </div>\n        <code>checksum {metric.checksum}</code>\n      </div>\n      <label className=\"performance-field\">\n        <span>Order sample size: {sampleSize}</span>\n        <input\n          max=\"30\"\n          min=\"4\"\n          onChange={(event) => setSampleSize(Number(event.currentTarget.value))}\n          type=\"range\"\n          value={sampleSize}\n        />\n      </label>\n      <label className=\"performance-field\">\n        <span>Unrelated dashboard note</span>\n        <input onChange={(event) => setNoteDraft(event.currentTarget.value)} value={noteDraft} />\n      </label>\n      <div className=\"sellerhub-metric-grid\">\n        <article>\n          <span>Sample revenue</span>\n          <strong>${metric.revenue}</strong>\n        </article>\n        <article>\n          <span>Low inventory products</span>\n          <strong>{metric.lowInventory}</strong>\n        </article>\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "sample The metric is recalculated when the size is changed; the result cache hits when only a note is edited. calculation remains pure, does not copy metrics into state, and does not use Effect to synchronize derived data."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-layout.tsx",
      "value": "import { NavLink, Outlet } from 'react-router'\nimport { usePerformancePreferences } from './performance-preferences-context'\n\nfunction performanceLinkClassName({ isActive }: { isActive: boolean }): string {\n  return isActive\n    ? 'sellerhub-performance-link sellerhub-performance-link-active'\n    : 'sellerhub-performance-link'\n}\n\nexport function SellerHubPerformanceLayout() {\n  const preferences = usePerformancePreferences()\n\n  return (\n    <section className={`sellerhub-performance-workspace density-${preferences.density}`}>\n      <header className=\"sellerhub-performance-header\">\n        <div>\n          <p className=\"performance-practice-kicker\">Final project</p>\n          <h2>SellerHub Performance Workspace</h2>\n        </div>\n        <button onClick={preferences.toggleDensity} type=\"button\">\n          Density: {preferences.density}\n        </button>\n      </header>\n      <nav aria-label=\"Performance workspace\" className=\"sellerhub-performance-nav\">\n        <NavLink className={performanceLinkClassName} to=\"/performance/catalog\">\n          Catalog\n        </NavLink>\n        <NavLink className={performanceLinkClassName} to=\"/performance/orders\">\n          Orders\n        </NavLink>\n        <NavLink className={performanceLinkClassName} to=\"/performance/dashboard\">\n          Dashboard\n        </NavLink>\n      </nav>\n      <div className=\"sellerhub-performance-stage\">\n        <Outlet />\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Layout is an eager shell to avoid repeated navigation for each page chunk. It reads the preferences context; layout updates when density actually changes are necessary work, not work that should be blocked by memo."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-workspace.tsx",
      "value": "import { lazy, Profiler, Suspense } from 'react'\nimport type { ProfilerOnRenderCallback } from 'react'\nimport { Navigate, Route, Routes } from 'react-router'\nimport { PerformancePreferencesProvider } from './performance-preferences-provider'\nimport { SellerHubPerformanceLayout } from './sellerhub-performance-layout'\n\nconst LazyCatalogPage = lazy(() => import('./product-catalog-performance-page'))\nconst LazyOrdersPage = lazy(() => import('./seller-orders-performance-page'))\nconst LazyDashboardPage = lazy(() => import('./dashboard-performance-page'))\n\nconst handleWorkspaceRender: ProfilerOnRenderCallback = (\n  id,\n  phase,\n  actualDuration,\n  baseDuration,\n) => {\n  console.info('SellerHub performance profile', {\n    actualDuration,\n    baseDuration,\n    id,\n    phase,\n  })\n}\n\nexport function SellerHubPerformanceWorkspace() {\n  return (\n    <PerformancePreferencesProvider>\n      <Profiler id=\"SellerHubPerformanceWorkspace\" onRender={handleWorkspaceRender}>\n        <Suspense\n          fallback={<p className=\"performance-loading-state\">Loading page code chunk...</p>}\n        >\n          <Routes>\n            <Route element={<SellerHubPerformanceLayout />} path=\"/performance\">\n              <Route element={<Navigate replace to=\"catalog\" />} index />\n              <Route element={<LazyCatalogPage />} path=\"catalog\" />\n              <Route element={<LazyOrdersPage />} path=\"orders\" />\n              <Route element={<LazyDashboardPage />} path=\"dashboard\" />\n              <Route element={<Navigate replace to=\"catalog\" />} path=\"*\" />\n            </Route>\n          </Routes>\n        </Suspense>\n      </Profiler>\n    </PerformancePreferencesProvider>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Three module-scope lazy declarations create page-level chunks. Route change allows React to try to render the corresponding lazy component; the first access triggers a network request, Suspense provides code-loading fallback, and the Profiler records the committed subtree after success. This fallback does not represent business data request state, nor does it handle module load errors."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "124-complete-execution-chain",
      "children": [
        {
          "type": "text",
          "value": "12.4 Complete execution chain"
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
                  "value": "BrowserRouter"
                },
                {
                  "type": "text",
                  "value": " adapter Provides the current URL to the workspace; "
                },
                {
                  "type": "inlineCode",
                  "value": "Routes"
                },
                {
                  "type": "text",
                  "value": " Select page branch."
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
                  "value": "first enters the route, the dynamic import request corresponds to the Vite chunk, "
                },
                {
                  "type": "inlineCode",
                  "value": "Suspense"
                },
                {
                  "type": "text",
                  "value": " temporarily displays fallback."
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
                  "value": "Catalog draft only updates form owner; submit modifies search params and triggers page derivation."
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
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": " Reuse or recalculate visible result; rows determine memo bailout through stable domain objects and callbacks."
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
                  "value": "Preferences provider only generates new values ​​when density changes; real consumers are updated."
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
                  "value": "Profiler provides "
                },
                {
                  "type": "inlineCode",
                  "value": "actualDuration"
                },
                {
                  "type": "text",
                  "value": "/"
                },
                {
                  "type": "inlineCode",
                  "value": "baseDuration"
                },
                {
                  "type": "text",
                  "value": ", browser Network/Performance panel supplements chunk, layout, paint evidence."
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
      "id": "125-runtime-type-and-toolchain-boundaries",
      "children": [
        {
          "type": "text",
          "value": "12.5 Runtime, type and toolchain boundaries"
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
            "value": "layer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Actual responsibilities of this project"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "JavaScript runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "creates arrays/objects/closures, executes derivation, and runs dynamic import Promise"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React render/reconciliation"
            }
          ],
          [
            {
              "type": "text",
              "value": "calls components, matches by type/key/position, and executes memo/dependency/context decisions"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "event, URL, DOM commit layout/paint, chunk network request"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check props, callback, union, module types; runtime is erased and performance is not judged"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Vite/Rollup"
            }
          ],
          [
            {
              "type": "text",
              "value": "converts TSX, analyzes dynamic imports, and outputs route/page chunks"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Profiling tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides render/network/main-thread evidence and does not replace the mechanism to judge"
            }
          ]
        ]
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
                  "value": "Open "
                },
                {
                  "type": "inlineCode",
                  "value": "/performance/practice"
                },
                {
                  "type": "text",
                  "value": ", repeat the experiment in the order 01–12."
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
                  "value": "Enter draft in the catalog and confirm that the URL and list do not change key by key; after submission, the URL and derived result change simultaneously."
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
                  "value": "Compare row selection, filter commit, density toggle in React Profiler."
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
                  "value": "Open Network, disable cache, and visit three pages in sequence to confirm that an independent JavaScript chunk request appears for the first time."
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
                  "value": "runs production build and confirms that catalog/orders/dashboard forms independent output chunks."
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
            "value": "phenomenon"
          }
        ],
        [
          {
            "type": "text",
            "value": "What to ask first"
          }
        ],
        [
          {
            "type": "text",
            "value": "may mean"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "parent typing let big subtree render"
            }
          ],
          [
            {
              "type": "text",
              "value": "state owner too high?"
            }
          ],
          [
            {
              "type": "text",
              "value": "colocation/composition"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "expensive pure filter Repeat"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependencies stable and have evidence"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "useMemo"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "memo row still render"
            }
          ],
          [
            {
              "type": "text",
              "value": "which prop reference changes"
            }
          ],
          [
            {
              "type": "text",
              "value": "Simplify props, "
            },
            {
              "type": "inlineCode",
              "value": "useCallback"
            },
            {
              "type": "text",
              "value": "/"
            },
            {
              "type": "inlineCode",
              "value": "useMemo"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "context consumers All updates"
            }
          ],
          [
            {
              "type": "text",
              "value": "provider value new? object"
            }
          ],
          [
            {
              "type": "text",
              "value": "context granularity, stable value"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "first screen JS big"
            }
          ],
          [
            {
              "type": "text",
              "value": "Which pages are not required on the first screen"
            }
          ],
          [
            {
              "type": "text",
              "value": "route-level "
            },
            {
              "type": "inlineCode",
              "value": "lazy"
            },
            {
              "type": "text",
              "value": "/"
            },
            {
              "type": "inlineCode",
              "value": "Suspense"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "only sees console render log"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM/Is the user experience really slow?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Profiler + browser Performance"
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
                  "value": "docs/react/chapter-11-performance-memoization/react-chapter-11-learning-guide.md"
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
      "id": "real-exercises-and-final-project-files-for-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "Real exercises and final project files for this chapter"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/chapter-11-practice-root.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/chapter-11-practice.css"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/01-render-commit-boundary/render-commit-boundary.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/02-parent-child-render/parent-child-render-boundary.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/03-reconciliation-key-identity/reconciliation-key-identity.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/04-react-memo-shallow-compare/react-memo-shallow-compare.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/05-referential-equality-props/referential-equality-props.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/06-usememo-derived-data/usememo-expensive-derived-data.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/07-usecallback-identity/usecallback-function-identity.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/08-memo-callback-composition/memo-callback-composition.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/09-state-colocation/state-colocation-render-scope.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/10-context-value-boundary/context-value-identity-boundary.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/11-profiler-evidence/profiler-render-evidence.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-dashboard-panel.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-suspense-code-splitting.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-data.ts"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/derive-visible-products.ts"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-product-row.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/product-catalog-performance-page.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-order-row.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/seller-orders-performance-page.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-context.ts"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-provider.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/dashboard-performance-page.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-layout.tsx"
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
                  "value": "src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-workspace.tsx"
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
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "README.md"
        },
        {
          "type": "text",
          "value": " is a necessary update of the existing root file and does not belong to the source code list of this chapter; the conceptual contrast in the document is not disguised as a real file and does not enter the list."
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
          "value": "records five columns for each interaction: trigger, JS allocation/calculation, React work, browser work, evidence. Then record the \"unoptimized version\", \"minimum optimization adopted\" and \"whether the removal of optimization is still correct\". The focus of this review is on the invalidation mechanism, not on memorizing the API."
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
                  "value": "re-render not equal to DOM reconstruction?"
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
                  "value": "What happens to the normal child by default when state is updated?"
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
                  "value": "type, position and key how to determine state identity?"
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
                  "value": "memo"
                },
                {
                  "type": "text",
                  "value": " compare by default and what cannot be blocked?"
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
                  "value": "Why does inline object/function break the memo bailout?"
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
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "useCallback"
                },
                {
                  "type": "text",
                  "value": " cache respectively?"
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
                  "value": "Why does state colocation always take precedence over memoization?"
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
                  "value": "Context consumer to bypass props memo?"
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
                  "value": "actualDuration"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "baseDuration"
                },
                {
                  "type": "text",
                  "value": " provide?"
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
                  "value": "dynamic import, Vite chunk, "
                },
                {
                  "type": "inlineCode",
                  "value": "lazy"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "Suspense"
                },
                {
                  "type": "text",
                  "value": " What are each responsible for?"
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
                  "value": "TypeScript Why can't you tell whether render is expensive?"
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
                  "value": "SellerHub catalog typing is stuck, in what order will you locate it?"
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
          "value": "Performance optimization is not to \"reduce all renders\", but to reduce proven, expensive, avoidable work:"
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
                  "value": "render is pure calculation, commit only touches the DOM, and browser then layout/paint."
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
                  "value": "React manages identity through type/position/key and through "
                },
                {
                  "type": "inlineCode",
                  "value": "Object.is"
                },
                {
                  "type": "text",
                  "value": " management props/deps/context comparisons."
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
                  "value": "Prioritize the correction of state owner, derived data and component boundary."
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
                  "value": "memo"
                },
                {
                  "type": "text",
                  "value": " cache component render boundary, "
                },
                {
                  "type": "inlineCode",
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": " cache result, "
                },
                {
                  "type": "inlineCode",
                  "value": "useCallback"
                },
                {
                  "type": "text",
                  "value": " cache function reference."
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
                  "value": "lazy"
                },
                {
                  "type": "text",
                  "value": "/"
                },
                {
                  "type": "inlineCode",
                  "value": "Suspense"
                },
                {
                  "type": "text",
                  "value": " changes code delivery timing but does not change business data lifecycle."
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
                  "value": "Profiler, Network and Performance evidence determine whether the optimization is established."
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
      "id": "is-mainly-based-on",
      "children": [
        {
          "type": "text",
          "value": "is mainly based on"
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
                  "value": "React: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/render-and-commit",
                  "children": [
                    {
                      "type": "text",
                      "value": "Render and Commit"
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
                  "value": "React: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/keeping-components-pure",
                  "children": [
                    {
                      "type": "text",
                      "value": "Keeping Components Pure"
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
                  "value": "React: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/preserving-and-resetting-state",
                  "children": [
                    {
                      "type": "text",
                      "value": "Preserving and Resetting State"
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
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/memo",
                  "children": [
                    {
                      "type": "text",
                      "value": "memo"
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
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/useMemo",
                  "children": [
                    {
                      "type": "text",
                      "value": "useMemo"
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
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/useCallback",
                  "children": [
                    {
                      "type": "text",
                      "value": "useCallback"
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
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/Profiler",
                  "children": [
                    {
                      "type": "text",
                      "value": "Profiler"
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
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/lazy",
                  "children": [
                    {
                      "type": "text",
                      "value": "lazy"
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
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/Suspense",
                  "children": [
                    {
                      "type": "text",
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
                  "type": "text",
                  "value": "React API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/useContext",
                  "children": [
                    {
                      "type": "text",
                      "value": "useContext"
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
                  "value": "TypeScript: "
                },
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript for the New Programmer"
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
                  "value": "MDN: "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import",
                  "children": [
                    {
                      "type": "text",
                      "value": "import()"
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
                  "value": "Vite: "
                },
                {
                  "type": "link",
                  "href": "https://vite.dev/guide/features.html#dynamic-import",
                  "children": [
                    {
                      "type": "text",
                      "value": "Features - Dynamic Import"
                    }
                  ]
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
      "id": "local-auxiliary-information-and-timeliness-instructions",
      "children": [
        {
          "type": "text",
          "value": "Local auxiliary information and timeliness instructions"
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
                  "value": ": Reference parent/child render, "
                },
                {
                  "type": "inlineCode",
                  "value": "memo"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useCallback"
                },
                {
                  "type": "text",
                  "value": " and the teaching sequence of \"avoiding premature optimization\". The book's recommendation to turn off Strict Mode to reduce logging is not a modern default practice; this chapter retains Strict Mode and explains development extra calls."
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
                  "value": ": Reference only to the historical motivation of code-splitting. Its Webpack 4 and React Loadable writing methods are outdated. This chapter uses the current React "
                },
                {
                  "type": "inlineCode",
                  "value": "lazy"
                },
                {
                  "type": "text",
                  "value": "/"
                },
                {
                  "type": "inlineCode",
                  "value": "Suspense"
                },
                {
                  "type": "text",
                  "value": " and Vite dynamic import."
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
          "value": "official React/Vite/MDN document is the main basis for API and runtime behavior; the local PDF is only used as auxiliary material. Subsequent directions include virtualization, server pagination, framework data/cache, server rendering, and React Compiler, but this chapter does not configure or implement these capabilities."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter11Content() {
  return <DocumentRenderer document={chapterDocument} />
}
