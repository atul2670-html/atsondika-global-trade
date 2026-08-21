import { chromium } from '@playwright/test';

async function testFreshVisitorComp4() {
  console.log('🧪 Testing Fresh Visitor View for Shree System Tec (comp_4)...');
  const browser = await chromium.launch({ headless: true });

  // Clean context with ZERO localStorage
  const context = await browser.newContext({ viewport: { width: 1366, height: 950 } });
  const page = await context.newPage();

  // Clear all storage explicitly
  await page.goto('http://localhost:8082');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(1500);

  // Switch to Shree System Tec (comp_4)
  console.log('Switching to Shree System Tec...');
  await page.evaluate(() => {
    const btn = document.querySelector('.company-badge-btn');
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.admin-dropdown-btn'));
    const match = btns.find(b => b.textContent.includes('Shree System Tec'));
    if (match) match.click();
  });
  await page.waitForTimeout(1500);

  // Check if Punjabi Dress & Readymade Garments are visible
  const pageText = await page.evaluate(() => document.body.textContent);
  const hasGarments = pageText.includes('Readymade Garments') || pageText.includes('રેડિ-મેડ ગારમેન્ટ્સ');
  const hasPunjabiDress = pageText.includes('Punjabi Dress') || pageText.includes('પંજાબી ડ્રેસ');

  console.log(`Results for Fresh Visitor on Shree System Tec:`);
  console.log(`- Readymade Garments Visible: ${hasGarments}`);
  console.log(`- Punjabi Dress Visible: ${hasPunjabiDress}`);

  await browser.close();

  if (hasGarments && hasPunjabiDress) {
    console.log('\n🎉 SUCCESS! Fresh visitor sees Readymade Garments & Punjabi Dress OUT OF THE BOX!');
  } else {
    console.log('\n❌ FAILED: Fresh visitor missing items.');
  }
}

testFreshVisitorComp4().catch(console.error);
