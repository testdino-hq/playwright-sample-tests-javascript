import { test, expect } from "@playwright/test";

test.describe("DELETE User API", () => {

  test("Remove user 1", { tag: "@api" }, async ({ request }) => {
    const res = await request.delete("https://dummyjson.com/users/1");
    console.log("STATUS:", res.status());
    expect(res.status()).toBe(200);
  });

  test("Remove non-existing user returns 200", { tag: "@api" }, async ({ request }) => {
    const res = await request.delete("https://dummyjson.com/users/9999");
    console.log("STATUS:", res.status());
    expect(res.status()).toBe(200);
  });

  test("Remove user twice", { tag: "@api" }, async ({ request }) => {
    await request.delete("https://dummyjson.com/users/5");
    const res = await request.delete("https://dummyjson.com/users/5");
    console.log("STATUS:", res.status());
    expect(res.status()).toBe(200);
  });

  test("Validate body is returned", { tag: "@api" }, async ({ request }) => {
    const res = await request.delete("https://dummyjson.com/users/2");
    console.log(await res.json());
    expect(res.status()).toBe(200);
  });

});
