import { chromium } from '@playwright/test';

async function testLightDarkContrast() {
  console.log('🚀 Testing Light Mode & Dark Mode High-Contrast Theme System...');
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

  // 2. Toggle to LIGHT MODE
  const themeToggle = await page.$('.header-actions button:has-text("☀️"), .header-actions button:has-text("🌙")');
  if (themeToggle) {
    await themeToggle.click();
    await page.waitForTimeout(500);
  }

  // Screenshot Light Mode Products Grid
  await page.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/light_mode_products_contrast.png' });

  // Open Company Modal in Light Mode
  const compDropdown = await page.$('.header-actions button:has-text("ADIDEV")');
  if (compDropdown) {
    await compDropdown.click();
    await page.waitForTimeout(300);
    const editCompBtn = await page.$('button:has-text("Edit Active Company Profile")');
    if (editCompBtn) {
      await editCompBtn.click();
      await page.waitForTimeout(500);
    }
  }
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/light_mode_modal_contrast.png' });

  // Close modal & toggle back to Dark Mode
  const closeBtn = await page.$('.modal-close');
  if (closeBtn) await closeBtn.click();
  await page.waitForTimeout(300);

  const themeToggle2 = await page.$('.header-actions button:has-text("☀️"), .header-actions button:has-text("🌙")');
  if (themeToggle2) {
    await themeToggle2.click();
    await page.waitForTimeout(500);
  }

  // Open Company Modal in Dark Mode
  const compDropdown2 = await page.$('.header-actions button:has-text("ADIDEV")');
  if (compDropdown2) {
    await compDropdown2.click();
    await page.waitForTimeout(300);
    const editCompBtn2 = await page.$('button:has-text("Edit Active Company Profile")');
    if (editCompBtn2) {
      await editCompBtn2.click();
      await page.waitForTimeout(500);
    }
  }
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/dark_mode_modal_contrast.png' });

  await browser.close();
  console.log('✅ Light & Dark Contrast Test Complete!');
}

testLightDarkContrast().catch(console.error);
