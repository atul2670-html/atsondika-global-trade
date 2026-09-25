import { chromium } from 'playwright';

(async () => {
  console.log('Fetching live Cloudflare Pages URL with fresh context...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.route('**/*', route => route.continue());
  await page.setViewportSize({ width: 1440, height: 900 });

  // Direct fetch with cache buster query string
  await page.goto('https://atsondika-global-trade.pages.dev/?cb=' + Date.now(), { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Click Quote modal button
  const quoteBtn = page.locator('button:has-text("Proforma"), button:has-text("Quote")').first();
  if (await quoteBtn.isVisible()) {
    await quoteBtn.click();
    await page.waitForTimeout(1500);
  }

  // Take screenshot
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/live_cloudflare_fresh.png', fullPage: false });
  console.log('Saved to live_cloudflare_fresh.png');

  await browser.close();
})();
