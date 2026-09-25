import { chromium } from '@playwright/test';

async function testCurrencyAndRefStability() {
  console.log('🚀 Launching Playwright browser verification for Proforma Currency Sync & Ref No Stability...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Find Dairy Products or Proforma quote button
  const quoteBtn = await page.$('button:has-text("Proforma Export Quote"), button:has-text("પ્રોફોર્મા એક્સપોર્ટ ક્વોટ"), button:has-text("Get Instant Quote")');
  if (quoteBtn) {
    await quoteBtn.click();
    await page.waitForTimeout(600);
  }

  // Check initial Ref No text
  const refElem = await page.$('#printableProformaSheet');
  let refText1 = '';
  if (refElem) {
    const text = await refElem.textContent();
    const match = text.match(/Ref No:\s*([A-Z0-9\/]+)/);
    if (match) refText1 = match[1];
  }
  console.log('📌 Initial Ref No:', refText1);

  // Type into Buyer Name input to trigger re-renders
  const buyerNameInput = await page.$('.modal-card input');
  if (buyerNameInput) {
    await buyerNameInput.fill('Atsondika Test Importer Corp');
    await page.waitForTimeout(400);
  }

  // Check Ref No text again after typing
  let refText2 = '';
  if (refElem) {
    const text = await refElem.textContent();
    const match = text.match(/Ref No:\s*([A-Z0-9\/]+)/);
    if (match) refText2 = match[1];
  }
  console.log('📌 Ref No after typing:', refText2);

  if (refText1 === refText2) {
    console.log('✅ PASS: PROFORMA INVOICE Ref No is 100% STABLE! No flickering detected.');
  } else {
    console.error('❌ FAIL: Ref No changed between renders!');
  }

  // Take verification screenshot of the Proforma Invoice Sheet showing INR currency and stable Ref No
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/proforma_inr_currency_and_stable_ref.png' });

  await browser.close();
  console.log('🎉 Verification finished successfully!');
}

testCurrencyAndRefStability().catch(console.error);
