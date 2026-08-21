import { chromium } from '@playwright/test';

async function testOfficeComputerHeaderFit() {
  console.log('🚀 Testing Office Computer Resolution Header Fit (1024px, 1280px, 1366px)...');

  const officeResolutions = [
    { name: '1024px_office_monitor', width: 1024, height: 768 },
    { name: '1280px_office_monitor', width: 1280, height: 800 },
    { name: '1366px_laptop_monitor', width: 1366, height: 768 }
  ];

  for (const res of officeResolutions) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: res.width, height: res.height } });
    const page = await context.newPage();

    await page.goto('http://localhost:8080');
    await page.waitForTimeout(600);

    // Unlock Admin Access & set active company
    await page.evaluate(() => {
      localStorage.setItem('admin_access_unlocked_v1', 'true');
      localStorage.setItem('site_active_company_id_v1', 'comp_1');
    });
    await page.reload();
    await page.waitForTimeout(600);

    // Take screenshot of top header bar on this office resolution
    await page.screenshot({
      path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/office_pc_fit_${res.name}.png`,
      clip: { x: 0, y: 0, width: res.width, height: 140 }
    });

    await browser.close();
  }

  console.log('✅ Office Computer Header Fit Tests Complete!');
}

testOfficeComputerHeaderFit().catch(console.error);
