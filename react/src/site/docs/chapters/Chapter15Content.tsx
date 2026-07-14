import { DocumentRenderer } from '../DocumentRenderer'
import type { ChapterDocument } from '../content-types'

const chapterDocument = {
  "id": "react-15",
  "slug": "chapter-15-production-frontend-architecture",
  "title": "React Chapter 15: Production Frontend Architecture and Engineering Governance",
  "sourcePath": "docs/react/chapter-15-production-frontend-architecture/react-chapter-15-learning-guide.md",
  "blocks": [
    {
      "type": "heading",
      "depth": 1,
      "id": "react-chapter-15-production-frontend-architecture-and-engineering-governance",
      "children": [
        {
          "type": "text",
          "value": "React Chapter 15: Production Frontend Architecture and Engineering Governance"
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
            "value": "corresponding file"
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
              "value": "Establish a production architecture boundary diagram"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/01-production-architecture-map/production-architecture-map.tsx"
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
              "type": "text",
              "value": "Establish token and primitive boundary"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/02-design-tokens-primitive-ui/design-token-primitive-boundary.tsx"
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
              "type": "text",
              "value": "implement compound tabs accessibility contract"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/03-compound-accessibility-contract/accessible-compound-tabs.tsx"
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
              "value": "definition feature public API"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/catalog-feature-public-api.ts"
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
              "type": "text",
              "value": "via public API render feature panel"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/feature-public-api-boundary.tsx"
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
              "type": "text",
              "value": "Audit shared / feature dependency direction"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/05-shared-feature-boundary/dependency-direction-audit.tsx"
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
              "type": "text",
              "value": "trace DTO to view model"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/06-api-contract-adapter/api-contract-adapter-panel.tsx"
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
              "type": "text",
              "value": "Normalization generated client error"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/07-error-normalization-client-boundary/error-normalization-panel.tsx"
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
              "value": "combines flag, RBAC UI and release metadata"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/08-feature-flags-rbac-release/feature-flag-permission-panel.tsx"
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
              "value": "separates message from locale formatter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/09-i18n-locale-formatting/locale-formatting-panel.tsx"
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
              "value": "establish frontend error event"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/10-observability-error-reporting/observability-event-panel.tsx"
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
              "value": "Evaluation route performance budget"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/11-performance-budget-web-vitals/performance-budget-panel.tsx"
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
              "value": "Check browser security boundaries"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/12-security-boundary-checks/security-boundary-panel.tsx"
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
              "value": "Organizations can rollback migration phases"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/13-migration-strategy/migration-strategy-panel.tsx"
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
              "value": "Establish ADR, review and release gates"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/14-adr-review-governance/governance-evidence-panel.tsx"
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
              "value": "9.14"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mapping SellerHub schema evidence"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/15-sellerhub-production-map/sellerhub-production-map.tsx"
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
              "value": "9.15"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "definition design tokens"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/tokens.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "definition primitive button"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/primitive-button.tsx"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "define compound tabs"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/compound-tabs.tsx"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "publish catalog public API"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/catalog/catalog-public-api.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "publish orders public API"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/orders/orders-public-api.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Declare and verify API DTO"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-contract.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Execute DTO/domain/view model adaptation"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-adapter.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "define feature flag lifecycle and permission decision"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/flags/feature-flags.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "definition message catalog"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/messages.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "definition locale formatters"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/formatters.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Create mock error reporter"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/observability/error-reporter.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "define performance budget"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/performance/performance-budget.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "define security helpers"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/security/security-boundaries.ts"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Record architecture decision"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/architecture-decision-record.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project engineering document"
            }
          ],
          [
            {
              "type": "text",
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Record code review gate"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/code-review-checklist.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project engineering document"
            }
          ],
          [
            {
              "type": "text",
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "record migration and rollback"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/migration-plan.md"
            }
          ],
          [
            {
              "type": "text",
              "value": "final mini project engineering document"
            }
          ],
          [
            {
              "type": "text",
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "combination architecture dashboard"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-dashboard.tsx"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Export final project entrance"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-architecture-kit.tsx"
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
              "value": "12.5"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "mounts all core exercises and final project"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/chapter-15-practice-root.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Adapter / shell"
            }
          ],
          [
            {
              "type": "text",
              "value": "7, 8, 14"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "provides chapter general style"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "src/learning/react/chapter-15-production-frontend-architecture/chapter-15-practice.css"
            }
          ],
          [
            {
              "type": "text",
              "value": "Adapter / shell CSS"
            }
          ],
          [
            {
              "type": "text",
              "value": "7, 14"
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
          "value": "D:\\vite_ts"
        },
        {
          "type": "text",
          "value": " React Mainline Chapter 15 is also the closing chapter of the production structure of Phase 12. It inherits the performance evidence of chapter 11, the quality gate of chapter 12, the server/client boundary of chapter 13, and the React 19 migration of chapter 14 gate, upgrade \"can realize functions\" to \"can define boundaries, prove quality, and control changes\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This chapter does not create the monorepo, backend, or Next.js root project, and does not install Storybook, OpenAPI generator, Sentry, i18n library, feature flag SaaS, or UI library. All production tools only interpret their location; currently the Vite app emulates the mechanism using TypeScript models, React panels, pure functions, and Markdown governance artifacts."
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
          "value": "A functioning React page may still have deep imports, shared business pollution, DTO leaks, flag permanence, permission misjudgments, unlocatable errors, performance degradation without sustained budget, and migrations that cannot be rolled back. This chapter does not solve \"how to name directories\", but:"
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
                  "value": "Who owns a decision and who can rely on whom."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "When does external data change from untrusted DTO to internal model."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "component API, design tokens, accessibility semantics how to form a stable contract."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "How release, security, performance, observability and migration leave auditable evidence."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "How to write SellerHub's engineering capabilities as verifiable project outputs instead of just listing technology stacks."
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
                  "value": "Understand props, state, event, render snapshot and component composition."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "It has been understood that Effects only synchronizes external systems, and ordinary calculations should not be stuffed into Effects."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "understands reducer, Context, custom hook and state owner."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "understands async lifecycle, runtime validation, routing, memoization and code splitting."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "has used four types of quality gates: lint, typecheck, test, and build."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "understands Server / Client, hydration, Actions and migration boundary."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "has understood the "
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
                  "value": ", and can distinguish TypeScript type and runtime value."
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
                  "value": "uses owner, input, output, dependency direction and gate to describe the production architecture."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "designs token, primitive, compound component and accessibility contract."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "prevents deep import through feature public API and identifies shared-to-feature cycle."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Convert unknown response into validated DTO, domain model and view model."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "unifies the object shape of error, flag, permission, locale, metric and security finding."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "explains which static errors TypeScript can prevent, and which runtime/security checks it cannot replace."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Write ADR containing context, decision, alternatives, and consequences."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "has migrations of inventory, compatibility layer, quality gate and rollback."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses a runnable dashboard to display the architectural evidence of SellerHub."
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
          "value": "first learns dependency and component contract (9.1–9.5), then learns network / release / locale data boundaries (9.6–9.9), and then establishes production feedback loops (9.10–9.12), and finally learn change governance with SellerHub evidence mapping (9.13–9.15). This sequence goes from \"how the current code is organized\" to \"how future changes are constrained\" to avoid memorizing tool names and then guessing boundaries."
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
            "value": "Term"
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
            "value": "The meaning of this chapter"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Production architecture"
            }
          ],
          [
            {
              "type": "text",
              "value": "architecture governance"
            }
          ],
          [
            {
              "type": "text",
              "value": "owner, dependency, contract, gate and change process combination"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Design token"
            }
          ],
          [
            {
              "type": "text",
              "value": "design system"
            }
          ],
          [
            {
              "type": "text",
              "value": "is a naming design decision for cross-component reuse, not an arbitrary CSS constant"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Primitive component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React / design system"
            }
          ],
          [
            {
              "type": "text",
              "value": "A low-level component"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Compound component"
            }
          ],
          [
            {
              "type": "text",
              "value": "React component API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Multiple collaborating subcomponents share a behavior and semantics owner"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Public API"
            }
          ],
          [
            {
              "type": "text",
              "value": "ES module graph"
            }
          ],
          [
            {
              "type": "text",
              "value": "feature Externally supported export set"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DTO"
            }
          ],
          [
            {
              "type": "text",
              "value": "API contract"
            }
          ],
          [
            {
              "type": "text",
              "value": "Data transmission at network boundaries shape"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Domain model"
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
              "value": "Internal object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "View model"
            }
          ],
          [
            {
              "type": "text",
              "value": "React boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "directly serves the display object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Runtime validation"
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
              "value": "Perform truth check on unknown external value"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Feature flag"
            }
          ],
          [
            {
              "type": "text",
              "value": "release governance"
            }
          ],
          [
            {
              "type": "text",
              "value": "release decision with owner, targeting, cleanup, not just boolean"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "RBAC UI guard"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "controls visibility and does not replace server authorization"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Message catalog"
            }
          ],
          [
            {
              "type": "text",
              "value": "i18n"
            }
          ],
          [
            {
              "type": "text",
              "value": "message key to locale text mapping"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Error event"
            }
          ],
          [
            {
              "type": "text",
              "value": "observability"
            }
          ],
          [
            {
              "type": "text",
              "value": "Structured object with release, route, feature and privacy constraints"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Performance budget"
            }
          ],
          [
            {
              "type": "text",
              "value": "delivery gate"
            }
          ],
          [
            {
              "type": "text",
              "value": "route-level cost persistence threshold"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ADR"
            }
          ],
          [
            {
              "type": "text",
              "value": "documentation governance"
            }
          ],
          [
            {
              "type": "text",
              "value": "Record context, decisions, alternatives and consequences"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Strangler migration"
            }
          ],
          [
            {
              "type": "text",
              "value": "migration"
            }
          ],
          [
            {
              "type": "text",
              "value": "gradually replaces the old implementation"
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
          "value": "The production-level front end can be regarded as five chains running simultaneously:"
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
                  "type": "strong",
                  "children": [
                    {
                      "type": "text",
                      "value": "Module chain"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": app combines features; features depend on shared; shared does not reversely recognize features."
                }
              ]
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
                      "value": "Data chain"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": unknown network value → runtime validation → DTO → adapter → domain model → view model → React JSX."
                }
              ]
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
                      "value": "UI chain"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": token → primitive → compound component → feature component → page / route."
                }
              ]
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
                      "value": "Feedback chain"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": runtime event → normalized error / metric → release context → dashboard / alert → engineering decision."
                }
              ]
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
                      "value": "Change chain"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": requirement → ADR → implementation → review gate → release flag → measurement → cleanup or rollback."
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
          "value": "React is responsible for calculating and submitting UI according to props/state; JavaScript runtime creates objects, calls adapters and evaluators; browser provides DOM, URL, Intl, Performance and other platform behaviors; TypeScript checks shape before building It has a calling relationship but will erase the type; Vite creates module graph and bundle; lint, test, build and review together constitute the project access control. No layer alone can guarantee production quality."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The following are the current real project boundaries that this chapter relies on. "
        },
        {
          "type": "inlineCode",
          "value": "src/App.tsx"
        },
        {
          "type": "text",
          "value": " is only responsible for lazy mount and does not carry the mechanism of this chapter."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Current project structure",
      "value": "D:/vite_ts/\n  AGENTS.MD\n  README.md\n  package.json\n  tsconfig.app.json\n  eslint.config.js\n  vite.config.ts\n  src/\n    App.tsx\n    learning/\n      react/\n  docs/\n    react/"
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
      "value": "docs/\n  react/\n    chapter-15-production-frontend-architecture/\n      react-chapter-15-learning-guide.md"
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
          "value": "Each core theme has an independent directory. The file name expresses the learning goal; adapters and CSS are at the chapter root and do not pretend to be core mechanisms."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Real practice structure",
      "value": "src/learning/react/chapter-15-production-frontend-architecture/\n  01-production-architecture-map/\n    production-architecture-map.tsx\n  02-design-tokens-primitive-ui/\n    design-token-primitive-boundary.tsx\n  03-compound-accessibility-contract/\n    accessible-compound-tabs.tsx\n  04-feature-module-public-api/\n    catalog-feature-public-api.ts\n    feature-public-api-boundary.tsx\n  05-shared-feature-boundary/\n    dependency-direction-audit.tsx\n  06-api-contract-adapter/\n    api-contract-adapter-panel.tsx\n  07-error-normalization-client-boundary/\n    error-normalization-panel.tsx\n  08-feature-flags-rbac-release/\n    feature-flag-permission-panel.tsx\n  09-i18n-locale-formatting/\n    locale-formatting-panel.tsx\n  10-observability-error-reporting/\n    observability-event-panel.tsx\n  11-performance-budget-web-vitals/\n    performance-budget-panel.tsx\n  12-security-boundary-checks/\n    security-boundary-panel.tsx\n  13-migration-strategy/\n    migration-strategy-panel.tsx\n  14-adr-review-governance/\n    governance-evidence-panel.tsx\n  15-sellerhub-production-map/\n    sellerhub-production-map.tsx\n  chapter-15-practice-root.tsx\n  chapter-15-practice.css"
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
          "value": "The following names are only used for error comparison. They do not mean that files need to be created, and they will not be included in the final file list."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "Concept example structure",
      "value": "Conceptual snippets:\n  Snippet: deep feature import\n  Snippet: DTO rendered directly\n  Snippet: UI permission mistaken for authorization\n  Snippet: sensitive error report"
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
      "value": "src/learning/react/chapter-15-production-frontend-architecture/\n  sellerhub-production-architecture-kit/\n    design-system/\n      tokens.ts\n      primitive-button.tsx\n      compound-tabs.tsx\n    features/\n      catalog/\n        catalog-public-api.ts\n      orders/\n        orders-public-api.ts\n    shared/\n      api/\n        sellerhub-api-contract.ts\n        sellerhub-api-adapter.ts\n      flags/\n        feature-flags.ts\n      i18n/\n        messages.ts\n        formatters.ts\n      observability/\n        error-reporter.ts\n      performance/\n        performance-budget.ts\n      security/\n        security-boundaries.ts\n    governance/\n      architecture-decision-record.md\n      code-review-checklist.md\n      migration-plan.md\n    sellerhub-production-dashboard.tsx\n    sellerhub-production-architecture-kit.tsx"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This structure does not create a package workspace. "
        },
        {
          "type": "inlineCode",
          "value": "design-system"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "features"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "shared"
        },
        {
          "type": "text",
          "value": " is the current learning boundary within the Vite app; a real monorepo is only worth introducing after the costs of multiple apps, independent publishing, and independent ownership are established."
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
          "type": "text",
          "value": "Open the local address output by Vite, and then access "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-15"
        },
        {
          "type": "text",
          "value": ". Quality gate use:"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "dev"
        },
        {
          "type": "text",
          "value": " proves that the page is interactive, "
        },
        {
          "type": "inlineCode",
          "value": "lint"
        },
        {
          "type": "text",
          "value": " Check static rules, "
        },
        {
          "type": "inlineCode",
          "value": "typecheck"
        },
        {
          "type": "text",
          "value": " check TypeScript program, "
        },
        {
          "type": "inlineCode",
          "value": "test"
        },
        {
          "type": "text",
          "value": " verification behavior, "
        },
        {
          "type": "inlineCode",
          "value": "build"
        },
        {
          "type": "text",
          "value": " verify production bundle. The four are not the same gate."
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
      "id": "91-from-a-component-project-to-a-production-system",
      "children": [
        {
          "type": "text",
          "value": "9.1 From a Component Project to a Production System"
        }
      ]
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
          "value": "Production architecture is not the number of directories, but each important boundary has a clear owner, accepted input, published output, dependency rule and evidence gate."
        }
      ]
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
          "value": "When catalog, orders, design system, API and release change at the same time, it is impossible to answer \"who is responsible, who can rely on whom, and what evidence is used to release the change\" by thinking only in terms of the component tree. This section models these problems as "
        },
        {
          "type": "inlineCode",
          "value": "ArchitectureBoundary"
        },
        {
          "type": "text",
          "value": " objects."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance and new concepts:"
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
          "value": "owner"
        },
        {
          "type": "text",
          "value": " Make responsibility traceable; "
        },
        {
          "type": "inlineCode",
          "value": "input"
        },
        {
          "type": "text",
          "value": " / "
        },
        {
          "type": "inlineCode",
          "value": "output"
        },
        {
          "type": "text",
          "value": " makes the contract describeable; "
        },
        {
          "type": "inlineCode",
          "value": "gate"
        },
        {
          "type": "text",
          "value": " turns \"should pay attention\" into executable checks. React components are just consumers and visualization layers of these contracts, not the architecture itself."
        }
      ]
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
          "value": "JavaScript runtime creates "
        },
        {
          "type": "inlineCode",
          "value": "architectureBoundaries"
        },
        {
          "type": "text",
          "value": " array and by "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " generates React elements; React uses "
        },
        {
          "type": "inlineCode",
          "value": "boundary.name"
        },
        {
          "type": "text",
          "value": " serves as the sibling key and submits the list; TypeScript checks that each object contains five string fields; Vite tracks module import graph; CI/review gate is responsible for TypeScript's unproven ownership, security and release evidence. There is no new React runtime API in this section, the focus is on project boundaries, file organization, and maintainability mechanisms."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Engineering rules and fixed structures:"
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
          "value": "ArchitectureBoundary"
        },
        {
          "type": "text",
          "value": " fixed field is "
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
          "value": "owner"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "input"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "output"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "gate"
        },
        {
          "type": "text",
          "value": ". This is not an industry-mandated standard, but an auditable schema for this exercise; extensible by real teams "
        },
        {
          "type": "inlineCode",
          "value": "risk"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "maintainers"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "runbook"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "serviceLevelObjective"
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
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/01-production-architecture-map/production-architecture-map.tsx",
      "value": "type ArchitectureBoundary = {\n  name: string\n  owner: string\n  input: string\n  output: string\n  gate: string\n}\n\nconst architectureBoundaries: ArchitectureBoundary[] = [\n  {\n    name: 'Design system',\n    owner: 'UI platform',\n    input: 'tokens and accessibility contracts',\n    output: 'primitive and compound components',\n    gate: 'component API review',\n  },\n  {\n    name: 'Feature module',\n    owner: 'product squad',\n    input: 'domain models and user intent',\n    output: 'public feature API',\n    gate: 'dependency direction check',\n  },\n  {\n    name: 'API contract',\n    owner: 'frontend and backend',\n    input: 'unknown network response',\n    output: 'validated domain model',\n    gate: 'runtime validation and contract test',\n  },\n  {\n    name: 'Release',\n    owner: 'delivery team',\n    input: 'build artifact and evidence',\n    output: 'approved deployment candidate',\n    gate: 'lint, typecheck, test, build, and review',\n  },\n]\n\nexport function ProductionArchitectureMap() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.1 Production architecture</p>\n      <h2>Boundaries turn components into an engineering system</h2>\n      <p>\n        Each boundary names an owner, accepted input, published output, and evidence gate.\n      </p>\n      <div className=\"chapter15-grid\">\n        {architectureBoundaries.map((boundary) => (\n          <article className=\"chapter15-card\" key={boundary.name}>\n            <h3>{boundary.name}</h3>\n            <dl className=\"chapter15-definition-list\">\n              <div>\n                <dt>Owner</dt>\n                <dd>{boundary.owner}</dd>\n              </div>\n              <div>\n                <dt>Input</dt>\n                <dd>{boundary.input}</dd>\n              </div>\n              <div>\n                <dt>Output</dt>\n                <dd>{boundary.output}</dd>\n              </div>\n              <div>\n                <dt>Gate</dt>\n                <dd>{boundary.gate}</dd>\n              </div>\n            </dl>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "type first defines boundary object shape; array defines four owners; "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " creates a "
        },
        {
          "type": "inlineCode",
          "value": "<article>"
        },
        {
          "type": "text",
          "value": " description list; React uses stable "
        },
        {
          "type": "inlineCode",
          "value": "name"
        },
        {
          "type": "text",
          "value": " matches element identity; after commit, the browser creates the corresponding DOM. The page does not execute the gate, it only visualizes the gate model, so \"show quality gate\" cannot be disguised as \"quality gate has been executed\"."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain and variable changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is Vite loading the chapter module and calling "
        },
        {
          "type": "inlineCode",
          "value": "ProductionArchitectureMap"
        },
        {
          "type": "text",
          "value": ". JavaScript reads the same module-scope array reference. Each render only creates new React element objects and does not modify boundary objects; React consumes these objects in the current render snapshot; TypeScript only checks object fields for use with JSX and does not verify "
        },
        {
          "type": "inlineCode",
          "value": "owner"
        },
        {
          "type": "text",
          "value": " actually exists; the actual CI command and peer review are used to verify the gate. If architecture is equated to a directory, owner/output/gate will be missing. The signal in a real project is \"there are many files, but the person responsible for API change cannot be found, and there are no blocking conditions for release.\""
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why did you get this result and comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "UI displays four cards because the array has four elements and each element generates a sibling. For comparison, only draw "
        },
        {
          "type": "inlineCode",
          "value": "components/"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "hooks/"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "utils/"
        },
        {
          "type": "text",
          "value": ", which cannot express product ownership and allowed dependency. The directory is the storage location, and the boundary is the change contract."
        }
      ]
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
          "value": "Only writing \"adopting feature-based architecture\" violates the verifiability rules because no export, dependency direction, or gate is exposed. The identification method is to ask: who discovered a breaking API change, which import was prohibited, which command or reviewer can prevent release? If you can't answer it, it will still be an architectural slogan."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub's catalog, orders, checkout, shared UI, API contract and release each require an owner. This section puts the component, data, route, test and migration capabilities of the previous chapter into the same governance map."
        }
      ]
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
          "value": "Production architecture = boundary ownership + dependency direction + published contract + executable evidence gate."
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
      "id": "92-design-tokens-and-primitive-ui-components",
      "children": [
        {
          "type": "text",
          "value": "9.2 Design Tokens and Primitive UI Components"
        }
      ]
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
          "value": "Design token saves naming design decisions; primitive component combines token, basic interaction and coverage into a stable component API. Design System also requires composition rules, accessibility contract, documentation and versioning, so it is not equivalent to \"public component directory\"."
        }
      ]
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
          "value": "If each business button chooses its own color, rounded corners, and padding, visual changes will be scattered in the feature; if the primitive directly requests the catalog API, it will be polluted by the business. This section separates design decisions from caller intent."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance and new concepts:"
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
          "value": "as const"
        },
        {
          "type": "text",
          "value": " reserved token literal types; "
        },
        {
          "type": "inlineCode",
          "value": "ButtonHTMLAttributes<HTMLButtonElement>"
        },
        {
          "type": "text",
          "value": " retains native button props; "
        },
        {
          "type": "inlineCode",
          "value": "emphasis"
        },
        {
          "type": "text",
          "value": " is a design-system intent, not a catalog-specific action. There is no new React runtime API in this section, the focus is on props contract and token ownership."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundaries and Engineering Rules:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "JavaScript runtime creates a frozen-by-convention token object, but "
        },
        {
          "type": "inlineCode",
          "value": "as const"
        },
        {
          "type": "text",
          "value": " read-only is TypeScript constraint, "
        },
        {
          "type": "inlineCode",
          "value": "Object.freeze()"
        },
        {
          "type": "text",
          "value": "; React will merged "
        },
        {
          "type": "inlineCode",
          "value": "style"
        },
        {
          "type": "text",
          "value": " object transfers React DOM; browser applies CSS properties and executes button semantics; TypeScript merges native props and custom props. primitive can accept "
        },
        {
          "type": "inlineCode",
          "value": "onClick"
        },
        {
          "type": "text",
          "value": ", but should not know the checkout request, permission, or route."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/02-design-tokens-primitive-ui/design-token-primitive-boundary.tsx",
      "value": "import type { ButtonHTMLAttributes, CSSProperties } from 'react'\n\nconst designTokens = {\n  color: {\n    action: '#0f766e',\n    actionHover: '#115e59',\n    surface: '#ffffff',\n    text: '#16302f',\n  },\n  radius: {\n    control: 6,\n  },\n  space: {\n    controlInline: 14,\n    controlBlock: 9,\n  },\n} as const\n\ntype PrimitiveActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  emphasis?: 'primary' | 'quiet'\n}\n\nfunction PrimitiveAction({\n  emphasis = 'primary',\n  style,\n  type = 'button',\n  ...buttonProps\n}: PrimitiveActionProps) {\n  const tokenStyle: CSSProperties = {\n    padding: `${designTokens.space.controlBlock}px ${designTokens.space.controlInline}px`,\n    border: `1px solid ${designTokens.color.action}`,\n    borderRadius: designTokens.radius.control,\n    color: emphasis === 'primary' ? designTokens.color.surface : designTokens.color.action,\n    backgroundColor:\n      emphasis === 'primary' ? designTokens.color.action : designTokens.color.surface,\n    font: 'inherit',\n    fontWeight: 700,\n  }\n\n  return <button {...buttonProps} style={{ ...tokenStyle, ...style }} type={type} />\n}\n\nexport function DesignTokenPrimitiveBoundary() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.2 Design tokens and primitive UI</p>\n      <h2>Tokens carry decisions; primitives carry interaction contracts</h2>\n      <p>\n        The caller chooses intent and behavior while the primitive owns control-level\n        styling defaults.\n      </p>\n      <div className=\"chapter15-actions\">\n        <PrimitiveAction>Publish catalog</PrimitiveAction>\n        <PrimitiveAction emphasis=\"quiet\">Save draft</PrimitiveAction>\n      </div>\n      <p className=\"chapter15-note\">\n        Token value: {designTokens.color.action}; hover reference:{' '}\n        {designTokens.color.actionHover}\n      </p>\n    </section>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "import type"
        },
        {
          "type": "text",
          "value": " does not generate runtime import binding; token object saves primitive values; intersection type combines native button contract with "
        },
        {
          "type": "inlineCode",
          "value": "emphasis"
        },
        {
          "type": "text",
          "value": " merge; destructuring provides default; "
        },
        {
          "type": "inlineCode",
          "value": "tokenStyle"
        },
        {
          "type": "text",
          "value": " is derived from tokens; finally spread native props, and then use merged style to submit the DOM. caller's "
        },
        {
          "type": "inlineCode",
          "value": "style"
        },
        {
          "type": "text",
          "value": " is behind and therefore overrides the token defaults, which is an explicit selection for the current contract."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain and variable changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "trigger action is render twice "
        },
        {
          "type": "inlineCode",
          "value": "PrimitiveAction"
        },
        {
          "type": "text",
          "value": ". JavaScript creates different props object and "
        },
        {
          "type": "inlineCode",
          "value": "tokenStyle"
        },
        {
          "type": "text",
          "value": " object; both read the same "
        },
        {
          "type": "inlineCode",
          "value": "designTokens"
        },
        {
          "type": "text",
          "value": " reference; React converts props into two button elements; TypeScript prevents invalid "
        },
        {
          "type": "inlineCode",
          "value": "emphasis"
        },
        {
          "type": "text",
          "value": " literal and check DOM event props, but runtime does not preserve union type. If the caller passes in the business request to the primitive, the signal that the rule is broken is the design-system module start import "
        },
        {
          "type": "inlineCode",
          "value": "features/catalog"
        },
        {
          "type": "text",
          "value": " or API client."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Why we got this result and comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The first button uses the default "
        },
        {
          "type": "inlineCode",
          "value": "primary"
        },
        {
          "type": "text",
          "value": ", the second one is by "
        },
        {
          "type": "inlineCode",
          "value": "quiet"
        },
        {
          "type": "text",
          "value": " branch selects surface background. Compared with copying hex values ​​for each feature, token changes cannot be centralized; compared with allowing all CSS to be freely overridden, the primitive contract loses consistency. The production design system must understand which properties are overridable and which are invariant."
        }
      ]
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
          "value": "mistakenly thinks "
        },
        {
          "type": "inlineCode",
          "value": "as const"
        },
        {
          "type": "text",
          "value": " freezes the runtime object violating the TypeScript type-erasure boundary. Available via "
        },
        {
          "type": "inlineCode",
          "value": "Object.isFrozen(designTokens) === false"
        },
        {
          "type": "text",
          "value": " identification; if runtime immutability is required, module exposure must be frozen or limited separately."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub product grid, checkout and seller actions can share primitive buttons, but their respective business intents remain in the feature component. This section covers props, composition, accessibility and compiler purity."
        }
      ]
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
          "value": "Token naming decision, primitive executes the low-level contract, and feature provides business intent; the dependency direction can only point from feature to design system."
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
      "id": "93-compound-components-and-accessibility-contracts",
      "children": [
        {
          "type": "text",
          "value": "9.3 Compound Components and Accessibility Contracts"
        }
      ]
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
          "value": "Compound component is not to split JSX into multiple names, but to let one owner coordinate active state, ARIA relationships, focus movement and child content."
        }
      ]
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
          "value": "If each feature spells tabs by itself, it is easy to only implement click but miss "
        },
        {
          "type": "inlineCode",
          "value": "role=\"tablist\""
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
          "value": "aria-controls"
        },
        {
          "type": "text",
          "value": ", roving "
        },
        {
          "type": "inlineCode",
          "value": "tabIndex"
        },
        {
          "type": "text",
          "value": " and Arrow key focus."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance and new concepts:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section introduces roving tab stop, manual activation, "
        },
        {
          "type": "inlineCode",
          "value": "useRef"
        },
        {
          "type": "text",
          "value": " saves DOM node references, and WAI-ARIA tabs pattern. Fixed roles is "
        },
        {
          "type": "inlineCode",
          "value": "tablist"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "tab"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "tabpanel"
        },
        {
          "type": "text",
          "value": "; the fixed relationship is tab "
        },
        {
          "type": "inlineCode",
          "value": "aria-controls"
        },
        {
          "type": "text",
          "value": " panel, panel "
        },
        {
          "type": "inlineCode",
          "value": "aria-labelledby"
        },
        {
          "type": "text",
          "value": " tab."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Boundaries and API rules:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Browser generates "
        },
        {
          "type": "inlineCode",
          "value": "KeyboardEvent"
        },
        {
          "type": "text",
          "value": " and execute focus; React event handler updates "
        },
        {
          "type": "inlineCode",
          "value": "activeTabId"
        },
        {
          "type": "text",
          "value": " state cell; ref object maintains identity between renders, "
        },
        {
          "type": "inlineCode",
          "value": "ref.current"
        },
        {
          "type": "text",
          "value": " array does not participate in render output; TypeScript checks "
        },
        {
          "type": "inlineCode",
          "value": "TabId"
        },
        {
          "type": "text",
          "value": " union and "
        },
        {
          "type": "inlineCode",
          "value": "KeyboardEvent<HTMLButtonElement>"
        },
        {
          "type": "text",
          "value": ", does not verify the actual accessibility tree. "
        },
        {
          "type": "inlineCode",
          "value": "ArrowRight"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "ArrowLeft"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "Home"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "End"
        },
        {
          "type": "text",
          "value": " is handled by handler and "
        },
        {
          "type": "inlineCode",
          "value": "preventDefault()"
        },
        {
          "type": "text",
          "value": "; other keys remain browser default."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/03-compound-accessibility-contract/accessible-compound-tabs.tsx",
      "value": "import { useRef, useState } from 'react'\nimport type { KeyboardEvent } from 'react'\n\ntype TabId = 'contract' | 'keyboard' | 'ownership'\n\ntype TabDefinition = {\n  id: TabId\n  label: string\n  content: string\n}\n\nconst tabDefinitions: TabDefinition[] = [\n  {\n    id: 'contract',\n    label: 'Contract',\n    content: 'The compound component owns roles, ids, and selected state.',\n  },\n  {\n    id: 'keyboard',\n    label: 'Keyboard',\n    content: 'Arrow keys move focus and activate the next tab.',\n  },\n  {\n    id: 'ownership',\n    label: 'Ownership',\n    content: 'Consumers provide content without rebuilding accessibility wiring.',\n  },\n]\n\nexport function AccessibleCompoundTabs() {\n  const [activeTabId, setActiveTabId] = useState<TabId>('contract')\n  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])\n  const activeTab = tabDefinitions.find((tab) => tab.id === activeTabId)!\n\n  function activateTab(index: number): void {\n    const nextTab = tabDefinitions[index]\n    setActiveTabId(nextTab.id)\n    tabRefs.current[index]?.focus()\n  }\n\n  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {\n    let nextIndex = index\n\n    if (event.key === 'ArrowRight') {\n      nextIndex = (index + 1) % tabDefinitions.length\n    } else if (event.key === 'ArrowLeft') {\n      nextIndex = (index - 1 + tabDefinitions.length) % tabDefinitions.length\n    } else if (event.key === 'Home') {\n      nextIndex = 0\n    } else if (event.key === 'End') {\n      nextIndex = tabDefinitions.length - 1\n    } else {\n      return\n    }\n\n    event.preventDefault()\n    activateTab(nextIndex)\n  }\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.3 Compound component accessibility</p>\n      <h2>One owner coordinates tab semantics and focus behavior</h2>\n      <div aria-label=\"Accessibility contract topics\" className=\"chapter15-tabs\" role=\"tablist\">\n        {tabDefinitions.map((tab, index) => (\n          <button\n            aria-controls={`chapter15-panel-${tab.id}`}\n            aria-selected={tab.id === activeTabId}\n            className=\"chapter15-tab\"\n            id={`chapter15-tab-${tab.id}`}\n            key={tab.id}\n            onClick={() => setActiveTabId(tab.id)}\n            onKeyDown={(event) => handleTabKeyDown(event, index)}\n            ref={(node) => {\n              tabRefs.current[index] = node\n            }}\n            role=\"tab\"\n            tabIndex={tab.id === activeTabId ? 0 : -1}\n            type=\"button\"\n          >\n            {tab.label}\n          </button>\n        ))}\n      </div>\n      <div\n        aria-labelledby={`chapter15-tab-${activeTab.id}`}\n        className=\"chapter15-tab-panel\"\n        id={`chapter15-panel-${activeTab.id}`}\n        role=\"tabpanel\"\n        tabIndex={0}\n      >\n        {activeTab.content}\n      </div>\n    </section>\n  )\n}"
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
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "TabId"
        },
        {
          "type": "text",
          "value": " limit valid active state; state cell saves the current selection; ref object saves button nodes; "
        },
        {
          "type": "inlineCode",
          "value": "find()"
        },
        {
          "type": "text",
          "value": " derives active definition from snapshot; the keyboard handler calculates the index, blocks the default of handled key, then updates the state and calls DOM "
        },
        {
          "type": "inlineCode",
          "value": "focus()"
        },
        {
          "type": "text",
          "value": "; JSX establishes a stable id relationship for each tab."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "mechanism evidence chain and citation changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "user presses "
        },
        {
          "type": "inlineCode",
          "value": "ArrowRight"
        },
        {
          "type": "text",
          "value": "; browser creates keyboard event; current render closure receives "
        },
        {
          "type": "inlineCode",
          "value": "index = 1"
        },
        {
          "type": "text",
          "value": ", calculate "
        },
        {
          "type": "inlineCode",
          "value": "nextIndex = 2"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "setActiveTabId('ownership')"
        },
        {
          "type": "text",
          "value": " is queued for state update; the same "
        },
        {
          "type": "inlineCode",
          "value": "tabRefs"
        },
        {
          "type": "text",
          "value": " object "
        },
        {
          "type": "inlineCode",
          "value": "current[2]"
        },
        {
          "type": "text",
          "value": " points to the third button, and the browser immediately moves focus; the next render snapshot is "
        },
        {
          "type": "inlineCode",
          "value": "activeTabId"
        },
        {
          "type": "text",
          "value": " becomes "
        },
        {
          "type": "inlineCode",
          "value": "'ownership'"
        },
        {
          "type": "text",
          "value": ", React commit update "
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
          "value": "tabIndex"
        },
        {
          "type": "text",
          "value": " and panel content. TypeScript will not operate focus, nor will it prove that ids are unique; duplicate ids or wrong ARIA relationships still require accessibility test and review."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get this result and comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "focus and selected state are both moved because this exercise uses automatic activation. If there is significant latency when loading the panel, manual activation should be used: Arrow keys only move the focus, Space / Enter then changes the selection."
        }
      ]
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
          "value": "only switches active class on CSS, which violates semantic contract; screen reader does not know selection, and keyboard users may also be trapped in multiple "
        },
        {
          "type": "inlineCode",
          "value": "tabIndex={0}"
        },
        {
          "type": "text",
          "value": " on. You can identify them by working with tabs without a mouse and checking the accessibility tree for roles and relationships."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub architecture dashboard Use tabs to switch architecture, operations and governance. It handles accessibility-first queries for state snapshots, refs, events, component composition, and testing."
        }
      ]
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
          "value": "Compound component is a shared behavior owner: state determines selection, refs executes focus, and ARIA attributes connect DOM nodes into platform accessibility contract."
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
      "id": "94-feature-public-apis-and-dependency-direction",
      "children": [
        {
          "type": "text",
          "value": "9.4 Feature Public APIs and Dependency Direction"
        }
      ]
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
          "value": "Feature public API is supported import surface. Consumers relying on capabilities should not deep import feature internal data, components or helpers."
        }
      ]
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
          "value": "When the internal files of the catalog are renamed, deep imports will turn the internal implementation into a full project contract. This section uses "
        },
        {
          "type": "inlineCode",
          "value": "catalogFeaturePublicApi"
        },
        {
          "type": "text",
          "value": " Centralized release "
        },
        {
          "type": "inlineCode",
          "value": "listVisibleProducts()"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "getProductRoute()"
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
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ES module of "
        },
        {
          "type": "inlineCode",
          "value": "export"
        },
        {
          "type": "text",
          "value": " determines whether a symbol can be imported, but \"public API files\" are team architecture conventions; TypeScript checks function parameters and return values; JavaScript runtime creates module singleton objects; React only consumes the returned product array; Vite builds module graph from static imports. TypeScript will not automatically prohibit deep import from outside the same directory, and requires lint rule, package exports, review or architecture test. There is no new React runtime API in this section, the focus is on the module contract."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed export name and signature:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This exercise is fixed to export "
        },
        {
          "type": "inlineCode",
          "value": "catalogFeaturePublicApi"
        },
        {
          "type": "text",
          "value": ", whose signature is "
        },
        {
          "type": "inlineCode",
          "value": "listVisibleProducts(): CatalogProduct[]"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "getProductRoute(productId: string): string"
        },
        {
          "type": "text",
          "value": ". "
        },
        {
          "type": "inlineCode",
          "value": "encodeURIComponent()"
        },
        {
          "type": "text",
          "value": " belongs to JavaScript platform API, which is used for path segment value and is not equal to full URL authorization."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/catalog-feature-public-api.ts",
      "value": "export type CatalogProduct = {\n  id: string\n  name: string\n  active: boolean\n}\n\nconst catalogProducts: CatalogProduct[] = [\n  { id: 'product-101', name: 'Desk Lamp', active: true },\n  { id: 'product-102', name: 'Archive Shelf', active: false },\n]\n\nexport const catalogFeaturePublicApi = {\n  listVisibleProducts(): CatalogProduct[] {\n    return catalogProducts.filter((product) => product.active)\n  },\n  getProductRoute(productId: string): string {\n    return `/catalog/${encodeURIComponent(productId)}`\n  },\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Public API value and product type are located in ordinary "
        },
        {
          "type": "inlineCode",
          "value": ".ts"
        },
        {
          "type": "text",
          "value": " module, Fast Refresh will not mix non-component export and React component in the same module."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/feature-public-api-boundary.tsx",
      "value": "import { catalogFeaturePublicApi } from './catalog-feature-public-api'\n\nexport function FeaturePublicApiBoundary() {\n  const visibleProducts = catalogFeaturePublicApi.listVisibleProducts()\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.4 Feature public API</p>\n      <h2>Consumers import capabilities instead of internal files</h2>\n      <ul className=\"chapter15-list\">\n        {visibleProducts.map((product) => (\n          <li key={product.id}>\n            <strong>{product.name}</strong>\n            <code>{catalogFeaturePublicApi.getProductRoute(product.id)}</code>\n          </li>\n        ))}\n      </ul>\n      <p className=\"chapter15-note\">\n        Published exports: {Object.keys(catalogFeaturePublicApi).join(', ')}\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Public API module evaluation Create "
        },
        {
          "type": "inlineCode",
          "value": "catalogProducts"
        },
        {
          "type": "text",
          "value": " array and API object; panel module only imports this supported value and exports component; render calls the public method, "
        },
        {
          "type": "inlineCode",
          "value": "filter()"
        },
        {
          "type": "text",
          "value": " creates a new array but reuses product object references; React creates list items for active products; route method encodes the id and returns a string. The array reference changes each time it is called, but the product references remain unchanged; there is no state update here."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "App requires catalog list → import public API → runtime to call "
        },
        {
          "type": "inlineCode",
          "value": "filter()"
        },
        {
          "type": "text",
          "value": " → React snapshot consumes returned array → TypeScript Confirm product fields and route argument → build graph records consumer to edge of public module. The error form is consumer import "
        },
        {
          "type": "inlineCode",
          "value": "features/catalog/internal/catalogProducts"
        },
        {
          "type": "text",
          "value": ", which bypasses the supported surface; the identification signal is that the internal refactoring of the feature triggers cross-project import modifications."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, error and comparison:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "only shows "
        },
        {
          "type": "inlineCode",
          "value": "Desk Lamp"
        },
        {
          "type": "text",
          "value": " because "
        },
        {
          "type": "inlineCode",
          "value": "filter()"
        },
        {
          "type": "text",
          "value": " vs. "
        },
        {
          "type": "inlineCode",
          "value": "active"
        },
        {
          "type": "text",
          "value": " retains a reference to the true object. Compared to the default export of a huge feature object, small and named public methods are easier to review. A common mistake is to use barrel file to re-export all internal symbols without restrictions, although this is called "
        },
        {
          "type": "inlineCode",
          "value": "index.ts"
        },
        {
          "type": "text",
          "value": ", still no minification API."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub only needs the catalog route and view models and should not know about the catalog request cache or private components. This section connects modules, props, routing and migration surfaces."
        }
      ]
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
          "value": "Public API is a narrow door that allows dependencies; the existence of a folder does not mean the existence of a boundary."
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
      "id": "95-shared-modules-business-modules-and-dependency-cycles",
      "children": [
        {
          "type": "text",
          "value": "9.5 Shared Modules, Business Modules, and Dependency Cycles"
        }
      ]
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
          "value": "shared"
        },
        {
          "type": "text",
          "value": " can only save cross-business stable and low semantic capabilities; once shared imports feature, the direction will be reversed, and it may return to shared through feature to form a cycle."
        }
      ]
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
          "value": "\"Everyone can use it\" is not a sufficient condition for putting it into shared. If the business order state formatter only serves orders, it should stay in orders; otherwise shared will become the implicit coupling center of all features."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section models the module graph edge as "
        },
        {
          "type": "inlineCode",
          "value": "fromLayer → toLayer"
        },
        {
          "type": "text",
          "value": ", allow "
        },
        {
          "type": "inlineCode",
          "value": "app → feature/shared"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "feature → feature/shared"
        },
        {
          "type": "text",
          "value": ", block "
        },
        {
          "type": "inlineCode",
          "value": "shared → feature/app"
        },
        {
          "type": "text",
          "value": ". This is a set of rules for this chapter, not JavaScript grammar rules. Vite and browser can perform some circular dependencies, but initialization order and undefined bindings will make the behavior fragile; TypeScript can parse the graph and will not automatically reject it according to this rule. There is no new React runtime API in this section."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed structures and engineering rules:"
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
          "value": "ModuleLayer"
        },
        {
          "type": "text",
          "value": " is fixed to "
        },
        {
          "type": "inlineCode",
          "value": "'app' | 'feature' | 'shared'"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "DependencyEdge"
        },
        {
          "type": "text",
          "value": " fixed field is "
        },
        {
          "type": "inlineCode",
          "value": "from"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "fromLayer"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "to"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "toLayer"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "isAllowedDependency(edge): boolean"
        },
        {
          "type": "text",
          "value": " is an automatable policy seam."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/05-shared-feature-boundary/dependency-direction-audit.tsx",
      "value": "type ModuleLayer = 'app' | 'feature' | 'shared'\n\ntype DependencyEdge = {\n  from: string\n  fromLayer: ModuleLayer\n  to: string\n  toLayer: ModuleLayer\n}\n\nconst dependencyEdges: DependencyEdge[] = [\n  {\n    from: 'catalog-page',\n    fromLayer: 'feature',\n    to: 'currency-formatter',\n    toLayer: 'shared',\n  },\n  {\n    from: 'shared-button',\n    fromLayer: 'shared',\n    to: 'checkout-feature',\n    toLayer: 'feature',\n  },\n  {\n    from: 'application-shell',\n    fromLayer: 'app',\n    to: 'orders-feature',\n    toLayer: 'feature',\n  },\n]\n\nfunction isAllowedDependency(edge: DependencyEdge): boolean {\n  if (edge.fromLayer === 'shared') {\n    return edge.toLayer === 'shared'\n  }\n\n  if (edge.fromLayer === 'feature') {\n    return edge.toLayer !== 'app'\n  }\n\n  return true\n}\n\nexport function DependencyDirectionAudit() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.5 Shared and feature boundary</p>\n      <h2>Dependency direction is a graph rule, not a folder preference</h2>\n      <div className=\"chapter15-table\" role=\"table\" aria-label=\"Dependency direction audit\">\n        {dependencyEdges.map((edge) => {\n          const allowed = isAllowedDependency(edge)\n\n          return (\n            <div className=\"chapter15-table-row\" key={`${edge.from}-${edge.to}`} role=\"row\">\n              <code role=\"cell\">{edge.from}</code>\n              <span role=\"cell\">imports</span>\n              <code role=\"cell\">{edge.to}</code>\n              <strong className={allowed ? 'chapter15-pass' : 'chapter15-fail'} role=\"cell\">\n                {allowed ? 'allowed' : 'blocked'}\n              </strong>\n            </div>\n          )\n        })}\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and reference changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "union type limits layer labels; array records three edges; pure evaluator makes decisions based on source layer; render calculates local "
        },
        {
          "type": "inlineCode",
          "value": "allowed"
        },
        {
          "type": "text",
          "value": " boolean and mapped to class and text. No graph array is modified, and there is no React state; only booleans and element objects are created each render."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is architecture review and submit a "
        },
        {
          "type": "inlineCode",
          "value": "shared-button → checkout-feature"
        },
        {
          "type": "text",
          "value": " edge; JavaScript evaluator reads "
        },
        {
          "type": "inlineCode",
          "value": "fromLayer = 'shared'"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "toLayer = 'feature'"
        },
        {
          "type": "text",
          "value": ", returns false; React displays blocked; TypeScript can only confirm that the layer literal is valid, but cannot determine whether the business attribution is correct; CI must build edges from real imports to automatically block. The risk of error is that shared is polluted by checkout semantics; identifying that the signal is a shared change requires understanding multiple features at the same time."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The second edge is blocked because shared branches are only allowed to point to shared. Compared with \"put all public helpers as shared\", the correct question should be: Is it stable enough, has no business owner, and can be used by at least two features with the same semantics? A common mistake is to move all code up the cycle to shared, which only hides coupling."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub formatters and API primitives can be shared; checkout decision and order status transitions belong to features. This rule inherits Context scope, route ownership, test boundaries and code splitting."
        }
      ]
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
          "value": "Shared is the bottom layer of the dependency graph, not the utility room; the low-level layer knows that the high-level layer is an architecture smell."
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
      "id": "96-dtos-domain-models-view-models-and-adapters",
      "children": [
        {
          "type": "text",
          "value": "9.6 DTOs, Domain Models, View Models, and Adapters"
        }
      ]
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
          "value": "Network response when entering the frontend from the browser/server boundary is "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": "; runtime guard establishes DTO trust, adapter then converts transport naming into domain naming, and finally formatter generates UI-specific view model."
        }
      ]
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
          "value": "directly allows the component to read "
        },
        {
          "type": "inlineCode",
          "value": "price_cents"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "published_at"
        },
        {
          "type": "text",
          "value": " will spread backend naming, date parsing and locale formatting to the UI. Once the backend fields change, all site components will be destroyed together."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "DTO describes transport; domain model saves front-end business semantics; view model saves renderable strings. TypeScript guard's return type predicate "
        },
        {
          "type": "inlineCode",
          "value": "value is ProductDto"
        },
        {
          "type": "text",
          "value": " provides both runtime boolean and compile-time narrowing. "
        },
        {
          "type": "inlineCode",
          "value": "Intl"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "Date"
        },
        {
          "type": "text",
          "value": " is JavaScript/browser platform behavior; React only consumes view model."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "fixed pipeline is "
        },
        {
          "type": "inlineCode",
          "value": "isProductDto(unknown) → toProductDomainModel(ProductDto) → toProductViewModel(ProductDomainModel)"
        },
        {
          "type": "text",
          "value": ". Guard must perform real property checks; declare "
        },
        {
          "type": "inlineCode",
          "value": "const response: ProductDto = await ..."
        },
        {
          "type": "text",
          "value": " is only asserted in the compiler and does not verify JSON."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/06-api-contract-adapter/api-contract-adapter-panel.tsx",
      "value": "type ProductDto = {\n  product_id: string\n  display_name: string\n  price_cents: number\n  published_at: string\n}\n\ntype ProductDomainModel = {\n  id: string\n  name: string\n  priceInCents: number\n  publishedAt: Date\n}\n\ntype ProductViewModel = {\n  id: string\n  title: string\n  priceLabel: string\n  publishedLabel: string\n}\n\nconst productResponse: unknown = {\n  product_id: 'product-301',\n  display_name: 'Task Chair',\n  price_cents: 12900,\n  published_at: '2026-06-20T09:00:00.000Z',\n}\n\nfunction isProductDto(value: unknown): value is ProductDto {\n  if (typeof value !== 'object' || value === null) {\n    return false\n  }\n\n  const candidate = value as Record<string, unknown>\n  return (\n    typeof candidate.product_id === 'string' &&\n    typeof candidate.display_name === 'string' &&\n    typeof candidate.price_cents === 'number' &&\n    typeof candidate.published_at === 'string'\n  )\n}\n\nfunction toProductDomainModel(dto: ProductDto): ProductDomainModel {\n  return {\n    id: dto.product_id,\n    name: dto.display_name,\n    priceInCents: dto.price_cents,\n    publishedAt: new Date(dto.published_at),\n  }\n}\n\nfunction toProductViewModel(product: ProductDomainModel): ProductViewModel {\n  return {\n    id: product.id,\n    title: product.name,\n    priceLabel: new Intl.NumberFormat('en-US', {\n      style: 'currency',\n      currency: 'USD',\n    }).format(product.priceInCents / 100),\n    publishedLabel: new Intl.DateTimeFormat('en-US', {\n      dateStyle: 'medium',\n      timeZone: 'UTC',\n    }).format(product.publishedAt),\n  }\n}\n\nexport function ApiContractAdapterPanel() {\n  if (!isProductDto(productResponse)) {\n    return (\n      <section className=\"chapter15-panel\">\n        <h2>API contract rejected</h2>\n      </section>\n    )\n  }\n\n  const domainModel = toProductDomainModel(productResponse)\n  const viewModel = toProductViewModel(domainModel)\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.6 API contract adapter</p>\n      <h2>Unknown response to DTO to domain model to view model</h2>\n      <article className=\"chapter15-card\">\n        <h3>{viewModel.title}</h3>\n        <p>{viewModel.priceLabel}</p>\n        <p>Published {viewModel.publishedLabel}</p>\n        <code>{viewModel.id}</code>\n      </article>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and object changes:"
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
          "value": "productResponse"
        },
        {
          "type": "text",
          "value": " remains unknown; guard first excludes null and primitive, and then reads candidate properties; after narrowing, adapter creates a new camelCase domain object, in which the date string becomes "
        },
        {
          "type": "inlineCode",
          "value": "Date"
        },
        {
          "type": "text",
          "value": " object; view adapter creates an object containing only render strings; React snapshot only reads "
        },
        {
          "type": "inlineCode",
          "value": "viewModel"
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "API response arrived → JavaScript guard check concrete properties → TypeScript on true branch narrow binding → domain adapter create new object/reference → locale formatters create strings → React render card. TypeScript types disappear after being emitted, malicious or broken JSON can still only be blocked by runtime guard. If the UI directly reads DTO, the error risk is that backend rename will cause multiple components to be undefined at the same time; the identification signal is snake_case network fields appearing in JSX."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "page displays "
        },
        {
          "type": "inlineCode",
          "value": "$129.00"
        },
        {
          "type": "text",
          "value": " and formatted date as cents divided by 100, UTC "
        },
        {
          "type": "inlineCode",
          "value": "Date"
        },
        {
          "type": "text",
          "value": " is handed over to the fixed locale formatter. Compare "
        },
        {
          "type": "inlineCode",
          "value": "as ProductDto"
        },
        {
          "type": "text",
          "value": ", it does not have any runtime branch. Currently guard is still a minimal model: real projects also verify date validity, numeric ranges and contract version."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub catalog DTO can evolve with the backend contract, while the product card continues to consume the stable view model. This section inherits Chapter 9 runtime validation, Chapter 13 serialization boundary and Chapter 14 migration gate."
        }
      ]
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
          "value": "Unknown Verify first, then adapt DTO, domain model does business, and view model serves React."
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
      "id": "97-error-normalization-and-generated-client-boundaries",
      "children": [
        {
          "type": "text",
          "value": "9.7 Error Normalization and Generated Client Boundaries"
        }
      ]
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
          "value": "Generated client can automate request/response types, but cannot determine retry, message, privacy and telemetry shape for the UI. All thrown values ​​should be normalized at the boundary to a UI-facing error contract."
        }
      ]
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
          "value": "If each page is judged separately HTTP error, "
        },
        {
          "type": "inlineCode",
          "value": "TypeError"
        },
        {
          "type": "text",
          "value": " and any thrown value, loading/error UI and retry policy will be inconsistent."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
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
          "value": " is the correct starting point for catch boundary; type guard identifies generated client error; "
        },
        {
          "type": "inlineCode",
          "value": "instanceof TypeError"
        },
        {
          "type": "text",
          "value": " identifies network-like failure; normalizer returns "
        },
        {
          "type": "inlineCode",
          "value": "NormalizedClientError"
        },
        {
          "type": "text",
          "value": ". OpenAPI generator belongs to tooling. This chapter only simulates its output shape and does not install the generator. There is no new React runtime API in this section."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
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
          "value": "normalizeClientError(error: unknown): NormalizedClientError"
        },
        {
          "type": "text",
          "value": " Fixed output "
        },
        {
          "type": "inlineCode",
          "value": "code"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "message"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "retryable"
        },
        {
          "type": "text",
          "value": " and optional "
        },
        {
          "type": "inlineCode",
          "value": "status"
        },
        {
          "type": "text",
          "value": ". The UI does not read generated client private fields."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/07-error-normalization-client-boundary/error-normalization-panel.tsx",
      "value": "type NormalizedClientError = {\n  code: string\n  message: string\n  retryable: boolean\n  status?: number\n}\n\ntype GeneratedClientError = {\n  status: number\n  body?: {\n    code?: string\n    message?: string\n  }\n}\n\nconst sampleErrors: unknown[] = [\n  {\n    status: 409,\n    body: {\n      code: 'PRODUCT_CONFLICT',\n      message: 'Product was updated by another session.',\n    },\n  },\n  new TypeError('Failed to fetch'),\n  'unexpected failure',\n]\n\nfunction isGeneratedClientError(error: unknown): error is GeneratedClientError {\n  return (\n    typeof error === 'object' &&\n    error !== null &&\n    'status' in error &&\n    typeof error.status === 'number'\n  )\n}\n\nfunction normalizeClientError(error: unknown): NormalizedClientError {\n  if (isGeneratedClientError(error)) {\n    return {\n      code: error.body?.code ?? 'HTTP_ERROR',\n      message: error.body?.message ?? `Request failed with status ${error.status}.`,\n      retryable: error.status >= 500,\n      status: error.status,\n    }\n  }\n\n  if (error instanceof TypeError) {\n    return {\n      code: 'NETWORK_ERROR',\n      message: 'The network request could not be completed.',\n      retryable: true,\n    }\n  }\n\n  return {\n    code: 'UNKNOWN_ERROR',\n    message: 'An unexpected client error occurred.',\n    retryable: false,\n  }\n}\n\nexport function ErrorNormalizationPanel() {\n  const normalizedErrors = sampleErrors.map(normalizeClientError)\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.7 Error normalization</p>\n      <h2>Generated client errors become one UI-facing contract</h2>\n      <div className=\"chapter15-grid\">\n        {normalizedErrors.map((error) => (\n          <article className=\"chapter15-card\" key={`${error.code}-${error.status ?? 'none'}`}>\n            <h3>{error.code}</h3>\n            <p>{error.message}</p>\n            <span>{error.retryable ? 'Retry available' : 'Manual resolution required'}</span>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and object changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "sample array saves three runtime values; guard only reads object-like status; normalizer creates a new normalized object each time; "
        },
        {
          "type": "inlineCode",
          "value": "map()"
        },
        {
          "type": "text",
          "value": " creates a new array; React only relies on unified fields and does not care about the original error prototype or body shape."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Request rejects → catch value enter "
        },
        {
          "type": "inlineCode",
          "value": "unknown"
        },
        {
          "type": "text",
          "value": " → guard branch reads status/body or "
        },
        {
          "type": "inlineCode",
          "value": "instanceof"
        },
        {
          "type": "text",
          "value": " → normalizer creates stable object → React error card consumes object → TypeScript checks all branches return the same shape. If directly "
        },
        {
          "type": "inlineCode",
          "value": "catch (error: GeneratedClientError)"
        },
        {
          "type": "text",
          "value": ", the type declaration will not change the thrown runtime value; the identification signal is production error UI "
        },
        {
          "type": "inlineCode",
          "value": "undefined"
        },
        {
          "type": "text",
          "value": " message or retry policy is different for each page."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "409 conflict does not retry, network error can retry, string fallback does not retry, this is a clear policy. Compare raw "
        },
        {
          "type": "inlineCode",
          "value": "error.message"
        },
        {
          "type": "text",
          "value": " is displayed directly, and any object or sensitive backend detail may be leaked. The normalizer needs to divide the work with the observability reporter: one serves the UI and the other serves the diagnostics."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub product conflict, orders outage and unknown failure can enter the same error branch, inheriting Chapter 5 UI states and Chapter 9 async lifecycle."
        }
      ]
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
          "value": "Generated type automation transport; normalizer defines product-facing failure semantics."
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
      "id": "98-feature-flags-rbac-ui-and-release-strategy",
      "children": [
        {
          "type": "text",
          "value": "9.8 Feature Flags, RBAC UI, and Release Strategy"
        }
      ]
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
          "value": "Capability visibility is the intersection of flag decision and permission decision; flag must have owner and cleanup date; UI guard is never server authorization."
        }
      ]
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
          "value": "Single boolean Unable to answer who is responsible, when to remove, which characters are visible, and how to rollout in case of failure. Hiding permission only on the front end can also create an illusion of security."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "React state saves the flag and role snapshot of the current exercise; JavaScript evaluator reads immutable inputs and returns decision object; TypeScript union limits role / permission strings; the server must still verify mutation permission. A real flag provider may use targeting context and percentage rollout, this chapter does not install the SDK."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and engineering rules:"
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
          "value": "ReleaseFlag"
        },
        {
          "type": "text",
          "value": " Fixed field "
        },
        {
          "type": "inlineCode",
          "value": "key"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "enabled"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "owner"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "cleanupDate"
        },
        {
          "type": "text",
          "value": "; "
        },
        {
          "type": "inlineCode",
          "value": "evaluateCapability(flag, permissions, requiredPermission)"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "visible"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "reason"
        },
        {
          "type": "text",
          "value": ". Flag release must be cleaned up after completion, and dual branches cannot be retained permanently."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/08-feature-flags-rbac-release/feature-flag-permission-panel.tsx",
      "value": "import { useState } from 'react'\n\ntype Role = 'viewer' | 'seller-admin'\ntype Permission = 'checkout:preview' | 'checkout:publish'\n\ntype ReleaseFlag = {\n  key: 'checkout-v2'\n  enabled: boolean\n  owner: string\n  cleanupDate: string\n}\n\ntype CapabilityDecision = {\n  visible: boolean\n  reason: string\n}\n\nconst permissionsByRole: Record<Role, Permission[]> = {\n  viewer: ['checkout:preview'],\n  'seller-admin': ['checkout:preview', 'checkout:publish'],\n}\n\nfunction evaluateCapability(\n  flag: ReleaseFlag,\n  permissions: Permission[],\n  requiredPermission: Permission,\n): CapabilityDecision {\n  if (!flag.enabled) {\n    return { visible: false, reason: 'Release flag is disabled.' }\n  }\n\n  if (!permissions.includes(requiredPermission)) {\n    return { visible: false, reason: 'UI permission is missing.' }\n  }\n\n  return { visible: true, reason: 'Flag and UI permission allow this capability.' }\n}\n\nexport function FeatureFlagPermissionPanel() {\n  const [flagEnabled, setFlagEnabled] = useState(true)\n  const [role, setRole] = useState<Role>('viewer')\n  const releaseFlag: ReleaseFlag = {\n    key: 'checkout-v2',\n    enabled: flagEnabled,\n    owner: 'checkout-team',\n    cleanupDate: '2026-09-30',\n  }\n  const decision = evaluateCapability(\n    releaseFlag,\n    permissionsByRole[role],\n    'checkout:publish',\n  )\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.8 Feature flags, RBAC UI, and release</p>\n      <h2>Visibility requires both release intent and UI permission</h2>\n      <div className=\"chapter15-actions\">\n        <label className=\"chapter15-control\">\n          <input\n            checked={flagEnabled}\n            onChange={(event) => setFlagEnabled(event.currentTarget.checked)}\n            type=\"checkbox\"\n          />\n          Enable checkout-v2\n        </label>\n        <label className=\"chapter15-control\">\n          Role\n          <select onChange={(event) => setRole(event.currentTarget.value as Role)} value={role}>\n            <option value=\"viewer\">viewer</option>\n            <option value=\"seller-admin\">seller-admin</option>\n          </select>\n        </label>\n      </div>\n      <p className={decision.visible ? 'chapter15-pass' : 'chapter15-warn'}>\n        {decision.visible ? 'Publish capability visible' : 'Publish capability hidden'}:{' '}\n        {decision.reason}\n      </p>\n      <p className=\"chapter15-note\">\n        This UI guard improves experience. The server must still authorize the mutation.\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and state changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "role-to-permission record is module data; pure evaluator first determines flag and then permission; checkbox handler from browser "
        },
        {
          "type": "inlineCode",
          "value": "checked"
        },
        {
          "type": "text",
          "value": " reads boolean, select handler reads string; setter updates two state cells respectively; new render creates new "
        },
        {
          "type": "inlineCode",
          "value": "releaseFlag"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "decision"
        },
        {
          "type": "text",
          "value": " objects."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "User selects "
        },
        {
          "type": "inlineCode",
          "value": "seller-admin"
        },
        {
          "type": "text",
          "value": " → browser change event → handler closure queue role update → React new snapshot read admin permissions → evaluator sees flag true and contains "
        },
        {
          "type": "inlineCode",
          "value": "checkout:publish"
        },
        {
          "type": "text",
          "value": " → UI displays capability. TypeScript checks the union after role cast, but the cast itself does not verify any DOM string; the server cannot see this UI decision. If the hidden button is used as authorization, the attacker can still call the API directly; the identifying signal is that the backend endpoint does not have an independent permission check."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "viewer cannot see publish even if the flag is on, and admin is only visible when the flag is on. To compare, just write "
        },
        {
          "type": "inlineCode",
          "value": "flag && <Button />"
        },
        {
          "type": "text",
          "value": ", it has no RBAC, reason, owner, cleanup. A common mistake is not deleting the flag after going online, resulting in a long-term doubling of the test matrix."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub checkout-v2 rollout, seller analytics preview and destructive seller actions all require release and permission owners. This section takes over conditional rendering, state, routing guard and testing matrix."
        }
      ]
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
          "value": "Flag determines \"whether to publish\", permission determines \"whether the UI provides capabilities\", and server authorization determines \"whether the operation is allowed\"."
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
      "id": "99-internationalization-message-catalogs-and-locale-formatting",
      "children": [
        {
          "type": "text",
          "value": "9.9 Internationalization, Message Catalogs, and Locale Formatting"
        }
      ]
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
          "value": "i18n doesn't just replace strings. Message catalog is responsible for semantic text, "
        },
        {
          "type": "inlineCode",
          "value": "Intl"
        },
        {
          "type": "text",
          "value": " formatter is responsible for locale-sensitive representation of currency, number, and date. route/SEO, fallback, and test matrix are also outer framework concerns."
        }
      ]
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
          "value": "Handwriting "
        },
        {
          "type": "inlineCode",
          "value": "$"
        },
        {
          "type": "text",
          "value": ", comma and "
        },
        {
          "type": "inlineCode",
          "value": "MM/DD/YYYY"
        },
        {
          "type": "text",
          "value": " will scatter locale rules in JSX; only translating labels without formatting numbers, the page is still not locale-correct."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
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
          "value": "Locale"
        },
        {
          "type": "text",
          "value": " union makes the current support range explicit; message catalog is app data; "
        },
        {
          "type": "inlineCode",
          "value": "Intl.NumberFormat"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "Intl.DateTimeFormat"
        },
        {
          "type": "text",
          "value": " is JavaScript internationalization platform APIs; React state only saves selected locale. TypeScript checks that the catalog keys are complete, but does not guarantee that the translation is correct or that the locale data is consistent in all runtimes."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and rules:"
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
          "value": "formatRevenue(locale, amountInCents)"
        },
        {
          "type": "text",
          "value": " receives the smallest currency unit; "
        },
        {
          "type": "inlineCode",
          "value": "formatOrderDate(locale, date)"
        },
        {
          "type": "text",
          "value": " is fixed to UTC to ensure stable training results. The real system must clearly understand the relationship between currency and amount, and cannot just guess the currency based on locale; this example is only a visible demonstration."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/09-i18n-locale-formatting/locale-formatting-panel.tsx",
      "value": "import { useState } from 'react'\n\ntype Locale = 'en-US' | 'en-GB'\n\ntype MessageKey = 'revenue' | 'lastOrder'\n\nconst messageCatalog: Record<Locale, Record<MessageKey, string>> = {\n  'en-US': {\n    revenue: 'Revenue',\n    lastOrder: 'Last order',\n  },\n  'en-GB': {\n    revenue: 'Turnover',\n    lastOrder: 'Latest order',\n  },\n}\n\nfunction formatRevenue(locale: Locale, amountInCents: number): string {\n  return new Intl.NumberFormat(locale, {\n    style: 'currency',\n    currency: locale === 'en-US' ? 'USD' : 'GBP',\n  }).format(amountInCents / 100)\n}\n\nfunction formatOrderDate(locale: Locale, date: Date): string {\n  return new Intl.DateTimeFormat(locale, {\n    dateStyle: 'medium',\n    timeZone: 'UTC',\n  }).format(date)\n}\n\nexport function LocaleFormattingPanel() {\n  const [locale, setLocale] = useState<Locale>('en-US')\n  const messages = messageCatalog[locale]\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.9 Internationalization and locale</p>\n      <h2>Messages and locale-sensitive values have different owners</h2>\n      <label className=\"chapter15-control\">\n        Locale\n        <select\n          onChange={(event) => setLocale(event.currentTarget.value as Locale)}\n          value={locale}\n        >\n          <option value=\"en-US\">en-US</option>\n          <option value=\"en-GB\">en-GB</option>\n        </select>\n      </label>\n      <div className=\"chapter15-grid\">\n        <article className=\"chapter15-card\">\n          <h3>{messages.revenue}</h3>\n          <p>{formatRevenue(locale, 286450)}</p>\n        </article>\n        <article className=\"chapter15-card\">\n          <h3>{messages.lastOrder}</h3>\n          <p>{formatOrderDate(locale, new Date('2026-06-24T10:00:00.000Z'))}</p>\n        </article>\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and state changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Nested "
        },
        {
          "type": "inlineCode",
          "value": "Record"
        },
        {
          "type": "text",
          "value": " requires two locales to have two keys; each call to formatters creates a formatter object and returns a string; select updates the locale state cell; the next render uses the locale to read different message object references, and uses the same numeric/date source values to produce different display strings."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "User switching "
        },
        {
          "type": "inlineCode",
          "value": "en-GB"
        },
        {
          "type": "text",
          "value": " → browser change event provides string → React update locale snapshot → catalog lookup select UK messages → "
        },
        {
          "type": "inlineCode",
          "value": "Intl"
        },
        {
          "type": "text",
          "value": " performs locale negotiation and formats GBP/date → React commit new text nodes. TypeScript does not check translation semantics and does not guarantee unknown locale cast safety; real apps should be selected from the validated supported locale list. The error signal is "
        },
        {
          "type": "inlineCode",
          "value": "toFixed(2)"
        },
        {
          "type": "text",
          "value": ", spliced currency symbols, and hard-coded date slices."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "source amount is still "
        },
        {
          "type": "inlineCode",
          "value": "286450"
        },
        {
          "type": "text",
          "value": " cents, only the output string changes. Compared with storing formatted string in state, duplicated derived state will be generated; old strings may not be updated after locale switching."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Catalog price, order date, stock count and status label all need to be unified locale owner. This section inherits derived data, controlled select, Context boundary and server/client formatting consistency."
        }
      ]
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
          "value": "Message key expresses semantics, locale determines copywriting and format, and raw numeric/date values maintain business source of truth."
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
      "id": "910-observability-with-route-context-and-release-metadata",
      "children": [
        {
          "type": "text",
          "value": "9.10 Observability with Route Context and Release Metadata"
        }
      ]
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
          "value": "Observability event should answer \"which release, which route, which feature, what error\" while complying with the privacy boundary. "
        },
        {
          "type": "inlineCode",
          "value": "console.log(error)"
        },
        {
          "type": "text",
          "value": " is neither relatable nor may leak sensitive data."
        }
      ]
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
          "value": "The same error is in "
        },
        {
          "type": "inlineCode",
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": " and "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": " may be processed by different owners; without release metadata, it is impossible to determine which version the regression will start from."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
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
          "value": "createErrorEvent()"
        },
        {
          "type": "text",
          "value": " is pure normalization boundary; event handler is the location that allows creating timestamp and updating state; React state saves the last three mock events; browser clock provides "
        },
        {
          "type": "inlineCode",
          "value": "Date.now()"
        },
        {
          "type": "text",
          "value": " and ISO timestamp; the real SDK, source maps, and session replay belong to the external observability system and are not connected in this chapter."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed object shape with rule:"
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
          "value": "FrontendErrorEvent"
        },
        {
          "type": "text",
          "value": " fixed with "
        },
        {
          "type": "inlineCode",
          "value": "eventId"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "code"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "message"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "occurredAt"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "route"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "feature"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "release"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "sessionId"
        },
        {
          "type": "text",
          "value": ". Actual systems should hash / pseudonymize session references and disable token, password, payment data and direct PII."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/10-observability-error-reporting/observability-event-panel.tsx",
      "value": "import { useState } from 'react'\n\ntype ErrorContext = {\n  route: string\n  feature: string\n  release: string\n  sessionId: string\n}\n\ntype FrontendErrorEvent = ErrorContext & {\n  eventId: string\n  code: string\n  message: string\n  occurredAt: string\n}\n\nfunction createErrorEvent(error: unknown, context: ErrorContext): FrontendErrorEvent {\n  const knownError = error instanceof Error ? error : new Error('Unknown client error')\n\n  return {\n    ...context,\n    eventId: `event-${Date.now()}`,\n    code: knownError.name.toUpperCase(),\n    message: knownError.message,\n    occurredAt: new Date().toISOString(),\n  }\n}\n\nexport function ObservabilityEventPanel() {\n  const [events, setEvents] = useState<FrontendErrorEvent[]>([])\n\n  function reportCatalogError(): void {\n    const nextEvent = createErrorEvent(new Error('Catalog preview unavailable.'), {\n      route: '/catalog',\n      feature: 'catalog-preview',\n      release: 'learning-2026.06',\n      sessionId: 'session-anonymous',\n    })\n\n    setEvents((currentEvents) => [nextEvent, ...currentEvents].slice(0, 3))\n  }\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.10 Observability and error reporting</p>\n      <h2>An error event needs operational context, not raw console output</h2>\n      <button className=\"chapter15-button\" onClick={reportCatalogError} type=\"button\">\n        Report mock error\n      </button>\n      {events.length === 0 ? (\n        <p className=\"chapter15-note\">No mock events have been reported.</p>\n      ) : (\n        <ul className=\"chapter15-list\">\n          {events.map((event) => (\n            <li key={event.eventId}>\n              <strong>{event.code}</strong>\n              <span>{event.message}</span>\n              <code>\n                {event.release} | {event.route} | {event.feature}\n              </code>\n            </li>\n          ))}\n        </ul>\n      )}\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and reference changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "intersection type merges error and context fields; normalizer turns arbitrary value into "
        },
        {
          "type": "inlineCode",
          "value": "Error"
        },
        {
          "type": "text",
          "value": "; button event creates event object; functional state update reads the latest array provided by React and creates "
        },
        {
          "type": "inlineCode",
          "value": "[nextEvent, ...currentEvents]"
        },
        {
          "type": "text",
          "value": " New array and slice; old array and event objects are not modified."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "user clicks report → React calls the current handler closure → JavaScript creates Error, context, event and timestamp → setter queue uses latest state to generate up to three events → React new snapshot map events → UI displays release/route/feature. TypeScript only ensures that fields exist, and cannot determine whether the message contains secret; privacy review and redaction must be done separately. Error signals are only stack trace, failure to aggregate by release, or access token appearing in the log."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "list is newest-first and has a maximum of three entries, because the functional updater prepends the slice. Directly "
        },
        {
          "type": "inlineCode",
          "value": "createErrorEvent()"
        },
        {
          "type": "text",
          "value": ", timestamp and event id will change in each render, violating pure render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub orders failure Route, feature and release context are required to dispatch owner. This section undertakes event/effect boundary, async error, route state, Profiler evidence and testing."
        }
      ]
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
          "value": "Error is what happened; observability event is the diagnostic contract with context, version and privacy policy."
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
      "id": "911-web-vitals-route-cost-and-performance-budgets",
      "children": [
        {
          "type": "text",
          "value": "9.11 Web Vitals, Route Cost, and Performance Budgets"
        }
      ]
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
          "value": "Performance budget is the continuous release gate of each route, not the previous Lighthouse screenshot before going online. Field metrics, lab metrics and bundle cost must be interpreted separately."
        }
      ]
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
          "value": "One memoization optimization cannot prevent future bundle, LCP, INP, and CLS rollbacks; the team needs to convert thresholds and route samples into repeatable decisions."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The current Core Web Vitals are LCP, INP, CLS; web.dev is recommended to be evaluated at the 75 percentile of the mobile / desktop segment. This exercise only uses static samples to demonstrate the evaluator and does not claim real collection; the real browser can be obtained through Performance APIs or "
        },
        {
          "type": "inlineCode",
          "value": "web-vitals"
        },
        {
          "type": "text",
          "value": " library sampling, CI can check bundle size, the two cannot replace each other."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed object shape with rule:"
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
          "value": "RoutePerformanceSample"
        },
        {
          "type": "text",
          "value": " contains route, JavaScript KB, LCP ms, INP ms, CLS; "
        },
        {
          "type": "inlineCode",
          "value": "evaluateRouteBudget()"
        },
        {
          "type": "text",
          "value": " Return to "
        },
        {
          "type": "inlineCode",
          "value": "pass | warn | fail"
        },
        {
          "type": "text",
          "value": " and violations. The threshold is the exercise policy of this project; in addition to the official good thresholds of Core Web Vitals, the bundle budget must be determined based on product / device / network."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/11-performance-budget-web-vitals/performance-budget-panel.tsx",
      "value": "type BudgetStatus = 'pass' | 'warn' | 'fail'\n\ntype RoutePerformanceSample = {\n  route: string\n  javascriptKb: number\n  lcpMs: number\n  inpMs: number\n  cls: number\n}\n\ntype RoutePerformanceBudget = {\n  maxJavascriptKb: number\n  maxLcpMs: number\n  maxInpMs: number\n  maxCls: number\n}\n\ntype BudgetEvaluation = {\n  route: string\n  status: BudgetStatus\n  violations: string[]\n}\n\nconst routeBudget: RoutePerformanceBudget = {\n  maxJavascriptKb: 180,\n  maxLcpMs: 2500,\n  maxInpMs: 200,\n  maxCls: 0.1,\n}\n\nconst routeSamples: RoutePerformanceSample[] = [\n  { route: '/catalog', javascriptKb: 164, lcpMs: 2180, inpMs: 165, cls: 0.04 },\n  { route: '/seller/orders', javascriptKb: 196, lcpMs: 2720, inpMs: 205, cls: 0.08 },\n]\n\nfunction evaluateRouteBudget(\n  sample: RoutePerformanceSample,\n  budget: RoutePerformanceBudget,\n): BudgetEvaluation {\n  const violations = [\n    sample.javascriptKb > budget.maxJavascriptKb ? 'javascript' : null,\n    sample.lcpMs > budget.maxLcpMs ? 'lcp' : null,\n    sample.inpMs > budget.maxInpMs ? 'inp' : null,\n    sample.cls > budget.maxCls ? 'cls' : null,\n  ].filter((value): value is string => value !== null)\n\n  return {\n    route: sample.route,\n    status: violations.length === 0 ? 'pass' : violations.length === 1 ? 'warn' : 'fail',\n    violations,\n  }\n}\n\nexport function PerformanceBudgetPanel() {\n  const evaluations = routeSamples.map((sample) => evaluateRouteBudget(sample, routeBudget))\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.11 Web Vitals and performance budget</p>\n      <h2>Route cost becomes a repeatable release decision</h2>\n      <div className=\"chapter15-grid\">\n        {evaluations.map((evaluation) => (\n          <article className=\"chapter15-card\" key={evaluation.route}>\n            <h3>{evaluation.route}</h3>\n            <strong className={`chapter15-${evaluation.status}`}>{evaluation.status}</strong>\n            <p>\n              {evaluation.violations.length === 0\n                ? 'All sample budgets passed.'\n                : `Exceeded: ${evaluation.violations.join(', ')}`}\n            </p>\n          </article>\n        ))}\n      </div>\n      <p className=\"chapter15-note\">\n        These static samples demonstrate the gate model; they are not real field measurements.\n      </p>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and object changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Budget and samples are module constants; evaluator creates array for four comparisons, filter generates violations; status is derived from violation count; render map creates evaluation objects and cards. No browser metrics are collected, and there are no mutations."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Release candidate brings route sample → JavaScript Compares sample with budget numbers → violations array records specific cost → React displays pass/warn/fail → TypeScript Checks metric fields, but cannot prove that sample is real, has correct units or represents P75 → CI/analytics pipeline can provide provenance. The error signal is that the budget dashboard is always green, but the sampling source and time window cannot be found."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
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
          "value": "/catalog"
        },
        {
          "type": "text",
          "value": " is passed so pass; "
        },
        {
          "type": "inlineCode",
          "value": "/seller/orders"
        },
        {
          "type": "text",
          "value": " exceeds JavaScript, LCP, and INP, so three items fail. If the comparison only looks at the total bundle, the route chunk and field responsiveness may still be degraded; if the comparison only looks at the field metric, bundle regression cannot be blocked before merging."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Catalog image-heavy, seller orders interaction-heavy, there should be different route evidence. This section extends Chapter 11 Profiler / code splitting and Chapter 12 CI gates to user experience budgeting."
        }
      ]
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
          "value": "Measure provides facts, budget defines acceptable costs, gate decides whether to release, and owner is responsible for repairing or approving exceptions."
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
      "id": "912-security-boundaries-for-xss-links-tokens-csp-and-logging",
      "children": [
        {
          "type": "text",
          "value": "9.12 Security Boundaries for XSS, Links, Tokens, CSP, and Logging"
        }
      ]
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
          "value": "Frontend security is the boundary design of source → validation → sink. React's default text rendering can reduce XSS risks, but "
        },
        {
          "type": "inlineCode",
          "value": "dangerouslySetInnerHTML"
        },
        {
          "type": "text",
          "value": ", URL, browser storage, third-party scripts and logging still need to be controlled independently; CSP is defense-in-depth, not the only line of defense."
        }
      ]
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
          "value": "\"React will escape so it is safe\" ignores raw HTML, unsafe protocols, access token storage and sensitive logs; \"button is hidden by RBAC\" is not equivalent to API authorization."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
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
          "value": "URL"
        },
        {
          "type": "text",
          "value": " constructor is browser/JavaScript platform parser; "
        },
        {
          "type": "inlineCode",
          "value": "rel=\"noopener noreferrer\""
        },
        {
          "type": "text",
          "value": " limits new browsing context; React JSX text is not equal to HTML sanitizer; TypeScript string type does not distinguish between trusted URL and untrusted input; server headers can truly deploy CSP, and currently Vite helper only demonstrates review findings."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed signature and engineering rules:"
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
          "value": "isSafeExternalUrl(string): boolean"
        },
        {
          "type": "text",
          "value": " only allows HTTPS; "
        },
        {
          "type": "inlineCode",
          "value": "inspectSecurityBoundary()"
        },
        {
          "type": "text",
          "value": " returns four findings. Real projects also require server-side authorization, CSRF strategy, CSP header, sanitizer, dependency review and third-party script inventory."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/12-security-boundary-checks/security-boundary-panel.tsx",
      "value": "type SecurityFinding = {\n  check: string\n  status: 'pass' | 'fail'\n  evidence: string\n}\n\nfunction isSafeExternalUrl(value: string): boolean {\n  try {\n    const url = new URL(value)\n    return url.protocol === 'https:'\n  } catch {\n    return false\n  }\n}\n\nfunction inspectSecurityBoundary(input: {\n  externalUrl: string\n  rendersRawHtml: boolean\n  storesAccessToken: boolean\n  loggedFields: string[]\n}): SecurityFinding[] {\n  const sensitiveLogFields = new Set(['accessToken', 'password', 'sessionId'])\n  const leakedFields = input.loggedFields.filter((field) => sensitiveLogFields.has(field))\n\n  return [\n    {\n      check: 'Safe external URL',\n      status: isSafeExternalUrl(input.externalUrl) ? 'pass' : 'fail',\n      evidence: input.externalUrl,\n    },\n    {\n      check: 'Unsafe HTML boundary',\n      status: input.rendersRawHtml ? 'fail' : 'pass',\n      evidence: input.rendersRawHtml ? 'Raw HTML requested' : 'React text rendering retained',\n    },\n    {\n      check: 'Token storage boundary',\n      status: input.storesAccessToken ? 'fail' : 'pass',\n      evidence: input.storesAccessToken ? 'Access token in browser storage' : 'No token stored',\n    },\n    {\n      check: 'Sensitive logging boundary',\n      status: leakedFields.length === 0 ? 'pass' : 'fail',\n      evidence: leakedFields.length === 0 ? 'No sensitive keys' : leakedFields.join(', '),\n    },\n  ]\n}\n\nexport function SecurityBoundaryPanel() {\n  const findings = inspectSecurityBoundary({\n    externalUrl: 'https://seller.example/catalog-policy',\n    rendersRawHtml: false,\n    storesAccessToken: false,\n    loggedFields: ['release', 'route', 'errorCode'],\n  })\n\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.12 Security boundaries</p>\n      <h2>Security checks connect browser sinks to reviewable evidence</h2>\n      <ul className=\"chapter15-list\">\n        {findings.map((finding) => (\n          <li key={finding.check}>\n            <strong>{finding.check}</strong>\n            <span className={`chapter15-${finding.status}`}>{finding.status}</span>\n            <code>{finding.evidence}</code>\n          </li>\n        ))}\n      </ul>\n      <a\n        className=\"chapter15-link\"\n        href=\"https://example.com/security\"\n        rel=\"noopener noreferrer\"\n        target=\"_blank\"\n      >\n        Open security policy example\n      </a>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and object changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "URL parser creates URL object in try block; invalid input returns false; inspector creates sensitive-key Set, filters out leaked fields, and creates four finding objects; React only displays evidence and does not perform sanitization. External link uses fixed HTTPS URL and rel attributes."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Security review provides input → JavaScript parser / boolean checks / sensitive-key Set calculation findings → React snapshot display pass/fail → browser press "
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
          "value": "rel"
        },
        {
          "type": "text",
          "value": " opens the link → TypeScript only checks strings and union, and does not determine whether URL trust or CSP is deployed → server config and penetration/security review verify the real line of defense. The error signal is that JSX appears arbitrary "
        },
        {
          "type": "inlineCode",
          "value": "dangerouslySetInnerHTML"
        },
        {
          "type": "text",
          "value": ", token write "
        },
        {
          "type": "inlineCode",
          "value": "localStorage"
        },
        {
          "type": "text",
          "value": " or reporter payload contains credentials."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "all four items are passed because the URL is HTTPS, raw HTML is not requested, token is not saved, and log keys are not sensitive. Compare passing untrusted HTML to "
        },
        {
          "type": "inlineCode",
          "value": "dangerouslySetInnerHTML"
        },
        {
          "type": "text",
          "value": ", React will be handed over to the browser HTML parser for execution; CSP should not replace sanitization even if it exists."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub product description, seller external links, auth/session and payment logs all cross the security boundary. This section connects the DOM, browser APIs, async data, observability and server/client responsibility."
        }
      ]
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
          "value": "Type is not trust, hidden UI is not authorization, CSP is not sanitizer, and logs are also data leakage surfaces."
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
      "id": "913-migration-inventory-risk-compatibility-and-rollback",
      "children": [
        {
          "type": "text",
          "value": "9.13 Migration Inventory, Risk, Compatibility, and Rollback"
        }
      ]
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
          "value": "Migration is not a rewrite, but a rollback sequence of inventory → compatibility → migration → retirement. Each work item requires risk and rollback, and you should not wait until failure to design a recovery path."
        }
      ]
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
          "value": "directly replaces all deep imports, DTO consumers and UI primitives at once, which will expand the blast radius; without a compatibility layer, the old and new paths cannot be verified in parallel."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Inventory discovers facts; risk classification determines the order; compat layer temporarily keeps the old contract; retirement cleans up the old path; rollback restores the affected boundary. TypeScript and tests can find some contract regressions, but cannot prove rollout, user data or operational recovery. There is no new React runtime API in this section."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed object shape with rule:"
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
          "value": "MigrationWorkItem"
        },
        {
          "type": "text",
          "value": " Fixed "
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
          "value": "phase"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "target"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "risk"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "rollback"
        },
        {
          "type": "text",
          "value": ". This exercise phase union has four fixed phases; the real plan also requires owner, deadline, dependency, success metric and communication."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/13-migration-strategy/migration-strategy-panel.tsx",
      "value": "type MigrationPhase = 'inventory' | 'compatibility' | 'migration' | 'retirement'\ntype MigrationRisk = 'low' | 'medium' | 'high'\n\ntype MigrationWorkItem = {\n  id: string\n  phase: MigrationPhase\n  target: string\n  risk: MigrationRisk\n  rollback: string\n}\n\nconst migrationWorkItems: MigrationWorkItem[] = [\n  {\n    id: 'migration-01',\n    phase: 'inventory',\n    target: 'Deep feature imports',\n    risk: 'medium',\n    rollback: 'Keep existing exports while inventory is reviewed.',\n  },\n  {\n    id: 'migration-02',\n    phase: 'compatibility',\n    target: 'Catalog API adapter',\n    risk: 'high',\n    rollback: 'Route calls through the legacy mapper.',\n  },\n  {\n    id: 'migration-03',\n    phase: 'migration',\n    target: 'Token-driven primitives',\n    risk: 'medium',\n    rollback: 'Restore component-level CSS variables.',\n  },\n  {\n    id: 'migration-04',\n    phase: 'retirement',\n    target: 'Legacy shared business helpers',\n    risk: 'low',\n    rollback: 'Revert the deletion commit before release.',\n  },\n]\n\nexport function MigrationStrategyPanel() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.13 Migration strategy</p>\n      <h2>Inventory, compatibility, migration, and retirement remain reversible</h2>\n      <ol className=\"chapter15-timeline\">\n        {migrationWorkItems.map((workItem) => (\n          <li key={workItem.id}>\n            <span>{workItem.phase}</span>\n            <strong>{workItem.target}</strong>\n            <small>Risk: {workItem.risk}</small>\n            <p>Rollback: {workItem.rollback}</p>\n          </li>\n        ))}\n      </ol>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and object changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Phase/risk unions limit plan vocabulary; array saves work items in execution order; component map to ordered list. render does not perform migrations, nor does it update items; it only visualizes the reviewed plan, so the completion state must come from real change tracking."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Architecture review found deep imports → inventory item record target/risk → compatibility item retained legacy mapper → feature-by-feature migration passed lint/typecheck/test/build → retirement deleted zero consumer export → press rollback to restore the old mapper upon failure. TypeScript Missing exports can be found, and user rollout or rollback aging cannot be evaluated. The error signal is that the PR deletes the old path and migrates all consumers at the same time, and there is no independent revert point."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "UI displays the four stages in array order because plan makes the dependency sequence explicit. Compared with \"overall switching after rewriting\", the strangler pattern keeps the old and new paths in parallel, reducing the one-time blast radius, but the compatibility layer must have a retirement date, otherwise it will become a permanent dual system."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub You can migrate the catalog adapter first, then migrate the orders public API, and finally retire the deep imports. This section combines Actions/Compiler migration, test gates, and route rollout into a production change process."
        }
      ]
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
          "value": "First perform inventory, then compatibility, then migration and measurement, and finally retirement; any step must have rollback."
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
      "id": "914-adrs-code-review-standards-and-engineering-governance",
      "children": [
        {
          "type": "text",
          "value": "9.14 ADRs, Code Review Standards, and Engineering Governance"
        }
      ]
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
          "value": "Engineering governance is not a slogan, but artifacts with owner, required fields, status and blocking rule. ADR records why decisions are made; review checklist checks changes; release checklist verifies deliverable evidence."
        }
      ]
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
          "value": "If ADR only writes the conclusion, latecomers will not know the alternatives; if review only looks at \"can run\", state ownership, Effect necessity, accessibility, security and rollback may all be missed."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Governance objects visualize artifact schema; Markdown files save durable decision history; React dashboard only displays summary; Git review/CI only execute gate. Accepted ADR should be superseded by the new ADR rather than silently rewriting history. There is no new React runtime API in this section."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed object shape with rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This exercise "
        },
        {
          "type": "inlineCode",
          "value": "GovernanceGate"
        },
        {
          "type": "text",
          "value": " Fixed "
        },
        {
          "type": "inlineCode",
          "value": "artifact"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "requiredFields"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "decisionOwner"
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
          "value": ". ADR contains at least context, decision, alternatives, and consequences; each item in the review checklist must be able to answer pass/fail/evidence; the release gate requires command result and rollback."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/14-adr-review-governance/governance-evidence-panel.tsx",
      "value": "type GovernanceGate = {\n  artifact: string\n  requiredFields: string[]\n  decisionOwner: string\n  status: 'ready' | 'needs-evidence'\n}\n\nconst governanceGates: GovernanceGate[] = [\n  {\n    artifact: 'Architecture decision record',\n    requiredFields: ['context', 'decision', 'alternatives', 'consequences', 'follow-up'],\n    decisionOwner: 'frontend architecture group',\n    status: 'ready',\n  },\n  {\n    artifact: 'Code review checklist',\n    requiredFields: ['state owner', 'effect necessity', 'accessibility', 'security', 'tests'],\n    decisionOwner: 'peer reviewer',\n    status: 'ready',\n  },\n  {\n    artifact: 'Release checklist',\n    requiredFields: ['lint', 'typecheck', 'test', 'build', 'rollback'],\n    decisionOwner: 'release owner',\n    status: 'needs-evidence',\n  },\n]\n\nexport function GovernanceEvidencePanel() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.14 ADR, review, and governance</p>\n      <h2>Governance artifacts turn decisions into executable gates</h2>\n      <div className=\"chapter15-grid\">\n        {governanceGates.map((gate) => (\n          <article className=\"chapter15-card\" key={gate.artifact}>\n            <h3>{gate.artifact}</h3>\n            <p>Owner: {gate.decisionOwner}</p>\n            <p>Fields: {gate.requiredFields.join(', ')}</p>\n            <strong\n              className={gate.status === 'ready' ? 'chapter15-pass' : 'chapter15-warn'}\n            >\n              {gate.status}\n            </strong>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and object changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Status union limits the display state; gates array saves required fields and owner; render "
        },
        {
          "type": "inlineCode",
          "value": "requiredFields"
        },
        {
          "type": "text",
          "value": " join into text and determined by status visual evidence. Here "
        },
        {
          "type": "inlineCode",
          "value": "ready"
        },
        {
          "type": "text",
          "value": " is sample data, which does not mean that the real release has passed; the real state must be generated by reviewed artifacts and command results."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Architectural change triggers ADR → author records context/alternatives/consequences → reviewer checks module/data/security boundaries according to checklist → CI runs commands → release owner collects evidence and rollback → status changes from needs-evidence to ready. TypeScript only checks the object shape and does not read Markdown quality or command result. The error signal is that the checklist is all checked but there is no link, test output, metric or owner."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Release gate shows needs-evidence, because the sample clearly lacks command / rollback evidence. Compared with ADR, which is written as an implementation journal, the key is \"why to choose and the cost\"; compared with checklist, which is written as \"pay attention to performance\", the executable items should require route metric or bundle diff."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "SellerHub feature public API decision-making enters ADR; each PR checks state/effect/API/accessibility/security; four gates are run before release and rollback is verified."
        }
      ]
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
          "value": "ADR saves the decision memory, review checks the change quality, CI provides machine evidence, and the release owner makes the final risk decision."
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
      "id": "915-mapping-the-sellerhub-production-architecture-project",
      "children": [
        {
          "type": "text",
          "value": "9.15 Mapping the SellerHub Production Architecture Project"
        }
      ]
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
          "value": "The production claim on the resume should be mapped to concern, owner, artifact and measurable outcome. Just writing \"React + TypeScript + Vite\" cannot prove architecture capabilities."
        }
      ]
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
          "value": "learning projects often use functional screenshots as all evidence, but there is no public API, adapter, error context, performance budget, security finding, ADR or migration plan."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Technical significance, new concepts and boundaries:"
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
          "value": "SellerHubArchitectureEvidence"
        },
        {
          "type": "text",
          "value": " connects architecture concern to owner, evidence and resume outcome. React displays the evidence catalog; real Git history, tests, build output, metrics, and docs are the proof. There is no new React runtime API in this section."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Fixed object shape with rule:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Each piece of evidence is fixed "
        },
        {
          "type": "inlineCode",
          "value": "concern"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "owner"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "evidence"
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "inlineCode",
          "value": "resumeOutcome"
        },
        {
          "type": "text",
          "value": ". The Resume bullet should describe \"what boundary decisions were made, what risks were reduced, and what results were used to prove it.\" It cannot make up production traffic or external services."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Real example code:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/15-sellerhub-production-map/sellerhub-production-map.tsx",
      "value": "type SellerHubArchitectureEvidence = {\n  concern: string\n  owner: string\n  evidence: string\n  resumeOutcome: string\n}\n\nconst sellerHubEvidence: SellerHubArchitectureEvidence[] = [\n  {\n    concern: 'Catalog UI',\n    owner: 'catalog feature',\n    evidence: 'public API and token-driven product components',\n    resumeOutcome: 'Defined feature and design-system boundaries.',\n  },\n  {\n    concern: 'Orders data',\n    owner: 'orders feature',\n    evidence: 'DTO validation, adapter, and normalized errors',\n    resumeOutcome: 'Protected UI from backend contract changes.',\n  },\n  {\n    concern: 'Release quality',\n    owner: 'delivery team',\n    evidence: 'flags, performance budget, review, and rollback gates',\n    resumeOutcome: 'Added measurable release governance.',\n  },\n  {\n    concern: 'Operations',\n    owner: 'frontend platform',\n    evidence: 'error context, privacy boundary, and security checks',\n    resumeOutcome: 'Improved production diagnosis and risk review.',\n  },\n]\n\nexport function SellerHubProductionMap() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">9.15 SellerHub production mapping</p>\n      <h2>Architecture claims require code, documents, and observable evidence</h2>\n      <div className=\"chapter15-grid\">\n        {sellerHubEvidence.map((item) => (\n          <article className=\"chapter15-card\" key={item.concern}>\n            <h3>{item.concern}</h3>\n            <p>Owner: {item.owner}</p>\n            <p>Evidence: {item.evidence}</p>\n            <strong>{item.resumeOutcome}</strong>\n          </article>\n        ))}\n      </div>\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Line-by-line explanation, execution flow and reference changes:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Type defines four evidence schema; module array saves four claims; render map creates cards and uses concern as stable sibling key. objects remain unchanged, only React elements are rebuilt on every render."
        }
      ]
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Interview question \"How to organize a large React project\" → learner select concern → show real public API / adapter / governance file → provide quality gate result or measured artifact → explain owner and tradeoff. TypeScript can only prove the demo object shape, but cannot prove the authenticity of the resume claim; it must be proved by repository file, test, build and documents. The error signal is that bullet only has a list of tools, no decision, risk or evidence."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "get the result, comparison and error:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "correspond to the four types of evidence: UI, data, release, and operations. Compared to writing \"Using Sentry, LaunchDarkly, OpenAPI\", this chapter does not install these tools, so it can only illustrate their location in the real architecture and cannot claim integration results."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "and SellerHub and the main learning line:"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This section organizes all capabilities of chapters 3–14 into SellerHub production narrative, but does not implement complete backend, auth, deployment or monitoring service."
        }
      ]
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
          "value": "Credible project statement = architecture decision + concrete artifact + validation evidence + honest boundary."
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
            "value": "Purpose of this chapter"
          }
        ],
        [
          {
            "type": "text",
            "value": "cannot prove anything"
          }
        ]
      ],
      "body": [
        [
          [
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
              "value": "Create module graph with public symbols"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not automatically prohibit deep import"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "import type"
            },
            {
              "type": "text",
              "value": " / "
            },
            {
              "type": "inlineCode",
              "value": "export type"
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
              "value": "clear type-only edge, erase"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not create runtime value"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "as const"
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
              "value": "reserved literal / readonly type"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not execute "
            },
            {
              "type": "inlineCode",
              "value": "Object.freeze()"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Record<K, V>"
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
              "value": "requires complete key/value mapping"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not validate external object"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "type predicate "
            },
            {
              "type": "inlineCode",
              "value": "value is T"
            }
          ],
          [
            {
              "type": "text",
              "value": "TypeScript + runtime function"
            }
          ],
          [
            {
              "type": "text",
              "value": "true branch narrowing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only the actual check of the function body can be trusted"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "URL"
            }
          ],
          [
            {
              "type": "text",
              "value": "JavaScript / browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "parsing protocol and URL"
            }
          ],
          [
            {
              "type": "text",
              "value": "HTTPS is not equal to the target content being trusted"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "encodeURIComponent()"
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
              "value": "encoding path/query value"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not execute authorization"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Intl.NumberFormat"
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
              "value": "locale-aware number / currency"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not decide the business currency"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "Intl.DateTimeFormat"
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
              "value": "locale-aware date/time"
            }
          ],
          [
            {
              "type": "text",
              "value": "Undecided source timezone policy"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useState"
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
              "value": "Save selected tab, locale, role, mock events"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not save server truth"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "useRef"
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
              "value": "Save DOM node references"
            }
          ],
          [
            {
              "type": "text",
              "value": "modify "
            },
            {
              "type": "inlineCode",
              "value": "current"
            },
            {
              "type": "text",
              "value": " does not trigger render"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ARIA tabs roles"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser accessibility"
            }
          ],
          [
            {
              "type": "text",
              "value": "Establish tab semantic relationship"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not replace keyboard implementation"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "rel=\"noopener noreferrer\""
            }
          ],
          [
            {
              "type": "text",
              "value": "HTML/browser"
            }
          ],
          [
            {
              "type": "text",
              "value": "limits opener and referrer"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not verify URL content"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "dangerouslySetInnerHTML"
            }
          ],
          [
            {
              "type": "text",
              "value": "React DOM escape hatch"
            }
          ],
          [
            {
              "type": "text",
              "value": "Submit raw HTML"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not automatically sanitize"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "PerformanceObserver"
            }
          ],
          [
            {
              "type": "text",
              "value": "browser platform"
            }
          ],
          [
            {
              "type": "text",
              "value": "Subscription performance entries"
            }
          ],
          [
            {
              "type": "text",
              "value": "does not automatically form product budget"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "OpenAPI description"
            }
          ],
          [
            {
              "type": "text",
              "value": "contract tooling"
            }
          ],
          [
            {
              "type": "text",
              "value": "client/docs/test generation source"
            }
          ],
          [
            {
              "type": "text",
              "value": "generated type does not verify any runtime JSON"
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
            "value": "Violated rule"
          }
        ],
        [
          {
            "type": "text",
            "value": "Concrete risk"
          }
        ],
        [
          {
            "type": "text",
            "value": "How to recognize"
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
              "value": "schema equals complex directory"
            }
          ],
          [
            {
              "type": "text",
              "value": "boundary must have owner/contract/gate"
            }
          ],
          [
            {
              "type": "text",
              "value": "Many documents but unclear responsibilities"
            }
          ],
          [
            {
              "type": "text",
              "value": "API change owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "Write dependency and decision evidence"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "shared import feature"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependency direction reverse"
            }
          ],
          [
            {
              "type": "text",
              "value": "cycle, business pollution"
            }
          ],
          [
            {
              "type": "text",
              "value": "shared file appears checkout/catalog import"
            }
          ],
          [
            {
              "type": "text",
              "value": "sink or stay feature"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "deep import feature internals"
            }
          ],
          [
            {
              "type": "text",
              "value": "public API bypassed"
            }
          ],
          [
            {
              "type": "text",
              "value": "Internal reconstruction affects the entire site"
            }
          ],
          [
            {
              "type": "text",
              "value": "import path through feature private folders"
            }
          ],
          [
            {
              "type": "text",
              "value": "only publishes narrow public API"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "primitive Send business request"
            }
          ],
          [
            {
              "type": "text",
              "value": "design system should not rely on feature"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI library is bound by business"
            }
          ],
          [
            {
              "type": "text",
              "value": "button import API client"
            }
          ],
          [
            {
              "type": "text",
              "value": "caller passes handler"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DTO directly enter JSX"
            }
          ],
          [
            {
              "type": "text",
              "value": "transport is not isolated from view"
            }
          ],
          [
            {
              "type": "text",
              "value": "backend rename Destroy the entire site"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX appears snake_case fields"
            }
          ],
          [
            {
              "type": "text",
              "value": "guard + adapter + view model"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Use TS type instead of runtime validation"
            }
          ],
          [
            {
              "type": "text",
              "value": "type erasure"
            }
          ],
          [
            {
              "type": "text",
              "value": "malformed JSON crossing the border"
            }
          ],
          [
            {
              "type": "inlineCode",
              "value": "as Dto"
            },
            {
              "type": "text",
              "value": " follows "
            },
            {
              "type": "inlineCode",
              "value": "response.json()"
            }
          ],
          [
            {
              "type": "text",
              "value": "execute guard"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Processing raw errors"
            }
          ],
          [
            {
              "type": "text",
              "value": "is missing normalization"
            }
          ],
          [
            {
              "type": "text",
              "value": "retry/message inconsistent"
            }
          ],
          [
            {
              "type": "text",
              "value": "Multiple inspections status/body"
            }
          ],
          [
            {
              "type": "text",
              "value": "Single normalizer"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "flag None owner/cleanup"
            }
          ],
          [
            {
              "type": "text",
              "value": "temporary branch none lifecycle"
            }
          ],
          [
            {
              "type": "text",
              "value": "Permanent complexity and test matrix"
            }
          ],
          [
            {
              "type": "text",
              "value": "Old flag No one is responsible"
            }
          ],
          [
            {
              "type": "text",
              "value": "metadata + retirement gate"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "UI permission when safe"
            }
          ],
          [
            {
              "type": "text",
              "value": "client is not authority"
            }
          ],
          [
            {
              "type": "text",
              "value": "API can be directly called"
            }
          ],
          [
            {
              "type": "text",
              "value": "server endpoint without authorization"
            }
          ],
          [
            {
              "type": "text",
              "value": "server-side authorization"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "i18n Replace only the text"
            }
          ],
          [
            {
              "type": "text",
              "value": "locale value unformatted"
            }
          ],
          [
            {
              "type": "text",
              "value": "currency/date Error"
            }
          ],
          [
            {
              "type": "text",
              "value": "JSX Hand-spelled symbols and date"
            }
          ],
          [
            {
              "type": "text",
              "value": "catalog + "
            },
            {
              "type": "inlineCode",
              "value": "Intl"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "observability only console"
            }
          ],
          [
            {
              "type": "text",
              "value": "is missing route/release context"
            }
          ],
          [
            {
              "type": "text",
              "value": "cannot be aggregated regression"
            }
          ],
          [
            {
              "type": "text",
              "value": "log None owner/context"
            }
          ],
          [
            {
              "type": "text",
              "value": "structured event"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "reporter record secrets"
            }
          ],
          [
            {
              "type": "text",
              "value": "privacy boundary destruction"
            }
          ],
          [
            {
              "type": "text",
              "value": "token/PII Leak"
            }
          ],
          [
            {
              "type": "text",
              "value": "payload contains password/token"
            }
          ],
          [
            {
              "type": "text",
              "value": "allowlist/redaction"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "budget only runs once"
            }
          ],
          [
            {
              "type": "text",
              "value": "gate does not last"
            }
          ],
          [
            {
              "type": "text",
              "value": "regression without blocking"
            }
          ],
          [
            {
              "type": "text",
              "value": "Only online screenshots"
            }
          ],
          [
            {
              "type": "text",
              "value": "route budget enter CI/monitoring"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "raw HTML without sanitizer"
            }
          ],
          [
            {
              "type": "text",
              "value": "unsafe sink"
            }
          ],
          [
            {
              "type": "text",
              "value": "XSS"
            }
          ],
          [
            {
              "type": "text",
              "value": "arbitrary "
            },
            {
              "type": "inlineCode",
              "value": "dangerouslySetInnerHTML"
            }
          ],
          [
            {
              "type": "text",
              "value": "text rendering or reviewed sanitizer"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "token put "
            },
            {
              "type": "inlineCode",
              "value": "localStorage"
            }
          ],
          [
            {
              "type": "text",
              "value": "JS readable persistent storage"
            }
          ],
          [
            {
              "type": "text",
              "value": "XSS can steal session"
            }
          ],
          [
            {
              "type": "text",
              "value": "auth code write access token"
            }
          ],
          [
            {
              "type": "text",
              "value": "server-managed secure session strategy"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "migration None rollback"
            }
          ],
          [
            {
              "type": "text",
              "value": "change irreversible"
            }
          ],
          [
            {
              "type": "text",
              "value": "outage recovery slow"
            }
          ],
          [
            {
              "type": "text",
              "value": "PR No recovery steps"
            }
          ],
          [
            {
              "type": "text",
              "value": "compatibility + independent revert"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ADR None alternatives"
            }
          ],
          [
            {
              "type": "text",
              "value": "decision context missing"
            }
          ],
          [
            {
              "type": "text",
              "value": "Duplicate argument"
            }
          ],
          [
            {
              "type": "text",
              "value": "The document only has the conclusion"
            }
          ],
          [
            {
              "type": "text",
              "value": "context/alternatives/consequences"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "review Only see if it can run"
            }
          ],
          [
            {
              "type": "text",
              "value": "quality dimensions missing"
            }
          ],
          [
            {
              "type": "text",
              "value": "a11y/security/perf Missing detection"
            }
          ],
          [
            {
              "type": "text",
              "value": "No evidence links"
            }
          ],
          [
            {
              "type": "text",
              "value": "executable checklist"
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
          "value": "final mini project is only used to integrate the mechanism of this chapter and does not replace the previous section teaching. "
        },
        {
          "type": "inlineCode",
          "value": "SellerHub Production Architecture Kit"
        },
        {
          "type": "text",
          "value": " combines public API, adapter, flag, i18n, observability, performance, security and governance artifacts into a runnable Vite dashboard; all data and external service results are local mocks and do not pretend to be real production integration."
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
                  "value": "uses design tokens to drive primitive buttons."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Use accessible compound tabs to switch architecture, operations and governance."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Let catalog / orders only expose public API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Put unknown DTO through runtime guard, adapter and view model."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "displays feature flag and RBAC UI decision at the same time, and declares server authority."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses message catalog and "
                },
                {
                  "type": "inlineCode",
                  "value": "Intl"
                },
                {
                  "type": "text",
                  "value": " displays locale-aware data."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses local error reporter to save release/route/feature context."
                }
              ]
            }
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
                  "value": "/catalog"
                },
                {
                  "type": "text",
                  "value": ", "
                },
                {
                  "type": "inlineCode",
                  "value": "/seller/orders"
                },
                {
                  "type": "text",
                  "value": " executes static performance budget."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "shows safe link, raw HTML, token storage, sensitive logging findings."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "completely retains ADR, review checklist and migration plan."
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
          "value": "It is not another \"big component demo\", but a set of modules with a direction: feature can rely on shared contract / design system, shared does not depend on feature; dashboard only combines capabilities through public API and shared helpers; governance Markdown records decisions and processes that cannot be expressed in code alone."
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
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The 18 files listed here have all been truly created, and the complete content is displayed in 12.5."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "final mini project structure",
      "value": "sellerhub-production-architecture-kit/\n  design-system/\n    tokens.ts\n    primitive-button.tsx\n    compound-tabs.tsx\n  features/\n    catalog/\n      catalog-public-api.ts\n    orders/\n      orders-public-api.ts\n  shared/\n    api/\n      sellerhub-api-contract.ts\n      sellerhub-api-adapter.ts\n    flags/\n      feature-flags.ts\n    i18n/\n      messages.ts\n      formatters.ts\n    observability/\n      error-reporter.ts\n    performance/\n      performance-budget.ts\n    security/\n      security-boundaries.ts\n  governance/\n    architecture-decision-record.md\n    code-review-checklist.md\n    migration-plan.md\n  sellerhub-production-dashboard.tsx\n  sellerhub-production-architecture-kit.tsx"
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "124-file-responsibility",
      "children": [
        {
          "type": "text",
          "value": "12.4 File Responsibility"
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
            "value": "File group"
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
              "value": "design-system/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save design decisions, native button contract and tabs accessibility behavior"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "features/catalog/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Publish catalog supported map / route capability"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "features/orders/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "release order-to-view-model capability"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "shared/api/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "validate DTO and isolate transport/domain/view shape"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "shared/flags/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save release lifecycle and UI capability evaluator"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "shared/i18n/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Separating message from locale formatting"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "shared/observability/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Create privacy-limited local error events"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "shared/performance/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "define route budget evaluator"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "shared/security/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Change browser sink risks to findings"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "governance/*"
            }
          ],
          [
            {
              "type": "text",
              "value": "Save decision, review and migration records"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-production-dashboard.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Combine all panels via public API"
            }
          ]
        ],
        [
          [
            {
              "type": "inlineCode",
              "value": "sellerhub-production-architecture-kit.tsx"
            }
          ],
          [
            {
              "type": "text",
              "value": "Export final project React entry"
            }
          ]
        ]
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "125-complete-code-and-engineering-documentation",
      "children": [
        {
          "type": "text",
          "value": "12.5 Complete code and engineering documentation"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Design System: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/tokens.ts",
      "value": "export const sellerHubTokens = {\n  color: {\n    action: '#0f766e',\n    actionHover: '#115e59',\n    danger: '#b42318',\n    surface: '#ffffff',\n    surfaceMuted: '#eef9f7',\n    text: '#17302f',\n  },\n  radius: {\n    control: 6,\n    panel: 8,\n  },\n  space: {\n    controlBlock: 9,\n    controlInline: 14,\n    panel: 20,\n  },\n} as const\n\nexport type SellerHubTokenSet = typeof sellerHubTokens"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "sellerHubTokens"
        },
        {
          "type": "text",
          "value": " is a runtime object; "
        },
        {
          "type": "inlineCode",
          "value": "SellerHubTokenSet"
        },
        {
          "type": "text",
          "value": " is a type derived from this value and erased after construction. Token names express action/surface/control intent, and the consumer does not need to copy hex and spacing."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/primitive-button.tsx",
      "value": "import type { ButtonHTMLAttributes, CSSProperties } from 'react'\nimport { sellerHubTokens } from './tokens'\n\ntype PrimitiveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  tone?: 'primary' | 'quiet' | 'danger'\n}\n\nconst toneStyles: Record<NonNullable<PrimitiveButtonProps['tone']>, CSSProperties> = {\n  primary: {\n    borderColor: sellerHubTokens.color.action,\n    color: sellerHubTokens.color.surface,\n    backgroundColor: sellerHubTokens.color.action,\n  },\n  quiet: {\n    borderColor: sellerHubTokens.color.action,\n    color: sellerHubTokens.color.action,\n    backgroundColor: sellerHubTokens.color.surface,\n  },\n  danger: {\n    borderColor: sellerHubTokens.color.danger,\n    color: sellerHubTokens.color.surface,\n    backgroundColor: sellerHubTokens.color.danger,\n  },\n}\n\nexport function PrimitiveButton({\n  style,\n  tone = 'primary',\n  type = 'button',\n  ...buttonProps\n}: PrimitiveButtonProps) {\n  const primitiveStyle: CSSProperties = {\n    minHeight: 40,\n    padding: `${sellerHubTokens.space.controlBlock}px ${sellerHubTokens.space.controlInline}px`,\n    borderStyle: 'solid',\n    borderWidth: 1,\n    borderRadius: sellerHubTokens.radius.control,\n    font: 'inherit',\n    fontWeight: 750,\n    cursor: 'pointer',\n    ...toneStyles[tone],\n    ...style,\n  }\n\n  return <button {...buttonProps} style={primitiveStyle} type={type} />\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Primitive retains native props, "
        },
        {
          "type": "inlineCode",
          "value": "toneStyles"
        },
        {
          "type": "text",
          "value": " forces all three tones to be fully covered, and the caller's style is merged last. It does not import catalog or API; the caller handler determines the transaction after the click occurs."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/compound-tabs.tsx",
      "value": "import { useRef } from 'react'\nimport type { KeyboardEvent, ReactNode } from 'react'\n\nexport type CompoundTabDefinition = {\n  id: string\n  label: string\n  content: ReactNode\n}\n\ntype CompoundTabsProps = {\n  activeId: string\n  ariaLabel: string\n  onChange: (tabId: string) => void\n  tabs: CompoundTabDefinition[]\n}\n\nexport function CompoundTabs({\n  activeId,\n  ariaLabel,\n  onChange,\n  tabs,\n}: CompoundTabsProps) {\n  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])\n  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]\n\n  function activate(index: number): void {\n    const tab = tabs[index]\n    onChange(tab.id)\n    tabRefs.current[index]?.focus()\n  }\n\n  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {\n    let nextIndex: number | null = null\n\n    if (event.key === 'ArrowRight') {\n      nextIndex = (index + 1) % tabs.length\n    } else if (event.key === 'ArrowLeft') {\n      nextIndex = (index - 1 + tabs.length) % tabs.length\n    } else if (event.key === 'Home') {\n      nextIndex = 0\n    } else if (event.key === 'End') {\n      nextIndex = tabs.length - 1\n    }\n\n    if (nextIndex === null) {\n      return\n    }\n\n    event.preventDefault()\n    activate(nextIndex)\n  }\n\n  return (\n    <div>\n      <div aria-label={ariaLabel} className=\"chapter15-tabs\" role=\"tablist\">\n        {tabs.map((tab, index) => (\n          <button\n            aria-controls={`kit-panel-${tab.id}`}\n            aria-selected={tab.id === activeTab.id}\n            className=\"chapter15-tab\"\n            id={`kit-tab-${tab.id}`}\n            key={tab.id}\n            onClick={() => onChange(tab.id)}\n            onKeyDown={(event) => handleKeyDown(event, index)}\n            ref={(node) => {\n              tabRefs.current[index] = node\n            }}\n            role=\"tab\"\n            tabIndex={tab.id === activeTab.id ? 0 : -1}\n            type=\"button\"\n          >\n            {tab.label}\n          </button>\n        ))}\n      </div>\n      <div\n        aria-labelledby={`kit-tab-${activeTab.id}`}\n        className=\"chapter15-tab-panel\"\n        id={`kit-panel-${activeTab.id}`}\n        role=\"tabpanel\"\n        tabIndex={0}\n      >\n        {activeTab.content}\n      </div>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Dashboard owns "
        },
        {
          "type": "inlineCode",
          "value": "activeId"
        },
        {
          "type": "text",
          "value": " state, compound component owns keyboard/ref/ARIA contract. "
        },
        {
          "type": "inlineCode",
          "value": "tabs[0]"
        },
        {
          "type": "text",
          "value": " fallback prevents unknown active id, but caller should still provide non-empty array; production API can be further tightened with non-empty tuple type."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Feature public APIs: "
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/catalog/catalog-public-api.ts",
      "value": "import type { Locale } from '../../shared/i18n/messages'\nimport type { CatalogProductDto } from '../../shared/api/sellerhub-api-contract'\nimport {\n  adaptCatalogProduct,\n  toCatalogProductViewModel,\n} from '../../shared/api/sellerhub-api-adapter'\nimport type { CatalogProductViewModel } from '../../shared/api/sellerhub-api-adapter'\n\nexport type { CatalogProductViewModel }\n\nexport const catalogFeatureApi = {\n  mapProduct(dto: CatalogProductDto, locale: Locale): CatalogProductViewModel {\n    const product = adaptCatalogProduct(dto)\n    return toCatalogProductViewModel(product, locale)\n  },\n  productRoute(productId: string): string {\n    return `/catalog/${encodeURIComponent(productId)}`\n  },\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Catalog public API depends on shared contract/adapter, the direction is feature → shared. Consumer does not need to import adapter and formatter respectively; type-only re-export retains supported type surface and does not add runtime binding."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/orders/orders-public-api.ts",
      "value": "import type { Locale } from '../../shared/i18n/messages'\nimport { formatCurrency, formatDate } from '../../shared/i18n/formatters'\n\nexport type SellerOrder = {\n  id: string\n  totalInCents: number\n  placedAt: Date\n  status: 'paid' | 'packing' | 'shipped'\n}\n\nexport type SellerOrderViewModel = {\n  id: string\n  totalLabel: string\n  placedLabel: string\n  statusLabel: string\n}\n\nconst statusLabels: Record<SellerOrder['status'], string> = {\n  paid: 'Paid',\n  packing: 'Packing',\n  shipped: 'Shipped',\n}\n\nexport const ordersFeatureApi = {\n  toViewModel(order: SellerOrder, locale: Locale): SellerOrderViewModel {\n    return {\n      id: order.id,\n      totalLabel: formatCurrency(locale, order.totalInCents),\n      placedLabel: formatDate(locale, order.placedAt),\n      statusLabel: statusLabels[order.status],\n    }\n  },\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Orders retains the business status mapping, and the shared formatter only handles locale mechanics. "
        },
        {
          "type": "inlineCode",
          "value": "Record<SellerOrder['status'], string>"
        },
        {
          "type": "text",
          "value": " allows typecheck to require label synchronization when adding status; runtime still needs to verify the external status first."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Shared API contract and adapter:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-contract.ts",
      "value": "export type CatalogProductDto = {\n  product_id: string\n  display_name: string\n  price_cents: number\n  stock_count: number\n}\n\nexport function isCatalogProductDto(value: unknown): value is CatalogProductDto {\n  if (typeof value !== 'object' || value === null) {\n    return false\n  }\n\n  const candidate = value as Record<string, unknown>\n  return (\n    typeof candidate.product_id === 'string' &&\n    typeof candidate.display_name === 'string' &&\n    typeof candidate.price_cents === 'number' &&\n    Number.isInteger(candidate.price_cents) &&\n    typeof candidate.stock_count === 'number' &&\n    Number.isInteger(candidate.stock_count)\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Guard performs property and integer checks on unknown objects; the type predicate only narrows the binding after returning true. It is a local minimal contract, not a disguise of OpenAPI generator or schema validator."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-adapter.ts",
      "value": "import type { CatalogProductDto } from './sellerhub-api-contract'\nimport type { Locale } from '../i18n/messages'\nimport { formatCurrency, formatNumber } from '../i18n/formatters'\n\nexport type CatalogProduct = {\n  id: string\n  name: string\n  priceInCents: number\n  stockCount: number\n}\n\nexport type CatalogProductViewModel = {\n  id: string\n  title: string\n  priceLabel: string\n  stockLabel: string\n}\n\nexport function adaptCatalogProduct(dto: CatalogProductDto): CatalogProduct {\n  return {\n    id: dto.product_id,\n    name: dto.display_name,\n    priceInCents: dto.price_cents,\n    stockCount: dto.stock_count,\n  }\n}\n\nexport function toCatalogProductViewModel(\n  product: CatalogProduct,\n  locale: Locale,\n): CatalogProductViewModel {\n  return {\n    id: product.id,\n    title: product.name,\n    priceLabel: formatCurrency(locale, product.priceInCents),\n    stockLabel: `${formatNumber(locale, product.stockCount)} in stock`,\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Adapter only relies on sibling shared modules and does not reverse import catalog feature. Each call creates new domain / view references; the source DTO is not modified."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Feature flags and locale:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/flags/feature-flags.ts",
      "value": "export type FeatureFlagKey = 'checkout-v2' | 'seller-analytics'\nexport type SellerPermission = 'checkout:preview' | 'checkout:publish' | 'analytics:view'\n\nexport type FeatureFlag = {\n  enabled: boolean\n  owner: string\n  cleanupDate: string\n}\n\nexport type CapabilityDecision = {\n  visible: boolean\n  reason: string\n}\n\nexport const sellerHubFlags: Record<FeatureFlagKey, FeatureFlag> = {\n  'checkout-v2': {\n    enabled: true,\n    owner: 'checkout-team',\n    cleanupDate: '2026-09-30',\n  },\n  'seller-analytics': {\n    enabled: false,\n    owner: 'seller-platform',\n    cleanupDate: '2026-08-15',\n  },\n}\n\nexport function evaluateCapability(input: {\n  flagKey: FeatureFlagKey\n  flags: Record<FeatureFlagKey, FeatureFlag>\n  permissions: SellerPermission[]\n  requiredPermission: SellerPermission\n}): CapabilityDecision {\n  if (!input.flags[input.flagKey].enabled) {\n    return { visible: false, reason: 'Release flag is disabled.' }\n  }\n\n  if (!input.permissions.includes(input.requiredPermission)) {\n    return { visible: false, reason: 'UI permission is missing.' }\n  }\n\n  return { visible: true, reason: 'Flag and UI permission allow the capability.' }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Flags is a static mock record; evaluator is a pure function. Each flag has owner/cleanup date to prevent boolean from leaving the release lifecycle."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/messages.ts",
      "value": "export type Locale = 'en-US' | 'en-GB'\nexport type MessageKey = 'catalogTitle' | 'ordersTitle' | 'releaseTitle'\n\nexport const sellerHubMessages: Record<Locale, Record<MessageKey, string>> = {\n  'en-US': {\n    catalogTitle: 'Catalog',\n    ordersTitle: 'Seller orders',\n    releaseTitle: 'Release readiness',\n  },\n  'en-GB': {\n    catalogTitle: 'Catalogue',\n    ordersTitle: 'Seller orders',\n    releaseTitle: 'Release readiness',\n  },\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Nested Record enforces locale/key completeness at compile time; translation correctness and fallback behavior still require linguistic review and tests."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/formatters.ts",
      "value": "import type { Locale } from './messages'\n\nexport function formatCurrency(locale: Locale, amountInCents: number): string {\n  return new Intl.NumberFormat(locale, {\n    style: 'currency',\n    currency: locale === 'en-US' ? 'USD' : 'GBP',\n  }).format(amountInCents / 100)\n}\n\nexport function formatDate(locale: Locale, date: Date): string {\n  return new Intl.DateTimeFormat(locale, {\n    dateStyle: 'medium',\n    timeZone: 'UTC',\n  }).format(date)\n}\n\nexport function formatNumber(locale: Locale, value: number): string {\n  return new Intl.NumberFormat(locale).format(value)\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The three functions unify the unit and timezone policy. A real commerce model should use currency as a domain field, rather than deriving it from the locale."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Observability, performance and security:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/observability/error-reporter.ts",
      "value": "export type ErrorReportContext = {\n  route: string\n  feature: string\n  release: string\n  sessionReference: string\n}\n\nexport type FrontendErrorEvent = ErrorReportContext & {\n  eventId: string\n  code: string\n  message: string\n  occurredAt: string\n}\n\nexport type ErrorReporter = {\n  getEvents: () => FrontendErrorEvent[]\n  report: (error: unknown, context: ErrorReportContext) => FrontendErrorEvent\n}\n\nexport function createErrorReporter(): ErrorReporter {\n  let events: FrontendErrorEvent[] = []\n\n  return {\n    getEvents(): FrontendErrorEvent[] {\n      return [...events]\n    },\n    report(error: unknown, context: ErrorReportContext): FrontendErrorEvent {\n      const knownError = error instanceof Error ? error : new Error('Unknown client error')\n      const event: FrontendErrorEvent = {\n        ...context,\n        eventId: `event-${Date.now()}-${events.length + 1}`,\n        code: knownError.name.toUpperCase(),\n        message: knownError.message,\n        occurredAt: new Date().toISOString(),\n      }\n      events = [event, ...events].slice(0, 5)\n      return event\n    },\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "createErrorReporter"
        },
        {
          "type": "text",
          "value": " closure privately save events; "
        },
        {
          "type": "inlineCode",
          "value": "getEvents()"
        },
        {
          "type": "text",
          "value": " returns copy to prevent the caller from modifying the internal array; "
        },
        {
          "type": "inlineCode",
          "value": "report()"
        },
        {
          "type": "text",
          "value": " replaces array reference. It is a local mock that does not send network, parse source map, or perform session replay."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/performance/performance-budget.ts",
      "value": "export type PerformanceBudgetStatus = 'pass' | 'warn' | 'fail'\n\nexport type RoutePerformanceSample = {\n  route: string\n  javascriptKb: number\n  lcpMs: number\n  inpMs: number\n  cls: number\n}\n\nexport type RoutePerformanceBudget = {\n  maxJavascriptKb: number\n  maxLcpMs: number\n  maxInpMs: number\n  maxCls: number\n}\n\nexport type PerformanceBudgetResult = {\n  route: string\n  status: PerformanceBudgetStatus\n  violations: string[]\n}\n\nexport const sellerHubRouteBudget: RoutePerformanceBudget = {\n  maxJavascriptKb: 180,\n  maxLcpMs: 2500,\n  maxInpMs: 200,\n  maxCls: 0.1,\n}\n\nexport function evaluatePerformanceBudget(\n  sample: RoutePerformanceSample,\n  budget: RoutePerformanceBudget,\n): PerformanceBudgetResult {\n  const violations = [\n    sample.javascriptKb > budget.maxJavascriptKb ? 'javascript' : null,\n    sample.lcpMs > budget.maxLcpMs ? 'lcp' : null,\n    sample.inpMs > budget.maxInpMs ? 'inp' : null,\n    sample.cls > budget.maxCls ? 'cls' : null,\n  ].filter((value): value is string => value !== null)\n\n  return {\n    route: sample.route,\n    status: violations.length === 0 ? 'pass' : violations.length === 1 ? 'warn' : 'fail',\n    violations,\n  }\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Budget evaluator is a pure deterministic function, suitable for unit test and CI adapter. Static samples cannot pretend to be field data."
        }
      ]
    },
    {
      "type": "code",
      "language": "ts",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/security/security-boundaries.ts",
      "value": "export type SecurityFinding = {\n  check: string\n  status: 'pass' | 'fail'\n  evidence: string\n}\n\nexport function safeExternalLinkProps(urlValue: string): {\n  href: string\n  rel: 'noopener noreferrer'\n  target: '_blank'\n} | null {\n  try {\n    const url = new URL(urlValue)\n    if (url.protocol !== 'https:') {\n      return null\n    }\n\n    return {\n      href: url.toString(),\n      rel: 'noopener noreferrer',\n      target: '_blank',\n    }\n  } catch {\n    return null\n  }\n}\n\nexport function inspectSecurityBoundaries(input: {\n  externalUrl: string\n  rendersRawHtml: boolean\n  storesAccessToken: boolean\n  loggedFields: string[]\n}): SecurityFinding[] {\n  const sensitiveKeys = new Set(['accessToken', 'password', 'sessionId'])\n  const loggedSensitiveKeys = input.loggedFields.filter((field) => sensitiveKeys.has(field))\n\n  return [\n    {\n      check: 'External link',\n      status: safeExternalLinkProps(input.externalUrl) === null ? 'fail' : 'pass',\n      evidence: input.externalUrl,\n    },\n    {\n      check: 'Raw HTML',\n      status: input.rendersRawHtml ? 'fail' : 'pass',\n      evidence: input.rendersRawHtml ? 'Unsafe HTML requested' : 'Text rendering retained',\n    },\n    {\n      check: 'Token storage',\n      status: input.storesAccessToken ? 'fail' : 'pass',\n      evidence: input.storesAccessToken ? 'Browser storage used' : 'No access token stored',\n    },\n    {\n      check: 'Sensitive logging',\n      status: loggedSensitiveKeys.length === 0 ? 'pass' : 'fail',\n      evidence:\n        loggedSensitiveKeys.length === 0 ? 'No sensitive keys' : loggedSensitiveKeys.join(', '),\n    },\n  ]\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "inlineCode",
          "value": "safeExternalLinkProps"
        },
        {
          "type": "text",
          "value": " outputs a group that can be spread to "
        },
        {
          "type": "inlineCode",
          "value": "<a>"
        },
        {
          "type": "text",
          "value": "; inspector converts four types of risks into review findings. It does not deploy CSP, verify server auth, or sanitize HTML."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Complete engineering document:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/architecture-decision-record.md",
      "value": "# ADR-001: Feature Public APIs and Design System Boundary\n\n## Status\n\nAccepted\n\n## Context\n\nSellerHub needs catalog and orders features that can evolve without exposing internal files. Shared UI must remain free of product-specific requests and permissions.\n\n## Decision\n\nEach feature publishes a small public API. Product features may depend on shared contracts and design-system primitives. Shared modules must not import product features.\n\n## Alternatives\n\n- Keep a technical folder structure and allow deep imports.\n- Place all reusable code in a global shared directory.\n- Create package workspaces before module ownership is stable.\n\n## Consequences\n\n- Consumers have fewer supported import paths.\n- Internal feature refactors do not require application-wide changes.\n- Public API changes require explicit migration notes.\n- Dependency direction must be checked during review.\n\n## Follow-up\n\n- Add import-boundary automation when the repository needs it.\n- Review feature exports before each release.\n- Supersede this ADR if the project later adopts package workspaces."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "ADR pushes from context to decision, and then retains rejected alternatives, consequences, and follow-up; it does not claim that the current project has a monorepo enabled. If the direction changes after Accepted, superseding ADR should be added."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/code-review-checklist.md",
      "value": "# SellerHub Frontend Code Review Checklist\n\n## Component and State\n\n- [ ] Component responsibility is narrow and named clearly.\n- [ ] State owner is the lowest common owner that needs the value.\n- [ ] Derived values are calculated instead of duplicated in state.\n- [ ] Effects synchronize external systems and are not used for ordinary calculations.\n\n## Boundaries\n\n- [ ] Feature consumers import from the public API.\n- [ ] Shared modules do not import business features.\n- [ ] Network DTOs pass runtime validation before adaptation.\n- [ ] UI permission checks are not described as server authorization.\n\n## User Experience\n\n- [ ] Interactive controls have accessible names and keyboard behavior.\n- [ ] Loading, error, empty, success, and disabled states are explicit.\n- [ ] Locale-sensitive numbers, dates, and currency use approved formatters.\n\n## Quality and Risk\n\n- [ ] Tests cover the changed business behavior and failure path.\n- [ ] Performance evidence exists for route-cost changes.\n- [ ] Logs exclude tokens, passwords, and direct session identifiers.\n- [ ] Unsafe HTML and external links pass security review.\n- [ ] Feature flags have an owner and cleanup date.\n- [ ] Rollback steps are documented before release approval."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Checklist corresponds to the mechanism in the previous chapter and cannot be fully checked mechanically. Review comments should be linked to source path, test, metric, ADR or rollback evidence."
        }
      ]
    },
    {
      "type": "code",
      "language": "txt",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/migration-plan.md",
      "value": "# SellerHub Frontend Architecture Migration Plan\n\n## Goal\n\nMove from cross-feature imports and direct DTO rendering to feature public APIs, adapters, and governed shared modules without a full rewrite.\n\n## Inventory\n\n- Record deep imports between catalog, orders, checkout, and shared modules.\n- Record DTO fields consumed directly by React components.\n- Record duplicate buttons, formatters, error handlers, and permission checks.\n- Classify each dependency as low, medium, or high risk.\n\n## Compatibility Layer\n\n- Publish public APIs while existing deep imports still work.\n- Add DTO-to-domain adapters beside the existing request layer.\n- Wrap legacy controls with token-driven primitive components.\n- Keep old routes available while new feature entry points are verified.\n\n## Migration Sequence\n\n1. Migrate catalog reads through runtime validation and adapters.\n2. Migrate orders imports to the feature public API.\n3. Replace duplicate controls with reviewed primitives.\n4. Add release flags with owners and cleanup dates.\n5. Remove compatibility exports only after quality gates pass.\n\n## Quality Gates\n\n- Lint, typecheck, tests, and production build pass.\n- Route performance samples stay within the approved budget.\n- Accessibility and security review findings are resolved.\n- Error events include release, route, and feature context without secrets.\n\n## Rollback\n\n- Restore the previous feature export for the affected route.\n- Disable the release flag for migrated behavior.\n- Route API data through the legacy mapper.\n- Revert retirement commits independently from compatibility commits.\n\n## Completion Criteria\n\n- No application code deep-imports feature internals.\n- React components consume view models instead of raw DTOs.\n- Deprecated compatibility exports have no consumers.\n- The final release checklist includes migration and rollback evidence."
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Plan connects inventory, compatibility, sequence, gates, rollback and completion into one process. A migration without completion criteria will stay in the compatibility layer for a long time; a migration without independent rollback will bind all failures to one big revert."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "Dashboard and final entrance:"
            }
          ]
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-dashboard.tsx",
      "value": "import { useState } from 'react'\nimport type { CompoundTabDefinition } from './design-system/compound-tabs'\nimport { CompoundTabs } from './design-system/compound-tabs'\nimport { PrimitiveButton } from './design-system/primitive-button'\nimport { catalogFeatureApi } from './features/catalog/catalog-public-api'\nimport { ordersFeatureApi } from './features/orders/orders-public-api'\nimport type { SellerOrder } from './features/orders/orders-public-api'\nimport { isCatalogProductDto } from './shared/api/sellerhub-api-contract'\nimport {\n  evaluateCapability,\n  sellerHubFlags,\n} from './shared/flags/feature-flags'\nimport type { SellerPermission } from './shared/flags/feature-flags'\nimport { sellerHubMessages } from './shared/i18n/messages'\nimport type { Locale } from './shared/i18n/messages'\nimport { createErrorReporter } from './shared/observability/error-reporter'\nimport {\n  evaluatePerformanceBudget,\n  sellerHubRouteBudget,\n} from './shared/performance/performance-budget'\nimport {\n  inspectSecurityBoundaries,\n  safeExternalLinkProps,\n} from './shared/security/security-boundaries'\n\nconst productResponse: unknown = {\n  product_id: 'product-901',\n  display_name: 'Seller Work Desk',\n  price_cents: 24900,\n  stock_count: 38,\n}\n\nconst sellerOrder: SellerOrder = {\n  id: 'order-2048',\n  totalInCents: 18450,\n  placedAt: new Date('2026-06-25T08:30:00.000Z'),\n  status: 'packing',\n}\n\nconst routeSamples = [\n  { route: '/catalog', javascriptKb: 164, lcpMs: 2180, inpMs: 165, cls: 0.04 },\n  { route: '/seller/orders', javascriptKb: 196, lcpMs: 2720, inpMs: 205, cls: 0.08 },\n]\n\nexport function SellerHubProductionDashboard() {\n  const [activeTabId, setActiveTabId] = useState('architecture')\n  const [locale, setLocale] = useState<Locale>('en-US')\n  const [role, setRole] = useState<'viewer' | 'seller-admin'>('viewer')\n  const [reportRevision, setReportRevision] = useState(0)\n  const [errorReporter] = useState(createErrorReporter)\n  const messages = sellerHubMessages[locale]\n  const permissions: SellerPermission[] =\n    role === 'seller-admin'\n      ? ['checkout:preview', 'checkout:publish', 'analytics:view']\n      : ['checkout:preview']\n  const checkoutDecision = evaluateCapability({\n    flagKey: 'checkout-v2',\n    flags: sellerHubFlags,\n    permissions,\n    requiredPermission: 'checkout:publish',\n  })\n  const productViewModel = isCatalogProductDto(productResponse)\n    ? catalogFeatureApi.mapProduct(productResponse, locale)\n    : null\n  const orderViewModel = ordersFeatureApi.toViewModel(sellerOrder, locale)\n  const budgetResults = routeSamples.map((sample) =>\n    evaluatePerformanceBudget(sample, sellerHubRouteBudget),\n  )\n  const securityFindings = inspectSecurityBoundaries({\n    externalUrl: 'https://seller.example/policy',\n    rendersRawHtml: false,\n    storesAccessToken: false,\n    loggedFields: ['release', 'route', 'feature', 'errorCode'],\n  })\n  const policyLink = safeExternalLinkProps('https://example.com/seller-policy')\n  const errorEvents = errorReporter.getEvents()\n\n  function reportMockError(): void {\n    errorReporter.report(new Error('Orders summary unavailable.'), {\n      route: '/seller/orders',\n      feature: 'orders-summary',\n      release: 'sellerhub-2026.06',\n      sessionReference: 'anonymous-session',\n    })\n    setReportRevision((currentRevision) => currentRevision + 1)\n  }\n\n  const tabs: CompoundTabDefinition[] = [\n    {\n      id: 'architecture',\n      label: 'Architecture',\n      content: (\n        <div className=\"chapter15-grid\">\n          <article className=\"chapter15-card\">\n            <h3>{messages.catalogTitle}</h3>\n            {productViewModel ? (\n              <>\n                <strong>{productViewModel.title}</strong>\n                <p>{productViewModel.priceLabel}</p>\n                <p>{productViewModel.stockLabel}</p>\n                <code>{catalogFeatureApi.productRoute(productViewModel.id)}</code>\n              </>\n            ) : (\n              <p>Catalog contract rejected.</p>\n            )}\n          </article>\n          <article className=\"chapter15-card\">\n            <h3>{messages.ordersTitle}</h3>\n            <strong>{orderViewModel.id}</strong>\n            <p>{orderViewModel.totalLabel}</p>\n            <p>\n              {orderViewModel.placedLabel} | {orderViewModel.statusLabel}\n            </p>\n          </article>\n          <article className=\"chapter15-card\">\n            <h3>Capability boundary</h3>\n            <p>{checkoutDecision.reason}</p>\n            <strong className={checkoutDecision.visible ? 'chapter15-pass' : 'chapter15-warn'}>\n              {checkoutDecision.visible ? 'Publish visible' : 'Publish hidden'}\n            </strong>\n          </article>\n        </div>\n      ),\n    },\n    {\n      id: 'operations',\n      label: 'Operations',\n      content: (\n        <div className=\"chapter15-grid\">\n          {budgetResults.map((result) => (\n            <article className=\"chapter15-card\" key={result.route}>\n              <h3>{result.route}</h3>\n              <strong className={`chapter15-${result.status}`}>{result.status}</strong>\n              <p>\n                {result.violations.length === 0\n                  ? 'Performance budget passed.'\n                  : `Exceeded: ${result.violations.join(', ')}`}\n              </p>\n            </article>\n          ))}\n          <article className=\"chapter15-card\" data-report-revision={reportRevision}>\n            <h3>Error reports</h3>\n            <p>{errorEvents.length} mock event(s)</p>\n            <PrimitiveButton onClick={reportMockError}>Report mock error</PrimitiveButton>\n            {errorEvents[0] ? (\n              <code>\n                {errorEvents[0].release} | {errorEvents[0].route} |{' '}\n                {errorEvents[0].feature}\n              </code>\n            ) : null}\n          </article>\n        </div>\n      ),\n    },\n    {\n      id: 'governance',\n      label: 'Governance',\n      content: (\n        <div className=\"chapter15-grid\">\n          <article className=\"chapter15-card\">\n            <h3>ADR-001</h3>\n            <p>Feature public APIs and design-system dependency direction are accepted.</p>\n          </article>\n          <article className=\"chapter15-card\">\n            <h3>Migration</h3>\n            <p>Inventory, compatibility, migration, retirement, and rollback are defined.</p>\n          </article>\n          <article className=\"chapter15-card\">\n            <h3>Review gate</h3>\n            <p>State, effects, accessibility, tests, performance, and security require evidence.</p>\n          </article>\n          <article className=\"chapter15-card\">\n            <h3>Security findings</h3>\n            <p>\n              {securityFindings.filter((finding) => finding.status === 'pass').length}/\n              {securityFindings.length} checks passed.\n            </p>\n            {policyLink ? (\n              <a className=\"chapter15-link\" {...policyLink}>\n                Seller policy\n              </a>\n            ) : null}\n          </article>\n        </div>\n      ),\n    },\n  ]\n\n  return (\n    <div>\n      <div className=\"chapter15-actions\">\n        <label className=\"chapter15-control\">\n          Locale\n          <select\n            onChange={(event) => setLocale(event.currentTarget.value as Locale)}\n            value={locale}\n          >\n            <option value=\"en-US\">en-US</option>\n            <option value=\"en-GB\">en-GB</option>\n          </select>\n        </label>\n        <label className=\"chapter15-control\">\n          Role\n          <select\n            onChange={(event) =>\n              setRole(event.currentTarget.value as 'viewer' | 'seller-admin')\n            }\n            value={role}\n          >\n            <option value=\"viewer\">viewer</option>\n            <option value=\"seller-admin\">seller-admin</option>\n          </select>\n        </label>\n        <PrimitiveButton tone=\"quiet\">{messages.releaseTitle}</PrimitiveButton>\n      </div>\n      <CompoundTabs\n        activeId={activeTabId}\n        ariaLabel=\"SellerHub production architecture\"\n        onChange={setActiveTabId}\n        tabs={tabs}\n      />\n      <p className=\"chapter15-note\">\n        UI permission is not server authorization. Metrics and reports are local mock evidence.\n      </p>\n    </div>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Dashboard is the architectural evidence of this chapter: it relies on the design system, feature public APIs and shared capabilities; shared modules do not import dashboard or feature. The four state cells have tab, locale, role and local reporter revision respectively; all view models, permission decisions, budget results and findings are derived values ​​of the current render."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "clicks report, the reporter in the closure updates the private events array, and then passes "
        },
        {
          "type": "inlineCode",
          "value": "setReportRevision"
        },
        {
          "type": "text",
          "value": " requests React to generate a new snapshot; the next render calls "
        },
        {
          "type": "inlineCode",
          "value": "getEvents()"
        },
        {
          "type": "text",
          "value": " gets copy and displays the latest event. Directly modifying the reporter closure will not automatically notify React, so the revision state is an explicit render signal."
        }
      ]
    },
    {
      "type": "code",
      "language": "tsx",
      "label": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-architecture-kit.tsx",
      "value": "import { SellerHubProductionDashboard } from './sellerhub-production-dashboard'\n\nexport function SellerHubProductionArchitectureKit() {\n  return (\n    <section className=\"chapter15-panel\">\n      <p className=\"chapter15-eyebrow\">Final project</p>\n      <h2>SellerHub Production Architecture Kit</h2>\n      <p>\n        This local dashboard integrates public APIs, adapters, release controls,\n        observability, performance, security, and governance without external services.\n      </p>\n      <SellerHubProductionDashboard />\n    </section>\n  )\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The final entrance is only responsible for composition and does not copy business logic. The chapter adapter then imports this entry and mounts it together with the first 15 panels."
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
                  "value": "Vite from "
                },
                {
                  "type": "inlineCode",
                  "value": "src/App.tsx"
                },
                {
                  "type": "text",
                  "value": " creates Chapter 15 chunk and loads the chapter adapter."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Adapter import 15 core panels and "
                },
                {
                  "type": "inlineCode",
                  "value": "SellerHubProductionArchitectureKit"
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
                  "value": "Dashboard creates four React state cells for the first render; "
                },
                {
                  "type": "inlineCode",
                  "value": "createErrorReporter"
                },
                {
                  "type": "text",
                  "value": " is only executed during state initialization."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Unknown product response by "
                },
                {
                  "type": "inlineCode",
                  "value": "isCatalogProductDto"
                },
                {
                  "type": "text",
                  "value": "; true branch enters catalog public API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Catalog API creates domain model and locale-specific view model; orders public API creates order view model independently."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Flag evaluator reads current role permissions and release flag to generate UI-only capability decision."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Budget/security pure functions produce result objects from static samples."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Compound tabs will current "
                },
                {
                  "type": "inlineCode",
                  "value": "activeTabId"
                },
                {
                  "type": "text",
                  "value": " is mapped to a visible panel and maintains focus / ARIA contract."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Locale or role change updates the corresponding state cell; the next render re-derives messages, view models and decisions."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Mock error report updates the closure private array, and then uses revision state to notify React render."
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
              "value": "Runtime, type and toolchain boundaries:"
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
                  "value": "JavaScript runtime actually creates DTO, domain, view, decision, event, metric and finding objects."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React only manages dashboard state snapshots, event handlers and UI commits."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Browser provides event, focus, URL, Intl, Date and DOM accessibility tree."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Check import/export, object shape, union and function signatures; types are erased at runtime."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Vite parses the ESM graph and generates bundles; it does not automatically determine the business layer direction."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "ESLint, typecheck, tests, build and peer review provide different evidence; currently the helper cannot impersonate a CI provider."
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
      "id": "127-operation-mode-and-expected-results",
      "children": [
        {
          "type": "text",
          "value": "12.7 Operation mode and expected results"
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
          "value": "Visit "
        },
        {
          "type": "inlineCode",
          "value": "/react/chapter-15"
        },
        {
          "type": "text",
          "value": ", you should see 15 core panels and the final dashboard. Dashboard:"
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
                  "value": "en-US"
                },
                {
                  "type": "text",
                  "value": " / "
                },
                {
                  "type": "inlineCode",
                  "value": "en-GB"
                },
                {
                  "type": "text",
                  "value": " Change catalog spelling, currency and date."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "viewer"
                },
                {
                  "type": "text",
                  "value": " hide publish capability, "
                },
                {
                  "type": "inlineCode",
                  "value": "seller-admin"
                },
                {
                  "type": "text",
                  "value": " displays it."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Arrow keys move focus and selection between tabs."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Report button increases local mock error count and displays release/route/feature."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "/catalog"
                },
                {
                  "type": "text",
                  "value": " performance sample is pass, "
                },
                {
                  "type": "inlineCode",
                  "value": "/seller/orders"
                },
                {
                  "type": "text",
                  "value": " is fail."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Security panel shows four local findings; the page clearly states that this is not server authorization or real monitoring."
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
                  "value": "Dashboard deep import feature internals: should be changed to public API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Shared adapter import catalog feature type: Even if it is a type-only edge, it violates the shared → feature direction of this chapter; the view model type should be left in the shared adapter or re-exported by the public API."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Reporter closure changes but UI does not update: mutation of non-React value will not trigger render and requires explicit state signal or external store integration."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "treats static metrics as field data: provenance, window, percentile and device segment must be retained."
                }
              ]
            }
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
                  "value": "as Locale"
                },
                {
                  "type": "text",
                  "value": " accepts any URL value: runtime validation should be done with the supported locale list first."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "only hides the button: server mutation still requires authorization."
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
              "value": "Optional extension:"
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
                  "value": "Adds Vitest tests for dependency evaluator, DTO guard, budget evaluator and security helper."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Use the existing test stack to add role/keyboard behavior tests for compound tabs."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "adds source, capturedAt, deviceClass and percentile fields for route samples."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "adds ADR supersedes relationship and release exception expiry."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "evaluates the import-boundary lint, OpenAPI generator, observability SDK and i18n library in the future real SellerHub repo; not installed for the current chapter."
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
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "The production-grade React architecture defines module/data/UI/security/operations/change boundaries so that every change has owner, contract, evidence and rollback."
        }
      ]
    },
    {
      "type": "heading",
      "depth": 3,
      "id": "common-boundary-quick-check",
      "children": [
        {
          "type": "text",
          "value": "Common boundary quick check"
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
            "value": "Concern"
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
            "value": "Owner"
          }
        ],
        [
          {
            "type": "text",
            "value": "Output"
          }
        ],
        [
          {
            "type": "text",
            "value": "Gate"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Design system"
            }
          ],
          [
            {
              "type": "text",
              "value": "tokens + a11y rules"
            }
          ],
          [
            {
              "type": "text",
              "value": "UI platform"
            }
          ],
          [
            {
              "type": "text",
              "value": "primitive / compound API"
            }
          ],
          [
            {
              "type": "text",
              "value": "component review"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Feature"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain data + intent"
            }
          ],
          [
            {
              "type": "text",
              "value": "product squad"
            }
          ],
          [
            {
              "type": "text",
              "value": "public API"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependency check"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "API"
            }
          ],
          [
            {
              "type": "text",
              "value": "unknown response"
            }
          ],
          [
            {
              "type": "text",
              "value": "data boundary"
            }
          ],
          [
            {
              "type": "text",
              "value": "domain/view model"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime validation"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Release"
            }
          ],
          [
            {
              "type": "text",
              "value": "flag + evidence"
            }
          ],
          [
            {
              "type": "text",
              "value": "release owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "enabled capability"
            }
          ],
          [
            {
              "type": "text",
              "value": "cleanup / rollback"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Observability"
            }
          ],
          [
            {
              "type": "text",
              "value": "runtime event"
            }
          ],
          [
            {
              "type": "text",
              "value": "platform"
            }
          ],
          [
            {
              "type": "text",
              "value": "contextual event"
            }
          ],
          [
            {
              "type": "text",
              "value": "privacy review"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Performance"
            }
          ],
          [
            {
              "type": "text",
              "value": "route samples"
            }
          ],
          [
            {
              "type": "text",
              "value": "route owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "budget result"
            }
          ],
          [
            {
              "type": "text",
              "value": "CI / monitoring"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Security"
            }
          ],
          [
            {
              "type": "text",
              "value": "source + sink"
            }
          ],
          [
            {
              "type": "text",
              "value": "security owners"
            }
          ],
          [
            {
              "type": "text",
              "value": "findings / controls"
            }
          ],
          [
            {
              "type": "text",
              "value": "server + client review"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Migration"
            }
          ],
          [
            {
              "type": "text",
              "value": "inventory + risk"
            }
          ],
          [
            {
              "type": "text",
              "value": "change owner"
            }
          ],
          [
            {
              "type": "text",
              "value": "staged rollout"
            }
          ],
          [
            {
              "type": "text",
              "value": "quality + rollback"
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
            "value": "Key difference"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Component library"
            }
          ],
          [
            {
              "type": "text",
              "value": "Design System"
            }
          ],
          [
            {
              "type": "text",
              "value": "The latter also includes tokens, rules, a11y, docs, versioning"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Feature public API"
            }
          ],
          [
            {
              "type": "text",
              "value": "Barrel export all"
            }
          ],
          [
            {
              "type": "text",
              "value": "The former reduces the supported surface, while the latter may expose all internals"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "DTO"
            }
          ],
          [
            {
              "type": "text",
              "value": "Domain model"
            }
          ],
          [
            {
              "type": "text",
              "value": "transport shape and internal business semantics"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Domain model"
            }
          ],
          [
            {
              "type": "text",
              "value": "View model"
            }
          ],
          [
            {
              "type": "text",
              "value": "business values and render-ready strings"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Feature flag"
            }
          ],
          [
            {
              "type": "text",
              "value": "Permission"
            }
          ],
          [
            {
              "type": "text",
              "value": "release decision and user capability"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "UI guard"
            }
          ],
          [
            {
              "type": "text",
              "value": "Authorization"
            }
          ],
          [
            {
              "type": "text",
              "value": "user experience and server security"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Error object"
            }
          ],
          [
            {
              "type": "text",
              "value": "Error event"
            }
          ],
          [
            {
              "type": "text",
              "value": "failure value and report"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Metric"
            }
          ],
          [
            {
              "type": "text",
              "value": "Budget"
            }
          ],
          [
            {
              "type": "text",
              "value": "observed fact and acceptable threshold"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "ADR"
            }
          ],
          [
            {
              "type": "text",
              "value": "Implementation note"
            }
          ],
          [
            {
              "type": "text",
              "value": "decision rationale and coding detail"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Migration"
            }
          ],
          [
            {
              "type": "text",
              "value": "Rewrite"
            }
          ],
          [
            {
              "type": "text",
              "value": "staged compatibility/rollback with one-time replacement"
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
        null
      ],
      "head": [
        [
          {
            "type": "text",
            "value": "Signal"
          }
        ],
        [
          {
            "type": "text",
            "value": "Likely boundary failure"
          }
        ]
      ],
      "body": [
        [
          [
            {
              "type": "text",
              "value": "Internal file rename changes many features"
            }
          ],
          [
            {
              "type": "text",
              "value": "missing public API"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Shared helper imports checkout type"
            }
          ],
          [
            {
              "type": "text",
              "value": "dependency inversion"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "JSX reads "
            },
            {
              "type": "inlineCode",
              "value": "price_cents"
            }
          ],
          [
            {
              "type": "text",
              "value": "DTO leakage"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Production log cannot identify release"
            }
          ],
          [
            {
              "type": "text",
              "value": "observability context missing"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Hidden button but API succeeds"
            }
          ],
          [
            {
              "type": "text",
              "value": "authorization missing"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Flag older than cleanup date"
            }
          ],
          [
            {
              "type": "text",
              "value": "release debt"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Performance dashboard has no source"
            }
          ],
          [
            {
              "type": "text",
              "value": "unverifiable metric"
            }
          ]
        ],
        [
          [
            {
              "type": "text",
              "value": "Migration PR cannot be independently reverted"
            }
          ],
          [
            {
              "type": "text",
              "value": "rollback boundary missing"
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
      "language": "ts",
      "label": "Template: boundary record",
      "value": "type BoundaryRecord<Input, Output> = {\n  owner: string\n  adapt: (input: Input) => Output\n  evidence: string[]\n  rollback: string\n}"
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "is only used for notes and is not a real file that needs to be created. It reminds you that any boundary must connect owner, transformation, evidence and rollback."
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
                  "value": "docs/react/chapter-15-production-frontend-architecture/react-chapter-15-learning-guide.md"
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
      "id": "the-core-mechanism-of-this-chapterthe-real-file",
      "children": [
        {
          "type": "text",
          "value": "The core mechanism of this chapterThe real file"
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
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/01-production-architecture-map/production-architecture-map.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/02-design-tokens-primitive-ui/design-token-primitive-boundary.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/03-compound-accessibility-contract/accessible-compound-tabs.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/catalog-feature-public-api.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/feature-public-api-boundary.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/05-shared-feature-boundary/dependency-direction-audit.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/06-api-contract-adapter/api-contract-adapter-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/07-error-normalization-client-boundary/error-normalization-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/08-feature-flags-rbac-release/feature-flag-permission-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/09-i18n-locale-formatting/locale-formatting-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/10-observability-error-reporting/observability-event-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/11-performance-budget-web-vitals/performance-budget-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/12-security-boundary-checks/security-boundary-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/13-migration-strategy/migration-strategy-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/14-adr-review-governance/governance-evidence-panel.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/15-sellerhub-production-map/sellerhub-production-map.tsx"
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
      "id": "final-mini-project-real-file",
      "children": [
        {
          "type": "text",
          "value": "final mini project real file"
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
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/tokens.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/primitive-button.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/compound-tabs.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/catalog/catalog-public-api.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/orders/orders-public-api.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-contract.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-adapter.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/flags/feature-flags.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/messages.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/formatters.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/observability/error-reporter.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/performance/performance-budget.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/security/security-boundaries.ts"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/architecture-decision-record.md"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/code-review-checklist.md"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/migration-plan.md"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-dashboard.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-architecture-kit.tsx"
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
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/chapter-15-practice-root.tsx"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "src/learning/react/chapter-15-production-frontend-architecture/chapter-15-practice.css"
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
                  "value": "Snippet: deep feature import"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "Snippet: DTO rendered directly"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "Snippet: UI permission mistaken for authorization"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "Snippet: sensitive error report"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "inlineCode",
                  "value": "Template: boundary record"
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
                  "value": "draws "
                },
                {
                  "type": "inlineCode",
                  "value": "owner → input → transformation → output → consumer → gate"
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
                  "value": "Select an edge from the real source import graph and explain why the direction is allowed or blocked."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "uses the same API response to handwrite three columns of DTO, domain, and view model."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "is a flag that records owner, targeting, test matrix, cleanup and rollback."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Use a real PR to simulate ADR / review checklist / release evidence."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Rewrite \"I used a certain tool\" into \"Which boundary risk did I solve and what artifact was used to prove it\"."
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
                  "value": "Why is production architecture not equal to complex directory?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Design System have than ordinary component libraries?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "What are the differences among owners of Primitive, business, feature, page, layout, and data components?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Public API How to reduce refactor blast radius? Why is Barrel export not necessarily a public API?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Shared What graph structure problems will the reverse import feature cause?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "DTO, domain model, view model serve which boundary respectively?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "TypeScript Why can't I verify "
                },
                {
                  "type": "inlineCode",
                  "value": "response.json()"
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
                  "value": "Generated client and runtime validation / error normalization how to divide the work?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Feature flag Why is owner and cleanup plan necessary?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "UI RBAC Why is it not a real authorization?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Message catalog and "
                },
                {
                  "type": "inlineCode",
                  "value": "Intl"
                },
                {
                  "type": "text",
                  "value": " formatter Why should we separate?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Error report Why do we need route, feature, release and privacy policy?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Field What are the differences between Web Vitals, lab metrics, and bundle budget?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "React What can and cannot be prevented by default text rendering?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Why access tokens should not be arbitrarily persisted by the front end to "
                },
                {
                  "type": "inlineCode",
                  "value": "localStorage"
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
                  "value": "Strangler migration require compatibility layer and retirement?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "ADR Why must alternatives and consequences be recorded?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Code review How to verify state owner, Effect necessity, a11y, test, performance and security?"
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "SellerHub can prove the production architecture instead of just page screenshots?"
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
          "value": "From the component project to the production system, it is not to continue to add abstractions, but to put the changes into clear boundaries:"
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
                      "value": "UI"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": tokens → primitives → compounds → features → pages."
                }
              ]
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
                      "value": "Modules"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": app → feature → shared, shared reverse dependency business is prohibited."
                }
              ]
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
                      "value": "Data"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": unknown → runtime validation → DTO → domain → view model."
                }
              ]
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
                      "value": "Release"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": flag + permission + server authorization + cleanup."
                }
              ]
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
                      "value": "Operations"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": structured error / metric + route + release + privacy."
                }
              ]
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
                      "value": "Quality"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": lint + typecheck + test + build + review + measured evidence."
                }
              ]
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
                      "value": "Change"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": inventory + ADR + compatibility + migration + rollback + retirement."
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
          "value": "React is responsible for calculating the UI based on current inputs; TypeScript checks relationships at compile time; JavaScript and the browser execute real objects and platform behaviors at runtime; architecture governance determines how these layers collaborate in the long term."
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
                  "type": "link",
                  "href": "https://react.dev/learn/thinking-in-react",
                  "children": [
                    {
                      "type": "text",
                      "value": "React: Thinking in React"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": component decomposition, state ownership and data flow."
                }
              ]
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
                  "value": ": pure render, read-only inputs and render boundary."
                }
              ]
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
                  "href": "https://react.dev/learn/passing-props-to-a-component",
                  "children": [
                    {
                      "type": "text",
                      "value": "React: Passing Props to a Component"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": component API, props object and composition."
                }
              ]
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
                  "href": "https://react.dev/reference/react-dom/components/common",
                  "children": [
                    {
                      "type": "text",
                      "value": "React DOM common components"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": ARIA props, DOM props and "
                },
                {
                  "type": "inlineCode",
                  "value": "dangerouslySetInnerHTML"
                },
                {
                  "type": "text",
                  "value": " security boundary."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/2/modules.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript Handbook: Modules"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": ES module scope, imports, exports and type-only imports."
                }
              ]
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
                  "href": "https://www.typescriptlang.org/docs/handbook/modules/reference",
                  "children": [
                    {
                      "type": "text",
                      "value": "TypeScript Modules Reference"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": module resolution and type erasure details."
                }
              ]
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
                  "href": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
                  "children": [
                    {
                      "type": "text",
                      "value": "WAI-ARIA APG: Tabs Pattern"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": roles, states, relationships and keyboard behavior."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: Intl"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": locale negotiation and internationalization constructors."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: Intl.DateTimeFormat"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": date formatting API."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: PerformanceObserver"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": browser performance entry subscription."
                }
              ]
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
                  "href": "https://web.dev/articles/vitals",
                  "children": [
                    {
                      "type": "text",
                      "value": "web.dev: Web Vitals"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": current Core Web Vitals, thresholds and field/lab distinction."
                }
              ]
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
                  "href": "https://web.dev/articles/performance-budgets-101",
                  "children": [
                    {
                      "type": "text",
                      "value": "web.dev: Performance Budgets 101"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": budget types and build-process gate."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: "
                    },
                    {
                      "type": "inlineCode",
                      "value": "rel=\"noopener\""
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": new browsing context isolation."
                }
              ]
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
                  "href": "https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP",
                  "children": [
                    {
                      "type": "text",
                      "value": "MDN: Content Security Policy implementation"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": CSP with third-party resource control."
                }
              ]
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
                  "href": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "OWASP: Cross Site Scripting Prevention"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": safe sinks, encoding, sanitization and framework escape hatches."
                }
              ]
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
                  "href": "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "OWASP: HTML5 Security"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": local storage, tabnabbing and browser security."
                }
              ]
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
                  "href": "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "OWASP: Logging"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": structured logging and sensitive fields exclusion."
                }
              ]
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
                  "href": "https://spec.openapis.org/oas/latest.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "OpenAPI Specification"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": language-agnostic API descriptions, client generation, documentation and testing."
                }
              ]
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
                  "href": "https://openfeature.dev/specification/sections/evaluation-context/",
                  "children": [
                    {
                      "type": "text",
                      "value": "OpenFeature: Evaluation Context"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": flag targeting context, merging and PII considerations."
                }
              ]
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
                  "href": "https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html",
                  "children": [
                    {
                      "type": "text",
                      "value": "AWS Prescriptive Guidance: ADR process"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": ADR context, decision, consequences, status and superseding process."
                }
              ]
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
                  "href": "https://vite.dev/guide/build",
                  "children": [
                    {
                      "type": "text",
                      "value": "Vite: Building for Production"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ": production build entry, bundle and browser target boundary."
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
                  "value": "docs/roadmap/react-mastery-roadmap-zh.md"
                },
                {
                  "type": "text",
                  "value": " Phase 12: Local route basis for this chapter's topics and competency matrix."
                }
              ]
            }
          ]
        },
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
                  "value": ": Reference React Maintenance and domain-oriented project structure; it does not cover all governance topics in this chapter."
                }
              ]
            }
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
                  "value": ": only assists in observing the old full-stack project/security/deployment organization, and is not used as the default writing method for modern React or production architecture."
                }
              ]
            }
          ]
        },
        {
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "Chapter 11–14 Learning Guide: Reuse local learning context of performance evidence, quality gates, server/client boundary, React 19 migration."
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
          "value": "This chapter does not install or verify Storybook, OpenAPI generator, Sentry, Datadog, LaunchDarkly, i18next, monorepo tooling or real CI provider; these contents are only used as instructions for the location of future production tools and do not constitute local integration results."
        }
      ]
    }
  ]
} satisfies ChapterDocument

export default function Chapter15Content() {
  return <DocumentRenderer document={chapterDocument} />
}
