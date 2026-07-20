type ModuleFormat = "esm" | "commonjs";

type ModuleBoundaryEvidence = {
  nearestPackageType: "module" | "commonjs";
  sourceFile: string;
  sourceSyntax: ModuleFormat;
  emittedImportSpecifier: string;
  nodeRuntimeRule: string;
};

function explainNodeNextBoundary(evidence: ModuleBoundaryEvidence): string {
  return [
    `source=${evidence.sourceFile}`,
    `package.type=${evidence.nearestPackageType}`,
    `source.syntax=${evidence.sourceSyntax}`,
    `emitted.import=${evidence.emittedImportSpecifier}`,
    `runtime.rule=${evidence.nodeRuntimeRule}`
  ].join(" | ");
}

const esmEvidence: ModuleBoundaryEvidence = {
  nearestPackageType: "module",
  sourceFile: "src/app.ts",
  sourceSyntax: "esm",
  emittedImportSpecifier: "./notes.service.js",
  nodeRuntimeRule: "Node ESM resolves the explicit .js specifier after TypeScript checking."
};

const commonjsEvidence: ModuleBoundaryEvidence = {
  nearestPackageType: "commonjs",
  sourceFile: "src/legacy.cts",
  sourceSyntax: "commonjs",
  emittedImportSpecifier: "./legacy-helper.cjs",
  nodeRuntimeRule: "Node CommonJS loads require targets with CommonJS semantics."
};

console.log(explainNodeNextBoundary(esmEvidence));
console.log(explainNodeNextBoundary(commonjsEvidence));
