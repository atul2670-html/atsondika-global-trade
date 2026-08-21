import { chromium } from '@playwright/test';

async function testTabClosePersistence() {
  console.log('🧪 Testing Laptop Browser Tab Close & Re-open Photo Persistence...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 950 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8082');
  await page.waitForTimeout(1000);

  // Switch to comp_4
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
  await page.waitForTimeout(1000);

  // Edit Punjabi dress photo in localStorage & state
  console.log('Saving custom edited photo for Punjabi Dress...');
  const testPhotoUrl = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
  await page.evaluate((url) => {
    const customList = JSON.parse(localStorage.getItem('custom_added_products_v6') || '[]');
    const updated = customList.map(p => {
      if (p.id === 'punjabi_dress_comp4' || (p.names?.en || '').includes('Punjabi Dress')) {
        return { ...p, image: url, images: [url] };
      }
      return p;
    });
    localStorage.setItem('custom_added_products_v6', JSON.stringify(updated));
    localStorage.setItem('custom_added_products_master', JSON.stringify(updated));
  }, testPhotoUrl);

  // Close page tab and open a NEW page tab (simulating browser tab close/re-open)
  console.log('Closing browser tab and re-opening...');
  await page.close();

  const newPage = await context.newPage();
  await newPage.goto('http://localhost:8082');
  await newPage.waitForTimeout(1500);

  // Switch to comp_4 on new page
  await newPage.evaluate(() => {
    const btn = document.querySelector('.company-badge-btn');
    if (btn) btn.click();
  });
  await newPage.waitForTimeout(500);

  await newPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.admin-dropdown-btn'));
    const match = btns.find(b => b.textContent.includes('Shree System Tec'));
    if (match) match.click();
  });
  await newPage.waitForTimeout(1000);

  // Verify that the custom edited photo is still present after closing/re-opening tab!
  const hasCustomPhoto = await newPage.evaluate((url) => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.some(img => img.src.includes('1583391733956'));
  }, testPhotoUrl);

  console.log(`Results after Tab Close & Re-open:`);
  console.log(`- Custom Uploaded Photo Retained: ${hasCustomPhoto}`);

  await browser.close();

  if (hasCustomPhoto) {
    console.log('\n🎉 SUCCESS! Uploaded photos remain 100% PERMANENT after tab close & re-open!');
  } else {
    console.log('\n❌ FAILED: Photo lost after tab close.');
  }
}

testTabClosePersistence().catch(console.error);
