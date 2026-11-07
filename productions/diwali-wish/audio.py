"""Synthesize the soundtrack for "The Big One" (23 s, 44.1 kHz stereo WAV).

Everything is generated from oscillators and filtered noise, so there is nothing to license.
Timings match scene.html. Usage: python3 audio.py out.wav
"""
import sys
import wave
import numpy as np

SR = 44100
DUR = 23.0
N = int(SR * DUR)
L = np.zeros(N)
R = np.zeros(N)
rng = np.random.default_rng(7)


def tt(d):
    return np.arange(int(SR * d)) / SR


def add(sig, t0, gain=1.0, pan=0.0):
    """Mix sig in at t0 seconds. pan -1 (left) .. +1 (right), constant power."""
    i = int(t0 * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    a = (pan + 1) * np.pi / 4
    L[i:i + len(sig)] += sig * np.cos(a)
    R[i:i + len(sig)] += sig * np.sin(a)


def band(x, lo, hi):
    """Brick-ish band-pass via FFT with soft edges."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 4) * 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def noise(d):
    return rng.standard_normal(int(SR * d))


def env_ad(n, a, d):
    """Attack (s) then exponential decay constant d (s)."""
    t = np.arange(n) / SR
    e = np.exp(-np.maximum(t - a, 0) / d)
    e[t < a] = t[t < a] / max(a, 1e-4)
    return e


def note(name):
    names = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11}
    pitch, octave = name[:-1], int(name[-1])
    return 440 * 2 ** ((names[pitch] + 12 * (octave + 1) - 69) / 12)


def pluck(f, d=0.6, bright=1.0):
    t = tt(d)
    s = sum(np.sin(2 * np.pi * k * f * t) * np.exp(-t * (3 + k * 2.2 / bright)) / k for k in range(1, 7))
    return s * env_ad(len(t), 0.003, 10)


def bell(f, d=1.6):
    t = tt(d)
    parts = [(1, 1.0, 1.4), (2.76, 0.5, 0.6), (5.4, 0.25, 0.3), (8.93, 0.12, 0.15)]
    return sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / dd) for r, a, dd in parts) * env_ad(len(t), 0.002, 10)


def crackle(d, density, seed_gain=1.0):
    """Random clicks: sparkler / fuse / burst glitter."""
    n = int(SR * d)
    s = np.zeros(n)
    count = int(density * d)
    for _ in range(count):
        i = rng.integers(0, max(1, n - 400))
        ln = rng.integers(40, 300)
        s[i:i + ln] += rng.standard_normal(ln) * np.exp(-np.arange(ln) / (ln / 4)) * rng.uniform(0.3, 1.0)
    return band(s, 1500, 12000) * seed_gain


# ---------------- music A: sneaky plucks while the fuse is set up (0 - 8.6 s) ----------------
seqA = ['C4', 'Eb4', 'F4', 'G4', 'F4', 'Eb4', 'C4', 'G3']
step = 0.3
t = 0.0
k = 0
while t < 8.6 - 0.05:
    f = note(seqA[k % len(seqA)])
    gain = 0.16 + 0.12 * min(1, max(0, (t - 4.5) / 4.0))  # tension rises toward the end of the fuse
    p = pluck(f, 0.28, 0.7)
    end = min(len(p), int((8.6 - t) * SR))  # hard stop at 8.6 for the comic silence
    add(p[:end], t, gain, -0.2 if k % 2 else 0.2)
    if k % 4 == 0:  # soft low pulse
        add(pluck(note('C3'), 0.25, 0.5)[: int((8.6 - t) * SR)], t, 0.12)
    t += step
    k += 1

# ---------------- shot 1: sparkler + footsteps ----------------
add(crackle(1.75, 260), 1.25, 0.35, -0.5)
add(crackle(6.4, 120) + band(noise(6.4), 3000, 9000) * 0.18, 2.2, 0.3, -0.45)  # fuse hiss 2.2 - 8.6
for i in range(9):  # patter of bare feet, 3.0 - 4.4
    th = band(noise(0.06), 80, 900) * env_ad(int(SR * 0.06), 0.002, 0.015)
    add(th, 3.05 + i * 0.155, 0.5, -0.1 + i * 0.07)

# ---------------- shot 3: pfft, tip-over thud, sad trombone, sniffs ----------------
pf = band(noise(0.45), 200, 2500) * env_ad(int(SR * 0.45), 0.01, 0.09)
add(pf, 10.22, 0.9, -0.4)
tt_ = tt(0.35)
thud = np.sin(2 * np.pi * (95 - 40 * tt_) * tt_) * np.exp(-tt_ / 0.08) + band(noise(0.35), 100, 1200) * np.exp(-tt_ / 0.03) * 0.5
add(thud, 10.84, 0.7, -0.35)


def trombone(f, d, vib=False):
    t = tt(d)
    fm = f * (1 + (0.012 * np.sin(2 * np.pi * 5.5 * t) * np.minimum(1, t / 0.3) if vib else 0))
    ph = 2 * np.pi * np.cumsum(fm) / SR
    s = sum(np.sin(k * ph) / k ** 1.1 for k in range(1, 9))
    e = np.minimum(1, t / 0.04) * np.minimum(1, (d - t) / 0.08)
    return band(s * e, 80, 2600)


for i, (n_, d) in enumerate([('G3', 0.36), ('F#3', 0.36), ('F3', 0.36), ('E3', 1.1)]):
    add(trombone(note(n_), d, vib=(i == 3)), 11.05 + i * 0.4, 0.22)

for ts in (13.9, 14.22, 14.55):
    sn = band(noise(0.12), 1500, 6000) * env_ad(int(SR * 0.12), 0.02, 0.03)
    add(sn, ts, 0.35, -0.2)

# ---------------- shot 4: fizz, pop, whoosh, bang, glitter, diya chimes ----------------
add(crackle(0.3, 300), 15.0, 0.45, -0.4)
pop_t = tt(0.12)
add(np.sin(2 * np.pi * 420 * pop_t * (1 - pop_t * 3)) * np.exp(-pop_t / 0.03), 15.32, 0.45, -0.4)
add(crackle(0.18, 300), 15.62, 0.45, -0.4)
wd = 0.8
w = noise(wd)
segs = []
for j in range(8):  # rising band sweep
    a, b = int(j * len(w) / 8), int((j + 1) * len(w) / 8)
    lo = 400 * 2 ** (j * 0.45)
    segs.append(band(w[a:b], lo, lo * 3))
whoosh = np.concatenate(segs) * np.linspace(0.2, 1, len(w)) * np.minimum(1, (wd - tt(wd)) / 0.05)
add(whoosh, 15.72, 0.45, -0.2)


def boom(gain, t0, pan=0.0):
    t = tt(1.6)
    low = np.sin(2 * np.pi * (70 * np.exp(-t * 1.5) + 35) * t) * np.exp(-t / 0.35)
    hit = band(noise(1.6), 200, 6000) * np.exp(-t / 0.12)
    add(low * 0.9 + hit * 0.6, t0, gain, pan)


boom(0.75, 16.5)
boom(0.4, 16.85, -0.4)
boom(0.4, 17.15, 0.4)
glit = crackle(2.6, 500) * np.exp(-tt(2.6) / 1.1)
add(glit, 16.55, 0.4, 0.0)

chimes = ['C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6']
for i, c in enumerate(chimes):
    add(bell(note(c)), 17.0 + i * 0.28, 0.2, -0.8 + i * 1.6 / 6)  # pans with the diya positions

# ---------------- music B: festive tune over the wish (16.9 - 23 s) ----------------
beat = 0.25
melody = ['E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'A5', 'G5', 'E5', 'G5', 'D5', 'E5', 'C5', None]
t0 = 16.95
for i, m in enumerate(melody):
    if m:
        add(pluck(note(m), 0.5, 1.4), t0 + i * beat, 0.2, 0.1)
        add(pluck(note(m) * 2, 0.3, 1.6), t0 + i * beat, 0.04, 0.3)
# tabla-ish groove
for i in range(int((22.0 - t0) / 0.5)):
    ts = t0 + i * 0.5
    t = tt(0.3)
    dha = np.sin(2 * np.pi * (120 * np.exp(-t * 4) + 70) * t) * np.exp(-t / 0.12)
    add(dha, ts, 0.3, -0.1)
    t = tt(0.1)
    na = np.sin(2 * np.pi * 680 * t) * np.exp(-t / 0.025) + band(noise(0.1), 2000, 8000) * np.exp(-t / 0.01) * 0.3
    add(na, ts + 0.25, 0.16, 0.15)
# drone under music B, and the closing chord
t = tt(23 - 16.9)
drone = (np.sin(2 * np.pi * note('C3') * t) + 0.6 * np.sin(2 * np.pi * note('G3') * t) + 0.3 * np.sin(2 * np.pi * note('C4') * t))
drone *= np.minimum(1, t / 1.0) * np.minimum(1, (t[-1] - t) / 1.2)
add(drone, 16.9, 0.05)
for n_ in ['C4', 'E4', 'G4', 'C5', 'E5']:
    add(bell(note(n_), 2.0), 21.0, 0.09)

# ---------------- master ----------------
mix = np.stack([L, R], axis=1)
fade = np.ones(N)
fade[-int(SR * 0.6):] = np.linspace(1, 0, int(SR * 0.6))
mix *= fade[:, None]
mix = np.tanh(mix * 1.2) / np.tanh(1.2)  # gentle soft clip
mix *= 0.89 / np.max(np.abs(mix))         # about -1 dBFS peak
out = sys.argv[1] if len(sys.argv) > 1 else 'audio.wav'
with wave.open(out, 'wb') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes((mix * 32767).astype('<i2').tobytes())
print('wrote', out, f'{DUR}s')
