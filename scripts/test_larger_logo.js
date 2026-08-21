import { chromium } from '@playwright/test';

async function testLargerLogo() {
  console.log('🚀 Testing Larger Header & Footer Logos...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1500);

  // 1. Take Header screenshot
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_larger_logo.png' });

  // 2. Scroll to Footer and take screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/footer_larger_logo.png' });

  await browser.close();
  console.log('✅ Larger Logo Test Complete!');
}

testLargerLogo().catch(console.error);
