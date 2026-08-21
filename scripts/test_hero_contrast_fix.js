import { chromium } from '@playwright/test';

async function testHeroContrastFix() {
  console.log('🚀 Testing Hero & Section Typography High Contrast in Light & Dark Mode...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Unlock Admin
  const adminBtn = await page.$('button:has-text("Admin Login")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(300);
    const passInput = await page.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submit = await page.$('button:has-text("Unlock Admin Access")');
      if (submit) await submit.click();
      await page.waitForTimeout(500);
    }
  }

  // Screenshot Dark Mode Hero
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/dark_mode_hero_contrast_fixed.png' });

  // 2. Switch to LIGHT MODE
  const themeToggle = await page.$('.header-actions button:has-text("☀️"), .header-actions button:has-text("🌙")');
  if (themeToggle) {
    await themeToggle.click();
    await page.waitForTimeout(500);
  }

  // Screenshot Light Mode Hero
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/light_mode_hero_contrast_fixed.png' });

  await browser.close();
  console.log('✅ Hero Contrast Test Complete!');
}

testHeroContrastFix().catch(console.error);
