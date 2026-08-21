import { chromium } from '@playwright/test';

async function testDynamicRfqCategoryDropdown() {
  console.log('🚀 Testing Dynamic Product Category Dropdown in RFQ Form...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll to contact section
  await page.evaluate(() => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(600);

  // Click select element to show options
  const selectEl = await page.$('#contact select');
  if (selectEl) {
    await selectEl.click();
    await page.waitForTimeout(400);
  }

  // Get option texts from RFQ category dropdown
  const options = await page.$$eval('#contact select option', opts => opts.map(o => o.textContent.trim()));
  console.log('📋 Current RFQ Dropdown Options Count:', options.length);
  console.log('📋 RFQ Dropdown Options:', options);

  // Take screenshot of RFQ form with dynamic category dropdown
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/rfq_dynamic_categories_dropdown.png' });

  await browser.close();
  console.log('✅ Dynamic RFQ Category Dropdown Test Complete!');
}

testDynamicRfqCategoryDropdown().catch(console.error);
