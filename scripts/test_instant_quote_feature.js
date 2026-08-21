import { chromium } from '@playwright/test';

async function testInstantQuoteFeature() {
  console.log('🧾 Testing 1-Click Instant Quote Feature on Inquiry Directory...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 950 } });
  const page = await context.newPage();

  // Clear old localStorage to ensure fresh server sync
  await page.addInitScript(() => {
    localStorage.removeItem('site_registered_customers_v1');
    localStorage.setItem('admin_access_unlocked_v1', 'true');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Click header Inquiry button to open Directory
  const inquiryHeaderBtn = await page.$('.nav-inquiries-btn');
  if (inquiryHeaderBtn) {
    await inquiryHeaderBtn.click();
    await page.waitForTimeout(800);

    // Screenshot 1: Directory Table with Get Instant Quote button on each row
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/inquiry_directory_with_instant_quote_btn.png' });

    console.log('Clicking 1-Click Get Instant Quote button on Dubai Importer row...');
    const quoteSuccess = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr'));
      const targetRow = rows.find(r => r.textContent.includes('Dubai') || r.textContent.includes('Basmati') || r.textContent.includes('Rashid'));
      if (targetRow) {
        const btn = targetRow.querySelector('button');
        if (btn) {
          btn.click();
          return true;
        }
      }
      const anyBtn = document.querySelector('button[title*="1-Click Proforma"]');
      if (anyBtn) {
        anyBtn.click();
        return true;
      }
      return false;
    });

    console.log('Quote button click success:', quoteSuccess);
    await page.waitForTimeout(1000);

    // Screenshot 2: Pre-filled Proforma Invoice Generator for that specific customer & item
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/prefilled_proforma_quotation_for_inquiry.png' });
  }

  await browser.close();
  console.log('✅ Instant Quote Feature Test Complete!');
}

testInstantQuoteFeature().catch(console.error);
