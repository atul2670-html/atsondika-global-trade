import { chromium } from '@playwright/test';

async function testFrenchOfficeFit() {
  console.log('🚀 Testing French Mode Header Fit on 1280px & 1366px Office Monitors...');
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: '1280px_french_office', width: 1280, height: 768 },
    { name: '1366px_french_office', width: 1366, height: 768 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    page.on('dialog', async dialog => {
      await dialog.accept('Aip261970@');
    });

    await page.goto('http://localhost:8080');
    await page.waitForTimeout(1000);

    // 1. Switch to French
    const langBtn = await page.$('.lang-btn');
    if (langBtn) {
      await langBtn.click();
      await page.waitForTimeout(200);
      const frItem = await page.$('button:has-text("Français")');
      if (frItem) await frItem.click();
      await page.waitForTimeout(400);
    }

    // 2. Admin Login
    const adminBtn = await page.$('button:has-text("Connexion Admin"), button:has-text("Admin Login")');
    if (adminBtn) {
      await adminBtn.click();
      await page.waitForTimeout(400);
      const passInput = await page.$('input[placeholder*="Password"]');
      if (passInput) {
        await passInput.fill('Aip261970@');
        const submit = await page.$('button:has-text("Unlock Admin Access"), button:has-text("Déverrouiller")');
        if (submit) await submit.click();
        await page.waitForTimeout(500);
      }
    }

    await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/french_${vp.name}.png` });
    await context.close();
  }

  await browser.close();
  console.log('✅ French Mode Office Fit Test Complete!');
}

testFrenchOfficeFit().catch(console.error);
