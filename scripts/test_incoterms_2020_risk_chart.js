import { chromium } from '@playwright/test';

async function testIncoterms2020RiskChart() {
  console.log('🚀 Testing Incoterms 2020 Visual Risk Chart & Selector Modal...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Click Quote button in header actions
  const quoteBtn = await page.$('.header-actions button:has-text("Get Instant Quote")');
  if (quoteBtn) {
    await quoteBtn.click();
    await page.waitForTimeout(800);
  }

  // 1. Take screenshot of Proforma Invoice Form with Incoterms Risk Chart Button
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_incoterms_selector_form.png' });

  // 2. Click Risk Chart button to open ICC Incoterms 2020 Visual Risk Chart Modal
  const riskChartBtn = await page.$('button:has-text("Risk Chart")');
  if (riskChartBtn) {
    console.log('Clicking Risk Chart button with force...');
    await riskChartBtn.click({ force: true });
    await page.waitForTimeout(1000);
    // Take screenshot of ICC Incoterms 2020 Visual Risk Chart Modal
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/incoterms_2020_visual_risk_chart_modal.png' });
  }

  // 3. Select CIF (Cost, Insurance and Freight) from the modal
  const selectCifBtn = await page.$('button:has-text("Select CIF")');
  if (selectCifBtn) {
    console.log('Clicking Select CIF button...');
    await selectCifBtn.click({ force: true });
    await page.waitForTimeout(1000);
    // Take screenshot of updated Proforma Invoice Sheet with CIF term
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_invoice_sheet_cif_selected.png' });
  }

  await browser.close();
  console.log('✅ Incoterms 2020 Visual Risk Chart & Selector Tests Complete!');
}

testIncoterms2020RiskChart().catch(console.error);
