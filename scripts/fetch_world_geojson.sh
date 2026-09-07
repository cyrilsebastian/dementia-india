#!/usr/bin/env bash
set -euo pipefail

# scripts/fetch_world_geojson.sh
# Fetches Natural Earth 110m world boundaries, normalizes country codes to ISO-A3,
# minifies coordinates for fast web rendering, and saves to web/public/world.json

OUTPUT_DIR="web/public"
OUTPUT_FILE="${OUTPUT_DIR}/world.json"
PRIMARY_URL="https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/cultural/ne_110m_admin_0_countries.json"
FALLBACK_URL="https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"

echo "🗺️ Fetching world boundaries GeoJSON..."
mkdir -p "${OUTPUT_DIR}"

TMP_FILE=$(mktemp)
trap 'rm -f "${TMP_FILE}"' EXIT

if curl -fsSL "${PRIMARY_URL}" -o "${TMP_FILE}"; then
    echo "  ✓ Downloaded from primary Natural Earth 110m source"
else
    echo "  ⚠️ Primary failed, attempting fallback..."
    curl -fsSL "${FALLBACK_URL}" -o "${TMP_FILE}"
fi

echo "🔧 Normalizing properties and standardizing ISO Alpha-3 codes..."
python3 - <<EOF
import json
import sys

with open("${TMP_FILE}", "r", encoding="utf-8") as f:
    data = json.load(f)

# Name mapping for international normalization
country_name_map = {
    "United States of America": "United States",
    "Dem. Rep. Korea": "North Korea",
    "Republic of Korea": "South Korea",
    "Russian Federation": "Russia",
    "United Republic of Tanzania": "Tanzania",
    "Syrian Arab Republic": "Syria",
    "Viet Nam": "Vietnam",
    "Lao PDR": "Laos",
    "Iran (Islamic Republic of)": "Iran"
}

iso_overrides = {
    "France": "FRA",
    "Norway": "NOR",
    "Somaliland": "SOM",
    "Kosovo": "XKX",
    "United States": "USA",
    "United States of America": "USA"
}

def round_coords(coords):
    if not coords:
        return coords
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], 3), round(coords[1], 3)]
    return [round_coords(c) for c in coords]

normalized_features = []
for feat in data.get("features", []):
    props = feat.get("properties", {})
    name = props.get("ADMIN") or props.get("name") or props.get("NAME") or ""
    name = country_name_map.get(name, name)
    
    iso = props.get("ISO_A3") or props.get("ADM0_A3") or props.get("SOV_A3") or props.get("ISO3166-1-Alpha-3") or ""
    if iso == "-99" or not iso:
        iso = props.get("ADM0_A3") or props.get("SOV_A3") or ""
    
    if name in iso_overrides:
        iso = iso_overrides[name]
    
    geom = feat.get("geometry", {})
    if "coordinates" in geom:
        geom["coordinates"] = round_coords(geom["coordinates"])
        
    feat["properties"] = {
        "name": name,
        "iso_a3": iso,
        "country_code": iso
    }
    normalized_features.append(feat)

data["features"] = normalized_features

with open("${OUTPUT_FILE}", "w", encoding="utf-8") as f:
    json.dump(data, f, separators=(',', ':'))

print(f"  ✓ Successfully mapped {len(normalized_features)} countries/territories")
EOF

SIZE=$(wc -c < "${OUTPUT_FILE}" | tr -d ' ')
echo "✅ World GeoJSON ready at ${OUTPUT_FILE} (${SIZE} bytes)"
