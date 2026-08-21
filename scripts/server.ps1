$ErrorActionPreference = "SilentlyContinue"

$root = "c:\Users\patel\Software\import-export-website"

while ($true) {
    try {
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:8080/")
        $listener.Start()
        Write-Host "Stable Web Server running at http://localhost:8080/"

        while ($true) {
            try {
                $context = $listener.GetContext()
                if ($null -eq $context) { continue }

                $request = $context.Request
                $response = $context.Response

                $path = $request.Url.LocalPath
                if ($path -eq "/") { $path = "/index.html" }

                $cleanPath = $path.TrimStart('/').Replace('/', '\')
                $filePath = Join-Path $root $cleanPath

                if (Test-Path $filePath -PathType Leaf) {
                    $bytes = [System.IO.File]::ReadAllBytes($filePath)

                    $ext = [System.IO.Path]::GetExtension($filePath)
                    switch ($ext) {
                        ".html" { $response.ContentType = "text/html; charset=utf-8" }
                        ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                        ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                        ".png"  { $response.ContentType = "image/png" }
                        ".jpg"  { $response.ContentType = "image/jpeg" }
                        default { $response.ContentType = "application/octet-stream" }
                    }

                    $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
                    $response.AddHeader("Pragma", "no-cache")
                    $response.AddHeader("Expires", "0")

                    $response.ContentLength64 = $bytes.Length
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                } else {
                    $response.StatusCode = 404
                }

                try { $response.Close() } catch {}
            } catch {
                # Ignore connection/stream errors per request
            }
        }
    } catch {
        Start-Sleep -Milliseconds 500
    }
}
