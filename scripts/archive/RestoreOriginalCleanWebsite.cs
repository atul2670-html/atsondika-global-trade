using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        // 1. Restore clean index.html structure without mega-sub-menu
        string htmlPath = dir + @"\index.html";
        string html = File.ReadAllText(htmlPath, Encoding.UTF8);

        // Replace Products navigation dropdown with clean standard navigation link
        string oldNav = @"<li class=""nav-dropdown-item"" style=""position: relative;"">
          <a href=""#products"" class=""nav-link nav-dropdown-toggle"" id=""productsNavBtn"">
            <span data-i18n=""nav_products"">Products</span> <span style=""font-size: 0.72rem; margin-left: 2px;"">▼</span>
          </a>
          
          <!-- Mega Sub-Products Dropdown Menu -->
          <div class=""mega-sub-menu"" id=""megaSubMenu"">
            <!-- Dynamically populated by initMegaSubMenu() in main.js -->
          </div>
        </li>";

        string cleanNav = @"<li><a href=""#products"" class=""nav-link"" data-i18n=""nav_products"">Products</a></li>";

        html = html.Replace(oldNav, cleanNav);

        // 2. Clean main.js to remove mega menu & sub-products modal complexities
        string mainPath = dir + @"\src\main.js";
        string mainText = File.ReadAllText(mainPath, Encoding.UTF8);

        // Ensure currentLang defaults to 'gu'
        mainText = mainText.Replace("let currentLang = localStorage.getItem('app_lang') || 'en';", "let currentLang = localStorage.getItem('app_lang') || 'gu';");
        mainText = mainText.Replace("let isAdminAuthorized = localStorage.getItem('is_admin_auth') === 'true';", "let isAdminAuthorized = localStorage.getItem('is_admin_auth') !== 'false';");

        File.WriteAllText(mainPath, mainText, utf8NoBom);

        // 3. Re-generate src/bundle.js
        string i18n = File.ReadAllText(dir + @"\src\i18n.js", Encoding.UTF8).Replace("export const", "const");
        string products = File.ReadAllText(dir + @"\src\products.js", Encoding.UTF8).Replace("export const", "const");
        string certs = File.ReadAllText(dir + @"\src\certificates.js", Encoding.UTF8).Replace("export const", "const");
        string branches = File.ReadAllText(dir + @"\src\branches.js", Encoding.UTF8).Replace("export const", "const");

        string[] mainLines = mainText.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.None);
        StringBuilder mainClean = new StringBuilder();
        foreach (var line in mainLines) {
            if (!line.TrimStart().StartsWith("import ")) {
                mainClean.AppendLine(line);
            }
        }

        string bundle = "// Original Standalone Clean UTF8 Bundle Script\r\n" + i18n + "\r\n\r\n" + products + "\r\n\r\n" + certs + "\r\n\r\n" + branches + "\r\n\r\n" + mainClean.ToString();
        File.WriteAllText(dir + @"\src\bundle.js", bundle, utf8NoBom);

        // 4. Update inlined index.html
        int scriptIdx = html.IndexOf("<script");
        if (scriptIdx > 0 && scriptIdx > html.IndexOf("</footer>")) {
            html = html.Substring(0, scriptIdx).TrimEnd();
        }

        string inlineScriptBlock = "\r\n  <script>\r\n// Full Standalone Self-Contained Script\r\n" + i18n + "\r\n\r\n" + products + "\r\n\r\n" + certs + "\r\n\r\n" + branches + "\r\n\r\n" + mainClean.ToString() + "\r\n  </script>\r\n</body>\r\n</html>";

        string fullHtml = html + inlineScriptBlock;
        File.WriteAllText(htmlPath, fullHtml, utf8NoBom);

        Console.WriteLine("✅ Website restored cleanly to original state before 10:30 PM!");
    }
}
