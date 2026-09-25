import { chromium } from 'playwright';

(async () => {
  console.log('Fetching live Cloudflare Pages URL...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('https://atsondika-global-trade.pages.dev/?clear_cache=' + Date.now(), { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  // Clear caches
  await page.evaluate(() => {
    if ('caches' in window) {
      caches.keys().then(names => names.forEach(n => caches.delete(n)));
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
    }
  });

  // Open Proforma Quote modal
  const quoteBtn = page.locator('button:has-text("Proforma"), button:has-text("Quote")').first();
  if (await quoteBtn.isVisible()) {
    await quoteBtn.click();
    await page.waitForTimeout(1500);
  }

  // Capture screenshot of live modal
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/live_cloudflare_verification.png', fullPage: false });
  console.log('Screenshot of live site saved to live_cloudflare_verification.png');

  await browser.close();
})();
