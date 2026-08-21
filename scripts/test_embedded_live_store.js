import { chromium } from '@playwright/test';

async function testEmbeddedLiveStore() {
  console.log('🧪 Testing Fresh Visitor View with COMPLETELY CLEARED LocalStorage...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 950 } });
  const page = await context.newPage();

  // COMPLETELY CLEAR LOCALSTORAGE (Simulate new mobile device / visitor)
  await page.addInitScript(() => {
    localStorage.clear();
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1500);

  // Take screenshot 1: Main Home Page with default company
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/fresh_visitor_home_view.png' });

  // Open Company Selector and switch to Company 4 (Shree System Tec)
  const companyBtn = await page.$('.company-badge-btn');
  if (companyBtn) {
    await companyBtn.click();
    await page.waitForTimeout(600);

    const comp4Option = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.admin-dropdown-btn'));
      const target = btns.find(b => b.textContent.includes('Shree System Tec'));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });

    console.log('Switch to Shree System Tec success:', comp4Option);
    await page.waitForTimeout(1000);

    // Take screenshot 2: Shree System Tec view on fresh browser
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/fresh_visitor_shree_system_tec_view.png' });
  }

  await browser.close();
  console.log('✅ Embedded Live Store Test Complete!');
}

testEmbeddedLiveStore().catch(console.error);
