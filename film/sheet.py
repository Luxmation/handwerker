import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
d = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 5; w = int(sys.argv[3]) if len(sys.argv) > 3 else 384
fs = sorted(glob.glob(d + '/f*.jpg')); h = w * 9 // 16
rows = (len(fs) + cols - 1) // cols
o = Image.new('RGB', (cols * w, rows * (h + 18)), '#222'); dr = ImageDraw.Draw(o)
fn = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 13)
for i, f in enumerate(fs):
    im = Image.open(f).resize((w, h)); x = (i % cols) * w; y = (i // cols) * (h + 18)
    o.paste(im, (x, y)); dr.text((x + 4, y + h + 2), '%.2fs' % (int(os.path.basename(f)[1:6]) / 1000), fill='#F28135', font=fn)
o.save(d + '/sheet.jpg', quality=85); print(d + '/sheet.jpg', o.size)
