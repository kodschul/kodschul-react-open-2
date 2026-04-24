import { expect, test } from "@playwright/test";

const testStory = async (storyId) => {
  test("default", async ({ page }) => {
    await page.goto(`http://localhost:6006/iframe.html?id=${storyId}`, {
      waitUntil: "load",
    });
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });
};

test.describe("TodoItem", () => {
  test("primary", async ({ page }) => {
    const pageId = "todos-item--primary";

    await page.goto(`http://localhost:6006/iframe.html?id=${pageId}`, {
      waitUntil: "networkidle",
    });

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });

  test.describe("secondary", async () => {
    await testStory("todos-item--secondary");
  });
});
