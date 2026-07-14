import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-06",
  "slug": "chapter-06-forms",
  "title": "React Chapter 6: Forms and Controlled Components",
  "sourcePath": "docs/react/chapter-06-forms/react-chapter-06-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-6-forms-and-controlled-components",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 6: Forms and Controlled Components"
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
              "value": "src/learning/react/chapter-06-forms/chapter-06-practice-root.tsx"
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
              "value": "src/learning/react/chapter-06-forms/chapter-06-practice.css"
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
              "value": "form submit default behavior"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/01-form-submit-default-behavior/form-submit-default-behavior.tsx"
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
              "value": "controlled text input"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/02-controlled-text-input/controlled-text-input.tsx"
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
              "value": "Read-only error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "Snippet: value without onChange"
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
              "value": "controlled / uncontrolled boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary.tsx"
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
              "value": "object form state"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/04-object-form-state/object-form-state.tsx"
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
              "value": "textarea / select"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/05-controlled-textarea-select/controlled-textarea-select.tsx"
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
              "value": "checkbox / radio"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/06-controlled-checkbox-radio/controlled-checkbox-radio.tsx"
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
              "value": "validation feedback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/07-form-validation/form-validation-feedback.tsx"
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
              "value": "submit status"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/08-submit-status-model/submit-status-model.tsx"
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
              "value": "typed form fields"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/09-typed-form-fields/typed-form-fields.tsx"
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
              "value": "mini project type model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts"
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
              "value": "9.10, 12"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mini project validation"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-validation.ts"
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
              "value": "mini project derived preview"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-preview.tsx"
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
              "value": "mini project form owner"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form.tsx"
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
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form-mini-project.css"
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
          "value": "This document is the sixth chapter of the current React + TypeScript learning route, with the theme "
        },
        {
          "type": "inlineCode",
          "value": "README.md"
        },
        {
          "type": "text",
          "value": " shall prevail:"
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Forms and Controlled Components"
            }
          ]
        },
        {
          "type": "text",
          "value": ". The original Learning Outline of the README wrote Chapter 6 as effects/refs, which conflicts with Chapter Progress; this time, the Learning Outline has been adjusted to Chapter 5 rendering data, Chapter 6 forms, Chapter 7 effects/refs, and Chapter 8 state architecture, so that the numbers are consistent with the completed chapters."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter takes over the already established capabilities of the third layer:"
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
                  "value": "Chapter 3: props are component inputs passed from parent to child, and callback props can pass the operation intention back to the state owner."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Chapter 4: event handler is callback; state is render snapshot; object state is to create a new object; "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault()"
                },
                {
                  "type": "text",
                  "value": " belongs to the browser event API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Chapter 5: Select UI branch based on data; loading, error, empty, and success express different facts; derived values should not be repeatedly stored in the state."
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
          "value": "This chapter does not implement the real SellerHub and does not introduce React Hook Form, Zod, router, backend API, TanStack Query, Prisma or any new dependencies. The final mini project only simulates local submission waiting and is used to learn state boundaries."
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
          "value": "The real form is not as simple as \"putting a few inputs\". It also contains browser, JavaScript, React, TypeScript and tooling five layers:"
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
                  "value": "browser determines form submit, input control internal values, and default navigation behavior."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript event callback reads the DOM event object and calculates next values and validation errors."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React determines which values ​​are controlled by state, how the setter triggers the next render, and which snapshot the current handler sees."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript checks event element type, form values shape, field name and setter input, but the runtime will not verify user input for you."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "ESLint, "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc"
                },
                {
                  "type": "text",
                  "value": " and Vite check static rules, type boundaries and production bundling respectively."
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
          "value": "The core model to be established in this chapter is not the \"form template\", but:"
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Make it clear who owns the value of each field, clarify whether the browser default action of submit is retained, and then model the validation and submission lifecycle into states that are not inconsistent with each other."
            }
          ]
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
              "type": "inlineCode",
              "value": "onChange"
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
              "value": " receives callback instead of executing the result immediately."
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
              "value": "submit, change, and default actions belong to the browser platform."
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
              "value": "form field component can receive value and callback through props."
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
              "value": "handler reads the values in the render that created it."
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
              "value": "When updating one field, keep other fields and create next object."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Conditional rendering"
            }
          ],
          [
            {
              "type": "text",
              "value": "displays validation, pending and success feedback."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Stable list key"
            }
          ],
          [
            {
              "type": "text",
              "value": "select options or dynamic fields require stable identity."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "TypeScript union"
            }
          ],
          [
            {
              "type": "text",
              "value": "category, condition and submission status require finite collection."
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
                  "value": "explains why the browser submits the form, and "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault()"
                },
                {
                  "type": "text",
                  "value": " Which layer of behavior is actually blocked."
                }
              ]
            }
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
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "onChange"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "onChange"
                },
                {
                  "type": "text",
                  "value": " establishes a controlled loop."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains that controlled and uncontrolled are not \"good or bad\", but the current value ownership is different."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses render snapshot to predict the values ​​read by input handler and submit handler."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses object state to express related fields and maintain immutable update."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "correctly controls "
                },
                {
                  "type": "inlineCode",
                  "value": "textarea"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "select"
                },
                {
                  "type": "text",
                  "value": ", checkbox and radio group."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "calculates field errors from current form values instead of rolling all state into a boolean."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "distinguishes three types of facts: validation error, pending, and success."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Write reasonable types for input, textarea, select, form event and field names."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "maps the same mechanism to "
                },
                {
                  "type": "inlineCode",
                  "value": "LoginForm"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "RegisterForm"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "SellerProductForm"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "ShopForm"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "CheckoutForm"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "AdminCategoryForm"
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
                  "value": "first observe pure browser form submit, and then introduce React "
                },
                {
                  "type": "inlineCode",
                  "value": "onSubmit"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault()"
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
                  "value": "learn text input "
                },
                {
                  "type": "inlineCode",
                  "value": "value -> render -> user edit -> onChange -> setter -> render"
                },
                {
                  "type": "text",
                  "value": " loop."
                }
              ]
            }
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
                  "value": "defaultValue"
                },
                {
                  "type": "text",
                  "value": ", it is clear that the subsequent value of uncontrolled input is saved by DOM."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "combines two related fields into object state and reuses Chapter 4 immutable update."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "extends the same controlled model to textarea, select, checkbox, and radio."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Compute validation errors from values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "adds pending and success to avoid overwriting each other."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "finally adds TypeScript field names and element-specific event types, and integrates it in Seller Product Form."
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
          "value": "This sequence first resolves runtimeownership, and then resolves static types. If you write a complex generic handler first, it is easy to mistake the type annotation for the form operating mechanism."
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
              "value": "Form default action"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser performs submission and navigation according to the form attribute"
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
              "value": "will leave the current page if you forget to cancel."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Submit event"
            }
          ],
          [
            {
              "type": "text",
              "value": "event emitted when the form is submitted"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / React event"
            }
          ],
          [
            {
              "type": "text",
              "value": "Both Enter and submit button can be triggered."
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
              "value": "is determined by the React prop input"
            }
          ],
          [
            {
              "type": "text",
              "value": "React framework"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI is consistent with the state snapshot."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Uncontrolled input"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX only gives initial value, subsequent values are saved by DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser DOM"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not enter React state every time it is edited."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "value"
            }
          ],
          [
            {
              "type": "text",
              "value": "text, textarea, select current controlled value"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "must be synchronized with "
            },
            {
              "type": "inlineCode",
              "value": "onChange"
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
              "value": "checked"
            }
          ],
          [
            {
              "type": "text",
              "value": "checkbox/radio current boolean state"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "cannot be used with "
            },
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " replaces selection state."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "defaultValue"
            }
          ],
          [
            {
              "type": "text",
              "value": "uncontrolled control's initial value"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not the subsequent current value."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Validation errors"
            }
          ],
          [
            {
              "type": "text",
              "value": "Field problem derived from current values"
            }
          ],
          [
            {
              "type": "text",
              "value": "Application state"
            }
          ],
          [
            {
              "type": "text",
              "value": "and network pending are not the same fact."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Pending state"
            }
          ],
          [
            {
              "type": "text",
              "value": "submit operation has not yet ended"
            }
          ],
          [
            {
              "type": "text",
              "value": "Application state"
            }
          ],
          [
            {
              "type": "text",
              "value": "is used to disable duplicate submissions and provide feedback."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Field name type"
            }
          ],
          [
            {
              "type": "text",
              "value": "allows updated object key union"
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
              "value": "prevents misspelling of field names."
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
      "label": "Underlying mental model",
      "value": "render snapshot\n  -> React writes value or checked to the DOM control\n  -> user edits the control\n  -> browser creates an event\n  -> React calls the registered handler\n  -> handler reads event.currentTarget\n  -> setter queues the next form object\n  -> React renders with the next snapshot\n  -> DOM control receives the next value or checked prop"
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
                      "value": "JavaScript runtime behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": event handler is a function; spread creates new object; closure captures the current render bindings; "
                },
                {
                  "type": "inlineCode",
                  "value": "Number()"
                },
                {
                  "type": "text",
                  "value": " and string method perform validation calculations."
                }
              ]
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
                      "value": "React framework behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": React saves the state, calls the handler, processes the queued update, and puts "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
                },
                {
                  "type": "text",
                  "value": " is written to DOM control."
                }
              ]
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
                      "value": "Browser platform behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": form submit default action, DOM input internal value, event propagation, focus, and native constraint validation all belong to browser."
                }
              ]
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
                      "value": "TypeScript type-system behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "ChangeEvent<HTMLInputElement>"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "ProductFormValues"
                },
                {
                  "type": "text",
                  "value": " and key union only exist in the editor and compile time, and the input will not be verified after emit."
                }
              ]
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
                      "value": "Tooling behavior"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": "
                },
                {
                  "type": "inlineCode",
                  "value": "tsc -b"
                },
                {
                  "type": "text",
                  "value": " checks types, ESLint checks code rules, Vite converts TSX and builds browser bundles."
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
          "value": "directory is sorted according to \"first browser submit, then field ownership, then multiple controls, then validation/status/type\". Each directory serves only one major learning goal; the final mini project combines these mechanisms individually."
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
      "value": "README.md\npackage.json\nsrc/\n  App.tsx\n  sudoku/\n    main.tsx\n  learning/\n    react/\n      chapter-04-state-and-events/\n      chapter-05-rendering-data/\n      chapter-06-forms/\ndocs/\n  react/\n    chapter-04-state-and-events/\n    chapter-05-rendering-data/\n    chapter-06-forms/"
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
      "value": "docs/react/chapter-06-forms/\n  react-chapter-06-learning-guide.md\nreferences/books/react/\n  the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
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
      "value": "src/learning/react/chapter-06-forms/\n  chapter-06-practice-root.tsx\n  chapter-06-practice.css\n  01-form-submit-default-behavior/\n    form-submit-default-behavior.tsx\n  02-controlled-text-input/\n    controlled-text-input.tsx\n  03-controlled-uncontrolled-boundary/\n    controlled-uncontrolled-boundary.tsx\n  04-object-form-state/\n    object-form-state.tsx\n  05-controlled-textarea-select/\n    controlled-textarea-select.tsx\n  06-controlled-checkbox-radio/\n    controlled-checkbox-radio.tsx\n  07-form-validation/\n    form-validation-feedback.tsx\n  08-submit-status-model/\n    submit-status-model.tsx\n  09-typed-form-fields/\n    typed-form-fields.tsx"
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
          "value": "only explain errors and corrections, no file creation is required:"
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Snippet: value without onChange\nSnippet: checkbox value mistake\nSnippet: direct form state mutation\nSnippet: mixed validation and pending state\nTemplate: typed immutable field update\nTemplate: controlled checkbox"
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
      "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/\n  product-form-types.ts\n  product-form-validation.ts\n  product-form-preview.tsx\n  seller-product-form.tsx\n  seller-product-form-mini-project.css"
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
          "value": "root level "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " continues the agreement in the previous two chapters and only mounts "
        },
        {
          "type": "inlineCode",
          "value": "Chapter06PracticeRoot"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "index.html"
        },
        {
          "type": "text",
          "value": " still passes "
        },
        {
          "type": "inlineCode",
          "value": "src/sudoku/main.tsx"
        },
        {
          "type": "text",
          "value": " creates React root, and this file imports root level "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": "; This chapter has not modified "
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
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/App.tsx",
      "value": "import { Chapter06PracticeRoot } from './learning/react/chapter-06-forms/chapter-06-practice-root'\n\nfunction App() {\n  return <Chapter06PracticeRoot />\n}\n\nexport default App"
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
          "value": "browser will display nine individual mechanism practice cards and a Seller Product Form. Verify source code usage:"
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
      "id": "91-browser-form-submission-and-preventdefault",
      "children": [
        {
          "type": "text",
          "value": "9.1 Browser Form Submission and preventDefault"
        }
      ]
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
          "value": " form submit expresses \"the user completes a set of inputs\" as a form-level event, rather than an accidental click of a button. Understanding default commits and "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " can the submission process be handed over to the React handler without losing the semantics of keyboard submit and browser."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " browser is first responsible for identifying a submission intention and creating a submit event; React is responsible for making "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": " handler responds to this event; the handler then decides whether to cancel the default navigation and whether to update the state. These three steps are not the same level of behavior."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime executes "
        },
        {
          "type": "inlineCode",
          "value": "handleSubmit"
        },
        {
          "type": "text",
          "value": " and setter call; React framework registers handler, queues state update and re-renders; browser API creates submit event and provides "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " and determine the default action; TypeScript type system only checks "
        },
        {
          "type": "inlineCode",
          "value": "FormEvent<HTMLFormElement>"
        },
        {
          "type": "text",
          "value": " will not cancel the submission at runtime."
        }
      ]
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
          "value": "<button type=\"submit\">"
        },
        {
          "type": "text",
          "value": ", Enter or "
        },
        {
          "type": "inlineCode",
          "value": "requestSubmit()"
        },
        {
          "type": "text",
          "value": " may allow the browser to send cancelable submit event to the form. React calls the handler created by this render; "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " sets the default-prevented flag of the event to true, and the subsequent state update of the handler enters the React update queue."
        }
      ]
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
          "value": "onSubmit={handleSubmit}"
        },
        {
          "type": "text",
          "value": " is written in "
        },
        {
          "type": "inlineCode",
          "value": "<form>"
        },
        {
          "type": "text",
          "value": "; call "
        },
        {
          "type": "inlineCode",
          "value": "event.preventDefault()"
        },
        {
          "type": "text",
          "value": "; do not put "
        },
        {
          "type": "inlineCode",
          "value": "return false"
        },
        {
          "type": "text",
          "value": " is used as the cancellation method of React event handler."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The fixed attribute name is "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": " and submit button "
        },
        {
          "type": "inlineCode",
          "value": "type=\"submit\""
        },
        {
          "type": "text",
          "value": "; in this example, the handler signature is "
        },
        {
          "type": "inlineCode",
          "value": "function handleSubmit(event: FormEvent<HTMLFormElement>): void"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault(): void"
        },
        {
          "type": "text",
          "value": " comes from event API."
        }
      ]
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
          "value": "submit"
        },
        {
          "type": "text",
          "value": " is the browser event of form. React "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": " registration handler; "
        },
        {
          "type": "inlineCode",
          "value": "event.preventDefault()"
        },
        {
          "type": "text",
          "value": " calls the browser Event API to cancel the default submission action of the cancelable event, but it will not stop the event propagation and will not automatically update the React state."
        }
      ]
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
          "value": " Why might the page navigate or refresh when clicking the submit button or pressing Enter in a field? Why should the handler hang on the form instead of just listening for button click?"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Level boundary:"
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
                  "value": "Browser: determines what operation triggers submit, and the default action."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React: put "
                },
                {
                  "type": "inlineCode",
                  "value": "onSubmit"
                },
                {
                  "type": "text",
                  "value": " callback is connected to the form event."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "JavaScript: handler function calls event method and setter."
                }
              ]
            }
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
                  "type": "inlineCode",
                  "value": "FormEvent<HTMLFormElement>"
                },
                {
                  "type": "text",
                  "value": " description parameter."
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
          "value": "MDN clearly states that the submit event is triggered at "
        },
        {
          "type": "inlineCode",
          "value": "<form>"
        },
        {
          "type": "text",
          "value": " itself; submit button click, Enter in the field, "
        },
        {
          "type": "inlineCode",
          "value": "requestSubmit()"
        },
        {
          "type": "text",
          "value": " may trigger. "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " only cancels the default action, and the event is still propagated as usual."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/01-form-submit-default-behavior/form-submit-default-behavior.tsx",
      "value": "import { useState } from 'react'\nimport type { FormEvent } from 'react'\n\nexport function FormSubmitDefaultBehavior() {\n  const [submissionMessage, setSubmissionMessage] = useState('No submission yet.')\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>): void {\n    event.preventDefault()\n    setSubmissionMessage('React handled the submit event without a page navigation.')\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Browser boundary</p>\n      <h3>Form submit default behavior</h3>\n      <form onSubmit={handleSubmit}>\n        <label>\n          Search term\n          <input defaultValue=\"wireless keyboard\" name=\"searchTerm\" />\n        </label>\n        <button type=\"submit\">Submit search</button>\n      </form>\n      <p aria-live=\"polite\">{submissionMessage}</p>\n    </section>\n  )\n}\n"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line by line and execution flow:"
            }
          ]
        },
        {
          "type": "text",
          "value": " form render, the browser recognizes the submit button. The user clicks or presses Enter, and the browser creates a submit event; React calls "
        },
        {
          "type": "inlineCode",
          "value": "handleSubmit"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " Cancel the default navigation; setter queue message update; after the handler ends, React re-renders and commits the new text."
        }
      ]
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
          "value": " Forgot "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " occurs, the default action may leave the current document, making it too late for local state feedback to become a stable UI. Just write "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": " also misses the keyboard submit semantics of form."
        }
      ]
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
          "value": " The two imports introduce runtime hook and type-only event type respectively. "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " Save feedback text; "
        },
        {
          "type": "inlineCode",
          "value": "handleSubmit"
        },
        {
          "type": "text",
          "value": " first cancels the browser default action and then queues a new message; JSX hands the handler to the form and passes "
        },
        {
          "type": "inlineCode",
          "value": "aria-live"
        },
        {
          "type": "text",
          "value": " exposes the feedback of the next render. "
        },
        {
          "type": "inlineCode",
          "value": "practice-card"
        },
        {
          "type": "text",
          "value": ", label and heading are the display structure of the real exercise file and do not change the submit mechanism."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " Execute "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", open the entrance to Chapter 6, click the submit button in this exercise; you can also stop the focus in the input box and press Enter, and observe that both operations enter the form handler."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " page does not navigate, initial "
        },
        {
          "type": "inlineCode",
          "value": "No submission yet."
        },
        {
          "type": "text",
          "value": " updated to "
        },
        {
          "type": "inlineCode",
          "value": "React handled the submit event without a page navigation."
        },
        {
          "type": "text",
          "value": "; The address bar and component mounting state remain unchanged."
        }
      ]
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
          "value": " React first commits the form; the user generates a submission intention; the browser creates a submit event; React calls "
        },
        {
          "type": "inlineCode",
          "value": "handleSubmit"
        },
        {
          "type": "text",
          "value": "; the handler cancels the default action and queues the message update; after the handler returns, React re-renders, and finally commits the new paragraph text."
        }
      ]
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
          "value": "submissionMessage"
        },
        {
          "type": "text",
          "value": " is still the old snapshot; "
        },
        {
          "type": "inlineCode",
          "value": "setSubmissionMessage"
        },
        {
          "type": "text",
          "value": " does not modify the string binding, but records the next state. The event object only represents the current submit in this dispatch, and a new render will create a new handler closure."
        }
      ]
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
          "value": " has no navigation because the browser default action is explicitly canceled; the feedback change is because React handles the state update independently. Canceling the default behavior itself does not produce new text, nor does the setter automatically cancel the browser behavior."
        }
      ]
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
          "value": " If you delete "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": ", the handler may still run and queue update first, but the browser can then submit and leave the current document; if you only listen to button "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": ", Enter and other form submit paths in the field will not be reliably covered by the same logic. "
        },
        {
          "type": "inlineCode",
          "value": "form.requestSubmit()"
        },
        {
          "type": "text",
          "value": " will follow the normal submission process and dispatch the submit event, and directly call "
        },
        {
          "type": "inlineCode",
          "value": "form.submit()"
        },
        {
          "type": "text",
          "value": " will not dispatch this event, so it will not enter React "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": " handler."
        }
      ]
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
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": " is understood to mean that \"stop bubbling\" violates the event model; stopping propagation requires another set of APIs. Hanging the handler only on the button violates form-level submission semantics and impairs keyboard and assistive technology behavior."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "LoginForm"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "SellerProductForm"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "CheckoutForm"
        },
        {
          "type": "text",
          "value": " needs to retain the form semantics first, then cancel the default navigation in the submit handler, execute validation, and enter the pending or error branch."
        }
      ]
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
          "value": " browser generates submit and default action, React connects handler and render, JavaScript handler calls browser API and React setter respectively; the three must be reasoned separately."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-controlled-text-inputs-and-render-snapshots",
      "children": [
        {
          "type": "text",
          "value": "9.2 Controlled Text Inputs and Render Snapshots"
        }
      ]
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
          "value": " controlled input makes the current field value an explicit input for React render, allowing preview, validation, button state, and other UI to be derived from the same snapshot."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " describes what this render wants the DOM control to display; "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " describes how to request the next state when the user proposes a new value. It is not a two-way binding syntax, but a one-way loop of event -> setter -> render -> commit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser API saves and exposes the candidate DOM value just entered by the user; React framework calls "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": ", save hook state and synchronize "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": "; JavaScript runtime executes the handler and reads "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.value"
        },
        {
          "type": "text",
          "value": "; TypeScript Check "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": " and string state, but does not save the input value."
        }
      ]
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
          "value": " generates fixed "
        },
        {
          "type": "inlineCode",
          "value": "productName"
        },
        {
          "type": "text",
          "value": " binding. The setter only queues the next string; React only gets the new binding after calling the component again and puts the new JSX "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " commit to input and preview paragraph."
        }
      ]
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
          "value": " editable controlled text input must be provided at the same time string "
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
          "value": ". Use "
        },
        {
          "type": "inlineCode",
          "value": "''"
        },
        {
          "type": "text",
          "value": ", do not use "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " switches between controlled and uncontrolled."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The fixed attribute name is "
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
          "value": "; handler signature is "
        },
        {
          "type": "inlineCode",
          "value": "function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void"
        },
        {
          "type": "text",
          "value": "; candidate value starts from "
        },
        {
          "type": "inlineCode",
          "value": "event.currentTarget.value"
        },
        {
          "type": "text",
          "value": " read."
        }
      ]
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
          "value": " controlled text input comes from "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " prop; User editing triggers "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": ", handler queue next state, next render will write the next value back to the DOM."
        }
      ]
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
          "value": " This is not an input \"directly bound variable\". JavaScript string binding does not change within a render; the setter will not write it back. React generates a new binding after re-calling the component, the new JSX "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " just entered commit."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/02-controlled-text-input/controlled-text-input.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\nexport function ControlledTextInput() {\n  const [productName, setProductName] = useState('Desk Lamp')\n\n  function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void {\n    setProductName(event.currentTarget.value)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Controlled value</p>\n      <h3>Text input follows React state</h3>\n      <label>\n        Product name\n        <input onChange={handleProductNameChange} value={productName} />\n      </label>\n      <p>\n        Current render snapshot: <strong>{productName || 'Empty value'}</strong>\n      </p>\n    </section>\n  )\n}\n"
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
          "value": " first render write "
        },
        {
          "type": "inlineCode",
          "value": "Desk Lamp"
        },
        {
          "type": "text",
          "value": ". Each keystroke generates a change-like event; handler starts from "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.value"
        },
        {
          "type": "text",
          "value": " reads the candidate value of browser control; setter queue string; the next render updates input and paragraph at the same time, so they come from the same snapshot."
        }
      ]
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
      "label": "Snippet: value without onChange",
      "value": "function ReadOnlyByMistake() {\n  const [name] = useState('Desk Lamp')\n  return <input value={name} />\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React forces the DOM value to be equal to "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": ", but no handler updates "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": ", so input is restored with a read-only warning. If the field should be edited, provide sync "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": "; if you only want to give uncontrolled initial value, use "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": "; if it is indeed read-only, explicitly add "
        },
        {
          "type": "inlineCode",
          "value": "readOnly"
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
          "value": "useState('Desk Lamp')"
        },
        {
          "type": "text",
          "value": " creates an initial snapshot; the typed handler reads the string from the current input and calls the setter; the input also receives "
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
          "value": "; paragraph reads the same "
        },
        {
          "type": "inlineCode",
          "value": "productName"
        },
        {
          "type": "text",
          "value": ", fallback is displayed when the string is empty. The class, label and heading in the real file are only responsible for practicing page rendering."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", at "
        },
        {
          "type": "inlineCode",
          "value": "Text input follows React state"
        },
        {
          "type": "text",
          "value": " card."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " input and "
        },
        {
          "type": "inlineCode",
          "value": "Current render snapshot"
        },
        {
          "type": "text",
          "value": " always displays the same value; when the input is cleared, paragraph displays "
        },
        {
          "type": "inlineCode",
          "value": "Empty value"
        },
        {
          "type": "text",
          "value": ", after entering any characters, the two places are updated simultaneously."
        }
      ]
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
          "value": " browser accepts an edit and generates a change-like event; React calls the handler of the current snapshot; the handler reads "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.value"
        },
        {
          "type": "text",
          "value": " and queue state; React re-renders; commit writes next value to input and paragraph at the same time."
        }
      ]
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
          "value": " string is primitive value, "
        },
        {
          "type": "inlineCode",
          "value": "productName"
        },
        {
          "type": "text",
          "value": " will not be modified. The next render creates a new string binding; event's "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": " points to the input to which this handler belongs, and the setter identity remains stable."
        }
      ]
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
          "value": " Both UIs read the same render snapshot, so there are no two sets of data that need to be synchronized manually. The input can continue to be edited because each candidate value will become the next "
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
          "value": "defaultValue=\"Desk Lamp\""
        },
        {
          "type": "text",
          "value": " only sets uncontrolled initial value, subsequent DOM edits do not enter React state; only "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " is not synchronized "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": ", React will restore the DOM to the old snapshot in the commit."
        }
      ]
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
          "value": "setProductName"
        },
        {
          "type": "text",
          "value": " is treated as a direct change variable and will incorrectly predict the read result in the handler; the setter only arranges the next render. Missing "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " continues to spread "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", it violates the rule that the controlled input must update the backing value synchronously."
        }
      ]
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
          "value": " SellerHub The product name, login email, store name and delivery address all require a controlled loop so that validation, preview and submit payload can read the same state."
        }
      ]
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
          "value": " DOM edit is the candidate value, state is the value saved by React, "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " is the UI description of this render; only the next render will generate a new snapshot."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-ownership-boundaries-in-controlled-and-uncontrolled-inputs",
      "children": [
        {
          "type": "text",
          "value": "9.3 Ownership Boundaries in Controlled and Uncontrolled Inputs"
        }
      ]
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
          "value": " ownership boundary determines who saves the current value of the field, and also determines whether the value can be directly read, verified and combined during render. Only by clarifying ownership first can you avoid controlled/uncontrolled switching and synchronization illusions."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " controlled input puts the current value in React state and passes "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " writeback; uncontrolled input only from "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " obtains the initial value, and then the edits are saved by the DOM control itself."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser control always has DOM value; React framework only continuously commits state value to it in controlled mode; JavaScript handler decides whether to send edit to state; TypeScript can check prop and event types, but cannot prove that ownership is not switched during the component life cycle."
        }
      ]
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
          "value": "value"
        },
        {
          "type": "text",
          "value": " participates in synchronization every commit, "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " is only used for initialization. React observes whether the ownership of control is stable based on props; from "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": " becoming string will change the mode and trigger warning."
        }
      ]
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
          "value": " controlled use "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " + "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": "; uncontrolled use "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": ", when you need to submit, you can read the DOM through form data or ref. A control should choose a mode during its lifetime."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " controlled text Fixed use "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", uncontrolled initial value use "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": "; in this example, the handler is "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": ", from "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.value"
        },
        {
          "type": "text",
          "value": " reads string."
        }
      ]
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
          "value": " controlled input's current value is in React state; uncontrolled input's current value is in DOM control. "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " only writes the initial value. Modifying the state later will not make it controlled."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\nexport function ControlledUncontrolledBoundary() {\n  const [controlledValue, setControlledValue] = useState('React owns this value')\n\n  function handleControlledChange(event: ChangeEvent<HTMLInputElement>): void {\n    setControlledValue(event.currentTarget.value)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Ownership boundary</p>\n      <h3>Controlled and uncontrolled inputs</h3>\n      <div className=\"stacked-fields\">\n        <label>\n          Controlled input\n          <input onChange={handleControlledChange} value={controlledValue} />\n        </label>\n        <label>\n          Uncontrolled input\n          <input defaultValue=\"The browser owns later edits\" />\n        </label>\n      </div>\n      <p>Only the first value is available in this component render: {controlledValue}</p>\n    </section>\n  )\n}\n"
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
          "value": " The first item enters React state every time it is edited, so render can immediately derive preview or validation. The second item receives the initial value during mount, and subsequent edits do not require React to save the current value; if it is needed during submit, the browser can provide it through form data instead of pretending that the state has been synchronized."
        }
      ]
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
          "value": " controlled control cannot be switched to uncontrolled or vice versa during the life cycle. text value should always be string; do not pass "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": ", the string will be transmitted after the data comes back. Use "
        },
        {
          "type": "inlineCode",
          "value": "''"
        },
        {
          "type": "text",
          "value": ". Local PDF physical page 73 It is recommended to use "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " clears the controlled input, which conflicts with the current React official documentation; this chapter uses "
        },
        {
          "type": "inlineCode",
          "value": "''"
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
          "value": "useState"
        },
        {
          "type": "text",
          "value": " saves the string of controlled input; the named handler returns the browser value to the setter; the first input uses "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", so controlled by React state; the second one only uses "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": ", so the browser saves the edits after mounting; the paragraph can only directly display the first item known to React."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", edit the Controlled input and Uncontrolled input respectively, and then observe the paragraph below."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Both inputs can be edited, but the paragraph is only updated with the first input; the text change of the second input will not trigger this component state or render."
        }
      ]
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
          "value": " controlled edit enters handler, setter, render, and commit; uncontrolled edit is directly written to the DOM value by the browser, and there is no React setter, so there is no corresponding state transition."
        }
      ]
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
          "value": "controlledValue"
        },
        {
          "type": "text",
          "value": " gets a new string in the next render; the internal value of the uncontrolled DOM node changes, but the component does not have a new JavaScript binding pointing to the value. It can be seen that the UI of the two is similar, but the data ownership is different."
        }
      ]
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
          "value": " paragraph can only read the state in the component render scope, and cannot automatically read the internal value of the DOM node. "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " No continuous synchronization relationship has been established."
        }
      ]
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
          "value": " controlled mode is suitable for real-time preview and validation; uncontrolled mode is suitable for simple fields that are only read when submitting and do not need to be followed by other UIs. Model selection is an ownership decision, not a ranking of advantages and disadvantages."
        }
      ]
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
          "value": " first pass "
        },
        {
          "type": "inlineCode",
          "value": "value={undefined}"
        },
        {
          "type": "text",
          "value": ", and then passing string after the data arrives will switch ownership; use "
        },
        {
          "type": "inlineCode",
          "value": "null"
        },
        {
          "type": "text",
          "value": " clearing text input is not stable string value either. Should start from "
        },
        {
          "type": "inlineCode",
          "value": "''"
        },
        {
          "type": "text",
          "value": " starts controlled, or always use "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " remains uncontrolled."
        }
      ]
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
          "value": " SellerHub's product editing and checkout summary require real-time derived UI, which is suitable for controlled; some auxiliary fields that are only read when the native form is submitted may use uncontrolled, but the reading boundary must be clear."
        }
      ]
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
          "value": "value"
        },
        {
          "type": "text",
          "value": " means that React continues to have current value; "
        },
        {
          "type": "inlineCode",
          "value": "defaultValue"
        },
        {
          "type": "text",
          "value": " only delivers the initial value, after which the browser has edits."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-multi-field-forms-with-object-state",
      "children": [
        {
          "type": "text",
          "value": "9.4 Multi-Field Forms with Object State"
        }
      ]
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
          "value": " object state uses a domain shape to express a set of fields that are commonly submitted, verified, or reset, so that field name, field value, and payload boundaries can be uniformly reasoned."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " object state does not allow multiple inputs to share a variable object, but allows each field edit to create the next object based on the previous snapshot. The computed property name only replaces the edited property, and the remaining properties are retained through spread."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser API exposes "
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
          "value": "value"
        },
        {
          "type": "text",
          "value": " strings; JavaScript runtime performs spread, computed property and object allocation; React framework queues and saves next object reference; TypeScript uses "
        },
        {
          "type": "inlineCode",
          "value": "ShopFormValues"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "keyof"
        },
        {
          "type": "text",
          "value": " restricts legal fields, but assertion will not verify name at runtime."
        }
      ]
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
          "value": "setFormValues((currentValues) => ({ ...currentValues, [fieldName]: fieldValue }))"
        },
        {
          "type": "text",
          "value": " first reads the current object provided by React and then allocates a new object. React can treat the new reference as next state, and the old render snapshot remains unchanged."
        }
      ]
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
          "value": " related values can use a typed object state; use functional updater, object spread and computed property when updating; do not write "
        },
        {
          "type": "inlineCode",
          "value": "formValues[fieldName] = fieldValue"
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
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " DOM field uses fixed "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " property; handler is "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "ShopTextFieldName = keyof ShopFormValues"
        },
        {
          "type": "text",
          "value": "; setter callback receives "
        },
        {
          "type": "inlineCode",
          "value": "ShopFormValues"
        },
        {
          "type": "text",
          "value": " and return complete "
        },
        {
          "type": "inlineCode",
          "value": "ShopFormValues"
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
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " When multiple fields jointly describe a domain object and are often reset, validate, and submit together, object state can make the boundary clearer. It is not that \"object is necessary if there are many fields\", but allows related values ​​to share a clear shape."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "JavaScript with React mechanism:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "formValues.shopName = nextValue"
        },
        {
          "type": "text",
          "value": " will modify the current snapshot reference. The correct approach is to setter callback to receive the previous object and use spread to create the next object. computed property name selects the key for this update."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/04-object-form-state/object-form-state.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\ntype ShopFormValues = {\n  shopName: string\n  supportEmail: string\n}\n\ntype ShopTextFieldName = keyof ShopFormValues\n\nconst initialShopFormValues: ShopFormValues = {\n  shopName: 'Northstar Goods',\n  supportEmail: 'support@example.com',\n}\n\nexport function ObjectFormState() {\n  const [formValues, setFormValues] = useState(initialShopFormValues)\n\n  function handleTextChange(event: ChangeEvent<HTMLInputElement>): void {\n    const fieldName = event.currentTarget.name as ShopTextFieldName\n    const fieldValue = event.currentTarget.value\n\n    setFormValues((currentValues) => ({\n      ...currentValues,\n      [fieldName]: fieldValue,\n    }))\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Object state</p>\n      <h3>Related fields update immutably</h3>\n      <div className=\"stacked-fields\">\n        <label>\n          Shop name\n          <input name=\"shopName\" onChange={handleTextChange} value={formValues.shopName} />\n        </label>\n        <label>\n          Support email\n          <input\n            name=\"supportEmail\"\n            onChange={handleTextChange}\n            type=\"email\"\n            value={formValues.supportEmail}\n          />\n        </label>\n      </div>\n      <p>\n        {formValues.shopName} · {formValues.supportEmail}\n      </p>\n    </section>\n  )\n}\n"
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
          "value": "keyof ShopFormValues"
        },
        {
          "type": "text",
          "value": " produces "
        },
        {
          "type": "inlineCode",
          "value": "'shopName' | 'supportEmail'"
        },
        {
          "type": "text",
          "value": ".DOM "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " is still just a string at runtime, so the example makes an assertion at the boundary of the known field set. The setter callback is guaranteed to be calculated from the current object provided by React; the spread copies the untouched field; the computed key overwrites a property."
        }
      ]
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
      "label": "Snippet: direct form state mutation",
      "value": "formValues.shopName = event.currentTarget.value\nsetFormValues(formValues)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This code modifies the object pointed to by the old snapshot and returns the same reference to the setter. It destroys snapshot reasonability and cannot reliably express next state. When there are many fields, do not mechanically create a dozen unorganized "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": "; First determine whether they belong to the same submit payload and validation boundary."
        }
      ]
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
          "value": " types defines object shape and allowed keys; initial object provides stable initial value; handler reads "
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
          "value": "value"
        },
        {
          "type": "text",
          "value": "; functional updater expands current object and overwrites computed key; "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " is consistent with the object keys; the paragraph is displayed from the same object snapshot combination."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", at "
        },
        {
          "type": "inlineCode",
          "value": "Related fields update immutably"
        },
        {
          "type": "text",
          "value": " card."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " When editing any field, the other field retains its original value; "
        },
        {
          "type": "inlineCode",
          "value": "shopName · supportEmail"
        },
        {
          "type": "text",
          "value": " summary reflects the current object snapshot immediately."
        }
      ]
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
          "value": " browser event provides field name/value; handler narrows name to allowed keys; React calls updater and passes in current state; JavaScript creates next object; next render reads two fields from next object."
        }
      ]
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
          "value": "fieldName"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "fieldValue"
        },
        {
          "type": "text",
          "value": " is the local bindings of this event; "
        },
        {
          "type": "inlineCode",
          "value": "currentValues"
        },
        {
          "type": "text",
          "value": " points to the old state object; spread returns a different reference; the primitive value of the unedited property is copied, and the old object is not mutated."
        }
      ]
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
          "value": " computed key only covers the target field, and spread retains other fields; the new reference makes the boundary between next state and previous snapshot clear, so the summary can reflect updates stably."
        }
      ]
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
          "value": " Multiple independent "
        },
        {
          "type": "inlineCode",
          "value": "useState"
        },
        {
          "type": "text",
          "value": " can also implement two fields, but they need to be reassembled when reset, validate, and submit together; although direct mutation may change the content of the old object, it returns the same reference to the setter and destroys the snapshot model."
        }
      ]
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
          "value": "as ShopTextFieldName"
        },
        {
          "type": "text",
          "value": " is not runtime validation. If "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " comes from uncontrolled configuration, and spelling errors will write additional properties; real projects should make JSX names come from controlled constants or do runtime guard first."
        }
      ]
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
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "SellerProductForm"
        },
        {
          "type": "text",
          "value": " together form a product draft, which is suitable for a "
        },
        {
          "type": "inlineCode",
          "value": "ProductFormValues"
        },
        {
          "type": "text",
          "value": " object and typed update boundary."
        }
      ]
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
          "value": " object state is not to \"write fewer hooks\", but to create a complete next object from the current snapshot each time, and align the field key with the domain type."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-controlled-textarea-and-select-elements",
      "children": [
        {
          "type": "text",
          "value": "9.5 Controlled textarea and select Elements"
        }
      ]
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
          "value": " textarea and select are different browser controls, they can both join the unified form state through the same controlled loop to participate in preview, validation and submit payload."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " textarea current text use "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", not children; single select current choice also uses "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", instead of writing "
        },
        {
          "type": "inlineCode",
          "value": "selected"
        },
        {
          "type": "text",
          "value": ". Both edits pass their respective "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " handler generates next state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser API provides "
        },
        {
          "type": "inlineCode",
          "value": "HTMLTextAreaElement.value"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "HTMLSelectElement.value"
        },
        {
          "type": "text",
          "value": "; React framework commits state value to control; JavaScript runtime creates next details object; TypeScript retains "
        },
        {
          "type": "inlineCode",
          "value": "ProductCategory"
        },
        {
          "type": "text",
          "value": " union, but the static type of browser value is still string."
        }
      ]
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
          "value": " textarea edit and select selection both change the candidate control state of the browser first, then the handler reads the value, queues the next object, and React renders and writes back the canonical value. Whether select assertion is safe or not depends on whether options are controlled by component."
        }
      ]
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
          "value": " textarea use "
        },
        {
          "type": "inlineCode",
          "value": "<textarea value={...} onChange={...} />"
        },
        {
          "type": "text",
          "value": "; select use "
        },
        {
          "type": "inlineCode",
          "value": "<select value={...} onChange={...}>"
        },
        {
          "type": "text",
          "value": "; option "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " must be exactly the same as the literals of the state union."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The fixed attribute name is "
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
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "<option value>"
        },
        {
          "type": "text",
          "value": "; handlers use "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLTextAreaElement>"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLSelectElement>"
        },
        {
          "type": "text",
          "value": "; category updater returns "
        },
        {
          "type": "inlineCode",
          "value": "ProductCategory"
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
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " React uses "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": " controlled loop. Textarea does not use children to represent content; select does not write "
        },
        {
          "type": "inlineCode",
          "value": "selected"
        },
        {
          "type": "text",
          "value": ", and write current "
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
      "label": "src/learning/react/chapter-06-forms/05-controlled-textarea-select/controlled-textarea-select.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\ntype ProductCategory = 'electronics' | 'home' | 'office'\n\ntype ProductDetails = {\n  description: string\n  category: ProductCategory\n}\n\nconst initialProductDetails: ProductDetails = {\n  description: 'A compact lamp for focused desk lighting.',\n  category: 'home',\n}\n\nexport function ControlledTextareaSelect() {\n  const [details, setDetails] = useState(initialProductDetails)\n\n  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>): void {\n    setDetails((currentDetails) => ({\n      ...currentDetails,\n      description: event.currentTarget.value,\n    }))\n  }\n\n  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {\n    setDetails((currentDetails) => ({\n      ...currentDetails,\n      category: event.currentTarget.value as ProductCategory,\n    }))\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Text area and select</p>\n      <h3>Different controls use the same value loop</h3>\n      <div className=\"stacked-fields\">\n        <label>\n          Description\n          <textarea onChange={handleDescriptionChange} value={details.description} />\n        </label>\n        <label>\n          Category\n          <select onChange={handleCategoryChange} value={details.category}>\n            <option value=\"electronics\">Electronics</option>\n            <option value=\"home\">Home</option>\n            <option value=\"office\">Office</option>\n          </select>\n        </label>\n      </div>\n      <p>\n        {details.category}: {details.description.length} characters\n      </p>\n    </section>\n  )\n}\n"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "TypeScript Boundary:"
            }
          ]
        },
        {
          "type": "text",
          "value": " DOM "
        },
        {
          "type": "inlineCode",
          "value": "HTMLSelectElement.value"
        },
        {
          "type": "text",
          "value": " is string, and unions are not automatically deduced from option literals. Therefore, the security premise of assertion is that options are completely controlled by this component. If options come from external sources or URLs, do runtime guard first and then write union state."
        }
      ]
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
          "value": " state is "
        },
        {
          "type": "inlineCode",
          "value": "'home'"
        },
        {
          "type": "text",
          "value": ", option uses "
        },
        {
          "type": "inlineCode",
          "value": "value=\"Home\""
        },
        {
          "type": "text",
          "value": ", there is no matching option when the case is inconsistent; the UI and business union will be separated. The state union and option value should use the same set of canonical values."
        }
      ]
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
          "value": "ProductCategory"
        },
        {
          "type": "text",
          "value": " limits three canonical choices; "
        },
        {
          "type": "inlineCode",
          "value": "ProductDetails"
        },
        {
          "type": "text",
          "value": " combines description and category into an object; both handlers use spread to create next object; textarea reads and writes description; select reads and writes category; summary displays category and description length at the same time."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", modify the Description and switch the Category drop-down option."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " textarea remains editable, and the category switches between three options; the category and number of characters in the summary change synchronously after each render."
        }
      ]
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
          "value": " corresponds to control to generate event; element-specific handler reads string; updater creates next details object; React renders new JSX; commit synchronizes textarea/select and updates summary."
        }
      ]
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
          "value": "currentDetails"
        },
        {
          "type": "text",
          "value": " points to the old object, and the next object uses the new reference; description or category only replaces one of the properties. "
        },
        {
          "type": "inlineCode",
          "value": "event.currentTarget.value as ProductCategory"
        },
        {
          "type": "text",
          "value": " does not convert runtime string and only affects TypeScript checking."
        }
      ]
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
          "value": " Both controls start from the same "
        },
        {
          "type": "inlineCode",
          "value": "details"
        },
        {
          "type": "text",
          "value": " snapshot is read, and the handler retains the unedited property, so switching the category will not clear the description, and editing the description will not lose the selection."
        }
      ]
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
          "value": " textarea children are only suitable for ordinary HTML initial content mental model, not React controlled current value; write "
        },
        {
          "type": "inlineCode",
          "value": "selected"
        },
        {
          "type": "text",
          "value": " will distribute ownership to children. React recommends "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " unified control."
        }
      ]
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
          "value": " option use "
        },
        {
          "type": "inlineCode",
          "value": "value=\"Home\""
        },
        {
          "type": "text",
          "value": ", state use "
        },
        {
          "type": "inlineCode",
          "value": "'home'"
        },
        {
          "type": "text",
          "value": "; directly asserting any external string as union will bypass type protection. External values ​​must be runtime validated first."
        }
      ]
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
          "value": " Product description, category, store introduction and shipping method all need to share a typed form object with different controls; canonical option values will also enter the backend payload."
        }
      ]
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
          "value": " textarea and select have different DOM interfaces, but the controlled mechanism is the same: read browser value, generate next state, and then commit canonical value by React."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-controlled-checkboxes-and-radio-groups",
      "children": [
        {
          "type": "text",
          "value": "9.6 Controlled Checkboxes and Radio Groups"
        }
      ]
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
          "value": " checkbox expresses independent boolean, and radio group expresses mutually exclusive choice. Correctly distinguish "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " can keep UI selection and domain state in the same data type."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " checkbox current selection from boolean "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": "; radio's "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " indicates what this option represents, boolean "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " indicates whether it is currently selected. Share "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " tells the browser to recognize radios as a group."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser input provides boolean "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " and string "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": "; React framework commit "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": "; JavaScript handler sends these primitive values to the setter; TypeScript uses boolean and "
        },
        {
          "type": "inlineCode",
          "value": "ProductCondition"
        },
        {
          "type": "text",
          "value": " union checks the state shape but does not verify any runtime radio value."
        }
      ]
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
          "value": " checkbox edit from "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.checked"
        },
        {
          "type": "text",
          "value": " gets next boolean. radio edit is triggered from input "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " obtains domain literal; use "
        },
        {
          "type": "inlineCode",
          "value": "condition === option"
        },
        {
          "type": "text",
          "value": " calculates "
        },
        {
          "type": "inlineCode",
          "value": "checked"
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
        },
        {
          "type": "text",
          "value": " checkbox must use "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " + "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": "; radio group's controls share "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": ", each has unique "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ", and use boolean expression to control "
        },
        {
          "type": "inlineCode",
          "value": "checked"
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
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The fixed attribute name is "
        },
        {
          "type": "inlineCode",
          "value": "type=\"checkbox\""
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "type=\"radio\""
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "checked"
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
          "value": ", "
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
          "value": "; both handlers use "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": ", but read "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " and "
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
          "value": " checkbox is boolean "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": ", not "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": ". Each input of radio uses boolean expression to control "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": ", share "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " forms a group and uses "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " indicates which domain choice it represents when selected."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/06-controlled-checkbox-radio/controlled-checkbox-radio.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\ntype ProductCondition = 'new' | 'used'\n\nexport function ControlledCheckboxRadio() {\n  const [isPublished, setIsPublished] = useState(false)\n  const [condition, setCondition] = useState<ProductCondition>('new')\n\n  function handlePublishedChange(event: ChangeEvent<HTMLInputElement>): void {\n    setIsPublished(event.currentTarget.checked)\n  }\n\n  function handleConditionChange(event: ChangeEvent<HTMLInputElement>): void {\n    setCondition(event.currentTarget.value as ProductCondition)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Boolean and choice controls</p>\n      <h3>Checkbox and radio state</h3>\n      <label className=\"inline-choice\">\n        <input checked={isPublished} onChange={handlePublishedChange} type=\"checkbox\" />\n        Publish immediately\n      </label>\n      <fieldset>\n        <legend>Condition</legend>\n        <label className=\"inline-choice\">\n          <input\n            checked={condition === 'new'}\n            name=\"condition\"\n            onChange={handleConditionChange}\n            type=\"radio\"\n            value=\"new\"\n          />\n          New\n        </label>\n        <label className=\"inline-choice\">\n          <input\n            checked={condition === 'used'}\n            name=\"condition\"\n            onChange={handleConditionChange}\n            type=\"radio\"\n            value=\"used\"\n          />\n          Used\n        </label>\n      </fieldset>\n      <p>\n        {condition} · {isPublished ? 'Published' : 'Draft'}\n      </p>\n    </section>\n  )\n}\n"
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
      "label": "Snippet: checkbox value mistake",
      "value": "<input\n  onChange={(event) => setPublished(Boolean(event.currentTarget.value))}\n  type=\"checkbox\"\n  value={String(isPublished)}\n/>"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "checkbox "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " is usually a form submission payload string; it does not describe the current check state. non-empty string "
        },
        {
          "type": "inlineCode",
          "value": "'false'"
        },
        {
          "type": "text",
          "value": " is converted to boolean and remains "
        },
        {
          "type": "inlineCode",
          "value": "true"
        },
        {
          "type": "text",
          "value": ". Should read "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.checked"
        },
        {
          "type": "text",
          "value": " and pass boolean "
        },
        {
          "type": "inlineCode",
          "value": "checked"
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
              "value": "line by line explanation:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The first state is publish boolean, the second is condition union; the checkbox handler reads "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": "; radio handler reads "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": "; checkbox's JSX receives boolean directly; two radios use equality to evaluate checked and share name; paragraph derives status from the same snapshot."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", check Publish immediately, and switch between New and Used."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " checkbox switches between Draft/Published; radio group only selects one condition at the same time; summary always displays current condition and publish status."
        }
      ]
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
          "value": " browser changes the candidate selection and dispatches events; React calls the corresponding handler; the setter queues boolean or union literal; next render recalculates each "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": "; commit writes canonical selection back to controls."
        }
      ]
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
          "value": " boolean and string literal are primitive snapshot values; the old handler closure will not be overwritten by the setter. radio inputs are different DOM nodes, but they are all composed of the same "
        },
        {
          "type": "inlineCode",
          "value": "condition"
        },
        {
          "type": "text",
          "value": " binding derived checked."
        }
      ]
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
          "value": " The checked value of each radio comes from the same mutually exclusive equality, so it is impossible to be true at the same time in the React description; the checkbox has an independent boolean and does not depend on the radio value."
        }
      ]
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
          "value": "Boolean(event.currentTarget.value)"
        },
        {
          "type": "text",
          "value": " will replace non-empty "
        },
        {
          "type": "inlineCode",
          "value": "'false'"
        },
        {
          "type": "text",
          "value": " also becomes true; read "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " only gets the actual selection boolean of the browser. If radio uses different names, the browser will not treat them as a group."
        }
      ]
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
          "value": " put checkbox string "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " When the selection state confuses the two browser properties of \"what it represents when submitted\" and \"whether it is selected now\"; radio omission of shared "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " also destroys native group semantics."
        }
      ]
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
          "value": " publish flag, terms agreement and gift option use checkbox boolean; product condition, shipping option and payment choice use radio union."
        }
      ]
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
          "value": " checkbox read and write "
        },
        {
          "type": "inlineCode",
          "value": "checked: boolean"
        },
        {
          "type": "text",
          "value": "; use "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " mark choice, use "
        },
        {
          "type": "inlineCode",
          "value": "checked: boolean"
        },
        {
          "type": "text",
          "value": " represents the current selection, and a union state controls the entire group."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-a-minimal-form-validation-model",
      "children": [
        {
          "type": "text",
          "value": "9.7 A Minimal Form Validation Model"
        }
      ]
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
          "value": " Minimal validation models \"whether values satisfy application rules\" as pure calculation, so that rules can be independently understood, reused and tested without being mixed with DOM events or async submission into a process."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " submit handler reads the current values snapshot, creates a fresh error object, and adds a message to the failure field. errors describes this validation result; it is neither input value nor request status."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime performs string checks and object mutation (only mutation newly created local errors object); React framework saves errors state and conditionally render feedback; browser API provides submit event, and may have constraint validation; TypeScript checks optional error properties, but cannot prove that email is true and valid."
        }
      ]
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
          "value": "nextErrors"
        },
        {
          "type": "text",
          "value": " is created in each submit, and the validation rules are only calculated based on the email/password of the current closure. "
        },
        {
          "type": "inlineCode",
          "value": "setErrors(nextErrors)"
        },
        {
          "type": "text",
          "value": " Replace the previous result with a new reference, and React will decide which error paragraphs exist the next time it renders."
        }
      ]
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
          "value": " submit first "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": ", then derive errors from current values; use clear object shape for field errors; do not use effect monitoring values to implement submit validation that can be calculated synchronously."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " handler is "
        },
        {
          "type": "inlineCode",
          "value": "FormEvent<HTMLFormElement>"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "LoginFormErrors"
        },
        {
          "type": "text",
          "value": " fixed contains optional "
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
          "value": "password"
        },
        {
          "type": "text",
          "value": "; text input from "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget.value"
        },
        {
          "type": "text",
          "value": " gets string."
        }
      ]
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
          "value": " minimum validation is a pure calculation: input current form values, output field-error object. It doesn't require effects, nor does it require a validation library."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/07-form-validation/form-validation-feedback.tsx",
      "value": "import { useState } from 'react'\nimport type { FormEvent } from 'react'\n\ntype LoginFormErrors = {\n  email?: string\n  password?: string\n}\n\nexport function FormValidationFeedback() {\n  const [email, setEmail] = useState('')\n  const [password, setPassword] = useState('')\n  const [errors, setErrors] = useState<LoginFormErrors>({})\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>): void {\n    event.preventDefault()\n\n    const nextErrors: LoginFormErrors = {}\n\n    if (!email.includes('@')) {\n      nextErrors.email = 'Enter a valid email address.'\n    }\n\n    if (password.length < 8) {\n      nextErrors.password = 'Use at least 8 characters.'\n    }\n\n    setErrors(nextErrors)\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Validation model</p>\n      <h3>Validation derives field errors</h3>\n      <form onSubmit={handleSubmit}>\n        <label>\n          Email\n          <input onChange={(event) => setEmail(event.currentTarget.value)} value={email} />\n        </label>\n        {errors.email && <p className=\"field-error\">{errors.email}</p>}\n        <label>\n          Password\n          <input\n            onChange={(event) => setPassword(event.currentTarget.value)}\n            type=\"password\"\n            value={password}\n          />\n        </label>\n        {errors.password && <p className=\"field-error\">{errors.password}</p>}\n        <button type=\"submit\">Validate login</button>\n      </form>\n    </section>\n  )\n}\n"
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
          "value": " submit handler reads the email/password snapshot of this render; creates a fresh errors object; adds questions one by one; replaces errors with a setter. The absence of error does not mean that the server has accepted it, it only means that the client-side rules passed."
        }
      ]
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
          "value": " HTML "
        },
        {
          "type": "inlineCode",
          "value": "required"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "minLength"
        },
        {
          "type": "text",
          "value": " and so on are browser constraint validation; this example uses "
        },
        {
          "type": "inlineCode",
          "value": "noValidate"
        },
        {
          "type": "text",
          "value": " is for explicit observation of application validation. It does not mean that native validation should be turned off in real projects. TypeScript can only check that values ​​are strings, but cannot prove that strings are valid emails."
        }
      ]
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
          "value": " error type allows two fields to exist independently; the three states save source values and derived validation results respectively; the submit handler cancels the default action, creates new errors, executes email/password rules and replaces errors at once; JSX renders field feedback through truthy check conditions."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", submit the empty form first, then enter no "
        },
        {
          "type": "inlineCode",
          "value": "@"
        },
        {
          "type": "text",
          "value": ", and finally enter the values that comply with local rules and resubmit."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " is invalid email shows "
        },
        {
          "type": "inlineCode",
          "value": "Enter a valid email address."
        },
        {
          "type": "text",
          "value": ", short password displays "
        },
        {
          "type": "inlineCode",
          "value": "Use at least 8 characters."
        },
        {
          "type": "text",
          "value": "; After correcting the fields and submitting again, the corresponding messages disappear and the page does not navigate."
        }
      ]
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
          "value": " browser dispatches submit; handler reads the current render snapshot; JavaScript creates and populates next errors; React queues errors state; next render creates or removes paragraphs according to optional properties."
        }
      ]
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
          "value": "email"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "password"
        },
        {
          "type": "text",
          "value": " is the primitive snapshots in submit closure; "
        },
        {
          "type": "inlineCode",
          "value": "nextErrors"
        },
        {
          "type": "text",
          "value": " is the fresh object of each submit; the setter does not modify the old errors reference, but allows the next render to receive the new object."
        }
      ]
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
          "value": " error UI completely powered by "
        },
        {
          "type": "inlineCode",
          "value": "errors.email"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "errors.password"
        },
        {
          "type": "text",
          "value": " exists; the same values ​​will get the same result through the same rules. Passing client rules only means that the local calculation does not find the problem."
        }
      ]
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
          "value": " browser's "
        },
        {
          "type": "inlineCode",
          "value": "required"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "type=\"email\""
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "minLength"
        },
        {
          "type": "text",
          "value": " It belongs to constraint validation; in this example, application rules are explicitly written to facilitate observation of state flow. The two can be combined, but the TypeScript type check cannot be regarded as runtime value validation."
        }
      ]
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
          "value": " Directly sending requests, calling setters or reading DOM in the validation function will cause pure rule to be entangled with side effects; equating the absence of errors with server success will confuse client validation and persistence results."
        }
      ]
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
          "value": " LoginForm, SellerProductForm and CheckoutForm all need to generate field-specific errors before deciding whether to enter the request lifecycle; server validation will be merged as an independent error source later."
        }
      ]
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
          "value": " values is the input, validation is pure calculation, and errors is the output; \"no local error\" only allows submission to continue, but does not mean that the server has been successful."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-modeling-validation-pending-and-success-states",
      "children": [
        {
          "type": "text",
          "value": "9.8 Modeling Validation, Pending, and Success States"
        }
      ]
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
          "value": " discriminated union makes the mutually exclusive state of the submission lifecycle explicit, preventing a boolean from being interpreted as validation error, request pending, and success at the same time."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " field validation and submission lifecycle are two sets of facts: the former explains where the input is illegal, and the latter explains which step a valid submission has taken. "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": " discriminant determines what data the current branch is allowed to carry."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript async function and Promise decide "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": " execution sequence before and after; React framework saves union state and renders according to status; browser API provides "
        },
        {
          "type": "inlineCode",
          "value": "window.setTimeout"
        },
        {
          "type": "text",
          "value": " as local delay; TypeScript limits "
        },
        {
          "type": "inlineCode",
          "value": "submittedEmail"
        },
        {
          "type": "text",
          "value": " is only read in the success branch."
        }
      ]
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
          "value": " submit snapshot passes validation first; queues pending state when valid, "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": " suspends the async function. After the timer expires, the continuation still closes to capture the email at the time of submit, and then queues up the success state."
        }
      ]
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
          "value": " uses mutually exclusive union to express "
        },
        {
          "type": "inlineCode",
          "value": "idle | pending | success"
        },
        {
          "type": "text",
          "value": "; Disable repeated submission when pending; if validation fails, return in advance and do not enter pending. The timer in this example is only a simulation and does not represent network persistence."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " union's fixed discriminant is "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": "; handler signature is "
        },
        {
          "type": "inlineCode",
          "value": "async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void>"
        },
        {
          "type": "text",
          "value": "; delay use "
        },
        {
          "type": "inlineCode",
          "value": "window.setTimeout(resolve, 400)"
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
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " validation error, pending operation, and success result are different facts. Use field map for validation errors; use discriminated union for submission lifecycle. Don't use a "
        },
        {
          "type": "inlineCode",
          "value": "isLoadingOrError"
        },
        {
          "type": "text",
          "value": " boolean expresses multiple mutually exclusive meanings."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/08-submit-status-model/submit-status-model.tsx",
      "value": "import { useState } from 'react'\nimport type { FormEvent } from 'react'\n\ntype SubmissionState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; submittedEmail: string }\n\nexport function SubmitStatusModel() {\n  const [email, setEmail] = useState('seller@example.com')\n  const [validationError, setValidationError] = useState('')\n  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' })\n\n  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {\n    event.preventDefault()\n\n    if (!email.includes('@')) {\n      setValidationError('Enter a valid email address.')\n      return\n    }\n\n    setValidationError('')\n    setSubmission({ status: 'pending' })\n    await new Promise((resolve) => window.setTimeout(resolve, 400))\n    setSubmission({ status: 'success', submittedEmail: email })\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">Submission state</p>\n      <h3>Validation and request status stay separate</h3>\n      <form onSubmit={handleSubmit}>\n        <label>\n          Seller email\n          <input\n            disabled={submission.status === 'pending'}\n            onChange={(event) => setEmail(event.currentTarget.value)}\n            value={email}\n          />\n        </label>\n        {validationError && <p className=\"field-error\">{validationError}</p>}\n        <button disabled={submission.status === 'pending'} type=\"submit\">\n          {submission.status === 'pending' ? 'Submitting...' : 'Submit'}\n        </button>\n      </form>\n      {submission.status === 'success' && (\n        <p className=\"success-message\" role=\"status\">\n          Saved locally for {submission.submittedEmail}.\n        </p>\n      )}\n    </section>\n  )\n}\n"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Async and snapshot:"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "await"
        },
        {
          "type": "text",
          "value": " still holds the "
        },
        {
          "type": "inlineCode",
          "value": "email"
        },
        {
          "type": "text",
          "value": " snapshot. If the user can still edit during the pending period, the success message may show the old submitted value while the input has shown the new value. This exercise reduces ambiguity through the disabled control; a real request also handles race, abort, and server error, but those belong to the async data chapter later."
        }
      ]
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
      "label": "Snippet: mixed validation and pending state",
      "value": "const [hasProblem, setHasProblem] = useState(false)"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This boolean cannot indicate whether the problem is invalid input, pending request or failed request, nor can it carry field message or success data. Should be split by business facts and union bounded to impossible states."
        }
      ]
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
          "value": " union defines legal payload for each status; the three states save email, validation error and lifecycle respectively; the handler first cancels default, verifies email, clears error, enters pending, waits for timer, and then uses captured email to enter success; JSX uses status narrowing to control disabled, button text and success message."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", first enter an invalid email to submit, then change it to a valid email to submit and observe the time sequence of button and feedback."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Invalid values only display the validation message; after the valid values are submitted, the input and button are temporarily disabled, and the button displays "
        },
        {
          "type": "inlineCode",
          "value": "Submitting..."
        },
        {
          "type": "text",
          "value": ", about 400ms and then "
        },
        {
          "type": "inlineCode",
          "value": "Saved locally for ..."
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
          "value": " submit event enters the handler; validation failure returns directly, or success path is queued for pending; React commit disabled UI; microtask continuation is restored after timer resolves; success state is queued and triggers the final render."
        }
      ]
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
          "value": "email"
        },
        {
          "type": "text",
          "value": " is submit snapshot in this async invocation; subsequent render can create a new email binding, but closure will not be automatically replaced by it. Each union update creates a new object reference, and status determines the readable payload."
        }
      ]
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
          "value": " UI branch only reads a clear status, so pending and success will not be established at the same time; disabled controls reduce the ambiguity of repeated submit and snapshot separation from UI values."
        }
      ]
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
          "value": " Single "
        },
        {
          "type": "inlineCode",
          "value": "hasProblem"
        },
        {
          "type": "text",
          "value": " boolean cannot carry field message, pending or submitted data, and interpretation conflicts are also allowed. Multiple mutually independent booleans may also produce "
        },
        {
          "type": "inlineCode",
          "value": "isPending && isSuccess"
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
          "value": " validation Forgetting to return after failure will cause the invalid form to enter pending; writing the local timer as \"saved to the server\" fictionalizes the persistence that does not exist. Real requests also require server error, race and cancellation models."
        }
      ]
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
          "value": " SellerProductForm, checkout and authentication all need to distinguish between validation error, pending, success and subsequent server errors; union is the basis for extending async flow on these pages."
        }
      ]
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
          "value": " field errors explain \"where is the input error\", submission union explains \"where does the valid submission go\"; async closure captures the submit snapshot and does not always read the latest state."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-typing-events-form-values-and-field-names",
      "children": [
        {
          "type": "text",
          "value": "9.9 Typing Events, Form Values, and Field Names"
        }
      ]
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
          "value": " Separate event type, values type and field-name type, allowing each layer to only bear its own constraints: what the DOM element can read, what fields the domain object has, and what keys the generic updater allows to update."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": " describes handler parameters; "
        },
        {
          "type": "inlineCode",
          "value": "RegisterFormValues"
        },
        {
          "type": "text",
          "value": " description state object; "
        },
        {
          "type": "inlineCode",
          "value": "keyof RegisterFormValues"
        },
        {
          "type": "text",
          "value": " produces an allowed field-name union. The three are related, but not of the same type."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " browser runtime still only provides string "
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
          "value": "value"
        },
        {
          "type": "text",
          "value": "; React framework calls the handler and saves the next object; JavaScript runtime performs property access and spread; TypeScript checks element generic, object shape and keys during compilation, and all these annotations are erased after emit."
        }
      ]
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
          "value": " JSX and the TypeScript union, so the handler makes assertions at the controlled boundary. The updater creates the next object with the computed key; if the runtime name is misspelled, the TypeScript assertion itself will not prevent it."
        }
      ]
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
          "value": " named handlers should write specific React event generic; read "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": "; use "
        },
        {
          "type": "inlineCode",
          "value": "keyof"
        },
        {
          "type": "text",
          "value": " expresses legal keys; external field names require runtime guard before entering typed state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " input fixed use "
        },
        {
          "type": "inlineCode",
          "value": "name"
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
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "onChange"
        },
        {
          "type": "text",
          "value": "; handler is "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "RegisterTextFieldName = keyof RegisterFormValues"
        },
        {
          "type": "text",
          "value": "; state updater returns complete "
        },
        {
          "type": "inlineCode",
          "value": "RegisterFormValues"
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
              "value": "Conclusion:"
            }
          ]
        },
        {
          "type": "text",
          "value": " Three types solve different problems: event type determines "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": " have? The values type determines the form object shape; the field name type determines which keys can be updated. They will all be erased after emit."
        }
      ]
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
      "label": "src/learning/react/chapter-06-forms/09-typed-form-fields/typed-form-fields.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\ntype RegisterFormValues = {\n  displayName: string\n  email: string\n}\n\ntype RegisterTextFieldName = keyof RegisterFormValues\n\nconst initialRegisterFormValues: RegisterFormValues = {\n  displayName: '',\n  email: '',\n}\n\nexport function TypedFormFields() {\n  const [formValues, setFormValues] = useState(initialRegisterFormValues)\n\n  function handleFieldChange(event: ChangeEvent<HTMLInputElement>): void {\n    const fieldName = event.currentTarget.name as RegisterTextFieldName\n\n    setFormValues((currentValues) => ({\n      ...currentValues,\n      [fieldName]: event.currentTarget.value,\n    }))\n  }\n\n  return (\n    <section className=\"practice-card\">\n      <p className=\"practice-label\">TypeScript boundary</p>\n      <h3>Event, values, and field names have different types</h3>\n      <div className=\"stacked-fields\">\n        <label>\n          Display name\n          <input name=\"displayName\" onChange={handleFieldChange} value={formValues.displayName} />\n        </label>\n        <label>\n          Email\n          <input\n            name=\"email\"\n            onChange={handleFieldChange}\n            type=\"email\"\n            value={formValues.email}\n          />\n        </label>\n      </div>\n      <p>\n        {formValues.displayName || 'Unnamed seller'} · {formValues.email || 'No email'}\n      </p>\n    </section>\n  )\n}\n"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
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
              "value": ": "
            }
          ]
        },
        {
          "type": "text",
          "value": " React event type can describe both, but the stable boundary of the handler mounting element is "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": ". event bubbling "
        },
        {
          "type": "inlineCode",
          "value": "target"
        },
        {
          "type": "text",
          "value": " may be a deeper descendant; this chapter takes priority from "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": " reads field property."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Tooling Behavior:"
            }
          ]
        },
        {
          "type": "text",
          "value": " inline handler can usually be inferenced by TypeScript; when extracting it as a named function, you must explicitly write "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLInputElement>"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLTextAreaElement>"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "ChangeEvent<HTMLSelectElement>"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "FormEvent<HTMLFormElement>"
        },
        {
          "type": "text",
          "value": ". IDE hover is the fastest way to confirm the type."
        }
      ]
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
          "value": " values type declares two string fields; "
        },
        {
          "type": "inlineCode",
          "value": "keyof"
        },
        {
          "type": "text",
          "value": " derives field-name union; initial object provides stable controlled values; handler reads name from currentTarget and uses functional updater to create next object; two input names match union members exactly; summary displays fallback from the same snapshot."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", edit Display name and Email, and use IDE hover to view named handler, "
        },
        {
          "type": "inlineCode",
          "value": "fieldName"
        },
        {
          "type": "text",
          "value": " and the derived type of state."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " The two inputs are updated independently and will not cover each other; summary displays current values, and empty fields fall back to "
        },
        {
          "type": "inlineCode",
          "value": "Unnamed seller"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "No email"
        },
        {
          "type": "text",
          "value": "; TypeScript reports an error for non-existent field key."
        }
      ]
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
          "value": " browser event provides runtime strings; handler assertion establishes controlled boundaries; updater receives current object, copies and overwrites the target key; React render next object; TypeScript checking only occurs in the build or edit phase."
        }
      ]
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
          "value": " event object and "
        },
        {
          "type": "inlineCode",
          "value": "fieldName"
        },
        {
          "type": "text",
          "value": " only exists in one handler invocation; the current state object retains the old reference; the next object obtains a new reference; type aliases do not exist in emitted JavaScript."
        }
      ]
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
          "value": " The two JSX names are aligned with domain keys, so computed update covers the correct property; spread retains another field; React generates a synchronized summary from the next reference."
        }
      ]
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
          "value": " uses "
        },
        {
          "type": "inlineCode",
          "value": "event.target"
        },
        {
          "type": "text",
          "value": ", the target of the bubbling scene may not be the element of the registered handler; "
        },
        {
          "type": "inlineCode",
          "value": "currentTarget"
        },
        {
          "type": "text",
          "value": " stable indicates the input to which the handler belongs. Writing the field name as a normal string will lose the key constraint."
        }
      ]
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
          "value": " assertion is not validation; if names come from server schema or URL, directly "
        },
        {
          "type": "inlineCode",
          "value": "as RegisterTextFieldName"
        },
        {
          "type": "text",
          "value": " will mask illegal values. The string should first be checked to see if it belongs to allowed keys."
        }
      ]
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
          "value": " SellerHub's register, shop, product and checkout forms all require typed values and field keys; different input elements also require their own accurate event generics."
        }
      ]
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
          "value": " event type manages the DOM interface, values type manages the domain shape, and field-name type manages the legal update key; they cooperate in TypeScript and are still ordinary objects and strings in runtime."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-mapping-forms-to-sellerhub-features",
      "children": [
        {
          "type": "text",
          "value": "9.10 Mapping Forms to SellerHub Features"
        }
      ]
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
          "value": " scene mapping migrates the browser, React, JavaScript and TypeScript mechanisms of this chapter to real page responsibilities, preventing learners from mistaking the field names of a certain demo for a fixed template that can only be used for that demo."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " Login, register, product, shop and checkout forms share controlled loop, submit boundary and status model, but they have different values shape and validation rules. What is reused is the mechanism and modeling method, rather than copying a form component to all pages."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "boundary: JavaScript runtime/React framework/browser API/TypeScript type system:"
            }
          ]
        },
        {
          "type": "text",
          "value": " JavaScript runtime still handles values objects, validation functions and async control flow; React framework manages state, render and conditional feedback; browser API manages form controls, events and default actions; TypeScript type system establishes different values, errors and submission unions for each domain."
        }
      ]
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
          "value": " Each real form converts browser edit into typed state update, and then derives preview or errors from current snapshot. When submitting, the default action and validation are processed first, and then the async request can be entered; subsequent libraries only encapsulate some of these steps and will not eliminate these underlying boundaries."
        }
      ]
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
          "value": " Define a clear values type for each domain; use controlled controls to express fields that need to be derived in real time; let validation receive values and return errors; use union to express mutually exclusive submission states."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed attribute name/parameter signature:"
            }
          ]
        },
        {
          "type": "text",
          "value": " form still uses "
        },
        {
          "type": "inlineCode",
          "value": "onSubmit"
        },
        {
          "type": "text",
          "value": ", controls use "
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
          "value": "checked"
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
          "value": "; Seller product domain uses "
        },
        {
          "type": "inlineCode",
          "value": "ProductFormValues"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "ProductFormErrors"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "ProductFormSubmission"
        },
        {
          "type": "text",
          "value": ", option lists by "
        },
        {
          "type": "inlineCode",
          "value": "as const"
        },
        {
          "type": "text",
          "value": " reserved literal members."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " The following real-type files fully display the runtime option data, TypeScript unions, values, errors, submission state and initial values ​​of the Seller Product Form."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts",
      "value": "export const productCategories = ['electronics', 'home', 'office'] as const\nexport const productConditions = ['new', 'used'] as const\n\nexport type ProductCategory = (typeof productCategories)[number]\nexport type ProductCondition = (typeof productConditions)[number]\n\nexport type ProductFormValues = {\n  name: string\n  description: string\n  category: ProductCategory\n  condition: ProductCondition\n  price: string\n  isPublished: boolean\n}\n\nexport type ProductFormFieldName = keyof ProductFormValues\nexport type ProductFormErrors = Partial<Record<ProductFormFieldName, string>>\n\nexport type ProductFormSubmission =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; submittedName: string }\n\nexport const initialProductFormValues: ProductFormValues = {\n  name: 'Aurora Desk Lamp',\n  description: 'A compact task light with adjustable brightness.',\n  category: 'home',\n  condition: 'new',\n  price: '49.00',\n  isPublished: false,\n}"
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
          "value": " The two const arrays are runtime options, "
        },
        {
          "type": "inlineCode",
          "value": "as const"
        },
        {
          "type": "text",
          "value": " reserved literal members; indexed access derived from arrays category/condition unions; "
        },
        {
          "type": "inlineCode",
          "value": "ProductFormValues"
        },
        {
          "type": "text",
          "value": " Description source values; "
        },
        {
          "type": "inlineCode",
          "value": "keyof"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "Partial<Record<...>>"
        },
        {
          "type": "text",
          "value": " modeling field errors; submission union limits mutually exclusive lifecycle; initial object provides stable initial values for all controlled fields."
        }
      ]
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
        },
        {
          "type": "text",
          "value": " executes "
        },
        {
          "type": "inlineCode",
          "value": "npm run dev"
        },
        {
          "type": "text",
          "value": ", open the final "
        },
        {
          "type": "inlineCode",
          "value": "Seller Product Form"
        },
        {
          "type": "text",
          "value": ", and check in the editor how this type of file is imported by form, preview and validation modules."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "expected output or interaction result:"
            }
          ]
        },
        {
          "type": "text",
          "value": " category and condition can only be selected from the given options; price remains a string in the input state; publish checkbox uses boolean; valid submit can enter pending and success from idle."
        }
      ]
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
          "value": " runtime arrays generate option nodes; after the user selects, the handler narrows the string to the corresponding union; the values object enters validation; the errors map controls field feedback; the submission union controls button and success message."
        }
      ]
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
          "value": " const arrays are stable after module initialization; each field edit creates a new values object; error calculation creates a new errors object; submission transition creates a different "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": ". All type aliases are erased after emit."
        }
      ]
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
          "value": " runtime options and type unions come from the same const data, reducing the drift of both; the complete initial object prevents controlled fields from starting from undefined; union allows status-specific data to appear only in legal branches."
        }
      ]
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
          "value": " If the options array and the handwritten union are maintained separately, only one side may be changed when adding a category; if the price directly stores the number, the intermediate state between empty input and decimal input is difficult to express; if submission only uses boolean, the submitted name cannot be carried."
        }
      ]
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
          "value": " shares all SellerHub forms into one over-wide "
        },
        {
          "type": "inlineCode",
          "value": "Record<string, unknown>"
        },
        {
          "type": "text",
          "value": " will lose domain props and field keys; treating the front-end validation type as server guarantee also confuses type checking and runtime trust boundary."
        }
      ]
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
          "value": " directly corresponds to the Seller Product Form; LoginForm, ShopForm and CheckoutForm should reuse the same modeling method, but define their own values, errors and submission payload respectively."
        }
      ]
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
          "value": " SellerHub form reuses controlled loop, immutable update, pure validation and explicit status, rather than reusing a universal values type; each domain should retain its own boundaries."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The mechanism in this chapter will appear repeatedly in SellerHub, but the domain rules of different forms are different:"
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
            "value": "Form"
          }
        ],
        [
          {
            "type": "text",
            "value": "Core Values"
          }
        ],
        [
          {
            "type": "text",
            "value": "Controlled Mechanism"
          }
        ],
        [
          {
            "type": "text",
            "value": "Validation Focus"
          }
        ],
        [
          {
            "type": "text",
            "value": "Later Connection"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "inlineCode",
              "value": "LoginForm"
            }
          ],
          [
            {
              "type": "text",
              "value": "email, password"
            }
          ],
          [
            {
              "type": "text",
              "value": "text/password input"
            }
          ],
          [
            {
              "type": "text",
              "value": "required, email shape"
            }
          ],
          [
            {
              "type": "text",
              "value": "authentication request"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "RegisterForm"
            }
          ],
          [
            {
              "type": "text",
              "value": "name, email, password, agreement"
            }
          ],
          [
            {
              "type": "text",
              "value": "object state + checkbox"
            }
          ],
          [
            {
              "type": "text",
              "value": "password, agreement"
            }
          ],
          [
            {
              "type": "text",
              "value": "account creation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "SellerProductForm"
            }
          ],
          [
            {
              "type": "text",
              "value": "name, description, category, price, condition, publish"
            }
          ],
          [
            {
              "type": "text",
              "value": "all chapter controls"
            }
          ],
          [
            {
              "type": "text",
              "value": "product rules"
            }
          ],
          [
            {
              "type": "text",
              "value": "product mutation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "ShopForm"
            }
          ],
          [
            {
              "type": "text",
              "value": "shop name, description, support email"
            }
          ],
          [
            {
              "type": "text",
              "value": "text + textarea"
            }
          ],
          [
            {
              "type": "text",
              "value": "identity/contact"
            }
          ],
          [
            {
              "type": "text",
              "value": "seller onboarding"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "CheckoutForm"
            }
          ],
          [
            {
              "type": "text",
              "value": "address, shipping, payment choice"
            }
          ],
          [
            {
              "type": "text",
              "value": "object state + select/radio"
            }
          ],
          [
            {
              "type": "text",
              "value": "address completeness"
            }
          ],
          [
            {
              "type": "text",
              "value": "order submission"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "AdminCategoryForm"
            }
          ],
          [
            {
              "type": "text",
              "value": "label, slug, active"
            }
          ],
          [
            {
              "type": "text",
              "value": "text + checkbox"
            }
          ],
          [
            {
              "type": "text",
              "value": "uniqueness/format"
            }
          ],
          [
            {
              "type": "text",
              "value": "admin mutation"
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
          "value": "This chapter only implements "
        },
        {
          "type": "inlineCode",
          "value": "SellerProductForm"
        },
        {
          "type": "text",
          "value": " 's client-only learning version because it covers all controls without the need to fake authentication, payment or backend behavior. When connecting to React Hook Form, Zod or request library in the future, browser submission, field ownership, state snapshot and type erasure will still exist; the library only changes the code organization and validation capabilities."
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
              "value": "<form onSubmit>"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "register submit callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "function"
            }
          ],
          [
            {
              "type": "text",
              "value": "Called when submit"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only listen to button click"
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
              "value": "Browser Event API"
            }
          ],
          [
            {
              "type": "text",
              "value": "cancel cancelable default action"
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
              "value": "does not execute the default action"
            }
          ],
          [
            {
              "type": "text",
              "value": "mistakenly thought stop propagation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "value"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "control text/textarea/select current value"
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
              "value": "commit to DOM control"
            }
          ],
          [
            {
              "type": "text",
              "value": "is not worthy of "
            },
            {
              "type": "inlineCode",
              "value": "onChange"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "checked"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "control checkbox/radio selection"
            }
          ],
          [
            {
              "type": "text",
              "value": "boolean"
            }
          ],
          [
            {
              "type": "text",
              "value": "commit selection"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses string "
            },
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " replaces"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "defaultValue"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "set uncontrolled initial value"
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
              "value": "only affects the initial value"
            }
          ],
          [
            {
              "type": "text",
              "value": "later wants to use state to control"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "defaultChecked"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "setting uncontrolled initial selection"
            }
          ],
          [
            {
              "type": "text",
              "value": "boolean"
            }
          ],
          [
            {
              "type": "text",
              "value": "only affects the initial value"
            }
          ],
          [
            {
              "type": "text",
              "value": "and "
            },
            {
              "type": "inlineCode",
              "value": "checked"
            },
            {
              "type": "text",
              "value": " mixed with"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "event.currentTarget.value"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM / React event"
            }
          ],
          [
            {
              "type": "text",
              "value": "Read text-like control candidate value"
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
              "value": "string"
            }
          ],
          [
            {
              "type": "text",
              "value": "assumes automatically union/number"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "event.currentTarget.checked"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM / React event"
            }
          ],
          [
            {
              "type": "text",
              "value": "read checkbox candidate state"
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
              "value": "boolean"
            }
          ],
          [
            {
              "type": "text",
              "value": "reads "
            },
            {
              "type": "inlineCode",
              "value": "value"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "object spread"
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
              "value": "Create next form object"
            }
          ],
          [
            {
              "type": "text",
              "value": "current object"
            }
          ],
          [
            {
              "type": "text",
              "value": "new reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "direct mutation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "keyof"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type operator"
            }
          ],
          [
            {
              "type": "text",
              "value": "generates field key union"
            }
          ],
          [
            {
              "type": "text",
              "value": "object type"
            }
          ],
          [
            {
              "type": "text",
              "value": "compile-time union"
            }
          ],
          [
            {
              "type": "text",
              "value": "is verified runtime string"
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
              "value": "value"
            },
            {
              "type": "text",
              "value": " without "
            },
            {
              "type": "inlineCode",
              "value": "onChange"
            }
          ],
          [
            {
              "type": "text",
              "value": "React warning / behavior bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled value is not synchronized update path"
            }
          ],
          [
            {
              "type": "text",
              "value": "plus handler, "
            },
            {
              "type": "inlineCode",
              "value": "readOnly"
            },
            {
              "type": "text",
              "value": " or change to "
            },
            {
              "type": "inlineCode",
              "value": "defaultValue"
            }
          ],
          [
            {
              "type": "text",
              "value": "Input bounces back immediately"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "defaultValue"
            },
            {
              "type": "text",
              "value": " Later switch to state"
            }
          ],
          [
            {
              "type": "text",
              "value": "ownership bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "lifecycle switch to controlled mode"
            }
          ],
          [
            {
              "type": "text",
              "value": "Selected ownership"
            }
          ],
          [
            {
              "type": "text",
              "value": "uncontrolled-to-controlled warning"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "submit Forgot "
            },
            {
              "type": "inlineCode",
              "value": "preventDefault"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser behavior bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "Keep default navigation"
            }
          ],
          [
            {
              "type": "text",
              "value": "Cancel default in client handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "Page refresh or URL change"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "checkbox reads "
            },
            {
              "type": "inlineCode",
              "value": "value"
            }
          ],
          [
            {
              "type": "text",
              "value": "data bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "selection state in "
            },
            {
              "type": "inlineCode",
              "value": "checked"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses boolean checked"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "'false'"
            },
            {
              "type": "text",
              "value": " still truthy"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "select union is different from option value"
            }
          ],
          [
            {
              "type": "text",
              "value": "state/UI mismatch"
            }
          ],
          [
            {
              "type": "text",
              "value": "canonical values are inconsistent"
            }
          ],
          [
            {
              "type": "text",
              "value": "shares literal values"
            }
          ],
          [
            {
              "type": "text",
              "value": "has no matching option"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "direct mutation object state"
            }
          ],
          [
            {
              "type": "text",
              "value": "React state bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "Modify old snapshot reference"
            }
          ],
          [
            {
              "type": "text",
              "value": "spread creates next object"
            }
          ],
          [
            {
              "type": "text",
              "value": "The old snapshot was also changed"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "validation mixed with pending"
            }
          ],
          [
            {
              "type": "text",
              "value": "state-model bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "Different facts share the same flag"
            }
          ],
          [
            {
              "type": "text",
              "value": "errors map + status union"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI cannot explain the current state"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "event target type fuzzy"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript boundary error"
            }
          ],
          [
            {
              "type": "text",
              "value": "No description handler element"
            }
          ],
          [
            {
              "type": "text",
              "value": "uses element-specific event type"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "checked"
            },
            {
              "type": "text",
              "value": " error"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "A large number of unorganized state"
            }
          ],
          [
            {
              "type": "text",
              "value": "maintainability issue"
            }
          ],
          [
            {
              "type": "text",
              "value": "Same payload without shape"
            }
          ],
          [
            {
              "type": "text",
              "value": "Related field composition object"
            }
          ],
          [
            {
              "type": "text",
              "value": "reset/submit Many variables need to be spelled manually"
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
          "value": "Create a client-only "
        },
        {
          "type": "inlineCode",
          "value": "SellerProductForm"
        },
        {
          "type": "text",
          "value": ": The seller edits the product name, description, category, condition, price and publish choice; the page instantly displays derived preview; when submitting, basic validation is performed, pending is displayed, and local success feedback is finally given."
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
          "value": "It integrates controlled text input, textarea, select, checkbox, radio, object state, immutable update, field validation, pending/success branch and TypeScript form model. It is directly related to the subsequent SellerHub product mutation, but does not forge backend persistence."
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
      "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/\n  product-form-types.ts\n  product-form-validation.ts\n  product-form-preview.tsx\n  seller-product-form.tsx\n  seller-product-form-mini-project.css"
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
              "value": "product-form-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "defines option literals, form values, errors, submission union and initial values."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-form-validation.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "pure validation calculation and error existence check."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "product-form-preview.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "derives preview from current values and does not save duplicate state."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-product-form.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "has values/errors/submission state, which handles events and submit flow."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "seller-product-form-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Small project layout, fields, feedback and responsive styles."
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
      "label": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts",
      "value": "export const productCategories = ['electronics', 'home', 'office'] as const\nexport const productConditions = ['new', 'used'] as const\n\nexport type ProductCategory = (typeof productCategories)[number]\nexport type ProductCondition = (typeof productConditions)[number]\n\nexport type ProductFormValues = {\n  name: string\n  description: string\n  category: ProductCategory\n  condition: ProductCondition\n  price: string\n  isPublished: boolean\n}\n\nexport type ProductFormFieldName = keyof ProductFormValues\nexport type ProductFormErrors = Partial<Record<ProductFormFieldName, string>>\n\nexport type ProductFormSubmission =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; submittedName: string }\n\nexport const initialProductFormValues: ProductFormValues = {\n  name: 'Aurora Desk Lamp',\n  description: 'A compact task light with adjustable brightness.',\n  category: 'home',\n  condition: 'new',\n  price: '49.00',\n  isPublished: false,\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "as const"
        },
        {
          "type": "text",
          "value": " allows option arrays to retain literal members; indexed access types derive unions from the same runtime data, reducing option values ​​and TypeScript union drift. price remains a string because the DOM number input is "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " is still a string; it is explicitly converted only during validation."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-validation.ts",
      "value": "import type { ProductFormErrors, ProductFormValues } from './product-form-types'\n\nexport function validateProductForm(values: ProductFormValues): ProductFormErrors {\n  const errors: ProductFormErrors = {}\n  const numericPrice = Number(values.price)\n\n  if (values.name.trim().length < 3) {\n    errors.name = 'Use at least 3 characters.'\n  }\n\n  if (values.description.trim().length < 20) {\n    errors.description = 'Use at least 20 characters.'\n  }\n\n  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {\n    errors.price = 'Enter a price greater than zero.'\n  }\n\n  return errors\n}\n\nexport function hasProductFormErrors(errors: ProductFormErrors): boolean {\n  return Object.keys(errors).length > 0\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "validation function does not read the DOM, does not call the setter, and has no effect; the same values always get the same errors. It is suitable for subsequent independent testing, but this chapter does not introduce the test framework."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-preview.tsx",
      "value": "import type { ProductFormValues } from './product-form-types'\n\ntype ProductFormPreviewProps = {\n  values: ProductFormValues\n}\n\nexport function ProductFormPreview({ values }: ProductFormPreviewProps) {\n  const numericPrice = Number(values.price)\n  const displayPrice = Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : '0.00'\n\n  return (\n    <aside className=\"product-preview\" aria-labelledby=\"product-preview-title\">\n      <p className=\"preview-label\">Derived preview</p>\n      <h3 id=\"product-preview-title\">{values.name.trim() || 'Untitled product'}</h3>\n      <p>{values.description.trim() || 'Add a description to preview the listing.'}</p>\n      <dl>\n        <div>\n          <dt>Category</dt>\n          <dd>{values.category}</dd>\n        </div>\n        <div>\n          <dt>Condition</dt>\n          <dd>{values.condition}</dd>\n        </div>\n        <div>\n          <dt>Price</dt>\n          <dd>${displayPrice}</dd>\n        </div>\n        <div>\n          <dt>Visibility</dt>\n          <dd>{values.isPublished ? 'Published' : 'Draft'}</dd>\n        </div>\n      </dl>\n    </aside>\n  )\n}\n"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "preview does not have its own state. It is calculated from the parent's current values ​​for each render, so there is no synchronization problem of \"the form has been updated but the preview is still the old value\"."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent, FormEvent } from 'react'\nimport { ProductFormPreview } from './product-form-preview'\nimport {\n  initialProductFormValues,\n  productCategories,\n  productConditions,\n} from './product-form-types'\nimport type {\n  ProductCategory,\n  ProductCondition,\n  ProductFormErrors,\n  ProductFormSubmission,\n  ProductFormValues,\n} from './product-form-types'\nimport { hasProductFormErrors, validateProductForm } from './product-form-validation'\nimport './seller-product-form-mini-project.css'\n\nexport function SellerProductForm() {\n  const [formValues, setFormValues] = useState(initialProductFormValues)\n  const [validationErrors, setValidationErrors] = useState<ProductFormErrors>({})\n  const [submission, setSubmission] = useState<ProductFormSubmission>({ status: 'idle' })\n\n  function updateField<FieldName extends keyof ProductFormValues>(\n    fieldName: FieldName,\n    fieldValue: ProductFormValues[FieldName],\n  ): void {\n    setFormValues((currentValues) => ({\n      ...currentValues,\n      [fieldName]: fieldValue,\n    }))\n\n    setValidationErrors((currentErrors) => {\n      if (!currentErrors[fieldName]) {\n        return currentErrors\n      }\n\n      const nextErrors = { ...currentErrors }\n      delete nextErrors[fieldName]\n      return nextErrors\n    })\n\n    if (submission.status === 'success') {\n      setSubmission({ status: 'idle' })\n    }\n  }\n\n  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {\n    updateField('name', event.currentTarget.value)\n  }\n\n  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>): void {\n    updateField('description', event.currentTarget.value)\n  }\n\n  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {\n    updateField('category', event.currentTarget.value as ProductCategory)\n  }\n\n  function handleConditionChange(event: ChangeEvent<HTMLInputElement>): void {\n    updateField('condition', event.currentTarget.value as ProductCondition)\n  }\n\n  function handlePriceChange(event: ChangeEvent<HTMLInputElement>): void {\n    updateField('price', event.currentTarget.value)\n  }\n\n  function handlePublishedChange(event: ChangeEvent<HTMLInputElement>): void {\n    updateField('isPublished', event.currentTarget.checked)\n  }\n\n  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {\n    event.preventDefault()\n\n    const nextErrors = validateProductForm(formValues)\n    setValidationErrors(nextErrors)\n\n    if (hasProductFormErrors(nextErrors)) {\n      setSubmission({ status: 'idle' })\n      return\n    }\n\n    setSubmission({ status: 'pending' })\n    await new Promise((resolve) => window.setTimeout(resolve, 650))\n    setSubmission({ status: 'success', submittedName: formValues.name.trim() })\n  }\n\n  const isPending = submission.status === 'pending'\n\n  return (\n    <section className=\"seller-product-project\" aria-labelledby=\"seller-product-form-title\">\n      <header className=\"project-header\">\n        <div>\n          <p className=\"project-eyebrow\">SellerHub learning connection</p>\n          <h2 id=\"seller-product-form-title\">Seller Product Form</h2>\n          <p>\n            Practice a local product draft flow before adding routing, validation libraries,\n            or a backend.\n          </p>\n        </div>\n        <span className=\"project-status\">{formValues.isPublished ? 'Published' : 'Draft'}</span>\n      </header>\n\n      <div className=\"product-form-layout\">\n        <form className=\"product-form\" noValidate onSubmit={handleSubmit}>\n          <label>\n            Product name\n            <input\n              aria-describedby={validationErrors.name ? 'product-name-error' : undefined}\n              aria-invalid={Boolean(validationErrors.name)}\n              disabled={isPending}\n              name=\"name\"\n              onChange={handleNameChange}\n              value={formValues.name}\n            />\n          </label>\n          {validationErrors.name && (\n            <p className=\"field-error\" id=\"product-name-error\">\n              {validationErrors.name}\n            </p>\n          )}\n\n          <label>\n            Description\n            <textarea\n              aria-describedby={\n                validationErrors.description ? 'product-description-error' : undefined\n              }\n              aria-invalid={Boolean(validationErrors.description)}\n              disabled={isPending}\n              name=\"description\"\n              onChange={handleDescriptionChange}\n              rows={5}\n              value={formValues.description}\n            />\n          </label>\n          {validationErrors.description && (\n            <p className=\"field-error\" id=\"product-description-error\">\n              {validationErrors.description}\n            </p>\n          )}\n\n          <div className=\"product-form-row\">\n            <label>\n              Category\n              <select\n                disabled={isPending}\n                name=\"category\"\n                onChange={handleCategoryChange}\n                value={formValues.category}\n              >\n                {productCategories.map((category) => (\n                  <option key={category} value={category}>\n                    {category}\n                  </option>\n                ))}\n              </select>\n            </label>\n\n            <label>\n              Price\n              <input\n                aria-describedby={validationErrors.price ? 'product-price-error' : undefined}\n                aria-invalid={Boolean(validationErrors.price)}\n                disabled={isPending}\n                inputMode=\"decimal\"\n                min=\"0.01\"\n                name=\"price\"\n                onChange={handlePriceChange}\n                step=\"0.01\"\n                type=\"number\"\n                value={formValues.price}\n              />\n            </label>\n          </div>\n          {validationErrors.price && (\n            <p className=\"field-error\" id=\"product-price-error\">\n              {validationErrors.price}\n            </p>\n          )}\n\n          <fieldset disabled={isPending}>\n            <legend>Condition</legend>\n            <div className=\"condition-options\">\n              {productConditions.map((condition) => (\n                <label className=\"inline-choice\" key={condition}>\n                  <input\n                    checked={formValues.condition === condition}\n                    name=\"condition\"\n                    onChange={handleConditionChange}\n                    type=\"radio\"\n                    value={condition}\n                  />\n                  {condition}\n                </label>\n              ))}\n            </div>\n          </fieldset>\n\n          <label className=\"publish-option\">\n            <input\n              checked={formValues.isPublished}\n              disabled={isPending}\n              name=\"isPublished\"\n              onChange={handlePublishedChange}\n              type=\"checkbox\"\n            />\n            Publish after saving\n          </label>\n\n          <button disabled={isPending} type=\"submit\">\n            {isPending ? 'Saving product...' : 'Save product'}\n          </button>\n\n          {submission.status === 'success' && (\n            <p className=\"success-message\" role=\"status\">\n              {submission.submittedName} passed local validation and was saved in this demo.\n            </p>\n          )}\n        </form>\n\n        <ProductFormPreview values={formValues} />\n      </div>\n    </section>\n  )\n}\n"
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
          "value": "seller-product-form.tsx"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "aria-describedby"
        },
        {
          "type": "text",
          "value": " and corresponding error IDs associate visible message to control; class names also connect to complete CSS. When reading this document, think of state ownership, typed field update, validation, submission union, accessibility attributes, and layout hooks as separate responsibilities of the same real component."
        }
      ]
    },
    {
      "type": "code",
      "language": "css",
      "label": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form-mini-project.css",
      "value": ".seller-product-project {\n  overflow: hidden;\n  margin-top: 64px;\n  border: 1px solid #cfd7e3;\n  border-radius: 14px;\n  background: #ffffff;\n  box-shadow: 0 18px 52px rgb(16 24 40 / 9%);\n}\n\n.project-header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 30px;\n  color: #ffffff;\n  background: #14213d;\n}\n\n.project-eyebrow,\n.preview-label {\n  margin: 0;\n  color: #93c5fd;\n  font-size: 0.74rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.project-header h2 {\n  margin: 8px 0 0;\n  font-size: clamp(1.8rem, 4vw, 2.8rem);\n}\n\n.project-header div > p:last-child {\n  max-width: 680px;\n  margin: 12px 0 0;\n  color: #cbd5e1;\n  line-height: 1.6;\n}\n\n.project-status {\n  padding: 7px 12px;\n  border: 1px solid rgb(255 255 255 / 28%);\n  border-radius: 999px;\n  font-weight: 800;\n}\n\n.product-form-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);\n  gap: 0;\n}\n\n.product-form {\n  display: grid;\n  gap: 16px;\n  padding: 30px;\n}\n\n.product-form label:not(.inline-choice, .publish-option) {\n  display: grid;\n  gap: 7px;\n  color: #344054;\n  font-weight: 750;\n}\n\n.product-form input:not([type='checkbox'], [type='radio']),\n.product-form textarea,\n.product-form select {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 11px 12px;\n  color: #101828;\n  border: 1px solid #98a2b3;\n  border-radius: 8px;\n  background: #ffffff;\n  font: inherit;\n}\n\n.product-form textarea {\n  resize: vertical;\n}\n\n.product-form input:focus,\n.product-form textarea:focus,\n.product-form select:focus {\n  border-color: #2563eb;\n  outline: 3px solid rgb(37 99 235 / 18%);\n}\n\n.product-form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n\n.product-form fieldset {\n  margin: 0;\n  padding: 14px;\n  border: 1px solid #d0d5dd;\n  border-radius: 8px;\n}\n\n.product-form legend {\n  padding: 0 6px;\n  color: #344054;\n  font-weight: 800;\n}\n\n.condition-options {\n  display: flex;\n  gap: 18px;\n}\n\n.publish-option,\n.inline-choice {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #344054;\n  font-weight: 700;\n}\n\n.product-form button {\n  padding: 12px 18px;\n  color: #ffffff;\n  border: 1px solid #2563eb;\n  border-radius: 8px;\n  background: #2563eb;\n  font: inherit;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n.product-form button:disabled {\n  cursor: wait;\n  opacity: 0.62;\n}\n\n.product-preview {\n  padding: 30px;\n  border-left: 1px solid #e4e7ec;\n  background: #f8fafc;\n}\n\n.product-preview .preview-label {\n  color: #2563eb;\n}\n\n.product-preview h3 {\n  margin: 12px 0 0;\n  color: #101828;\n  font-size: 1.7rem;\n}\n\n.product-preview > p:not(.preview-label) {\n  color: #667085;\n  line-height: 1.65;\n}\n\n.product-preview dl {\n  display: grid;\n  gap: 10px;\n  margin: 26px 0 0;\n}\n\n.product-preview dl div {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #d0d5dd;\n}\n\n.product-preview dt {\n  color: #667085;\n}\n\n.product-preview dd {\n  margin: 0;\n  color: #101828;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n\n@media (max-width: 780px) {\n  .project-header {\n    align-items: start;\n    flex-direction: column;\n  }\n\n  .product-form-layout {\n    grid-template-columns: 1fr;\n  }\n\n  .product-preview {\n    border-top: 1px solid #e4e7ec;\n    border-left: 0;\n  }\n}\n\n@media (max-width: 520px) {\n  .product-form-row {\n    grid-template-columns: 1fr;\n  }\n}\n"
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
          "value": "seller-product-form-mini-project.css"
        },
        {
          "type": "text",
          "value": ", including header, focus, error, success, radio group and two responsive breakpoints. CSS does not change the controlled form mechanism, but these selectors illustrate how JSX class names map to final layout, state feedback, and mobile presentation."
        }
      ]
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
      "value": "Editing any field updates the product preview.\nInvalid name, description, or price displays field feedback.\nValid submit changes the button to Saving product...\nSuccess feedback appears without page navigation.\nThe publish checkbox switches the preview between Draft and Published."
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
                  "value": "SellerProductForm"
                },
                {
                  "type": "text",
                  "value": " uses a typed object to save source values."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Each control receives "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " or "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
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
                  "value": "browser event enters element-specific handler."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "updateField"
                },
                {
                  "type": "text",
                  "value": " creates the next object and only clears the old errors of the current field."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React render after "
                },
                {
                  "type": "inlineCode",
                  "value": "ProductFormPreview"
                },
                {
                  "type": "text",
                  "value": " derives the UI from the same values snapshot."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "submit handler cancels the browser default action and pure validation generates errors."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "stops in idle when there is an error; enters pending and disables controls when there is no error."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "local After the delay ends, success is entered, and feedback carries the name in the submit snapshot."
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
                  "value": "Store preview in separate state: creating duplicate data and synchronization problems."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Prematurely save the price state number: empty input and intermediate input state are difficult to express; keep string, convert when validate."
                }
              ]
            }
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
                  "value": "updateField"
                },
                {
                  "type": "text",
                  "value": ": destroy the immutable snapshot."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "validation still enters pending after failure: let the UI say invalid and saving at the same time."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "pending allows repeated submission: multiple concurrent completions are generated; buttons and controls are disabled in this project."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "describes local delay as real persistence: There is no backend in this project, and success only represents the completion of the demo flow."
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
                  "value": "adds SKU text field and extends "
                },
                {
                  "type": "inlineCode",
                  "value": "ProductFormValues"
                },
                {
                  "type": "text",
                  "value": " with pure validation."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Add image URL preview, but the scheme must be verified and any external URL cannot be directly trusted."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "adds reset button, use "
                },
                {
                  "type": "inlineCode",
                  "value": "initialProductFormValues"
                },
                {
                  "type": "text",
                  "value": " replaces the entire form object at once."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Add server error union and request cancellation when backend is followed; do not introduce query library in advance in this chapter."
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
          "value": "Controlled form Put current field values in React state with "
        },
        {
          "type": "inlineCode",
          "value": "value"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " Write the snapshot into the DOM control, and then use the event handler to convert the user edit into an immutable next state."
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
              "value": "onSubmit"
            }
          ],
          [
            {
              "type": "text",
              "value": "React prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "Receive form submit"
            }
          ],
          [
            {
              "type": "text",
              "value": "handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "React calls callback"
            }
          ],
          [
            {
              "type": "text",
              "value": "is placed on button instead of form"
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
              "value": "Cancel default action"
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
              "value": "default action canceled"
            }
          ],
          [
            {
              "type": "text",
              "value": "as React setter"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " + "
            },
            {
              "type": "inlineCode",
              "value": "onChange"
            }
          ],
          [
            {
              "type": "text",
              "value": "React controlled model"
            }
          ],
          [
            {
              "type": "text",
              "value": "Control text-like field"
            }
          ],
          [
            {
              "type": "text",
              "value": "string + handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "state owns current value"
            }
          ],
          [
            {
              "type": "text",
              "value": "value without handler"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "checked"
            },
            {
              "type": "text",
              "value": " + "
            },
            {
              "type": "inlineCode",
              "value": "onChange"
            }
          ],
          [
            {
              "type": "text",
              "value": "React controlled model"
            }
          ],
          [
            {
              "type": "text",
              "value": "control checkbox/radio"
            }
          ],
          [
            {
              "type": "text",
              "value": "boolean + handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "state owns selection"
            }
          ],
          [
            {
              "type": "text",
              "value": "reads "
            },
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " determines whether to check"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "defaultValue"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM prop"
            }
          ],
          [
            {
              "type": "text",
              "value": "initialization uncontrolled field"
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
              "value": "DOM owns later edits"
            }
          ],
          [
            {
              "type": "text",
              "value": "Follow-up controlled"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "FormEvent<HTMLFormElement>"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Description form handler event"
            }
          ],
          [
            {
              "type": "text",
              "value": "element type"
            }
          ],
          [
            {
              "type": "text",
              "value": "compile-time checking"
            }
          ],
          [
            {
              "type": "text",
              "value": "think runtime validation"
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
              "value": "TypeScript type"
            }
          ],
          [
            {
              "type": "text",
              "value": "Description input change event"
            }
          ],
          [
            {
              "type": "text",
              "value": "element type"
            }
          ],
          [
            {
              "type": "text",
              "value": "typed currentTarget"
            }
          ],
          [
            {
              "type": "text",
              "value": "textarea still uses input type"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "keyof FormValues"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript operator"
            }
          ],
          [
            {
              "type": "text",
              "value": "constraint field names"
            }
          ],
          [
            {
              "type": "text",
              "value": "object type"
            }
          ],
          [
            {
              "type": "text",
              "value": "key union"
            }
          ],
          [
            {
              "type": "text",
              "value": "thought it would check DOM string"
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
              "value": "controlled"
            }
          ],
          [
            {
              "type": "text",
              "value": "uncontrolled"
            }
          ],
          [
            {
              "type": "text",
              "value": "React state vs DOM owns current value"
            }
          ],
          [
            {
              "type": "text",
              "value": "live preview/validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "simple native submission"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "value"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "defaultValue"
            }
          ],
          [
            {
              "type": "text",
              "value": "current value vs initial value"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled"
            }
          ],
          [
            {
              "type": "text",
              "value": "uncontrolled"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "checked"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "value"
            },
            {
              "type": "text",
              "value": " on checkbox"
            }
          ],
          [
            {
              "type": "text",
              "value": "selection boolean vs submitted string"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI selection"
            }
          ],
          [
            {
              "type": "text",
              "value": "payload label"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "validation error"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending"
            }
          ],
          [
            {
              "type": "text",
              "value": "invalid input vs operation in progress"
            }
          ],
          [
            {
              "type": "text",
              "value": "block submit"
            }
          ],
          [
            {
              "type": "text",
              "value": "disable repeat submit"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "event type"
            }
          ],
          [
            {
              "type": "text",
              "value": "values type"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM callback boundary vs domain object shape"
            }
          ],
          [
            {
              "type": "text",
              "value": "handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "state/payload"
            }
          ]
        ],
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
              "value": "derived preview"
            }
          ],
          [
            {
              "type": "text",
              "value": "user-owned values vs computed UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "store"
            }
          ],
          [
            {
              "type": "text",
              "value": "calculate during render"
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
              "value": "field cannot type"
            }
          ],
          [
            {
              "type": "text",
              "value": "React warning"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled field lacks update"
            }
          ],
          [
            {
              "type": "text",
              "value": "add synchronous handler"
            }
          ],
          [
            {
              "type": "text",
              "value": "keystroke reverts"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "page reloads"
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser behavior"
            }
          ],
          [
            {
              "type": "text",
              "value": "submit default remains"
            }
          ],
          [
            {
              "type": "text",
              "value": "call "
            },
            {
              "type": "inlineCode",
              "value": "preventDefault"
            }
          ],
          [
            {
              "type": "text",
              "value": "state feedback disappears"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "checkbox always true"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript data bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "non-empty string coerced"
            }
          ],
          [
            {
              "type": "text",
              "value": "read "
            },
            {
              "type": "inlineCode",
              "value": "checked"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "'false'"
            },
            {
              "type": "text",
              "value": " becomes true"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "old field disappears"
            }
          ],
          [
            {
              "type": "text",
              "value": "object update bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "replacement omitted spread"
            }
          ],
          [
            {
              "type": "text",
              "value": "copy current object"
            }
          ],
          [
            {
              "type": "text",
              "value": "sibling property resets"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "option not selected"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain mismatch"
            }
          ],
          [
            {
              "type": "text",
              "value": "state and option values differ"
            }
          ],
          [
            {
              "type": "text",
              "value": "canonical literal set"
            }
          ],
          [
            {
              "type": "text",
              "value": "select has no matching value"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "impossible feedback"
            }
          ],
          [
            {
              "type": "text",
              "value": "state-model bug"
            }
          ],
          [
            {
              "type": "text",
              "value": "facts merged into booleans"
            }
          ],
          [
            {
              "type": "text",
              "value": "errors map + status union"
            }
          ],
          [
            {
              "type": "text",
              "value": "invalid and success coexist"
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
              "value": "login"
            }
          ],
          [
            {
              "type": "text",
              "value": "credentials submit"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled text + validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "expose password/logging"
            }
          ],
          [
            {
              "type": "text",
              "value": "never log password"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "registration"
            }
          ],
          [
            {
              "type": "text",
              "value": "related fields"
            }
          ],
          [
            {
              "type": "text",
              "value": "object state + checkbox"
            }
          ],
          [
            {
              "type": "text",
              "value": "impossible agreement state"
            }
          ],
          [
            {
              "type": "text",
              "value": "type the payload"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "product editor"
            }
          ],
          [
            {
              "type": "text",
              "value": "live listing preview"
            }
          ],
          [
            {
              "type": "text",
              "value": "all controlled controls"
            }
          ],
          [
            {
              "type": "text",
              "value": "duplicated preview state"
            }
          ],
          [
            {
              "type": "text",
              "value": "derive preview"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "shop onboarding"
            }
          ],
          [
            {
              "type": "text",
              "value": "long description"
            }
          ],
          [
            {
              "type": "text",
              "value": "textarea + object state"
            }
          ],
          [
            {
              "type": "text",
              "value": "premature abstractions"
            }
          ],
          [
            {
              "type": "text",
              "value": "keep fields explicit"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "checkout"
            }
          ],
          [
            {
              "type": "text",
              "value": "address and delivery"
            }
          ],
          [
            {
              "type": "text",
              "value": "select/radio + validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "confusing pending/error"
            }
          ],
          [
            {
              "type": "text",
              "value": "separate lifecycle"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "admin category"
            }
          ],
          [
            {
              "type": "text",
              "value": "small CRUD form"
            }
          ],
          [
            {
              "type": "text",
              "value": "text + checkbox"
            }
          ],
          [
            {
              "type": "text",
              "value": "backend uniqueness"
            }
          ],
          [
            {
              "type": "text",
              "value": "client check is not authority"
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
      "label": "Template: typed immutable field update",
      "value": "type FormValues = {\n  title: string\n  isActive: boolean\n}\n\nfunction updateField<FieldName extends keyof FormValues>(\n  fieldName: FieldName,\n  fieldValue: FormValues[FieldName],\n) {\n  setFormValues((currentValues) => ({\n    ...currentValues,\n    [fieldName]: fieldValue,\n  }))\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "associates field name with field value: "
        },
        {
          "type": "inlineCode",
          "value": "updateField('isActive', 'yes')"
        },
        {
          "type": "text",
          "value": " will report an error at compile time. It does not validate the browser event string, event-to-domain conversion should still be done at the handler boundary."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: controlled checkbox",
      "value": "<input\n  checked={formValues.isActive}\n  onChange={(event) => updateField('isActive', event.currentTarget.checked)}\n  type=\"checkbox\"\n/>"
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
      "id": "study-guide-document-for-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "Study guide document for this chapter"
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
              "value": "docs/react/chapter-06-forms/react-chapter-06-learning-guide.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Complete study guide for Chapter 6."
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
      "type": "heading",
      "depth": 3,
      "id": "general-practice-files-for-this-chapter",
      "children": [
        {
          "type": "text",
          "value": "General practice files for this chapter"
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
              "value": "src/learning/react/chapter-06-forms/chapter-06-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "summarizes nine exercises and final mini project."
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
              "value": "src/learning/react/chapter-06-forms/chapter-06-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Chapter 6 Shared Exercise Patterns."
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
              "value": "src/learning/react/chapter-06-forms/01-form-submit-default-behavior/form-submit-default-behavior.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser submit and "
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
              "value": "has been created and reserved."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-06-forms/02-controlled-text-input/controlled-text-input.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled text and snapshot."
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
              "value": "src/learning/react/chapter-06-forms/03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "controlled / uncontrolled ownership."
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
              "value": "src/learning/react/chapter-06-forms/04-object-form-state/object-form-state.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "immutable object form state."
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
              "value": "src/learning/react/chapter-06-forms/05-controlled-textarea-select/controlled-textarea-select.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "textarea with select."
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
              "value": "src/learning/react/chapter-06-forms/06-controlled-checkbox-radio/controlled-checkbox-radio.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "checkbox and radio group."
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
              "value": "src/learning/react/chapter-06-forms/07-form-validation/form-validation-feedback.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "basic validation feedback."
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
              "value": "src/learning/react/chapter-06-forms/08-submit-status-model/submit-status-model.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "pending and success state."
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
              "value": "src/learning/react/chapter-06-forms/09-typed-form-fields/typed-form-fields.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "event, values, field name type."
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
      "type": "heading",
      "depth": 3,
      "id": "final-mini-project-file",
      "children": [
        {
          "type": "text",
          "value": "final mini project file"
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
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "small project type model and initial values."
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
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-validation.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "small project pure validation."
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
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-preview.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "derived product preview."
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
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "small project form state owner."
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
              "value": "src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form-mini-project.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "small project style."
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
      "type": "heading",
      "depth": 3,
      "id": "entrance-and-route-update-file",
      "children": [
        {
          "type": "text",
          "value": "entrance and route update file"
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
              "value": "README.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "Fixed route conflict and marked Chapter 6 complete."
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
              "value": "mounts Chapter 6 according to the current learning entrance agreement."
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
          "value": "Concept error examples and short comparison examples have been listed in "
        },
        {
          "type": "inlineCode",
          "value": "7. Recommended directory structure -> Concept example structure"
        },
        {
          "type": "text",
          "value": ", they use "
        },
        {
          "type": "inlineCode",
          "value": "Snippet:"
        },
        {
          "type": "text",
          "value": " or "
        },
        {
          "type": "inlineCode",
          "value": "Template:"
        },
        {
          "type": "text",
          "value": " logical title is not a file that needs to be created, so it does not enter the final file list."
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
          "value": "is recommended to be organized into three pictures and four groups of error reproduction:"
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
                  "value": "DOM edit -> event -> setter -> render -> value commit"
                },
                {
                  "type": "text",
                  "value": " controlled loop."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "draws two independent paths: browser default action and React state update."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "draws three state boundaries: values object, validation errors, and submission union."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "reproduces "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " without "
                },
                {
                  "type": "inlineCode",
                  "value": "onChange"
                },
                {
                  "type": "text",
                  "value": ", observe console warning and input rebound."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "reproduces "
                },
                {
                  "type": "inlineCode",
                  "value": "defaultValue"
                },
                {
                  "type": "text",
                  "value": " to "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " switching warning."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "recurrence checkbox read "
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
                  "value": "reproduces the direct object mutation, and then uses spread to correct it."
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
                  "value": "form submit belong to browser or React?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "preventDefault()"
                },
                {
                  "type": "text",
                  "value": " Why won't event propagation stop?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why can handler hanging on form cover click and Enter submit?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "controlled input?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " without "
                },
                {
                  "type": "inlineCode",
                  "value": "onChange"
                },
                {
                  "type": "text",
                  "value": " Why is input disabled?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "defaultValue"
                },
                {
                  "type": "text",
                  "value": " and "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
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
                  "value": "setter?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "When are multiple fields suitable to form an object state?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "textarea Why use "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " instead of children?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "select Why controls "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " instead of option "
                },
                {
                  "type": "inlineCode",
                  "value": "selected"
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
                  "value": "checkbox why read "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
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
                  "value": "of radio group "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
                },
                {
                  "type": "text",
                  "value": " expression and "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
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
                  "value": "validation errors and pending state Why can't they be merged?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "ChangeEvent<HTMLInputElement>"
                },
                {
                  "type": "text",
                  "value": " exist in runtime?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "DOM select value Why is it still a string instead of automatically becoming a union?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "derived preview Why shouldn't the second state be saved?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Seller Product Form not equal to backend saved?"
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
      "value": "Browser form semantics\n  + explicit React ownership\n  + immutable values object\n  + pure validation result\n  + explicit submission union\n  + compile-time event and field types\n  = predictable form behavior"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": ": browser is responsible for form and DOM controls; React uses state to determine controlled current value; JavaScript handler converts event value into immutable next object; TypeScript only checks the boundary and does not replace runtime validation; validation, pending, and success must be expressed as different facts."
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
                  "href": "https://react.dev/reference/react-dom/components/input",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "<input>"
                    },
                    {
                      "type": "text",
                      "value": " reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Read controlled / uncontrolled caveats first, then text, checkbox, radio troubleshooting. Remember to use string "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": ", checkbox/radio use boolean "
                },
                {
                  "type": "inlineCode",
                  "value": "checked"
                },
                {
                  "type": "text",
                  "value": ", and the mode cannot be switched during the life cycle."
                }
              ]
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
                  "href": "https://react.dev/reference/react-dom/components/textarea",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "<textarea>"
                    },
                    {
                      "type": "text",
                      "value": " reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "onChange"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "defaultValue"
                },
                {
                  "type": "text",
                  "value": ", and textarea do not accept children to represent content."
                }
              ]
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
                  "href": "https://react.dev/reference/react-dom/components/select",
                  "children": [
                    {
                      "type": "text",
                      "value": "React "
                    },
                    {
                      "type": "inlineCode",
                      "value": "<select>"
                    },
                    {
                      "type": "text",
                      "value": " reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm select-level "
                },
                {
                  "type": "inlineCode",
                  "value": "value"
                },
                {
                  "type": "text",
                  "value": ", option canonical values, single/multiple value shape and controlled caveats."
                }
              ]
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
                      "value": "React: Using TypeScript"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Read DOM event typing; inline handler can be deduced, and element-specific event type is required when extracting the handler."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript: "
                    },
                    {
                      "type": "inlineCode",
                      "value": "keyof"
                    },
                    {
                      "type": "text",
                      "value": " Type Operator"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm "
                },
                {
                  "type": "inlineCode",
                  "value": "keyof"
                },
                {
                  "type": "text",
                  "value": " produces a property-key literal union from object type."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript: Indexed Access Types"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm how indexed access obtains the corresponding type from property, union or array element."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript: Type Assertions"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirmation assertions will be removed after compilation, runtime validation will not be provided, and exceptions will not be automatically thrown when assertion errors occur."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript: Discriminated Unions"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm how common literal properties become discriminants, and let TypeScript narrowing to legal union members."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: Event.preventDefault"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm that default action, cancelable and propagation are different concepts."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: HTMLFormElement submit event"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": Confirm that the submit event is triggered on the form, which can be triggered by button, Enter or "
                },
                {
                  "type": "inlineCode",
                  "value": "requestSubmit()"
                },
                {
                  "type": "text",
                  "value": " trigger; directly call "
                },
                {
                  "type": "inlineCode",
                  "value": "form.submit()"
                },
                {
                  "type": "text",
                  "value": " will not send submit event."
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
          "value": "Local supplementary information:"
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
                  "value": " physical page 71-72 (inside book page 66-67) explains browser input internal state and React controlled value loop."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "physical page 154-156 (inside book page 149-151) description form, submit button, Enter and "
                },
                {
                  "type": "inlineCode",
                  "value": "preventDefault()"
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
                  "value": "physical page 73 (inside book page 68) It is recommended to pass empty or "
                },
                {
                  "type": "inlineCode",
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": " clears the controlled input; the current React official documentation requires that the controlled text value remains a string and cannot be switched from string to "
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
                  "value": ". This chapter therefore uses empty string and replaces the PDF's "
                },
                {
                  "type": "inlineCode",
                  "value": "null"
                },
                {
                  "type": "text",
                  "value": " suggestion marked as not applicable to current React rules."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter06Content() {
  return <DocumentRenderer document={chapterDocument} />
}
