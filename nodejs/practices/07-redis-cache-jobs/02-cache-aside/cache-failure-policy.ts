type CachePolicy = "BYPASS_AND_USE_DATABASE" | "FAIL_REQUEST";

async function readThroughCache(policy: CachePolicy): Promise<string> {
  try {
    throw new Error("redis unavailable");
  } catch (error) {
    if (policy === "FAIL_REQUEST") {
      throw error;
    }
    return "database fallback";
  }
}

console.log(await readThroughCache("BYPASS_AND_USE_DATABASE"));
