import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-02",
  "slug": "chapter-02-jsx-and-components",
  "title": "React Chapter 2: JSX, Components, and Runnable Practice Structure",
  "sourcePath": "docs/react/chapter-02-jsx-and-components/react-chapter-02-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-2-jsx-components-and-runnable-practice-structure",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 2: JSX, Components, and Runnable Practice Structure"
        }
      ]
    },
    {
      "type": "callout",
      "tone": "important",
      "title": [
        {
          "type": "text",
          "value": "Current Workspace Entry"
        }
      ],
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "The current application starts at index.html, which loads src/sudoku/main.tsx and the active global stylesheet src/sudoku/index.css. References to src/main.tsx or src/index.css below describe the original teaching example, not the current mounted entry."
            }
          ]
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
              "value": "JSX expression can be set to"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-expression-values.tsx"
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
              "value": "JSX statement error comparison"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: JSX statement mistake"
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
              "value": "JSX expression correction method"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: JSX expression correction"
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
              "value": "JSX attribute boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-attribute-boundary.tsx"
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
              "value": "HTML attribute direct copy error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: HTML attribute copied into JSX"
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
              "value": "JSX attribute correction method"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: JSX attribute correction"
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
              "value": "JSX child renderable value boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-child-values.tsx"
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
              "value": "object child error comparison"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: object child mistake"
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
              "value": "object child correction method"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: object child correction"
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
              "value": "Custom component naming"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/component-basics/component-name-boundary.tsx"
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
              "value": "lowercase component name error comparison"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: lowercase component mistake"
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
              "value": "How to correct uppercase component name"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: capitalized component correction"
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
              "value": "component import, export and combine"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/component-basics/component-module-composition.tsx"
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
              "value": "named import mismatch error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: named import mismatch"
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
              "value": "named import correction method"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: named import correction"
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
              "value": "TypeScript Check for missing input"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: missing prop type error"
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
              "value": "TypeScript Type erase boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: TypeScript erased type boundary"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-topic-data.ts"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-badge.tsx"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-card.tsx"
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
              "value": "final mini project section component"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-section.tsx"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.tsx"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.css"
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
          "value": " study project. Chapter 1 has been established. What is React and how to use React app from "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " startup, Vite / React / TypeScript / browser DOM boundary. This chapter begins to enter the real practice file organization: no longer just looking at concept fragments, but designing a set of TSX practice files that can be retained for a long time and can directly locate knowledge points through file names during review."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The topic of this chapter is:"
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
                  "value": "JSX Basics."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX Boundary of expression, attribute, children."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Function component is the same as the React component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Component file."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Check boundaries in TSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Chapter 2 starts with how to organize real practice files and reserve expansion space for subsequent props, state, effect, routing and other chapters."
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
          "value": "After the first chapter, learners usually encounter two problems."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The first problem is that the syntax boundary is unclear: JSX looks like HTML, but it is the UI description syntax of the JavaScript / TypeScript source code layer. Browsers do not natively execute JSX, and TypeScript does not bring types to runtime. You must know "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": "? Why is the attribute written as "
        },
        {
          "type": "inlineCode",
          "value": "className"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "htmlFor"
        },
        {
          "type": "text",
          "value": ", children Why can't we render ordinary objects directly?"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The second problem is that the organization of exercise files is out of control: many tutorials pile everything into "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": ", it is fast in the early stage but difficult to review in the later stage. Beginning with Chapter 2, real-life exercises should use meaningful directory and file names. See "
        },
        {
          "type": "inlineCode",
          "value": "jsx-expression-values.tsx"
        },
        {
          "type": "text",
          "value": ", you should immediately know that it is practicing JSX expression; see "
        },
        {
          "type": "inlineCode",
          "value": "component-module-composition.tsx"
        },
        {
          "type": "text",
          "value": ", you should know that it practices component import, export and combination."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The core conclusion of this chapter:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React's JSX is \"UI description syntax at the source code layer\"; the function component is JavaScript function, but component naming, return values, combinations and render conventions must be followed in React; starting from Chapter 2, real exercises should be placed in directories grouped by concepts instead of long-term reliance on "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " carries all knowledge points."
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
              "value": "JavaScript expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX "
            },
            {
              "type": "inlineCode",
              "value": "{}"
            },
            {
              "type": "text",
              "value": " can only put expressions, not statements directly."
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
              "value": "JSX attribute, component props, and style object all depend on the object model."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript module"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component file by "
            },
            {
              "type": "inlineCode",
              "value": "import"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "export"
            },
            {
              "type": "text",
              "value": " combination."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "HTML attribute"
            }
          ],
          [
            {
              "type": "text",
              "value": "To understand the difference between JSX attributes, you must first know the HTML attributes."
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
              "value": "React DOM converts JSX props into real DOM attribute/property updates."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript type checking"
            }
          ],
          [
            {
              "type": "text",
              "value": "TSX will be checked by TypeScript."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component is the core unit for organizing UI in React."
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
              "value": "The new TSX file needs to be imported before Vite will be included in the module diagram."
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
                  "value": "explains why JSX is not browser native HTML."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "judgment JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "{}"
                },
                {
                  "type": "text",
                  "value": " can be rendered and which values cannot be rendered."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "writes "
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
                  "value": "htmlFor"
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
                  "value": ", the correct TSX writing method of boolean attribute."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains the renderable value boundary of JSX child."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains why the custom component must start with a capital letter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Define, export, import and combine multiple function components."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Lightly understand that props are the input objects of component, but do not enter the systematic props chapter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains what TypeScript checks in TSX and why the type does not enter the runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Design the real practice file structure of Chapter 2 to avoid stacking all exercises into "
                },
                {
                  "type": "inlineCode",
                  "value": "App.tsx"
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
                  "value": "Complete "
                },
                {
                  "type": "inlineCode",
                  "value": "JSX Component Gallery"
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
                  "value": "First understand the current project structure: "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " is already a Sudoku application, so it is not suitable to continue to stuff all the learning clips."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Redesign the real exercise directory of Chapter 2: grouped by JSX, component, gallery project."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn JSX basic rules: single root node, label closure, attribute naming."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn JSX expression: "
                },
                {
                  "type": "inlineCode",
                  "value": "{}"
                },
                {
                  "type": "text",
                  "value": " is JavaScript expression, not any JavaScript code."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn JSX attribute and child: distinguish source code writing, React DOM behavior and browser results."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Learn function component: It is a function, but React will call it according to the component convention."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "learn component file: file name, export, import, and combination must serve long-term review."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Finally completed "
                },
                {
                  "type": "inlineCode",
                  "value": "JSX Component Gallery"
                },
                {
                  "type": "text",
                  "value": " integrates the mechanism of this chapter into a static page."
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
              "value": "JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / TypeScript HTML-like UI description syntax of source code layer"
            }
          ],
          [
            {
              "type": "text",
              "value": "syntax / tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "The main line of this chapter, the browser does not execute it natively."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript The file contains the source code form of JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript syntax / tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": ".tsx"
            },
            {
              "type": "text",
              "value": " Write React components."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX "
            },
            {
              "type": "inlineCode",
              "value": "{}"
            },
            {
              "type": "text",
              "value": " JavaScript expression in"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript syntax / JSX syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "determines how dynamic values ​​enter the UI description."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX attribute"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX Attribute writing on tag"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX syntax / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "is similar to the HTML attribute but not identical."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX child"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX tag internal content"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime / renderable value"
            }
          ],
          [
            {
              "type": "text",
              "value": "determines what values can be displayed in the UI."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Function component"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns React node's JavaScript function"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime / React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "The component main form of the current project."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Component composition"
            }
          ],
          [
            {
              "type": "text",
              "value": "is composed of component nested components to form a UI tree"
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
              "value": "Chapter 2 starts practicing component splitting and combination."
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
              "value": "The input object"
            }
          ],
          [
            {
              "type": "text",
              "value": "React convention / object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter is only a preview of \"component input object\"."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Intrinsic element"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX middle and lowercase tag, such as "
            },
            {
              "type": "inlineCode",
              "value": "<section>"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM / JSX typing"
            }
          ],
          [
            {
              "type": "text",
              "value": "will be mapped to the platform DOM element."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Custom component"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX tag in uppercase letters, such as "
            },
            {
              "type": "inlineCode",
              "value": "<GalleryCard />"
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
              "value": "React calls it as a component."
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
              "value": "TypeScript type does not exist after running"
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
              "value": "explains the boundaries of type checking and runtime behavior."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Module boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "between files via "
            },
            {
              "type": "inlineCode",
              "value": "import"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "export"
            },
            {
              "type": "text",
              "value": " connects to"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript module system"
            }
          ],
          [
            {
              "type": "text",
              "value": "supports real training file organization."
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
      "value": "TSX source file\n  -> TypeScript checks JSX and component usage\n  -> Vite and React plugin transform JSX\n  -> browser runs JavaScript modules\n  -> React calls function components\n  -> components return React UI descriptions\n  -> React DOM updates browser DOM"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Key boundary:"
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
                  "value": "JSX is the source code layer syntax, not the browser's native syntax."
                }
              ]
            }
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
                  "value": "{}"
                },
                {
                  "type": "text",
                  "value": " contains the result of JavaScript expression."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX attribute is a prop that React DOM can understand, not a pure HTML string copy."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Function component is JavaScript function, but React requires uppercase naming, pure return of UI description, and composability."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript can check TSX writing and component input, but the type will not be retained in the browser runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite only processes files imported into the module diagram; real practice files will not be automatically displayed on the page if they are not referenced by the entrance."
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
                  "value": "Current "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " is already a Sudoku application, including "
                },
                {
                  "type": "inlineCode",
                  "value": "useState"
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
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "useMemo"
                },
                {
                  "type": "text",
                  "value": " and other subsequent chapters. Chapter 2 should not continue to be filled with JSX basic exercises in this file."
                }
              ]
            }
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
                  "value": "src/learning/react/chapter-02-jsx-and-components/"
                },
                {
                  "type": "text",
                  "value": " isolates learning exercises to avoid interfering with existing applications."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "is divided into categories according to core concepts instead of naming them according to \"the first few examples\"."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The file name must express the knowledge points and practice goals."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Future chapters can be naturally expanded to "
                },
                {
                  "type": "inlineCode",
                  "value": "chapter-03-props"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "chapter-04-state"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "chapter-05-effects"
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
      "value": "vite_ts/\n  index.html\n  package.json\n  tsconfig.json\n  tsconfig.app.json\n  tsconfig.node.json\n  vite.config.ts\n  src/\n    main.tsx\n    App.tsx\n    App.css\n    index.css\n    leaderboard.ts\n    sudoku.ts\n    assets/\n      react.svg"
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
                  "value": "src/main.tsx"
                },
                {
                  "type": "text",
                  "value": " is the React root entry of Vite browser app."
                }
              ]
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
                  "value": " is currently a Sudoku application and is not suitable as the entire exercise file for Chapter 2."
                }
              ]
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
                  "value": "src/leaderboard.ts"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "src/sudoku.ts"
                },
                {
                  "type": "text",
                  "value": " belongs to the current application logic and is not the target of this chapter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Chapter 2 practice suggestions added to "
                },
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-02-jsx-and-components/"
                },
                {
                  "type": "text",
                  "value": ", as a learning code area."
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
      "value": "docs/\n  react/\n    chapter-01-react-introduction/\n      react-chapter-01-learning-guide.md\n    chapter-02-jsx-and-components/\n      react-chapter-02-learning-guide.md"
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
          "value": "This chapter recommends creating the following real practice files. They are not the source code files automatically created this time, but files that should be created or replaced when you follow this chapter."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Real practice structure",
      "value": "src/\n  App.tsx\n  learning/\n    react/\n      chapter-02-jsx-and-components/\n        jsx-source-boundary/\n          jsx-expression-values.tsx\n          jsx-attribute-boundary.tsx\n          jsx-child-values.tsx\n        component-basics/\n          component-name-boundary.tsx\n          component-module-composition.tsx\n        jsx-component-gallery/\n          gallery-topic-data.ts\n          gallery-badge.tsx\n          gallery-card.tsx\n          gallery-section.tsx\n          jsx-component-gallery.tsx\n          jsx-component-gallery.css"
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
                  "value": "jsx-source-boundary/"
                },
                {
                  "type": "text",
                  "value": ": Focus on practicing JSX syntax, attributes, and children to avoid confusion with component splitting issues."
                }
              ]
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
                  "value": "component-basics/"
                },
                {
                  "type": "text",
                  "value": ": Focus on component naming, import, export and combination."
                }
              ]
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
                  "value": "jsx-component-gallery/"
                },
                {
                  "type": "text",
                  "value": ": final mini project directory, retaining complete static page implementation."
                }
              ]
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
                  "value": ": It is only used as the entrance adaptation file to link the final mini project to the current Vite app, and is not used as a storage area for the knowledge points of this chapter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "does not use "
                },
                {
                  "type": "inlineCode",
                  "value": "example.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "demo.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "test.tsx"
                },
                {
                  "type": "text",
                  "value": ", because these names do not help with review."
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
          "value": "This chapter will still use a small number of snippets to explain errors and comparisons. They do not need to be created as real files."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets:\n  Snippet: JSX statement mistake\n  Snippet: object child mistake\n  Snippet: lowercase component mistake\n  Snippet: TypeScript erased type boundary"
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
          "value": "final mini project uses "
        },
        {
          "type": "inlineCode",
          "value": "jsx-component-gallery/"
        },
        {
          "type": "text",
          "value": " and passed "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " is temporarily mounted to the current Vite app."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "final mini project structure",
      "value": "src/\n  App.tsx\n  learning/\n    react/\n      chapter-02-jsx-and-components/\n        jsx-component-gallery/\n          gallery-topic-data.ts\n          gallery-badge.tsx\n          gallery-card.tsx\n          gallery-section.tsx\n          jsx-component-gallery.tsx\n          jsx-component-gallery.css"
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
          "value": "Only the study guide document will be created this time, and "
        },
        {
          "type": "inlineCode",
          "value": "src"
        },
        {
          "type": "text",
          "value": " exercise file. When you actually practice the code in section 12, run:"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If only the exercise file was created but not from "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " or other portals import them, Vite will not display them on the page. When actually running the small project, you need to replace "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " is a thin adapter."
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
      "id": "91-jsx-is-source-level-ui-description-syntax",
      "children": [
        {
          "type": "text",
          "value": "9.1 JSX Is Source-Level UI Description Syntax"
        }
      ]
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
          "value": "JSX is the UI description syntax of JavaScript / TypeScript source code layer, not the browser's native HTML. What the browser finally executes is JavaScript converted by the tool chain."
        }
      ]
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
          "value": "This section solves \"Why "
        },
        {
          "type": "inlineCode",
          "value": ".tsx"
        },
        {
          "type": "text",
          "value": " can be written in the file "
        },
        {
          "type": "inlineCode",
          "value": "<section>"
        },
        {
          "type": "text",
          "value": ", but the browser does not recognize TSX\" problem. What you see is the development source code; what the browser sees is the JavaScript module processed by the Vite and React plug-ins."
        }
      ]
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
          "value": "JSX is to put render logic and markup in the same component. React official documentation emphasizes that as interactions become more complex, the content is increasingly determined by JavaScript logic, so React puts rendering logic and markup inside the component."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JSX looks like HTML, but it's stricter:"
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
                  "value": "component can only return a root node or a Fragment."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "tag must be closed."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Most attributes use camelCase."
                }
              ]
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
                  "value": "class"
                },
                {
                  "type": "text",
                  "value": " is written as "
                },
                {
                  "type": "inlineCode",
                  "value": "className"
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
                  "value": "for"
                },
                {
                  "type": "text",
                  "value": " is written as "
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
                  "value": "{}"
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
            "value": "Boundary"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / TSX is the source code syntax."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser runs the converted JavaScript and does not run TSX."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX will become React element / React node description."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript Check JSX attribute and component usage."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Framework convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component returns JSX description UI."
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
              "value": "is finally updated by React DOM browser DOM."
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
          "value": "Current project "
        },
        {
          "type": "inlineCode",
          "value": "tsconfig.app.json"
        },
        {
          "type": "text",
          "value": " in "
        },
        {
          "type": "inlineCode",
          "value": "jsx: \"react-jsx\""
        },
        {
          "type": "text",
          "value": " indicates that TSX will be processed using React automatic JSX runtime. Vite's React plugin is also involved in developing transitions and Fast Refresh. You don't need to write the conversion process by hand, but you must know that the source code is not the browser's native syntax."
        }
      ]
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
                  "value": "JSX must return a root."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX tag must be closed."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX attribute uses naming supported by React DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TSX file uses "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " extension."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
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
                  "value": "jsx: \"react-jsx\""
                }
              ]
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
                  "value": ".tsx"
                }
              ]
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
                }
              ]
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
                  "value": "htmlFor"
                }
              ]
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
                  "value": "style"
                }
              ]
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
      "value": "Conceptual snippets in this section:\n  Snippet: JSX statement mistake\n  Snippet: JSX transform mental model"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Real practice file:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-expression-values.tsx",
      "value": "const courseName = \"React\";\nconst chapterNumber = 2;\nconst isPracticeReady = true;\nconst topics = [\"JSX\", \"Components\", \"TypeScript\"];\n\nfunction formatTopicCount(count: number) {\n  return `${count} topics`;\n}\n\nexport function JsxExpressionValues() {\n  return (\n    <section className=\"practice-panel\">\n      <h2>{courseName}</h2>\n      <p>Chapter {chapterNumber}</p>\n      <p>{isPracticeReady ? \"Practice ready\" : \"Practice pending\"}</p>\n      <p>{formatTopicCount(topics.length)}</p>\n    </section>\n  );\n}"
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
                  "value": "courseName"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "chapterNumber"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "isPracticeReady"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "topics"
                },
                {
                  "type": "text",
                  "value": " is a common JavaScript / TypeScript value."
                }
              ]
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
                  "value": "formatTopicCount"
                },
                {
                  "type": "text",
                  "value": " is a normal function, which returns string."
                }
              ]
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
                  "value": "JsxExpressionValues"
                },
                {
                  "type": "text",
                  "value": " is a function component because it starts with uppercase and returns JSX."
                }
              ]
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
                  "value": "{courseName}"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "{chapterNumber}"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "{... ? ... : ...}"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "{formatTopicCount(...)}"
                },
                {
                  "type": "text",
                  "value": " are all JSX expressions."
                }
              ]
            }
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
                  "value": "count: number"
                },
                {
                  "type": "text",
                  "value": ", but "
                },
                {
                  "type": "inlineCode",
                  "value": "number"
                },
                {
                  "type": "text",
                  "value": " type does not appear in the browser runtime."
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
              "value": "operating mode:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is the real practice file for this chapter. To display it, you need to import and render it in a mounted component. The final mini project will demonstrate the complete mounting method."
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
      "label": "Browser UI",
      "value": "React\nChapter 2\nPractice ready\n3 topics"
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
                  "value": "Vite handles "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " module."
                }
              ]
            }
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
                  "value": "count"
                },
                {
                  "type": "text",
                  "value": " and how to use JSX."
                }
              ]
            }
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
                  "value": "JsxExpressionValues()"
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
                  "value": "function returns UI description."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM Insert text into the real DOM."
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
                  "type": "text",
                  "value": "These values are static module-scope values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component reads them when called and does not change them."
                }
              ]
            }
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
                  "value": "{}"
                },
                {
                  "type": "text",
                  "value": " only reads the expression result and does not automatically save the state."
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
          "value": "because of "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " will enter the JavaScript expression position. React reads the expression result and puts the renderable result into the UI description."
        }
      ]
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
        }
      ]
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
          "value": " statement is not an expression and cannot be placed directly in JSX "
        },
        {
          "type": "inlineCode",
          "value": "{}"
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
      "label": "Snippet: JSX statement mistake",
      "value": "export function StatementMistake() {\n  return <p>{if (true) \"Ready\"}</p>;\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: JSX syntax error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Violation of the rules: JSX "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "if"
        },
        {
          "type": "text",
          "value": " is statement. You can use ternary expression instead."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: JSX expression correction",
      "value": "export function StatementCorrection() {\n  return <p>{true ? \"Ready\" : \"Pending\"}</p>;\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: if "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " is internally like a \"statement flow\" instead of generating a value, and usually cannot be put directly into a JSX expression."
        }
      ]
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
          "value": "Current "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": ", such as "
        },
        {
          "type": "inlineCode",
          "value": "{puzzle.displayDate}"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "${completionPercent}%"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "leaderboard.map(...)"
        },
        {
          "type": "text",
          "value": ". This chapter only studies the expression entry and does not delve into list render and state."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section lays the foundation for subsequent props, state, and event processing, because these mechanisms will eventually bring the JavaScript value into JSX."
        }
      ]
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
          "value": "JSX "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " is not a \"small script area\", but a JavaScript expression location."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-how-jsx-attributes-differ-from-html-attributes",
      "children": [
        {
          "type": "text",
          "value": "9.2 How JSX Attributes Differ from HTML Attributes"
        }
      ]
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
          "value": "JSX attribute is similar to HTML attribute, but is not a pure HTML copy. React DOM will update the real DOM attribute or property based on JSX props."
        }
      ]
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
          "value": "This section addresses the most common problems when copying from HTML to JSX: "
        },
        {
          "type": "inlineCode",
          "value": "class"
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
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "style"
        },
        {
          "type": "text",
          "value": " and boolean attribute are written in different ways."
        }
      ]
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
          "value": "React DOM states that all built-in browser components support several common props. JSX attributes are input to the React DOM, not the browser's raw HTML text."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Key difference:"
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
                  "value": "class"
                },
                {
                  "type": "text",
                  "value": " -> "
                },
                {
                  "type": "inlineCode",
                  "value": "className"
                }
              ]
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
                  "value": "for"
                },
                {
                  "type": "text",
                  "value": " -> "
                },
                {
                  "type": "inlineCode",
                  "value": "htmlFor"
                }
              ]
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
                  "value": "style"
                },
                {
                  "type": "text",
                  "value": " receives object, not CSS string"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "boolean attribute uses boolean expression"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Most DOM property/event props use camelCase"
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
            "value": "Boundary"
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
              "type": "text",
              "value": "attribute is written on the JSX tag."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "style"
            },
            {
              "type": "text",
              "value": " is an object, and props are also object-like inputs."
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
              "value": "Check "
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
              "value": "className"
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
              "value": " and other prop types."
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
              "type": "text",
              "value": "Apply props to the DOM."
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
              "value": "Finally see the real DOM attribute/property."
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
          "value": "JSX "
        },
        {
          "type": "inlineCode",
          "value": "<label htmlFor=\"topic\">"
        },
        {
          "type": "text",
          "value": " is converted into a React element description. React DOM maps it to the associated behavior of the browser label when committing. "
        },
        {
          "type": "inlineCode",
          "value": "style={{ color: \"red\" }}"
        },
        {
          "type": "text",
          "value": " Middle and outer layers "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " enters JavaScript expression, inner layer "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " is object literal."
        }
      ]
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
                  "value": "className=\"name\""
                }
              ]
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
                  "value": "htmlFor=\"input-id\""
                }
              ]
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
                  "value": "style={{ propertyName: value }}"
                }
              ]
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
                  "value": "disabled={condition}"
                }
              ]
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
                  "value": "aria-*"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "data-*"
                },
                {
                  "type": "text",
                  "value": " is usually kept in lowercase hyphen form."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
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
                  "value": "className"
                }
              ]
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
                  "value": "htmlFor"
                }
              ]
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
                  "value": "style"
                }
              ]
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
                  "value": "disabled"
                }
              ]
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
                  "value": "aria-label"
                }
              ]
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
                  "value": "data-*"
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
      "value": "Conceptual snippets in this section:\n  Snippet: HTML attribute copied into JSX\n  Snippet: style string mistake"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Real practice file:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-attribute-boundary.tsx",
      "value": "const topicInputId = \"chapter-topic\";\nconst isInputDisabled = false;\n\nexport function JsxAttributeBoundary() {\n  return (\n    <section className=\"practice-panel\" aria-labelledby=\"attribute-title\">\n      <h2 id=\"attribute-title\">JSX attribute boundary</h2>\n\n      <label className=\"field-label\" htmlFor={topicInputId}>\n        Topic\n      </label>\n\n      <input\n        aria-label=\"Topic name\"\n        className=\"text-input\"\n        data-practice-id=\"jsx-attribute-boundary\"\n        disabled={isInputDisabled}\n        id={topicInputId}\n        style={{ borderColor: \"#28715f\" }}\n        type=\"text\"\n        defaultValue=\"JSX attributes\"\n      />\n    </section>\n  );\n}"
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
                  "value": "topicInputId"
                },
                {
                  "type": "text",
                  "value": " is JavaScript string, replaced by "
                },
                {
                  "type": "inlineCode",
                  "value": "htmlFor"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "id"
                },
                {
                  "type": "text",
                  "value": " shared."
                }
              ]
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
                  "value": " is a JSX/React DOM prop that ultimately affects the DOM class."
                }
              ]
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
                  "value": "htmlFor"
                },
                {
                  "type": "text",
                  "value": " corresponds to HTML label "
                },
                {
                  "type": "inlineCode",
                  "value": "for"
                },
                {
                  "type": "text",
                  "value": " associated."
                }
              ]
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
                  "value": "disabled={isInputDisabled}"
                },
                {
                  "type": "text",
                  "value": " is passed in boolean, not string."
                }
              ]
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
                  "value": "style={{ borderColor: \"#28715f\" }}"
                },
                {
                  "type": "text",
                  "value": " Incoming object."
                }
              ]
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
                  "value": "aria-label"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "data-practice-id"
                },
                {
                  "type": "text",
                  "value": " maintains the HTML attribute style."
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
              "value": "operating mode:"
            }
          ]
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
      "label": "Browser UI",
      "value": "JSX attribute boundary\nTopic\nJSX attributes"
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
                  "value": "TypeScript Check JSX attribute name and type."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React executes "
                },
                {
                  "type": "inlineCode",
                  "value": "JsxAttributeBoundary()"
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
                  "value": "React DOM creates label and input."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser by "
                },
                {
                  "type": "inlineCode",
                  "value": "htmlFor"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "id"
                },
                {
                  "type": "text",
                  "value": " associates label and input."
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
                  "value": "topicInputId"
                },
                {
                  "type": "text",
                  "value": " is the same string value, read by two attributes."
                }
              ]
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
                  "value": "style"
                },
                {
                  "type": "text",
                  "value": " object is the object passed to the React DOM when creating the UI description."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "has no state and no DOM handwritten reference."
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
          "value": "React DOM understands these JSX props and synchronizes them to the real DOM. The browser finally handles platform behaviors such as label/input, style, disabled, etc."
        }
      ]
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: HTML attribute copied into JSX",
      "value": "export function AttributeMistake() {\n  return (\n    <label for=\"topic\" class=\"field-label\">\n      Topic\n    </label>\n  );\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: JSX/React DOM prop error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rules: "
        },
        {
          "type": "inlineCode",
          "value": "htmlFor"
        },
        {
          "type": "text",
          "value": ", CSS class uses "
        },
        {
          "type": "inlineCode",
          "value": "className"
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
      "label": "Snippet: JSX attribute correction",
      "value": "export function AttributeCorrection() {\n  return (\n    <label className=\"field-label\" htmlFor=\"topic\">\n      Topic\n    </label>\n  );\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: After copying the code from HTML to TSX, check "
        },
        {
          "type": "inlineCode",
          "value": "class"
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
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "style"
        },
        {
          "type": "text",
          "value": " and boolean attribute."
        }
      ]
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
          "value": "current Sudoku "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " has already used "
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
          "value": "aria-label"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "aria-selected"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "disabled"
        },
        {
          "type": "text",
          "value": ". In this chapter, these writing methods are extracted and practiced separately to avoid learning directly in the complex Sudoku logic."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The following props chapters will systematically learn component input. This section first explains clearly the attribute boundaries of the built-in DOM element."
        }
      ]
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
          "value": "JSX attribute is the props input of React DOM; the writing method is close to HTML, but the rules belong to JSX + React DOM."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-which-values-react-can-render-as-jsx-children",
      "children": [
        {
          "type": "text",
          "value": "9.3 Which Values React Can Render as JSX Children"
        }
      ]
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
          "value": "JSX child can render string, number, React element, renderable items in array, "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": " / boolean; ordinary objects cannot be rendered directly."
        }
      ]
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
          "value": "This section solves \"Why "
        },
        {
          "type": "inlineCode",
          "value": "{user}"
        },
        {
          "type": "text",
          "value": " reports error but "
        },
        {
          "type": "inlineCode",
          "value": "{user.name}"
        },
        {
          "type": "text",
          "value": " OK\" problem. JSX "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " can execute JavaScript expression, but the result of expression must also be a value that React can handle as a child."
        }
      ]
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
          "value": "JSX child is part of the UI tree generated by React. React needs to know how each child becomes DOM text, a DOM element, or empty content."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Commonly available render child:"
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
                  "value": "string"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "number"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX element"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "array of renderable values"
                }
              ]
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
                  "value": "null"
                }
              ]
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
                  "value": "undefined"
                }
              ]
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
                  "value": "true"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "false"
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
          "value": "cannot be rendered directly:"
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
                  "value": "Normal object"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "function object"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "symbol"
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
            "value": "Boundary"
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
              "value": "{value}"
            },
            {
              "type": "text",
              "value": " is legal syntax."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript runtime"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " will evaluate."
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
              "value": "evaluation result must be renderable child."
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
              "value": "Some child types can be checked, but runtime data may still be wrong."
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
              "value": "only sees the final DOM text or element."
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
          "value": "React gets the child value after executing component. string and number can be turned into text nodes; React elements can be processed recursively; "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " do not generate DOM; ordinary objects have no clear UI expression, so they cannot be used as children directly."
        }
      ]
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
          "value": "There is no new API in this section, the focus is on the runtime boundaries of React child."
        }
      ]
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
                  "value": "children"
                }
              ]
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
                  "value": "ReactNode"
                }
              ]
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
                  "value": "ReactElement"
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
          "value": "This chapter only recognizes these terms and does not go into type definitions."
        }
      ]
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
      "value": "Conceptual snippets in this section:\n  Snippet: object child mistake\n  Snippet: object child correction"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Real practice file:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-child-values.tsx",
      "value": "const learner = {\n  name: \"Mia\",\n  role: \"React learner\",\n};\n\nconst skills = [\"JSX\", \"Components\", \"TypeScript\"];\n\nexport function JsxChildValues() {\n  return (\n    <section className=\"practice-panel\">\n      <h2>{learner.name}</h2>\n      <p>{learner.role}</p>\n      <p>{skills.length}</p>\n      <p>{null}</p>\n      <p>{false}</p>\n      <div>\n        {skills.map((skill) => (\n          <span className=\"skill-pill\" key={skill}>\n            {skill}\n          </span>\n        ))}\n      </div>\n    </section>\n  );\n}"
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
                  "value": "learner"
                },
                {
                  "type": "text",
                  "value": " is object, but only render "
                },
                {
                  "type": "inlineCode",
                  "value": "learner.name"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "learner.role"
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
                  "value": "skills.length"
                },
                {
                  "type": "text",
                  "value": " is number and can be rendered."
                }
              ]
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
                  "value": "{null}"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "{false}"
                },
                {
                  "type": "text",
                  "value": " does not produce visible DOM text."
                }
              ]
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
                  "value": "skills.map(...)"
                },
                {
                  "type": "text",
                  "value": " returns React elements array."
                }
              ]
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
                  "value": "key={skill}"
                },
                {
                  "type": "text",
                  "value": " is the value used to identify elements when the array is rendered. This chapter only appears lightly and does not delve into the list chapters."
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
              "value": "operating mode:"
            }
          ]
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
      "label": "Browser UI",
      "value": "Mia\nReact learner\n3\nJSX Components TypeScript"
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
                  "value": "React calls "
                },
                {
                  "type": "inlineCode",
                  "value": "JsxChildValues()"
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
                  "value": "reads the object attribute and array length."
                }
              ]
            }
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
                  "value": "skills"
                },
                {
                  "type": "text",
                  "value": " executes "
                },
                {
                  "type": "inlineCode",
                  "value": "map"
                },
                {
                  "type": "text",
                  "value": ", get React element array."
                }
              ]
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
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "false"
                },
                {
                  "type": "text",
                  "value": " is treated as empty content."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM submission text and "
                },
                {
                  "type": "inlineCode",
                  "value": "span"
                },
                {
                  "type": "text",
                  "value": " element."
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
                  "value": "learner"
                },
                {
                  "type": "text",
                  "value": " object has not been changed."
                }
              ]
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
                  "value": "skills.map"
                },
                {
                  "type": "text",
                  "value": " creates a new array without changing the original array."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React element is a UI description, not a real DOM node."
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
          "value": "React child render is the expression result. The object attribute is a string and can be rendered; the object itself has no default UI representation and cannot be rendered directly."
        }
      ]
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: object child mistake",
      "value": "const learner = {\n  name: \"Mia\",\n};\n\nexport function ObjectChildMistake() {\n  return <p>{learner}</p>;\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: React runtime error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Rule violation: ordinary object is not a renderable child."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: object child correction",
      "value": "const learner = {\n  name: \"Mia\",\n};\n\nexport function ObjectChildCorrection() {\n  return <p>{learner.name}</p>;\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: When you see the \"Objects are not valid as a React child\" error, check JSX "
        },
        {
          "type": "inlineCode",
          "value": "{}"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "In the current Sudoku project, "
        },
        {
          "type": "inlineCode",
          "value": "board.map(...)"
        },
        {
          "type": "text",
          "value": " returns the button array, "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " is number or null. It relies on the child renderable value bounds."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Subsequent props, state, and list render will all encounter the child boundary. Chapter 2: First establish the \"Can be put into "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " is not equal to the judgment that \"can render\"."
        }
      ]
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
          "value": "JSX child depends on two issues: whether it can be evaluated grammatically, and whether the React runtime can render the evaluation result."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-why-custom-component-names-must-start-with-a-capital-letter",
      "children": [
        {
          "type": "text",
          "value": "9.4 Why Custom Component Names Must Start with a Capital Letter"
        }
      ]
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
          "value": "JSX The lowercase tag represents the platform's built-in element, such as "
        },
        {
          "type": "inlineCode",
          "value": "<section>"
        },
        {
          "type": "text",
          "value": "; uppercase tag indicates a custom component, such as "
        },
        {
          "type": "inlineCode",
          "value": "<TopicCard />"
        },
        {
          "type": "text",
          "value": ". Custom components must start with a capital letter, otherwise React will not call it by component."
        }
      ]
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
          "value": "This section solves \"Why "
        },
        {
          "type": "inlineCode",
          "value": "topicCard()"
        },
        {
          "type": "text",
          "value": " is a function, but "
        },
        {
          "type": "inlineCode",
          "value": "<topicCard />"
        },
        {
          "type": "text",
          "value": " does not run as a component\" problem. React needs to distinguish DOM elements and custom components through JSX tag naming."
        }
      ]
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
          "value": "Function component is JavaScript function, but not all functions will be regarded as components by React. React components also need to adhere to conventions such as naming, returning React nodes, and being used by JSX."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Two JSX tags:"
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
                  "value": "<section>"
                },
                {
                  "type": "text",
                  "value": ": Lowercase, React DOM thinks it is a browser DOM element."
                }
              ]
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
                  "value": "<TopicCard />"
                },
                {
                  "type": "text",
                  "value": ": uppercase, React considers it to be a component reference and needs to call "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicCard"
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
            "value": "Boundary"
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
              "value": "Component is the function value."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "uppercase tag indicates custom component."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component function uses PascalCase."
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
              "value": "Checks whether component is available as a JSX component."
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
              "value": "doesn't know "
            },
            {
              "type": "inlineCode",
              "value": "TopicCard"
            },
            {
              "type": "text",
              "value": ", only the DOM generated by React DOM is seen."
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
          "value": "JSX conversion, the lowercase tag is usually expressed in string form, such as "
        },
        {
          "type": "inlineCode",
          "value": "\"section\""
        },
        {
          "type": "text",
          "value": "; uppercase tag uses variable reference, such as "
        },
        {
          "type": "inlineCode",
          "value": "TopicCard"
        },
        {
          "type": "text",
          "value": ". This is why case determines how React understands tags."
        }
      ]
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
                  "value": "custom component uses PascalCase."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Component function returns React node."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Component can be default export or named export."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section does not cover fixed APIs, the focus is on the component naming convention."
        }
      ]
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
      "value": "Conceptual snippets in this section:\n  Snippet: lowercase component mistake\n  Snippet: capitalized component correction"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Real practice file:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/component-basics/component-name-boundary.tsx",
      "value": "function TopicCard() {\n  return (\n    <article className=\"topic-card\">\n      <h2>Component naming</h2>\n      <p>Custom components use PascalCase names.</p>\n    </article>\n  );\n}\n\nexport function ComponentNameBoundary() {\n  return (\n    <section className=\"practice-panel\">\n      <TopicCard />\n    </section>\n  );\n}"
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
                  "value": "TopicCard"
                },
                {
                  "type": "text",
                  "value": " is the JavaScript function."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "It starts with a capital case so it can be used as a React custom component."
                }
              ]
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
                  "value": "<TopicCard />"
                },
                {
                  "type": "text",
                  "value": " refers to the function value in JSX."
                }
              ]
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
                  "value": "ComponentNameBoundary"
                },
                {
                  "type": "text",
                  "value": " combines "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicCard"
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
              "value": "operating mode:"
            }
          ]
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
      "label": "Browser UI",
      "value": "Component naming\nCustom components use PascalCase names."
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
                  "value": "React calls "
                },
                {
                  "type": "inlineCode",
                  "value": "ComponentNameBoundary()"
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
                  "value": "The return value contains "
                },
                {
                  "type": "inlineCode",
                  "value": "<TopicCard />"
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
                  "value": "TopicCard"
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
                  "value": "React calls "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicCard()"
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
                  "value": "React DOM render "
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
                  "value": "TopicCard"
                },
                {
                  "type": "text",
                  "value": " is function binding."
                }
              ]
            }
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
                  "value": "<TopicCard />"
                },
                {
                  "type": "text",
                  "value": " uses this function reference."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The class instance was not created and the state was not saved."
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
          "value": "React converts "
        },
        {
          "type": "inlineCode",
          "value": "TopicCard"
        },
        {
          "type": "text",
          "value": " is called as component. The JSX returned by component continues to be processed by React."
        }
      ]
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
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: lowercase component mistake",
      "value": "function topicCard() {\n  return <article>Component naming</article>;\n}\n\nexport function LowercaseComponentMistake() {\n  return <topicCard />;\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: React component convention error / JSX typing error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rules: custom component must start with a capital letter. Lowercase tags will be treated as intrinsic elements."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: capitalized component correction",
      "value": "function TopicCard() {\n  return <article>Component naming</article>;\n}\n\nexport function CapitalizedComponentCorrection() {\n  return <TopicCard />;\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: If the custom component is not executed and TypeScript says that the JSX intrinsic element does not exist, first check whether the component name is capitalized."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "GameMetric"
        },
        {
          "type": "text",
          "value": " is an uppercase function and passed "
        },
        {
          "type": "inlineCode",
          "value": "<GameMetric />"
        },
        {
          "type": "text",
          "value": ". It is a real-life application of the rules of this section."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The subsequent props chapter will make "
        },
        {
          "type": "inlineCode",
          "value": "<TopicCard title=\"...\" />"
        },
        {
          "type": "text",
          "value": " becomes systematic. Now just understand the relationship between uppercase tags and function references."
        }
      ]
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
          "value": "Function component is the function value; JSX uppercase tag tells React \"the component is to be called here\"."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-component-file-naming-imports-exports-and-composition",
      "children": [
        {
          "type": "text",
          "value": "9.5 Component File Naming, Imports, Exports, and Composition"
        }
      ]
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
          "value": "Starting from Chapter 2, component files should be named according to knowledge points and responsibilities, instead of calling all contents "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "example.tsx"
        },
        {
          "type": "text",
          "value": ". The file name, export name, and import path together form the review map."
        }
      ]
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
          "value": "This section solves the problem of \"the component can be written, but the file becomes more and more messy\". Real exercises require scalable structures, otherwise Chapter 3 props, Chapter 4 state, and Chapter 5 effects will be difficult to review."
        }
      ]
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
          "value": "JavaScript module system allows components to be split into multiple files. React component composition allows these function components to be combined into a UI tree. TypeScript Provides checks for import/export when used with the JSX component."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter uses the named export priority practice method:"
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
                  "value": "export function ComponentName()"
                }
              ]
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
                  "value": "import { ComponentName } from \"./component-file\""
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
          "value": "Reason:"
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
                  "value": "learning stage, you can clearly see which exercise components are exported from the file."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component name and file name can jointly express knowledge points."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "will be easier to locate when migrating or renaming it in the future."
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
          "value": "It's not that default export is wrong. Current project "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " uses default export, which is a common way of writing Vite starter. Using named export for learning exercise files is more conducive to reviewing multiple small components side by side."
        }
      ]
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
            "value": "Boundary"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Module syntax"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "export"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "import"
            },
            {
              "type": "text",
              "value": " connection file."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "The imported function is used as a component."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser executes Vite converted ESM modules."
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
              "value": "Check the export name, import name, path and JSX component type."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite only handles imported files in module diagrams."
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
          "value": "ComponentModuleComposition"
        },
        {
          "type": "text",
          "value": " import other components, Vite will add these files to the module diagram. React render "
        },
        {
          "type": "inlineCode",
          "value": "<TopicSummary />"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "TopicSummary"
        },
        {
          "type": "text",
          "value": " function and read its return value."
        }
      ]
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
                  "value": "A file can export one or more components."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The file name uses kebab-case to express the theme, such as "
                },
                {
                  "type": "inlineCode",
                  "value": "component-module-composition.tsx"
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
                  "value": "Component is named PascalCase, for example "
                },
                {
                  "type": "inlineCode",
                  "value": "ComponentModuleComposition"
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
                  "value": "Import path should point to a real file."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
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
                  "value": "export"
                }
              ]
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
                  "value": "import"
                }
              ]
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
                  "value": "from"
                }
              ]
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
                  "value": "default"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section mainly uses real practice files and does not require additional concept snippets."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Real practice file:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/component-basics/component-module-composition.tsx",
      "value": "type TopicSummaryProps = {\n  title: string;\n  summary: string;\n};\n\nfunction TopicSummary({ title, summary }: TopicSummaryProps) {\n  return (\n    <article className=\"topic-summary\">\n      <h2>{title}</h2>\n      <p>{summary}</p>\n    </article>\n  );\n}\n\nexport function ComponentModuleComposition() {\n  return (\n    <section className=\"practice-panel\">\n      <h1>Component module composition</h1>\n      <TopicSummary\n        summary=\"JSX describes UI from JavaScript values.\"\n        title=\"JSX\"\n      />\n      <TopicSummary\n        summary=\"Components are functions with React naming and return conventions.\"\n        title=\"Components\"\n      />\n    </section>\n  );\n}"
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
                  "value": "TopicSummaryProps"
                },
                {
                  "type": "text",
                  "value": " is TypeScript type, which is only used during the inspection phase."
                }
              ]
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
                  "value": "TopicSummary"
                },
                {
                  "type": "text",
                  "value": " receives a props object. The props are slightly previewed here, but not systematically expanded."
                }
              ]
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
                  "value": "ComponentModuleComposition"
                },
                {
                  "type": "text",
                  "value": " combines two "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicSummary"
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
                  "value": "summary"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "title"
                },
                {
                  "type": "text",
                  "value": " attribute for custom components will go into the props object."
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
              "value": "operating mode:"
            }
          ]
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
      "label": "Browser UI",
      "value": "Component module composition\nJSX\nJSX describes UI from JavaScript values.\nComponents\nComponents are functions with React naming and return conventions."
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
                  "value": "Vite Load "
                },
                {
                  "type": "inlineCode",
                  "value": "component-module-composition.tsx"
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
                  "value": "TypeScript Check "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicSummaryProps"
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
                  "value": "ComponentModuleComposition()"
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
                  "value": "React met "
                },
                {
                  "type": "inlineCode",
                  "value": "<TopicSummary />"
                },
                {
                  "type": "text",
                  "value": ", call "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicSummary()"
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
                  "value": "React DOM render the final DOM tree."
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
                  "value": "TopicSummary"
                },
                {
                  "type": "text",
                  "value": " is an internal function reference."
                }
              ]
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
                  "value": "title"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "summary"
                },
                {
                  "type": "text",
                  "value": " is a property in props object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript type does not enter runtime."
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
          "value": "Component composition allows one component to return another component. React will continue to expand components until it gets a DOM element description."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "If the file name is "
        },
        {
          "type": "inlineCode",
          "value": "example.tsx"
        },
        {
          "type": "text",
          "value": " can run in the short term, but during long-term review you cannot know from the file name that it is practicing module composition."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "common mistakes: The export name and import name are inconsistent."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: named import mismatch",
      "value": "import { ComponentComposition } from \"./component-module-composition\";"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "error reason: the real export name is "
        },
        {
          "type": "inlineCode",
          "value": "ComponentModuleComposition"
        },
        {
          "type": "text",
          "value": ", not "
        },
        {
          "type": "inlineCode",
          "value": "ComponentComposition"
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
          "value": "Correction:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: named import correction",
      "value": "import { ComponentModuleComposition } from \"./component-module-composition\";"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: When you see module export related errors, check whether the file path, export method, and import name are consistent."
        }
      ]
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
          "value": "The current project already has "
        },
        {
          "type": "inlineCode",
          "value": "leaderboard.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "sudoku.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": ". Chapter 2 begins by incorporating the React component exercises into the same clear file organization."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Chapter 3 props will use component input objects more systematically. Now let's experience component composition using lightweight props."
        }
      ]
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
          "value": "The file name helps review, the export name helps import, and the component name helps React identify; the three should jointly express the same learning goals."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-what-typescript-checks-in-tsx",
      "children": [
        {
          "type": "text",
          "value": "9.6 What TypeScript Checks in TSX"
        }
      ]
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
          "value": "TypeScript Check JSX syntax, attribute type, component props usage, module import/export in TSX, but the type will be erased at runtime."
        }
      ]
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
          "value": "This section solves the misunderstanding of \"Will TypeScript protect me in the browser?\" TypeScript finds many errors in advance, but the browser runtime does not carry the TypeScript type."
        }
      ]
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
          "value": "React official TypeScript document description TypeScript can be used with JSX, TypeScript Handbook description JSX is embeddable XML-like syntax, and the output is controlled through the compiler option. Current project "
        },
        {
          "type": "inlineCode",
          "value": "noEmit: true"
        },
        {
          "type": "text",
          "value": " means "
        },
        {
          "type": "inlineCode",
          "value": "tsc"
        },
        {
          "type": "text",
          "value": " is used for checking, the actual build output is taken care of by Vite."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Concept explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript This chapter can help you check:"
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
                  "value": "style"
                },
                {
                  "type": "text",
                  "value": " is the correct object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "custom component has passed the required props."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "import exists."
                }
              ]
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
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " JSX Is the syntax valid?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "intrinsic element attribute is available."
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
          "value": "TypeScript cannot be done automatically:"
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
                  "value": "Verify unknown data from API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "retains "
                },
                {
                  "type": "inlineCode",
                  "value": "type"
                },
                {
                  "type": "text",
                  "value": " alias."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "determines how ordinary objects are rendered into UI for React."
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
            "value": "Boundary"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "TypeScript syntax"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "type TopicSummaryProps = ..."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check props and JSX attributes."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Emitted JS"
            }
          ],
          [
            {
              "type": "text",
              "value": "type will be erased."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runs JavaScript value."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Tooling"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "npm run build"
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "inlineCode",
              "value": "tsc -b"
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "inlineCode",
              "value": "vite build"
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
          "value": "TypeScript Read "
        },
        {
          "type": "inlineCode",
          "value": ".tsx"
        },
        {
          "type": "text",
          "value": ", parses JSX and types, gives IDE / "
        },
        {
          "type": "inlineCode",
          "value": "tsc"
        },
        {
          "type": "text",
          "value": " Diagnosis. After the type check is passed, the runtime is still JavaScript function, object, array, string, number."
        }
      ]
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
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " is for TypeScript files containing JSX."
                }
              ]
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
                  "value": "type"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "interface"
                },
                {
                  "type": "text",
                  "value": " is used for static checking."
                }
              ]
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
                  "value": "as"
                },
                {
                  "type": "text",
                  "value": " is a type assertion, not a runtime verification."
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
              "value": "Fixed attribute name/Fixed method name/Parameter signature:"
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
                  "value": "jsx"
                }
              ]
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
                  "value": "react-jsx"
                }
              ]
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
                  "value": "noEmit"
                }
              ]
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
                  "value": "strict"
                }
              ]
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
                  "value": "moduleResolution"
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
      "value": "Conceptual snippets in this section:\n  Snippet: missing prop type error\n  Snippet: TypeScript erased type boundary"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section reuses "
        },
        {
          "type": "inlineCode",
          "value": "component-module-composition.tsx"
        },
        {
          "type": "text",
          "value": " in "
        },
        {
          "type": "inlineCode",
          "value": "TopicSummaryProps"
        },
        {
          "type": "text",
          "value": ". The following are the problems that will be checked by TypeScript:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: missing prop type error",
      "value": "type TopicSummaryProps = {\n  title: string;\n  summary: string;\n};\n\nfunction TopicSummary({ title, summary }: TopicSummaryProps) {\n  return (\n    <article>\n      <h2>{title}</h2>\n      <p>{summary}</p>\n    </article>\n  );\n}\n\nexport function MissingPropExample() {\n  return <TopicSummary title=\"JSX\" />;\n}"
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
                  "value": "summary"
                },
                {
                  "type": "text",
                  "value": " in "
                },
                {
                  "type": "inlineCode",
                  "value": "TopicSummaryProps"
                },
                {
                  "type": "text",
                  "value": " is a required string."
                }
              ]
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
                  "value": "<TopicSummary title=\"JSX\" />"
                },
                {
                  "type": "text",
                  "value": " is missing "
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
                  "value": "TypeScript This component usage error can be found before running."
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
              "value": "operating mode:"
            }
          ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "will change with the TypeScript version, but the core meaning is that "
        },
        {
          "type": "inlineCode",
          "value": "summary"
        },
        {
          "type": "text",
          "value": " attribute."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Error",
      "value": "Property 'summary' is missing."
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
                  "value": "tsc -b"
                },
                {
                  "type": "text",
                  "value": " Read project references."
                }
              ]
            }
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
                  "value": ".tsx"
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
                  "value": "Found component props incomplete."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "build failed before Vite production build."
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
              "value": "Variable and reference changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "has no runtime variable changes because the error occurs at compile time."
        }
      ]
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
          "value": "TypeScript Use "
        },
        {
          "type": "inlineCode",
          "value": "TopicSummaryProps"
        },
        {
          "type": "text",
          "value": " Check the usage of JSX component and found that required attributes are missing."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "TypeScript type does not automatically validate runtime JSON."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: TypeScript erased type boundary",
      "value": "type GalleryTopic = {\n  title: string;\n};\n\nconst parsedTopic = JSON.parse('{\"title\": 42}') as GalleryTopic;\n\nconsole.log(parsedTopic.title.toUpperCase());"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: runtime error risk."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Violation of the rules: "
        },
        {
          "type": "inlineCode",
          "value": "as GalleryTopic"
        },
        {
          "type": "text",
          "value": " is just a type assertion, not a runtime verification. "
        },
        {
          "type": "inlineCode",
          "value": "title"
        },
        {
          "type": "text",
          "value": " may actually be number."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: data comes from JSON, network, URL, localStorage, and when user inputs, do not treat TypeScript type as runtime validator."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "LeaderboardEntry"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "SudokuBoard"
        },
        {
          "type": "text",
          "value": " help check native code, but if the data comes from external input, runtime guard is still required."
        }
      ]
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Chapter 3 props will discuss the component input type more systematically. This section only establishes TSX checking and type erasure boundaries."
        }
      ]
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
          "value": "TypeScript helps you check TSX before running; only JavaScript value is left in the browser runtime."
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
              "value": ".tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript syntax / tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "contains the JSX file TypeScript."
            }
          ],
          [
            {
              "type": "text",
              "value": "in "
            },
            {
              "type": "inlineCode",
              "value": ".ts"
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
              "value": "{expression}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "inserts JavaScript expression in JSX."
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
            },
            {
              "type": "text",
              "value": " statement."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "className"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "Set DOM class."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "class"
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
              "value": "htmlFor"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "associates label and input."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "for"
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
              "value": "style={{ ... }}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes in the style object."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as CSS string."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "disabled={boolean}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "passes in boolean attribute."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "\"false\""
            },
            {
              "type": "text",
              "value": " string."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<section>"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX intrinsic element"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create browser DOM element description."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it was a custom component."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<TopicCard />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX custom component"
            }
          ],
          [
            {
              "type": "text",
              "value": "refers to and calls the component function."
            }
          ],
          [
            {
              "type": "text",
              "value": "component name is lowercase."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "export function Name()"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript module / React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "exports an importable component."
            }
          ],
          [
            {
              "type": "text",
              "value": "The export name and import name are inconsistent."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "import { Name } from \"...\";"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript module"
            }
          ],
          [
            {
              "type": "text",
              "value": "import named export."
            }
          ],
          [
            {
              "type": "text",
              "value": "is confused with default export."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "type Props = ..."
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
              "value": "Description component input object."
            }
          ],
          [
            {
              "type": "text",
              "value": "thinks type exists at runtime."
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
              "value": "JSX uses "
            },
            {
              "type": "inlineCode",
              "value": "if"
            },
            {
              "type": "text",
              "value": " inside "
            },
            {
              "type": "inlineCode",
              "value": "{}"
            }
          ],
          [
            {
              "type": "text",
              "value": "Syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX braces require expression, not statement."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use ternary or compute value before return."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "{}"
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
              "value": "JSX uses "
            },
            {
              "type": "inlineCode",
              "value": "class"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX uses "
            },
            {
              "type": "inlineCode",
              "value": "className"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "className"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Copy from HTML to TSX."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX uses "
            },
            {
              "type": "inlineCode",
              "value": "for"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX uses "
            },
            {
              "type": "inlineCode",
              "value": "htmlFor"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "htmlFor"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "label/input An error occurred after copying the code."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "style=\"...\""
            },
            {
              "type": "text",
              "value": " in JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript / React DOM"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "style"
            },
            {
              "type": "text",
              "value": " expects object."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "style={{ color: \"red\" }}"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "style prop type error."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object rendered as child"
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
              "value": "Render object property."
            }
          ],
          [
            {
              "type": "text",
              "value": "Error says object child is invalid."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Lowercase custom component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React convention / TypeScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "Custom components must be capitalized."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use PascalCase."
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX intrinsic element diagnostic."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Missing prop"
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
              "value": "Required prop is absent."
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass the required prop or make it optional."
            }
          ],
          [
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
              "value": "Import/export mismatch"
            }
          ],
          [
            {
              "type": "text",
              "value": "Module / tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Imported name is not exported."
            }
          ],
          [
            {
              "type": "text",
              "value": "Align export and import forms."
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite or TypeScript module error."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Generic file names everywhere"
            }
          ],
          [
            {
              "type": "text",
              "value": "Learning workflow"
            }
          ],
          [
            {
              "type": "text",
              "value": "File name does not reveal knowledge point."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use concept-specific directory and file names."
            }
          ],
          [
            {
              "type": "text",
              "value": "Later review cannot locate the topic."
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
          "value": "JSX Component Gallery"
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
          "value": "is to use multiple small components to form a static React page, showing:"
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
                  "value": "JSX expression."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX attribute."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX child."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Component composition."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript type checking."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "CSS class and React DOM."
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
          "value": "does not use state, effects, routers, external UI libraries, or data fetching."
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
          "value": "This project puts all the boundaries of this chapter into a static page. It is not intended to do complex interactions, but to allow you to see the basic operating model of React clearly from the file structure, component combination and TSX code."
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
      "value": "src/\n  App.tsx\n  learning/\n    react/\n      chapter-02-jsx-and-components/\n        jsx-component-gallery/\n          gallery-topic-data.ts\n          gallery-badge.tsx\n          gallery-card.tsx\n          gallery-section.tsx\n          jsx-component-gallery.tsx\n          jsx-component-gallery.css"
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
              "value": "Thin adapter; is only responsible for linking this chapter gallery to the current Vite app."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-topic-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "static data and type definitions; exhibits TypeScript compile-time boundaries."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-badge.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "small display component; exercise className, children, props preview."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-card.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "card component; displays JSX expression, attribute, and boolean value."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-section.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "combine components; combine multiple cards into sections."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "project root component; combines all gallery UI."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "The style of this small project; showing CSS class and JSX "
            },
            {
              "type": "inlineCode",
              "value": "className"
            },
            {
              "type": "text",
              "value": " relationship."
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
      "value": "import { JsxComponentGallery } from \"./learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery\";\n\nexport default function App() {\n  return <JsxComponentGallery />;\n}"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-topic-data.ts",
      "value": "export type GalleryTopic = {\n  id: string;\n  title: string;\n  layer: \"syntax\" | \"runtime\" | \"type-system\" | \"tooling\";\n  summary: string;\n  isCore: boolean;\n};\n\nexport const galleryTopics: GalleryTopic[] = [\n  {\n    id: \"jsx-expression\",\n    title: \"JSX Expression\",\n    layer: \"syntax\",\n    summary: \"Curly braces read JavaScript expression results.\",\n    isCore: true,\n  },\n  {\n    id: \"jsx-attribute\",\n    title: \"JSX Attribute\",\n    layer: \"runtime\",\n    summary: \"React DOM maps JSX props to browser DOM updates.\",\n    isCore: true,\n  },\n  {\n    id: \"component-composition\",\n    title: \"Component Composition\",\n    layer: \"runtime\",\n    summary: \"Components combine function return values into a UI tree.\",\n    isCore: true,\n  },\n  {\n    id: \"tsx-checking\",\n    title: \"TSX Checking\",\n    layer: \"type-system\",\n    summary: \"TypeScript checks component usage before runtime.\",\n    isCore: false,\n  },\n];"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-badge.tsx",
      "value": "type GalleryBadgeProps = {\n  children: string;\n  isHighlighted?: boolean;\n};\n\nexport function GalleryBadge({ children, isHighlighted = false }: GalleryBadgeProps) {\n  const badgeClassName = isHighlighted ? \"gallery-badge highlighted\" : \"gallery-badge\";\n\n  return <span className={badgeClassName}>{children}</span>;\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-card.tsx",
      "value": "import type { GalleryTopic } from \"./gallery-topic-data\";\nimport { GalleryBadge } from \"./gallery-badge\";\n\ntype GalleryCardProps = {\n  topic: GalleryTopic;\n};\n\nexport function GalleryCard({ topic }: GalleryCardProps) {\n  const cardClassName = topic.isCore ? \"gallery-card core-topic\" : \"gallery-card\";\n\n  return (\n    <article className={cardClassName} data-topic-id={topic.id}>\n      <div className=\"gallery-card-header\">\n        <GalleryBadge isHighlighted={topic.isCore}>{topic.layer}</GalleryBadge>\n        <span aria-label=\"Core topic\">{topic.isCore ? \"Core\" : \"Support\"}</span>\n      </div>\n\n      <h2>{topic.title}</h2>\n      <p>{topic.summary}</p>\n    </article>\n  );\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-section.tsx",
      "value": "import type { GalleryTopic } from \"./gallery-topic-data\";\nimport { GalleryCard } from \"./gallery-card\";\n\ntype GallerySectionProps = {\n  heading: string;\n  topics: GalleryTopic[];\n};\n\nexport function GallerySection({ heading, topics }: GallerySectionProps) {\n  return (\n    <section className=\"gallery-section\" aria-labelledby=\"gallery-section-title\">\n      <h1 id=\"gallery-section-title\">{heading}</h1>\n      <div className=\"gallery-grid\">\n        {topics.map((topic) => (\n          <GalleryCard key={topic.id} topic={topic} />\n        ))}\n      </div>\n    </section>\n  );\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.tsx",
      "value": "import { galleryTopics } from \"./gallery-topic-data\";\nimport { GallerySection } from \"./gallery-section\";\nimport \"./jsx-component-gallery.css\";\n\nconst coreTopicCount = galleryTopics.filter((topic) => topic.isCore).length;\n\nexport function JsxComponentGallery() {\n  return (\n    <main className=\"gallery-page\">\n      <header className=\"gallery-hero\">\n        <p className=\"eyebrow\">React Chapter 02</p>\n        <h1>JSX Component Gallery</h1>\n        <p>\n          This static page shows JSX expressions, attributes, children, component\n          composition, TypeScript checking, and CSS class boundaries.\n        </p>\n        <p>{coreTopicCount} core topics are highlighted.</p>\n      </header>\n\n      <GallerySection heading=\"Chapter concepts\" topics={galleryTopics} />\n    </main>\n  );\n}"
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.css",
      "value": ".gallery-page {\n  width: min(1080px, 100%);\n  margin: 0 auto;\n  padding: 48px 24px;\n}\n\n.gallery-hero {\n  display: grid;\n  gap: 12px;\n  margin-bottom: 28px;\n}\n\n.eyebrow {\n  margin: 0;\n  color: #28715f;\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.gallery-hero h1 {\n  margin: 0;\n  color: #172033;\n  font-size: clamp(2.3rem, 7vw, 4.5rem);\n  line-height: 1;\n}\n\n.gallery-hero p {\n  max-width: 760px;\n  margin: 0;\n  color: #4c5870;\n  font-size: 1.04rem;\n}\n\n.gallery-section {\n  display: grid;\n  gap: 18px;\n}\n\n.gallery-section h1 {\n  margin: 0;\n  color: #172033;\n  font-size: 1.6rem;\n}\n\n.gallery-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 14px;\n}\n\n.gallery-card {\n  display: grid;\n  gap: 12px;\n  min-width: 0;\n  padding: 16px;\n  border: 1px solid #d7dde8;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.core-topic {\n  border-color: #28715f;\n}\n\n.gallery-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.gallery-card h2 {\n  margin: 0;\n  color: #172033;\n  font-size: 1.12rem;\n}\n\n.gallery-card p {\n  margin: 0;\n  color: #4c5870;\n}\n\n.gallery-badge {\n  width: fit-content;\n  border-radius: 999px;\n  background: #eef2f7;\n  color: #4c5870;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  padding: 5px 9px;\n  text-transform: uppercase;\n}\n\n.gallery-badge.highlighted {\n  background: #effaf6;\n  color: #28715f;\n}\n\n@media (max-width: 860px) {\n  .gallery-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 560px) {\n  .gallery-page {\n    padding: 28px 16px;\n  }\n\n  .gallery-grid {\n    grid-template-columns: 1fr;\n  }\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "After creating or replacing the real file listed in section 12 run:"
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
      "type": "code",
      "language": "txt",
      "label": "Browser UI",
      "value": "React Chapter 02\nJSX Component Gallery\n3 core topics are highlighted.\nChapter concepts\nJSX Expression\nJSX Attribute\nComponent Composition\nTSX Checking"
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
          "value": "React runtime does:"
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
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " Return to "
                },
                {
                  "type": "inlineCode",
                  "value": "<JsxComponentGallery />"
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
                  "value": "JsxComponentGallery()"
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
                  "value": "JsxComponentGallery"
                },
                {
                  "type": "text",
                  "value": " reads "
                },
                {
                  "type": "inlineCode",
                  "value": "galleryTopics"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "coreTopicCount"
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
                  "value": "React met "
                },
                {
                  "type": "inlineCode",
                  "value": "<GallerySection />"
                },
                {
                  "type": "text",
                  "value": ", continue to call "
                },
                {
                  "type": "inlineCode",
                  "value": "GallerySection()"
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
                  "value": "GallerySection"
                },
                {
                  "type": "text",
                  "value": " uses "
                },
                {
                  "type": "inlineCode",
                  "value": "topics.map(...)"
                },
                {
                  "type": "text",
                  "value": " generates multiple "
                },
                {
                  "type": "inlineCode",
                  "value": "<GalleryCard />"
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
                  "value": "GalleryCard"
                },
                {
                  "type": "text",
                  "value": " calls "
                },
                {
                  "type": "inlineCode",
                  "value": "GalleryBadge"
                },
                {
                  "type": "text",
                  "value": ", combined into the final UI tree."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM commits the UI tree to the browser DOM."
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
          "value": "TypeScript compile time does:"
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
                  "value": "Check "
                },
                {
                  "type": "inlineCode",
                  "value": "GalleryTopic"
                },
                {
                  "type": "text",
                  "value": " in union type "
                },
                {
                  "type": "inlineCode",
                  "value": "layer"
                },
                {
                  "type": "text",
                  "value": " Whether to use only allowed values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Check "
                },
                {
                  "type": "inlineCode",
                  "value": "GalleryCard"
                },
                {
                  "type": "text",
                  "value": " receive "
                },
                {
                  "type": "inlineCode",
                  "value": "topic"
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
                  "value": "Check "
                },
                {
                  "type": "inlineCode",
                  "value": "GalleryBadge"
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
                  "value": " is string."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Check whether the import/export name and path are correct."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "type check is completed, the type definition is erased at runtime."
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
          "value": "JSX What the toolchain does:"
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
                  "value": "TSX source code is parsed by TypeScript / Vite / React plugin."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX is converted into the JavaScript calling form."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser executes the converted module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser does not execute raw JSX directly."
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
            "value": "How to Recognize"
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
              "type": "inlineCode",
              "value": "Cannot find module ..."
            }
          ],
          [
            {
              "type": "text",
              "value": "import path is inconsistent with the real file structure."
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite overlay or TypeScript module diagnostic."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check the path against the final mini project structure."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Property 'topic' is missing"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "GalleryCard"
            },
            {
              "type": "text",
              "value": " There was no transmission "
            },
            {
              "type": "inlineCode",
              "value": "topic"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript props error."
            }
          ],
          [
            {
              "type": "text",
              "value": "incoming "
            },
            {
              "type": "inlineCode",
              "value": "topic={topic}"
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
              "value": "Type '\"other\"' is not assignable..."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "layer"
            },
            {
              "type": "text",
              "value": " is not in union type."
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript literal union error."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses "
            },
            {
              "type": "inlineCode",
              "value": "\"syntax\""
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "\"runtime\""
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "\"type-system\""
            },
            {
              "type": "text",
              "value": " or "
            },
            {
              "type": "inlineCode",
              "value": "\"tooling\""
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
              "value": "Page has no gallery styles"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not import CSS."
            }
          ],
          [
            {
              "type": "text",
              "value": "page has text but no style."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
            },
            {
              "type": "inlineCode",
              "value": "import \"./jsx-component-gallery.css\""
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
              "value": "Object child runtime error"
            }
          ],
          [
            {
              "type": "text",
              "value": "render topic object directly."
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser console points to invalid React child."
            }
          ],
          [
            {
              "type": "text",
              "value": "render "
            },
            {
              "type": "inlineCode",
              "value": "topic.title"
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
              "value": "Lowercase component tag"
            }
          ],
          [
            {
              "type": "text",
              "value": "Custom component name in lowercase."
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX intrinsic element error."
            }
          ],
          [
            {
              "type": "text",
              "value": "is changed to PascalCase."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Extensions allowed in this chapter:"
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
                  "value": "adds a "
                },
                {
                  "type": "inlineCode",
                  "value": "JSX Children"
                },
                {
                  "type": "text",
                  "value": " gallery card."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "adds a "
                },
                {
                  "type": "inlineCode",
                  "value": "CSS Class Boundary"
                },
                {
                  "type": "text",
                  "value": " gallery card."
                }
              ]
            }
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
                  "value": "galleryTopics"
                },
                {
                  "type": "text",
                  "value": " in "
                },
                {
                  "type": "inlineCode",
                  "value": "layer"
                },
                {
                  "type": "text",
                  "value": " Split into a more strict union type."
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
          "value": "Do not extend state, effect, router, data fetching, Redux, Next.js or tests in this chapter."
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
          "value": "JSX is the source code layer UI description syntax; function component is JavaScript function plus React component convention; starting from Chapter 2, real practice files named according to knowledge points should be used instead of piling all the content into "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
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
              "value": "{expression}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "inserts the result of JavaScript expression."
            }
          ],
          [
            {
              "type": "text",
              "value": "into "
            },
            {
              "type": "inlineCode",
              "value": "if"
            },
            {
              "type": "text",
              "value": " statement."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "className"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "set class."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "class"
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
              "value": "htmlFor"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "associates label and input."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
            },
            {
              "type": "inlineCode",
              "value": "for"
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
              "value": "style={{ ... }}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / object model"
            }
          ],
          [
            {
              "type": "text",
              "value": "Set inline style object."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as style string."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "disabled={value}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / React DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "sets boolean attribute."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written as "
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
              "value": "<Component />"
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
              "value": "uses custom component."
            }
          ],
          [
            {
              "type": "text",
              "value": "component name is lowercase."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "export function Component()"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript module"
            }
          ],
          [
            {
              "type": "text",
              "value": "export named component."
            }
          ],
          [
            {
              "type": "text",
              "value": "and default import are mixed."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "type Props = ..."
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
              "value": "Check component input."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought the runtime would verify."
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
              "value": "JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "HTML"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX is the source code syntax; HTML is the browser document language."
            }
          ],
          [
            {
              "type": "text",
              "value": "Do not copy HTML attributes directly."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript statement"
            }
          ],
          [
            {
              "type": "text",
              "value": "expression produces a value; statement controls the flow."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "{}"
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
              "value": "className"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "class"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX prop has different name than HTML attribute."
            }
          ],
          [
            {
              "type": "text",
              "value": "TSX Write in "
            },
            {
              "type": "inlineCode",
              "value": "className"
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
              "value": "Component function"
            }
          ],
          [
            {
              "type": "text",
              "value": "Ordinary function"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component adheres to React naming and return conventions."
            }
          ],
          [
            {
              "type": "text",
              "value": "custom component uses PascalCase."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime value"
            }
          ],
          [
            {
              "type": "text",
              "value": "type is erased; value runtime exists."
            }
          ],
          [
            {
              "type": "text",
              "value": "External data requires runtime check."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Concept snippet"
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
              "value": "snippet explanation mechanism; real file needs to be created and runnable."
            }
          ],
          [
            {
              "type": "text",
              "value": "Snippet uses logical titles and real files use paths."
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
              "type": "inlineCode",
              "value": "if"
            },
            {
              "type": "text",
              "value": " inside JSX braces"
            }
          ],
          [
            {
              "type": "text",
              "value": "syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX braces need expression."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use ternary or precomputed value."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "class"
            },
            {
              "type": "text",
              "value": " in JSX"
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
              "value": "React DOM uses "
            },
            {
              "type": "inlineCode",
              "value": "className"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use "
            },
            {
              "type": "inlineCode",
              "value": "className"
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
              "value": "object as child"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "Plain object is not renderable child."
            }
          ],
          [
            {
              "type": "text",
              "value": "Render object property."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "lowercase component"
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
              "value": "Custom component uses PascalCase."
            }
          ],
          [
            {
              "type": "text",
              "value": "Rename to uppercase component."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "missing prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "type system"
            }
          ],
          [
            {
              "type": "text",
              "value": "Required prop not provided."
            }
          ],
          [
            {
              "type": "text",
              "value": "Pass required prop."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "generic filename"
            }
          ],
          [
            {
              "type": "text",
              "value": "learning workflow"
            }
          ],
          [
            {
              "type": "text",
              "value": "File name does not reveal topic."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use concept-specific names."
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
              "value": "JSX attribute conversion"
            }
          ],
          [
            {
              "type": "text",
              "value": "HTML examples often get copied into TSX."
            }
          ],
          [
            {
              "type": "text",
              "value": "Convert "
            },
            {
              "type": "inlineCode",
              "value": "class"
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
              "value": ", and "
            },
            {
              "type": "inlineCode",
              "value": "style"
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
              "value": "Static component composition"
            }
          ],
          [
            {
              "type": "text",
              "value": "Before state, UI can still be composed from components."
            }
          ],
          [
            {
              "type": "text",
              "value": "Split by responsibility, not by random example number."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript props preview"
            }
          ],
          [
            {
              "type": "text",
              "value": "Components need input contracts."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use simple props only as preview in chapter 2."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Learning file organization"
            }
          ],
          [
            {
              "type": "text",
              "value": "Later chapters need reviewable practice history."
            }
          ],
          [
            {
              "type": "text",
              "value": "One concept directory, descriptive file names."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Final project mounting"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite needs imported modules to display UI."
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep "
            },
            {
              "type": "inlineCode",
              "value": "App.tsx"
            },
            {
              "type": "text",
              "value": " as a thin adapter."
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
      "label": "Template: static typed component",
      "value": "type StaticCardProps = {\n  title: string;\n  summary: string;\n};\n\nexport function StaticCard({ title, summary }: StaticCardProps) {\n  return (\n    <article className=\"static-card\">\n      <h2>{title}</h2>\n      <p>{summary}</p>\n    </article>\n  );\n}"
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
              "value": "docs/react/chapter-02-jsx-and-components/react-chapter-02-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 2 study guide document."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-expression-values.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercise JSX expression can be put into values."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-attribute-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Practice the difference between JSX attribute and HTML attribute."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-child-values.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise JSX child renderable value boundary."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/component-basics/component-name-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Exercise custom component uppercase naming boundaries."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/component-basics/component-module-composition.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "exercises component file, named export, composition."
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
              "value": "JSX Component Gallery"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-topic-data.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "gallery static data and TypeScript type."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-badge.tsx"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-card.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "card display component."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-section.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "section combination component."
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.tsx"
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
              "value": "src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.css"
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
                  "value": "Snippet: JSX statement mistake"
                }
              ]
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
                  "value": "Snippet: JSX expression correction"
                }
              ]
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
                  "value": "Snippet: HTML attribute copied into JSX"
                }
              ]
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
                  "value": "Snippet: JSX attribute correction"
                }
              ]
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
                  "value": "Snippet: object child mistake"
                }
              ]
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
                  "value": "Snippet: object child correction"
                }
              ]
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
                  "value": "Snippet: lowercase component mistake"
                }
              ]
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
                  "value": "Snippet: capitalized component correction"
                }
              ]
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
                  "value": "Snippet: named import mismatch"
                }
              ]
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
                  "value": "Snippet: named import correction"
                }
              ]
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
                  "value": "Snippet: missing prop type error"
                }
              ]
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
                  "value": "Snippet: TypeScript erased type boundary"
                }
              ]
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
                  "value": "Template: static typed component"
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
          "value": "suggests organizing the notes in this chapter into five cards:"
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
              "value": "JSX source boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX is not HTML, and browsers do not execute TSX directly."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX expression"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "{}"
            },
            {
              "type": "text",
              "value": ", and the result must also be renderable."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX attribute"
            }
          ],
          [
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
              "value": "htmlFor"
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
              "value": ", boolean attribute."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Component convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "capitalizes component, function return and composition."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "File organization"
            }
          ],
          [
            {
              "type": "text",
              "value": "is a concept and a directory, and the file name expresses learning goals."
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
          "value": "Each real practice file's notes answer three things:"
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
                  "value": "practice in this file?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Which file is it imported from?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript What to check and what does the React runtime do?"
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
                  "value": "JSX not browser native HTML?"
                }
              ]
            }
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
                  "value": "{}"
                },
                {
                  "type": "text",
                  "value": " and what cannot be placed directly?"
                }
              ]
            }
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
                  "value": "if"
                },
                {
                  "type": "text",
                  "value": " cannot be put directly into JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "{}"
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
                  "type": "inlineCode",
                  "value": "className"
                },
                {
                  "type": "text",
                  "value": " and HTML "
                },
                {
                  "type": "inlineCode",
                  "value": "class"
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
                  "type": "inlineCode",
                  "value": "htmlFor"
                },
                {
                  "type": "text",
                  "value": " and HTML "
                },
                {
                  "type": "inlineCode",
                  "value": "for"
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
                  "value": "JSX "
                },
                {
                  "type": "inlineCode",
                  "value": "style"
                },
                {
                  "type": "text",
                  "value": " object?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Boolean attribute Why should boolean be passed instead of "
                },
                {
                  "type": "inlineCode",
                  "value": "\"false\""
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
                  "value": "JSX child Which values can be rendered and which values cannot be rendered?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why can't ordinary objects be directly used as JSX children?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why does the custom component have to start with a capital letter?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Function component and ordinary function?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Named export and default export How to choose between learning files?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript What can I check in TSX?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript type not enter the runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why don't you continue to pile all the exercises into "
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
                  "value": "How can the real exercise structure of this chapter be extended to subsequent props, state, and effect chapters?"
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
      "value": "descriptive practice file\n  -> exports a PascalCase component\n  -> component returns JSX\n  -> JSX uses expressions, attributes, and children\n  -> TypeScript checks TSX before runtime\n  -> Vite transforms the module graph\n  -> React calls components\n  -> React DOM updates browser DOM"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Shortest version:"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JSX is the source code layer UI description; the component is JavaScript function plus React convention; TypeScript checks TSX but the runtime type is erased; Chapter 2 starts to save real exercises with descriptive directories and file names to facilitate long-term review of subsequent chapters."
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
          "value": "Recommended reading order:"
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
                  "value": "React: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/writing-markup-with-jsx",
                  "children": [
                    {
                      "type": "text",
                      "value": "Writing Markup with JSX"
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
                          "value": "focuses on JSX which is JavaScript syntax extension, the difference between JSX and HTML, single root node, label closure and camelCase."
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
                  "href": "https://react.dev/learn/javascript-in-jsx-with-curly-braces",
                  "children": [
                    {
                      "type": "text",
                      "value": "JavaScript in JSX with Curly Braces"
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
                          "value": "Focus on "
                        },
                        {
                          "type": "inlineCode",
                          "value": "{}"
                        },
                        {
                          "type": "text",
                          "value": ", and how double curlies represent object."
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
                  "href": "https://react.dev/learn/your-first-component",
                  "children": [
                    {
                      "type": "text",
                      "value": "Your First Component"
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
                          "value": "is JavaScript function, the component name is capitalized, and markup is returned."
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
                  "href": "https://react.dev/learn/importing-and-exporting-components",
                  "children": [
                    {
                      "type": "text",
                      "value": "Importing and Exporting Components"
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
                          "value": "focuses on default export, named export, file splitting and combination."
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
                  "href": "https://react.dev/learn/passing-props-to-a-component",
                  "children": [
                    {
                      "type": "text",
                      "value": "Passing Props to a Component"
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
                          "value": "This chapter only reads props, which are part of the component input object, and does not enter systematic props learning."
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
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM: "
                },
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
                          "value": "focus on common props, "
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
                          "value": "children"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "aria-*"
                        },
                        {
                          "type": "text",
                          "value": " and DOM component props."
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
                  "href": "https://react.dev/learn/typescript",
                  "children": [
                    {
                      "type": "text",
                      "value": "Using TypeScript"
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
                          "value": "focuses on TSX, "
                        },
                        {
                          "type": "inlineCode",
                          "value": "@types/react"
                        },
                        {
                          "type": "text",
                          "value": ", component typing boundary."
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
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Handbook: "
                },
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
                          "value": "Focus on JSX, which is embeddable syntax, "
                        },
                        {
                          "type": "inlineCode",
                          "value": ".tsx"
                        },
                        {
                          "type": "text",
                          "value": ", JSX emit."
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
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript TSConfig Reference: "
                },
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/tsconfig/#jsx",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "jsx"
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
                          "value": "Focus on "
                        },
                        {
                          "type": "inlineCode",
                          "value": "react-jsx"
                        },
                        {
                          "type": "text",
                          "value": " to the current project."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes",
                  "children": [
                    {
                      "type": "text",
                      "value": "HTML attribute reference"
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
                          "value": "focuses on HTML attribute which is a browser platform concept."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML",
                  "children": [
                    {
                      "type": "text",
                      "value": "Boolean attribute"
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
                          "value": "focuses on the difference between HTML boolean attribute and JSX boolean value."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "<label>"
                    },
                    {
                      "type": "text",
                      "value": " element"
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
                          "value": "Focus on the relationship between label and form control to understand "
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
                  "href": "https://vite.dev/guide/",
                  "children": [
                    {
                      "type": "text",
                      "value": "Getting Started"
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
                          "value": "focuses on Vite dev server, build command, module graph and "
                        },
                        {
                          "type": "inlineCode",
                          "value": "index.html"
                        },
                        {
                          "type": "text",
                          "value": " entrance."
                        }
                      ]
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
                          "value": "refers to "
                        },
                        {
                          "type": "inlineCode",
                          "value": "Meet the React Component"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "React JSX"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "React Component Instantiation"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "React DOM"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "TypeScript in React"
                        },
                        {
                          "type": "text",
                          "value": " related content."
                        }
                      ]
                    }
                  ]
                },
                {
                  "children": [
                    {
                      "type": "paragraph",
                      "children": [
                        {
                          "type": "text",
                          "value": "This PDF is multi-purpose "
                        },
                        {
                          "type": "inlineCode",
                          "value": "App.jsx"
                        },
                        {
                          "type": "text",
                          "value": " and single file tutorial path. This chapter is based on the TypeScript / TSX structure of the current project and the official React documentation, and does not mechanically copy its contents."
                        }
                      ]
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
                  "value": "This chapter only creates documents and does not actually create or run the source code file in section 12. During practice, you need to manually create the file and run "
                },
                {
                  "type": "inlineCode",
                  "value": "npm run dev"
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
                  "value": "Vite official website currently displays the latest documents; the current project dependency is "
                },
                {
                  "type": "inlineCode",
                  "value": "vite"
                },
                {
                  "type": "text",
                  "value": " "
                },
                {
                  "type": "inlineCode",
                  "value": "^7.2.4"
                },
                {
                  "type": "text",
                  "value": ". This chapter only uses the stable Vite dev server, module graph, and build concepts; if you write a Vite version-sensitive chapter later, you need to check it against the actual installed version of the project."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter02Content() {
  return <DocumentRenderer document={chapterDocument} />
}
