import { chromium } from '@playwright/test';

async function testRealtimeNetworkSync() {
  console.log('🚀 Testing Real-Time Network Cross-Computer Data Sync...');
  const browser = await chromium.launch({ headless: true });

  // Browser Context 1 (Admin PC)
  const adminContext = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const adminPage = await adminContext.newPage();

  adminPage.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await adminPage.goto('http://localhost:8080');
  await adminPage.waitForTimeout(1000);

  // 1. Unlock Admin on PC 1
  const adminBtn = await adminPage.$('button:has-text("Admin Login")');
  if (adminBtn) {
    await adminBtn.click();
    await adminPage.waitForTimeout(300);
    const passInput = await adminPage.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submit = await adminPage.$('button:has-text("Unlock Admin Access")');
      if (submit) await submit.click();
      await adminPage.waitForTimeout(500);
    }
  }

  // 2. Open Company Edit Modal on PC 1 & change name of comp_2 to 'ADIDEV AGRO EXPORTS & COMMODITIES 1234'
  const compDropdown = await adminPage.$('.header-actions button:has-text("ADIDEV")');
  if (compDropdown) {
    await compDropdown.click();
    await adminPage.waitForTimeout(300);
    const editCompBtn = await adminPage.$('button:has-text("Edit Active Company Profile")');
    if (editCompBtn) {
      await editCompBtn.click();
      await adminPage.waitForTimeout(500);
    }
  }

  // Select comp_2 tab (ADIDEV AGRO EXPORTS)
  const comp2Tab = await adminPage.$('button:has-text("ADIDEV AGRO EXPORTS")');
  if (comp2Tab) {
    await comp2Tab.click();
    await adminPage.waitForTimeout(300);
  }

  // Edit name input
  const nameInput = await adminPage.$('input[value*="ADIDEV AGRO EXPORTS"]');
  if (nameInput) {
    await nameInput.fill('ADIDEV AGRO EXPORTS & COMMODITIES 1234');
    const saveBtn = await adminPage.$('button:has-text("Save Company Profile & Activate")');
    if (saveBtn) await saveBtn.click();
    await adminPage.waitForTimeout(800);
  }

  // Take screenshot on PC 1 (Admin PC)
  await adminPage.evaluate(() => {
    const el = document.querySelector('.footer');
    if (el) el.scrollIntoView();
  });
  await adminPage.waitForTimeout(400);
  await adminPage.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/admin_pc_changed_1234.png' });

  // 3. Browser Context 2 (Office PC - Completely isolated session/device)
  const officeContext = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const officePage = await officeContext.newPage();
  await officePage.goto('http://localhost:8080');
  await officePage.waitForTimeout(1000);

  // Take screenshot on PC 2 (Office PC) after network sync
  await officePage.evaluate(() => {
    const el = document.querySelector('.footer');
    if (el) el.scrollIntoView();
  });
  await officePage.waitForTimeout(400);
  await officePage.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/office_pc_synced_1234.png' });

  // 4. Restore original name 'ADIDEV AGRO EXPORTS & COMMODITIES' on PC 1
  const compDropdown2 = await adminPage.$('.header-actions button:has-text("ADIDEV")');
  if (compDropdown2) {
    await compDropdown2.click();
    await adminPage.waitForTimeout(300);
    const editCompBtn2 = await adminPage.$('button:has-text("Edit Active Company Profile")');
    if (editCompBtn2) {
      await editCompBtn2.click();
      await adminPage.waitForTimeout(500);
    }
  }

  const comp2Tab2 = await adminPage.$('button:has-text("ADIDEV AGRO EXPORTS")');
  if (comp2Tab2) {
    await comp2Tab2.click();
    await adminPage.waitForTimeout(300);
  }

  const nameInput2 = await adminPage.$('input[value*="ADIDEV AGRO EXPORTS"]');
  if (nameInput2) {
    await nameInput2.fill('ADIDEV AGRO EXPORTS & COMMODITIES');
    const saveBtn2 = await adminPage.$('button:has-text("Save Company Profile & Activate")');
    if (saveBtn2) await saveBtn2.click();
    await adminPage.waitForTimeout(800);
  }

  await browser.close();
  console.log('✅ Real-Time Network Sync Test Complete!');
}

testRealtimeNetworkSync().catch(console.error);
