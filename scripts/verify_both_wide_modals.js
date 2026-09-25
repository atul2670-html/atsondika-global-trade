import { chromium } from '@playwright/test';

async function testBothWideModals() {
  console.log('🚀 Verifying both Add/Edit Product Modal & Proforma Invoice Generator Modal widths...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Open Proforma Invoice Modal
  const quoteBtn = await page.$('button:has-text("Proforma Export Quote"), button:has-text("પ્રોફોર્મા એક્સપોર્ટ ક્વોટ"), button:has-text("Get Instant Quote")');
  if (quoteBtn) {
    await quoteBtn.click();
    await page.waitForTimeout(600);
  }

  const modalQuote = await page.$('.modal-card');
  if (modalQuote) {
    const box = await modalQuote.boundingBox();
    console.log(`📏 Proforma Invoice Generator Modal Width: ${box?.width}px`);
  }
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/proforma_invoice_modal_wide.png' });

  // Close Proforma Invoice Modal
  const closeBtn1 = await page.$('.modal-close');
  if (closeBtn1) {
    await closeBtn1.click();
    await page.waitForTimeout(400);
  }

  // 2. Open Add/Edit Product Modal
  // First login as admin or trigger edit product button if available
  const adminBtn = await page.$('button:has-text("⚙️ Admin Login"), button:has-text("🔐 Admin Login")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(400);
  }

  // Check if Add Product button exists
  const addProdBtn = await page.$('button:has-text("➕ Add Sub-Product"), button:has-text("➕ Add Product"), button:has-text("📦 + Add Website Product")');
  if (addProdBtn) {
    await addProdBtn.click();
    await page.waitForTimeout(600);
  }

  const modalProduct = await page.$('.modal-card');
  if (modalProduct) {
    const box2 = await modalProduct.boundingBox();
    console.log(`📏 Add/Edit Product Modal Width: ${box2?.width}px`);
  }
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/2096c0ce-6139-4fb7-a035-b6b0f1c643b6/add_edit_product_modal_wide.png' });

  await browser.close();
  console.log('✅ Both Modals Width Verification Complete!');
}

testBothWideModals().catch(console.error);
