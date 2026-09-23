// vite.config.js
import { defineConfig } from "file:///C:/Users/patel/Software/import-export-website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/patel/Software/import-export-website/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\patel\\Software\\import-export-website";
var DATA_FILE = path.resolve(__vite_injected_original_dirname, "data/store.json");
function networkDataSyncPlugin() {
  return {
    name: "network-data-sync-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/data" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          try {
            if (fs.existsSync(DATA_FILE)) {
              const data = fs.readFileSync(DATA_FILE, "utf-8");
              return res.end(data);
            }
          } catch (e) {
          }
          return res.end(JSON.stringify({}));
        }
        if (req.url === "/api/data" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const dir = path.dirname(DATA_FILE);
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
              let newPayload = JSON.parse(body || "{}");
              let existingData = {};
              if (fs.existsSync(DATA_FILE)) {
                try {
                  existingData = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8") || "{}");
                } catch (e) {
                }
              }
              let allDeletedIds = Array.isArray(existingData.deletedInquiryIds) ? existingData.deletedInquiryIds : [];
              if (Array.isArray(newPayload.deletedInquiryIds)) {
                allDeletedIds = Array.from(/* @__PURE__ */ new Set([...allDeletedIds, ...newPayload.deletedInquiryIds]));
              }
              if (newPayload.deletedInquiryId) {
                allDeletedIds = Array.from(/* @__PURE__ */ new Set([...allDeletedIds, newPayload.deletedInquiryId]));
              }
              newPayload.deletedInquiryIds = allDeletedIds;
              if (Array.isArray(newPayload.customerList)) {
                const existingList = Array.isArray(existingData.customerList) ? existingData.customerList : [];
                const mergedMap = /* @__PURE__ */ new Map();
                existingList.forEach((c) => {
                  if (c && c.id && !allDeletedIds.includes(c.id)) mergedMap.set(c.id, c);
                });
                newPayload.customerList.forEach((c) => {
                  if (c && c.id && !allDeletedIds.includes(c.id)) mergedMap.set(c.id, c);
                });
                newPayload.customerList = Array.from(mergedMap.values());
              }
              const mergedPayload = { ...existingData, ...newPayload, updatedAt: Date.now() };
              fs.writeFileSync(DATA_FILE, JSON.stringify(mergedPayload, null, 2), "utf-8");
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ success: true, timestamp: mergedPayload.updatedAt }));
            } catch (e) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
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
var vite_config_default = defineConfig({
  base: "./",
  plugins: [react(), networkDataSyncPlugin()],
  build: {
    target: "es2015",
    modulePreload: false
  },
  server: {
    port: 8080,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwYXRlbFxcXFxTb2Z0d2FyZVxcXFxpbXBvcnQtZXhwb3J0LXdlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBhdGVsXFxcXFNvZnR3YXJlXFxcXGltcG9ydC1leHBvcnQtd2Vic2l0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGF0ZWwvU29mdHdhcmUvaW1wb3J0LWV4cG9ydC13ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBEQVRBX0ZJTEUgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGF0YS9zdG9yZS5qc29uJyk7XG5cbmZ1bmN0aW9uIG5ldHdvcmtEYXRhU3luY1BsdWdpbigpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnbmV0d29yay1kYXRhLXN5bmMtcGx1Z2luJyxcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICAvLyBSZWFkIGRhdGEgZm9yIGFueSBkZXZpY2Ugb24gbmV0d29ya1xuICAgICAgICBpZiAocmVxLnVybCA9PT0gJy9hcGkvZGF0YScgJiYgcmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhEQVRBX0ZJTEUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoREFUQV9GSUxFLCAndXRmLTgnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5lbmQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICAgIHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHt9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTYXZlIGRhdGEgZnJvbSBhbnkgUEMgdG8gbG9jYWwgc2VydmVyIHN0b3JlLmpzb24gd2l0aCBzbWFydCBtZXJnZVxuICAgICAgICBpZiAocmVxLnVybCA9PT0gJy9hcGkvZGF0YScgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgICAgbGV0IGJvZHkgPSAnJztcbiAgICAgICAgICByZXEub24oJ2RhdGEnLCBjaHVuayA9PiB7IGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKTsgfSk7XG4gICAgICAgICAgcmVxLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoREFUQV9GSUxFKTtcbiAgICAgICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIGZzLm1rZGlyU3luYyhkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICAgIGxldCBuZXdQYXlsb2FkID0gSlNPTi5wYXJzZShib2R5IHx8ICd7fScpO1xuICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdEYXRhID0ge307XG4gICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKERBVEFfRklMRSkpIHtcbiAgICAgICAgICAgICAgICB0cnkgeyBleGlzdGluZ0RhdGEgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhEQVRBX0ZJTEUsICd1dGYtOCcpIHx8ICd7fScpOyB9IGNhdGNoKGUpIHt9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBUcmFjayBwZXJzaXN0ZW50IGRlbGV0ZWQgaW5xdWlyeSBJRHMgYWNyb3NzIGFsbCBkZXZpY2VzXG4gICAgICAgICAgICAgIGxldCBhbGxEZWxldGVkSWRzID0gQXJyYXkuaXNBcnJheShleGlzdGluZ0RhdGEuZGVsZXRlZElucXVpcnlJZHMpID8gZXhpc3RpbmdEYXRhLmRlbGV0ZWRJbnF1aXJ5SWRzIDogW107XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld1BheWxvYWQuZGVsZXRlZElucXVpcnlJZHMpKSB7XG4gICAgICAgICAgICAgICAgYWxsRGVsZXRlZElkcyA9IEFycmF5LmZyb20obmV3IFNldChbLi4uYWxsRGVsZXRlZElkcywgLi4ubmV3UGF5bG9hZC5kZWxldGVkSW5xdWlyeUlkc10pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobmV3UGF5bG9hZC5kZWxldGVkSW5xdWlyeUlkKSB7XG4gICAgICAgICAgICAgICAgYWxsRGVsZXRlZElkcyA9IEFycmF5LmZyb20obmV3IFNldChbLi4uYWxsRGVsZXRlZElkcywgbmV3UGF5bG9hZC5kZWxldGVkSW5xdWlyeUlkXSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld1BheWxvYWQuZGVsZXRlZElucXVpcnlJZHMgPSBhbGxEZWxldGVkSWRzO1xuXG4gICAgICAgICAgICAgIC8vIFNtYXJ0IG1lcmdlIGZvciBjdXN0b21lckxpc3Q6IHVuaW9uIG9mIGV4aXN0aW5nIGFuZCBuZXcgaW5xdWlyaWVzIGJ5IElELCBmaWx0ZXJpbmcgb3V0IGRlbGV0ZWQgb25lc1xuICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdQYXlsb2FkLmN1c3RvbWVyTGlzdCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ0xpc3QgPSBBcnJheS5pc0FycmF5KGV4aXN0aW5nRGF0YS5jdXN0b21lckxpc3QpID8gZXhpc3RpbmdEYXRhLmN1c3RvbWVyTGlzdCA6IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0xpc3QuZm9yRWFjaChjID0+IHsgaWYgKGMgJiYgYy5pZCAmJiAhYWxsRGVsZXRlZElkcy5pbmNsdWRlcyhjLmlkKSkgbWVyZ2VkTWFwLnNldChjLmlkLCBjKTsgfSk7XG4gICAgICAgICAgICAgICAgbmV3UGF5bG9hZC5jdXN0b21lckxpc3QuZm9yRWFjaChjID0+IHsgaWYgKGMgJiYgYy5pZCAmJiAhYWxsRGVsZXRlZElkcy5pbmNsdWRlcyhjLmlkKSkgbWVyZ2VkTWFwLnNldChjLmlkLCBjKTsgfSk7XG4gICAgICAgICAgICAgICAgbmV3UGF5bG9hZC5jdXN0b21lckxpc3QgPSBBcnJheS5mcm9tKG1lcmdlZE1hcC52YWx1ZXMoKSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBtZXJnZWRQYXlsb2FkID0geyAuLi5leGlzdGluZ0RhdGEsIC4uLm5ld1BheWxvYWQsIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSB9O1xuICAgICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKERBVEFfRklMRSwgSlNPTi5zdHJpbmdpZnkobWVyZ2VkUGF5bG9hZCwgbnVsbCwgMiksICd1dGYtOCcpO1xuXG4gICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSwgdGltZXN0YW1wOiBtZXJnZWRQYXlsb2FkLnVwZGF0ZWRBdCB9KSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IGUubWVzc2FnZSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbmV0d29ya0RhdGFTeW5jUGx1Z2luKCldLFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgbW9kdWxlUHJlbG9hZDogZmFsc2VcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogODA4MCxcbiAgICBob3N0OiB0cnVlXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVSxTQUFTLG9CQUFvQjtBQUNoVyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sWUFBWSxLQUFLLFFBQVEsa0NBQVcsaUJBQWlCO0FBRTNELFNBQVMsd0JBQXdCO0FBQy9CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGdCQUFnQixRQUFRO0FBQ3RCLGFBQU8sWUFBWSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7QUFFekMsWUFBSSxJQUFJLFFBQVEsZUFBZSxJQUFJLFdBQVcsT0FBTztBQUNuRCxjQUFJLFVBQVUsZ0JBQWdCLGtCQUFrQjtBQUNoRCxjQUFJO0FBQ0YsZ0JBQUksR0FBRyxXQUFXLFNBQVMsR0FBRztBQUM1QixvQkFBTSxPQUFPLEdBQUcsYUFBYSxXQUFXLE9BQU87QUFDL0MscUJBQU8sSUFBSSxJQUFJLElBQUk7QUFBQSxZQUNyQjtBQUFBLFVBQ0YsU0FBUSxHQUFHO0FBQUEsVUFBQztBQUNaLGlCQUFPLElBQUksSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFBQSxRQUNuQztBQUdBLFlBQUksSUFBSSxRQUFRLGVBQWUsSUFBSSxXQUFXLFFBQVE7QUFDcEQsY0FBSSxPQUFPO0FBQ1gsY0FBSSxHQUFHLFFBQVEsV0FBUztBQUFFLG9CQUFRLE1BQU0sU0FBUztBQUFBLFVBQUcsQ0FBQztBQUNyRCxjQUFJLEdBQUcsT0FBTyxNQUFNO0FBQ2xCLGdCQUFJO0FBQ0Ysb0JBQU0sTUFBTSxLQUFLLFFBQVEsU0FBUztBQUNsQyxrQkFBSSxDQUFDLEdBQUcsV0FBVyxHQUFHLEVBQUcsSUFBRyxVQUFVLEtBQUssRUFBRSxXQUFXLEtBQUssQ0FBQztBQUU5RCxrQkFBSSxhQUFhLEtBQUssTUFBTSxRQUFRLElBQUk7QUFDeEMsa0JBQUksZUFBZSxDQUFDO0FBQ3BCLGtCQUFJLEdBQUcsV0FBVyxTQUFTLEdBQUc7QUFDNUIsb0JBQUk7QUFBRSxpQ0FBZSxLQUFLLE1BQU0sR0FBRyxhQUFhLFdBQVcsT0FBTyxLQUFLLElBQUk7QUFBQSxnQkFBRyxTQUFRLEdBQUc7QUFBQSxnQkFBQztBQUFBLGNBQzVGO0FBR0Esa0JBQUksZ0JBQWdCLE1BQU0sUUFBUSxhQUFhLGlCQUFpQixJQUFJLGFBQWEsb0JBQW9CLENBQUM7QUFDdEcsa0JBQUksTUFBTSxRQUFRLFdBQVcsaUJBQWlCLEdBQUc7QUFDL0MsZ0NBQWdCLE1BQU0sS0FBSyxvQkFBSSxJQUFJLENBQUMsR0FBRyxlQUFlLEdBQUcsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDO0FBQUEsY0FDekY7QUFDQSxrQkFBSSxXQUFXLGtCQUFrQjtBQUMvQixnQ0FBZ0IsTUFBTSxLQUFLLG9CQUFJLElBQUksQ0FBQyxHQUFHLGVBQWUsV0FBVyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQUEsY0FDckY7QUFDQSx5QkFBVyxvQkFBb0I7QUFHL0Isa0JBQUksTUFBTSxRQUFRLFdBQVcsWUFBWSxHQUFHO0FBQzFDLHNCQUFNLGVBQWUsTUFBTSxRQUFRLGFBQWEsWUFBWSxJQUFJLGFBQWEsZUFBZSxDQUFDO0FBQzdGLHNCQUFNLFlBQVksb0JBQUksSUFBSTtBQUMxQiw2QkFBYSxRQUFRLE9BQUs7QUFBRSxzQkFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDLGNBQWMsU0FBUyxFQUFFLEVBQUUsRUFBRyxXQUFVLElBQUksRUFBRSxJQUFJLENBQUM7QUFBQSxnQkFBRyxDQUFDO0FBQ3JHLDJCQUFXLGFBQWEsUUFBUSxPQUFLO0FBQUUsc0JBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxjQUFjLFNBQVMsRUFBRSxFQUFFLEVBQUcsV0FBVSxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQUEsZ0JBQUcsQ0FBQztBQUNoSCwyQkFBVyxlQUFlLE1BQU0sS0FBSyxVQUFVLE9BQU8sQ0FBQztBQUFBLGNBQ3pEO0FBRUEsb0JBQU0sZ0JBQWdCLEVBQUUsR0FBRyxjQUFjLEdBQUcsWUFBWSxXQUFXLEtBQUssSUFBSSxFQUFFO0FBQzlFLGlCQUFHLGNBQWMsV0FBVyxLQUFLLFVBQVUsZUFBZSxNQUFNLENBQUMsR0FBRyxPQUFPO0FBRTNFLGtCQUFJLFVBQVUsZ0JBQWdCLGtCQUFrQjtBQUNoRCxxQkFBTyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsU0FBUyxNQUFNLFdBQVcsY0FBYyxVQUFVLENBQUMsQ0FBQztBQUFBLFlBQ3RGLFNBQVEsR0FBRztBQUNULGtCQUFJLGFBQWE7QUFDakIsa0JBQUksVUFBVSxnQkFBZ0Isa0JBQWtCO0FBQ2hELHFCQUFPLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFBQSxZQUNyRDtBQUFBLFVBQ0YsQ0FBQztBQUNEO0FBQUEsUUFDRjtBQUVBLGFBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQztBQUFBLEVBQzFDLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
