import { chromium } from '@playwright/test';

async function testCustomerLoginLeadCapture() {
  console.log('🚀 Testing Customer Login & Personal Lead Capture System...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Click Customer Login Button in Header
  const custBtn = await page.$('button:has-text("Customer Login"), button:has-text("કસ્ટમર લોગઈન")');
  if (custBtn) {
    await custBtn.click();
    await page.waitForTimeout(500);
  }

  // 2. Switch to Register Tab
  const regTab = await page.$('button:has-text("New Account"), button:has-text("નવું રજીસ્ટ્રેશન")');
  if (regTab) {
    await regTab.click();
    await page.waitForTimeout(400);
  }

  // 3. Fill Register Form
  await page.fill('.modal-card input[placeholder*="Patel"]', 'Rajeshbhai Shah');
  await page.fill('.modal-card input[placeholder*="98251"]', '+91 98980 12345');
  await page.fill('.modal-card input[placeholder*="atul2670"]', 'rajesh@shahimpex.com');
  await page.fill('.modal-card input[placeholder*="Patel Exports"]', 'Shah Impex Surat');

  // Submit Register Form
  page.once('dialog', async dialog => {
    console.log('💬 Alert Message:', dialog.message());
    await dialog.accept();
  });
  await page.click('.modal-card button[type="submit"]');
  await page.waitForTimeout(800);

  // Take screenshot of Customer Header & Account Button
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/customer_registered_logged_in.png' });

  // 4. Click Logged-in Customer Badge to Open Customer Dashboard
  const activeCustBtn = await page.$('button:has-text("👤 Rajeshbhai")');
  if (activeCustBtn) {
    await activeCustBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/customer_dashboard_modal.png' });
    await page.click('.modal-close');
    await page.waitForTimeout(400);
  }

  // 5. Unlock Admin Mode & Open Customer Leads Directory
  await page.evaluate(() => {
    localStorage.setItem('admin_access_unlocked_v1', 'true');
  });
  await page.reload();
  await page.waitForTimeout(800);

  // Open Admin Dropdown and click View Registered Customer Leads
  const adminDropBtn = await page.$('button:has-text("ADIDEV")');
  if (adminDropBtn) {
    await adminDropBtn.click();
    await page.waitForTimeout(400);
    await page.click('button:has-text("View Registered Customer Leads")');
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/admin_customer_leads_directory.png' });
  }

  await browser.close();
  console.log('✅ Customer Login & Personal Lead Capture Test Complete!');
}

testCustomerLoginLeadCapture().catch(console.error);
