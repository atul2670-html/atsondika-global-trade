using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);
        Encoding win1252 = Encoding.GetEncoding(1252);
        
        string[] files = new string[] {
            dir + @"\index.html",
            dir + @"\src\i18n.js",
            dir + @"\src\products.js",
            dir + @"\src\certificates.js",
            dir + @"\src\branches.js",
            dir + @"\src\main.js"
        };

        foreach (var file in files) {
            if (File.Exists(file)) {
                string text = File.ReadAllText(file, Encoding.UTF8);
                try {
                    byte[] raw = win1252.GetBytes(text);
                    string clean = Encoding.UTF8.GetString(raw);
                    File.WriteAllText(file, clean, utf8NoBom);
                    Console.WriteLine("Fixed: " + file);
                } catch (Exception ex) {
                    Console.WriteLine("Error: " + ex.Message);
                }
            }
        }

        // Re-generate bundle.js
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

        string bundle = "// Standalone Clean UTF8 Bundle Script\r\n" + i18n + "\r\n\r\n" + products + "\r\n\r\n" + certs + "\r\n\r\n" + branches + "\r\n\r\n" + mainClean.ToString();
        File.WriteAllText(dir + @"\src\bundle.js", bundle, utf8NoBom);
        Console.WriteLine("✅ bundle.js regenerated with UTF8 No BOM!");
    }
}
