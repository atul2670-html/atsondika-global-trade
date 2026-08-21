# 🌐 ADIDEV SMART SOLUTION - Global Export House

> **APEDA & ISO 9001:2015 Certified Premium Exporter**  
> *Surat, Gujarat, India*

A high-performance, fluid, futuristic web application built with **Node.js, Vite, HTML5, and Modular CSS Glassmorphism Design**.

---

## 📁 Repository Structure (Industry Standard)

```
import-export-website/
├── public/                 # Static public assets (images, logo)
│   └── images/             # Product & branding media
├── src/                    # Application source code
│   ├── data/               # Initial products, branch offices, certificates & i18n
│   │   └── initialData.js
│   ├── styles/             # Futuristic Glassmorphism CSS design system
│   │   └── style.css
│   ├── utils/              # Helper utilities (US English address, Admin PIN)
│   │   ├── address.js
│   │   └── admin.js
│   └── main.js             # Main frontend entry module
├── scripts/                # Utility & build PowerShell scripts
│   ├── build_vite.ps1      # Production build execution script
│   ├── server.ps1          # Local development HTTP server
│   └── setup_node.ps1      # Node.js portable environment setup
├── index.html              # Main HTML page template
├── package.json            # Node.json dependency manifest & scripts
├── vite.config.js          # Vite bundler configuration
└── README.md               # Repository documentation
```

---

## ⚡ Quick Start & Development

### 1. Run Development Server
```bash
npm run dev
```
*Serves live website on `http://localhost:8080`.*

### 2. Build for Production
```bash
npm run build
```
*Outputs optimized bundle into `dist/`.*

### 3. Preview Production Build
```bash
npm run preview
```

---

## ✨ Features & Architecture

- **Futuristic Glassmorphism UI**: Backdrop blur panels, glowing accents, and animated mesh particle background.
- **4-Language i18n Support**: Instant multi-language toggle across **English (`en`)**, **Gujarati (`gu`)**, **Hindi (`hi`)**, and **French (`fr`)**.
- **Interactive Container Estimator**: Computes bags count, volume (CBM), and container capacity percentage.
- **US English Address Transliteration**: Automatic conversion of address fields to standard US English format.
- **Admin PIN Security Mode**: Password protected product edit/delete and certificate download unlock (`1234`).
- **Protected Certificate Lightbox**: Prevents unauthorized right-click downloads for public visitors.
