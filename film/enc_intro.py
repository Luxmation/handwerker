# Intro-Bilder (3 Zwischenbilder je Frame, in linearem Licht gemittelt) -> verlustfreies Zwischenvideo 60p
import sys, subprocess, numpy as np
from PIL import Image
fr, out, N = sys.argv[1], sys.argv[2], int(sys.argv[3])
cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '1080x1920', '-r', '60', '-i', '-',
       '-c:v', 'libx264', '-preset', 'medium', '-qp', '0', '-pix_fmt', 'yuv420p', out]
p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
for i in range(N):
    acc = None
    for k in range(3):
        im = np.asarray(Image.open(f'{fr}/f{i:04d}_{k}.png').convert('RGB'), dtype=np.float32)
        lin = (im / 255.0) ** 2.2
        acc = lin if acc is None else acc + lin
    p.stdin.write(np.clip(((acc / 3) ** (1 / 2.2)) * 255 + 0.5, 0, 255).astype(np.uint8).tobytes())
p.stdin.close(); p.wait(); print('fertig', out)
