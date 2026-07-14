import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-12",
  "slug": "chapter-12-testing-quality",
  "title": "React Chapter 12: Testing, Quality Gates, and Frontend Engineering",
  "sourcePath": "docs/react/chapter-12-testing-quality/react-chapter-12-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-12-testing-quality-gates-and-frontend-engineering",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 12: Testing, Quality Gates, and Frontend Engineering"
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
              "value": "Test pyramid and test boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx"
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
              "value": "Vitest unit test: pure function, parser and reducer"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts"
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
              "value": "Vitest unit test: pure function, parser and reducer behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.test.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Component test: render, screen and user-visible output"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx"
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
              "value": "Component test: render, screen and user-visible output behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "getByRole / getByLabelText with accessibility-first query"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx"
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
              "value": "getByRole / getByLabelText with accessibility-first query behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "userEvent and the real interaction sequence"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx"
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
              "value": "userEvent and real interaction sequence behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Async UI test: findBy, waitFor and loading/error/success"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx"
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
              "value": "Async UI test: findBy, waitFor and loading/error/success behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Controlled form behavior test"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx"
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
              "value": "Controlled form behavior test behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Router integration test and initial route"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx"
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
              "value": "Router integration test and initial route behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Context provider / custom hook boundary test"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts"
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
              "value": "Context provider / custom hook boundary test behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "MSW and network boundary mock"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx"
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
              "value": "MSW and network boundary mock behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.msw.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Error boundary and error state test"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx"
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
              "value": "Error boundary and error state test behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.behavior.test.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "Quality gates: lint, typecheck, test, build and CI command model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts"
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
              "value": "Quality gates: lint, typecheck, test, build and CI command model behavior check"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.test.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "Real test file"
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
              "value": "SellerHub testing architecture mapping"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts"
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
              "value": "9.13"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "adapter / setup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/chapter-12-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / test configuration"
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
              "value": "adapter / setup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/chapter-12-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / test configuration"
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
              "value": "adapter / setup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "vitest.config.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / test configuration"
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
              "value": "adapter / setup"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/test/setup.ts"
            }
          ],
          [
            {
              "type": "text",
              "value": "adapter / test configuration"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx"
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
              "value": "SellerHub Tested Workflow"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx"
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
          "value": "This chapter is located at "
        },
        {
          "type": "inlineCode",
          "value": "D:/vite_ts"
        },
        {
          "type": "text",
          "value": " 's React learning route. The study guide document is "
        },
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-12-testing-quality/react-chapter-12-learning-guide.md"
        },
        {
          "type": "text",
          "value": ", the root directory of the exercise source code is "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/"
        },
        {
          "type": "text",
          "value": ". This chapter clearly specifies the topic as Testing, Quality Gates and Frontend Engineering, and the topic will not be changed due to the lack of old routes in the README."
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
          "value": "11, you have learned about props, state, forms, effects, reducers, context, async data, routing and performance. This chapter addresses how to prove that these behaviors are not broken when refactoring later. Testing is not to prove implementation details, but to verify user observable behavior, business rules, request boundary, provider/router wrapper and quality gate."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "needs to understand JavaScript function/object/Promise/throw, React render/commit/state snapshot/event handler/context/router branch, TypeScript union/narrowing/type erasure, browser form/label/role/alert, and npm scripts and Vite build."
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
          "value": "After completing this chapter, you should be able to distinguish unit/component/integration/E2E boundary; use Vitest to test pure rule; use Testing Library and userEvent to test UI behavior; use findBy/waitFor to wait for asynchronous DOM; use MSW mock request boundary; use MemoryRouter and provider wrapper test integration boundaries; use lint/typecheck/test/build to organize quality gate."
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
          "value": "first learns the test boundary, then unit test; then enters render/screen, accessible query, userEvent; then learns async UI, controlled form, router, context, MSW and error boundary; and finally converges them into quality gates and SellerHub mapping."
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
              "value": "Unit test"
            }
          ],
          [
            {
              "type": "text",
              "value": "Verify pure function, parser, reducer."
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / Vitest"
            }
          ],
          [
            {
              "type": "text",
              "value": "failure signal is short."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Component test"
            }
          ],
          [
            {
              "type": "text",
              "value": "Verify the visible output and interaction of the React component."
            }
          ],
          [
            {
              "type": "text",
              "value": "React / jsdom / RTL"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not test private state."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Integration test"
            }
          ],
          [
            {
              "type": "text",
              "value": "Verify the combination boundaries of router, provider, network mock, etc."
            }
          ],
          [
            {
              "type": "text",
              "value": "React / Router / MSW"
            }
          ],
          [
            {
              "type": "text",
              "value": "is suitable for SellerHub workflow."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "E2E boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "True browser and deployment boundaries."
            }
          ],
          [
            {
              "type": "text",
              "value": "Browser / deployment"
            }
          ],
          [
            {
              "type": "text",
              "value": "This chapter only talks about boundaries, not installation."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "screen"
            }
          ],
          [
            {
              "type": "text",
              "value": "query entry for document."
            }
          ],
          [
            {
              "type": "text",
              "value": "Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "allows the test to find elements according to the user's method."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "userEvent"
            }
          ],
          [
            {
              "type": "text",
              "value": "user interaction sequence simulation."
            }
          ],
          [
            {
              "type": "text",
              "value": "Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "is closer to the real input than a single fireEvent."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "MSW"
            }
          ],
          [
            {
              "type": "text",
              "value": "request boundary mock."
            }
          ],
          [
            {
              "type": "text",
              "value": "Network"
            }
          ],
          [
            {
              "type": "text",
              "value": "component still goes through fetch."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Quality gate"
            }
          ],
          [
            {
              "type": "text",
              "value": "automatic quality check command."
            }
          ],
          [
            {
              "type": "text",
              "value": "Tooling / CI"
            }
          ],
          [
            {
              "type": "text",
              "value": "lint, typecheck, test, and build each manage one layer."
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
          "value": "The underlying model of this chapter is: first find the behavior owner, and then select the minimum test layer. The owner of pure rule is JavaScript function; the owner of visible UI is React render + DOM; the owner of route guard is router context + auth provider; the owner of network state is request boundary + async UI; the owner of engineering quality is lint/typecheck/test/build pipeline. TypeScript checks the compile-time relation, tests to verify runtime behavior, and build verifies the production tool chain. They cannot replace each other."
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
      "value": "D:/vite_ts/\n  AGENTS.MD\n  README.md\n  package.json\n  package-lock.json\n  vitest.config.ts\n  src/\n    test/setup.ts\n    App.tsx\n    learning/react/chapter-12-testing-quality/\n  docs/react/chapter-12-testing-quality/\n  references/books/react/"
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
      "value": "docs/react/chapter-12-testing-quality/\n  react-chapter-12-learning-guide.md"
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
      "value": "src/learning/react/chapter-12-testing-quality/\n  chapter-12-practice-root.tsx\n  chapter-12-practice.css\n  01-test-boundary/testing-boundary-map.tsx\n  02-unit-reducer-parser/cart-quality-rules.ts\n  02-unit-reducer-parser/cart-quality-rules.test.ts\n  03-component-render-screen/visible-summary-panel.tsx\n  03-component-render-screen/visible-summary-panel.behavior.test.tsx\n  04-accessible-queries/accessible-login-form.tsx\n  04-accessible-queries/accessible-login-form.behavior.test.tsx\n  05-user-event-interaction/quantity-stepper.tsx\n  05-user-event-interaction/quantity-stepper.behavior.test.tsx\n  06-async-ui-state/async-order-status-panel.tsx\n  06-async-ui-state/async-order-status-panel.behavior.test.tsx\n  07-controlled-form-test/seller-filter-form.tsx\n  07-controlled-form-test/seller-filter-form.behavior.test.tsx\n  08-router-integration-test/seller-route-workspace.tsx\n  08-router-integration-test/seller-route-workspace.behavior.test.tsx\n  09-context-hook-boundary/\n  10-msw-network-mock/\n  11-error-boundary-test/\n  12-quality-gates/\n  sellerhub-tested-workflow/"
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
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Concept snippets:\n  none for this chapter\n\nReason:\n  Chapter 12 uses real source and test files for mechanism practice."
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
      "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/\n  sellerhub-testing-types.ts\n  sellerhub-cart-rules.ts\n  sellerhub-auth-context.ts\n  sellerhub-auth-provider.tsx\n  sellerhub-catalog-filter.tsx\n  sellerhub-login-form.tsx\n  sellerhub-orders-panel.tsx\n  sellerhub-protected-route.tsx\n  sellerhub-workflow-routes.tsx\n  sellerhub-error-boundary.tsx\n  sellerhub-test-handlers.ts\n  sellerhub-test-server.ts\n  sellerhub-cart-reducer.test.ts\n  sellerhub-login-form.behavior.test.tsx\n  sellerhub-orders-msw.behavior.test.tsx\n  sellerhub-router-integration.behavior.test.tsx\n  sellerhub-context-hook-boundary.behavior.test.tsx\n  sellerhub-error-boundary.behavior.test.tsx"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter is divided into categories according to core concepts instead of relying on "
        },
        {
          "type": "inlineCode",
          "value": "App.tsx"
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
          "value": ", "
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
          "value": ". The test file name expresses the target under test, such as "
        },
        {
          "type": "inlineCode",
          "value": "cart-quality-rules.test.ts"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "login-form.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "orders-msw.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " to facilitate subsequent review of SellerHub."
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
      "value": "npm run lint\nnpm run typecheck\nnpm run test\nnpm run build"
    },
    {
      "type": "code",
      "language": "json",
      "label": "package.json scripts",
      "value": "{\n  \"scripts\": {\n    \"lint\": \"eslint .\",\n    \"typecheck\": \"tsc -b\",\n    \"test\": \"vitest run\",\n    \"test:watch\": \"vitest\",\n    \"build\": \"tsc -b && vite build\"\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "chapter-12-practice-root.tsx"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "chapter-12-practice.css"
        },
        {
          "type": "text",
          "value": ", "
        },
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
          "value": "src/test/setup.ts"
        },
        {
          "type": "text",
          "value": " is the boundary of adapter/setup. It is only included in the index, structure and final file list, and does not expand the complete code in the text."
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
      "id": "91-the-testing-pyramid-and-test-boundaries",
      "children": [
        {
          "type": "text",
          "value": "9.1 The Testing Pyramid and Test Boundaries"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx"
        },
        {
          "type": "text",
          "value": " Establishes a specific test boundary. The core rule is: testing layer must match behavior owner."
        }
      ]
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
          "value": "It solves the learner in "
        },
        {
          "type": "inlineCode",
          "value": "test pyramid / test boundary"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "testing layer objects rendered as visible cards"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "test pyramid / test boundary"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "testing layer objects rendered as visible cards"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx",
      "value": "const testingLayers = [\n  {\n    name: 'Unit test',\n    target: 'Pure reducer, parser, and type guard rules',\n    boundary: 'JavaScript values without React rendering',\n  },\n  {\n    name: 'Component test',\n    target: 'User-visible output and interaction',\n    boundary: 'React render and jsdom DOM queries',\n  },\n  {\n    name: 'Integration test',\n    target: 'Router, provider, network mock, and UI states',\n    boundary: 'Several frontend boundaries working together',\n  },\n  {\n    name: 'E2E boundary',\n    target: 'A real browser and real deployment surface',\n    boundary: 'Documented for later work, not installed in this chapter',\n  },\n]\n\nexport function TestingBoundaryMap() {\n  return (\n    <section className=\"practice-panel\" aria-labelledby=\"testing-boundary-title\">\n      <div className=\"topic-summary\">\n        <p className=\"skill-pill\">Testing boundary</p>\n        <h2 id=\"testing-boundary-title\">Choose the smallest useful test layer</h2>\n        <p>\n          A quality gate should verify the rule at the layer that owns the behavior,\n          not at the layer that happens to be easy to assert.\n        </p>\n      </div>\n\n      <div className=\"testing-boundary-grid\">\n        {testingLayers.map((layer) => (\n          <article className=\"topic-card\" key={layer.name}>\n            <h3>{layer.name}</h3>\n            <p>{layer.target}</p>\n            <span>{layer.boundary}</span>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "testing layer objects rendered as visible cards"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "testing layer must match behavior owner"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "Comparative error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "testing layer must match behavior owner"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Catalog parser uses unit test; protected route uses integration test."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "testing layer objects rendered as visible cards"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "92-vitest-unit-tests-for-pure-functions-parsers-and-reducers",
      "children": [
        {
          "type": "text",
          "value": "9.2 Vitest Unit Tests for Pure Functions, Parsers, and Reducers"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: unit tests verify pure output and immutable transition."
        }
      ]
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
          "value": "It solves learners in "
        },
        {
          "type": "inlineCode",
          "value": "describe / it / expect / assertNever"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "CartState reference, CartAction object, reducer return value"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "describe / it / expect / assertNever"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "CartState reference, CartAction object, reducer return value"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts",
      "value": "export type CartLine = {\n  id: string\n  name: string\n  unitPrice: number\n  quantity: number\n}\n\nexport type CartState = {\n  lines: CartLine[]\n}\n\nexport type CartAction =\n  | { type: 'addLine'; line: CartLine }\n  | { type: 'changeQuantity'; lineId: string; quantity: number }\n  | { type: 'removeLine'; lineId: string }\n\nexport function normalizeCatalogSearch(rawSearch: string): string {\n  return rawSearch.trim().replace(/\\s+/g, ' ').toLowerCase()\n}\n\nexport function parsePositiveQuantity(rawQuantity: string): number | null {\n  const quantity = Number(rawQuantity)\n\n  if (!Number.isInteger(quantity) || quantity < 1) {\n    return null\n  }\n\n  return quantity\n}\n\nexport function cartReducer(state: CartState, action: CartAction): CartState {\n  switch (action.type) {\n    case 'addLine':\n      if (state.lines.some((line) => line.id === action.line.id)) {\n        return state\n      }\n\n      return { lines: [...state.lines, action.line] }\n\n    case 'changeQuantity':\n      return {\n        lines: state.lines.map((line) =>\n          line.id === action.lineId ? { ...line, quantity: action.quantity } : line,\n        ),\n      }\n\n    case 'removeLine':\n      return { lines: state.lines.filter((line) => line.id !== action.lineId) }\n\n    default:\n      return assertNever(action)\n  }\n}\n\nfunction assertNever(action: never): never {\n  throw new Error(`Unhandled cart action: ${JSON.stringify(action)}`)\n}"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.test.ts",
      "value": "import { describe, expect, it } from 'vitest'\nimport {\n  cartReducer,\n  normalizeCatalogSearch,\n  parsePositiveQuantity,\n} from './cart-quality-rules'\nimport type { CartState } from './cart-quality-rules'\n\ndescribe('cart quality rules', () => {\n  it('normalizes catalog search input before filtering', () => {\n    expect(normalizeCatalogSearch('  Desk    Lamp  ')).toBe('desk lamp')\n  })\n\n  it('parses only positive integer quantities', () => {\n    expect(parsePositiveQuantity('3')).toBe(3)\n    expect(parsePositiveQuantity('0')).toBeNull()\n    expect(parsePositiveQuantity('2.5')).toBeNull()\n    expect(parsePositiveQuantity('unknown')).toBeNull()\n  })\n\n  it('updates cart lines without mutating the previous state object', () => {\n    const previousState: CartState = {\n      lines: [{ id: 'lamp', name: 'Desk Lamp', unitPrice: 42, quantity: 1 }],\n    }\n\n    const nextState = cartReducer(previousState, {\n      type: 'changeQuantity',\n      lineId: 'lamp',\n      quantity: 4,\n    })\n\n    expect(nextState).not.toBe(previousState)\n    expect(nextState.lines[0]).toEqual({\n      id: 'lamp',\n      name: 'Desk Lamp',\n      unitPrice: 42,\n      quantity: 4,\n    })\n    expect(previousState.lines[0]?.quantity).toBe(1)\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "CartState reference, CartAction object, reducer return value"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "unit tests verify pure output and immutable transition"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "comparison error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rule "
        },
        {
          "type": "inlineCode",
          "value": "unit tests verify pure output and immutable transition"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Cart reducer and catalog parser are tested before UI."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "CartState reference, CartAction object, reducer return value"
        },
        {
          "type": "text",
          "value": " traces the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "93-component-tests-for-user-visible-output",
      "children": [
        {
          "type": "text",
          "value": "9.3 Component Tests for User-Visible Output"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx"
        },
        {
          "type": "text",
          "value": " establishes a specific test boundary. The core rule is: component tests assert user-visible output, not internal state."
        }
      ]
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
          "value": "It solves the learner in "
        },
        {
          "type": "inlineCode",
          "value": "render / screen / getByRole / queryByRole"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "props object rendered to jsdom DOM"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "render / screen / getByRole / queryByRole"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "props object rendered to jsdom DOM"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx",
      "value": "type VisibleSummaryPanelProps = {\n  productCount: number\n  orderCount: number\n  hasErrors: boolean\n}\n\nexport function VisibleSummaryPanel({\n  productCount,\n  orderCount,\n  hasErrors,\n}: VisibleSummaryPanelProps) {\n  return (\n    <section className=\"practice-panel\" aria-labelledby=\"visible-summary-title\">\n      <p className=\"skill-pill\">Component output</p>\n      <h2 id=\"visible-summary-title\">Visible SellerHub summary</h2>\n      <dl className=\"summary-list\">\n        <div>\n          <dt>Visible products</dt>\n          <dd>{productCount}</dd>\n        </div>\n        <div>\n          <dt>Open orders</dt>\n          <dd>{orderCount}</dd>\n        </div>\n      </dl>\n      {hasErrors ? (\n        <p role=\"alert\">SellerHub needs attention.</p>\n      ) : (\n        <p>SellerHub is ready.</p>\n      )}\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { describe, expect, it } from 'vitest'\nimport { VisibleSummaryPanel } from './visible-summary-panel'\n\ndescribe('VisibleSummaryPanel', () => {\n  it('renders user-visible summary output', () => {\n    render(<VisibleSummaryPanel hasErrors={false} orderCount={2} productCount={5} />)\n\n    expect(\n      screen.getByRole('heading', { name: 'Visible SellerHub summary' }),\n    ).toBeInTheDocument()\n    expect(screen.getByText('Visible products')).toBeInTheDocument()\n    expect(screen.getByText('5')).toBeInTheDocument()\n    expect(screen.getByText('SellerHub is ready.')).toBeInTheDocument()\n    expect(screen.queryByRole('alert')).not.toBeInTheDocument()\n  })\n\n  it('renders the alert branch when the summary has errors', () => {\n    render(<VisibleSummaryPanel hasErrors orderCount={0} productCount={0} />)\n\n    expect(screen.getByRole('alert')).toHaveTextContent('SellerHub needs attention.')\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "props object rendered to jsdom DOM"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "component tests assert user-visible output, not internal state"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "Comparative error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "component tests assert user-visible output, not internal state"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Dashboard summary and error branch tests use visible text."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "props object rendered to jsdom DOM"
        },
        {
          "type": "text",
          "value": " Trace the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "94-accessibility-first-queries-with-getbyrole-and-getbylabeltext",
      "children": [
        {
          "type": "text",
          "value": "9.4 Accessibility-First Queries with getByRole and getByLabelText"
        }
      ]
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
          "value": "This section focuses on "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: queries should follow accessible UI structure."
        }
      ]
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
          "value": "It solves the problem of learners in "
        },
        {
          "type": "inlineCode",
          "value": "role / label / accessible name / alert"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "label htmlFor/id association and button accessible name"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "role / label / accessible name / alert"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "label htmlFor/id association and button accessible name"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx",
      "value": "type AccessibleLoginFormProps = {\n  errorMessage?: string\n}\n\nexport function AccessibleLoginForm({ errorMessage }: AccessibleLoginFormProps) {\n  return (\n    <form className=\"practice-panel\" aria-labelledby=\"accessible-login-title\">\n      <p className=\"skill-pill\">Accessible query</p>\n      <h2 id=\"accessible-login-title\">Seller login</h2>\n\n      <label className=\"field-label\" htmlFor=\"seller-email\">\n        Email\n      </label>\n      <input className=\"text-input\" id=\"seller-email\" name=\"email\" type=\"email\" />\n\n      <label className=\"field-label\" htmlFor=\"seller-password\">\n        Password\n      </label>\n      <input className=\"text-input\" id=\"seller-password\" name=\"password\" type=\"password\" />\n\n      {errorMessage ? <p role=\"alert\">{errorMessage}</p> : null}\n\n      <button type=\"submit\">Sign in</button>\n    </form>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { describe, expect, it } from 'vitest'\nimport { AccessibleLoginForm } from './accessible-login-form'\n\ndescribe('AccessibleLoginForm', () => {\n  it('exposes fields and actions through accessible names', () => {\n    render(<AccessibleLoginForm />)\n\n    expect(screen.getByRole('heading', { name: 'Seller login' })).toBeInTheDocument()\n    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')\n    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')\n    expect(screen.getByRole('button', { name: 'Sign in' })).toBeEnabled()\n  })\n\n  it('lets the test observe error feedback through an alert role', () => {\n    render(<AccessibleLoginForm errorMessage=\"Invalid credentials\" />)\n\n    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials')\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "label htmlFor/id association and button accessible name"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "queries should follow accessible UI structure"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "comparison error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "queries should follow accessible UI structure"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Login and checkout forms must be queryable by label and role."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "label htmlFor/id association and button accessible name"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "95-userevent-and-realistic-interaction-sequences",
      "children": [
        {
          "type": "text",
          "value": "9.5 userEvent and Realistic Interaction Sequences"
        }
      ]
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
          "value": "This section focuses on "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx"
        },
        {
          "type": "text",
          "value": " Establishes a specific test boundary. The core rule is: userEvent simulates interaction sequence and must be awaited."
        }
      ]
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
          "value": "It solves learners at "
        },
        {
          "type": "inlineCode",
          "value": "userEvent.setup / click / clear / type"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "input draft string, event.currentTarget value, state setter"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "userEvent.setup / click / clear / type"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "input draft string, event.currentTarget value, state setter"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx",
      "value": "import { useState } from 'react'\nimport type { ChangeEvent } from 'react'\n\ntype QuantityStepperProps = {\n  initialQuantity?: number\n  maxQuantity?: number\n}\n\nexport function QuantityStepper({\n  initialQuantity = 1,\n  maxQuantity = 5,\n}: QuantityStepperProps) {\n  const [quantityText, setQuantityText] = useState(String(initialQuantity))\n  const quantity = parseQuantityText(quantityText)\n\n  function decreaseQuantity(): void {\n    setQuantityText((currentQuantityText) =>\n      String(Math.max(1, parseQuantityText(currentQuantityText) - 1)),\n    )\n  }\n\n  function increaseQuantity(): void {\n    setQuantityText((currentQuantityText) =>\n      String(Math.min(maxQuantity, parseQuantityText(currentQuantityText) + 1)),\n    )\n  }\n\n  function handleQuantityInput(event: ChangeEvent<HTMLInputElement>): void {\n    const nextQuantityText = event.currentTarget.value\n\n    if (nextQuantityText === '') {\n      setQuantityText('')\n      return\n    }\n\n    const nextQuantity = Number(nextQuantityText)\n\n    if (Number.isInteger(nextQuantity) && nextQuantity > 0) {\n      setQuantityText(String(Math.min(maxQuantity, nextQuantity)))\n    }\n  }\n\n  return (\n    <section className=\"practice-panel\" aria-labelledby=\"quantity-stepper-title\">\n      <p className=\"skill-pill\">user-event</p>\n      <h2 id=\"quantity-stepper-title\">Cart quantity</h2>\n      <div className=\"quantity-control\">\n        <button onClick={decreaseQuantity} type=\"button\">\n          Decrease quantity\n        </button>\n        <label className=\"field-label\" htmlFor=\"cart-quantity\">\n          Quantity\n        </label>\n        <input\n          className=\"text-input\"\n          id=\"cart-quantity\"\n          inputMode=\"numeric\"\n          onChange={handleQuantityInput}\n          value={quantityText}\n        />\n        <button onClick={increaseQuantity} type=\"button\">\n          Increase quantity\n        </button>\n      </div>\n      <p aria-live=\"polite\">Current quantity: {quantity}</p>\n    </section>\n  )\n}\n\nfunction parseQuantityText(quantityText: string): number {\n  const quantity = Number(quantityText)\n  return Number.isInteger(quantity) && quantity > 0 ? quantity : 1\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { describe, expect, it } from 'vitest'\nimport { QuantityStepper } from './quantity-stepper'\n\ndescribe('QuantityStepper', () => {\n  it('updates quantity through a realistic click sequence', async () => {\n    const user = userEvent.setup()\n\n    render(<QuantityStepper initialQuantity={1} maxQuantity={3} />)\n\n    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))\n    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))\n    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))\n\n    expect(screen.getByLabelText('Quantity')).toHaveDisplayValue('3')\n    expect(screen.getByText('Current quantity: 3')).toBeInTheDocument()\n  })\n\n  it('updates quantity through typed input', async () => {\n    const user = userEvent.setup()\n\n    render(<QuantityStepper initialQuantity={2} maxQuantity={5} />)\n\n    const input = screen.getByLabelText('Quantity')\n\n    await user.clear(input)\n    await user.type(input, '4')\n\n    expect(input).toHaveDisplayValue('4')\n    expect(screen.getByText('Current quantity: 4')).toBeInTheDocument()\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "input draft string, event.currentTarget value, state setter"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "userEvent simulates interaction sequence and must be awaited"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "Comparison of wrong writing methods is to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rule "
        },
        {
          "type": "inlineCode",
          "value": "userEvent simulates interaction sequence and must be awaited"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Cart quantity and product quantity controls need realistic typing."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "input draft string, event.currentTarget value, state setter"
        },
        {
          "type": "text",
          "value": " Trace the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "96-async-ui-tests-for-loading-error-and-success",
      "children": [
        {
          "type": "text",
          "value": "9.6 Async UI Tests for Loading, Error, and Success"
        }
      ]
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
          "value": "This section focuses on "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: async tests wait for DOM changes, not fixed sleep."
        }
      ]
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
          "value": "It solves the learner at "
        },
        {
          "type": "inlineCode",
          "value": "Promise / deferred / findBy / status / alert"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "pending state, deferred promise, success or error state"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "Promise / deferred / findBy / status / alert"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "pending state, deferred promise, success or error state"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx",
      "value": "import { useState } from 'react'\n\ntype OrderSummary = {\n  id: string\n  label: string\n}\n\ntype AsyncOrderStatusPanelProps = {\n  loadOrders: () => Promise<OrderSummary[]>\n}\n\ntype OrderStatus =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; orders: OrderSummary[] }\n  | { status: 'error'; message: string }\n\nexport function AsyncOrderStatusPanel({ loadOrders }: AsyncOrderStatusPanelProps) {\n  const [orderStatus, setOrderStatus] = useState<OrderStatus>({ status: 'idle' })\n\n  async function handleLoadOrders(): Promise<void> {\n    setOrderStatus({ status: 'pending' })\n\n    try {\n      const orders = await loadOrders()\n      setOrderStatus({ status: 'success', orders })\n    } catch {\n      setOrderStatus({ status: 'error', message: 'Orders could not be loaded.' })\n    }\n  }\n\n  return (\n    <section className=\"practice-panel\" aria-labelledby=\"async-orders-title\">\n      <p className=\"skill-pill\">Async UI</p>\n      <h2 id=\"async-orders-title\">Seller orders</h2>\n      <button onClick={handleLoadOrders} type=\"button\">\n        Load orders\n      </button>\n\n      {orderStatus.status === 'idle' ? <p>Select load orders to start.</p> : null}\n      {orderStatus.status === 'pending' ? <p role=\"status\">Loading orders...</p> : null}\n      {orderStatus.status === 'error' ? <p role=\"alert\">{orderStatus.message}</p> : null}\n      {orderStatus.status === 'success' && orderStatus.orders.length === 0 ? (\n        <p>No orders found.</p>\n      ) : null}\n      {orderStatus.status === 'success' && orderStatus.orders.length > 0 ? (\n        <ul aria-label=\"Loaded orders\">\n          {orderStatus.orders.map((order) => (\n            <li key={order.id}>{order.label}</li>\n          ))}\n        </ul>\n      ) : null}\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { describe, expect, it, vi } from 'vitest'\nimport { AsyncOrderStatusPanel } from './async-order-status-panel'\n\ndescribe('AsyncOrderStatusPanel', () => {\n  it('waits for loading to become success output', async () => {\n    const user = userEvent.setup()\n    const deferredOrders = createDeferred([{ id: 'order-1001', label: 'Order 1001' }])\n    const loadOrders = vi.fn(() => deferredOrders.promise)\n\n    render(<AsyncOrderStatusPanel loadOrders={loadOrders} />)\n\n    await user.click(screen.getByRole('button', { name: 'Load orders' }))\n\n    expect(screen.getByRole('status')).toHaveTextContent('Loading orders...')\n\n    deferredOrders.resolve()\n\n    expect(await screen.findByText('Order 1001')).toBeInTheDocument()\n    expect(loadOrders).toHaveBeenCalledTimes(1)\n    expect(screen.queryByRole('status')).not.toBeInTheDocument()\n  })\n\n  it('renders an error branch when the promise rejects', async () => {\n    const user = userEvent.setup()\n    const loadOrders = vi.fn(() => Promise.reject(new Error('Network failed')))\n\n    render(<AsyncOrderStatusPanel loadOrders={loadOrders} />)\n\n    await user.click(screen.getByRole('button', { name: 'Load orders' }))\n\n    expect(await screen.findByRole('alert')).toHaveTextContent(\n      'Orders could not be loaded.',\n    )\n  })\n})\n\nfunction createDeferred<TValue>(value: TValue) {\n  let resolvePromise!: () => void\n  const promise = new Promise<TValue>((resolve) => {\n    resolvePromise = () => resolve(value)\n  })\n\n  return {\n    promise,\n    resolve: resolvePromise,\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "pending state, deferred promise, success or error state"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "async tests wait for DOM changes, not fixed sleep"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "contrasts the wrong writing methods: testing implementation detail, reading private state directly, using test id extensively, waiting with sleep, forgetting wrapper, mock component internals, or just running build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "async tests wait for DOM changes, not fixed sleep"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Orders loading, empty, error, and success states use this model."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "pending state, deferred promise, success or error state"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "97-testing-controlled-form-behavior",
      "children": [
        {
          "type": "text",
          "value": "9.7 Testing Controlled Form Behavior"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: form tests verify user input and submitted payload."
        }
      ]
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
          "value": "It solves the problem of learners in "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault / selectOptions / checkbox / vi.fn"
        },
        {
          "type": "text",
          "value": " In the scenario, I don't know what to test, where to test, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "form values object and submit mock call"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "preventDefault / selectOptions / checkbox / vi.fn"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "form values object and submit mock call"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx",
      "value": "import { useState } from 'react'\nimport type { FormEvent } from 'react'\n\ntype SellerFilterValues = {\n  query: string\n  status: 'all' | 'active' | 'archived'\n  inStockOnly: boolean\n}\n\ntype SellerFilterFormProps = {\n  onApply: (values: SellerFilterValues) => void\n}\n\nexport function SellerFilterForm({ onApply }: SellerFilterFormProps) {\n  const [values, setValues] = useState<SellerFilterValues>({\n    query: '',\n    status: 'all',\n    inStockOnly: false,\n  })\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>): void {\n    event.preventDefault()\n    onApply(values)\n  }\n\n  return (\n    <form className=\"practice-panel\" onSubmit={handleSubmit}>\n      <p className=\"skill-pill\">Controlled form test</p>\n      <h2>Catalog filter</h2>\n\n      <label className=\"field-label\" htmlFor=\"catalog-query\">\n        Search products\n      </label>\n      <input\n        className=\"text-input\"\n        id=\"catalog-query\"\n        onChange={(event) => {\n          const query = event.currentTarget.value\n\n          setValues((currentValues) => ({\n            ...currentValues,\n            query,\n          }))\n        }}\n        value={values.query}\n      />\n\n      <label className=\"field-label\" htmlFor=\"catalog-status\">\n        Product status\n      </label>\n      <select\n        id=\"catalog-status\"\n        onChange={(event) => {\n          const status = event.currentTarget.value as SellerFilterValues['status']\n\n          setValues((currentValues) => ({\n            ...currentValues,\n            status,\n          }))\n        }}\n        value={values.status}\n      >\n        <option value=\"all\">All</option>\n        <option value=\"active\">Active</option>\n        <option value=\"archived\">Archived</option>\n      </select>\n\n      <label className=\"checkbox-row\">\n        <input\n          checked={values.inStockOnly}\n          onChange={(event) => {\n            const inStockOnly = event.currentTarget.checked\n\n            setValues((currentValues) => ({\n              ...currentValues,\n              inStockOnly,\n            }))\n          }}\n          type=\"checkbox\"\n        />\n        In stock only\n      </label>\n\n      <button type=\"submit\">Apply filters</button>\n    </form>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { describe, expect, it, vi } from 'vitest'\nimport { SellerFilterForm } from './seller-filter-form'\n\ndescribe('SellerFilterForm', () => {\n  it('submits the current controlled form values', async () => {\n    const user = userEvent.setup()\n    const handleApply = vi.fn()\n\n    render(<SellerFilterForm onApply={handleApply} />)\n\n    await user.type(screen.getByLabelText('Search products'), 'lamp')\n    await user.selectOptions(screen.getByLabelText('Product status'), 'active')\n    await user.click(screen.getByRole('checkbox', { name: 'In stock only' }))\n    await user.click(screen.getByRole('button', { name: 'Apply filters' }))\n\n    expect(handleApply).toHaveBeenCalledWith({\n      query: 'lamp',\n      status: 'active',\n      inStockOnly: true,\n    })\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "form values object and submit mock call"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "form tests verify user input and submitted payload"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "comparison error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "form tests verify user input and submitted payload"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Catalog filter and login forms use controlled values."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "form values object and submit mock call"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "98-router-integration-tests-with-an-initial-route",
      "children": [
        {
          "type": "text",
          "value": "9.8 Router Integration Tests with an Initial Route"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: router tests must provide router context."
        }
      ]
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
          "value": "It solves the problem of learners in "
        },
        {
          "type": "inlineCode",
          "value": "MemoryRouter / initialEntries / Navigate / useParams"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "router location, params object, redirect state"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "MemoryRouter / initialEntries / Navigate / useParams"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "router location, params object, redirect state"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx",
      "value": "import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router'\n\ntype SellerRouteWorkspaceProps = {\n  isAuthenticated?: boolean\n}\n\nexport function SellerRouteWorkspace({ isAuthenticated = false }: SellerRouteWorkspaceProps) {\n  return (\n    <Routes>\n      <Route element={<CatalogRoute />} path=\"/catalog\" />\n      <Route element={<SellerOrderRoute />} path=\"/seller/orders/:orderId\" />\n      <Route\n        element={<ProtectedOrdersRoute isAuthenticated={isAuthenticated} />}\n        path=\"/seller/orders\"\n      />\n      <Route element={<LoginRoute />} path=\"/login\" />\n    </Routes>\n  )\n}\n\nfunction CatalogRoute() {\n  return (\n    <section>\n      <h2>Catalog route</h2>\n      <Link to=\"/seller/orders\">Open seller orders</Link>\n    </section>\n  )\n}\n\nfunction SellerOrderRoute() {\n  const params = useParams()\n\n  return <h2>Order detail {params.orderId}</h2>\n}\n\nfunction ProtectedOrdersRoute({ isAuthenticated }: { isAuthenticated: boolean }) {\n  const location = useLocation()\n\n  if (!isAuthenticated) {\n    return <Navigate replace state={{ from: location.pathname }} to=\"/login\" />\n  }\n\n  return <h2>Seller orders route</h2>\n}\n\nfunction LoginRoute() {\n  const location = useLocation()\n  const from = (location.state as { from?: string } | null)?.from ?? '/seller/orders'\n\n  return (\n    <section>\n      <h2>Login route</h2>\n      <p>Redirect target: {from}</p>\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { MemoryRouter } from 'react-router'\nimport { describe, expect, it } from 'vitest'\nimport { SellerRouteWorkspace } from './seller-route-workspace'\n\ndescribe('SellerRouteWorkspace', () => {\n  it('renders a route using an initial location', () => {\n    render(\n      <MemoryRouter initialEntries={['/seller/orders/1001']}>\n        <SellerRouteWorkspace isAuthenticated />\n      </MemoryRouter>,\n    )\n\n    expect(screen.getByRole('heading', { name: 'Order detail 1001' })).toBeInTheDocument()\n  })\n\n  it('renders the protected route guard with redirect context', async () => {\n    render(\n      <MemoryRouter initialEntries={['/seller/orders']}>\n        <SellerRouteWorkspace />\n      </MemoryRouter>,\n    )\n\n    expect(await screen.findByRole('heading', { name: 'Login route' })).toBeInTheDocument()\n    expect(screen.getByText('Redirect target: /seller/orders')).toBeInTheDocument()\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code line-by-line explanation:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "router location, params object, redirect state"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test passed means public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "router tests must provide router context"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "comparison error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "router tests must provide router context"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Protected seller routes and product params use initial route tests."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "router location, params object, redirect state"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "99-testing-context-providers-and-custom-hook-boundaries",
      "children": [
        {
          "type": "text",
          "value": "9.9 Testing Context Providers and Custom Hook Boundaries"
        }
      ]
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
          "value": "This section focuses on "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts"
        },
        {
          "type": "text",
          "value": " Establishes a specific test boundary. The core rule is: custom hooks are tested through a provider-backed component."
        }
      ]
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
          "value": "It solves learners at "
        },
        {
          "type": "inlineCode",
          "value": "createContext / useContext / provider wrapper"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "context value object and real consumer component"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "createContext / useContext / provider wrapper"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "context value object and real consumer component"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts",
      "value": "import { createContext, useContext } from 'react'\n\nexport type SellerPreferences = {\n  currency: 'USD' | 'EUR'\n  compactMode: boolean\n}\n\nexport const SellerPreferencesContext = createContext<SellerPreferences | null>(null)\n\nexport function useSellerPreferences(): SellerPreferences {\n  const preferences = useContext(SellerPreferencesContext)\n\n  if (!preferences) {\n    throw new Error('useSellerPreferences must be used within SellerPreferencesProvider')\n  }\n\n  return preferences\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { describe, expect, it } from 'vitest'\nimport { SellerPreferenceSummary } from './seller-preference-summary'\nimport { SellerPreferencesProvider } from './seller-preferences-provider'\n\ndescribe('SellerPreferenceSummary', () => {\n  it('reads custom hook output through the provider boundary', () => {\n    render(\n      <SellerPreferencesProvider value={{ compactMode: true, currency: 'EUR' }}>\n        <SellerPreferenceSummary />\n      </SellerPreferencesProvider>,\n    )\n\n    expect(screen.getByText('Currency: EUR')).toBeInTheDocument()\n    expect(screen.getByText('Compact mode: enabled')).toBeInTheDocument()\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "context value object and real consumer component"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "custom hooks are tested through a provider-backed component"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "Comparison of wrong writing methods is to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rule "
        },
        {
          "type": "inlineCode",
          "value": "custom hooks are tested through a provider-backed component"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Auth and preferences context need wrapper tests."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "context value object and real consumer component"
        },
        {
          "type": "text",
          "value": " Trace the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "910-mocking-the-network-boundary-with-msw",
      "children": [
        {
          "type": "text",
          "value": "9.10 Mocking the Network Boundary with MSW"
        }
      ]
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
          "value": "This section focuses on "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: mock the request boundary, not component internals."
        }
      ]
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
          "value": "It solves the learner at "
        },
        {
          "type": "inlineCode",
          "value": "MSW / http.get / HttpResponse / server.use"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "fetch request, MSW handler, response payload, UI state"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "MSW / http.get / HttpResponse / server.use"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "fetch request, MSW handler, response payload, UI state"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx",
      "value": "import { useState } from 'react'\nimport { fetchSellerOrders } from './seller-orders-api'\nimport type { SellerOrderRecord } from './seller-orders-api'\n\ntype NetworkOrderState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; orders: SellerOrderRecord[] }\n  | { status: 'error'; message: string }\n\nexport function SellerOrdersNetworkPanel() {\n  const [orderState, setOrderState] = useState<NetworkOrderState>({ status: 'idle' })\n\n  async function handleLoadOrders(): Promise<void> {\n    setOrderState({ status: 'pending' })\n\n    try {\n      const orders = await fetchSellerOrders('open')\n      setOrderState({ status: 'success', orders })\n    } catch {\n      setOrderState({ status: 'error', message: 'Network order request failed.' })\n    }\n  }\n\n  return (\n    <section className=\"practice-panel\" aria-labelledby=\"network-orders-title\">\n      <p className=\"skill-pill\">MSW</p>\n      <h2 id=\"network-orders-title\">Network-backed seller orders</h2>\n      <button onClick={handleLoadOrders} type=\"button\">\n        Load network orders\n      </button>\n      {orderState.status === 'idle' ? <p>No request has started.</p> : null}\n      {orderState.status === 'pending' ? <p role=\"status\">Loading network orders...</p> : null}\n      {orderState.status === 'error' ? <p role=\"alert\">{orderState.message}</p> : null}\n      {orderState.status === 'success' ? (\n        <ul aria-label=\"Network orders\">\n          {orderState.orders.map((order) => (\n            <li key={order.id}>\n              {order.customer}: ${order.total}\n            </li>\n          ))}\n        </ul>\n      ) : null}\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.msw.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { delay, http, HttpResponse } from 'msw'\nimport { describe, expect, it } from 'vitest'\nimport { server } from '../sellerhub-tested-workflow/sellerhub-test-server'\nimport { SellerOrdersNetworkPanel } from './seller-orders-network-panel'\n\ndescribe('SellerOrdersNetworkPanel', () => {\n  it('uses MSW to mock the request boundary instead of component internals', async () => {\n    const user = userEvent.setup()\n\n    server.use(\n      http.get('/api/testing/orders', async () => {\n        await delay(50)\n        return HttpResponse.json([{ id: 'order-2001', customer: 'Ava', total: 156 }])\n      }),\n    )\n\n    render(<SellerOrdersNetworkPanel />)\n\n    await user.click(screen.getByRole('button', { name: 'Load network orders' }))\n\n    expect(screen.getByRole('status')).toHaveTextContent('Loading network orders...')\n    expect(await screen.findByText('Ava: $156')).toBeInTheDocument()\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "fetch request, MSW handler, response payload, UI state"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "mock the request boundary, not component internals"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "contrasts the wrong writing methods: testing implementation detail, reading private state directly, using test id extensively, waiting with sleep, forgetting wrapper, mock component internals, or just running build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "mock the request boundary, not component internals"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Orders and product detail API tests use MSW."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "fetch request, MSW handler, response payload, UI state"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "911-testing-error-boundaries-and-error-states",
      "children": [
        {
          "type": "text",
          "value": "9.11 Testing Error Boundaries and Error States"
        }
      ]
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
          "value": "This section focuses on "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: Error Boundary catches render errors, not event or async request failures."
        }
      ]
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
          "value": "It solves learners in "
        },
        {
          "type": "inlineCode",
          "value": "getDerivedStateFromError / componentDidCatch / fallback"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "render throw, boundary state, fallback alert"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "getDerivedStateFromError / componentDidCatch / fallback"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "render throw, boundary state, fallback alert"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx",
      "value": "import { Component } from 'react'\nimport type { ReactNode } from 'react'\n\ntype RenderErrorBoundaryProps = {\n  children: ReactNode\n}\n\ntype RenderErrorBoundaryState = {\n  hasError: boolean\n}\n\nexport class RenderErrorBoundary extends Component<\n  RenderErrorBoundaryProps,\n  RenderErrorBoundaryState\n> {\n  state: RenderErrorBoundaryState = { hasError: false }\n\n  static getDerivedStateFromError(): RenderErrorBoundaryState {\n    return { hasError: true }\n  }\n\n  componentDidCatch(): void {}\n\n  render() {\n    if (this.state.hasError) {\n      return <p role=\"alert\">SellerHub section failed to render.</p>\n    }\n\n    return this.props.children\n  }\n}\n\nexport function CrashingSellerWidget(): ReactNode {\n  throw new Error('Seller widget render failed')\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { afterEach, describe, expect, it, vi } from 'vitest'\nimport { CrashingSellerWidget, RenderErrorBoundary } from './render-error-boundary'\n\ndescribe('RenderErrorBoundary', () => {\n  afterEach(() => {\n    vi.restoreAllMocks()\n  })\n\n  it('renders fallback UI for render-time errors', () => {\n    vi.spyOn(console, 'error').mockImplementation(() => {})\n\n    render(\n      <RenderErrorBoundary>\n        <CrashingSellerWidget />\n      </RenderErrorBoundary>,\n    )\n\n    expect(screen.getByRole('alert')).toHaveTextContent(\n      'SellerHub section failed to render.',\n    )\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "render throw, boundary state, fallback alert"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "Error Boundary catches render errors, not event or async request failures"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "comparison error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violates the rule "
        },
        {
          "type": "inlineCode",
          "value": "Error Boundary catches render errors, not event or async request failures"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "Widget crash uses boundary; API failure uses error state."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "render throw, boundary state, fallback alert"
        },
        {
          "type": "text",
          "value": " traces the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "912-quality-gates-across-lint-typecheck-test-build-and-ci",
      "children": [
        {
          "type": "text",
          "value": "9.12 Quality Gates Across lint, typecheck, test, build, and CI"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts"
        },
        {
          "type": "text",
          "value": " establishes a specific test boundary. The core rule is: quality gates are separate and cannot replace each other."
        }
      ]
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
          "value": "It solves the learner in "
        },
        {
          "type": "inlineCode",
          "value": "lint / typecheck / test / build / CI"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "command array, gate name union, assertion result"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "lint / typecheck / test / build / CI"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "command array, gate name union, assertion result"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts",
      "value": "export type QualityGateName = 'lint' | 'typecheck' | 'test' | 'build'\n\nexport type QualityGateCommand = {\n  name: QualityGateName\n  command: string\n  verifies: string\n}\n\nexport const qualityGateCommands: QualityGateCommand[] = [\n  {\n    name: 'lint',\n    command: 'npm run lint',\n    verifies: 'Static code rules and hook lint rules',\n  },\n  {\n    name: 'typecheck',\n    command: 'npm run typecheck',\n    verifies: 'TypeScript compile-time relationships',\n  },\n  {\n    name: 'test',\n    command: 'npm run test',\n    verifies: 'Runtime behavior and user-visible outcomes',\n  },\n  {\n    name: 'build',\n    command: 'npm run build',\n    verifies: 'Production TypeScript and Vite build pipeline',\n  },\n]\n\nexport function summarizeQualityGate(commands: QualityGateCommand[]): string {\n  return commands.map((command) => command.name).join(' -> ')\n}"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.test.ts",
      "value": "import { describe, expect, it } from 'vitest'\nimport { qualityGateCommands, summarizeQualityGate } from './quality-gate-command-model'\n\ndescribe('quality gate command model', () => {\n  it('keeps lint, typecheck, test, and build as separate gates', () => {\n    expect(summarizeQualityGate(qualityGateCommands)).toBe(\n      'lint -> typecheck -> test -> build',\n    )\n  })\n\n  it('documents the behavior verified by the test gate', () => {\n    expect(qualityGateCommands.find((command) => command.name === 'test')).toMatchObject({\n      command: 'npm run test',\n      verifies: 'Runtime behavior and user-visible outcomes',\n    })\n  })\n})"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "command array, gate name union, assertion result"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test indicates public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "quality gates are separate and cannot replace each other"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "Comparative error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "quality gates are separate and cannot replace each other"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "SellerHub changes should run all four gates."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "command array, gate name union, assertion result"
        },
        {
          "type": "text",
          "value": " Trace the evidence chain from trigger to assertion."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "913-mapping-the-sellerhub-testing-architecture",
      "children": [
        {
          "type": "text",
          "value": "9.13 Mapping the SellerHub Testing Architecture"
        }
      ]
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
          "value": "This section revolves around "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts"
        },
        {
          "type": "text",
          "value": " Establish a specific test boundary. The core rule is: architecture maps business behavior to the smallest useful test layer."
        }
      ]
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
          "value": "It solves the problem of learners in "
        },
        {
          "type": "inlineCode",
          "value": "CatalogFilterValues / LoginValues / SellerOrder / SellerAuthValue"
        },
        {
          "type": "text",
          "value": " scenario, I don't know what to test, where to test it, and how to locate the owner after failure."
        }
      ]
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
          "value": "When this boundary is clear, test failure will point to "
        },
        {
          "type": "inlineCode",
          "value": "domain type boundary shared by tests and components"
        },
        {
          "type": "text",
          "value": " instead of mixing React, browser, TypeScript and network issues together."
        }
      ]
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
          "value": "CatalogFilterValues / LoginValues / SellerOrder / SellerAuthValue"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "bounds: JavaScript runtime/React render-commit/Testing Library/Vitest/jsdom/MSW/TypeScript/tooling/CI/architecture convention:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates functions, objects, Promise or handlers; React is only responsible for render and commit in the component example; Testing Library queries the user-visible DOM from jsdom; Vitest performs test callback and assertion; MSW only takes over the network boundary in the request example; TypeScript at compile time Checks type relationships but does not replace runtime behavior test."
        }
      ]
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
          "value": "trigger point is when the test runner executes the corresponding test file or user interaction. The specific value stream is "
        },
        {
          "type": "inlineCode",
          "value": "domain type boundary shared by tests and components"
        },
        {
          "type": "text",
          "value": ". The test first arranges input or wrapper, then triggers render, event, Promise or request, and finally uses assertion to determine the observable results."
        }
      ]
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
          "value": "If there is no new API in this section, the focus is on testing boundaries and quality gate; otherwise, the API is subject to the import and call signature in the code in this section."
        }
      ]
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
          "value": "Fixed names come from public API, role, label, handler, route path or npm script in the code; do not assert private variables."
        }
      ]
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
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts",
      "value": "export type SellerOrder = {\n  id: string\n  customer: string\n  status: 'open' | 'shipped'\n  total: number\n}\n\nexport type LoginValues = {\n  email: string\n  password: string\n}\n\nexport type CatalogFilterValues = {\n  query: string\n  status: 'all' | 'active' | 'archived'\n}\n\nexport type SellerAuthValue = {\n  isAuthenticated: boolean\n  sellerName: string | null\n  signIn: (sellerName: string) => void\n  signOut: () => void\n}\n\nexport type CartLine = {\n  id: string\n  name: string\n  quantity: number\n}\n\nexport type CartState = {\n  lines: CartLine[]\n}\n\nexport type CartAction =\n  | { type: 'addLine'; line: CartLine }\n  | { type: 'setQuantity'; lineId: string; quantity: number }\n  | { type: 'removeLine'; lineId: string }"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "test code explained line by line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "code first imports the tested target and testing API, and then arranges the input or wrapper. The act stage passes function call, "
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
          "value": "userEvent"
        },
        {
          "type": "text",
          "value": ", Promise resolve, MSW handler or router location trigger behavior, the assert phase only checks visible output, return value, mock call or command model."
        }
      ]
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
          "value": "Vitest loads the module and executes the test callback; the React example renders to jsdom from RTL; userEvent triggers the real interaction sequence; the async example waits for Promise or DOM mutation; the MSW example returns response from the handler; when assertion fails, Vitest prints expected/received or Testing Library DOM snapshot."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Changes in variables, references, state snapshot, DOM query, Promise, mock request, test assertion, provider wrapper, router location:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section focuses on tracking "
        },
        {
          "type": "inlineCode",
          "value": "domain type boundary shared by tests and components"
        },
        {
          "type": "text",
          "value": ". Whether the reference changes, whether the state snapshot is updated, when the DOM query can find the node, when the Promise is settled, and whether the handler is reset are all evidences to judge whether the test is reliable."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why the test passed or failed:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "test pass means public behavior and "
        },
        {
          "type": "inlineCode",
          "value": "architecture maps business behavior to the smallest useful test layer"
        },
        {
          "type": "text",
          "value": " is consistent; failure usually indicates that the owner boundary is wrongly selected, the wrapper is missing, the query does not meet the accessible output, the Promise is not waited for, the handler is polluted, or TypeScript only passes the static relationship but the runtime behavior is incorrect."
        }
      ]
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
          "value": "comparison error writing methods are to test implementation detail, read private state directly, use test id extensively, wait with sleep, forget wrapper, mock component internals, or just run build. The correct way to write it starts from user behavior, business rules and request/provider/router boundary."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "common mistakes violated which rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "violated is "
        },
        {
          "type": "inlineCode",
          "value": "architecture maps business behavior to the smallest useful test layer"
        },
        {
          "type": "text",
          "value": ". The identification signal is that the failure message is far away from the real bug, or that the test is broken after refactoring the internal implementation but the user behavior is not broken."
        }
      ]
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
          "value": "looks at the failure information: missing role/label is DOM semantics; unhandled request is MSW boundary; hook context error is provider/router wrapper; expected object mismatch is pure rule; type error is compile-time relation."
        }
      ]
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
          "value": "SellerHub testing starts from business boundary, not private state."
        }
      ]
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
          "value": "This section converts props, state, forms, async data, router, context, error boundary or performance command model from previous chapters into repeatable quality evidence."
        }
      ]
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
          "value": "first find the owner, then select the test layer; focus on "
        },
        {
          "type": "inlineCode",
          "value": "domain type boundary shared by tests and components"
        },
        {
          "type": "text",
          "value": " tracks the evidence chain from trigger to assertion."
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
              "value": "describe"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "it"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "expect"
            }
          ],
          [
            {
              "type": "text",
              "value": "Vitest"
            }
          ],
          [
            {
              "type": "text",
              "value": "definition and assertion testing."
            }
          ],
          [
            {
              "type": "text",
              "value": "Forgot to await async assertion."
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
              "type": "text",
              "value": "React Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "render UI to jsdom."
            }
          ],
          [
            {
              "type": "text",
              "value": "Bare render requires a wrapper component."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "screen.getByRole"
            }
          ],
          [
            {
              "type": "text",
              "value": "Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "Press role/name to check the element."
            }
          ],
          [
            {
              "type": "text",
              "value": "Use it to check asynchronous elements."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "screen.queryByRole"
            }
          ],
          [
            {
              "type": "text",
              "value": "Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "Check optional or non-existent elements."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses getBy to make a negative assertion."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "screen.findByText"
            }
          ],
          [
            {
              "type": "text",
              "value": "Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "Wait for the DOM to appear later."
            }
          ],
          [
            {
              "type": "text",
              "value": "is replaced by sleep."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "userEvent.setup"
            }
          ],
          [
            {
              "type": "text",
              "value": "Testing Library"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create user interaction instance."
            }
          ],
          [
            {
              "type": "text",
              "value": "does not await click/type."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "http.get"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "HttpResponse.json"
            }
          ],
          [
            {
              "type": "text",
              "value": "MSW"
            }
          ],
          [
            {
              "type": "text",
              "value": "Mock request boundary."
            }
          ],
          [
            {
              "type": "text",
              "value": "Mock component internal helper."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "MemoryRouter initialEntries"
            }
          ],
          [
            {
              "type": "text",
              "value": "React Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "provides initial route."
            }
          ],
          [
            {
              "type": "text",
              "value": "Forgot router context."
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "getDerivedStateFromError"
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
              "value": "capture render error."
            }
          ],
          [
            {
              "type": "text",
              "value": "expects to catch async request error."
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
              "value": "test internal state"
            }
          ],
          [
            {
              "type": "text",
              "value": "Strategy"
            }
          ],
          [
            {
              "type": "text",
              "value": "measures visible behavior of users."
            }
          ],
          [
            {
              "type": "text",
              "value": "is changed to role/label/text."
            }
          ],
          [
            {
              "type": "text",
              "value": "failed the test meaninglessly after refactoring the internal implementation."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "default "
            },
            {
              "type": "inlineCode",
              "value": "getByTestId"
            }
          ],
          [
            {
              "type": "text",
              "value": "Accessibility"
            }
          ],
          [
            {
              "type": "text",
              "value": "gives priority to accessible query."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses getByRole/getByLabelText."
            }
          ],
          [
            {
              "type": "text",
              "value": "label is broken and the test still passes."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "async UI immediately getBy"
            }
          ],
          [
            {
              "type": "text",
              "value": "Timing"
            }
          ],
          [
            {
              "type": "text",
              "value": "DOM may be committed later."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses findBy/waitFor."
            }
          ],
          [
            {
              "type": "text",
              "value": "CI failed occasionally."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "fixed sleep"
            }
          ],
          [
            {
              "type": "text",
              "value": "Timing"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not depend on machine speed."
            }
          ],
          [
            {
              "type": "text",
              "value": "Waiting for DOM or mock call."
            }
          ],
          [
            {
              "type": "text",
              "value": "Local and CI time behave differently."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Forgot Router wrapper"
            }
          ],
          [
            {
              "type": "text",
              "value": "Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "hooks require router context."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses MemoryRouter."
            }
          ],
          [
            {
              "type": "text",
              "value": "reports router context error."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Forgot Provider wrapper"
            }
          ],
          [
            {
              "type": "text",
              "value": "Context"
            }
          ],
          [
            {
              "type": "text",
              "value": "consumer requires provider subtree."
            }
          ],
          [
            {
              "type": "text",
              "value": "uses provider wrapper."
            }
          ],
          [
            {
              "type": "text",
              "value": "custom hook throws provider error."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "MSW handler does not reset"
            }
          ],
          [
            {
              "type": "text",
              "value": "Isolation"
            }
          ],
          [
            {
              "type": "text",
              "value": "tests cannot be contaminated."
            }
          ],
          [
            {
              "type": "text",
              "value": "setup afterEach resetHandlers."
            }
          ],
          [
            {
              "type": "text",
              "value": "passed the single run, but failed the whole set."
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "only runs build"
            }
          ],
          [
            {
              "type": "text",
              "value": "Quality gate"
            }
          ],
          [
            {
              "type": "text",
              "value": "build does not replace test/typecheck/lint."
            }
          ],
          [
            {
              "type": "text",
              "value": "All four gates run."
            }
          ],
          [
            {
              "type": "text",
              "value": "bundle is successful but behaves badly."
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
          "value": "SellerHub Tested Workflow"
        },
        {
          "type": "text",
          "value": " integrates pure reducer/parser unit test, controlled login form behavior test, MSW async orders test, router initial route test, protected route UI guard, provider/custom hook wrapper test, accessibility-first queries, userEvent interaction, jest-dom assertions, error boundary fallback and quality gate command model. It serves subsequent SellerHub learning, but does not implement the full SellerHub and does not introduce real backends, Playwright, React Hook Form, Zod or TanStack Query."
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
      "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx\nsrc/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx"
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
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts",
      "value": "export type SellerOrder = {\n  id: string\n  customer: string\n  status: 'open' | 'shipped'\n  total: number\n}\n\nexport type LoginValues = {\n  email: string\n  password: string\n}\n\nexport type CatalogFilterValues = {\n  query: string\n  status: 'all' | 'active' | 'archived'\n}\n\nexport type SellerAuthValue = {\n  isAuthenticated: boolean\n  sellerName: string | null\n  signIn: (sellerName: string) => void\n  signOut: () => void\n}\n\nexport type CartLine = {\n  id: string\n  name: string\n  quantity: number\n}\n\nexport type CartState = {\n  lines: CartLine[]\n}\n\nexport type CartAction =\n  | { type: 'addLine'; line: CartLine }\n  | { type: 'setQuantity'; lineId: string; quantity: number }\n  | { type: 'removeLine'; lineId: string }"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts",
      "value": "import type { CartAction, CartState } from './sellerhub-testing-types'\n\nexport function parseCatalogFilterQuery(rawQuery: string): string {\n  return rawQuery.trim().replace(/\\s+/g, ' ').toLowerCase()\n}\n\nexport function sellerCartReducer(state: CartState, action: CartAction): CartState {\n  switch (action.type) {\n    case 'addLine':\n      if (state.lines.some((line) => line.id === action.line.id)) {\n        return state\n      }\n\n      return { lines: [...state.lines, action.line] }\n\n    case 'setQuantity':\n      return {\n        lines: state.lines.map((line) =>\n          line.id === action.lineId ? { ...line, quantity: action.quantity } : line,\n        ),\n      }\n\n    case 'removeLine':\n      return { lines: state.lines.filter((line) => line.id !== action.lineId) }\n\n    default:\n      return assertNever(action)\n  }\n}\n\nfunction assertNever(action: never): never {\n  throw new Error(`Unhandled seller cart action: ${JSON.stringify(action)}`)\n}"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts",
      "value": "import { createContext, useContext } from 'react'\nimport type { SellerAuthValue } from './sellerhub-testing-types'\n\nexport const SellerAuthContext = createContext<SellerAuthValue | null>(null)\n\nexport function useSellerAuth(): SellerAuthValue {\n  const auth = useContext(SellerAuthContext)\n\n  if (!auth) {\n    throw new Error('useSellerAuth must be used within SellerAuthProvider')\n  }\n\n  return auth\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx",
      "value": "import { useMemo, useState } from 'react'\nimport { SellerAuthContext } from './sellerhub-auth-context'\nimport type { ReactNode } from 'react'\nimport type { SellerAuthValue } from './sellerhub-testing-types'\n\ntype SellerAuthProviderProps = {\n  children: ReactNode\n  initialSellerName?: string | null\n}\n\nexport function SellerAuthProvider({\n  children,\n  initialSellerName = null,\n}: SellerAuthProviderProps) {\n  const [sellerName, setSellerName] = useState<string | null>(initialSellerName)\n\n  const authValue = useMemo<SellerAuthValue>(\n    () => ({\n      isAuthenticated: sellerName !== null,\n      sellerName,\n      signIn: (nextSellerName) => setSellerName(nextSellerName),\n      signOut: () => setSellerName(null),\n    }),\n    [sellerName],\n  )\n\n  return <SellerAuthContext value={authValue}>{children}</SellerAuthContext>\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx",
      "value": "import { useState } from 'react'\nimport type { FormEvent } from 'react'\nimport type { CatalogFilterValues } from './sellerhub-testing-types'\n\ntype SellerHubCatalogFilterProps = {\n  onApply: (values: CatalogFilterValues) => void\n}\n\nexport function SellerHubCatalogFilter({ onApply }: SellerHubCatalogFilterProps) {\n  const [values, setValues] = useState<CatalogFilterValues>({\n    query: '',\n    status: 'all',\n  })\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>): void {\n    event.preventDefault()\n    onApply(values)\n  }\n\n  return (\n    <form className=\"workflow-card\" onSubmit={handleSubmit}>\n      <h3>Catalog filter</h3>\n      <label className=\"field-label\" htmlFor=\"workflow-catalog-query\">\n        Search catalog\n      </label>\n      <input\n        className=\"text-input\"\n        id=\"workflow-catalog-query\"\n        onChange={(event) => {\n          const query = event.currentTarget.value\n\n          setValues((currentValues) => ({\n            ...currentValues,\n            query,\n          }))\n        }}\n        value={values.query}\n      />\n\n      <label className=\"field-label\" htmlFor=\"workflow-catalog-status\">\n        Catalog status\n      </label>\n      <select\n        id=\"workflow-catalog-status\"\n        onChange={(event) => {\n          const status = event.currentTarget.value as CatalogFilterValues['status']\n\n          setValues((currentValues) => ({\n            ...currentValues,\n            status,\n          }))\n        }}\n        value={values.status}\n      >\n        <option value=\"all\">All</option>\n        <option value=\"active\">Active</option>\n        <option value=\"archived\">Archived</option>\n      </select>\n\n      <button type=\"submit\">Apply catalog filter</button>\n    </form>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx",
      "value": "import { useState } from 'react'\nimport type { FormEvent } from 'react'\nimport type { LoginValues } from './sellerhub-testing-types'\n\ntype SellerHubLoginFormProps = {\n  isPending?: boolean\n  onSubmit: (values: LoginValues) => void\n}\n\nexport function SellerHubLoginForm({ isPending = false, onSubmit }: SellerHubLoginFormProps) {\n  const [values, setValues] = useState<LoginValues>({\n    email: '',\n    password: '',\n  })\n  const [validationMessage, setValidationMessage] = useState<string | null>(null)\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>): void {\n    event.preventDefault()\n\n    if (!values.email.includes('@') || values.password.length < 6) {\n      setValidationMessage('Enter a valid email and password.')\n      return\n    }\n\n    setValidationMessage(null)\n    onSubmit(values)\n  }\n\n  return (\n    <form className=\"workflow-card\" onSubmit={handleSubmit}>\n      <h3>Seller login</h3>\n      <label className=\"field-label\" htmlFor=\"workflow-login-email\">\n        Email\n      </label>\n      <input\n        className=\"text-input\"\n        id=\"workflow-login-email\"\n        onChange={(event) => {\n          const email = event.currentTarget.value\n\n          setValues((currentValues) => ({\n            ...currentValues,\n            email,\n          }))\n        }}\n        type=\"email\"\n        value={values.email}\n      />\n\n      <label className=\"field-label\" htmlFor=\"workflow-login-password\">\n        Password\n      </label>\n      <input\n        className=\"text-input\"\n        id=\"workflow-login-password\"\n        onChange={(event) => {\n          const password = event.currentTarget.value\n\n          setValues((currentValues) => ({\n            ...currentValues,\n            password,\n          }))\n        }}\n        type=\"password\"\n        value={values.password}\n      />\n\n      {validationMessage ? <p role=\"alert\">{validationMessage}</p> : null}\n\n      <button disabled={isPending} type=\"submit\">\n        {isPending ? 'Signing in...' : 'Sign in'}\n      </button>\n    </form>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx",
      "value": "import { useState } from 'react'\nimport type { SellerOrder } from './sellerhub-testing-types'\n\ntype OrdersState =\n  | { status: 'idle' }\n  | { status: 'pending' }\n  | { status: 'success'; orders: SellerOrder[] }\n  | { status: 'error'; message: string }\n\nexport function SellerHubOrdersPanel() {\n  const [ordersState, setOrdersState] = useState<OrdersState>({ status: 'idle' })\n\n  async function handleLoadOrders(): Promise<void> {\n    setOrdersState({ status: 'pending' })\n\n    try {\n      const response = await fetch('/api/seller/orders')\n\n      if (!response.ok) {\n        throw new Error(`Orders request failed with status ${response.status}`)\n      }\n\n      const payload = (await response.json()) as SellerOrder[]\n      setOrdersState({ status: 'success', orders: payload })\n    } catch {\n      setOrdersState({ status: 'error', message: 'Unable to load seller orders.' })\n    }\n  }\n\n  return (\n    <section className=\"workflow-card\" aria-labelledby=\"workflow-orders-title\">\n      <h3 id=\"workflow-orders-title\">Seller orders</h3>\n      <button onClick={handleLoadOrders} type=\"button\">\n        Load seller orders\n      </button>\n\n      {ordersState.status === 'idle' ? <p>No orders loaded.</p> : null}\n      {ordersState.status === 'pending' ? <p role=\"status\">Loading seller orders...</p> : null}\n      {ordersState.status === 'error' ? <p role=\"alert\">{ordersState.message}</p> : null}\n      {ordersState.status === 'success' && ordersState.orders.length === 0 ? (\n        <p>No seller orders found.</p>\n      ) : null}\n      {ordersState.status === 'success' && ordersState.orders.length > 0 ? (\n        <ul aria-label=\"Seller order results\">\n          {ordersState.orders.map((order) => (\n            <li key={order.id}>\n              {order.customer} {order.status} ${order.total}\n            </li>\n          ))}\n        </ul>\n      ) : null}\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx",
      "value": "import { Navigate, Outlet, useLocation } from 'react-router'\nimport { useSellerAuth } from './sellerhub-auth-context'\n\nexport function SellerHubProtectedRoute() {\n  const auth = useSellerAuth()\n  const location = useLocation()\n\n  if (!auth.isAuthenticated) {\n    return <Navigate replace state={{ from: location.pathname }} to=\"/login\" />\n  }\n\n  return <Outlet />\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx",
      "value": "import { Link, Route, Routes, useLocation } from 'react-router'\nimport { SellerHubCatalogFilter } from './sellerhub-catalog-filter'\nimport { SellerHubLoginForm } from './sellerhub-login-form'\nimport { SellerHubOrdersPanel } from './sellerhub-orders-panel'\nimport { SellerHubProtectedRoute } from './sellerhub-protected-route'\nimport { useSellerAuth } from './sellerhub-auth-context'\n\nexport function SellerHubTestedWorkflowRoutes() {\n  return (\n    <Routes>\n      <Route element={<CatalogPage />} path=\"/catalog\" />\n      <Route element={<LoginPage />} path=\"/login\" />\n      <Route element={<SellerHubProtectedRoute />}>\n        <Route element={<SellerHubOrdersPanel />} path=\"/seller/orders\" />\n      </Route>\n    </Routes>\n  )\n}\n\nfunction CatalogPage() {\n  return (\n    <section className=\"workflow-card\">\n      <h3>Catalog workspace</h3>\n      <SellerHubCatalogFilter onApply={() => {}} />\n      <Link to=\"/seller/orders\">Open seller orders</Link>\n    </section>\n  )\n}\n\nfunction LoginPage() {\n  const auth = useSellerAuth()\n  const location = useLocation()\n  const from = (location.state as { from?: string } | null)?.from ?? '/seller/orders'\n\n  return (\n    <section className=\"workflow-card\">\n      <h3>Login required</h3>\n      <p>Redirect target: {from}</p>\n      <SellerHubLoginForm onSubmit={(values) => auth.signIn(values.email)} />\n    </section>\n  )\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx",
      "value": "import { Component } from 'react'\nimport type { ReactNode } from 'react'\n\ntype SellerHubErrorBoundaryProps = {\n  children: ReactNode\n}\n\ntype SellerHubErrorBoundaryState = {\n  hasError: boolean\n}\n\nexport class SellerHubErrorBoundary extends Component<\n  SellerHubErrorBoundaryProps,\n  SellerHubErrorBoundaryState\n> {\n  state: SellerHubErrorBoundaryState = { hasError: false }\n\n  static getDerivedStateFromError(): SellerHubErrorBoundaryState {\n    return { hasError: true }\n  }\n\n  componentDidCatch(): void {}\n\n  render() {\n    if (this.state.hasError) {\n      return <p role=\"alert\">SellerHub workflow failed to render.</p>\n    }\n\n    return this.props.children\n  }\n}\n\nexport function BrokenWorkflowPanel(): ReactNode {\n  throw new Error('Workflow panel render failed')\n}"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts",
      "value": "import { delay, http, HttpResponse } from 'msw'\nimport type { SellerOrder } from './sellerhub-testing-types'\n\nconst sellerOrders: SellerOrder[] = [\n  { id: 'order-3001', customer: 'Mina', status: 'open', total: 240 },\n  { id: 'order-3002', customer: 'Noah', status: 'shipped', total: 125 },\n]\n\nexport const sellerHubTestHandlers = [\n  http.get('/api/seller/orders', async () => {\n    await delay(50)\n    return HttpResponse.json(sellerOrders)\n  }),\n]"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts",
      "value": "import { setupServer } from 'msw/node'\nimport { sellerHubTestHandlers } from './sellerhub-test-handlers'\n\nexport const server = setupServer(...sellerHubTestHandlers)"
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts",
      "value": "import { describe, expect, it } from 'vitest'\nimport { parseCatalogFilterQuery, sellerCartReducer } from './sellerhub-cart-rules'\nimport type { CartState } from './sellerhub-testing-types'\n\ndescribe('sellerCartReducer', () => {\n  it('normalizes catalog filter query before a visible result test uses it', () => {\n    expect(parseCatalogFilterQuery('  Desk   Lamp  ')).toBe('desk lamp')\n  })\n\n  it('adds and updates cart lines as pure transitions', () => {\n    const initialState: CartState = { lines: [] }\n\n    const withLine = sellerCartReducer(initialState, {\n      type: 'addLine',\n      line: { id: 'lamp', name: 'Desk Lamp', quantity: 1 },\n    })\n    const withQuantity = sellerCartReducer(withLine, {\n      type: 'setQuantity',\n      lineId: 'lamp',\n      quantity: 3,\n    })\n\n    expect(initialState.lines).toHaveLength(0)\n    expect(withLine.lines).toHaveLength(1)\n    expect(withQuantity.lines[0]?.quantity).toBe(3)\n  })\n})"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { describe, expect, it, vi } from 'vitest'\nimport { SellerHubLoginForm } from './sellerhub-login-form'\n\ndescribe('SellerHubLoginForm', () => {\n  it('blocks invalid credentials with visible validation feedback', async () => {\n    const user = userEvent.setup()\n    const handleSubmit = vi.fn()\n\n    render(<SellerHubLoginForm onSubmit={handleSubmit} />)\n\n    await user.type(screen.getByLabelText('Email'), 'seller@example.com')\n    await user.type(screen.getByLabelText('Password'), '123')\n    await user.click(screen.getByRole('button', { name: 'Sign in' }))\n\n    expect(screen.getByRole('alert')).toHaveTextContent(\n      'Enter a valid email and password.',\n    )\n    expect(handleSubmit).not.toHaveBeenCalled()\n  })\n\n  it('submits valid controlled values', async () => {\n    const user = userEvent.setup()\n    const handleSubmit = vi.fn()\n\n    render(<SellerHubLoginForm onSubmit={handleSubmit} />)\n\n    await user.type(screen.getByLabelText('Email'), 'seller@example.com')\n    await user.type(screen.getByLabelText('Password'), 'secret1')\n    await user.click(screen.getByRole('button', { name: 'Sign in' }))\n\n    expect(handleSubmit).toHaveBeenCalledWith({\n      email: 'seller@example.com',\n      password: 'secret1',\n    })\n  })\n})"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { http, HttpResponse } from 'msw'\nimport { describe, expect, it } from 'vitest'\nimport { SellerHubOrdersPanel } from './sellerhub-orders-panel'\nimport { server } from './sellerhub-test-server'\n\ndescribe('SellerHubOrdersPanel', () => {\n  it('renders loading and success states through the MSW request boundary', async () => {\n    const user = userEvent.setup()\n\n    render(<SellerHubOrdersPanel />)\n\n    await user.click(screen.getByRole('button', { name: 'Load seller orders' }))\n\n    expect(screen.getByRole('status')).toHaveTextContent('Loading seller orders...')\n    expect(await screen.findByText('Mina open $240')).toBeInTheDocument()\n    expect(screen.getByText('Noah shipped $125')).toBeInTheDocument()\n  })\n\n  it('renders an error state when the mocked API returns a server error', async () => {\n    const user = userEvent.setup()\n\n    server.use(http.get('/api/seller/orders', () => HttpResponse.json(null, { status: 500 })))\n\n    render(<SellerHubOrdersPanel />)\n\n    await user.click(screen.getByRole('button', { name: 'Load seller orders' }))\n\n    expect(await screen.findByRole('alert')).toHaveTextContent(\n      'Unable to load seller orders.',\n    )\n  })\n})"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { MemoryRouter } from 'react-router'\nimport { describe, expect, it } from 'vitest'\nimport { SellerAuthProvider } from './sellerhub-auth-provider'\nimport { SellerHubTestedWorkflowRoutes } from './sellerhub-workflow-routes'\n\ndescribe('SellerHubTestedWorkflowRoutes', () => {\n  it('redirects an unauthenticated seller route to login UI', async () => {\n    render(\n      <SellerAuthProvider>\n        <MemoryRouter initialEntries={['/seller/orders']}>\n          <SellerHubTestedWorkflowRoutes />\n        </MemoryRouter>\n      </SellerAuthProvider>,\n    )\n\n    expect(await screen.findByRole('heading', { name: 'Login required' })).toBeInTheDocument()\n    expect(screen.getByText('Redirect target: /seller/orders')).toBeInTheDocument()\n  })\n\n  it('renders the protected orders route when the provider supplies auth state', () => {\n    render(\n      <SellerAuthProvider initialSellerName=\"Mina\">\n        <MemoryRouter initialEntries={['/seller/orders']}>\n          <SellerHubTestedWorkflowRoutes />\n        </MemoryRouter>\n      </SellerAuthProvider>,\n    )\n\n    expect(screen.getByRole('heading', { name: 'Seller orders' })).toBeInTheDocument()\n  })\n})"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { describe, expect, it } from 'vitest'\nimport { SellerAuthProvider } from './sellerhub-auth-provider'\nimport { useSellerAuth } from './sellerhub-auth-context'\n\ndescribe('useSellerAuth', () => {\n  it('is tested through a real component wrapper and provider boundary', () => {\n    render(\n      <SellerAuthProvider initialSellerName=\"Mina\">\n        <AuthProbe />\n      </SellerAuthProvider>,\n    )\n\n    expect(screen.getByText('Signed in as Mina')).toBeInTheDocument()\n  })\n})\n\nfunction AuthProbe() {\n  const auth = useSellerAuth()\n\n  return <p>{auth.sellerName ? `Signed in as ${auth.sellerName}` : 'Signed out'}</p>\n}"
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport { afterEach, describe, expect, it, vi } from 'vitest'\nimport { BrokenWorkflowPanel, SellerHubErrorBoundary } from './sellerhub-error-boundary'\n\ndescribe('SellerHubErrorBoundary', () => {\n  afterEach(() => {\n    vi.restoreAllMocks()\n  })\n\n  it('renders fallback UI for render errors in a workflow section', () => {\n    vi.spyOn(console, 'error').mockImplementation(() => {})\n\n    render(\n      <SellerHubErrorBoundary>\n        <BrokenWorkflowPanel />\n      </SellerHubErrorBoundary>,\n    )\n\n    expect(screen.getByRole('alert')).toHaveTextContent(\n      'SellerHub workflow failed to render.',\n    )\n  })\n})"
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
          "value": "Vitest execute "
        },
        {
          "type": "inlineCode",
          "value": "src/test/setup.ts"
        },
        {
          "type": "text",
          "value": ", MSW server starts monitoring. Unit tests directly call reducer/parser; form tests render to jsdom and input with userEvent; orders tests return mock response from MSW after clicking the button; router tests use MemoryRouter to provide initial route; context hook tests use provider wrapper render probe component; error boundary tests trigger render throw and assert fallback alert."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime executes reducer, parser, Promise, mock handler and assertion; React is responsible for render/commit, provider stack, route branch and error boundary state; Testing Library is responsible for DOM query; Vitest is responsible for runner lifecycle; jsdom simulates DOM but is not a complete browser; MSW Intercept request boundary; TypeScript checks domain types but does not runtime verify external JSON; ESLint/typecheck/test/build is an independent tool chain access control."
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
      "type": "code",
      "language": "bash",
      "label": "Terminal",
      "value": "npm run lint\nnpm run typecheck\nnpm run test\nnpm run build"
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
            "value": "Scenario"
          }
        ],
        [
          {
            "type": "text",
            "value": "Preferred Test"
          }
        ],
        [
          {
            "type": "text",
            "value": "Primary Evidence"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Parser / reducer"
            }
          ],
          [
            {
              "type": "text",
              "value": "Unit test"
            }
          ],
          [
            {
              "type": "text",
              "value": "return value and immutable reference"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Visible component"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component test"
            }
          ],
          [
            {
              "type": "text",
              "value": "role/text/label query"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Form"
            }
          ],
          [
            {
              "type": "text",
              "value": "Behavior test"
            }
          ],
          [
            {
              "type": "text",
              "value": "userEvent input and submit payload"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Async UI"
            }
          ],
          [
            {
              "type": "text",
              "value": "Component/integration test"
            }
          ],
          [
            {
              "type": "text",
              "value": "findBy and status/alert/list"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Router"
            }
          ],
          [
            {
              "type": "text",
              "value": "Integration test"
            }
          ],
          [
            {
              "type": "text",
              "value": "MemoryRouter initial route"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Context hook"
            }
          ],
          [
            {
              "type": "text",
              "value": "Wrapper test"
            }
          ],
          [
            {
              "type": "text",
              "value": "provider value and visible consumer"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Network"
            }
          ],
          [
            {
              "type": "text",
              "value": "MSW test"
            }
          ],
          [
            {
              "type": "text",
              "value": "request handler and UI branch"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Render crash"
            }
          ],
          [
            {
              "type": "text",
              "value": "Error boundary test"
            }
          ],
          [
            {
              "type": "text",
              "value": "fallback alert"
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
          "value": "Minimum behavioral test template:"
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "Template: behavior test pattern",
      "value": "import { screen } from '@testing-library/dom'\nimport { render } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\nimport { expect, it } from 'vitest'\n\nit('submits visible form values', async () => {\n  const user = userEvent.setup()\n  render(<FormUnderTest />)\n\n  await user.type(screen.getByLabelText('Email'), 'seller@example.com')\n  await user.click(screen.getByRole('button', { name: 'Submit' }))\n\n  expect(await screen.findByText('Saved')).toBeInTheDocument()\n})"
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
      "body": []
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "docs/react/chapter-12-testing-quality/react-chapter-12-learning-guide.md"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "vitest.config.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/test/setup.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/chapter-12-practice-root.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/chapter-12-practice.css"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.test.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.msw.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.test.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "| "
        },
        {
          "type": "inlineCode",
          "value": "src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx"
        },
        {
          "type": "text",
          "value": " | The real document of this chapter. | Created and reserved |"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "does not need to create these concepts snippet: "
        },
        {
          "type": "inlineCode",
          "value": "Template: behavior test pattern"
        },
        {
          "type": "text",
          "value": " is only used for quick checking and does not enter the real file list."
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
          "value": "divides the notes into four pages: test level and owner judgment; RTL query and userEvent; async/router/context/MSW/error boundary; lint/typecheck/test/build quality gates. Each page records an example of how the failure signal is located to the owner."
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
          "value": "Why does reducer unit test not need render? Why doesn't component test check internal state? What is the timing difference for getBy/queryBy/findBy? Why does userEvent need to await? Why doesn't async UI use sleep? Why does router/context need a wrapper? What is the difference between MSW and mock internal helper? What errors cannot be caught by Error Boundary? Why are TypeScript, test and build not substitutes for each other?"
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
          "value": "Find the behavior owner first, and then select the minimum test layer. JavaScript pure rule uses unit test; React visible output uses RTL query; real interaction uses userEvent; asynchronous DOM uses findBy/waitFor; network uses MSW; router/context uses wrapper; render crash uses error boundary; quality gate uses lint, typecheck, test, build All run."
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
                  "value": "React "
                },
                {
                  "type": "inlineCode",
                  "value": "act"
                },
                {
                  "type": "text",
                  "value": " API: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/act",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://react.dev/reference/react/act"
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
                  "value": "React Responding to Events: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/learn/responding-to-events",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://react.dev/learn/responding-to-events"
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
                  "value": "React Error Boundary reference: "
                },
                {
                  "type": "link",
                  "href": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
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
                  "value": "React Testing Library Intro: "
                },
                {
                  "type": "link",
                  "href": "https://testing-library.com/docs/react-testing-library/intro/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://testing-library.com/docs/react-testing-library/intro/"
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
                  "value": "Testing Library Queries: "
                },
                {
                  "type": "link",
                  "href": "https://testing-library.com/docs/queries/about/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://testing-library.com/docs/queries/about/"
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
                  "value": "Testing Library Async Methods: "
                },
                {
                  "type": "link",
                  "href": "https://testing-library.com/docs/dom-testing-library/api-async/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://testing-library.com/docs/dom-testing-library/api-async/"
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
                  "value": "user-event Intro: "
                },
                {
                  "type": "link",
                  "href": "https://testing-library.com/docs/user-event/intro/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://testing-library.com/docs/user-event/intro/"
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
                  "value": "jest-dom: "
                },
                {
                  "type": "link",
                  "href": "https://testing-library.com/docs/ecosystem-jest-dom/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://testing-library.com/docs/ecosystem-jest-dom/"
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
                  "value": "Vitest Guide / Config / Environment: "
                },
                {
                  "type": "link",
                  "href": "https://vitest.dev/guide/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://vitest.dev/guide/"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://vitest.dev/config/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://vitest.dev/config/"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://vitest.dev/guide/environment.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://vitest.dev/guide/environment.html"
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
                  "value": "MSW docs / Node integration: "
                },
                {
                  "type": "link",
                  "href": "https://mswjs.io/docs/",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://mswjs.io/docs/"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://mswjs.io/docs/integrations/node",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://mswjs.io/docs/integrations/node"
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
                  "value": "React Router testing: "
                },
                {
                  "type": "link",
                  "href": "https://reactrouter.com/start/data/testing",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://reactrouter.com/start/data/testing"
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
                  "value": "TypeScript Narrowing / TSConfig types: "
                },
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "link",
                  "href": "https://www.typescriptlang.org/tsconfig/#types",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://www.typescriptlang.org/tsconfig/#types"
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
                  "value": "MDN ARIA techniques: "
                },
                {
                  "type": "link",
                  "href": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques",
                  "children": [
                    {
                      "type": "text",
                      "value": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "has read "
        },
        {
          "type": "inlineCode",
          "value": "references/books/react/README.md"
        },
        {
          "type": "text",
          "value": " and confirm that the local PDF exists: "
        },
        {
          "type": "inlineCode",
          "value": "references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "references/books/react/full-stack-react-projects.pdf"
        },
        {
          "type": "text",
          "value": ". The current tool of this machine failed to successfully extract PDF text: "
        },
        {
          "type": "inlineCode",
          "value": "pdfjs-dist"
        },
        {
          "type": "text",
          "value": " is missing "
        },
        {
          "type": "inlineCode",
          "value": "DOMMatrix"
        },
        {
          "type": "text",
          "value": " binding, Poppler wrapper cannot locate the executable file. Therefore, this chapter does not use the PDF text as the main basis; the contents of React, Testing Library, Vitest, MSW, React Router, TypeScript and MDN are subject to official documents and local verified source code."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter12Content() {
  return <DocumentRenderer document={chapterDocument} />
}
