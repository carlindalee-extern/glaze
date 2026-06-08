#!/bin/bash
# Generate all case study headshots via Higgsfield in parallel.
set -u

OUTPUT_DIR="/Users/carlindalee/Documents/GitHub/ai-mkt-system/glaze/public/headshots"
mkdir -p "$OUTPUT_DIR"

generate_headshot() {
  local slug=$1
  local demo=$2

  if [ -f "$OUTPUT_DIR/${slug}.png" ]; then
    echo "[skip] $slug (already exists)"
    return 0
  fi

  local prompt="Professional corporate headshot of ${demo}. Business professional attire: structured blazer in navy, charcoal, or black over a crisp white or light blouse or shirt. Warm beige or soft grey studio background with subtle gradient. Soft natural lighting from front-left, no harsh shadows. Warm confident smile, direct eye contact with camera. Shoulders-up framing. Sharp focus on face, slight depth-of-field background blur. Photorealistic LinkedIn-style portrait. High resolution. Modern professional executive look."

  local url
  url=$(higgsfield generate create gpt_image_2 \
    --prompt "$prompt" \
    --aspect_ratio 1:1 \
    --resolution 2k \
    --wait \
    --wait-timeout 5m 2>/dev/null | tail -1)

  if [ -n "$url" ] && [[ "$url" == https://* ]]; then
    curl -s -o "$OUTPUT_DIR/${slug}.png" "$url"
    echo "[ok] $slug"
  else
    echo "[FAIL] $slug (no URL returned)"
  fi
}

# Tech (16 remaining)
generate_headshot james-park "Korean American man in his late 30s, Finance Director at a tech company" &
generate_headshot priya-sharma "Indian American woman in her late 30s, Head of Finance at a tech company" &
generate_headshot daniel-lee "Korean American man in his late 30s, CFO at a tech company" &
generate_headshot maya-patel "Indian American woman in her late 30s, VP of Finance at a tech company" &
generate_headshot jonathan-reed "White American man in his early 40s, Controller at a tech company, clean-cut" &
generate_headshot rebecca-tanaka "Japanese American woman in her late 30s, Head of Finance at a tech company" &
generate_headshot michael-torres "Latino American man in his mid 40s, Controller at a tech company" &
generate_headshot alex-dubois "White French-Canadian man in his late 30s, VP of Finance at a tech company" &
generate_headshot hannah-greene "White American woman in her mid 30s, Director of Finance at a tech company" &
generate_headshot emma-richardson "White British woman in her late 30s, Head of Finance at a fintech company" &
generate_headshot oliver-hayes "White British man in his late 30s, Director of Finance at a fintech company" &
generate_headshot david-kim "Korean Australian man in his mid 40s, CFO at a tech company" &
generate_headshot claire-henderson "White Australian woman in her early 40s, VP of Finance at a tech company" &
generate_headshot niamh-oconnor "White Irish woman in her mid 30s, Finance Director at a tech company" &
generate_headshot aoife-murphy "White Irish woman in her late 30s, VP of Finance at a fintech company" &
generate_headshot wei-lin "Singaporean Chinese woman in her late 30s, Head of Finance at an APAC tech company" &
generate_headshot mei-tan "Singaporean Chinese woman in her late 30s, Director of Finance at an APAC tech company" &
generate_headshot charlotte-mills "White New Zealand woman in her early 40s, Controller at a tech company" &

# Marketing agency (6)
generate_headshot jessica-ruiz "Latina American woman in her late 30s, CFO at a creative marketing agency, modern professional" &
generate_headshot mark-stevens "White American man in his mid 40s, CFO at a creative marketing agency" &
generate_headshot hugo-bennett "White British man in his late 30s, Finance Director at a creative agency" &
generate_headshot nadia-patel "Indian woman in her late 30s, VP of Finance at a creative marketing agency" &
generate_headshot olivier-tremblay "White French-Canadian man in his late 30s, Controller at a creative agency" &
generate_headshot liam-obrien "White Australian man in his mid 40s, Head of Finance at a creative agency" &

# Consumer goods (12)
generate_headshot rachel-cohen "White American Jewish woman in her late 30s, VP of Finance at a beauty consumer brand" &
generate_headshot marcus-thompson "African American man in his mid 40s, CFO at a consumer goods brand" &
generate_headshot brooke-williams "White American woman in her late 30s, Director of Finance at a beverage brand" &
generate_headshot tom-bradley "White British man in his late 30s, Finance Director at a fitness apparel brand" &
generate_headshot anna-wong "Chinese Canadian woman in her early 40s, Controller at an athletic apparel brand" &
generate_headshot riley-carter "White American woman in her mid 30s, VP of Finance at a wellness consumer brand" &
generate_headshot sasha-bennett "White American woman in her mid 30s, Head of Finance at a beverage brand" &
generate_headshot mei-lin "Chinese American woman in her late 30s, Controller at a footwear consumer brand" &
generate_headshot sophie-walker "White British woman in her late 30s, Head of Finance at a nutrition brand" &
generate_headshot priya-singh "Indian Canadian woman in her late 30s, VP of Finance at a consumer apparel brand" &
generate_headshot olivia-chen "Chinese Australian woman in her late 30s, Director of Finance at a beauty brand" &
generate_headshot hui-lin "Singaporean Chinese woman in her late 30s, Head of Finance at an APAC fashion brand" &

# Wait for all parallel jobs to complete
wait
echo "All headshot generation complete."
