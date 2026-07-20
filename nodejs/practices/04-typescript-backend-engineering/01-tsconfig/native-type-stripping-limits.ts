type NoteInput = {
  title: string;
  body?: string;
};

function normalizeTitle(input: NoteInput): string {
  return input.title.trim().toLowerCase();
}

const erasableSyntaxResult = normalizeTitle({ title: " Native Type Stripping " });

const transformRequiredSyntaxExamples = [
  'enum NoteState { Draft = "draft" }',
  "class User { constructor(public name: string) {} }",
  "namespace RuntimeBox { export const value = 1; }"
];

console.log({ erasableSyntaxResult });
console.log({ transformRequiredSyntaxExamples });
console.log("node.typeStripping=removes erasable syntax only");
console.log("node.typeChecking=false");
