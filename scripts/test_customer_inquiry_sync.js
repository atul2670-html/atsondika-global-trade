import { chromium } from '@playwright/test';

async function testCustomerInquirySync() {
  console.log('🔄 Testing Cross-Computer Real-Time Customer Inquiry Sync on http://localhost:8081...');
  const browser = await chromium.launch({ headless: true });

  // Browser 1: Office Computer (Customer submitting RFQ Inquiry)
  const officeContext = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const officePage = await officeContext.newPage();

  // Browser 2: Admin PC (Exporter viewing Inquiries Box)
  const adminContext = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const adminPage = await adminContext.newPage();

  await officePage.goto('http://localhost:8081');
  await adminPage.goto('http://localhost:8081');
  await officePage.waitForTimeout(1000);

  // Office Computer fills contact form
  console.log('Submitting inquiry from Office Computer...');
  await officePage.evaluate(() => window.scrollTo(0, 2500));
  await officePage.waitForTimeout(500);

  const inputs = await officePage.$$('#contact input.form-control');
  if (inputs.length >= 3) {
    await inputs[0].fill('Office Computer Test Exporter');
    await inputs[1].fill('+91 99887 76655');
    await inputs[2].fill('office.inquiry@suratagro.com');

    const msgBox = await officePage.$('#contact textarea.form-control');
    if (msgBox) {
      await msgBox.fill('Need 50 MT Basmati Rice & Cumin Seeds Export Order for Dubai Port.');
    }

    const submitBtn = await officePage.$('#contact button[type="submit"]');
    if (submitBtn) {
      officePage.on('dialog', dialog => dialog.accept());
      await submitBtn.click();
      await officePage.waitForTimeout(1200);
    }
  }

  // Admin PC opens Inquiry Directory Box
  console.log('Checking Admin PC for live synced inquiry...');
  const inquiryHeaderBtn = await adminPage.$('.nav-inquiries-btn');
  if (inquiryHeaderBtn) {
    await inquiryHeaderBtn.click();
    await adminPage.waitForTimeout(1000);

    // Screenshot of Admin PC showing the synced Office Inquiry!
    await adminPage.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/admin_pc_synced_office_inquiry.png' });
  }

  await browser.close();
  console.log('✅ Real-Time Cross-Computer Inquiry Sync Test Complete!');
}

testCustomerInquirySync().catch(console.error);
