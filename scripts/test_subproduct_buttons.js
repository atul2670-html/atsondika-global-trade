import { chromium } from '@playwright/test';

async function testSubProductButtons() {
  console.log('🚀 Testing Product Card Action Buttons in French, Gujarati & English...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Scroll to products
  await page.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(500);

  // 1. English Visitor Card Buttons
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/subproduct_buttons_en.png' });

  // 2. Switch to French
  const langBtn = await page.$('.lang-btn');
  if (langBtn) {
    await langBtn.click();
    await page.waitForTimeout(200);
    const frItem = await page.$('button:has-text("Français")');
    if (frItem) await frItem.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/subproduct_buttons_fr.png' });
  }

  // 3. Admin Login & screenshot with 2-row layout
  const adminBtn = await page.$('button:has-text("Connexion Admin"), button:has-text("Admin Login")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(300);
    const passInput = await page.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submit = await page.$('button:has-text("Unlock Admin Access"), button:has-text("Déverrouiller")');
      if (submit) await submit.click();
      await page.waitForTimeout(500);
    }
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/subproduct_buttons_admin_fr.png' });

  await browser.close();
  console.log('✅ Sub-Product Buttons Test Complete!');
}

testSubProductButtons().catch(console.error);
