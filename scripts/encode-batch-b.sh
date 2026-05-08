#!/usr/bin/env bash
# Encode raw Batch B Seedance MP4s for web delivery.
set -euo pipefail

RAW=scripts/raw-videos
OUT=public/video
mkdir -p "$OUT"

encode_loop() {
  local src=$1 base=$2 desktop_h=$3 desktop_crf=$4 mobile_crf=${5:-26}

  echo "[$base] desktop ${desktop_h}p @ crf ${desktop_crf}"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -vf "scale=-2:${desktop_h}" \
    -c:v libx264 -preset slow -crf "$desktop_crf" -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$OUT/${base}-desktop.mp4"

  echo "[$base] mobile 720p @ crf ${mobile_crf}"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -vf "scale=-2:720" \
    -c:v libx264 -preset slow -crf "$mobile_crf" -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$OUT/${base}-mobile.mp4"

  echo "[$base] poster jpg"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -ss 00:00:01 -frames:v 1 -q:v 3 \
    "$OUT/${base}-poster.jpg"
}

encode_square() {
  local src=$1 base=$2 size=$3 crf=$4

  echo "[$base] square ${size}x${size} @ crf ${crf}"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -vf "scale=${size}:${size}" \
    -c:v libx264 -preset slow -crf "$crf" -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$OUT/${base}.mp4"

  echo "[$base] poster jpg"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -ss 00:00:00.5 -frames:v 1 -q:v 3 \
    "$OUT/${base}-poster.jpg"
}

# V2 experience montage — source 1080p 16:9
encode_loop "$RAW/v2-experience.mp4" v2-experience 1080 22 26

# V4 pulled pork — 1:1 menu grid
encode_square "$RAW/v4-pulled-pork.mp4" v4-pulled-pork 720 24

# V5 ribs — 1:1 menu grid
encode_square "$RAW/v5-ribs.mp4" v5-ribs 720 24

# V6 mac & cheese — 1:1 menu grid
encode_square "$RAW/v6-mac.mp4" v6-mac 720 24

# V8 hearth ambient — About hero background, 1080p 16:9
encode_loop "$RAW/v8-hearth.mp4" v8-hearth 1080 22 26

echo ""
echo "=== outputs ==="
ls -lh "$OUT"/v[2456]*.mp4 "$OUT"/v8*.mp4 "$OUT"/v[2456]*-poster.jpg "$OUT"/v8*-poster.jpg 2>/dev/null
