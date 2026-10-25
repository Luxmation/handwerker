# Sprecher auf die Film-Zeitleiste legen.
# python3 -I vo_place.py <film-ordner>  liest audio/vo_take1.wav + audio/vo_words_take1.json (Wortzeiten der Aufnahme)
# schreibt audio/vo_placed.wav (30 s, 48 kHz mono) und vo.js (window.VO: Wortzeiten auf der Film-Zeitleiste)
import sys, os, json, subprocess, wave
import numpy as np
D = sys.argv[1]; SR = 48000; DUR = 30.0; N = int(SR * DUR)
Q = 0.4473; T = lambda n: n * Q
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(D, 'audio', 'vo_take1.wav'), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
take = np.frombuffer(raw, np.float32).astype(np.float64)
W = [w for w in json.load(open(os.path.join(D, 'audio', 'vo_words_take1.json'))) if any(c.isalpha() for c in w['w'])]
assert len(W) == 54, len(W)
# Abschnitte der Aufnahme: (Satz-ID, Wortindizes, Schnitt-Anfang, Schnitt-Ende in der Aufnahme)
CH = [
    ('v1', range(0, 7), 0.00, 2.94),
    ('v2', range(7, 19), 3.00, 6.27),
    ('v3', range(19, 20), 6.40, 7.15), ('v3', range(20, 21), 7.16, 7.89), ('v3', range(21, 22), 7.90, 8.75),
    ('v3', range(22, 23), 8.80, 9.50), ('v3', range(23, 25), 9.60, 10.74),
    ('v4', range(25, 31), 10.84, 13.28),
    ('v5', range(31, 38), 13.40, 16.80),
    ('v6', range(38, 45), 16.86, 19.43),
    ('v7', range(45, 47), 19.48, 20.92), ('v7', range(47, 51), 20.96, 23.06),
    ('v8', range(51, 54), 23.14, 25.12),
]
# Ziel: Zeitpunkt des ersten Worts je Abschnitt auf der Film-Zeitleiste (Musik: Drop T16, Schlussakzent T52)
ONSET = [0.35, 3.40, T(16.5), T(18.5), T(20.5), T(22.5), T(24.5), 12.55, 16.83, 20.42, T(52) + .30, None, None]
out = np.zeros(N); VO = {}
prev_end = 0.0
for i, (vid, idx, a, b) in enumerate(CH):
    idx = list(idx); w0 = W[idx[0]]['t0']
    on = ONSET[i]
    if on is None:  # direkt nach dem vorigen Abschnitt mit natürlicher Pause
        gap = .32 if i == 11 else .48
        on = prev_end + gap
    shift = on - w0
    s0, s1 = int(a * SR), int(b * SR); seg = take[s0:s1].copy()
    fi, fo = int(.008 * SR), int(.05 * SR)
    seg[:fi] *= np.linspace(0, 1, fi); seg[-fo:] *= np.linspace(1, 0, fo)
    p = int((a + shift) * SR)
    assert p >= 0 and p + len(seg) <= N, (vid, a + shift)
    out[p:p + len(seg)] += seg
    d = VO.setdefault(vid, {'words': []})
    for k in idx: d['words'].append({'w': W[k]['w'].strip('.,'), 't0': round(W[k]['t0'] + shift, 3), 't1': round(W[k]['t1'] + shift, 3)})
    prev_end = W[idx[-1]]['t1'] + shift
for vid, d in VO.items(): d['t0'] = d['words'][0]['t0']; d['t1'] = d['words'][-1]['t1']
# Überlappungen prüfen
ends = []
for i, (vid, idx, a, b) in enumerate(CH): pass
with wave.open(os.path.join(D, 'audio', 'vo_placed.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes())
open(os.path.join(D, 'vo.js'), 'w').write('// Sprecher-Wortzeiten auf der Film-Zeitleiste (erzeugt von vo_place.py)\nwindow.VO = ' + json.dumps(VO, ensure_ascii=False) + ';\n')
for vid, d in VO.items():
    print(vid, '%.2f-%.2f' % (d['t0'], d['t1']), ' '.join('%s@%.2f' % (w['w'], w['t0']) for w in d['words']))
