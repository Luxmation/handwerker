# Wortzeiten für die Sprecheraufnahme (faster-whisper, lokal). python asr_words.py <audio> <out.json> [modell]
import sys, json, time, subprocess
import numpy as np
from faster_whisper import WhisperModel
audio, out = sys.argv[1], sys.argv[2]
name = sys.argv[3] if len(sys.argv) > 3 else 'small'
SCRIPT = ("Jeder Boden beginnt mit einem genauen Aufmaß. Denn ein Boden ist nur so gut wie das, worauf er liegt. "
          "Parkett. Vinyl. Laminat. Teppich. Und Treppen. Verlegt mit der Sorgfalt einer Schreinerei. "
          "Beratung, Verkauf und Verlegung – aus einer Hand. Im Bergischen Land, in Köln und Umgebung. "
          "Handwerker Blesius. Ihr Bodenleger in Wermelskirchen. Jetzt unverbindlich anfragen.")
t = time.time()
m = WhisperModel(name, device='cpu', compute_type='int8', download_root='models')
pcm = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', audio, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
segs, info = m.transcribe(pcm, language='de', word_timestamps=True, initial_prompt=SCRIPT, beam_size=5, vad_filter=False)
words = []
for s in segs:
    for w in s.words: words.append({'w': w.word.strip(), 't0': round(w.start, 3), 't1': round(w.end, 3), 'p': round(w.probability, 3)})
json.dump(words, open(out, 'w'), ensure_ascii=False, indent=1)
print('Modell', name, 'Zeit %.1fs' % (time.time() - t), 'Wörter', len(words))
print(' '.join(w['w'] for w in words))
for w in words: print('%6.2f %6.2f  %-16s %.2f' % (w['t0'], w['t1'], w['w'], w['p']))
