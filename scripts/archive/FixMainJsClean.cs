using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        string mainPath = dir + @"\src\main.js";
        string mainText = File.ReadAllText(mainPath, Encoding.UTF8);

        mainText = mainText.Replace("?? Details (????? ???)", "🔍 Details (વિગતો જુઓ)");
        mainText = mainText.Replace("?? Inquire (??? ????)", "💬 Inquire (ભાવ પૂછો)");
        mainText = mainText.Replace("?? Edit Sub-Product", "✏️ Edit Sub-Product");
        mainText = mainText.Replace("?? Group Photos", "📷 Group Photos");
        mainText = mainText.Replace("? Add / Manage Sub-Products", "🌿 Add / Manage Sub-Products");
        mainText = mainText.Replace("(????? ??? ???? ????)", "(વિગતો અને ફોટો જુઓ)");
        mainText = mainText.Replace("?? ", "🌿 ");

        // Fix sub-carousel prev/next arrows
        mainText = mainText.Replace("class=\"sub-carousel-nav sub-carousel-prev\" data-parent-id=\"${p.id}\" data-sub-id=\"${sub.id}\"></button>", "class=\"sub-carousel-nav sub-carousel-prev\" data-parent-id=\"${p.id}\" data-sub-id=\"${sub.id}\">‹</button>");
        mainText = mainText.Replace("class=\"sub-carousel-nav sub-carousel-next\" data-parent-id=\"${p.id}\" data-sub-id=\"${sub.id}\"></button>", "class=\"sub-carousel-nav sub-carousel-next\" data-parent-id=\"${p.id}\" data-sub-id=\"${sub.id}\">›</button>");

        // Add safety try/catch around every step in startApp()
        string oldStartApp = @"function startApp() {
  initLanguageSystem();
  initAdminAuthSystem();
  renderProducts();
  initMegaSubMenu();
  renderCertificates();
  renderBranches();
  initEventListeners();
  initPhotoUploader();
  initCertUploader();
  initBranchUploader();
  initSubProductsManager();
  initSubProductViewModal();
  initRfqFileAttachment();
  initAdminInquiriesManager();
  initRfqFormSubmissions();
}";

        string newStartApp = @"function startApp() {
  try { localStorage.removeItem('custom_product_galleries_corrupt'); } catch(e){}
  try { initLanguageSystem(); } catch (e) { console.error('Language Error:', e); }
  try { initAdminAuthSystem(); } catch (e) { console.error('Admin Auth Error:', e); }
  try { renderProducts(); } catch (e) { console.error('Render Products Error:', e); }
  try { initMegaSubMenu(); } catch (e) { console.error('Mega Menu Error:', e); }
  try { renderCertificates(); } catch (e) { console.error('Certificates Error:', e); }
  try { renderBranches(); } catch (e) { console.error('Branches Error:', e); }
  try { initEventListeners(); } catch (e) { console.error('Event Listeners Error:', e); }
  try { initPhotoUploader(); } catch (e) { console.error('Photo Uploader Error:', e); }
  try { initCertUploader(); } catch (e) { console.error('Cert Uploader Error:', e); }
  try { initBranchUploader(); } catch (e) { console.error('Branch Uploader Error:', e); }
  try { initSubProductsManager(); } catch (e) { console.error('Sub Products Error:', e); }
  try { initSubProductViewModal(); } catch (e) { console.error('Sub Product View Error:', e); }
  try { initRfqFileAttachment(); } catch (e) { console.error('RFQ Attachment Error:', e); }
  try { initAdminInquiriesManager(); } catch (e) { console.error('Admin Inquiries Error:', e); }
  try { initRfqFormSubmissions(); } catch (e) { console.error('RFQ Submission Error:', e); }
}";

        mainText = mainText.Replace(oldStartApp, newStartApp);

        File.WriteAllText(mainPath, mainText, utf8NoBom);
        Console.WriteLine("✅ src/main.js cleaned and enhanced with robust startApp try/catch!");
    }
}
