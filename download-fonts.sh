#!/bin/bash

# Font download script for go-folio
# This script downloads all required self-hosted fonts from Google Fonts CDN

set -e

FONTS_DIR="./static/fonts"

echo "🎨 Downloading fonts to $FONTS_DIR..."
echo ""

cd "$FONTS_DIR"

# Inter Font Family
echo "📥 Downloading Inter fonts..."
curl -sL -o inter-300.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2"
curl -sL -o inter-400.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.woff2"
curl -sL -o inter-600.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZhrib2Bg-4.woff2"
curl -sL -o inter-700.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.woff2"

# Overpass Font Family
echo "📥 Downloading Overpass fonts..."
curl -sL -o overpass-400.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPb.woff2"
curl -sL -o overpass-400-italic.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81Gga4rcAA.woff2"
curl -sL -o overpass-600.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6nfTb.woff2"
curl -sL -o overpass-600-italic.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81Gga7DcHA.woff2"
curl -sL -o overpass-700.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6rfTb.woff2"
curl -sL -o overpass-700-italic.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81Gga4jfHA.woff2"
curl -sL -o overpass-800.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_fPb.woff2"
curl -sL -o overpass-800-italic.woff2 "https://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81Gga5jcHA.woff2"

# Overpass Mono Font Family
echo "📥 Downloading Overpass Mono fonts..."
curl -sL -o overpass-mono-300.woff2 "https://fonts.gstatic.com/s/overpassmono/v13/_Xm3-H86tzKDdAPa-KPQZ-AC3pSRo_78IA.woff2"
curl -sL -o overpass-mono-400.woff2 "https://fonts.gstatic.com/s/overpassmono/v13/_Xm3-H86tzKDdAPa-KPQZ-AC5oSRo_78IA.woff2"
curl -sL -o overpass-mono-600.woff2 "https://fonts.gstatic.com/s/overpassmono/v13/_Xm3-H86tzKDdAPa-KPQZ-AC3pSRo_78IA.woff2"
curl -sL -o overpass-mono-700.woff2 "https://fonts.gstatic.com/s/overpassmono/v13/_Xm3-H86tzKDdAPa-KPQZ-AC3vWQo_78IA.woff2"

echo ""
echo "✅ All fonts downloaded successfully!"
echo ""
echo "📦 Downloaded files:"
ls -lh *.woff2

echo ""
echo "🎉 Font setup complete! Your fonts are now self-hosted and ready to use."
echo "🔄 Next step: Regenerate Templ files with 'templ generate'"
