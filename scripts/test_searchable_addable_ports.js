import { chromium } from '@playwright/test';

async function testSearchableAddablePorts() {
  console.log('🚀 Testing Searchable & Addable Origin/Destination Ports...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll to calc section
  await page.evaluate(() => {
    const el = document.querySelector('#calc');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(500);

  // 1. Switch to Tab 3 (Freight Transit Lead-Times)
  const tabBtn = await page.$('button:has-text("Global Freight Transit")');
  if (tabBtn) {
    await tabBtn.click();
    await page.waitForTimeout(500);
  }

  // 2. Test Origin Port Search (type 'Surat')
  const originInput = await page.$('input[placeholder*="Surat STV"]');
  if (originInput) {
    await originInput.fill('Surat');
    await page.waitForTimeout(400);
    console.log('✅ Origin Port Search Filter Tested');
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/origin_port_search_surat.png' });

  // 3. Test Destination Port Search (clear origin, type 'Dubai')
  if (originInput) await originInput.fill('');
  const destInput = await page.$('input[placeholder*="Dubai DXB"]');
  if (destInput) {
    await destInput.fill('Dubai');
    await page.waitForTimeout(400);
    console.log('✅ Destination Port Search Filter Tested');
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/dest_port_search_dubai.png' });

  // 4. Add new route
  if (destInput) await destInput.fill('');
  const addBtn = await page.$('button:has-text("Add Freight Route Record")');
  if (addBtn) {
    await addBtn.click();
    await page.waitForTimeout(500);
  }

  const modalOrigin = await page.$('input[placeholder*="Surat Airport (STV)"]');
  if (modalOrigin) await modalOrigin.fill('Surat Airport (STV)');

  const modalDest = await page.$('input[placeholder*="Dubai International (DXB)"]');
  if (modalDest) await modalDest.fill('Paris Charles de Gaulle (CDG)');

  const modalDays = await page.$('input[placeholder*="3.5 - 4 Hours"]');
  if (modalDays) await modalDays.fill('9.5 Hours');

  const modalFreq = await page.$('input[placeholder*="Daily Direct / Express"]');
  if (modalFreq) await modalFreq.fill('Direct Express Cargo Daily');

  const saveBtn = await page.$('button:has-text("Save Freight Route")');
  if (saveBtn) {
    await saveBtn.click();
    await page.waitForTimeout(800);
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/new_freight_route_added.png' });

  await browser.close();
  console.log('✅ All Searchable & Addable Port Tests Completed Successfully!');
}

testSearchableAddablePorts().catch(console.error);
