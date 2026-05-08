#!/usr/bin/env bash
# Encode raw Seedance MP4s for web delivery.
# - mobile variant @ 720p (lower bitrate)
# - desktop variant @ source resolution
# - JPG poster (LCP candidate)
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

# V1 hero — source already 720p 16:9. Two variants for bitrate ladder.
encode_loop "$RAW/v1-hero.mp4" v1-hero 720 22 26

# V3 brisket — 1:1 menu hover-play. Single 720x720 variant.
encode_square "$RAW/v3-brisket.mp4" v3-brisket 720 24

# V7 fire — source 1080p 16:9. Desktop@1080p, mobile@720p.
encode_loop "$RAW/v7-fire.mp4" v7-fire 1080 22 26

echo ""
echo "=== outputs ==="
ls -lh "$OUT"/ | grep -v "^d\|^total"
