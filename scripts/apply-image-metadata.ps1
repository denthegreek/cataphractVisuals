param(
  [string]$Root = "public",
  [string]$Creator = "Cataphract Visuals",
  [string]$UsageTerms = "No use without prior signed written approval from Cataphract Visuals."
)

$ErrorActionPreference = "Stop"

$ExifTool = Get-Command exiftool -ErrorAction SilentlyContinue

if (-not $ExifTool) {
  throw "ExifTool is required to write image metadata. Install it first, then run this script again."
}

$ResolvedRoot = Resolve-Path -LiteralPath $Root
$CopyrightNotice = "$([char]0x00A9) $Creator. All rights reserved."

# Writes common EXIF/IPTC/XMP rights fields into exported web images.
& $ExifTool.Source `
  -overwrite_original `
  "-Artist=$Creator" `
  "-Copyright=$CopyrightNotice" `
  "-IPTC:By-line=$Creator" `
  "-IPTC:CopyrightNotice=$CopyrightNotice" `
  "-XMP-dc:Creator=$Creator" `
  "-XMP-dc:Rights=$CopyrightNotice" `
  "-XMP-xmpRights:Marked=True" `
  "-XMP-xmpRights:UsageTerms=$UsageTerms" `
  -ext jpg -ext jpeg -ext png -r $ResolvedRoot
