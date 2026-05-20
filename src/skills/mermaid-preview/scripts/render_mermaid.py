#!/usr/bin/env python3
"""Render Mermaid files to PNG via Mermaid CLI."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


MERMAID_FENCE_RE = re.compile(r"```mermaid\s*\n(.*?)\n```", re.DOTALL | re.IGNORECASE)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Render a Mermaid .mmd or Markdown mermaid block to PNG.")
    parser.add_argument("input", help="Path to a .mmd file, or a Markdown file containing a mermaid fence.")
    parser.add_argument("--out", help="Output PNG path. Defaults to a stable file under the temp directory.")
    parser.add_argument("--theme", default="default", help="Mermaid theme: default, neutral, dark, forest, base.")
    parser.add_argument("--background", default="white", help="PNG background color, e.g. white or transparent.")
    parser.add_argument("--scale", default="2", help="Puppeteer device scale factor.")
    parser.add_argument("--allow-npx", action="store_true", help="Use npx @mermaid-js/mermaid-cli if mmdc is missing.")
    return parser.parse_args()


def read_mermaid_source(input_path: Path) -> str:
    text = input_path.read_text(encoding="utf-8")
    if input_path.suffix.lower() in {".md", ".markdown"}:
        match = MERMAID_FENCE_RE.search(text)
        if not match:
            raise ValueError(f"Markdown file has no mermaid code fence: {input_path}")
        return match.group(1).strip() + "\n"
    return text


def default_output_path(input_path: Path, source: str) -> Path:
    digest = hashlib.sha1(source.encode("utf-8")).hexdigest()[:10]
    safe_stem = re.sub(r"[^A-Za-z0-9_.-]+", "-", input_path.stem).strip("-") or "diagram"
    out_dir = Path(tempfile.gettempdir()) / "mermaid-preview"
    return out_dir / f"{safe_stem}-{digest}.png"


def build_command(args: argparse.Namespace, input_file: Path, output_file: Path, puppeteer_config: Path) -> list[str]:
    mmdc = shutil.which("mmdc")
    if mmdc:
        cmd = [mmdc]
    elif args.allow_npx:
        if not shutil.which("npx"):
            raise RuntimeError("mmdc is missing, and npx is not available.")
        cmd = ["npx", "-y", "@mermaid-js/mermaid-cli"]
    else:
        raise RuntimeError(
            "mmdc is missing. Install Mermaid CLI, or rerun with --allow-npx to use npx temporarily."
        )

    cmd.extend(
        [
            "-i",
            str(input_file),
            "-o",
            str(output_file),
            "-t",
            args.theme,
            "-b",
            args.background,
            "-s",
            str(args.scale),
            "-p",
            str(puppeteer_config),
        ]
    )
    return cmd


def main() -> int:
    args = parse_args()
    input_path = Path(args.input).expanduser().resolve()
    if not input_path.exists():
        print(f"error: input file not found: {input_path}", file=sys.stderr)
        return 2

    try:
        source = read_mermaid_source(input_path)
        output_path = Path(args.out).expanduser().resolve() if args.out else default_output_path(input_path, source)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        with tempfile.TemporaryDirectory(prefix="mermaid-preview-") as temp_dir:
            temp_path = Path(temp_dir)
            render_input = temp_path / "input.mmd"
            render_input.write_text(source, encoding="utf-8")

            puppeteer_config = temp_path / "puppeteer-config.json"
            puppeteer_config.write_text(
                json.dumps({"args": ["--no-sandbox", "--disable-setuid-sandbox"]}),
                encoding="utf-8",
            )

            cmd = build_command(args, render_input, output_path, puppeteer_config)
            result = subprocess.run(cmd, text=True, capture_output=True, check=False)
            if result.returncode != 0:
                print("error: Mermaid render failed", file=sys.stderr)
                if result.stdout.strip():
                    print(result.stdout.strip(), file=sys.stderr)
                if result.stderr.strip():
                    print(result.stderr.strip(), file=sys.stderr)
                return result.returncode

        if not output_path.exists():
            print(f"error: renderer finished but output is missing: {output_path}", file=sys.stderr)
            return 1

        print(f"input: {input_path}")
        print(f"output: {output_path}")
        return 0
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
