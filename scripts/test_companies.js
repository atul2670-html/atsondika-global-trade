import fs from 'fs';

// Load initial store data
const rawData = JSON.parse(fs.readFileSync('src/data/initialData.js', 'utf8').replace('export const ', 'const ').replace(/export default.*;/, ''));

console.log('Testing 4 Companies Products Logic...');
console.log('Done test setup check.');
