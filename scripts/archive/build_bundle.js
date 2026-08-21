const fs = require('fs');
const path = require('path');

const dir = __dirname;
let i18n = fs.readFileSync(path.join(dir, 'src/i18n.js'), 'utf8').replace(/export const/g, 'const');
let products = fs.readFileSync(path.join(dir, 'src/products.js'), 'utf8').replace(/export const/g, 'const');
let certs = fs.readFileSync(path.join(dir, 'src/certificates.js'), 'utf8').replace(/export const/g, 'const');
let branches = fs.readFileSync(path.join(dir, 'src/branches.js'), 'utf8').replace(/export const/g, 'const');
let main = fs.readFileSync(path.join(dir, 'src/main.js'), 'utf8').replace(/import\s+.*?from\s+['"].*?['"];?/g, '');

const bundleContent = `// --- ADIDEV BUNDLED STANDALONE SCRIPT (NO MODULE IMPORTS) ---
${i18n}

${products}

${certs}

${branches}

${main}
`;

fs.writeFileSync(path.join(dir, 'src/bundle.js'), bundleContent, 'utf8');
console.log('✅ bundle.js successfully created! Total bytes:', bundleContent.length);
