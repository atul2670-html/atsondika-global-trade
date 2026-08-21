import { chromium } from '@playwright/test';

async function testRfqButtonFromLightbox() {
  console.log('💬 Testing Lightbox "Request Official Quotation (RFQ)" Button Flow...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll down to products grid
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  // Click first product photo to open Lightbox Modal
  const firstProdImg = await page.$('.product-img-wrapper');
  if (firstProdImg) {
    await firstProdImg.click();
    await page.waitForTimeout(800);

    // Click "Request Official Quotation (RFQ)" button inside Lightbox Modal
    const rfqBtn = await page.$('button:has-text("Request Official Quotation")');
    if (rfqBtn) {
      console.log('Clicking Request Official Quotation (RFQ) button in Lightbox Modal...');
      await rfqBtn.click();
      await page.waitForTimeout(1000);

      // Take screenshot of Request Official Quotation (RFQ) form with selected product
      await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/rfq_form_prefilled_from_lightbox.png' });
    }
  }

  await browser.close();
  console.log('✅ Lightbox RFQ Form Flow Complete!');
}

testRfqButtonFromLightbox().catch(console.error);
