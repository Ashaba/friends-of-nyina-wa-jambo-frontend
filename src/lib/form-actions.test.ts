import { describe, it, expect, vi, beforeEach } from "vitest";

const postAPI = vi.fn();
let forwardedFor = "203.0.113.1";

vi.mock("@/lib/strapi", () => ({
  postAPI: (...args: unknown[]) => postAPI(...args),
}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": forwardedFor }),
}));

const { subscribeToNewsletter, submitPrayerRequest } =
  await import("@/lib/form-actions");

const validSubscription = {
  firstName: "Alphonsine",
  email: "alphonsine@example.com",
  preferences: ["Daily Messages & Reflections"],
};

/** Each test gets an unused address so the shared limiter stays out of the way. */
let addressCounter = 0;
function freshCaller(): void {
  addressCounter += 1;
  forwardedFor = `198.51.100.${addressCounter}`;
}

describe("subscribeToNewsletter", () => {
  beforeEach(() => {
    postAPI.mockReset().mockResolvedValue({ ok: true, status: "success" });
    freshCaller();
  });

  it("stores a valid subscription", async () => {
    const result = await subscribeToNewsletter(validSubscription);

    expect(result).toEqual({ ok: true });
    expect(postAPI).toHaveBeenCalledWith(
      "/newsletter-subscribers",
      expect.objectContaining({ email: "alphonsine@example.com" })
    );
  });

  it("normalises the address before sending it on", async () => {
    await subscribeToNewsletter({
      ...validSubscription,
      email: "  Alphonsine@Example.COM  ",
    });

    expect(postAPI).toHaveBeenCalledWith(
      "/newsletter-subscribers",
      expect.objectContaining({ email: "alphonsine@example.com" })
    );
  });

  it("silently drops a submission that filled the honeypot", async () => {
    const result = await subscribeToNewsletter({
      ...validSubscription,
      website: "http://spam.example",
    });

    // Reports success so the bot learns nothing, but stores nothing.
    expect(result).toEqual({ ok: true });
    expect(postAPI).not.toHaveBeenCalled();
  });

  it("rejects a caller past the rate limit without calling the content source", async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await subscribeToNewsletter(validSubscription);
    }
    postAPI.mockClear();

    const blocked = await subscribeToNewsletter(validSubscription);

    expect(blocked.ok).toBe(false);
    expect(blocked.error).toMatch(/try again in \d+ minute/);
    expect(postAPI).not.toHaveBeenCalled();
  });

  it("rejects a malformed address before a round trip", async () => {
    const result = await subscribeToNewsletter({
      ...validSubscription,
      email: "not-an-address",
    });

    expect(result.ok).toBe(false);
    expect(postAPI).not.toHaveBeenCalled();
  });

  it("passes a correction through, but not an infrastructure failure", async () => {
    postAPI.mockResolvedValue({
      ok: false,
      status: "invalid",
      message: "A first name is required.",
    });
    await expect(subscribeToNewsletter(validSubscription)).resolves.toEqual({
      ok: false,
      error: "A first name is required.",
    });

    postAPI.mockResolvedValue({ ok: false, status: "http-error" });
    const failure = await subscribeToNewsletter(validSubscription);
    expect(failure.error).not.toMatch(/http|error response/i);
  });
});

describe("submitPrayerRequest", () => {
  beforeEach(() => {
    postAPI.mockReset().mockResolvedValue({ ok: true, status: "success" });
    freshCaller();
  });

  it("accepts an anonymous intention and defaults the category", async () => {
    const result = await submitPrayerRequest({
      category: "",
      intention: "Please pray for me.",
      isPublic: false,
    });

    expect(result).toEqual({ ok: true });
    expect(postAPI).toHaveBeenCalledWith("/prayer-requests", {
      name: undefined,
      email: undefined,
      category: "General",
      intention: "Please pray for me.",
      isPublic: false,
    });
  });

  it("requires an intention", async () => {
    const result = await submitPrayerRequest({
      category: "Healing",
      intention: "   ",
      isPublic: false,
    });

    expect(result.ok).toBe(false);
    expect(postAPI).not.toHaveBeenCalled();
  });

  it("validates an address only when one was given", async () => {
    await expect(
      submitPrayerRequest({
        category: "Healing",
        intention: "Pray for us.",
        email: "nope",
        isPublic: false,
      })
    ).resolves.toMatchObject({ ok: false });

    expect(postAPI).not.toHaveBeenCalled();
  });

  it("silently drops a submission that filled the honeypot", async () => {
    const result = await submitPrayerRequest({
      category: "Healing",
      intention: "Buy cheap watches",
      isPublic: false,
      website: "http://spam.example",
    });

    expect(result).toEqual({ ok: true });
    expect(postAPI).not.toHaveBeenCalled();
  });
});
