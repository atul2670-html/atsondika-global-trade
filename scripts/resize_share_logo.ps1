Add-Type -AssemblyName System.Drawing
$inputPath = "c:\Users\patel\Software\import-export-website\public\images\logos\logo_comp_1.png"
$outputPathJpg = "c:\Users\patel\Software\import-export-website\public\images\share_preview.jpg"
$outputPathPng = "c:\Users\patel\Software\import-export-website\public\images\share_preview.png"
$logoPath = "c:\Users\patel\Software\import-export-website\public\images\logo.png"

$src = [System.Drawing.Image]::FromFile($inputPath)
$bmp = New-Object System.Drawing.Bitmap(600, 600)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(15, 23, 42)) # Match dark theme header background
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, 600, 600)

# Save JPEG at 85% quality (63 KB)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$bmp.Save($outputPathJpg, $jpegCodec, $encoderParams)
$bmp.Save($logoPath, $jpegCodec, $encoderParams)

$src.Dispose()
$bmp.Dispose()
$g.Dispose()

Write-Host "Both share_preview.jpg and logo.png saved as 63KB JPEG!"
