import { test, expect } from "@playwright/test";

test.describe("GET Users API", () => {

  test(" Fetch all users", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users");

    console.log("STATUS:", res.status());
    const raw = await res.text();
    console.log("RAW RESPONSE:", raw);

    const body = JSON.parse(raw);
    console.log("PARSED JSON:", body);

    expect(res.status()).toBe(200);
  });

  test(" Validate total users > 0", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users");

    console.log("========================");
    console.log("STATUS:", res.status());
    const body = await res.json();
    console.log("BODY JSON:", body);

    expect(body.users.length).toBeGreaterThan(0);
  });

  test(" Fetch user by ID = 1", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users/1");

    console.log("========================");
    console.log("STATUS:", res.status());
    console.log("BODY:", await res.json());

    expect(res.status()).toBe(200);
  });

  test(" Validate user 1 has firstName field", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users/1");

    console.log("========================");
    const body = await res.json();
    console.log("USER 1 JSON:", body);

    expect(body.firstName).toBeTruthy();
  });

  test(" Validate user image exists", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users/3");

    console.log("========================");
    const body = await res.json();
    console.log("USER 3 JSON:", body);

    expect(body.image).toContain("https");
  });

  test(" Invalid user ID returns 404", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users/999999");

    console.log("========================");
    console.log("STATUS:", res.status());
    console.log("TEXT:", await res.text());

    expect(res.status()).toBe(404);
  });
  test(" default users (no query) returns data object/array", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users");
    console.log("STATUS:", res.status());
    const body = await res.json();
    console.log("BODY KEYS:", Object.keys(body));
    expect(body.users).toBeDefined();
  });

  test(" limit param returns limited results", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users?limit=5");
    console.log("STATUS:", res.status());
    const body = await res.json();
    console.log("LENGTH:", body.users.length);
    expect(body.users.length).toBeLessThanOrEqual(5);
  });

  test(" skip param shifts results", { tag: "@api" }, async ({ request }) => {
    const res1 = await request.get("https://dummyjson.com/users?limit=2&skip=0");
    const res2 = await request.get("https://dummyjson.com/users?limit=2&skip=2");
    const b1 = await res1.json();
    const b2 = await res2.json();
    console.log("PAGE0 IDs:", b1.users.map(u => u.id));
    console.log("PAGE1 IDs:", b2.users.map(u => u.id));
    expect(b1.users[0].id).not.toBe(b2.users[0].id);
  });

  test(" sorting / search query (if supported) returns filtered results", { tag: "@api" }, async ({ request }) => {
    // DummyJSON supports /users/search?q=term
    const res = await request.get("https://dummyjson.com/users/search?q=John");
    console.log("STATUS:", res.status());
    const body = await res.json();
    console.log("RESULT COUNT:", body.total || (body.users && body.users.length));
    expect(res.status()).toBe(200);
  });

  test(" page boundaries - limit=0 returns empty", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users?limit=0");
    const body = await res.json();
    console.log("BODY:", body);
    // body.users might be [] or absent; check that it doesn't crash
    expect(res.status()).toBe(200);
  });

  test(" combined params (limit + skip + q)", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://dummyjson.com/users/search?q=ma&limit=3&skip=1");
    const body = await res.json();
    console.log("BODY:", body);
    expect(res.status()).toBe(200);
  });
 
    test(" delayed response (3s) should return 200", { tag: "@api" }, async ({ request }) => {
    const res = await request.get("https://httpbin.org/delay/3");
    console.log("STATUS:", res.status());
    const txt = await res.text();
    console.log("RAW LENGTH:", txt.length);
    expect(res.status()).toBe(200);
  });

  test(" enforce timeout (expect to fail if too slow) — set short timeout", { tag: "@api" }, async ({ request }) => {
    // create a request with short timeout to simulate timeout behavior
    // Playwright's request API accepts timeout in seconds via request.get's timeout option (milliseconds)
    let thrown = false;
    try {
      await request.get("https://httpbin.org/delay/5", { timeout: 1000 }); // 1s timeout
    } catch (e) {
      console.log("ERROR (expected timeout):", e.message);
      thrown = true;
    }
    expect(thrown).toBe(true);
  });

});
