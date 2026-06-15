"""將 raw JSON 轉換為 RAG-ready chunk 格式。

輸入: assistant/data/raw/{slug}.json
輸出: assistant/data/chunks/all_chunks.json
"""

import json
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "data" / "raw"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "data" / "chunks"
PLONKIT_BASE = "https://www.plonkit.net"

SKIP_SLUGS = {"maps", "middle-earth"}


def transform_file(filepath: Path) -> list[dict]:
    data = json.loads(filepath.read_text(encoding="utf-8"))
    pub = data["data"]["public"]

    slug = pub["slug"]
    if slug in SKIP_SLUGS:
        return []

    country = pub["title"]
    code = pub.get("code", "")
    region = pub.get("cat", [])

    chunks = []
    for step_idx, step in enumerate(pub["steps"]):
        step_group = step.get("title", "")
        for item_idx, item in enumerate(step.get("items", [])):
            if item.get("kind") != "tip":
                continue

            tip_data = item.get("data", {})
            text_parts = tip_data.get("text", [])
            text = "\n".join(text_parts)

            if not text.strip():
                continue

            image = tip_data.get("image", {})
            image_url = image.get("imageUrl", "")
            if image_url and not image_url.startswith("http"):
                image_url = PLONKIT_BASE + image_url

            chunk = {
                "id": f"{slug}__{step_idx}__{item_idx}",
                "country": country,
                "country_code": code,
                "region": region,
                "step_group": step_group,
                "tags": item.get("tags", []),
                "text": text,
                "image_url": image_url,
                "image_link": image.get("imageLink", ""),
                "source_url": f"{PLONKIT_BASE}/{slug}",
            }
            chunks.append(chunk)

    return chunks


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    all_chunks = []
    file_count = 0

    for filepath in sorted(RAW_DIR.glob("*.json")):
        chunks = transform_file(filepath)
        all_chunks.extend(chunks)
        if chunks:
            file_count += 1

    output_path = OUTPUT_DIR / "all_chunks.json"
    output_path.write_text(
        json.dumps(all_chunks, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"轉換完成: {file_count} 個檔案 → {len(all_chunks)} 個 chunks")
    print(f"輸出: {output_path}")

    tags = {}
    for chunk in all_chunks:
        for tag in chunk["tags"]:
            tags[tag] = tags.get(tag, 0) + 1

    print(f"\n標籤分布 (共 {len(tags)} 種):")
    for tag, count in sorted(tags.items(), key=lambda x: -x[1])[:15]:
        print(f"  {tag}: {count}")

    regions = {}
    for chunk in all_chunks:
        for r in chunk["region"]:
            regions[r] = regions.get(r, 0) + 1

    print(f"\n區域分布:")
    for r, count in sorted(regions.items(), key=lambda x: -x[1]):
        print(f"  {r}: {count}")


if __name__ == "__main__":
    main()
