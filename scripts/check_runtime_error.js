import { chromium } from '@playwright/test';

async function checkErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  const title = await page.title();
  console.log('Page Title:', title);
  
  const heroText = await page.innerText('body');
  console.log('Body Text length:', heroText.length);

  await browser.close();
}

checkErrors().catch(console.error);
