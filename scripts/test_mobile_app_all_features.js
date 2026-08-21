import { chromium } from '@playwright/test';

async function testMobileAppAllFeatures() {
  console.log('📱 Testing Mobile App Viewport (iPhone / Android 390px) & All Facilities...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    hasTouch: true,
    isMobile: true
  });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Take Mobile App Homepage & Header Screenshot
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/mobile_app_homepage.png' });

  // 2. Open Proforma Invoice Generator Modal on Mobile App
  const quoteBtn = await page.$('.header-actions button:has-text("Get Instant Quote"), .header-actions button:has-text("📄")');
  if (quoteBtn) {
    await quoteBtn.click();
    await page.waitForTimeout(800);
  }

  // Take Mobile Proforma Invoice Generator Screenshot
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/mobile_app_proforma_modal.png' });

  // 3. Open Incoterms Visual Risk Chart Modal on Mobile App
  const riskBtn = await page.$('button:has-text("Risk Chart")');
  if (riskBtn) {
    await riskBtn.click({ force: true });
    await page.waitForTimeout(800);
    // Take Mobile Incoterms Risk Chart Modal Screenshot
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/mobile_app_incoterms_risk_chart.png' });
  }

  await browser.close();
  console.log('✅ Mobile App Facilities Tests Completed Successfully!');
}

testMobileAppAllFeatures().catch(console.error);
