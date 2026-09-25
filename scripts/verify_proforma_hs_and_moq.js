import { chromium } from 'playwright';

(async () => {
  console.log('Starting verification of Proforma Invoice 3-Division MOQ and Global HS Code Search module...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1500);

  // Click on "📄 Get Proforma Invoice Quote" or "⚡ Quick Instant Proforma Quote" button in product grid
  const quoteBtn = page.locator('button:has-text("Proforma"), button:has-text("Quote")').first();
  if (await quoteBtn.isVisible()) {
    await quoteBtn.click();
    await page.waitForTimeout(1000);
  }

  // Take screenshot
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/proforma_hs_and_moq_verification.png', fullPage: false });

  console.log('Screenshot saved to proforma_hs_and_moq_verification.png');
  await browser.close();
})();
