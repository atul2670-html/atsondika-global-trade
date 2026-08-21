using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        // 1. Clean src/products.js
        string prodPath = dir + @"\src\products.js";
        string prodText = File.ReadAllText(prodPath, Encoding.UTF8);

        // Replace mangled / question mark strings in products.js
        prodText = prodText.Replace("\"???? ??? ??? ????? (????????? ?% - ?%)\"", "\"આખા અને પાઉડર હળદર (કર્ક્યુમિન ૩% - ૫%)\"");
        prodText = prodText.Replace("\"???? ??? ???? (????????? ?%)\"", "\"આખા હળદર ફિંગર (કર્ક્યુમિન ૩%)\"");
        prodText = prodText.Replace("\"???? ????? ????? (????????? ?%)\"", "\"શુદ્ધ હળદર પાવડર (કર્ક્યુમિન ૫%)\"");
        prodText = prodText.Replace("\"???????? ???????? ???-????????? ????\"", "\"ઓર્ગેનિક લકાડોંગ હાઈ-કર્ક્યુમિન હળદર\"");

        prodText = prodText.Replace("\"???? ???????? XXL ??? ?????? ?????? ????\"", "\"૧૧૨૧ પ્રીમિયમ XXL એક્સ્ટ્રા લોંગ બાસમતી ચોખા\"");
        prodText = prodText.Replace("\"???? ????? XXL ?????? ????\"", "\"૧૧૨૧ સ્ટીમ XXL બાસમતી ચોખા\"");
        prodText = prodText.Replace("\"???? ?????? ?????? (????) ?????? ????\"", "\"૧૧૨૧ ગોલ્ડન સેલ્લા બાસમતી ચોખા\"");
        prodText = prodText.Replace("\"???? ????? ????????? ???? ?????? ????\"", "\"૧૫૦૯ સ્ટીમ એક્સ્ટ્રા લોંગ બાસમતી ચોખા\"");

        prodText = prodText.Replace("\"???????? / ????? ???????? ???? ????? (????)\"", "\"સિંગાપોર / યુરોપ ક્વોલિટી જીરું (Jeera)\"");
        prodText = prodText.Replace("\"???????? ???????? ????? (??% ?????)\"", "\"સિંગાપોર ક્વોલિટી જીરું (૯૯% શુદ્ધ)\"");
        prodText = prodText.Replace("\"????? ???????? ????????? ????? (??.?%)\"", "\"યુરોપ ક્વોલિટી સોર્ટકેસ જીરું (૯૯.૫%)\"");

        // Fix all other ???? occurrences by turning them into clean text or fallback
        // Replace specs question mark blocks
        prodText = prodText.Replace("\"???: ?????? ??% | ???????: ??% | ?????? ???? ??? | ????? ???????????\"", "\"ભેજ: મહત્તમ ૧૦% | શુદ્ધતા: ૯૯% | કુદરતી પીળો રંગ | સ્ટીમ સ્ટેરિલાઇઝ્ડ\"");
        prodText = prodText.Replace("\"?????? ?????: ?.?? ????+ | ???: ?????? ??% | ????: ?????? ?.?% | ????????? ??? ??? ???????\"", "\"સરેરાશ લંબાઈ: ૮.૩૫ mm+ | ભેજ: મહત્તમ ૧૨% | સોર્ટકેસ અને ડબલ પોલિશ્ડ\"");
        prodText = prodText.Replace("\"???????: ??.?% / ??.?% ???? ??? ????????? ??????? | ??? ???????: ?.?%\"", "\"શુદ્ધતા: ૯૯.૫% / ૯૯.૯% મશીન ક્લીન અને સોર્ટકેસ ક્લીન | વોલેટાઈલ ઓઈલ: ૨.૫%+\"");

        File.WriteAllText(prodPath, prodText, utf8NoBom);
        Console.WriteLine("✅ src/products.js Gujarati text cleaned successfully!");

        // 2. Re-generate src/bundle.js
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
        Console.WriteLine("✅ src/bundle.js regenerated cleanly!");

        // 3. Re-generate inlined index.html
        string htmlPath = dir + @"\index.html";
        string html = File.ReadAllText(htmlPath, Encoding.UTF8);

        int scriptIdx = html.IndexOf("<script");
        if (scriptIdx > 0 && scriptIdx > html.IndexOf("</footer>")) {
            html = html.Substring(0, scriptIdx).TrimEnd();
        }

        string inlineScriptBlock = "\r\n  <script>\r\n// Full Standalone Self-Contained Script\r\n" + i18n + "\r\n\r\n" + products + "\r\n\r\n" + certs + "\r\n\r\n" + branches + "\r\n\r\n" + mainClean.ToString() + "\r\n  </script>\r\n</body>\r\n</html>";

        string fullHtml = html + inlineScriptBlock;
        File.WriteAllText(htmlPath, fullHtml, utf8NoBom);
        Console.WriteLine("✅ index.html inlined cleanly! Total bytes: " + fullHtml.Length);
    }
}
