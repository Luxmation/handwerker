#!/bin/sh
# Bereitet den Film-Ordner vor: Schriften, Logo-Teile und Fotos aus der Website kopieren, Texturen erzeugen.
set -e
cd "$(dirname "$0")"
S=../static/assets
mkdir -p assets/img assets/fonts assets/brand assets/tex audio
cp $S/fonts/Archivo-*.woff2 $S/fonts/DMMono-*.woff2 assets/fonts/
cp $S/brand/logo-light.png $S/brand/wordmark.png assets/brand/ && cp $S/brand/intro/*.png assets/brand/
for n in kueche-eiche fischgraet-raum; do cp $S/img/$n-1600.jpg assets/img/; done
python3 -I make_textures.py .
echo "Fertig. Musik (lizenziert über Epidemic Sound) nach audio/music20.wav legen – siehe README.md."
