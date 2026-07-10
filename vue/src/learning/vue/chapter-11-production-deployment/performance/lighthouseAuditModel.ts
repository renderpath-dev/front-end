export type LighthouseCategory =
  "performance" | "accessibility" | "best-practices" | "seo" | "pwa";

export interface LighthouseAuditRecord {
  readonly category: LighthouseCategory;
  readonly localEvidence: string;
  readonly productionEvidence: string;
  readonly limitation: string;
}

export const lighthouseAuditRecords: ReadonlyArray<LighthouseAuditRecord> = [
  {
    category: "performance",
    localEvidence: "Preview URL audit in a controlled browser",
    productionEvidence: "Audit deployed URL with real server headers",
    limitation: "A lab score is not field Web Vitals data",
  },
  {
    category: "accessibility",
    localEvidence: "Static checks and browser audit",
    productionEvidence: "Manual keyboard and assistive technology review",
    limitation: "Automated checks do not cover all user needs",
  },
  {
    category: "best-practices",
    localEvidence: "Browser security and platform checks",
    productionEvidence: "Production URL headers and runtime behavior",
    limitation: "Passing does not prove application security",
  },
  {
    category: "seo",
    localEvidence: "HTML metadata and crawlability checks",
    productionEvidence: "Production URL crawl behavior",
    limitation: "A protected SPA is not optimized for public SEO by default",
  },
  {
    category: "pwa",
    localEvidence: "Not in scope for this chapter",
    productionEvidence: "Not in scope for this chapter",
    limitation: "No service worker is added in Chapter 11",
  },
];
