import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-03",
  "slug": "chapter-03-props-basics",
  "title": "React Chapter 3: Props and Typed Component Inputs",
  "sourcePath": "docs/react/chapter-03-props-basics/react-chapter-03-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-3-props-and-typed-component-inputs",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 3: Props and Typed Component Inputs"
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
              "value": "General entrance to the general exercises in this chapter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/chapter-03-practice-root.tsx"
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
              "value": "Shared style for common exercises in this chapter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/chapter-03-practice.css"
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
              "value": "props object runtime nature"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-object-runtime-demo.tsx"
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
              "value": "props and ordinary function parameters"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: function parameter comparison"
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
              "value": "JSX attributes to props object"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/jsx-attributes-to-props-demo.tsx"
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
              "value": "HTML attribute and custom component prop comparison"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: DOM prop versus component prop"
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
              "value": "destructuring props written"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-destructuring-demo.tsx"
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
              "value": "destructuring type annotation error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: destructuring type annotation mistake"
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
              "value": "9.3"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "required props"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/required-props-demo.tsx"
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
              "value": "optional props"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/optional-props-demo.tsx"
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
              "value": "default prop values"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/default-prop-values-demo.tsx"
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
              "value": "missing required prop error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: missing required prop error"
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
              "value": "9.4"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "boolean props"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/boolean-props-demo.tsx"
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
              "value": "boolean string mistake"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: boolean prop string mistake"
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
              "value": "9.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "children basic combination"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/children-props-basics/children-basic-composition.tsx"
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
              "value": "children can render the border"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/children-props-basics/children-renderable-boundary.tsx"
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
              "value": "children object mistake"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: children object mistake"
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
              "value": "props readonly principle"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-readonly-mistake.tsx"
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
              "value": "Modify props error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: mutate props mistake"
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
              "value": "TypeScript props runtime boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/typescript-runtime-boundary-demo.tsx"
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
              "value": "type erasure vs"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: erased props type boundary"
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
              "value": "9.8"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "props and state boundary preview"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: props versus state boundary"
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
              "value": "9.9"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "final mini project entrance adaptation"
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
              "value": "final mini project static data and type"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-data.ts"
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
              "value": "final mini project avatar component"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-avatar.tsx"
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
              "value": "final mini project badge component"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-badge.tsx"
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
              "value": "final mini project card component"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card.tsx"
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
              "value": "final mini project grid component"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-grid.tsx"
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
              "value": "final mini project root component"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.tsx"
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
              "value": "final mini project style"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.css"
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
          "value": "This file is the current "
        },
        {
          "type": "inlineCode",
          "value": "React + TypeScript + Vite"
        },
        {
          "type": "text",
          "value": " learning project. The first chapter establishes the operating boundaries of React, Vite, TypeScript, and browser DOM; the second chapter talks about JSX, function component, component composition, and real practice file organization; the third chapter begins to systematically learn "
        },
        {
          "type": "inlineCode",
          "value": "props"
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
          "value": "This chapter is positioned as \"component input object\". It explains how a parent component passes data to a child component, how JSX custom component attributes become a props object, how a function component receives this object at runtime, and how TypeScript checks the shape of props at compile time."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter does not go into depth:"
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
                  "value": "useState"
                }
              ]
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
                  "value": "useEffect"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "lifecycle"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "context"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "reducer"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "router"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Next.js"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Redux"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "data fetching"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React Native"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Tailwind"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "testing"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "render props"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "compound components"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "advanced children patterns"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Prop drilling system solution"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "event handler props system learning"
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
          "value": "This chapter will slightly compare "
        },
        {
          "type": "inlineCode",
          "value": "props"
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
          "value": ", but only for establishing boundaries: "
        },
        {
          "type": "inlineCode",
          "value": "props"
        },
        {
          "type": "text",
          "value": " is external input, "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": " is the data managed by React inside the component. The real state learning is left to subsequent chapters."
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
                  "value": " uses "
                },
                {
                  "type": "inlineCode",
                  "value": "react@^19.2.0"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "react-dom@^19.2.0"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "typescript~5.9.3"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "vite@^7.2.4"
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
                  "value": " uses "
                },
                {
                  "type": "inlineCode",
                  "value": "jsx: \"react-jsx\""
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "strict: true"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "noEmit: true"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "moduleResolution: \"bundler\""
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
                  "value": " by "
                },
                {
                  "type": "inlineCode",
                  "value": "/src/sudoku/main.tsx"
                },
                {
                  "type": "text",
                  "value": " enters the Vite module diagram."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Current root level "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " temporarily mounts Chapter 2 exercises; the original Sudoku application remains in "
                },
                {
                  "type": "inlineCode",
                  "value": "src/sudoku/App.tsx"
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
                  "value": "Chapter 2 real practice has been placed in "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-02-jsx-and-components/"
                },
                {
                  "type": "text",
                  "value": ", Chapter 3 continues to use "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-03-props-basics/"
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
          "value": "After learning JSX and component, learners usually encounter a core confusion: Is the attribute written on the custom component an HTML attribute?"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The answer is: No. Attributes written on lowercase DOM tags, such as "
        },
        {
          "type": "inlineCode",
          "value": "<img alt=\"...\" />"
        },
        {
          "type": "text",
          "value": ", ultimately mapped from React DOM to browser DOM; attribute written on uppercase custom component, such as "
        },
        {
          "type": "inlineCode",
          "value": "<ProfileCard name=\"Mia\" />"
        },
        {
          "type": "text",
          "value": " will enter the props object of this component. What the child component receives is a normal JavaScript object, but it is passed in by React according to the component calling convention."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter addresses these questions:"
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
                  "value": "Why "
                },
                {
                  "type": "inlineCode",
                  "value": "props"
                },
                {
                  "type": "text",
                  "value": " is the input object passed from the parent component to the child component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX How to turn custom component attributes into props object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "function component and the ordinary JavaScript function parameter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "props should be treated as read-only input."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript How to express required, optional, default, boolean, children props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Why can only compile-time checking be done and external data cannot be verified in browser runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "props How to support component reuse and component composition."
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
          "value": "Final conclusion of this chapter:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "props"
        },
        {
          "type": "text",
          "value": " is the external input boundary of the React component. The parent component declares the data required by the child component in JSX. React combines these attributes into a props object when rendering, and then calls the child component function. TypeScript can check the type of this object, but the type will be erased at runtime; therefore, the props type can prevent you from misusing components in the source code, but it cannot replace the real runtime data validation."
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
              "value": "JSX custom component"
            }
          ],
          [
            {
              "type": "text",
              "value": "props are mainly passed through the attributes on the uppercase component tag."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript object"
            }
          ],
          [
            {
              "type": "text",
              "value": "props is object at runtime, and its attributes come from JSX attributes."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript function parameter"
            }
          ],
          [
            {
              "type": "text",
              "value": "function component receives props object through parameter."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object destructuring"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component commonly used "
            },
            {
              "type": "inlineCode",
              "value": "{ title, size }"
            },
            {
              "type": "text",
              "value": " reads props directly."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript object type"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "type Props = { title: string }"
            },
            {
              "type": "text",
              "value": " Description props object shape."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Optional property"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "summary?: string"
            },
            {
              "type": "text",
              "value": " indicates that prop can be missing."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX children"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX nested in component tag will enter "
            },
            {
              "type": "inlineCode",
              "value": "children"
            },
            {
              "type": "text",
              "value": " prop."
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
              "value": "The function component will be called again every time render is performed, and the current props will be passed in."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DOM attribute / property"
            }
          ],
          [
            {
              "type": "text",
              "value": "helps distinguish DOM tag props and custom component props."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Vite module graph"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercise files must be imported before the page will be displayed."
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
          "value": "After studying this chapter, you should be able to do:"
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
                  "value": "Explain what props is in one sentence."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains how JSX custom component attributes become props objects."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Distinguish custom component props, HTML attributes, and DOM properties."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Write the complete props object parameter and destructuring props in two ways."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses TypeScript to express required props, optional props and default prop values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "correctly writes boolean props, such as "
                },
                {
                  "type": "inlineCode",
                  "value": "<ProfileBadge isFeatured />"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "isFeatured={false}"
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
                  "value": "uses basic "
                },
                {
                  "type": "inlineCode",
                  "value": "children"
                },
                {
                  "type": "text",
                  "value": " prop combination component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains why props cannot be modified in child components."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Description TypeScript props type checking occurs at compile time, not browser runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "illustrates the boundary between props and state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "designs the real practice file structure of Chapter 3 to facilitate subsequent review and expansion."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Complete "
                },
                {
                  "type": "inlineCode",
                  "value": "Props Composition Gallery"
                },
                {
                  "type": "text",
                  "value": " static small project."
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
                  "value": "Let's start with the essence of runtime: props is object and function component is function."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Let's look at how JSX custom component attributes are combined into props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "learns two reading methods: complete "
                },
                {
                  "type": "inlineCode",
                  "value": "props"
                },
                {
                  "type": "text",
                  "value": " object and destructuring."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "xue TypeScript props type: required, optional, default values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn boolean props as it involves both JSX, React props and HTML boolean attribute boundaries."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn basic children so that component composition does not only rely on named props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn the readonly principle and understand why subcomponents do not change props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "learns the boundary between TypeScript and runtime, and avoids treating types as runtime validators."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "and finally "
                },
                {
                  "type": "inlineCode",
                  "value": "Props Composition Gallery"
                },
                {
                  "type": "text",
                  "value": " combines typed components into static pages."
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
              "value": "Props"
            }
          ],
          [
            {
              "type": "text",
              "value": "The input object passed by the parent component to the child component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React convention / JavaScript object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "The main plot of this chapter."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Parent component"
            }
          ],
          [
            {
              "type": "text",
              "value": "render and configure the child component's component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component tree"
            }
          ],
          [
            {
              "type": "text",
              "value": "props flow from parent to child."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Child component"
            }
          ],
          [
            {
              "type": "text",
              "value": "receives props and returns the component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime / component convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "The receiver of props."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Custom component attribute"
            }
          ],
          [
            {
              "type": "text",
              "value": "Attribute written on uppercase component in JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX syntax / React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "Will enter the props object."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Intrinsic element prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "prop written on lowercase DOM tag in JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM / platform API"
            }
          ],
          [
            {
              "type": "text",
              "value": "will be processed by React DOM as a DOM update."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Props object"
            }
          ],
          [
            {
              "type": "text",
              "value": "function component receives the first parameter"
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
              "value": "runtime is real."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Destructuring"
            }
          ],
          [
            {
              "type": "text",
              "value": "takes attributes from object and binds them to local variables"
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
              "value": "React component is commonly written."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Required prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "The props that must be passed in TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "If not passed, an error will be reported at compile time."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Optional prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "props that can be omitted in TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "Usually `T when reading"
            }
          ],
          [
            {
              "type": "text",
              "value": "undefined`."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Default value"
            }
          ],
          [
            {
              "type": "text",
              "value": "destructuring is missing or "
            },
            {
              "type": "inlineCode",
              "value": "undefined"
            },
            {
              "type": "text",
              "value": " prop sets the default value"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime / TypeScript narrowing"
            }
          ],
          [
            {
              "type": "text",
              "value": "allows the component to obtain a stable value internally."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Boolean prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX syntax / JavaScript value"
            }
          ],
          [
            {
              "type": "text",
              "value": "can be written as "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured"
            },
            {
              "type": "text",
              "value": " or "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured={false}"
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
              "value": "Children prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime / TypeScript ReactNode"
            }
          ],
          [
            {
              "type": "text",
              "value": "supports the basic combination."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Read-only props"
            }
          ],
          [
            {
              "type": "text",
              "value": "Treat props as unmodifiable input"
            }
          ],
          [
            {
              "type": "text",
              "value": "React rule / immutability"
            }
          ],
          [
            {
              "type": "text",
              "value": "keeps render predictable."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Type erasure"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type will not enter runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "type cannot validate external data."
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
              "value": "component internal data managed by React"
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
              "value": "This chapter only compares with props."
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
          "value": "The mental model of this chapter:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Underlying mental model",
      "value": "parent component render\n  -> JSX custom component attributes\n  -> props object\n  -> child function component parameter\n  -> child returns React UI description\n  -> React DOM updates browser DOM"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Take this model apart:"
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
                  "value": "JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "<ProfileCard name=\"Mia\" isFeatured />"
                },
                {
                  "type": "text",
                  "value": " is written at the source code level."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript in "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " Check in file "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileCard"
                },
                {
                  "type": "text",
                  "value": " Is it allowed? "
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
                  "value": "isFeatured"
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
                  "value": "Vite and React plugin handle TSX/JSX transform."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "browser runs JavaScript and does not run the TypeScript type."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React runtime will organize custom component attributes into props object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "subcomponent function receives the props object, reads it, and returns the UI description."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "props is the input snapshot of this render; child components should not modify it."
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
          "value": "Design principles for this chapter:"
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
                  "value": "Chapter 3 Don't continue to stuff props exercises into "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": ". Root level "
                },
                {
                  "type": "inlineCode",
                  "value": "App.tsx"
                },
                {
                  "type": "text",
                  "value": " is only suitable as a temporary mounting adapter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "continues to use "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/"
                },
                {
                  "type": "text",
                  "value": " makes each chapter of exercises independent, reviewable, and scalable."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "directories are grouped by props learning boundaries instead of named by \"number of examples\"."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The file name directly describes the exercise goal, such as "
                },
                {
                  "type": "inlineCode",
                  "value": "required-props-demo.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "children-basic-composition.tsx"
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
                  "value": "final mini project is placed independently on "
                },
                {
                  "type": "inlineCode",
                  "value": "props-composition-gallery/"
                },
                {
                  "type": "text",
                  "value": ", avoid mixing it with ordinary concept exercises."
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
          "value": "This is the actual structure in the current repository related to this chapter. Note: The current Vite entrance is still at "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/main.tsx"
        },
        {
          "type": "text",
          "value": ", which imports root-level "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": ", while the root level is "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " Now temporarily mount Chapter 2 exercises."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "vite_ts/\n  index.html\n  package.json\n  tsconfig.json\n  tsconfig.app.json\n  tsconfig.node.json\n  vite.config.ts\n  src/\n    App.tsx\n    App.sudoku.backup.tsx\n    assets/\n      react.svg\n    sudoku/\n      main.tsx\n      App.tsx\n      App.css\n      index.css\n      leaderboard.ts\n      sudoku.ts\n    learning/\n      react/\n        chapter-02-jsx-and-components/\n          chapter-02-practice-root.tsx\n          chapter-02-practice.css\n          jsx-source-boundary/\n          component-basics/"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Current structure description:"
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
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " is the HTML entry of Vite, which loads "
                },
                {
                  "type": "inlineCode",
                  "value": "/src/sudoku/main.tsx"
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
                  "value": "src/sudoku/main.tsx"
                },
                {
                  "type": "text",
                  "value": " is the current actual React root creation location."
                }
              ]
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
                },
                {
                  "type": "text",
                  "value": " is currently a temporary adapter for learning and practicing, not a place where all chapter codes are stuffed for a long time."
                }
              ]
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
                  "value": "src/sudoku/App.tsx"
                },
                {
                  "type": "text",
                  "value": " is the original Sudoku application, including hooks, and Chapter 3 does not modify it."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Chapter 3 recommends adding "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-03-props-basics/"
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
      "value": "docs/\n  react/\n    chapter-01-react-introduction/\n      react-chapter-01-learning-guide.md\n    chapter-02-jsx-and-components/\n      react-chapter-02-learning-guide.md\n    chapter-03-props-basics/\n      react-chapter-03-learning-guide.md\nreferences/\n  books/\n    react/\n      the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
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
          "value": "This chapter recommends creating the following real practice files. They are for general props exercises, not final mini project files."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Real practice structure",
      "value": "src/\n  learning/\n    react/\n      chapter-03-props-basics/\n        chapter-03-practice-root.tsx\n        chapter-03-practice.css\n        props-object-boundary/\n          props-object-runtime-demo.tsx\n          jsx-attributes-to-props-demo.tsx\n          props-destructuring-demo.tsx\n          props-readonly-mistake.tsx\n        props-type-boundary/\n          required-props-demo.tsx\n          optional-props-demo.tsx\n          default-prop-values-demo.tsx\n          boolean-props-demo.tsx\n          typescript-runtime-boundary-demo.tsx\n        children-props-basics/\n          children-basic-composition.tsx\n          children-renderable-boundary.tsx"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Catalog design reason:"
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
                  "value": "props-object-boundary/"
                },
                {
                  "type": "text",
                  "value": " focuses on runtime: props are objects, how are function components received, and why are they not modified?"
                }
              ]
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
                  "value": "props-type-boundary/"
                },
                {
                  "type": "text",
                  "value": " Follow TypeScript: required, optional, default, boolean, type erasure."
                }
              ]
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
                  "value": "children-props-basics/"
                },
                {
                  "type": "text",
                  "value": " is grouped separately because children are props but are used differently than named attributes."
                }
              ]
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
                  "value": "chapter-03-practice-root.tsx"
                },
                {
                  "type": "text",
                  "value": " is responsible for centrally rendering common exercises to avoid manually changing multiple entries each time."
                }
              ]
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
                  "value": "chapter-03-practice.css"
                },
                {
                  "type": "text",
                  "value": " only serves the common exercises of this chapter and is not mixed with the Chapter 2 style or the final mini project style."
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
          "value": "These are snippets only used to explain the mechanism, error comparison or compilation results, and do not need to be created into real files."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets:\n  Snippet: function parameter comparison\n  Snippet: DOM prop versus component prop\n  Snippet: destructuring type annotation mistake\n  Snippet: missing required prop error\n  Snippet: boolean prop string mistake\n  Snippet: children object mistake\n  Snippet: mutate props mistake\n  Snippet: erased props type boundary\n  Snippet: props versus state boundary\n  Template: typed props component"
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
          "value": "final mini project "
        },
        {
          "type": "inlineCode",
          "value": "Props Composition Gallery"
        },
        {
          "type": "text",
          "value": " uses a separate directory and focuses on practicing typed props, children and component composition."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "final mini project structure",
      "value": "src/\n  App.tsx\n  learning/\n    react/\n      chapter-03-props-basics/\n        props-composition-gallery/\n          profile-card-data.ts\n          profile-avatar.tsx\n          profile-badge.tsx\n          profile-card.tsx\n          profile-card-grid.tsx\n          props-composition-gallery.tsx\n          props-composition-gallery.css"
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
          "value": "If you only read this chapter, there is no need to create source code files. If you are following along to create real practice files, you can use "
        },
        {
          "type": "inlineCode",
          "value": "chapter-03-practice-root.tsx"
        },
        {
          "type": "text",
          "value": " temporarily mounts all common exercises in this chapter."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "It is recommended that the root level "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " changed to:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/App.tsx",
      "value": "import { Chapter03PracticeRoot } from './learning/react/chapter-03-props-basics/chapter-03-practice-root'\n\nfunction App() {\n  return <Chapter03PracticeRoot />\n}\n\nexport default App"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "General entrance to this chapter's general exercises:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/chapter-03-practice-root.tsx",
      "value": "import { ChildrenBasicComposition } from './children-props-basics/children-basic-composition'\nimport { ChildrenRenderableBoundary } from './children-props-basics/children-renderable-boundary'\nimport './chapter-03-practice.css'\nimport { JsxAttributesToPropsDemo } from './props-object-boundary/jsx-attributes-to-props-demo'\nimport { PropsDestructuringDemo } from './props-object-boundary/props-destructuring-demo'\nimport { PropsObjectRuntimeDemo } from './props-object-boundary/props-object-runtime-demo'\nimport { PropsReadonlyMistake } from './props-object-boundary/props-readonly-mistake'\nimport { BooleanPropsDemo } from './props-type-boundary/boolean-props-demo'\nimport { DefaultPropValuesDemo } from './props-type-boundary/default-prop-values-demo'\nimport { OptionalPropsDemo } from './props-type-boundary/optional-props-demo'\nimport { RequiredPropsDemo } from './props-type-boundary/required-props-demo'\nimport { TypeScriptRuntimeBoundaryDemo } from './props-type-boundary/typescript-runtime-boundary-demo'\n\nexport function Chapter03PracticeRoot() {\n  return (\n    <main className=\"props-practice-shell\">\n      <header className=\"props-practice-header\">\n        <p className=\"chapter-eyebrow\">React Chapter 03</p>\n        <h1>Props basics</h1>\n        <p>\n          This page renders the chapter practice components for props, children,\n          default values, boolean props, and TypeScript boundaries.\n        </p>\n      </header>\n\n      <div className=\"props-practice-grid\" aria-label=\"Chapter 03 practice exercises\">\n        <PropsObjectRuntimeDemo />\n        <JsxAttributesToPropsDemo />\n        <PropsDestructuringDemo />\n        <RequiredPropsDemo />\n        <OptionalPropsDemo />\n        <DefaultPropValuesDemo />\n        <BooleanPropsDemo />\n        <ChildrenBasicComposition />\n        <ChildrenRenderableBoundary />\n        <PropsReadonlyMistake />\n        <TypeScriptRuntimeBoundaryDemo />\n      </div>\n    </main>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Shared style for common exercises in this chapter:"
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-03-props-basics/chapter-03-practice.css",
      "value": ".props-practice-shell {\n  width: min(1120px, calc(100% - 32px));\n  margin: 0 auto;\n  padding: 48px 0;\n}\n\n.props-practice-header {\n  margin-bottom: 28px;\n}\n\n.chapter-eyebrow {\n  margin: 0 0 8px;\n  color: #335c81;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.props-practice-header h1 {\n  margin: 0;\n  color: #172033;\n  font-size: clamp(2rem, 4vw, 3.25rem);\n  line-height: 1;\n}\n\n.props-practice-header p:last-child {\n  max-width: 760px;\n  margin: 16px 0 0;\n  color: #526070;\n  line-height: 1.6;\n}\n\n.props-practice-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 18px;\n}\n\n.props-panel {\n  min-height: 220px;\n  padding: 22px;\n  border: 1px solid #d8e0ea;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 16px 40px rgb(23 32 51 / 8%);\n}\n\n.props-panel h2,\n.props-panel h3 {\n  margin: 0 0 12px;\n  color: #172033;\n  line-height: 1.15;\n}\n\n.props-panel p {\n  margin: 8px 0;\n  color: #526070;\n  line-height: 1.5;\n}\n\n.props-pill {\n  display: inline-flex;\n  align-items: center;\n  margin: 6px 8px 0 0;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: #e8f0f8;\n  color: #24496c;\n  font-size: 0.86rem;\n  font-weight: 700;\n}\n\n.props-card {\n  padding: 16px;\n  border: 1px solid #c8d5e3;\n  border-radius: 8px;\n  background: #f8fbff;\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Run command:"
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
          "value": "Build check:"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run build"
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
      "id": "91-the-runtime-shape-of-the-props-object",
      "children": [
        {
          "type": "text",
          "value": "9.1 The Runtime Shape of the Props Object"
        }
      ]
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
          "value": "props"
        },
        {
          "type": "text",
          "value": " is a JavaScript object at runtime. The parent component decides what properties to pass. React collects these properties into objects when rendering the custom component and passes them in as the first parameter of the function component."
        }
      ]
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
          "value": "Many beginners regard props as the mysterious syntax of React. In fact, from the perspective of subcomponents, "
        },
        {
          "type": "inlineCode",
          "value": "props"
        },
        {
          "type": "text",
          "value": " is more like a normal function parameter: React passes in an object when calling your component function."
        }
      ]
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
          "value": "After understanding the props object, you will know the essence of component reuse: the same sub-component function can be called by different parent components with different props objects and return different UI descriptions."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundaries: syntax, runtime, object model, type system, framework conventions and platform API:"
            }
          ]
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
            "value": "Layer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Meaning"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "JSX syntax"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "<ProfileSummary name=\"Mia\" role=\"React learner\" />"
            },
            {
              "type": "text",
              "value": " is the source code writing method."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "React organizes custom component attributes into props objects."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "subcomponent reads "
            },
            {
              "type": "inlineCode",
              "value": "props.name"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "props.role"
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
              "value": "TypeScript type system"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "ProfileSummaryProps"
            },
            {
              "type": "text",
              "value": " describes the object shape."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Platform API"
            }
          ],
          [
            {
              "type": "text",
              "value": "has not entered the DOM attribute; this is the custom component input."
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
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-object-runtime-demo.tsx",
      "value": "type ProfileSummaryProps = {\n  name: string\n  role: string\n  lessonCount: number\n}\n\nfunction ProfileSummary(props: ProfileSummaryProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{props.name}</h2>\n      <p>{props.role}</p>\n      <p>{props.lessonCount} lessons completed</p>\n    </article>\n  )\n}\n\nexport function PropsObjectRuntimeDemo() {\n  return (\n    <section className=\"props-panel\">\n      <ProfileSummary name=\"Mia\" role=\"React learner\" lessonCount={3} />\n    </section>\n  )\n}"
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
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "ProfileSummaryProps"
                },
                {
                  "type": "text",
                  "value": " is TypeScript object type, used to describe props object."
                }
              ]
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
                  "value": "ProfileSummary(props: ProfileSummaryProps)"
                },
                {
                  "type": "text",
                  "value": " receives the complete props object."
                }
              ]
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
                  "value": "props.name"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "props.role"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "props.lessonCount"
                },
                {
                  "type": "text",
                  "value": " all read object properties."
                }
              ]
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
                  "value": "<ProfileSummary ... />"
                },
                {
                  "type": "text",
                  "value": " is the location of the parent component's incoming attributes."
                }
              ]
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
                  "value": "lessonCount={3}"
                },
                {
                  "type": "text",
                  "value": " uses JSX expression to pass in number instead of string."
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
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: function parameter comparison"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ordinary function parameter comparison:"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: function parameter comparison",
      "value": "type ProfileSummaryInput = {\n  name: string\n  role: string\n}\n\nfunction formatProfileSummary(input: ProfileSummaryInput) {\n  return `${input.name}: ${input.role}`\n}\n\nformatProfileSummary({ name: 'Mia', role: 'React learner' })"
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
                  "type": "inlineCode",
                  "value": "PropsObjectRuntimeDemo"
                },
                {
                  "type": "text",
                  "value": " render returns "
                },
                {
                  "type": "inlineCode",
                  "value": "<ProfileSummary ... />"
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
                  "value": "React identifies "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileSummary"
                },
                {
                  "type": "text",
                  "value": " is a custom component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React prepares a props object with a shape similar to "
                },
                {
                  "type": "inlineCode",
                  "value": "{ name: \"Mia\", role: \"React learner\", lessonCount: 3 }"
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
                  "value": "React calls "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileSummary(props)"
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
                  "value": "ProfileSummary"
                },
                {
                  "type": "text",
                  "value": " returns "
                },
                {
                  "type": "inlineCode",
                  "value": "article"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "h2"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "p"
                },
                {
                  "type": "text",
                  "value": " and other UI descriptions."
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
      "value": "Mia\nReact learner\n3 lessons completed"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "In real projects, card, list item, avatar, badge, and layout section often receive data through props. Instead of writing a new component for each piece of data, you write a reusable component and configure it with different props."
        }
      ]
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
          "value": "custom component are the input from the parent component to the child component; the child component runtime receives the props object."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-how-jsx-attributes-become-component-props",
      "children": [
        {
          "type": "text",
          "value": "9.2 How JSX Attributes Become Component Props"
        }
      ]
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
          "value": "The attributes of lowercase DOM tags and uppercase custom components are processed differently. "
        },
        {
          "type": "inlineCode",
          "value": "<img alt=\"...\" />"
        },
        {
          "type": "text",
          "value": " are processed by React DOM according to browser DOM rules; "
        },
        {
          "type": "inlineCode",
          "value": "<ProfileBadge label=\"Featured\" />"
        },
        {
          "type": "text",
          "value": " 's "
        },
        {
          "type": "inlineCode",
          "value": "label"
        },
        {
          "type": "text",
          "value": " will enter "
        },
        {
          "type": "inlineCode",
          "value": "ProfileBadge"
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
          "value": "As mentioned in Chapter 2, JSX attributes are not exactly the same as HTML attributes. This section further distinguishes between writing on the DOM tag and writing on the custom component, and their subsequent destinations are different."
        }
      ]
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
          "value": "This determines how you should name props when designing your component API. "
        },
        {
          "type": "inlineCode",
          "value": "label"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "tone"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "isFeatured"
        },
        {
          "type": "text",
          "value": " is your component input, not the browser's built-in attribute."
        }
      ]
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
      "label": "src/learning/react/chapter-03-props-basics/props-object-boundary/jsx-attributes-to-props-demo.tsx",
      "value": "type LearningBadgeProps = {\n  label: string\n  tone: 'blue' | 'green'\n}\n\nfunction LearningBadge({ label, tone }: LearningBadgeProps) {\n  return <span className={`props-pill props-pill-${tone}`}>{label}</span>\n}\n\nexport function JsxAttributesToPropsDemo() {\n  return (\n    <section className=\"props-panel\">\n      <h2>JSX attributes to props</h2>\n      <LearningBadge label=\"Required prop\" tone=\"blue\" />\n      <LearningBadge label=\"Typed union\" tone=\"green\" />\n    </section>\n  )\n}"
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
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "label"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "tone"
                },
                {
                  "type": "text",
                  "value": " is "
                },
                {
                  "type": "inlineCode",
                  "value": "LearningBadge"
                },
                {
                  "type": "text",
                  "value": " self-defined props."
                }
              ]
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
                  "value": "tone"
                },
                {
                  "type": "text",
                  "value": " is restricted to "
                },
                {
                  "type": "inlineCode",
                  "value": "'blue' | 'green'"
                },
                {
                  "type": "text",
                  "value": ", other strings will be intercepted by TypeScript."
                }
              ]
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
                  "value": "<LearningBadge label=\"Required prop\" tone=\"blue\" />"
                },
                {
                  "type": "text",
                  "value": " will form props object at runtime."
                }
              ]
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
                  "value": "className"
                },
                {
                  "type": "text",
                  "value": " is written in "
                },
                {
                  "type": "inlineCode",
                  "value": "<span>"
                },
                {
                  "type": "text",
                  "value": ", it belongs to React DOM common prop and will affect the real DOM class."
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
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: DOM prop versus component prop"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: DOM prop versus component prop",
      "value": "function AvatarImage() {\n  return <img alt=\"Profile avatar\" className=\"avatar\" src=\"/avatar.png\" />\n}\n\nfunction AvatarCard() {\n  return <AvatarImage />\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why this comparison is important:"
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
                  "value": "alt"
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
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "src"
                },
                {
                  "type": "text",
                  "value": " is written in "
                },
                {
                  "type": "inlineCode",
                  "value": "img"
                },
                {
                  "type": "text",
                  "value": ", React DOM knows how to handle them."
                }
              ]
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
                  "value": "AvatarImage"
                },
                {
                  "type": "text",
                  "value": " has no props parameter because "
                },
                {
                  "type": "inlineCode",
                  "value": "<AvatarImage />"
                },
                {
                  "type": "text",
                  "value": " does not pass custom props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If you write "
                },
                {
                  "type": "inlineCode",
                  "value": "<AvatarImage alt=\"...\" />"
                },
                {
                  "type": "text",
                  "value": ", this "
                },
                {
                  "type": "inlineCode",
                  "value": "alt"
                },
                {
                  "type": "text",
                  "value": " will not be automatically passed to internal "
                },
                {
                  "type": "inlineCode",
                  "value": "<img>"
                },
                {
                  "type": "text",
                  "value": " unless "
                },
                {
                  "type": "inlineCode",
                  "value": "AvatarImage"
                },
                {
                  "type": "text",
                  "value": " explicitly receives and forwards."
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
                  "value": "parent component render "
                },
                {
                  "type": "inlineCode",
                  "value": "LearningBadge"
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
                  "value": "JSX attributes are collected as props object."
                }
              ]
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
                  "value": "LearningBadge"
                },
                {
                  "type": "text",
                  "value": " reads props and returns "
                },
                {
                  "type": "inlineCode",
                  "value": "<span>"
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
                  "value": "React DOM reprocessing "
                },
                {
                  "type": "inlineCode",
                  "value": "<span>"
                },
                {
                  "type": "text",
                  "value": " on "
                },
                {
                  "type": "inlineCode",
                  "value": "className"
                },
                {
                  "type": "text",
                  "value": " and children."
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
          "value": "The uppercase component attribute enters component props first; the lowercase DOM tag prop is then handed over to React DOM and the browser."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-destructuring-props-vs-reading-the-full-props-object",
      "children": [
        {
          "type": "text",
          "value": "9.3 Destructuring Props vs. Reading the Full Props Object"
        }
      ]
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
          "value": "Complete props object writing method is more intuitive to see that \"props is object\"; destructuring writing method is more commonly used and shorter. The two runtimes are essentially the same: they both read properties from the same props object."
        }
      ]
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
          "value": "You will see two codes:"
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
                  "value": "function Card(props: CardProps) { return <h2>{props.title}</h2> }"
                }
              ]
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
                  "value": "function Card({ title }: CardProps) { return <h2>{title}</h2> }"
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
          "value": "They are not two sets of React mechanisms, but the JavaScript parameter is written differently."
        }
      ]
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
      "label": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-destructuring-demo.tsx",
      "value": "type LessonCardProps = {\n  title: string\n  summary: string\n}\n\nfunction LessonCardWithObject(props: LessonCardProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{props.title}</h2>\n      <p>{props.summary}</p>\n    </article>\n  )\n}\n\nfunction LessonCardWithDestructuring({ title, summary }: LessonCardProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{title}</h2>\n      <p>{summary}</p>\n    </article>\n  )\n}\n\nexport function PropsDestructuringDemo() {\n  return (\n    <section className=\"props-panel\">\n      <LessonCardWithObject\n        summary=\"Read properties from the props object.\"\n        title=\"Object parameter\"\n      />\n      <LessonCardWithDestructuring\n        summary=\"Bind properties as local variables.\"\n        title=\"Destructured parameter\"\n      />\n    </section>\n  )\n}"
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
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "LessonCardProps"
                },
                {
                  "type": "text",
                  "value": " is a props type shared by two components."
                }
              ]
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
                  "value": "LessonCardWithObject"
                },
                {
                  "type": "text",
                  "value": " Keep intact "
                },
                {
                  "type": "inlineCode",
                  "value": "props"
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
                  "type": "inlineCode",
                  "value": "LessonCardWithDestructuring"
                },
                {
                  "type": "text",
                  "value": " directly takes out "
                },
                {
                  "type": "inlineCode",
                  "value": "title"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "summary"
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
                  "value": "The two components are called in exactly the same way: the parent component still uses JSX attributes to pass values."
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
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: destructuring type annotation mistake"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Common TypeScript destructuring Misunderstanding:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: destructuring type annotation mistake",
      "value": "function BrokenCard({ title: string }) {\n  return <h2>{title}</h2>\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "in JavaScript destructuring syntax, "
        },
        {
          "type": "inlineCode",
          "value": "{ title: string }"
        },
        {
          "type": "text",
          "value": " does not mean \""
        },
        {
          "type": "inlineCode",
          "value": "title"
        },
        {
          "type": "text",
          "value": " is a string\", but \" "
        },
        {
          "type": "inlineCode",
          "value": "title"
        },
        {
          "type": "text",
          "value": " property is renamed to the local variable "
        },
        {
          "type": "inlineCode",
          "value": "string"
        },
        {
          "type": "text",
          "value": "\". So "
        },
        {
          "type": "inlineCode",
          "value": "title"
        },
        {
          "type": "text",
          "value": " does not exist in the function body."
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
      "type": "code",
      "language": "tsx",
      "label": "Snippet: destructuring type annotation correction",
      "value": "type CardProps = {\n  title: string\n}\n\nfunction FixedCard({ title }: CardProps) {\n  return <h2>{title}</h2>\n}"
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
          "value": "destructuring is JavaScript parameter syntax; the props type annotation should be placed after the entire parameter, not after the destructuring attribute name."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-required-props-optional-props-and-default-values",
      "children": [
        {
          "type": "text",
          "value": "9.4 Required Props, Optional Props, and Default Values"
        }
      ]
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
          "value": "required prop does not have "
        },
        {
          "type": "inlineCode",
          "value": "?"
        },
        {
          "type": "text",
          "value": ", must be passed when calling component. optional prop use "
        },
        {
          "type": "inlineCode",
          "value": "?"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": ". The default value is JavaScript destructuring mechanism: when prop is missing or the value is "
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
          "value": "props type is not as simple as \"write or not type\". You need to know which inputs are required for the component to work properly, which inputs can be omitted, and what default values ​​should be used internally within the component when omitted."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code: required props"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-type-boundary/required-props-demo.tsx",
      "value": "type RequiredLessonProps = {\n  title: string\n  durationMinutes: number\n}\n\nfunction RequiredLesson({ title, durationMinutes }: RequiredLessonProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{title}</h2>\n      <p>{durationMinutes} minutes</p>\n    </article>\n  )\n}\n\nexport function RequiredPropsDemo() {\n  return (\n    <section className=\"props-panel\">\n      <RequiredLesson title=\"Props object\" durationMinutes={18} />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code: optional props"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-type-boundary/optional-props-demo.tsx",
      "value": "type OptionalLessonProps = {\n  title: string\n  summary?: string\n}\n\nfunction OptionalLesson({ title, summary }: OptionalLessonProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{title}</h2>\n      {summary ? <p>{summary}</p> : <p>No summary provided.</p>}\n    </article>\n  )\n}\n\nexport function OptionalPropsDemo() {\n  return (\n    <section className=\"props-panel\">\n      <OptionalLesson title=\"Required title\" />\n      <OptionalLesson title=\"Optional summary\" summary=\"This card has more detail.\" />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Sample code: default prop values"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-type-boundary/default-prop-values-demo.tsx",
      "value": "type DefaultLessonProps = {\n  title: string\n  level?: 'beginner' | 'intermediate'\n}\n\nfunction DefaultLesson({ title, level = 'beginner' }: DefaultLessonProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{title}</h2>\n      <p>{level}</p>\n    </article>\n  )\n}\n\nexport function DefaultPropValuesDemo() {\n  return (\n    <section className=\"props-panel\">\n      <DefaultLesson title=\"Default level\" />\n      <DefaultLesson title=\"Explicit level\" level=\"intermediate\" />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: missing required prop error"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: missing required prop error",
      "value": "type LessonProps = {\n  title: string\n  durationMinutes: number\n}\n\nfunction Lesson({ title, durationMinutes }: LessonProps) {\n  return <p>{title}: {durationMinutes}</p>\n}\n\nfunction BrokenUsage() {\n  return <Lesson title=\"Props object\" />\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Expected error:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Error",
      "value": "Property 'durationMinutes' is missing in type '{ title: string; }' but required in type 'LessonProps'."
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
                  "value": "required props are checked at the call site, missing will prevent "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc -b"
                },
                {
                  "type": "text",
                  "value": " passed."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "optional props inside the component may be "
                },
                {
                  "type": "inlineCode",
                  "value": "undefined"
                },
                {
                  "type": "text",
                  "value": ", requires conditional render or default value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "default value takes effect in JavaScript runtime, not just TypeScript annotation."
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
          "value": "required determines \"the caller must pass it\"; optional determines \"the caller may not pass it\"; default value determines \"what is used when the value is not obtained internally in the component\"."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-boolean-props",
      "children": [
        {
          "type": "text",
          "value": "9.5 Boolean Props"
        }
      ]
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
          "value": "boolean props should pass boolean value, do not pass "
        },
        {
          "type": "inlineCode",
          "value": "\"true\""
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "\"false\""
        },
        {
          "type": "text",
          "value": " string. For custom component, "
        },
        {
          "type": "inlineCode",
          "value": "<ProfileBadge isFeatured />"
        },
        {
          "type": "text",
          "value": " is equivalent to "
        },
        {
          "type": "inlineCode",
          "value": "isFeatured={true}"
        },
        {
          "type": "text",
          "value": "; if you want to pass false, write "
        },
        {
          "type": "inlineCode",
          "value": "isFeatured={false}"
        },
        {
          "type": "text",
          "value": " or use default value if omitted."
        }
      ]
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
          "value": "HTML boolean attribute and React custom component boolean prop are easily confused. The boolean attribute in HTML depends on whether the attribute exists; the React custom component props are JavaScript value."
        }
      ]
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
      "label": "src/learning/react/chapter-03-props-basics/props-type-boundary/boolean-props-demo.tsx",
      "value": "type BooleanBadgeProps = {\n  label: string\n  isFeatured?: boolean\n}\n\nfunction BooleanBadge({ label, isFeatured = false }: BooleanBadgeProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{label}</h2>\n      <p>{isFeatured ? 'Featured profile' : 'Standard profile'}</p>\n    </article>\n  )\n}\n\nexport function BooleanPropsDemo() {\n  return (\n    <section className=\"props-panel\">\n      <BooleanBadge label=\"Mia\" isFeatured />\n      <BooleanBadge label=\"Noah\" isFeatured={false} />\n      <BooleanBadge label=\"Ava\" />\n    </section>\n  )\n}"
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
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "isFeatured?: boolean"
                },
                {
                  "type": "text",
                  "value": " indicates that prop can be omitted."
                }
              ]
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
                  "value": "isFeatured = false"
                },
                {
                  "type": "text",
                  "value": " is omitted or "
                },
                {
                  "type": "inlineCode",
                  "value": "undefined"
                },
                {
                  "type": "text",
                  "value": " case default value."
                }
              ]
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
                  "value": "<BooleanBadge label=\"Mia\" isFeatured />"
                },
                {
                  "type": "text",
                  "value": " incoming "
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
                  "type": "inlineCode",
                  "value": "<BooleanBadge label=\"Noah\" isFeatured={false} />"
                },
                {
                  "type": "text",
                  "value": " explicitly passed in "
                },
                {
                  "type": "inlineCode",
                  "value": "false"
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
                  "value": "<BooleanBadge label=\"Ava\" />"
                },
                {
                  "type": "text",
                  "value": " trigger default value "
                },
                {
                  "type": "inlineCode",
                  "value": "false"
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
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: boolean prop string mistake"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: boolean prop string mistake",
      "value": "type BadgeProps = {\n  isFeatured: boolean\n}\n\nfunction Badge({ isFeatured }: BadgeProps) {\n  return <p>{isFeatured ? 'Featured' : 'Standard'}</p>\n}\n\nfunction BrokenUsage() {\n  return <Badge isFeatured=\"false\" />\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Expected error:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Error",
      "value": "Type 'string' is not assignable to type 'boolean'."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and HTML boolean attribute:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "HTML "
        },
        {
          "type": "inlineCode",
          "value": "disabled=\"false\""
        },
        {
          "type": "text",
          "value": " may still appear true because the attribute exists; "
        },
        {
          "type": "inlineCode",
          "value": "isFeatured=\"false\""
        },
        {
          "type": "text",
          "value": " is string, not boolean. TypeScript can help you prevent this misuse in the source code."
        }
      ]
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
          "value": "custom component boolean props is JavaScript boolean; do not move HTML string attributes to typed props."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-the-children-prop",
      "children": [
        {
          "type": "text",
          "value": "9.6 The children Prop"
        }
      ]
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
          "value": "children"
        },
        {
          "type": "text",
          "value": " is a special but still common prop. JSX nested in the middle of component tag will be treated as "
        },
        {
          "type": "inlineCode",
          "value": "children"
        },
        {
          "type": "text",
          "value": " is passed to the child component. This chapter only talks about basic children: using them to wrap content and compose static UI, not render props, compound components or advanced children patterns."
        }
      ]
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
          "value": "Some component inputs are not suitable for use "
        },
        {
          "type": "inlineCode",
          "value": "title"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "summary"
        },
        {
          "type": "text",
          "value": " are fully expressed. For example, card, panel, and layout sections often need to receive a piece of JSX content. In this case, use "
        },
        {
          "type": "inlineCode",
          "value": "children"
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
              "value": "sample code: basic combination"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/children-props-basics/children-basic-composition.tsx",
      "value": "import type { ReactNode } from 'react'\n\ntype LearningPanelProps = {\n  title: string\n  children: ReactNode\n}\n\nfunction LearningPanel({ title, children }: LearningPanelProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{title}</h2>\n      <div>{children}</div>\n    </article>\n  )\n}\n\nexport function ChildrenBasicComposition() {\n  return (\n    <section className=\"props-panel\">\n      <LearningPanel title=\"Children prop\">\n        <p>Nested JSX becomes the children prop.</p>\n        <span className=\"props-pill\">ReactNode</span>\n      </LearningPanel>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "sample code: render boundary"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/children-props-basics/children-renderable-boundary.tsx",
      "value": "import type { ReactNode } from 'react'\n\ntype RenderableBoxProps = {\n  children: ReactNode\n}\n\nfunction RenderableBox({ children }: RenderableBoxProps) {\n  return <article className=\"props-card\">{children}</article>\n}\n\nexport function ChildrenRenderableBoundary() {\n  return (\n    <section className=\"props-panel\">\n      <RenderableBox>\n        <h2>Renderable children</h2>\n        <p>String, number, JSX elements, null, and arrays can be React nodes.</p>\n        {null}\n        {false}\n      </RenderableBox>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: children object mistake"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: children object mistake",
      "value": "const profile = {\n  name: 'Mia',\n  role: 'React learner',\n}\n\nfunction BrokenChildren() {\n  return <section>{profile}</section>\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Normal object is not renderable by React child. The specific properties of the object should be rendered, or the object should be converted into an array, string, or JSX element."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Correction:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: children object correction",
      "value": "const profile = {\n  name: 'Mia',\n  role: 'React learner',\n}\n\nfunction FixedChildren() {\n  return (\n    <section>\n      <h2>{profile.name}</h2>\n      <p>{profile.role}</p>\n    </section>\n  )\n}"
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
          "value": "children"
        },
        {
          "type": "text",
          "value": " is a prop formed by nested JSX; it can be many React nodes, but it cannot be directly an ordinary object."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-props-are-read-only-inputs",
      "children": [
        {
          "type": "text",
          "value": "9.7 Props Are Read-Only Inputs"
        }
      ]
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
          "value": "props should be treated as read-only input. Child components can read props, calculate local values ​​based on props, and pass props to deeper components, but they should not modify the props object or the data in the props object."
        }
      ]
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
          "value": "If the child component can modify props at will, the data source, render output and debugging process of the parent component will become unpredictable. The React documentation refers to props as a read-only snapshot of each render."
        }
      ]
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
      "label": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-readonly-mistake.tsx",
      "value": "type ReadonlyProfileProps = {\n  profile: {\n    name: string\n    role: string\n  }\n}\n\nfunction ReadonlyProfile({ profile }: ReadonlyProfileProps) {\n  const displayName = profile.name.toUpperCase()\n\n  return (\n    <article className=\"props-card\">\n      <h2>{displayName}</h2>\n      <p>{profile.role}</p>\n    </article>\n  )\n}\n\nexport function PropsReadonlyMistake() {\n  const profile = {\n    name: 'Mia',\n    role: 'React learner',\n  }\n\n  return (\n    <section className=\"props-panel\">\n      <ReadonlyProfile profile={profile} />\n    </section>\n  )\n}"
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
      "ordered": false,
      "items": [
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "ReadonlyProfile"
                },
                {
                  "type": "text",
                  "value": " Receive "
                },
                {
                  "type": "inlineCode",
                  "value": "profile"
                },
                {
                  "type": "text",
                  "value": " prop."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "It does not modify "
                },
                {
                  "type": "inlineCode",
                  "value": "profile.name"
                },
                {
                  "type": "text",
                  "value": ", instead create the local value "
                },
                {
                  "type": "inlineCode",
                  "value": "displayName"
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
                  "value": "This is allowed: creating new local variables during render does not pollute external data."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The parent component still owns "
                },
                {
                  "type": "inlineCode",
                  "value": "profile"
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
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: mutate props mistake"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "incorrect writing:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: mutate props mistake",
      "value": "type ProfileProps = {\n  profile: {\n    name: string\n    role: string\n  }\n}\n\nfunction BrokenProfile({ profile }: ProfileProps) {\n  profile.name = profile.name.toUpperCase()\n\n  return <h2>{profile.name}</h2>\n}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This will modify the object passed in by the parent component. Even though TypeScript does not necessarily prevent such deep mutations by default, React's mental model requires you to treat props as read-only snapshots. If you really need to change the UI, you should let the parent component pass in new props; if you need to remember the changes inside the component, you should enter the state chapter."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "TypeScript Enhanced writing:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: readonly props type",
      "value": "type ProfileProps = {\n  readonly profile: {\n    readonly name: string\n    readonly role: string\n  }\n}"
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
          "value": "props is the input, not the storage space of the sub-component. Read it, derive local values, render it; don't modify it."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-typescript-props-checking-vs-runtime-validation",
      "children": [
        {
          "type": "text",
          "value": "9.8 TypeScript Props Checking vs. Runtime Validation"
        }
      ]
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
          "value": "TypeScript checks whether the component usage in the source code conforms to the props type. It does not retain "
        },
        {
          "type": "inlineCode",
          "value": "type Props"
        },
        {
          "type": "text",
          "value": ", nor does it automatically validate data from external sources such as APIs, localStorage, URLs, user input, etc."
        }
      ]
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
          "value": "Beginners can easily think that they have written "
        },
        {
          "type": "inlineCode",
          "value": "type ProfileProps = { name: string }"
        },
        {
          "type": "text",
          "value": ", the runtime will definitely not receive non-string. The fact is: the TypeScript type will be erased and the browser will only see the JavaScript value."
        }
      ]
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
      "label": "src/learning/react/chapter-03-props-basics/props-type-boundary/typescript-runtime-boundary-demo.tsx",
      "value": "type RuntimeBoundaryProfileProps = {\n  name: string\n  completedLessons: number\n}\n\nfunction RuntimeBoundaryProfile({\n  name,\n  completedLessons,\n}: RuntimeBoundaryProfileProps) {\n  return (\n    <article className=\"props-card\">\n      <h2>{name}</h2>\n      <p>{completedLessons} completed lessons</p>\n    </article>\n  )\n}\n\nexport function TypeScriptRuntimeBoundaryDemo() {\n  const profile = {\n    name: 'Mia',\n    completedLessons: 3,\n  }\n\n  return (\n    <section className=\"props-panel\">\n      <RuntimeBoundaryProfile\n        name={profile.name}\n        completedLessons={profile.completedLessons}\n      />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: erased props type boundary"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: erased props type boundary",
      "value": "type ProfileProps = {\n  name: string\n}\n\nfunction Profile({ name }: ProfileProps) {\n  return <h2>{name.toUpperCase()}</h2>\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "runtime approximation only leaves value-level logic:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Output",
      "value": "function Profile({ name }) {\n  return jsx(\"h2\", { children: name.toUpperCase() })\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why is it important:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "if "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " comes from external data, and TypeScript cannot guarantee that it must be a string at runtime. You need to do runtime validation as data enters system boundaries. This chapter does not expand the data fetching and validation library, but only establishes boundaries."
        }
      ]
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
          "value": "TypeScript Check the TSX you wrote; the browser runs JavaScript. props type is a development contract, not runtime insurance."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-the-boundary-between-props-and-state",
      "children": [
        {
          "type": "text",
          "value": "9.9 The Boundary Between Props and State"
        }
      ]
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
          "value": "props"
        },
        {
          "type": "text",
          "value": " is an external input, determined by the parent component; "
        },
        {
          "type": "inlineCode",
          "value": "state"
        },
        {
          "type": "text",
          "value": " is data managed by React inside the component and will change with interaction or time. This chapter only establishes boundaries and does not learn "
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
          "value": "When you want to \"modify props\", it usually means you need to change a model:"
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
                  "value": "If the value comes from the parent component, let the parent component pass in the new props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If the value belongs to the internal interaction of the sub-component, use state later."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If you only display format changes, create a derived local value in render."
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
              "value": "Concept example structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets in this section:\n  Snippet: props versus state boundary"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: props versus state boundary",
      "value": "type ProfileCardProps = {\n  name: string\n}\n\nfunction ProfileCard({ name }: ProfileCardProps) {\n  const displayName = name.toUpperCase()\n\n  return <h2>{displayName}</h2>\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "explanation:"
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
                  "value": "name"
                },
                {
                  "type": "text",
                  "value": " are props, coming from the parent component."
                }
              ]
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
                  "value": "displayName"
                },
                {
                  "type": "text",
                  "value": " is a derived local value in render, not state."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If the user needs to click a button to change the name in the future, it is not a matter of modifying props, but a matter of state or parent component data flow."
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
          "value": "props answers \"what is given to me by the outside world\"; state answers \"what do I remember myself\". Chapter 3 only studies external input."
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
              "value": "<Component propName={value} />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes prop to custom component."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it was an HTML attribute."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "function Component(props: Props)"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript function / TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Receive props with complete object."
            }
          ],
          [
            {
              "type": "text",
              "value": "Forgot props is object."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "function Component({ title }: Props)"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript destructuring / TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Get attributes from props object."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "{ title: string }"
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
              "value": "type Props = { title: string }"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript object type"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines required prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "is not passed when called."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "summary?: string"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript optional property"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines optional prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "Ignore "
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
              "value": "{ size = 100 }: Props"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript default parameter"
            }
          ],
          [
            {
              "type": "text",
              "value": "is missing or "
            },
            {
              "type": "inlineCode",
              "value": "undefined"
            },
            {
              "type": "text",
              "value": " provides a default value."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought the default value would change the caller."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<Badge isFeatured />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX boolean shorthand"
            }
          ],
          [
            {
              "type": "text",
              "value": "is equivalent to "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured={true}"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured=\"true\""
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
              "value": "children: ReactNode"
            }
          ],
          [
            {
              "type": "text",
              "value": "React type / JSX children"
            }
          ],
          [
            {
              "type": "text",
              "value": "receives nested JSX."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses ordinary objects as children."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "readonly"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript property modifier"
            }
          ],
          [
            {
              "type": "text",
              "value": "prevents source code layer assignment."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it would freeze the runtime object."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "ReactNode"
            }
          ],
          [
            {
              "type": "text",
              "value": "React type"
            }
          ],
          [
            {
              "type": "text",
              "value": "represents a wide range of React nodes available as children."
            }
          ],
          [
            {
              "type": "text",
              "value": "mistakenly believes that specific JSX element types can be restricted."
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
              "value": "Missing required prop"
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
              "value": "Required property must be present."
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass the prop or make it optional."
            }
          ],
          [
            {
              "type": "text",
              "value": "Error includes "
            },
            {
              "type": "inlineCode",
              "value": "Property ... is missing"
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
              "value": "Passing string to boolean prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript / JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "Boolean prop expects boolean value."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured"
            },
            {
              "type": "text",
              "value": " or "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured={false}"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Error includes "
            },
            {
              "type": "inlineCode",
              "value": "Type 'string' is not assignable to type 'boolean'"
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
              "value": "Destructuring type annotation mistake"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript syntax / TypeScript"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "{ title: string }"
            },
            {
              "type": "text",
              "value": " renames property, not type annotation."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "function Card({ title }: CardProps)"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Local variable "
            },
            {
              "type": "inlineCode",
              "value": "title"
            },
            {
              "type": "text",
              "value": " cannot be found."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Mutating props"
            }
          ],
          [
            {
              "type": "text",
              "value": "React rule / object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "Props are read-only snapshots."
            }
          ],
          [
            {
              "type": "text",
              "value": "Derive local values or ask parent for new props."
            }
          ],
          [
            {
              "type": "text",
              "value": "Code assigns to a prop or nested prop."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Rendering object children"
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
              "value": "Plain object is not a React node."
            }
          ],
          [
            {
              "type": "text",
              "value": "Render object properties or JSX."
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser error mentions objects are not valid as a React child."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Expecting TypeScript runtime validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Types are erased."
            }
          ],
          [
            {
              "type": "text",
              "value": "Validate external data at runtime."
            }
          ],
          [
            {
              "type": "text",
              "value": "Bug appears only with API or stored data."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Using "
            },
            {
              "type": "inlineCode",
              "value": "React.FC"
            },
            {
              "type": "text",
              "value": " as default habit"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type style"
            }
          ],
          [
            {
              "type": "text",
              "value": "It can hide beginner mental model."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use explicit props type on function parameter first."
            }
          ],
          [
            {
              "type": "text",
              "value": "You cannot explain where children came from."
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
          "value": "final mini project: "
        },
        {
          "type": "inlineCode",
          "value": "Props Composition Gallery"
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
          "value": "is to use multiple typed components to form a static information card page, display:"
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
                  "value": "parent-to-child props"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "required props"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "optional props"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "default values"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "boolean props"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "children prop"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component composition"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript props checking"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "CSS class and JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "className"
                },
                {
                  "type": "text",
                  "value": " "
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
          "value": "does not use state, effects, routers, external UI libraries, data fetching or testing frameworks."
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
          "value": "This project puts props in the real component tree instead of just looking at an isolated function. "
        },
        {
          "type": "inlineCode",
          "value": "PropsCompositionGallery"
        },
        {
          "type": "text",
          "value": " is the parent, responsible for preparing data and passing the data to "
        },
        {
          "type": "inlineCode",
          "value": "ProfileCardGrid"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "ProfileCardGrid"
        },
        {
          "type": "text",
          "value": " continues to pass each profile to "
        },
        {
          "type": "inlineCode",
          "value": "ProfileCard"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "ProfileCard"
        },
        {
          "type": "text",
          "value": " Then assign avatar, badge, and children to smaller components. You can see how props flow from top to bottom along the component tree."
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
      "value": "src/\n  App.tsx\n  learning/\n    react/\n      chapter-03-props-basics/\n        props-composition-gallery/\n          profile-card-data.ts\n          profile-avatar.tsx\n          profile-badge.tsx\n          profile-card.tsx\n          profile-card-grid.tsx\n          props-composition-gallery.tsx\n          props-composition-gallery.css"
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
              "value": "src/App.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Thin adapter; temporarily mount "
            },
            {
              "type": "inlineCode",
              "value": "PropsCompositionGallery"
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
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines profile data type and static data."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-avatar.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "receives required props and renders the avatar placeholder UI."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-badge.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "receives optional/default/boolean props, render badge."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "combines avatar, badge, and children to display a single profile."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-grid.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "receives the profile array and passes props to each card."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "project root component, prepare the page structure."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "small project style."
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
      "language": "tsx",
      "label": "src/App.tsx",
      "value": "import { PropsCompositionGallery } from './learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery'\n\nfunction App() {\n  return <PropsCompositionGallery />\n}\n\nexport default App"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-data.ts",
      "value": "export type ProfileCardData = {\n  id: string\n  name: string\n  role: string\n  initials: string\n  completedLessons: number\n  isFeatured?: boolean\n  badgeLabel?: string\n  focusAreas: string[]\n}\n\nexport const profileCards: ProfileCardData[] = [\n  {\n    id: 'mia',\n    name: 'Mia Chen',\n    role: 'React learner',\n    initials: 'MC',\n    completedLessons: 3,\n    isFeatured: true,\n    badgeLabel: 'Featured',\n    focusAreas: ['props', 'children', 'composition'],\n  },\n  {\n    id: 'noah',\n    name: 'Noah Smith',\n    role: 'TypeScript beginner',\n    initials: 'NS',\n    completedLessons: 2,\n    focusAreas: ['required props', 'optional props'],\n  },\n  {\n    id: 'ava',\n    name: 'Ava Patel',\n    role: 'Frontend student',\n    initials: 'AP',\n    completedLessons: 4,\n    isFeatured: false,\n    badgeLabel: 'Practice',\n    focusAreas: ['boolean props', 'default values'],\n  },\n]"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-avatar.tsx",
      "value": "type ProfileAvatarProps = {\n  initials: string\n  name: string\n}\n\nexport function ProfileAvatar({ initials, name }: ProfileAvatarProps) {\n  return (\n    <div className=\"profile-avatar\" aria-label={`${name} avatar`}>\n      {initials}\n    </div>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-badge.tsx",
      "value": "type ProfileBadgeProps = {\n  label?: string\n  isFeatured?: boolean\n}\n\nexport function ProfileBadge({\n  label = 'Learning',\n  isFeatured = false,\n}: ProfileBadgeProps) {\n  const className = isFeatured ? 'profile-badge featured-badge' : 'profile-badge'\n\n  return <span className={className}>{label}</span>\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card.tsx",
      "value": "import type { ReactNode } from 'react'\nimport { ProfileAvatar } from './profile-avatar'\nimport { ProfileBadge } from './profile-badge'\n\ntype ProfileCardProps = {\n  name: string\n  role: string\n  initials: string\n  completedLessons: number\n  isFeatured?: boolean\n  badgeLabel?: string\n  children: ReactNode\n}\n\nexport function ProfileCard({\n  name,\n  role,\n  initials,\n  completedLessons,\n  isFeatured = false,\n  badgeLabel,\n  children,\n}: ProfileCardProps) {\n  return (\n    <article className=\"profile-card\">\n      <header className=\"profile-card-header\">\n        <ProfileAvatar initials={initials} name={name} />\n        <div>\n          <h2>{name}</h2>\n          <p>{role}</p>\n        </div>\n      </header>\n\n      <ProfileBadge label={badgeLabel} isFeatured={isFeatured} />\n\n      <p className=\"profile-progress\">\n        {completedLessons} completed lessons\n      </p>\n\n      <div className=\"profile-card-children\">{children}</div>\n    </article>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-grid.tsx",
      "value": "import type { ProfileCardData } from './profile-card-data'\nimport { ProfileCard } from './profile-card'\n\ntype ProfileCardGridProps = {\n  profiles: ProfileCardData[]\n}\n\nexport function ProfileCardGrid({ profiles }: ProfileCardGridProps) {\n  return (\n    <section className=\"profile-grid\" aria-label=\"Profile cards\">\n      {profiles.map((profile) => (\n        <ProfileCard\n          badgeLabel={profile.badgeLabel}\n          completedLessons={profile.completedLessons}\n          initials={profile.initials}\n          isFeatured={profile.isFeatured}\n          key={profile.id}\n          name={profile.name}\n          role={profile.role}\n        >\n          <ul className=\"focus-list\">\n            {profile.focusAreas.map((area) => (\n              <li key={area}>{area}</li>\n            ))}\n          </ul>\n        </ProfileCard>\n      ))}\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.tsx",
      "value": "import { profileCards } from './profile-card-data'\nimport { ProfileCardGrid } from './profile-card-grid'\nimport './props-composition-gallery.css'\n\nexport function PropsCompositionGallery() {\n  return (\n    <main className=\"props-gallery-shell\">\n      <header className=\"props-gallery-header\">\n        <p className=\"props-gallery-eyebrow\">React Chapter 03</p>\n        <h1>Props Composition Gallery</h1>\n        <p>\n          A static component tree for practicing typed props, default values,\n          boolean props, children, and parent-to-child data flow.\n        </p>\n      </header>\n\n      <ProfileCardGrid profiles={profileCards} />\n    </main>\n  )\n}"
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.css",
      "value": ".props-gallery-shell {\n  width: min(1120px, calc(100% - 32px));\n  margin: 0 auto;\n  padding: 56px 0;\n}\n\n.props-gallery-header {\n  max-width: 760px;\n  margin-bottom: 28px;\n}\n\n.props-gallery-eyebrow {\n  margin: 0 0 8px;\n  color: #335c81;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.props-gallery-header h1 {\n  margin: 0;\n  color: #172033;\n  font-size: clamp(2rem, 4vw, 3.35rem);\n  line-height: 1;\n}\n\n.props-gallery-header p:last-child {\n  margin: 16px 0 0;\n  color: #526070;\n  line-height: 1.6;\n}\n\n.profile-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 18px;\n}\n\n.profile-card {\n  padding: 22px;\n  border: 1px solid #d8e0ea;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 16px 40px rgb(23 32 51 / 8%);\n}\n\n.profile-card-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 16px;\n}\n\n.profile-avatar {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  place-items: center;\n  border-radius: 8px;\n  background: #335c81;\n  color: #ffffff;\n  font-weight: 800;\n}\n\n.profile-card h2 {\n  margin: 0;\n  color: #172033;\n}\n\n.profile-card p {\n  margin: 6px 0;\n  color: #526070;\n  line-height: 1.5;\n}\n\n.profile-badge {\n  display: inline-flex;\n  margin-bottom: 12px;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: #e8f0f8;\n  color: #24496c;\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.featured-badge {\n  background: #e7f4ef;\n  color: #1f5b4d;\n}\n\n.profile-progress {\n  font-weight: 700;\n}\n\n.profile-card-children {\n  margin-top: 14px;\n}\n\n.focus-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n\n.focus-list li {\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: #f3f6fa;\n  color: #334155;\n  font-size: 0.85rem;\n}"
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
          "value": "Build check:"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run build"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "page will display a static data card gallery:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Output",
      "value": "Props Composition Gallery\nMia Chen\nReact learner\nFeatured\n3 completed lessons\nprops children composition"
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
                  "value": "src/sudoku/main.tsx"
                },
                {
                  "type": "text",
                  "value": " Create React root and render "
                },
                {
                  "type": "inlineCode",
                  "value": "App"
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
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " render "
                },
                {
                  "type": "inlineCode",
                  "value": "PropsCompositionGallery"
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
                  "value": "PropsCompositionGallery"
                },
                {
                  "type": "text",
                  "value": " import "
                },
                {
                  "type": "inlineCode",
                  "value": "profileCards"
                },
                {
                  "type": "text",
                  "value": ", treat it as "
                },
                {
                  "type": "inlineCode",
                  "value": "profiles"
                },
                {
                  "type": "text",
                  "value": " prop is passed to "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileCardGrid"
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
                  "value": "ProfileCardGrid"
                },
                {
                  "type": "text",
                  "value": " traverses "
                },
                {
                  "type": "inlineCode",
                  "value": "profiles"
                },
                {
                  "type": "text",
                  "value": ", split the fields of each profile into props and pass them to "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileCard"
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
                  "value": "ProfileCard"
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "initials"
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
                  "value": " passes to "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileAvatar"
                },
                {
                  "type": "text",
                  "value": ", put "
                },
                {
                  "type": "inlineCode",
                  "value": "badgeLabel"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "isFeatured"
                },
                {
                  "type": "text",
                  "value": " passes to "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileBadge"
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
                  "value": "ProfileCardGrid"
                },
                {
                  "type": "text",
                  "value": " nested "
                },
                {
                  "type": "inlineCode",
                  "value": "<ul>"
                },
                {
                  "type": "text",
                  "value": " enter "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileCard"
                },
                {
                  "type": "text",
                  "value": " 's "
                },
                {
                  "type": "inlineCode",
                  "value": "children"
                },
                {
                  "type": "text",
                  "value": " prop."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Checks at compile time whether each component receives the correct props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "browser runtime I don't know "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileCardData"
                },
                {
                  "type": "text",
                  "value": " type; it only runs the final JavaScript."
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
              "value": "Missing "
            },
            {
              "type": "inlineCode",
              "value": "profiles"
            },
            {
              "type": "text",
              "value": " on "
            },
            {
              "type": "inlineCode",
              "value": "ProfileCardGrid"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "profiles"
            },
            {
              "type": "text",
              "value": " is a required prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass "
            },
            {
              "type": "inlineCode",
              "value": "profiles={profileCards}"
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
              "value": "Passing "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured=\"false\""
            }
          ],
          [
            {
              "type": "text",
              "value": "string is not a boolean."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "isFeatured={false}"
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
              "value": "Forgetting "
            },
            {
              "type": "inlineCode",
              "value": "children"
            },
            {
              "type": "text",
              "value": " in "
            },
            {
              "type": "inlineCode",
              "value": "ProfileCardProps"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "ProfileCard"
            },
            {
              "type": "text",
              "value": " renders "
            },
            {
              "type": "inlineCode",
              "value": "children"
            },
            {
              "type": "text",
              "value": " but props type does not include it."
            }
          ],
          [
            {
              "type": "text",
              "value": "Add "
            },
            {
              "type": "inlineCode",
              "value": "children: ReactNode"
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
              "value": "Mutating "
            },
            {
              "type": "inlineCode",
              "value": "profile"
            },
            {
              "type": "text",
              "value": " in "
            },
            {
              "type": "inlineCode",
              "value": "ProfileCardGrid"
            }
          ],
          [
            {
              "type": "text",
              "value": "props data should be treated as read-only render input."
            }
          ],
          [
            {
              "type": "text",
              "value": "Create derived local values instead."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Expecting runtime validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript types are erased."
            }
          ],
          [
            {
              "type": "text",
              "value": "Validate external data before rendering."
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
                  "value": "is "
                },
                {
                  "type": "inlineCode",
                  "value": "badgeLabel"
                },
                {
                  "type": "text",
                  "value": " Add union type, such as "
                },
                {
                  "type": "inlineCode",
                  "value": "'Featured' | 'Practice' | 'Learning'"
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
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "ProfileBadge"
                },
                {
                  "type": "text",
                  "value": " is split into independent optional props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Add "
                },
                {
                  "type": "inlineCode",
                  "value": "empty profile list"
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
                  "value": "After learning state, let gallery support filtering; do not implement it in advance in this chapter."
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
          "value": "Props is a read-only input object passed from the parent component to the child component; JSX custom component attributes will become props object in React runtime, and TypeScript checks the shape of this object at compile time."
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
            "value": "Common Mistake"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "<Component title=\"...\" />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes string prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it was a DOM attribute."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<Component count={3} />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / JavaScript value"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes number prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "\"3\""
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
              "value": "<Component isActive />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX boolean shorthand"
            }
          ],
          [
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "inlineCode",
              "value": "true"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "\"true\""
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
              "value": "<Component isActive={false} />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX expression"
            }
          ],
          [
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "inlineCode",
              "value": "false"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "is mistakenly written as "
            },
            {
              "type": "inlineCode",
              "value": "\"false\""
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
              "value": "<Panel>...</Panel>"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX children"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes children prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "is missing "
            },
            {
              "type": "inlineCode",
              "value": "children"
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
              "value": "type Props = { title: string }"
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
              "value": "defines required prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "is not passed when called."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "summary?: string"
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
              "value": "defines optional prop."
            }
          ],
          [
            {
              "type": "text",
              "value": "does not process "
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
              "value": "{ level = 'beginner' }"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript default value"
            }
          ],
          [
            {
              "type": "text",
              "value": "sets the default value."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it could verify external data."
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
            "value": "Practical Rule"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "props"
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
              "value": "props comes from outside; state belongs inside component."
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter only writes props, not state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "custom component prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "HTML attribute"
            }
          ],
          [
            {
              "type": "text",
              "value": "The former enters component function; the latter is mapped to DOM from React DOM."
            }
          ],
          [
            {
              "type": "text",
              "value": "Think of uppercase component and lowercase tag separately."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "required prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "optional prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "required must be passed when calling; optional can be omitted."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "?"
            },
            {
              "type": "text",
              "value": " mark optional."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "optional prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "default value"
            }
          ],
          [
            {
              "type": "text",
              "value": "optional is the type layer; default value is the runtime layer."
            }
          ],
          [
            {
              "type": "text",
              "value": "The two are often used together."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "children"
            }
          ],
          [
            {
              "type": "text",
              "value": "named props"
            }
          ],
          [
            {
              "type": "text",
              "value": "children from nested JSX; named props from attributes."
            }
          ],
          [
            {
              "type": "text",
              "value": "layout/wrapper Use children."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript props type"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "type will be erased; runtime validation requires additional code."
            }
          ],
          [
            {
              "type": "text",
              "value": "Don't just trust TS for external data."
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
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Missing required prop"
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
              "value": "Required property must be passed."
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass prop or mark optional."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Wrong prop type"
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
              "value": "Value type does not match props type."
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass the correct JavaScript value."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Mutating props"
            }
          ],
          [
            {
              "type": "text",
              "value": "React rule"
            }
          ],
          [
            {
              "type": "text",
              "value": "Props are read-only snapshots."
            }
          ],
          [
            {
              "type": "text",
              "value": "Derive local value or change parent data."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object child"
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
              "value": "Plain object is not renderable."
            }
          ],
          [
            {
              "type": "text",
              "value": "Render properties or JSX."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Wrong destructuring annotation"
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
              "value": "Destructuring rename is not type annotation."
            }
          ],
          [
            {
              "type": "text",
              "value": "Type the whole parameter."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime data mismatch"
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript was erased."
            }
          ],
          [
            {
              "type": "text",
              "value": "Validate external data."
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
            "value": "Practical Rule"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Card component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Many items share UI shape but have different data."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use props for item data."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Badge component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Small reusable visual unit."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use optional and boolean props carefully."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Layout wrapper"
            }
          ],
          [
            {
              "type": "text",
              "value": "Wrapper does not know exact nested content."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use basic "
            },
            {
              "type": "inlineCode",
              "value": "children"
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
              "value": "Static gallery"
            }
          ],
          [
            {
              "type": "text",
              "value": "Good props practice before state."
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep data static in this chapter."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "API data later"
            }
          ],
          [
            {
              "type": "text",
              "value": "External data can be malformed."
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime validation belongs at data boundary."
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
      "label": "Template: typed props component",
      "value": "type InfoCardProps = {\n  title: string\n  summary?: string\n  isHighlighted?: boolean\n}\n\nexport function InfoCard({\n  title,\n  summary = 'No summary provided.',\n  isHighlighted = false,\n}: InfoCardProps) {\n  return (\n    <article className={isHighlighted ? 'info-card highlighted' : 'info-card'}>\n      <h2>{title}</h2>\n      <p>{summary}</p>\n    </article>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: typed children wrapper",
      "value": "import type { ReactNode } from 'react'\n\ntype SectionPanelProps = {\n  title: string\n  children: ReactNode\n}\n\nexport function SectionPanel({ title, children }: SectionPanelProps) {\n  return (\n    <section className=\"section-panel\">\n      <h2>{title}</h2>\n      {children}\n    </section>\n  )\n}"
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
          "value": "The file actually created this time:"
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
              "value": "docs/react/chapter-03-props-basics/react-chapter-03-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 3 study guide document."
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
          "value": "Real practice files suggested to be created in this chapter:"
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
              "value": "src/learning/react/chapter-03-props-basics/chapter-03-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "The general entrance to the general exercises in this chapter."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/chapter-03-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Common practice sharing styles in this chapter."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-object-runtime-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercises the essence of props object runtime."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/jsx-attributes-to-props-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise JSX attributes to props object."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-destructuring-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise destructuring props."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-object-boundary/props-readonly-mistake.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercises props readonly boundaries."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/required-props-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise required props."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/optional-props-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercise optional props."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/default-prop-values-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercises default prop values."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/boolean-props-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercises boolean props."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-type-boundary/typescript-runtime-boundary-demo.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercise TypeScript props type and runtime boundaries."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/children-props-basics/children-basic-composition.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Practice basic children composition."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/children-props-basics/children-renderable-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise children can render value boundary."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when performing the exercises in this chapter; it has not been modified this time."
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
          "value": "final mini project recommended real file to create or replace:"
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
              "value": "src/App.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Thin adapter; mount "
            },
            {
              "type": "inlineCode",
              "value": "Props Composition Gallery"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only replaced when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "profile static data and TypeScript type."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-avatar.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "avatar display component."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-badge.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "badge display component."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "profile card combination component."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-grid.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "card grid component."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "gallery root component."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "gallery style."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only created when executing the final mini project; it has not been modified this time."
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
                  "value": "Snippet: function parameter comparison"
                }
              ]
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
                  "value": "Snippet: DOM prop versus component prop"
                }
              ]
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
                  "value": "Snippet: destructuring type annotation mistake"
                }
              ]
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
                  "value": "Snippet: destructuring type annotation correction"
                }
              ]
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
                  "value": "Snippet: missing required prop error"
                }
              ]
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
                  "value": "Snippet: boolean prop string mistake"
                }
              ]
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
                  "value": "Snippet: children object mistake"
                }
              ]
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
                  "value": "Snippet: children object correction"
                }
              ]
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
                  "value": "Snippet: mutate props mistake"
                }
              ]
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
                  "value": "Snippet: readonly props type"
                }
              ]
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
                  "value": "Snippet: erased props type boundary"
                }
              ]
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
                  "value": "Snippet: props versus state boundary"
                }
              ]
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
                  "value": "Template: typed props component"
                }
              ]
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
                  "value": "Template: typed children wrapper"
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
          "value": "suggests organizing this chapter into six cards:"
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
            "value": "Card"
          }
        ],
        [
          {
            "type": "text",
            "value": "Must Include"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Props runtime model"
            }
          ],
          [
            {
              "type": "text",
              "value": "Parent JSX attributes -> props object -> child parameter."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Props typing"
            }
          ],
          [
            {
              "type": "text",
              "value": "required, optional, default, boolean writing methods and boundaries."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Children basics"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "children: ReactNode"
            },
            {
              "type": "text",
              "value": ", nested JSX, object child error."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Readonly rule"
            }
          ],
          [
            {
              "type": "text",
              "value": "props is a read-only snapshot and cannot be modified in subcomponents."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "compile time checking, type erasure, runtime validation boundaries."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Props vs state"
            }
          ],
          [
            {
              "type": "text",
              "value": "props are external inputs; state is internal React-managed data."
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
          "value": "When taking notes, don't just copy the code. Each props writing method must answer three things:"
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
                  "value": "What does the caller write in JSX?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "subcomponentruntime receive?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript What does it check at compile time?"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After studying this chapter, you must be able to answer:"
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
                  "value": "props?"
                }
              ]
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
                  "value": "<ProfileCard name=\"Mia\" />"
                },
                {
                  "type": "text",
                  "value": " in "
                },
                {
                  "type": "inlineCode",
                  "value": "name"
                },
                {
                  "type": "text",
                  "value": " How to enter the subcomponent?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What is the difference between custom component prop and HTML attribute?"
                }
              ]
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
                  "value": "props"
                },
                {
                  "type": "text",
                  "value": " and ordinary function parameters?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "destructuring props writing method be placed?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What is the syntax difference between required prop and optional prop?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "default value take effect?"
                }
              ]
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
                  "value": "<Badge isFeatured />"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "<Badge isFeatured={false} />"
                },
                {
                  "type": "text",
                  "value": " pass in?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "children prop come from?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why can't I modify props in sub-components?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript props type Why can't the external data of the browser runtime be verified?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "props and state What is the boundary?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why Chapter 3 practice files should not continue to pile up to "
                },
                {
                  "type": "inlineCode",
                  "value": "App.tsx"
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
                  "value": "How to check whether the real file path is consistent with the directory structure, code window title bar, and final file list?"
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
          "value": "Finally remember this chapter:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Final memory model",
      "value": "Props are parent-owned input.\nJSX custom component attributes become a props object.\nThe child component receives that object as a function parameter.\nTypeScript checks the object shape before runtime.\nThe browser runs JavaScript after TypeScript types are erased.\nProps should be treated as read-only render snapshots."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is changed to Chinese to understand:"
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
                  "value": "props is the input from the parent component to the child component, not the child component's own storage space."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX attributes written in uppercase component will become props object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "function component is a function, and props are its parameters."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript helps you check the shape of props, but does not preserve the type in the browser runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If you want to change the input, let the parent component pass new props; if you want to remember the internal changes, enter the state chapter."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "It is recommended to read in this order:"
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
              "href": "https://react.dev/learn/passing-props-to-a-component",
              "children": [
                {
                  "type": "text",
                  "value": "Passing Props to a Component"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "props pass, read, default values, children, readonly snapshots."
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
              "type": "text",
              "value": "React component props typing, "
            },
            {
              "type": "inlineCode",
              "value": ".tsx"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "ReactNode"
            },
            {
              "type": "text",
              "value": " children type."
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
              "href": "https://react.dev/learn/keeping-components-pure",
              "children": [
                {
                  "type": "text",
                  "value": "Keeping Components Pure"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "props readonly relationship with render purity."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React DOM"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://react.dev/reference/react-dom/components/common",
              "children": [
                {
                  "type": "text",
                  "value": "Common components"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "built-in DOM props, "
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
              "value": "className"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "style"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "htmlFor"
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
              "value": "TypeScript"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://www.typescriptlang.org/docs/handbook/2/objects.html",
              "children": [
                {
                  "type": "text",
                  "value": "Object Types"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "optional properties, default destructuring, readonly properties."
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
              "value": "intrinsic elements, value-based elements, attribute checking, children checking."
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
              "href": "https://www.typescriptlang.org/tsconfig/#jsx",
              "children": [
                {
                  "type": "text",
                  "value": "TSConfig jsx"
                }
              ]
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "react-jsx"
            },
            {
              "type": "text",
              "value": " transform and current project "
            },
            {
              "type": "inlineCode",
              "value": "tsconfig.app.json"
            },
            {
              "type": "text",
              "value": " relationship."
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
              "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes",
              "children": [
                {
                  "type": "text",
                  "value": "HTML attribute reference"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "HTML attribute, content attribute, IDL attribute, boolean attribute."
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
              "href": "https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML",
              "children": [
                {
                  "type": "text",
                  "value": "Boolean attribute"
                }
              ]
            }
          ],
          [
            {
              "type": "text",
              "value": "HTML boolean attribute presence/absence rule."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Vite"
            }
          ],
          [
            {
              "type": "link",
              "href": "https://vite.dev/guide/",
              "children": [
                {
                  "type": "text",
                  "value": "Getting Started"
                }
              ]
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "index.html"
            },
            {
              "type": "text",
              "value": ", module graph, dev/build command boundary."
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
          "value": "Local auxiliary information:"
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
          "value": "How to use:"
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
                  "value": "This PDF "
                },
                {
                  "type": "inlineCode",
                  "value": "React Props"
                },
                {
                  "type": "text",
                  "value": " is used to assist in understanding the principles of parent-to-child data flow, props object and props immutable."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "This PDF example mostly uses "
                },
                {
                  "type": "inlineCode",
                  "value": "App.jsx"
                },
                {
                  "type": "text",
                  "value": " and JavaScript; this chapter is rewritten according to the current project as "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " exercise structure."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If the PDF conflicts with the current React official document, the React official document shall prevail."
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
                  "value": "This chapter only creates a study guide document, and does not actually create the source code exercise file for Chapter 3."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "document need to run "
                },
                {
                  "type": "inlineCode",
                  "value": "npm run build"
                },
                {
                  "type": "text",
                  "value": " verification."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The current project entrance is in the Chapter 2 exercise mounting state; it is necessary to temporarily replace "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": ", after completion, resume or continue to the next chapter according to the learning plan."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter03Content() {
  return <DocumentRenderer document={chapterDocument} />
}
