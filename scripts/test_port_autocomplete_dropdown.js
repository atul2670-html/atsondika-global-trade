import { chromium } from '@playwright/test';

async function testPortAutocompleteDropdown() {
  console.log('🚀 Testing City Proximity & Direct Internet Port Search...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll to #calc and click Freight tab
  await page.evaluate(() => {
    const calc = document.querySelector('#calc');
    if (calc) calc.scrollIntoView();
  });
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.tab-btn'));
    const freightBtn = btns.find(b => b.textContent.includes('Freight Transit'));
    if (freightBtn) freightBtn.click();
  });
  await page.waitForTimeout(600);

  // Scroll to search inputs card inside Tab 3
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('.search-input');
    if (inputs.length > 0) {
      inputs[inputs.length - 1].scrollIntoView({ block: 'center' });
    }
  });
  await page.waitForTimeout(400);

  // Focus Origin Search Box & type 'Navsari' (nearby city to Surat/Hazira)
  const originInput = await page.$('input[placeholder*="Surat, Canada"]');
  if (originInput) {
    await originInput.focus();
    await originInput.fill('Navsari');
    await page.waitForTimeout(500);
    console.log('✅ Port Proximity Suggestions Triggered for Navsari');
  }

  // Take screenshot of city proximity dropdown open
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/port_proximity_navsari.png' });

  // Type non-predefined city 'Bremen' in Destination input
  const destInput = await page.$('input[placeholder*="Canada, Dubai"]');
  if (destInput) {
    await destInput.focus();
    await destInput.fill('Bremen');
    await page.waitForTimeout(500);
    console.log('✅ Direct Internet Port Search Triggered for Bremen');
  }

  // Take screenshot of direct internet port search option
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/port_internet_search_bremen.png' });

  await browser.close();
  console.log('✅ All City Proximity & Internet Port Search Tests Complete!');
}

testPortAutocompleteDropdown().catch(console.error);
