import type { PiniaPluginContext, StateTree } from "pinia";
import type {
  PersistedStateEnvelope,
  PersistedStoreId,
  PersistenceError,
} from "./storeTypes";

export const persistedStoreIds = [
  "theme",
  "preferences",
  "cart",
] as const satisfies ReadonlyArray<PersistedStoreId>;

const storageKeyPrefix = "vue-chapter-07";
const persistenceErrors: Array<PersistenceError> = [];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPersistedStoreId(value: unknown): value is PersistedStoreId {
  return (
    typeof value === "string" &&
    persistedStoreIds.some((storeId) => storeId === value)
  );
}

function isPersistedStateEnvelope(
  value: unknown,
  expectedStoreId: PersistedStoreId,
): value is PersistedStateEnvelope {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.version === 1 &&
    value.storeId === expectedStoreId &&
    isPersistedStoreId(value.storeId) &&
    typeof value.savedAt === "string" &&
    isRecord(value.state)
  );
}

function getStorageKey(storeId: PersistedStoreId): string {
  return `${storageKeyPrefix}:${storeId}`;
}

function recordPersistenceError(error: PersistenceError): void {
  persistenceErrors.push(error);
}

function readPersistedEnvelope(
  storeId: PersistedStoreId,
): PersistedStateEnvelope | null {
  if (typeof window === "undefined") {
    return null;
  }

  let rawValue: string | null;

  try {
    rawValue = window.localStorage.getItem(getStorageKey(storeId));
  } catch (error: unknown) {
    recordPersistenceError({
      code: "read-failed",
      storeId,
      message: error instanceof Error ? error.message : "Storage read failed",
    });
    return null;
  }

  if (rawValue === null) {
    return null;
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(rawValue) as unknown;
  } catch (error: unknown) {
    recordPersistenceError({
      code: "parse-failed",
      storeId,
      message: error instanceof Error ? error.message : "JSON parse failed",
    });
    return null;
  }

  if (!isPersistedStateEnvelope(parsedValue, storeId)) {
    recordPersistenceError({
      code: "invalid-envelope",
      storeId,
      message: "Persisted value does not match the required envelope",
    });
    return null;
  }

  return parsedValue;
}

function patchDeclaredState(
  state: StateTree,
  persistedState: Record<string, unknown>,
): void {
  for (const [key, value] of Object.entries(persistedState)) {
    if (Object.hasOwn(state, key)) {
      Reflect.set(state, key, value);
    }
  }
}

function writePersistedEnvelope(
  storeId: PersistedStoreId,
  state: StateTree,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const envelope: PersistedStateEnvelope = {
    version: 1,
    storeId,
    savedAt: new Date().toISOString(),
    state: { ...state },
  };

  try {
    window.localStorage.setItem(
      getStorageKey(storeId),
      JSON.stringify(envelope),
    );
  } catch (error: unknown) {
    recordPersistenceError({
      code: "write-failed",
      storeId,
      message: error instanceof Error ? error.message : "Storage write failed",
    });
  }
}

export function piniaPersistencePlugin({
  store,
}: PiniaPluginContext): void {
  if (!isPersistedStoreId(store.$id)) {
    return;
  }

  const envelope = readPersistedEnvelope(store.$id);

  if (envelope) {
    store.$patch((state) => {
      patchDeclaredState(state, envelope.state);
    });
  }

  store.$subscribe(
    (_mutation, state) => {
      writePersistedEnvelope(store.$id, state);
    },
    { detached: true },
  );
}

export function getRawPersistenceSnapshots(): ReadonlyArray<{
  storeId: PersistedStoreId;
  rawValue: string | null;
}> {
  return persistedStoreIds.map((storeId) => ({
    storeId,
    rawValue:
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(getStorageKey(storeId)),
  }));
}

export function clearPersistedState(): void {
  if (typeof window === "undefined") {
    return;
  }

  for (const storeId of persistedStoreIds) {
    window.localStorage.removeItem(getStorageKey(storeId));
  }
}

export function getPersistenceErrors(): ReadonlyArray<PersistenceError> {
  return [...persistenceErrors];
}
