import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

async function runVerification() {
  console.log('🚀 Starting thorough internal pages verification...');

  // Start vite preview server
  const viteProcess = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], {
    cwd: process.cwd(),
    shell: true
  });

  // Wait 3 seconds for server to start
  await new Promise(r => setTimeout(r, 3000));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('🔗 Navigating to http://localhost:4173 ...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });

  // 1. Capture Header & Home Section
  console.log('📸 1. Capturing Header & Top Home Section...');
  await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_1_top_header.png') });

  // 2. Test Sister Company switching
  console.log('🏢 2. Testing Sister Company switching...');
  const companyButtons = await page.$$('.multi-company-tab');
  if (companyButtons.length > 1) {
    await companyButtons[1].click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_2_sister_company.png') });
  }

  // 3. Test Scroll down to Products section
  console.log('📜 3. Scrolling down to Products & checking sticky header docking...');
  await page.evaluate(() => {
    const el = document.querySelector('#products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_3_scrolled_products.png') });

  // 4. Test Customer Login Modal
  console.log('👤 4. Opening Customer Login Modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const custBtn = btns.find(b => b.innerText.includes('Customer Login') || b.innerText.includes('કસ્ટમર લોગઈન'));
    if (custBtn) custBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_4_customer_modal.png') });

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 5. Test RFQ Cart Drawer
  console.log('🛒 5. Opening RFQ Cart Drawer...');
  await page.evaluate(() => {
    const cartBtn = document.querySelector('.nav-rfq-cart-btn');
    if (cartBtn) cartBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_5_rfq_drawer.png') });

  // Close drawer
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.rfq-drawer-close, button[style*="transparent"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 6. Test Container Calculator section
  console.log('🧮 6. Navigating to Container Calculator...');
  await page.evaluate(() => {
    const calcEl = document.querySelector('#calc');
    if (calcEl) calcEl.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_6_calculator.png') });

  // 7. Test Contact / RFQ Form Section at Bottom
  console.log('📝 7. Navigating to Contact / Inquiry Form at bottom...');
  await page.evaluate(() => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) contactEl.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(process.cwd(), 'scratch', 'verify_7_contact_form.png') });

  await browser.close();
  viteProcess.kill();
  console.log('✅ Internal pages verification completed successfully!');
}

runVerification().catch(err => {
  console.error('❌ Verification Error:', err);
  process.exit(1);
});
