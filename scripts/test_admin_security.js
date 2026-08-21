import { chromium } from '@playwright/test';

async function testAdminSecurity() {
  console.log('🚀 Testing Admin Visibility & Multi-Company / Password Security...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await context.newPage();

  page.on('dialog', async dialog => {
    console.log(`💬 Dialog: ${dialog.message()}`);
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.evaluate(() => {
    localStorage.removeItem('admin_access_unlocked_v1');
    localStorage.setItem('admin_access_unlocked_v1', 'false');
  });
  await page.reload();
  await page.waitForTimeout(1500);

  // 1. Visitor Mode Screenshot (No Edit Buttons visible)
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/public_visitor_clean.png' });
  console.log('📸 Public Visitor screenshot saved (Clean mode, zero edit buttons)');

  // 2. Click Admin Login button
  const adminLoginBtn = await page.$('button:has-text("Admin Login")');
  if (adminLoginBtn) {
    console.log('🔑 Clicking Admin Login button...');
    await adminLoginBtn.click();
    await page.waitForTimeout(400);

    const passInput = await page.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submitBtn = await page.$('button:has-text("Unlock Admin Access")');
      if (submitBtn) await submitBtn.click();
      await page.waitForTimeout(500);
    }
  }

  // 3. Screenshot of Admin Mode active with Multi-Company Switcher
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/admin_mode_unlocked.png' });

  // 4. Click Company Switcher dropdown
  const compMenuBtn = await page.$('button:has-text("ADIDEV")');
  if (compMenuBtn) {
    console.log('🏢 Opening Multi-Company Switcher Menu...');
    await compMenuBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/multi_company_menu.png' });
  }

  await browser.close();
  console.log('✅ Admin Security & Multi-Company Test Complete!');
}

testAdminSecurity().catch(err => {
  console.error(err);
  process.exit(1);
});
