# 🌐 ATSondika Global Trade - Multi-Currency & Banker Compliance Documentation
**ચેટ ઇતિહાસ અને સિસ્ટમ ઈમ્પ્લીમેન્ટેશન રેકોર્ડ (Chat Log & System Record)**

---

## 📌 1. મુખ્ય ઉદ્દેશ્ય (Overview & Objectives)
આ દસ્તાવેજમાં પ્લેટફોર્મના **Multi-Currency (બહુ-કરંસી) કેલ્ક્યુલેશન**, **બેંકર અને આંતરરાષ્ટ્રીય પેમેન્ટ ગેટવે (Banker & Payment Gateway Compliance)** ની રિક્વાયરમેન્ટ અને તમામ ચેટ ચર્ચાનો સુરક્ષિત રેકોર્ડ રાખવામાં આવ્યો છે.

---

## 🛒 2. પ્રોડક્ટ બેઝ કરંસી અને કાર્ટ ગણતરી (Seller Base Currency & Cart Calculation)

### 🔹 (A) પ્રોડક્ટ કાર્ડ ઈમ્પોર્ટ (Product Card Import)
- **મૂળ કરંસી (Seller Listing Base Currency):** પ્રોડક્ટ કાર્ડ પર જે કરંસીમાં ભાવ મૂકાયેલ હોય (દા.ત. `EUR €`, `INR ₹`, `USD $`) તેને જ તે પ્રોડક્ટ માટે ઓરિજિનલ બેઝ કરંસી ગણવામાં આવે છે.
- **આઈટમ બેઝ પ્રાઈઝ:** `item.localPrice`
- **ચાર્જીસ:** Packing (`item.packingCharge`), Courier (`item.courierCharge`), GST (`item.localGstRate`).

### 🔹 (B) કાર્ટ હેડર કેપ્શુલ (Cart Header Capsule Badge)
- **લેબલ:** `🏷️ Seller Product Base Currency / પ્રોડક્ટ કાર્ડ બેઝ કરંસી (Seller Listing Currency)`
- **બેંકર રિક્વાયરમેન્ટ ઈમ્પ્લીમેન્ટેશન:**
  - બેંક ઓડિટ અને બાયર વેરીફિકેશન માટે પ્રોડક્ટ કાર્ડ પર રહેલા **મૂળ લિસ્ટિંગ ભાવ** (જેમ કે `€5.20 EUR`) અને કુલ ચાર્જીસ સાથેનો ભાવ (જેમ કે `€6.16 EUR`) કેપ્શુલમાં નીચે મુજબ બતાવવામાં આવે છે:
    ```
    €5.20 EUR (Total: €6.16 EUR)
    ```
  - જો કાર્ટમાં મિક્સ કરંસી ધરાવતી પ્રોડક્ટ્સ હોય તો દરેક કરંસી પ્લસ (`+`) સાથે દર્શાવાય છે (દા.ત. `€5.20 EUR (Total: €6.16 EUR) + ₹1,438.50 INR`).

---

## 💱 3. બાયર પેમેન્ટ કરંસી અને ઓનલાઈન કન્વર્ઝન (Searchable Buyer Payment Currency)

### 🔹 (A) સર્ચેબલ કરંસી ડ્રોપડાઉન (Searchable Currency Select)
- **લોકેશન:** કાર્ટ હેડરમાં કેપ્શુલની બરાબર નીચે.
- **કાર્યપદ્ધતિ:** બાયર વિશ્વની કોઈપણ કરંસી (જેમ કે `INR`, `USD`, `EUR`, `GBP`, `AED`, `CAD`, `JPY` વગેરે) શોધીને પસંદ કરી શકે છે.
- **લાઈવ એક્સચેન્જ રેટ:** સિસ્ટમ લાઈવ ઓનલાઈન એક્સચેન્જ રેટનો ઉપયોગ કરીને કાર્ટના તમામ ભાવને પસંદ કરેલી કરંસીમાં રિયલ-ટાઈમ કન્વર્ટ કરે છે.

### 🔹 (B) Quick 1-Click INR / EUR Switch Buttons
- બાયરને સરળતા ખાતર 1-ક્લિકમાં સ્વદેશી કરંસી (`₹ INR`) અથવા બેઝ કરંસીમાં સ્વિચ કરવાનો બટન ઓપ્શન આપેલ છે.

### 🔹 (C) UPI QR અને ઓટોમેટિક INR પેમેન્ટ
- ભારત સરકારના UPI નિયમો મુજબ UPI QR માં રકમ ફક્ત INR માં હોવી જરૂરી હોવાથી, બાયર જો કોઈપણ વિદેશી કરંસી પસંદ કરે તો પણ UPI QR આપોઆપ તત્કાલીન લાઈવ રેટ મુજબ **INR (₹)** માં કન્વર્ટ થઈને ક્યુઆર કોડ જનરેટ કરે છે.

---

## 📂 4. કસ્ટમ મેઈન અને સબ-કેટેગરી મેનેજમેન્ટ (Category System)
- કોઈપણ નવી મેઈન કેટેગરી ઉમેરતી વખતે:
  - 🌾 Agro Commodities
  - 🥛 Dairy Products
  - 🧵 Textile Products
  - 👕 Readymade Garments
  - 🏗️ Used & Refurbished Industrial Machinery
  - 🏭 New Machinery & Automation Systems
  - ⚙️ Industrial Goods & Fasteners
  - 📦 Eco Packaging & Jute Bags
  - 🏷️ Electronic Products
  - 🚗 Automobile Products
- જો યુઝર દ્વારા વધારાની નવી મેઈન કેટેગરી એડ કરવામાં આવે તો તે સબ-કેટેગરી એડ કરતી વખતે **`Select Parent Main Product Category`** ડ્રોપડાઉનમાં સ્વચાલિત રીતે એડ થઈ જાય તેવી વ્યવસ્થા સુનિશ્ચિત કરેલ છે.

---

## 🌐 5. સોર્સ કોડ અને ડિપ્લોયમેન્ટ ટ્રેકિંગ (Deployment Log)
- **ફાઈલ લોકેશન:** [src/components/RfqCartDrawer.jsx](file:///c:/Users/patel/Software/import-export-website/src/components/RfqCartDrawer.jsx)
- **Git Repository:** `origin/main` (Commit `ae4619d`)
- **Cloudflare Pages Production URL:** [https://atsondika-global-trade.pages.dev](https://atsondika-global-trade.pages.dev)

---
*આ દસ્તાવેજ તમામ ચેટ હિસ્ટ્રી અને સિસ્ટમ આર્કિટેક્ચરના સલામત રેકોર્ડ માટે સિસ્ટમમાં સેવ કરવામાં આવ્યો છે.*
