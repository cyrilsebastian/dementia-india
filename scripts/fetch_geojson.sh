#!/usr/bin/env bash
set -euo pipefail

# scripts/fetch_geojson.sh
# Automates downloading optimized India state boundaries GeoJSON,
# normalizes properties (name, state_name, state_code) for ECharts, and saves to web/public/india-states.geojson

OUTPUT_DIR="web/public"
OUTPUT_FILE="${OUTPUT_DIR}/india-states.geojson"
PRIMARY_URL="https://raw.githubusercontent.com/adarshbiradar/maps-geojson/master/india.json"
FALLBACK_URL="https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States"

echo "🗺️ Fetching India states boundaries GeoJSON..."
mkdir -p "${OUTPUT_DIR}"

TMP_FILE=$(mktemp)
trap 'rm -f "${TMP_FILE}"' EXIT

if curl -fsSL "${PRIMARY_URL}" -o "${TMP_FILE}"; then
    echo "  ✓ Downloaded from primary source"
else
    echo "  ⚠️ Primary failed, attempting fallback..."
    curl -fsSL "${FALLBACK_URL}" -o "${TMP_FILE}"
fi

echo "🔧 Normalizing properties and state names..."
python3 - <<EOF
import json

with open("${TMP_FILE}", "r", encoding="utf-8") as f:
    data = json.load(f)

name_map = {
    "Jammu & Kashmir": "Jammu and Kashmir",
    "Andaman & Nicobar Islands": "Andaman and Nicobar Islands",
    "Andaman and Nicobar": "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli": "Dadra and Nagar Haveli and Daman and Diu",
    "Daman and Diu": "Dadra and Nagar Haveli and Daman and Diu",
    "Dadra & Nagar Haveli and Daman & Diu": "Dadra and Nagar Haveli and Daman and Diu",
    "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli and Daman and Diu",
    "Orissa": "Odisha",
    "Pondicherry": "Puducherry",
    "Uttaranchal": "Uttarakhand",
    "Arunanchal Pradesh": "Arunachal Pradesh",
    "NCT of Delhi": "Delhi"
}

code_map = {
    "Andaman and Nicobar Islands": "IN-AN",
    "Andhra Pradesh": "IN-AP",
    "Arunachal Pradesh": "IN-AR",
    "Assam": "IN-AS",
    "Bihar": "IN-BR",
    "Chandigarh": "IN-CH",
    "Chhattisgarh": "IN-CT",
    "Dadra and Nagar Haveli and Daman and Diu": "IN-DN",
    "Delhi": "IN-DL",
    "Goa": "IN-GA",
    "Gujarat": "IN-GJ",
    "Haryana": "IN-HR",
    "Himachal Pradesh": "IN-HP",
    "Jammu and Kashmir": "IN-JK",
    "Jharkhand": "IN-JH",
    "Karnataka": "IN-KA",
    "Kerala": "IN-KL",
    "Ladakh": "IN-LA",
    "Lakshadweep": "IN-LD",
    "Madhya Pradesh": "IN-MP",
    "Maharashtra": "IN-MH",
    "Manipur": "IN-MN",
    "Meghalaya": "IN-ML",
    "Mizoram": "IN-MZ",
    "Nagaland": "IN-NL",
    "Odisha": "IN-OD",
    "Puducherry": "IN-PY",
    "Punjab": "IN-PB",
    "Rajasthan": "IN-RJ",
    "Sikkim": "IN-SK",
    "Tamil Nadu": "IN-TN",
    "Telangana": "IN-TG",
    "Tripura": "IN-TR",
    "Uttar Pradesh": "IN-UP",
    "Uttarakhand": "IN-UT",
    "West Bengal": "IN-WB"
}

normalized_features = []
for feat in data.get("features", []):
    props = feat.get("properties", {})
    raw_name = props.get("st_nm") or props.get("ST_NM") or props.get("NAME_1") or props.get("state_name") or ""
    raw_name = raw_name.strip()
    norm_name = name_map.get(raw_name, raw_name)
    code = code_map.get(norm_name, props.get("state_code", ""))

    feat["properties"] = {
        "name": norm_name,
        "state_name": norm_name,
        "state_code": code
    }
    normalized_features.append(feat)

data["features"] = normalized_features

with open("${OUTPUT_FILE}", "w", encoding="utf-8") as f:
    json.dump(data, f, separators=(',', ':'))

print(f"  ✓ Successfully mapped {len(normalized_features)} states/UTs with ECharts standard properties")
EOF

SIZE=$(wc -c < "${OUTPUT_FILE}" | tr -d ' ')
echo "✅ GeoJSON ready at ${OUTPUT_FILE} (${SIZE} bytes)"
