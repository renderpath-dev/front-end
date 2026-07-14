import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-01",
  "slug": "chapter-01-react-introduction",
  "title": "React Chapter 1: The React Application Boundary and Tooling",
  "sourcePath": "docs/react/chapter-01-react-introduction/react-chapter-01-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-1-the-react-application-boundary-and-tooling",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 1: The React Application Boundary and Tooling"
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
          "value": " learning project. It is placed in "
        },
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-01-react-introduction/"
        },
        {
          "type": "text",
          "value": ", the goal is to establish the first layer of React mental model, rather than learning the complete application architecture in advance."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter is suitable for learners who can already understand basic HTML, CSS, JavaScript function, object, module import/export, and are ready to enter React. It explains why React exists, how a React app is launched in the browser, "
        },
        {
          "type": "inlineCode",
          "value": "Vite"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "React"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "TypeScript"
        },
        {
          "type": "text",
          "value": " responsible for in the current project?"
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
                  "type": "text",
                  "value": "hooks, state, effect, context, reducer."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "router, Next.js, Redux, React Native, Vue."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Tailwind, CSS Modules, component library, and testing framework."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "server render, React Server Components, database, authentication, deployment."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "props"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "StrictMode"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "createRoot"
        },
        {
          "type": "text",
          "value": ", JSX conversion, but it is only used to illustrate the running boundary and does not go into the details of subsequent chapters."
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
                  "value": "react"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "react-dom"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "typescript"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "vite"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "@vitejs/plugin-react"
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
                  "value": "src/main.tsx"
                },
                {
                  "type": "text",
                  "value": " is the browser-side React portal."
                }
              ]
            }
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
                  "value": "<script type=\"module\" src=\"/src/main.tsx\"></script>"
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
          "value": "When you first learn React, it is easiest to mix different layers together:"
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
                  "value": "Think of React as a new HTML."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "treats JSX as the browser's native syntax."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "treats the TypeScript type error as a browser runtime error."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "treats Vite as React itself."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "mixes Next.js, React Native, React, and React DOM into the same thing."
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
          "value": "The core problem solved in this chapter is: you must first know where a React application enters the browser, who is responsible for translating, who is responsible for type checking, who is responsible for creating DOM updates, and which code will actually run in the browser."
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
          "type": "text",
          "value": "React is a JavaScript library used to build user interface (UI). It allows you to split the UI into components, use the JavaScript function to return the UI description, and then use React DOM to synchronize these descriptions to the browser DOM. TypeScript checks the type before running, Vite handles modules, translation and packaging during the development and build phases, and the browser ultimately executes JavaScript, HTML, CSS and Web API."
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
              "value": "HTML element"
            }
          ],
          [
            {
              "type": "text",
              "value": "React finally renders HTML elements that the browser can understand."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "CSS selector and class"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX Common "
            },
            {
              "type": "inlineCode",
              "value": "className"
            },
            {
              "type": "text",
              "value": " will eventually affect the class attribute in the browser."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript function"
            }
          ],
          [
            {
              "type": "text",
              "value": "React function component is essentially JavaScript function."
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
              "value": "JSX will create a React element object; component props are also object models."
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
              "value": "For current project ESM "
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
              "value": " connects to "
            },
            {
              "type": "inlineCode",
              "value": "main.tsx"
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
              "value": " and CSS files."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM is the browser DOM tree, not the TypeScript type system."
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
              "type": "inlineCode",
              "value": ".tsx"
            },
            {
              "type": "text",
              "value": " file only exists during the compilation check phase, and the browser will not run the TypeScript type."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Vite dev server"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "npm run dev"
            },
            {
              "type": "text",
              "value": " starts with Vite, which is responsible for providing development servers, module conversion and HMR."
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
          "value": "If you are not familiar with these concepts, you can still read this chapter, but it is recommended to go back to the basics and do small experiments while reading."
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
                  "value": "Explain exactly what React is in one sentence."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains why handwritten DOM updates tend to get out of control in complex UIs."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Explain why React uses components to organize UI."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "determines that JSX is a syntax extension, not the browser's native syntax."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains the relationship between React component and JavaScript function, object, module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Speak the current items in order from "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " to "
                },
                {
                  "type": "inlineCode",
                  "value": "src/main.tsx"
                },
                {
                  "type": "text",
                  "value": " to "
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
                  "type": "text",
                  "value": "distinguishes between React runtime behavior, TypeScript compile-time behavior, Vite tooling behavior, and browser platform API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains the relationship between React and HTML, CSS, JavaScript."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Description React is not equal to Next.js, nor is it equal to React Native."
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
          "value": "Recommended order:"
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
                  "value": "First understand the browser's native model: HTML becomes a DOM tree, CSS is responsible for style, and JavaScript changes the page through the DOM API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand the problems of traditional handwritten DOM updates: state and page are easily out of sync, and update logic is scattered."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand the core abstraction of React again: component is a way to break the UI into composable units."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand JSX again: it is a syntax extension for writing UI descriptions and requires tool conversion."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Understand the current project entrance again: "
                },
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
                  "value": "main.tsx"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "createRoot"
                },
                {
                  "type": "text",
                  "value": " takes over "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
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
                  "value": "finally understands the boundary: React is responsible for UI runtime, TypeScript is responsible for type checking, Vite is responsible for development server and construction, and the browser is responsible for executing the final JavaScript and DOM API."
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
          "value": "This sequence can avoid getting stuck in hooks, state management or routing at the beginning. The focus of the first chapter is to see the boundaries clearly."
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
              "value": "React"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript library for building UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "The main body of this chapter is responsible for organizing UI updates based on component descriptions."
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
              "value": "Render the React UI description to the browser DOM in package"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework runtime / platform bridge"
            }
          ],
          [
            {
              "type": "text",
              "value": "Current Web Project by "
            },
            {
              "type": "inlineCode",
              "value": "react-dom/client"
            },
            {
              "type": "text",
              "value": " 's "
            },
            {
              "type": "inlineCode",
              "value": "createRoot"
            },
            {
              "type": "text",
              "value": " accesses DOM."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Reusable and nestable UI unit"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework convention / JavaScript function"
            }
          ],
          [
            {
              "type": "text",
              "value": "React uses components as the basic organizational unit of the UI."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Function Component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime / framework convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "The current project mainly uses this modern component writing method."
            }
          ]
        ],
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
              "value": "writes the HTML-like markup syntax extension"
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
              "value": "browsers do not natively execute JSX and require TypeScript, Babel or Vite plug-ins for processing."
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
              "value": "TypeScript The file contains the file form"
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
              "value": "The current project entry and component files use "
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
        ],
        [
          [
            {
              "type": "text",
              "value": "React Element"
            }
          ],
          [
            {
              "type": "text",
              "value": "React is a common object used to describe the UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript runtime / React runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX will produce a React node / element description for render after conversion."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "The browser represents the document as a node tree Web API"
            }
          ],
          [
            {
              "type": "text",
              "value": "platform API"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM is to maintain the real DOM."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "createRoot"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create React root API"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "The current project starts React render from here."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "root.render"
            }
          ],
          [
            {
              "type": "text",
              "value": "render React node to root inside"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use it in the current project to render "
            },
            {
              "type": "inlineCode",
              "value": "<App />"
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
              "value": "Vite"
            }
          ],
          [
            {
              "type": "text",
              "value": "Front-end development server and build tool"
            }
          ],
          [
            {
              "type": "text",
              "value": "tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Responsible for dev server, module graph, HMR, production build."
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
              "value": "Static type checker and compilation tools for JavaScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "type system / tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Types are checked before running and eventually types are erased."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "jsx: \"react-jsx\""
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript JSX emit set"
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
              "value": "The current project uses automatic JSX runtime."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Next.js"
            }
          ],
          [
            {
              "type": "text",
              "value": "full-stack framework based on React"
            }
          ],
          [
            {
              "type": "text",
              "value": "framework above React"
            }
          ],
          [
            {
              "type": "text",
              "value": "It uses React, but is not equal to React."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React Native"
            }
          ],
          [
            {
              "type": "text",
              "value": "Technology for building native app using React model"
            }
          ],
          [
            {
              "type": "text",
              "value": "renderer / platform integration"
            }
          ],
          [
            {
              "type": "text",
              "value": "It uses React ideas, but the target is not the browser DOM."
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
          "value": "React The first layer of mental model can be compressed into four sentences:"
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
                  "value": "browser only recognizes HTML, CSS, JavaScript and Web APIs, and does not natively recognize JSX, TSX, and TypeScript types."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React component is JavaScript function, which returns UI description instead of directly handwriting a series of DOM operations."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM converts these UI descriptions into the creation and update of the browser DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite and TypeScript belong to the development/build toolchain; they help you write, inspect, and convert code, but are not the browser UI runtime itself."
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
          "value": "A little more detailed:"
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
                  "value": "HTML provides initial documentation and "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
                },
                {
                  "type": "text",
                  "value": " container."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite put "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " is used as the entrance, and "
                },
                {
                  "type": "inlineCode",
                  "value": "<script type=\"module\">"
                },
                {
                  "type": "text",
                  "value": ", put "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": ", CSS, and dependent modules are handed over to the browser or converter."
                }
              ]
            }
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
                  "value": ".ts"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": ".tsx"
                },
                {
                  "type": "text",
                  "value": " type, current project "
                },
                {
                  "type": "inlineCode",
                  "value": "noEmit: true"
                },
                {
                  "type": "text",
                  "value": " indicates that "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " outputs JS files."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React executes the component function and gets the React element tree."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM Commit the React element tree to the real DOM."
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
          "value": "This chapter involves four structures, please distinguish them clearly first:"
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
                  "value": "Current project structure: used to understand the current "
                },
                {
                  "type": "inlineCode",
                  "value": "Vite + React + TypeScript"
                },
                {
                  "type": "text",
                  "value": " project."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Document structure of this chapter: Used to describe the location of this study guide file."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "concept example structure: It is only used to explain the mechanism and does not mean that the file must be created."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "final mini project structure: only when you actually practice "
                },
                {
                  "type": "inlineCode",
                  "value": "React Component Rendering Demo"
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
          "value": "The current project structure is as follows:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "vite_ts/\n  index.html\n  package.json\n  tsconfig.app.json\n  vite.config.ts\n  src/\n    main.tsx\n    App.tsx\n    App.css\n    index.css"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The document structure of this chapter is as follows:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Document structure of this chapter",
      "value": "vite_ts/\n  docs/\n    react/\n      chapter-01-react-introduction/\n        react-chapter-01-learning-guide.md\n  references/\n    books/\r\n      react/\r\n        the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Current project responsibility description:"
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
                  "value": ": The first HTML document that the browser gets, including "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
                },
                {
                  "type": "text",
                  "value": " and module script entry."
                }
              ]
            }
          ]
        },
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
                  "value": ": browser entry point for React app."
                }
              ]
            }
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
                  "value": ": The root component file of the current application."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/index.css"
                },
                {
                  "type": "text",
                  "value": ": Global style."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/App.css"
                },
                {
                  "type": "text",
                  "value": ": current "
                },
                {
                  "type": "inlineCode",
                  "value": "App"
                },
                {
                  "type": "text",
                  "value": " component related styles."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "vite.config.ts"
                },
                {
                  "type": "text",
                  "value": ": Enable Vite React plugin."
                }
              ]
            }
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
                  "value": ": Constrain browser-side TypeScript/TSX code."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "docs/react/..."
                },
                {
                  "type": "text",
                  "value": ": Study documents and do not participate in application running."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "references/books/react/..."
                },
                {
                  "type": "text",
                  "value": ": Local React auxiliary data, does not participate in application operation."
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
          "value": "The examples in this chapter are mainly learning code blocks. If you want to put the small project in section 12 into the current project to run, use the existing command of the current project:"
        }
      ]
    },
    {
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm install\r\nnpm run dev"
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
          "value": "Current "
        },
        {
          "type": "inlineCode",
          "value": "package.json"
        },
        {
          "type": "text",
          "value": " in:"
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
                  "value": "npm run dev"
                },
                {
                  "type": "text",
                  "value": " run "
                },
                {
                  "type": "inlineCode",
                  "value": "vite"
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
                  "value": "npm run build"
                },
                {
                  "type": "text",
                  "value": " Run "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc -b"
                },
                {
                  "type": "text",
                  "value": ", then run "
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
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "npm run lint"
                },
                {
                  "type": "text",
                  "value": " run "
                },
                {
                  "type": "inlineCode",
                  "value": "eslint ."
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
                  "value": "npm run preview"
                },
                {
                  "type": "text",
                  "value": " Use Vite to preview the production build."
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
          "value": "Common reasons for startup failure:"
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
                  "value": "has no installed dependencies: you need to run "
                },
                {
                  "type": "inlineCode",
                  "value": "npm install"
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
                  "value": "Node.js version does not meet the current Vite version requirements."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "port is occupied: Vite will prompt you for available ports or require you to change ports."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript or ESLint error: This is a tool check failure, which does not mean that the browser has failed to run."
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
      "id": "91-what-react-is",
      "children": [
        {
          "type": "text",
          "value": "9.1 What React Is"
        }
      ]
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
          "value": "React is a JavaScript library for building user interfaces. It's not a browser, it's not HTML, it's not CSS, it's not TypeScript, it's not Vite, it's not a complete full-stack framework."
        }
      ]
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
          "value": "This section solves the misunderstanding of \"Is React a new language?\" React is not a new language, it runs on JavaScript; the main value of React is to organize complex UI with components and declarative render."
        }
      ]
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
          "value": "React provides a set of UI runtime and development conventions. You write a component, and the component returns a UI description that React can understand, and React then decides how to make the actual interface look like this."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The \"UI description\" here is not an HTML string. It is closer to the JavaScript object tree. JSX is the syntax for writing this tree."
        }
      ]
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
          "value": "A traditional Web page consists of three layers:"
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
                  "value": "HTML describes the structure."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "CSS describes the style."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript describes the interaction."
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
          "value": "When the interaction is simple, there is no problem in directly writing DOM operations. For example, to change a piece of text after clicking a button, you can use "
        },
        {
          "type": "inlineCode",
          "value": "textContent"
        },
        {
          "type": "text",
          "value": ". But when there's a lot of data in the UI, a lot of interactions, a lot of local updates, you need to remember \"what is the data now\" and \"what is the page showing now\". Once these two things are out of sync, bugs will appear."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React is: don't write \"every step of how to change the DOM\" by hand everywhere, but write \"what UI should be generated with the current data\". When the data changes, React re-runs the relevant components, compares the new UI description, and updates the real DOM."
        }
      ]
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
            "value": "In This Section"
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
              "value": "JSX / TSX is the syntax for you to write UI descriptions."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runs the component in the browser and React DOM updates the DOM."
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
              "value": "JSX will become a React element object, and DOM node is also an object."
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
              "value": "TypeScript The type of component and JSX can be checked, but the runtime type will be erased."
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
              "value": "component is PascalCase, and the React node is returned."
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
              "value": "DOM API is provided by the browser and is not part of React or TypeScript."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Tooling behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite and TypeScript convert the source code into browser executable JavaScript."
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
          "value": "React will not let the browser directly execute "
        },
        {
          "type": "inlineCode",
          "value": ".tsx"
        },
        {
          "type": "text",
          "value": ". In the current project:"
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
                  "value": "you write "
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
                  "value": "TypeScript Check type."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite and React plugins handle JSX/TSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "browser executes JavaScript module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React calls component function."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM updates the real DOM."
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
          "value": "There is no new React API in this section, the focus is on understanding the mechanism."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "IMPORTANT RULES:"
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
                  "value": "React component is a UI unit in the form of JavaScript function or class. This project uses function component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React is not a language; JSX is not a native browser language."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM is a Web DOM renderer; without React DOM, React itself will not automatically insert into the browser page."
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
          "value": "You only need to remember a few fixed names in this section:"
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
                  "value": "react"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "react-dom/client"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "createRoot"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "root.render"
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
      "value": "Conceptual snippets in this section:\n  Snippet: manual DOM update\n  Snippet: React component output\n  Snippet: JSX class mistake\n  Snippet: JSX class correction"
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
          "value": "Let's first look at an example of handwritten DOM update without using React to understand the problems that React wants to solve."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: manual DOM update",
      "value": "const rootElement = document.getElementById(\"root\");\r\n\r\nif (rootElement === null) {\r\n  throw new Error(\"Root element was not found.\");\r\n}\r\n\r\nconst titleElement = document.createElement(\"h1\");\r\ntitleElement.textContent = \"Hello DOM\";\r\n\r\nconst descriptionElement = document.createElement(\"p\");\r\ndescriptionElement.textContent = \"The page was updated by direct DOM calls.\";\r\n\r\nrootElement.append(titleElement, descriptionElement);"
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
                  "value": "document.getElementById(\"root\")"
                },
                {
                  "type": "text",
                  "value": " uses the browser DOM API to find the root element in HTML."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "if (rootElement === null)"
                },
                {
                  "type": "text",
                  "value": " handles the runtime situation where the DOM node cannot be found."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "document.createElement(\"h1\")"
                },
                {
                  "type": "text",
                  "value": " Create real DOM element."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "textContent"
                },
                {
                  "type": "text",
                  "value": " Modify the text content on the DOM node."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "append"
                },
                {
                  "type": "text",
                  "value": " Insert two DOM nodes into the root element."
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
          "value": "This code does not have React or JSX. It directly manipulates the browser DOM."
        }
      ]
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
          "value": "can be put into a Vite TypeScript entrance experiment, but this chapter does not require modification of the current source code. If you are experimenting alone, you can run:"
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
      "value": "Hello DOM\r\nThe page was updated by direct DOM calls."
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
                  "value": "browser parsing "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": ", create DOM tree."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript module is executed."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "code lookup "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
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
                  "value": "code creates a real DOM node."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "code inserts the DOM node into the page."
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
                  "value": "rootElement"
                },
                {
                  "type": "text",
                  "value": " is a variable binding that references the real DOM element created by the browser."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "titleElement"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "descriptionElement"
                },
                {
                  "type": "text",
                  "value": " is a newly created DOM object reference."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "append"
                },
                {
                  "type": "text",
                  "value": " Change the real DOM tree."
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
          "value": "output appears because JavaScript directly creates and inserts the DOM node. There is no intermediate React UI description and no component tree."
        }
      ]
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
          "value": "React version does not directly hand-write each DOM creation step, but returns a UI description."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: React component output",
      "value": "export default function App() {\r\n  return (\r\n    <main>\r\n      <h1>Hello React</h1>\r\n      <p>The page was described by a component.</p>\r\n    </main>\r\n  );\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This code describes \"what the UI should look like\" but does not directly call "
        },
        {
          "type": "inlineCode",
          "value": "document.createElement"
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "common mistake: Thinking that the React component returns HTML that the browser already knows."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: JSX class mistake",
      "value": "export default function App() {\r\n  return <h1 class=\"title\">Hello React</h1>;\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: JSX/React attribute rule error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "rules violated: JSX is closer to JavaScript, not native HTML; "
        },
        {
          "type": "inlineCode",
          "value": "class"
        },
        {
          "type": "text",
          "value": " should be written as "
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
      "label": "Snippet: JSX class correction",
      "value": "export default function App() {\r\n  return <h1 className=\"title\">Hello React</h1>;\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: If you copy HTML to JSX and an attribute name error occurs, check the difference between JSX and HTML first, such as "
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
          "value": ", self-closing label, single parent."
        }
      ]
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
          "value": "In real projects, React makes UI logic closer to the mapping of \"data to interface\". You don't write "
        },
        {
          "type": "inlineCode",
          "value": "document.querySelector"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "appendChild"
        },
        {
          "type": "text",
          "value": ", but dismantle the component, transfer data, and return JSX. Complex interactions still require understanding JavaScript, but the coordination of DOM updates is handled by the React runtime."
        }
      ]
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
          "value": "This section is the basis for subsequent hooks, state, and effect. Only by first knowing that the component will be called by React and return the UI description can we later understand \"why state changes trigger re-rendering\"."
        }
      ]
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
          "value": "React is not a new language replacement for HTML/CSS/JavaScript. React uses JavaScript to organize UI description and DOM update runtime and conventions."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-the-problem-react-solves-in-manual-dom-updates",
      "children": [
        {
          "type": "text",
          "value": "9.2 The Problem React Solves in Manual DOM Updates"
        }
      ]
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
          "value": "React solves is not \"the DOM API cannot be used\", but \"the difficulty in keeping data, structure and interaction synchronized with handwritten DOM updates in complex UIs\"."
        }
      ]
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
          "value": "When the page only has one button and a paragraph of text, handwritten DOM update is very straightforward. When the page has lists, forms, filters, asynchronous data, and data shared by multiple components, you must maintain a large number of DOM update paths yourself. React changes the problem to: describe the UI based on current data."
        }
      ]
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
          "value": "Traditional DOM writing is usually imperative: you tell the browser how to change it step by step. React is usually written in a declarative way: you describe what the UI should be in a certain state, and React is responsible for adjusting the DOM to the corresponding result."
        }
      ]
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
          "value": "Imperative DOM update The problem is not the syntax, but the scale:"
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
                  "value": "The same data may affect multiple DOM areas."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "An event may need to update text, button state, class, and list items."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "update paths there are, the easier it is to miss changes."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "page may be inconsistent with the data of JavaScript."
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
          "value": "React's component model splits the UI into smaller units, and each unit only describes the part it is responsible for. This makes it easier for you to locate the source of a certain piece of UI."
        }
      ]
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
            "value": "Imperative DOM"
          }
        ],
        [
          {
            "type": "text",
            "value": "React"
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
              "type": "inlineCode",
              "value": "document.createElement"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "append"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "textContent"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX / TSX"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript directly change DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "React executes component and is updated by React DOM DOM"
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
              "value": "DOM node object"
            }
          ],
          [
            {
              "type": "text",
              "value": "React element object + DOM node object"
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
              "value": "TypeScript can check the DOM API type"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript can check JSX and component types"
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
              "value": "No React Convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "component, PascalCase, root render"
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
              "value": "DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "eventually still falls to DOM API"
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
          "value": "React component returns the UI description. The React runtime can call the component repeatedly to get a new UI description, and then coordinate it with the previous result to the real DOM. The first chapter does not go into the reconciliation algorithm in depth, just remember: React allows you to move from \"manual DOM modification steps\" to \"declaring the current UI results\"."
        }
      ]
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
          "value": "There is no new API in this section, the focus is on understanding the boundaries between imperative and declarative."
        }
      ]
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
          "value": "handwritten DOM common fixed name:"
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
                  "value": "document.getElementById(id)"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "document.createElement(tagName)"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "node.textContent"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "parent.append(child)"
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
          "value": "React Common fixed name in this chapter:"
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
                  "value": "function App()"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "return (...)"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "<App />"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "root.render(<App />)"
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
      "value": "Conceptual snippets in this section:\n  Snippet: data to UI mapping\n  Snippet: object child mistake\n  Snippet: object child correction"
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
      "label": "Snippet: data to UI mapping",
      "value": "const courseName = \"React\";\r\nconst chapterName = \"Introduction\";\r\n\r\nexport default function App() {\r\n  return (\r\n    <main>\r\n      <h1>{courseName}</h1>\r\n      <p>{chapterName}</p>\r\n    </main>\r\n  );\r\n}"
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
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "chapterName"
                },
                {
                  "type": "text",
                  "value": " is the JavaScript string in module scope."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "App"
                },
                {
                  "type": "text",
                  "value": " is JavaScript function, which is also a React function component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "return (...)"
                },
                {
                  "type": "text",
                  "value": " returns a JSX expression."
                }
              ]
            }
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
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "{chapterName}"
                },
                {
                  "type": "text",
                  "value": " opens the JavaScript expression position in JSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React creates a UI description based on the JSX results and is rendered by the React DOM."
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
      "value": "React\r\nIntroduction"
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
                  "value": "Module is loaded, "
                },
                {
                  "type": "inlineCode",
                  "value": "courseName"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "chapterName"
                },
                {
                  "type": "text",
                  "value": " initialization."
                }
              ]
            }
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
                  "value": "<App />"
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
                  "value": "App()"
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
                  "value": "App()"
                },
                {
                  "type": "text",
                  "value": " returns the React element tree corresponding to JSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM Submit the results to "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
                },
                {
                  "type": "text",
                  "value": " internal."
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
                  "value": "courseName"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "chapterName"
                },
                {
                  "type": "text",
                  "value": " is bound to the string primitive."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX will not change the variable."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM will change the real DOM tree, but you do not directly hold the DOM node reference."
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
          "value": "output from "
        },
        {
          "type": "inlineCode",
          "value": "App()"
        },
        {
          "type": "text",
          "value": ". React is not "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " parses the HTML file, it executes the JavaScript module, calls the component function, and then updates the browser DOM with React DOM."
        }
      ]
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
          "value": "If object is returned directly, React cannot treat ordinary object as child render."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: object child mistake",
      "value": "const course = {\r\n  name: \"React\",\r\n};\r\n\r\nexport default function App() {\r\n  return <h1>{course}</h1>;\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React child can be renderable content such as string, number, React element, array, etc., but ordinary object cannot directly render text."
        }
      ]
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
          "value": "rules violated: JSX "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " can be placed in JavaScript expression, but the result of expression must be a value that React can render."
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
      "label": "Snippet: object child correction",
      "value": "const course = {\r\n  name: \"React\",\r\n};\r\n\r\nexport default function App() {\r\n  return <h1>{course.name}</h1>;\r\n}"
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
          "value": "The UI in real projects is usually driven by data. The value of React is that it allows you to map data to UI instead of hand-writing DOM operations at every data change point."
        }
      ]
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
          "value": "When you study state later, you will see how React re-executes components after data changes. Now let's understand \"component output UI description\"."
        }
      ]
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
          "value": "handwritten DOM update is \"step by step page change\". React components are \"describes the page based on current data\"."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-why-react-organizes-ui-around-components",
      "children": [
        {
          "type": "text",
          "value": "9.3 Why React Organizes UI Around Components"
        }
      ]
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
          "value": "React organizes the UI around components because modern UI is not a single page, but a set of interface units that are reusable, nestable, combinable, and independently understandable."
        }
      ]
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
          "value": "This section solves the problem of \"why not just write all JSX in one file\". A small demo can be written in a "
        },
        {
          "type": "inlineCode",
          "value": "App"
        },
        {
          "type": "text",
          "value": ", but when the project becomes larger, splitting it by component can reduce reading, reuse and maintenance costs."
        }
      ]
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
          "value": "React component is a UI unit that can be called by React. The current project mainly uses function component. Function component is a function on the surface. It is the structural unit of UI on the React level. It can be import/export on the module level."
        }
      ]
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
          "value": "component connects three things at the same time:"
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
                  "value": "Markup: What does this UI look like."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript logic: How this UI calculates what to display."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Composition: How this UI nests other UIs."
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
          "value": "React official documentation regards component as UI building block. You can split the page into components such as header, card, button, panel, list, etc., and then combine them into a complete page."
        }
      ]
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
              "value": "Syntax"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "function ComponentName() { return <div />; }"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "React calls component function and reads the return value."
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
              "value": "component function is a function object; JSX returns a React element object."
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
              "value": "TypeScript can check the component parameters and return JSX, import/export."
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
              "value": "component name must start with a capital letter, "
            },
            {
              "type": "inlineCode",
              "value": "<Component />"
            },
            {
              "type": "text",
              "value": " represents component."
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
              "value": "component itself is not a DOM node, React DOM only synchronizes the results to DOM."
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
          "value": "JavaScript function is a callable object at runtime. React components borrow this mechanism: you define a function, and React calls it during the render process. Instead of inserting function source code into the page, React uses the return value of the function to build the UI tree."
        }
      ]
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
                  "value": "Component name uses PascalCase, for example "
                },
                {
                  "type": "inlineCode",
                  "value": "LearningCard"
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
                  "value": "Component returns React node, such as JSX element, string, number, "
                },
                {
                  "type": "inlineCode",
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": " etc."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX Middle and lowercase tags such as "
                },
                {
                  "type": "inlineCode",
                  "value": "<section>"
                },
                {
                  "type": "text",
                  "value": " represents intrinsic DOM element."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX Medium uppercase tags such as "
                },
                {
                  "type": "inlineCode",
                  "value": "<LearningCard />"
                },
                {
                  "type": "text",
                  "value": " represents the component you defined or imported."
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
          "value": "This section does not cover fixed DOM methods. Something to remember is the naming convention:"
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
                  "value": "function LearningCard()"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "<LearningCard />"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "export default LearningCard"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "import LearningCard from \"./LearningCard\""
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
      "value": "Conceptual snippets in this section:\n  Snippet: learning card component\n  Snippet: component composition\n  Snippet: lowercase component mistake\n  Snippet: capitalized component correction"
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
      "label": "Snippet: learning card component",
      "value": "type LearningCardProps = {\r\n  title: string;\r\n  summary: string;\r\n};\r\n\r\nexport default function LearningCard({ title, summary }: LearningCardProps) {\r\n  return (\r\n    <article className=\"learning-card\">\r\n      <h2>{title}</h2>\r\n      <p>{summary}</p>\r\n    </article>\r\n  );\r\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: component composition",
      "value": "import LearningCard from \"./components/LearningCard\";\r\n\r\nexport default function App() {\r\n  return (\r\n    <main>\r\n      <h1>React Introduction</h1>\r\n      <LearningCard\r\n        title=\"Component\"\r\n        summary=\"A component describes one reusable part of the UI.\"\r\n      />\r\n    </main>\r\n  );\r\n}"
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
          "value": "LearningCard.tsx"
        },
        {
          "type": "text",
          "value": ": "
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
                  "value": "type LearningCardProps"
                },
                {
                  "type": "text",
                  "value": " is TypeScript object type and only exists during the check phase."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "title: string"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "summary: string"
                },
                {
                  "type": "text",
                  "value": " constrains the type of the incoming value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "LearningCard"
                },
                {
                  "type": "text",
                  "value": " is JavaScript function, which is also a React component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "function parameters are read through object destructuring "
                },
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
                  "value": "JSX returns a "
                },
                {
                  "type": "inlineCode",
                  "value": "article"
                },
                {
                  "type": "text",
                  "value": ", contains title and paragraph."
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
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": ": "
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
                  "value": "import LearningCard"
                },
                {
                  "type": "text",
                  "value": " uses the JavaScript module system to import the component function."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "<LearningCard ... />"
                },
                {
                  "type": "text",
                  "value": " Create a usage point for this component in JSX."
                }
              ]
            }
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
                  "value": " looks like an HTML attribute, but for custom components it will form a props object."
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
      "value": "React Introduction\r\nComponent\r\nA component describes one reusable part of the UI."
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
                  "value": "Browser loads "
                },
                {
                  "type": "inlineCode",
                  "value": "main.tsx"
                },
                {
                  "type": "text",
                  "value": " corresponding module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "App.tsx"
                },
                {
                  "type": "text",
                  "value": " is imported."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "LearningCard.tsx"
                },
                {
                  "type": "text",
                  "value": " is imported."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React render "
                },
                {
                  "type": "inlineCode",
                  "value": "<App />"
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
                  "value": "App()"
                },
                {
                  "type": "text",
                  "value": " returns containing "
                },
                {
                  "type": "inlineCode",
                  "value": "<LearningCard />"
                },
                {
                  "type": "text",
                  "value": " 's JSX."
                }
              ]
            }
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
                  "value": "LearningCard()"
                },
                {
                  "type": "text",
                  "value": ", passing in props object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM commits the final DOM update."
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
                  "value": "LearningCard"
                },
                {
                  "type": "text",
                  "value": " is the function reference obtained by module import."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX form object-like data inputs."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript of "
                },
                {
                  "type": "inlineCode",
                  "value": "LearningCardProps"
                },
                {
                  "type": "text",
                  "value": " will not be retained in the browser runtime."
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
          "value": "output from component composition: "
        },
        {
          "type": "inlineCode",
          "value": "App"
        },
        {
          "type": "text",
          "value": " describes the page-level structure, "
        },
        {
          "type": "inlineCode",
          "value": "LearningCard"
        },
        {
          "type": "text",
          "value": " describes the card-level structure. React processes components recursively, and ends up with a tree of elements that can be handed to the React DOM."
        }
      ]
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
          "value": "The lowercase component name will be treated by JSX as the intrinsic element name, not the component you defined."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: lowercase component mistake",
      "value": "function learningCard() {\r\n  return <article>Component</article>;\r\n}\r\n\r\nexport default function App() {\r\n  return <learningCard />;\r\n}"
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
          "value": "Error type: React component naming / JSX interpretation error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Rule violated: custom component must start with a capital letter. Lowercase JSX tags will be treated as DOM intrinsic elements."
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
      "label": "Snippet: capitalized component correction",
      "value": "function LearningCard() {\r\n  return <article>Component</article>;\r\n}\r\n\r\nexport default function App() {\r\n  return <LearningCard />;\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: If the custom component does not execute as expected, first check whether the JSX tag starts with uppercase and check whether it is correct import/export."
        }
      ]
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
          "value": "Real projects will split repetitive UI, complex UI, and independently understandable UI into components. Components not only reuse visually, but also bring logic and markup closer together, reducing cross-file tracking costs."
        }
      ]
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
          "value": "Before learning props, state, and effect, you must first understand that component is the organizational unit of React, not a simple alias of HTML tags."
        }
      ]
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
          "value": "React component is the conventional use of JavaScript function at the UI layer: function inputs data and returns UI description; the module system is responsible for references between files."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-what-jsx-is-and-why-browsers-do-not-run-it-natively",
      "children": [
        {
          "type": "text",
          "value": "9.4 What JSX Is and Why Browsers Do Not Run It Natively"
        }
      ]
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
          "value": "JSX is a syntax extension of JavaScript, used to write HTML-like markup in JavaScript / TypeScript files. Browsers do not execute JSX natively; it must first be converted to JavaScript by a tool."
        }
      ]
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
          "value": " can be written as "
        },
        {
          "type": "inlineCode",
          "value": "<h1>"
        },
        {
          "type": "text",
          "value": "\" problem. What you see is the source code syntax, not the code ultimately executed by the browser."
        }
      ]
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
          "value": "JSX Expression UI description. TypeScript The official documentation describes JSX as embeddable XML-like syntax, and states that it should be converted to valid JavaScript. Current project "
        },
        {
          "type": "inlineCode",
          "value": "tsconfig.app.json"
        },
        {
          "type": "text",
          "value": " Set "
        },
        {
          "type": "inlineCode",
          "value": "jsx: \"react-jsx\""
        },
        {
          "type": "text",
          "value": ", which represents conversion using the React automatic JSX runtime form."
        }
      ]
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
          "value": "JSX looks like HTML, but the rules are different:"
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
                  "type": "text",
                  "value": "tag usually needs to be closed."
                }
              ]
            }
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
                  "value": " contains JavaScript expression."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "custom component uses uppercase tag."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX and React are often used together, but they are not the same thing."
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
          "value": "in "
        },
        {
          "type": "inlineCode",
          "value": ".tsx"
        },
        {
          "type": "text",
          "value": ", TypeScript also needs to parse JSX and type syntax, so the file extension is very important. TypeScript files containing JSX should use "
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
            "value": "JSX Role"
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
              "value": "lets you write HTML-like markup in JS/TS."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX itself does not run, the converted JavaScript does."
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
              "value": "produces React element object / React node after conversion."
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
              "value": "TypeScript Check the intrinsic element, component props, and attribute types."
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
              "value": "React projects commonly use JSX to describe UI."
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
              "value": "Browser DOM does not recognize JSX, only the final DOM update."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Tooling behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite, TypeScript, and React plug-ins participate in the conversion."
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "jsx: \"react-jsx\""
        },
        {
          "type": "text",
          "value": " means that the JSX in TSX will be converted into the JavaScript calling form of the automatic JSX runtime. Conceptually:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: JSX transform input",
      "value": "export const heading = <h1>Hello JSX</h1>;"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "will become similar to the following JavaScript Form:"
        }
      ]
    },
    {
      "type": "code",
      "language": "js",
      "label": "Snippet: emitted JavaScript concept",
      "value": "import { jsx as _jsx } from \"react/jsx-runtime\";\r\n\r\nexport const heading = _jsx(\"h1\", {\r\n  children: \"Hello JSX\",\r\n});"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is determined by the tool chain. This chapter only asks you to remember: JSX is not a syntax that the browser directly executes."
        }
      ]
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
                  "value": "TSX File extension: "
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
                  "value": "JSX expression: "
                },
                {
                  "type": "inlineCode",
                  "value": "{expression}"
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
                  "value": "HTML class attribute is written as "
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
                  "type": "text",
                  "value": "label of "
                },
                {
                  "type": "inlineCode",
                  "value": "for"
                },
                {
                  "type": "text",
                  "value": " attribute is written as "
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
                  "type": "text",
                  "value": "custom component tag uses PascalCase."
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
          "value": "Common fixed JSX attribute:"
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
                  "value": "id"
                }
              ]
            }
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
                }
              ]
            }
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
          "type": "text",
          "value": "Attention: "
        },
        {
          "type": "inlineCode",
          "value": "children"
        },
        {
          "type": "text",
          "value": " is a common prop name in the React convention. This chapter only recognizes it and does not go into depth."
        }
      ]
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
      "value": "Conceptual snippets in this section:\n  Snippet: JSX transform input\n  Snippet: emitted JavaScript concept\n  Snippet: JSX attributes\n  Snippet: JSX attribute mistake\n  Snippet: JSX attribute correction"
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
      "label": "Snippet: JSX attributes",
      "value": "const inputId = \"topic\";\r\n\r\nexport default function App() {\r\n  return (\r\n    <main className=\"learning-page\">\r\n      <h1>React Introduction</h1>\r\n      <label htmlFor={inputId}>Topic</label>\r\n      <input id={inputId} type=\"text\" defaultValue=\"JSX\" />\r\n    </main>\r\n  );\r\n}"
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
                  "value": "inputId"
                },
                {
                  "type": "text",
                  "value": " is a common JavaScript string."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "className=\"learning-page\""
                },
                {
                  "type": "text",
                  "value": " uses JSX attribute names, which ultimately affects the DOM class."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "htmlFor={inputId}"
                },
                {
                  "type": "text",
                  "value": " uses the JSX attribute and passes "
                },
                {
                  "type": "inlineCode",
                  "value": "{}"
                },
                {
                  "type": "text",
                  "value": " reads the JavaScript value."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "id={inputId}"
                },
                {
                  "type": "text",
                  "value": " passes the same JavaScript value to input."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "defaultValue=\"JSX\""
                },
                {
                  "type": "text",
                  "value": " is React DOM's attribute/prop processing method for input initial value."
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
      "value": "React Introduction\r\nTopic\r\nJSX"
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
                  "value": "TypeScript Analysis "
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
                  "value": "TypeScript Check attributes according to JSX type rules."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite / React plug-in processing source code."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The browser executes the converted JavaScript."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM creates or updates real input, label, main."
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
                  "value": "inputId"
                },
                {
                  "type": "text",
                  "value": " is created once when module is initialized."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "does not create a DOM reference directly."
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
          "value": "React component returns JSX containing label and input. After conversion, React DOM creates the real DOM based on the UI description. "
        },
        {
          "type": "inlineCode",
          "value": "htmlFor"
        },
        {
          "type": "text",
          "value": " is finally associated with "
        },
        {
          "type": "inlineCode",
          "value": "id"
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
          "value": "Copying HTML to JSX as it is tends to fail."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: JSX attribute mistake",
      "value": "export default function App() {\r\n  return (\r\n    <main class=\"learning-page\">\r\n      <label for=\"topic\">Topic</label>\r\n      <input id=\"topic\" type=\"text\">\r\n    </main>\r\n  );\r\n}"
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
          "value": "Error type: JSX syntax/JSX attribute error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Rules violated:"
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
                  "value": "JSX Use "
                },
                {
                  "type": "inlineCode",
                  "value": "className"
                },
                {
                  "type": "text",
                  "value": ", not "
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
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX Use "
                },
                {
                  "type": "inlineCode",
                  "value": "htmlFor"
                },
                {
                  "type": "text",
                  "value": ", not "
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
            }
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
                  "value": "<input>"
                },
                {
                  "type": "text",
                  "value": " should self-close to "
                },
                {
                  "type": "inlineCode",
                  "value": "<input />"
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
          "value": "Correction:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: JSX attribute correction",
      "value": "export default function App() {\r\n  return (\r\n    <main className=\"learning-page\">\r\n      <label htmlFor=\"topic\">Topic</label>\r\n      <input id=\"topic\" type=\"text\" />\r\n    </main>\r\n  );\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: When migrating from HTML to JSX, focus on checking attribute naming, label closure, single parent node and "
        },
        {
          "type": "inlineCode",
          "value": "{}"
        },
        {
          "type": "text",
          "value": " expression."
        }
      ]
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
          "value": ".tsx"
        },
        {
          "type": "text",
          "value": " files use JSX extensively. You must know that JSX is source code level syntax. The project can run because the TypeScript/Vite/React plug-in processes it into JavaScript."
        }
      ]
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
          "value": "All subsequent React codes will use JSX/TSX. Chapter 1: First understand that JSX is not HTML, nor is it native browser syntax."
        }
      ]
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
          "value": "JSX is the syntax for \"express UI using JavaScript\". The browser doesn't understand JSX, so the toolchain must first turn it into JavaScript."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-how-a-react-app-starts-from-maintsx",
      "children": [
        {
          "type": "text",
          "value": "9.5 How a React App Starts from "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        }
      ]
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
          "value": "The current project starts from "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": " enters the browser, Vite loads "
        },
        {
          "type": "inlineCode",
          "value": "/src/main.tsx"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " found "
        },
        {
          "type": "inlineCode",
          "value": "#root"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "createRoot"
        },
        {
          "type": "text",
          "value": " creates React root, "
        },
        {
          "type": "inlineCode",
          "value": "root.render(<App />)"
        },
        {
          "type": "text",
          "value": " render root component."
        }
      ]
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
          "value": "This section solves the problem of \"where does the React application start running\". The entrance to React app is not "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " starts alone, but "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": " enters "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": ", then "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " render "
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
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " is the client entry module of the current Web app. It connects three layers:"
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
                  "value": "Browser DOM: "
                },
                {
                  "type": "inlineCode",
                  "value": "document.getElementById(\"root\")"
                }
              ]
            }
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
                  "type": "inlineCode",
                  "value": "createRoot(...).render(...)"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React component: "
                },
                {
                  "type": "inlineCode",
                  "value": "<App />"
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
          "value": "Current "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": ":"
        }
      ]
    },
    {
      "type": "code",
      "language": "html",
      "label": "Snippet: index.html root entry",
      "value": "<div id=\"root\"></div>\r\n<script type=\"module\" src=\"/src/main.tsx\"></script>"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "#root"
        },
        {
          "type": "text",
          "value": " is where React is inserted into the UI. "
        },
        {
          "type": "inlineCode",
          "value": "script type=\"module\""
        },
        {
          "type": "text",
          "value": " is how the browser loads the JavaScript module. Vite will use "
        },
        {
          "type": "inlineCode",
          "value": "/src/main.tsx"
        },
        {
          "type": "text",
          "value": " is put into its module graph and handles TSX and import."
        }
      ]
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
            "value": "In "
          },
          {
            "type": "inlineCode",
            "value": "main.tsx"
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
              "value": "ESM import, JSX, non-null assertion "
            },
            {
              "type": "inlineCode",
              "value": "!"
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
              "value": "Runtime behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser executes the module, and React DOM creates the root and renders it."
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
              "value": "document.getElementById"
            },
            {
              "type": "text",
              "value": " returns DOM element object or "
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
              "value": "TypeScript According to the DOM lib, we know that the return type may be `HTMLElement"
            }
          ],
          [
            {
              "type": "text",
              "value": "null`."
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
              "type": "inlineCode",
              "value": "<App />"
            },
            {
              "type": "text",
              "value": " is the root component."
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
              "type": "inlineCode",
              "value": "document"
            },
            {
              "type": "text",
              "value": " is browser Web API."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Tooling behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite Analysis "
            },
            {
              "type": "inlineCode",
              "value": "/src/main.tsx"
            },
            {
              "type": "text",
              "value": " and CSS import."
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
          "value": "The actual entrance of the current project:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: current main.tsx entry model",
      "value": "import { StrictMode } from \"react\";\r\nimport { createRoot } from \"react-dom/client\";\r\nimport \"./index.css\";\r\nimport App from \"./App.tsx\";\r\n\r\ncreateRoot(document.getElementById(\"root\")!).render(\r\n  <StrictMode>\r\n    <App />\r\n  </StrictMode>,\r\n);"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "execution flow is not \"open "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": "\". The execution flow is: "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " is loaded, "
        },
        {
          "type": "inlineCode",
          "value": "App"
        },
        {
          "type": "text",
          "value": " is imported, React DOM render "
        },
        {
          "type": "inlineCode",
          "value": "<App />"
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
                  "value": "createRoot(domNode)"
                },
                {
                  "type": "text",
                  "value": ": Create a React root for a browser DOM node."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "root.render(reactNode)"
                },
                {
                  "type": "text",
                  "value": ": Render React node to root."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "document.getElementById(\"root\")"
                },
                {
                  "type": "text",
                  "value": ": Browser DOM API, returns "
                },
                {
                  "type": "inlineCode",
                  "value": "HTMLElement | null"
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
                  "value": "!"
                },
                {
                  "type": "text",
                  "value": ": TypeScript non-null assertion, which only affects type checking and will not be checked at runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "<StrictMode>"
                },
                {
                  "type": "text",
                  "value": ": Develop auxiliary components to help find some problems; this chapter will not go into depth."
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
            "value": "Signature / Shape"
          }
        ],
        [
          {
            "type": "text",
            "value": "Layer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "createRoot"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "createRoot(domNode, options?)"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM API"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "render"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "root.render(reactNode)"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM API"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "getElementById"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "document.getElementById(id)"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser DOM API"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "StrictMode"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "<StrictMode>{children}</StrictMode>"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component"
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
              "value": "Current project structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "index.html\r\nsrc/\r\n  main.tsx\r\n  App.tsx\r\n  index.css"
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
          "value": "More explicit root check writing:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: explicit root check",
      "value": "import { StrictMode } from \"react\";\r\nimport { createRoot } from \"react-dom/client\";\r\nimport App from \"./App\";\r\nimport \"./index.css\";\r\n\r\nconst rootElement = document.getElementById(\"root\");\r\n\r\nif (rootElement === null) {\r\n  throw new Error(\"Root element was not found.\");\r\n}\r\n\r\ncreateRoot(rootElement).render(\r\n  <StrictMode>\r\n    <App />\r\n  </StrictMode>,\r\n);"
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
                  "value": "import { StrictMode } from \"react\""
                },
                {
                  "type": "text",
                  "value": " imports the development check component provided by React."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "import { createRoot } from \"react-dom/client\""
                },
                {
                  "type": "text",
                  "value": " imports the client API of Web DOM renderer."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "import App from \"./App\""
                },
                {
                  "type": "text",
                  "value": " import root component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "import \"./index.css\""
                },
                {
                  "type": "text",
                  "value": " Let Vite incorporate CSS into module diagrams."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "document.getElementById(\"root\")"
                },
                {
                  "type": "text",
                  "value": " Find the container in the real DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "if (rootElement === null)"
                },
                {
                  "type": "text",
                  "value": " explicitly throws out the problem of missing root in runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "createRoot(rootElement)"
                },
                {
                  "type": "text",
                  "value": " Create React root."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": ".render(...)"
                },
                {
                  "type": "text",
                  "value": " starts rendering React node."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "output depends on "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
        },
        {
          "type": "text",
          "value": " currently returns. When the entrance is successful, "
        },
        {
          "type": "inlineCode",
          "value": "#root"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Browser UI",
      "value": "Content returned by App"
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
                  "value": "Vite dev server serves "
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
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser parses "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " and creates "
                },
                {
                  "type": "inlineCode",
                  "value": "<div id=\"root\"></div>"
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
                  "value": "Browser requests "
                },
                {
                  "type": "inlineCode",
                  "value": "/src/main.tsx"
                },
                {
                  "type": "text",
                  "value": " as a module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite transforms TSX and module imports."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser executes transformed JavaScript."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "document.getElementById(\"root\")"
                },
                {
                  "type": "text",
                  "value": " returns the DOM container."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "createRoot"
                },
                {
                  "type": "text",
                  "value": " creates React root for that container."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "render"
                },
                {
                  "type": "text",
                  "value": " renders "
                },
                {
                  "type": "inlineCode",
                  "value": "<App />"
                },
                {
                  "type": "text",
                  "value": " inside the container."
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
                  "value": "rootElement"
                },
                {
                  "type": "text",
                  "value": " references a real DOM object."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "createRoot(rootElement)"
                },
                {
                  "type": "text",
                  "value": " creates a React root object associated with that DOM node."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "App"
                },
                {
                  "type": "text",
                  "value": " is a function reference imported from another module."
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
          "value": "because "
        },
        {
          "type": "inlineCode",
          "value": "root.render(<App />)"
        },
        {
          "type": "text",
          "value": " Hands the root component to React DOM. React DOM takes over "
        },
        {
          "type": "inlineCode",
          "value": "#root"
        },
        {
          "type": "text",
          "value": " internal DOM management."
        }
      ]
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
          "value": "If there is no "
        },
        {
          "type": "inlineCode",
          "value": "id=\"root\""
        },
        {
          "type": "text",
          "value": ", runtime will fail."
        }
      ]
    },
    {
      "type": "code",
      "language": "html",
      "label": "Snippet: missing root container",
      "value": "<div id=\"app\"></div>\r\n<script type=\"module\" src=\"/src/main.tsx\"></script>"
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
          "value": "document.getElementById(\"root\")"
        },
        {
          "type": "text",
          "value": " Return to "
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
          "value": "Error type: runtime DOM lookup error / React DOM root error."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Rules violated: "
        },
        {
          "type": "inlineCode",
          "value": "createRoot"
        },
        {
          "type": "text",
          "value": " requires a real DOM element and cannot pass "
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error code:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: root lookup mistake",
      "value": "import { createRoot } from \"react-dom/client\";\r\nimport App from \"./App\";\r\n\r\ncreateRoot(document.getElementById(\"missing-root\")!).render(<App />);"
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
      "label": "Snippet: root lookup correction",
      "value": "import { createRoot } from \"react-dom/client\";\r\nimport App from \"./App\";\r\n\r\nconst rootElement = document.getElementById(\"root\");\r\n\r\nif (rootElement === null) {\r\n  throw new Error(\"Root element was not found.\");\r\n}\r\n\r\ncreateRoot(rootElement).render(<App />);"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Identification method: When you see target container related errors, check "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": " id in "
        },
        {
          "type": "inlineCode",
          "value": "getElementById"
        },
        {
          "type": "text",
          "value": " parameters and script entries are consistent."
        }
      ]
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
          "value": "Most pure React web apps only have a single root. The old system may have multiple roots when partially connected to React, but the current learning project only requires one root."
        }
      ]
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
          "value": ", you must know that it will eventually start from "
        },
        {
          "type": "inlineCode",
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " enters the render tree."
        }
      ]
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
          "value": "main.tsx"
        },
        {
          "type": "text",
          "value": " is the connection point between React and the browser DOM: find the DOM container, create the React root, and render the root component."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-how-vite-react-and-typescript-divide-the-work",
      "children": [
        {
          "type": "text",
          "value": "9.6 How Vite, React, and TypeScript Divide the Work"
        }
      ]
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
          "value": "Vite is a development and construction tool, React is a UI runtime, and TypeScript is a tool related to static type checking and source code conversion. The three collaborate, but have different responsibilities."
        }
      ]
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
          "value": "This section solves the problem of \"where does the error come from?\" You must be able to tell whether a problem is a browser runtime, React runtime, TypeScript compile check, Vite conversion/build, ESLint rules, or a package version issue."
        }
      ]
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
          "value": "Current project uses:"
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
                  "value": "vite.config.ts"
                },
                {
                  "type": "text",
                  "value": " in "
                },
                {
                  "type": "inlineCode",
                  "value": "@vitejs/plugin-react"
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
                  "value": " in "
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
                  "value": "package.json"
                },
                {
                  "type": "text",
                  "value": " in "
                },
                {
                  "type": "inlineCode",
                  "value": "build: \"tsc -b && vite build\""
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
          "value": "This means that when building, TypeScript is first used to check the project reference build, and then Vite packages the production resources."
        }
      ]
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
          "value": "The division of labor is as follows:"
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
            "value": "Tool"
          }
        ],
        [
          {
            "type": "text",
            "value": "Responsibility"
          }
        ],
        [
          {
            "type": "text",
            "value": "Not Responsible For"
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
              "type": "text",
              "value": "component model, rendering, UI runtime"
            }
          ],
          [
            {
              "type": "text",
              "value": "Start dev server, type erase, package production resources"
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
              "value": "render React tree to browser DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type check, Vite dev server"
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
              "value": "type checking, TS/TSX syntax understanding, JSX type support"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser runtime repair, React DOM update"
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
              "type": "text",
              "value": "dev server, module graph, HMR, build"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component semantics itself, type system design"
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
              "value": "Execute JavaScript, maintain DOM, apply CSS"
            }
          ],
          [
            {
              "type": "text",
              "value": "directly executes TSX or TypeScript type"
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
            "value": "Example"
          }
        ],
        [
          {
            "type": "text",
            "value": "Layer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "type AppProps = { title: string }"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type system"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<App />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX syntax / React convention"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "createRoot(rootElement)"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM runtime"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "document.getElementById(\"root\")"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser platform API"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "npm run dev"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite tooling"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "npm run build"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript tooling + Vite tooling"
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
          "value": "TypeScript The official documentation emphasizes that TypeScript checks the code before running, the type will be erased after compilation, and the runtime is still the behavior of JavaScript. The React runtime will not read your TypeScript type alias to determine how to render. Vite is responsible for organizing source code and dependencies into browser-loadable modules or production builds."
        }
      ]
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
                  "value": ": TypeScript file containing JSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "jsx: \"react-jsx\""
                },
                {
                  "type": "text",
                  "value": ": Control JSX emit mode in TSConfig."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "noEmit: true"
                },
                {
                  "type": "text",
                  "value": ": TypeScript checked but not by "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " output JS."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "moduleResolution: \"bundler\""
                },
                {
                  "type": "text",
                  "value": ": Let TypeScript press bundler scene parsing module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "vite.config.ts"
                },
                {
                  "type": "text",
                  "value": ": Vite configuration file."
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
            "value": "File"
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
              "type": "inlineCode",
              "value": "plugins: [react()]"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "vite.config.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Enable Vite React plug-in."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "jsx: \"react-jsx\""
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "tsconfig.app.json"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses automatic JSX runtime."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "strict: true"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "tsconfig.app.json"
            }
          ],
          [
            {
              "type": "text",
              "value": "enables strict type checking."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "noEmit: true"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "tsconfig.app.json"
            }
          ],
          [
            {
              "type": "text",
              "value": "type check does not output JS files."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "build"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "package.json"
            }
          ],
          [
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
              "value": ", then "
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
              "value": "Current project structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "package.json\r\ntsconfig.json\r\ntsconfig.app.json\r\ntsconfig.node.json\r\nvite.config.ts\r\nsrc/\r\n  main.tsx"
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
          "value": "Current project Vite configuration:"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: Vite React plugin config",
      "value": "import { defineConfig } from \"vite\";\r\nimport react from \"@vitejs/plugin-react\";\r\n\r\nexport default defineConfig({\r\n  plugins: [react()],\r\n});"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Current Project TSX Key Settings:"
        }
      ]
    },
    {
      "type": "code",
      "language": "json",
      "label": "Snippet: TSX compiler options",
      "value": "{\r\n  \"compilerOptions\": {\r\n    \"lib\": [\"ES2022\", \"DOM\", \"DOM.Iterable\"],\r\n    \"module\": \"ESNext\",\r\n    \"moduleResolution\": \"bundler\",\r\n    \"noEmit\": true,\r\n    \"jsx\": \"react-jsx\",\r\n    \"strict\": true\r\n  },\r\n  \"include\": [\"src\"]\r\n}"
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
          "value": "vite.config.ts"
        },
        {
          "type": "text",
          "value": ": "
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
                  "value": "defineConfig"
                },
                {
                  "type": "text",
                  "value": " provides Vite configuration assistance."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "react()"
                },
                {
                  "type": "text",
                  "value": " Enable React plug-in capabilities, such as JSX transform and Fast Refresh support."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "plugins: [react()]"
                },
                {
                  "type": "text",
                  "value": " tells Vite to use this plugin for React projects."
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
          "value": "tsconfig.app.json"
        },
        {
          "type": "text",
          "value": ": "
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
                  "value": "DOM"
                },
                {
                  "type": "text",
                  "value": " lib lets TypeScript know about "
                },
                {
                  "type": "inlineCode",
                  "value": "document"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "HTMLElement"
                },
                {
                  "type": "text",
                  "value": " and other browser API types."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "moduleResolution: \"bundler\""
                },
                {
                  "type": "text",
                  "value": " is for the bundler tool chain parsing module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
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
                  "value": " checks but does not output JS."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "jsx: \"react-jsx\""
                },
                {
                  "type": "text",
                  "value": " indicates that JSX uses the React automatic runtime form."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "strict: true"
                },
                {
                  "type": "text",
                  "value": " improves the strictness of type checking."
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
          "value": "Development:"
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
          "value": "Type and Build:"
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
          "value": "is successful, the development server will give the local access address; when the build is successful, Vite will output production assets."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Output",
      "value": "Vite dev server or production build output"
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
          "value": "During development:"
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
                  "value": "npm run dev"
                },
                {
                  "type": "text",
                  "value": " executes Vite."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite Read "
                },
                {
                  "type": "inlineCode",
                  "value": "vite.config.ts"
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
                  "value": "Vite uses a React plugin to handle React/JSX related transformations."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser request "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " and module."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite converts modules on demand and provides HMR."
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
          "value": "When building:"
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
                  "value": "npm run build"
                },
                {
                  "type": "text",
                  "value": " executes "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc -b"
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
                  "value": "TypeScript Check project reference and type."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "passes, then execute "
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
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite packages and produces static resources."
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
          "value": "This section is mainly about the tool chain and does not pay attention to runtime variable reference changes. The key is: TypeScript type does not enter the browser runtime, and the Vite configuration is not a React component."
        }
      ]
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
          "value": "Because package scripts clearly assign development, construction, and inspection to different tools. Understanding scripts is the first step in locating the source of errors."
        }
      ]
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
          "value": "TypeScript error is not equal to a React runtime error."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: TypeScript type error",
      "value": "const count: number = \"1\";"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "should have been discovered during the TypeScript inspection phase; it is not a problem discovered only during the React DOM render phase."
        }
      ]
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
          "value": "common mistakes: I thought that after adding the TypeScript type, the browser runtime would automatically verify the data."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: TypeScript runtime boundary mistake",
      "value": "type User = {\r\n  name: string;\r\n};\r\n\r\nconst user = JSON.parse('{\"name\": 123}') as User;\r\n\r\nconsole.log(user.name.toUpperCase());"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Error type: runtime error risk caused by unchecked external data."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rule: TypeScript type assertion does not perform runtime verification. "
        },
        {
          "type": "inlineCode",
          "value": "as User"
        },
        {
          "type": "text",
          "value": " just tells the type checker how to treat this value."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Correction direction:"
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "Snippet: TypeScript runtime boundary correction",
      "value": "type User = {\r\n  name: string;\r\n};\r\n\r\nfunction isUser(value: unknown): value is User {\r\n  return (\r\n    typeof value === \"object\" &&\r\n    value !== null &&\r\n    \"name\" in value &&\r\n    typeof value.name === \"string\"\r\n  );\r\n}\r\n\r\nconst parsedValue: unknown = JSON.parse('{\"name\": 123}');\r\n\r\nif (isUser(parsedValue)) {\r\n  console.log(parsedValue.name.toUpperCase());\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: When data comes from network, storage, URL, JSON, and user input, do not use the TypeScript type as runtime verification."
        }
      ]
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
          "value": "When locating bugs in real projects, first determine which layer the error belongs to:"
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
                  "value": "Terminal "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " error: TypeScript Check."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Terminal Vite transform error: tool chain conversion."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser console runtime error: JavaScript/React runtime/DOM API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The page displays incorrectly but without errors: React data to UI mapping or CSS issue."
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
          "value": "React Learning is not just about memorizing APIs, but also being able to distinguish between \"framework runtime\" and \"tool chain\". This capability will make subsequent debugging faster."
        }
      ]
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
          "value": "TypeScript is checked before running, Vite converts and packages during the development/build phase, React organizes the UI at the browser runtime, and the browser executes the final JavaScript and maintains the DOM."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-how-react-relates-to-html-css-javascript-nextjs-and-react-native",
      "children": [
        {
          "type": "text",
          "value": "9.7 How React Relates to HTML, CSS, JavaScript, Next.js, and React Native"
        }
      ]
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
          "value": "React is built on HTML, CSS, JavaScript, and the browser DOM; React is not equal to Next.js, nor is it equal to React Native. Next.js is the full-stack framework on top of React, and React Native is the renderer/platform integration for native UI."
        }
      ]
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
          "value": "This section resolves the confusion about whether learning React is equivalent to learning Next.js or mobile development. The current project is a Vite + React DOM browser app, not a Next.js app, nor a React Native app."
        }
      ]
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
          "value": "React core provides component, rendering model and related APIs. Different renderers render React tree to different platforms:"
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
                  "value": "react-dom"
                },
                {
                  "type": "text",
                  "value": " render to browser DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React Native render to native platform UI."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Next.js is a framework based on React, which adds routing, server rendering, data fetching, deployment conventions and other capabilities."
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
          "value": "React's relationship with the three major web foundations:"
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
                  "value": "HTML: React DOM finally creates or updates an HTML DOM element."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "CSS: React does not replace CSS; you still write class, selector, layout, color, and responsive rules."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript: React component is JavaScript function, event processing, array, object, module, closure are still JavaScript knowledge."
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
          "value": "React is related to Next.js:"
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
                  "value": "React is a UI library."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Next.js is a framework based on React."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Next.js will define routing, server/client boundaries, data acquisition and other rules."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The current project does not have Next.js file system routes or server components."
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
          "value": "React's relationship with React Native:"
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
                  "value": "React Native uses React's component idea."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React Native does not target the browser DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React Native uses native UI primitives, not ordinary HTML tags."
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
            "value": "Technology"
          }
        ],
        [
          {
            "type": "text",
            "value": "Main Layer"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "HTML"
            }
          ],
          [
            {
              "type": "text",
              "value": "document structure / browser platform"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "CSS"
            }
          ],
          [
            {
              "type": "text",
              "value": "visual styling / browser platform"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JavaScript"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime language"
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
              "value": "compile-time type system"
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
              "type": "text",
              "value": "UI runtime / component model"
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
              "value": "browser DOM renderer"
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
              "type": "text",
              "value": "tooling"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Next.js"
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
              "value": "React Native"
            }
          ],
          [
            {
              "type": "text",
              "value": "native renderer / platform integration"
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
          "value": "The current project runtime only involves browser renderer. "
        },
        {
          "type": "inlineCode",
          "value": "react-dom/client"
        },
        {
          "type": "text",
          "value": " After creating root, maintain the React tree in "
        },
        {
          "type": "inlineCode",
          "value": "#root"
        },
        {
          "type": "text",
          "value": " DOM node. There is no server runtime of Next.js, and there is no native bridge of React Native."
        }
      ]
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
          "value": "There are no new APIs in this section, the focus is on boundaries."
        }
      ]
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
          "value": "In this section, you only need to remember the package name boundary:"
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
                  "value": "react"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "react-dom"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "vite"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "typescript"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "next"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "react-native"
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
          "value": "The current project does not have "
        },
        {
          "type": "inlineCode",
          "value": "next"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "react-native"
        },
        {
          "type": "text",
          "value": " depends."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Current project boundary structure:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project boundary",
      "value": "vite_ts/\r\n  index.html\r\n  src/\r\n    main.tsx\r\n    App.tsx"
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
          "value": "Web DOM renderer import of the current project:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Snippet: React DOM client import",
      "value": "import { createRoot } from \"react-dom/client\";"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "indicates that the current project uses React DOM client renderer."
        }
      ]
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
                  "value": "react-dom/client"
                },
                {
                  "type": "text",
                  "value": " is the Web client renderer entrance."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "createRoot"
                },
                {
                  "type": "text",
                  "value": " Create React root for browser DOM node."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "is a Next.js project, the entry and routing rules are usually taken over by the Next.js framework."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If it is a React Native project, the render target is not "
                },
                {
                  "type": "inlineCode",
                  "value": "document.getElementById(\"root\")"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The current project operation mode is still:"
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
      "label": "Runtime Target",
      "value": "Browser DOM app served by Vite"
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
                  "value": "Vite serves browser app."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser loads "
                },
                {
                  "type": "inlineCode",
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " and module scripts."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React DOM renders into "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
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
                  "value": "HTML and CSS are interpreted by browser."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript runs in browser runtime."
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
          "value": "There are no new variable reference changes in this section."
        }
      ]
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
          "value": "because the current project dependencies and entries point to Vite + React DOM, not Next.js or React Native."
        }
      ]
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
          "value": "You don't usually handwrite the same in Next.js "
        },
        {
          "type": "inlineCode",
          "value": "createRoot(document.getElementById(\"root\"))"
        },
        {
          "type": "text",
          "value": " entrance:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Snippet: Next.js structure contrast",
      "value": "app/\r\n  page.tsx\r\n  layout.tsx"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This is the Next.js App Router style directory and does not belong to the current project."
        }
      ]
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
          "value": "common mistake: When I saw the React official recommended framework, I thought that to learn React, I must switch to Next.js immediately."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "error: React official documentation recommends frameworks for production apps, but also states that if you just want to learn the basics of React apps, you can start with the build tool. The current learning project is already Vite + React + TypeScript, so the first chapter should first understand this boundary and not introduce Next.js."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "identification method: see "
        },
        {
          "type": "inlineCode",
          "value": "package.json"
        },
        {
          "type": "text",
          "value": " and directory structure. If there is no "
        },
        {
          "type": "inlineCode",
          "value": "next"
        },
        {
          "type": "text",
          "value": " dependency, no "
        },
        {
          "type": "inlineCode",
          "value": "app/"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "pages/"
        },
        {
          "type": "text",
          "value": " route structure, do not interpret the current project according to Next.js rules."
        }
      ]
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
          "value": "In real projects, React can appear in different environments: Vite SPA, Next.js full-stack app, React Native app, and partial embedding of old pages. When locating project boundaries, first look at dependencies, entry files, build commands and running platforms."
        }
      ]
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
          "value": "This chapter only studies the current Vite browser app. When you learn Next.js in the future, you need to relearn the upper-level rules such as server/client boundary, routing, and data fetching."
        }
      ]
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
          "value": "React is UI library; React DOM is browser renderer; Next.js is React framework; React Native is native renderer. Current project is Vite + React DOM browser app."
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
              "value": "function App()"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript syntax / React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines root function component."
            }
          ],
          [
            {
              "type": "text",
              "value": "is written in lowercase "
            },
            {
              "type": "inlineCode",
              "value": "app"
            },
            {
              "type": "text",
              "value": ", it cannot be used normally as a custom component in JSX."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "return <main />"
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
              "value": "returns UI description."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought that what was returned was the browser's native HTML."
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
              "value": "is put into a normal object, causing React child error."
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
              "value": "corresponds to HTML class."
            }
          ],
          [
            {
              "type": "text",
              "value": "Copy "
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
              "value": "corresponds to label's HTML "
            },
            {
              "type": "inlineCode",
              "value": "for"
            },
            {
              "type": "text",
              "value": " attribute."
            }
          ],
          [
            {
              "type": "text",
              "value": "Copy "
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
              "value": ".tsx"
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
              "value": "contains the TypeScript file extension for JSX."
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
              "value": " file."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "jsx: \"react-jsx\""
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript config"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses the React automatic JSX runtime form."
            }
          ],
          [
            {
              "type": "text",
              "value": "thinks that the browser executes JSX directly."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "document.getElementById(\"root\")"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Find the root element in HTML."
            }
          ],
          [
            {
              "type": "text",
              "value": "is ignored and may return "
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
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "createRoot(domNode)"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create React root."
            }
          ],
          [
            {
              "type": "text",
              "value": "incoming "
            },
            {
              "type": "inlineCode",
              "value": "null"
            },
            {
              "type": "text",
              "value": " or error DOM node."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "root.render(reactNode)"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM API"
            }
          ],
          [
            {
              "type": "text",
              "value": "render React node."
            }
          ],
          [
            {
              "type": "text",
              "value": "passes the second parameter to "
            },
            {
              "type": "inlineCode",
              "value": "render"
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
              "value": "<StrictMode>"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Auxiliary inspection during the development stage."
            }
          ],
          [
            {
              "type": "text",
              "value": "misjudges development environment behavior as production environment behavior."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "import App from \"./App\""
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript module syntax"
            }
          ],
          [
            {
              "type": "text",
              "value": "import component function."
            }
          ],
          [
            {
              "type": "text",
              "value": "path, default export, named export confusion."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "npm run dev"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "Start the development server."
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it was React API."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "npm run build"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript + Vite tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "type check and package."
            }
          ],
          [
            {
              "type": "text",
              "value": "attributes all build errors to the React runtime."
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
              "value": "Property 'heigth' does not exist..."
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type error"
            }
          ],
          [
            {
              "type": "text",
              "value": "object attribute name does not match the type inference result."
            }
          ],
          [
            {
              "type": "text",
              "value": "to the correct attribute name or correct type."
            }
          ],
          [
            {
              "type": "text",
              "value": "Terminal or editor prompts before running."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Target container is not a DOM element"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM runtime error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "createRoot"
            },
            {
              "type": "text",
              "value": " requires a real DOM element."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
            },
            {
              "type": "inlineCode",
              "value": "index.html"
            },
            {
              "type": "text",
              "value": " 's "
            },
            {
              "type": "inlineCode",
              "value": "id"
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "getElementById"
            },
            {
              "type": "text",
              "value": " parameter."
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser console appears root/container related errors."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Objects are not valid as a React child"
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime error"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX child cannot render ordinary objects directly."
            }
          ],
          [
            {
              "type": "text",
              "value": "render object specific properties."
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
              "value": "."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Cannot find module './App'"
            }
          ],
          [
            {
              "type": "text",
              "value": "Tooling / module resolution"
            }
          ],
          [
            {
              "type": "text",
              "value": "import The path is incorrect or the file does not exist."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check file path, extension, default export."
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite terminal or browser overlay prompts that module resolution failed."
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
              "value": "JSX attribute error"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX Use "
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
              "value": "changed to "
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
              "value": "Highlight or lint prompt after copying code from HTML."
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
              "value": "JSX attribute error"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX Use "
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
              "value": "changed to "
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
              "value": "label/input Occurs when migrating code from HTML."
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
              "value": "React convention error"
            }
          ],
          [
            {
              "type": "text",
              "value": "Custom component must start with a capital letter."
            }
          ],
          [
            {
              "type": "text",
              "value": "to PascalCase and update the JSX usage point."
            }
          ],
          [
            {
              "type": "text",
              "value": "Component function is not executed or is treated as a DOM tag."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Type assertion hides unsafe JSON"
            }
          ],
          [
            {
              "type": "text",
              "value": "Runtime data error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "as"
            },
            {
              "type": "text",
              "value": " does not perform runtime verification."
            }
          ],
          [
            {
              "type": "text",
              "value": "performs runtime guard on external data."
            }
          ],
          [
            {
              "type": "text",
              "value": "data comes from JSON, network, storage, or URL."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": ".ts"
            },
            {
              "type": "text",
              "value": " file contains JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript syntax/tooling error"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript JSX files should use "
            },
            {
              "type": "inlineCode",
              "value": ".tsx"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "changed the file extension to "
            },
            {
              "type": "inlineCode",
              "value": ".tsx"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript parser reports JSX syntax-related errors."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Build fails before Vite output"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript tooling error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "npm run build"
            },
            {
              "type": "text",
              "value": " executes "
            },
            {
              "type": "inlineCode",
              "value": "tsc -b"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "first fix TypeScript error."
            }
          ],
          [
            {
              "type": "text",
              "value": "build output in "
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
          "value": "React Component Rendering Demo"
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
          "value": "is to use minimal React + TypeScript + Vite Project display:"
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
                  "value": " provides "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
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
                  "value": "main.tsx"
                },
                {
                  "type": "text",
                  "value": " uses "
                },
                {
                  "type": "inlineCode",
                  "value": "createRoot"
                },
                {
                  "type": "text",
                  "value": " Start React."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "App.tsx"
                },
                {
                  "type": "text",
                  "value": " Use component to return JSX."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "App.css"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "index.css"
                },
                {
                  "type": "text",
                  "value": " Description React does not replace CSS."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript type only checks, not runtime data verification."
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
          "value": "This project only integrates the mechanism of Chapter 1 and does not introduce hooks, state, effects, routers or external libraries. It allows you to clearly see the first-level relationship between \"entry, component, JSX, CSS, tool chain, and browser DOM\"."
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
      "label": "final mini project structure",
      "value": "src/\r\n  main.tsx\r\n  App.tsx\r\n  App.css\r\n  index.css"
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
              "value": "src/main.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser entry module; connects DOM container and React root."
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
              "value": "Root component; showing component composition and JSX."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/App.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component-level page styling."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/index.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Global browser defaults and base styling."
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
      "label": "src/main.tsx",
      "value": "import { StrictMode } from \"react\";\r\nimport { createRoot } from \"react-dom/client\";\r\nimport App from \"./App\";\r\nimport \"./index.css\";\r\n\r\nconst rootElement = document.getElementById(\"root\");\r\n\r\nif (rootElement === null) {\r\n  throw new Error(\"Root element was not found.\");\r\n}\r\n\r\ncreateRoot(rootElement).render(\r\n  <StrictMode>\r\n    <App />\r\n  </StrictMode>,\r\n);"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/App.tsx",
      "value": "import \"./App.css\";\r\n\r\ntype DemoSection = {\r\n  title: string;\r\n  layer: string;\r\n  explanation: string;\r\n};\r\n\r\nconst sections: DemoSection[] = [\r\n  {\r\n    title: \"Component\",\r\n    layer: \"React runtime and convention\",\r\n    explanation: \"A component is a JavaScript function that returns a UI description.\",\r\n  },\r\n  {\r\n    title: \"JSX\",\r\n    layer: \"Syntax and tooling\",\r\n    explanation: \"JSX is transformed before the browser runs the app.\",\r\n  },\r\n  {\r\n    title: \"DOM\",\r\n    layer: \"Browser platform API\",\r\n    explanation: \"React DOM updates real browser nodes inside the root element.\",\r\n  },\r\n];\r\n\r\nfunction DemoCard({ title, layer, explanation }: DemoSection) {\r\n  return (\r\n    <article className=\"demo-card\">\r\n      <span>{layer}</span>\r\n      <h2>{title}</h2>\r\n      <p>{explanation}</p>\r\n    </article>\r\n  );\r\n}\r\n\r\nexport default function App() {\r\n  return (\r\n    <main className=\"demo-page\">\r\n      <section className=\"hero-panel\" aria-labelledby=\"page-title\">\r\n        <p className=\"eyebrow\">React Component Rendering Demo</p>\r\n        <h1 id=\"page-title\">React describes UI with components</h1>\r\n        <p className=\"intro\">\r\n          This demo shows the first boundary: TypeScript checks the source,\r\n          Vite serves and builds it, React renders components, and the browser\r\n          displays DOM and CSS.\r\n        </p>\r\n      </section>\r\n\r\n      <section className=\"card-grid\" aria-label=\"Rendering layers\">\r\n        {sections.map((section) => (\r\n          <DemoCard\r\n            explanation={section.explanation}\r\n            key={section.title}\r\n            layer={section.layer}\r\n            title={section.title}\r\n          />\r\n        ))}\r\n      </section>\r\n    </main>\r\n  );\r\n}"
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/App.css",
      "value": ".demo-page {\r\n  width: min(1040px, 100%);\r\n  margin: 0 auto;\r\n  padding: 48px 24px;\r\n}\r\n\r\n.hero-panel {\r\n  display: grid;\r\n  gap: 14px;\r\n  margin-bottom: 28px;\r\n}\r\n\r\n.eyebrow {\r\n  margin: 0;\r\n  color: #28715f;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.08em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.hero-panel h1 {\r\n  max-width: 760px;\r\n  margin: 0;\r\n  color: #172033;\r\n  font-size: clamp(2.2rem, 6vw, 4rem);\r\n  line-height: 1;\r\n}\r\n\r\n.intro {\r\n  max-width: 760px;\r\n  margin: 0;\r\n  color: #4c5870;\r\n  font-size: 1.05rem;\r\n}\r\n\r\n.card-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 16px;\r\n}\r\n\r\n.demo-card {\r\n  display: grid;\r\n  gap: 10px;\r\n  padding: 18px;\r\n  border: 1px solid #d7dde8;\r\n  border-radius: 8px;\r\n  background: #ffffff;\r\n}\r\n\r\n.demo-card span {\r\n  color: #65728a;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.demo-card h2 {\r\n  margin: 0;\r\n  color: #172033;\r\n}\r\n\r\n.demo-card p {\r\n  margin: 0;\r\n  color: #4c5870;\r\n}\r\n\r\n@media (max-width: 760px) {\r\n  .card-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}"
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/index.css",
      "value": ":root {\r\n  font-family:\r\n    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\",\r\n    sans-serif;\r\n  color: #172033;\r\n  background: #f5f7fb;\r\n  font-synthesis: none;\r\n  text-rendering: optimizeLegibility;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  min-width: 320px;\r\n  min-height: 100vh;\r\n  margin: 0;\r\n}"
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
          "value": "If you replace these codes to the corresponding "
        },
        {
          "type": "inlineCode",
          "value": "src"
        },
        {
          "type": "text",
          "value": " file, run:"
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
      "value": "React Component Rendering Demo\r\nReact describes UI with components\r\nComponent\r\nJSX\r\nDOM"
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
                  "value": "index.html"
                },
                {
                  "type": "text",
                  "value": " creates "
                },
                {
                  "type": "inlineCode",
                  "value": "#root"
                },
                {
                  "type": "text",
                  "value": " and load "
                },
                {
                  "type": "inlineCode",
                  "value": "/src/main.tsx"
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
                  "value": "Vite handles "
                },
                {
                  "type": "inlineCode",
                  "value": "main.tsx"
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
                  "value": "main.tsx"
                },
                {
                  "type": "text",
                  "value": " reads the root element in the DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "createRoot(rootElement)"
                },
                {
                  "type": "text",
                  "value": " Create React root."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "render(<App />)"
                },
                {
                  "type": "text",
                  "value": " tells React to start rendering the root component."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "App()"
                },
                {
                  "type": "text",
                  "value": " returns the page structure."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "sections.map(...)"
                },
                {
                  "type": "text",
                  "value": " returns a "
                },
                {
                  "type": "inlineCode",
                  "value": "DemoCard"
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
                  "value": "React DOM Submits the results to the real DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser application "
                },
                {
                  "type": "inlineCode",
                  "value": "index.css"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "App.css"
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
              "type": "inlineCode",
              "value": "Root element was not found."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "index.html"
            },
            {
              "type": "text",
              "value": " None "
            },
            {
              "type": "inlineCode",
              "value": "id=\"root\""
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
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
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Cannot find module './App'"
            }
          ],
          [
            {
              "type": "text",
              "value": "The import path and file name do not match."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
            },
            {
              "type": "inlineCode",
              "value": "src/App.tsx"
            },
            {
              "type": "text",
              "value": " exist?"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Property ... is missing"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "DemoCard"
            },
            {
              "type": "text",
              "value": " requires complete "
            },
            {
              "type": "inlineCode",
              "value": "DemoSection"
            },
            {
              "type": "text",
              "value": " props."
            }
          ],
          [
            {
              "type": "text",
              "value": "completes "
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
              "value": "layer"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "explanation"
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
              "value": "Page has no styling"
            }
          ],
          [
            {
              "type": "text",
              "value": "CSS import is missing."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
            },
            {
              "type": "inlineCode",
              "value": "import \"./App.css\""
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "import \"./index.css\""
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
              "value": "JSX syntax error"
            }
          ],
          [
            {
              "type": "text",
              "value": "label is not closed or attribute is written incorrectly."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check JSX rules."
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
          "value": "Only extensions directly related to the mechanics of Chapter 1 are allowed:"
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
                  "value": "plus a "
                },
                {
                  "type": "inlineCode",
                  "value": "Tooling"
                },
                {
                  "type": "text",
                  "value": " card, explaining Vite's responsibilities."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "plus a "
                },
                {
                  "type": "inlineCode",
                  "value": "TypeScript"
                },
                {
                  "type": "text",
                  "value": " card, indicating that the type check does not enter the runtime."
                }
              ]
            }
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
                  "value": "sections"
                },
                {
                  "type": "text",
                  "value": " moved to separate "
                },
                {
                  "type": "inlineCode",
                  "value": "src/demoData.ts"
                },
                {
                  "type": "text",
                  "value": ", practice module boundary."
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
          "value": "Do not extend state, effect, router, Next.js, Redux or React Native in this chapter."
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
          "value": "React is a library that uses component and JSX to describe the UI in JavaScript; TypeScript checks the type before running, Vite converts and packages the source code, and React DOM updates the UI description to the real DOM at the browser runtime."
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
              "value": "function App()"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / React convention"
            }
          ],
          [
            {
              "type": "text",
              "value": "definition root component"
            }
          ],
          [
            {
              "type": "text",
              "value": "None or props object"
            }
          ],
          [
            {
              "type": "text",
              "value": "returns React node"
            }
          ],
          [
            {
              "type": "text",
              "value": "lowercase name"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "<App />"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses custom component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "React element description"
            }
          ],
          [
            {
              "type": "text",
              "value": "forgot import"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "{value}"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "insert JavaScript expression"
            }
          ],
          [
            {
              "type": "text",
              "value": "can render the expression result"
            }
          ],
          [
            {
              "type": "text",
              "value": "displays dynamic value"
            }
          ],
          [
            {
              "type": "text",
              "value": "insert into normal object"
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
              "value": "settings class"
            }
          ],
          [
            {
              "type": "text",
              "value": "string"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM class attribute"
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
              "value": "associates label and input"
            }
          ],
          [
            {
              "type": "text",
              "value": "string id"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM for attribute"
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
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "createRoot"
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
              "value": "creates root"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM element"
            }
          ],
          [
            {
              "type": "text",
              "value": "React root object"
            }
          ],
          [
            {
              "type": "text",
              "value": "incoming "
            },
            {
              "type": "inlineCode",
              "value": "null"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "root.render"
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
              "value": "render React node"
            }
          ],
          [
            {
              "type": "text",
              "value": "React node"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM update"
            }
          ],
          [
            {
              "type": "text",
              "value": "misrepresents the second parameter"
            }
          ]
        ],
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
              "value": "TypeScript tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "allows TS + JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "TSX source file"
            }
          ],
          [
            {
              "type": "text",
              "value": "can be parsed by tools"
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
              "value": " is written in JSX"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "npm run dev"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "start dev server"
            }
          ],
          [
            {
              "type": "text",
              "value": "installed deps"
            }
          ],
          [
            {
              "type": "text",
              "value": "local dev server"
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it was React API"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "npm run build"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript + Vite"
            }
          ],
          [
            {
              "type": "text",
              "value": "type check and build"
            }
          ],
          [
            {
              "type": "text",
              "value": "valid project"
            }
          ],
          [
            {
              "type": "text",
              "value": "production assets"
            }
          ],
          [
            {
              "type": "text",
              "value": "ignore "
            },
            {
              "type": "inlineCode",
              "value": "tsc -b"
            },
            {
              "type": "text",
              "value": " stage"
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
              "value": "React"
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
              "value": "React is a UI library; React DOM is a Web renderer."
            }
          ],
          [
            {
              "type": "text",
              "value": "Write component and UI logic."
            }
          ],
          [
            {
              "type": "text",
              "value": "render React to browser DOM."
            }
          ]
        ],
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
              "value": "JSX is a source code syntax extension; HTML is a browser document language."
            }
          ],
          [
            {
              "type": "text",
              "value": "describes the UI in component."
            }
          ],
          [
            {
              "type": "text",
              "value": "write "
            },
            {
              "type": "inlineCode",
              "value": "index.html"
            },
            {
              "type": "text",
              "value": " or static document structure."
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
              "value": "JavaScript value"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type is erased before running; value exists at runtime."
            }
          ],
          [
            {
              "type": "text",
              "value": "Check the code correctness."
            }
          ],
          [
            {
              "type": "text",
              "value": "executes business logic and UI render."
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
              "type": "text",
              "value": "React"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite is the tool chain; React is the UI runtime."
            }
          ],
          [
            {
              "type": "text",
              "value": "development server, HMR, build."
            }
          ],
          [
            {
              "type": "text",
              "value": "component rendering."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Component tree"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM tree"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component tree is the React model; DOM tree is the browser model."
            }
          ],
          [
            {
              "type": "text",
              "value": "Understand UI composition."
            }
          ],
          [
            {
              "type": "text",
              "value": "understands the browser's actual node."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Next.js"
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
              "value": "Next.js is the upper-layer framework; React is the basic UI library."
            }
          ],
          [
            {
              "type": "text",
              "value": "requires routing/server/framework conventions."
            }
          ],
          [
            {
              "type": "text",
              "value": "Learn component model or build Vite SPA."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "React Native"
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
              "value": "React Native render native UI; React DOM render browser DOM."
            }
          ],
          [
            {
              "type": "text",
              "value": "mobile native app."
            }
          ],
          [
            {
              "type": "text",
              "value": "Web browser app."
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
              "value": "JSX attribute"
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
            }
          ],
          [
            {
              "type": "text",
              "value": "Copied HTML into TSX"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "for"
            },
            {
              "type": "text",
              "value": " in JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX attribute"
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
            }
          ],
          [
            {
              "type": "text",
              "value": "Label/input code copied from HTML"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "createRoot(null)"
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
              "value": "Root must be DOM element"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check "
            },
            {
              "type": "inlineCode",
              "value": "id=\"root\""
            }
          ],
          [
            {
              "type": "text",
              "value": "Root/container error"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Lowercase component"
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
              "value": "Custom components must be capitalized"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use PascalCase"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component not called"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Object as child"
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
              "value": "Plain object is not renderable child"
            }
          ],
          [
            {
              "type": "text",
              "value": "Render a property"
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
              "value": " contains object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Unsafe "
            },
            {
              "type": "inlineCode",
              "value": "as"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript / runtime boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "Assertion is not validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Validate unknown data"
            }
          ],
          [
            {
              "type": "text",
              "value": "Data comes from external source"
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
              "value": "App entry setup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Every browser React app needs a root"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "createRoot"
            },
            {
              "type": "text",
              "value": " + "
            },
            {
              "type": "inlineCode",
              "value": "render"
            }
          ],
          [
            {
              "type": "text",
              "value": "Wrong root id breaks startup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep "
            },
            {
              "type": "inlineCode",
              "value": "index.html"
            },
            {
              "type": "text",
              "value": " and "
            },
            {
              "type": "inlineCode",
              "value": "main.tsx"
            },
            {
              "type": "text",
              "value": " aligned"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Component extraction"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI grows beyond one file"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript module + component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Over-splitting too early"
            }
          ],
          [
            {
              "type": "text",
              "value": "Extract when it improves clarity"
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
              "type": "text",
              "value": "JSX is not raw HTML"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX transform"
            }
          ],
          [
            {
              "type": "text",
              "value": "Copy-paste HTML errors"
            }
          ],
          [
            {
              "type": "text",
              "value": "Convert HTML attributes carefully"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript props"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component inputs need constraints"
            }
          ],
          [
            {
              "type": "text",
              "value": "Type checking"
            }
          ],
          [
            {
              "type": "text",
              "value": "Thinking types validate runtime data"
            }
          ],
          [
            {
              "type": "text",
              "value": "Use runtime checks for external data"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "CSS import"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vite supports importing CSS"
            }
          ],
          [
            {
              "type": "text",
              "value": "Module graph"
            }
          ],
          [
            {
              "type": "text",
              "value": "Missing styles"
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep CSS imports near entry or component"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Build failure"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "build"
            },
            {
              "type": "text",
              "value": " runs "
            },
            {
              "type": "inlineCode",
              "value": "tsc -b"
            },
            {
              "type": "text",
              "value": " first"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript project references"
            }
          ],
          [
            {
              "type": "text",
              "value": "Misreading TS error as React bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read first failing tool output"
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
      "type": "heading",
      "depth": 3,
      "id": "root-entrance-template",
      "children": [
        {
          "type": "text",
          "value": "Root entrance template"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: root entry",
      "value": "import { StrictMode } from \"react\";\r\nimport { createRoot } from \"react-dom/client\";\r\nimport App from \"./App\";\r\nimport \"./index.css\";\r\n\r\nconst rootElement = document.getElementById(\"root\");\r\n\r\nif (rootElement === null) {\r\n  throw new Error(\"Root element was not found.\");\r\n}\r\n\r\ncreateRoot(rootElement).render(\r\n  <StrictMode>\r\n    <App />\r\n  </StrictMode>,\r\n);"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is suitable for the current Vite + React DOM browser app. Don't think of it as a Next.js or React Native entry template."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "basic-component-template",
      "children": [
        {
          "type": "text",
          "value": "Basic component template"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: basic component",
      "value": "export default function App() {\r\n  return (\r\n    <main>\r\n      <h1>Hello React</h1>\r\n      <p>A component returns a UI description.</p>\r\n    </main>\r\n  );\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is suitable for explaining the component model in Chapter 1. Don't add state or effects here."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "display-component-template-with-type",
      "children": [
        {
          "type": "text",
          "value": "Display component template with type"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: typed display component",
      "value": "type InfoPanelProps = {\r\n  title: string;\r\n  description: string;\r\n};\r\n\r\nexport default function InfoPanel({ title, description }: InfoPanelProps) {\r\n  return (\r\n    <section>\r\n      <h2>{title}</h2>\r\n      <p>{description}</p>\r\n    </section>\r\n  );\r\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is suitable for demonstrating TypeScript how to check component input. Don't be mistaken for "
        },
        {
          "type": "inlineCode",
          "value": "InfoPanelProps"
        },
        {
          "type": "text",
          "value": " will verify external data at browser runtime."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The files actually created or proposed to be retained this time are as follows. Sources, profiles and conceptual examples are not included in the final document list."
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
              "value": "docs/react/chapter-01-react-introduction/react-chapter-01-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Study guide document for this chapter."
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
              "value": "src/main.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project practice."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only replaced when performing exercises in section 12; it is not modified this time."
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
              "value": "final mini project exercise."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only replaced when performing exercises in section 12; it is not modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/App.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project exercise component-level style."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only replaced when performing exercises in section 12; it is not modified this time."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/index.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project exercises."
            }
          ],
          [
            {
              "type": "text",
              "value": "is only replaced when performing exercises in section 12; it is not modified this time."
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
                  "value": "manual-dom-example.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "wrong-model.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "correct-model.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "object-child-mistake.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "object-child-correct.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "LearningCard.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "lowercase-component-mistake.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "capitalized-component.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "jsx-input.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "html-in-jsx-mistake.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "html-in-jsx-correct.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "root-mistake.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "root-correct.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "type-error-example.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "runtime-type-mistake.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "runtime-type-correct.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "InfoPanel.tsx"
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
          "value": "suggests using the four-column note-taking method to organize this chapter:"
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
            "value": "Question"
          }
        ],
        [
          {
            "type": "text",
            "value": "Your Answer"
          }
        ],
        [
          {
            "type": "text",
            "value": "Code Evidence"
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
              "value": "React?"
            }
          ],
          [
            {
              "type": "text",
              "value": "Write a sentence in your own words."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "App.tsx"
            },
            {
              "type": "text",
              "value": " component."
            }
          ],
          [
            {
              "type": "text",
              "value": "React runtime."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX?"
            }
          ],
          [
            {
              "type": "text",
              "value": "writes \"not the browser's native syntax\"."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": ".tsx"
            },
            {
              "type": "text",
              "value": " + "
            },
            {
              "type": "inlineCode",
              "value": "jsx: \"react-jsx\""
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Syntax / tooling."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "app Where to start?"
            }
          ],
          [
            {
              "type": "text",
              "value": "writes "
            },
            {
              "type": "inlineCode",
              "value": "index.html -> main.tsx -> createRoot -> App"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "index.html"
            },
            {
              "type": "text",
              "value": ", "
            },
            {
              "type": "inlineCode",
              "value": "main.tsx"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser + React DOM."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript What to do?"
            }
          ],
          [
            {
              "type": "text",
              "value": "writes \"Pre-run check, type erase\"."
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "tsconfig.app.json"
            },
            {
              "type": "text",
              "value": "."
            }
          ],
          [
            {
              "type": "text",
              "value": "Type system / tooling."
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
          "value": "Don't just copy the code when learning. Each piece of code should answer at least:"
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
                  "value": "are JavaScript runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "are TypeScript type system?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Which lines are React convention?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Which lines depend on browser DOM API?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Which lines depend on Vite tooling?"
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
                  "value": "React and what is it not?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React reduce the complexity of handwritten DOM updates?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React component be said to be JavaScript function, but it is not just an ordinary business function?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JSX Why does it look like HTML but not HTML?"
                }
              ]
            }
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
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": ".ts"
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
                  "value": "Why the current project needs "
                },
                {
                  "type": "inlineCode",
                  "value": "react-dom/client"
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
                  "value": "createRoot(document.getElementById(\"root\")!)"
                },
                {
                  "type": "text",
                  "value": " belong to?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "!"
                },
                {
                  "type": "text",
                  "value": " a runtime check? Why not?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite in "
                },
                {
                  "type": "inlineCode",
                  "value": "npm run dev"
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
                  "value": "npm run build"
                },
                {
                  "type": "text",
                  "value": " Why run "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc -b"
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
                  "value": "TypeScript type still exist in the browser runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React and HTML/CSS/JavaScript substitute or collaborative?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why is React not equal to Next.js?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why is React DOM not equal to React Native?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "If the page is blank, in what order should the entry, DOM root, module import, React render and browser console be checked?"
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
          "value": "The final model to remember in this chapter:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Final memory model",
      "value": "index.html\r\n  -> browser creates document and #root\r\n  -> Vite serves /src/main.tsx\r\n  -> TypeScript checks TSX before runtime\r\n  -> JSX is transformed into JavaScript\r\n  -> React DOM creates a root\r\n  -> React calls App and child components\r\n  -> Components return UI descriptions\r\n  -> React DOM updates real browser DOM\r\n  -> CSS styles the rendered DOM"
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
          "value": "React component uses JavaScript to describe the UI; Vite and TypeScript allow the source code to be inspected and transformed; React DOM synchronizes the description to the browser DOM; the browser ultimately only runs JavaScript, HTML, CSS and Web APIs."
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
          "value": "It is recommended to read the official documents in this order:"
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
                  "href": "https://react.dev/learn/describing-the-ui",
                  "children": [
                    {
                      "type": "text",
                      "value": "Describing the UI"
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
                          "value": "The key point is that React is a UI library, and the UI can be split into reusable / nestable components."
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
                          "value": "The key point is that the component is JavaScript function, the component name must start with a capital, and how the components are combined."
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
                          "value": "Focus on JSX, JavaScript syntax extension, why React puts rendering logic and markup together, and the differences between JSX and HTML."
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
                  "href": "https://react.dev/reference/react-dom/client/createRoot",
                  "children": [
                    {
                      "type": "text",
                      "value": "createRoot"
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
                          "value": "createRoot(domNode)"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "root.render(reactNode)"
                        },
                        {
                          "type": "text",
                          "value": ", How a React app usually accesses the DOM."
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
                  "href": "https://react.dev/reference/react/StrictMode",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "<StrictMode>"
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
                          "value": "only needs to know the current project entry and use it for development auxiliary checking. This chapter does not go into the Strict Mode behavior."
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
                  "href": "https://react.dev/learn/creating-a-react-app",
                  "children": [
                    {
                      "type": "text",
                      "value": "Creating a React App"
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
                          "value": "focuses on the relationship between React and framework, and the boundaries of learning React app basics from the build tool."
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
                          "value": "Focus on "
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
                          "value": "@types/react"
                        },
                        {
                          "type": "text",
                          "value": ", TypeScript and React component."
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
                          "value": "focuses on converting JSX into JavaScript, "
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
                          "value": "jsx"
                        },
                        {
                          "type": "text",
                          "value": " compiler option."
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
                  "href": "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript for the New Programmer"
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
                          "value": "Focus on static type checking, runtime behavior preservation, and erased types."
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
                          "value": " emit."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
                  "children": [
                    {
                      "type": "text",
                      "value": "Document Object Model"
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
                          "value": "focuses on DOM, which is browser Web API, not JavaScript core language, nor React."
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
                  "children": [
                    {
                      "type": "inlineCode",
                      "value": "Document.getElementById"
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
                          "value": "focuses on the fact that it may not be able to find element, and "
                        },
                        {
                          "type": "inlineCode",
                          "value": "main.tsx"
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
                  "value": "MDN: "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
                  "children": [
                    {
                      "type": "text",
                      "value": "JavaScript modules"
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
                          "value": " How to connect files."
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
                          "value": "The key point is that Vite is dev server + build command, "
                        },
                        {
                          "type": "inlineCode",
                          "value": "index.html"
                        },
                        {
                          "type": "text",
                          "value": " is the entrance, and Vite handles the module graph."
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
                          "value": "Hello React"
                        },
                        {
                          "type": "text",
                          "value": ", "
                        },
                        {
                          "type": "inlineCode",
                          "value": "Setting up a React Project"
                        },
                        {
                          "type": "text",
                          "value": ", "
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
                          "value": "React DOM"
                        },
                        {
                          "type": "text",
                          "value": " related chapters."
                        }
                      ]
                    }
                  ]
                },
                {
                  "children": [
                    {
                      "type": "paragraph",
                      "children": [
                        {
                          "type": "text",
                          "value": "This PDF uses "
                        },
                        {
                          "type": "inlineCode",
                          "value": "App.jsx"
                        },
                        {
                          "type": "text",
                          "value": "; the current project is TypeScript + TSX, so this chapter is based on the current project structure and official documents. There is no mechanical copy of the table of contents in the book or "
                        },
                        {
                          "type": "inlineCode",
                          "value": ".jsx"
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
                  "value": "official Vite website currently displays the Vite v8 document, and the current project "
                },
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
                  "value": ". This chapter only uses stable concepts such as Vite entrance, dev server, build, and module graph; if you write a Vite version-sensitive chapter later, you should check again according to the current project installation version or the Vite v7 document."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "The mini project in this chapter is a documentation example and does not actually replace the current "
                },
                {
                  "type": "inlineCode",
                  "value": "src"
                },
                {
                  "type": "text",
                  "value": " file is run. If used for practice, you should manually replace and run "
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
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter01Content() {
  return <DocumentRenderer document={chapterDocument} />
}
