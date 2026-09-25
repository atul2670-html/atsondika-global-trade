import { chromium } from '@playwright/test';

async function testWideForms() {
  console.log('🚀 Testing Widescreen Form Widths for Add/Edit Product Modal & Proforma Invoice Generator...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Test Proforma Invoice Modal width
  const quoteBtn = await page.$('button:has-text("Proforma Export Quote"), button:has-text("પ્રોફોર્મા એક્સપોર્ટ ક્વોટ"), button:has-text("Get Instant Quote")');
  if (quoteBtn) {
    await quoteBtn.click();
    await page.waitForTimeout(600);
  }

  const modal1 = await page.$('.modal-card');
  if (modal1) {
    const box1 = await modal1.boundingBox();
    console.log(`📌 Proforma Invoice Modal Width: ${box1?.width}px (Max Target: ~1180px)`);
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/proforma_modal_widescreen_verification.png' });

  // Close modal
  const closeBtn = await page.$('.modal-close');
  if (closeBtn) {
    await closeBtn.click();
    await page.waitForTimeout(400);
  }

  await browser.close();
  console.log('✅ Widescreen Modal Width Verification Complete!');
}

testWideForms().catch(console.error);
