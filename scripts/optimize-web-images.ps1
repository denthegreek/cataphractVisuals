param(
  [string]$Root = "public",
  [int]$MaxLongEdge = 1800,
  [int]$Quality = 82,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$ProjectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")

function Resolve-ProjectPath {
  param([string]$Path)

  if ([System.IO.Path]::IsPathRooted($Path)) {
    return Resolve-Path -LiteralPath $Path
  }

  return Resolve-Path -LiteralPath (Join-Path $ProjectRoot $Path)
}

function Get-RelativePath {
  param(
    [string]$BasePath,
    [string]$FullPath
  )

  return $FullPath.Substring($BasePath.Length).TrimStart("\", "/")
}

function Get-JpegCodec {
  return [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } |
    Select-Object -First 1
}

function Save-Jpeg {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path,
    [int]$ImageQuality
  )

  $Codec = Get-JpegCodec
  $EncoderParameters = New-Object System.Drawing.Imaging.EncoderParameters 1
  $EncoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]$ImageQuality
  )

  $Bitmap.Save($Path, $Codec, $EncoderParameters)
  $EncoderParameters.Dispose()
}

$RootPath = Resolve-ProjectPath $Root
$Extensions = @(".jpg", ".jpeg", ".png")
$Files = Get-ChildItem -LiteralPath $RootPath -Recurse -File |
  Where-Object { $Extensions -contains $_.Extension.ToLowerInvariant() }

$Processed = 0
$Skipped = 0
$OriginalBytes = 0
$OptimizedBytes = 0

foreach ($File in $Files) {
  $FileStream = [System.IO.File]::Open(
    $File.FullName,
    [System.IO.FileMode]::Open,
    [System.IO.FileAccess]::Read,
    [System.IO.FileShare]::Read
  )
  $LoadedImage = [System.Drawing.Image]::FromStream($FileStream)
  $Image = New-Object System.Drawing.Bitmap $LoadedImage
  $LoadedImage.Dispose()
  $FileStream.Dispose()

  try {
    $OriginalWidth = $Image.Width
    $OriginalHeight = $Image.Height
    $LongestEdge = [Math]::Max($OriginalWidth, $OriginalHeight)
    $Scale = [Math]::Min(1.0, ([double]$MaxLongEdge / [double]$LongestEdge))
    $TargetWidth = [Math]::Max(1, [int][Math]::Round($OriginalWidth * $Scale))
    $TargetHeight = [Math]::Max(1, [int][Math]::Round($OriginalHeight * $Scale))
    $IsJpeg = $File.Extension.ToLowerInvariant() -in @(".jpg", ".jpeg")
    $ShouldRewrite = $IsJpeg -or $Scale -lt 1

    if (-not $ShouldRewrite) {
      $Skipped += 1
      continue
    }

    $RelativePath = Get-RelativePath -BasePath $RootPath.Path -FullPath $File.FullName
    $OriginalSize = $File.Length
    $OriginalBytes += $OriginalSize

    if ($DryRun) {
      $Action = if ($Scale -lt 1) { "resize/compress" } else { "compress" }
      Write-Host "$Action $RelativePath [$OriginalWidth x $OriginalHeight -> $TargetWidth x $TargetHeight]"
      $Processed += 1
      continue
    }

    $PixelFormat = if ($IsJpeg) {
      [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
    } else {
      [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    }

    $Bitmap = New-Object System.Drawing.Bitmap $TargetWidth, $TargetHeight, $PixelFormat
    $Graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
    $TempPath = "$($File.FullName).tmp$($File.Extension)"

    try {
      if (Test-Path -LiteralPath $TempPath) {
        Remove-Item -LiteralPath $TempPath
      }

      $Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $Graphics.Clear($(if ($IsJpeg) { [System.Drawing.Color]::Black } else { [System.Drawing.Color]::Transparent }))
      $Graphics.DrawImage($Image, 0, 0, $TargetWidth, $TargetHeight)

      if ($IsJpeg) {
        Save-Jpeg -Bitmap $Bitmap -Path $TempPath -ImageQuality $Quality
      } else {
        $Bitmap.Save($TempPath, [System.Drawing.Imaging.ImageFormat]::Png)
      }
    } finally {
      $Graphics.Dispose()
      $Bitmap.Dispose()
    }

    $NewSize = (Get-Item -LiteralPath $TempPath).Length
    $ShouldReplace = $NewSize -lt $OriginalSize -or $Scale -lt 1

    if ($ShouldReplace) {
      [System.IO.File]::Copy($TempPath, $File.FullName, $true)
      Remove-Item -LiteralPath $TempPath
      $OptimizedBytes += $NewSize
      $Processed += 1
    } else {
      Remove-Item -LiteralPath $TempPath
      $OptimizedBytes += $OriginalSize
      $Skipped += 1
    }
  } finally {
    $Image.Dispose()
  }
}

if ($DryRun) {
  Write-Host "Audit complete. $Processed files would be optimized; $Skipped files would be skipped."
} else {
  $SavedBytes = $OriginalBytes - $OptimizedBytes
  $SavedMb = [Math]::Round($SavedBytes / 1MB, 2)
  Write-Host "Optimization complete. $Processed files optimized; $Skipped files skipped; saved about $SavedMb MB."
}
