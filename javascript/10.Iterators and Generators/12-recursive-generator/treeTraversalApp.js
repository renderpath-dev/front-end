// Goal:
// Traverse a tree with a recursive generator.

const navigationTree = {
  label: 'root',
  children: [
    {
      label: 'products',
      children: [
        { label: 'keyboard', children: [] },
        { label: 'monitor', children: [] },
      ],
    },
    {
      label: 'support',
      children: [{ label: 'docs', children: [] }],
    },
  ],
};

function* walkTreePreOrder(treeNode) {
  yield treeNode.label;

  for (const childNode of treeNode.children) {
    yield* walkTreePreOrder(childNode);
  }
}

for (const nodeLabel of walkTreePreOrder(navigationTree)) {
  console.log(nodeLabel);
}
