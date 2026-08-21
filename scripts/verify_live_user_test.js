import { chromium } from '@playwright/test';

async function verifyLiveUserTest() {
  console.log('📸 Verifying Live Test Inquiry in Directory Box...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  // Unlock Admin mode in localStorage
  await page.addInitScript(() => {
    localStorage.setItem('admin_access_unlocked_v1', 'true');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Click header Inquiry button to open Directory
  const inquiryHeaderBtn = await page.$('.nav-inquiries-btn');
  if (inquiryHeaderBtn) {
    await inquiryHeaderBtn.click();
    await page.waitForTimeout(800);

    // Take screenshot showing the newly raised live inquiry at the top!
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/live_test_inquiry_received.png' });
  }

  await browser.close();
  console.log('✅ Live Test Inquiry Verification Complete!');
}

verifyLiveUserTest().catch(console.error);
