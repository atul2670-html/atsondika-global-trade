import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runHeroEditorInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 950 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Click Admin Edit Note & Headline button on Hero section
  const editNoteBtn = await page.$('button:has-text("✏️ Edit Note")');
  if (editNoteBtn) {
    await editNoteBtn.click();
    await page.waitForTimeout(400);

    // Enter PIN 1234 if prompted
    const pinInput = await page.$('.modal-card input[type="password"]');
    if (pinInput) {
      await pinInput.fill('1234');
      await page.click('.modal-card button[type="submit"]');
      await page.waitForTimeout(500);

      // Click Edit Note & Headline button again after login
      const editBtn2 = await page.$('button:has-text("✏️ Edit Note")');
      if (editBtn2) await editBtn2.click();
      await page.waitForTimeout(500);
    }
  }

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPath = path.join(artifactDir, 'admin_hero_note_editor.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Admin Hero Note Editor Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Admin Hero Note Inspection Completed Successfully!');
}

runHeroEditorInspection().catch(err => {
  console.error('❌ Error during hero editor inspection:', err);
  process.exit(1);
});
