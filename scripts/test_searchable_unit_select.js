import { chromium } from '@playwright/test';

async function testSearchableUnitSelect() {
  console.log('⚖️ Testing Searchable World Standard Export Unit Dropdown...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll to products and open Proforma Invoice for a product
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  const proformaBtn = await page.$('button:has-text("Proforma Export Quote"), button[title*="Proforma Invoice"]');
  console.log('Found proformaBtn:', !!proformaBtn);
  if (proformaBtn) {
    await proformaBtn.click();
    await page.waitForTimeout(1000);

    // Find and click the Searchable Unit trigger box
    const unitTrigger = await page.$('.searchable-unit-trigger');
    console.log('Found unitTrigger:', !!unitTrigger);
    if (unitTrigger) {
      console.log('Clicking Searchable Unit Select trigger...');
      await unitTrigger.click();
      await page.waitForTimeout(500);

      // Take screenshot of open Searchable Unit Dropdown with all categories
      await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/searchable_unit_dropdown_open.png' });

      // Type "CBM" in the unit search input
      const unitSearchInput = await page.$('input[placeholder*="Search Units"]');
      if (unitSearchInput) {
        console.log('Searching for CBM unit...');
        await unitSearchInput.fill('CBM');
        await page.waitForTimeout(400);

        await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/searchable_unit_cbm_filtered.png' });

        // Click CBM option
        const cbmOption = await page.$('div:has-text("CBM (Cubic Meters")');
        if (cbmOption) {
          console.log('Clicking CBM option...');
          await cbmOption.click();
          await page.waitForTimeout(600);
        }
      }

      // Take screenshot of updated Proforma Invoice sheet with CBM unit
      await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_sheet_cbm_unit.png' });
    }
  }

  await browser.close();
  console.log('✅ Searchable Unit Dropdown Tests Complete!');
}

testSearchableUnitSelect().catch(console.error);
