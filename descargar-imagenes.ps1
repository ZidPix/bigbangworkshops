# ============================================================
# BIG BANG WORKSHOPS — Descargar imágenes del CDN de Shopify
# Cómo usarlo: clic derecho sobre este archivo → "Ejecutar con PowerShell"
# Descarga las ~1,263 imágenes de productos a assets/img/
# Se puede interrumpir y volver a ejecutar: salta las ya descargadas.
# ============================================================
$ErrorActionPreference = "Continue"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root   = Split-Path -Parent $MyInvocation.MyCommand.Path
$json   = Join-Path $root "assets\data\products.json"
$outDir = Join-Path $root "assets\img"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$products = Get-Content $json -Raw -Encoding UTF8 | ConvertFrom-Json
$total = $products.Count
$i = 0; $ok = 0; $skip = 0; $fail = 0
$failed = @()

foreach ($p in $products) {
    $i++
    if (-not $p.img) { continue }
    # extensión desde la URL (sin query string)
    $clean = $p.img.Split("?")[0]
    $ext = [IO.Path]::GetExtension($clean)
    if (-not $ext) { $ext = ".png" }
    $dest = Join-Path $outDir ($p.id + $ext)

    if (Test-Path $dest) { $skip++; continue }

    Write-Progress -Activity "Descargando imágenes BBW" -Status "$i de $total — $($p.title)" -PercentComplete (($i / $total) * 100)
    try {
        Invoke-WebRequest -Uri $p.img -OutFile $dest -TimeoutSec 30 -UseBasicParsing
        $ok++
    } catch {
        $fail++
        $failed += $p.id + "  " + $p.img
    }
    Start-Sleep -Milliseconds 100   # no saturar el CDN
}

Write-Host ""
Write-Host "==============================================" -ForegroundColor Yellow
Write-Host " LISTO: $ok descargadas, $skip ya existian, $fail fallidas" -ForegroundColor Yellow
$size = "{0:N0} MB" -f ((Get-ChildItem $outDir | Measure-Object Length -Sum).Sum / 1MB)
Write-Host " Tamaño total de assets/img: $size" -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Yellow
if ($failed.Count -gt 0) {
    $failed | Out-File (Join-Path $root "imagenes-fallidas.txt") -Encoding UTF8
    Write-Host " Las fallidas quedaron en imagenes-fallidas.txt (vuelve a ejecutar el script para reintentar)"
}
Read-Host "Presiona Enter para cerrar"
