import { test, expect } from "@playwright/test";

test.describe("README.md should be rendered", () => {
  test('page should have title of "Docsify plugin playground"', async ({
    page,
  }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toBe("Docsify plugin playground");
  });
});

test.describe("Edit on git plugin should whork", () => {
  test("page should have Github edit button", async ({ page }) => {
    await page.goto("/");
    const editButton = await page.getByText("📝 Edit on Github");
    expect(editButton).toBeDefined();
    const href = await editButton.getAttribute("href");
    expect(href).toBe(
      "https://github.com/corentinleberre/create-docsify-plugin/blob/main/src/README.md"
    );
  });
});

test.describe("Custom footer plugin should work", () => {
  test("footer should be defined", async ({ page }) => {
    await page.goto("/");

    const footer = await page.locator("footer");
    expect(footer).toBeDefined();
  });

  test("footer should contain custom text", async ({ page }) => {
    await page.goto("/");

    const footerContent = await page.locator("footer").innerText();
    expect(footerContent).toBe("My awesome custom footer ✨");
  });

  test("footer should contain custom link", async ({ page }) => {
    await page.goto("/");

    const footerLink = await page.locator("footer").getByRole("link");
    expect(footerLink).toBeDefined();
    const footerLinkHref = await footerLink.getAttribute("href");
    const footerLinkContent = await footerLink.innerText();
    expect(footerLinkHref).toBe("https://github.com/docsifyjs/awesome-docsify");
    expect(footerLinkContent).toBe("✨");
  });
});
