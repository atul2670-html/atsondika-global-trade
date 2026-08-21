import { chromium } from '@playwright/test';

async function testProformaCurrenciesAndDestinationTax() {
  console.log('🚀 Testing Proforma Invoice Generator: 50+ Currencies & Destination Tax/Duty Finder...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(600);

  // Click Get Instant Quote button in header to open Proforma Invoice Generator modal
  const quoteBtn = await page.$('button:has-text("Get Instant Quote")');
  if (quoteBtn) {
    await quoteBtn.click();
    await page.waitForTimeout(600);
  }

  // 1. Take screenshot of 50+ Currencies & Destination Tax Finder Box
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_currencies_and_tax_finder_modal.png' });

  // 2. Change Destination Country to Canada
  const destInput = await page.$('.modal-card input[value="Dubai, UAE"]');
  if (destInput) {
    await destInput.fill('Canada (Vancouver)');
    await page.waitForTimeout(400);
  }

  // 3. Select CAD ($) currency
  const currSelect = await page.$('.modal-card select');
  if (currSelect) {
    await currSelect.selectOption('CAD');
    await page.waitForTimeout(400);
  }

  // Take screenshot of updated Proforma Invoice Sheet with Landed Cost breakdown for Canada (CAD $)
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_invoice_sheet_landed_cost_canada.png' });

  await browser.close();
  console.log('✅ Proforma Invoice 50+ Currencies & Live Destination Tax Finder Tests Complete!');
}

testProformaCurrenciesAndDestinationTax().catch(console.error);
