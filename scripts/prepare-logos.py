"""Cuts the three logos out of the owner's presentation sheet.

Needs: pip install pillow
Run:   python scripts/prepare-logos.py
Then:  node scripts/generate-brand-assets.mjs
"""
import os

from PIL import Image, ImageChops

ROOT = os.path.join(os.path.dirname(__file__), '..')
SHEET = os.path.join(ROOT, 'assets-source', 'brand', 'vibrations-elite-logo-sheet.png')
OUT = os.path.join(ROOT, 'assets-source', 'brand')

# Rough boxes around each logo on the sheet. Each is trimmed tightly afterwards.
LOGOS = {
    'logo-stacked': (60, 110, 660, 625),
    'logo-mark': (770, 150, 1215, 530),
    'logo-horizontal': (1295, 235, 2125, 470),
}


def cut(box):
    im = Image.open(SHEET).convert('RGB').crop(box)
    r, g, b = im.split()
    lightest_gap = ImageChops.darker(ImageChops.darker(r, g), b)
    # Near-white becomes transparent; gold stays solid, and its soft edges stay soft.
    alpha = lightest_gap.point(lambda v: max(0, min(255, (238 - v) * 5)))
    out = im.convert('RGBA')
    out.putalpha(alpha)
    return out.crop(alpha.getbbox())


for name, box in LOGOS.items():
    logo = cut(box)
    logo.save(os.path.join(OUT, f'{name}.png'))
    print(name, logo.size)
