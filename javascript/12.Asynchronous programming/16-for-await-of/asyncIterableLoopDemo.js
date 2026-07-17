// Goal:
// Verify how for await...of consumes async values.

async function runAsyncLoop() {
  const reportChunkPromises = [
    Promise.resolve('header'),
    Promise.resolve('body'),
    Promise.resolve('footer'),
  ];

  for await (const reportChunk of reportChunkPromises) {
    console.log(reportChunk);
  }
}

async function main() {
  await runAsyncLoop();
}
main().catch((error) => {
  console.error(error.message);
})