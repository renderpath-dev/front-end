type ClosableResource = {
  close: () => Promise<void>;
};

async function shutdown(resources: ClosableResource[]): Promise<void> {
  for (const resource of resources) {
    await resource.close();
  }
}

await shutdown([
  { close: async () => console.log("http closed") },
  { close: async () => console.log("redis closed") }
]);
