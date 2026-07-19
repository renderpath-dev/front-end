import "server-only";

type ServerEnvironmentStatus = {
  variableName: "CHAPTER_ONE_SERVER_SECRET";
  isConfigured: boolean;
};

function readServerEnvironment(): ServerEnvironmentStatus {
  const secret = process.env.CHAPTER_ONE_SERVER_SECRET;

  return {
    variableName: "CHAPTER_ONE_SERVER_SECRET",
    isConfigured: typeof secret === "string" && secret.length > 0,
  };
}

export default function ServerEnvironmentExample() {
  const status = readServerEnvironment();

  return (
    <section>
      <h1>Server environment example</h1>
      <p>
        {status.variableName}: {status.isConfigured ? "configured" : "missing"}
      </p>
    </section>
  );
}
