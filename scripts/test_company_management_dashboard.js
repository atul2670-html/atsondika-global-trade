import { chromium } from '@playwright/test';

async function testCompanyManagementDashboard() {
  console.log('🚀 Testing Multi-Company Profile Manager Dashboard...');
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

  // 2. Open Company Profile Dropdown & click Edit Active Company Profile
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

  // 3. Screenshot full Multi-Company Profile Manager Modal
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/company_manager_dashboard.png' });

  await browser.close();
  console.log('✅ Company Manager Dashboard Test Complete!');
}

testCompanyManagementDashboard().catch(console.error);
