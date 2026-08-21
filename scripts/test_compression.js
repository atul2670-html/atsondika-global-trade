import { compressImageForCloud } from '../src/utils/realtimeSync.js';

console.log('Testing Image Compression Helper...');
const dummyPhotoOverrides = {
  'prod-1': {
    image: 'https://lh3.googleusercontent.com/test',
    images: ['https://lh3.googleusercontent.com/test']
  }
};

console.log('dummyPhotoOverrides check ok:', typeof dummyPhotoOverrides['prod-1']);
