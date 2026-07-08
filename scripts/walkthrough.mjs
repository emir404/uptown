/* Drives the dev server with the cached Playwright Chromium and captures
   each homepage section after scrolling to it (real time, so whileInView
   reveals complete). Usage: bun walkthrough.mjs [mobile] */
import { chromium } from "playwright-core";
import { homedir } from "node:os";

const SP = process.env.SHOT_DIR ?? import.meta.dir;
const mobile = process.argv[2] === "mobile";
const exe = `${homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({
  viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: mobile ? 2 : 1,
});

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const prefix = mobile ? "m" : "d";
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.screenshot({ path: `${SP}/${prefix}-1-hero.png` });

const stops = [
  ["galerie", "2-galerie"],
  ["ueber-uns", "3-story"],
  ["speisekarte", "4-menu"],
  ["aktionen", "5-rituale"],
  ["kontakt", "6-kontakt"],
];
for (const [anchor, name] of stops) {
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, anchor);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${SP}/${prefix}-${name}.png` });
  // long sections: capture a second frame one viewport further down
  if (["galerie", "ueber-uns", "speisekarte", "kontakt"].includes(anchor)) {
    await page.evaluate(() => window.scrollBy({ top: window.innerHeight, behavior: "instant" }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${SP}/${prefix}-${name}b.png` });
  }
}

// footer curtain: scroll to document end
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await page.waitForTimeout(1800);
await page.screenshot({ path: `${SP}/${prefix}-7-footer.png` });

// menu accordion interaction: open the second category
await page.evaluate((id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
}, "speisekarte");
await page.waitForTimeout(1200);
const buttons = page.locator("#speisekarte button[aria-expanded]");
await buttons.nth(1).click();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${SP}/${prefix}-8-accordion-open2.png` });
const expanded = await buttons.nth(1).getAttribute("aria-expanded");
console.log("second category aria-expanded:", expanded);

console.log("console errors:", errors.length ? errors : "none");
await browser.close();
