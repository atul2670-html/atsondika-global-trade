import { chromium } from '@playwright/test';

async function testDynamicFooterCategories() {
  console.log('🚀 Testing Dynamic Main Product Categories in Footer...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll to footer element
  const footerEl = await page.$('.footer');
  if (footerEl) {
    await footerEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  // Get option texts from footer categories column
  const footerCategories = await page.$$eval('.footer-col:has(h4:has-text("Categories"), h4:has-text("કેટેગરી")) ul li a', items => items.map(i => i.textContent.trim()));
  console.log('📋 Footer Main Categories Count:', footerCategories.length);
  console.log('📋 Footer Main Categories:', footerCategories);

  // Take screenshot of dynamic footer categories
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/dynamic_footer_main_categories.png' });

  await browser.close();
  console.log('✅ Dynamic Footer Categories Test Complete!');
}

testDynamicFooterCategories().catch(console.error);
