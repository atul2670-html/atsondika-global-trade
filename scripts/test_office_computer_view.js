import { chromium } from '@playwright/test';

async function testOfficeComputerView() {
  console.log('🚀 Testing Office Computer Viewports (1280px, 1366px, 1440px)...');
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: '1280px_office_laptop', width: 1280, height: 800 },
    { name: '1366px_office_monitor', width: 1366, height: 768 },
    { name: '1440px_desktop_monitor', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    await page.goto('http://localhost:8080');
    await page.waitForTimeout(1200);

    // Verify all 7 menu links are visible
    const links = await page.$$('.nav-menu .nav-link');
    console.log(`[${vp.name}] Found ${links.length} visible navbar menu links!`);

    await page.screenshot({ path: `C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/office_computer_${vp.name}.png` });

    await context.close();
  }

  await browser.close();
  console.log('✅ Office Computer Viewport Test Complete!');
}

testOfficeComputerView().catch(console.error);
