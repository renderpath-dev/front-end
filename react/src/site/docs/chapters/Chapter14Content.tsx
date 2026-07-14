import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-14",
  "slug": "chapter-14-react-19-actions-compiler",
  "title": "React Chapter 14: React 19 Actions, the use API, and React Compiler",
  "sourcePath": "docs/react/chapter-14-react-19-actions-compiler/react-chapter-14-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-14-react-19-actions-the-use-api-and-react-compiler",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 14: React 19 Actions, the use API, and React Compiler"
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
              "value": "Action, transition, pending and result state"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/01-action-boundary/action-transition-result.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "type": "inlineCode",
              "value": "useActionState"
            },
            {
              "type": "text",
              "value": " and sequential queue"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/02-use-action-state-queue/sequential-action-queue.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "type": "inlineCode",
              "value": "useActionState"
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "useReducer"
            },
            {
              "type": "text",
              "value": " Boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/03-action-state-vs-reducer/action-reducer-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "function form action and progressive enhancement"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/04-form-action-progressive-model/form-action-progressive-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "type": "inlineCode",
              "value": "useFormStatus"
            },
            {
              "type": "text",
              "value": " most recent form boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/05-use-form-status-submit-button/form-status-submit-button.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "type": "inlineCode",
              "value": "useOptimistic"
            },
            {
              "type": "text",
              "value": " rollback and reconciliation"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/06-use-optimistic-rollback/optimistic-review-reconciliation.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "type": "inlineCode",
              "value": "use(context)"
            },
            {
              "type": "text",
              "value": " and cached Promise boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/07-use-api-suspense-promise/use-api-resource-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "Server Function framework boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/08-server-functions-boundary/server-function-boundary-map.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "ref, metadata and static API owner"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/09-ref-metadata-static-apis/react-19-platform-boundaries.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "React Compiler automatic memoization target"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/10-react-compiler-goal/compiler-optimization-model.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "Compiler rules, directives and lint evidence"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/11-compiler-rules-lints/compiler-rule-evidence.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "React 19 / Compiler migration gates"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/12-migration-strategy/react-19-migration-gates.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "SellerHub React 19 Schema Mapping"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Core mechanism real file"
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
              "value": "final mini project domain types"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-types.ts"
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
              "value": "final mini project Action model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-model.ts"
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
              "value": "final mini project Action workspace"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-workspace.tsx"
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
              "value": "final mini project Compiler boundary map"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-compiler-boundary-map.tsx"
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
              "value": "final mini project combination entrance"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab.tsx"
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
              "value": "Chapter mounting entrance"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice-root.tsx"
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
              "value": "Chapter shared style"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice.css"
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
              "value": "Vite root mount"
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
          "value": "This chapter is "
        },
        {
          "type": "inlineCode",
          "value": "D:/vite_ts"
        },
        {
          "type": "text",
          "value": " React + TypeScript + Vite Learning route Chapter 14, inherits the quality gate of Chapter 12 and the server/client boundary framework of Chapter 13. The study guide document is "
        },
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-14-react-19-actions-compiler/react-chapter-14-learning-guide.md"
        },
        {
          "type": "text",
          "value": ", the real practice root directory is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-14-react-19-actions-compiler/"
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
          "type": "text",
          "value": "current lockfile actual installation "
        },
        {
          "type": "inlineCode",
          "value": "react@19.2.4"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "react-dom@19.2.4"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "@types/react@19.2.10"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "eslint-plugin-react-hooks@7.0.1"
        },
        {
          "type": "text",
          "value": ", so client "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useFormStatus"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useOptimistic"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "use(context)"
        },
        {
          "type": "text",
          "value": ", function form action, ref as prop and document metadata can be discussed or run in the current project. The project does not have React Compiler installed, nor does it have React Server Components / Server Functions framework runtime; the relevant content must be learned as build/framework boundary, and the execution results cannot be forged."
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
          "value": "Traditional mutations often disperse pending flag, try/catch, result state, error state, optimistic record and form reset in multiple handlers. React 19 Actions provide a set of coordination mechanisms around transitions, forms, and mutation results, but they do not define business state, validate external data, or create server transport for you."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter also addresses another common misunderstanding: React Compiler is build-time automatic memoization, not a new React runtime, nor a tool that \"automatically fixes all React code\". It relies on pure render, immutable snapshots, static component structure and parsable syntax; errors state owner, mutation, unstable key, server/client out of bounds are still architectural errors."
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
                  "type": "text",
                  "value": "4."
                }
              ]
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
                  "value": "Chapter 6 browser form submission, controlled/uncontrolled field, validation and pending feedback."
                }
              ]
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
                  "value": "8."
                }
              ]
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
                  "value": "Chapter 9's async lifecycle, runtime validation, obsolete result and error state."
                }
              ]
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
                  "value": "Chapter 11 render evidence, manual memoization, Suspense and lazy."
                }
              ]
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
                  "value": "12."
                }
              ]
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
                  "value": "13."
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
                  "value": "Explain why Action is the mutation unit of work in transition, rather than a synonym for event handler."
                }
              ]
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
                  "value": "Track "
                },
                {
                  "type": "inlineCode",
                  "value": "useActionState"
                },
                {
                  "type": "text",
                  "value": " 's "
                },
                {
                  "type": "inlineCode",
                  "value": "previousState -> reducerAction -> result state"
                },
                {
                  "type": "text",
                  "value": " with sequential queue."
                }
              ]
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
                  "value": "distinguish pure "
                },
                {
                  "type": "inlineCode",
                  "value": "useReducer"
                },
                {
                  "type": "text",
                  "value": " reducer and Action reducer that allow side effects."
                }
              ]
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
                  "value": "correctly locates "
                },
                {
                  "type": "inlineCode",
                  "value": "<form action>"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useFormStatus"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useOptimistic"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "use"
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
                  "value": "determines which APIs can run in the current Vite client runtime and which ones depend on the framework/server/build pipeline."
                }
              ]
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
                  "value": "explains React Compiler's automatic memoization, bailout, directives, lints, and progressive migration strategies."
                }
              ]
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
                  "value": "maps checkout, cart, review, seller order, login, ProductCard and dashboard resource to SellerHub owner."
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
          "value": "Start with the running semantics of Action and transition, and then enter "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " queue and "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": " Comparison; then learn React DOM form action, recent form status and optimistic reconciliation. After understanding these mutation mechanisms, then learn "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " 's resource identity, Server Function transport, React 19 platform output, and finally enter Compiler static analysis, lint evidence, migration gates and SellerHub architecture mapping."
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
              "value": "Action"
            }
          ],
          [
            {
              "type": "text",
              "value": "is a mutation work unit that is executed in a transition and can contain side effects."
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "connects pending, error, result and optimistic state."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useActionState"
            }
          ],
          [
            {
              "type": "text",
              "value": "saves Action return value, dispatcher and pending flag."
            }
          ],
          [
            {
              "type": "text",
              "value": "React Hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "previous result will become the input of the next Action."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useFormStatus"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read the submission state of the recent parent form."
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM Hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "is suitable for packaging submit button."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useOptimistic"
            }
          ],
          [
            {
              "type": "text",
              "value": "Action pending."
            }
          ],
          [
            {
              "type": "text",
              "value": "React Hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reconciliation or rollback is required after the real results are returned."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "use"
            }
          ],
          [
            {
              "type": "text",
              "value": "reads context or cached Promise resource."
            }
          ],
          [
            {
              "type": "text",
              "value": "React API / Suspense"
            }
          ],
          [
            {
              "type": "text",
              "value": "Promise is pending."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Server Function"
            }
          ],
          [
            {
              "type": "text",
              "value": "is a function of client reference and server transport generated by the framework."
            }
          ],
          [
            {
              "type": "text",
              "value": "React RSC / framework"
            }
          ],
          [
            {
              "type": "text",
              "value": "Normal Vite async function is not Server Function."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React Compiler"
            }
          ],
          [
            {
              "type": "text",
              "value": "build-time automatic memoization compiler."
            }
          ],
          [
            {
              "type": "text",
              "value": "Tooling / static analysis"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not change the business owner, nor does it repair impure code."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Compiler directive"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "\"use memo\""
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "\"use no memo\""
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Compiler syntax boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "without compiler is just a directive literal with no running effect."
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
          "value": "Action The link is:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "user intent -> event/form submission -> Action/transition scope -> payload/FormData -> Action queue -> async side effect -> returned Action result -> React state snapshot -> commit"
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
          "type": "text",
          "value": "Optimistic link inserts a temporary branch before the real result:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "base state -> optimistic reducer -> pending UI -> server/client mutation result -> confirmed base state or rollback"
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
          "type": "text",
          "value": "Compiler link is completely different:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "source code -> parser/AST -> React Compiler static analysis -> purity/immutability/data-flow decision -> generated memoization or bailout -> bundler output -> React runtime"
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
          "type": "text",
          "value": "TypeScript Check only "
        },
        {
          "type": "inlineCode",
          "value": "ActionState"
        },
        {
          "type": "text",
          "value": ", payload, "
        },
        {
          "type": "inlineCode",
          "value": "FormData"
        },
        {
          "type": "text",
          "value": " reads the static relationship between the result and component props; it does not perform mutations, verify server response, guarantee Promise identity, nor prove that compiler optimization takes effect at runtime."
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
      "value": "D:/vite_ts/\n  AGENTS.MD\n  README.md\n  package.json\n  package-lock.json\n  tsconfig.app.json\n  eslint.config.js\n  docs/react/\n  docs/roadmap/react-mastery-roadmap-zh.md\n  references/books/react/\n  src/App.tsx\n  src/learning/react/"
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
      "label": "Chapter document structure",
      "value": "docs/react/chapter-14-react-19-actions-compiler/\n  react-chapter-14-learning-guide.md"
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
      "value": "src/learning/react/chapter-14-react-19-actions-compiler/\n  chapter-14-practice-root.tsx\n  chapter-14-practice.css\n  01-action-boundary/\n    action-transition-result.tsx\n  02-use-action-state-queue/\n    sequential-action-queue.tsx\n  03-action-state-vs-reducer/\n    action-reducer-boundary.tsx\n  04-form-action-progressive-model/\n    form-action-progressive-boundary.tsx\n  05-use-form-status-submit-button/\n    form-status-submit-button.tsx\n  06-use-optimistic-rollback/\n    optimistic-review-reconciliation.tsx\n  07-use-api-suspense-promise/\n    use-api-resource-boundary.tsx\n  08-server-functions-boundary/\n    server-function-boundary-map.tsx\n  09-ref-metadata-static-apis/\n    react-19-platform-boundaries.tsx\n  10-react-compiler-goal/\n    compiler-optimization-model.tsx\n  11-compiler-rules-lints/\n    compiler-rule-evidence.tsx\n  12-migration-strategy/\n    react-19-migration-gates.tsx\n  13-sellerhub-architecture-mapping/\n    sellerhub-react-19-boundary-map.tsx\n  sellerhub-react-19-actions-lab/"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This kind of organization allows every "
        },
        {
          "type": "inlineCode",
          "value": "9.x"
        },
        {
          "type": "text",
          "value": " has an independent search entrance and separates the final integration project from single-concept exercises. It does not stack the new API into "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": ", also useless "
        },
        {
          "type": "inlineCode",
          "value": "example.tsx"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "demo.tsx"
        },
        {
          "type": "text",
          "value": " Hide learning goals."
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
      "type": "code",
      "language": "txt",
      "label": "Final mini project structure",
      "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/\n  sellerhub-action-types.ts\n  sellerhub-action-model.ts\n  sellerhub-action-workspace.tsx\n  sellerhub-compiler-boundary-map.tsx\n  sellerhub-react-19-actions-lab.tsx"
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
          "value": "The following names are only used for error comparison and do not mean that files need to be created:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Conceptual snippets",
      "value": "Snippet: dispatcher outside Action scope\nSnippet: useFormStatus outside parent form\nSnippet: Promise created during render\nSnippet: fake Server Function in Vite\nSnippet: compiler cannot repair mutation"
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
      "value": "npm run dev\nnpm run lint\nnpm run typecheck\nnpm run test\nnpm run build"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Access after startup "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-14"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "chapter-14-practice-root.tsx"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "chapter-14-practice.css"
        },
        {
          "type": "text",
          "value": " It is only responsible for mounting and page shell, and will not be deployed as the core mechanism code of this chapter."
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
      "id": "91-actions-for-mutation-pending-error-and-result-state",
      "children": [
        {
          "type": "text",
          "value": "9.1 Actions for Mutation, Pending, Error, and Result State"
        }
      ]
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
          "value": " Action is a mutation unit of work executed in the transition scope. The event handler can start the Action, but handler, Action, Promise and final state commit are four different stages."
        }
      ]
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
          "value": " Traditional click handler is often maintained manually "
        },
        {
          "type": "inlineCode",
          "value": "isSaving"
        },
        {
          "type": "text",
          "value": ", errors and results. Actions coordinate asynchronous work with pending transitions, but the business results should still be modeled as explicit unions."
        }
      ]
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
          "value": " SellerHub checkout When saving the address, the input box editing must remain urgent; the address mutation can be a non-blocking Action; known validation failures should enter the result state, and unknown exceptions should be handed over to the Error Boundary."
        }
      ]
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
          "value": " Action, transition scope, "
        },
        {
          "type": "inlineCode",
          "value": "useTransition"
        },
        {
          "type": "text",
          "value": ", pending state, known result error, unknown thrown error."
        }
      ]
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
                  "value": "Browser generates click and input events."
                }
              ]
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
                  "value": "JavaScript calls "
                },
                {
                  "type": "inlineCode",
                  "value": "handleSave"
                },
                {
                  "type": "text",
                  "value": ", create a Promise, and "
                },
                {
                  "type": "inlineCode",
                  "value": "await"
                },
                {
                  "type": "text",
                  "value": " obtained later "
                },
                {
                  "type": "inlineCode",
                  "value": "nextResult"
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
                  "value": "React "
                },
                {
                  "type": "inlineCode",
                  "value": "useTransition"
                },
                {
                  "type": "text",
                  "value": " Save the pending state of the transition; "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": " saves the address and Action result snapshot respectively."
                }
              ]
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
                  "value": "TypeScript Check "
                },
                {
                  "type": "inlineCode",
                  "value": "CheckoutActionResult"
                },
                {
                  "type": "text",
                  "value": " discriminated union, but the real address will not be verified."
                }
              ]
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
                  "value": "Vite tooling currently only compiles and packages client actions; there is no server mutation."
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
          "value": "startAction(async () => ...)"
        },
        {
          "type": "text",
          "value": " calls async Action immediately and marks the synchronously scheduled work as transition. Because the current async context of React is at "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": ", it is still required to mark state update again, so "
        },
        {
          "type": "inlineCode",
          "value": "setResult"
        },
        {
          "type": "text",
          "value": " put into the inner layer "
        },
        {
          "type": "inlineCode",
          "value": "startTransition"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "isPending"
        },
        {
          "type": "text",
          "value": " remains "
        },
        {
          "type": "inlineCode",
          "value": "true"
        },
        {
          "type": "text",
          "value": " until the Action is completed and the final update is committed."
        }
      ]
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
                  "value": "const [isPending, startTransition] = useTransition()"
                }
              ]
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
                  "value": "startTransition(action)"
                },
                {
                  "type": "text",
                  "value": " has no return value."
                }
              ]
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
                  "value": "Transition cannot control "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " Update; input edits should remain in normal urgent state."
                }
              ]
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
                  "value": "await"
                },
                {
                  "type": "text",
                  "value": " currently requires additional "
                },
                {
                  "type": "inlineCode",
                  "value": "startTransition"
                },
                {
                  "type": "text",
                  "value": " is clearly a transition update."
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
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/01-action-boundary/action-transition-result.tsx",
      "value": "import { startTransition, useState, useTransition } from 'react'\n\ntype CheckoutActionResult =\n  | { status: 'idle'; message: string }\n  | { status: 'success'; message: string }\n  | { status: 'error'; message: string }\n\nconst initialResult: CheckoutActionResult = {\n  status: 'idle',\n  message: 'No checkout mutation has run.',\n}\n\nasync function saveCheckoutAddress(address: string): Promise<CheckoutActionResult> {\n  await wait(500)\n\n  if (address.trim().length < 5) {\n    return {\n      status: 'error',\n      message: 'Enter a complete delivery address.',\n    }\n  }\n\n  return {\n    status: 'success',\n    message: `Saved delivery address: ${address.trim()}`,\n  }\n}\n\nexport function ActionTransitionResult() {\n  const [address, setAddress] = useState('12 Market Street')\n  const [result, setResult] = useState<CheckoutActionResult>(initialResult)\n  const [isPending, startAction] = useTransition()\n\n  function handleSave(): void {\n    startAction(async () => {\n      const nextResult = await saveCheckoutAddress(address)\n\n      startTransition(() => {\n        setResult(nextResult)\n      })\n    })\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"action-boundary-title\">\n      <p className=\"chapter14-kicker\">9.1 Action boundary</p>\n      <h2 id=\"action-boundary-title\">Mutation, pending state, and result state</h2>\n      <label className=\"chapter14-field\">\n        Delivery address\n        <input\n          onChange={(event) => setAddress(event.currentTarget.value)}\n          value={address}\n        />\n      </label>\n      <button className=\"chapter14-button\" disabled={isPending} onClick={handleSave}>\n        {isPending ? 'Saving address...' : 'Save address'}\n      </button>\n      <p className={`chapter14-result chapter14-result-${result.status}`}>\n        {result.message}\n      </p>\n      <p className=\"chapter14-note\">\n        The click handler starts an Action. The async mutation and its result update are\n        not the same operation as the click callback itself.\n      </p>\n    </section>\n  )\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}"
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
          "value": " union let "
        },
        {
          "type": "inlineCode",
          "value": "result.status"
        },
        {
          "type": "text",
          "value": " and message become the same snapshot; "
        },
        {
          "type": "inlineCode",
          "value": "saveCheckoutAddress"
        },
        {
          "type": "text",
          "value": " returns business results instead of modifying component variables; "
        },
        {
          "type": "inlineCode",
          "value": "useTransition"
        },
        {
          "type": "text",
          "value": " returns pending flag and Action starter; click handler only starts Action; inner layer "
        },
        {
          "type": "inlineCode",
          "value": "startTransition"
        },
        {
          "type": "text",
          "value": " tag "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": "; input "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " still directly updates the urgent address state."
        }
      ]
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
                  "value": "User edit input, browser event provides "
                },
                {
                  "type": "inlineCode",
                  "value": "event.currentTarget.value"
                },
                {
                  "type": "text",
                  "value": ", React generates a new address snapshot."
                }
              ]
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
                  "value": "The user clicks the button, "
                },
                {
                  "type": "inlineCode",
                  "value": "handleSave"
                },
                {
                  "type": "text",
                  "value": " reads the address in this render closure."
                }
              ]
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
                  "value": "startAction"
                },
                {
                  "type": "text",
                  "value": " starts async Action, "
                },
                {
                  "type": "inlineCode",
                  "value": "isPending"
                },
                {
                  "type": "text",
                  "value": " becomes "
                },
                {
                  "type": "inlineCode",
                  "value": "true"
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
                  "value": "JavaScript creates Promise; 500ms gets "
                },
                {
                  "type": "inlineCode",
                  "value": "nextResult"
                },
                {
                  "type": "text",
                  "value": " object."
                }
              ]
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
                  "value": "Inner layer "
                },
                {
                  "type": "inlineCode",
                  "value": "startTransition"
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "setResult(nextResult)"
                },
                {
                  "type": "text",
                  "value": " is marked as transition update."
                }
              ]
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
                  "value": "React commits the new result snapshot, and then the pending state of the Action ends."
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
              "value": "Variables, references and snapshot changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "address"
        },
        {
          "type": "text",
          "value": " binding will not be overwritten in place by the asynchronous process; "
        },
        {
          "type": "inlineCode",
          "value": "nextResult"
        },
        {
          "type": "text",
          "value": " is a new object; "
        },
        {
          "type": "inlineCode",
          "value": "result"
        },
        {
          "type": "text",
          "value": " state cell points to the object after commit; "
        },
        {
          "type": "inlineCode",
          "value": "isPending"
        },
        {
          "type": "text",
          "value": " belongs to transition tracking and is not an attribute of the business result."
        }
      ]
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
          "value": " click triggers "
        },
        {
          "type": "inlineCode",
          "value": "handleSave"
        },
        {
          "type": "text",
          "value": "; JavaScript calls "
        },
        {
          "type": "inlineCode",
          "value": "saveCheckoutAddress(address)"
        },
        {
          "type": "text",
          "value": " and wait for Promise; React records transition pending and two state cells; TypeScript only proves that async function returns union; short address returns "
        },
        {
          "type": "inlineCode",
          "value": "{status:'error'}"
        },
        {
          "type": "text",
          "value": ", so the UI selects error class. If you put the setter in "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": " without remarking the transition violates the scope rules of the current async transition update; in real projects, it can be identified by the pending end time and React transition troubleshooting."
        }
      ]
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
          "value": " pending text comes from React transition state, success or error text comes from business result state, and the owners of the two are different. Completion of Action does not necessarily mean that the business is successful; it can successfully return a known error result."
        }
      ]
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
          "value": " Normal "
        },
        {
          "type": "inlineCode",
          "value": "onClick={async () => ...}"
        },
        {
          "type": "text",
          "value": " can certainly execute Promise, but it will not automatically provide the transition pending for this Action. In turn, put input "
        },
        {
          "type": "inlineCode",
          "value": "setAddress"
        },
        {
          "type": "text",
          "value": " into transition will make the controlled input update not comply with the urgent input rule."
        }
      ]
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
          "value": " Treating Action as an event handler name will mask the transition scope; treating "
        },
        {
          "type": "inlineCode",
          "value": "isPending"
        },
        {
          "type": "text",
          "value": " When the global state of all requests will be confused hook instance owner; all known validation errors "
        },
        {
          "type": "inlineCode",
          "value": "throw"
        },
        {
          "type": "text",
          "value": " will cause the recoverable business branch to enter Error Boundary."
        }
      ]
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
          "value": " checkout address, login submit and seller order mutation all need to distinguish between \"Action is being executed\" and \"What business results are returned by Action\"."
        }
      ]
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
          "value": " This section connects Chapter 4 state snapshot, Chapter 6 submit feedback, Chapter 9 async result and Chapter 11 transition into a mutation model."
        }
      ]
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
          "value": " event expresses user intention, Action carries mutation, transition provides pending scheduling, and result state expresses business results; the four should not be merged into a fuzzy boolean."
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
      "id": "92-useactionstate-and-its-sequential-action-queue",
      "children": [
        {
          "type": "text",
          "value": "9.2 useActionState and Its Sequential Action Queue"
        }
      ]
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
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " saves the return result of Action; multiple dispatches of the same hook instance will be queued in sequence, and the last one will be "
        },
        {
          "type": "inlineCode",
          "value": "previousState"
        },
        {
          "type": "text",
          "value": " reads the state that has been returned previously."
        }
      ]
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
          "value": " When you quickly click the shopping cart increase or decrease button, if multiple async mutations each capture the old quantity, a lost update may occur. Action queue concatenates each transition with previous result."
        }
      ]
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
          "value": " SellerHub cart quantity and seller order status mutation often require processing in the order of intent. Queue order and network completion speed are not the same concept."
        }
      ]
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
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "reducerAction"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "previousState"
        },
        {
          "type": "text",
          "value": ", Action payload, "
        },
        {
          "type": "inlineCode",
          "value": "dispatchAction"
        },
        {
          "type": "text",
          "value": ", sequential queue."
        }
      ]
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
          "value": " JavaScript creates the payload object and Promise; React saves the result state, queue and pending flag of the hook; TypeScript checks the payload/state parameter relationship; the browser only generates clicks; the server sequence still needs to be controlled by the real API, idemencypot or version control Guaranteed."
        }
      ]
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
          "value": " hook initial result is "
        },
        {
          "type": "inlineCode",
          "value": "initialQuantityState"
        },
        {
          "type": "text",
          "value": ". Each time the dispatcher adds the payload to the same queue. React only uses the return value of the previous Action as the next "
        },
        {
          "type": "inlineCode",
          "value": "previousState"
        },
        {
          "type": "text",
          "value": ", so the increase of 500ms in the example will not be crossed by the decrease of 250ms."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState, permalink?)"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "reducerAction(previousState, payload)"
        },
        {
          "type": "text",
          "value": " can return the same type of state synchronously or asynchronously. Programmatic dispatch must be in Action / transition scope."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/02-use-action-state-queue/sequential-action-queue.tsx",
      "value": "import { startTransition, useActionState, useRef } from 'react'\n\ntype QuantityActionState = {\n  quantity: number\n  completedActions: string[]\n}\n\ntype QuantityActionPayload = {\n  delta: number\n  requestId: string\n}\n\nconst initialQuantityState: QuantityActionState = {\n  quantity: 1,\n  completedActions: [],\n}\n\nasync function updateQuantityAction(\n  previousState: QuantityActionState,\n  payload: QuantityActionPayload,\n): Promise<QuantityActionState> {\n  await wait(payload.delta > 0 ? 500 : 250)\n\n  return {\n    quantity: Math.max(1, previousState.quantity + payload.delta),\n    completedActions: [...previousState.completedActions, payload.requestId],\n  }\n}\n\nexport function SequentialActionQueue() {\n  const [state, dispatchAction, isPending] = useActionState(\n    updateQuantityAction,\n    initialQuantityState,\n  )\n  const nextRequestId = useRef(1)\n\n  function queueQuantityChange(delta: number): void {\n    const requestId = `quantity-${nextRequestId.current}`\n    nextRequestId.current += 1\n\n    startTransition(() => {\n      dispatchAction({ delta, requestId })\n    })\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"action-queue-title\">\n      <p className=\"chapter14-kicker\">9.2 useActionState queue</p>\n      <h2 id=\"action-queue-title\">Sequential quantity mutations</h2>\n      <div className=\"chapter14-action-row\">\n        <button\n          className=\"chapter14-button\"\n          onClick={() => queueQuantityChange(-1)}\n          type=\"button\"\n        >\n          Decrease\n        </button>\n        <strong className=\"chapter14-metric\">{state.quantity}</strong>\n        <button\n          className=\"chapter14-button\"\n          onClick={() => queueQuantityChange(1)}\n          type=\"button\"\n        >\n          Increase\n        </button>\n      </div>\n      <p className=\"chapter14-note\">\n        {isPending\n          ? 'The Action queue is processing in dispatch order.'\n          : 'Queue multiple changes quickly to observe sequential completion.'}\n      </p>\n      <ol className=\"chapter14-compact-list\">\n        {state.completedActions.map((requestId) => (\n          <li key={requestId}>{requestId}</li>\n        ))}\n      </ol>\n    </section>\n  )\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}"
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
          "value": " state and payload are modeled separately; Action simulates different latency according to delta; return object uses "
        },
        {
          "type": "inlineCode",
          "value": "previousState.quantity"
        },
        {
          "type": "text",
          "value": " and new array; ref only generates request ID that does not participate in render; "
        },
        {
          "type": "inlineCode",
          "value": "startTransition"
        },
        {
          "type": "text",
          "value": " wraps the dispatcher; the UI reads the current result state and queue pending."
        }
      ]
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
          "value": " Clicking increase and decrease continuously will create "
        },
        {
          "type": "inlineCode",
          "value": "quantity-1"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "quantity-2"
        },
        {
          "type": "text",
          "value": " payload. The first Action first reads quantity 1 and returns 2; the second Action then reads 2 and returns 1. Even if the second simulation has a shorter delay, the old state will not be consumed first."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and queue changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "nextRequestId.current"
        },
        {
          "type": "text",
          "value": " is incremented in the handler but does not trigger render; each payload is an independent object; "
        },
        {
          "type": "inlineCode",
          "value": "completedActions"
        },
        {
          "type": "text",
          "value": " is a new array; React retains the hook queue and the last Action committed result."
        }
      ]
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
          "value": " rapid clicks creates two payloads; JavaScript creates two Promise; React puts the payload into the same hook queue and provides the first result for the second call; TypeScript prevents missed transmission "
        },
        {
          "type": "inlineCode",
          "value": "delta"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "requestId"
        },
        {
          "type": "text",
          "value": ", but does not verify whether the server is submitted in order; the UI list grows in the order of queue completion. If you call the dispatcher directly without being in the Action scope, it violates the dispatcher scope rules and the development environment will prompt async "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " action is called outside transition."
        }
      ]
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
          "value": " sequence comes from the React Action queue, not the natural completion sequence of 500ms and 250ms timer. "
        },
        {
          "type": "inlineCode",
          "value": "previousState"
        },
        {
          "type": "text",
          "value": " is the result of the previous step of the queue, not the quantity in the closure during dispatch."
        }
      ]
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
          "value": " Two independent "
        },
        {
          "type": "inlineCode",
          "value": "fetch"
        },
        {
          "type": "text",
          "value": " plus "
        },
        {
          "type": "inlineCode",
          "value": "setQuantity(capturedQuantity + delta)"
        },
        {
          "type": "text",
          "value": " may all read the same old snapshot; functional "
        },
        {
          "type": "inlineCode",
          "value": "setState"
        },
        {
          "type": "text",
          "value": " can solve local accumulation, but does not automatically provide Action result, pending and async mutation queue semantics."
        }
      ]
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
          "value": " mistakenly thinks "
        },
        {
          "type": "inlineCode",
          "value": "isPending"
        },
        {
          "type": "text",
          "value": " is the global network state; treat queue as server transaction; use mutable array "
        },
        {
          "type": "inlineCode",
          "value": "push"
        },
        {
          "type": "text",
          "value": " reuses previous state; call dispatcher in render."
        }
      ]
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
          "value": " cart quantity, batch seller order status and checkout retry all need to identify the queue owner; the real backend still needs to design request ID, version number and idempotence."
        }
      ]
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
          "value": " This is an extension of Chapter 4 updater queue and Chapter 8 reducer transition in the asynchronous mutation scenario."
        }
      ]
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
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " is not \"one more state Hook\", but "
        },
        {
          "type": "inlineCode",
          "value": "previous Action result -> queued Action -> next result"
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
      "id": "93-useactionstate-vs-usereducer",
      "children": [
        {
          "type": "text",
          "value": "9.3 useActionState vs. useReducer"
        }
      ]
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
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": " reducer must be pure; "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " can perform side effects. Both receive previous state, but their calling timing, scheduling semantics, and allowed behavior are different."
        }
      ]
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
          "value": " \"I have previous state and action, can I fetch it in the reducer?\" The answer depends on the reducer owner. Ordinary reducers may be called repeatedly in development mode to check purity; action reducers are designed for mutations and should not be mixed with pure state transitions."
        }
      ]
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
          "value": " cart The addition and subtraction of draft is a synchronous pure transition, and saving the cart is an effective action. After separation, render replay will not send mutations repeatedly."
        }
      ]
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
          "value": " pure reducer, effectful reducer Action, Strict Mode purity check, exhaustive action union."
        }
      ]
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
          "value": "dispatchDraft"
        },
        {
          "type": "text",
          "value": " only put "
        },
        {
          "type": "inlineCode",
          "value": "DraftAction"
        },
        {
          "type": "text",
          "value": " is handed over to pure reducer to calculate the next draft; "
        },
        {
          "type": "inlineCode",
          "value": "dispatchSave"
        },
        {
          "type": "text",
          "value": " calls async Action in transition, and React saves its return result and pending. The two hook cells do not share the queue."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature:"
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
                  "value": "const [state, dispatch] = useReducer(reducer, initialArg)"
                }
              ]
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
                  "value": "reducer(state, action) -> nextState"
                },
                {
                  "type": "text",
                  "value": " must be pure."
                }
              ]
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
                  "value": "const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState)"
                }
              ]
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
                  "value": "reducerAction(previousState, payload) -> State | Promise<State>"
                },
                {
                  "type": "text",
                  "value": " can perform mutation side effects."
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
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/03-action-state-vs-reducer/action-reducer-boundary.tsx",
      "value": "import { startTransition, useActionState, useReducer } from 'react'\n\ntype DraftState = {\n  quantity: number\n}\n\ntype DraftAction =\n  | { type: 'increment' }\n  | { type: 'decrement' }\n\ntype SaveState = {\n  status: 'idle' | 'saved'\n  savedQuantity: number\n  saveCount: number\n}\n\nfunction draftReducer(state: DraftState, action: DraftAction): DraftState {\n  switch (action.type) {\n    case 'increment':\n      return { quantity: state.quantity + 1 }\n    case 'decrement':\n      return { quantity: Math.max(1, state.quantity - 1) }\n    default:\n      return assertNever(action)\n  }\n}\n\nasync function saveQuantityAction(\n  previousState: SaveState,\n  quantity: number,\n): Promise<SaveState> {\n  await wait(450)\n\n  return {\n    status: 'saved',\n    savedQuantity: quantity,\n    saveCount: previousState.saveCount + 1,\n  }\n}\n\nexport function ActionReducerBoundary() {\n  const [draft, dispatchDraft] = useReducer(draftReducer, { quantity: 1 })\n  const [saveState, dispatchSave, isPending] = useActionState(saveQuantityAction, {\n    status: 'idle',\n    savedQuantity: 1,\n    saveCount: 0,\n  } satisfies SaveState)\n\n  function saveDraft(): void {\n    startTransition(() => {\n      dispatchSave(draft.quantity)\n    })\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"reducer-action-title\">\n      <p className=\"chapter14-kicker\">9.3 Reducer and Action boundary</p>\n      <h2 id=\"reducer-action-title\">Pure draft transitions and effectful save Actions</h2>\n      <div className=\"chapter14-grid\">\n        <article className=\"chapter14-card\">\n          <h3>useReducer</h3>\n          <p>Draft quantity: {draft.quantity}</p>\n          <div className=\"chapter14-action-row\">\n            <button\n              className=\"chapter14-button\"\n              onClick={() => dispatchDraft({ type: 'decrement' })}\n              type=\"button\"\n            >\n              Decrease draft\n            </button>\n            <button\n              className=\"chapter14-button\"\n              onClick={() => dispatchDraft({ type: 'increment' })}\n              type=\"button\"\n            >\n              Increase draft\n            </button>\n          </div>\n        </article>\n        <article className=\"chapter14-card\">\n          <h3>useActionState</h3>\n          <p>Saved quantity: {saveState.savedQuantity}</p>\n          <p>Completed saves: {saveState.saveCount}</p>\n          <button\n            className=\"chapter14-button\"\n            disabled={isPending}\n            onClick={saveDraft}\n            type=\"button\"\n          >\n            {isPending ? 'Saving...' : 'Save draft'}\n          </button>\n        </article>\n      </div>\n    </section>\n  )\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}\n\nfunction assertNever(value: never): never {\n  throw new Error(`Unhandled draft action: ${JSON.stringify(value)}`)\n}"
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
          "value": "DraftAction"
        },
        {
          "type": "text",
          "value": " is an exhaustive union; "
        },
        {
          "type": "inlineCode",
          "value": "draftReducer"
        },
        {
          "type": "text",
          "value": " only does arithmetic and returns a new object; "
        },
        {
          "type": "inlineCode",
          "value": "saveQuantityAction"
        },
        {
          "type": "text",
          "value": " can wait for side effect and add "
        },
        {
          "type": "inlineCode",
          "value": "saveCount"
        },
        {
          "type": "text",
          "value": "; component saves draft and save result respectively; save button uses current draft snapshot as payload."
        }
      ]
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
          "value": " increment only runs the pure reducer and generates a draft snapshot immediately. After clicking save, the handler reads the quantity of the render, Action waits for 450ms, and returns the new "
        },
        {
          "type": "inlineCode",
          "value": "SaveState"
        },
        {
          "type": "text",
          "value": ", React commit saved quantity and count."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and state changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " draft state object and save result object belong to different hook cells; "
        },
        {
          "type": "inlineCode",
          "value": "dispatchDraft"
        },
        {
          "type": "text",
          "value": " does not generate Promise; "
        },
        {
          "type": "inlineCode",
          "value": "dispatchSave"
        },
        {
          "type": "text",
          "value": " enters Action queue; "
        },
        {
          "type": "inlineCode",
          "value": "satisfies SaveState"
        },
        {
          "type": "text",
          "value": " only checks the initial object and does not change emitted JavaScript."
        }
      ]
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
          "value": " draft click create "
        },
        {
          "type": "inlineCode",
          "value": "{type:'increment'}"
        },
        {
          "type": "text",
          "value": "; React calls pure reducer to get a new draft object; save click creates number payload, Action creates Promise and returns "
        },
        {
          "type": "inlineCode",
          "value": "SaveState"
        },
        {
          "type": "text",
          "value": "; TypeScript exhaustively checks "
        },
        {
          "type": "inlineCode",
          "value": "DraftAction"
        },
        {
          "type": "text",
          "value": " and Action state shape; the left side of the UI changes first, and the right side only changes after Action commit. If "
        },
        {
          "type": "inlineCode",
          "value": "fetch"
        },
        {
          "type": "text",
          "value": " is written into "
        },
        {
          "type": "inlineCode",
          "value": "draftReducer"
        },
        {
          "type": "text",
          "value": ", it violates reducer purity, Strict Mode or replay may duplicate effects; when you see timer, network, and DOM write in reducer during code review, you should identify it."
        }
      ]
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
          "value": " The owner, queue and contract of the two hooks are different. Similar "
        },
        {
          "type": "inlineCode",
          "value": "(previousState, action)"
        },
        {
          "type": "text",
          "value": " shape does not represent the same runtime semantics."
        }
      ]
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
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": " is suitable for recalculated local transitions; "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " is suitable for mutations that require pending, side effect and returned result. It's not "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
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
              "value": "common mistakesWhy are they wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Write side effect in ordinary reducer; write optimistic reducer as effective; think that Action reducer will be repeated for purity check like ordinary reducer in Strict Mode."
        }
      ]
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
          "value": " checkout draft, cart selector and UI filters should be kept pure; only save, submit and status mutations can be entered into Action."
        }
      ]
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
          "value": " This section reuses the reducer purity chapter 8 and explains why React 19 introduces a different Action reducer contract."
        }
      ]
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
          "value": " ordinary reducer describes \"how the state changes\"; Action reducer describes \"what the result state is after the mutation is completed\". The former must be pure, and the latter can have side effects."
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
      "id": "94-form-actions-and-progressive-enhancement",
      "children": [
        {
          "type": "text",
          "value": "9.4 Form Actions and Progressive Enhancement"
        }
      ]
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
          "value": " React 19 Allow "
        },
        {
          "type": "inlineCode",
          "value": "<form action={function}>"
        },
        {
          "type": "text",
          "value": ". The function receives "
        },
        {
          "type": "inlineCode",
          "value": "FormData"
        },
        {
          "type": "text",
          "value": " runs in Action / transition; however, the progressive enhancement of \"JavaScript can still be submitted when it is not loaded\" requires Server Function and framework support, and the ordinary Vite client function does not have this capability."
        }
      ]
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
          "value": " HTML "
        },
        {
          "type": "inlineCode",
          "value": "action=\"/checkout\""
        },
        {
          "type": "text",
          "value": ", React "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": " and React function "
        },
        {
          "type": "inlineCode",
          "value": "action={submitCheckout}"
        },
        {
          "type": "text",
          "value": " are three different contracts. Just because the property names are the same, it cannot be assumed that the browser will automatically send the client function to the server."
        }
      ]
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
          "value": " function action automatically provides FormData, Action pending uncontrolled form reset after successful reconciliation; it is suitable for connecting form mutation to "
        },
        {
          "type": "inlineCode",
          "value": "useFormStatus"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " and optimistic UI."
        }
      ]
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
          "value": " form Action prop, "
        },
        {
          "type": "inlineCode",
          "value": "FormData"
        },
        {
          "type": "text",
          "value": ", uncontrolled field reset, POST semantics, progressive enhancement, permalink."
        }
      ]
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
                  "value": "Browser native URL action executes navigation/request."
                }
              ]
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
                  "value": "React DOM identifies the function action, calls it on the client and provides "
                },
                {
                  "type": "inlineCode",
                  "value": "FormData"
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
                  "value": "Action runs in transition; unknown throw can be handed to Error Boundary."
                }
              ]
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
                  "value": "Server Function action are provided by the framework."
                }
              ]
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
                  "value": "TypeScript only knows the action function to receive "
                },
                {
                  "type": "inlineCode",
                  "value": "FormData"
                },
                {
                  "type": "text",
                  "value": ", field content will not be verified."
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
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " submitter triggers form submission, React DOM constructs the entry list and calls the function action. The example reads named controls, waits for the simulated mutation, and then commits the result state in the transition. Because the current function is an ordinary closure in the browser module, it has no server reference ID and no generated network transport."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "<form action={(formData: FormData) => void | Promise<void>}>"
        },
        {
          "type": "text",
          "value": "; submit button can use "
        },
        {
          "type": "inlineCode",
          "value": "formAction"
        },
        {
          "type": "text",
          "value": " overrides the parent form action. Function action uses POST semantics; uncontrolled inputs will be reset after success."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/04-form-action-progressive-model/form-action-progressive-boundary.tsx",
      "value": "import { startTransition, useState } from 'react'\n\ntype SubmittedCheckout = {\n  email: string\n  delivery: string\n}\n\nexport function FormActionProgressiveBoundary() {\n  const [submittedCheckout, setSubmittedCheckout] = useState<SubmittedCheckout | null>(\n    null,\n  )\n\n  async function submitCheckout(formData: FormData): Promise<void> {\n    const email = readFormString(formData, 'email')\n    const delivery = readFormString(formData, 'delivery')\n\n    await wait(450)\n\n    startTransition(() => {\n      setSubmittedCheckout({ email, delivery })\n    })\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"form-action-title\">\n      <p className=\"chapter14-kicker\">9.4 Form Action</p>\n      <h2 id=\"form-action-title\">Function action and progressive enhancement boundary</h2>\n      <form action={submitCheckout} className=\"chapter14-form\">\n        <label className=\"chapter14-field\">\n          Email\n          <input defaultValue=\"buyer@example.com\" name=\"email\" type=\"email\" />\n        </label>\n        <label className=\"chapter14-field\">\n          Delivery\n          <select defaultValue=\"standard\" name=\"delivery\">\n            <option value=\"standard\">Standard</option>\n            <option value=\"express\">Express</option>\n          </select>\n        </label>\n        <button className=\"chapter14-button\" type=\"submit\">\n          Submit checkout model\n        </button>\n      </form>\n      <p className=\"chapter14-result\">\n        {submittedCheckout\n          ? `${submittedCheckout.email} selected ${submittedCheckout.delivery}.`\n          : 'No checkout payload submitted.'}\n      </p>\n      <p className=\"chapter14-note\">\n        This Vite example runs a client Action. Server Function replay and no-JavaScript\n        progressive enhancement require a supporting framework runtime.\n      </p>\n    </section>\n  )\n}\n\nfunction readFormString(formData: FormData, fieldName: string): string {\n  const value = formData.get(fieldName)\n  return typeof value === 'string' ? value : ''\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}"
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
          "value": "SubmittedCheckout"
        },
        {
          "type": "text",
          "value": " is the display result, not the server response; action starts from "
        },
        {
          "type": "inlineCode",
          "value": "FormData.get"
        },
        {
          "type": "text",
          "value": " get "
        },
        {
          "type": "inlineCode",
          "value": "FormDataEntryValue | null"
        },
        {
          "type": "text",
          "value": ", the helper narrows it to string; uncontrolled fields use "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": "; function is assigned directly to "
        },
        {
          "type": "inlineCode",
          "value": "action"
        },
        {
          "type": "text",
          "value": " instead of "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
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
          "value": " browser completes constraint validation; React DOM collects "
        },
        {
          "type": "inlineCode",
          "value": "email"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "delivery"
        },
        {
          "type": "text",
          "value": "; function action starts; after Promise is settled, the result object enters the state queue; React commit summary; after successful action, uncontrolled form control presses React form contract reset."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "variables, references and FormData change:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "formData"
        },
        {
          "type": "text",
          "value": " is the snapshot submitted this time and will not change with the subsequent DOM; "
        },
        {
          "type": "inlineCode",
          "value": "email"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "delivery"
        },
        {
          "type": "text",
          "value": " is a string copy; "
        },
        {
          "type": "inlineCode",
          "value": "submittedCheckout"
        },
        {
          "type": "text",
          "value": " is initially null and then points to a new object; there is no server reference or request object."
        }
      ]
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
          "value": " submit button triggers the form; React DOM creates "
        },
        {
          "type": "inlineCode",
          "value": "FormData"
        },
        {
          "type": "text",
          "value": " and calls the client function; React tracking treats the function action as a transition; TypeScript forces the helper to handle the null/File possibility; the result summary comes from the committed object. If it is claimed that the closure is running on the server, it violates the framework boundary; after closing JavaScript, the Vite function does not exist, and this kind of forgery can be directly identified."
        }
      ]
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
          "value": "action"
        },
        {
          "type": "text",
          "value": " prop is function, so React DOM takes over instead of the browser serializing the function into a URL. Progressive enhancement is only true when the framework can turn the Server Function into submittable endpoint/reference."
        }
      ]
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
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": " provides "
        },
        {
          "type": "inlineCode",
          "value": "SubmitEvent"
        },
        {
          "type": "text",
          "value": " and usually requires "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": "; URL string action is handed over to browser navigation; function action receives FormData and enters React Action path."
        }
      ]
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
          "value": " Forgot field "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " will make FormData not have this value; treat function action and URL action as the same HTTP API; write "
        },
        {
          "type": "inlineCode",
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": " and claims to have server execution."
        }
      ]
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
          "value": " checkout and login form can first learn result/pending in the client action; when migrating to Next.js, put the real mutation into the authenticated Server Function boundary."
        }
      ]
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
          "value": " This section inherits Chapter 6 form submit and Chapter 13 framework boundary."
        }
      ]
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
          "value": " function form action is the Action contract of React DOM; Server Function progressive enhancement is the framework contract. The two cannot impersonate each other."
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
      "id": "95-useformstatus-and-the-nearest-form-boundary",
      "children": [
        {
          "type": "text",
          "value": "9.5 useFormStatus and the Nearest Form Boundary"
        }
      ]
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
          "value": "useFormStatus()"
        },
        {
          "type": "text",
          "value": " reads the submitted state of the most recent form in the outer layer of the calling component. It does not read subsequent forms returned by the same component, nor is it a global pending store."
        }
      ]
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
          "value": " submit button is often extracted as a reusable component. If pending props are passed layer by layer, wiring will be repeated; "
        },
        {
          "type": "inlineCode",
          "value": "useFormStatus"
        },
        {
          "type": "text",
          "value": " allows the button to directly consume the nearest form boundary."
        }
      ]
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
          "value": " SellerHub login, checkout and seller order forms can share submit buttons, but each button can only reflect its own parent form."
        }
      ]
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
          "value": " nearest parent form, "
        },
        {
          "type": "inlineCode",
          "value": "pending"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "data"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "method"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "action"
        },
        {
          "type": "text",
          "value": ", form status context."
        }
      ]
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
          "value": " React DOM provides status value for this boundary when form Action is pending. "
        },
        {
          "type": "inlineCode",
          "value": "SubmitButton"
        },
        {
          "type": "text",
          "value": " reads it as form child; the component outside the form reads not-pending default. "
        },
        {
          "type": "inlineCode",
          "value": "data"
        },
        {
          "type": "text",
          "value": " is the FormData snapshot currently being submitted, not the permanent form state of the component."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const { pending, data, method, action } = useFormStatus()"
        },
        {
          "type": "text",
          "value": ", no parameters. "
        },
        {
          "type": "inlineCode",
          "value": "data"
        },
        {
          "type": "text",
          "value": " is "
        },
        {
          "type": "inlineCode",
          "value": "FormData"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "data"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "action"
        },
        {
          "type": "text",
          "value": " is null."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/05-use-form-status-submit-button/form-status-submit-button.tsx",
      "value": "import { startTransition, useState } from 'react'\nimport { useFormStatus } from 'react-dom'\n\ntype LoginResult = {\n  email: string\n  message: string\n}\n\nexport function FormStatusSubmitButton() {\n  const [result, setResult] = useState<LoginResult | null>(null)\n\n  async function submitLogin(formData: FormData): Promise<void> {\n    const email = readFormString(formData, 'email')\n    await wait(600)\n\n    startTransition(() => {\n      setResult({\n        email,\n        message: email ? 'Login request accepted.' : 'Email is required.',\n      })\n    })\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"form-status-title\">\n      <p className=\"chapter14-kicker\">9.5 useFormStatus</p>\n      <h2 id=\"form-status-title\">Nearest form status and submit button</h2>\n      <form action={submitLogin} className=\"chapter14-form\">\n        <label className=\"chapter14-field\">\n          Seller email\n          <input defaultValue=\"seller@example.com\" name=\"email\" type=\"email\" />\n        </label>\n        <SubmitButton />\n      </form>\n      <p className=\"chapter14-result\">\n        {result ? `${result.email}: ${result.message}` : 'No login request submitted.'}\n      </p>\n    </section>\n  )\n}\n\nfunction SubmitButton() {\n  const status = useFormStatus()\n  const pendingEmail = status.data?.get('email')\n\n  return (\n    <div className=\"chapter14-submit-status\">\n      <button className=\"chapter14-button\" disabled={status.pending} type=\"submit\">\n        {status.pending ? 'Submitting login...' : 'Submit login'}\n      </button>\n      <span>\n        {status.pending && typeof pendingEmail === 'string'\n          ? `Submitting ${pendingEmail}`\n          : 'The button reads its parent form status.'}\n      </span>\n    </div>\n  )\n}\n\nfunction readFormString(formData: FormData, fieldName: string): string {\n  const value = formData.get(fieldName)\n  return typeof value === 'string' ? value : ''\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}"
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
          "value": " parent saves login result; form action simulates mutation; "
        },
        {
          "type": "inlineCode",
          "value": "SubmitButton"
        },
        {
          "type": "text",
          "value": " is in form children and calls "
        },
        {
          "type": "inlineCode",
          "value": "useFormStatus"
        },
        {
          "type": "text",
          "value": "; optional chaining processing not-pending "
        },
        {
          "type": "inlineCode",
          "value": "data === null"
        },
        {
          "type": "text",
          "value": "; runtime guard handles "
        },
        {
          "type": "inlineCode",
          "value": "FormDataEntryValue"
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
          "value": " submit starts, the form boundary publishes pending status; child button render is disabled; status data saves the email being submitted; after Action is completed and commit result is obtained, pending returns to false."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and status changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " Each render reflects the nearest parent form; "
        },
        {
          "type": "inlineCode",
          "value": "pendingEmail"
        },
        {
          "type": "text",
          "value": " only exists in active submission; result state and form status are different owners, and result remains after the submission is completed."
        }
      ]
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
          "value": " form submit creates FormData; React DOM binds active status to the form; child "
        },
        {
          "type": "inlineCode",
          "value": "SubmitButton"
        },
        {
          "type": "text",
          "value": " reads boundary; TypeScript requires narrowing to string before rendering email; so only this button is disabled when the form is pending. If the hook is located outside the form or is in the same component as the form but not in its child subtree, it violates the nearest parent boundary rule; it behaves like "
        },
        {
          "type": "inlineCode",
          "value": "pending"
        },
        {
          "type": "text",
          "value": " is always false."
        }
      ]
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
          "value": " status is provided downward through the React DOM form boundary and is not searched by function declaration location or component file name."
        }
      ]
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
          "value": "isPending"
        },
        {
          "type": "text",
          "value": " from "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " belongs to an Action hook; "
        },
        {
          "type": "inlineCode",
          "value": "useFormStatus().pending"
        },
        {
          "type": "text",
          "value": " belongs to the most recent form submission. A page can have multiple independent form statuses at the same time."
        }
      ]
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
          "value": " is called outside form; thinking it can track any "
        },
        {
          "type": "inlineCode",
          "value": "fetch"
        },
        {
          "type": "text",
          "value": "; read "
        },
        {
          "type": "inlineCode",
          "value": "data.get()"
        },
        {
          "type": "text",
          "value": "; put the submit button in the portal or a subtree that does not belong to the target form."
        }
      ]
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
          "value": " checkout submit button, login submit button and seller order form button can reuse components, but each reads its own form status."
        }
      ]
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
          "value": " This section upgrades the pending UI in Chapter 6 from manual boolean to React DOM form-owned status."
        }
      ]
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
          "value": "useFormStatus"
        },
        {
          "type": "text",
          "value": " is not \"whether the current page is busy\", but \"what is currently submitted by the parent form recently\"."
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
      "id": "96-useoptimistic-rollback-and-real-results",
      "children": [
        {
          "type": "text",
          "value": "9.6 useOptimistic, Rollback, and Real Results"
        }
      ]
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
          "value": " optimistic state is a temporary projection that covers the base state during Action pending, not the real server state. After the Action succeeds, the base must be updated with the authoritative result; when it fails, the base does not change and the optimistic layer can disappear and rollback."
        }
      ]
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
          "value": " Comment submission will appear sluggish if it waits for the server to display; immediately writing the comment permanently to the base state will leave false data when it fails."
        }
      ]
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
          "value": "useOptimistic"
        },
        {
          "type": "text",
          "value": " clearly distinguishes confirmed reviews from pending projections, and requires update function pure."
        }
      ]
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
          "value": " base state, optimistic reducer, pending record, rollback, reconciliation, authoritative result."
        }
      ]
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
          "value": "confirmedReviews"
        },
        {
          "type": "text",
          "value": " is base. Call "
        },
        {
          "type": "inlineCode",
          "value": "addOptimisticReview"
        },
        {
          "type": "text",
          "value": ", React applies the pending payload to the pure optimistic reducer; after Action settled, if the base is updated to confirmed review, the UI is aligned with the real result; if the base remains unchanged, the temporary layer is removed."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const [optimisticState, addOptimistic] = useOptimistic(value, reducer?)"
        },
        {
          "type": "text",
          "value": ".reducer "
        },
        {
          "type": "inlineCode",
          "value": "(currentState, optimisticPayload) => nextState"
        },
        {
          "type": "text",
          "value": " must be pure. optimistic setter must be called in Action / transition."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/06-use-optimistic-rollback/optimistic-review-reconciliation.tsx",
      "value": "import { startTransition, useOptimistic, useRef, useState } from 'react'\n\ntype Review = {\n  id: string\n  text: string\n  status: 'confirmed' | 'pending'\n}\n\ntype PendingReview = {\n  id: string\n  text: string\n}\n\nconst initialReviews: Review[] = [\n  {\n    id: 'review-1',\n    text: 'Fast delivery and clear product details.',\n    status: 'confirmed',\n  },\n]\n\nexport function OptimisticReviewReconciliation() {\n  const [confirmedReviews, setConfirmedReviews] = useState(initialReviews)\n  const [feedback, setFeedback] = useState('Submit a review. Include fail to test rollback.')\n  const nextReviewId = useRef(2)\n  const [optimisticReviews, addOptimisticReview] = useOptimistic(\n    confirmedReviews,\n    (currentReviews, pendingReview: PendingReview): Review[] => [\n      ...currentReviews,\n      { ...pendingReview, status: 'pending' },\n    ],\n  )\n\n  async function submitReview(formData: FormData): Promise<void> {\n    const text = readFormString(formData, 'review').trim()\n    const pendingReview = {\n      id: `review-${nextReviewId.current}`,\n      text,\n    }\n    nextReviewId.current += 1\n    addOptimisticReview(pendingReview)\n\n    await wait(650)\n\n    if (!text || text.toLowerCase().includes('fail')) {\n      startTransition(() => {\n        setFeedback('The mutation failed. The optimistic review was rolled back.')\n      })\n      return\n    }\n\n    startTransition(() => {\n      setConfirmedReviews((currentReviews) => [\n        ...currentReviews,\n        { ...pendingReview, status: 'confirmed' },\n      ])\n      setFeedback('The server result confirmed the optimistic review.')\n    })\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"optimistic-title\">\n      <p className=\"chapter14-kicker\">9.6 useOptimistic</p>\n      <h2 id=\"optimistic-title\">Optimistic review and reconciliation</h2>\n      <form action={submitReview} className=\"chapter14-form\">\n        <label className=\"chapter14-field\">\n          Product review\n          <input name=\"review\" placeholder=\"Write a short review\" />\n        </label>\n        <button className=\"chapter14-button\" type=\"submit\">\n          Add review\n        </button>\n      </form>\n      <ul className=\"chapter14-list\">\n        {optimisticReviews.map((review) => (\n          <li key={review.id}>\n            <strong>{review.text || 'Empty review'}</strong>\n            <span>{review.status}</span>\n          </li>\n        ))}\n      </ul>\n      <p className=\"chapter14-note\">{feedback}</p>\n    </section>\n  )\n}\n\nfunction readFormString(formData: FormData, fieldName: string): string {\n  const value = formData.get(fieldName)\n  return typeof value === 'string' ? value : ''\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}"
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
          "value": " confirmed is separated from pending types; ref generates stable local ID; optimistic reducer creates a new array and pending record; form action first projects pending review and then waits for result; successful branches write confirmed base, and failed branches do not write base."
        }
      ]
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
          "value": " submit; base in 650ms still does not contain it. When successful, base receives confirmed record, optimistic output and base reconciliation; the input contains "
        },
        {
          "type": "inlineCode",
          "value": "fail"
        },
        {
          "type": "text",
          "value": ", Action returns but base remains unchanged, and the temporary record disappears."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and optimistic state Change:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "pendingReview"
        },
        {
          "type": "text",
          "value": " object serves as the basis for both the optimistic payload and the successful result; the optimistic array is a temporary new reference; the confirmed array only generates a new reference when the branch is successful; the ref counter does not participate in the UI."
        }
      ]
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
          "value": " form submit creates text and pending objects; React sends the payload to the pure optimistic reducer in the Action scope; the UI reads the optimistic array during JavaScript Promise pending; TypeScript checks the pending/confirmed union, but cannot confirm that the server accepts comments; when it fails, the base does not change, so UI rollback after Action settled. If the setter is called outside the Action, it will violate the optimistic scope rules and a warning will appear; if the base is permanently modified first, the rollback will have no source to recover."
        }
      ]
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
          "value": "useOptimistic"
        },
        {
          "type": "text",
          "value": " does not own authoritative data, it is obtained from the incoming "
        },
        {
          "type": "inlineCode",
          "value": "confirmedReviews"
        },
        {
          "type": "text",
          "value": " derives temporary view. Whether Action updates base determines final reconciliation."
        }
      ]
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
          "value": "useState([...reviews, pending])"
        },
        {
          "type": "text",
          "value": " will treat temporary records as real state; server-state cache is responsible for cross-request caching, invalidation and retry, "
        },
        {
          "type": "inlineCode",
          "value": "useOptimistic"
        },
        {
          "type": "text",
          "value": " does not have these responsibilities."
        }
      ]
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
          "value": " optimistic reducer does side effect; there is no stable optimistic ID; base is still updated when it fails; optimistic array is used as server truth; there is no distinction between pending item and confirmed item."
        }
      ]
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
          "value": " cart quantity, product review and seller order status can all be optimistic, but payment, inventory and permission results must be subject to server confirmation."
        }
      ]
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
          "value": " This section merges Chapter 4 immutable array update, Chapter 9 async lifecycle and Chapter 13 server/client result boundary."
        }
      ]
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
          "value": " optimistic UI is \"cancelable projection during waiting\"; the real result determines the base state."
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
      "id": "97-the-use-api-with-promises-context-and-suspense",
      "children": [
        {
          "type": "text",
          "value": "9.7 The use API with Promises, Context, and Suspense"
        }
      ]
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
          "value": "use(resource)"
        },
        {
          "type": "text",
          "value": " can read context or cached Promise. "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " is not an ordinary Hook: it can be called in condition/loop, but still must be within a component or custom Hook; "
        },
        {
          "type": "inlineCode",
          "value": "use(promise)"
        },
        {
          "type": "text",
          "value": " pending will suspend."
        }
      ]
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
          "value": " saw "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " can be called conditionally, it is easy to mistakenly think that all Hook rules have been cancelled; see "
        },
        {
          "type": "inlineCode",
          "value": "use(Promise)"
        },
        {
          "type": "text",
          "value": ", it is easy to "
        },
        {
          "type": "inlineCode",
          "value": "fetch()"
        },
        {
          "type": "text",
          "value": " creates a new Promise, causing repeated fallback."
        }
      ]
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
          "value": " SellerHub dashboard can hand over the framework-created cached Promise to the client boundary; the current Vite project does not have a Suspense-compatible data source, so it only actually runs "
        },
        {
          "type": "inlineCode",
          "value": "use(context)"
        },
        {
          "type": "text",
          "value": ", Promise path explicitly as model."
        }
      ]
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
          "value": " usable resource, cached Promise identity, suspend, Suspense fallback, Error Boundary, conditional context read."
        }
      ]
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
                  "value": "JavaScript Promise only has pending/fulfilled/rejected state, and does not know React Suspense."
                }
              ]
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
                  "value": "React "
                },
                {
                  "type": "inlineCode",
                  "value": "use(promise)"
                },
                {
                  "type": "text",
                  "value": " Suspend component render while pending and give control to the nearest Suspense."
                }
              ]
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
                  "value": "React "
                },
                {
                  "type": "inlineCode",
                  "value": "use(context)"
                },
                {
                  "type": "text",
                  "value": " Read the latest provider value."
                }
              ]
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
                  "value": "Framework/cache layer is responsible for reusing Promise instance; TypeScript only checks "
                },
                {
                  "type": "inlineCode",
                  "value": "Usable<T>"
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
                  "value": "Error Boundary processing rejected Promise; cannot wrap "
                },
                {
                  "type": "inlineCode",
                  "value": "use(promise)"
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
          "value": " component render cannot complete the subtree when encountering pending cached Promise, React displays boundary fallback; retry render after the same Promise is fulfilled, "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " returns resolved value. If a new Promise is created every time render is performed and a new pending identity is encountered when retrying, fallback may occur repeatedly."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "const value = use(resource)"
        },
        {
          "type": "text",
          "value": ". The context path can be conditionally called; Promise must be cached and reused in the same instance. "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " cannot be called in try/catch."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/07-use-api-suspense-promise/use-api-resource-boundary.tsx",
      "value": "import { createContext, use, useState } from 'react'\n\ntype ThemeName = 'light' | 'contrast'\n\nconst ThemeContext = createContext<ThemeName>('light')\n\nconst promiseBoundaryRows = [\n  {\n    source: 'Framework-created cached Promise',\n    behavior: 'use(promise) can suspend and let Suspense show its fallback.',\n    currentProject: 'Mechanism model only',\n  },\n  {\n    source: 'Promise created during client render',\n    behavior: 'A new identity can suspend again on every render.',\n    currentProject: 'Do not use',\n  },\n  {\n    source: 'Context object',\n    behavior: 'use(context) reads the nearest provider and may be conditional.',\n    currentProject: 'Runnable below',\n  },\n]\n\nexport function UseApiResourceBoundary() {\n  const [theme, setTheme] = useState<ThemeName>('light')\n  const [showTheme, setShowTheme] = useState(true)\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"use-api-title\">\n      <p className=\"chapter14-kicker\">9.7 use API</p>\n      <h2 id=\"use-api-title\">Context reading and cached Promise boundary</h2>\n      <ThemeContext value={theme}>\n        <div className=\"chapter14-action-row\">\n          <button\n            className=\"chapter14-button\"\n            onClick={() =>\n              setTheme((currentTheme) =>\n                currentTheme === 'light' ? 'contrast' : 'light',\n              )\n            }\n            type=\"button\"\n          >\n            Toggle theme\n          </button>\n          <button\n            className=\"chapter14-button\"\n            onClick={() => setShowTheme((currentValue) => !currentValue)}\n            type=\"button\"\n          >\n            Toggle context read\n          </button>\n        </div>\n        <ThemeReader shouldRead={showTheme} />\n      </ThemeContext>\n      <div className=\"chapter14-table\" role=\"table\" aria-label=\"use resource boundaries\">\n        {promiseBoundaryRows.map((row) => (\n          <div className=\"chapter14-table-row\" key={row.source} role=\"row\">\n            <strong role=\"cell\">{row.source}</strong>\n            <span role=\"cell\">{row.behavior}</span>\n            <span role=\"cell\">{row.currentProject}</span>\n          </div>\n        ))}\n      </div>\n      <p className=\"chapter14-note\">\n        This Vite project does not pretend to provide a framework-cached Promise source.\n      </p>\n    </section>\n  )\n}\n\nfunction ThemeReader({ shouldRead }: { shouldRead: boolean }) {\n  if (!shouldRead) {\n    return <p className=\"chapter14-result\">Context reading is skipped in this branch.</p>\n  }\n\n  const theme = use(ThemeContext)\n  return <p className=\"chapter14-result\">Nearest theme context: {theme}</p>\n}"
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
          "value": " context default value and union type are clear; "
        },
        {
          "type": "inlineCode",
          "value": "promiseBoundaryRows"
        },
        {
          "type": "text",
          "value": " only displays the mechanism, does not create Promise; provider uses React 19 context provider shorthand; "
        },
        {
          "type": "inlineCode",
          "value": "ThemeReader"
        },
        {
          "type": "text",
          "value": " conditionally calls "
        },
        {
          "type": "inlineCode",
          "value": "use(ThemeContext)"
        },
        {
          "type": "text",
          "value": ", this is "
        },
        {
          "type": "inlineCode",
          "value": "use"
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
          "value": " toggle theme updates provider state; next render generates new context value; "
        },
        {
          "type": "inlineCode",
          "value": "ThemeReader"
        },
        {
          "type": "text",
          "value": " If reading is enabled, the nearest provider value will be obtained. When toggle read is false, it returns directly without calling "
        },
        {
          "type": "inlineCode",
          "value": "use"
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
              "value": "Variables, references and resource changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " theme is React state snapshot; context object identity is fixed in module scope; provider value changes between light/contrast; Promise form does not create or execute any resources."
        }
      ]
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
          "value": " click update "
        },
        {
          "type": "inlineCode",
          "value": "showTheme"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "theme"
        },
        {
          "type": "text",
          "value": "; React reads the same Context object and locates the provider; TypeScript confirms and returns "
        },
        {
          "type": "inlineCode",
          "value": "ThemeName"
        },
        {
          "type": "text",
          "value": "; UI displays the current provider value. In the Promise path, the framework must provide a stable Promise identity so that React can retry from the pending fallback to the fulfilled value. If "
        },
        {
          "type": "inlineCode",
          "value": "fetch()"
        },
        {
          "type": "text",
          "value": ", every time a new Promise is created, it violates the cached identity rule; it can be identified by uncached Promise warning and persistent fallback."
        }
      ]
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
          "value": "use(context)"
        },
        {
          "type": "text",
          "value": " comes from component tree, not lexical import; "
        },
        {
          "type": "inlineCode",
          "value": "use(promise)"
        },
        {
          "type": "text",
          "value": " comes from Promise state, but React associates suspension through Promise identity."
        }
      ]
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
          "value": "useContext"
        },
        {
          "type": "text",
          "value": " must comply with the normal Hook top-level order; "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " can be read conditionally, but it still cannot be called at will in ordinary functions, event handlers or try/catch."
        }
      ]
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
          "value": " render; try/catch package "
        },
        {
          "type": "inlineCode",
          "value": "use(promise)"
        },
        {
          "type": "text",
          "value": "; use Effect fetch as Suspense data source; consider "
        },
        {
          "type": "inlineCode",
          "value": "Promise<Product[]>"
        },
        {
          "type": "text",
          "value": " guarantees response runtime shape."
        }
      ]
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
          "value": " future Next.js dashboard can create/pass framework-supported resources by Server Component; the current Vite chapter only practices context read and resource owner judgment."
        }
      ]
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
          "value": " This section inherits Chapter 8 Context, Chapter 9 Promise lifecycle, Chapter 11 Suspense and Chapter 13 Chapter server/client resource boundary."
        }
      ]
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
          "value": "use"
        },
        {
          "type": "text",
          "value": " reads resource; Promise identity determines whether suspension can be converged; cache owner does not belong to "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " itself."
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
      "id": "98-the-framework-boundary-for-server-functions",
      "children": [
        {
          "type": "text",
          "value": "9.8 The Framework Boundary for Server Functions"
        }
      ]
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
          "value": " Server Function is the framework that will "
        },
        {
          "type": "inlineCode",
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": " function is converted into client-callable server reference. When an Action prop is passed in or called within an Action, it is a Server Action; not all Server Functions are Server Actions."
        }
      ]
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
          "value": " Write "
        },
        {
          "type": "inlineCode",
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": " will not create server endpoint, authentication, serialization or database execution."
        }
      ]
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
          "value": " SellerHub checkout and seller order mutation can be migrated to framework Server Function in the future, but authorization and input verification must be re-executed in the server runtime."
        }
      ]
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
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": ", server reference, generated transport, serializable arguments/result, Server Action naming."
        }
      ]
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
                  "value": "React defines Server Function semantics."
                }
              ]
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
                  "value": "RSC framework/bundler identifies the directive and generates a server reference."
                }
              ]
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
                  "value": "Browser calls reference, the framework sends a network request."
                }
              ]
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
                  "value": "Server runtime executes the real function."
                }
              ]
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
                  "value": "TypeScript does not provide authorization or runtime validation."
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
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " build phase leaves the function implementation in the server graph and puts the serializable reference into the client graph. When calling reference, the framework serializes arguments, locates the server function, and then serializes the result after execution. The current Vite plugin does not have this transform."
        }
      ]
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
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": " can be located at the beginning of the async function body or the beginning of the server-only module; the client call parameters and return value must comply with the serialization contract supported by the framework. Safety checks should still be done inside the function."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Current Vite operating statement:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This section does not run the framework-only API in the current Vite project, focusing on the React 19 API boundary and architectural mechanisms."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/08-server-functions-boundary/server-function-boundary-map.tsx",
      "value": "const serverFunctionBoundaries = [\n  {\n    step: 'Define',\n    frameworkOwner: 'A framework transforms a function marked with \"use server\".',\n    viteReality: 'No Server Function transform is configured.',\n  },\n  {\n    step: 'Reference',\n    frameworkOwner: 'The client receives a serializable server reference.',\n    viteReality: 'A local async function remains ordinary browser JavaScript.',\n  },\n  {\n    step: 'Invoke',\n    frameworkOwner: 'The framework sends serialized arguments to the server runtime.',\n    viteReality: 'No generated network request or server execution exists.',\n  },\n  {\n    step: 'Return',\n    frameworkOwner: 'The framework serializes the result back to React.',\n    viteReality: 'The lab only renders this architecture map.',\n  },\n]\n\nexport function ServerFunctionBoundaryMap() {\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"server-function-title\">\n      <p className=\"chapter14-kicker\">9.8 Server Functions</p>\n      <h2 id=\"server-function-title\">Framework-owned server execution</h2>\n      <div className=\"chapter14-grid\">\n        {serverFunctionBoundaries.map((boundary) => (\n          <article className=\"chapter14-card\" key={boundary.step}>\n            <span className=\"chapter14-pill\">{boundary.step}</span>\n            <h3>{boundary.frameworkOwner}</h3>\n            <p>{boundary.viteReality}</p>\n          </article>\n        ))}\n      </div>\n      <p className=\"chapter14-note\">\n        Server Functions are stable React features, but implementing their transport and\n        bundler integration belongs to a framework. This Vite lab does not fake that runtime.\n      </p>\n    </section>\n  )\n}"
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
          "value": " static array separates the four steps of define, reference, invoke, and return; each item writes the framework owner and the current Vite reality at the same time; the components are only mapped to cards, without directives, network, or server imports."
        }
      ]
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
          "value": " The current runtime only executes array map and React DOM render. In a real framework, build transform first generates a reference, and browser invocation triggers a server request."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and serialization changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This example "
        },
        {
          "type": "inlineCode",
          "value": "serverFunctionBoundaries"
        },
        {
          "type": "text",
          "value": " is a normal client array; the real Server Function client value is not an implementation closure, but a framework reference; arguments/result requires serialization."
        }
      ]
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
          "value": " build tool encounters directive; framework separates module graph and generates reference; browser calls reference; server performs mutation; React receives serialized result; TypeScript only checks the declaration type. Currently Vite is missing the second step, so subsequent steps don't exist. If the local async function directly imports database secret or declares server-only, it violates the module/runtime boundary; you can identify it by checking the bundle and network."
        }
      ]
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
          "value": " directive itself does not contain transport implementation; the framework is the owner of reference, request routing and server execution."
        }
      ]
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
          "value": " client Action can be run in Vite browser; Server Function Action must be run on framework server. The API route is the explicit Request/Response boundary, and the Server Function is the framework-generated function call boundary."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": " When Server Component tag; pass function, DOM node or other non-serializable objects; verify permissions only in client; confuse Server Function stable feature with its framework bundler implementation stability."
        }
      ]
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
          "value": " future Next.js checkout, seller order update and review submit can be placed in Server Function; the current project only defines boundary and will never be connected to the database."
        }
      ]
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
          "value": " This is the mutation direction extension of Chapter 13 Server Component / Client Component serialization."
        }
      ]
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
          "value": "\"use server\""
        },
        {
          "type": "text",
          "value": " is the framework compilation entry, not the network magic string; the essence of Server Function is server implementation + client reference + generated transport."
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
      "id": "99-ref-as-a-prop-document-metadata-and-static-apis",
      "children": [
        {
          "type": "text",
          "value": "9.9 ref as a Prop, Document Metadata, and Static APIs"
        }
      ]
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
          "value": " React 19 function component can put "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " is received as prop and transferred to DOM node; metadata tags can be output by component to document head; "
        },
        {
          "type": "inlineCode",
          "value": "prerender"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "resume"
        },
        {
          "type": "text",
          "value": " and other static/server APIs are for framework or server pipeline."
        }
      ]
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
          "value": " The three groups of React 19 capabilities are all related to the \"output boundary\", but the owner is different: ref points to imperative DOM handle, metadata generates document output, and static APIs generate or restore server HTML stream."
        }
      ]
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
          "value": " SellerHub search input can be focused using ref as prop; product page metadata belongs to document output; static generation should be called by the future framework entry instead of ordinary ProductCard."
        }
      ]
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
          "value": " ref as prop, DOM ref, metadata hoisting, "
        },
        {
          "type": "inlineCode",
          "value": "prerender"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "resume"
        },
        {
          "type": "text",
          "value": ", static/server rendering entrypoint."
        }
      ]
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
          "value": " React commit writes DOM node to ref; event handler reads "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": " and call browser "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": ". React DOM recognizes "
        },
        {
          "type": "inlineCode",
          "value": "<title>"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "<meta>"
        },
        {
          "type": "text",
          "value": " and put it on head. Static APIs receive the complete React tree and generate streams in the server/build environment. They are not called by the current client component."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature/attribute:"
            }
          ]
        },
        {
          "type": "text",
          "value": " function component props can declare "
        },
        {
          "type": "inlineCode",
          "value": "ref?: Ref<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": "; DOM element uses "
        },
        {
          "type": "inlineCode",
          "value": "ref={ref}"
        },
        {
          "type": "text",
          "value": "; metadata uses "
        },
        {
          "type": "inlineCode",
          "value": "<title>"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "<meta>"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "prerender(reactNode, options?)"
        },
        {
          "type": "text",
          "value": " from "
        },
        {
          "type": "inlineCode",
          "value": "react-dom/static"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "resume(reactNode, postponedState, options?)"
        },
        {
          "type": "text",
          "value": " comes from server rendering entrypoint."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/09-ref-metadata-static-apis/react-19-platform-boundaries.tsx",
      "value": "import { useRef } from 'react'\nimport type { Ref } from 'react'\n\ntype SearchInputProps = {\n  label: string\n  ref?: Ref<HTMLInputElement>\n}\n\nconst platformBoundaries = [\n  {\n    feature: 'ref as prop',\n    owner: 'React runtime and React DOM',\n    currentProject: 'Runnable',\n  },\n  {\n    feature: 'title and meta',\n    owner: 'React DOM document output',\n    currentProject: 'Runnable',\n  },\n  {\n    feature: 'prerender and resume',\n    owner: 'Framework or server build pipeline',\n    currentProject: 'Mechanism model only',\n  },\n]\n\nexport function React19PlatformBoundaries() {\n  const searchInputRef = useRef<HTMLInputElement>(null)\n\n  function focusSearch(): void {\n    searchInputRef.current?.focus()\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"platform-boundary-title\">\n      <title>React 19 Actions and Compiler Practice</title>\n      <meta\n        content=\"React 19 Actions, use API, and Compiler boundary practice.\"\n        name=\"description\"\n      />\n      <p className=\"chapter14-kicker\">9.9 React 19 platform boundaries</p>\n      <h2 id=\"platform-boundary-title\">Ref, metadata, and static API ownership</h2>\n      <SearchInput label=\"Seller search\" ref={searchInputRef} />\n      <button className=\"chapter14-button\" onClick={focusSearch} type=\"button\">\n        Focus seller search\n      </button>\n      <div className=\"chapter14-grid\">\n        {platformBoundaries.map((boundary) => (\n          <article className=\"chapter14-card\" key={boundary.feature}>\n            <h3>{boundary.feature}</h3>\n            <p>{boundary.owner}</p>\n            <span className=\"chapter14-pill\">{boundary.currentProject}</span>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}\n\nfunction SearchInput({ label, ref }: SearchInputProps) {\n  return (\n    <label className=\"chapter14-field\">\n      {label}\n      <input placeholder=\"Search orders\" ref={ref} />\n    </label>\n  )\n}"
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
          "value": "Ref<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": " describes acceptable ref shapes; parent creates ref object; child destructures "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " and passed to input; handler reads "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": "; title/meta output as JSX; static API only appears in boundary data."
        }
      ]
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
          "value": " render creates input description; after commit, React DOM writes the real input node into ref; when focus is clicked browser "
        },
        {
          "type": "inlineCode",
          "value": "HTMLElement.focus()"
        },
        {
          "type": "text",
          "value": " is executed; React DOM also maintains the head output of title/meta."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and document output changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "searchInputRef"
        },
        {
          "type": "text",
          "value": " object identity maintained across renders; "
        },
        {
          "type": "inlineCode",
          "value": "current"
        },
        {
          "type": "text",
          "value": " changes from null to DOM node; its change does not trigger render. Metadata enters the document head and does not enter the component state. static rows do not call any server API."
        }
      ]
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
          "value": " React commit writes ref; click handler reads DOM node; browser focus changes active element; TypeScript confirms node type, but does not guarantee that it is not null before commit. metadata JSX is handled by React DOM relocation/deduplication rules. If "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": ", violating refs lint; if "
        },
        {
          "type": "inlineCode",
          "value": "prerender"
        },
        {
          "type": "text",
          "value": ", server entrypoint owner violation; identifiable from lint and browser bundle import."
        }
      ]
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
          "value": " ref is imperative handle, not UI snapshot; metadata is document output, not local state; static APIs is whole-document server output, not leaf component utility."
        }
      ]
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
          "value": " React 18 Commonly used "
        },
        {
          "type": "inlineCode",
          "value": "forwardRef"
        },
        {
          "type": "text",
          "value": "; React 19 new function component can directly receive ref prop, but class refs and "
        },
        {
          "type": "inlineCode",
          "value": "useImperativeHandle"
        },
        {
          "type": "text",
          "value": " still has its own contract."
        }
      ]
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
          "value": " believes that ref as prop turns ref into ordinary serializable data; uses metadata state to control business UI; import server static API in Vite client bundle; put experimental "
        },
        {
          "type": "inlineCode",
          "value": "resumeAndPrerender"
        },
        {
          "type": "text",
          "value": " is the default capability for all environments."
        }
      ]
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
          "value": " search focus is DOM imperative boundary; Product detail title/description is document output; catalog SSG/partial prerender should be handed over to the future framework."
        }
      ]
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
          "value": " This section reuses Chapter 7 ref, Chapter 13 runtime and this chapter React 19 output changes."
        }
      ]
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
          "value": " ref points to committed DOM, metadata describes document, and static APIs generate server HTML; none of the three are ordinary client state."
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
      "id": "910-the-real-goal-of-react-compiler-automatic-memoization",
      "children": [
        {
          "type": "text",
          "value": "9.10 The Real Goal of React Compiler Automatic Memoization"
        }
      ]
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
          "value": " React Compiler is a build-time optimizer, the goal is to automatically reuse component output and expensive render calculations, reducing handwriting "
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
          "value": ". It does not prevent React from rendering, nor does it change the model where state/props/context is the UI input."
        }
      ]
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
          "value": " \"Compiler will automatically memoize\" is often misread as \"no need to understand render anymore\" or \"all functions will be cached\". The Compiler only analyzes components and Hooks and generates memoization when the rules are met."
        }
      ]
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
          "value": " SellerHub ProductCard and OrderRow can become compiler candidates, but they must first prove performance issues with Profiler and keep the business logic correct."
        }
      ]
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
          "value": " automatic memoization, compiler candidate, build-time transform, bailout, generated cache slot, update performance."
        }
      ]
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
                  "value": "React runtime still calls component according to state/props/context."
                }
              ]
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
                  "value": "Compiler analyzes AST/HIR, data flow and mutability in the build phase."
                }
              ]
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
                  "value": "Bundler receives compiler output."
                }
              ]
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
                  "value": "ESLint prematurely exposes patterns that violate the Rules of React."
                }
              ]
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
                  "value": "TypeScript typecheck and Compiler optimization are independent gates."
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
              "value": "The underlying mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Compiler identifies which value/JSX in component render can be reused when the input is unchanged and generates equivalent memoization. If the analysis finds an unsupported or unsafe pattern, the component is usually skipped instead of fixing the semantics."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Current project configuration:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "package.json"
        },
        {
          "type": "text",
          "value": " No "
        },
        {
          "type": "inlineCode",
          "value": "babel-plugin-react-compiler"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "vite.config.ts"
        },
        {
          "type": "text",
          "value": " only "
        },
        {
          "type": "inlineCode",
          "value": "@vitejs/plugin-react"
        },
        {
          "type": "text",
          "value": ". So the component below renders normally, but without compiler-generated memoization."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/10-react-compiler-goal/compiler-optimization-model.tsx",
      "value": "import { useState } from 'react'\n\ntype Product = {\n  id: string\n  name: string\n  category: string\n}\n\nconst products: Product[] = [\n  { id: 'product-1', name: 'Desk Lamp', category: 'Lighting' },\n  { id: 'product-2', name: 'Travel Mug', category: 'Kitchen' },\n  { id: 'product-3', name: 'Task Chair', category: 'Office' },\n]\n\nconst compilerSetup = {\n  configured: false,\n  runtimeBehavior: 'The component renders normally without compiler-generated memoization.',\n  buildBehavior: 'Vite transforms TSX, but no React Compiler plugin runs.',\n}\n\nexport function CompilerOptimizationModel() {\n  const [query, setQuery] = useState('')\n  const normalizedQuery = query.trim().toLowerCase()\n  const visibleProducts = products.filter((product) =>\n    product.name.toLowerCase().includes(normalizedQuery),\n  )\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"compiler-goal-title\">\n      <p className=\"chapter14-kicker\">9.10 React Compiler goal</p>\n      <h2 id=\"compiler-goal-title\">Automatic memoization without changing render semantics</h2>\n      <label className=\"chapter14-field\">\n        Product filter\n        <input\n          onChange={(event) => setQuery(event.currentTarget.value)}\n          value={query}\n        />\n      </label>\n      <ul className=\"chapter14-list\">\n        {visibleProducts.map((product) => (\n          <li key={product.id}>\n            <strong>{product.name}</strong>\n            <span>{product.category}</span>\n          </li>\n        ))}\n      </ul>\n      <p className=\"chapter14-note\">{compilerSetup.runtimeBehavior}</p>\n      <p className=\"chapter14-note\">{compilerSetup.buildBehavior}</p>\n    </section>\n  )\n}"
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
          "value": " products is module constant; query is render input; normalizedQuery and visibleProducts are calculated in each render; there is no handwritten memoization; "
        },
        {
          "type": "inlineCode",
          "value": "compilerSetup"
        },
        {
          "type": "text",
          "value": " Clarifies the current tool chain facts."
        }
      ]
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
          "value": " input event updates query state; React adjusts the component to generate next JSX; filter runs and generates a new array; React reconciliation/commit updates list. The current build does not add cache check."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references, and compiler candidates change:"
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
          "value": " Each render is a new binding; "
        },
        {
          "type": "inlineCode",
          "value": "visibleProducts"
        },
        {
          "type": "text",
          "value": " is a new array every time. If the Compiler is configured and determines that the dependency is safe, it can cache calculation/JSX; the current project does not have this transform and cannot claim that reuse occurs."
        }
      ]
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
          "value": " input event creates string; React state cell saves query; render calls "
        },
        {
          "type": "inlineCode",
          "value": "filter"
        },
        {
          "type": "text",
          "value": "; TypeScript checks Product fields; Vite only performs TSX transform; so the runtime is recalculated for each query update. Missing Compiler setup means there is no compiler candidate result or DevTools Memo badge. If \"Compiler has been optimized\" is reported, but there is no compiler plugin in the dependencies and build config, the tooling evidence conflicts with the conclusion."
        }
      ]
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
          "value": " automatic memoization is generated output, not automatically enabled by React 19 runtime. Installing React 19 does not mean enabling the Compiler."
        }
      ]
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
          "value": " Handwriting "
        },
        {
          "type": "inlineCode",
          "value": "useMemo"
        },
        {
          "type": "text",
          "value": " explicitly creates the runtime Hook cache; Compiler automatically generates equivalent reuse at build time. Neither guarantees the expensive non-React utility of sharing caches across multiple components."
        }
      ]
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
          "value": " Delete manual memo without profile; treat Compiler as correct renderness tool; think that child is no longer there; think that compiler will fix unstable key or state owner."
        }
      ]
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
          "value": " ProductCard, OrderRow and dashboard calculation are candidates; checkout mutation correctness and authorization do not belong to the compiler."
        }
      ]
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
          "value": " This section inherits the performance evidence from Chapter 11, and puts manual optimization into the build-time migration perspective."
        }
      ]
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
          "value": " Compiler optimizes \"correct and analyzable render\" and does not define what a correct business architecture is."
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
      "id": "911-compiler-rules-directives-and-lints",
      "children": [
        {
          "type": "text",
          "value": "9.11 Compiler Rules, Directives, and Lints"
        }
      ]
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
          "value": " Compiler's ability to be optimized depends on provable data flow. "
        },
        {
          "type": "inlineCode",
          "value": "purity"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "immutability"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "refs"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "set-state-in-render"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "static-components"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "unsupported-syntax"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "preserve-manual-memoization"
        },
        {
          "type": "text",
          "value": " is evidence of optimizability and correctness."
        }
      ]
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
          "value": " Compiler diagnostic does not necessarily cause the entire build to fail; in many cases the Compiler will skip problematic components. Ignoring lint will reduce optimization coverage and may also expose original runtime bugs."
        }
      ]
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
          "value": " The current project does not have a Compiler, but "
        },
        {
          "type": "inlineCode",
          "value": "eslint-plugin-react-hooks@7.0.1"
        },
        {
          "type": "text",
          "value": " can already run compiler-related lints and is suitable as a pre-migration baseline."
        }
      ]
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
          "value": " Compiler bailout, lint evidence, "
        },
        {
          "type": "inlineCode",
          "value": "\"use memo\""
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "\"use no memo\""
        },
        {
          "type": "text",
          "value": ", annotation mode, preserve manual memoization."
        }
      ]
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
          "value": " lint identifies known dangerous patterns at the source level; Compiler builds a more complete data flow model. The directive is located in the module or function prologue, and opt-in/opt-out is only controlled when the Compiler reads it; the JavaScript runtime will not automatically memoize because of this."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "fixed directive/lint name:"
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
                  "value": "\"use memo\""
                },
                {
                  "type": "text",
                  "value": ": Explicitly request compilation in annotation mode."
                }
              ]
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
                  "value": "\"use no memo\""
                },
                {
                  "type": "text",
                  "value": ": Temporarily exit compilation to isolate the problem."
                }
              ]
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
                  "value": "directives must be in the directive prologue of a module or function."
                }
              ]
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
                  "value": "lints Use accurate rule names, no need to create your own \"compiler-safe\" generic tags."
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
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/11-compiler-rules-lints/compiler-rule-evidence.tsx",
      "value": "type CompilerRuleEvidence = {\n  lint: string\n  violation: string\n  safeDirection: string\n}\n\nconst compilerRuleEvidence: CompilerRuleEvidence[] = [\n  {\n    lint: 'purity',\n    violation: 'Date.now() or Math.random() during render',\n    safeDirection: 'Read changing values in events or external synchronization boundaries.',\n  },\n  {\n    lint: 'immutability',\n    violation: 'Mutating props, state, or captured values',\n    safeDirection: 'Create a new object or array for the next snapshot.',\n  },\n  {\n    lint: 'refs',\n    violation: 'Reading or writing ref.current during render',\n    safeDirection: 'Use refs from event handlers or effects.',\n  },\n  {\n    lint: 'set-state-in-render',\n    violation: 'Unconditional state setter call during render',\n    safeDirection: 'Derive the value or update it from an event.',\n  },\n  {\n    lint: 'static-components',\n    violation: 'Defining a component inside another component',\n    safeDirection: 'Keep component definitions at module scope.',\n  },\n  {\n    lint: 'unsupported-syntax',\n    violation: 'Dynamic scope or eval that blocks static analysis',\n    safeDirection: 'Use explicit data flow and supported syntax.',\n  },\n  {\n    lint: 'preserve-manual-memoization',\n    violation: 'Incomplete dependencies on existing manual memoization',\n    safeDirection: 'Keep complete dependencies and remove memoization only with evidence.',\n  },\n]\n\nexport function CompilerRuleEvidencePanel() {\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"compiler-lints-title\">\n      <p className=\"chapter14-kicker\">9.11 Compiler rules and lints</p>\n      <h2 id=\"compiler-lints-title\">Static analysis evidence before compiler adoption</h2>\n      <div className=\"chapter14-table\" role=\"table\" aria-label=\"Compiler lint evidence\">\n        {compilerRuleEvidence.map((rule) => (\n          <div className=\"chapter14-table-row\" key={rule.lint} role=\"row\">\n            <strong role=\"cell\">{rule.lint}</strong>\n            <span role=\"cell\">{rule.violation}</span>\n            <span role=\"cell\">{rule.safeDirection}</span>\n          </div>\n        ))}\n      </div>\n      <p className=\"chapter14-note\">\n        The current project runs the recommended eslint-plugin-react-hooks preset, but it\n        does not run React Compiler.\n      </p>\n    </section>\n  )\n}"
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
          "value": " type fixes the lint evidence shape; each row points to the specific violation and repair direction; the component uses the stable lint name as the key; and finally the actual configuration differences between lint and compiler are clarified."
        }
      ]
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
          "value": " The current runtime only maps rows. Execute "
        },
        {
          "type": "inlineCode",
          "value": "npm run lint"
        },
        {
          "type": "text",
          "value": ", ESLint reads "
        },
        {
          "type": "inlineCode",
          "value": "reactHooks.configs.flat.recommended"
        },
        {
          "type": "text",
          "value": " and run the rule; execute "
        },
        {
          "type": "inlineCode",
          "value": "npm run build"
        },
        {
          "type": "text",
          "value": ", Vite does not run the Compiler transform."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, References and Analysis Changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "compilerRuleEvidence"
        },
        {
          "type": "text",
          "value": " is a stable module array; there is no compiler candidate object. The lint result comes from the tooling process and does not enter the React state; the evidence will be regenerated next time after the source is repaired."
        }
      ]
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
          "value": " developer runs lint; ESLint parser creates AST; plugin rule finds impure call, mutation or nested component in render; TypeScript may still consider the type to be legal; lint reports the specific source location; if Compiler is enabled in the future, the corresponding component may bailout. If "
        },
        {
          "type": "inlineCode",
          "value": "\"use memo\""
        },
        {
          "type": "text",
          "value": " is added to the impure component and still violates purity; the directive cannot override the correctness rule."
        }
      ]
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
          "value": " The legal type only means shape compatible; static optimization also requires render semantics, mutation flow and component identity to meet React rules."
        }
      ]
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
          "value": " Compiler error may be a tooling bug; the runtime difference may come from the original code dependency memoization for correctness. During debugging, you can temporarily set "
        },
        {
          "type": "inlineCode",
          "value": "\"use no memo\""
        },
        {
          "type": "text",
          "value": " is isolated, but the root cause should be repaired and the directive should be removed."
        }
      ]
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
          "value": " To improve coverage, close lints at once; delete existing memoization but do not run tests; define child in parent render; use "
        },
        {
          "type": "inlineCode",
          "value": "Date.now()"
        },
        {
          "type": "text",
          "value": " Generate UI; equate lint PASS to Compiler already running."
        }
      ]
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
          "value": " ProductCard requires pure props -> JSX; OrderRow existing memo dependencies must be complete; cart state update must be immutable; DOM ref is only used in handler/effect."
        }
      ]
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
          "value": " This section connects Chapter 7 Chapter refs/purity, Chapter 11 memoization and Chapter 12 lint gate."
        }
      ]
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
          "value": " lint is compiler-readiness evidence, not compiler output; directive is compilation control, not rule exemption."
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
      "id": "912-migrating-toward-a-compiler-friendly-codebase",
      "children": [
        {
          "type": "text",
          "value": "9.12 Migrating Toward a Compiler-Friendly Codebase"
        }
      ]
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
          "value": " React 19 API and Compiler should be migrated gradually. First fix the behavior and performance baseline, then pass lint/typecheck/test/build, then introduce Action according to feature boundary, and finally configure the Compiler in an independent change."
        }
      ]
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
          "value": " Upgrading the API, deleting manual memoization, and enabling Compiler all at once will make behavioral regression, performance changes, and tooling problems impossible to attribute."
        }
      ]
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
          "value": " migration is evidence management, not syntax replacement. Chapter 12 gates and Chapter 11 Profiler are migration inputs."
        }
      ]
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
          "value": " baseline, incremental adoption, annotation mode, gating, rollback plan, manual memo preservation."
        }
      ]
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
          "value": " Only one owner is changed during each migration: client mutation contract first, then compiler build transform. Quality gates check rules, types, behaviors, and bundles for the same source respectively; Profiler compares render evidence."
        }
      ]
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
          "value": " There is no new runtime API in this section, the focus is on responsibility boundaries and runtime mechanisms. Compiler officially supports progressive methods such as directories, annotation directives or gating, but this chapter does not add configuration."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/12-migration-strategy/react-19-migration-gates.tsx",
      "value": "import { useState } from 'react'\n\ntype MigrationGate = {\n  id: string\n  label: string\n  evidence: string\n}\n\nconst migrationGates: MigrationGate[] = [\n  {\n    id: 'baseline',\n    label: 'Record current behavior and performance evidence',\n    evidence: 'Chapter 11 Profiler and existing behavior tests',\n  },\n  {\n    id: 'quality',\n    label: 'Pass lint, typecheck, test, and build',\n    evidence: 'Chapter 12 quality gates',\n  },\n  {\n    id: 'actions',\n    label: 'Adopt one Action boundary at a time',\n    evidence: 'Pending, result, error, and rollback behavior',\n  },\n  {\n    id: 'compiler',\n    label: 'Enable compiler only after a separate configuration review',\n    evidence: 'No compiler package is installed in this chapter',\n  },\n  {\n    id: 'memo',\n    label: 'Remove manual memoization only after profiling and tests',\n    evidence: 'preserve-manual-memoization remains a migration signal',\n  },\n]\n\nexport function React19MigrationGates() {\n  const [completedGateIds, setCompletedGateIds] = useState<string[]>([])\n\n  function toggleGate(gateId: string): void {\n    setCompletedGateIds((currentIds) =>\n      currentIds.includes(gateId)\n        ? currentIds.filter((currentId) => currentId !== gateId)\n        : [...currentIds, gateId],\n    )\n  }\n\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"migration-title\">\n      <p className=\"chapter14-kicker\">9.12 Migration strategy</p>\n      <h2 id=\"migration-title\">Quality gates before API and compiler rollout</h2>\n      <ul className=\"chapter14-checklist\">\n        {migrationGates.map((gate) => (\n          <li key={gate.id}>\n            <label>\n              <input\n                checked={completedGateIds.includes(gate.id)}\n                onChange={() => toggleGate(gate.id)}\n                type=\"checkbox\"\n              />\n              <span>\n                <strong>{gate.label}</strong>\n                <small>{gate.evidence}</small>\n              </span>\n            </label>\n          </li>\n        ))}\n      </ul>\n      <p className=\"chapter14-note\">\n        Completed gates: {completedGateIds.length} / {migrationGates.length}\n      </p>\n    </section>\n  )\n}"
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
          "value": " migration gate is typed data; completed IDs are UI state; functional updater returns a new array based on current IDs; checkbox only demonstrates checklist progress and does not perform actual install or config."
        }
      ]
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
          "value": " click checkbox creates gate ID intent; React updater checks membership; filter or spread generates a new array; commit updates checked state and count. There are no package install or build config mutations."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and migration evidence changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "migrationGates"
        },
        {
          "type": "text",
          "value": " remains unchanged; "
        },
        {
          "type": "inlineCode",
          "value": "completedGateIds"
        },
        {
          "type": "text",
          "value": " Each toggle is a new array; checking the state is just for learning the UI, not the actual gate pass. The real evidence must come from the command output."
        }
      ]
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
          "value": " click triggers toggle; JavaScript creates next array; React state snapshot updates checklist; TypeScript limits IDs to string but does not verify command; actual migration is only true when lint/typecheck/test/build and Profiler evidence exist. Deleting memoization without running gates violates evidence-first migration; it means that the source of regression cannot be determined."
        }
      ]
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
          "value": " UI checklist only records selections, and the project gate is executed by a separate tool. React state cannot replace CI/terminal evidence."
        }
      ]
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
          "value": " can directly configure the Compiler; the existing SellerHub should be gradually rolled out according to the directory/feature, and opt-out and rollback should be retained. Even if the Compiler is stable, it does not mean that all legacy code does not need to be audited."
        }
      ]
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
          "value": " React upgrade, Action migration, and Compiler install are completed in the same batch; when you see lint warning, disable them in batches; delete memo first and then profile; only run build and not behavior tests."
        }
      ]
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
          "value": " first migrates the checkout single Action, then cart optimistic, and then considers ProductCard/OrderRow compiler candidates; each step has a rollback boundary."
        }
      ]
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
          "value": " provides performance evidence, and chapter 12 provides gates. This section turns them into migration protocols."
        }
      ]
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
          "value": " Prove the behavior first, and then change the mechanism; first act in a small scope, and then enable the Compiler independently."
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
      "id": "913-mapping-react-19-actions-and-compiler-decisions-to-sellerhub",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping React 19 Actions and Compiler Decisions to SellerHub"
        }
      ]
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
          "value": " SellerHub should not be \"used Actions/Compiler throughout the site\" but should be mapped by mutation, resource, document, server and optimization owner."
        }
      ]
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
          "value": " The new API can easily be regarded as the unified architecture answer. Checkout, cart, review, seller order, ProductCard are different from the failure mode of dashboard resource."
        }
      ]
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
          "value": " architecture map first defines the current Vite owner and future framework boundary to avoid forging the backend or Compiler in advance in the learning project."
        }
      ]
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
          "value": " scenario mapping, current owner, future boundary, interactive island, compiler candidate."
        }
      ]
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
          "value": " static map makes the scene and owner into auditable data. In a real project, each line will correspond to feature module, action state union, server validation, test case and performance evidence."
        }
      ]
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
          "value": " There are no new APIs in this section, the focus is on responsibility boundaries and runtime mechanisms."
        }
      ]
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
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map.tsx",
      "value": "const sellerHubBoundaries = [\n  {\n    scenario: 'Checkout submit',\n    currentOwner: 'Client Action with result and pending state',\n    futureBoundary: 'Framework Server Function after a separate migration',\n  },\n  {\n    scenario: 'Cart quantity',\n    currentOwner: 'Sequential Action queue plus optimistic quantity',\n    futureBoundary: 'Validated server mutation and reconciliation',\n  },\n  {\n    scenario: 'Product review',\n    currentOwner: 'Optimistic append with rollback',\n    futureBoundary: 'Server-confirmed review identifier and content',\n  },\n  {\n    scenario: 'Seller order status',\n    currentOwner: 'Typed Action result union',\n    futureBoundary: 'Authorized server-side mutation',\n  },\n  {\n    scenario: 'Product card',\n    currentOwner: 'Pure component and immutable inputs',\n    futureBoundary: 'Measured compiler candidate',\n  },\n  {\n    scenario: 'Dashboard resource',\n    currentOwner: 'Promise and Suspense boundary model',\n    futureBoundary: 'Framework-cached resource passed to use',\n  },\n]\n\nexport function SellerHubReact19BoundaryMap() {\n  return (\n    <section className=\"chapter14-panel\" aria-labelledby=\"sellerhub-map-title\">\n      <p className=\"chapter14-kicker\">9.13 SellerHub mapping</p>\n      <h2 id=\"sellerhub-map-title\">React 19 Actions and Compiler architecture map</h2>\n      <div className=\"chapter14-grid\">\n        {sellerHubBoundaries.map((boundary) => (\n          <article className=\"chapter14-card\" key={boundary.scenario}>\n            <h3>{boundary.scenario}</h3>\n            <p>{boundary.currentOwner}</p>\n            <p>{boundary.futureBoundary}</p>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}"
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
          "value": " uses scenario as the stable key for each row; the current owner only describes the current learning runtime; the future boundary makes it clear that server/cache/compiler work must be completed independently in the future."
        }
      ]
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
          "value": " module creates static array; component render map; React uses scenario key to retain card identity; browser only displays architecture evidence and does not perform mutations."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and architecture state changes:"
            }
          ]
        },
        {
          "type": "text",
          "value": " array and row object remain stable in module scope; there is no React state, Action queue or Promise; this shows that architecture mapping and runtime implementation are different deliverables."
        }
      ]
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
          "value": " learner selects a SellerHub scenario; map gives the current owner and future boundary; TypeScript/React currently only verifies/renders rows; the real Action or Compiler must have additional evidence in the corresponding feature. If all rows are marked as Server Action or compiler candidate, it violates the owner-specific design; in code review, it can be identified by \"whether there is a mutation, whether server auth is required, and whether there is a measured render cost.\""
        }
      ]
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
          "value": " API choice is determined by data owner, failure mode, runtime and evidence, not by \"This is a new feature of React 19\"."
        }
      ]
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
          "value": " checkout mutation requires Action result; ProductCard first requires pure render; dashboard resource requires cached Promise owner; they cannot share the same abstraction."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "useOptimistic"
        },
        {
          "type": "text",
          "value": " acts as server cache; treats Server Function as auth; treats Compiler candidate as automatic performance gain; let Action result state replace domain state model."
        }
      ]
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
          "value": " This section is the architecture contract of the final mini project, covering checkout, cart, review, seller order, ProductCard and dashboard."
        }
      ]
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
          "value": " It aggregates the props, state, forms, async, routing, performance, testing and server/client boundary of chapters 3–13 into chapter 14."
        }
      ]
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
          "value": " First select the owner for each SellerHub scenario, and then select Action, optimistic, resource or Compiler; do not infer the architecture from the API name."
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
            "value": "Layer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Signature / Meaning"
          }
        ],
        [
          {
            "type": "text",
            "value": "Critical Boundary"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "useTransition"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "[isPending, startTransition]"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending belongs to this transition owner."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "startTransition"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "startTransition(action)"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "await"
            },
            {
              "type": "text",
              "value": " currently needs to be marked again."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useActionState"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "[state, dispatchAction, isPending]"
            }
          ],
          [
            {
              "type": "text",
              "value": "dispatcher must be in Action scope."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<form action={fn}>"
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
              "type": "inlineCode",
              "value": "fn(formData)"
            }
          ],
          [
            {
              "type": "text",
              "value": "client function is not equal to Server Function."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useFormStatus"
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
              "type": "inlineCode",
              "value": "{pending, data, method, action}"
            }
          ],
          [
            {
              "type": "text",
              "value": "only reads the nearest parent form."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useOptimistic"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "[optimisticState, addOptimistic]"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer pure, setter in Action scope."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "use"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime / Suspense"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "use(contextOrCachedPromise)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Promise identity must be stable/cached."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "\"use server\""
            }
          ],
          [
            {
              "type": "text",
              "value": "Framework directive"
            }
          ],
          [
            {
              "type": "text",
              "value": "server function marker"
            }
          ],
          [
            {
              "type": "text",
              "value": "requires RSC framework transform."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ref as prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "React 19 / React DOM"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "ref?: Ref<T>"
            }
          ],
          [
            {
              "type": "text",
              "value": "is still imperative handle."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<title>"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "<meta>"
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
              "value": "document metadata output"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not client state."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "prerender"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "resume"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM static/server"
            }
          ],
          [
            {
              "type": "text",
              "value": "server/build entry APIs"
            }
          ],
          [
            {
              "type": "text",
              "value": "Normal Vite component is not called."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "\"use memo\""
            }
          ],
          [
            {
              "type": "text",
              "value": "React Compiler"
            }
          ],
          [
            {
              "type": "text",
              "value": "compilation opt-in directive"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not generate memoization when there is no Compiler."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "\"use no memo\""
            }
          ],
          [
            {
              "type": "text",
              "value": "React Compiler"
            }
          ],
          [
            {
              "type": "text",
              "value": "temporary opt-out directive"
            }
          ],
          [
            {
              "type": "text",
              "value": "is for isolation, not a permanent fix."
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
            "value": "Violated Rule"
          }
        ],
        [
          {
            "type": "text",
            "value": "Result"
          }
        ],
        [
          {
            "type": "text",
            "value": "Recognition / Correction"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Treat Action as a normal event handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "Action is transition mutation unit"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending/result/error owner Chaos"
            }
          ],
          [
            {
              "type": "text",
              "value": "Separate handler and Action function."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "inlineCode",
              "value": "useActionState"
            },
            {
              "type": "text",
              "value": " when "
            },
            {
              "type": "inlineCode",
              "value": "useReducer"
            }
          ],
          [
            {
              "type": "text",
              "value": "ordinary reducer must pure"
            }
          ],
          [
            {
              "type": "text",
              "value": "side effect may be replayed/repeated"
            }
          ],
          [
            {
              "type": "text",
              "value": "mutation puts Action, and pure transition leaves reducer."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Action scope external call dispatcher"
            }
          ],
          [
            {
              "type": "text",
              "value": "dispatcher requires transition"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending not updating or development error"
            }
          ],
          [
            {
              "type": "text",
              "value": "use form action or "
            },
            {
              "type": "inlineCode",
              "value": "startTransition"
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
              "type": "text",
              "value": " "
            },
            {
              "type": "inlineCode",
              "value": "isPending"
            },
            {
              "type": "text",
              "value": " When the global request state"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending belongs to hook/transition instance"
            }
          ],
          [
            {
              "type": "text",
              "value": "Irrelevant UI is disabled"
            }
          ],
          [
            {
              "type": "text",
              "value": "is the owner of the specific mutation."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useFormStatus"
            },
            {
              "type": "text",
              "value": " is not in the parent form"
            }
          ],
          [
            {
              "type": "text",
              "value": "Nearest parent form boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending always false"
            }
          ],
          [
            {
              "type": "text",
              "value": "Extract form child submit component."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "optimistic base permanently writes pending record"
            }
          ],
          [
            {
              "type": "text",
              "value": "optimistic is not source of truth"
            }
          ],
          [
            {
              "type": "text",
              "value": "failed unable to rollback"
            }
          ],
          [
            {
              "type": "text",
              "value": "confirmed base is separated from the pending projection."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "optimistic reducer has side effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "optimistic reducer must pure"
            }
          ],
          [
            {
              "type": "text",
              "value": "replay produces repeated mutation"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer returns only next projection."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "render and then "
            },
            {
              "type": "inlineCode",
              "value": "use"
            }
          ],
          [
            {
              "type": "text",
              "value": "cached Promise identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "repeated fallback/warning"
            }
          ],
          [
            {
              "type": "text",
              "value": "is provided by framework/cache stable Promise."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "try/catch package "
            },
            {
              "type": "inlineCode",
              "value": "use(promise)"
            }
          ],
          [
            {
              "type": "text",
              "value": "rejected Promise cross Error Boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Suspense exception was mishandled"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use Error Boundary."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Fake Server Function in Vite"
            }
          ],
          [
            {
              "type": "text",
              "value": "missing framework transform/transport"
            }
          ],
          [
            {
              "type": "text",
              "value": "is actually still executing"
            }
          ],
          [
            {
              "type": "text",
              "value": "is clearly marked as mechanism model."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "cannot be serialized Server Function parameter"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework serialization contract"
            }
          ],
          [
            {
              "type": "text",
              "value": "request failed to construct"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses plain serializable values/FormData."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "render "
            },
            {
              "type": "inlineCode",
              "value": "ref.current"
            }
          ],
          [
            {
              "type": "text",
              "value": "ref does not participate in render snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "stale/inconsistent output"
            }
          ],
          [
            {
              "type": "text",
              "value": "handler/effect."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Treat metadata as client state"
            }
          ],
          [
            {
              "type": "text",
              "value": "metadata is document output"
            }
          ],
          [
            {
              "type": "text",
              "value": "owner Chaos"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX outputs title/meta, and the business state is modeled separately."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thinks Compiler fixes mutation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Compiler only optimizes and analyzes correct code"
            }
          ],
          [
            {
              "type": "text",
              "value": "bailout or error runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "is preceded by purity/immutability."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "blind deletion manual memoization"
            }
          ],
          [
            {
              "type": "text",
              "value": "preserve existing intent"
            }
          ],
          [
            {
              "type": "text",
              "value": "effect/reference behavior change"
            }
          ],
          [
            {
              "type": "text",
              "value": "profile + tests."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "migrates"
            }
          ],
          [
            {
              "type": "text",
              "value": "migration must have evidence"
            }
          ],
          [
            {
              "type": "text",
              "value": "regression difficult to attribute"
            }
          ],
          [
            {
              "type": "text",
              "value": "lint/typecheck/test/build Execute all."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "confuses stable with experimental API"
            }
          ],
          [
            {
              "type": "text",
              "value": "version/channel boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Production assumption error"
            }
          ],
          [
            {
              "type": "text",
              "value": "is compared to the current official reference tag."
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
          "value": "SellerHub React 19 Actions Lab"
        },
        {
          "type": "text",
          "value": " organizes checkout Action state, sequential cart queue, form status, optimistic review rollback, Promise/Suspense boundary model, Server Function note, ref/metadata/static API map, Compiler candidate/bailout and Chapter 12 migration gates into one browser-only lab. It does not provide a backend, real Server Function or Compiler transform."
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
      "label": "Final mini project structure",
      "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/\n  sellerhub-action-types.ts\n  sellerhub-action-model.ts\n  sellerhub-action-workspace.tsx\n  sellerhub-compiler-boundary-map.tsx\n  sellerhub-react-19-actions-lab.tsx"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Document Responsibility:"
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
                  "value": "sellerhub-action-types.ts"
                },
                {
                  "type": "text",
                  "value": ": Action result union, cart mutation and optimistic review domain types."
                }
              ]
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
                  "value": "sellerhub-action-model.ts"
                },
                {
                  "type": "text",
                  "value": ": async Action model simulated in the browser; no real API."
                }
              ]
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
                  "value": "sellerhub-action-workspace.tsx"
                },
                {
                  "type": "text",
                  "value": ": Run "
                },
                {
                  "type": "inlineCode",
                  "value": "useActionState"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useFormStatus"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "useOptimistic"
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
                  "type": "inlineCode",
                  "value": "sellerhub-compiler-boundary-map.tsx"
                },
                {
                  "type": "text",
                  "value": ": Compiler candidates, bailout, resource/server boundary and migration order."
                }
              ]
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
                  "value": "sellerhub-react-19-actions-lab.tsx"
                },
                {
                  "type": "text",
                  "value": ": final mini project combination entrance."
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
      "id": "123-full-code",
      "children": [
        {
          "type": "text",
          "value": "12.3 Full code"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-types.ts",
      "value": "export type CheckoutActionState =\n  | {\n      status: 'idle'\n      message: string\n      sequence: number\n    }\n  | {\n      status: 'success'\n      message: string\n      sequence: number\n      email: string\n    }\n  | {\n      status: 'error'\n      message: string\n      sequence: number\n    }\n\nexport type CartLine = {\n  productId: string\n  productName: string\n  quantity: number\n}\n\nexport type CartMutation = {\n  productId: string\n  delta: number\n  mutationId: string\n}\n\nexport type CartActionState = {\n  lines: CartLine[]\n  completedMutationIds: string[]\n  message: string\n}\n\nexport type ProductReview = {\n  id: string\n  text: string\n  status: 'pending' | 'confirmed'\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "CheckoutActionState"
        },
        {
          "type": "text",
          "value": " uses discriminated union to make the idle/success/error branch have a recognizable shape; cart state saves confirmed lines and completed mutation IDs in the same action result; review status clearly distinguishes pending projection and confirmed record. TypeScript Checks these relationships at compile time, there is no automatic schema validation at runtime."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-model.ts",
      "value": "import type {\n  CartActionState,\n  CartMutation,\n  CheckoutActionState,\n  ProductReview,\n} from './sellerhub-action-types'\n\nexport const initialCheckoutState: CheckoutActionState = {\n  status: 'idle',\n  message: 'Checkout has not been submitted.',\n  sequence: 0,\n}\n\nexport const initialCartState: CartActionState = {\n  lines: [\n    {\n      productId: 'product-lamp',\n      productName: 'Desk Lamp',\n      quantity: 1,\n    },\n  ],\n  completedMutationIds: [],\n  message: 'No cart mutation has completed.',\n}\n\nexport const initialReviews: ProductReview[] = [\n  {\n    id: 'review-1',\n    text: 'Accurate description and fast dispatch.',\n    status: 'confirmed',\n  },\n]\n\nexport async function submitCheckoutAction(\n  previousState: CheckoutActionState,\n  formData: FormData,\n): Promise<CheckoutActionState> {\n  const email = readFormString(formData, 'email').trim()\n  const delivery = readFormString(formData, 'delivery')\n  await wait(650)\n\n  if (!email.includes('@')) {\n    return {\n      status: 'error',\n      message: 'Enter a valid checkout email.',\n      sequence: previousState.sequence + 1,\n    }\n  }\n\n  return {\n    status: 'success',\n    message: `Checkout accepted with ${delivery} delivery.`,\n    sequence: previousState.sequence + 1,\n    email,\n  }\n}\n\nexport async function updateCartAction(\n  previousState: CartActionState,\n  mutation: CartMutation,\n): Promise<CartActionState> {\n  await wait(mutation.delta > 0 ? 600 : 350)\n\n  const nextLines = previousState.lines.map((line) =>\n    line.productId === mutation.productId\n      ? { ...line, quantity: Math.max(1, line.quantity + mutation.delta) }\n      : line,\n  )\n\n  return {\n    lines: nextLines,\n    completedMutationIds: [\n      ...previousState.completedMutationIds,\n      mutation.mutationId,\n    ],\n    message: `${mutation.mutationId} reconciled with the Action result.`,\n  }\n}\n\nexport async function confirmReview(\n  reviewId: string,\n  text: string,\n): Promise<ProductReview | null> {\n  await wait(700)\n\n  if (!text || text.toLowerCase().includes('fail')) {\n    return null\n  }\n\n  return {\n    id: reviewId,\n    text,\n    status: 'confirmed',\n  }\n}\n\nfunction readFormString(formData: FormData, fieldName: string): string {\n  const value = formData.get(fieldName)\n  return typeof value === 'string' ? value : ''\n}\n\nfunction wait(milliseconds: number): Promise<void> {\n  return new Promise((resolve) => {\n    window.setTimeout(resolve, milliseconds)\n  })\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "submitCheckoutAction"
        },
        {
          "type": "text",
          "value": " is responsible for sequence; "
        },
        {
          "type": "inlineCode",
          "value": "updateCartAction"
        },
        {
          "type": "text",
          "value": " calculates next immutable lines from the previous cart provided by queue; "
        },
        {
          "type": "inlineCode",
          "value": "confirmReview"
        },
        {
          "type": "text",
          "value": " returns authoritative record or null. "
        },
        {
          "type": "inlineCode",
          "value": "wait"
        },
        {
          "type": "text",
          "value": " is just browser simulation and does not represent server request. The real SellerHub must then verify email, inventory, permissions and review content on the server."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-workspace.tsx",
      "value": "import {\n  startTransition,\n  useActionState,\n  useOptimistic,\n  useRef,\n  useState,\n} from 'react'\nimport { useFormStatus } from 'react-dom'\nimport {\n  confirmReview,\n  initialCartState,\n  initialCheckoutState,\n  initialReviews,\n  submitCheckoutAction,\n  updateCartAction,\n} from './sellerhub-action-model'\nimport type {\n  CartLine,\n  CartMutation,\n  ProductReview,\n} from './sellerhub-action-types'\n\nexport function SellerHubActionWorkspace() {\n  const [checkoutState, checkoutAction, isCheckoutPending] = useActionState(\n    submitCheckoutAction,\n    initialCheckoutState,\n  )\n  const [cartState, dispatchCartAction, isCartPending] = useActionState(\n    updateCartAction,\n    initialCartState,\n  )\n  const [optimisticCart, applyOptimisticCart] = useOptimistic(\n    cartState.lines,\n    applyCartMutation,\n  )\n  const [reviews, setReviews] = useState(initialReviews)\n  const [reviewMessage, setReviewMessage] = useState(\n    'Submit a review. Include fail to simulate rollback.',\n  )\n  const [optimisticReviews, addOptimisticReview] = useOptimistic(\n    reviews,\n    addPendingReview,\n  )\n  const nextMutationId = useRef(1)\n  const nextReviewId = useRef(2)\n\n  function queueCartMutation(delta: number): void {\n    const mutation: CartMutation = {\n      productId: 'product-lamp',\n      delta,\n      mutationId: `cart-${nextMutationId.current}`,\n    }\n    nextMutationId.current += 1\n\n    startTransition(() => {\n      applyOptimisticCart(mutation)\n      dispatchCartAction(mutation)\n    })\n  }\n\n  async function submitReview(formData: FormData): Promise<void> {\n    const value = formData.get('review')\n    const text = typeof value === 'string' ? value.trim() : ''\n    const reviewId = `review-${nextReviewId.current}`\n    nextReviewId.current += 1\n    addOptimisticReview({ id: reviewId, text })\n\n    const confirmedReview = await confirmReview(reviewId, text)\n\n    startTransition(() => {\n      if (confirmedReview) {\n        setReviews((currentReviews) => [...currentReviews, confirmedReview])\n        setReviewMessage('The Action result confirmed the optimistic review.')\n      } else {\n        setReviewMessage('The Action failed and the optimistic review rolled back.')\n      }\n    })\n  }\n\n  return (\n    <div className=\"chapter14-section-split\">\n      <article className=\"chapter14-card\">\n        <h3>Checkout Action</h3>\n        <form action={checkoutAction} className=\"chapter14-form\">\n          <label className=\"chapter14-field\">\n            Checkout email\n            <input defaultValue=\"buyer@example.com\" name=\"email\" type=\"email\" />\n          </label>\n          <label className=\"chapter14-field\">\n            Delivery\n            <select defaultValue=\"standard\" name=\"delivery\">\n              <option value=\"standard\">Standard</option>\n              <option value=\"express\">Express</option>\n            </select>\n          </label>\n          <CheckoutSubmitButton />\n        </form>\n        <p className={`chapter14-result chapter14-result-${checkoutState.status}`}>\n          {checkoutState.message}\n        </p>\n        <span className=\"chapter14-pill\">\n          Action sequence: {checkoutState.sequence}\n        </span>\n        <span className=\"chapter14-pill\">\n          Hook pending: {String(isCheckoutPending)}\n        </span>\n      </article>\n\n      <article className=\"chapter14-card\">\n        <h3>Queued optimistic cart</h3>\n        {optimisticCart.map((line) => (\n          <div className=\"chapter14-cart-line\" key={line.productId}>\n            <span>{line.productName}</span>\n            <strong>{line.quantity}</strong>\n          </div>\n        ))}\n        <div className=\"chapter14-action-row\">\n          <button\n            className=\"chapter14-button\"\n            onClick={() => queueCartMutation(-1)}\n            type=\"button\"\n          >\n            Decrease\n          </button>\n          <button\n            className=\"chapter14-button\"\n            onClick={() => queueCartMutation(1)}\n            type=\"button\"\n          >\n            Increase\n          </button>\n        </div>\n        <p className=\"chapter14-note\">\n          {isCartPending ? 'Cart Action queue is pending.' : cartState.message}\n        </p>\n        <small>{cartState.completedMutationIds.join(', ') || 'No completed mutations'}</small>\n      </article>\n\n      <article className=\"chapter14-card chapter14-card-wide\">\n        <h3>Optimistic product reviews</h3>\n        <form action={submitReview} className=\"chapter14-form\">\n          <label className=\"chapter14-field\">\n            Review\n            <input name=\"review\" placeholder=\"Write a review\" />\n          </label>\n          <button className=\"chapter14-button\" type=\"submit\">\n            Submit review\n          </button>\n        </form>\n        <ul className=\"chapter14-list\">\n          {optimisticReviews.map((review) => (\n            <li key={review.id}>\n              <strong>{review.text || 'Empty review'}</strong>\n              <span>{review.status}</span>\n            </li>\n          ))}\n        </ul>\n        <p className=\"chapter14-note\">{reviewMessage}</p>\n      </article>\n    </div>\n  )\n}\n\nfunction CheckoutSubmitButton() {\n  const status = useFormStatus()\n  const email = status.data?.get('email')\n\n  return (\n    <button className=\"chapter14-button\" disabled={status.pending} type=\"submit\">\n      {status.pending && typeof email === 'string'\n        ? `Submitting ${email}...`\n        : 'Submit checkout'}\n    </button>\n  )\n}\n\nfunction applyCartMutation(\n  currentLines: CartLine[],\n  mutation: CartMutation,\n): CartLine[] {\n  return currentLines.map((line) =>\n    line.productId === mutation.productId\n      ? { ...line, quantity: Math.max(1, line.quantity + mutation.delta) }\n      : line,\n  )\n}\n\nfunction addPendingReview(\n  currentReviews: ProductReview[],\n  review: Pick<ProductReview, 'id' | 'text'>,\n): ProductReview[] {\n  return [...currentReviews, { ...review, status: 'pending' }]\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "workspace, checkout dispatcher is automatically called by form Action; cart handler submits optimistic projection and queued Action in the same transition; review form Action first adds pending record, and then updates base or rollback based on authoritative result. Both optimistic reducers are pure, and the two ref counters only change in event/Action."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is executed, checkout result state, cart action queue and review base state are three independent owners. Fast cart clicks form a sequential payload; the UI reads the optimistic quantity immediately, and the confirmed cart lines are read after the Action returns. review enter "
        },
        {
          "type": "inlineCode",
          "value": "fail"
        },
        {
          "type": "text",
          "value": " when "
        },
        {
          "type": "inlineCode",
          "value": "confirmReview"
        },
        {
          "type": "text",
          "value": " returns null, base reviews remain unchanged, and the temporary review disappears after Action settled."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-compiler-boundary-map.tsx",
      "value": "const compilerBoundaryRows = [\n  {\n    topic: 'ProductCard',\n    currentEvidence: 'Pure render and immutable product props',\n    compilerMeaning: 'Candidate only; no compiler transform runs in this project',\n  },\n  {\n    topic: 'OrderRow',\n    currentEvidence: 'Keep measured manual memoization until migration tests pass',\n    compilerMeaning: 'preserve-manual-memoization protects existing intent',\n  },\n  {\n    topic: 'Dashboard resource',\n    currentEvidence: 'Promise identity and Suspense boundary are modeled',\n    compilerMeaning: 'Compiler does not create a cached data source',\n  },\n  {\n    topic: 'Server Function',\n    currentEvidence: 'Framework boundary is documented, not executed',\n    compilerMeaning: 'Compiler does not create server transport',\n  },\n]\n\nconst compilerBailoutRows = [\n  'Mutation of props or state',\n  'Impure render values',\n  'Dynamic component definitions',\n  'Unsupported syntax',\n  'Broken manual memoization dependencies',\n]\n\nexport function SellerHubCompilerBoundaryMap() {\n  return (\n    <div className=\"chapter14-section-split\">\n      <article className=\"chapter14-card\">\n        <h3>Compiler candidate map</h3>\n        <ul className=\"chapter14-list\">\n          {compilerBoundaryRows.map((row) => (\n            <li key={row.topic}>\n              <strong>{row.topic}</strong>\n              <span>{row.currentEvidence}</span>\n              <span>{row.compilerMeaning}</span>\n            </li>\n          ))}\n        </ul>\n      </article>\n      <article className=\"chapter14-card\">\n        <h3>Bailout and lint signals</h3>\n        <ul className=\"chapter14-list\">\n          {compilerBailoutRows.map((bailout) => (\n            <li key={bailout}>{bailout}</li>\n          ))}\n        </ul>\n        <p className=\"chapter14-note\">\n          Directives such as \"use memo\" and \"use no memo\" affect compiler analysis\n          only when a compiler is configured.\n        </p>\n      </article>\n      <article className=\"chapter14-card chapter14-card-wide\">\n        <h3>Migration order</h3>\n        <ol className=\"chapter14-compact-list\">\n          <li>Pass Chapter 12 lint, typecheck, test, and build gates.</li>\n          <li>Measure Chapter 11 render evidence before changing memoization.</li>\n          <li>Adopt one Action boundary and verify pending, error, and rollback.</li>\n          <li>Configure React Compiler only in a separate reviewed migration.</li>\n        </ol>\n      </article>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This document writes four common misunderstandings as architecture evidence: Compiler does not create cached data source, does not create server transport, and does not automatically make the existing manual memo lose its value. The current component is just a static description; a real Compiler candidate must have build config, compiled output, or DevTools evidence."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab.tsx",
      "value": "import { SellerHubActionWorkspace } from './sellerhub-action-workspace'\nimport { SellerHubCompilerBoundaryMap } from './sellerhub-compiler-boundary-map'\n\nexport function SellerHubReact19ActionsLab() {\n  return (\n    <section\n      className=\"chapter14-panel chapter14-final-project\"\n      aria-labelledby=\"sellerhub-react19-lab-title\"\n    >\n      <p className=\"chapter14-kicker\">Final mini project</p>\n      <h2 id=\"sellerhub-react19-lab-title\">SellerHub React 19 Actions Lab</h2>\n      <p>\n        This browser-only lab integrates client Actions, Action state, form status,\n        optimistic reconciliation, framework boundary notes, and compiler migration\n        evidence. It does not provide a backend, Server Function runtime, or Compiler\n        transform.\n      </p>\n      <SellerHubActionWorkspace />\n      <SellerHubCompilerBoundaryMap />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "combination entry does not have a new mutation state, but only combines workspace and boundary map. Leave state owner at "
        },
        {
          "type": "inlineCode",
          "value": "SellerHubActionWorkspace"
        },
        {
          "type": "text",
          "value": ", let the architecture panel maintain pure static output."
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
                  "value": "/react/chapter-14"
                },
                {
                  "type": "text",
                  "value": " lazy-load "
                },
                {
                  "type": "inlineCode",
                  "value": "Chapter14PracticeRoot"
                },
                {
                  "type": "text",
                  "value": ", the final mini project then loads five real files."
                }
              ]
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
                  "value": "checkout form calls "
                },
                {
                  "type": "inlineCode",
                  "value": "checkoutAction(FormData)"
                },
                {
                  "type": "text",
                  "value": "; "
                },
                {
                  "type": "inlineCode",
                  "value": "useActionState"
                },
                {
                  "type": "text",
                  "value": " saves returned union and pending."
                }
              ]
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
                  "value": "cart button creates mutation ID, simultaneously projects optimistic quantity and dispatch queued Action within the transition."
                }
              ]
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
                  "value": "cart Action generates confirmed lines, optimistic view and base reconciliation in order of previous results."
                }
              ]
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
                  "value": "review form first adds pending review; when the simulation result is null, the base remains unchanged and rollback is performed."
                }
              ]
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
                  "value": "Compiler panel only displays lint, candidate and migration evidence, and does not claim to execute build transform."
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
                  "value": "JavaScript runtime creates FormData values, payload objects, Promises, arrays, and closures."
                }
              ]
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
                  "value": "React runtime saves Action result cell, queue, pending flag, optimistic layer, state snapshot and refs."
                }
              ]
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
                  "value": "React DOM management form Action/status and metadata output."
                }
              ]
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
                  "value": "Browser implements timers, form controls, DOM focus and event dispatch."
                }
              ]
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
                  "value": "TypeScript Check Action state union, payload, ref and FormData narrowing, runtime type will be erased."
                }
              ]
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
                  "value": "ESLint runs Rules of React / compiler-related lints."
                }
              ]
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
                  "value": "Vite is responsible for TSX module graph and build; there is no React Compiler plugin in this chapter."
                }
              ]
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
                  "value": "Server Functions, cached Suspense data source and static rendering entrypoints still belong to the future framework/server boundary."
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
          "value": ". Manual smoke test should cover: checkout success/error, fast cart queue, review success/"
        },
        {
          "type": "inlineCode",
          "value": "fail"
        },
        {
          "type": "text",
          "value": " rollback, form pending button, conditional context read, ref focus, and the page clearly shows \"Compiler not configured\" and \"Server Function not running\"."
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
        },
        {
          "type": "text",
          "value": " Actions organization mutation lifecycle, "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " reads context/cached resource, and Compiler optimizes render that conforms to React rules at build time; the owners of the three are different."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "common-api-table",
      "children": [
        {
          "type": "text",
          "value": "Common API Table"
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
            "value": "API"
          }
        ],
        [
          {
            "type": "text",
            "value": "Enter"
          }
        ],
        [
          {
            "type": "text",
            "value": "output"
          }
        ],
        [
          {
            "type": "text",
            "value": "Key restrictions"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "useActionState"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer Action + initial state"
            }
          ],
          [
            {
              "type": "text",
              "value": "result + dispatcher + pending"
            }
          ],
          [
            {
              "type": "text",
              "value": "dispatcher in Action scope."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useFormStatus"
            }
          ],
          [
            {
              "type": "text",
              "value": "None"
            }
          ],
          [
            {
              "type": "text",
              "value": "parent form status"
            }
          ],
          [
            {
              "type": "text",
              "value": "must be in form child."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useOptimistic"
            }
          ],
          [
            {
              "type": "text",
              "value": "base + pure reducer"
            }
          ],
          [
            {
              "type": "text",
              "value": "projection + optimistic dispatcher"
            }
          ],
          [
            {
              "type": "text",
              "value": "requires rollback/reconciliation."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "use"
            }
          ],
          [
            {
              "type": "text",
              "value": "context / cached Promise"
            }
          ],
          [
            {
              "type": "text",
              "value": "context/resolved value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Promise stable; cannot try/catch."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "startTransition"
            }
          ],
          [
            {
              "type": "text",
              "value": "Action function"
            }
          ],
          [
            {
              "type": "text",
              "value": "None"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "await"
            },
            {
              "type": "text",
              "value": " After update, the current flag needs to be marked again."
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "related-concepts-compared",
      "children": [
        {
          "type": "text",
          "value": "Related Concepts Compared"
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
            "value": "Core difference"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "event handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "Action"
            }
          ],
          [
            {
              "type": "text",
              "value": "handler receives intent; Action is in transition and carries mutation."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useReducer"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "useActionState"
            }
          ],
          [
            {
              "type": "text",
              "value": "pure local transition vs effectful Action result."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "isPending"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "useFormStatus().pending"
            }
          ],
          [
            {
              "type": "text",
              "value": "Action hook owner vs nearest form owner."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "optimistic state"
            }
          ],
          [
            {
              "type": "text",
              "value": "server state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Revocable projection vs authoritative data."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useContext"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "use(context)"
            }
          ],
          [
            {
              "type": "text",
              "value": "ordinary Hook order vs conditional "
            },
            {
              "type": "inlineCode",
              "value": "use"
            },
            {
              "type": "text",
              "value": " exception."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "manual memo"
            }
          ],
          [
            {
              "type": "text",
              "value": "Compiler memo"
            }
          ],
          [
            {
              "type": "text",
              "value": "explicit runtime Hook/cache vs build-generated optimization."
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
      "label": "Template: typed Action result",
      "value": "type ActionState =\n  | { status: 'idle'; message: string }\n  | { status: 'success'; message: string }\n  | { status: 'error'; message: string }\n\nasync function submitAction(\n  previousState: ActionState,\n  formData: FormData,\n): Promise<ActionState> {\n  const value = formData.get('value')\n\n  if (typeof value !== 'string' || !value.trim()) {\n    return { status: 'error', message: 'Value is required.' }\n  }\n\n  return {\n    status: 'success',\n    message: `${previousState.status}: ${value.trim()}`,\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This template only displays Action result shape and FormData narrowing. To run it, you also need to adjust "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " and hand dispatcher to form action."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "sellerhub-quick-mapping",
      "children": [
        {
          "type": "text",
          "value": "SellerHub Quick mapping"
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
            "value": "React 19 Mechanism"
          }
        ],
        [
          {
            "type": "text",
            "value": "Non-owner"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Checkout submit"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "useActionState"
            },
            {
              "type": "text",
              "value": " + "
            },
            {
              "type": "inlineCode",
              "value": "useFormStatus"
            }
          ],
          [
            {
              "type": "text",
              "value": "Compiler is not responsible for validation."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Cart quantity"
            }
          ],
          [
            {
              "type": "text",
              "value": "Action queue + "
            },
            {
              "type": "inlineCode",
              "value": "useOptimistic"
            }
          ],
          [
            {
              "type": "text",
              "value": "optimistic state is not cache."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Product review"
            }
          ],
          [
            {
              "type": "text",
              "value": "optimistic append + rollback"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript does not verify the server response."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Seller order"
            }
          ],
          [
            {
              "type": "text",
              "value": "typed Action result"
            }
          ],
          [
            {
              "type": "text",
              "value": "client Action does not provide authorization."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ProductCard"
            }
          ],
          [
            {
              "type": "text",
              "value": "pure compiler candidate"
            }
          ],
          [
            {
              "type": "text",
              "value": "Compiler does not repair unstable key."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Dashboard"
            }
          ],
          [
            {
              "type": "text",
              "value": "cached Promise + Suspense model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "use"
            },
            {
              "type": "text",
              "value": " does not create cache."
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
                  "value": "docs/react/chapter-14-react-19-actions-compiler/react-chapter-14-learning-guide.md"
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
      "id": "the-core-mechanism-real-file-created-in-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "The core mechanism real file created in this chapter"
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/01-action-boundary/action-transition-result.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/02-use-action-state-queue/sequential-action-queue.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/03-action-state-vs-reducer/action-reducer-boundary.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/04-form-action-progressive-model/form-action-progressive-boundary.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/05-use-form-status-submit-button/form-status-submit-button.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/06-use-optimistic-rollback/optimistic-review-reconciliation.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/07-use-api-suspense-promise/use-api-resource-boundary.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/08-server-functions-boundary/server-function-boundary-map.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/09-ref-metadata-static-apis/react-19-platform-boundaries.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/10-react-compiler-goal/compiler-optimization-model.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/11-compiler-rules-lints/compiler-rule-evidence.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/12-migration-strategy/react-19-migration-gates.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map.tsx"
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-types.ts"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-model.ts"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-workspace.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-compiler-boundary-map.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab.tsx"
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice-root.tsx"
                }
              ]
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
                  "value": "src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice.css"
                }
              ]
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
                  "value": "Snippet: dispatcher outside Action scope"
                }
              ]
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
                  "value": "Snippet: useFormStatus outside parent form"
                }
              ]
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
                  "value": "Snippet: Promise created during render"
                }
              ]
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
                  "value": "Snippet: fake Server Function in Vite"
                }
              ]
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
                  "value": "Snippet: compiler cannot repair mutation"
                }
              ]
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
                  "value": "Template: typed Action result"
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
          "value": "is compressed into six lines:"
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
                  "value": "owner a React runtime, React DOM, framework, browser, TypeScript or Compiler."
                }
              ]
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
                  "value": "trigger is event, form submit, dispatcher, Promise settle or build analysis."
                }
              ]
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
                  "value": "React saves."
                }
              ]
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
                  "value": "TypeScript What to check and what the runtime still needs to verify."
                }
              ]
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
                  "value": "error?"
                }
              ]
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
                  "value": "SellerHub uses this mechanism."
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
          "value": "Don't just copy the API signature; you must draw "
        },
        {
          "type": "inlineCode",
          "value": "payload -> Action queue -> result -> commit"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "source -> compiler analysis -> generated optimization/bailout"
        },
        {
          "type": "text",
          "value": "."
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
                  "value": "Action not the new name of the event handler?"
                }
              ]
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
                  "value": "useActionState"
                },
                {
                  "type": "text",
                  "value": " 's "
                },
                {
                  "type": "inlineCode",
                  "value": "previousState"
                },
                {
                  "type": "text",
                  "value": " come from? Multiple dispatch why sequential?"
                }
              ]
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
                  "value": "useReducer"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "useActionState"
                },
                {
                  "type": "text",
                  "value": " Why are there different rules for side effects?"
                }
              ]
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
                  "value": "URL form action, "
                },
                {
                  "type": "inlineCode",
                  "value": "onSubmit"
                },
                {
                  "type": "text",
                  "value": " and function form action?"
                }
              ]
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
                  "value": "useFormStatus"
                },
                {
                  "type": "text",
                  "value": " have to be called in parent form child component?"
                }
              ]
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
                  "value": "optimistic state rely on when it fails?"
                }
              ]
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
                  "value": "use"
                },
                {
                  "type": "text",
                  "value": " be called conditionally? Why do Promises have to be cached?"
                }
              ]
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
                  "value": "Server Function be forged by directive in ordinary Vite module?"
                }
              ]
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
                  "value": "ref as prop, metadata and static APIs belong to which layer respectively?"
                }
              ]
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
                  "value": "React Compiler automatically enabled with React 19?"
                }
              ]
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
                  "value": "\"use memo\""
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "\"use no memo\""
                },
                {
                  "type": "text",
                  "value": " do without Compiler?"
                }
              ]
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
                  "value": "Why can't Compiler fix mutation, impure render, bad state owner or unstable key?"
                }
              ]
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
                  "value": "Why must lint/typecheck/test/build and Profiler evidence be retained before migration?"
                }
              ]
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
                  "value": "SellerHub What are the respective owners of checkout, cart, review, order, ProductCard and dashboard?"
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
          "value": "React 19 The main line of mutation is: user intent enters Action, and Action is processed in transition payload/FormData, "
        },
        {
          "type": "inlineCode",
          "value": "useActionState"
        },
        {
          "type": "text",
          "value": " concatenates queue with previous result, "
        },
        {
          "type": "inlineCode",
          "value": "useFormStatus"
        },
        {
          "type": "text",
          "value": " reads the latest form, "
        },
        {
          "type": "inlineCode",
          "value": "useOptimistic"
        },
        {
          "type": "text",
          "value": " projects a revocable UI during the pending period, and the final authoritative result determines reconciliation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "resource The main line is: "
        },
        {
          "type": "inlineCode",
          "value": "use(context)"
        },
        {
          "type": "text",
          "value": " reads tree value; "
        },
        {
          "type": "inlineCode",
          "value": "use(cachedPromise)"
        },
        {
          "type": "text",
          "value": " reads the stable resource and hands it to Suspense when it is pending, and hands it to Error Boundary when it is rejected. The cache is provided by framework/data source."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Compiler is: source code accepts purity, immutability, refs, static structure and syntax analysis at build time; it generates automatic memoization when it meets the rules, and bailout when it does not. It does not change the React render mental model, nor does it create server, cache, authorization, or correct architecture."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "It is recommended to read in the following order:"
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
                  "href": "https://react.dev/blog/2024/12/05/react-19",
                  "children": [
                    {
                      "type": "text",
                      "value": "React v19"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": First create a panorama of Actions, ref as prop, metadata, styles/scripts and static APIs."
                }
              ]
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
                  "href": "https://react.dev/reference/react/useActionState",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "useActionState"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on signature, previous state, queue, errors, reset and Server Function integration."
                }
              ]
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
                  "href": "https://react.dev/reference/react-dom/components/form",
                  "children": [
                    {
                      "type": "text",
                      "value": "React DOM "
                    },
                    {
                      "type": "inlineCode",
                      "value": "<form>"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Compare "
                },
                {
                  "type": "inlineCode",
                  "value": "onSubmit"
                },
                {
                  "type": "text",
                  "value": ", URL action, function action, FormData and progressive enhancement."
                }
              ]
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
                  "href": "https://react.dev/reference/react-dom/hooks/useFormStatus",
                  "children": [
                    {
                      "type": "text",
                      "value": "React DOM "
                    },
                    {
                      "type": "inlineCode",
                      "value": "useFormStatus"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on nearest parent form caveat."
                }
              ]
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
                  "href": "https://react.dev/reference/react/useOptimistic",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "useOptimistic"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on pure reducer, Action scope, delete recovery and stale value troubleshooting."
                }
              ]
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
                  "href": "https://react.dev/reference/react/use",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "use"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on conditional call, cached Promise, Suspense, Error Boundary and try/catch restriction."
                }
              ]
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
                  "href": "https://react.dev/reference/react/startTransition",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "startTransition"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on async Action and "
                },
                {
                  "type": "inlineCode",
                  "value": "await"
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
                  "type": "link",
                  "href": "https://react.dev/reference/rsc/server-functions",
                  "children": [
                    {
                      "type": "text",
                      "value": "React Server Functions"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/rsc/use-server",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "\"use server\""
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Distinguish between stable React feature and framework implementation."
                }
              ]
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
                  "href": "https://react.dev/reference/react-dom/components",
                  "children": [
                    {
                      "type": "text",
                      "value": "React DOM components"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react-dom/components/meta",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "<meta>"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react-dom/static",
                  "children": [
                    {
                      "type": "text",
                      "value": "Static React DOM APIs"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react-dom/server",
                  "children": [
                    {
                      "type": "text",
                      "value": "Server React DOM APIs"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Understand document/static/server output."
                }
              ]
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
                  "href": "https://react.dev/learn/react-compiler",
                  "children": [
                    {
                      "type": "text",
                      "value": "React Compiler"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/react-compiler/introduction",
                  "children": [
                    {
                      "type": "text",
                      "value": "Introduction"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/react-compiler/incremental-adoption",
                  "children": [
                    {
                      "type": "text",
                      "value": "Incremental Adoption"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Understand automatic memoization and rollout."
                }
              ]
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
                  "href": "https://react.dev/reference/react-compiler/directives",
                  "children": [
                    {
                      "type": "text",
                      "value": "Compiler Directives"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react-compiler/directives/use-memo",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "\"use memo\""
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react-compiler/directives/use-no-memo",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "\"use no memo\""
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Understand the annotation/opt-out boundary."
                }
              ]
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
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "eslint-plugin-react-hooks"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks/lints/purity",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "purity"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "immutability"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks/lints/refs",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "refs"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "static-components"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "unsupported-syntax"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "preserve-manual-memoization"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Treat lint as migration evidence."
                }
              ]
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
                  "href": "https://react.dev/blog/2025/10/07/react-compiler-1",
                  "children": [
                    {
                      "type": "text",
                      "value": "React Compiler v1.0"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirmed that the Compiler is stable, but the build tool still needs to be explicitly integrated."
                }
              ]
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
                  "href": "https://react.dev/learn/typescript",
                  "children": [
                    {
                      "type": "text",
                      "value": "Using TypeScript with React"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/docs/handbook/jsx.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript JSX"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript narrowing"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Understand TSX, union and runtime erasure."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/Events/submit",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN submit event"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN FormData event"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN Promise"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Complete browser and JavaScript platform behavior."
                }
              ]
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
                  "value": "Local auxiliary information "
                },
                {
                  "type": "inlineCode",
                  "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
                },
                {
                  "type": "text",
                  "value": ", pages 158–159, introduce function form action, but it does not cover most APIs in this chapter and cannot replace official documents."
                }
              ]
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
                  "value": "local "
                },
                {
                  "type": "inlineCode",
                  "value": "references/books/react/full-stack-react-projects.pdf"
                },
                {
                  "type": "text",
                  "value": " is the old React/full-stack project information. There is no current React 19 Actions / Compiler tutorial and should not be used as the API basis for this chapter."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter14Content() {
  return <DocumentRenderer document={chapterDocument} />
}
