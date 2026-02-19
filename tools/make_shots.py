from PIL import Image
from pathlib import Path

BASE = Path("assets/images/projects/sales-story")
OUT = BASE / "shots"
OUT.mkdir(parents=True, exist_ok=True)

def crop(infile, outfile, box=None, pad=0):
    img = Image.open(infile).convert("RGB")
    w, h = img.size

    # Default crop: central 70% area (safe for most charts)
    if box is None:
        left = int(w * 0.15)
        top  = int(h * 0.15)
        right = int(w * 0.85)
        bottom = int(h * 0.85)
    else:
        left, top, right, bottom = box

    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(w, right + pad)
    bottom = min(h, bottom + pad)

    shot = img.crop((left, top, right, bottom))
    shot.save(outfile, quality=92)

# Input charts you already have
charts = {
    "01": BASE / "01_monthly_sales_profit_dynamic.png",
    "02": BASE / "02_margin_discount_dynamic_bubble.png",
    "03": BASE / "03_returns_region_phase_heatmap.png",
    "04": BASE / "04_ontime_satisfaction_dynamic.png",
    "05": BASE / "05_channel_mix_dynamic.png",
}

# Crops: tweak these if you want tighter shots (numbers are pixels)
# If you do not want to tweak, run once and you already get good results.
crop(charts["01"], OUT / "01_sales_profit_focus.png", box=None)
crop(charts["01"], OUT / "01_profit_dip_zoom.png", box=(200, 120, 1200, 650), pad=10)

crop(charts["02"], OUT / "02_discount_margin_cluster.png", box=None)
crop(charts["02"], OUT / "02_phase_labels.png", box=(250, 90, 1250, 520), pad=10)

crop(charts["03"], OUT / "03_heatmap_focus.png", box=None)
crop(charts["03"], OUT / "03_region_callout.png", box=(220, 140, 1180, 640), pad=10)

# Split the combined chart into two “shots”
img04 = Image.open(charts["04"]).convert("RGB")
w, h = img04.size
img04.crop((0, 0, w, h//2)).save(OUT / "04_ontime_trend.png", quality=92)
img04.crop((0, h//2, w, h)).save(OUT / "04_satisfaction_trend.png", quality=92)

crop(charts["05"], OUT / "05_mix_overview.png", box=None)
crop(charts["05"], OUT / "05_mix_change.png", box=(220, 120, 1180, 650), pad=10)

print("Done. Shots created in:", OUT)
