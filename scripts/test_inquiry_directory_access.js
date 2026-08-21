import { chromium } from '@playwright/test';

async function testInquiryDirectoryAccess() {
  console.log('👥 Testing Customer Inquiry Directory Quick Access...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Click new header button: Inquiries (📥 ઈન્ક્વાયરી)
  const inquiryHeaderBtn = await page.$('.nav-inquiries-btn');
  console.log('Found inquiryHeaderBtn:', !!inquiryHeaderBtn);
  if (inquiryHeaderBtn) {
    await inquiryHeaderBtn.click();
    await page.waitForTimeout(800);

    // Take screenshot of open Registered Customers & Sales Leads Directory modal
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/customer_inquiry_directory_modal.png' });
  }

  await browser.close();
  console.log('✅ Customer Inquiry Directory Access Test Complete!');
}

testInquiryDirectoryAccess().catch(console.error);
