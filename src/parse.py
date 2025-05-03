import json
import os

# Print the current working directory
print("Current working directory:", os.getcwd())
# Assuming you've saved the JSON data as a string in `data`
with open('./src/config/art.json', 'r') as f:
    data = json.load(f)

# Filter entries where any filePath contains "nsfw"
filtered = [
    obj for obj in data
    if any("stickers" in path.lower() for path in obj.get("filePaths", []))
]

# Print result
print(json.dumps(filtered, indent=4))
