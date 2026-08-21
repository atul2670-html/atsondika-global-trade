using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        string htmlPath = dir + @"\index.html";
        string html = File.ReadAllText(htmlPath, Encoding.UTF8);

        // Strip out existing script tags near bottom
        int scriptIdx = html.IndexOf("<script");
        if (scriptIdx > 0 && scriptIdx > html.IndexOf("</footer>")) {
            html = html.Substring(0, scriptIdx).TrimEnd();
        }

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

        string inlineScriptBlock = "\r\n  <script>\r\n// Full Standalone Self-Contained Script\r\n" + i18n + "\r\n\r\n" + products + "\r\n\r\n" + certs + "\r\n\r\n" + branches + "\r\n\r\n" + mainClean.ToString() + "\r\n  </script>\r\n</body>\r\n</html>";

        string fullHtml = html + inlineScriptBlock;

        File.WriteAllText(htmlPath, fullHtml, utf8NoBom);
        Console.WriteLine("✅ index.html inline script generated successfully! Total size: " + fullHtml.Length);
    }
}
