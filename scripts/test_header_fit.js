import { chromium } from '@playwright/test';

async function testHeaderFit() {
  console.log('🚀 Testing Header Glass Fit across languages & viewports...');
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: '1366px_laptop', width: 1366, height: 900 },
    { name: '1440px_desktop', width: 1440, height: 900 },
    { name: '1920px_fullhd', width: 1920, height: 1080 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(1500);

    // 1. English Visitor
    await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_en_${vp.name}.png` });

    // 2. Switch to Gujarati
    const langBtn = await page.$('.lang-btn');
    if (langBtn) {
      await langBtn.click();
      await page.waitForTimeout(200);
      const guItem = await page.$('button:has-text("ગુજરાતી")');
      if (guItem) await guItem.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_gu_${vp.name}.png` });
    }

    // 3. Switch to French
    if (langBtn) {
      await langBtn.click();
      await page.waitForTimeout(200);
      const frItem = await page.$('button:has-text("Français")');
      if (frItem) await frItem.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_fr_${vp.name}.png` });
    }

    await context.close();
  }

  await browser.close();
  console.log('✅ Header Glass Fit test complete!');
}

testHeaderFit().catch(console.error);
