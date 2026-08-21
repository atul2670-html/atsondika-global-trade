import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(__dirname, 'data/store.json');

function networkDataSyncPlugin() {
  return {
    name: 'network-data-sync-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Read data for any device on network
        if (req.url === '/api/data' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            if (fs.existsSync(DATA_FILE)) {
              const data = fs.readFileSync(DATA_FILE, 'utf-8');
              return res.end(data);
            }
          } catch(e) {}
          return res.end(JSON.stringify({}));
        }

        // Save data from any PC to local server store.json with smart merge
        if (req.url === '/api/data' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const dir = path.dirname(DATA_FILE);
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

              let newPayload = JSON.parse(body || '{}');
              let existingData = {};
              if (fs.existsSync(DATA_FILE)) {
                try { existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '{}'); } catch(e) {}
              }

              // Track persistent deleted inquiry IDs across all devices
              let allDeletedIds = Array.isArray(existingData.deletedInquiryIds) ? existingData.deletedInquiryIds : [];
              if (Array.isArray(newPayload.deletedInquiryIds)) {
                allDeletedIds = Array.from(new Set([...allDeletedIds, ...newPayload.deletedInquiryIds]));
              }
              if (newPayload.deletedInquiryId) {
                allDeletedIds = Array.from(new Set([...allDeletedIds, newPayload.deletedInquiryId]));
              }
              newPayload.deletedInquiryIds = allDeletedIds;

              // Smart merge for customerList: union of existing and new inquiries by ID, filtering out deleted ones
              if (Array.isArray(newPayload.customerList)) {
                const existingList = Array.isArray(existingData.customerList) ? existingData.customerList : [];
                const mergedMap = new Map();
                existingList.forEach(c => { if (c && c.id && !allDeletedIds.includes(c.id)) mergedMap.set(c.id, c); });
                newPayload.customerList.forEach(c => { if (c && c.id && !allDeletedIds.includes(c.id)) mergedMap.set(c.id, c); });
                newPayload.customerList = Array.from(mergedMap.values());
              }

              const mergedPayload = { ...existingData, ...newPayload, updatedAt: Date.now() };
              fs.writeFileSync(DATA_FILE, JSON.stringify(mergedPayload, null, 2), 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, timestamp: mergedPayload.updatedAt }));
            } catch(e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), networkDataSyncPlugin()],
  build: {
    target: 'es2015',
    modulePreload: false
  },
  server: {
    port: 8080,
    host: true
  }
});
