import { chromium } from '@playwright/test';

async function verifyCurrencySync() {
  console.log('🚀 Running UI Verification for Proforma Currency Sync...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Click on Proforma Export Quote button for Ghee product
  const gheeQuoteBtn = await page.$('button[title="Auto-Generate Official Proforma Invoice Quotation"], button[title="Generate Proforma Invoice / Export Quotation PDF"]');
  if (gheeQuoteBtn) {
    console.log('Found Proforma Quote button on product card. Clicking...');
    await gheeQuoteBtn.click();
    await page.waitForTimeout(800);
  } else {
    console.log('Clicking Get Instant Quote in header...');
    const headerBtn = await page.$('button:has-text("Get Instant Quote")');
    if (headerBtn) await headerBtn.click();
    await page.waitForTimeout(800);
  }

  // 2. Take screenshot of Proforma Invoice Generator Modal
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/proforma_currency_verification.png' });

  // Read value of Invoice Currency select dropdown
  const currencySelectVal = await page.evaluate(() => {
    const selects = Array.from(document.querySelectorAll('select'));
    const currSelect = selects.find(s => s.parentElement && s.parentElement.textContent.includes('Invoice Currency'));
    return currSelect ? currSelect.value : null;
  });
  console.log('Current Invoice Currency Select Value:', currencySelectVal);

  await browser.close();
}

verifyCurrencySync().catch(console.error);
