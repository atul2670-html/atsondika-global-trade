import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:5173');
await page.waitForTimeout(1000);

await page.evaluate(() => {
  localStorage.setItem('admin_access_unlocked_v1', 'true');
});
await page.reload();
await page.waitForTimeout(1000);

const portalBtn = page.locator('button[title="Atsondika Portal"]');
await portalBtn.click();
await page.waitForTimeout(1000);
await page.screenshot({ path: 'scratch/actual_admin_panel.png' });

await browser.close();
console.log('Actual Admin Panel Screenshot Saved!');
