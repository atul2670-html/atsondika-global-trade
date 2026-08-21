import { chromium } from '@playwright/test';

async function testSubProductCardsCrop2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Switch to French & Admin
  const langBtn = await page.$('.lang-btn');
  if (langBtn) {
    await langBtn.click();
    await page.waitForTimeout(200);
    const frItem = await page.$('button:has-text("Français")');
    if (frItem) await frItem.click();
    await page.waitForTimeout(400);
  }

  const adminBtn = await page.$('button:has-text("Connexion Admin")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(300);
    const passInput = await page.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submit = await page.$('button:has-text("Déverrouiller")');
      if (submit) await submit.click();
      await page.waitForTimeout(500);
    }
  }

  await page.evaluate(() => window.scrollBy(0, 1400));
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/subproduct_cards_focused.png' });

  await browser.close();
}

testSubProductCardsCrop2().catch(console.error);
