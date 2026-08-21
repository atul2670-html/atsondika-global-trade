using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        string mainPath = dir + @"\src\main.js";
        string mainText = File.ReadAllText(mainPath, Encoding.UTF8);

        // Replace all mangled showNotice & notice strings with clean text
        mainText = mainText.Replace("title=\"Remove Photo\">?</button>", "title=\"Remove Photo\">✕</button>");
        mainText = mainText.Replace("showNotice(`? ${files.length} ??🌿 ???????🌿 ????🌿 ???!`);", "showNotice(`✅ ${files.length} Photos added successfully!`);");
        mainText = mainText.Replace("showNotice(\"🌿 ???🌿 ??🌿 Web URL ???.\", false);", "showNotice(\"⚠️ Please enter a valid Web Image URL.\", false);");
        mainText = mainText.Replace("showNotice(\"? Photo URL ???????!\");", "showNotice(\"✅ Photo Web URL added!\");");
        mainText = mainText.Replace("? Add New Sub-Product / Variant (?🌿 ??🌿 ??????🌿 ?????):", "➕ Add New Sub-Product / Variant (નવી પેટા પ્રોડક્ટ ઉમેરો):");
        mainText = mainText.Replace("showNotice('🌿 ??🌿 ???🌿 ??🌿 ?????????🌿 ?🌿 (?????🌿 ??🌿 ???????) ???.', false);", "showNotice('⚠️ Please enter sub-product name in English or Gujarati.', false);");
        mainText = mainText.Replace("showNotice(\"🌿 ???🌿 ??🌿 ??????🌿 ?????🌿 ?????🌿 ??????!\", true);", "showNotice(\"✅ Sub-product saved successfully!\", true);");

        File.WriteAllText(mainPath, mainText, utf8NoBom);
        Console.WriteLine("✅ src/main.js completely cleaned!");
    }
}
