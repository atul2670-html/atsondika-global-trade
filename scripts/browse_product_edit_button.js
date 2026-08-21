import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runProductEditButtonInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 980 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Scroll to products section
  await page.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(600);

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';

  // Screenshot 1: Product Grid with ✏️ Edit Buttons
  const ssPathGrid = path.join(artifactDir, 'product_grid_with_edit_buttons.png');
  await page.screenshot({ path: ssPathGrid });
  console.log(`📸 Saved Product Grid with Edit Buttons Screenshot: ${ssPathGrid}`);

  // Unlock Admin Mode & click ✏️ Edit on a product
  const editBtn = await page.$('button:has-text("✏️ Edit")');
  if (editBtn) {
    await editBtn.click();
    await page.waitForTimeout(400);

    const pinInput = await page.$('.modal-card input[type="password"]');
    if (pinInput) {
      await pinInput.fill('1234');
      await page.click('.modal-card button[type="submit"]');
      await page.waitForTimeout(600);
    }
  }

  // Screenshot 2: Product Edit Modal Pre-filled
  const ssPathModal = path.join(artifactDir, 'product_edit_modal_opened.png');
  await page.screenshot({ path: ssPathModal });
  console.log(`📸 Saved Product Edit Modal Screenshot: ${ssPathModal}`);

  await browser.close();
  console.log('✅ Product Edit Button Inspection Completed Successfully!');
}

runProductEditButtonInspection().catch(err => {
  console.error('❌ Error during product edit button inspection:', err);
  process.exit(1);
});
