import { describe, expect, it } from "vitest";
import {
  parseContactBody,
  parseLoginBody,
} from "../../server/utils/serverValidation";

describe("server validation boundary", () => {
  it("accepts valid contact payload", () => {
    const payload = parseContactBody({
      email: "learner@example.com",
      message: "This message is valid for the contact endpoint.",
    });

    expect(payload.message.length).toBeGreaterThan(10);
  });

  it("rejects invalid contact payload", () => {
    expect(() => parseContactBody({ email: "bad", message: "short" })).toThrow();
  });

  it("does not trust shared TypeScript types as runtime validation", () => {
    expect(() => parseLoginBody({ email: 123, password: null })).toThrow();
  });
});
