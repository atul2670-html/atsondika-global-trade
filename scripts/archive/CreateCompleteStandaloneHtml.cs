using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        // 1. Read style.css
        string cssPath = dir + @"\style.css";
        string cssText = File.ReadAllText(cssPath, Encoding.UTF8);

        // 2. Read src scripts
        string i18n = File.ReadAllText(dir + @"\src\i18n.js", Encoding.UTF8).Replace("export const", "const");
        string products = File.ReadAllText(dir + @"\src\products.js", Encoding.UTF8).Replace("export const", "const");
        string certs = File.ReadAllText(dir + @"\src\certificates.js", Encoding.UTF8).Replace("export const", "const");
        string branches = File.ReadAllText(dir + @"\src\branches.js", Encoding.UTF8).Replace("export const", "const");

        string main = File.ReadAllText(dir + @"\src\main.js", Encoding.UTF8);
        string[] mainLines = main.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.None);
        StringBuilder mainClean = new StringBuilder();
        foreach (var line in mainLines) {
            if (!line.TrimStart().StartsWith("import ")) {
                mainClean.AppendLine(line);
            }
        }

        // 3. Read index.html base structure
        string htmlPath = dir + @"\index.html";
        string html = File.ReadAllText(htmlPath, Encoding.UTF8);

        // Replace <link rel="stylesheet" href="style.css..."> with inline <style>
        int linkStyleIdx = html.IndexOf("<link rel=\"stylesheet\"");
        if (linkStyleIdx > 0) {
            int endLinkIdx = html.IndexOf(">", linkStyleIdx);
            if (endLinkIdx > 0) {
                html = html.Substring(0, linkStyleIdx) + "<style>\r\n" + cssText + "\r\n</style>" + html.Substring(endLinkIdx + 1);
            }
        }

        // Strip out old script tags
        int scriptIdx = html.IndexOf("<script");
        if (scriptIdx > 0 && scriptIdx > html.IndexOf("</footer>")) {
            html = html.Substring(0, scriptIdx).TrimEnd();
        }

        string fullJsBlock = "\r\n  <script>\r\n// ADIDEV SMART SOLUTION - STANDALONE MASTER SCRIPT\r\n" + i18n + "\r\n\r\n" + products + "\r\n\r\n" + certs + "\r\n\r\n" + branches + "\r\n\r\n" + mainClean.ToString() + "\r\n  </script>\r\n</body>\r\n</html>";

        string standaloneHtml = html + fullJsBlock;
        File.WriteAllText(htmlPath, standaloneHtml, utf8NoBom);

        Console.WriteLine("✅ Single Standalone index.html created successfully! Total size: " + standaloneHtml.Length);
    }
}
