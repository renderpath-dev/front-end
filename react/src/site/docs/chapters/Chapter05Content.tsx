import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-05",
  "slug": "chapter-05-rendering-data",
  "title": "React Chapter 5: Lists, Keys, and Conditional Rendering",
  "sourcePath": "docs/react/chapter-05-rendering-data/react-chapter-05-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-5-lists-keys-and-conditional-rendering",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 5: Lists, Keys, and Conditional Rendering"
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
              "value": "understand "
            },
            {
              "type": "inlineCode",
              "value": "map()"
            },
            {
              "type": "text",
              "value": " returns React nodes"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/01-array-rendering/array-rendering-with-map.tsx"
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
              "value": "uses JavaScript expression to select JSX"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/02-conditional-rendering/conditional-rendering-branches.tsx"
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
              "value": "separates four UI states"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/03-ui-state-branches/ui-state-branches.tsx"
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
              "value": "Observe stable key and component identity"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/04-key-identity/key-identity-stable-id.tsx"
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
              "value": "Understand "
            },
            {
              "type": "inlineCode",
              "value": "key"
            },
            {
              "type": "text",
              "value": " and ordinary props"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/05-key-is-not-prop/key-is-not-prop.tsx"
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
              "value": "Recurrence of index key identity confusion"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/06-index-key-mistake/index-key-mistake.tsx"
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
              "value": "maintains the immutable boundaries of filter, sort, map"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/07-filter-sort-map-boundary/filter-sort-map-boundary.tsx"
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
              "value": "Modeling list elements and props"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/08-typed-list-rendering/typed-list-rendering.tsx"
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
              "value": "Collect all exercises"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/chapter-05-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real practice entrance"
            }
          ],
          [
            {
              "type": "text",
              "value": "8, 9"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Build Product List Panel"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/"
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
              "value": "vs. "
            },
            {
              "type": "inlineCode",
              "value": "key"
            },
            {
              "type": "text",
              "value": ", element and DOM"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: element identity layers"
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
              "value": "6"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "identifies illegal "
            },
            {
              "type": "inlineCode",
              "value": "if"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: statement inside JSX expression"
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
              "value": "9.2, 11"
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
          "value": "This chapter is located in Chapter 5 of the React learning path and inherits the event handler and "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": ", state snapshot, batching, functional update, and immutable array update basics."
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
                  "value": "study guide: "
                },
                {
                  "type": "inlineCode",
                  "value": "docs/react/chapter-05-rendering-data/react-chapter-05-learning-guide.md"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Practice entrance: "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-05-rendering-data/chapter-05-practice-root.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "final mini project: "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Preceding chapter: "
                },
                {
                  "type": "inlineCode",
                  "value": "docs/react/chapter-04-state-and-events/react-chapter-04-learning-guide.md"
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
          "value": "This chapter only discusses \"how data becomes a list UI, how React identifies sibling elements, and how different UI states branch.\" No backends, routers, TanStack Query, React Hook Form, Prisma, data request caching or real SellerHub architecture are introduced."
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
          "value": "Chapter 4 can already update the array, but \"the array is updated correctly\" does not mean \"the list render and identity judgment are correct\". The real listing page must also answer the following question:"
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
                  "value": "JavaScript How to convert array to JSX?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "loading, error, empty, success Why can't we just rely on one "
                },
                {
                  "type": "inlineCode",
                  "value": "items.length"
                },
                {
                  "type": "text",
                  "value": " Judge?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React Why requires direct elements in an array to have "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
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
                  "value": "After sorting, inserting and deleting, how does React know which row is still the original row?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why is "
                },
                {
                  "type": "inlineCode",
                  "value": "key={product.id}"
                },
                {
                  "type": "text",
                  "value": ", child component cannot read "
                },
                {
                  "type": "inlineCode",
                  "value": "props.key"
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
                  "value": "Why "
                },
                {
                  "type": "inlineCode",
                  "value": "array.sort()"
                },
                {
                  "type": "text",
                  "value": " Possibly modify props or state references silently?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript How to make each UI state carry appropriate data?"
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
          "value": "These questions will appear directly in SellerHub's products, shopping carts, orders and review lists."
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
            "value": "Why do you need"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "JavaScript array, object and callback"
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
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "sort"
            },
            {
              "type": "text",
              "value": " all handle array elements through callback."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX expression boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "{...}"
            },
            {
              "type": "text",
              "value": " accepts expression, but does not accept ordinary statement."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React component and props"
            }
          ],
          [
            {
              "type": "text",
              "value": "The list is usually split into list component and item component."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useState"
            },
            {
              "type": "text",
              "value": " and render snapshot"
            }
          ],
          [
            {
              "type": "text",
              "value": "key error is most easily observed through misalignment of child local state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Immutable array update"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 4 has explained that state array should not be directly "
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
              "value": " or modify in place."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript object type and union"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter uses them to accurately describe elements and UI state."
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
                  "value": "explanation array rendering is "
                },
                {
                  "type": "inlineCode",
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " returns React nodes instead of React-specific loop syntax."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses early return, ternary and "
                },
                {
                  "type": "inlineCode",
                  "value": "&&"
                },
                {
                  "type": "text",
                  "value": " expresses different UI descriptions and identifies their boundaries."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Distinguish between React element, React tracked component identity and browser DOM node."
                }
              ]
            }
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
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " has three requirements: siblings scope, stable, and unique."
                }
              ]
            }
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
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " does not enter normal props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "reproduces the local state misalignment caused by the index key through sorting, insertion, and deletion."
                }
              ]
            }
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
                  "value": "filter"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "sort"
                },
                {
                  "type": "text",
                  "value": ", then "
                },
                {
                  "type": "inlineCode",
                  "value": "map"
                },
                {
                  "type": "text",
                  "value": ", does not modify the input array."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses TypeScript for "
                },
                {
                  "type": "inlineCode",
                  "value": "Product[]"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "ReadonlyArray<Order>"
                },
                {
                  "type": "text",
                  "value": ", list props and discriminated union state modeling."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "migrates the same set of mechanisms to SellerHub's products, cart items, orders and admin review lists."
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
                  "value": "put "
                },
                {
                  "type": "inlineCode",
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " is regarded as ordinary JavaScript transformation."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "further understand that conditional rendering only determines which description is returned by this render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "establishes a mutually exclusive state model for loading, error, empty, and success."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Distinguish between element description, component identity and DOM commit."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "understand key on this model instead of memorizing warning fix."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Use index key error practice to observe identity misalignment."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "finally combines filter, sort, map, TypeScript and Product List Panel."
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
          "value": "This sequence first solves \"what to generate\", then \"how to match React\", and finally \"how to model in the project\"."
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
              "value": "array rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "The process of converting array elements into renderable nodes"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript + React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real business data is usually an array."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React node"
            }
          ],
          [
            {
              "type": "text",
              "value": "React can render values, such as element, string, number, "
            },
            {
              "type": "inlineCode",
              "value": "null"
            },
            {
              "type": "text",
              "value": " or node array"
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
              "value": "map()"
            },
            {
              "type": "text",
              "value": " is usually a React node array."
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
              "value": "Select the UI description returned this time according to the conditions"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript expression + React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "The same component must express multiple interface states."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React element"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX converted to a lightweight UI description"
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
              "value": "It is not a DOM node, nor is it a class instance with state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "component identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "React uses type, tree position and key to associate the identity of the state"
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
              "value": "determines whether the child state is retained or reset."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DOM node"
            }
          ],
          [
            {
              "type": "text",
              "value": "The real node object"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "React only updates it during the commit phase."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "key"
            }
          ],
          [
            {
              "type": "text",
              "value": "React is a special prop used to identify sibling list items"
            }
          ],
          [
            {
              "type": "text",
              "value": "React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "Helps in correct matching when sorting, inserting, and deleting."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "siblings scope"
            }
          ],
          [
            {
              "type": "text",
              "value": "key only needs to be unique"
            }
          ],
          [
            {
              "type": "text",
              "value": "React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not require global uniqueness across applications."
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
              "value": "uses a common discriminant field to describe the mutually exclusive state"
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
              "value": "prevents error state from carrying items or success state from missing items."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "immutable transformation"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not modify the input array and returns the derived array"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript data model"
            }
          ],
          [
            {
              "type": "text",
              "value": "keeps the props/state input pure and inferable."
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
          "value": "From business array to screen can be divided into six steps:"
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
                  "value": "JavaScript executes component function."
                }
              ]
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
                  "value": "filter()"
                },
                {
                  "type": "text",
                  "value": ", copied "
                },
                {
                  "type": "inlineCode",
                  "value": "sort()"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " generates a new array value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX is converted to React element descriptions by the toolchain."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "conditional expression determines which descriptions appear in the result."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React uses element type and "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " matches the identities of two renders before and after."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React applies necessary changes to browser DOM nodes during the commit phase."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Snippet: element identity layers",
      "value": "Product object\n  -> map callback\n  -> React element description\n  -> sibling match by type and key\n  -> component state association\n  -> DOM commit"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "must distinguish three object levels:"
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
                      "value": "React element"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": It cannot be understood as a real node. It is a lightweight value describing \"what you want to see\"."
                }
              ]
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
                      "value": "component identity"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": The function component itself does not return a \"component instance object\" that can be operated by business code. React internally saves the state identity of the position based on tree position, type and key."
                }
              ]
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
                      "value": "DOM node"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "HTMLLIElement"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "HTMLButtonElement"
                },
                {
                  "type": "text",
                  "value": " are only reflected on the page after React commit."
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
          "value": "Therefore, re-creating the element description does not mean that the DOM must be rebuilt, nor does it mean that the child state must be reset. Whether the match continues depends on type, position and key."
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
      "value": "D:/vite_ts/\n  AGENTS.MD\n  README.md\n  package.json\n  src/\n    App.tsx\n    sudoku/\n    learning/react/\n      chapter-04-state-and-events/\n      chapter-05-rendering-data/"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "src/sudoku/"
        },
        {
          "type": "text",
          "value": " is an independent practice application and this chapter will not be modified."
        }
      ]
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
      "value": "docs/react/\n  chapter-04-state-and-events/\n    react-chapter-04-learning-guide.md\n  chapter-05-rendering-data/\n    react-chapter-05-learning-guide.md"
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
      "value": "src/learning/react/chapter-05-rendering-data/\n  chapter-05-practice-root.tsx\n  chapter-05-practice.css\n  01-array-rendering/\n    array-rendering-with-map.tsx\n  02-conditional-rendering/\n    conditional-rendering-branches.tsx\n  03-ui-state-branches/\n    ui-state-branches.tsx\n  04-key-identity/\n    key-identity-stable-id.tsx\n  05-key-is-not-prop/\n    key-is-not-prop.tsx\n  06-index-key-mistake/\n    index-key-mistake.tsx\n  07-filter-sort-map-boundary/\n    filter-sort-map-boundary.tsx\n  08-typed-list-rendering/\n    typed-list-rendering.tsx\n  product-list-mini-project/\n    product-list-types.ts\n    product-list-seed-data.ts\n    product-filter-controls.tsx\n    product-card.tsx\n    product-grid.tsx\n    product-list-summary.tsx\n    product-list-mini-project.tsx\n    product-list-mini-project.css"
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
          "value": "These labels only represent the mechanism fragments in the document, not the files to be created."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets:\n  Snippet: element identity layers\n  Snippet: statement inside JSX expression\n  Snippet: direct sort mutation\n  Template: discriminated list state"
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
          "value": "final mini project only uses the above "
        },
        {
          "type": "inlineCode",
          "value": "product-list-mini-project/"
        },
        {
          "type": "text",
          "value": " eight files, no new dependencies, backends or routes are added."
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
          "value": " mounts "
        },
        {
          "type": "inlineCode",
          "value": "Chapter05PracticeRoot"
        },
        {
          "type": "text",
          "value": ". Current "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": " still points to the independent "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/main.tsx"
        },
        {
          "type": "text",
          "value": ", this chapter does not modify "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/"
        },
        {
          "type": "text",
          "value": " or this entry; therefore lint and build will verify the source code of Chapter 5, but the browser will still display Sudoku by default. If you need to switch learning portals in the browser, you should arrange the portal switching task separately."
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
          "value": "verify ESLint rules, TypeScript compilation boundaries and Vite production build respectively."
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
      "id": "91-rendering-arrays-from-javascript-map-to-react-nodes",
      "children": [
        {
          "type": "text",
          "value": "9.1 Rendering Arrays from JavaScript map to React Nodes"
        }
      ]
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
          "value": " JSX does not have a separate list loop syntax. JavaScript "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " executes callback on each data element and returns a new array consisting of React element descriptions."
        }
      ]
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
          "value": " restores \"React render list\" to JavaScript array transformation to avoid treating JSX as another template language."
        }
      ]
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
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " is JavaScript "
                },
                {
                  "type": "inlineCode",
                  "value": "Array"
                },
                {
                  "type": "text",
                  "value": " method."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX is source syntax, converted by the tool chain, not the browser's native syntax."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React receives the node array returned by callback and processes it in the render phase."
                }
              ]
            }
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
                  "value": "CatalogItem"
                },
                {
                  "type": "text",
                  "value": " deduces callback parameter type."
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
      "label": "src/learning/react/chapter-05-rendering-data/01-array-rendering/array-rendering-with-map.tsx",
      "value": "type CatalogItem = {\n  id: string\n  name: string\n  category: string\n}\n\nconst catalogItems: CatalogItem[] = [\n  { id: 'product-keyboard', name: 'Mechanical Keyboard', category: 'Electronics' },\n  { id: 'product-chair', name: 'Ergonomic Chair', category: 'Office' },\n  { id: 'product-lamp', name: 'Desk Lamp', category: 'Home' },\n]\n\nexport function ArrayRenderingWithMap() {\n  const productNodes = catalogItems.map((item) => (\n    <li key={item.id}>\n      <strong>{item.name}</strong>\n      <span>{item.category}</span>\n    </li>\n  ))\n\n  return (\n    <article className=\"practice-panel\">\n      <p className=\"practice-kicker\">01 · Array rendering</p>\n      <h2>JavaScript arrays become React nodes</h2>\n      <ul className=\"rendered-list\">{productNodes}</ul>\n    </article>\n  )\n}"
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
                  "value": "CatalogItem[]"
                },
                {
                  "type": "text",
                  "value": " Each object in the constraint array must be stable "
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
                  "value": "name"
                },
                {
                  "type": "text",
                  "value": " and "
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
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " does not modify "
                },
                {
                  "type": "inlineCode",
                  "value": "catalogItems"
                },
                {
                  "type": "text",
                  "value": ", instead create "
                },
                {
                  "type": "inlineCode",
                  "value": "productNodes"
                },
                {
                  "type": "text",
                  "value": " new array."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "callback returns one "
                },
                {
                  "type": "inlineCode",
                  "value": "<li>"
                },
                {
                  "type": "text",
                  "value": " element description."
                }
              ]
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
                  "value": "{productNodes}"
                },
                {
                  "type": "text",
                  "value": " Hands the entire node array to React as children."
                }
              ]
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
                  "value": "key={item.id}"
                },
                {
                  "type": "text",
                  "value": " only serves this group "
                },
                {
                  "type": "inlineCode",
                  "value": "<li>"
                },
                {
                  "type": "text",
                  "value": " siblings."
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
          "value": " The component function is executed once when rendering for the first time; "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " is executed three times synchronously; three element descriptions are returned; React then compares them with the current tree and commits the DOM."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Output",
      "value": "Mechanical Keyboard  Electronics\nErgonomic Chair      Office\nDesk Lamp            Home"
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
          "value": " uses "
        },
        {
          "type": "inlineCode",
          "value": "{ catalogItems }"
        },
        {
          "type": "text",
          "value": " will try to render normal objects directly instead of React nodes; forget the callback of "
        },
        {
          "type": "inlineCode",
          "value": "return"
        },
        {
          "type": "text",
          "value": " will get "
        },
        {
          "type": "inlineCode",
          "value": "[undefined, undefined, undefined]"
        },
        {
          "type": "text",
          "value": ". See "
        },
        {
          "type": "inlineCode",
          "value": "map(() => { ... })"
        },
        {
          "type": "text",
          "value": " is present, you should immediately check whether there is an explicit "
        },
        {
          "type": "inlineCode",
          "value": "return"
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
              "value": "and the real project:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "ProductListPage"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "CartPage"
        },
        {
          "type": "text",
          "value": " and the order page map the typed array in the API or state to item components."
        }
      ]
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
          "value": " data array is not equal to UI; "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " is a pure conversion boundary from data item to React node."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-conditional-rendering-selects-a-ui-description",
      "children": [
        {
          "type": "text",
          "value": "9.2 Conditional Rendering Selects a UI Description"
        }
      ]
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
          "value": " conditional rendering is not a special render engine, but JavaScript control flow or expression determines which UI description the component returns this time."
        }
      ]
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
                  "type": "text",
                  "value": "component function body can use "
                },
                {
                  "type": "inlineCode",
                  "value": "if"
                },
                {
                  "type": "text",
                  "value": " statement and early return."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "{...}"
                },
                {
                  "type": "text",
                  "value": ", you can use ternary "
                },
                {
                  "type": "inlineCode",
                  "value": "condition ? a : b"
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
                  "value": "condition && node"
                },
                {
                  "type": "text",
                  "value": " fits the \"with or without\" branch, but the left number "
                },
                {
                  "type": "inlineCode",
                  "value": "0"
                },
                {
                  "type": "text",
                  "value": " may be rendered."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "For complex branches, priority is given to calculating variables or splitting components in advance, and do not nest multiple levels of ternary."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/02-conditional-rendering/conditional-rendering-branches.tsx",
      "value": "type InventoryPreview = {\n  id: string\n  name: string\n  stock: number\n}\n\nconst inventoryPreviews: InventoryPreview[] = [\n  { id: 'inventory-monitor', name: 'Studio Monitor', stock: 8 },\n  { id: 'inventory-microphone', name: 'USB Microphone', stock: 0 },\n]\n\nexport function ConditionalRenderingBranches() {\n  return (\n    <ul className=\"rendered-list\">\n      {inventoryPreviews.map((product) => (\n        <li key={product.id}>\n          <strong>{product.name}</strong>\n          {product.stock > 0 ? (\n            <span className=\"status-badge status-badge-success\">In stock</span>\n          ) : (\n            <span className=\"status-badge status-badge-muted\">Out of stock</span>\n          )}\n        </li>\n      ))}\n    </ul>\n  )\n}"
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
          "value": "product.stock > 0"
        },
        {
          "type": "text",
          "value": " is first evaluated by JavaScript to obtain a boolean; ternary only returns one of the element descriptions. Two "
        },
        {
          "type": "inlineCode",
          "value": "<span>"
        },
        {
          "type": "text",
          "value": " are not DOM nodes, nor are they two state component instances, they are just candidate descriptions for this render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Illegal writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: statement inside JSX expression",
      "value": "return <div>{if (isLoading) { return <p>Loading...</p> }}</div>"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "if"
        },
        {
          "type": "text",
          "value": " is a statement and cannot directly become the value of JSX expression. The correction method is in "
        },
        {
          "type": "inlineCode",
          "value": "return"
        },
        {
          "type": "text",
          "value": ", or use ternary instead."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " if "
        },
        {
          "type": "inlineCode",
          "value": "{...}"
        },
        {
          "type": "text",
          "value": " needs to be written "
        },
        {
          "type": "inlineCode",
          "value": "if"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "for"
        },
        {
          "type": "text",
          "value": ", variable declaration or multiple statements, move the logic before JSX."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and the real project:"
            }
          ]
        },
        {
          "type": "text",
          "value": " product stock badge, order status badge, button disabled label all belong to local conditional rendering."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-modeling-loading-error-empty-and-success-branches",
      "children": [
        {
          "type": "text",
          "value": "9.3 Modeling Loading, Error, Empty, and Success Branches"
        }
      ]
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
          "value": " The four states express different facts and cannot all degenerate into "
        },
        {
          "type": "inlineCode",
          "value": "items.length === 0"
        },
        {
          "type": "text",
          "value": "."
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
                  "value": "loading: The result has not yet been determined."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "error: The operation failed, error information should be carried or the entry should be restored."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "empty: The operation was successful, but the valid result is zero."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "success: The operation is successful and there is renderable data."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/03-ui-state-branches/ui-state-branches.tsx",
      "value": "import { useState } from 'react'\n\ntype UiState =\n  | { status: 'loading' }\n  | { status: 'error'; message: string }\n  | { status: 'empty' }\n  | { status: 'success'; items: string[] }\n\nfunction UiStatePreview({ state }: { state: UiState }) {\n  if (state.status === 'loading') {\n    return <p>Loading products...</p>\n  }\n\n  if (state.status === 'error') {\n    return <p>{state.message}</p>\n  }\n\n  if (state.status === 'empty') {\n    return <p>No products match this view.</p>\n  }\n\n  return (\n    <ul>\n      {state.items.map((item) => (\n        <li key={item}>{item}</li>\n      ))}\n    </ul>\n  )\n}\n\nexport function UiStateBranches() {\n  const [state, setState] = useState<UiState>({ status: 'empty' })\n\n  return (\n    <div>\n      <button\n        type=\"button\"\n        onClick={() => setState({ status: 'success', items: ['Mechanical Keyboard'] })}\n      >\n        Show success\n      </button>\n      <UiStatePreview state={state} />\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "TypeScript Compilation period:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Discrimination field "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " lets control-flow narrowing know that only the error branch can read "
        },
        {
          "type": "inlineCode",
          "value": "message"
        },
        {
          "type": "text",
          "value": ", only success branch can read "
        },
        {
          "type": "inlineCode",
          "value": "items"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "{ status: 'success' }"
        },
        {
          "type": "text",
          "value": " will directly generate a type error because "
        },
        {
          "type": "inlineCode",
          "value": "items"
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
              "value": "JavaScript runtime: "
            }
          ]
        },
        {
          "type": "text",
          "value": " TypeScript types are erased; the runtime is just ordinary objects, string comparisons and early returns. Types do not automatically request data, nor do they automatically validate external JSON."
        }
      ]
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
      "label": "Snippet: collapsed loading and empty state",
      "value": "if (items.length === 0) {\n  return <p>No products found.</p>\n}"
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
          "value": "items"
        },
        {
          "type": "text",
          "value": " may also be empty, so the user will see the wrong empty message first. You must first determine loading/error based on the request state, and then determine whether the successful result is empty."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "SellerHub Relationship:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Every real list page should have a clear state branch, especially "
        },
        {
          "type": "inlineCode",
          "value": "ProductListPage"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "BuyerOrdersPage"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "AdminProductsPage"
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
      "id": "94-keys-identify-sibling-elements-across-renders",
      "children": [
        {
          "type": "text",
          "value": "9.4 Keys Identify Sibling Elements Across Renders"
        }
      ]
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
          "value": "key"
        },
        {
          "type": "text",
          "value": " is React's hint for matching item identity in children of the same parent. It helps React determine whether an item is retained, moved, added, or deleted."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Rule:"
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
                  "value": "key is unique within the siblings range; different arrays can reuse the same key."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key is stable during the item life cycle; do not use "
                },
                {
                  "type": "inlineCode",
                  "value": "Math.random()"
                },
                {
                  "type": "text",
                  "value": " is generated."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key comes from the data identity, such as "
                },
                {
                  "type": "inlineCode",
                  "value": "product.id"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "cartItem.id"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "order.id"
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
                  "value": "key is placed in "
                },
                {
                  "type": "inlineCode",
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " callback directly returns the outermost element or component."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/04-key-identity/key-identity-stable-id.tsx",
      "value": "import { useState } from 'react'\n\ntype KeyedProduct = {\n  id: string\n  name: string\n}\n\nfunction KeyedProductRow({ product }: { product: KeyedProduct }) {\n  const [note, setNote] = useState('')\n\n  return (\n    <li>\n      <label>\n        <span>{product.name}</span>\n        <input value={note} onChange={(event) => setNote(event.target.value)} />\n      </label>\n    </li>\n  )\n}\n\nexport function KeyIdentityStableId() {\n  const [products, setProducts] = useState<KeyedProduct[]>([\n    { id: 'product-alpha', name: 'Alpha Keyboard' },\n    { id: 'product-bravo', name: 'Bravo Headset' },\n  ])\n\n  function handleReverse() {\n    setProducts((currentProducts) => [...currentProducts].reverse())\n  }\n\n  return (\n    <>\n      <button type=\"button\" onClick={handleReverse}>Reverse products</button>\n      <ul>\n        {products.map((product) => (\n          <KeyedProductRow key={product.id} product={product} />\n        ))}\n      </ul>\n    </>\n  )\n}"
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
                  "value": "each "
                },
                {
                  "type": "inlineCode",
                  "value": "KeyedProductRow"
                },
                {
                  "type": "text",
                  "value": " is obtained in React tree with "
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
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "input value is child local state, not product object field."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "reverse creates a new array and changes the order."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React sees the same keys, just moved, and therefore continues to associate the note state to the same product identity."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "commit phase moves or updates the necessary DOM instead of binding the note to the new location."
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
              "value": "Error location:"
            }
          ]
        },
        {
          "type": "text",
          "value": " If callback returns "
        },
        {
          "type": "inlineCode",
          "value": "<li><ProductRow key={id} /></li>"
        },
        {
          "type": "text",
          "value": ", the real list siblings is "
        },
        {
          "type": "inlineCode",
          "value": "<li>"
        },
        {
          "type": "text",
          "value": "; Placing the key deeper does not help parent list matching."
        }
      ]
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
          "value": " key is not a DOM id, nor a global primary key constraint; it is a React identity hint of \"who is the child under this parent node?\""
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-why-key-is-not-passed-as-an-ordinary-prop",
      "children": [
        {
          "type": "text",
          "value": "9.5 Why key Is Not Passed as an Ordinary Prop"
        }
      ]
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
          "value": "key"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "ref"
        },
        {
          "type": "text",
          "value": " are special props consumed by React. React will not convert "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " props object forwarded to component function."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/05-key-is-not-prop/key-is-not-prop.tsx",
      "value": "type KeyBoundaryItemProps = {\n  productId: string\n  name: string\n}\n\nfunction KeyBoundaryItem({ productId, name }: KeyBoundaryItemProps) {\n  return (\n    <li>\n      <strong>{name}</strong>\n      <span>Readable prop: {productId}</span>\n    </li>\n  )\n}\n\nconst products = [\n  { id: 'sku-100', name: 'Wireless Mouse' },\n  { id: 'sku-200', name: 'Laptop Stand' },\n]\n\nexport function KeyIsNotProp() {\n  return (\n    <ul>\n      {products.map((product) => (\n        <KeyBoundaryItem key={product.id} productId={product.id} name={product.name} />\n      ))}\n    </ul>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Bottom boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "key={product.id}"
        },
        {
          "type": "text",
          "value": " is React reconciliation hint; "
        },
        {
          "type": "inlineCode",
          "value": "productId={product.id}"
        },
        {
          "type": "text",
          "value": " is application data. Although the values ​​are the same, the responsibilities are different, so passing them explicitly twice is not redundant."
        }
      ]
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
          "value": " Add "
        },
        {
          "type": "inlineCode",
          "value": "{ key: string }"
        },
        {
          "type": "text",
          "value": " does not force React to forward keys. If child needs this value, it must use another business prop name, such as "
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
          "value": "productId"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "orderId"
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
              "value": "identification method:"
            }
          ]
        },
        {
          "type": "text",
          "value": " As long as the child business logic needs to read a value, do not rely on "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": "; Pass it explicitly as a normal named prop."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-why-array-indexes-are-often-unsafe-keys",
      "children": [
        {
          "type": "text",
          "value": "9.6 Why Array Indexes Are Often Unsafe Keys"
        }
      ]
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
          "value": " index describes the current location, not the data identity. When an item is inserted, deleted, or sorted, the same index will point to another item, and the child local state may therefore follow the wrong data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "When the risk is lower:"
            }
          ]
        },
        {
          "type": "text",
          "value": " list is completely static, never rearranged, never added or deleted, and items have no stable IDs or child state. Even if these conditions are met, stable data IDs are easier to maintain."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real error practice:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/06-index-key-mistake/index-key-mistake.tsx",
      "value": "import { useState } from 'react'\n\ntype SortableOrder = {\n  id: string\n  label: string\n}\n\nfunction EditableOrderRow({ order }: { order: SortableOrder }) {\n  const [note, setNote] = useState('')\n\n  return (\n    <li>\n      <label>\n        <span>{order.label}</span>\n        <input value={note} onChange={(event) => setNote(event.target.value)} />\n      </label>\n    </li>\n  )\n}\n\nexport function IndexKeyMistake({ orders }: { orders: SortableOrder[] }) {\n  return (\n    <div>\n      <ul>\n        {orders.map((order, index) => (\n          <EditableOrderRow key={index} order={order} />\n        ))}\n      </ul>\n      <ul>\n        {orders.map((order) => (\n          <EditableOrderRow key={order.id} order={order} />\n        ))}\n      </ul>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "is wrong:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Assumption index "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": " originally corresponded to "
        },
        {
          "type": "inlineCode",
          "value": "order-401"
        },
        {
          "type": "text",
          "value": ", child state note is "
        },
        {
          "type": "inlineCode",
          "value": "\"Call buyer\""
        },
        {
          "type": "text",
          "value": ". After deleting the first item, index "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": " changed to "
        },
        {
          "type": "inlineCode",
          "value": "order-402"
        },
        {
          "type": "text",
          "value": ". React still sees key "
        },
        {
          "type": "inlineCode",
          "value": "0"
        },
        {
          "type": "text",
          "value": ", so the location identity is retained; the UI displays the old note at "
        },
        {
          "type": "inlineCode",
          "value": "order-402"
        },
        {
          "type": "text",
          "value": ". The stable ID version will delete key "
        },
        {
          "type": "inlineCode",
          "value": "order-401"
        },
        {
          "type": "text",
          "value": ", and retain key "
        },
        {
          "type": "inlineCode",
          "value": "order-402"
        },
        {
          "type": "text",
          "value": " 's own state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Error type:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This is usually not a TypeScript error, nor does it necessarily generate a runtime exception, but a reconciliation identity bug. It only manifests when data changes are combined with child state, making it harder to troubleshoot."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " saw "
        },
        {
          "type": "inlineCode",
          "value": "key={index}"
        },
        {
          "type": "text",
          "value": ": Will the list be sorted? Will it be inserted or deleted? Does row have input, expanded state, animation or focus? Either answer is \"yes/yes\", then stable ID should be used."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-filter-sort-map-and-immutable-array-boundaries",
      "children": [
        {
          "type": "text",
          "value": "9.7 filter, sort, map, and Immutable Array Boundaries"
        }
      ]
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
          "value": "filter()"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " returns a new array; "
        },
        {
          "type": "inlineCode",
          "value": "sort()"
        },
        {
          "type": "text",
          "value": " modifies the array in which it is called. When sorting is required in render, you should copy first and then sort."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/07-filter-sort-map-boundary/filter-sort-map-boundary.tsx",
      "value": "import { useState } from 'react'\n\ntype InventoryItem = {\n  id: string\n  name: string\n  category: 'electronics' | 'office'\n  price: number\n}\n\nexport function FilterSortMapBoundary({ items }: { items: InventoryItem[] }) {\n  const [category, setCategory] = useState<'all' | InventoryItem['category']>('all')\n  const [ascending, setAscending] = useState(true)\n\n  const filteredItems = items.filter(\n    (item) => category === 'all' || item.category === category,\n  )\n  const sortedItems = [...filteredItems].sort((left, right) =>\n    ascending ? left.price - right.price : right.price - left.price,\n  )\n\n  return (\n    <ul>\n      {sortedItems.map((item) => (\n        <li key={item.id}>{item.name}</li>\n      ))}\n    </ul>\n  )\n}"
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
                  "value": "items"
                },
                {
                  "type": "text",
                  "value": ": Enter the reference without modification."
                }
              ]
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
                  "value": "filteredItems"
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "filter()"
                },
                {
                  "type": "text",
                  "value": "; element objects still share references with the input."
                }
              ]
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
                  "value": "[...filteredItems]"
                },
                {
                  "type": "text",
                  "value": ": Create another shallow copy that can be safely reordered."
                }
              ]
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
                  "value": "sort()"
                },
                {
                  "type": "text",
                  "value": ": Modify the element order of this copy in place."
                }
              ]
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
                  "value": "sortedItems"
                },
                {
                  "type": "text",
                  "value": ": Final derived array, no need to enter state as it can be recalculated by inputs."
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
              "value": "error example:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: direct sort mutation",
      "value": "const sortedProducts = products.sort((left, right) => left.price - right.price)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "will change "
        },
        {
          "type": "inlineCode",
          "value": "products"
        },
        {
          "type": "text",
          "value": ". If it comes from props, state, or module-level seed data, it breaks input purity and may allow other components to observe unexpected ordering."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and Chapter 4:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Chapter 4 emphasizes that state update returns a new array; this section extends the same principle to render-time derivation. Don't store derivable results into state repeatedly, and don't modify inputs."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-typing-list-data-props-and-union-ui-states",
      "children": [
        {
          "type": "text",
          "value": "9.8 Typing List Data, Props, and Union UI States"
        }
      ]
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
          "value": " The list type should answer three questions: what fields a single item has, what containers the list component accepts, and what data the UI state carries in each branch."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/08-typed-list-rendering/typed-list-rendering.tsx",
      "value": "type OrderStatus = 'pending' | 'paid' | 'shipped'\n\ntype Order = {\n  id: string\n  customerName: string\n  total: number\n  status: OrderStatus\n}\n\ntype TypedOrderListProps = {\n  orders: ReadonlyArray<Order>\n}\n\nfunction TypedOrderList({ orders }: TypedOrderListProps) {\n  return (\n    <ul>\n      {orders.map((order) => (\n        <li key={order.id}>\n          {order.id} · {order.customerName} · ${order.total} · {order.status}\n        </li>\n      ))}\n    </ul>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "TypeScript Layer:"
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
                  "value": "Order[]"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "Array<Order>"
                },
                {
                  "type": "text",
                  "value": " represents a variable array."
                }
              ]
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
                  "value": "ReadonlyArray<Order>"
                },
                {
                  "type": "text",
                  "value": " means that after the caller passes in the component, the component cannot pass the reference "
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
                  "value": " or "
                },
                {
                  "type": "inlineCode",
                  "value": "sort"
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
                  "value": "string literal union limits status to three known values to avoid arbitrary "
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
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript from "
                },
                {
                  "type": "inlineCode",
                  "value": "orders.map"
                },
                {
                  "type": "text",
                  "value": " derives "
                },
                {
                  "type": "inlineCode",
                  "value": "order"
                },
                {
                  "type": "text",
                  "value": " is "
                },
                {
                  "type": "inlineCode",
                  "value": "Order"
                },
                {
                  "type": "text",
                  "value": ", so the item component props are clear."
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
              "value": "runtime layer:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "OrderStatus"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Order"
        },
        {
          "type": "text",
          "value": " and props type will be erased. The runtime must still trust the verified data source; if the real API returns unknown JSON, runtime validation needs to be done at the boundary. This chapter does not introduce related libraries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "is too wide. Type error:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "Record<string, unknown>[]"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "object[]"
        },
        {
          "type": "text",
          "value": " will make the list component unable to safely access "
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
          "value": "status"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "total"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "any[]"
        },
        {
          "type": "text",
          "value": " will also close subsequent checks. Semantic item types should be defined based on the fields actually used on the page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "combined UI state template:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Template: discriminated list state",
      "value": "type ListState<Item> =\n  | { status: 'loading' }\n  | { status: 'error'; message: string }\n  | { status: 'empty' }\n  | { status: 'success'; items: ReadonlyArray<Item> }"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-sellerhub-mapping-for-products-cart-items-and-orders",
      "children": [
        {
          "type": "text",
          "value": "9.9 SellerHub Mapping for Products, Cart Items, and Orders"
        }
      ]
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
          "value": " SellerHub share the render pipeline of \"typed list state -> conditional branch -> map -> stable key -> item component\", but the item type and business behavior of each page are different."
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
            "value": "array"
          }
        ],
        [
          {
            "type": "text",
            "value": "Stable key"
          }
        ],
        [
          {
            "type": "text",
            "value": "Item component"
          }
        ],
        [
          {
            "type": "text",
            "value": "typical state"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "ProductListPage"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Product[]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "product.id"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "ProductCard"
            }
          ],
          [
            {
              "type": "text",
              "value": "category empty, out of stock"
            }
          ]
        ],
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
              "value": "CartItem[]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "cartItem.id"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "CartItemRow"
            }
          ],
          [
            {
              "type": "text",
              "value": "empty cart, quantity limit"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "BuyerOrdersPage"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Order[]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "order.id"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "BuyerOrderCard"
            }
          ],
          [
            {
              "type": "text",
              "value": "loading, error, no orders"
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
              "type": "inlineCode",
              "value": "Order[]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "order.id"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "SellerOrderRow"
            }
          ],
          [
            {
              "type": "text",
              "value": "status filter, empty"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "SellerOrdersPage"
            },
            {
              "type": "text",
              "value": " Internal"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "OrderItem[]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "orderItem.id"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "OrderItemRow"
            }
          ],
          [
            {
              "type": "text",
              "value": "item availability"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "AdminProductsPage"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Product[]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "product.id"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "ProductReviewRow"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending review, empty"
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
              "value": "Boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " This chapter only previews the render relationship. It does not create these SellerHub pages, nor does it assume that the API, router, database or data-fetching library already exists."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "migration rule:"
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
                  "value": "API data enters the page, it first forms a clear typed state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "first distinguishes loading/error, and then distinguishes empty/success."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "derives the filtering and sorting results without modifying the original array."
                }
              ]
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
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " returns the item component directly."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key uses domain stable ID and does not use display position."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "child If an ID is required, please also pass "
                },
                {
                  "type": "inlineCode",
                  "value": "productId"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "orderId"
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
              "value": "array.map(callback)"
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
              "value": "returns the new array"
            }
          ],
          [
            {
              "type": "text",
              "value": "block callback forget "
            },
            {
              "type": "inlineCode",
              "value": "return"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "array.filter(predicate)"
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
              "value": "returns a new array"
            }
          ],
          [
            {
              "type": "text",
              "value": "Repeat the filter result into state"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "[...array].sort(compare)"
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
              "value": "Safe reordering after copying copy"
            }
          ],
          [
            {
              "type": "text",
              "value": "direct "
            },
            {
              "type": "inlineCode",
              "value": "array.sort()"
            },
            {
              "type": "text",
              "value": " Modify input"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "condition ? a : b"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "Choose one of the two return values"
            }
          ],
          [
            {
              "type": "text",
              "value": "Multiple levels of nesting reduce readability"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "condition && node"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "condition is truthy, return node"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "0 && node"
            },
            {
              "type": "text",
              "value": " will return the number "
            },
            {
              "type": "inlineCode",
              "value": "0"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "early "
            },
            {
              "type": "inlineCode",
              "value": "return"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript control flow"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns a UI description in advance"
            }
          ],
          [
            {
              "type": "text",
              "value": "directly writes "
            },
            {
              "type": "inlineCode",
              "value": "if"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "key={item.id}"
            }
          ],
          [
            {
              "type": "text",
              "value": "React special prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "Identity sibling item identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "is placed deeper"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "ReadonlyArray<Item>"
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
              "value": "description read-only array view"
            }
          ],
          [
            {
              "type": "text",
              "value": "mistakenly thought it would freeze the runtime array"
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
              "value": "TypeScript type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "expresses mutually exclusive state and branch data"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses multiple potentially contradictory booleans"
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
              "value": "Forgot list item key"
            }
          ],
          [
            {
              "type": "text",
              "value": "React warning / identity risk"
            }
          ],
          [
            {
              "type": "text",
              "value": "map direct children require key"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses stable ID"
            }
          ],
          [
            {
              "type": "text",
              "value": "Console appears unique key warning"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "key is placed in the inner layer of child"
            }
          ],
          [
            {
              "type": "text",
              "value": "React warning / identity risk"
            }
          ],
          [
            {
              "type": "text",
              "value": "key must be located in the direct return layer"
            }
          ],
          [
            {
              "type": "text",
              "value": "Move key to the outermost layer of map callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check what the callback actually returns"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reads "
            },
            {
              "type": "inlineCode",
              "value": "props.key"
            }
          ],
          [
            {
              "type": "text",
              "value": "React special prop boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "key does not forward"
            }
          ],
          [
            {
              "type": "text",
              "value": "Add another "
            },
            {
              "type": "inlineCode",
              "value": "productId"
            },
            {
              "type": "text",
              "value": " and other businesses prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "child Check props when ID is required and declare"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "key={index}"
            }
          ],
          [
            {
              "type": "text",
              "value": "reconciliation bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "position is not stable identity"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses domain ID"
            }
          ],
          [
            {
              "type": "text",
              "value": "The list will be sorted, added, deleted or have child state"
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
              "value": "sort()"
            }
          ],
          [
            {
              "type": "text",
              "value": "mutation bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "props/state input should be kept pure"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "[...items].sort(...)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Find array methods that will be modified in place"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX braces "
            },
            {
              "type": "inlineCode",
              "value": "if"
            }
          ],
          [
            {
              "type": "text",
              "value": "syntax error"
            }
          ],
          [
            {
              "type": "text",
              "value": "braces requires expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX before early return or ternary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "{"
            },
            {
              "type": "text",
              "value": " statement keyword appears within"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "empty mixed with loading"
            }
          ],
          [
            {
              "type": "text",
              "value": "state modeling bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "No distinction between \"unknown\" and \"success is zero\""
            }
          ],
          [
            {
              "type": "text",
              "value": "Explicit union branches"
            }
          ],
          [
            {
              "type": "text",
              "value": "initial loading flash empty UI"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Element type is too wide"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript design issue"
            }
          ],
          [
            {
              "type": "text",
              "value": "props contract unclear"
            }
          ],
          [
            {
              "type": "text",
              "value": "definition domain item type"
            }
          ],
          [
            {
              "type": "text",
              "value": "A large number of assertions, optional chaining or "
            },
            {
              "type": "inlineCode",
              "value": "any"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Generate random keys in render"
            }
          ],
          [
            {
              "type": "text",
              "value": "identity reset bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "key changes every time render"
            }
          ],
          [
            {
              "type": "text",
              "value": "is generated once when creating data ID"
            }
          ],
          [
            {
              "type": "text",
              "value": "input state resets"
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
          "type": "text",
          "value": "creates "
        },
        {
          "type": "inlineCode",
          "value": "Product List Panel"
        },
        {
          "type": "text",
          "value": ": Demonstrate category filter, stock conditional rendering, empty state, derived visible count, stable product ID key and typed component props using SellerHub style product data."
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
          "value": "This project puts the mechanism of this chapter into a complete render chain:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Product[] -> category state -> filter -> visibleProducts -> empty/success branch -> map -> ProductCard"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "project has no backend and asynchronous requests, so loading/error is fully modeled in the 9.3 independent exercise; the small project focuses on list transformation, empty state, stock state and key identity."
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
      "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/\n  product-list-types.ts\n  product-list-seed-data.ts\n  product-filter-controls.tsx\n  product-card.tsx\n  product-grid.tsx\n  product-list-summary.tsx\n  product-list-mini-project.tsx\n  product-list-mini-project.css"
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
              "value": "product-list-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "define "
            },
            {
              "type": "inlineCode",
              "value": "Product"
            },
            {
              "type": "text",
              "value": ", category and filter types."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-list-seed-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides read-only product array and filter options."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-filter-controls.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "render category buttons and up notification selection."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-card.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "render single item and stock conditional branch."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-grid.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "handles empty state and uses stable ID map cards."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-list-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "displays derived visible count."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-list-mini-project.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "holds filter state and combines items."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-list-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides small project layout and state style."
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
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-types.ts",
      "value": "export type ProductCategory = 'electronics' | 'office' | 'home'\n\nexport type CategoryFilter = 'all' | ProductCategory\n\nexport type Product = Readonly<{\n  id: string\n  name: string\n  category: ProductCategory\n  price: number\n  stock: number\n  description: string\n}>\n\nexport type CategoryOption = Readonly<{\n  value: CategoryFilter\n  label: string\n}>"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "Readonly"
        },
        {
          "type": "text",
          "value": " expresses that child should not modify product fields; it is a compile-time contract and will not call "
        },
        {
          "type": "inlineCode",
          "value": "Object.freeze()"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-seed-data.ts",
      "value": "import type { CategoryOption, Product } from './product-list-types'\n\nexport const productListSeedData: ReadonlyArray<Product> = [\n  {\n    id: 'product-mechanical-keyboard',\n    name: 'Mechanical Keyboard',\n    category: 'electronics',\n    price: 129,\n    stock: 12,\n    description: 'Hot-swappable switches with a compact layout.',\n  },\n  {\n    id: 'product-studio-headphones',\n    name: 'Studio Headphones',\n    category: 'electronics',\n    price: 189,\n    stock: 0,\n    description: 'Closed-back monitoring headphones for focused work.',\n  },\n  {\n    id: 'product-ergonomic-chair',\n    name: 'Ergonomic Chair',\n    category: 'office',\n    price: 349,\n    stock: 4,\n    description: 'Adjustable lumbar support and breathable mesh.',\n  },\n  {\n    id: 'product-desk-organizer',\n    name: 'Desk Organizer',\n    category: 'office',\n    price: 42,\n    stock: 18,\n    description: 'Modular trays for stationery and small devices.',\n  },\n]\n\nexport const productCategoryOptions: ReadonlyArray<CategoryOption> = [\n  { value: 'all', label: 'All products' },\n  { value: 'electronics', label: 'Electronics' },\n  { value: 'office', label: 'Office' },\n  { value: 'home', label: 'Home' },\n]"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "home"
        },
        {
          "type": "text",
          "value": " option intentionally does not have a seed product to stably reproduce the empty state; it is not an error state."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-filter-controls.tsx",
      "value": "import type { CategoryFilter, CategoryOption } from './product-list-types'\n\ntype ProductFilterControlsProps = {\n  options: ReadonlyArray<CategoryOption>\n  selectedCategory: CategoryFilter\n  onCategoryChange: (category: CategoryFilter) => void\n}\n\nexport function ProductFilterControls({\n  options,\n  selectedCategory,\n  onCategoryChange,\n}: ProductFilterControlsProps) {\n  return (\n    <div className=\"product-filter-controls\" aria-label=\"Product category filter\">\n      {options.map((option) => (\n        <button\n          className={option.value === selectedCategory ? 'is-selected' : undefined}\n          key={option.value}\n          type=\"button\"\n          onClick={() => onCategoryChange(option.value)}\n        >\n          {option.label}\n        </button>\n      ))}\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "are buttons, so the key is placed directly on "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " returned "
        },
        {
          "type": "inlineCode",
          "value": "<button>"
        },
        {
          "type": "text",
          "value": " on. The callback prop passes the filter intent back to the state owner."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-card.tsx",
      "value": "import type { Product } from './product-list-types'\n\ntype ProductCardProps = {\n  product: Product\n}\n\nexport function ProductCard({ product }: ProductCardProps) {\n  const isInStock = product.stock > 0\n\n  return (\n    <article className=\"product-card\">\n      <div className=\"product-card-heading\">\n        <p>{product.category}</p>\n        <span className={isInStock ? 'stock-badge in-stock' : 'stock-badge out-of-stock'}>\n          {isInStock ? `${product.stock} in stock` : 'Out of stock'}\n        </span>\n      </div>\n      <h3>{product.name}</h3>\n      <p className=\"product-description\">{product.description}</p>\n      <p className=\"product-price\">${product.price}</p>\n      <button type=\"button\" disabled={!isInStock}>\n        {isInStock ? 'View product' : 'Unavailable'}\n      </button>\n    </article>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "isInStock"
        },
        {
          "type": "text",
          "value": " is an ordinary boolean derived from props and does not require state. The two ternaries select CSS class/text and button label respectively."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-grid.tsx",
      "value": "import { ProductCard } from './product-card'\nimport type { Product } from './product-list-types'\n\ntype ProductGridProps = {\n  products: ReadonlyArray<Product>\n}\n\nexport function ProductGrid({ products }: ProductGridProps) {\n  if (products.length === 0) {\n    return (\n      <div className=\"product-empty-state\">\n        <p className=\"product-empty-state-label\">Empty state</p>\n        <h3>No products match this category.</h3>\n        <p>Choose another category to return to the product grid.</p>\n      </div>\n    )\n  }\n\n  return (\n    <div className=\"product-grid\" aria-label=\"Visible products\">\n      {products.map((product) => (\n        <ProductCard key={product.id} product={product} />\n      ))}\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "early return Completely separate empty branch and success list branch. "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " in "
        },
        {
          "type": "inlineCode",
          "value": "ProductCard"
        },
        {
          "type": "text",
          "value": " siblings, while "
        },
        {
          "type": "inlineCode",
          "value": "product"
        },
        {
          "type": "text",
          "value": " is passed in as a normal prop."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-summary.tsx",
      "value": "type ProductListSummaryProps = {\n  visibleCount: number\n  totalCount: number\n}\n\nexport function ProductListSummary({ visibleCount, totalCount }: ProductListSummaryProps) {\n  return (\n    <p className=\"product-list-summary\" aria-live=\"polite\">\n      Showing <strong>{visibleCount}</strong> of <strong>{totalCount}</strong> products\n    </p>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "visibleCount"
        },
        {
          "type": "text",
          "value": " from "
        },
        {
          "type": "inlineCode",
          "value": "visibleProducts.length"
        },
        {
          "type": "text",
          "value": " is a derived value and does not require additional state synchronization."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-mini-project.tsx",
      "value": "import { useState } from 'react'\nimport { ProductFilterControls } from './product-filter-controls'\nimport { ProductGrid } from './product-grid'\nimport { ProductListSummary } from './product-list-summary'\nimport { productCategoryOptions, productListSeedData } from './product-list-seed-data'\nimport type { CategoryFilter } from './product-list-types'\nimport './product-list-mini-project.css'\n\nexport function ProductListMiniProject() {\n  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')\n\n  const visibleProducts = productListSeedData.filter(\n    (product) => selectedCategory === 'all' || product.category === selectedCategory,\n  )\n\n  return (\n    <section className=\"product-list-panel\">\n      <div className=\"product-list-header\">\n        <div>\n          <p className=\"product-list-eyebrow\">SellerHub learning connection</p>\n          <h2>Product List Panel</h2>\n          <p>\n            Stable product IDs, derived category results, and explicit empty and stock\n            states.\n          </p>\n        </div>\n        <ProductListSummary\n          visibleCount={visibleProducts.length}\n          totalCount={productListSeedData.length}\n        />\n      </div>\n\n      <ProductFilterControls\n        options={productCategoryOptions}\n        selectedCategory={selectedCategory}\n        onCategoryChange={setSelectedCategory}\n      />\n\n      <ProductGrid products={visibleProducts} />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "state only saves the category selected by the user. Both visible array and count can be calculated from seed data and category, so they do not enter state and do not require effects."
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-mini-project.css",
      "value": ".product-list-panel {\n  overflow: hidden;\n  border: 1px solid #cfd7e3;\n  border-radius: 10px;\n  background: #ffffff;\n  box-shadow: 0 18px 50px rgb(16 24 40 / 8%);\n}\n\n.product-list-header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 28px;\n  color: #ffffff;\n  background: #14213d;\n}\n\n.product-list-eyebrow {\n  margin: 0;\n  color: #93c5fd;\n  font-size: 0.75rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.product-list-header h2 {\n  margin: 8px 0 0;\n  font-size: clamp(1.8rem, 4vw, 3rem);\n}\n\n.product-list-header > div > p:last-child {\n  max-width: 620px;\n  margin: 12px 0 0;\n  color: #cbd5e1;\n  line-height: 1.55;\n}\n\n.product-list-summary {\n  flex: 0 0 auto;\n  margin: 0;\n  color: #cbd5e1;\n}\n\n.product-list-summary strong {\n  color: #ffffff;\n  font-size: 1.2rem;\n}\n\n.product-filter-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 20px 28px;\n  border-bottom: 1px solid #e4e7ec;\n  background: #f8fafc;\n}\n\n.product-filter-controls button {\n  color: #344054;\n  border-color: #cbd5e1;\n  background: #ffffff;\n}\n\n.product-filter-controls button:hover {\n  color: #ffffff;\n  background: #344054;\n}\n\n.product-filter-controls .is-selected {\n  color: #ffffff;\n  border-color: #2563eb;\n  background: #2563eb;\n}\n\n.product-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n  padding: 28px;\n}\n\n.product-card {\n  display: flex;\n  min-width: 0;\n  padding: 20px;\n  border: 1px solid #d0d5dd;\n  border-radius: 8px;\n  flex-direction: column;\n  background: #ffffff;\n}\n\n.product-card-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.product-card-heading > p {\n  margin: 0;\n  color: #2563eb;\n  font-size: 0.74rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.stock-badge {\n  padding: 4px 8px;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n\n.stock-badge.in-stock {\n  color: #067647;\n  background: #ecfdf3;\n}\n\n.stock-badge.out-of-stock {\n  color: #b42318;\n  background: #fef3f2;\n}\n\n.product-card h3 {\n  margin: 18px 0 0;\n  color: #101828;\n  font-size: 1.25rem;\n}\n\n.product-description {\n  flex: 1;\n  margin: 10px 0 0;\n  color: #667085;\n  line-height: 1.55;\n}\n\n.product-price {\n  margin: 20px 0 14px;\n  color: #101828;\n  font-size: 1.5rem;\n  font-weight: 850;\n}\n\n.product-card button {\n  width: 100%;\n}\n\n.product-empty-state {\n  margin: 28px;\n  padding: 48px 24px;\n  border: 1px dashed #98a2b3;\n  border-radius: 8px;\n  text-align: center;\n  background: #f8fafc;\n}\n\n.product-empty-state-label {\n  margin: 0;\n  color: #2563eb;\n  font-size: 0.75rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.product-empty-state h3 {\n  margin: 8px 0 0;\n  color: #101828;\n}\n\n.product-empty-state > p:last-child {\n  margin: 10px 0 0;\n  color: #667085;\n}\n\n@media (max-width: 720px) {\n  .product-list-header {\n    align-items: start;\n    flex-direction: column;\n  }\n\n  .product-grid {\n    grid-template-columns: 1fr;\n  }\n}"
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
      "value": "npm run lint\nnpm run build"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is Sudoku, so these two commands are used to verify all TSX/CSS import boundaries in Chapter 5. Visual operation requires clear switching of the entrance later, which is not within the scope of this chapter."
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
      "type": "code",
      "language": "txt",
      "label": "Output",
      "value": "All products: 4 visible products\nElectronics: 2 visible products\nOffice: 2 visible products\nHome: empty state\nStudio Headphones: Out of stock"
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
                  "value": "ProductListMiniProject"
                },
                {
                  "type": "text",
                  "value": " renders for the first time, category state is "
                },
                {
                  "type": "inlineCode",
                  "value": "all"
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
                  "value": "filter()"
                },
                {
                  "type": "text",
                  "value": " returns a new array of four products."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "summary reads and derives "
                },
                {
                  "type": "inlineCode",
                  "value": "length"
                },
                {
                  "type": "text",
                  "value": ", controls map options."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "grid map products after checking non-empty."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React with "
                },
                {
                  "type": "inlineCode",
                  "value": "product.id"
                },
                {
                  "type": "text",
                  "value": " matches card siblings."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "card based on "
                },
                {
                  "type": "inlineCode",
                  "value": "stock > 0"
                },
                {
                  "type": "text",
                  "value": " Select badge and button description."
                }
              ]
            }
          ]
        },
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
                  "value": "Home"
                },
                {
                  "type": "text",
                  "value": " state update triggers a new render."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "filter returns an empty array, grid early returns empty state."
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
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "visibleCount"
                },
                {
                  "type": "text",
                  "value": " are all stored in state: creating repeated states that need to be synchronized."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "vs. "
                },
                {
                  "type": "inlineCode",
                  "value": "productListSeedData.sort()"
                },
                {
                  "type": "text",
                  "value": ": Modify shared seed array."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "in "
                },
                {
                  "type": "inlineCode",
                  "value": "ProductCard"
                },
                {
                  "type": "text",
                  "value": ": parent "
                },
                {
                  "type": "inlineCode",
                  "value": "ProductGrid"
                },
                {
                  "type": "text",
                  "value": " cannot use it to match card siblings."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses option index or product index as key: the identity will be unstable during future rearrangements."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "to "
                },
                {
                  "type": "inlineCode",
                  "value": "visibleProducts.length === 0"
                },
                {
                  "type": "text",
                  "value": " represents request loading: confusing different business facts."
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
                  "value": "Add price sort, but it must be copied and sorted."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "adds search text and derives visible array from category + search."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "upgrades the UI state to loading/error/empty/success discriminated union."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Add order list exercise and follow the stable domain ID rules."
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
          "value": "These extensions do not require the introduction of routers, backends or third-party state libraries."
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
          "value": "JavaScript Convert typed arrays to React node descriptions, conditional branches select this UI, and React uses sibling stable keys to maintain correct identity between previous and later renders."
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
            "value": "Input"
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
              "value": "map"
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
              "value": "Convert each item"
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
              "value": "Forgot return, Forgot key"
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
              "value": "JavaScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Select some items"
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
              "value": "is repeatedly deposited into state"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sort"
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
              "value": "rearranges the array in place"
            }
          ],
          [
            {
              "type": "text",
              "value": "compare function"
            }
          ],
          [
            {
              "type": "text",
              "value": "Same array reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "directly modify props/state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ternary"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "Choose one from two"
            }
          ],
          [
            {
              "type": "text",
              "value": "boolean-like condition"
            }
          ],
          [
            {
              "type": "text",
              "value": "a value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Multiple levels of nesting"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "early return"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript control flow"
            }
          ],
          [
            {
              "type": "text",
              "value": "separate complete UI branch"
            }
          ],
          [
            {
              "type": "text",
              "value": "condition"
            }
          ],
          [
            {
              "type": "text",
              "value": "ended early function"
            }
          ],
          [
            {
              "type": "text",
              "value": "Repeat a large number of markup"
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
              "value": "React convention"
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
              "value": "stable string/number"
            }
          ],
          [
            {
              "type": "text",
              "value": "reconciliation hint"
            }
          ],
          [
            {
              "type": "text",
              "value": "index/random key"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "union"
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
              "value": "Limited possible state"
            }
          ],
          [
            {
              "type": "text",
              "value": "member types"
            }
          ],
          [
            {
              "type": "text",
              "value": "compile-time narrowing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use any string"
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
            "value": "Use A"
          }
        ],
        [
          {
            "type": "text",
            "value": "Use B"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "React element"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM node"
            }
          ],
          [
            {
              "type": "text",
              "value": "description vs browser object"
            }
          ],
          [
            {
              "type": "text",
              "value": "render result"
            }
          ],
          [
            {
              "type": "text",
              "value": "The real page after commit"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "key"
            }
          ],
          [
            {
              "type": "text",
              "value": "normal prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "React hint vs application data"
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
              "value": "child business logic"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "empty"
            }
          ],
          [
            {
              "type": "text",
              "value": "loading"
            }
          ],
          [
            {
              "type": "text",
              "value": "succeeded but zero results vs not yet determined"
            }
          ],
          [
            {
              "type": "text",
              "value": "successful zero result"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending operation"
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
              "type": "inlineCode",
              "value": "forEach"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns a new array vs usually only performs side effect"
            }
          ],
          [
            {
              "type": "text",
              "value": "generates node array"
            }
          ],
          [
            {
              "type": "text",
              "value": "non-render traversal task"
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
              "value": "conditional item body"
            }
          ],
          [
            {
              "type": "text",
              "value": "First reduce the data set vs local branch within item"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exclude entire item"
            }
          ],
          [
            {
              "type": "text",
              "value": "Partial state of the same item"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "stable ID"
            }
          ],
          [
            {
              "type": "text",
              "value": "array index"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain identity vs position"
            }
          ],
          [
            {
              "type": "text",
              "value": "Dynamic list"
            }
          ],
          [
            {
              "type": "text",
              "value": "A very small number of completely static lists"
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
            "value": "Recognition"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "unique key warning"
            }
          ],
          [
            {
              "type": "text",
              "value": "React tooling warning"
            }
          ],
          [
            {
              "type": "text",
              "value": "list siblings missing key"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses stable ID"
            }
          ],
          [
            {
              "type": "text",
              "value": "check map return root"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "note Go to another line"
            }
          ],
          [
            {
              "type": "text",
              "value": "identity bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "index key matches the position"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain ID key"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reappears after sorting/deleting"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "props.key"
            },
            {
              "type": "text",
              "value": " is unavailable"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "special prop does not forward"
            }
          ],
          [
            {
              "type": "text",
              "value": "Explicitly pass normal prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "child needs to read key value"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "if"
            },
            {
              "type": "text",
              "value": " in JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "syntax error"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX braces to expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "early return/ternary"
            }
          ],
          [
            {
              "type": "text",
              "value": "braces contains statement"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "The original array sequence is changed to"
            }
          ],
          [
            {
              "type": "text",
              "value": "mutation bug"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "sort"
            },
            {
              "type": "text",
              "value": " Modify"
            }
          ],
          [
            {
              "type": "text",
              "value": "copy then sort"
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
              "value": "success missing items"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript error"
            }
          ],
          [
            {
              "type": "text",
              "value": "union member contract"
            }
          ],
          [
            {
              "type": "text",
              "value": "Add items or change status"
            }
          ],
          [
            {
              "type": "text",
              "value": "discriminant narrowing"
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
            "value": "Mechanism"
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
              "value": "product grid"
            }
          ],
          [
            {
              "type": "text",
              "value": "Product collection display"
            }
          ],
          [
            {
              "type": "text",
              "value": "filter + map + key"
            }
          ],
          [
            {
              "type": "text",
              "value": "stock/empty Confuse"
            }
          ],
          [
            {
              "type": "text",
              "value": "is derived first, then branch"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "cart rows"
            }
          ],
          [
            {
              "type": "text",
              "value": "Quantity and deletion changes"
            }
          ],
          [
            {
              "type": "text",
              "value": "stable key + item props"
            }
          ],
          [
            {
              "type": "text",
              "value": "index key state misaligned"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "cartItem.id"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "buyer orders"
            }
          ],
          [
            {
              "type": "text",
              "value": "Asynchronous order list"
            }
          ],
          [
            {
              "type": "text",
              "value": "union UI state"
            }
          ],
          [
            {
              "type": "text",
              "value": "loading flashes to empty"
            }
          ],
          [
            {
              "type": "text",
              "value": "Explicit four-branch"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "seller order items"
            }
          ],
          [
            {
              "type": "text",
              "value": "Nested list"
            }
          ],
          [
            {
              "type": "text",
              "value": "siblings keys for each layer"
            }
          ],
          [
            {
              "type": "text",
              "value": "key scope misplaced"
            }
          ],
          [
            {
              "type": "text",
              "value": "Each layer uses this layer ID"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "admin review"
            }
          ],
          [
            {
              "type": "text",
              "value": "filter/sort results"
            }
          ],
          [
            {
              "type": "text",
              "value": "immutable derivation"
            }
          ],
          [
            {
              "type": "text",
              "value": "mutation shared input"
            }
          ],
          [
            {
              "type": "text",
              "value": "copy before sort"
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
      "label": "Template: typed keyed list",
      "value": "type Item = {\n  id: string\n  label: string\n}\n\nexport function ItemList({ items }: { items: ReadonlyArray<Item> }) {\n  if (items.length === 0) {\n    return <p>No items found.</p>\n  }\n\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.label}</li>\n      ))}\n    </ul>\n  )\n}"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Template: immutable filtered and sorted list",
      "value": "const visibleItems = items\n  .filter((item) => item.isVisible)\n  .slice()\n  .sort((left, right) => left.label.localeCompare(right.label))"
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
              "value": "docs/react/chapter-05-rendering-data/react-chapter-05-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Complete study guide for Chapter 5."
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
              "value": "src/learning/react/chapter-05-rendering-data/chapter-05-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "summarizes eight exercises and final mini project."
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
              "value": "src/learning/react/chapter-05-rendering-data/chapter-05-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 5 shares practice patterns."
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
              "value": "src/learning/react/chapter-05-rendering-data/01-array-rendering/array-rendering-with-map.tsx"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "map()"
            },
            {
              "type": "text",
              "value": " to React nodes."
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
              "value": "src/learning/react/chapter-05-rendering-data/02-conditional-rendering/conditional-rendering-branches.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "conditional expression branch."
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
              "value": "src/learning/react/chapter-05-rendering-data/03-ui-state-branches/ui-state-branches.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "four UI states."
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
              "value": "src/learning/react/chapter-05-rendering-data/04-key-identity/key-identity-stable-id.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "stable ID identity."
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
              "value": "src/learning/react/chapter-05-rendering-data/05-key-is-not-prop/key-is-not-prop.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "special prop boundary."
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
              "value": "src/learning/react/chapter-05-rendering-data/06-index-key-mistake/index-key-mistake.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "index key misalignment control."
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
              "value": "src/learning/react/chapter-05-rendering-data/07-filter-sort-map-boundary/filter-sort-map-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "immutable derivation."
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
              "value": "src/learning/react/chapter-05-rendering-data/08-typed-list-rendering/typed-list-rendering.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "typed list props."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Product and filter types."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-seed-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "product and category seed data."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-filter-controls.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "category controls."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-card.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "product card and stock branch."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-grid.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "grid, empty state and keyed map."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-summary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "derived count summary."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-mini-project.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project state owner."
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
              "value": "src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project style."
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
              "value": "README.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 5 state and file location."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been updated."
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
              "value": "mounts Chapter 5 root according to the learning entrance agreement."
            }
          ],
          [
            {
              "type": "text",
              "value": "has been updated."
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
          "value": "is not required to create these concept sample files:"
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
                  "value": "Snippet: element identity layers"
                }
              ]
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
                  "value": "Snippet: statement inside JSX expression"
                }
              ]
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
                  "value": "Snippet: direct sort mutation"
                }
              ]
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
                  "value": "Template: discriminated list state"
                }
              ]
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
                  "value": "Template: typed keyed list"
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
          "value": "suggests organizing this chapter into four pictures and three groups of error recurrences:"
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
                  "value": "draw "
                },
                {
                  "type": "inlineCode",
                  "value": "array -> map -> element descriptions -> key match -> DOM commit"
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
                  "value": "draws the loading/error/empty/success state machine and marks the data carried by each branch."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "draw "
                },
                {
                  "type": "inlineCode",
                  "value": "key"
                },
                {
                  "type": "text",
                  "value": " and dual channels of ordinary props: React identity and child application data."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "draw "
                },
                {
                  "type": "inlineCode",
                  "value": "filter -> copy -> sort -> map"
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
                  "value": "personally reproduced the problem without key warning, index key state misalignment and direct sort mutation."
                }
              ]
            }
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
                  "value": "Product"
                },
                {
                  "type": "text",
                  "value": " is replaced with "
                },
                {
                  "type": "inlineCode",
                  "value": "CartItem"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "Order"
                },
                {
                  "type": "text",
                  "value": ", the verification model still holds."
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
                  "value": "Why is list rendering in JSX still essentially JavaScript?"
                }
              ]
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
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " callback play in runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What is the difference between React element, component identity and DOM node?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key be unique? Why not require global uniqueness?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key have to be stable? What happens to random keys?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key should be placed in "
                },
                {
                  "type": "inlineCode",
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": " return?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why child cannot read "
                },
                {
                  "type": "inlineCode",
                  "value": "props.key"
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
                  "value": "index key make the input state follow the wrong row?"
                }
              ]
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
                  "value": "sort()"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "map()"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "filter()"
                },
                {
                  "type": "text",
                  "value": " What is the difference in the behavior of mutation?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What facts do empty state and loading state express respectively?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "discriminated union How to prevent conflicting states?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript types still exist in the runtime?"
                }
              ]
            }
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
      "value": "Typed data array\n  -> immutable derivation\n  -> explicit UI state branch\n  -> map to React elements\n  -> stable sibling keys\n  -> React preserves the right identities\n  -> commit the necessary DOM changes"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Ultimately remember:"
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
                  "value": ", ternary and "
                },
                {
                  "type": "inlineCode",
                  "value": "if"
                },
                {
                  "type": "text",
                  "value": " belongs to JavaScript; React uses the description they generate."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "element is description, not DOM node; component state is associated by React based on tree identity."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "key is sibling identity, not child data; when data is needed, ordinary props are passed."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "dynamic list uses domain stable ID and does not use position."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "UI state should be explicit, derived arrays should keep inputs immutable, and TypeScript should express true business boundaries."
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
                  "href": "https://react.dev/learn/rendering-lists",
                  "children": [
                    {
                      "type": "text",
                      "value": "React: Rendering Lists"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on reading "
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
                  "value": ", keys, siblings scope, stable key and index key pitfall."
                }
              ]
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
                  "href": "https://react.dev/learn/conditional-rendering",
                  "children": [
                    {
                      "type": "text",
                      "value": "React: Conditional Rendering"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on reading early return, ternary, "
                },
                {
                  "type": "inlineCode",
                  "value": "&&"
                },
                {
                  "type": "text",
                  "value": ", and the description that JSX elements are not instances or DOM nodes."
                }
              ]
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
                  "href": "https://react.dev/learn/keeping-components-pure",
                  "children": [
                    {
                      "type": "text",
                      "value": "React: Keeping Components Pure"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on reading mutation boundary and render purity."
                }
              ]
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
                      "value": "React: Preserving and Resetting State"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Focus on the relationship between state and render-tree position, type, and key."
                }
              ]
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
                  "href": "https://react.dev/warnings/special-props",
                  "children": [
                    {
                      "type": "text",
                      "value": "React: Special Props Warning"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm "
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
                  "value": "ref"
                },
                {
                  "type": "text",
                  "value": " is not forwarded to component props."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript Handbook: Everyday Types"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Review the basics of arrays, union types, and narrowing."
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
          "value": "Local supplementary information: "
        },
        {
          "type": "inlineCode",
          "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
        },
        {
          "type": "text",
          "value": " page 31-35 explains "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": ", list rendering, stable key and index key, page 53-56 shows list/item props. The PDF page 33 describes the key as \"HTML attribute\", which is not precise enough; this chapter follows the current React 19.2 official document and describes "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": " is regarded as a special prop consumed by React and not forwarded."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter05Content() {
  return <DocumentRenderer document={chapterDocument} />
}
