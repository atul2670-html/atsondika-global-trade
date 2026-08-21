import { chromium } from '@playwright/test';

async function testProformaDynamicCompany() {
  console.log('🏢 Testing Dynamic Company Selection in Proforma Invoice Sheet...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Switch to Shree System Tec (comp_4) via company select menu
  await page.evaluate(() => {
    localStorage.setItem('site_active_company_id_v1', 'comp_4');
    window.location.reload();
  });
  await page.waitForTimeout(1000);

  // Scroll to products and open Proforma Invoice for a product
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  const proformaBtn = await page.$('button[title="Generate Proforma Invoice / Export Quotation PDF"]');
  if (proformaBtn) {
    await proformaBtn.click();
    await page.waitForTimeout(1000);

    // Take screenshot of Proforma Invoice sheet for Shree System Tec
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_shree_system_tec.png' });
  }

  // Close modal and switch to comp_2 (ADIDEV AGRO EXPORTS)
  const closeBtn = await page.$('.modal-close');
  if (closeBtn) await closeBtn.click();
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    localStorage.setItem('site_active_company_id_v1', 'comp_2');
    window.location.reload();
  });
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  const proformaBtn2 = await page.$('button[title="Generate Proforma Invoice / Export Quotation PDF"]');
  if (proformaBtn2) {
    await proformaBtn2.click();
    await page.waitForTimeout(1000);

    // Take screenshot of Proforma Invoice sheet for ADIDEV AGRO EXPORTS
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_adidev_agro.png' });
  }

  await browser.close();
  console.log('✅ Dynamic Company Proforma Invoice Tests Complete!');
}

testProformaDynamicCompany().catch(console.error);
