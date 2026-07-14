import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-04",
  "slug": "chapter-04-state-and-events",
  "title": "React Chapter 4: State, Events, and Interactive Updates",
  "sourcePath": "docs/react/chapter-04-state-and-events/react-chapter-04-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-4-state-events-and-interactive-updates",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 4: State, Events, and Interactive Updates"
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
              "value": "General entrance to the exercises in this chapter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/chapter-04-practice-root.tsx"
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
              "value": "src/learning/react/chapter-04-state-and-events/chapter-04-practice.css"
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
              "value": "event handler callback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/01-event-handler-callback/event-handler-callback.tsx"
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
              "value": "transfer and call handler"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/02-pass-vs-call-handler/pass-vs-call-handler.tsx"
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
              "value": "render Error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: called handler during render"
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
              "value": "9.2"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "event object, propagation and default behavior"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/03-event-object-and-default-behavior/event-object-and-default-behavior.tsx"
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
              "value": "useState component memory"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/04-use-state-memory/use-state-memory.tsx"
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
              "value": "local variable and state"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/05-local-variable-vs-state/local-variable-vs-state.tsx"
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
              "value": "state setter and current render"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/06-state-setter-current-render/state-setter-current-render.tsx"
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
              "value": "state snapshot and closure"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/07-state-snapshot/state-snapshot.tsx"
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
              "value": "batched replacement updates"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/08-batched-updates/batched-updates.tsx"
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
              "value": "functional updater queue"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/09-functional-update/functional-update.tsx"
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
              "value": "object state replacement"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/10-object-state-update/object-state-update.tsx"
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
              "value": "direct object mutation error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: direct object state mutation"
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
              "value": "9.10"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "array state replacement"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/11-array-state-update/array-state-update.tsx"
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
              "value": "direct array mutation error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: direct array state mutation"
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
              "value": "typed event handler"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/12-typed-event-handler/typed-event-handler.tsx"
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
              "value": "mini project type"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-types.ts"
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
              "value": "mini project seed data"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-seed-data.ts"
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
              "value": "quantity controls"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-controls.tsx"
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
              "value": "cart item row"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-item-row.tsx"
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
              "value": "derived cart summary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-summary.tsx"
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
              "value": "mini project root"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.tsx"
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
              "value": "mini project styles"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.css"
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
              "value": "Vite app mount adapter"
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
          "value": "This document is the fourth chapter of the current React + TypeScript + Vite learning path. The first chapter clarifies the responsibilities of React, TypeScript, Vite and browser DOM; the second chapter establishes JSX and component models; the third chapter interprets props as parent-to-child input; the fourth chapter provides the first system answer to \"Why does the page change after user operation?\""
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter only covers the first layer mechanism of React interaction: event handler, "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": ", render snapshot, update queue, batching, functional update, immutable update of objects and arrays, and TypeScript event type. It does not introduce effect, context, reducer, router, data fetching, TanStack Query, React Hook Form, backend API, Prisma or SellerHub implementation."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Current project evidence:"
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
                  "value": "package.json"
                },
                {
                  "type": "text",
                  "value": " Declaration React "
                },
                {
                  "type": "inlineCode",
                  "value": "^19.2.0"
                },
                {
                  "type": "text",
                  "value": ", TypeScript "
                },
                {
                  "type": "inlineCode",
                  "value": "~5.9.3"
                },
                {
                  "type": "text",
                  "value": " and Vite "
                },
                {
                  "type": "inlineCode",
                  "value": "^7.2.4"
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
                  "value": "tsconfig.app.json"
                },
                {
                  "type": "text",
                  "value": " enable "
                },
                {
                  "type": "inlineCode",
                  "value": "strict"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "noEmit"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "jsx: \"react-jsx\""
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
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " Load "
                },
                {
                  "type": "inlineCode",
                  "value": "/src/sudoku/main.tsx"
                },
                {
                  "type": "text",
                  "value": "; This file creates the React root and imports the root level "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
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
                  "value": "root level "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " is now only used as a thin adapter, mount "
                },
                {
                  "type": "inlineCode",
                  "value": "Chapter04PracticeRoot"
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
                  "value": "Chapter 04 are all located in "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-04-state-and-events/"
                },
                {
                  "type": "text",
                  "value": ", no modification "
                },
                {
                  "type": "inlineCode",
                  "value": "src/sudoku/"
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
          "value": "The static component tree only explains \"given input, what JSX does the component return?\" Interactive UI also needs to answer another set of questions: Who runs the code when the user clicks? How is data persisted across renders? Why doesn't the current variable change immediately after calling setter? Why "
        },
        {
          "type": "inlineCode",
          "value": "setCount(count + 1)"
        },
        {
          "type": "text",
          "value": " only gets one plus one, but three times the updater function can get plus three?"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter puts these issues into the same execution chain:"
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
                  "value": "browser generates event."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React calls a previously registered callback."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "callback reads the current render state snapshot."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "setter puts update into React queue."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "handler ends, React processes the queue and triggers render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component function again to obtain a new state snapshot."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React compares the before and after UI descriptions and only commits necessary DOM changes."
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
          "value": "The final error model to avoid is: \"The setter immediately modifies the variables in the current function like a normal assignment.\" The correct model is: \"The setter requests React to use queued update to produce the next render\"."
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
            "value": "Concept"
          }
        ],
        [
          {
            "type": "text",
            "value": "Why It Is Required"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "JavaScript function value"
            }
          ],
          [
            {
              "type": "text",
              "value": "event handler is a function value, not a JSX special string."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Function call expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "needs to be distinguished from "
            },
            {
              "type": "inlineCode",
              "value": "handleClick"
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "handleClick()"
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
              "value": "Closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "handler will capture the state snapshot in the render that created it."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Array methods"
            }
          ],
          [
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
              "value": ", spread is used to create the next state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object spread"
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep other fields when updating one field."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Props"
            }
          ],
          [
            {
              "type": "text",
              "value": "parent passes the operation capabilities to the child through callback props."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX attributes"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "onClick"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "onSubmit"
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
              "value": " is a prop in JSX."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Browser event"
            }
          ],
          [
            {
              "type": "text",
              "value": "propagation and default behavior belong to the browser event system."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript function type"
            }
          ],
          [
            {
              "type": "text",
              "value": "event handler type description callback parameter and return value."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React render"
            }
          ],
          [
            {
              "type": "text",
              "value": "component function executes and returns the current UI description."
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
                  "value": "Explain why "
                },
                {
                  "type": "inlineCode",
                  "value": "onClick={handleClick}"
                },
                {
                  "type": "text",
                  "value": " is to pass callback, while "
                },
                {
                  "type": "inlineCode",
                  "value": "onClick={handleClick()}"
                },
                {
                  "type": "text",
                  "value": " is called during render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "distinguishes React event object, browser default behavior, event propagation and React state update."
                }
              ]
            }
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
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": " expresses data that needs to be retained across renders and will affect the UI."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains why local variable will neither be persisted nor request React render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "predicts the value of the variable in the current handler after the setter is called."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Use state snapshot and closure to explain the results of delayed callback."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "predicts the difference between replacement update and functional update in the queue."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "updates state with new object and new array, without direct mutation."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Write reasonable TypeScript event type for input, button, and form handler."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Separate source state and derived state in Cart Quantity Panel."
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
                  "value": "First understand the callback: when React calls the handler."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand browser events again: what the event object can control and what it cannot control."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "introduces "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": ": Why you need React-managed memory."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Compare local variable: Exclude ordinary variable model."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn setter, snapshot, and batching: establish update queue model."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "learning functional update: calculated based on queued previous state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Apply the same model to object and array."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "finally adds TypeScript compile-time boundary, and uses cart to integrate all mechanisms."
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
          "value": "first establishes the JavaScript callback and browser event boundaries, then enters the React state runtime, and finally discusses TypeScript. This way you won't mistake type annotation for runtime behavior."
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
              "value": "Event handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript function / React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "interactive portal."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React event object"
            }
          ],
          [
            {
              "type": "text",
              "value": "React handler received event object"
            }
          ],
          [
            {
              "type": "text",
              "value": "React event system / browser event"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides "
            },
            {
              "type": "inlineCode",
              "value": "currentTarget"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "preventDefault"
            },
            {
              "type": "text",
              "value": " etc."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Event propagation"
            }
          ],
          [
            {
              "type": "text",
              "value": "event propagates"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser platform API"
            }
          ],
          [
            {
              "type": "text",
              "value": "determines whether the parent handler is also running."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Default behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser's built-in actions for submit, link and other events"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser platform API"
            }
          ],
          [
            {
              "type": "text",
              "value": "available "
            },
            {
              "type": "inlineCode",
              "value": "preventDefault"
            },
            {
              "type": "text",
              "value": " blocked."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "State"
            }
          ],
          [
            {
              "type": "text",
              "value": "React data saved for a certain component position"
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
              "value": "retains UI memory across renders."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "State setter"
            }
          ],
          [
            {
              "type": "text",
              "value": "requests React queue's next state function"
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
              "value": "does not directly change the current variable."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Render"
            }
          ],
          [
            {
              "type": "text",
              "value": "React calls component function to calculate UI description"
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
              "value": "Each render has its own props, state, and handlers."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Commit"
            }
          ],
          [
            {
              "type": "text",
              "value": "React applies the necessary changes to DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "render is not equivalent to directly operating the DOM."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "State snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "The state value fixed in a certain render"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime / closure"
            }
          ],
          [
            {
              "type": "text",
              "value": "explains the old value after the setter and the delayed handler."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Batching"
            }
          ],
          [
            {
              "type": "text",
              "value": "React waits for the handler code to be completed and centrally process updates"
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
              "value": "Avoid half-finished UI in the middle."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Replacement update"
            }
          ],
          [
            {
              "type": "text",
              "value": "submits a next value"
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
              "value": "Multiple expressions may read the same snapshot."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Functional update"
            }
          ],
          [
            {
              "type": "text",
              "value": "submits "
            },
            {
              "type": "inlineCode",
              "value": "(previous) => next"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime / JavaScript function"
            }
          ],
          [
            {
              "type": "text",
              "value": "is suitable for updating based on queued previous state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Immutable update"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use new object / array to express the next state"
            }
          ],
          [
            {
              "type": "text",
              "value": "React state model"
            }
          ],
          [
            {
              "type": "text",
              "value": "retains the old snapshot and provides new references."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Derived state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Value calculated from source state when rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "React rendering / JavaScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Avoid duplicate state and synchronization problems."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Event type"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript Static description of handler parameter"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "Improve editor and compile-time checking."
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
          "value": "The main execution chain of this chapter must be completely memorized:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Underlying mental model",
      "value": "user event\n  -> event handler function runs\n  -> state setter is called\n  -> React queues update\n  -> event handler finishes\n  -> React processes updates\n  -> component function runs again\n  -> JSX result changes\n  -> React commits DOM changes"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The three boundaries cannot be confused:"
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
                  "value": "JavaScript layer: handler is function, closure captures lexical bindings, object/array method creates value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React runtime layer: React saves state, queue updates, re-calls components, and commit DOM differences."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript layer: Check handler parameter, state value and setter input; these types are erased in browser runtime."
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
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "stopPropagation()"
        },
        {
          "type": "text",
          "value": " is located at the browser event boundary. The former affects the browser's default action, and the latter affects the event's continued propagation; neither will replace the setter, nor will it automatically trigger React render."
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
          "value": "This chapter uses the number concept directory because the learning sequence and mechanism are very dependent; the directory name also retains the knowledge points and does not use "
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
          "value": ". Final mini projects are grouped independently to avoid mixing combined code into single-concept exercises."
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
          "value": "The following is the relevant structure that actually exists in the repository after completing this chapter:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "react/\n  index.html\n  package.json\n  README.md\n  src/\n    App.tsx\n    sudoku/\n      main.tsx\n      App.tsx\n    learning/\n      react/\n        chapter-02-jsx-and-components/\n        chapter-04-state-and-events/\n  docs/\n    react/\n      chapter-01-react-introduction/\n      chapter-02-jsx-and-components/\n      chapter-03-props-basics/\n      chapter-04-state-and-events/"
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
      "value": "docs/\n  react/\n    chapter-04-state-and-events/\n      react-chapter-04-learning-guide.md\nreferences/\n  books/\n    react/\n      README.md"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Git repository did not submit local PDF; "
        },
        {
          "type": "inlineCode",
          "value": "references/books/react/README.md"
        },
        {
          "type": "text",
          "value": " indicates that the third-party PDF is ignored by git. When writing this chapter, "
        },
        {
          "type": "inlineCode",
          "value": "the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
        },
        {
          "type": "text",
          "value": ", but the document only records the book title, relevant page numbers and conclusions, does not write the absolute path of the local machine, and does not treat the PDF as a Git repository file."
        }
      ]
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
          "type": "text",
          "value": "The following files have been created and are runnable source codes, not concept placeholders:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Real practice structure",
      "value": "src/learning/react/chapter-04-state-and-events/\n  chapter-04-practice-root.tsx\n  chapter-04-practice.css\n  01-event-handler-callback/\n    event-handler-callback.tsx\n  02-pass-vs-call-handler/\n    pass-vs-call-handler.tsx\n  03-event-object-and-default-behavior/\n    event-object-and-default-behavior.tsx\n  04-use-state-memory/\n    use-state-memory.tsx\n  05-local-variable-vs-state/\n    local-variable-vs-state.tsx\n  06-state-setter-current-render/\n    state-setter-current-render.tsx\n  07-state-snapshot/\n    state-snapshot.tsx\n  08-batched-updates/\n    batched-updates.tsx\n  09-functional-update/\n    functional-update.tsx\n  10-object-state-update/\n    object-state-update.tsx\n  11-array-state-update/\n    array-state-update.tsx\n  12-typed-event-handler/\n    typed-event-handler.tsx"
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
          "value": "Only error comparisons and reusable templates are listed below. There is no need to create files:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets:\n  Snippet: called handler during render\n  Snippet: setter does not replace current snapshot\n  Snippet: direct object state mutation\n  Snippet: direct array state mutation\n  Template: typed input handler\n  Template: immutable keyed array update"
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
      "value": "src/\n  App.tsx\n  learning/react/chapter-04-state-and-events/\n    cart-quantity-mini-project/\n      cart-types.ts\n      cart-seed-data.ts\n      cart-quantity-controls.tsx\n      cart-item-row.tsx\n      cart-summary.tsx\n      cart-quantity-mini-project.tsx\n      cart-quantity-mini-project.css"
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
          "value": " is still responsible for "
        },
        {
          "type": "inlineCode",
          "value": "createRoot"
        },
        {
          "type": "text",
          "value": ", root level "
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
          "value": "Chapter04PracticeRoot"
        },
        {
          "type": "text",
          "value": ". Therefore there is no need to modify "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/"
        },
        {
          "type": "text",
          "value": ", there is no need to create a separate Vite entry for each exercise."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "installation lock file:"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm ci"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Start exercise:"
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
          "value": "Static check and production build:"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run lint\nnpm run build"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "expected page first displays 12 mechanism panels and then the Cart Quantity Panel. If the page still displays the old chapter, check "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " import "
        },
        {
          "type": "inlineCode",
          "value": "Chapter04PracticeRoot"
        },
        {
          "type": "text",
          "value": "; do not change "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/main.tsx"
        },
        {
          "type": "text",
          "value": " to copy another set of roots."
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
      "id": "91-event-handlers-are-callback-functions-passed-to-react",
      "children": [
        {
          "type": "text",
          "value": "9.1 Event Handlers Are Callback Functions Passed to React"
        }
      ]
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
          "value": "Event handler is the ordinary JavaScript function value. React receives and remembers this callback when rendering; React only calls it after the corresponding event occurs."
        }
      ]
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
          "value": "onClick"
        },
        {
          "type": "text",
          "value": " is not a \"string to be executed when clicked\", and the handler is not a substep that is automatically run by component render. It is a callback reference from the current JSX output into the React event system."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary and underlying mechanism:"
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
                  "value": "JavaScript: "
                },
                {
                  "type": "inlineCode",
                  "value": "handleClick"
                },
                {
                  "type": "text",
                  "value": " expression is evaluated to obtain function object."
                }
              ]
            }
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
                  "type": "inlineCode",
                  "value": "onClick"
                },
                {
                  "type": "text",
                  "value": " prop tells React DOM the click handler of this element."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser: User click generates event."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React then calls the function; inside the function, you can request state update or perform other event side effects."
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
              "value": "Real practice code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/01-event-handler-callback/event-handler-callback.tsx",
      "value": "export function EventHandlerCallback() {\n  function handleClick() {\n    console.log('Event handler callback ran after the click.')\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.1 Callback boundary</p>\n      <h2>Event handler callback</h2>\n      <p>React receives a function value and calls it after the user clicks.</p>\n      <button className=\"practice-button\" onClick={handleClick} type=\"button\">\n        Run callback\n      </button>\n      <p className=\"practice-note\">Open the browser console to inspect the callback log.</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation and execution flow:"
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
                  "value": "Every time component renders, "
                },
                {
                  "type": "inlineCode",
                  "value": "handleClick"
                },
                {
                  "type": "text",
                  "value": " function."
                }
              ]
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
                  "value": "onClick={handleClick}"
                },
                {
                  "type": "text",
                  "value": " reads the function value without parentheses."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render The log has not yet appeared when it completed."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "click occurs, "
                },
                {
                  "type": "inlineCode",
                  "value": "console.log"
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
                  "value": "This example has no setter, so the callback will not request a new React render."
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
              "value": "common mistakes and identification methods:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "When seeing the right side of the JSX event prop, first ask, \"Is this the function value or the call result that is finally obtained?\" Event props usually require the former."
        }
      ]
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
          "value": "Handler is a \"function that will be called by React in the future\", not a \"command that is now executed by render\"."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-passing-a-function-vs-calling-a-function",
      "children": [
        {
          "type": "text",
          "value": "9.2 Passing a Function vs. Calling a Function"
        }
      ]
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
          "value": "handleClick"
        },
        {
          "type": "text",
          "value": " is function value; "
        },
        {
          "type": "inlineCode",
          "value": "handleClick()"
        },
        {
          "type": "text",
          "value": " is a call expression, which will be executed immediately and produce a return value."
        }
      ]
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
          "value": "React official documentation clearly distinguishes between passing a function and calling a function. Write call expression into "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": " will be executed during render and may queue state update immediately, resulting in repeated render or TypeScript handler type error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real practice code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/02-pass-vs-call-handler/pass-vs-call-handler.tsx",
      "value": "import { useState } from 'react'\n\nexport function PassVsCallHandler() {\n  const [message, setMessage] = useState('The handler has not run.')\n\n  function handleClick() {\n    setMessage('React called the handler after the click.')\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.2 Function value</p>\n      <h2>Pass versus call</h2>\n      <p className=\"code-comparison\">onClick={'{handleClick}'}</p>\n      <button className=\"practice-button\" onClick={handleClick} type=\"button\">\n        Pass the handler\n      </button>\n      <p className=\"practice-result\" aria-live=\"polite\">\n        {message}\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "error comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: called handler during render",
      "value": "function handleClick() {\n  setMessage('This runs during render.')\n}\n\nreturn <button onClick={handleClick()}>Save</button>"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "error violates two boundaries: "
        },
        {
          "type": "inlineCode",
          "value": "handleClick()"
        },
        {
          "type": "text",
          "value": " runs immediately during JSX evaluation; it normally returns "
        },
        {
          "type": "inlineCode",
          "value": "void"
        },
        {
          "type": "text",
          "value": ", and "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": " requires handler function. If there is queue state inside the call, React may also report too many re-renders."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "requires parameters, pass a new callback: "
        },
        {
          "type": "inlineCode",
          "value": "onClick={() => handleSelect(productId)}"
        },
        {
          "type": "text",
          "value": ". The arrow function itself is the value passed to React; the internal call is left to occur after click."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-react-events-propagation-and-preventdefault",
      "children": [
        {
          "type": "text",
          "value": "9.3 React Events, Propagation, and preventDefault"
        }
      ]
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
          "value": "Handler parameter is the event object provided by React. "
        },
        {
          "type": "inlineCode",
          "value": "stopPropagation()"
        },
        {
          "type": "text",
          "value": " controls whether the event continues to the ancestor handler; "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " controls browser default action. None of them are responsible for updating state."
        }
      ]
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
          "value": "preventDefault"
        },
        {
          "type": "text",
          "value": " is not equal to \"stop event\", MDN explains that event will still propagate normally; "
        },
        {
          "type": "inlineCode",
          "value": "stopPropagation"
        },
        {
          "type": "text",
          "value": " does not equal \"block default actions\", and default actions such as link navigation may still occur. React's setters are another independent mechanism."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real practice code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/03-event-object-and-default-behavior/event-object-and-default-behavior.tsx",
      "value": "import { useState, type FormEvent, type MouseEvent } from 'react'\n\nexport function EventObjectAndDefaultBehavior() {\n  const [eventLog, setEventLog] = useState<string[]>([])\n\n  function appendLog(entry: string) {\n    setEventLog((currentLog) => [...currentLog, entry])\n  }\n\n  function handlePanelClick() {\n    appendLog('Parent panel received a bubbled click.')\n  }\n\n  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {\n    event.stopPropagation()\n    appendLog('Button stopped click propagation.')\n  }\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>) {\n    event.preventDefault()\n    appendLog('Form prevented the browser submit navigation.')\n  }\n\n  return (\n    <section className=\"practice-panel\" onClick={handlePanelClick}>\n      <p className=\"practice-kicker\">9.3 Browser event boundary</p>\n      <h2>Event object and default behavior</h2>\n      <div className=\"practice-actions\">\n        <button className=\"practice-button\" onClick={handleButtonClick} type=\"button\">\n          Stop propagation\n        </button>\n        <form onSubmit={handleSubmit}>\n          <button className=\"practice-button secondary\" type=\"submit\">\n            Prevent submit default\n          </button>\n        </form>\n      </div>\n      <ol className=\"event-log\" aria-live=\"polite\">\n        {eventLog.map((entry, index) => (\n          <li key={`${entry}-${index}`}>{entry}</li>\n        ))}\n      </ol>\n    </section>\n  )\n}"
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
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Click the first button: child handler runs first, "
                },
                {
                  "type": "inlineCode",
                  "value": "stopPropagation"
                },
                {
                  "type": "text",
                  "value": " blocks the event to the section, and then functional update appends a log."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "submit form: "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault"
                },
                {
                  "type": "text",
                  "value": " blocks browser submission/navigation; click may still propagate to section, so the log may record both parent click and submit handler."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React processes queued log updates and re-renders the list."
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
              "value": "identification method:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Ask clearly whether you want to prevent \"browser action\" or \"event propagation to ancestor\". The former uses "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault"
        },
        {
          "type": "text",
          "value": ", the latter uses "
        },
        {
          "type": "inlineCode",
          "value": "stopPropagation"
        },
        {
          "type": "text",
          "value": "; Setters are still required to change UI data."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-usestate-gives-a-component-memory",
      "children": [
        {
          "type": "text",
          "value": "9.4 useState Gives a Component Memory"
        }
      ]
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
          "value": "useState(initialState)"
        },
        {
          "type": "text",
          "value": " returns the state value and setter of the current render. React saves state in corresponding locations in the component tree so that data can be retained across renders."
        }
      ]
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
          "value": "const [count, setCount] = useState(0)"
        },
        {
          "type": "text",
          "value": " uses array destructuring. "
        },
        {
          "type": "inlineCode",
          "value": "count"
        },
        {
          "type": "text",
          "value": " is not a variable storage cell; it is the value of this render. "
        },
        {
          "type": "inlineCode",
          "value": "setCount"
        },
        {
          "type": "text",
          "value": " requests the next state."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/04-use-state-memory/use-state-memory.tsx",
      "value": "import { useState } from 'react'\n\nexport function UseStateMemory() {\n  const [count, setCount] = useState(0)\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.4 Component memory</p>\n      <h2>useState memory</h2>\n      <p className=\"practice-metric\">{count}</p>\n      <button\n        className=\"practice-button\"\n        onClick={() => setCount(count + 1)}\n        type=\"button\"\n      >\n        Increment\n      </button>\n      <p className=\"practice-note\">The value survives the next component render.</p>\n    </section>\n  )\n}"
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
          "value": "initial render read "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ". click handler uses the current snapshot to calculate "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": " and queue update. After the handler ends, React calls the component again; the second time "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " reads "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": ", JSX becomes "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": ", React commit corresponds to text changes."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary:"
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
          "value": "useState"
        },
        {
          "type": "text",
          "value": " is a Hook and can only be called in a stable order at the top level of a component or custom Hook. This chapter doesn't go into custom Hooks, but you can't put them in a condition, loop, or event handler."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-why-ordinary-variables-cannot-preserve-ui-state",
      "children": [
        {
          "type": "text",
          "value": "9.5 Why Ordinary Variables Cannot Preserve UI State"
        }
      ]
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
          "value": "Ordinary local variable will be recreated every time component call is made, and modifying it will not tell React that it needs to render. UI state needs to satisfy both \"retention across renders\" and \"request render when changes\"."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/05-local-variable-vs-state/local-variable-vs-state.tsx",
      "value": "import { useState } from 'react'\n\nexport function LocalVariableVsState() {\n  const localCount = 0\n  const [stateCount, setStateCount] = useState(0)\n\n  function handleClick() {\n    console.log(`Calculated local value: ${localCount + 1}`)\n    setStateCount((currentCount) => currentCount + 1)\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.5 Render-local binding</p>\n      <h2>Local variable versus state</h2>\n      <dl className=\"value-pair\">\n        <div>\n          <dt>Local variable after render</dt>\n          <dd>{localCount}</dd>\n        </div>\n        <div>\n          <dt>State value</dt>\n          <dd>{stateCount}</dd>\n        </div>\n      </dl>\n      <button className=\"practice-button\" onClick={handleClick} type=\"button\">\n        Update both\n      </button>\n    </section>\n  )\n}"
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
          "value": "Handler can calculate "
        },
        {
          "type": "inlineCode",
          "value": "localCount + 1"
        },
        {
          "type": "text",
          "value": ", but this result is not saved and does not become the input of the next component call. The setter hands the update to React; "
        },
        {
          "type": "inlineCode",
          "value": "localCount"
        },
        {
          "type": "text",
          "value": " is still initialized to "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "stateCount"
        },
        {
          "type": "text",
          "value": " reads new values from React memory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes: "
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "writes back render-local binding in the handler. Not only cannot it establish a reliable UI state, the current "
        },
        {
          "type": "inlineCode",
          "value": "eslint-plugin-react-hooks"
        },
        {
          "type": "text",
          "value": " also reports risks. Mutable data that needs to affect the UI should be modeled as state."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-a-state-setter-does-not-mutate-the-current-variable",
      "children": [
        {
          "type": "text",
          "value": "9.6 A State Setter Does Not Mutate the Current Variable"
        }
      ]
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
          "value": "Setter queue next state will not write back the lexical binding of the current render. So call "
        },
        {
          "type": "inlineCode",
          "value": "setCount(count + 1)"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "count"
        },
        {
          "type": "text",
          "value": " is still the old snapshot."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/06-state-setter-current-render/state-setter-current-render.tsx",
      "value": "import { useState } from 'react'\n\nexport function StateSetterCurrentRender() {\n  const [count, setCount] = useState(0)\n  const [observation, setObservation] = useState('No update has been queued.')\n\n  function handleIncrement() {\n    setCount(count + 1)\n    setObservation(`The handler still reads the current render snapshot: ${count}.`)\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.6 Setter boundary</p>\n      <h2>Setter and current render</h2>\n      <p className=\"practice-metric\">{count}</p>\n      <button className=\"practice-button\" onClick={handleIncrement} type=\"button\">\n        Queue increment\n      </button>\n      <p className=\"practice-result\" aria-live=\"polite\">\n        {observation}\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "error model comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: setter does not replace current snapshot",
      "value": "function handleClick() {\n  setCount(count + 1)\n  console.log(count)\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "if the current render's "
        },
        {
          "type": "inlineCode",
          "value": "count"
        },
        {
          "type": "text",
          "value": " is "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ", the log is still "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ". This is not an asynchronous variable assignment; it's the current snapshot unchanged, and React later creates another render with queued next state."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-state-as-a-snapshot-each-render-sees-fixed-values",
      "children": [
        {
          "type": "text",
          "value": "9.7 State as a Snapshot: Each Render Sees Fixed Values"
        }
      ]
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
          "value": "Each render has its own state values, props, local variables and handlers. The Handler closure captures the render snapshot that created it, even if the callback is executed lazily."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/07-state-snapshot/state-snapshot.tsx",
      "value": "import { useState } from 'react'\n\nexport function StateSnapshot() {\n  const [count, setCount] = useState(0)\n  const [snapshotMessage, setSnapshotMessage] = useState('Schedule a snapshot, then increment.')\n\n  function handleScheduleSnapshot() {\n    const scheduledCount = count\n\n    window.setTimeout(() => {\n      setSnapshotMessage(`The scheduled handler captured count ${scheduledCount}.`)\n    }, 1000)\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.7 Snapshot and closure</p>\n      <h2>State as a snapshot</h2>\n      <p className=\"practice-metric\">{count}</p>\n      <div className=\"practice-actions\">\n        <button className=\"practice-button secondary\" onClick={handleScheduleSnapshot} type=\"button\">\n          Schedule snapshot\n        </button>\n        <button\n          className=\"practice-button\"\n          onClick={() => setCount((currentCount) => currentCount + 1)}\n          type=\"button\"\n        >\n          Increment now\n        </button>\n      </div>\n      <p className=\"practice-result\" aria-live=\"polite\">\n        {snapshotMessage}\n      </p>\n    </section>\n  )\n}"
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
          "value": "precedes "
        },
        {
          "type": "inlineCode",
          "value": "count = 0"
        },
        {
          "type": "text",
          "value": ", then increment immediately. new render shows "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": ", but the timeout callback's closure saves the old render's "
        },
        {
          "type": "inlineCode",
          "value": "scheduledCount = 0"
        },
        {
          "type": "text",
          "value": ". After a second it shows captured count "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ". This is the result of JavaScript closure and React snapshot, not a timeout read failure."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-batching-multiple-state-updates",
      "children": [
        {
          "type": "text",
          "value": "9.8 Batching Multiple State Updates"
        }
      ]
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
          "value": "React waits until the code in the event handler is executed before processing queued updates. Three consecutive "
        },
        {
          "type": "inlineCode",
          "value": "setCount(count + 1)"
        },
        {
          "type": "text",
          "value": " are all evaluated from the same render snapshot, so both queue replacement value "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": " is not automatically accumulated three times."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/08-batched-updates/batched-updates.tsx",
      "value": "import { useState } from 'react'\n\nexport function BatchedUpdates() {\n  const [count, setCount] = useState(0)\n\n  function handleReplacementUpdates() {\n    setCount(count + 1)\n    setCount(count + 1)\n    setCount(count + 1)\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.8 Update queue</p>\n      <h2>Batched replacement updates</h2>\n      <p className=\"practice-metric\">{count}</p>\n      <button className=\"practice-button\" onClick={handleReplacementUpdates} type=\"button\">\n        Queue count + 1 three times\n      </button>\n      <p className=\"practice-note\">All three expressions read the same render snapshot.</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundary:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Batching is not a \"permanent merge of all clicks\". The official React documentation states that intentional events (such as two independent clicks) are handled separately. What is discussed here is the queue before the next render in the same handler."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-functional-updates-based-on-previous-state",
      "children": [
        {
          "type": "text",
          "value": "9.9 Functional Updates Based on Previous State"
        }
      ]
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
          "value": "When next state depends on previous state, updater function is passed. When React processes the queue, it passes the result of the previous item to the next item, so three "
        },
        {
          "type": "inlineCode",
          "value": "previousCount => previousCount + 1"
        },
        {
          "type": "text",
          "value": " gets plus three."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/09-functional-update/functional-update.tsx",
      "value": "import { useState } from 'react'\n\nexport function FunctionalUpdate() {\n  const [count, setCount] = useState(0)\n\n  function handleIncrementThreeTimes() {\n    setCount((previousCount) => previousCount + 1)\n    setCount((previousCount) => previousCount + 1)\n    setCount((previousCount) => previousCount + 1)\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.9 Queued previous state</p>\n      <h2>Functional update</h2>\n      <p className=\"practice-metric\">{count}</p>\n      <button className=\"practice-button\" onClick={handleIncrementThreeTimes} type=\"button\">\n        Increment by three\n      </button>\n      <p className=\"practice-note\">Each updater receives the queued previous value.</p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Queue Process:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If the starting value is "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ", React calculates "
        },
        {
          "type": "inlineCode",
          "value": "0 -> 1"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "1 -> 2"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "2 -> 3"
        },
        {
          "type": "text",
          "value": ". The Updater parameter is not the current render binding, but the queued previous value provided by React when processing the queue."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-replacing-object-state-without-mutation",
      "children": [
        {
          "type": "text",
          "value": "9.10 Replacing Object State Without Mutation"
        }
      ]
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
          "value": "treats objects in state as read-only. When updating, create a next object and copy unmodified fields into it; do not modify the object referenced by the current snapshot."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/10-object-state-update/object-state-update.tsx",
      "value": "import { useState } from 'react'\n\ntype LearnerProfile = {\n  name: string\n  track: string\n  isAvailable: boolean\n}\n\nconst initialProfile: LearnerProfile = {\n  name: 'Mia Chen',\n  track: 'React foundations',\n  isAvailable: true,\n}\n\nexport function ObjectStateUpdate() {\n  const [profile, setProfile] = useState(initialProfile)\n\n  function handleToggleAvailability() {\n    setProfile((currentProfile) => ({\n      ...currentProfile,\n      isAvailable: !currentProfile.isAvailable,\n    }))\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.10 Object replacement</p>\n      <h2>Object state update</h2>\n      <div className=\"profile-preview\">\n        <strong>{profile.name}</strong>\n        <span>{profile.track}</span>\n        <span>{profile.isAvailable ? 'Available' : 'Unavailable'}</span>\n      </div>\n      <button className=\"practice-button\" onClick={handleToggleAvailability} type=\"button\">\n        Toggle availability\n      </button>\n    </section>\n  )\n}"
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: direct object state mutation",
      "value": "profile.isAvailable = false\nsetProfile(profile)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This code modifies the old snapshot reference and returns the same object reference again. It destroys snapshot reasonability and cannot reliably express \"the next state is the new value\". Correct writing method returns "
        },
        {
          "type": "inlineCode",
          "value": "{ ...currentProfile, isAvailable: false }"
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
      "id": "911-updating-array-state-without-push-or-splice",
      "children": [
        {
          "type": "text",
          "value": "9.11 Updating Array State Without push or splice"
        }
      ]
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
          "value": "Array is also an object. Use spread, "
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
          "value": ", etc. return a new array; avoid directly "
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
          "value": "pop"
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
          "value": " or index assignment."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/11-array-state-update/array-state-update.tsx",
      "value": "import { useState } from 'react'\n\nconst initialTopics = ['Events', 'State snapshot']\n\nexport function ArrayStateUpdate() {\n  const [topics, setTopics] = useState(initialTopics)\n\n  function handleAddTopic() {\n    setTopics((currentTopics) =>\n      currentTopics.includes('Immutable updates')\n        ? currentTopics\n        : [...currentTopics, 'Immutable updates'],\n    )\n  }\n\n  function handleRemoveFirstTopic() {\n    setTopics((currentTopics) => currentTopics.filter((_, index) => index !== 0))\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.11 Array replacement</p>\n      <h2>Array state update</h2>\n      <ul className=\"topic-list\">\n        {topics.map((topic) => (\n          <li key={topic}>{topic}</li>\n        ))}\n      </ul>\n      <div className=\"practice-actions\">\n        <button className=\"practice-button\" onClick={handleAddTopic} type=\"button\">\n          Add topic\n        </button>\n        <button\n          className=\"practice-button secondary\"\n          disabled={topics.length === 0}\n          onClick={handleRemoveFirstTopic}\n          type=\"button\"\n        >\n          Remove first\n        </button>\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "error comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: direct array state mutation",
      "value": "topics.push('Immutable updates')\nsetTopics(topics)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "push"
        },
        {
          "type": "text",
          "value": " modifies the current array and returns the new length, but does not return the next array. "
        },
        {
          "type": "inlineCode",
          "value": "splice"
        },
        {
          "type": "text",
          "value": " will also be modified in place. Add "
        },
        {
          "type": "inlineCode",
          "value": "[...currentTopics, nextTopic]"
        },
        {
          "type": "text",
          "value": ", delete with "
        },
        {
          "type": "inlineCode",
          "value": "filter"
        },
        {
          "type": "text",
          "value": ", replace an item with "
        },
        {
          "type": "inlineCode",
          "value": "map"
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
      "id": "912-typescript-boundaries-for-events-and-usestate",
      "children": [
        {
          "type": "text",
          "value": "9.12 TypeScript Boundaries for Events and useState"
        }
      ]
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
          "value": "TypeScript Check event parameter, "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": ", state value and setter input; "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "CartItem[]"
        },
        {
          "type": "text",
          "value": " type."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/12-typed-event-handler/typed-event-handler.tsx",
      "value": "import { useState, type ChangeEvent, type FormEvent } from 'react'\n\nexport function TypedEventHandler() {\n  const [searchTerm, setSearchTerm] = useState('')\n  const [submittedTerm, setSubmittedTerm] = useState('Nothing submitted yet.')\n\n  function handleChange(event: ChangeEvent<HTMLInputElement>) {\n    setSearchTerm(event.currentTarget.value)\n  }\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>) {\n    event.preventDefault()\n    setSubmittedTerm(searchTerm.trim() || 'Empty search')\n  }\n\n  return (\n    <section className=\"practice-panel\">\n      <p className=\"practice-kicker\">9.12 Type boundary</p>\n      <h2>Typed event handler</h2>\n      <form className=\"typed-form\" onSubmit={handleSubmit}>\n        <label htmlFor=\"chapter-search\">Search term</label>\n        <input\n          id=\"chapter-search\"\n          onChange={handleChange}\n          placeholder=\"Type a topic\"\n          type=\"text\"\n          value={searchTerm}\n        />\n        <button className=\"practice-button\" type=\"submit\">\n          Submit\n        </button>\n      </form>\n      <p className=\"practice-result\" aria-live=\"polite\">\n        {submittedTerm}\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "type inference and explicit annotation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Inline handler can usually infer the event type from the JSX prop context; after extracting it as a named function, explicitly "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": " can clearly express boundary. When reading input value, "
        },
        {
          "type": "inlineCode",
          "value": "event.currentTarget.value"
        },
        {
          "type": "text",
          "value": ", because the generic parameter clearly describes the element to which the current handler is bound."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "useState('')"
        },
        {
          "type": "text",
          "value": " infer string state; "
        },
        {
          "type": "inlineCode",
          "value": "useState<CartItem[]>(...)"
        },
        {
          "type": "text",
          "value": " Explicitly describe complex collections. TypeScript will reject the error setter input, but the data in the API or storage cannot be verified at runtime. There is no external data in this chapter, so the seed data is type checked by the source code."
        }
      ]
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
          "value": "Event type helps to use the object correctly during the development phase; the event object itself actually exists in the runtime, but the TypeScript type annotation does not exist."
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
            "value": "Meaning"
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
              "value": "onClick={handleClick}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React event"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes callback function."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "handleClick()"
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
              "value": "event.preventDefault()"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser event API"
            }
          ],
          [
            {
              "type": "text",
              "value": "blocks cancelable default action."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought propagation would stop."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "event.stopPropagation()"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser event API"
            }
          ],
          [
            {
              "type": "text",
              "value": "prevents event from continuing to propagate."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought the default action would be blocked."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useState(initialState)"
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
              "value": "Creates the state of the current component position."
            }
          ],
          [
            {
              "type": "text",
              "value": "is called in condition or handler."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "setState(nextValue)"
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
              "value": "queue replacement update."
            }
          ],
          [
            {
              "type": "text",
              "value": "thinks that the current binding will be changed immediately."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "setState(previous => next)"
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
              "value": "queue updater function."
            }
          ],
          [
            {
              "type": "text",
              "value": "updater."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "{ ...object, field: next }"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create a new object after replacing the fields."
            }
          ],
          [
            {
              "type": "text",
              "value": "Missing spread causes other fields to be lost."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "[...array, item]"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create an array containing the new item."
            }
          ],
          [
            {
              "type": "text",
              "value": "first "
            },
            {
              "type": "inlineCode",
              "value": "push"
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
              "value": "array.map(...)"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create transformed array."
            }
          ],
          [
            {
              "type": "text",
              "value": "modifies the original item in callback."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "array.filter(...)"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create an array with some items removed."
            }
          ],
          [
            {
              "type": "text",
              "value": "using mutating "
            },
            {
              "type": "inlineCode",
              "value": "splice"
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
              "value": "ChangeEvent<HTMLInputElement>"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript / React types"
            }
          ],
          [
            {
              "type": "text",
              "value": "Description input change event."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought type would verify the event at runtime."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useState<CartItem[]>(...)"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript generic"
            }
          ],
          [
            {
              "type": "text",
              "value": "Explicitly declare collection state type."
            }
          ],
          [
            {
              "type": "text",
              "value": "directly asserts external unknown data as this type."
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
              "type": "inlineCode",
              "value": "onClick={handleClick()}"
            }
          ],
          [
            {
              "type": "text",
              "value": "Render / type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Handler prop needs a function value."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "onClick={handleClick}"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "console.log(count)"
            },
            {
              "type": "text",
              "value": " after setter shows old value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Mental model"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current render snapshot is fixed."
            }
          ],
          [
            {
              "type": "text",
              "value": "Predict the next render instead."
            }
          ],
          [
            {
              "type": "text",
              "value": "treats setters as ordinary assignments."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Three "
            },
            {
              "type": "inlineCode",
              "value": "setCount(count + 1)"
            },
            {
              "type": "text",
              "value": " calls add one"
            }
          ],
          [
            {
              "type": "text",
              "value": "React queue"
            }
          ],
          [
            {
              "type": "text",
              "value": "All expressions read one snapshot."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use functional updaters."
            }
          ],
          [
            {
              "type": "text",
              "value": "Multiple next values depend on the same state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Local variable resets"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / React"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component function runs again."
            }
          ],
          [
            {
              "type": "text",
              "value": "Store UI memory in state."
            }
          ],
          [
            {
              "type": "text",
              "value": "variable is initialized in component body."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Local mutation does not render"
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
              "value": "No setter requested render."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use state setter."
            }
          ],
          [
            {
              "type": "text",
              "value": "data has changed but React doesn't know it."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "profile.name = nextName"
            }
          ],
          [
            {
              "type": "text",
              "value": "State mutation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current object snapshot is read-only."
            }
          ],
          [
            {
              "type": "text",
              "value": "Return a new object."
            }
          ],
          [
            {
              "type": "text",
              "value": "assigns a value to the state object property."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "items.push(nextItem)"
            }
          ],
          [
            {
              "type": "text",
              "value": "State mutation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current array snapshot is read-only."
            }
          ],
          [
            {
              "type": "text",
              "value": "Return a new array."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses push/pop/splice/sort/reverse."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "preventDefault"
            },
            {
              "type": "text",
              "value": " expected to stop parent click"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Default action and propagation differ."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "stopPropagation"
            },
            {
              "type": "text",
              "value": " if justified."
            }
          ],
          [
            {
              "type": "text",
              "value": "confuses browser action and event path."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "stopPropagation"
            },
            {
              "type": "text",
              "value": " expected to stop navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Propagation and default action differ."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "preventDefault"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Link/form still performs the default action."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Wrong event element generic"
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
              "type": "inlineCode",
              "value": "currentTarget"
            },
            {
              "type": "text",
              "value": " type mismatches bound element."
            }
          ],
          [
            {
              "type": "text",
              "value": "Match "
            },
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
              "value": "HTMLFormElement"
            },
            {
              "type": "text",
              "value": ", etc."
            }
          ],
          [
            {
              "type": "text",
              "value": "editor "
            },
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " and other properties do not exist."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Store total in separate state"
            }
          ],
          [
            {
              "type": "text",
              "value": "State modeling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Duplicates derivable data."
            }
          ],
          [
            {
              "type": "text",
              "value": "Calculate with "
            },
            {
              "type": "inlineCode",
              "value": "reduce"
            },
            {
              "type": "text",
              "value": " during render."
            }
          ],
          [
            {
              "type": "text",
              "value": "The two copies of state must be kept in sync manually."
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
          "value": "Cart Quantity Panel"
        },
        {
          "type": "text",
          "value": " uses typed product and cart item to form a static front-end shopping cart interactive panel. Users can add, reduce, delete and reset items; quantity is source state, line subtotal, unit count and total are derived states calculated during render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "project connects the future cart quantity behavior of SellerHub Marketplace, but this chapter does not implement SellerHub, does not request backend, and does not introduce router, query cache or form library."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "A quantity click will completely go through the main chain of this chapter: callback operation, reading the current render snapshot, functional setter queue array update, updater using "
        },
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " creates a new array and creates a new object for the target item, React re-renders, derived totals recalculates, and finally commits quantity, disabled state and amount text."
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
      "value": "src/\n  App.tsx\n  learning/react/chapter-04-state-and-events/\n    cart-quantity-mini-project/\n      cart-types.ts\n      cart-seed-data.ts\n      cart-quantity-controls.tsx\n      cart-item-row.tsx\n      cart-summary.tsx\n      cart-quantity-mini-project.tsx\n      cart-quantity-mini-project.css"
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
            "value": "Responsibility"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines the "
            },
            {
              "type": "inlineCode",
              "value": "Product"
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "CartItem"
            },
            {
              "type": "text",
              "value": " shape."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-seed-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides local typed seed data and does not simulate API."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-quantity-controls.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "receives quantity, stock and callback props and handles disabled boundary."
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
              "value": "combines product info, controls, line subtotal and remove callback."
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
              "value": "derives units and total from items and does not save duplicate state."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-quantity-mini-project.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "has cart state and defines functional object/array updates."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "cart-quantity-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "is only responsible for the final mini project layout and visual state."
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
              "value": "Thin adapter, mounts the main entrance of this chapter."
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
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-types.ts",
      "value": "export type Product = {\n  id: string\n  name: string\n  category: string\n  price: number\n  stock: number\n}\n\nexport type CartItem = {\n  product: Product\n  quantity: number\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript Use these types to check the source code; the types are erased after build. They cannot automatically validate future API responses."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-seed-data.ts",
      "value": "import type { CartItem } from './cart-types'\n\nexport const cartSeedItems: CartItem[] = [\n  {\n    product: {\n      id: 'wireless-keyboard',\n      name: 'Wireless Keyboard',\n      category: 'Desk setup',\n      price: 79,\n      stock: 4,\n    },\n    quantity: 1,\n  },\n  {\n    product: {\n      id: 'usb-c-dock',\n      name: 'USB-C Dock',\n      category: 'Connectivity',\n      price: 129,\n      stock: 3,\n    },\n    quantity: 2,\n  },\n  {\n    product: {\n      id: 'monitor-light',\n      name: 'Monitor Light',\n      category: 'Lighting',\n      price: 54,\n      stock: 6,\n    },\n    quantity: 1,\n  },\n]"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-controls.tsx",
      "value": "type CartQuantityControlsProps = {\n  productName: string\n  quantity: number\n  stock: number\n  onDecrement: () => void\n  onIncrement: () => void\n}\n\nexport function CartQuantityControls({\n  productName,\n  quantity,\n  stock,\n  onDecrement,\n  onIncrement,\n}: CartQuantityControlsProps) {\n  return (\n    <div className=\"quantity-control\" aria-label={`${productName} quantity`}>\n      <button\n        aria-label={`Decrease ${productName} quantity`}\n        disabled={quantity <= 1}\n        onClick={onDecrement}\n        type=\"button\"\n      >\n        -\n      </button>\n      <output aria-live=\"polite\">{quantity}</output>\n      <button\n        aria-label={`Increase ${productName} quantity`}\n        disabled={quantity >= stock}\n        onClick={onIncrement}\n        type=\"button\"\n      >\n        +\n      </button>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "disabled"
        },
        {
          "type": "text",
          "value": " is completely replaced by the current "
        },
        {
          "type": "inlineCode",
          "value": "quantity"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "stock"
        },
        {
          "type": "text",
          "value": ": reaches "
        },
        {
          "type": "inlineCode",
          "value": "1"
        },
        {
          "type": "text",
          "value": ", and increment is not allowed when stock is reached. Do not add "
        },
        {
          "type": "inlineCode",
          "value": "isIncrementDisabled"
        },
        {
          "type": "text",
          "value": " state."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-item-row.tsx",
      "value": "import { CartQuantityControls } from './cart-quantity-controls'\nimport type { CartItem } from './cart-types'\n\ntype CartItemRowProps = {\n  item: CartItem\n  onDecrement: (productId: string) => void\n  onIncrement: (productId: string) => void\n  onRemove: (productId: string) => void\n}\n\nconst currencyFormatter = new Intl.NumberFormat('en-US', {\n  style: 'currency',\n  currency: 'USD',\n})\n\nexport function CartItemRow({ item, onDecrement, onIncrement, onRemove }: CartItemRowProps) {\n  const { product, quantity } = item\n  const subtotal = product.price * quantity\n\n  return (\n    <article className=\"cart-item-row\">\n      <div className=\"product-symbol\" aria-hidden=\"true\">\n        {product.name\n          .split(' ')\n          .map((word) => word[0])\n          .join('')}\n      </div>\n      <div className=\"product-copy\">\n        <p>{product.category}</p>\n        <h3>{product.name}</h3>\n        <span>{currencyFormatter.format(product.price)} each</span>\n      </div>\n      <CartQuantityControls\n        onDecrement={() => onDecrement(product.id)}\n        onIncrement={() => onIncrement(product.id)}\n        productName={product.name}\n        quantity={quantity}\n        stock={product.stock}\n      />\n      <div className=\"line-total\">\n        <strong>{currencyFormatter.format(subtotal)}</strong>\n        <span>{product.stock} in stock</span>\n      </div>\n      <button className=\"remove-item-button\" onClick={() => onRemove(product.id)} type=\"button\">\n        Remove\n      </button>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "CartItemRow"
        },
        {
          "type": "text",
          "value": " does not have its own quantity state. Parent owns state, row only receives snapshot props and callbacks; "
        },
        {
          "type": "inlineCode",
          "value": "subtotal"
        },
        {
          "type": "text",
          "value": " is "
        },
        {
          "type": "inlineCode",
          "value": "price * quantity"
        },
        {
          "type": "text",
          "value": " 's render-time calculation."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-summary.tsx",
      "value": "import type { CartItem } from './cart-types'\n\ntype CartSummaryProps = {\n  items: CartItem[]\n}\n\nconst currencyFormatter = new Intl.NumberFormat('en-US', {\n  style: 'currency',\n  currency: 'USD',\n})\n\nexport function CartSummary({ items }: CartSummaryProps) {\n  const itemCount = items.reduce((total, item) => total + item.quantity, 0)\n  const merchandiseTotal = items.reduce(\n    (total, item) => total + item.product.price * item.quantity,\n    0,\n  )\n\n  return (\n    <aside className=\"cart-summary\" aria-labelledby=\"cart-summary-heading\">\n      <p className=\"cart-label\">Derived state</p>\n      <h3 id=\"cart-summary-heading\">Order summary</h3>\n      <dl>\n        <div>\n          <dt>Units</dt>\n          <dd>{itemCount}</dd>\n        </div>\n        <div>\n          <dt>Merchandise</dt>\n          <dd>{currencyFormatter.format(merchandiseTotal)}</dd>\n        </div>\n        <div className=\"summary-total\">\n          <dt>Total</dt>\n          <dd>{currencyFormatter.format(merchandiseTotal)}</dd>\n        </div>\n      </dl>\n      <p className=\"summary-note\">\n        Totals are calculated during render instead of stored as duplicate state.\n      </p>\n    </aside>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "two "
        },
        {
          "type": "inlineCode",
          "value": "reduce"
        },
        {
          "type": "text",
          "value": " are all pure calculations. If total is saved as state, cart and total must be maintained at the same time for each quantity update, which will cause synchronization errors."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.tsx",
      "value": "import { useState } from 'react'\nimport { CartItemRow } from './cart-item-row'\nimport { cartSeedItems } from './cart-seed-data'\nimport { CartSummary } from './cart-summary'\nimport type { CartItem } from './cart-types'\nimport './cart-quantity-mini-project.css'\n\nfunction createInitialCartItems() {\n  return cartSeedItems.map((item) => ({\n    ...item,\n    product: { ...item.product },\n  }))\n}\n\nexport function CartQuantityMiniProject() {\n  const [cartItems, setCartItems] = useState<CartItem[]>(createInitialCartItems)\n  const [lastAction, setLastAction] = useState('No quantity update has been queued.')\n\n  function handleIncrement(productId: string) {\n    const snapshotItem = cartItems.find((item) => item.product.id === productId)\n\n    if (snapshotItem) {\n      setLastAction(\n        `Event snapshot: ${snapshotItem.product.name} quantity was ${snapshotItem.quantity}.`,\n      )\n    }\n\n    setCartItems((currentItems) =>\n      currentItems.map((item) =>\n        item.product.id === productId\n          ? {\n              ...item,\n              quantity: Math.min(item.quantity + 1, item.product.stock),\n            }\n          : item,\n      ),\n    )\n  }\n\n  function handleDecrement(productId: string) {\n    const snapshotItem = cartItems.find((item) => item.product.id === productId)\n\n    if (snapshotItem) {\n      setLastAction(\n        `Event snapshot: ${snapshotItem.product.name} quantity was ${snapshotItem.quantity}.`,\n      )\n    }\n\n    setCartItems((currentItems) =>\n      currentItems.map((item) =>\n        item.product.id === productId\n          ? {\n              ...item,\n              quantity: Math.max(item.quantity - 1, 1),\n            }\n          : item,\n      ),\n    )\n  }\n\n  function handleRemove(productId: string) {\n    setCartItems((currentItems) =>\n      currentItems.filter((item) => item.product.id !== productId),\n    )\n    setLastAction('The array update returned a filtered cart.')\n  }\n\n  function handleReset() {\n    setCartItems(createInitialCartItems())\n    setLastAction('The cart was replaced with a fresh seed array.')\n  }\n\n  return (\n    <div className=\"cart-project-shell\">\n      <div className=\"cart-project-header\">\n        <div>\n          <p className=\"cart-label\">SellerHub learning connection</p>\n          <h2>Cart Quantity Panel</h2>\n          <p>\n            Quantity is state. Subtotals and the order total are derived during each\n            render.\n          </p>\n        </div>\n        <button className=\"reset-cart-button\" onClick={handleReset} type=\"button\">\n          Reset cart\n        </button>\n      </div>\n\n      <p className=\"snapshot-status\" aria-live=\"polite\">\n        {lastAction}\n      </p>\n\n      <div className=\"cart-layout\">\n        <div className=\"cart-items\" aria-label=\"Cart items\">\n          {cartItems.length > 0 ? (\n            cartItems.map((item) => (\n              <CartItemRow\n                item={item}\n                key={item.product.id}\n                onDecrement={handleDecrement}\n                onIncrement={handleIncrement}\n                onRemove={handleRemove}\n              />\n            ))\n          ) : (\n            <div className=\"empty-cart\">\n              <h3>Your learning cart is empty.</h3>\n              <p>Reset the cart to continue practicing state updates.</p>\n            </div>\n          )}\n        </div>\n        <CartSummary items={cartItems} />\n      </div>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "shows three things at the same time: handler starts with "
        },
        {
          "type": "inlineCode",
          "value": "cartItems"
        },
        {
          "type": "text",
          "value": " reads current render snapshot and writes description text; "
        },
        {
          "type": "inlineCode",
          "value": "setCartItems"
        },
        {
          "type": "text",
          "value": " receives functional updater; updater uses "
        },
        {
          "type": "inlineCode",
          "value": "map"
        },
        {
          "type": "text",
          "value": " returns a new array and only returns a new object for the target item. "
        },
        {
          "type": "inlineCode",
          "value": "Math.min"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "Math.max"
        },
        {
          "type": "text",
          "value": " once again maintains the stock and minimum boundaries at runtime. Even if the disabled button prevents normal UI click, it does not rely on it as the only protection."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/App.tsx",
      "value": "import { Chapter04PracticeRoot } from './learning/react/chapter-04-state-and-events/chapter-04-practice-root'\n\nfunction App() {\n  return <Chapter04PracticeRoot />\n}\n\nexport default App"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "App"
        },
        {
          "type": "text",
          "value": " does not own chapter state, nor does it copy exercise code. It only connects existing "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/main.tsx"
        },
        {
          "type": "text",
          "value": " root and this chapter practice root."
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.css",
      "value": ".cart-project-shell {\n  overflow: hidden;\n  border: 1px solid #cbd3df;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 22px 55px rgb(16 24 40 / 8%);\n}\n\n.cart-project-header {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 28px;\n  color: #ffffff;\n  background: #101828;\n}\n\n.cart-project-header h2 {\n  margin: 7px 0 8px;\n  font-size: clamp(1.75rem, 4vw, 2.65rem);\n}\n\n.cart-project-header p {\n  max-width: 610px;\n  margin: 0;\n  color: #b9c3d3;\n  line-height: 1.6;\n}\n\n.cart-label {\n  color: #84adff !important;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.reset-cart-button {\n  flex: 0 0 auto;\n  min-height: 42px;\n  padding: 9px 14px;\n  border: 1px solid #667085;\n  border-radius: 6px;\n  color: #ffffff;\n  background: transparent;\n  cursor: pointer;\n  font-weight: 750;\n}\n\n.reset-cart-button:hover {\n  background: #344054;\n}\n\n.snapshot-status {\n  margin: 0;\n  padding: 12px 28px;\n  border-bottom: 1px solid #d0d7e2;\n  color: #344054;\n  background: #eef4ff;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 0.86rem;\n}\n\n.cart-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 280px;\n  align-items: start;\n  gap: 24px;\n  padding: 28px;\n}\n\n.cart-items {\n  min-width: 0;\n}\n\n.cart-item-row {\n  display: grid;\n  grid-template-columns: 54px minmax(150px, 1fr) auto minmax(90px, auto) auto;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 0;\n  border-bottom: 1px solid #e4e7ec;\n}\n\n.cart-item-row:first-child {\n  padding-top: 0;\n}\n\n.cart-item-row:last-child {\n  border-bottom: 0;\n}\n\n.product-symbol {\n  display: grid;\n  width: 54px;\n  height: 54px;\n  place-items: center;\n  border-radius: 7px;\n  color: #175cd3;\n  background: #eef4ff;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n\n.product-copy,\n.line-total {\n  display: grid;\n  gap: 3px;\n  min-width: 0;\n}\n\n.product-copy p,\n.product-copy span,\n.line-total span {\n  margin: 0;\n  color: #667085;\n  font-size: 0.78rem;\n}\n\n.product-copy h3 {\n  overflow: hidden;\n  margin: 0;\n  color: #101828;\n  font-size: 1rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.line-total {\n  text-align: right;\n}\n\n.line-total strong {\n  color: #101828;\n  font-variant-numeric: tabular-nums;\n}\n\n.quantity-control {\n  display: grid;\n  grid-template-columns: 34px 38px 34px;\n  align-items: center;\n  overflow: hidden;\n  border: 1px solid #98a2b3;\n  border-radius: 6px;\n}\n\n.quantity-control button {\n  height: 34px;\n  border: 0;\n  color: #344054;\n  background: #f9fafb;\n  cursor: pointer;\n  font-size: 1.15rem;\n}\n\n.quantity-control button:hover:not(:disabled) {\n  color: #ffffff;\n  background: #175cd3;\n}\n\n.quantity-control button:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n\n.quantity-control output {\n  color: #101828;\n  font-variant-numeric: tabular-nums;\n  font-weight: 800;\n  text-align: center;\n}\n\n.remove-item-button {\n  padding: 5px 0;\n  border: 0;\n  color: #b42318;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.82rem;\n  font-weight: 750;\n}\n\n.cart-summary {\n  padding: 20px;\n  border: 1px solid #d0d7e2;\n  border-radius: 7px;\n  background: #f9fafb;\n}\n\n.cart-summary h3 {\n  margin: 6px 0 18px;\n  color: #101828;\n}\n\n.cart-summary dl {\n  margin: 0;\n}\n\n.cart-summary dl > div {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 9px 0;\n  color: #475467;\n}\n\n.cart-summary dd {\n  margin: 0;\n  color: #101828;\n  font-variant-numeric: tabular-nums;\n  font-weight: 750;\n}\n\n.cart-summary .summary-total {\n  margin-top: 8px;\n  padding-top: 16px;\n  border-top: 1px solid #b9c2cf;\n  color: #101828;\n  font-size: 1.08rem;\n  font-weight: 800;\n}\n\n.summary-note {\n  margin: 16px 0 0;\n  color: #667085;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n\n.empty-cart {\n  padding: 44px 24px;\n  border: 1px dashed #98a2b3;\n  border-radius: 7px;\n  text-align: center;\n}\n\n.empty-cart h3 {\n  margin: 0;\n  color: #101828;\n}\n\n.empty-cart p {\n  margin: 8px 0 0;\n  color: #667085;\n}\n\n@media (max-width: 980px) {\n  .cart-layout {\n    grid-template-columns: 1fr;\n  }\n\n  .cart-summary {\n    width: min(100%, 420px);\n  }\n}\n\n@media (max-width: 720px) {\n  .cart-project-header {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .reset-cart-button {\n    align-self: start;\n  }\n\n  .cart-item-row {\n    grid-template-columns: 48px minmax(0, 1fr) auto;\n  }\n\n  .product-symbol {\n    width: 48px;\n    height: 48px;\n  }\n\n  .quantity-control {\n    grid-column: 2;\n  }\n\n  .line-total {\n    grid-column: 3;\n    grid-row: 2;\n  }\n\n  .remove-item-button {\n    grid-column: 2;\n    justify-self: start;\n  }\n}\n\n@media (max-width: 480px) {\n  .cart-project-header,\n  .cart-layout {\n    padding: 20px;\n  }\n\n  .snapshot-status {\n    padding: 11px 20px;\n  }\n\n  .cart-item-row {\n    grid-template-columns: 42px minmax(0, 1fr);\n    gap: 12px;\n  }\n\n  .product-symbol {\n    width: 42px;\n    height: 42px;\n  }\n\n  .quantity-control,\n  .line-total,\n  .remove-item-button {\n    grid-column: 2;\n    grid-row: auto;\n  }\n\n  .line-total {\n    text-align: left;\n  }\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Build Verification:"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run lint\nnpm run build"
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
      "type": "code",
      "language": "txt",
      "label": "Output",
      "value": "Cart Quantity Panel\nWireless Keyboard  1  $79.00\nUSB-C Dock         2  $258.00\nMonitor Light      1  $54.00\nUnits                 4\nTotal                 $391.00"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Interaction check:"
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
                  "value": "Wireless Keyboard initial quantity is "
                },
                {
                  "type": "inlineCode",
                  "value": "1"
                },
                {
                  "type": "text",
                  "value": ", decrement disabled."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Increment is "
                },
                {
                  "type": "inlineCode",
                  "value": "2"
                },
                {
                  "type": "text",
                  "value": ", subtotal becomes "
                },
                {
                  "type": "inlineCode",
                  "value": "$158.00"
                },
                {
                  "type": "text",
                  "value": ", units become "
                },
                {
                  "type": "inlineCode",
                  "value": "5"
                },
                {
                  "type": "text",
                  "value": ", total becomes "
                },
                {
                  "type": "inlineCode",
                  "value": "$470.00"
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
                  "value": "consecutive increment to stock "
                },
                {
                  "type": "inlineCode",
                  "value": "4"
                },
                {
                  "type": "text",
                  "value": ", increment disabled."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Remove returns filtered array; Reset returns new seed array."
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
                  "value": "Button receives click, and React calls the callback passed in by child."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Row callback bring "
                },
                {
                  "type": "inlineCode",
                  "value": "product.id"
                },
                {
                  "type": "text",
                  "value": " calls the handler of the owner component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Handler from current "
                },
                {
                  "type": "inlineCode",
                  "value": "cartItems"
                },
                {
                  "type": "text",
                  "value": " snapshot records the quantity before operation."
                }
              ]
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
                  "value": "setCartItems"
                },
                {
                  "type": "text",
                  "value": " queue functional update."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React processes the queue and passes the latest queued array to "
                },
                {
                  "type": "inlineCode",
                  "value": "currentItems"
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
                  "value": "map"
                },
                {
                  "type": "text",
                  "value": " creates a new array, the target item uses spread to create a new object, and other items retain the old reference."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React calls cart component and children again."
                }
              ]
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
                  "value": "CartSummary"
                },
                {
                  "type": "text",
                  "value": " uses "
                },
                {
                  "type": "inlineCode",
                  "value": "reduce"
                },
                {
                  "type": "text",
                  "value": " Calculate units and total from new items."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React commit DOM differences for quantity, disabled attributes, subtotal and total."
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
      "id": "common-mistakes",
      "children": [
        {
          "type": "text",
          "value": "Common Mistakes"
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
            "value": "Error"
          }
        ],
        [
          {
            "type": "text",
            "value": "Why It Happens"
          }
        ],
        [
          {
            "type": "text",
            "value": "Fix"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Quantity exceeds stock"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only UI button was guarded."
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep "
            },
            {
              "type": "inlineCode",
              "value": "Math.min"
            },
            {
              "type": "text",
              "value": " in updater and disable button."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Quantity drops below one"
            }
          ],
          [
            {
              "type": "text",
              "value": "Missing domain boundary."
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep "
            },
            {
              "type": "inlineCode",
              "value": "Math.max"
            },
            {
              "type": "text",
              "value": " and disabled decrement."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Total becomes stale"
            }
          ],
          [
            {
              "type": "text",
              "value": "Total was duplicated in state."
            }
          ],
          [
            {
              "type": "text",
              "value": "Derive total with "
            },
            {
              "type": "inlineCode",
              "value": "reduce"
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
              "value": "Only item object changed in place"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "map"
            },
            {
              "type": "text",
              "value": " returned same mutated item."
            }
          ],
          [
            {
              "type": "text",
              "value": "Return "
            },
            {
              "type": "inlineCode",
              "value": "{ ...item, quantity: next }"
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
              "value": "Remove does not render reliably"
            }
          ],
          [
            {
              "type": "text",
              "value": "Original array was spliced."
            }
          ],
          [
            {
              "type": "text",
              "value": "Return "
            },
            {
              "type": "inlineCode",
              "value": "filter"
            },
            {
              "type": "text",
              "value": " result."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Reset shares mutated seed objects"
            }
          ],
          [
            {
              "type": "text",
              "value": "Seed objects were previously mutated."
            }
          ],
          [
            {
              "type": "text",
              "value": "Never mutate seed; clone nested objects for initial state."
            }
          ]
        ]
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
                  "value": "After learning state modeling, discuss whether the cart owner needs to be upgraded to a higher component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "After learning reducer, model increment, decrement, and remove as actions."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "After learning persistence, consider browser storage."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "enters the SellerHub project, connect backend validation, server stock conflict and async loading; do not implement this chapter in advance."
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
          "type": "text",
          "value": "Event The handler hands the user operation to the callback; the setter puts the next state or updater into the React queue; React uses the new state after the handler to render again and commit the necessary DOM changes."
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
          "value": "Common API table"
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
            "value": "Purpose"
          }
        ],
        [
          {
            "type": "text",
            "value": "Required Inputs"
          }
        ],
        [
          {
            "type": "text",
            "value": "Output / Effect"
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
              "value": "onClick={handler}"
            }
          ],
          [
            {
              "type": "text",
              "value": "React event"
            }
          ],
          [
            {
              "type": "text",
              "value": "register callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "function value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Called when Event"
            }
          ],
          [
            {
              "type": "text",
              "value": "written as call expression"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useState(initial)"
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
              "value": "Create component memory"
            }
          ],
          [
            {
              "type": "text",
              "value": "initial state"
            }
          ],
          [
            {
              "type": "text",
              "value": "value + setter"
            }
          ],
          [
            {
              "type": "text",
              "value": "conditional call Hook"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "setValue(next)"
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
              "value": "queue replacement"
            }
          ],
          [
            {
              "type": "text",
              "value": "next value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Request render"
            }
          ],
          [
            {
              "type": "text",
              "value": "expects the current value to change"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "setValue(prev => next)"
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
              "value": "queue calculation"
            }
          ],
          [
            {
              "type": "text",
              "value": "updater"
            }
          ],
          [
            {
              "type": "text",
              "value": "Uses queued previous state"
            }
          ],
          [
            {
              "type": "text",
              "value": "reads the external old snapshot instead of parameter"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "preventDefault()"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser API"
            }
          ],
          [
            {
              "type": "text",
              "value": "blocks default action"
            }
          ],
          [
            {
              "type": "text",
              "value": "cancelable event"
            }
          ],
          [
            {
              "type": "text",
              "value": "Default action canceled"
            }
          ],
          [
            {
              "type": "text",
              "value": "treated as stopPropagation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "stopPropagation()"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Stop spreading"
            }
          ],
          [
            {
              "type": "text",
              "value": "event"
            }
          ],
          [
            {
              "type": "text",
              "value": "Ancestor path stops"
            }
          ],
          [
            {
              "type": "text",
              "value": "treated as preventDefault"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "map"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript API"
            }
          ],
          [
            {
              "type": "text",
              "value": "replaces array item"
            }
          ],
          [
            {
              "type": "text",
              "value": "callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "New array"
            }
          ],
          [
            {
              "type": "text",
              "value": "callback mutation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "filter"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript API"
            }
          ],
          [
            {
              "type": "text",
              "value": "remove array item"
            }
          ],
          [
            {
              "type": "text",
              "value": "predicate"
            }
          ],
          [
            {
              "type": "text",
              "value": "New array"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses splice"
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
        ],
        [
          {
            "type": "text",
            "value": "When to Use A"
          }
        ],
        [
          {
            "type": "text",
            "value": "When to Use B"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Local variable"
            }
          ],
          [
            {
              "type": "text",
              "value": "State"
            }
          ],
          [
            {
              "type": "text",
              "value": "Local resets and does not trigger render; state persists and has setter."
            }
          ],
          [
            {
              "type": "text",
              "value": "Temporary calculation"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI memory"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Next value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Updater function"
            }
          ],
          [
            {
              "type": "text",
              "value": "Value replaces; updater receives queued previous state."
            }
          ],
          [
            {
              "type": "text",
              "value": "Independent next value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Depends on previous state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Render"
            }
          ],
          [
            {
              "type": "text",
              "value": "Commit"
            }
          ],
          [
            {
              "type": "text",
              "value": "Render calculates UI; commit changes DOM."
            }
          ],
          [
            {
              "type": "text",
              "value": "Reason about component calls"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reason about visible DOM change"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "preventDefault"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "stopPropagation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser action vs event path."
            }
          ],
          [
            {
              "type": "text",
              "value": "Form/link default"
            }
          ],
          [
            {
              "type": "text",
              "value": "Parent handler boundary"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Source state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derived state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Stored input vs render-time calculation."
            }
          ],
          [
            {
              "type": "text",
              "value": "Smallest mutable source"
            }
          ],
          [
            {
              "type": "text",
              "value": "Totals, subtotals, flags"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript event type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime event object"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type is erased; object exists."
            }
          ],
          [
            {
              "type": "text",
              "value": "Compile-time checking"
            }
          ],
          [
            {
              "type": "text",
              "value": "Handler runtime behavior"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "error-reference",
      "children": [
        {
          "type": "text",
          "value": "Error Reference"
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
            "value": "Error Type"
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
              "value": "Handler runs on load"
            }
          ],
          [
            {
              "type": "text",
              "value": "Render behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "Passed call result"
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass function value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Parentheses in event prop"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Counter logs old value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Snapshot misunderstanding"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current binding is fixed"
            }
          ],
          [
            {
              "type": "text",
              "value": "Predict next render"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read after setter"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Triple update adds once"
            }
          ],
          [
            {
              "type": "text",
              "value": "Queue misunderstanding"
            }
          ],
          [
            {
              "type": "text",
              "value": "Same snapshot used"
            }
          ],
          [
            {
              "type": "text",
              "value": "Functional updater"
            }
          ],
          [
            {
              "type": "text",
              "value": "Repeated "
            },
            {
              "type": "inlineCode",
              "value": "state + 1"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object UI does not update"
            }
          ],
          [
            {
              "type": "text",
              "value": "Mutation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Same object snapshot/reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "Return new object"
            }
          ],
          [
            {
              "type": "text",
              "value": "Property assignment"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Array UI is inconsistent"
            }
          ],
          [
            {
              "type": "text",
              "value": "Mutation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Original array changed"
            }
          ],
          [
            {
              "type": "text",
              "value": "Return map/filter/spread"
            }
          ],
          [
            {
              "type": "text",
              "value": "push/splice/sort"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Wrong "
            },
            {
              "type": "inlineCode",
              "value": "currentTarget"
            },
            {
              "type": "text",
              "value": " API"
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
              "value": "Wrong element generic"
            }
          ],
          [
            {
              "type": "text",
              "value": "Match bound element"
            }
          ],
          [
            {
              "type": "text",
              "value": "Editor property error"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "real-project-usage",
      "children": [
        {
          "type": "text",
          "value": "Real-Project Usage"
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
            "value": "Scenario"
          }
        ],
        [
          {
            "type": "text",
            "value": "Why It Appears"
          }
        ],
        [
          {
            "type": "text",
            "value": "Mechanism Used"
          }
        ],
        [
          {
            "type": "text",
            "value": "Risk"
          }
        ],
        [
          {
            "type": "text",
            "value": "Practical Rule"
          }
        ]
      ],
      "body": [
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
              "value": "User changes a stored count"
            }
          ],
          [
            {
              "type": "text",
              "value": "Functional array/object update"
            }
          ],
          [
            {
              "type": "text",
              "value": "Stock boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Guard UI and updater"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Controlled input"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI value follows state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Change event + setter"
            }
          ],
          [
            {
              "type": "text",
              "value": "Wrong event type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use currentTarget"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Form submit"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser has default navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "preventDefault"
            }
          ],
          [
            {
              "type": "text",
              "value": "Confuse propagation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Separate browser and React concerns"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Toggle card"
            }
          ],
          [
            {
              "type": "text",
              "value": "One object field changes"
            }
          ],
          [
            {
              "type": "text",
              "value": "Object spread"
            }
          ],
          [
            {
              "type": "text",
              "value": "Lost fields"
            }
          ],
          [
            {
              "type": "text",
              "value": "Spread before override"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Remove list item"
            }
          ],
          [
            {
              "type": "text",
              "value": "Collection shape changes"
            }
          ],
          [
            {
              "type": "text",
              "value": "filter"
            }
          ],
          [
            {
              "type": "text",
              "value": "Direct splice"
            }
          ],
          [
            {
              "type": "text",
              "value": "Return new array"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Order total"
            }
          ],
          [
            {
              "type": "text",
              "value": "Value follows items"
            }
          ],
          [
            {
              "type": "text",
              "value": "reduce during render"
            }
          ],
          [
            {
              "type": "text",
              "value": "Duplicate state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derive, do not synchronize"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "minimal-code-templates",
      "children": [
        {
          "type": "text",
          "value": "Minimal Code Templates"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: typed input handler",
      "value": "import { useState, type ChangeEvent } from 'react'\n\nexport function SearchField() {\n  const [value, setValue] = useState('')\n\n  function handleChange(event: ChangeEvent<HTMLInputElement>) {\n    setValue(event.currentTarget.value)\n  }\n\n  return <input onChange={handleChange} value={value} />\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: immutable keyed array update",
      "value": "setItems((currentItems) =>\n  currentItems.map((item) =>\n    item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item,\n  ),\n)"
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
          "type": "text",
          "value": "The learning document and entrance actually created or updated this time:"
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
              "value": "docs/react/chapter-04-state-and-events/react-chapter-04-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Complete study guide for Chapter 4."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
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
              "value": "mounts Chapter 04 practice root thin adapter."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been updated and reserved."
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
              "value": "Update Chapter 04 Route state."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been updated and reserved."
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
          "value": "General real practice files for this chapter:"
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
              "value": "src/learning/react/chapter-04-state-and-events/chapter-04-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "summarizes all real exercises and mini projects."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/chapter-04-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter shares styles."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/01-event-handler-callback/event-handler-callback.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Callback timing."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/02-pass-vs-call-handler/pass-vs-call-handler.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Function value vs call."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/03-event-object-and-default-behavior/event-object-and-default-behavior.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Event object, propagation, default."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/04-use-state-memory/use-state-memory.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "State memory."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/05-local-variable-vs-state/local-variable-vs-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Local binding vs state."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/06-state-setter-current-render/state-setter-current-render.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Setter with current render."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/07-state-snapshot/state-snapshot.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Snapshot and closure."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/08-batched-updates/batched-updates.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Batched replacement updates."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/09-functional-update/functional-update.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Updater queue."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/10-object-state-update/object-state-update.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Object replacement."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/11-array-state-update/array-state-update.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Array replacement."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/12-typed-event-handler/typed-event-handler.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Event and state types."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
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
          "value": "final mini project real file:"
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
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Product and CartItem types."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-seed-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Typed local seed data."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-controls.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Quantity controls and disabled boundaries."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-item-row.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Cart row composition."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Derived units and total."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Cart state owner and updates."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Mini project styles."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been created and reserved."
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
          "value": "does not need to create these concepts snippet:"
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
                  "value": "Snippet: called handler during render"
                }
              ]
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
                  "value": "Snippet: setter does not replace current snapshot"
                }
              ]
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
                  "value": "Snippet: direct object state mutation"
                }
              ]
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
                  "value": "Snippet: direct array state mutation"
                }
              ]
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
                  "value": "Template: typed input handler"
                }
              ]
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
                  "value": "Template: immutable keyed array update"
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
          "value": "is recommended to be organized into five mechanism cards instead of copying the entire page of code:"
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
                  "value": "Event card: function value, call expression, event object, default, propagation."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "State memory card: local variable, "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": ", setter, render, commit."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Snapshot card: closure, current render, delayed callback."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Queue card: replacement, batching, functional updater."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Immutable state card: object spread, array map/filter, derived state."
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
          "value": "Write a \"prediction question\" for each card: given the pre-click state, handler code and queue, first calculate the next render by hand, and then run a real exercise verification. Don't just record the API name."
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
                  "value": "Why "
                },
                {
                  "type": "inlineCode",
                  "value": "onClick={handleClick}"
                },
                {
                  "type": "text",
                  "value": " will not be executed during render?"
                }
              ]
            }
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
                  "value": "onClick={handleClick()}"
                },
                {
                  "type": "text",
                  "value": " be executed immediately?"
                }
              ]
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
                  "value": "preventDefault"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "stopPropagation"
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
                  "value": "Why don't both of them automatically update React UI?"
                }
              ]
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
                  "value": "useState"
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
                  "value": "Normal local variable Why can't UI state be saved?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why does the current handler still read the old value after calling the setter?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "State snapshot and JavaScript closure?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Three "
                },
                {
                  "type": "inlineCode",
                  "value": "setCount(count + 1)"
                },
                {
                  "type": "text",
                  "value": " usually only occur once plus one?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "How to calculate the three functional updaters in sequence?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why should object state return a new object?"
                }
              ]
            }
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
                  "value": " is not suitable for directly updating state array?"
                }
              ]
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
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "filter"
                },
                {
                  "type": "text",
                  "value": " and spread?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript event type What to check at compile time?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript type Why cannot the API data be verified in the browser runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Cart total not an independent state?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Cart increment How to create a new array and a new item object at the same time?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React What is the complete sequence from click to DOM commit?"
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
      "value": "Pass handlers; do not call them during render.\nEach render receives a fixed state snapshot.\nSetters queue work for a future render.\nFunctional updaters consume queued previous state.\nReplace state objects and arrays instead of mutating snapshots.\nDerive totals and flags during render when possible.\nTypeScript checks source code; React and the browser run JavaScript."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "shortest Chinese version: event triggers callback; callback queue state update; React uses new state and then render; UI difference enters DOM commit. The current render will not be written back by the setter, and the next state of object and array will be expressed with new references."
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
          "value": "The following page has been downloaded at 2026-06-18. Directly access the official URL and obtain HTTP "
        },
        {
          "type": "inlineCode",
          "value": "200"
        },
        {
          "type": "text",
          "value": ". The built-in web search tool then returned "
        },
        {
          "type": "inlineCode",
          "value": "403"
        },
        {
          "type": "text",
          "value": ", but does not affect direct verification of these official pages."
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
            "value": "Source"
          }
        ],
        [
          {
            "type": "text",
            "value": "Link"
          }
        ],
        [
          {
            "type": "text",
            "value": "The focus of this chapter"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/responding-to-events",
              "children": [
                {
                  "type": "text",
                  "value": "Responding to Events"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Handler must passed not called; propagation; "
            },
            {
              "type": "inlineCode",
              "value": "preventDefault"
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
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/state-a-components-memory",
              "children": [
                {
                  "type": "text",
                  "value": "State: A Component's Memory"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Retain data and trigger render; "
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
        ],
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
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
          ],
          [
            {
              "type": "text",
              "value": "Trigger, render, commit three stages; only change the DOM with difference."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/state-as-a-snapshot",
              "children": [
                {
                  "type": "text",
                  "value": "State as a Snapshot"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Setter does not change the current snapshot; handler and render-time values."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/queueing-a-series-of-state-updates",
              "children": [
                {
                  "type": "text",
                  "value": "Queueing a Series of State Updates"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Handler post-processing queue; batching; updater function."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/updating-objects-in-state",
              "children": [
                {
                  "type": "text",
                  "value": "Updating Objects in State"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Object state read-only; replacement and spread."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/updating-arrays-in-state",
              "children": [
                {
                  "type": "text",
                  "value": "Updating Arrays in State"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Array state read-only; map/filter compared with mutating methods."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/learn/typescript",
              "children": [
                {
                  "type": "text",
                  "value": "Using TypeScript"
                }
              ]
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "React.ChangeEvent<HTMLInputElement>"
            },
            {
              "type": "text",
              "value": " and React types."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React API"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/reference/react/useState",
              "children": [
                {
                  "type": "text",
                  "value": "useState"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Setter; "
            },
            {
              "type": "inlineCode",
              "value": "Object.is"
            },
            {
              "type": "text",
              "value": " The same value can skip re-render; batching after event handler."
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
              "type": "link",
              "href": "https://www.typescriptlang.org/docs/handbook/jsx.html",
              "children": [
                {
                  "type": "text",
                  "value": "JSX"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX intrinsic/value-based element and attribute checking."
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
              "type": "link",
              "href": "https://www.typescriptlang.org/docs/handbook/2/functions.html",
              "children": [
                {
                  "type": "text",
                  "value": "More on Functions"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Function type expression, callback parameter and "
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
        ],
        [
          [
            {
              "type": "text",
              "value": "MDN"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
              "children": [
                {
                  "type": "text",
                  "value": "Event.preventDefault"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "blocks the default action, but the event usually continues to propagate."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "MDN"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation",
              "children": [
                {
                  "type": "text",
                  "value": "Event.stopPropagation"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "stops capture/bubble propagation but does not prevent default behavior."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "MDN"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling",
              "children": [
                {
                  "type": "text",
                  "value": "Event bubbling"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "Bubbling, "
            },
            {
              "type": "inlineCode",
              "value": "target"
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "currentTarget"
            },
            {
              "type": "text",
              "value": "."
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
          "value": "Local auxiliary datastate:"
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
                  "value": "checked "
                },
                {
                  "type": "inlineCode",
                  "value": "references/books/react/README.md"
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
                  "value": "has read local-only "
                },
                {
                  "type": "inlineCode",
                  "value": "The Road to React"
                },
                {
                  "type": "text",
                  "value": " 2025 edition; This file exists in the learning directory of the development machine, but GitHub is not uploaded according to the repository rules."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "PDF physical page 50-52 (inside book page 45-47) is used to assist in understanding handler function, passing function value, synthetic event and "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault"
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
                  "value": "PDF physical page 58-64 (inside book page 53-59) is used to assist in understanding local variable, "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": ", state updater and callback handler."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "PDF physical page 67 (inside book page 62) is used to assist in understanding the filtered array derived from state; physical page 155 (inside book page 150) is used to assist in understanding form submission with "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault"
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
                  "value": "PDF physical pages 205, 210 (inside book pages 200, 205) are used to assist understanding of "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": " type inference and "
                },
                {
                  "type": "inlineCode",
                  "value": "React.ChangeEvent<HTMLInputElement>"
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
          "value": "Contents in local data that need to be corrected or narrowed according to the current official documents:"
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
                  "value": "PDF physical page 51 "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault"
                },
                {
                  "type": "text",
                  "value": " is introduced in the context of the enhancement of React synthetic event. It is easy for people to mistakenly think that it is a React exclusive capability. MDN clearly states "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault()"
                },
                {
                  "type": "text",
                  "value": " belongs to browser "
                },
                {
                  "type": "inlineCode",
                  "value": "Event"
                },
                {
                  "type": "text",
                  "value": " API; React event object provides a compatible call entry, but the default behavior itself belongs to the browser platform boundary."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "PDF physical page 59 Mark user interaction directly as "
                },
                {
                  "type": "inlineCode",
                  "value": "side-effect"
                },
                {
                  "type": "text",
                  "value": ". This chapter uses a more precise layering: event is browser input, handler is callback; side effects can be executed within the handler, but ordinary event-driven state updates should not be used with subsequent "
                },
                {
                  "type": "inlineCode",
                  "value": "useEffect"
                },
                {
                  "type": "text",
                  "value": " chapters are mixed together."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "PDF physical page 61 uses \"asynchronous re-render, for performance reasons\" to summarize batching, and it is written that state update will always trigger re-render. The more accurate model of the current React document is: setter queue update, the current render snapshot remains unchanged, React usually processes the queue after the event handler ends; if next state and current state pass "
                },
                {
                  "type": "inlineCode",
                  "value": "Object.is"
                },
                {
                  "type": "text",
                  "value": " is relatively the same, React can skip the re-render of component children."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "PDF example mainly uses "
                },
                {
                  "type": "inlineCode",
                  "value": ".jsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "event.target.value"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "React.useState"
                },
                {
                  "type": "text",
                  "value": ". They are not errors, but this chapter uses "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": ", specific event type, "
                },
                {
                  "type": "inlineCode",
                  "value": "event.currentTarget.value"
                },
                {
                  "type": "text",
                  "value": " and named "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
                },
                {
                  "type": "text",
                  "value": " import."
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
          "value": "Verification Needed: "
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
                  "value": "official page has been directly verified, and there is no frame behavior that still requires manual verification."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "It is still recommended to manually operate delayed snapshot, stock boundary, remove/reset and responsive layout in the browser, because build/type checking cannot replace interaction and visual inspection."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter04Content() {
  return <DocumentRenderer document={chapterDocument} />
}
