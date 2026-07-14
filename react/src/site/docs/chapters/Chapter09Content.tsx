import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-09",
  "slug": "chapter-09-async-data",
  "title": "React Chapter 9: Async Data, Fetch Lifecycles, and UI State",
  "sourcePath": "docs/react/chapter-09-async-data/react-chapter-09-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-9-async-data-fetch-lifecycles-and-ui-state",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 9: Async Data, Fetch Lifecycles, and UI State"
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
              "value": "Entrance to practice in this chapter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/chapter-09-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real file"
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
              "value": "src/learning/react/chapter-09-async-data/chapter-09-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real file"
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
              "value": "Async source boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/01-async-data-boundary/async-data-source-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Lifecycle union"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/02-async-state-union/async-lifecycle-union.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "HTTP / network / JSON boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/03-http-error-boundary/http-response-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Explicit event request"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/04-event-driven-fetch/event-driven-product-search.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Criteria-driven Effect"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/05-effect-driven-fetch/effect-driven-product-query.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Abort obsolete work"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/06-abort-obsolete-result/abort-obsolete-request.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Race protection"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/07-race-condition/race-condition-protection.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Runtime response guard"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/08-runtime-type-guard/unknown-response-guard.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Async reducer"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/09-async-reducer/async-lifecycle-reducer.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Derived fetched data"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/10-derived-fetched-data/derived-order-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Custom async hook"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/11-custom-async-hook/custom-async-resource.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Context async delivery"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/12-context-async-delivery/context-async-delivery.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice"
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
              "value": "Seller Orders Async Workspace"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/"
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
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "study guide file:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-09-async-data/react-chapter-09-learning-guide.md"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "source code root directory:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-09-async-data/"
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
          "value": "D:\\vite_ts"
        },
        {
          "type": "text",
          "value": " project, it is at the same level as chapters 7 and 8. "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " only mounts "
        },
        {
          "type": "inlineCode",
          "value": "Chapter09PracticeRoot"
        },
        {
          "type": "text",
          "value": ", does not carry request, parser, reducer or Context logic."
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
          "value": "Async data comes from outside the React tree and has delays, failures, empty results, out-of-order arrival, and untrusted shapes. React does not initiate HTTP, parse JSON, determine 404, or verify the response; it only saves the state you give it and selects the UI branch based on the current render snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter establishes a complete evidence chain: user operation or committed criteria triggers request; browser/JavaScript creates Promise, Response, AbortSignal and parsed value; runtime guard puts "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " is converted to domain data; React owner saves the lifecycle transition as state; the next render will enter the pending, success, empty or error UI."
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
                  "value": "Chapter 4: event handler, state snapshot, batching and immutable update."
                }
              ]
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
                  "value": "Chapter 5: loading/error/empty/success conditional rendering and stable list key."
                }
              ]
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
                  "value": "Chapter 7: Effect, dependency, cleanup, AbortController, ignore and stale closure."
                }
              ]
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
                  "value": "8: minimal state, reducer, Context, custom hook and state owner."
                }
              ]
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
                  "value": "JavaScript: Promise, "
                },
                {
                  "type": "inlineCode",
                  "value": "async"
                },
                {
                  "type": "text",
                  "value": "/"
                },
                {
                  "type": "inlineCode",
                  "value": "await"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "try"
                },
                {
                  "type": "text",
                  "value": "/"
                },
                {
                  "type": "inlineCode",
                  "value": "catch"
                },
                {
                  "type": "text",
                  "value": ", array methods."
                }
              ]
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
                  "value": "TypeScript: literal union, "
                },
                {
                  "type": "inlineCode",
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": ", narrowing, type predicate and "
                },
                {
                  "type": "inlineCode",
                  "value": "never"
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
                  "value": "distinguishes between local client state and external async resource state."
                }
              ]
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
                  "value": "uses discriminated union to express idle/pending/success/empty/error."
                }
              ]
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
                  "value": "distinguishes rejected fetch, HTTP non-2xx, JSON parse and invalid runtime shape."
                }
              ]
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
                  "value": "determines whether the request should be triggered by event handler or committed criteria Effect."
                }
              ]
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
                  "value": "Use AbortController or ignore flag to prevent obsolete result from being written to state."
                }
              ]
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
                  "value": "explains why request race causes old results to overwrite new criteria."
                }
              ]
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
                  "value": "uses response body as "
                },
                {
                  "type": "inlineCode",
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": ", enter domain state after runtime guard."
                }
              ]
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
                  "value": "centralizes async lifecycle transitions with pure reducer."
                }
              ]
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
                  "value": "derives visible count/total in render without copying the fetched data."
                }
              ]
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
                  "value": "extracts the custom async hook and explains that each call has an independent state by default."
                }
              ]
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
                  "value": "uses Context to deliver async resources while retaining a clear request owner."
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
                  "value": "First distinguish between external resource and local UI state."
                }
              ]
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
                  "value": "Then model lifecycle as a mutually exclusive union."
                }
              ]
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
                  "value": "disassembles network, HTTP, body parse and runtime validation."
                }
              ]
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
                  "value": "Compare event-driven and criteria-driven requests."
                }
              ]
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
                  "value": "Learn abort, ignore and race protection."
                }
              ]
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
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": " guard establishes a trusted domain boundary."
                }
              ]
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
                  "value": "Use reducer to centralize transition and derive visible data in render."
                }
              ]
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
                  "value": "Finally extract the custom hook, define the Context scope, and assemble the final project."
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
              "value": "async data"
            }
          ],
          [
            {
              "type": "text",
              "value": "Data"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture / external system"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "request criteria"
            }
          ],
          [
            {
              "type": "text",
              "value": "determines the committed input of the requested resource, such as category, productId, status"
            }
          ],
          [
            {
              "type": "text",
              "value": "React state / architecture"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Promise"
            }
          ],
          [
            {
              "type": "text",
              "value": "represents JavaScript object"
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
              "value": "Response"
            }
          ],
          [
            {
              "type": "text",
              "value": "Fetch API browser object"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / HTTP"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Response.ok"
            }
          ],
          [
            {
              "type": "text",
              "value": "It is true when status is 200–299"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / HTTP"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "obsolete result"
            }
          ],
          [
            {
              "type": "text",
              "value": "Old request result that no longer matches current criteria"
            }
          ],
          [
            {
              "type": "text",
              "value": "async architecture"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "race condition"
            }
          ],
          [
            {
              "type": "text",
              "value": "Competition caused by different completion order and start order of multiple requests"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / external system"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "runtime guard"
            }
          ],
          [
            {
              "type": "text",
              "value": "checks "
            },
            {
              "type": "inlineCode",
              "value": "unknown"
            },
            {
              "type": "text",
              "value": " shape and narrowing function"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / TypeScript"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "stale data"
            }
          ],
          [
            {
              "type": "text",
              "value": "The last trusted data retained when making a new request pending/error"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI state architecture"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "async state union"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use discriminant to express mutually exclusive lifecycle branches"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript / React state"
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
      "label": "Async data mental model",
      "value": "trigger: user event OR committed criteria\n  -> JavaScript creates request Promise and closures\n  -> browser performs fetch-like work and may return Response or rejection\n  -> HTTP status must be checked separately from network rejection\n  -> body parsing returns an untrusted runtime value\n  -> guard converts unknown into trusted domain data\n  -> React owner queues lifecycle state transition\n  -> next render selects pending, success, empty, or error UI\n  -> cleanup aborts work or ignores obsolete completion"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
                  "value": " Promise state, closures, microtasks, objects, arrays, errors and "
                },
                {
                  "type": "inlineCode",
                  "value": "async"
                },
                {
                  "type": "text",
                  "value": "/"
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
                  "value": " Hook cell, update queue, render snapshot, Effect setup/cleanup, reducer, Context consumer."
                }
              ]
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
                      "value": "Browser platform: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "fetch"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "Response"
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
                  "value": ", timer and DOM events."
                }
              ]
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
                      "value": "HTTP protocol: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " status code, headers, body and server response semantics."
                }
              ]
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
                  "value": " union, "
                },
                {
                  "type": "inlineCode",
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": ", type predicate, action/context shape; erase after emit."
                }
              ]
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
                  "value": " ESLint Hook rules, "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": ", Vite TSX transform/build."
                }
              ]
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
                  "value": " request owner, criteria lifetime, stale data policy, validation boundary and cache scope."
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
          "value": "adopts \"one async failure mode and one directory\". The first 12 directories each prove a mechanism; the final project is only a combination and does not replace segmented teaching."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Chapter 09 real file structure",
      "value": "src/learning/react/chapter-09-async-data/\n  chapter-09-practice-root.tsx\n  chapter-09-practice.css\n  01-async-data-boundary/async-data-source-boundary.tsx\n  02-async-state-union/async-lifecycle-union.tsx\n  03-http-error-boundary/http-response-boundary.tsx\n  04-event-driven-fetch/event-driven-product-search.tsx\n  05-effect-driven-fetch/effect-driven-product-query.tsx\n  06-abort-obsolete-result/abort-obsolete-request.tsx\n  07-race-condition/race-condition-protection.tsx\n  08-runtime-type-guard/unknown-response-guard.tsx\n  09-async-reducer/async-lifecycle-reducer.tsx\n  10-derived-fetched-data/derived-order-summary.tsx\n  11-custom-async-hook/custom-async-resource.tsx\n  12-context-async-delivery/context-async-delivery.tsx\n  seller-orders-async-workspace/\n    seller-order-types.ts\n    seller-order-response-guard.ts\n    seller-order-request.ts\n    seller-orders-reducer.ts\n    use-seller-orders-resource.ts\n    seller-orders-context.ts\n    seller-orders-provider.tsx\n    seller-orders-toolbar.tsx\n    seller-orders-list.tsx\n    seller-orders-summary.tsx\n    seller-orders-async-workspace.tsx\n    seller-orders-async-workspace.css"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "concept error comparison only uses "
        },
        {
          "type": "inlineCode",
          "value": "Snippet:"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "Template:"
        },
        {
          "type": "text",
          "value": " does not need to be created and will not enter the final real file list."
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
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " has mounted "
        },
        {
          "type": "inlineCode",
          "value": "Chapter09PracticeRoot"
        },
        {
          "type": "text",
          "value": ". Quickly switch criteria in the browser, trigger empty/error, repeat retry, and observe current criteria, stale data and lifecycle branch."
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
      "id": "91-the-boundary-between-async-data-and-local-state",
      "children": [
        {
          "type": "text",
          "value": "9.1 The Boundary Between Async Data and Local State"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "localNote"
        },
        {
          "type": "text",
          "value": " can be edited immediately in the current component, while warehouse stock must wait for results outside the tree. If both are understood as \"ordinary state\", the pending, failure and stale lifetime of stock will be ignored."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React state is the container of UI snapshot, not the data source itself. The source of Local note is browser input event; the source of stock is async Promise. Component must additionally store \"what stage the request is in\"."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "external source, local state, resource lifecycle, Promise settlement. There are no new APIs in this section, the focus is on the async data lifecycle and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JavaScript Create Promise and async handler; React save "
        },
        {
          "type": "inlineCode",
          "value": "localNote"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "stockState"
        },
        {
          "type": "text",
          "value": " Hook cells; browser timer simulates latency; real HTTP does not exist in this exercise; TypeScript checks union/number/error narrowing; Vite converts TSX; architecture determines stock using lifecycle state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "When a note is entered, the event handler synchronizes a string update in the queue. When you click Load, the handler first queues the pending object and then "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": " Promise; function paused but component did not. After the Promise is fulfilled, the continuation then queues the success object."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "async function"
        },
        {
          "type": "text",
          "value": " always returns Promise; "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": " only pauses the async function continuation. It does not block the browser, nor does it allow React to automatically display loading."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "Promise<number>"
        },
        {
          "type": "text",
          "value": " description fulfilled value; "
        },
        {
          "type": "inlineCode",
          "value": "setStockState"
        },
        {
          "type": "text",
          "value": " receives complete union member; "
        },
        {
          "type": "inlineCode",
          "value": "error: unknown"
        },
        {
          "type": "text",
          "value": " must be narrowed before reading the message."
        }
      ]
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
                  "value": "Trigger is Load button click."
                }
              ]
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
                  "value": "loadWarehouseStock()"
                },
                {
                  "type": "text",
                  "value": ", create pending Promise and timer closure."
                }
              ]
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
                  "value": "React put "
                },
                {
                  "type": "inlineCode",
                  "value": "{ status: 'pending' }"
                },
                {
                  "type": "text",
                  "value": " joins "
                },
                {
                  "type": "inlineCode",
                  "value": "stockState"
                },
                {
                  "type": "text",
                  "value": " queue; "
                },
                {
                  "type": "inlineCode",
                  "value": "localNote"
                },
                {
                  "type": "text",
                  "value": " cell remains unchanged."
                }
              ]
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
                  "value": "Timer simulates external completion, Promise fulfilled is number "
                },
                {
                  "type": "inlineCode",
                  "value": "24"
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
                  "value": "TypeScript Check only "
                },
                {
                  "type": "inlineCode",
                  "value": "Promise<number>"
                },
                {
                  "type": "text",
                  "value": "; The real service runtime value still needs to be verified separately."
                }
              ]
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
                  "value": "Pending render displays loading; displays quantity after fulfilled continuation queue success."
                }
              ]
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
                  "value": "If only "
                },
                {
                  "type": "inlineCode",
                  "value": "number | null"
                },
                {
                  "type": "text",
                  "value": ", it is impossible to distinguish between idle, pending and empty/unknown, and the UI will cause confusion in meaning."
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
      "label": "src/learning/react/chapter-09-async-data/01-async-data-boundary/async-data-source-boundary.tsx",
      "value": "import { useState } from 'react'\n\ntype StockState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; quantity: number }\n  | { status: 'error'; message: string }\n\nfunction loadWarehouseStock(): Promise<number> {\n  return new Promise((resolve) => {\n    window.setTimeout(() => resolve(24), 550)\n  })\n}\n\nexport function AsyncDataSourceBoundary() {\n  const [localNote, setLocalNote] = useState('Check receiving schedule')\n  const [stockState, setStockState] = useState<StockState>({ status: 'idle' })\n\n  async function handleLoadStock() {\n    setStockState({ status: 'pending' })\n\n    try {\n      const quantity = await loadWarehouseStock()\n      setStockState({ status: 'success', quantity })\n    } catch (error: unknown) {\n      setStockState({\n        status: 'error',\n        message: error instanceof Error ? error.message : 'Unknown stock error',\n      })\n    }\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Async source boundary</p>\n      <h3>Separate local input from external data</h3>\n      <label>\n        Local note\n        <input value={localNote} onChange={(event) => setLocalNote(event.currentTarget.value)} />\n      </label>\n      <button type=\"button\" onClick={handleLoadStock} disabled={stockState.status === 'pending'}>\n        Load warehouse stock\n      </button>\n      <p>\n        {stockState.status === 'idle' && 'Stock has not been requested.'}\n        {stockState.status === 'pending' && 'Loading stock...'}\n        {stockState.status === 'success' && `Available units: ${stockState.quantity}`}\n        {stockState.status === 'error' && stockState.message}\n      </p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "localNote"
        },
        {
          "type": "text",
          "value": " only saves input string; "
        },
        {
          "type": "inlineCode",
          "value": "stockState"
        },
        {
          "type": "text",
          "value": " save external resource lifecycle. Mock function creates a Promise; the handler first enters pending, and then puts the fulfilled number into the success member. JSX reads only the available fields of the current member by discriminant."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Click handler is still idle, but pending update triggers render first. Promise continuation runs after 550ms, and success update generates the next snapshot. The Browser can still process the note input while waiting."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "creates a new state object for each transition; Promise and timer closure are JavaScript values and are not stored in React state. Quantity binding only exists for fulfilled continuation. Local note updates use another Hook queue."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "UI can display loading because the handler clearly queue pending, not because React \"knows that the Promise has not yet been completed\". Success UI comes from the second state transition."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "only write "
        },
        {
          "type": "inlineCode",
          "value": "const [quantity, setQuantity] = useState<number | null>(null)"
        },
        {
          "type": "text",
          "value": " will cause null to represent never requested, pending and no data at the same time, making it impossible to generate accurate feedback."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "treats async value as a synchronization variable, which violates the fact that \"external results have independent lifecycle\". The specific bug is that while the request is waiting, the UI still displays the old quantity, but there is no stale/pending mark."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "sees that the remote data state has no status/error, or null is interpreted by multiple UI branches, indicating that the async boundary is not modeled."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Cart quantity is mostly local/client state; warehouse inventory, order list and auth bootstrap come from external source and must have lifecycle."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section extends the ordinary state in Chapter 4 to \"state saves the current snapshot of the external process\" and takes over the external synchronization in Chapter 7."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React saves request results and stages, does not own external source, and does not complete work for Promise."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-fetch-lifecycles-as-discriminated-async-state",
      "children": [
        {
          "type": "text",
          "value": "9.2 Fetch Lifecycles as Discriminated Async State"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "isLoading"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "hasError"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "isEmpty"
        },
        {
          "type": "text",
          "value": " Three booleans can be true at the same time, resulting in impossible UI. This section uses a single "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " discriminant makes lifecycle branches mutually exclusive."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Union binds the payload to the stage: only success has products, only error has message. UI narrowing shares the same fact as transition."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "idle, pending, success, empty, error, discriminated union, impossible state. There are no new APIs in this section, the focus is on the async data lifecycle and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JavaScript runtime still executes ordinary object/string branch; React saves a state object; browser timer simulates completion; HTTP is not involved; TypeScript narrowing constraint payload; tooling reports illegal member access; architecture specifies empty It was successful but fruitless."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Scenario click Create Promise. Pending transition discards the last payload to simplify the exercise; fulfilled array length determines success/empty; rejection enters error. A render can only see one "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " string."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Union members share literal "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "state.status === 'success'"
        },
        {
          "type": "text",
          "value": " Reading is only allowed after TypeScript "
        },
        {
          "type": "inlineCode",
          "value": "state.products"
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
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "status"
        },
        {
          "type": "text",
          "value": " is the local discriminant convention; "
        },
        {
          "type": "inlineCode",
          "value": "requestProducts(scenario): Promise<string[]>"
        },
        {
          "type": "text",
          "value": " declares fulfilled value; "
        },
        {
          "type": "inlineCode",
          "value": "reject(new Error(...))"
        },
        {
          "type": "text",
          "value": " enters the catch path."
        }
      ]
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
                  "value": "Trigger is Success/Empty/Error button."
                }
              ]
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
                  "value": "JS creates scenario closure, pending Promise, timer and result array/Error."
                }
              ]
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
                  "value": "React saves the pending member first, then the settlement and only saves one final member."
                }
              ]
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
                  "value": "Mock browser timer fulfilled empty/non-empty array, or rejected Error; real HTTP status requires additional checking."
                }
              ]
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
                  "value": "TypeScript ensures that the error member has a message, but the runtime Error source still needs to be narrowed."
                }
              ]
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
                  "value": "Array length 0 enters empty; non-0 enters success; reject enters error."
                }
              ]
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
                  "value": "Multiple booleans will allow loading + error to appear at the same time, causing the spinner to never disappear."
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
      "label": "src/learning/react/chapter-09-async-data/02-async-state-union/async-lifecycle-union.tsx",
      "value": "import { useState } from 'react'\n\ntype Scenario = 'success' | 'empty' | 'error'\n\ntype AsyncProductsState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; products: string[] }\n  | { status: 'empty' }\n  | { status: 'error'; message: string }\n\nfunction requestProducts(scenario: Scenario): Promise<string[]> {\n  return new Promise((resolve, reject) => {\n    window.setTimeout(() => {\n      if (scenario === 'error') {\n        reject(new Error('Product service unavailable'))\n        return\n      }\n\n      resolve(scenario === 'empty' ? [] : ['Desk Lamp', 'Monitor Stand'])\n    }, 450)\n  })\n}\n\nexport function AsyncLifecycleUnion() {\n  const [state, setState] = useState<AsyncProductsState>({ status: 'idle' })\n\n  async function runScenario(scenario: Scenario) {\n    setState({ status: 'pending' })\n\n    try {\n      const products = await requestProducts(scenario)\n      setState(products.length === 0 ? { status: 'empty' } : { status: 'success', products })\n    } catch (error: unknown) {\n      setState({\n        status: 'error',\n        message: error instanceof Error ? error.message : 'Unknown product error',\n      })\n    }\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Lifecycle union</p>\n      <h3>Make UI states mutually exclusive</h3>\n      <div className=\"practice-actions\">\n        <button type=\"button\" onClick={() => runScenario('success')}>Success</button>\n        <button type=\"button\" onClick={() => runScenario('empty')}>Empty</button>\n        <button type=\"button\" onClick={() => runScenario('error')}>Error</button>\n      </div>\n      <p>Status: {state.status}</p>\n      {state.status === 'success' && <p>{state.products.join(', ')}</p>}\n      {state.status === 'error' && <p className=\"status-error\">{state.message}</p>}\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Scenario"
        },
        {
          "type": "text",
          "value": " controls mock outcome; "
        },
        {
          "type": "inlineCode",
          "value": "AsyncProductsState"
        },
        {
          "type": "text",
          "value": " limits the payload to the corresponding member. Handler first pending, then press Promise outcome to create exactly one terminal object. JSX discriminant checks synchronous narrowing."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After clicking Empty, the pending snapshot is displayed first; Promise fulfilled "
        },
        {
          "type": "inlineCode",
          "value": "[]"
        },
        {
          "type": "text",
          "value": ", length check queue empty member. It's not an error because transport/operation completed successfully."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Promise result array is a new reference; the success state saves the array, and the empty state does not need to save the second copy of \"isEmpty\". Old member objects will not be mutated."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "UI branch is directly determined by a single discriminant, so loading and error cannot come from the same state object at the same time."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "isLoading=true; hasError=true"
        },
        {
          "type": "text",
          "value": " is perfectly legal in TypeScript; multiple booleans do not express mutually exclusive constraints."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "treats empty as error to confuse \"the request was successful but the collection is 0\" with \"the request did not obtain a trusted result\". The specific bug is BuyerOrdersPage, which displays a red error when there is no order."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If JSX needs to combine multiple "
        },
        {
          "type": "inlineCode",
          "value": "&&"
        },
        {
          "type": "text",
          "value": " and manually exclude branches, or multiple setters are called continuously, consider discriminated union/reducer."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "BuyerOrdersPage, SellerOrdersPage, and AdminProductsPage all require the mutually exclusive model of pending/empty/error/success."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section reuses Chapter 5 conditional rendering, and applies Chapter 8 \"Making impossible state difficult to express\"."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Async lifecycle is a state machine, not a set of booleans that can be combined in any way."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-http-status-network-errors-and-the-json-boundary",
      "children": [
        {
          "type": "text",
          "value": "9.3 HTTP Status, Network Errors, and the JSON Boundary"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "fetch"
        },
        {
          "type": "text",
          "value": " Promise fulfilled does not mean business success: 404 still generates Response. Even if 200, "
        },
        {
          "type": "inlineCode",
          "value": "response.json()"
        },
        {
          "type": "text",
          "value": " also only parses the body and does not prove the domain shape."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Network, HTTP, body parse and runtime validation are four different failure boundaries and must be judged separately."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Response"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "ok"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": ", network rejection, JSON parse, "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " body."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JavaScript Process Promise/throw/catch; React save HttpState; browser provides Response/"
        },
        {
          "type": "inlineCode",
          "value": "json()"
        },
        {
          "type": "text",
          "value": "; HTTP definition 200/404; TypeScript only checks annotation; tooling provides DOM types; architecture selects error message and retry policy."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "for practice "
        },
        {
          "type": "inlineCode",
          "value": "new Response"
        },
        {
          "type": "text",
          "value": " stably simulates 200/404, and uses rejected TypeError to simulate network failure. After Await Response, you must first check "
        },
        {
          "type": "inlineCode",
          "value": "ok"
        },
        {
          "type": "text",
          "value": "; body is explicitly assigned to "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": ", left to 9.8 guard."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "real "
        },
        {
          "type": "inlineCode",
          "value": "fetch(input, init?)"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "Promise<Response>"
        },
        {
          "type": "text",
          "value": ". It usually only rejects when network/request fails; HTTP 404/500 requires "
        },
        {
          "type": "inlineCode",
          "value": "response.ok"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " check. "
        },
        {
          "type": "inlineCode",
          "value": "json()"
        },
        {
          "type": "text",
          "value": " returns another Promise."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "fixed properties are "
        },
        {
          "type": "inlineCode",
          "value": "response.ok"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "response.status"
        },
        {
          "type": "text",
          "value": "; fixed method is "
        },
        {
          "type": "inlineCode",
          "value": "response.json()"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "Response.ok"
        },
        {
          "type": "text",
          "value": " is true for 200–299."
        }
      ]
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
                  "value": "Trigger is 200, 404 or Network error button."
                }
              ]
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
                  "value": "JS creates request Promise; network mode creates TypeError; HTTP modes creates Response object."
                }
              ]
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
                  "value": "React queue pending first, and then save the parsed body or error message."
                }
              ]
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
                  "value": "404 path Promise fulfilled, but "
                },
                {
                  "type": "inlineCode",
                  "value": "Response.ok=false/status=404"
                },
                {
                  "type": "text",
                  "value": "; network path Promise rejected; 200 body parse fulfilled object."
                }
              ]
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
                  "value": "TypeScript Accept "
                },
                {
                  "type": "inlineCode",
                  "value": "body: unknown"
                },
                {
                  "type": "text",
                  "value": ", will not prove that object has id/name."
                }
              ]
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
                  "value": "Only 200 enters success; 404 and network both enter errors, but for different reasons."
                }
              ]
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
                  "value": "only write "
                },
                {
                  "type": "inlineCode",
                  "value": "await response.json()"
                },
                {
                  "type": "text",
                  "value": " will treat 404 error body as normal data."
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
      "label": "src/learning/react/chapter-09-async-data/03-http-error-boundary/http-response-boundary.tsx",
      "value": "import { useState } from 'react'\n\ntype ResponseMode = 'success' | 'not-found' | 'network-error'\n\ntype HttpState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; body: unknown }\n  | { status: 'error'; message: string }\n\nasync function requestResponse(mode: ResponseMode): Promise<Response> {\n  await new Promise((resolve) => window.setTimeout(resolve, 350))\n\n  if (mode === 'network-error') {\n    throw new TypeError('Network connection failed')\n  }\n\n  if (mode === 'not-found') {\n    return new Response(JSON.stringify({ message: 'Product not found' }), {\n      status: 404,\n      headers: { 'Content-Type': 'application/json' },\n    })\n  }\n\n  return new Response(JSON.stringify({ id: 'sku-301', name: 'Desk Lamp' }), {\n    status: 200,\n    headers: { 'Content-Type': 'application/json' },\n  })\n}\n\nexport function HttpResponseBoundary() {\n  const [state, setState] = useState<HttpState>({ status: 'idle' })\n\n  async function handleRequest(mode: ResponseMode) {\n    setState({ status: 'pending' })\n\n    try {\n      const response = await requestResponse(mode)\n\n      if (!response.ok) {\n        throw new Error(`HTTP ${response.status}`)\n      }\n\n      const body: unknown = await response.json()\n      setState({ status: 'success', body })\n    } catch (error: unknown) {\n      setState({\n        status: 'error',\n        message: error instanceof Error ? error.message : 'Unknown request error',\n      })\n    }\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">HTTP boundary</p>\n      <h3>Separate rejected fetch from non-2xx status</h3>\n      <div className=\"practice-actions\">\n        <button type=\"button\" onClick={() => handleRequest('success')}>200</button>\n        <button type=\"button\" onClick={() => handleRequest('not-found')}>404</button>\n        <button type=\"button\" onClick={() => handleRequest('network-error')}>Network error</button>\n      </div>\n      <p>\n        {state.status === 'idle' && 'Choose a response.'}\n        {state.status === 'pending' && 'Waiting for response...'}\n        {state.status === 'success' && JSON.stringify(state.body)}\n        {state.status === 'error' && state.message}\n      </p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Mock request explicitly generates three browser-level outcomes. The Handler does not directly equate fulfilled Response with success, but first checks the HTTP status and then parses the body into an untrusted value."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "404 button produces fulfilled Response; "
        },
        {
          "type": "inlineCode",
          "value": "!response.ok"
        },
        {
          "type": "text",
          "value": " actively throws Error and catch queue error state. Network button has been rejected before getting the Response."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Response is browser object; "
        },
        {
          "type": "inlineCode",
          "value": "body"
        },
        {
          "type": "text",
          "value": " is the parsed JavaScript value; the error object is created by network mock or status check. React does not save the Response, only the final body/message."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Fetch means \"whether a response is obtained\", and HTTP status means \"how the server responds\". The two are not the same fact."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "const products = (await response.json()) as Product[]"
        },
        {
          "type": "text",
          "value": " skips status and runtime shape at the same time, static assertion does not generate validator."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "only catches network error and treats 404/500 as success. The specific bug is that ProductDetailPage reads non-existent product fields from 404 body."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "finds every "
        },
        {
          "type": "inlineCode",
          "value": "fetch"
        },
        {
          "type": "text",
          "value": ": Whether to check "
        },
        {
          "type": "inlineCode",
          "value": "ok/status"
        },
        {
          "type": "text",
          "value": ", whether to process JSON parse, and whether to verify shape before entering domain state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ProductDetailPage It is necessary to distinguish 404 not-found, 503 error, invalid body and normal product; these UIs should not share a generic failure."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section extends the external system boundary of Chapter 7 to four layers: browser, HTTP, JSON and domain."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Promise fulfilled, Response ok, JSON parsed, and domain valid are four consecutive but independent checkpoints."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-explicit-requests-driven-by-event-handlers",
      "children": [
        {
          "type": "text",
          "value": "9.4 Explicit Requests Driven by Event Handlers"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Users can continuously edit draft query, but the business requires clicking to confirm before requesting. If Effect listens to draft, every keystroke will send a request."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Event handler knows that the specific intent is \"Search clicked\", so the request belongs to event-specific logic; "
        },
        {
          "type": "inlineCode",
          "value": "draftQuery"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "submittedQuery"
        },
        {
          "type": "text",
          "value": " separation request criteria."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "explicit request, draft criteria, submitted criteria, event-specific logic. There are no new APIs in this section, the focus is on the async data lifecycle and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "Browser generates input/click events; JS handler reads draft and creates Promise; React saves draft/submitted/lifecycle; HTTP is mocked; TypeScript checks criteria/result; tooling checks async code; architecture makes click a request trigger."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Typing only updates the draft Hook cell. Click closure captures the render's draft string, trims it, queues submitted criteria and pending state at the same time, and then awaits search Promise."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "async"
        },
        {
          "type": "text",
          "value": " event handlers can await; React does not wait for handler Promise or return valuerender UI from it. The queue state must be explicit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "DOM button fixed prop "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": "; input uses "
        },
        {
          "type": "inlineCode",
          "value": "value/onChange"
        },
        {
          "type": "text",
          "value": "; search function is "
        },
        {
          "type": "inlineCode",
          "value": "(query: string) => Promise<string[]>"
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
                  "value": "Search button click triggers request, typing does not trigger."
                }
              ]
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
                  "value": "JS Create "
                },
                {
                  "type": "inlineCode",
                  "value": "nextQuery"
                },
                {
                  "type": "text",
                  "value": ", Promise, filter callback and result array."
                }
              ]
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
                  "value": "React queue "
                },
                {
                  "type": "inlineCode",
                  "value": "submittedQuery"
                },
                {
                  "type": "text",
                  "value": " and pending member, retain previous products as stale display policy."
                }
              ]
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
                  "value": "Mock Promise fulfilled array; real HTTP not yet engaged."
                }
              ]
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
                  "value": "TypeScript Check string/array, the runtime service response still requires guard."
                }
              ]
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
                  "value": "Pending UI comes from explicit transition; length 0 enters empty, otherwise success."
                }
              ]
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
                  "value": "Putting request into draft Effect will produce keystroke request storm and rate-limit risk."
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
      "label": "src/learning/react/chapter-09-async-data/04-event-driven-fetch/event-driven-product-search.tsx",
      "value": "import { useState } from 'react'\n\ntype SearchState =\n  | { status: 'idle'; products: string[] }\n  | { status: 'pending'; products: string[] }\n  | { status: 'success'; products: string[] }\n  | { status: 'empty'; products: string[] }\n  | { status: 'error'; products: string[]; message: string }\n\nconst productNames = ['Desk Lamp', 'Monitor Stand', 'Mechanical Keyboard', 'Wireless Mouse']\n\nfunction searchProducts(query: string): Promise<string[]> {\n  return new Promise((resolve) => {\n    window.setTimeout(() => {\n      resolve(productNames.filter((name) => name.toLowerCase().includes(query.toLowerCase())))\n    }, 500)\n  })\n}\n\nexport function EventDrivenProductSearch() {\n  const [draftQuery, setDraftQuery] = useState('desk')\n  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)\n  const [state, setState] = useState<SearchState>({ status: 'idle', products: [] })\n\n  async function handleSearch() {\n    const nextQuery = draftQuery.trim()\n    setSubmittedQuery(nextQuery)\n    setState((current) => ({ status: 'pending', products: current.products }))\n\n    try {\n      const products = await searchProducts(nextQuery)\n      setState(\n        products.length === 0\n          ? { status: 'empty', products: [] }\n          : { status: 'success', products },\n      )\n    } catch (error: unknown) {\n      setState((current) => ({\n        status: 'error',\n        products: current.products,\n        message: error instanceof Error ? error.message : 'Unknown search error',\n      }))\n    }\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Event-driven request</p>\n      <h3>Search only after explicit confirmation</h3>\n      <label>\n        Draft query\n        <input value={draftQuery} onChange={(event) => setDraftQuery(event.currentTarget.value)} />\n      </label>\n      <button type=\"button\" onClick={handleSearch} disabled={state.status === 'pending'}>\n        Search products\n      </button>\n      <p>Submitted query: {submittedQuery ?? 'none'}</p>\n      <p>\n        {state.status === 'pending' ? 'Searching...' : `${state.products.length} products`}\n      </p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Draft and submitted criteria are different facts; the handler freezes this request criteria when clicked. Pending/error retains old products, indicating the minimum strategy of stale-while-refresh."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Typing "
        },
        {
          "type": "inlineCode",
          "value": "mouse"
        },
        {
          "type": "text",
          "value": " only render input; after clicking submit, it becomes "
        },
        {
          "type": "inlineCode",
          "value": "mouse"
        },
        {
          "type": "text",
          "value": ", status pending; filter result after 500ms enters success."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "nextQuery"
        },
        {
          "type": "text",
          "value": " is the local binding of click invocation; even if the draft changes during the waiting period, the current Promise still uses the submitted string. Result array is the new reference."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Request trigger is bound to a specific click, and Effect does not need to guess which state change represents user confirmation."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useEffect(() => searchProducts(draftQuery), [draftQuery])"
        },
        {
          "type": "text",
          "value": " means \"each committed draft must be synchronized\", which has different semantics from explicit submit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "puts the event-specific retry/search into Effect and causes the unrelated re-render/dependency change request to be triggered indirectly."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If the request reason can be clearly stated as \"the user clicked X\", check the event handler first instead of creating a new "
        },
        {
          "type": "inlineCode",
          "value": "shouldFetch"
        },
        {
          "type": "text",
          "value": " boolean Effect."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ProductListPage are all event-driven intents."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section reuses Chapter 6 form submit and Chapter 7 distinction."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Draft can change frequently; only confirmed criteria trigger explicit request."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-effects-and-committed-request-criteria",
      "children": [
        {
          "type": "text",
          "value": "9.5 Effects and Committed Request Criteria"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "When the semantics of the UI is \"as long as committed category is X, the result must be synchronized with X\", the request should be resynchronized by Effect on criteria."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Effect does not respond to the abstract \"mount\" but responds to the reactive criteria read in the render committed snapshot. Dependency array must contain "
        },
        {
          "type": "inlineCode",
          "value": "category"
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
              "value": "New keywords and new concepts:"
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
          "value": "committed criteria, reactive Effect, dependency honesty, cleanup ignore."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS creates Effect closure/Promise; React runs setup after commit category and cleanup before changes; browser timer simulates external work; HTTP is not involved; TS checks category map; linter checks dependency; architecture determines criteria-state owner."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Select handler queue new category and pending. After React commits the new select value, first cleanup the previous Effect and replace the "
        },
        {
          "type": "inlineCode",
          "value": "ignore=true"
        },
        {
          "type": "text",
          "value": ", then run new setup and request current category."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useEffect(setup, dependencies)"
        },
        {
          "type": "text",
          "value": " runs after commit. Setup returns cleanup; all reactive values ​​read must appear in dependencies."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "Fixed API "
        },
        {
          "type": "inlineCode",
          "value": "useEffect"
        },
        {
          "type": "text",
          "value": "; dependency inline array "
        },
        {
          "type": "inlineCode",
          "value": "[category]"
        },
        {
          "type": "text",
          "value": "; cleanup signature "
        },
        {
          "type": "inlineCode",
          "value": "() => void"
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
                  "value": "Category select event queue committed criteria."
                }
              ]
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
                  "value": "JS Creates Effect closure, ignore binding and request Promise for this render."
                }
              ]
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
                  "value": "React commit category, cleanup old setup, and then run new setup; state pending has been saved by event queue."
                }
              ]
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
                  "value": "Mock Promise fulfilled category array."
                }
              ]
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
                  "value": "TS limits Category keys; linter verifies that the closure read category is consistent with dependency."
                }
              ]
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
                  "value": "New completion enters success/empty according to length; old completion reads own "
                },
                {
                  "type": "inlineCode",
                  "value": "ignore=true"
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
                  "value": "write "
                },
                {
                  "type": "inlineCode",
                  "value": "[]"
                },
                {
                  "type": "text",
                  "value": " will make Effect always use initial category, UI criteria and results bifurcation."
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
      "label": "src/learning/react/chapter-09-async-data/05-effect-driven-fetch/effect-driven-product-query.tsx",
      "value": "import { useEffect, useState } from 'react'\n\ntype Category = 'lighting' | 'office' | 'audio'\n\ntype CategoryState =\n  | { status: 'pending'; products: string[] }\n  | { status: 'success'; products: string[] }\n  | { status: 'empty'; products: string[] }\n  | { status: 'error'; products: string[]; message: string }\n\nconst categoryProducts: Record<Category, string[]> = {\n  lighting: ['Desk Lamp', 'Floor Lamp'],\n  office: ['Monitor Stand', 'Mechanical Keyboard'],\n  audio: [],\n}\n\nfunction loadCategoryProducts(category: Category): Promise<string[]> {\n  return new Promise((resolve) => {\n    window.setTimeout(() => resolve(categoryProducts[category]), 500)\n  })\n}\n\nexport function EffectDrivenProductQuery() {\n  const [category, setCategory] = useState<Category>('lighting')\n  const [state, setState] = useState<CategoryState>({ status: 'pending', products: [] })\n\n  useEffect(() => {\n    let ignore = false\n\n    loadCategoryProducts(category)\n      .then((products) => {\n        if (ignore) return\n        setState(\n          products.length === 0\n            ? { status: 'empty', products: [] }\n            : { status: 'success', products },\n        )\n      })\n      .catch((error: unknown) => {\n        if (ignore) return\n        setState((current) => ({\n          status: 'error',\n          products: current.products,\n          message: error instanceof Error ? error.message : 'Unknown category error',\n        }))\n      })\n\n    return () => {\n      ignore = true\n    }\n  }, [category])\n\n  function handleCategoryChange(nextCategory: Category) {\n    setCategory(nextCategory)\n    setState((current) => ({ status: 'pending', products: current.products }))\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Effect-driven request</p>\n      <h3>Synchronize results with committed criteria</h3>\n      <label>\n        Category\n        <select\n          value={category}\n          onChange={(event) => handleCategoryChange(event.currentTarget.value as Category)}\n        >\n          <option value=\"lighting\">Lighting</option>\n          <option value=\"office\">Office</option>\n          <option value=\"audio\">Audio</option>\n        </select>\n      </label>\n      <p>Status: {state.status}</p>\n      <p>{state.products.join(', ') || 'No products'}</p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Module map simulates remote dataset; Effect Each setup has independent "
        },
        {
          "type": "inlineCode",
          "value": "ignore"
        },
        {
          "type": "text",
          "value": " binding. Handler is responsible for expressing category intent and pending, and Effect only synchronizes committed category."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Switch office from lighting: event updates queue; commit office; old cleanup mark ignore; new setup request office; queue success after result is completed."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "The category binding, Effect closure and ignore variable of each render are independent. Old Promise is not canceled, but old continuation is blocked by ignore gate."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Effect setup corresponds to the committed criteria snapshot one-to-one, and cleanup closes the write permission of the old snapshot."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Dependency "
        },
        {
          "type": "inlineCode",
          "value": "[]"
        },
        {
          "type": "text",
          "value": " only synchronizes initial lighting; if cleanup is omitted, the old lighting result may overwrite the office."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "Effect reads category but writes empty dependency. Violation of reactive dependency must be declared honestly."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "checks request URL/body/criteria for all props/state read in Effect, and checks the dependency array item by item."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ProductDetailPage committed "
        },
        {
          "type": "inlineCode",
          "value": "productId"
        },
        {
          "type": "text",
          "value": ", SellerOrdersPage's route/filter criteria can drive synchronization."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section directly applies Chapter 7 Effect setup/cleanup/dependency to the data lifecycle."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Effect fetch is to \"synchronize external result with committed criteria\" and is not the default container for all fetch."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-abortcontroller-and-obsolete-result-cleanup",
      "children": [
        {
          "type": "text",
          "value": "9.6 AbortController and Obsolete-Result Cleanup"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Ignore can prevent the old result from writing state, but still allow the underlying work to continue. AbortController can also request cancellation from operations that support signal."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Cleanup should also consider resource work and state write permission. Abort is browser capability; React is only responsible for calling cleanup."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "AbortController"
        },
        {
          "type": "text",
          "value": ", "
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
          "value": "abort()"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "AbortError"
        },
        {
          "type": "text",
          "value": ", obsolete work."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS Promise registers abort listener; React Effect cleanup calls controller; browser provides controller/signal/DOMException; real fetch will consume signal; TS provides DOM types; tooling checks dependency; architecture decides whether to cancel or ignore."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each Effect setup creates a controller. Before the Channel changes, cleanup calls abort; mock clears the timer and rejects AbortError. Catch recognizes AbortError and does not enter the error UI."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "const controller = new AbortController()"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "controller.signal"
        },
        {
          "type": "text",
          "value": " is passed to operation; cleanup calls "
        },
        {
          "type": "inlineCode",
          "value": "controller.abort()"
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
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "AbortController.signal"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "abort()"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "signal.addEventListener('abort', ...)"
        },
        {
          "type": "text",
          "value": "; the actual usage of fetch is "
        },
        {
          "type": "inlineCode",
          "value": "fetch(url, { signal })"
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
                  "value": "Channel event changes committed criteria."
                }
              ]
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
                  "value": "JS creates controller, signal, Promise, timer and abort listener."
                }
              ]
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
                  "value": "React saves the pending snapshot and executes the old cleanup before the next setup."
                }
              ]
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
                  "value": "Browser abort signal triggers; mock Promise rejected DOMException AbortError."
                }
              ]
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
                  "value": "TS checks the AbortSignal parameter, and the runtime still needs to identify abort according to error.name."
                }
              ]
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
                  "value": "Current request fulfilled enters success; aborted old request does not enter error."
                }
              ]
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
                  "value": "only clear timeout but there are other completions in the asynchronous chain, the old continuation may still write state."
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
      "label": "src/learning/react/chapter-09-async-data/06-abort-obsolete-result/abort-obsolete-request.tsx",
      "value": "import { useEffect, useState } from 'react'\n\ntype InventoryChannel = 'warehouse' | 'storefront'\n\ntype InventoryState =\n  | { status: 'pending'; quantity: number | null }\n  | { status: 'success'; quantity: number }\n  | { status: 'error'; quantity: number | null; message: string }\n\nfunction loadInventory(channel: InventoryChannel, signal: AbortSignal): Promise<number> {\n  return new Promise((resolve, reject) => {\n    const timeoutId = window.setTimeout(\n      () => resolve(channel === 'warehouse' ? 42 : 11),\n      channel === 'warehouse' ? 900 : 300,\n    )\n\n    signal.addEventListener(\n      'abort',\n      () => {\n        window.clearTimeout(timeoutId)\n        reject(new DOMException('Inventory request aborted', 'AbortError'))\n      },\n      { once: true },\n    )\n  })\n}\n\nexport function AbortObsoleteRequest() {\n  const [channel, setChannel] = useState<InventoryChannel>('warehouse')\n  const [state, setState] = useState<InventoryState>({ status: 'pending', quantity: null })\n\n  useEffect(() => {\n    const controller = new AbortController()\n\n    loadInventory(channel, controller.signal)\n      .then((quantity) => setState({ status: 'success', quantity }))\n      .catch((error: unknown) => {\n        if (error instanceof DOMException && error.name === 'AbortError') return\n        setState((current) => ({\n          status: 'error',\n          quantity: current.quantity,\n          message: error instanceof Error ? error.message : 'Unknown inventory error',\n        }))\n      })\n\n    return () => controller.abort()\n  }, [channel])\n\n  function handleChannelChange(nextChannel: InventoryChannel) {\n    setChannel(nextChannel)\n    setState((current) => ({ status: 'pending', quantity: current.quantity }))\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Abort obsolete request</p>\n      <h3>Cancel work for the previous criteria</h3>\n      <div className=\"practice-actions\">\n        <button type=\"button\" onClick={() => handleChannelChange('warehouse')}>Warehouse</button>\n        <button type=\"button\" onClick={() => handleChannelChange('storefront')}>Storefront</button>\n      </div>\n      <p>Channel: {channel}</p>\n      <p>{state.status === 'pending' ? 'Loading inventory...' : `Quantity: ${state.quantity ?? 0}`}</p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Loader exposes the cancellation contract as AbortSignal. Effect owns the controller; cleanup cancels the work of the setup. AbortError is treated as expected control flow and does not pollute the error UI."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Warehouse request is not completed; warehouse cleanup abort and reject; storefront new request 300ms and then success."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "has independent controller/signal/Promise. Pending state retains the previous quantity and specifies the stale data policy."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "was terminated by the browser signal, and catch excluded AbortError, so only the current criteria completion has a writing opportunity."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "only in cleanup "
        },
        {
          "type": "inlineCode",
          "value": "clearTimeout"
        },
        {
          "type": "text",
          "value": " is only applicable to this timer; the real fetch should also pass signal, and can retain ignore at the same time to prevent subsequent chain writes that cannot be canceled."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "displays AbortError as failed and will flash errors during normal criteria switching; failure to cleanup will cause unmount/criteria to continue updating after change."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Checks whether each Effect-started operation has symmetric cleanup, and whether the operation actually consumes the signal."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerOrders status fast switching, ProductDetail productId changes should cancel the obsolete request or at least ignore the result."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section deepens Chapter 7 async cleanup and applies the ref/effect principle to request resource."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Cleanup is not just \"component uninstall processing\", but also cancels the external work owned by the previous criteria snapshot."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-race-conditions-and-stale-results",
      "children": [
        {
          "type": "text",
          "value": "9.7 Race Conditions and Stale Results"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Pending request takes 850ms, and shipped only takes 250ms. When switching quickly, old pending may arrive last and overwrite the current shipped UI."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Request start order does not guarantee completion order. Correctness must be guaranteed by current criteria ownership and cannot rely on \"usually first come, first served\"."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "race condition, late completion, stale result, ignore flag. There are no new APIs in this section, the focus is on the async data lifecycle and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS creates two Promise/closures; React creates two Effect setup/cleanup epochs; browser timers are completed out of order; HTTP may be out of order; TS cannot prove timing; linter only checks dependency; architecture defines the current request write permission."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each setup has independent "
        },
        {
          "type": "inlineCode",
          "value": "ignore"
        },
        {
          "type": "text",
          "value": " binding. When Criteria changes, old cleanup only modifies old binding. Old Promise is still fulfilled, but its then closure skips setState after reading true."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Ignore is JavaScript closure pattern, not React API. Cleanup must modify the binding shared with this setup completion closure."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "ignore"
        },
        {
          "type": "text",
          "value": " can be renamed; the key is setup-local mutable binding. "
        },
        {
          "type": "inlineCode",
          "value": "loadOrders(status): Promise<string[]>"
        },
        {
          "type": "text",
          "value": " Freeze criteria as argument."
        }
      ]
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
                  "value": "Pending to start two request epochs."
                }
              ]
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
                  "value": "JS creates two Promise, two timers, two then closures and two ignore bindings."
                }
              ]
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
                  "value": "React cleanup pending epoch, commit shipped snapshot and run new setup."
                }
              ]
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
                  "value": "Shipped was fulfilled first and success was written; it was fulfilled after pending but was blocked by old ignore."
                }
              ]
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
                  "value": "TS only checks status/result types and does not understand which Promise should get write permission."
                }
              ]
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
                  "value": "UI ultimately maintains the shipped result because only the current epoch can be queued for update."
                }
              ]
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
                  "value": "has no ignore, 850ms old result is written last. The criteria shows shipped but orders are pending."
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
      "label": "src/learning/react/chapter-09-async-data/07-race-condition/race-condition-protection.tsx",
      "value": "import { useEffect, useState } from 'react'\n\ntype OrderStatus = 'pending' | 'shipped'\n\ntype OrdersState =\n  | { status: 'pending'; orders: string[] }\n  | { status: 'success'; orders: string[] }\n\nfunction loadOrders(status: OrderStatus): Promise<string[]> {\n  return new Promise((resolve) => {\n    window.setTimeout(\n      () => resolve(status === 'pending' ? ['ORD-701', 'ORD-702'] : ['ORD-703']),\n      status === 'pending' ? 850 : 250,\n    )\n  })\n}\n\nexport function RaceConditionProtection() {\n  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending')\n  const [state, setState] = useState<OrdersState>({ status: 'pending', orders: [] })\n\n  useEffect(() => {\n    let ignore = false\n\n    loadOrders(orderStatus).then((orders) => {\n      if (!ignore) {\n        setState({ status: 'success', orders })\n      }\n    })\n\n    return () => {\n      ignore = true\n    }\n  }, [orderStatus])\n\n  function handleStatusChange(nextStatus: OrderStatus) {\n    setOrderStatus(nextStatus)\n    setState((current) => ({ status: 'pending', orders: current.orders }))\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Race protection</p>\n      <h3>Ignore a late result from old criteria</h3>\n      <div className=\"practice-actions\">\n        <button type=\"button\" onClick={() => handleStatusChange('pending')}>Pending</button>\n        <button type=\"button\" onClick={() => handleStatusChange('shipped')}>Shipped</button>\n      </div>\n      <p>Criteria: {orderStatus}</p>\n      <p>{state.status === 'pending' ? 'Refreshing orders...' : state.orders.join(', ')}</p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Different delays deliberately create reverse order. Effect closure captures orderStatus for each render; cleanup only closes the corresponding completion. Handler retains old orders as stale content."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Pending setup starts; Shipped click triggers pending cleanup and shipped setup; shipped 250ms is written; old pending 850ms arrives but is not updated."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Both result arrays are actually created. Old array does not enter React state; current array becomes new state reference. Criteria and data remain matched."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "correctness comes from epoch write permission, not Promise settlement order."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "using a component-level boolean will be changed to false by new setup, and epochs cannot be distinguished; setup-local closure or request id/controller is required."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "\"The last person to finish wins\" violates the architecture rule that current criteria should have data."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "DevTools throttle the network and quickly switch filters; if the label does not match the list, it is a race symptom."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerOrdersPagestate filtering and ProductDetailPage quick switching id are most likely to cause late result overwriting."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section extends the stale closure in Chapter 7 from \"reading old values\" to \"old async process writing new UI\"."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each request has an epoch; only the current epoch can submit results."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-unknown-responses-and-runtime-type-guards",
      "children": [
        {
          "type": "text",
          "value": "9.8 "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " Responses and Runtime Type Guards"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "as Product[]"
        },
        {
          "type": "text",
          "value": " only lets the compiler believe it and does not check the runtime object. Invalid body can generate "
        },
        {
          "type": "inlineCode",
          "value": "price.toFixed is not a function"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "External body should enter "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " boundary, and then the guard verifies each necessary field. Only narrowed data can enter the trusted domain state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": ", type predicate, runtime guard, record check, domain boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS run "
        },
        {
          "type": "inlineCode",
          "value": "typeof"
        },
        {
          "type": "text",
          "value": "/Array.isArray/every; React saves the state after guard; browser/HTTP body is omitted in the mock; TS is based on "
        },
        {
          "type": "inlineCode",
          "value": "value is Product[]"
        },
        {
          "type": "text",
          "value": " narrowing; tooling checks unsafe access; architecture specifies that validation occurs before state owner."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Guard first confirms the array, and then checks non-null object and id/name/price primitives for each element. False path enters error; true path allows TypeScript to narrow the body to Product[] in the branch."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " cannot be directly accessed by property. Type predicate syntax is "
        },
        {
          "type": "inlineCode",
          "value": "value is Product[]"
        },
        {
          "type": "text",
          "value": "; The runtime implementation must actually return a boolean check."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "Array.isArray(value)"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "array.every(predicate)"
        },
        {
          "type": "text",
          "value": "; guard signature "
        },
        {
          "type": "inlineCode",
          "value": "(value: unknown) => value is Product[]"
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
                  "value": "Valid/Invalid button triggers unknown response."
                }
              ]
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
                  "value": "JS creates array/object; guard creates a candidate reference and checks it field by field."
                }
              ]
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
                  "value": "React only saves validated products or error messages after pending."
                }
              ]
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
                  "value": "Mock Promise fulfilled does not mean that the body is trustworthy; true "
                },
                {
                  "type": "inlineCode",
                  "value": "response.json()"
                },
                {
                  "type": "text",
                  "value": " also only completes parse."
                }
              ]
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
                  "value": "TS is in guard true branch narrowing; the predicate type disappears after emit, and checks are still executed as JS."
                }
              ]
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
                  "value": "Valid enters success; invalid enters error instead of render crash."
                }
              ]
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
                  "value": "Direct assertion will skip checks, allowing errors to be delayed to the deep UI."
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
      "label": "src/learning/react/chapter-09-async-data/08-runtime-type-guard/unknown-response-guard.tsx",
      "value": "import { useState } from 'react'\n\ntype Product = {\n  id: string\n  name: string\n  price: number\n}\n\ntype GuardState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; products: Product[] }\n  | { status: 'error'; message: string }\n\nfunction isProduct(value: unknown): value is Product {\n  if (typeof value !== 'object' || value === null) return false\n  const candidate = value as Record<string, unknown>\n  return (\n    typeof candidate.id === 'string' &&\n    typeof candidate.name === 'string' &&\n    typeof candidate.price === 'number'\n  )\n}\n\nfunction isProductArray(value: unknown): value is Product[] {\n  return Array.isArray(value) && value.every(isProduct)\n}\n\nfunction loadUnknownResponse(valid: boolean): Promise<unknown> {\n  return Promise.resolve(\n    valid\n      ? [{ id: 'sku-801', name: 'USB-C Hub', price: 59 }]\n      : [{ id: 801, title: 'Invalid product' }],\n  )\n}\n\nexport function UnknownResponseGuard() {\n  const [state, setState] = useState<GuardState>({ status: 'idle' })\n\n  async function handleLoad(valid: boolean) {\n    setState({ status: 'pending' })\n    const body = await loadUnknownResponse(valid)\n\n    if (!isProductArray(body)) {\n      setState({ status: 'error', message: 'Response did not match Product[]' })\n      return\n    }\n\n    setState({ status: 'success', products: body })\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Unknown boundary</p>\n      <h3>Narrow runtime data before domain use</h3>\n      <div className=\"practice-actions\">\n        <button type=\"button\" onClick={() => handleLoad(true)}>Valid response</button>\n        <button type=\"button\" onClick={() => handleLoad(false)}>Invalid response</button>\n      </div>\n      <p>\n        {state.status === 'idle' && 'Choose a response shape.'}\n        {state.status === 'pending' && 'Parsing response...'}\n        {state.status === 'success' && `${state.products.length} valid product`}\n        {state.status === 'error' && state.message}\n      </p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Inner guard checks a single Product; outer guard checks array and every. Only true branch puts body into success state."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Invalid Promise was fulfilled normally; guard found that the id was not a string, name/price was missing, and queue error occurred. No exceptions will occur until render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "candidate"
        },
        {
          "type": "text",
          "value": " is just a temporary typed view of the same runtime object; it does not clone data. Validated array reference goes directly into state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Runtime JS checks are actually executed; TypeScript narrowing just allows subsequent access based on these checks."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "const products = body as Product[]"
        },
        {
          "type": "text",
          "value": " generates zero runtime checks, and the invalid body passes unchanged."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "uses annotation/assertion as a validator to confuse compile time and runtime."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Search for "
        },
        {
          "type": "inlineCode",
          "value": "response.json() as"
        },
        {
          "type": "text",
          "value": ", generic "
        },
        {
          "type": "inlineCode",
          "value": "fetchJson<T>"
        },
        {
          "type": "text",
          "value": " directly returns T without parser. These are trust boundary vulnerabilities."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "AdminProductsPage, auth bootstrap and orders response must be verified in the external boundary and then handed over to typed components."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section deepens the previous chapters \"TypeScript type erasure\" and establishes the basis for the final project parser file."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " prevents blind faith; guard exchanges real JavaScript checks for trusted domain type."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-managing-an-async-lifecycle-with-usereducer",
      "children": [
        {
          "type": "text",
          "value": "9.9 Managing an Async Lifecycle with "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Multiple handlers operate status/orders/error separately and it is easy to miss the transition. The Reducer focuses on \"How started/succeeded/failed changes state\" but does not execute the request."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Action describes what happens in the external process; the pure reducer calculates the next state from the current async state and retains the stale orders policy."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "async reducer, lifecycle action, stale-data retention, pure transition."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS request Promise is separated from the reducer function; React reducer Hook saves state/queue; browser timer simulates request; HTTP is not involved; TS checks action union; tooling checks Hook; architecture prohibits reducer side effects."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Event handler dispatch started first, request settlement and then dispatch succeeded/failed. React calls the pure reducer when processing the action queue; the current handler snapshot is not modified synchronously by dispatch."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useReducer(reducer, initialState)"
        },
        {
          "type": "text",
          "value": " returns state/dispatch. Reducer signature "
        },
        {
          "type": "inlineCode",
          "value": "(state, action) => nextState"
        },
        {
          "type": "text",
          "value": ", cannot be async, cannot be fetched, cannot be mutated."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "Action discriminant is local "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": "; dispatch only receives "
        },
        {
          "type": "inlineCode",
          "value": "AsyncOrdersAction"
        },
        {
          "type": "text",
          "value": "; request function returns "
        },
        {
          "type": "inlineCode",
          "value": "Promise<string[]>"
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
                  "value": "Load/Fail button triggers the handler."
                }
              ]
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
                  "value": "JS creates action objects, Promise, result array or Error."
                }
              ]
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
                  "value": "React reducer queue processes started and terminal actions in sequence, saving new state object."
                }
              ]
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
                  "value": "Mock Promise fulfilled/rejected; The real HTTP check should be completed before dispatch success."
                }
              ]
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
                  "value": "TS binds action type and payload, and runtime is still plain objects."
                }
              ]
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
                  "value": "Started enters pending; success array length determines subsequent UI; failure retains old orders and adds message."
                }
              ]
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
                  "value": "Reducer will destroy the purity, and repeated calculations in Strict Mode may duplicate requests."
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
      "label": "src/learning/react/chapter-09-async-data/09-async-reducer/async-lifecycle-reducer.tsx",
      "value": "import { useReducer } from 'react'\n\ntype AsyncOrdersState =\n  | { status: 'idle'; orders: string[] }\n  | { status: 'pending'; orders: string[] }\n  | { status: 'success'; orders: string[] }\n  | { status: 'empty'; orders: string[] }\n  | { status: 'error'; orders: string[]; message: string }\n\ntype AsyncOrdersAction =\n  | { type: 'request_started' }\n  | { type: 'request_succeeded'; orders: string[] }\n  | { type: 'request_failed'; message: string }\n\nfunction ordersReducer(state: AsyncOrdersState, action: AsyncOrdersAction): AsyncOrdersState {\n  switch (action.type) {\n    case 'request_started':\n      return { status: 'pending', orders: state.orders }\n    case 'request_succeeded':\n      return action.orders.length === 0\n        ? { status: 'empty', orders: [] }\n        : { status: 'success', orders: action.orders }\n    case 'request_failed':\n      return { status: 'error', orders: state.orders, message: action.message }\n  }\n}\n\nfunction requestOrders(shouldFail: boolean): Promise<string[]> {\n  return new Promise((resolve, reject) => {\n    window.setTimeout(() => {\n      if (shouldFail) {\n        reject(new Error('Order request failed'))\n        return\n      }\n      resolve(['ORD-901', 'ORD-902'])\n    }, 450)\n  })\n}\n\nexport function AsyncLifecycleReducer() {\n  const [state, dispatch] = useReducer(ordersReducer, { status: 'idle', orders: [] })\n\n  async function handleRequest(shouldFail: boolean) {\n    dispatch({ type: 'request_started' })\n\n    try {\n      const orders = await requestOrders(shouldFail)\n      dispatch({ type: 'request_succeeded', orders })\n    } catch (error: unknown) {\n      dispatch({\n        type: 'request_failed',\n        message: error instanceof Error ? error.message : 'Unknown order error',\n      })\n    }\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Async reducer</p>\n      <h3>Centralize lifecycle transitions</h3>\n      <div className=\"practice-actions\">\n        <button type=\"button\" onClick={() => handleRequest(false)}>Load orders</button>\n        <button type=\"button\" onClick={() => handleRequest(true)}>Fail request</button>\n      </div>\n      <p>Status: {state.status}</p>\n      <p>{state.orders.join(', ') || 'No retained orders'}</p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Union defines legal states/actions; the reducer only returns objects. Async handler has request side effect and translates outcome into action."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Load click dispatch pending; 450ms dispatch success after fulfilled; React displays orders in the next render. Fail then dispatch error and retain previous orders."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Each action/new state is a new object. Dispatch identity is stable; old state snapshot is not mutated. Promise is not stored in reducer state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Reducer unifies all transitions, so the error path will not forget to cancel the pending or incorrectly clear the trusted stale data."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "in reducer "
        },
        {
          "type": "inlineCode",
          "value": "await requestOrders()"
        },
        {
          "type": "text",
          "value": " not only violates the pure function, but also prevents the reducer from returning to the next state synchronously."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "Reducer execution fetch/timer/localStorage violates \"state transition calculation has no side effect\"."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Reducer should mainly include switch, calculation, map/filter/spread and return; if Promise/browser API appears, it is out of bounds."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerOrders/BuyerOrders complex lifecycle is suitable for reducer; a single local pending flag may not be needed."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section uses the pure reducer in Chapter 8 for async outcomes in Chapter 9, but the request ownership is still outside the reducer."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Async handler does external work; action reports results; reducer only calculates UI state."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-source-data-vs-derived-visible-data",
      "children": [
        {
          "type": "text",
          "value": "9.10 Source Data vs. Derived Visible Data"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Save "
        },
        {
          "type": "inlineCode",
          "value": "orders"
        },
        {
          "type": "text",
          "value": " and then "
        },
        {
          "type": "inlineCode",
          "value": "visibleOrders"
        },
        {
          "type": "text",
          "value": " as state will generate a second source; any changes in filters or orders must be updated simultaneously."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Fetched orders are source data; status filter is local criteria; visible list/count/total should all be derived in current render."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "fetched source data, derived visible data, client-side filter, redundant state. There are no new APIs in this section, the focus is on the async data lifecycle and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS executes filter/reduce; React only saves orders/filter Hook cells; browser/HTTP has no participation outside of load button mock; TS checks Order shape; tooling checks array methods; architecture insists on single source."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "component call creates a new visible array and number total from current orders and statusFilter. Setter only updates source facts, derived bindings do not own queues."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "filter"
        },
        {
          "type": "text",
          "value": " returns new array, "
        },
        {
          "type": "inlineCode",
          "value": "reduce"
        },
        {
          "type": "text",
          "value": " returns number; ordinary derived calculation does not require Effect or memo as a correctness condition."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "Array.prototype.filter(predicate)"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "reduce(callback, initialValue)"
        },
        {
          "type": "text",
          "value": "; Order status is constrained by literal union."
        }
      ]
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
                  "value": "Load button or filter select triggers source update."
                }
              ]
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
                  "value": "JS creates visible array and reduce accumulator in new render."
                }
              ]
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
                  "value": "React saves orders/filter snapshots but does not save visible list/count/total."
                }
              ]
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
                  "value": "Mock fetchedOrders enters state; no new HTTP operation."
                }
              ]
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
                  "value": "TS Check order.status/total, runtime data credibility should be completed earlier guard."
                }
              ]
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
                  "value": "UI is always derived from the same snapshot count/total."
                }
              ]
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
                  "value": "Duplicate visible state will retain the old list when the filter changes, resulting in count/list inconsistency."
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
      "label": "src/learning/react/chapter-09-async-data/10-derived-fetched-data/derived-order-summary.tsx",
      "value": "import { useState } from 'react'\n\ntype OrderStatus = 'pending' | 'shipped'\n\ntype Order = {\n  id: string\n  status: OrderStatus\n  total: number\n}\n\nconst fetchedOrders: Order[] = [\n  { id: 'ORD-1001', status: 'pending', total: 129 },\n  { id: 'ORD-1002', status: 'shipped', total: 84 },\n  { id: 'ORD-1003', status: 'pending', total: 215 },\n]\n\nexport function DerivedOrderSummary() {\n  const [orders, setOrders] = useState<Order[]>([])\n  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all')\n  const visibleOrders = orders.filter(\n    (order) => statusFilter === 'all' || order.status === statusFilter,\n  )\n  const visibleTotal = visibleOrders.reduce((total, order) => total + order.total, 0)\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Derived fetched data</p>\n      <h3>Keep filtered results out of state</h3>\n      <button type=\"button\" onClick={() => setOrders(fetchedOrders)}>Load fetched orders</button>\n      <label>\n        Status filter\n        <select\n          value={statusFilter}\n          onChange={(event) => setStatusFilter(event.currentTarget.value as 'all' | OrderStatus)}\n        >\n          <option value=\"all\">All</option>\n          <option value=\"pending\">Pending</option>\n          <option value=\"shipped\">Shipped</option>\n        </select>\n      </label>\n      <p>{visibleOrders.length} visible orders · ${visibleTotal.toFixed(2)}</p>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Orders and filter are the only states; visible array/total is calculated in the function body. Module mock represents fetched domain data that has passed validation."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Load, the orders reference is updated and renders 3; select pending to only update the filter, and new render derives 2 and $344."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Filter returns new array every time, but there is no persistent state identity. The Orders array keeps the source reference until the next fetch transition."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "read the orders/filter snapshots of the same render, and no second effect synchronization is required."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useEffect(() => setVisibleOrders(orders.filter(...)), [orders, filter])"
        },
        {
          "type": "text",
          "value": " will first render the stale list and then render the derived state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "Saving computable values in state violates minimal state. The specific bug is that the visible list still points to the old array after new fetch."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "A certain setter is only called after another state changes, and its value can be calculated from the current state, usually the redundant state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ProductList visible products, orders count/revenue and admin audit count should be derived from trusted fetched source."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section reuses the minimal state in Chapter 8, indicating that async data is no exception."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Fetch saves the trusted source; render derives the current view."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-custom-async-hooks-with-independent-state",
      "children": [
        {
          "type": "text",
          "value": "9.11 Custom Async Hooks with Independent State"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Multiple components repeated Effect/cleanup/lifecycle logic can extract hooks, but the two calls will not automatically share request, cache or state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Custom hook reuses the request protocol; state identity still belongs to the Hook positions of each caller component."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "custom async hook, hook call identity, independent resource state, logic reuse."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS calls ordinary function and creates Promise/return value; React registers internal Hooks to caller identity; browser timer simulates resource; HTTP is not involved; TS infers return union; linter identifies "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " rule; architecture clearly has no shared cache."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Two ProductResourceCard instances each call "
        },
        {
          "type": "inlineCode",
          "value": "useProductResource"
        },
        {
          "type": "text",
          "value": ". The same source function is executed twice, but the internal state/effect cells belong to A/B component identities."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Custom hook name starts with "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": "; can only be called at the top level of function component/custom hook.It can compose useState/useEffect."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "useProductResource(productId: string): ProductResourceState"
        },
        {
          "type": "text",
          "value": " is a local contract; React does not provide automatic dedupe/cache."
        }
      ]
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
                  "value": "A/B cards mount each triggers the committed productId Effect."
                }
              ]
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
                  "value": "JS creates two Promises, timers, ignore bindings and return state values."
                }
              ]
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
                  "value": "React saves independent Hook cells and Effect cleanup for each A/B."
                }
              ]
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
                  "value": "B 300ms, A 650ms were fulfilled respectively."
                }
              ]
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
                  "value": "TS guarantees return union, and runtime product response still needs to be verified."
                }
              ]
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
                  "value": "B first succeeds without changing A pending; each UI reads its own snapshot."
                }
              ]
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
                  "value": "mistakenly believes that sharing the cache with the same hook will lead to Header/Page repeated requests and different loading states."
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
      "label": "src/learning/react/chapter-09-async-data/11-custom-async-hook/custom-async-resource.tsx",
      "value": "import { useEffect, useState } from 'react'\n\ntype ProductResourceState =\n  | { status: 'pending' }\n  | { status: 'success'; name: string }\n  | { status: 'error'; message: string }\n\nfunction requestProductName(productId: string): Promise<string> {\n  return new Promise((resolve) => {\n    window.setTimeout(() => resolve(`Product ${productId}`), productId === 'A' ? 650 : 300)\n  })\n}\n\nfunction useProductResource(productId: string): ProductResourceState {\n  const [state, setState] = useState<ProductResourceState>({ status: 'pending' })\n\n  useEffect(() => {\n    let ignore = false\n\n    requestProductName(productId)\n      .then((name) => {\n        if (!ignore) setState({ status: 'success', name })\n      })\n      .catch((error: unknown) => {\n        if (!ignore) {\n          setState({\n            status: 'error',\n            message: error instanceof Error ? error.message : 'Unknown product error',\n          })\n        }\n      })\n\n    return () => {\n      ignore = true\n    }\n  }, [productId])\n\n  return state\n}\n\nfunction ProductResourceCard({ productId }: { productId: string }) {\n  const state = useProductResource(productId)\n\n  return (\n    <div className=\"resource-box\">\n      <strong>Resource {productId}</strong>\n      <span>{state.status === 'success' ? state.name : state.status}</span>\n    </div>\n  )\n}\n\nexport function CustomAsyncResource() {\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Custom async hook</p>\n      <h3>Reuse lifecycle logic without sharing state</h3>\n      <div className=\"resource-grid\">\n        <ProductResourceCard productId=\"A\" />\n        <ProductResourceCard productId=\"B\" />\n      </div>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Hook encapsulates state/effect/cleanup and returns the current union. Card is only responsible for rendering. A/B reuse implementation but there is no common provider/cache."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Mount are started; B settles first and renders success; A is still pending, and then succeeds independently."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Each call has independent state object, Promise, ignore binding and cleanup. Function definitions are shared, runtime values ​​are not shared."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React associates state according to caller component identity and Hook call position, rather than according to custom hook function address."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If two calls should share the same resource, owner/Context should be promoted or the query cache should be used in the future; repeated hook calls themselves will not dedupe."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "uses custom hooks as shared stores to confuse logic reuse with state ownership."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Network panel appears with the same URL multiple times, and multiple callers have loading states, indicating that they are independent resources."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Product cards can be fetched independently; if the Header badge and OrdersPage should be shared, they need a common owner and do not rely on a hook with the same name."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section inherits the custom hook call identity from Chapter 8 and adds Effect/Promise lifecycle."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Custom async hook shares protocol and does not automatically share request, state or cache."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-context-delivery-and-request-ownership",
      "children": [
        {
          "type": "text",
          "value": "9.12 Context Delivery and Request Ownership"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Deep child requires async state and refresh, but the intermediate layout is not used. Context can deliver resources, but cannot be responsible for fetch, validation or owner decision."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Provider component is still request owner; Context is just tree-scoped delivery channel. Custom context hook provides missing-provider guard."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "async resource Context, provider boundary, consumer guard, request owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JS provider creates value object/async function; React saves provider state and checks Context by tree; browser timer simulates request; HTTP/validation is omitted; TS checks nullable context; tooling checks Hooks; architecture limits provider scope."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "DeliveryProvider has state and refresh closure. DeepOrderStatus calls useContext to read the current value from the nearest provider. The Refresh event is still executing the request in the owner function."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React 19Use "
        },
        {
          "type": "inlineCode",
          "value": "<DeliveryContext value={...}>"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "useContext"
        },
        {
          "type": "text",
          "value": " reads the nearest provider; default null requires runtime guard."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "Provider fixed prop "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": "; Context value contract is "
        },
        {
          "type": "inlineCode",
          "value": "{ state, refresh }"
        },
        {
          "type": "text",
          "value": "; the hook name is "
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
              "value": "mechanism evidence chain:"
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
                  "value": "Deep button click calls the refresh callback in Context."
                }
              ]
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
                  "value": "JS provider closure creates Promise/result array and creates new value object in render."
                }
              ]
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
                  "value": "React owner queue pending/success, the consumer reads the nearest value and rerenders."
                }
              ]
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
                  "value": "Mock Promise fulfilled; the real request status/guard should still be processed by the provider owner."
                }
              ]
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
                  "value": "TS eliminate "
                },
                {
                  "type": "inlineCode",
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": " only because of runtime guard; orders body will not be verified."
                }
              ]
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
                  "value": "Provider state determines deep UI status."
                }
              ]
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
                  "value": "Context will hide the owner, criteria, cleanup and cache policy when fetching the library."
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
      "label": "src/learning/react/chapter-09-async-data/12-context-async-delivery/context-async-delivery.tsx",
      "value": "import { createContext, useContext, useState } from 'react'\nimport type { ReactNode } from 'react'\n\ntype DeliveryState =\n  | { status: 'idle'; orders: string[] }\n  | { status: 'pending'; orders: string[] }\n  | { status: 'success'; orders: string[] }\n  | { status: 'error'; orders: string[]; message: string }\n\ntype DeliveryContextValue = {\n  state: DeliveryState\n  refresh: () => void\n}\n\nconst DeliveryContext = createContext<DeliveryContextValue | null>(null)\n\nfunction useDeliveryContext() {\n  const value = useContext(DeliveryContext)\n  if (value === null) throw new Error('useDeliveryContext must be used within DeliveryProvider')\n  return value\n}\n\nfunction requestOrders(): Promise<string[]> {\n  return new Promise((resolve) => {\n    window.setTimeout(() => resolve(['ORD-1201', 'ORD-1202']), 450)\n  })\n}\n\nfunction DeliveryProvider({ children }: { children: ReactNode }) {\n  const [state, setState] = useState<DeliveryState>({ status: 'idle', orders: [] })\n\n  async function refresh() {\n    setState((current) => ({ status: 'pending', orders: current.orders }))\n\n    try {\n      const orders = await requestOrders()\n      setState({ status: 'success', orders })\n    } catch (error: unknown) {\n      setState((current) => ({\n        status: 'error',\n        orders: current.orders,\n        message: error instanceof Error ? error.message : 'Unknown delivery error',\n      }))\n    }\n  }\n\n  return <DeliveryContext value={{ state, refresh }}>{children}</DeliveryContext>\n}\n\nfunction DeepOrderStatus() {\n  const { state, refresh } = useDeliveryContext()\n\n  return (\n    <div>\n      <button type=\"button\" onClick={refresh}>Refresh deep order data</button>\n      <p>{state.status}: {state.orders.join(', ') || 'no orders'}</p>\n    </div>\n  )\n}\n\nexport function ContextAsyncDelivery() {\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Context delivery</p>\n      <h3>Deliver async state without hiding ownership</h3>\n      <DeliveryProvider>\n        <section>\n          <DeepOrderStatus />\n        </section>\n      </DeliveryProvider>\n    </article>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Context declares nullable boundary; guard provides clear runtime error. Provider owns request and state; consumer only reads contract and triggers intent."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Click calls the refresh created by provider render; the pending value is propagated; after Promise success, the new provider value enables the consumer to read orders."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "creates new "
        },
        {
          "type": "inlineCode",
          "value": "{ state, refresh }"
        },
        {
          "type": "text",
          "value": " reference. The Context object itself is module-stable; the state cell belongs to the provider identity."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Consumer can read across layers because of the nearest provider in the tree, not because Context becomes a global variable."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Treats the Context constant as a mutable store or calls a hook outside the provider, but there is no legal owner/update path."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "Context instead of validation/request management will make deep consumers receive untrusted data and make it difficult to locate the race."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Context file has overloaded responsibilities if it hides all URLs, cache, retry, parsing and has no owner description."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerOrders subtree can share resources; ProductDetail local data does not need to enter the app-wide Context."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section combines the Context delivery of Chapter 8 with the async owner of this chapter, while still maintaining the separation of responsibilities."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Context delivers the current resource; the owner is responsible for request, validation and transition."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-async-data-architecture-to-sellerhub",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping Async Data Architecture to SellerHub"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The criteria, lifetime, empty semantics and stale policy of different pages are different and cannot be unified into one app-wide "
        },
        {
          "type": "inlineCode",
          "value": "isLoading"
        },
        {
          "type": "text",
          "value": " or universal Context."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "First determine the resource owner and runtime boundary, and then select event/Effect, reducer, hook, and Context. Technical tools are no substitute for architectural judgment."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "resource owner, criteria lifetime, stale policy, not-found semantics, cache boundary. There are no new APIs in this section, the focus is on the async data lifecycle and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seventh layer boundary:"
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
          "value": "JavaScript executes request/parser/derived calculations; React saves page/provider snapshots; browser/HTTP processing transport/status; TypeScript modeling trusted domain; tooling verification Hooks/types; architecture determines scope and policy."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each resource must answer: who triggers, what are the criteria, which runtime checkpoints, who saves the lifecycle, how the old result expires, how empty/error is displayed, and what is the derived view."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "There is no new API in this section; the event/effect, AbortSignal, guard, reducer, hook and Context contracts of the previous 12 section are used."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/method name/parameter signature:"
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
          "value": "No React forced "
        },
        {
          "type": "inlineCode",
          "value": "ProductQuery"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "OrdersContext"
        },
        {
          "type": "text",
          "value": " name; fixed boundaries are fetch Response, Effect cleanup, Hook rules and typed transition."
        }
      ]
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
                  "value": "SellerOrders status change or Retry is the trigger."
                }
              ]
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
                  "value": "JS creates criteria snapshot, Promise, Response/body/parser values."
                }
              ]
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
                  "value": "React owner saves pending and last trusted orders, and reducer processes terminal action."
                }
              ]
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
                  "value": "Browser/HTTP may be network reject, non-2xx, invalid JSON or abort."
                }
              ]
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
                  "value": "TS narrows unknown to SellerOrder[] only after guard succeeds."
                }
              ]
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
                  "value": "Reducer status and orders length determine pending/stale/success/empty/error UI."
                }
              ]
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
                  "value": "If owner/cache/validation is hidden in the global Context, race and invalid data will spread across pages."
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
              "value": "SellerHub Scene table:"
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
        null,
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "page"
          }
        ],
        [
          {
            "type": "text",
            "value": "Criteria / owner"
          }
        ],
        [
          {
            "type": "text",
            "value": "Empty and error"
          }
        ],
        [
          {
            "type": "text",
            "value": "Obsolete protection"
          }
        ],
        [
          {
            "type": "text",
            "value": "Derived data"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "ProductListPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "category/search; page or resource hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty is no matching product"
            }
          ],
          [
            {
              "type": "text",
              "value": "abort/ignoreold query"
            }
          ],
          [
            {
              "type": "text",
              "value": "visible count/sort"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ProductDetailPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "productId; detail owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "404 is not-found, not empty list"
            }
          ],
          [
            {
              "type": "text",
              "value": "id change abort"
            }
          ],
          [
            {
              "type": "text",
              "value": "price label/availability"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "BuyerOrdersPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "user/order status; page owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty is no order yet"
            }
          ],
          [
            {
              "type": "text",
              "value": "auth/user change invalid"
            }
          ],
          [
            {
              "type": "text",
              "value": "count/total"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "SellerOrdersPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "status criteria; provider owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty/error branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "abort + ignore"
            }
          ],
          [
            {
              "type": "text",
              "value": "visible count/revenue"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "AdminProductsPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "audit criteria; workspace owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty audit queue"
            }
          ],
          [
            {
              "type": "text",
              "value": "criteria epoch"
            }
          ],
          [
            {
              "type": "text",
              "value": "issue count"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Auth bootstrap"
            }
          ],
          [
            {
              "type": "text",
              "value": "session; layout owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "anonymous is the legal final state"
            }
          ],
          [
            {
              "type": "text",
              "value": "logout/user switch failure"
            }
          ],
          [
            {
              "type": "text",
              "value": "permission view"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "CartPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "client cart owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty cart is local state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Normally no fetch race"
            }
          ],
          [
            {
              "type": "text",
              "value": "subtotal/count"
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
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: SellerHub resource boundary",
      "value": "type ResourceBoundary = {\n  owner: string\n  criteria: string[]\n  trigger: 'event' | 'effect'\n  stalePolicy: 'clear' | 'retain'\n  delivery: 'props' | 'context'\n}\n\nconst sellerOrdersBoundary: ResourceBoundary = {\n  owner: 'SellerOrdersProvider',\n  criteria: ['status'],\n  trigger: 'effect',\n  stalePolicy: 'retain',\n  delivery: 'context',\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Worksheet explicitly records owner, criteria, trigger, stale policy and delivery; it does not implement request and only forces designers to answer boundary questions first."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Status event changes criteria first; committed criteria Effect starts request; old epoch cleanup; parser verifies body; reducertransition; Context delivers new state; summary is derived from orders."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Variables, references and async state changes:"
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
          "value": "Criteria string and request version are source; Promise/Response/unknown body is transient runtime values; validated orders enter reducer state; count/revenue is only generated in render."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each layer only assumes its own responsibilities, and any failure can be located in trigger, transport, status, parse, validation, transition or delivery."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "a "
        },
        {
          "type": "inlineCode",
          "value": "GlobalDataContext"
        },
        {
          "type": "text",
          "value": " saving products/orders/auth/cart/loading/error will cause unrelated resources to share boolean and lifetime."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rules violated:"
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
          "value": "CartPage is usually the local/client state; forcing it into the async model will create a non-existent network lifecycle. On the contrary, remote orders lacking async union will miss the real failure."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "cannot answer \"Which criterion and which request has the current data\", the architecture is not complete."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section is the design checklist before migrating from the learning exercise to the SellerHub page; the subsequent TanStack Query will take over the cache/dedupe/background refetch, but will not replace runtime validation and UI semantics."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "It summarizes chapters 3–9: props transfer contract, state save snapshot, Effect synchronization, reducer calculation transition, Context delivery, hook reuse logic."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Draw the resource evidence chain first, and then select React API; do not do the other way around."
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
            "value": "Key Behavior"
          }
        ],
        [
          {
            "type": "text",
            "value": "Common misunderstandings"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "Promise<T>"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending then fulfilled T or rejected reason"
            }
          ],
          [
            {
              "type": "text",
              "value": "Promise pending equals React loading"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "async"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "await"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pauses async continuation without blocking browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "React will wait for handler"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "fetch(input, init?)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "Return to "
            },
            {
              "type": "inlineCode",
              "value": "Promise<Response>"
            }
          ],
          [
            {
              "type": "text",
              "value": "404 will reject"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "response.ok"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / HTTP"
            }
          ],
          [
            {
              "type": "text",
              "value": "status true"
            }
          ],
          [
            {
              "type": "text",
              "value": "fulfilled Response must be ok"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "response.status"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / HTTP"
            }
          ],
          [
            {
              "type": "text",
              "value": "HTTP numeric status"
            }
          ],
          [
            {
              "type": "text",
              "value": "network error also has Response"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "response.json()"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / JS"
            }
          ],
          [
            {
              "type": "text",
              "value": "reads the body and parse it as JS value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Automatically verify domain type"
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
              "value": "Browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "requests cancellation of operation"
            }
          ],
          [
            {
              "type": "text",
              "value": "cleanup automatically cancels fetch"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useEffect"
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
              "value": "commit"
            }
          ],
          [
            {
              "type": "text",
              "value": "All fetch must put Effect"
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
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "text",
              "value": "queue action and calculate next async state"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer can execute request"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "unknown"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "prevents direct use of"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime will automatically verify"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "type predicate"
            }
          ],
          [
            {
              "type": "text",
              "value": "TS + JS"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime boolean check supports narrowing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only signature can be verified"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Awaited<T>"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "simulates await recursion unwrap Promise type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Change runtime Promise"
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
            "value": "Specific bug"
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
            "value": "Fix / Recognition"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Multiple lifecycle booleans"
            }
          ],
          [
            {
              "type": "text",
              "value": "loading and error both display"
            }
          ],
          [
            {
              "type": "text",
              "value": "Mutually exclusive state should be single discriminant"
            }
          ],
          [
            {
              "type": "text",
              "value": "async union/reducer"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "json() as Order[]"
            }
          ],
          [
            {
              "type": "text",
              "value": "invalid field crashes in render"
            }
          ],
          [
            {
              "type": "text",
              "value": "annotation does not do runtime validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "unknown + guard/parser"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "only catch network error"
            }
          ],
          [
            {
              "type": "text",
              "value": "404 body was treated as success"
            }
          ],
          [
            {
              "type": "text",
              "value": "fetch fulfilled does not represent HTTP success"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check ok/status"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Empty when error"
            }
          ],
          [
            {
              "type": "text",
              "value": "No order display fault"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty is the successful result"
            }
          ],
          [
            {
              "type": "text",
              "value": "length 0Independent branch"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Effect reads criteria but "
            },
            {
              "type": "inlineCode",
              "value": "[]"
            }
          ],
          [
            {
              "type": "text",
              "value": "label does not match result"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependencydishonest"
            }
          ],
          [
            {
              "type": "text",
              "value": "List all reactive criteria"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "No cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "old result overrides new criteria"
            }
          ],
          [
            {
              "type": "text",
              "value": "obsolete epoch should not write state"
            }
          ],
          [
            {
              "type": "text",
              "value": "abort or ignore"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "only clear timer"
            }
          ],
          [
            {
              "type": "text",
              "value": "Promise still writes state"
            }
          ],
          [
            {
              "type": "text",
              "value": "cleanup did not close completion permission"
            }
          ],
          [
            {
              "type": "text",
              "value": "signal + ignore"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Reducer fetch"
            }
          ],
          [
            {
              "type": "text",
              "value": "Strict Mode may duplicate side effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer must be pure"
            }
          ],
          [
            {
              "type": "text",
              "value": "request at handler/Effect"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Save visible data"
            }
          ],
          [
            {
              "type": "text",
              "value": "count/list out of sync"
            }
          ],
          [
            {
              "type": "text",
              "value": "derived data should not be copied"
            }
          ],
          [
            {
              "type": "text",
              "value": "render filter/reduce"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Retry put Effect boolean"
            }
          ],
          [
            {
              "type": "text",
              "value": "unrelated render triggers request"
            }
          ],
          [
            {
              "type": "text",
              "value": "event intent should be in handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "retry callback/version"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "same hook as shared cache"
            }
          ],
          [
            {
              "type": "text",
              "value": "duplicate requests/loading"
            }
          ],
          [
            {
              "type": "text",
              "value": "logic reuse is not equal to shared state"
            }
          ],
          [
            {
              "type": "text",
              "value": "common owner/query cache"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Context when fetch library"
            }
          ],
          [
            {
              "type": "text",
              "value": "owner/validation/raceHide"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context only delivers value"
            }
          ],
          [
            {
              "type": "text",
              "value": "providerclear resource contract"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "does not distinguish between stale/pending"
            }
          ],
          [
            {
              "type": "text",
              "value": "Old data suddenly disappears during refresh"
            }
          ],
          [
            {
              "type": "text",
              "value": "stale policy is not defined"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending member retain/clear clear"
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
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Seller Orders Async Workspace"
            }
          ]
        },
        {
          "type": "text",
          "value": " simulates the SellerHub order list. It supports criteria switching, pending/success/empty/error, retry, stale orders, abort/ignore, unknown parser, typed reducer, custom hook, Context and derived summary."
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
      "label": "Seller Orders Async Workspace structure",
      "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/\n  seller-order-types.ts\n  seller-order-response-guard.ts\n  seller-order-request.ts\n  seller-orders-reducer.ts\n  use-seller-orders-resource.ts\n  seller-orders-context.ts\n  seller-orders-provider.tsx\n  seller-orders-toolbar.tsx\n  seller-orders-list.tsx\n  seller-orders-summary.tsx\n  seller-orders-async-workspace.tsx\n  seller-orders-async-workspace.css"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "123-document-responsibility",
      "children": [
        {
          "type": "text",
          "value": "12.3 Document Responsibility"
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
              "value": "seller-order-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Domain, criteria, async state, action and resource contract"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-order-response-guard.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "verified unknown body as SellerOrder[]"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-order-request.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Abortable local mock request"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-reducer.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure lifecycle transitions and stale data policy"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "use-seller-orders-resource.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Criteria owner, Effect, abort/ignore, retry and parser orchestration"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-context.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Typed Context and consumer guard"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-provider.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Resource owner/provider boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-toolbar.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Child criteria/retry intent"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-list.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pending/stale/success/empty/error branches"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derived count/revenue"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-async-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Composition root"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-orders-async-workspace.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Final project partial style"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "124-full-code",
      "children": [
        {
          "type": "text",
          "value": "12.4 Full code"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-types.ts",
      "value": "export type SellerOrderStatus = 'pending' | 'shipped'\n\nexport type SellerOrderCriteria =\n  | 'all'\n  | SellerOrderStatus\n  | 'cancelled'\n  | 'request-error'\n\nexport type SellerOrder = {\n  id: string\n  customerName: string\n  status: SellerOrderStatus\n  total: number\n}\n\nexport type SellerOrdersState =\n  | { status: 'idle'; orders: SellerOrder[] }\n  | { status: 'pending'; orders: SellerOrder[] }\n  | { status: 'success'; orders: SellerOrder[] }\n  | { status: 'empty'; orders: SellerOrder[] }\n  | { status: 'error'; orders: SellerOrder[]; message: string }\n\nexport type SellerOrdersAction =\n  | { type: 'request_started' }\n  | { type: 'request_succeeded'; orders: SellerOrder[] }\n  | { type: 'request_failed'; message: string }\n\nexport type SellerOrdersResource = {\n  criteria: SellerOrderCriteria\n  state: SellerOrdersState\n  setCriteria: (criteria: SellerOrderCriteria) => void\n  retry: () => void\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "These types separate criteria, trusted domain, lifecycle and actions. All are erased after Emit, and the runtime trust comes from guard."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-response-guard.ts",
      "value": "import type { SellerOrder, SellerOrderStatus } from './seller-order-types'\n\nfunction isRecord(value: unknown): value is Record<string, unknown> {\n  return typeof value === 'object' && value !== null\n}\n\nfunction isSellerOrderStatus(value: unknown): value is SellerOrderStatus {\n  return value === 'pending' || value === 'shipped'\n}\n\nfunction isSellerOrder(value: unknown): value is SellerOrder {\n  if (!isRecord(value)) return false\n\n  return (\n    typeof value.id === 'string' &&\n    typeof value.customerName === 'string' &&\n    isSellerOrderStatus(value.status) &&\n    typeof value.total === 'number'\n  )\n}\n\nexport function parseSellerOrdersResponse(value: unknown): SellerOrder[] {\n  if (!isRecord(value) || !Array.isArray(value.orders) || !value.orders.every(isSellerOrder)) {\n    throw new Error('Seller orders response has an invalid shape')\n  }\n\n  return value.orders\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Parser checks the container, orders array and each order layer by layer. Throw converts the invalid body into a request failure instead of deferring the error to the UI."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-request.ts",
      "value": "import type { SellerOrder, SellerOrderCriteria } from './seller-order-types'\n\nconst sellerOrders: SellerOrder[] = [\n  { id: 'ORD-2101', customerName: 'Avery Chen', status: 'pending', total: 148 },\n  { id: 'ORD-2102', customerName: 'Jordan Lee', status: 'shipped', total: 92 },\n  { id: 'ORD-2103', customerName: 'Morgan Diaz', status: 'pending', total: 235 },\n]\n\nfunction waitForRequest(delay: number, signal: AbortSignal): Promise<void> {\n  return new Promise((resolve, reject) => {\n    const handleAbort = () => {\n      window.clearTimeout(timeoutId)\n      reject(new DOMException('Seller orders request aborted', 'AbortError'))\n    }\n\n    const timeoutId = window.setTimeout(() => {\n      signal.removeEventListener('abort', handleAbort)\n      resolve()\n    }, delay)\n\n    signal.addEventListener('abort', handleAbort, { once: true })\n\n    if (signal.aborted) handleAbort()\n  })\n}\n\nexport async function requestSellerOrders(\n  criteria: SellerOrderCriteria,\n  signal: AbortSignal,\n): Promise<unknown> {\n  const delay = criteria === 'pending' ? 850 : 400\n  await waitForRequest(delay, signal)\n\n  if (criteria === 'request-error') {\n    throw new Error('Seller orders service unavailable')\n  }\n\n  if (criteria === 'cancelled') {\n    return { orders: [] }\n  }\n\n  const orders =\n    criteria === 'all' ? sellerOrders : sellerOrders.filter((order) => order.status === criteria)\n\n  return { orders }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Mock returns "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " on purpose and consumes AbortSignal.Real fetch wrapper would check "
        },
        {
          "type": "inlineCode",
          "value": "Response.ok/status"
        },
        {
          "type": "text",
          "value": " before returningparsed unknown body."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-reducer.ts",
      "value": "import type { SellerOrdersAction, SellerOrdersState } from './seller-order-types'\n\nexport const initialSellerOrdersState: SellerOrdersState = {\n  status: 'pending',\n  orders: [],\n}\n\nfunction assertNever(action: never): never {\n  throw new Error(`Unhandled seller orders action: ${JSON.stringify(action)}`)\n}\n\nexport function sellerOrdersReducer(\n  state: SellerOrdersState,\n  action: SellerOrdersAction,\n): SellerOrdersState {\n  switch (action.type) {\n    case 'request_started':\n      return { status: 'pending', orders: state.orders }\n    case 'request_succeeded':\n      return action.orders.length === 0\n        ? { status: 'empty', orders: [] }\n        : { status: 'success', orders: action.orders }\n    case 'request_failed':\n      return { status: 'error', orders: state.orders, message: action.message }\n    default:\n      return assertNever(action)\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Reducer retains previous orders for pending/error stale UI; success empty is determined by array length. No Promise, timer, Context or mutation."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/use-seller-orders-resource.ts",
      "value": "import { useEffect, useReducer, useState } from 'react'\nimport { parseSellerOrdersResponse } from './seller-order-response-guard'\nimport { requestSellerOrders } from './seller-order-request'\nimport type { SellerOrderCriteria, SellerOrdersResource } from './seller-order-types'\nimport { initialSellerOrdersState, sellerOrdersReducer } from './seller-orders-reducer'\n\nexport function useSellerOrdersResource(): SellerOrdersResource {\n  const [criteria, setCriteriaState] = useState<SellerOrderCriteria>('all')\n  const [requestVersion, setRequestVersion] = useState(0)\n  const [state, dispatch] = useReducer(sellerOrdersReducer, initialSellerOrdersState)\n\n  useEffect(() => {\n    const controller = new AbortController()\n    let ignore = false\n\n    requestSellerOrders(criteria, controller.signal)\n      .then((body) => parseSellerOrdersResponse(body))\n      .then((orders) => {\n        if (!ignore) dispatch({ type: 'request_succeeded', orders })\n      })\n      .catch((error: unknown) => {\n        if (ignore || (error instanceof DOMException && error.name === 'AbortError')) return\n        dispatch({\n          type: 'request_failed',\n          message: error instanceof Error ? error.message : 'Unknown seller orders error',\n        })\n      })\n\n    return () => {\n      ignore = true\n      controller.abort()\n    }\n  }, [criteria, requestVersion])\n\n  function setCriteria(nextCriteria: SellerOrderCriteria) {\n    dispatch({ type: 'request_started' })\n    setCriteriaState(nextCriteria)\n  }\n\n  function retry() {\n    dispatch({ type: 'request_started' })\n    setRequestVersion((current) => current + 1)\n  }\n\n  return { criteria, state, setCriteria, retry }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Hook is the resource owner: criteria/retry is the source state, Effect synchronization request, cleanup abort+ignore, parser before dispatch success. Each hook call is still independent."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-context.ts",
      "value": "import { createContext, useContext } from 'react'\nimport type { SellerOrdersResource } from './seller-order-types'\n\nexport const SellerOrdersContext = createContext<SellerOrdersResource | null>(null)\n\nexport function useSellerOrdersContext(): SellerOrdersResource {\n  const value = useContext(SellerOrdersContext)\n\n  if (value === null) {\n    throw new Error('useSellerOrdersContext must be used within SellerOrdersProvider')\n  }\n\n  return value\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Context only delivers the resource contract; runtime guard converts the missing provider into an error close to the cause."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-provider.tsx",
      "value": "import type { ReactNode } from 'react'\nimport { SellerOrdersContext } from './seller-orders-context'\nimport { useSellerOrdersResource } from './use-seller-orders-resource'\n\nexport function SellerOrdersProvider({ children }: { children: ReactNode }) {\n  const resource = useSellerOrdersResource()\n\n  return <SellerOrdersContext value={resource}>{children}</SellerOrdersContext>\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Provider calls the resource hook once and determines the sharing boundary. Multiple consumers share because of the same provider, not because hooks automatically share."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-toolbar.tsx",
      "value": "import type { SellerOrderCriteria } from './seller-order-types'\nimport { useSellerOrdersContext } from './seller-orders-context'\n\nexport function SellerOrdersToolbar() {\n  const { criteria, retry, setCriteria, state } = useSellerOrdersContext()\n\n  return (\n    <div className=\"orders-toolbar\">\n      <label>\n        Request criteria\n        <select\n          value={criteria}\n          onChange={(event) => setCriteria(event.currentTarget.value as SellerOrderCriteria)}\n        >\n          <option value=\"all\">All orders</option>\n          <option value=\"pending\">Pending orders</option>\n          <option value=\"shipped\">Shipped orders</option>\n          <option value=\"cancelled\">Empty result</option>\n          <option value=\"request-error\">Request error</option>\n        </select>\n      </label>\n      <button type=\"button\" onClick={retry} disabled={state.status === 'pending'}>\n        Retry current criteria\n      </button>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Toolbar child only expresses criteria/retry intent. Disable retry when Pending to avoid repeated queuing of the same button; criteria can still be quickly switched to observe abort/race protection."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-list.tsx",
      "value": "import { useSellerOrdersContext } from './seller-orders-context'\n\nexport function SellerOrdersList() {\n  const { state } = useSellerOrdersContext()\n\n  if (state.status === 'pending' && state.orders.length === 0) {\n    return <p className=\"orders-feedback\">Loading seller orders...</p>\n  }\n\n  if (state.status === 'empty') {\n    return <p className=\"orders-feedback\">No orders match the current criteria.</p>\n  }\n\n  if (state.status === 'error' && state.orders.length === 0) {\n    return <p className=\"orders-feedback status-error\">{state.message}</p>\n  }\n\n  return (\n    <div>\n      {state.status === 'pending' && (\n        <p className=\"orders-feedback\">Refreshing while previous orders remain visible...</p>\n      )}\n      {state.status === 'error' && (\n        <p className=\"orders-feedback status-error\">{state.message}</p>\n      )}\n      <div className=\"orders-list\">\n        {state.orders.map((order) => (\n          <article className=\"order-row\" key={order.id}>\n            <div>\n              <strong>{order.id}</strong>\n              <span>{order.customerName}</span>\n            </div>\n            <span className={`order-status order-status-${order.status}`}>{order.status}</span>\n            <strong>${order.total.toFixed(2)}</strong>\n          </article>\n        ))}\n      </div>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "List clearly distinguishes between initial pending, refresh with stale data, empty, error without data, error with stale data and success list. Stable order id as key."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-summary.tsx",
      "value": "import { useSellerOrdersContext } from './seller-orders-context'\n\nexport function SellerOrdersSummary() {\n  const { criteria, state } = useSellerOrdersContext()\n  const visibleOrderCount = state.orders.length\n  const visibleRevenue = state.orders.reduce((total, order) => total + order.total, 0)\n\n  return (\n    <aside className=\"orders-summary\" aria-labelledby=\"orders-summary-title\">\n      <p className=\"project-eyebrow\">Derived from fetched source data</p>\n      <h3 id=\"orders-summary-title\">Current result</h3>\n      <dl>\n        <div>\n          <dt>Criteria</dt>\n          <dd>{criteria}</dd>\n        </div>\n        <div>\n          <dt>Lifecycle</dt>\n          <dd>{state.status}</dd>\n        </div>\n        <div>\n          <dt>Visible orders</dt>\n          <dd>{visibleOrderCount}</dd>\n        </div>\n        <div>\n          <dt>Visible revenue</dt>\n          <dd>${visibleRevenue.toFixed(2)}</dd>\n        </div>\n      </dl>\n    </aside>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Count/revenue is the derived bindings of the current orders snapshot. It has no setter and will not fork with the list."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.tsx",
      "value": "import { SellerOrdersList } from './seller-orders-list'\nimport { SellerOrdersProvider } from './seller-orders-provider'\nimport { SellerOrdersSummary } from './seller-orders-summary'\nimport { SellerOrdersToolbar } from './seller-orders-toolbar'\nimport './seller-orders-async-workspace.css'\n\nfunction SellerOrdersWorkspaceContent() {\n  return (\n    <section className=\"seller-orders-workspace\" aria-labelledby=\"seller-orders-title\">\n      <header className=\"seller-orders-header\">\n        <div>\n          <p className=\"project-eyebrow\">Final mini project</p>\n          <h2 id=\"seller-orders-title\">Seller Orders Async Workspace</h2>\n          <p>\n            Change request criteria, observe lifecycle transitions, preserve stale results,\n            retry failures, and ignore obsolete requests.\n          </p>\n        </div>\n        <SellerOrdersToolbar />\n      </header>\n\n      <div className=\"seller-orders-layout\">\n        <SellerOrdersList />\n        <SellerOrdersSummary />\n      </div>\n    </section>\n  )\n}\n\nexport function SellerOrdersAsyncWorkspace() {\n  return (\n    <SellerOrdersProvider>\n      <SellerOrdersWorkspaceContent />\n    </SellerOrdersProvider>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Content must be under the provider to read the Context. Composition root does not contain request details."
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.css",
      "value": ".seller-orders-workspace {\n  margin-top: 64px;\n  padding: 28px;\n  border: 1px solid #b7c6cf;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.seller-orders-header {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);\n  gap: 28px;\n  align-items: end;\n  padding-bottom: 24px;\n  border-bottom: 1px solid #d7e0e5;\n}\n\n.seller-orders-header h2 {\n  margin: 8px 0;\n  color: #172033;\n  font-size: 2rem;\n}\n\n.seller-orders-header p:last-child {\n  max-width: 670px;\n  margin: 0;\n  color: #5f6c7b;\n  line-height: 1.6;\n}\n\n.orders-toolbar {\n  display: grid;\n  gap: 10px;\n}\n\n.orders-toolbar label {\n  display: grid;\n  gap: 6px;\n  color: #344054;\n  font-weight: 750;\n}\n\n.orders-toolbar select {\n  padding: 10px;\n  color: #172033;\n  border: 1px solid #8fa3b1;\n  border-radius: 7px;\n  background: #ffffff;\n}\n\n.seller-orders-workspace button {\n  padding: 10px 13px;\n  color: #ffffff;\n  border: 1px solid #125d73;\n  border-radius: 7px;\n  background: #125d73;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n.seller-orders-workspace button:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\n\n.seller-orders-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.55fr) minmax(250px, 0.65fr);\n  gap: 22px;\n  padding-top: 24px;\n}\n\n.orders-list {\n  display: grid;\n  gap: 10px;\n}\n\n.order-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 18px;\n  padding: 17px;\n  border: 1px solid #d7e0e5;\n  border-radius: 8px;\n}\n\n.order-row > div {\n  display: grid;\n  gap: 4px;\n}\n\n.order-row span {\n  color: #667085;\n}\n\n.order-status {\n  padding: 4px 8px;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n\n.order-status-pending {\n  color: #7a4d00;\n  background: #fff1c2;\n}\n\n.order-status-shipped {\n  color: #075f4d;\n  background: #cef2e8;\n}\n\n.orders-feedback {\n  padding: 18px;\n  color: #526071;\n  border: 1px dashed #8fa3b1;\n  border-radius: 8px;\n}\n\n.status-error {\n  color: #a33126;\n}\n\n.orders-summary {\n  padding: 20px;\n  border: 1px solid #b7c6cf;\n  border-radius: 8px;\n  background: #f4f8f9;\n}\n\n.orders-summary h3 {\n  margin: 8px 0 18px;\n}\n\n.orders-summary dl {\n  display: grid;\n  gap: 12px;\n  margin: 0;\n}\n\n.orders-summary dl div {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n}\n\n.orders-summary dd {\n  margin: 0;\n  font-weight: 850;\n}\n\n@media (max-width: 820px) {\n  .seller-orders-header,\n  .seller-orders-layout {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 560px) {\n  .seller-orders-workspace {\n    padding: 20px;\n  }\n\n  .order-row {\n    grid-template-columns: 1fr;\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "CSS is only responsible for layout/feedback presentation and does not change the request lifecycle. Responsive rules keep narrow screens from overlapping."
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
                  "type": "text",
                  "value": "Provider calls "
                },
                {
                  "type": "inlineCode",
                  "value": "useSellerOrdersResource"
                },
                {
                  "type": "text",
                  "value": ", becomes criteria and async state owner."
                }
              ]
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
                  "value": "Initial Effect is "
                },
                {
                  "type": "inlineCode",
                  "value": "all"
                },
                {
                  "type": "text",
                  "value": " Create controller, Promise and ignore binding."
                }
              ]
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
                  "value": "Mock body first as "
                },
                {
                  "type": "inlineCode",
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": " enters parser; dispatch success after guard succeeds."
                }
              ]
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
                  "value": "Toolbar first dispatch pending when modifying criteria, and then commit criteria; Effect cleanup abort/ignore old request."
                }
              ]
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
                  "value": "Reducer retains previous orders, so refresh/error can display stale data."
                }
              ]
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
                  "value": "List selects UI according to status/orders length; Summary derives count/revenue from the same orders snapshot."
                }
              ]
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
                  "value": "Retry increment requestVersion, the same criteria can also generate new request epoch."
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
                  "type": "text",
                  "value": "Reducer; it remains pure."
                }
              ]
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
                  "value": "Context does not verify the body or send the request, but only delivers the resource."
                }
              ]
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
                  "value": "Hook Each call is independent by default; this project is shared through a single provider call."
                }
              ]
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
                  "value": "requestSellerOrders"
                },
                {
                  "type": "text",
                  "value": " Return to "
                },
                {
                  "type": "inlineCode",
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": ", prevent mock type from covering the runtime boundary."
                }
              ]
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
                  "value": "Abort and ignore exist at the same time: the former cancels the supported work, and the latter closes the old continuation write permission."
                }
              ]
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
                  "value": "Count/revenue has no state setter to avoid derived duplication."
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
        },
        {
          "type": "text",
          "value": " Async UI comes from clear triggers, runtime checkpoints, current request ownership and mutually exclusive lifecycle state."
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
            "value": "Scene"
          }
        ],
        [
          {
            "type": "text",
            "value": "Priority mechanism"
          }
        ],
        [
          {
            "type": "text",
            "value": "should not be used"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Click to search/try again"
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
              "type": "inlineCode",
              "value": "shouldFetch"
            },
            {
              "type": "text",
              "value": " boolean Effect"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "criteria must be synchronized with"
            }
          ],
          [
            {
              "type": "text",
              "value": "Effect + honest deps"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty dependency"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "cancel old request"
            }
          ],
          [
            {
              "type": "text",
              "value": "AbortController"
            }
          ],
          [
            {
              "type": "text",
              "value": "Assume Promise automatically cancels"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "operation cannot be canceled"
            }
          ],
          [
            {
              "type": "text",
              "value": "ignore/request id"
            }
          ],
          [
            {
              "type": "text",
              "value": "last completion wins"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "external body"
            }
          ],
          [
            {
              "type": "text",
              "value": "unknown + guard/parser"
            }
          ],
          [
            {
              "type": "text",
              "value": "direct "
            },
            {
              "type": "inlineCode",
              "value": "as Domain[]"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "complex lifecycle"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer"
            }
          ],
          [
            {
              "type": "text",
              "value": "fetch in reducer"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "deep delivery"
            }
          ],
          [
            {
              "type": "text",
              "value": "narrow Context"
            }
          ],
          [
            {
              "type": "text",
              "value": "global loading/error Context"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "filtered count"
            }
          ],
          [
            {
              "type": "text",
              "value": "render derivation"
            }
          ],
          [
            {
              "type": "text",
              "value": "duplicate state"
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
              "value": "Minimum request template:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Template: guarded fetch boundary",
      "value": "export async function fetchUnknown(url: string, signal: AbortSignal): Promise<unknown> {\n  const response = await fetch(url, { signal })\n  if (!response.ok) throw new Error(`HTTP ${response.status}`)\n  return response.json()\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This template only completes the transport/status/body parse; the caller must still use the domain parser to verify the returned unknown."
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
            "value": "File path"
          }
        ],
        [
          {
            "type": "text",
            "value": "Responsibilities"
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
              "value": "docs/react/chapter-09-async-data/react-chapter-09-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 9 Study Guide"
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
              "value": "src/learning/react/chapter-09-async-data/chapter-09-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Entrance to this chapter"
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
              "value": "src/learning/react/chapter-09-async-data/chapter-09-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter shares the style"
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
              "value": "src/learning/react/chapter-09-async-data/01-async-data-boundary/async-data-source-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Async source boundary"
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
              "value": "src/learning/react/chapter-09-async-data/02-async-state-union/async-lifecycle-union.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Lifecycle union"
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
              "value": "src/learning/react/chapter-09-async-data/03-http-error-boundary/http-response-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "HTTP/network/JSON boundary"
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
              "value": "src/learning/react/chapter-09-async-data/04-event-driven-fetch/event-driven-product-search.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Event request"
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
              "value": "src/learning/react/chapter-09-async-data/05-effect-driven-fetch/effect-driven-product-query.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Effect criteria request"
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
              "value": "src/learning/react/chapter-09-async-data/06-abort-obsolete-result/abort-obsolete-request.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Abort cleanup"
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
              "value": "src/learning/react/chapter-09-async-data/07-race-condition/race-condition-protection.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Race protection"
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
              "value": "src/learning/react/chapter-09-async-data/08-runtime-type-guard/unknown-response-guard.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime guard"
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
              "value": "src/learning/react/chapter-09-async-data/09-async-reducer/async-lifecycle-reducer.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Async reducer"
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
              "value": "src/learning/react/chapter-09-async-data/10-derived-fetched-data/derived-order-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derived fetched data"
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
              "value": "src/learning/react/chapter-09-async-data/11-custom-async-hook/custom-async-resource.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Custom async hook"
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
              "value": "src/learning/react/chapter-09-async-data/12-context-async-delivery/context-async-delivery.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context delivery"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Domain/type contracts"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-response-guard.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime parser"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-request.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Abortable mock request"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-reducer.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure lifecycle reducer"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/use-seller-orders-resource.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Resource custom hook"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-context.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context contract/guard"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-provider.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Provider owner"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-toolbar.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Criteria/retry intent"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-list.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Lifecycle UI branches"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derived summary"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Final composition"
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
              "value": "src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Final project styles"
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
              "value": "README.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 9 Route, state and path"
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
              "value": "mount chapter 9 entrance"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "There is no need to create these concept fragments:"
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
                  "value": "Snippet: SellerHub resource boundary"
                }
              ]
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
                  "value": "Template: guarded fetch boundary"
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
          "value": "Write an evidence chain card for each resource:"
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
                  "value": "Trigger: event is still committed criteria."
                }
              ]
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
                  "value": "Runtime: Promise, Response, status, body, guard."
                }
              ]
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
                  "value": "Owner: Which component/hook/provider saves the criteria and async state."
                }
              ]
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
                  "value": "Obsolete policy: abort, ignore or request id."
                }
              ]
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
                  "value": "UI: pending, stale, success, empty, error."
                }
              ]
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
                  "value": "Derived: Which count/filter/total does not enter state."
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
                  "value": "Async data not equal to ordinary local state?"
                }
              ]
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
                  "value": "Why do multiple booleans produce impossible lifecycle?"
                }
              ]
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
                  "value": "Fetch reject? Why does 404 usually not reject?"
                }
              ]
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
                  "value": "response.json()"
                },
                {
                  "type": "text",
                  "value": " accomplish and what did it fail to accomplish?"
                }
              ]
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
                  "value": "as Product[]"
                },
                {
                  "type": "text",
                  "value": " is not runtime validation?"
                }
              ]
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
                  "value": "What is the difference in triggers between Event-driven and Effect-driven requests?"
                }
              ]
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
                  "value": "Effect dependency contain all request criteria?"
                }
              ]
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
                  "value": "Abort and ignore solve respectively?"
                }
              ]
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
                  "value": "Race condition different from Promise start order?"
                }
              ]
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
                  "value": "Reducer fetch?"
                }
              ]
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
                  "value": "Pending/error?"
                }
              ]
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
                  "value": "Visible orders/count/revenueWhy is derived data?"
                }
              ]
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
                  "value": "Why don't two custom hook calls automatically share request state?"
                }
              ]
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
                  "value": "Context not data fetching/cache library?"
                }
              ]
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
                  "value": "SellerHubWhich pages are async resources? Why are CartPage usually not?"
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
      "type": "code",
      "language": "txt",
      "label": "Final async data memory model",
      "value": "trigger -> request criteria -> Promise\n  -> network outcome\n  -> HTTP status\n  -> body parse\n  -> runtime validation\n  -> lifecycle transition\n  -> current render snapshot\n  -> pending / stale / success / empty / error UI\n\ncleanup closes the previous request epoch.\nderived view data is calculated, not copied.\nContext delivers state; custom hooks reuse logic; neither creates a cache automatically."
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
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "React official document (main basis):"
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
                  "value": ": commit, dependency, cleanup, and fetch cancel/ignore."
                }
              ]
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
                  "value": ": Event logic and derived data should not be misplaced in Effect."
                }
              ]
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
                  "value": ": event is non-reactive, Effect reactive."
                }
              ]
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
                  "href": "https://react.dev/reference/react/useEffect",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "useEffect"
                    },
                    {
                      "type": "text",
                      "value": " Reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": manual Effect fetching and race ignore."
                }
              ]
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
                  "href": "https://react.dev/reference/react/useReducer",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "useReducer"
                    },
                    {
                      "type": "text",
                      "value": " Reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": dispatch snapshot, pure reducer and Strict Mode."
                }
              ]
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
                  "href": "https://react.dev/learn/reusing-logic-with-custom-hooks",
                  "children": [
                    {
                      "type": "text",
                      "value": "Reusing Logic with Custom Hooks"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Shared logic instead of state."
                }
              ]
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
                  "href": "https://react.dev/learn/passing-data-deeply-with-context",
                  "children": [
                    {
                      "type": "text",
                      "value": "Passing Data Deeply with Context"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": provider/consumer delivery boundary."
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
              "value": "MDN(Browser, HTTP, JavaScript): "
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
                  "type": "link",
                  "href": "https://developer.mozilla.org/docs/Web/API/Window/fetch",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "fetch()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": The difference between network rejection and HTTP error status."
                }
              ]
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
                  "href": "https://developer.mozilla.org/docs/Web/API/Response/ok",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Response.ok"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": 200–299 success range."
                }
              ]
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
                  "href": "https://developer.mozilla.org/docs/Web/API/Response/json",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Response.json()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Read and parse body as JavaScript value."
                }
              ]
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
                  "href": "https://developer.mozilla.org/docs/Web/API/AbortController",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "AbortController"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": abort request/body/stream."
                }
              ]
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
                  "href": "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Promise"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": pending/fulfilled/rejected."
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
              "value": "TypeScript Official document:"
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
                  "value": "unknown"
                },
                {
                  "type": "text",
                  "value": ", discriminated union, type guard and "
                },
                {
                  "type": "inlineCode",
                  "value": "never"
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
                  "href": "https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Awaited<Type>"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Simulate await recursive unwrap Promise types."
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
              "value": "Local auxiliary information:"
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
                  "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
                },
                {
                  "type": "text",
                  "value": ": async data, conditional rendering, impossible states, data fetching, re-fetch and explicit fetch of PDF pages 116–151."
                }
              ]
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
                  "value": ": old MERN view/API fetch scenario, only for historical project mapping."
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
          "value": "The axios, multiple boolean loading/error and older Effect fetch writing methods in the local PDF are not the modern default for this chapter; if there is a conflict with the current React/MDN, the official document shall prevail."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter09Content() {
  return <DocumentRenderer document={chapterDocument} />
}
