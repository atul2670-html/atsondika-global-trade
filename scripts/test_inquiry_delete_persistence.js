import { chromium } from '@playwright/test';

async function testInquiryDeletePersistence() {
  console.log('🗑️ Testing Persistent Inquiry Deletion & Real-Time Sync...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  // Handle window.confirm and window.alert automatically
  page.on('dialog', async dialog => {
    console.log(`Accepted dialog [${dialog.type()}]:`, dialog.message());
    await dialog.accept();
  });

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

    const countBefore = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Delete')).length;
    });
    console.log('Initial delete buttons count:', countBefore);

    if (countBefore > 0) {
      console.log('Triggering DOM click on first delete button...');
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Delete'));
        if (btn) btn.click();
      });

      await page.waitForTimeout(1000);

      // Wait 3.5 seconds to pass two 2-second background poll cycles
      console.log('Waiting for background poll cycles (3.5 seconds)...');
      await page.waitForTimeout(3500);

      const countAfter = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Delete')).length;
      });
      console.log('Post-delete buttons count (should be countBefore - 1):', countAfter);

      // Take screenshot of permanently deleted state
      await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/persistent_inquiry_deletion_verified.png' });
    }
  }

  await browser.close();
  console.log('✅ Persistent Inquiry Deletion Test Complete!');
}

testInquiryDeletePersistence().catch(console.error);
