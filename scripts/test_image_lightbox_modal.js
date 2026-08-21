import { chromium } from '@playwright/test';

async function testImageLightboxModal() {
  console.log('🖼️ Testing Original Full Photo Lightbox Window & Zoom Preview...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll down to products grid
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  // 1. Hover over the first product image wrapper
  const firstProdImg = await page.$('.product-img-wrapper');
  if (firstProdImg) {
    await firstProdImg.hover();
    await page.waitForTimeout(400);
    // Take screenshot of product photo hover zoom badge
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/product_photo_hover_zoom_badge.png' });

    // Click the photo to open High-Resolution Original Full Photo Lightbox Window
    await firstProdImg.click();
    await page.waitForTimeout(800);

    // 2. Take screenshot of Original Full Photo Lightbox Window
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/product_original_full_photo_lightbox_modal.png' });

    // 3. Click 2X Ultra Zoom button
    const zoomBtn = await page.$('button:has-text("2X Ultra Zoom")');
    if (zoomBtn) {
      await zoomBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/product_photo_2x_ultra_zoom.png' });
    }
  }

  await browser.close();
  console.log('✅ Original Full Photo Lightbox Window & Zoom Tests Complete!');
}

testImageLightboxModal().catch(console.error);
