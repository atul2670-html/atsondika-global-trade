import { chromium } from '@playwright/test';

async function testMultilangHeaderFit() {
  console.log('🚀 Testing Multi-Language Header Glass Box Fit (No Overflow)...');

  const resolutions = [
    { name: '1366px_laptop', width: 1366, height: 768 },
    { name: '1440px_desktop', width: 1440, height: 900 },
    { name: '1920px_fullhd', width: 1920, height: 1080 }
  ];

  for (const res of resolutions) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: res.width, height: res.height } });
    const page = await context.newPage();

    await page.goto('http://localhost:8080');
    await page.waitForTimeout(600);

    // Unlock Admin Access & Switch to ADIDEV AGRO EXPORTS & COMMODITIES
    await page.evaluate(() => {
      localStorage.setItem('admin_access_unlocked_v1', 'true');
      localStorage.setItem('site_active_company_id_v1', 'comp_2');
    });
    await page.reload();
    await page.waitForTimeout(600);

    // Switch Language to French
    const langSelect = await page.$('.lang-dropdown');
    if (langSelect) {
      await langSelect.selectOption('fr');
      await page.waitForTimeout(500);
    }

    // Take screenshot of French header bar in Admin mode
    await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_french_admin_${res.name}.png`, clip: { x: 0, y: 0, width: res.width, height: 140 } });

    // Switch Language to Gujarati
    if (langSelect) {
      await langSelect.selectOption('gu');
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_gujarati_admin_${res.name}.png`, clip: { x: 0, y: 0, width: res.width, height: 140 } });

    await browser.close();
  }

  console.log('✅ Multi-Language Header Fit Tests Complete!');
}

testMultilangHeaderFit().catch(console.error);
