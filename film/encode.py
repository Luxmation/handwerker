# Mittelt die Zwischenbilder je Frame (Bewegungsunschärfe) und kodiert H.264 + AAC.
# python3 -I encode.py <frames> <fps> <sub> <audio> <out.mp4> [skalierung WxH]
import sys, os, subprocess, glob, numpy as np
from PIL import Image
fr, fps, sub, audio, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4], sys.argv[5]
size = sys.argv[6] if len(sys.argv) > 6 else None
# Format per Umgebung: FILM_W/FILM_H (1920x1080), FILM_DUR (20)
VW, VH, DURX = int(os.environ.get('FILM_W', 1920)), int(os.environ.get('FILM_H', 1080)), float(os.environ.get('FILM_DUR', 20))
N = int(round(DURX * fps))
vf = ['format=yuv420p']
if size: vf.insert(0, f'scale={size}:flags=lanczos')
cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{VW}x{VH}', '-r', str(fps), '-i', '-',
       '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-profile:v', 'high',
       '-vf', ','.join(vf), '-c:a', 'aac', '-b:a', '320k', '-movflags', '+faststart', '-shortest', out]
p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
for i in range(N):
    acc = None
    for k in range(sub):
        im = np.asarray(Image.open(f'{fr}/f{i:04d}_{k}.png').convert('RGB'), dtype=np.float32)
        # in linearem Licht mitteln (realistischere Unschärfe)
        lin = (im / 255.0) ** 2.2
        acc = lin if acc is None else acc + lin
    rgb = np.clip(((acc / sub) ** (1 / 2.2)) * 255 + 0.5, 0, 255).astype(np.uint8)
    p.stdin.write(rgb.tobytes())
p.stdin.close(); p.wait(); print('fertig', out)
