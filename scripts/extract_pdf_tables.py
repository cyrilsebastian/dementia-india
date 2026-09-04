#!/usr/bin/env python3
"""
scripts/extract_pdf_tables.py
Extracts structured data tables from PDF reports (e.g. World Alzheimer Report 2023, Dementia India Reports).
Usage:
    python3 scripts/extract_pdf_tables.py --input data/raw/world_alzheimer_report_2023.pdf --pages 12,18 --output data/raw/war2023_tables.csv
"""

import argparse
import csv
import sys
import os

def extract_tables_pdfplumber(pdf_path, pages, output_path):
    try:
        import pdfplumber
    except ImportError:
        print("❌ 'pdfplumber' not found. Install with: pip install pdfplumber")
        return False

    all_rows = []
    with pdfplumber.open(pdf_path) as pdf:
        target_pages = [int(p.strip()) - 1 for p in pages.split(",") if p.strip().isdigit()]
        for p_idx in target_pages:
            if 0 <= p_idx < len(pdf.pages):
                page = pdf.pages[p_idx]
                tables = page.extract_tables()
                for table in tables:
                    for row in table:
                        clean_row = [cell.replace("\n", " ").strip() if cell else "" for cell in row]
                        if any(clean_row):
                            all_rows.append(clean_row)

    if all_rows:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerows(all_rows)
        print(f"✅ Successfully extracted {len(all_rows)} table rows to {output_path}")
        return True
    else:
        print("⚠️ No tables found on specified pages.")
        return False

def main():
    parser = argparse.ArgumentParser(description="Extract table data from PDF reports to CSV.")
    parser.add_argument("--input", required=True, help="Path to input PDF file")
    parser.add_argument("--pages", required=True, help="Comma-separated 1-indexed page numbers, e.g. '15,22'")
    parser.add_argument("--output", required=True, help="Path to output CSV file")
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"❌ Input PDF not found: {args.input}")
        sys.exit(1)

    success = extract_tables_pdfplumber(args.input, args.pages, args.output)
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()
