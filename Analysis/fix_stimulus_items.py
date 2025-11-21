import json
import re
from collections import Counter

input_path = "predictability_112025.json"
output_path = "predictability_112025_fixed.json"

# Regex to grab the filename between /img/ and .png
img_re = re.compile(r"/img/([^\"./]+)\.png", re.IGNORECASE)

# Items you *don’t* want to overwrite
EXCLUDE = {"collin", "animals", "dog", "room"}

def extract_name(stimulus_html: str):
    """Return the image name (without .png) from the stimulus HTML."""
    if not isinstance(stimulus_html, str):
        return None
    m = img_re.search(stimulus_html)
    return m.group(1) if m else None

with open(input_path, "r") as f:
    data = json.load(f)

modified = 0
touched_items = Counter()

for session in data:
    exp_data = session.get("exp_data", [])
    for trial in exp_data:
        stim_html = trial.get("stimulus", "")
        name = extract_name(stim_html)

        # Skip if no image or excluded image
        if not name or name in EXCLUDE:
            continue

        old = trial.get("stimulus_item")

        # Only change if it's missing or wrong
        if old != name:
            trial["stimulus_item"] = name
            modified += 1
            touched_items[name] += 1

print(f"Trials updated: {modified}")
print("Counts by image:", touched_items)

with open(output_path, "w") as f:
    json.dump(data, f, indent=2)

print(f"Fixed file written to: {output_path}")
