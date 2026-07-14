import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-08",
  "slug": "chapter-08-state-architecture",
  "title": "React Chapter 8: State Architecture, Reducers, Context, and Custom Hooks",
  "sourcePath": "docs/react/chapter-08-state-architecture/react-chapter-08-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-8-state-architecture-reducers-context-and-custom-hooks",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 8: State Architecture, Reducers, Context, and Custom Hooks"
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
            "value": "Real file path"
          }
        ],
        [
          {
            "type": "text",
            "value": "Code nature"
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
              "value": "Mount all exercises"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/chapter-08-practice-root.tsx"
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
              "value": "src/learning/react/chapter-08-state-architecture/chapter-08-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Entrance style of this chapter"
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
              "value": "Minimum state and derived data"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/01-minimal-state/minimal-cart-state.tsx"
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
              "value": "Avoid redundant, duplicate, contradictory state"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/02-state-shape-boundaries/state-shape-boundaries.tsx"
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
              "value": "state owner and lifting state up"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/03-state-owner-lifting/shared-filter-owner.tsx"
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
              "value": "callback props and dispatch intent"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/04-callback-dispatch-intent/callback-intent-boundary.tsx"
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
              "value": "UI tree position and "
            },
            {
              "type": "inlineCode",
              "value": "key"
            },
            {
              "type": "text",
              "value": " reset"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/05-preserving-resetting-state/keyed-checkout-draft.tsx"
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
              "type": "inlineCode",
              "value": "useReducer"
            },
            {
              "type": "text",
              "value": " mental model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/06-reducer-mental-model/cart-reducer-transition.tsx"
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
              "value": "pure reducer with immutable transition"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/07-pure-reducer-immutability/pure-reducer-immutability.tsx"
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
              "value": "typed discriminated action union"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/08-typed-action-union/typed-action-union.tsx"
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
              "value": "Context provider / consumer boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/09-context-boundary/context-provider-boundary.tsx"
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
              "value": "reducer and Context combination"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/10-reducer-context/reducer-context-boundary.tsx"
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
              "value": "custom hook extracts"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/11-custom-hook-extraction/custom-hook-extraction.tsx"
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
              "value": "Independent state"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/12-independent-hook-state/independent-hook-state.tsx"
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
              "value": "Cart State Workspace"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-08-state-architecture/react-chapter-08-learning-guide.md"
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-08-state-architecture/"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Current project structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The root directory of this project is "
        },
        {
          "type": "inlineCode",
          "value": "D:\\vite_ts"
        },
        {
          "type": "text",
          "value": ". Vite is responsible for development server and construction, TypeScript is responsible for TS/TSX static checking, and React is responsible for component, state, render and Context runtime semantics. "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " is just a thin mounting layer of the current chapter and does not carry the mechanism code of this chapter."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Document structure of this chapter:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This article first establishes the state architecture model, then connects the runnable files section by section, and finally uses the Cart State Workspace combination mechanism. Concept error comparison using "
        },
        {
          "type": "inlineCode",
          "value": "Snippet:"
        },
        {
          "type": "text",
          "value": ", does not impersonate the file that should be created."
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
          "value": "Chapter 4 has explained state update, render snapshot and immutable object/array update; Chapter 5 has explained list, "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " and conditional rendering; Chapters 6 and 7 deal with form state and external synchronization respectively. This chapter solves higher-level issues: when multiple components need to collaborate, which piece of data is the source of truth, who owns it, how the update intention reaches the owner, where to place complex transitions, how to read deep components, and how to reuse logic."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "needs to avoid two extremes: one is to save each calculation result as state, creating a synchronization burden; the other is to lift all states to the top-level Context, creating irrelevant coupling. The goal of State architecture is not \"more abstraction\", but to have only one owner for each fact and to make each update path traceable."
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
                  "value": "can write function components, JSX, props and callback props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": ", event handler, render snapshot and functional updater."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "can be used with "
                },
                {
                  "type": "inlineCode",
                  "value": "map"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "filter"
                },
                {
                  "type": "text",
                  "value": " does immutable update with object spread."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand list "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " is used for sibling identity instead of the normal prop passed to component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "knows TypeScript union, literal type, type narrowing and "
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
                  "type": "text",
                  "value": "can distinguish render calculation, event logic and effect synchronization."
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
                  "value": "It is necessary to reverse the minimal source state from the UI and calculate the derived data in render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "identifies redundant, duplicate and contradictory states."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Put state on the nearest common parent component that needs to read and write it, rather than mechanically \"the higher the better\"."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains that lifting state up is to move the source of truth instead of copying the state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses callback props or "
                },
                {
                  "type": "inlineCode",
                  "value": "dispatch(action)"
                },
                {
                  "type": "text",
                  "value": " expresses child intent."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "is based on UI tree position, component type and "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " predicts state preserve/reset."
                }
              ]
            }
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
                  "value": "useReducer"
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
                  "value": "Write pure, immutable, typed reducer, and use discriminated union to do exhaustiveness check."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "is designed with a typed Context with clear provider / consumer scope."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses custom hooks to reuse stateful logic and explain why hook calls do not automatically share state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "maps these judgments to the cart, checkout, filter, selection and auth boundaries of SellerHub."
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
                  "value": "Delete unnecessary state first, leaving only source state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Redesign the state shape to eliminate duplicate facts and contradictory Boolean values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "finds the nearest public owner, passes the value downward through props, and uploads the intent through callback."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses UI tree position and "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " Understand identity instead of treating reset as an accidental behavior."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "When transition rules are concentrated and increase, the update logic is extracted into reducer."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses action union to describe \"what happened\" and pure reducer to calculate next state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Introduce Context only when cross-layer transfer really becomes unwieldy."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Finally extract the custom hook reuse logic and verify that each call still has an independent hook state."
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
              "value": "source state"
            }
          ],
          [
            {
              "type": "text",
              "value": "cannot be calculated directly from the current props/state and needs to be preserved by the interaction. The minimum fact"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture convention"
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
              "type": "text",
              "value": "Each render can calculate the value"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime / React render"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "redundant state"
            }
          ],
          [
            {
              "type": "text",
              "value": "can be calculated from other state/props, but state"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture problem"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "duplicate state"
            }
          ],
          [
            {
              "type": "text",
              "value": "The same entity or fact is saved in multiple independent copies"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture problem"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "contradictory state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Multiple state combinations can express impossible or mutually exclusive states"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture problem"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "state owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save the source state and decide to update the rule's component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React architecture"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "lifting state up"
            }
          ],
          [
            {
              "type": "text",
              "value": "Move the source of truth to the nearest public parent component that needs to share it"
            }
          ],
          [
            {
              "type": "text",
              "value": "React architecture"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reducer"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "(state, action) => nextState"
            },
            {
              "type": "text",
              "value": " pure transition function"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / React contract"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "action object"
            }
          ],
          [
            {
              "type": "text",
              "value": "A plain object describing \"what happened\", usually containing a discriminant "
            },
            {
              "type": "inlineCode",
              "value": "type"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript object / TypeScript union"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "dispatch"
            }
          ],
          [
            {
              "type": "text",
              "value": "queues the action into the function"
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
              "value": "Context"
            }
          ],
          [
            {
              "type": "text",
              "value": "React mechanism to let descendants read the latest provider value"
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
              "value": "provider boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "The range in which a Context value is effective for component subtree"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework / architecture"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "custom hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "The name starts with "
            },
            {
              "type": "inlineCode",
              "value": "use"
            },
            {
              "type": "text",
              "value": " At the beginning, a function that can be combined with other Hooks"
            }
          ],
          [
            {
              "type": "text",
              "value": "React convention / JavaScript"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "hook call identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "React associates hook state"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework"
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
      "label": "State architecture mental model",
      "value": "User event\n  -> child reports intent through callback or dispatch(action)\n  -> state owner receives the update request\n  -> useState updater or reducer(currentState, action) computes next source state\n  -> React schedules and calls affected components with a new render snapshot\n  -> derived data is recalculated from current source state\n  -> Context consumers read the nearest provider value\n  -> React commits the resulting UI\n\nTree position + component type + key define state identity.\nCustom hooks reuse logic; each hook call gets its own hook state.\nTypeScript checks shapes before runtime; React performs runtime state work."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The five-layer boundaries must be separated:"
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
                      "value": "JavaScript runtime behavior: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " object/array reference, function call, closure, "
                },
                {
                  "type": "inlineCode",
                  "value": "switch"
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
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "filter"
                },
                {
                  "type": "text",
                  "value": " and ordinary object creation."
                }
              ]
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
                      "value": "React framework behavior: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " hook state, render snapshot, update queue, dispatch, tree identity, Context lookup and consumer re-render."
                }
              ]
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
                      "value": "TypeScript type-system behavior: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " state/action/context/hook return type check, union narrowing and "
                },
                {
                  "type": "inlineCode",
                  "value": "never"
                },
                {
                  "type": "text",
                  "value": " exhaustiveness; The type will be erased from the runtime code."
                }
              ]
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
                      "value": "tooling behavior: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Vite converts TSX, TypeScript/ESLint reports static issues, React Fast Refresh improves development feedback."
                }
              ]
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
                      "value": "architecture convention: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Select minimal state, owner, transition and provider scope; this is a design decision, not something React automatically does for you."
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
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real practice structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Chapter 08 real file structure",
      "value": "src/learning/react/chapter-08-state-architecture/\n  chapter-08-practice-root.tsx\n  chapter-08-practice.css\n  01-minimal-state/\n    minimal-cart-state.tsx\n  02-state-shape-boundaries/\n    state-shape-boundaries.tsx\n  03-state-owner-lifting/\n    shared-filter-owner.tsx\n  04-callback-dispatch-intent/\n    callback-intent-boundary.tsx\n  05-preserving-resetting-state/\n    keyed-checkout-draft.tsx\n  06-reducer-mental-model/\n    cart-reducer-transition.tsx\n  07-pure-reducer-immutability/\n    pure-reducer-immutability.tsx\n  08-typed-action-union/\n    typed-action-union.tsx\n  09-context-boundary/\n    context-provider-boundary.tsx\n  10-reducer-context/\n    reducer-context-boundary.tsx\n  11-custom-hook-extraction/\n    custom-hook-extraction.tsx\n  12-independent-hook-state/\n    independent-hook-state.tsx\n  cart-state-workspace/\n    cart-state-model.ts\n    cart-state-reducer.ts\n    cart-state-context.ts\n    cart-state-provider.tsx\n    use-cart-state.ts\n    cart-item-row.tsx\n    cart-summary.tsx\n    checkout-draft.tsx\n    cart-state-workspace.tsx\n    cart-state-workspace.css"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "uses a numbered catalog to allow direct correspondence between the reading order and the official learning order; the mechanism name is used instead of "
        },
        {
          "type": "inlineCode",
          "value": "demo.tsx"
        },
        {
          "type": "text",
          "value": " is to know the practice target just by looking at the path when reviewing in the future. The final project is layered independently to show the responsibility boundaries of model, transition, delivery, consumer and presentation, rather than to establish a general \"global state framework\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "concept snippet:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Incorrect writing and short mechanism snippets in this article only use "
        },
        {
          "type": "inlineCode",
          "value": "Snippet:"
        },
        {
          "type": "text",
          "value": " title does not need to be created in the project and will not enter the final file list."
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
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " has been mounted as "
        },
        {
          "type": "inlineCode",
          "value": "Chapter08PracticeRoot"
        },
        {
          "type": "text",
          "value": ". Execute in the project root directory:"
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
          "value": "Open the local URL output by Vite in the browser, usually "
        },
        {
          "type": "inlineCode",
          "value": "http://localhost:5173/"
        },
        {
          "type": "text",
          "value": ". It is recommended to operate card by card by number and predict owner, action, next state, render snapshot and derived output before each click."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Entrance to practice in this chapter:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/chapter-08-practice-root.tsx",
      "value": "import { MinimalCartState } from './01-minimal-state/minimal-cart-state'\nimport { StateShapeBoundaries } from './02-state-shape-boundaries/state-shape-boundaries'\nimport { SharedFilterOwner } from './03-state-owner-lifting/shared-filter-owner'\nimport { CallbackIntentBoundary } from './04-callback-dispatch-intent/callback-intent-boundary'\nimport { KeyedCheckoutDraft } from './05-preserving-resetting-state/keyed-checkout-draft'\nimport { CartReducerTransition } from './06-reducer-mental-model/cart-reducer-transition'\nimport { PureReducerImmutability } from './07-pure-reducer-immutability/pure-reducer-immutability'\nimport { TypedActionUnion } from './08-typed-action-union/typed-action-union'\nimport { ContextProviderBoundary } from './09-context-boundary/context-provider-boundary'\nimport { ReducerContextBoundary } from './10-reducer-context/reducer-context-boundary'\nimport { CustomHookExtraction } from './11-custom-hook-extraction/custom-hook-extraction'\nimport { IndependentHookState } from './12-independent-hook-state/independent-hook-state'\nimport { CartStateWorkspace } from './cart-state-workspace/cart-state-workspace'\nimport './chapter-08-practice.css'\n\nconst practiceSections = [\n  { id: 'minimal-state', component: <MinimalCartState /> },\n  { id: 'state-shape', component: <StateShapeBoundaries /> },\n  { id: 'state-owner', component: <SharedFilterOwner /> },\n  { id: 'callback-intent', component: <CallbackIntentBoundary /> },\n  { id: 'state-identity', component: <KeyedCheckoutDraft /> },\n  { id: 'reducer-model', component: <CartReducerTransition /> },\n  { id: 'pure-reducer', component: <PureReducerImmutability /> },\n  { id: 'action-union', component: <TypedActionUnion /> },\n  { id: 'context-boundary', component: <ContextProviderBoundary /> },\n  { id: 'reducer-context', component: <ReducerContextBoundary /> },\n  { id: 'custom-hook', component: <CustomHookExtraction /> },\n  { id: 'hook-identity', component: <IndependentHookState /> },\n]\n\nexport function Chapter08PracticeRoot() {\n  return (\n    <main className=\"chapter-eight-shell\">\n      <header className=\"chapter-eight-header\">\n        <p className=\"chapter-eight-eyebrow\">React Chapter 08</p>\n        <h1>State Architecture, Reducers, Context, and Custom Hooks</h1>\n        <p>\n          Model source state, ownership, transition logic, delivery boundaries, and\n          reusable stateful contracts before scaling SellerHub workflows.\n        </p>\n      </header>\n\n      <section aria-labelledby=\"chapter-eight-practice-title\">\n        <div className=\"chapter-eight-section-heading\">\n          <div>\n            <p>Mechanism practice</p>\n            <h2 id=\"chapter-eight-practice-title\">One state architecture decision per directory</h2>\n          </div>\n          <p>Predict the owner, source of truth, identity, transition, and consumer boundary.</p>\n        </div>\n\n        <div className=\"chapter-eight-practice-grid\">\n          {practiceSections.map((practice) => (\n            <div id={practice.id} key={practice.id}>\n              {practice.component}\n            </div>\n          ))}\n        </div>\n      </section>\n\n      <CartStateWorkspace />\n    </main>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Shared style for this chapter:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-08-state-architecture/chapter-08-practice.css",
      "value": ":root {\n  color: #182230;\n  background: #edf3f1;\n  font-family:\n    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    sans-serif;\n}\n\nbody {\n  margin: 0;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\n\n.chapter-eight-shell {\n  width: min(100% - 32px, 1180px);\n  margin: 0 auto;\n  padding: 56px 0 72px;\n}\n\n.chapter-eight-header {\n  max-width: 930px;\n  margin-bottom: 48px;\n}\n\n.chapter-eight-eyebrow,\n.chapter-eight-section-heading > div > p,\n.practice-label,\n.project-eyebrow {\n  margin: 0;\n  color: #0b6b58;\n  font-size: 0.75rem;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.chapter-eight-header h1 {\n  max-width: 920px;\n  margin: 10px 0 0;\n  color: #182230;\n  font-size: clamp(2.2rem, 6vw, 4.5rem);\n  line-height: 1.02;\n}\n\n.chapter-eight-header > p:last-child {\n  margin: 22px 0 0;\n  color: #526071;\n  font-size: 1.08rem;\n  line-height: 1.7;\n}\n\n.chapter-eight-section-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 20px;\n}\n\n.chapter-eight-section-heading h2 {\n  margin: 6px 0 0;\n  color: #182230;\n  font-size: 1.8rem;\n}\n\n.chapter-eight-section-heading > p {\n  max-width: 430px;\n  margin: 0;\n  color: #667085;\n  text-align: right;\n}\n\n.chapter-eight-practice-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.practice-card {\n  height: 100%;\n  box-sizing: border-box;\n  padding: 22px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.practice-card h3 {\n  margin: 8px 0 18px;\n  color: #182230;\n  font-size: 1.15rem;\n}\n\n.practice-card p:not(.practice-label) {\n  color: #667085;\n  line-height: 1.55;\n}\n\n.practice-card label {\n  display: grid;\n  gap: 6px;\n  margin-bottom: 12px;\n  color: #344054;\n  font-size: 0.9rem;\n  font-weight: 750;\n}\n\n.practice-card input:not([type='checkbox']),\n.practice-card select,\n.practice-card textarea {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 9px 10px;\n  color: #182230;\n  border: 1px solid #94a3b8;\n  border-radius: 7px;\n  background: #ffffff;\n}\n\n.practice-card textarea {\n  min-height: 82px;\n  resize: vertical;\n}\n\n.practice-card button {\n  padding: 9px 12px;\n  color: #ffffff;\n  border: 1px solid #0b6b58;\n  border-radius: 7px;\n  background: #0b6b58;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n.practice-stack {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.practice-list {\n  display: grid;\n  gap: 10px;\n}\n\n.practice-list label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n\n@media (max-width: 960px) {\n  .chapter-eight-practice-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 640px) {\n  .chapter-eight-shell {\n    width: min(100% - 20px, 1180px);\n    padding: 36px 0 48px;\n  }\n\n  .chapter-eight-section-heading {\n    align-items: start;\n    flex-direction: column;\n  }\n\n  .chapter-eight-section-heading > p {\n    text-align: left;\n  }\n\n  .chapter-eight-practice-grid {\n    grid-template-columns: 1fr;\n  }\n}"
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
      "id": "91-minimal-state-and-derived-data",
      "children": [
        {
          "type": "text",
          "value": "9.1 Minimal State and Derived Data"
        }
      ]
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
          "value": "The shopping cart quantity, total number of pieces and subtotal will all change, but it does not mean that all three should be state. This section determines which values ​​must be remembered and which values ​​can be calculated from the current render snapshot."
        }
      ]
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
          "value": "only saves "
        },
        {
          "type": "inlineCode",
          "value": "quantities"
        },
        {
          "type": "text",
          "value": ", let "
        },
        {
          "type": "inlineCode",
          "value": "totalCount"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "subtotal"
        },
        {
          "type": "text",
          "value": " is derived in render, which means that the system has only one source of truth. Any quantity update will not miss the second update of \"synchronized totals\"."
        }
      ]
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
          "value": "minimal state"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "source state"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "derived data"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "redundant state"
        },
        {
          "type": "text",
          "value": ". There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime use "
                },
                {
                  "type": "inlineCode",
                  "value": "reduce"
                },
                {
                  "type": "text",
                  "value": " reads the current "
                },
                {
                  "type": "inlineCode",
                  "value": "quantities"
                },
                {
                  "type": "text",
                  "value": " object and returns number."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework save "
                },
                {
                  "type": "inlineCode",
                  "value": "quantities"
                },
                {
                  "type": "text",
                  "value": ", call component to generate a new render snapshot."
                }
              ]
            }
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
                  "value": "Record<string, number>"
                },
                {
                  "type": "text",
                  "value": ", product shape and number operation."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling converts TSX into a browser executable module and reports errors on incompatible types."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention determines that totals does not enter state; React will not automatically delete redundant state for you."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Every time component function is called, "
        },
        {
          "type": "inlineCode",
          "value": "totalCount"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "subtotal"
        },
        {
          "type": "text",
          "value": " are all new lexical bindings in this call. They read "
        },
        {
          "type": "inlineCode",
          "value": "quantities"
        },
        {
          "type": "text",
          "value": " snapshot; After the event handler function requests next quantities, the totals in the old function call will not change in place, and React will recalculate it the next time it renders."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React The actual long-term storage is "
        },
        {
          "type": "inlineCode",
          "value": "MinimalCartState"
        },
        {
          "type": "text",
          "value": " corresponds to quantities object reference in Hook cell. React does not save "
        },
        {
          "type": "inlineCode",
          "value": "totalCount"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "subtotal"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "products.map(...)"
        },
        {
          "type": "text",
          "value": " does not save the local variables of this function call; these are the results of JavaScript being re-created or recalculated during each render call. In the first render, two "
        },
        {
          "type": "inlineCode",
          "value": "reduce"
        },
        {
          "type": "text",
          "value": " generates number values respectively, and JSX creates React elements that describe the current UI."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "clicks Add, the browser triggers click first, and React calls "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": " closure. Closure Remember target "
        },
        {
          "type": "inlineCode",
          "value": "product.id"
        },
        {
          "type": "text",
          "value": ", after the setter receives the functional updater, it adds it to the update queue of the state Hook. When the Updater is processed, it reads the latest quantities in the queue, not the old object in the closure; it returns the new object reference. React then calls component to form the next snapshot, and the two derived numbers are recalculated accordingly."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript only proves that the updater return value is compatible with "
        },
        {
          "type": "inlineCode",
          "value": "Record<string, number>"
        },
        {
          "type": "text",
          "value": ", and check "
        },
        {
          "type": "inlineCode",
          "value": "product.price * quantity"
        },
        {
          "type": "text",
          "value": " is a number operation. Emit after "
        },
        {
          "type": "inlineCode",
          "value": "Record"
        },
        {
          "type": "text",
          "value": " disappears; if the runtime input contains "
        },
        {
          "type": "inlineCode",
          "value": "NaN"
        },
        {
          "type": "text",
          "value": " or negative number, TypeScript will not be automatically verified or repaired. In SellerHub, I saw \"Modify quantity and also call "
        },
        {
          "type": "inlineCode",
          "value": "setSubtotal"
        },
        {
          "type": "text",
          "value": "\", duplicate source of truth should be suspected immediately."
        }
      ]
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
          "value": "useState<Record<string, number>>(initialValue)"
        },
        {
          "type": "text",
          "value": " returns the current snapshot and setter. "
        },
        {
          "type": "inlineCode",
          "value": "setQuantities(current => next)"
        },
        {
          "type": "text",
          "value": " uses queued previous state; "
        },
        {
          "type": "inlineCode",
          "value": "reduce((total, item) => nextTotal, 0)"
        },
        {
          "type": "text",
          "value": " is JavaScript array API, not React API."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
                  "value": "Hook is fixed to "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
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
                  "value": "functional updater shape is "
                },
                {
                  "type": "inlineCode",
                  "value": "(currentState) => nextState"
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
                  "value": "reduce"
                },
                {
                  "type": "text",
                  "value": " callback are accumulator and current item here."
                }
              ]
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
                  "value": "product.id"
                },
                {
                  "type": "text",
                  "value": " is just a local data field, not a React fixed field; "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " is the React list identity attribute."
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
      "label": "src/learning/react/chapter-08-state-architecture/01-minimal-state/minimal-cart-state.tsx",
      "value": "import { useState } from 'react'\n\nconst products = [\n  { id: 'keyboard', name: 'Mechanical keyboard', price: 89 },\n  { id: 'mouse', name: 'Wireless mouse', price: 45 },\n]\n\nexport function MinimalCartState() {\n  const [quantities, setQuantities] = useState<Record<string, number>>({\n    keyboard: 1,\n    mouse: 0,\n  })\n\n  const totalCount = products.reduce(\n    (total, product) => total + (quantities[product.id] ?? 0),\n    0,\n  )\n  const subtotal = products.reduce(\n    (total, product) => total + product.price * (quantities[product.id] ?? 0),\n    0,\n  )\n\n  function increaseQuantity(productId: string) {\n    setQuantities((current) => ({\n      ...current,\n      [productId]: (current[productId] ?? 0) + 1,\n    }))\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Minimal state</p>\n      <h3>Derive totals during render</h3>\n      <div className=\"practice-stack\">\n        {products.map((product) => (\n          <button key={product.id} onClick={() => increaseQuantity(product.id)}>\n            Add {product.name}\n          </button>\n        ))}\n      </div>\n      <p>\n        {totalCount} items · ${subtotal.toFixed(2)}\n      </p>\n    </article>\n  )\n}"
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
                  "value": "products"
                },
                {
                  "type": "text",
                  "value": " is stable module data and does not require state."
                }
              ]
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
                  "value": "quantities"
                },
                {
                  "type": "text",
                  "value": " Saves the minimal facts that must be retained across renders after user actions."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "twice "
                },
                {
                  "type": "inlineCode",
                  "value": "reduce"
                },
                {
                  "type": "text",
                  "value": " only reads the current snapshot and does not trigger update."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "updater creates a new object using spread and replaces only the target property."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "list button "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " establishes sibling identity; click closure passes in the corresponding "
                },
                {
                  "type": "inlineCode",
                  "value": "product.id"
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
          "value": "first render read "
        },
        {
          "type": "inlineCode",
          "value": "{ keyboard: 1, mouse: 0 }"
        },
        {
          "type": "text",
          "value": ", get "
        },
        {
          "type": "inlineCode",
          "value": "totalCount = 1"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "subtotal = 89"
        },
        {
          "type": "text",
          "value": ". After clicking the mouse button, the handler enqueues an updater; React applies the updater to get the new object, and then renders, two "
        },
        {
          "type": "inlineCode",
          "value": "reduce"
        },
        {
          "type": "text",
          "value": " reads the new object and outputs "
        },
        {
          "type": "inlineCode",
          "value": "2 items · $134.00"
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
              "value": "Variables, references and snapshot changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Old "
        },
        {
          "type": "inlineCode",
          "value": "quantities"
        },
        {
          "type": "text",
          "value": " reference remains unchanged, the new updater returns a different object reference. "
        },
        {
          "type": "inlineCode",
          "value": "totalCount"
        },
        {
          "type": "text",
          "value": " is still "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": "; new render creates new "
        },
        {
          "type": "inlineCode",
          "value": "totalCount = 2"
        },
        {
          "type": "text",
          "value": ". There is no action object, Context value, or reducer state; props have no owner delivery responsibilities."
        }
      ]
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
          "value": "Because totals is a deterministic calculation, it only depends on products and current quantities. Once the source state is updated, the next render must get consistent totals from the same facts."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparative writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: redundant cart totals",
      "value": "const [quantities, setQuantities] = useState<Record<string, number>>({})\nconst [totalCount, setTotalCount] = useState(0)\nconst [subtotal, setSubtotal] = useState(0)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This erroneous design requires each quantity update to maintain three copies of state at the same time; missing any setter will result in inconsistent UI."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rule violated:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "re-saves the value that can be calculated by the current props/state, which violates \"one source of truth for one fact\". Direct mutation "
        },
        {
          "type": "inlineCode",
          "value": "quantities[productId] += 1"
        },
        {
          "type": "text",
          "value": " also violates the immutable update rule."
        }
      ]
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
          "value": "Seeing that the setter of a certain state always appears in pairs with another setter, first ask: \"After deleting it, can it be calculated from the existing input in render?\" If the answer is yes, it is usually derived data."
        }
      ]
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
          "type": "inlineCode",
          "value": "CartPage"
        },
        {
          "type": "text",
          "value": " should save cart item quantities, and do not save subtotal and total count separately; "
        },
        {
          "type": "inlineCode",
          "value": "ProductListPage"
        },
        {
          "type": "text",
          "value": " saves filter criteria and does not save the second visible products."
        }
      ]
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
          "value": "This section reuses the updater and immutable object update of Chapter 4, raising the focus from \"how to update\" to \"what should be saved\"."
        }
      ]
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
          "value": "State holds facts that cannot be reconstructed from the current input; render is responsible for calculating the desired results for the UI from these facts."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-avoiding-redundant-duplicate-and-contradictory-state",
      "children": [
        {
          "type": "text",
          "value": "9.2 Avoiding Redundant, Duplicate, and Contradictory State"
        }
      ]
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
          "value": "Multiple boolean states are easy to express "
        },
        {
          "type": "inlineCode",
          "value": "isDraft && isPublished"
        },
        {
          "type": "text",
          "value": "; also save "
        },
        {
          "type": "inlineCode",
          "value": "selectedProductId"
        },
        {
          "type": "text",
          "value": " and full "
        },
        {
          "type": "inlineCode",
          "value": "selectedProduct"
        },
        {
          "type": "text",
          "value": " will create duplicate entity snapshot."
        }
      ]
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
          "value": "Good state shape makes illegal state difficult to express. A literal union represents mutually exclusive status, and a stable id points to module data, which not only reduces the update path, but also allows TypeScript to help narrowing."
        }
      ]
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
          "value": "contradictory state"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "duplicate state"
        },
        {
          "type": "text",
          "value": ", normalized reference, single discriminant. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime uses string id and "
                },
                {
                  "type": "inlineCode",
                  "value": "find"
                },
                {
                  "type": "text",
                  "value": " gets the current product object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework retains status and selected id snapshots respectively."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Limit status to one of three literals."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling in "
                },
                {
                  "type": "inlineCode",
                  "value": "setStatus('archived')"
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
                  "value": "architecture convention chooses id instead of copying entity object, chooses one status instead of multiple mutually exclusive booleans."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "selectedProduct"
        },
        {
          "type": "text",
          "value": " is obtained by id query for each render and does not have an independent setter. If the name of products changes, the next render query will find the new object, and there is no need to synchronize another selected product state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React Only two Hook cells are saved here: one saves a single status string and one saves the selected id string. JavaScript executes "
        },
        {
          "type": "inlineCode",
          "value": "find"
        },
        {
          "type": "text",
          "value": ", maps the current id to the object reference in the products array; "
        },
        {
          "type": "inlineCode",
          "value": "selectedProduct"
        },
        {
          "type": "text",
          "value": " is the local binding currently called, not the third React state. Status buttons "
        },
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " creates a set of element objects and click closures for this render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "When selecting a new product, "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " reads "
        },
        {
          "type": "inlineCode",
          "value": "event.target.value"
        },
        {
          "type": "text",
          "value": ", the setter adds the new string to the selected-id update queue. React will use the new id next time it renders again "
        },
        {
          "type": "inlineCode",
          "value": "find"
        },
        {
          "type": "text",
          "value": ". Click the status button to go through another Hook queue, so the two source facts can be updated independently, but status itself will not have a combination of multiple booleans being true at the same time."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript will reject "
        },
        {
          "type": "inlineCode",
          "value": "setStatus('archived')"
        },
        {
          "type": "text",
          "value": ", but does not validate ordinary strings obtained from storage, URLs or APIs. If SellerHub stores both the selected product object and selected id into the state, the object copy may still show the old name after updating the product name; the identification signal is \"the same entity appears in the state with id and complete copies, and each has an update path.\""
        }
      ]
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
          "value": "type ProductStatus = 'draft' | 'review' | 'published'"
        },
        {
          "type": "text",
          "value": " is TypeScript literal union. "
        },
        {
          "type": "inlineCode",
          "value": "Array.prototype.find"
        },
        {
          "type": "text",
          "value": " returns element or "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": "; optional chaining handles not found situations."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
          "value": "find(predicate)"
        },
        {
          "type": "text",
          "value": " is the fixation method of JavaScript; "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " is controlled "
        },
        {
          "type": "inlineCode",
          "value": "<select>"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "selectedProductId"
        },
        {
          "type": "text",
          "value": " is a domain name, not a fixed name of React."
        }
      ]
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
      "label": "src/learning/react/chapter-08-state-architecture/02-state-shape-boundaries/state-shape-boundaries.tsx",
      "value": "import { useState } from 'react'\n\ntype ProductStatus = 'draft' | 'review' | 'published'\n\nconst products = [\n  { id: 'sku-101', name: 'Desk lamp' },\n  { id: 'sku-102', name: 'Monitor stand' },\n]\n\nexport function StateShapeBoundaries() {\n  const [status, setStatus] = useState<ProductStatus>('draft')\n  const [selectedProductId, setSelectedProductId] = useState(products[0].id)\n  const selectedProduct = products.find((product) => product.id === selectedProductId)\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">State shape</p>\n      <h3>Store one source of truth</h3>\n      <label>\n        Product\n        <select\n          value={selectedProductId}\n          onChange={(event) => setSelectedProductId(event.target.value)}\n        >\n          {products.map((product) => (\n            <option key={product.id} value={product.id}>\n              {product.name}\n            </option>\n          ))}\n        </select>\n      </label>\n      <div className=\"practice-stack\">\n        {(['draft', 'review', 'published'] as const).map((nextStatus) => (\n          <button key={nextStatus} onClick={() => setStatus(nextStatus)}>\n            {nextStatus}\n          </button>\n        ))}\n      </div>\n      <p>\n        {selectedProduct?.name} is {status}.\n      </p>\n    </article>\n  )\n}"
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
                  "value": "ProductStatus"
                },
                {
                  "type": "text",
                  "value": " collects the mutually exclusive state into a discriminant."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component Save only "
                },
                {
                  "type": "inlineCode",
                  "value": "status"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "selectedProductId"
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
                  "value": "find"
                },
                {
                  "type": "text",
                  "value": " calculates selected object from canonical products."
                }
              ]
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
                  "value": "<select>"
                },
                {
                  "type": "text",
                  "value": " updates id; status buttons update unique status."
                }
              ]
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
                  "value": "as const"
                },
                {
                  "type": "text",
                  "value": " retains the literal types of array elements to avoid widening to ordinary "
                },
                {
                  "type": "inlineCode",
                  "value": "string"
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
          "value": "Select "
        },
        {
          "type": "inlineCode",
          "value": "sku-102"
        },
        {
          "type": "text",
          "value": "; the next render will be "
        },
        {
          "type": "inlineCode",
          "value": "find"
        },
        {
          "type": "text",
          "value": " returns to Monitor stand. When published is clicked status changes to single "
        },
        {
          "type": "inlineCode",
          "value": "'published'"
        },
        {
          "type": "text",
          "value": ", there is no other "
        },
        {
          "type": "inlineCode",
          "value": "isDraft"
        },
        {
          "type": "text",
          "value": " Legacy path is true."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "products array reference remains unchanged; selected id string changes; "
        },
        {
          "type": "inlineCode",
          "value": "selectedProduct"
        },
        {
          "type": "text",
          "value": " binding points to another existing object in the array. The new status string replaces the old snapshot and will not merge multiple booleans."
        }
      ]
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
          "value": "Because the mutually exclusive state is modeled as a single-value union, only one member can be selected at the same time; the selected object is always determined by the current id and canonical array."
        }
      ]
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
          "value": "Do not save "
        },
        {
          "type": "inlineCode",
          "value": "isDraft"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "isReviewing"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "isPublished"
        },
        {
          "type": "text",
          "value": ", and do not save "
        },
        {
          "type": "inlineCode",
          "value": "selectedProductId"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "selectedProduct"
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
              "value": "common mistakes Rule violated:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The same fact appears in multiple independently updateable states, violating single source of truth; multiple mutually exclusive booleans allow contradictory combinations."
        }
      ]
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
          "value": "List all Cartesian combinations of state. If there is a business impossible combination, the union/status object should be considered; if the two states always represent the same entity, retain the stable id and derive the object."
        }
      ]
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
          "value": "checkout step use "
        },
        {
          "type": "inlineCode",
          "value": "'address' | 'payment' | 'review'"
        },
        {
          "type": "text",
          "value": " instead of three "
        },
        {
          "type": "inlineCode",
          "value": "is...Step"
        },
        {
          "type": "text",
          "value": "; seller order selection saves the order id instead of copying a potentially expired order object."
        }
      ]
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
          "value": "This section applies the TypeScript state typing in Chapter 4 to architectural constraints, allowing the type system to reduce impossible states."
        }
      ]
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
          "value": "State shape should have only one representation for a fact and only one discriminant for mutually exclusive state."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-state-ownership-and-lifting-state-up",
      "children": [
        {
          "type": "text",
          "value": "9.3 State Ownership and Lifting State Up"
        }
      ]
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
          "value": "filter input needs to write query, and result list needs to read query. If the query is saved separately, the sibling state will be forked; if the query is placed at the root of the entire app, unrelated pages will be coupled."
        }
      ]
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
          "value": "The nearest common parent component is the smallest owner of the shared fact. Lifting state up does not copy the state to the parent layer, but removes the local source state from the children, establishes a unique source in the parent, and forms a one-way data flow through props."
        }
      ]
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
          "value": "state owner"
        },
        {
          "type": "text",
          "value": ", closest common parent, lifting state up, controlled child, single source of truth. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime calls child functions and passes props object through ordinary function argument."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework lets parent state update trigger a new render of parent and related descendants."
                }
              ]
            }
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
                  "value": "query"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "onQueryChange"
                },
                {
                  "type": "text",
                  "value": " prop contract."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling parses TSX import/export and checks for unmet required props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention decides "
                },
                {
                  "type": "inlineCode",
                  "value": "SharedFilterOwner"
                },
                {
                  "type": "text",
                  "value": " is the latest owner, not "
                },
                {
                  "type": "inlineCode",
                  "value": "ProductFilterInput"
                },
                {
                  "type": "text",
                  "value": " or global Context."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "input event calls the callback reference received by the child; this reference ultimately points to the parent setter. The update enters the parent state queue, and the parent passes the same query snapshot to the two children when rendering."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Owner is not \"the outermost component on the page\", but React associates the query Hook cell to "
        },
        {
          "type": "inlineCode",
          "value": "SharedFilterOwner"
        },
        {
          "type": "text",
          "value": " in the render tree. When rendering for the first time, JavaScript gets query binding "
        },
        {
          "type": "inlineCode",
          "value": "''"
        },
        {
          "type": "text",
          "value": ", stable "
        },
        {
          "type": "inlineCode",
          "value": "setQuery"
        },
        {
          "type": "text",
          "value": " function reference, and create props objects for the two children respectively. "
        },
        {
          "type": "inlineCode",
          "value": "ProductFilterInput"
        },
        {
          "type": "text",
          "value": " creates "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " closure; "
        },
        {
          "type": "inlineCode",
          "value": "ProductFilterResults"
        },
        {
          "type": "text",
          "value": " creates "
        },
        {
          "type": "inlineCode",
          "value": "visibleProducts"
        },
        {
          "type": "text",
          "value": " array. React only saves the parent's query state, not the child's filtered array."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "User input "
        },
        {
          "type": "inlineCode",
          "value": "stand"
        },
        {
          "type": "text",
          "value": ", the browser event object enters "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": ". Child reads string from event and calls "
        },
        {
          "type": "inlineCode",
          "value": "onQueryChange"
        },
        {
          "type": "text",
          "value": "; This value is exactly the setter passed by parent. React puts the new string into the parent Hook queue, and then forms a new render snapshot starting from owner. Parent uses the same new query to create two copies of child props: "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " and the results filter will therefore not fork."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Putting owner inside input will cause sibling results to not have the same source; copying query in results will generate two queues. Conversely, placing the query in the app root Context will cause unrelated routes to also rely on this page-level fact. The identification method of SellerHub is to list all readers and writers: the lowest common ancestor covering them is the candidate owner, and then check whether the lifetime of the state is also consistent with the subtree."
        }
      ]
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
          "value": "This section reuses controlled input "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " with callback prop. "
        },
        {
          "type": "inlineCode",
          "value": "onQueryChange"
        },
        {
          "type": "text",
          "value": " is a custom prop name and will not automatically become a browser event; it is just a function value passed from parent."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
                  "value": "DOM input fixed use "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "onChange"
                },
                {
                  "type": "text",
                  "value": " props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "custom callback can be named "
                },
                {
                  "type": "inlineCode",
                  "value": "onQueryChange"
                },
                {
                  "type": "text",
                  "value": ", the signature here is "
                },
                {
                  "type": "inlineCode",
                  "value": "(nextQuery: string) => void"
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
                  "value": ".filter"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": ".includes"
                },
                {
                  "type": "text",
                  "value": " is the JavaScript methods."
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
      "label": "src/learning/react/chapter-08-state-architecture/03-state-owner-lifting/shared-filter-owner.tsx",
      "value": "import { useState } from 'react'\n\nconst productNames = ['Desk lamp', 'Monitor stand', 'Mechanical keyboard']\n\ntype ProductFilterInputProps = {\n  query: string\n  onQueryChange: (nextQuery: string) => void\n}\n\nfunction ProductFilterInput({ query, onQueryChange }: ProductFilterInputProps) {\n  return (\n    <label>\n      Product search\n      <input\n        value={query}\n        onChange={(event) => onQueryChange(event.target.value)}\n        placeholder=\"Search products\"\n      />\n    </label>\n  )\n}\n\nfunction ProductFilterResults({ query }: { query: string }) {\n  const visibleProducts = productNames.filter((name) =>\n    name.toLowerCase().includes(query.toLowerCase()),\n  )\n\n  return <p>{visibleProducts.join(', ') || 'No matching products'}</p>\n}\n\nexport function SharedFilterOwner() {\n  const [query, setQuery] = useState('')\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">State owner</p>\n      <h3>Lift shared state to the closest parent</h3>\n      <ProductFilterInput query={query} onQueryChange={setQuery} />\n      <ProductFilterResults query={query} />\n    </article>\n  )\n}"
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
                  "value": "ProductFilterInputProps"
                },
                {
                  "type": "text",
                  "value": " exposes the value/callback contract of controlled input."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "input does not save local query, only reports "
                },
                {
                  "type": "inlineCode",
                  "value": "event.target.value"
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
                  "value": "results does not save visible list, only derived from query."
                }
              ]
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
                  "value": "SharedFilterOwner"
                },
                {
                  "type": "text",
                  "value": " saves the unique query and passes the same snapshot to two siblings."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "User type "
        },
        {
          "type": "inlineCode",
          "value": "stand"
        },
        {
          "type": "text",
          "value": "; browser generates input event, React handler calls "
        },
        {
          "type": "inlineCode",
          "value": "onQueryChange('stand')"
        },
        {
          "type": "text",
          "value": ". parent setter enqueue update, parent next render passes "
        },
        {
          "type": "inlineCode",
          "value": "'stand'"
        },
        {
          "type": "text",
          "value": ", the filter of results only retains Monitor stand."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "event object only exists during handler call; next query string enters parent state. Both child props objects are recreated in the new render but their "
        },
        {
          "type": "inlineCode",
          "value": "query"
        },
        {
          "type": "text",
          "value": " value is the same. There is no Context; owner boundaries are expressed directly by the component tree."
        }
      ]
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
          "value": "Both siblings rely on the unique query of the common parent, so there will be no independent snapshots of input display A and results still filtered by B."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparative writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "in input and results respectively "
        },
        {
          "type": "inlineCode",
          "value": "useState('')"
        },
        {
          "type": "text",
          "value": " will produce two owners that cannot be automatically synchronized; putting the query in the app-wide Context exceeds the actual sharing range."
        }
      ]
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
          "value": "owner If it is too low, shared state will be copied; if owner is too high, unrelated subtrees will depend on the same update boundary."
        }
      ]
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
          "value": "Draw all readers and writers and find the lowest common ancestor that contains them. If only one component requires state, do not promote it; if all siblings require it, promote it to the nearest common parent."
        }
      ]
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
          "type": "inlineCode",
          "value": "ProductListPage"
        },
        {
          "type": "text",
          "value": " can have filter query, toolbar writing, and product grid reading; there is no need to upgrade the local filter of the page to Dashboard layout or Auth Context."
        }
      ]
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
          "value": "This section combines the props/callback props in chapter 3 and the state in chapter 4 into a traceable parent-to-child value and child-to-parent intent path."
        }
      ]
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
          "value": "shared state is placed in the nearest public parent of all readers/writers; values are passed down and intentions are uploaded upward."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-callback-props-and-dispatching-intent",
      "children": [
        {
          "type": "text",
          "value": "9.4 Callback Props and Dispatching Intent"
        }
      ]
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
          "value": "Child can know that \"the user selected the order\", but it should not directly modify the parent's "
        },
        {
          "type": "inlineCode",
          "value": "selectedOrderId"
        },
        {
          "type": "text",
          "value": ". This section lets the child report domain intent and let the owner determine the state transition."
        }
      ]
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
          "value": "named the callback payload intent to establish the same idea for subsequent reducer actions: the caller describes what happened, and the owner retains the authority to update. In this way, the child does not depend on the specific state shape of the parent."
        }
      ]
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
          "value": "callback prop, intent object, event boundary, owner-controlled transition. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime creates plain object and calls "
                },
                {
                  "type": "inlineCode",
                  "value": "onIntent(intent)"
                },
                {
                  "type": "text",
                  "value": ", then "
                },
                {
                  "type": "inlineCode",
                  "value": "if"
                },
                {
                  "type": "text",
                  "value": " narrowing."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework handles click handler and state update scheduling."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript based on "
                },
                {
                  "type": "inlineCode",
                  "value": "intent.type"
                },
                {
                  "type": "text",
                  "value": " reduce union, confirm "
                },
                {
                  "type": "inlineCode",
                  "value": "orderId"
                },
                {
                  "type": "text",
                  "value": " only exists in the correct member."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling Check for missing payload or wrong action literal."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention lets the child send intents instead of getting a mutable parent object."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "renders every time, "
        },
        {
          "type": "inlineCode",
          "value": "OrderSelector"
        },
        {
          "type": "text",
          "value": " received a callback function reference. When clicked, the child creates a new action-like object; the parent handler reads the object synchronously and updates the setter corresponding to the discriminant enqueue."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Parent renders, JavaScript creates "
        },
        {
          "type": "inlineCode",
          "value": "handleIntent"
        },
        {
          "type": "text",
          "value": " function and put it into "
        },
        {
          "type": "inlineCode",
          "value": "OrderSelector"
        },
        {
          "type": "text",
          "value": ". Child render creates two more click closures. React doesn't understand "
        },
        {
          "type": "inlineCode",
          "value": "order_selected"
        },
        {
          "type": "text",
          "value": " will not be changed to "
        },
        {
          "type": "inlineCode",
          "value": "SelectionIntent"
        },
        {
          "type": "text",
          "value": " is treated as a special event; it only calls closure when clicked. Plain JavaScript object "
        },
        {
          "type": "inlineCode",
          "value": "{ type, orderId }"
        },
        {
          "type": "text",
          "value": " is created first and then passed to the parent callback as a normal argument."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Parent callback is executed in the current render snapshot, reads the intent and calls the setter. Setter only registers the next selected id, currently "
        },
        {
          "type": "inlineCode",
          "value": "selectedOrderId"
        },
        {
          "type": "text",
          "value": " binding will not change synchronously. A new parent callback, a new child props object and a new UI description will be created next time you render. TypeScript guarantees "
        },
        {
          "type": "inlineCode",
          "value": "order_selected"
        },
        {
          "type": "text",
          "value": " carries "
        },
        {
          "type": "inlineCode",
          "value": "orderId"
        },
        {
          "type": "text",
          "value": ", but the runtime object does not have union metadata."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The specific bug usually occurs when the child directly assigns the value after receiving the parent entity: mutation changes the same object without going through the owner queue, and React may not have a new state reference available for the next render. If the row, toolbar or modal of SellerHub knows multiple setters and internal shapes of the parent, it means that the callback contract is excessively leaky; it should be changed to the smallest domain intent."
        }
      ]
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
          "value": "Custom component attribute "
        },
        {
          "type": "inlineCode",
          "value": "onIntent={handleIntent}"
        },
        {
          "type": "text",
          "value": " is just prop passing. It does not require "
        },
        {
          "type": "inlineCode",
          "value": "on"
        },
        {
          "type": "text",
          "value": " prefix, but use "
        },
        {
          "type": "inlineCode",
          "value": "on..."
        },
        {
          "type": "text",
          "value": " is easier to identify."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "DOM button is "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "onIntent"
        },
        {
          "type": "text",
          "value": " is a custom name. Signed as "
        },
        {
          "type": "inlineCode",
          "value": "(intent: SelectionIntent) => void"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": " is not a React mandatory field, but is a stable convention as a shared literal property in a discriminated union."
        }
      ]
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
      "label": "src/learning/react/chapter-08-state-architecture/04-callback-dispatch-intent/callback-intent-boundary.tsx",
      "value": "import { useState } from 'react'\n\ntype SelectionIntent =\n  | { type: 'order_selected'; orderId: string }\n  | { type: 'selection_cleared' }\n\ntype OrderSelectorProps = {\n  onIntent: (intent: SelectionIntent) => void\n}\n\nfunction OrderSelector({ onIntent }: OrderSelectorProps) {\n  return (\n    <div className=\"practice-stack\">\n      <button onClick={() => onIntent({ type: 'order_selected', orderId: 'ORD-204' })}>\n        Select ORD-204\n      </button>\n      <button onClick={() => onIntent({ type: 'selection_cleared' })}>Clear</button>\n    </div>\n  )\n}\n\nexport function CallbackIntentBoundary() {\n  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)\n\n  function handleIntent(intent: SelectionIntent) {\n    if (intent.type === 'order_selected') {\n      setSelectedOrderId(intent.orderId)\n      return\n    }\n\n    setSelectedOrderId(null)\n  }\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Callback intent</p>\n      <h3>Children report what happened</h3>\n      <OrderSelector onIntent={handleIntent} />\n      <p>Selection: {selectedOrderId ?? 'none'}</p>\n    </article>\n  )\n}"
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
                  "value": "union defines payloads for two legal intents."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "child only depends on "
                },
                {
                  "type": "inlineCode",
                  "value": "onIntent"
                },
                {
                  "type": "text",
                  "value": " contract, don't know the setter name."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "click creates the corresponding object; the clear action does not carry meaningless order id."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "parent press "
                },
                {
                  "type": "inlineCode",
                  "value": "type"
                },
                {
                  "type": "text",
                  "value": " narrowing, determine next state."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "clicks Select, the child creates "
        },
        {
          "type": "inlineCode",
          "value": "{ type: 'order_selected', orderId: 'ORD-204' }"
        },
        {
          "type": "text",
          "value": ". parent handler enters the first branch, enqueue "
        },
        {
          "type": "inlineCode",
          "value": "'ORD-204'"
        },
        {
          "type": "text",
          "value": ". New render updates the selection text to this id."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each click generates a new intent object reference. The handler reads the current click object; old "
        },
        {
          "type": "inlineCode",
          "value": "selectedOrderId"
        },
        {
          "type": "text",
          "value": " snapshot will not be rewritten synchronously in the current handler, and the new string will be visible in the next render."
        }
      ]
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
          "value": "Child does not have the write permission of the parent state and can only call callback; all transition decisions are concentrated in the owner, so the update path is one-way and can be located."
        }
      ]
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
          "value": "passes the parent object to the child and then executes "
        },
        {
          "type": "inlineCode",
          "value": "selection.orderId = 'ORD-204'"
        },
        {
          "type": "text",
          "value": " both mutates props and bypasses React setters, which will not form reliable render updates."
        }
      ]
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
          "value": "Child mutation parent data violates props readonly and owner-controlled update; callback directly exposing too many setter details will couple the child with the state shape."
        }
      ]
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
          "value": "If the child code must know \"which setters the parent has\", try to change the callback to the business intent; if the props object is assigned or pushed, check the mutation immediately."
        }
      ]
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
          "value": "Seller order row should report "
        },
        {
          "type": "inlineCode",
          "value": "order_selected"
        },
        {
          "type": "text",
          "value": ", cart row should report quantity change/remove intent; the page owner or reducer determines the final state."
        }
      ]
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
          "value": "This is the bridge from Chapter 3 callback props to Chapter 8 Chapter action/dispatch: the interface gradually changes from value callback to domain event object."
        }
      ]
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
          "value": "Child does not change the owner state; the child reports what happened, and the owner decides how to change it."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-preserving-state-and-resetting-with-key",
      "children": [
        {
          "type": "text",
          "value": "9.5 Preserving State and Resetting with "
        },
        {
          "type": "inlineCode",
          "value": "key"
        }
      ]
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
          "value": "When switching customer, should the checkout note be retained or cleared? The answer is not determined by the variable name, but by how React recognizes the component's identity in the UI tree."
        }
      ]
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
          "value": "understands the binding of state and tree position, and can predict preserve/reset of conditional UI, tab, and form draft. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is not just for lists; it can also be used to explicitly state \"this is another component identity\" in the same JSX position."
        }
      ]
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
          "value": "UI tree position, component type, state identity, preserve, reset, "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ". There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime creates JSX element objects and props values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework coordinates the old tree and the new tree according to tree position, element type and key."
                }
              ]
            }
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
                  "value": "customerId"
                },
                {
                  "type": "text",
                  "value": " prop and textarea event types."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling transforms JSX; it does not determine state identity."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention determines whether customer change should represent a new checkout draft identity."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "when "
        },
        {
          "type": "inlineCode",
          "value": "<CheckoutDraft>"
        },
        {
          "type": "text",
          "value": " appears again under the same parent position, type and key, React reuses its hook state. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " from "
        },
        {
          "type": "inlineCode",
          "value": "customer-a"
        },
        {
          "type": "text",
          "value": " becomes "
        },
        {
          "type": "inlineCode",
          "value": "customer-b"
        },
        {
          "type": "text",
          "value": ", the old fiber identity no longer matches, the old component unmounts, the new component mounts, "
        },
        {
          "type": "inlineCode",
          "value": "useState('')"
        },
        {
          "type": "text",
          "value": " is reinitialized."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React The location where the note state is saved is not in "
        },
        {
          "type": "inlineCode",
          "value": "CheckoutDraft"
        },
        {
          "type": "text",
          "value": " function object, nor in the JSX element object; it is stored inside React and is associated with \"this position + component type + key under parent\". When rendering for the first time, JavaScript creates "
        },
        {
          "type": "inlineCode",
          "value": "{ customerId: 'customer-a' }"
        },
        {
          "type": "text",
          "value": " props object, textarea change closure and JSX element description; React finds or initializes the note Hook cell on the corresponding child identity."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "clicks on Customer B, the parent handler puts "
        },
        {
          "type": "inlineCode",
          "value": "'customer-b'"
        },
        {
          "type": "text",
          "value": " joins the parent Hook queue. The next parent render creates "
        },
        {
          "type": "inlineCode",
          "value": "<CheckoutDraft key=\"customer-b\" ...>"
        },
        {
          "type": "text",
          "value": ". Reconciliation older identity "
        },
        {
          "type": "inlineCode",
          "value": "CheckoutDraft/customer-a"
        },
        {
          "type": "text",
          "value": " and new identity "
        },
        {
          "type": "inlineCode",
          "value": "CheckoutDraft/customer-b"
        },
        {
          "type": "text",
          "value": ", it is determined that it is not the same child: the old child is removed, and its note Hook cell is discarded together; the new child is mounted, and then "
        },
        {
          "type": "inlineCode",
          "value": "useState('')"
        },
        {
          "type": "text",
          "value": ". This is not because the setter actively writes the note into an empty string, but because the old state owner no longer exists."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is consumed by React and does not enter child props; "
        },
        {
          "type": "inlineCode",
          "value": "customerId"
        },
        {
          "type": "text",
          "value": " has just entered the new props object. TypeScript can only check the assignable type of key/prop, and will not determine whether the key is stable and whether it really represents the domain identity. The editor draft is unexpectedly retained after switching orders in SellerHub. You should check position/type/key first; if using "
        },
        {
          "type": "inlineCode",
          "value": "Math.random()"
        },
        {
          "type": "text",
          "value": ", each parent render will become a new identity, and the user may be reset every time he inputs a character."
        }
      ]
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
          "value": "key"
        },
        {
          "type": "text",
          "value": " is a React special prop and will not appear in "
        },
        {
          "type": "inlineCode",
          "value": "CheckoutDraftProps"
        },
        {
          "type": "text",
          "value": ". If the component itself requires customer id, "
        },
        {
          "type": "inlineCode",
          "value": "customerId={customerId}"
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
              "value": "Fixed attribute name, method name and signature:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "special attribute name is fixed to "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ". It accepts string/number identity; should be stable and unique among siblings. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is not a globally unique id and cannot be read as "
        },
        {
          "type": "inlineCode",
          "value": "props.key"
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/05-preserving-resetting-state/keyed-checkout-draft.tsx",
      "value": "import { useState } from 'react'\n\ntype CheckoutDraftProps = {\n  customerId: string\n}\n\nfunction CheckoutDraft({ customerId }: CheckoutDraftProps) {\n  const [note, setNote] = useState('')\n\n  return (\n    <label>\n      Note for {customerId}\n      <textarea\n        value={note}\n        onChange={(event) => setNote(event.target.value)}\n        placeholder=\"Delivery note\"\n      />\n    </label>\n  )\n}\n\nexport function KeyedCheckoutDraft() {\n  const [customerId, setCustomerId] = useState('customer-a')\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">State identity</p>\n      <h3>Reset a draft with an explicit key</h3>\n      <div className=\"practice-stack\">\n        <button onClick={() => setCustomerId('customer-a')}>Customer A</button>\n        <button onClick={() => setCustomerId('customer-b')}>Customer B</button>\n      </div>\n      <CheckoutDraft key={customerId} customerId={customerId} />\n    </article>\n  )\n}"
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
                  "value": "Child owns a local note draft because only that draft edits it."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Parent owns customer identity because it chooses which draft is active."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Both "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "customerId"
                },
                {
                  "type": "text",
                  "value": " receive the same domain id for different jobs."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Key changes reset hook state; customerId prop renders the label."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After Customer A enters note, the note state belongs to key "
        },
        {
          "type": "inlineCode",
          "value": "customer-a"
        },
        {
          "type": "text",
          "value": ". Click Customer B to make parent render key "
        },
        {
          "type": "inlineCode",
          "value": "customer-b"
        },
        {
          "type": "text",
          "value": "; React removes old child identity, mounts a new child, note initializes to empty string."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Parent customer id snapshot changes. Old child note snapshot is discarded on unmount; new child gets a new hook state cell. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is consumed by React reconciliation and never appears in the child props object."
        }
      ]
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
          "value": "React state is associated with a position in the rendered tree, refined by type and key. Changing key tells React this position now represents a different identity."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparative writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "if not "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ", only change "
        },
        {
          "type": "inlineCode",
          "value": "customerId"
        },
        {
          "type": "text",
          "value": " will retain "
        },
        {
          "type": "inlineCode",
          "value": "CheckoutDraft"
        },
        {
          "type": "text",
          "value": " state. This is correct behavior only if note should follow component, not customer."
        }
      ]
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
          "value": "It is assumed that the state of the unmounted component will still be retained, which violates the rules of binding the state to the tree identity; using array index or random key will make the identity unstable, leading to unexpected retention or repeated resets."
        }
      ]
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
          "value": "When the form state is retained or disappears unexpectedly, first check the JSX position, element type, conditional branches and "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ", do not add effects or group reset setters first."
        }
      ]
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
          "value": "CheckoutPage can key a draft by checkout session or customer; SellerOrdersPage can key an editor by order id when switching orders must discard local edits."
        }
      ]
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
          "value": "This section lists chapter 5 list "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " 's sibling matching is expanded to a complete state identity model."
        }
      ]
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
          "value": "State belongs to tree identity, not JSX variable; change "
        },
        {
          "type": "inlineCode",
          "value": "key"
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
      "id": "96-the-usereducer-mental-model",
      "children": [
        {
          "type": "text",
          "value": "9.6 The "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": " Mental Model"
        }
      ]
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
          "value": "When multiple event handlers are modifying the same complex state, transition rules will be scattered in the component. "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": " Separate \"event occurred\" from \"next state calculation\"."
        }
      ]
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
          "value": "Reducer is not "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": ". It is suitable for scenarios where action kinds are increasing, state fields are related, and transitions need to be reviewed centrally; for simple independent states, continue to use "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " is more direct."
        }
      ]
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
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": ", reducer, action, dispatch, current state, next state, render snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime calls pure reducer function and executes "
                },
                {
                  "type": "inlineCode",
                  "value": "switch"
                },
                {
                  "type": "text",
                  "value": " and create next object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework saves reducer state, provides dispatch, queues actions and triggers render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Check reducer parameter/return type and dispatch action shape."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling checks Hook call position via eslint/react-hooks."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention determines when transition complexity is sufficient to employ reducers."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "calls "
        },
        {
          "type": "inlineCode",
          "value": "dispatch(action)"
        },
        {
          "type": "text",
          "value": " will not rewrite the current lexical "
        },
        {
          "type": "inlineCode",
          "value": "cart"
        },
        {
          "type": "text",
          "value": ". React adds action to update queue; calls "
        },
        {
          "type": "inlineCode",
          "value": "cartReducer(currentState, action)"
        },
        {
          "type": "text",
          "value": ", save the return value as next state, and call the component again with the new snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React for "
        },
        {
          "type": "inlineCode",
          "value": "CartReducerTransition"
        },
        {
          "type": "text",
          "value": " saves a reducer Hook cell, which contains committed state and pending update queue; React also returns identity stable dispatch function. JavaScript creates "
        },
        {
          "type": "inlineCode",
          "value": "cart"
        },
        {
          "type": "text",
          "value": " binding, click closures and JSX objects for buttons. "
        },
        {
          "type": "inlineCode",
          "value": "cartReducer"
        },
        {
          "type": "text",
          "value": " itself is just a normal function; React gives it the reducer contract because it is passed to "
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
          "type": "text",
          "value": "clicks Add, the closure creates "
        },
        {
          "type": "inlineCode",
          "value": "{ type: 'item_added' }"
        },
        {
          "type": "text",
          "value": " plain object and call dispatch. Dispatch records the action to the Hook queue and requests render; it does not directly call the DOM, nor does it convert the current "
        },
        {
          "type": "inlineCode",
          "value": "cart"
        },
        {
          "type": "text",
          "value": " object is changed to the new value. When React processes a queue, it calls the reducers in sequence with the starting state of the queue, so consecutive actions will use the previous reducer result as the current state of the next action. After completion, the component is re-executed with the new "
        },
        {
          "type": "inlineCode",
          "value": "cart"
        },
        {
          "type": "text",
          "value": " binding points to the next state object."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This explains two common misjudgments: First, "
        },
        {
          "type": "inlineCode",
          "value": "cart.quantity"
        },
        {
          "type": "text",
          "value": " still gets the old snapshot, but the action is not lost; secondly, executing request/timer in the reducer will put the side effect into the calculation path that React may call repeatedly. Developing Strict Mode may make additional calls to reducer/initializer to expose impurity, where one result is ignored, so the pure reducer must allow repeated calculations for the same input. TypeScript checks action/state shapes, but does not manage the queue and does not ensure that the external runtime action is legal."
        }
      ]
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
          "value": "is "
        },
        {
          "type": "inlineCode",
          "value": "const [state, dispatch] = useReducer(reducer, initialArg, init?)"
        },
        {
          "type": "text",
          "value": ". Reducer shape is "
        },
        {
          "type": "inlineCode",
          "value": "(state, action) => nextState"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "dispatch(action)"
        },
        {
          "type": "text",
          "value": " does not return next state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is fixed to "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": "; The variable name in the tuple can be customized, but "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "dispatch"
        },
        {
          "type": "text",
          "value": " is a standard semantic name. Action "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": " is a convention rather than a mandatory field in React; the reducer must return legal state for each action."
        }
      ]
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
      "label": "src/learning/react/chapter-08-state-architecture/06-reducer-mental-model/cart-reducer-transition.tsx",
      "value": "import { useReducer } from 'react'\n\ntype CartState = {\n  quantity: number\n}\n\ntype CartAction =\n  | { type: 'item_added' }\n  | { type: 'item_removed' }\n\nfunction cartReducer(state: CartState, action: CartAction): CartState {\n  switch (action.type) {\n    case 'item_added':\n      return { quantity: state.quantity + 1 }\n    case 'item_removed':\n      return { quantity: Math.max(0, state.quantity - 1) }\n  }\n}\n\nexport function CartReducerTransition() {\n  const [cart, dispatch] = useReducer(cartReducer, { quantity: 1 })\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Reducer model</p>\n      <h3>Describe transitions with actions</h3>\n      <div className=\"practice-stack\">\n        <button onClick={() => dispatch({ type: 'item_removed' })}>Remove one</button>\n        <button onClick={() => dispatch({ type: 'item_added' })}>Add one</button>\n      </div>\n      <p>Quantity: {cart.quantity}</p>\n    </article>\n  )\n}"
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
                  "value": "CartState"
                },
                {
                  "type": "text",
                  "value": " defines the stored shape; "
                },
                {
                  "type": "inlineCode",
                  "value": "CartAction"
                },
                {
                  "type": "text",
                  "value": " defines legal events."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reducer reads current state and one action, then returns a new object."
                }
              ]
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
                  "value": "Math.max"
                },
                {
                  "type": "text",
                  "value": " enforces the quantity invariant in the transition boundary."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Component dispatches semantic actions and renders the current cart snapshot."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "When quantity is 1, click Add to create "
        },
        {
          "type": "inlineCode",
          "value": "{ type: 'item_added' }"
        },
        {
          "type": "text",
          "value": ". React puts the current "
        },
        {
          "type": "inlineCode",
          "value": "{ quantity: 1 }"
        },
        {
          "type": "text",
          "value": " and action are passed to reducer; reducer returns "
        },
        {
          "type": "inlineCode",
          "value": "{ quantity: 2 }"
        },
        {
          "type": "text",
          "value": ", React saves it and renders 2."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Action is a new object. Reducer parameter "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": " points to the current reducer state object, and the returned state is the new reference. Even if it has been dispatched, the "
        },
        {
          "type": "inlineCode",
          "value": "cart.quantity"
        },
        {
          "type": "text",
          "value": " is still 1; 2 will not be read until the next render."
        }
      ]
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
          "value": "Dispatch requests transition; the reducer calculates the result from the current state in the queue. When the Next snapshot is visible is managed by React and is not rewritten synchronously by the handler."
        }
      ]
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
          "value": "for an independent boolean, "
        },
        {
          "type": "inlineCode",
          "value": "useState(false)"
        },
        {
          "type": "text",
          "value": " is simpler. When only explicit action semantics and centralized transition rules can reduce complexity, "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": " only provides additional value."
        }
      ]
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
          "value": "Reading state immediately after dispatch as if it changed synchronously violates snapshot semantics. Using reducer for every trivial field violates the goal of keeping architecture proportional."
        }
      ]
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
          "value": "Choose reducer when many handlers repeat related update rules or when action history is easier to reason about than setter sequences. Do not choose it merely because a project is \"large.\""
        }
      ]
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
          "value": "Cart quantity/remove/clear is suitable for named actions with multi-step checkout transitions; the local modal open flag usually does not require a reducer."
        }
      ]
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
          "value": "Reducer continues to comply with the snapshot and batching rules of Chapter 4; the only change is that the transition is changed from scattered setters to centralized action processing."
        }
      ]
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
          "value": "Dispatch describes what happened; the reducer maps the current state and action to the next state; the result will be displayed only in the next render."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-pure-reducers-and-immutable-transitions",
      "children": [
        {
          "type": "text",
          "value": "9.7 Pure Reducers and Immutable Transitions"
        }
      ]
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
          "value": "Reducer will be executed in the render/update calculation path. If it mutates the old state, writes to storage, starts a timer, or sends a request, the same input may get unstable results, and the old snapshot will be contaminated."
        }
      ]
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
          "value": "Pure reducer allows each transition to be reasoned independently: it only reads parameters, only returns next state, and does not affect external systems. Immutable update preserves old references, allowing both React and developers to distinguish between previous and later snapshots."
        }
      ]
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
          "value": "pure function, immutable transition, referential identity, side effect boundary. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript allows object mutation, but "
                },
                {
                  "type": "inlineCode",
                  "value": "map"
                },
                {
                  "type": "text",
                  "value": " and spread create new array/object references."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React requires the reducer to be pure; developing Strict Mode may make additional calls to the reducer to expose accidental impurity."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript checks shapes, but does not prove that the function is pure by default and does not prevent all mutations."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling can report some mutation/style issues, but it cannot replace architectural review."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention leaves request, timer, storage and other tasks in the event/effect boundary and does not put them in the reducer."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " creates a new array; the unhit item reuses the old object, and the hit item uses spread to create a new object. In this way, only the actual changed path gets a new reference, and the old state graph remains unchanged."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React's reducer Hook cell saves the products array reference. When Checkbox changes, JavaScript creates an action object; React queue calls the reducer when processing the action. "
        },
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " creates a new array, and predicate reads old product objects one by one: the target object generates a new reference through spread, and other objects maintain structural sharing. After the Reducer returns, React can use the next array as the next state snapshot, and the closures of the old render still safely reference the old array graph."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If you execute "
        },
        {
          "type": "inlineCode",
          "value": "product.selected = !product.selected"
        },
        {
          "type": "text",
          "value": ", JavaScript does overwrite the old object immediately; this is the source of the bug, because previous snapshots, logs, or closures that have not yet been executed will also see the tampered properties. Returning the same array is also possible with React passing "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " determines that the state has not changed. Immutable update is not to \"cater to TypeScript\", but to protect snapshot isolation and reference-based change detection."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript can check "
        },
        {
          "type": "inlineCode",
          "value": "selected"
        },
        {
          "type": "text",
          "value": " is boolean, but it cannot be proved that the reducer is pure from the ordinary mutable type. ESLint can also only capture some patterns. SellerHub When reviewing the cart/admin reducer, you should search for parameter property assignment, "
        },
        {
          "type": "inlineCode",
          "value": "push"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "splice"
        },
        {
          "type": "text",
          "value": ", external variable writing, and the browser API; these are evidence that the reducer crosses the pure calculation boundary."
        }
      ]
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
          "value": "Reducer can only be based on "
        },
        {
          "type": "inlineCode",
          "value": "state"
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
          "value": " calculates the return value. "
        },
        {
          "type": "inlineCode",
          "value": "Array.prototype.map"
        },
        {
          "type": "text",
          "value": " returns a new array; object spread is JavaScript syntax. Setters, "
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
          "value": "localStorage.setItem"
        },
        {
          "type": "text",
          "value": " or mutation parameter."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
          "value": "map(callback)"
        },
        {
          "type": "text",
          "value": " is fixed JavaScript method; "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": "/"
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " is the React props of checkbox. Reducer signature remains "
        },
        {
          "type": "inlineCode",
          "value": "(products: Product[], action: ProductAction): Product[]"
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/07-pure-reducer-immutability/pure-reducer-immutability.tsx",
      "value": "import { useReducer } from 'react'\n\ntype Product = {\n  id: string\n  name: string\n  selected: boolean\n}\n\ntype ProductAction = {\n  type: 'selection_toggled'\n  productId: string\n}\n\nfunction productReducer(products: Product[], action: ProductAction): Product[] {\n  return products.map((product) =>\n    product.id === action.productId\n      ? { ...product, selected: !product.selected }\n      : product,\n  )\n}\n\nconst initialProducts: Product[] = [\n  { id: 'sku-201', name: 'Packing tape', selected: false },\n  { id: 'sku-202', name: 'Shipping labels', selected: true },\n]\n\nexport function PureReducerImmutability() {\n  const [products, dispatch] = useReducer(productReducer, initialProducts)\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Pure reducer</p>\n      <h3>Return new references without effects</h3>\n      <div className=\"practice-list\">\n        {products.map((product) => (\n          <label key={product.id}>\n            <input\n              type=\"checkbox\"\n              checked={product.selected}\n              onChange={() =>\n                dispatch({ type: 'selection_toggled', productId: product.id })\n              }\n            />\n            {product.name}\n          </label>\n        ))}\n      </div>\n    </article>\n  )\n}"
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
                  "value": "Reducer receives array state and action with product id."
                }
              ]
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
                  "value": "map"
                },
                {
                  "type": "text",
                  "value": " traverses the old array and does not execute "
                },
                {
                  "type": "inlineCode",
                  "value": "products[index] = ..."
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
                  "value": "target product Use spread to copy and flip selected; other object references can be safely reused."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Checkbox reads "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
                },
                {
                  "type": "text",
                  "value": ", only dispatch intent when changing."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After clicking the Packing tape checkbox, dispatch action. Reducer traverses two products, which is "
        },
        {
          "type": "inlineCode",
          "value": "sku-201"
        },
        {
          "type": "text",
          "value": " creates a new object for "
        },
        {
          "type": "inlineCode",
          "value": "sku-202"
        },
        {
          "type": "text",
          "value": " reuses the old object and returns a new array. The next render reads the new selected value."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The old array, old Packing tape object and old snapshot remain unchanged. Next state has a new array reference and a new Packing tape object reference; the Shipping labels reference remains unchanged. Action object only describes the target id."
        }
      ]
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
          "value": "React receives the new state graph returned by the reducer, and the next render reads the checkbox value from the new graph; the old graph can still accurately represent the previous snapshot."
        }
      ]
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
          "value": "products.find(...).selected = true; return products"
        },
        {
          "type": "text",
          "value": " will modify the old object and return the same array reference, breaking snapshot isolation and possibly causing updates to not be observed correctly."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rule violated:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Reducer mutation violates pure transition; request/timer/storage in reducer violates render/update calculation and does not execute the boundary of side effect."
        }
      ]
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
          "value": "review assignment, "
        },
        {
          "type": "inlineCode",
          "value": ".push"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": ".splice"
        },
        {
          "type": "text",
          "value": ", external variable writing, browser API and async call. Reducer should almost only contain branch, calculation, spread, map/filter and return."
        }
      ]
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
          "value": "AdminProductsPage's selection state and cart item updates should return new references; analytics, storage persistence or API mutations are placed outside the reducer."
        }
      ]
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
          "value": "This section turns the 4 immutable update in Chapter object/array into the hard constraint of the reducer, and takes over the side effect boundary in Chapter 7."
        }
      ]
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
          "value": "Reducer is a transition calculator without side effect: it does not change the old state, but only returns the next state."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-typed-action-unions-and-exhaustiveness-checks",
      "children": [
        {
          "type": "text",
          "value": "9.8 Typed Action Unions and Exhaustiveness Checks"
        }
      ]
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
          "value": "if action is just "
        },
        {
          "type": "inlineCode",
          "value": "{ type: string; payload?: unknown }"
        },
        {
          "type": "text",
          "value": ", TypeScript cannot know which type must carry which payload, nor can it remind the reducer to supplement the branch after adding an action."
        }
      ]
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
          "value": "Discriminated union binds the type and payload of each action. Switch narrowing allows each case to access only legal fields, "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": " default makes missing members a compile-time error."
        }
      ]
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
          "value": "discriminated union, literal type, narrowing, exhaustiveness, "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": ". There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime only sees ordinary object, string and switch; there is no union type."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework only hands actions to reducers and does not understand business unions."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Shared by "
                },
                {
                  "type": "inlineCode",
                  "value": "type"
                },
                {
                  "type": "text",
                  "value": " property narrowing, and use "
                },
                {
                  "type": "inlineCode",
                  "value": "never"
                },
                {
                  "type": "text",
                  "value": " check is missing."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling in editor/"
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " stage reports invalid action and non-exhaustive switch."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention selects action names and minimum payload that describe business events."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "enter "
        },
        {
          "type": "inlineCode",
          "value": "case 'review_started'"
        },
        {
          "type": "text",
          "value": ", TypeScript excludes other union members, so the action must have "
        },
        {
          "type": "inlineCode",
          "value": "orderId"
        },
        {
          "type": "text",
          "value": ". If a new member is added to the union and the switch is not processed, the action in default is no longer "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": ", pass to "
        },
        {
          "type": "inlineCode",
          "value": "assertNever"
        },
        {
          "type": "text",
          "value": " will report an error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript reads "
        },
        {
          "type": "inlineCode",
          "value": "ReviewAction"
        },
        {
          "type": "text",
          "value": ", and share "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": " property as discriminant. Source code enters "
        },
        {
          "type": "inlineCode",
          "value": "review_started"
        },
        {
          "type": "text",
          "value": " case, control-flow analysis narrows the action to "
        },
        {
          "type": "inlineCode",
          "value": "orderId"
        },
        {
          "type": "text",
          "value": "; enter "
        },
        {
          "type": "inlineCode",
          "value": "review_closed"
        },
        {
          "type": "text",
          "value": " is used, it is known that the field does not exist. If both members are excluded, theoretically only "
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
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Emit after union, "
        },
        {
          "type": "inlineCode",
          "value": "ReviewState"
        },
        {
          "type": "text",
          "value": ", parameter annotation and "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": " all disappear. Browser runtime only executes ordinary JavaScript "
        },
        {
          "type": "inlineCode",
          "value": "switch"
        },
        {
          "type": "text",
          "value": ", action is still plain object. Therefore typed "
        },
        {
          "type": "inlineCode",
          "value": "dispatch"
        },
        {
          "type": "text",
          "value": " can prevent the project source code from writing a call with missing payload, but it cannot prevent it from being written by "
        },
        {
          "type": "inlineCode",
          "value": "as ReviewAction"
        },
        {
          "type": "text",
          "value": " Forces asserted values, deserialized JSON, or unvalidated third-party data into the reducer. "
        },
        {
          "type": "inlineCode",
          "value": "assertNever"
        },
        {
          "type": "text",
          "value": " is runtime fallback, not runtime schema validation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Dispatch starts the action, the React queue saves the object value; when processing the queue, the reducer returns the new associated state, which is read only in the next render. If action is written as "
        },
        {
          "type": "inlineCode",
          "value": "{ type: string; orderId?: string }"
        },
        {
          "type": "text",
          "value": ", TypeScript cannot bind a certain type to the required payload, and "
        },
        {
          "type": "inlineCode",
          "value": "!"
        },
        {
          "type": "text",
          "value": ", cast or undefined branch. The action payload in SellerHub is optional everywhere, which is a direct identification signal of union modeling failure."
        }
      ]
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
          "value": "Union use "
        },
        {
          "type": "inlineCode",
          "value": "|"
        },
        {
          "type": "text",
          "value": " combination object types; all members share literal discriminant. "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": " indicates a value that should not exist under normal type analysis, and the external object will not be automatically verified in the browser."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
          "value": "type"
        },
        {
          "type": "text",
          "value": " is a common discriminant name but not TypeScript mandatory; "
        },
        {
          "type": "inlineCode",
          "value": "assertNever(value: never): never"
        },
        {
          "type": "text",
          "value": " is a local helper, not a built-in API. Each action literal must strictly satisfy the corresponding member."
        }
      ]
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
      "label": "src/learning/react/chapter-08-state-architecture/08-typed-action-union/typed-action-union.tsx",
      "value": "import { useReducer } from 'react'\n\ntype ReviewState = {\n  selectedOrderId: string | null\n  status: 'idle' | 'reviewing'\n}\n\ntype ReviewAction =\n  | { type: 'review_started'; orderId: string }\n  | { type: 'review_closed' }\n\nfunction assertNever(value: never): never {\n  throw new Error(`Unhandled action: ${JSON.stringify(value)}`)\n}\n\nfunction reviewReducer(_state: ReviewState, action: ReviewAction): ReviewState {\n  switch (action.type) {\n    case 'review_started':\n      return { selectedOrderId: action.orderId, status: 'reviewing' }\n    case 'review_closed':\n      return { selectedOrderId: null, status: 'idle' }\n    default:\n      return assertNever(action)\n  }\n}\n\nexport function TypedActionUnion() {\n  const [review, dispatch] = useReducer(reviewReducer, {\n    selectedOrderId: null,\n    status: 'idle',\n  })\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Action union</p>\n      <h3>Narrow payloads by action type</h3>\n      <div className=\"practice-stack\">\n        <button onClick={() => dispatch({ type: 'review_started', orderId: 'ORD-411' })}>\n          Review order\n        </button>\n        <button onClick={() => dispatch({ type: 'review_closed' })}>Close review</button>\n      </div>\n      <p>\n        {review.status}: {review.selectedOrderId ?? 'no order'}\n      </p>\n    </article>\n  )\n}"
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
                  "value": "ReviewAction"
                },
                {
                  "type": "text",
                  "value": " separates start payload from close no-payload."
                }
              ]
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
                  "value": "assertNever"
                },
                {
                  "type": "text",
                  "value": " provides both compile-time exhaustiveness and unexpected runtime input errors."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Switch case narrowing, only the start branch reads "
                },
                {
                  "type": "inlineCode",
                  "value": "action.orderId"
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
                  "value": "Dispatch call sites must construct a complete member."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Click Review order to create a legal start action. Reducer returns "
        },
        {
          "type": "inlineCode",
          "value": "{ selectedOrderId: 'ORD-411', status: 'reviewing' }"
        },
        {
          "type": "text",
          "value": ". Close action returns state with both fields reset simultaneously to avoid contradictory shape."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "creates a new action object every time dispatch; the reducer returns a new state object. TypeScript union disappears after emit, and runtime only retains "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": " and payload properties. The review snapshot of the current render will not be overwritten in place by dispatch."
        }
      ]
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
          "value": "Type narrowing ensures that the transition code only uses the payload of the action member; the reducer returns the related next fields again."
        }
      ]
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
          "value": "dispatch({ type: 'review_started' })"
        },
        {
          "type": "text",
          "value": " is missing "
        },
        {
          "type": "inlineCode",
          "value": "orderId"
        },
        {
          "type": "text",
          "value": " will report an error at compile time; but unknown objects parsed from JSON will not automatically obtain runtime validation due to type annotation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rule violated:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "type"
        },
        {
          "type": "text",
          "value": " is declared as normal "
        },
        {
          "type": "inlineCode",
          "value": "string"
        },
        {
          "type": "text",
          "value": " will lose discriminant; using a large number of optional payload fields will allow invalid combinations; thinking that TypeScript will verify network data will confuse compile time and runtime."
        }
      ]
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
          "value": "Check whether reducer case requires "
        },
        {
          "type": "inlineCode",
          "value": "as"
        },
        {
          "type": "text",
          "value": " cast or non-null assertion to access the payload. Action unions often do not bind type and payload correctly if needed."
        }
      ]
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
          "value": "Cart actions, checkout step actions and seller order selection actions are all suitable for typed union; API response still requires a separate runtime validation boundary in the future."
        }
      ]
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
          "value": "This section deepens the TypeScript boundary in previous chapters: the type helps write the reducer, but does not participate in the React runtime transition."
        }
      ]
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
          "value": "Each action member expresses a legal event; discriminant determines the payload, "
        },
        {
          "type": "inlineCode",
          "value": "never"
        },
        {
          "type": "text",
          "value": " Check branch integrity."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-context-provider-and-consumer-boundaries",
      "children": [
        {
          "type": "text",
          "value": "9.9 Context Provider and Consumer Boundaries"
        }
      ]
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
          "value": "Deep components require a store region, but intermediate layout components don't use it. Transparently transmitting props layer by layer will allow the middle layer to bear irrelevant contracts; Context provides scoped cross-layer reading."
        }
      ]
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
          "value": "Context solves data delivery and does not automatically determine state shape, owner or transition. Providers should be as close to real consumers as possible; plain props are still the default for explicit, local collaboration."
        }
      ]
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
          "value": ", provider value, nearest provider, consumer, default value, provider boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime creates a context object with an ordinary string value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework finds the nearest provider based on the component tree and lets consumers who read the value respond to changes."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Modeling "
                },
                {
                  "type": "inlineCode",
                  "value": "string | null"
                },
                {
                  "type": "text",
                  "value": ", custom hook runtime guard removes null branch."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling checks the Hook top call and provider value type."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention determines whether the region is worth providing across layers and how big the provider scope is."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useContext(StoreRegionContext)"
        },
        {
          "type": "text",
          "value": " does not search by import location, but by calling component to find the nearest matching provider upwards in the rendered tree. After the Provider value changes from North America to European Union, descendants reading that Context will render using the new value."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Module is initialized, JavaScript only creates "
        },
        {
          "type": "inlineCode",
          "value": "StoreRegionContext"
        },
        {
          "type": "text",
          "value": " object; provider and consumer must reference the same object identity. "
        },
        {
          "type": "inlineCode",
          "value": "ContextProviderBoundary"
        },
        {
          "type": "text",
          "value": " render, React saves the region Hook cell, and JavaScript creates the current region binding, button closure and provider element. "
        },
        {
          "type": "inlineCode",
          "value": "DeepShippingNotice"
        },
        {
          "type": "text",
          "value": " calls custom hook, and custom hook calls "
        },
        {
          "type": "inlineCode",
          "value": "useContext"
        },
        {
          "type": "text",
          "value": "; React searches up the nearest "
        },
        {
          "type": "inlineCode",
          "value": "StoreRegionContext"
        },
        {
          "type": "text",
          "value": " value."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After clicking Change region, the setter puts the next string into the owner queue. The provider of the new render receives different primitive values, and React uses "
        },
        {
          "type": "inlineCode",
          "value": "Object.is"
        },
        {
          "type": "text",
          "value": " compares the before and after values; reading the descendants of this Context will obtain the new value and re-render. Provider must be located above the consumer; \"wrapping itself\" in the return of the same component cannot affect the "
        },
        {
          "type": "inlineCode",
          "value": "useContext"
        },
        {
          "type": "text",
          "value": " call."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "createContext<string | null>(null)"
        },
        {
          "type": "text",
          "value": " only exists in type system. Runtime guard only really handles the lack of provider; without guard, runtime may still get null. If provider creates "
        },
        {
          "type": "inlineCode",
          "value": "{ region }"
        },
        {
          "type": "text",
          "value": " object, even if the region string has not changed, the object reference is different, and the Context will treat it as a new value. SellerHub When you see that the Context value contains many page local fields, you should track which consumers actually read them separately to avoid treating the Context as an unbounded global store."
        }
      ]
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
          "value": "createContext(defaultValue)"
        },
        {
          "type": "text",
          "value": " returns default when there is no matching provider. React 19 available "
        },
        {
          "type": "inlineCode",
          "value": "<StoreRegionContext value={region}>"
        },
        {
          "type": "text",
          "value": " provides value. "
        },
        {
          "type": "inlineCode",
          "value": "useContext(SomeContext)"
        },
        {
          "type": "text",
          "value": " must be called at the top level of component/custom hook."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
                  "value": "is fixed to "
                },
                {
                  "type": "inlineCode",
                  "value": "createContext"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "useContext"
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
                  "value": "Provider prop is fixed to "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
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
                  "value": "createContext<string | null>(null)"
                },
                {
                  "type": "text",
                  "value": " Explicit default boundary."
                }
              ]
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
                  "value": "useStoreRegion"
                },
                {
                  "type": "text",
                  "value": " is named "
                },
                {
                  "type": "inlineCode",
                  "value": "use"
                },
                {
                  "type": "text",
                  "value": ", making Rules of Hooks identifiable."
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
      "label": "src/learning/react/chapter-08-state-architecture/09-context-boundary/context-provider-boundary.tsx",
      "value": "import { createContext, useContext, useState } from 'react'\n\nconst StoreRegionContext = createContext<string | null>(null)\n\nfunction useStoreRegion() {\n  const region = useContext(StoreRegionContext)\n\n  if (region === null) {\n    throw new Error('useStoreRegion must be used within StoreRegionContext')\n  }\n\n  return region\n}\n\nfunction DeepShippingNotice() {\n  const region = useStoreRegion()\n\n  return <p>Shipping rules: {region}</p>\n}\n\nexport function ContextProviderBoundary() {\n  const [region, setRegion] = useState('North America')\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Context boundary</p>\n      <h3>Provide data to deep descendants</h3>\n      <button\n        onClick={() =>\n          setRegion((current) =>\n            current === 'North America' ? 'European Union' : 'North America',\n          )\n        }\n      >\n        Change region\n      </button>\n      <StoreRegionContext value={region}>\n        <section>\n          <DeepShippingNotice />\n        </section>\n      </StoreRegionContext>\n    </article>\n  )\n}"
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
                  "value": "Context type faithfully contains "
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
                  "value": "Custom hook calls "
                },
                {
                  "type": "inlineCode",
                  "value": "useContext"
                },
                {
                  "type": "text",
                  "value": " and execute runtime guard."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Deep consumer does not require region prop chain."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Owner is still "
                },
                {
                  "type": "inlineCode",
                  "value": "ContextProviderBoundary"
                },
                {
                  "type": "text",
                  "value": " 's "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": "; Context only delivers this value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React 19 provider uses the Context object itself plus "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " prop."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The provider value of the first render is North America, and the consumer reads it. After clicking, the owner state is updated, the provider obtains the European Union in the next render, and React re-renders to read the descendant of the Context."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Region string snapshot changes; provider value changes from one primitive value to another. The Context object itself is a module-level stable reference. Consumer reads the nearest provider's current render value instead of the global variable."
        }
      ]
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
          "value": "Consumer subscribes to the provider value of a specific Context. React can find the reader when the Value changes; components that do not read the Context do not automatically obtain the value because \"Context is a global variable\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparative writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Put all page states into one "
        },
        {
          "type": "inlineCode",
          "value": "{ region, cart, modal, filter }"
        },
        {
          "type": "text",
          "value": " context object will expand consumer coupling; for one or two layer components, explicit props are usually clearer."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rule violated:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Calling hook outside the provider will get null; treating Context as any mutable singleton will lose the React update model; randomly creating a huge value object every time it renders will change the reference and expand consumer updates."
        }
      ]
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
          "value": "First count the transparent transmission levels and consumers. If the middle layer really only delivers the value and the consumer spans multiple layers, then consider the Context; if the value only serves the local child, keep the props."
        }
      ]
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
          "value": "Authenticated user, store region or cart owner can have a controlled provider boundary; a single modal open state in the Dashboard should not automatically enter the app-wide Context."
        }
      ]
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
          "value": "Context does not replace the props in chapter 3, nor does it replace owner/reducer in this chapter; it only changes the way data reaches the consumer across layers."
        }
      ]
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
          "value": "Context is a tree-scoped delivery channel: the consumer reads the latest provider, owner and transition still need to be designed separately."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-combining-a-reducer-with-context",
      "children": [
        {
          "type": "text",
          "value": "9.10 Combining a Reducer with Context"
        }
      ]
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
          "value": "Reducer centralized transition, but if the deep component still needs to receive "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "dispatch"
        },
        {
          "type": "text",
          "value": ", delivery will become verbose. This section combines the reducer owner with two Contexts while maintaining the separation of responsibilities for transition and delivery."
        }
      ]
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
          "value": "State Context is separated from Dispatch Context, components that only send actions do not need to read the state value. This mode is suitable for clarifying complex shared state within a subtree, but it does not mean that the entire app should be merged into one reducer/context."
        }
      ]
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
          "value": "state context, dispatch context, provider component, reducer owner, deep dispatch. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime executes the reducer, creates state/action objects and calls the dispatch function."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework has reducer state in provider and resolves two Contexts by nearest provider."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Use "
                },
                {
                  "type": "inlineCode",
                  "value": "Dispatch<SelectionAction>"
                },
                {
                  "type": "text",
                  "value": " expresses dispatch contract, use "
                },
                {
                  "type": "inlineCode",
                  "value": "ReactNode"
                },
                {
                  "type": "text",
                  "value": " expresses children."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling checks provider values and consumer types."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention decides to split the two Contexts, and the provider only wraps the order selection subtree."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "SelectionProvider"
        },
        {
          "type": "text",
          "value": " is the state owner. It splits the same reducer tuple into two delivery channels: the state channel is given to readers, and the dispatch channel is given to writers. After the Deep child dispatches the action, the owner reducer calculates the next state, the provider value is updated, and the state consumer renders again."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
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
          "value": "SelectionProvider"
        },
        {
          "type": "text",
          "value": " render, React's reducer Hook cell returns the current state object and stable dispatch function. JavaScript then creates two provider elements: the value of the outer state Context is the current state reference, and the value of the inner dispatch Context is the dispatch reference. "
        },
        {
          "type": "inlineCode",
          "value": "children"
        },
        {
          "type": "text",
          "value": " is not copied data; it is the React node value placed under these two provider boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "DeepOrderControls"
        },
        {
          "type": "text",
          "value": " is executed, "
        },
        {
          "type": "inlineCode",
          "value": "useContext"
        },
        {
          "type": "text",
          "value": " matches two Context objects upward respectively. Click Select to create an action object, and dispatch puts it into the provider's reducer queue; React calls the reducer to get the new state object. In the next provider render, the state Context value reference changes and state consumers read the new selection; the dispatch identity remains stable, so there is no value change in the dispatch Context itself."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is split into two Contexts and only isolates the subscription reason for Context value change. It does not promise that the child will never be executed due to ordinary parent render; is "
        },
        {
          "type": "inlineCode",
          "value": "memo"
        },
        {
          "type": "text",
          "value": " belongs to another layer of problems after there is actual performance evidence. The core benefit of this chapter is contract separation: the write-only child does not have to obtain the state object, and the read-only child does not have to obtain the transition details. TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "Dispatch<SelectionAction>"
        },
        {
          "type": "text",
          "value": ", the runtime still only has ordinary functions. SellerHub If cart, auth, filter, and modal are all plugged into the same provider, any state object change will expand the coupling scope."
        }
      ]
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
          "value": "This section combines "
        },
        {
          "type": "inlineCode",
          "value": "useReducer"
        },
        {
          "type": "text",
          "value": ", "
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
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "Dispatch<A>"
        },
        {
          "type": "text",
          "value": " is a React TypeScript type, describing a function that receives an action and does not return a business result."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
                  "value": "Provider fixed prop is "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
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
                  "value": "Reducer signed as "
                },
                {
                  "type": "inlineCode",
                  "value": "(state: SelectionState, action: SelectionAction) => SelectionState"
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
                  "value": "Dispatch type is "
                },
                {
                  "type": "inlineCode",
                  "value": "Dispatch<SelectionAction>"
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
                  "value": "children"
                },
                {
                  "type": "text",
                  "value": " is a React composition idiomatic prop with type "
                },
                {
                  "type": "inlineCode",
                  "value": "ReactNode"
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
              "value": "Sample code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/10-reducer-context/reducer-context-boundary.tsx",
      "value": "import { createContext, useContext, useReducer } from 'react'\nimport type { Dispatch, ReactNode } from 'react'\n\ntype SelectionState = {\n  orderId: string | null\n}\n\ntype SelectionAction =\n  | { type: 'order_selected'; orderId: string }\n  | { type: 'selection_cleared' }\n\nconst SelectionStateContext = createContext<SelectionState | null>(null)\nconst SelectionDispatchContext = createContext<Dispatch<SelectionAction> | null>(null)\n\nfunction selectionReducer(\n  _state: SelectionState,\n  action: SelectionAction,\n): SelectionState {\n  switch (action.type) {\n    case 'order_selected':\n      return { orderId: action.orderId }\n    case 'selection_cleared':\n      return { orderId: null }\n  }\n}\n\nfunction SelectionProvider({ children }: { children: ReactNode }) {\n  const [state, dispatch] = useReducer(selectionReducer, { orderId: null })\n\n  return (\n    <SelectionStateContext value={state}>\n      <SelectionDispatchContext value={dispatch}>{children}</SelectionDispatchContext>\n    </SelectionStateContext>\n  )\n}\n\nfunction DeepOrderControls() {\n  const state = useContext(SelectionStateContext)\n  const dispatch = useContext(SelectionDispatchContext)\n\n  if (state === null || dispatch === null) {\n    throw new Error('DeepOrderControls must be used within SelectionProvider')\n  }\n\n  return (\n    <div>\n      <div className=\"practice-stack\">\n        <button onClick={() => dispatch({ type: 'order_selected', orderId: 'ORD-508' })}>\n          Select ORD-508\n        </button>\n        <button onClick={() => dispatch({ type: 'selection_cleared' })}>Clear</button>\n      </div>\n      <p>Selected: {state.orderId ?? 'none'}</p>\n    </div>\n  )\n}\n\nexport function ReducerContextBoundary() {\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Reducer with context</p>\n      <h3>Separate transition logic from delivery</h3>\n      <SelectionProvider>\n        <DeepOrderControls />\n      </SelectionProvider>\n    </article>\n  )\n}"
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
                  "value": "Two Contexts accurately model state and dispatch nullable defaults respectively."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reducer is only responsible for selection transition."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Provider is the only owner and provides both ends of the tuple to the subtree."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Deep controls read two channels, first execute missing-provider guard."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Root component determines the provider scope and only contains the subtree that needs to share the selection."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Deep button dispatches "
        },
        {
          "type": "inlineCode",
          "value": "order_selected"
        },
        {
          "type": "text",
          "value": ". Action reaches provider's reducer; reducer returns "
        },
        {
          "type": "inlineCode",
          "value": "{ orderId: 'ORD-508' }"
        },
        {
          "type": "text",
          "value": ". The State provider value becomes a new object, and the controls that read the state Context are rendered with a new snapshot."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Dispatch function identity is kept stable by React; state object reference changes with every valid transition. Action object is a one-time intent. Provider children prop represents subtree, not state copy."
        }
      ]
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
          "value": "Reducer determines the next state, and Context determines how state/dispatch reaches descendants across layers; the two mechanisms are combined according to their respective responsibilities and do not replace each other."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Comparative writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Single "
        },
        {
          "type": "inlineCode",
          "value": "{ state, dispatch }"
        },
        {
          "type": "text",
          "value": " value object also works, but each state render creates/changes the combined value. Splitting the Context prevents consumers who only rely on dispatch from having to read the state channel; whether it's worth it depends on the actual subtree."
        }
      ]
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
          "value": "Provider wrapping the entire app will turn local selection into global coupling; direct mutation state outside the context module bypasses the reducer; omitting guard will delay null errors to the depths."
        }
      ]
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
          "value": "Draw provider boundaries and consumers. If unrelated pages can also read/dispatch a local domain state, the provider is probably too high; if transitions are still scattered among consumers, reducer ownership is still unclear."
        }
      ]
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
          "value": "Cart subtree or checkout stepper can use reducer + Context; SellerOrdersPage's row, detail, and bulk actions can also share the selection owner. Local hover and accordion state remain in the component."
        }
      ]
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
          "value": "This section combines the 9.6 transition with the 9.9 delivery, but continues to comply with the props boundary in Chapter 3 and the snapshot rules in Chapter 4."
        }
      ]
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
          "value": "Reducer manages \"how to change\", and Context manages \"how to arrive\"; Provider is a clear owner, not a global variable."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-extracting-stateful-logic-into-a-custom-hook",
      "children": [
        {
          "type": "text",
          "value": "9.11 Extracting Stateful Logic into a Custom Hook"
        }
      ]
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
          "value": "Multiple components may repeat the same state + handlers combination. Duplicating the code will make the contract drift, but promoting or putting all state into the Context will incorrectly share data."
        }
      ]
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
          "value": "Custom hook reuses hook composition and return contract. It lets the component focus on the UI while retaining its own state ownership at each call location."
        }
      ]
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
          "value": "custom hook, stateful logic, hook composition, return contract, Rules of Hooks. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime calls a normal function and creates return object/functions."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework identifies the Hook calls and saves the state in the calling order of the caller component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Infer "
                },
                {
                  "type": "inlineCode",
                  "value": "{ isOpen, open, close }"
                },
                {
                  "type": "text",
                  "value": " can also be declared explicitly."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling depends on "
                },
                {
                  "type": "inlineCode",
                  "value": "use"
                },
                {
                  "type": "text",
                  "value": " naming recognizes Hooks rules and checks the calling location by eslint."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention decided to extract stable reuse logic instead of hiding every line of state code."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "calls "
        },
        {
          "type": "inlineCode",
          "value": "useDisclosure()"
        },
        {
          "type": "text",
          "value": " will execute "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "open"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "close"
        },
        {
          "type": "text",
          "value": " turns off the capture setter and does not share the module variable. Custom hook itself does not have a component instance independent of caller."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React will not mount "
        },
        {
          "type": "inlineCode",
          "value": "useDisclosure"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "CustomHookExtraction"
        },
        {
          "type": "text",
          "value": " function executes to "
        },
        {
          "type": "inlineCode",
          "value": "useDisclosure()"
        },
        {
          "type": "text",
          "value": ", JavaScript enters this ordinary function; "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " call is still registered on the current Hook call sequence of the caller component. After the Custom hook returns, JavaScript gets the new "
        },
        {
          "type": "inlineCode",
          "value": "{ isOpen, open, close }"
        },
        {
          "type": "text",
          "value": " object; This return object and the two closures belong to this render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "clicks Open, the button calls "
        },
        {
          "type": "inlineCode",
          "value": "open"
        },
        {
          "type": "text",
          "value": " closure. Closure calls the stable setter and adds true to the caller's Hook queue. The next time render calls the custom hook again, "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " gets true from the same Hook position, and then creates new return objects and closures. The old return object is not \"updated\" by React, just the plain JavaScript value of the old snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript You can infer the boolean and function signatures in the return object, or you can use explicit return type to fix the public contract; these types disappear at runtime. Named with "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " is not to let the function gain sharing capabilities, but to declare to React tooling that it will call Hooks. If called in condition, a certain render will skip the Hook slot, and subsequent state and call position cannot correspond stably. SellerHub The hook is only extracted when multiple components repeat the same state transition contract; truly sharing data still requires a common owner or Context."
        }
      ]
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
          "value": "Custom hook name must end with "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " and can only be called at the top level of a React function component or another custom hook. It can return object, tuple or single value; returning shape is a native API design."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
            }
          ]
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
          "value": "use..."
        },
        {
          "type": "text",
          "value": " name and top-level call. "
        },
        {
          "type": "inlineCode",
          "value": "initialOpen"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "isOpen"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "open"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "close"
        },
        {
          "type": "text",
          "value": " is a local contract and can be named according to the field. The sample signature is inferred from TypeScript to "
        },
        {
          "type": "inlineCode",
          "value": "(initialOpen?: boolean) => { isOpen: boolean; open: () => void; close: () => void }"
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/11-custom-hook-extraction/custom-hook-extraction.tsx",
      "value": "import { useState } from 'react'\n\nfunction useDisclosure(initialOpen = false) {\n  const [isOpen, setIsOpen] = useState(initialOpen)\n\n  return {\n    isOpen,\n    open: () => setIsOpen(true),\n    close: () => setIsOpen(false),\n  }\n}\n\nexport function CustomHookExtraction() {\n  const productDetails = useDisclosure()\n\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Custom hook</p>\n      <h3>Reuse a stateful contract</h3>\n      <div className=\"practice-stack\">\n        <button onClick={productDetails.open}>Open details</button>\n        <button onClick={productDetails.close}>Close details</button>\n      </div>\n      <p>{productDetails.isOpen ? 'Details are open' : 'Details are closed'}</p>\n    </article>\n  )\n}"
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
                  "value": "useDisclosure"
                },
                {
                  "type": "text",
                  "value": " to "
                },
                {
                  "type": "inlineCode",
                  "value": "use"
                },
                {
                  "type": "text",
                  "value": " and call "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
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
                  "value": "Return object exposes read value and two intent methods without leaking setter names."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Component calls hook every time render, and React retrieves the same state cell through stable order."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Buttons calls the return contract, and the UI reads current "
                },
                {
                  "type": "inlineCode",
                  "value": "isOpen"
                },
                {
                  "type": "text",
                  "value": " snapshot."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Click Open to call closure, setter enqueue true. React render component again and execute "
        },
        {
          "type": "inlineCode",
          "value": "useDisclosure"
        },
        {
          "type": "text",
          "value": "; this time "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " returns true, and the paragraph displays Details are open."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each render returns new object and handler function references, but the hook state cell is retained by React. old "
        },
        {
          "type": "inlineCode",
          "value": "isOpen"
        },
        {
          "type": "text",
          "value": " boolean binding remains unchanged, new render gets true. There is no Context here, so state is not shared across components."
        }
      ]
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
          "value": "Custom hook just reuses the JavaScript function that calls Hooks; the actual state identity still belongs to the component instance and hook position that called it."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "let isOpen = false"
        },
        {
          "type": "text",
          "value": " placed in module scope will become a shared mutable variable outside React, which will neither trigger render reliably nor leak across instances."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes Rule violated:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "does not end with "
        },
        {
          "type": "inlineCode",
          "value": "use"
        },
        {
          "type": "text",
          "value": " will make the tool unable to reliably identify hook semantics; calling it in the condition/loop/event handler will destabilize the hook order; treating custom hooks as shared stores will misunderstand ownership."
        }
      ]
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
          "value": "If the function calls Hook internally, it must be named "
        },
        {
          "type": "inlineCode",
          "value": "use..."
        },
        {
          "type": "text",
          "value": " and check if all call points are at the top level of component/custom hook. If you really need to share the same state, you should look for a common owner or Context instead of just extracting the hook."
        }
      ]
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
          "value": "can extract "
        },
        {
          "type": "inlineCode",
          "value": "useOrderSelection"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "useCheckoutStepper"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "useDisclosure"
        },
        {
          "type": "text",
          "value": " reuses local logic; auth/cart is shared from the provider owner, not from two components that happen to call the hook with the same name."
        }
      ]
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
          "value": "This section encapsulates the previous state/reducer/context mechanism into a reusable contract, while continuing to comply with all Hooks rules and snapshot semantics."
        }
      ]
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
          "value": "Custom hook shares logic but does not share state; state still belongs to each call location."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-independent-state-in-separate-custom-hook-calls",
      "children": [
        {
          "type": "text",
          "value": "9.12 Independent State in Separate Custom Hook Calls"
        }
      ]
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
          "value": "If two components call the same custom hook, will they automatically read the same quantity? This section uses two controls to prove that reusing function definitions does not equal sharing hook state."
        }
      ]
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
          "value": "distinguishes between logic reuse and state sharing, which can avoid mistaking custom hooks for Redux/Context store. When sharing is required, a common owner or provider must be explicitly selected; when independence is required, custom hooks naturally keep instances isolated."
        }
      ]
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
          "value": "independent hook state, component instance, call position, logic reuse versus data sharing. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime for each "
                },
                {
                  "type": "inlineCode",
                  "value": "QuantityControl"
                },
                {
                  "type": "text",
                  "value": " calls the same function definition."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework saves independent state cells for the hook position of each component instance."
                }
              ]
            }
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
                  "value": "initialQuantity"
                },
                {
                  "type": "text",
                  "value": " and return values of number/function types."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling Check "
                },
                {
                  "type": "inlineCode",
                  "value": "useQuantity"
                },
                {
                  "type": "text",
                  "value": " call is at the top level of component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The architecture convention determines whether Cart A/B should be independent or shared by a common cart owner."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "There are two in the Rendered tree "
        },
        {
          "type": "inlineCode",
          "value": "QuantityControl"
        },
        {
          "type": "text",
          "value": " identities. The first Hook slot of each identity is called "
        },
        {
          "type": "inlineCode",
          "value": "useQuantity"
        },
        {
          "type": "text",
          "value": " within "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": ", but the state cells belong to different component instances, so clicking A will not update B."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Only one of JavaScript "
        },
        {
          "type": "inlineCode",
          "value": "useQuantity"
        },
        {
          "type": "text",
          "value": " function definition, but there are two "
        },
        {
          "type": "inlineCode",
          "value": "QuantityControl"
        },
        {
          "type": "text",
          "value": " component identities. When Render A, "
        },
        {
          "type": "inlineCode",
          "value": "useQuantity(0)"
        },
        {
          "type": "text",
          "value": " 's "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " is connected to the first Hook cell of A; when rendering B, the same source code call is connected to the first Hook cell of B. The two calls also create return objects and "
        },
        {
          "type": "inlineCode",
          "value": "increase"
        },
        {
          "type": "text",
          "value": " closures, they capture the setters corresponding to their respective cells."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "When you click Cart A, A closure puts the updater into A's state queue. After React processing, only the quantity source state of A is changed; the queue of B is empty, so the snapshot of B is still 0. TypeScript sees that two calls have the same return type, but there is no type semantics of \"these two values ​​share identity\"; whether sharing or not is determined by the React tree owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "In contrast, if the custom hook internally calls "
        },
        {
          "type": "inlineCode",
          "value": "useContext(CartStateContext)"
        },
        {
          "type": "text",
          "value": ", different callers can read the same provider value; the shared source is provider, not custom hook. If the numbers of the Header badge of SellerHub and CartPage are inconsistent, you should check whether they call local "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " hook; The data will be synchronized only if they both read the same cart owner."
        }
      ]
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
          "value": "This section reuses "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " with custom hook rules. Custom hook function definitions can be shared; the React hook state generated by each call is isolated by caller identity."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
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
          "value": "useQuantity(initialQuantity: number)"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "{ quantity: number; increase: () => void }"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "label"
        },
        {
          "type": "text",
          "value": " is required custom prop. There is no \"shared\" fixed option; the share must be created separately by owner/Context."
        }
      ]
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
      "label": "src/learning/react/chapter-08-state-architecture/12-independent-hook-state/independent-hook-state.tsx",
      "value": "import { useState } from 'react'\n\nfunction useQuantity(initialQuantity: number) {\n  const [quantity, setQuantity] = useState(initialQuantity)\n\n  return {\n    quantity,\n    increase: () => setQuantity((current) => current + 1),\n  }\n}\n\nfunction QuantityControl({ label }: { label: string }) {\n  const control = useQuantity(0)\n\n  return (\n    <button onClick={control.increase}>\n      {label}: {control.quantity}\n    </button>\n  )\n}\n\nexport function IndependentHookState() {\n  return (\n    <article className=\"practice-card\">\n      <p className=\"practice-label\">Hook call identity</p>\n      <h3>Each hook call owns independent state</h3>\n      <div className=\"practice-stack\">\n        <QuantityControl label=\"Cart A\" />\n        <QuantityControl label=\"Cart B\" />\n      </div>\n    </article>\n  )\n}"
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
                  "value": "useQuantity"
                },
                {
                  "type": "text",
                  "value": " encapsulates number state and functional updater."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "each "
                },
                {
                  "type": "inlineCode",
                  "value": "QuantityControl"
                },
                {
                  "type": "text",
                  "value": " calls a hook at its top level."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Parent render two siblings of the same type; each component identity has an independent hook list."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The two buttons reuse the same logic contract, but read their respective quantities."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is the first time both are 0. When you click Cart A, the updater enqueue of A instance is 1; React renders A again, and A reads 1. The state cell of B has not received the update and still reads 0."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "A is from 0 to 1; the snapshot/reference path of B remains unchanged. The return objects and callbacks of the two controls are created independently; they are not connected through a Context or a common owner."
        }
      ]
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
          "value": "React associates state based on component tree identity and Hook call position, not the source code address of the custom hook function."
        }
      ]
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
          "value": "If two controls should display the same cart quantity synchronously, the state should be promoted to the common parent or read from the same Cart Context; calling local custom hook repeatedly will not synchronize."
        }
      ]
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
          "value": "mistook \"shared hook implementation\" for \"shared data source\" and confused logic reuse and state ownership."
        }
      ]
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
          "value": "Ask the owner of each hook call. If there are different component instances in DevTools and there is no common provider/source, they are independent states."
        }
      ]
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
          "value": "Two independent product-card disclosures can call the same hook; if Header cart badge and CartPage need the same cart state, they must read the same provider owner."
        }
      ]
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
          "value": "This section closes the loop between custom hooks and the original owner problem of this chapter: extracting code does not change state ownership."
        }
      ]
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
          "value": "The same hook code can be run multiple times; each caller identity gets its own state unless a common source is explicitly read."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-state-architecture-to-sellerhub",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping State Architecture to SellerHub"
        }
      ]
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
          "value": "After learning a single API, it is easy to mechanically apply reducer, Context or lifting state to all pages. This section selects source state, owner, derived data and delivery boundary according to the real page range."
        }
      ]
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
          "value": "The quality of the architecture depends on ownership and scope, not the number of Hooks. Page partial filter, cross-row selection, checkout workflow and auth user have different sharing scopes and should use different owners."
        }
      ]
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
          "value": "page owner, layout owner, domain provider, local UI state, shared workflow state. There are no new APIs in this section, the focus is on state ownership and architectural boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Five-layer boundary:"
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
                  "value": "JavaScript runtime is responsible for calculating visible products, totals, and transition functions."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React framework saves the state of chosen owners and propagates updates by tree/provider."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript modeling domain state/action/context contracts."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tooling validates modules and types, but does not replace the owner decision."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "architecture convention selects the scope based on readers, writers, lifetime and reset identity."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each scenario first lists source facts, and then lists derived values, all readers/writers, the life cycle and reset identity that need to be retained. Recently, component/provider, which can cover these requirements, becomes the owner; only complex transitions enter the reducer, and multi-layer delivery only enters the Context."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism deduction:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "splits the SellerHub state design into a verifiable worksheet instead of selecting Hook first:"
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
            "value": "Scene"
          }
        ],
        [
          {
            "type": "text",
            "value": "Source state and owner"
          }
        ],
        [
          {
            "type": "text",
            "value": "JavaScript Each render derives"
          }
        ],
        [
          {
            "type": "text",
            "value": "Write path"
          }
        ],
        [
          {
            "type": "text",
            "value": "Delivery / reset boundary"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "CartPage"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "items"
            },
            {
              "type": "text",
              "value": " by "
            },
            {
              "type": "inlineCode",
              "value": "CartStateProvider"
            },
            {
              "type": "text",
              "value": " owns"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "totalCount"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "subtotal"
            }
          ],
          [
            {
              "type": "text",
              "value": "Row dispatch typed cart action"
            }
          ],
          [
            {
              "type": "text",
              "value": "Deep readers use Context; cart session determines lifetime"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "ProductListPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "query/category"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "visibleProducts"
            },
            {
              "type": "text",
              "value": " array"
            }
          ],
          [
            {
              "type": "text",
              "value": "Filter callback props"
            }
          ],
          [
            {
              "type": "text",
              "value": "props in the page; whether to reset when leaving the page is determined by tree identity"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "CheckoutPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "step and validated draft saved by checkout owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current step label, completion state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Form/step children dispatch intent"
            }
          ],
          [
            {
              "type": "text",
              "value": "Provider only includes checkout; new session key reset local draft"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "SellerOrdersPage"
            }
          ],
          [
            {
              "type": "text",
              "value": "selected order id(s) saved by table/detail recent public owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "selected order object, bulk count"
            }
          ],
          [
            {
              "type": "text",
              "value": "Row callback or reducer action"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not promoted to the entire dashboard"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Auth user"
            }
          ],
          [
            {
              "type": "text",
              "value": "Verified current user saved by layout above owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "permissions/view labels"
            }
          ],
          [
            {
              "type": "text",
              "value": "Login/logout boundary update"
            }
          ],
          [
            {
              "type": "text",
              "value": "Multi-page consumers only use Auth Context"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Local modal"
            }
          ],
          [
            {
              "type": "text",
              "value": "open/close saved by modal trigger recent owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "button label"
            }
          ],
          [
            {
              "type": "text",
              "value": "Local callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not enter app-wide Context"
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
          "value": "still follows the same chain when a specific update occurs: browser event enters the handler, JavaScript creates a callback payload or action object, React owner queue saves the update, the next render creates a new snapshot, derived values are recalculated, and props objects or Context values are passed to readers. Custom hook can wrap this reading and writing logic into a contract, but it will not change the owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript can make cart action, checkout status and context value consistent in the source code, but will not verify the user/cart JSON returned by the API. If a field appears in reducer state, Context value object, child local state and derived cache, it means that the source boundary is likely to be repeated. The identification order in SellerHub should be fixed as: Column readers/writers → Determine lifetime/reset identity → Select owner → Design intent → Finally decide on props, Context or custom hook."
        }
      ]
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
          "value": "This section does not introduce API. The order of the rules is: minimum state first, then owner, then update contract, then decide reducer, and finally judge Context/custom hook."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name, method name and signature:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "does not have React forced "
        },
        {
          "type": "inlineCode",
          "value": "CartPageState"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "AuthContext"
        },
        {
          "type": "text",
          "value": " name. Fixed are Hook rules, provider "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", reducer/dispatch contract; field naming should accurately describe facts and events."
        }
      ]
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
      "label": "Snippet: SellerHub owner map",
      "value": "type StateBoundary = {\n  owner: string\n  sourceState: string[]\n  derivedData: string[]\n  delivery: 'props' | 'context'\n}\n\nconst cartBoundary: StateBoundary = {\n  owner: 'CartStateProvider',\n  sourceState: ['items', 'quantity'],\n  derivedData: ['totalCount', 'subtotal'],\n  delivery: 'context',\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This is a conceptual model, not the actual document created in this chapter. It forces the ownership facts to be written first, and then the delivery mechanism to be selected."
        }
      ]
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
                  "value": "owner"
                },
                {
                  "type": "text",
                  "value": " records the unique source owner."
                }
              ]
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
                  "value": "sourceState"
                },
                {
                  "type": "text",
                  "value": " Only list the facts that must be retained."
                }
              ]
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
                  "value": "derivedData"
                },
                {
                  "type": "text",
                  "value": " It is clear that the calculation result of state cannot be copied."
                }
              ]
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
                  "value": "delivery"
                },
                {
                  "type": "text",
                  "value": " is the last delivery option and is not equivalent to storage."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "in CartPage, first confirm that items/quantity needs to be retained across components, and then calculate count/subtotal from its render snapshot; the Cart provider only provides it when Header, rows, and summary are read across multiple layers. value/dispatch."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Cart item transition creates new state references; subtotal/count is just new render bindings. Filter query can be saved by ProductListPage owner; visible products are derived array. Checkout session key changes local draft state reset."
        }
      ]
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
          "value": "The readers, writers and lifetimes of different states are different. Putting them all into a Context will bind independent updates together; separating them by domain boundaries will keep the scope predictable."
        }
      ]
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
          "value": "Do not create "
        },
        {
          "type": "inlineCode",
          "value": "GlobalAppContext"
        },
        {
          "type": "text",
          "value": " Save auth, cart, filters, modals, hover and form drafts at the same time. Also don't copy local state for each cart across multiple siblings."
        }
      ]
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
          "value": "Owner If it is too low, it will lead to duplicate state, and if it is too high, it will lead to irrelevant coupling; all the complexity is left to the Context to confuse storage, transition and delivery; all local states enter the reducer to increase ceremony."
        }
      ]
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
          "value": "answers four questions for each state: who reads, who writes, how long to keep, and when to reset. When unable to answer, Context or reducer should not be selected first."
        }
      ]
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
                  "value": "CartPage"
                },
                {
                  "type": "text",
                  "value": ": items/quantity is source; subtotal/count is derived; cart subtree or cross-page requirements determine the provider scope."
                }
              ]
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
                  "value": "CheckoutPage"
                },
                {
                  "type": "text",
                  "value": ": step and validated draft fields can be managed by page reducer owner; session key can reset local subform."
                }
              ]
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
                  "value": "ProductListPage"
                },
                {
                  "type": "text",
                  "value": ": filter state remains on the page; visible products are derived from render."
                }
              ]
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
                  "value": "SellerOrdersPage"
                },
                {
                  "type": "text",
                  "value": ": selected order ids are placed at the nearest owner covering table/detail/bulk actions."
                }
              ]
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
                  "value": "AdminProductsPage"
                },
                {
                  "type": "text",
                  "value": ": audit selection is only promoted to the audit workspace and does not enter the global app."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Auth user: If both layout and multiple pages are read, a controlled Auth provider can be set, but external data verification is not automatically completed by TypeScript."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Dashboard local UI: accordion, hover, single modal open state stay in recent component."
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
          "value": "This section summarizes chapters 3–8: props defines the contract, state saves facts, lists/key defines identity, forms creates controlled inputs, effects only synchronizes external systems, this chapter is organized owner/transition/delivery/reuse."
        }
      ]
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
          "value": "First draw the facts and boundaries, and then select Hooks: minimal source, closest owner, explicit intent, pure transition, narrow provider, honest custom hook."
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
            "value": "Core signature"
          }
        ],
        [
          {
            "type": "text",
            "value": "runtime responsibility"
          }
        ],
        [
          {
            "type": "text",
            "value": "TypeScript Responsibilities"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "useState"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "useState(initialState)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save easily source state"
            }
          ],
          [
            {
              "type": "text",
              "value": "inference or constraint state/setter type"
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
              "value": "useReducer(reducer, initialArg, init?)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save reducer state, queue action"
            }
          ],
          [
            {
              "type": "text",
              "value": "Infer state, action, dispatch contract"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reducer"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "(state, action) => nextState"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure calculation next state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check parameters and return shape"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "dispatch"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "dispatch(action)"
            }
          ],
          [
            {
              "type": "text",
              "value": "requests reducer update"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only action union member"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "createContext"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "createContext(defaultValue)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create Context identity with default"
            }
          ],
          [
            {
              "type": "text",
              "value": "constraint provider/consumer value type"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React 19 provider"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "<SomeContext value={value}>"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
            },
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " type"
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
              "value": "useContext(SomeContext)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read recent provider value"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns the value type"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "custom hook"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "function useSomething(...)"
            }
          ],
          [
            {
              "type": "text",
              "value": "combines Hooks and reuses stateful logic"
            }
          ],
          [
            {
              "type": "text",
              "value": "inference parameter/return contract"
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
              "type": "inlineCode",
              "value": "<Component key={identity} />"
            }
          ],
          [
            {
              "type": "text",
              "value": "participates in tree reconciliation and state identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "check acceptable key type"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "discriminated union"
            }
          ],
          [
            {
              "type": "text",
              "value": "`{ type: 'a' }"
            }
          ],
          [
            {
              "type": "text",
              "value": "{ type: 'b'; value: T }`"
            }
          ],
          [
            {
              "type": "text",
              "value": "Emit followed by normal objects"
            }
          ],
          [
            {
              "type": "text",
              "value": "Narrow payload, check action completeness"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "never"
            },
            {
              "type": "text",
              "value": " exhaustiveness"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "assertNever(value: never)"
            }
          ],
          [
            {
              "type": "text",
              "value": "can throw"
            }
          ],
          [
            {
              "type": "text",
              "value": "error"
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
              "value": "React 19 Context syntax description:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The current project uses React 19.2, so the document and source code use "
        },
        {
          "type": "inlineCode",
          "value": "<SomeContext value={...}>"
        },
        {
          "type": "text",
          "value": ". Old data common "
        },
        {
          "type": "inlineCode",
          "value": "<SomeContext.Provider value={...}>"
        },
        {
          "type": "text",
          "value": " still explains the same provider concept, but not the modern default way of writing this chapter."
        }
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
            "value": "Visible symptoms"
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
              "value": "Save subtotal as state"
            }
          ],
          [
            {
              "type": "text",
              "value": "derived data should not be copied source"
            }
          ],
          [
            {
              "type": "text",
              "value": "quantity is inconsistent with subtotal"
            }
          ],
          [
            {
              "type": "text",
              "value": "Delete subtotal state, "
            },
            {
              "type": "inlineCode",
              "value": "reduce"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Save both id and complete entity copy"
            }
          ],
          [
            {
              "type": "text",
              "value": "one fact one source"
            }
          ],
          [
            {
              "type": "text",
              "value": "entity updated selection expired"
            }
          ],
          [
            {
              "type": "text",
              "value": "save id, derived from canonical collection object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Multiple mutually exclusive booleans"
            }
          ],
          [
            {
              "type": "text",
              "value": "state shape can express contradiction"
            }
          ],
          [
            {
              "type": "text",
              "value": "Two states at the same time true"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses literal union/status object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Child mutation parent data"
            }
          ],
          [
            {
              "type": "text",
              "value": "props readonly, owner update"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI is not updated or the old snapshot is contaminated"
            }
          ],
          [
            {
              "type": "text",
              "value": "callback/dispatch intent"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Owner too low"
            }
          ],
          [
            {
              "type": "text",
              "value": "shared readers have no common source"
            }
          ],
          [
            {
              "type": "text",
              "value": "siblings each display a different value"
            }
          ],
          [
            {
              "type": "text",
              "value": "is promoted to the nearest public parent"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Owner too high"
            }
          ],
          [
            {
              "type": "text",
              "value": "provider/update scope is too large"
            }
          ],
          [
            {
              "type": "text",
              "value": "Irrelevant component dependent page local state"
            }
          ],
          [
            {
              "type": "text",
              "value": "owner moves down to the smallest common boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thinks that the state is retained after unmount"
            }
          ],
          [
            {
              "type": "text",
              "value": "state binding tree identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "The draft disappears after returning to the page"
            }
          ],
          [
            {
              "type": "text",
              "value": "Clear whether to promote/persist; do not assume that"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "does not understand "
            },
            {
              "type": "inlineCode",
              "value": "key"
            }
          ],
          [
            {
              "type": "text",
              "value": "key participates in identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "draft unexpectedly retained or kept reset"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses stable domain key, check position/type"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Reducer mutation state"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer required pure/immutable"
            }
          ],
          [
            {
              "type": "text",
              "value": "snapshot pollution, update abnormality"
            }
          ],
          [
            {
              "type": "text",
              "value": "map/filter/spread Return new references"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Reducer executes effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "reducer only calculates next state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Strict Mode Repeat request/timer"
            }
          ],
          [
            {
              "type": "text",
              "value": "moved to event/effect boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Action "
            },
            {
              "type": "inlineCode",
              "value": "type: string"
            }
          ],
          [
            {
              "type": "text",
              "value": "lost discriminated union"
            }
          ],
          [
            {
              "type": "text",
              "value": "payload requires cast, missing case"
            }
          ],
          [
            {
              "type": "text",
              "value": "literal union + "
            },
            {
              "type": "inlineCode",
              "value": "never"
            },
            {
              "type": "text",
              "value": " check"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Context when global variable"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context is tree-scoped delivery"
            }
          ],
          [
            {
              "type": "text",
              "value": "owner is unclear and difficult to test and reuse"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines provider scope and owner"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "creates huge context value"
            }
          ],
          [
            {
              "type": "text",
              "value": "consumer boundary uncensored"
            }
          ],
          [
            {
              "type": "text",
              "value": "value change expansion re-render"
            }
          ],
          [
            {
              "type": "text",
              "value": "Separate responsibilities/remove Context, test first and then optimize"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Custom hook does not start with "
            },
            {
              "type": "inlineCode",
              "value": "use"
            },
            {
              "type": "text",
              "value": " starts with"
            }
          ],
          [
            {
              "type": "text",
              "value": "tooling does not recognize Hooks rules"
            }
          ],
          [
            {
              "type": "text",
              "value": "lint Missed detection or misleading naming"
            }
          ],
          [
            {
              "type": "text",
              "value": "changed to "
            },
            {
              "type": "inlineCode",
              "value": "use..."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "condition/loop call Hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "hook order must be stable"
            }
          ],
          [
            {
              "type": "text",
              "value": "state alignment error, lint error"
            }
          ],
          [
            {
              "type": "text",
              "value": "put all Hooks on the top layer"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thought the same hook would automatically share state"
            }
          ],
          [
            {
              "type": "text",
              "value": "logic reuse is not equal to state sharing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Two controls are out of sync"
            }
          ],
          [
            {
              "type": "text",
              "value": "Co-owner or Context"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "thought TypeScript verified runtime data"
            }
          ],
          [
            {
              "type": "text",
              "value": "types emit and then erase"
            }
          ],
          [
            {
              "type": "text",
              "value": "External illegal action/data Enter runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "Do runtime validation at the external boundary (subsequent topic)"
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
          "value": "final mini project is only used to integrate the mechanism of this chapter and does not replace the 9.x section teaching."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "121-project-name-and-goals",
      "children": [
        {
          "type": "text",
          "value": "12.1 Project name and goals"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "final mini project is "
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Cart State Workspace"
            }
          ]
        },
        {
          "type": "text",
          "value": ". It is not the complete SellerHub, but a static front-end state workspace, demonstrated with minimal domain data:"
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
                  "value": "CartStateProvider"
                },
                {
                  "type": "text",
                  "value": " is the clear cart state owner."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reducer saves minimal source state: cart items, unit price, quantity."
                }
              ]
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
                  "value": "totalCount"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "subtotal"
                },
                {
                  "type": "text",
                  "value": " Every time render is derived, the second state is not saved."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Child rows dispatch typed actions, not direct mutation cart."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Two typed Contexts deliver state and dispatch respectively."
                }
              ]
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
                  "value": "useCartState"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "useCartDispatch"
                },
                {
                  "type": "text",
                  "value": " encapsulates consumer guard."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Checkout draft maintains local state and passes session "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " clear reset."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reducer."
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
      "label": "Cart State Workspace file structure",
      "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/\n  cart-state-model.ts\n  cart-state-reducer.ts\n  cart-state-context.ts\n  cart-state-provider.tsx\n  use-cart-state.ts\n  cart-item-row.tsx\n  cart-summary.tsx\n  checkout-draft.tsx\n  cart-state-workspace.tsx\n  cart-state-workspace.css"
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
              "value": "cart-state-model.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines source state, action union and initial state factory"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-state-reducer.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure transition, immutable update, exhaustiveness check"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-state-context.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "definition typed state/dispatch Context identities"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-state-provider.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create reducer owner and provide two values"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "use-cart-state.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "encapsulates Context reading and missing-provider runtime guard"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-item-row.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "displays item and dispatches quantity/remove actions"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "derives count/subtotal from source state and dispatch clear/reset"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "checkout-draft.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "shows independent local draft and Context read"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-state-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "combines provider, list, summary and keyed draft"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-state-workspace.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Final project local layout and state style"
            }
          ]
        ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "State and action model:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-model.ts",
      "value": "export type CartItem = {\n  id: string\n  name: string\n  unitPrice: number\n  quantity: number\n}\n\nexport type CartState = {\n  items: CartItem[]\n}\n\nexport type CartAction =\n  | { type: 'quantity_changed'; itemId: string; nextQuantity: number }\n  | { type: 'item_removed'; itemId: string }\n  | { type: 'cart_cleared' }\n  | { type: 'cart_reset' }\n\nexport function createInitialCartState(): CartState {\n  return {\n    items: [\n      { id: 'sku-keyboard', name: 'Mechanical keyboard', unitPrice: 89, quantity: 1 },\n      { id: 'sku-mouse', name: 'Wireless mouse', unitPrice: 45, quantity: 2 },\n      { id: 'sku-stand', name: 'Monitor stand', unitPrice: 64, quantity: 1 },\n    ],\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Look line by line: "
        },
        {
          "type": "inlineCode",
          "value": "CartState"
        },
        {
          "type": "text",
          "value": " only saves item source facts; "
        },
        {
          "type": "inlineCode",
          "value": "CartAction"
        },
        {
          "type": "text",
          "value": " uses literal union to bind the payload; the factory can return a new state graph each time it is reset. TypeScript Checking these shapes at compile time, the browser runtime does not preserve type declarations."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Pure reducer: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-reducer.ts",
      "value": "import type { CartAction, CartState } from './cart-state-model'\nimport { createInitialCartState } from './cart-state-model'\n\nfunction assertNever(action: never): never {\n  throw new Error(`Unhandled cart action: ${JSON.stringify(action)}`)\n}\n\nexport function cartStateReducer(state: CartState, action: CartAction): CartState {\n  switch (action.type) {\n    case 'quantity_changed':\n      return {\n        ...state,\n        items: state.items.map((item) =>\n          item.id === action.itemId\n            ? { ...item, quantity: Math.max(1, action.nextQuantity) }\n            : item,\n        ),\n      }\n    case 'item_removed':\n      return {\n        ...state,\n        items: state.items.filter((item) => item.id !== action.itemId),\n      }\n    case 'cart_cleared':\n      return { ...state, items: [] }\n    case 'cart_reset':\n      return createInitialCartState()\n    default:\n      return assertNever(action)\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Look line by line: each case returns next state; quantity branch uses "
        },
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " and spread, remove branch use "
        },
        {
          "type": "inlineCode",
          "value": "filter"
        },
        {
          "type": "text",
          "value": ", clear/reset returns a new graph. Reducer does not write storage, does not request API, and does not start timer. "
        },
        {
          "type": "inlineCode",
          "value": "assertNever"
        },
        {
          "type": "text",
          "value": " The switch must be updated synchronously when the action union is expanded."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Typed Context identities: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-context.ts",
      "value": "import { createContext } from 'react'\nimport type { Dispatch } from 'react'\nimport type { CartAction, CartState } from './cart-state-model'\n\nexport const CartStateContext = createContext<CartState | null>(null)\nexport const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "No state is created here, only two typed delivery channels are created. "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " truthfully indicates \"no matching provider\"; the custom hook will be responsible for runtime guard later."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Reducer owner and provider:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-provider.tsx",
      "value": "import { useReducer } from 'react'\nimport type { ReactNode } from 'react'\nimport { CartDispatchContext, CartStateContext } from './cart-state-context'\nimport { createInitialCartState } from './cart-state-model'\nimport { cartStateReducer } from './cart-state-reducer'\n\ntype CartStateProviderProps = {\n  children: ReactNode\n}\n\nexport function CartStateProvider({ children }: CartStateProviderProps) {\n  const [state, dispatch] = useReducer(\n    cartStateReducer,\n    undefined,\n    createInitialCartState,\n  )\n\n  return (\n    <CartStateContext value={state}>\n      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>\n    </CartStateContext>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "CartStateProvider"
        },
        {
          "type": "text",
          "value": " is the only cart owner. The third "
        },
        {
          "type": "inlineCode",
          "value": "init"
        },
        {
          "type": "text",
          "value": " argument lets the initial state factory be executed during initialization; React 19 Context syntax uses "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " provides two parts of the tuple."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Custom Context hooks: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/use-cart-state.ts",
      "value": "import { useContext } from 'react'\nimport { CartDispatchContext, CartStateContext } from './cart-state-context'\n\nexport function useCartState() {\n  const state = useContext(CartStateContext)\n\n  if (state === null) {\n    throw new Error('useCartState must be used within CartStateProvider')\n  }\n\n  return state\n}\n\nexport function useCartDispatch() {\n  const dispatch = useContext(CartDispatchContext)\n\n  if (dispatch === null) {\n    throw new Error('useCartDispatch must be used within CartStateProvider')\n  }\n\n  return dispatch\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Two hooks reuse consumer lookup and guard. They share the same provider value because they both read the provider, not because the custom hook name automatically shares state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Child dispatch: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-item-row.tsx",
      "value": "import type { CartItem } from './cart-state-model'\nimport { useCartDispatch } from './use-cart-state'\n\ntype CartItemRowProps = {\n  item: CartItem\n}\n\nexport function CartItemRow({ item }: CartItemRowProps) {\n  const dispatch = useCartDispatch()\n\n  return (\n    <article className=\"cart-item-row\">\n      <div>\n        <h3>{item.name}</h3>\n        <p>${item.unitPrice.toFixed(2)} each</p>\n      </div>\n      <div className=\"quantity-controls\" aria-label={`Quantity for ${item.name}`}>\n        <button\n          type=\"button\"\n          onClick={() =>\n            dispatch({\n              type: 'quantity_changed',\n              itemId: item.id,\n              nextQuantity: item.quantity - 1,\n            })\n          }\n          disabled={item.quantity === 1}\n        >\n          -\n        </button>\n        <output>{item.quantity}</output>\n        <button\n          type=\"button\"\n          onClick={() =>\n            dispatch({\n              type: 'quantity_changed',\n              itemId: item.id,\n              nextQuantity: item.quantity + 1,\n            })\n          }\n        >\n          +\n        </button>\n      </div>\n      <button\n        className=\"text-button\"\n        type=\"button\"\n        onClick={() => dispatch({ type: 'item_removed', itemId: item.id })}\n      >\n        Remove\n      </button>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Row reads the current item snapshot through props and obtains dispatch through Context hook. It can only construct legal actions and cannot directly modify items; quantity invariant is protected by disabled UI and reducer clamp at the same time."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Derived summary: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-summary.tsx",
      "value": "import { useCartDispatch, useCartState } from './use-cart-state'\n\nexport function CartSummary() {\n  const { items } = useCartState()\n  const dispatch = useCartDispatch()\n  const totalCount = items.reduce((total, item) => total + item.quantity, 0)\n  const subtotal = items.reduce(\n    (total, item) => total + item.unitPrice * item.quantity,\n    0,\n  )\n\n  return (\n    <aside className=\"cart-summary\" aria-labelledby=\"cart-summary-title\">\n      <p className=\"project-eyebrow\">Derived during render</p>\n      <h3 id=\"cart-summary-title\">Cart summary</h3>\n      <dl>\n        <div>\n          <dt>Total items</dt>\n          <dd>{totalCount}</dd>\n        </div>\n        <div>\n          <dt>Subtotal</dt>\n          <dd>${subtotal.toFixed(2)}</dd>\n        </div>\n      </dl>\n      <div className=\"summary-actions\">\n        <button type=\"button\" onClick={() => dispatch({ type: 'cart_cleared' })}>\n          Clear cart\n        </button>\n        <button type=\"button\" onClick={() => dispatch({ type: 'cart_reset' })}>\n          Restore sample cart\n        </button>\n      </div>\n    </aside>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "totalCount"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "subtotal"
        },
        {
          "type": "text",
          "value": " are render-local variables. After any item transition, they are recalculated from the new items snapshot; there are no total setters, and there is no second source of truth."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Keyed checkout draft: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/checkout-draft.tsx",
      "value": "import { useState } from 'react'\nimport { useCartState } from './use-cart-state'\n\ntype CheckoutDraftProps = {\n  sessionId: number\n}\n\nexport function CheckoutDraft({ sessionId }: CheckoutDraftProps) {\n  const [deliveryNote, setDeliveryNote] = useState('')\n  const { items } = useCartState()\n\n  return (\n    <section className=\"checkout-draft\" aria-labelledby=\"checkout-draft-title\">\n      <div>\n        <p className=\"project-eyebrow\">Keyed local state</p>\n        <h3 id=\"checkout-draft-title\">Checkout draft #{sessionId}</h3>\n      </div>\n      <label>\n        Delivery note\n        <textarea\n          value={deliveryNote}\n          onChange={(event) => setDeliveryNote(event.target.value)}\n          placeholder=\"Add delivery instructions\"\n        />\n      </label>\n      <p>{items.length} product lines are available to this checkout draft.</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Delivery note only serves one draft, so it is saved by child local state; cart items come from shared provider. Two owners can be read in the same component, but cannot be mixed into one state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Workspace composition: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-workspace.tsx",
      "value": "import { useState } from 'react'\nimport { CartItemRow } from './cart-item-row'\nimport { CartStateProvider } from './cart-state-provider'\nimport { CartSummary } from './cart-summary'\nimport { CheckoutDraft } from './checkout-draft'\nimport { useCartState } from './use-cart-state'\nimport './cart-state-workspace.css'\n\nfunction CartWorkspaceContent() {\n  const { items } = useCartState()\n  const [checkoutSessionId, setCheckoutSessionId] = useState(1)\n\n  return (\n    <section className=\"cart-workspace\" aria-labelledby=\"cart-workspace-title\">\n      <header className=\"cart-workspace-header\">\n        <div>\n          <p className=\"project-eyebrow\">Final mini project</p>\n          <h2 id=\"cart-workspace-title\">Cart State Workspace</h2>\n          <p>\n            One reducer owns source state while descendants read and dispatch through typed\n            context hooks.\n          </p>\n        </div>\n        <button\n          type=\"button\"\n          onClick={() => setCheckoutSessionId((current) => current + 1)}\n        >\n          Reset checkout draft\n        </button>\n      </header>\n\n      <div className=\"cart-workspace-grid\">\n        <div className=\"cart-item-list\">\n          {items.length > 0 ? (\n            items.map((item) => <CartItemRow key={item.id} item={item} />)\n          ) : (\n            <p className=\"empty-cart-message\">The sample cart is empty.</p>\n          )}\n        </div>\n        <CartSummary />\n      </div>\n\n      <CheckoutDraft key={checkoutSessionId} sessionId={checkoutSessionId} />\n    </section>\n  )\n}\n\nexport function CartStateWorkspace() {\n  return (\n    <CartStateProvider>\n      <CartWorkspaceContent />\n    </CartStateProvider>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Provider must be in "
        },
        {
          "type": "inlineCode",
          "value": "CartWorkspaceContent"
        },
        {
          "type": "text",
          "value": " external, because content itself calls Context hook. "
        },
        {
          "type": "inlineCode",
          "value": "checkoutSessionId"
        },
        {
          "type": "text",
          "value": " does not belong to the cart reducer; it only determines the local draft identity. Click reset to add id, "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " changes make the old draft unmount and the new draft mount."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Project style:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-workspace.css",
      "value": ".cart-workspace {\n  margin-top: 64px;\n  padding: 30px;\n  border: 1px solid #b8c7c2;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.cart-workspace-header {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 24px;\n  padding-bottom: 24px;\n  border-bottom: 1px solid #d8e1de;\n}\n\n.cart-workspace-header h2 {\n  margin: 8px 0;\n  color: #182230;\n  font-size: 2rem;\n}\n\n.cart-workspace-header p:last-child {\n  max-width: 680px;\n  margin: 0;\n  color: #5f6c7b;\n  line-height: 1.6;\n}\n\n.cart-workspace button {\n  padding: 9px 12px;\n  color: #ffffff;\n  border: 1px solid #0b6b58;\n  border-radius: 7px;\n  background: #0b6b58;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n.cart-workspace button:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.cart-workspace-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.8fr);\n  gap: 22px;\n  padding: 24px 0;\n}\n\n.cart-item-list {\n  display: grid;\n  gap: 12px;\n}\n\n.cart-item-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 18px;\n  padding: 18px;\n  border: 1px solid #d8e1de;\n  border-radius: 8px;\n}\n\n.cart-item-row h3,\n.cart-item-row p {\n  margin: 0;\n}\n\n.cart-item-row p {\n  margin-top: 5px;\n  color: #667085;\n}\n\n.quantity-controls {\n  display: grid;\n  grid-template-columns: 36px 36px 36px;\n  align-items: center;\n  text-align: center;\n}\n\n.quantity-controls button {\n  padding: 7px;\n}\n\n.quantity-controls output {\n  font-weight: 850;\n}\n\n.cart-workspace .text-button {\n  color: #a33a2b;\n  border-color: transparent;\n  background: transparent;\n}\n\n.cart-summary,\n.checkout-draft {\n  padding: 22px;\n  border: 1px solid #b8c7c2;\n  border-radius: 8px;\n  background: #f6f9f8;\n}\n\n.cart-summary h3,\n.checkout-draft h3 {\n  margin: 8px 0 18px;\n  color: #182230;\n}\n\n.cart-summary dl {\n  display: grid;\n  gap: 12px;\n  margin: 0 0 20px;\n}\n\n.cart-summary dl div {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n}\n\n.cart-summary dd {\n  margin: 0;\n  font-weight: 850;\n}\n\n.summary-actions {\n  display: grid;\n  gap: 8px;\n}\n\n.checkout-draft {\n  display: grid;\n  grid-template-columns: 240px minmax(0, 1fr);\n  align-items: start;\n  gap: 24px;\n}\n\n.checkout-draft label {\n  display: grid;\n  gap: 7px;\n  color: #344054;\n  font-weight: 750;\n}\n\n.checkout-draft textarea {\n  min-height: 86px;\n  padding: 10px;\n  color: #182230;\n  border: 1px solid #94a3b8;\n  border-radius: 7px;\n  resize: vertical;\n}\n\n.checkout-draft > p,\n.empty-cart-message {\n  margin: 0;\n  color: #667085;\n  line-height: 1.55;\n}\n\n.empty-cart-message {\n  padding: 32px;\n  border: 1px dashed #94a3b8;\n  border-radius: 8px;\n  text-align: center;\n}\n\n@media (max-width: 800px) {\n  .cart-workspace-header,\n  .checkout-draft {\n    grid-template-columns: 1fr;\n    flex-direction: column;\n  }\n\n  .cart-workspace-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 560px) {\n  .cart-workspace {\n    padding: 20px;\n  }\n\n  .cart-item-row {\n    grid-template-columns: 1fr;\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "CSS is only responsible for presentation and does not participate in state ownership, Context lookup or reducer transition. Responsive rules keep narrow screen layouts from overlapping."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "124-complete-execution-flow",
      "children": [
        {
          "type": "text",
          "value": "12.4 complete execution flow"
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
                  "value": "CartStateWorkspace"
                },
                {
                  "type": "text",
                  "value": " mount "
                },
                {
                  "type": "inlineCode",
                  "value": "CartStateProvider"
                },
                {
                  "type": "text",
                  "value": ", provider initializes reducer state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Content, rows, summary, draft read the latest provider through custom hooks."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Row click creates a typed action; dispatch sends the action to the provider owner."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Pure reducer reads the current reducer state and returns the immutable next state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React generates a new render snapshot; rows reads next items, and summary recalculates count/subtotal."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Clicking Reset checkout draft will only update the session id; key changes will rebuild the draft local state, but not the cart provider state."
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
      "id": "125-mechanism-boundary-and-error-identification",
      "children": [
        {
          "type": "text",
          "value": "12.5 Mechanism boundary and error identification"
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
                      "value": "React runtime: "
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " saves reducer/local state, processes dispatch, Context lookup and key identity."
                }
              ]
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
                  "value": " executes reducer, reduce/map/filter, creates objects and closures."
                }
              ]
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
                  "value": " check action/context/hooks/props; Runtime external JSON will not be validated."
                }
              ]
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
                  "value": " Vite convert TSX, ESLint check Hooks rules, "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " Check type in build."
                }
              ]
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
                      "value": "Error identification:"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " Reducer appears assignment/browser API is a pure boundary error; summary appears setter is a redundant state signal; hook throws an error outside the provider indicating a provider scope error; two hook callers are not synchronized indicating that there is no common owner."
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
            "value": "Priority answer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "be calculated from the current props/state?"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not saved, derived from render"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Do the two states express the same fact?"
            }
          ],
          [
            {
              "type": "text",
              "value": "retains one source and the other derives"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Are multiple booleans mutually exclusive?"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses literal union/status"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "only one component used?"
            }
          ],
          [
            {
              "type": "text",
              "value": "remains in local state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Can multiple siblings read and write?"
            }
          ],
          [
            {
              "type": "text",
              "value": "is promoted to the nearest public parent"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Transition scattered, related and multiplied?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Consider "
            },
            {
              "type": "inlineCode",
              "value": "useReducer"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "only span one or two floors?"
            }
          ],
          [
            {
              "type": "text",
              "value": "takes priority props"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "span multiple layers and the middle layer is not used?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Consider narrow range Context"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Do you only want to reuse stateful code?"
            }
          ],
          [
            {
              "type": "text",
              "value": "extraction custom hook"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Do you want multiple callers to share the same state?"
            }
          ],
          [
            {
              "type": "text",
              "value": "common to owner/Context, not by the same name hook"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Do you want to reset local component state?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check tree position/type, use stable "
            },
            {
              "type": "inlineCode",
              "value": "key"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Reducer?"
            }
          ],
          [
            {
              "type": "text",
              "value": "removed reducer"
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
              "value": "Action union template: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Template: typed reducer action",
      "value": "type State = {\n  selectedId: string | null\n}\n\ntype Action =\n  | { type: 'selection_changed'; selectedId: string }\n  | { type: 'selection_cleared' }\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case 'selection_changed':\n      return { selectedId: action.selectedId }\n    case 'selection_cleared':\n      return { selectedId: null }\n  }\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Study guide document for this revision:"
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
              "value": "docs/react/chapter-08-state-architecture/react-chapter-08-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 8 Chapter mechanism explanation, exercise index and final project description"
            }
          ],
          [
            {
              "type": "text",
              "value": "revised and reserved"
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
              "value": "The actual exercises and entry files for this chapter:"
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
              "value": "src/learning/react/chapter-08-state-architecture/chapter-08-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "mounts all exercises and final project in this chapter"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/chapter-08-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise shared style in this chapter"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/01-minimal-state/minimal-cart-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Minimal state and derived cart totals"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/02-state-shape-boundaries/state-shape-boundaries.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "State shape and single source of truth"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/03-state-owner-lifting/shared-filter-owner.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Recent public owner and lifting state"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/04-callback-dispatch-intent/callback-intent-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Child intent with callback prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/05-preserving-resetting-state/keyed-checkout-draft.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Tree identity and key reset"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/06-reducer-mental-model/cart-reducer-transition.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reducer queue and dispatch snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/07-pure-reducer-immutability/pure-reducer-immutability.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure reducer with immutable references"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/08-typed-action-union/typed-action-union.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Discriminated union with exhaustive reducer"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/09-context-boundary/context-provider-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Provider / consumer boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/10-reducer-context/reducer-context-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reducer and dual Context combination"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/11-custom-hook-extraction/custom-hook-extraction.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Stateful logic extract"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/12-independent-hook-state/independent-hook-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Independent state"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
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
              "value": "final mini project real file:"
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
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-model.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Cart state, action union and initial value"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-reducer.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pure cart transitions"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-context.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Typed state/dispatch Context"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-provider.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reducer owner and provider boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/use-cart-state.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context consumer hooks and runtime guard"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-item-row.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Child dispatch controls"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derived count and subtotal"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/checkout-draft.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Keyed local checkout draft"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-workspace.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Final project composition root"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-workspace.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Final project partial style"
            }
          ],
          [
            {
              "type": "text",
              "value": "already exists,"
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
              "value": "associated integration file:"
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
              "value": "README.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 8 Learning route and completion state"
            }
          ],
          [
            {
              "type": "text",
              "value": "has been verified,"
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
              "value": "mounts "
            },
            {
              "type": "inlineCode",
              "value": "Chapter08PracticeRoot"
            }
          ],
          [
            {
              "type": "text",
              "value": "has been verified,"
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
              "value": "Concept fragment does not need to be created:"
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
                  "value": "Snippet: redundant cart totals"
                }
              ]
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
                  "value": "Snippet: SellerHub owner map"
                }
              ]
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
                  "value": "Template: typed reducer action"
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
          "value": "It is recommended to keep only one four-column card per mechanism:"
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
            "value": "Question"
          }
        ],
        [
          {
            "type": "text",
            "value": "Your answer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Source fact?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Write the minimum field"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Owner?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Write the latest public readers/writers ancestor"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Update?"
            }
          ],
          [
            {
              "type": "text",
              "value": "setter callback, intent callback or action union"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Delivery How to get there?"
            }
          ],
          [
            {
              "type": "text",
              "value": "props or narrow range Context"
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
          "value": "records a complete transition for each exercise: old snapshot, action/intent, next reference, derived output, which consumers render. Don't just excerpt the API signature."
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
                  "value": "Why should subtotal generally not be saved as state at the same time as cart items?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What is the difference between redundant, duplicate and contradictory state?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "How to find the nearest public owner of shared state?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Lifting state up Why not copy state?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Callback prop and dispatch action have in common in \"expressing intent\"?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React preserve or reset component state according to what?"
                }
              ]
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
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " appear in child props?"
                }
              ]
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
                  "value": "dispatch"
                },
                {
                  "type": "text",
                  "value": "?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reducer have to be pure, and why can't it execute request/localStorage/timer?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Typed action union How to bind action type and payload?"
                }
              ]
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
                  "value": "never"
                },
                {
                  "type": "text",
                  "value": " help exhaustiveness checking?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Context solve storage, transition or delivery?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Provider value changes, which descendants are associated with it?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reducer + Context?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Custom hook Why must "
                },
                {
                  "type": "inlineCode",
                  "value": "use"
                },
                {
                  "type": "text",
                  "value": " and is called at the top level?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why don't two components automatically share state when calling the same custom hook?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript What does reducer/context check for and what does it not do in the browser runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "SellerHub?"
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
      "label": "Final memory model",
      "value": "1. Store the minimum source facts.\n2. Derive everything else during render.\n3. Place the source at the closest common owner.\n4. Pass values down; report intent up.\n5. Use tree position and key to control state identity.\n6. Use a reducer when transition rules need one pure home.\n7. Use action unions to make legal events explicit.\n8. Use Context only to deliver values across a real subtree boundary.\n9. Use custom hooks to reuse logic, not to imply shared state.\n10. Keep runtime, React, types, tooling, and architecture as separate layers."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "One sentence summary:"
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "State architecture First determine the fact, owner, identity and transition, and then select "
            },
            {
              "type": "inlineCode",
              "value": "useReducer"
            },
            {
              "type": "text",
              "value": ", Context, or custom hook; the tool serves the boundary, not replaces the boundary."
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
                  "href": "https://react.dev/learn/choosing-the-state-structure",
                  "children": [
                    {
                      "type": "text",
                      "value": "Choosing the State Structure"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": minimal, redundant, duplicate and contradictory state."
                }
              ]
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
                  "href": "https://react.dev/learn/sharing-state-between-components",
                  "children": [
                    {
                      "type": "text",
                      "value": "Sharing State Between Components"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": state owner and lifting state up."
                }
              ]
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
                  "value": ": tree position, type and "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " identity."
                }
              ]
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
                  "href": "https://react.dev/learn/extracting-state-logic-into-a-reducer",
                  "children": [
                    {
                      "type": "text",
                      "value": "Extracting State Logic into a Reducer"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": action, reducer and dispatch mental model."
                }
              ]
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
                  "value": ": Signature, snapshot, dispatch, purity and Strict Mode caveats."
                }
              ]
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
                  "value": ": provider/consumer boundary and Context trade-offs."
                }
              ]
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
                  "href": "https://react.dev/learn/scaling-up-with-reducer-and-context",
                  "children": [
                    {
                      "type": "text",
                      "value": "Scaling Up with Reducer and Context"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": reducer + Context pattern."
                }
              ]
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
                  "value": ": logic reuse and independent state."
                }
              ]
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
                  "href": "https://react.dev/reference/rules/rules-of-hooks",
                  "children": [
                    {
                      "type": "text",
                      "value": "Rules of Hooks"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Top-level call and legal call location."
                }
              ]
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
                      "value": "Using TypeScript"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": React reducer, Context and event typing."
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
                  "value": ": discriminated union and control-flow narrowing."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type",
                  "children": [
                    {
                      "type": "text",
                      "value": "The "
                    },
                    {
                      "type": "inlineCode",
                      "value": "never"
                    },
                    {
                      "type": "text",
                      "value": " type"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": exhaustiveness checking."
                }
              ]
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
                      "value": "React JSX"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Static checking and emit boundaries for TSX."
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
              "value": "MDN Auxiliary documents:"
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
                  "href": "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Array.prototype.reduce()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": derived total calculation."
                }
              ]
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
                  "href": "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Array.prototype.map()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "filter()"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": immutable array transitions."
                }
              ]
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
                  "href": "https://developer.mozilla.org/docs/Web/API/Event",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Event"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Boundary between browser event object and React handler."
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
                  "value": ": The callback props, lifting state, derived filtering, reducer and custom hooks chapters serve as auxiliary explanations."
                }
              ]
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
                  "value": ": Only used to compare Context usage scenarios in traditional React projects."
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
          "value": "This chapter is based on the current "
        },
        {
          "type": "inlineCode",
          "value": "react.dev"
        },
        {
          "type": "text",
          "value": " shall prevail. If the local PDF uses the old provider writing method, old life cycle terminology or conflicts with the React 19 document, it should be regarded as historical data and does not cover the official current behavior."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter08Content() {
  return <DocumentRenderer document={chapterDocument} />
}
