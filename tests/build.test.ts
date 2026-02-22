import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

describe("Astro build", () => {
  beforeAll(() => {
    execSync("npm run build", { stdio: "pipe", timeout: 60_000 });
  }, 120_000);

  it("produces dist/index.html", () => {
    expect(existsSync("dist/index.html")).toBe(true);
  });

  it("HTML contains all 6 act dividers", () => {
    const html = readFileSync("dist/index.html", "utf-8");
    for (const id of ["akt-1", "akt-2", "akt-3", "akt-4", "akt-5", "akt-6"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("HTML contains all chart canvases", () => {
    const html = readFileSync("dist/index.html", "utf-8");
    const chartIds = [
      "kupni-sila", "mzdy-realita", "hdp-vs-mzdy", "zdaneni-prace", "dane",
      "potraviny", "energie", "bydleni", "najmy", "vystavba",
      "demografie", "zdravotnictvi", "duchody", "vydaje-duchody",
      "statni-dluh", "obsluha-dluhu", "dane-cas",
      "produktivita", "skolstvi", "vyzkum", "korupce-digital", "volby-vek",
    ];
    for (const id of chartIds) {
      expect(html).toContain(`id="chart-${id}"`);
    }
  });

  it("bundles JS assets", () => {
    const html = readFileSync("dist/index.html", "utf-8");
    expect(html).toMatch(/<script.*src=.*\.js/);
  });
});
