import type Chart from "chart.js/auto";
import { baseOptions, gridStyle, lineOptions, lineDataset, groupedBarOptions } from "./chart-helpers";

import inflationData from "../data/inflation-vs-wages.json";
import gdpWagesData from "../data/gdp-vs-wages.json";
import laborTaxData from "../data/labor-tax-breakdown.json";
import taxData from "../data/tax-burden.json";
import foodData from "../data/food-prices.json";
import energyData from "../data/energy-prices.json";
import housingData from "../data/housing-affordability.json";
import rentData from "../data/rent-vs-wages.json";
import constructionData from "../data/housing-construction.json";
import demoData from "../data/demographics.json";
import healthData from "../data/healthcare.json";
import pensionData from "../data/pensions-vs-wages.json";
import pensionSpendData from "../data/pension-spending.json";
import debtData from "../data/government-debt.json";
import debtServiceData from "../data/debt-servicing.json";
import taxTimeData from "../data/tax-burden-time.json";
import productivityData from "../data/productivity.json";
import educationData from "../data/education-spending.json";
import rdData from "../data/rd-spending.json";
import corruptionData from "../data/corruption-digital.json";
import wageRealityData from "../data/wage-reality.json";
import votingData from "../data/voting-by-age.json";

function getCanvas(id: string): HTMLCanvasElement {
  return document.getElementById(`chart-${id}`) as HTMLCanvasElement;
}

function horizontalBarConfig(
  id: string, data: any, xTitle: string, xMin?: number, xMax?: number
): ConstructorParameters<typeof Chart> {
  const colors = data.datasets[0].colors;
  return [getCanvas(id), {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        label: data.datasets[0].label,
        data: data.datasets[0].data,
        backgroundColor: colors.map((c: string) => c + "cc"),
        borderColor: colors,
        borderWidth: 1,
        borderRadius: 4,
      }],
    },
    options: {
      ...baseOptions(),
      indexAxis: "y" as const,
      scales: {
        x: { ...gridStyle(), title: { display: true, text: xTitle, color: "#888" }, ...(xMin != null && { min: xMin }), ...(xMax != null && { max: xMax }) },
        y: gridStyle(),
      },
    },
  }];
}

export const chartConfigs: Record<string, () => ConstructorParameters<typeof Chart>> = {
  "kupni-sila": () => [getCanvas("kupni-sila"), {
    type: "line",
    data: {
      labels: inflationData.labels,
      datasets: inflationData.datasets.map(ds => {
        const base = lineDataset(ds, false);
        if (ds.label === "Reálná kupní síla") {
          return { ...base, borderWidth: 3.5, pointRadius: 4, borderDash: [] };
        }
        return { ...base, borderWidth: 1.5, borderDash: [6, 3], pointRadius: 2 };
      }),
    },
    options: lineOptions("Index (1993 = 100)"),
  }],

  "mzdy-realita": () => horizontalBarConfig("mzdy-realita", wageRealityData, "Kč / měsíc"),

  "hdp-vs-mzdy": () => [getCanvas("hdp-vs-mzdy"), {
    type: "bar",
    data: {
      labels: gdpWagesData.labels,
      datasets: gdpWagesData.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.color + "cc",
        borderColor: ds.color,
        borderWidth: 1,
        borderRadius: 4,
      })),
    },
    options: groupedBarOptions("% průměru EU"),
  }],

  "zdaneni-prace": () => [getCanvas("zdaneni-prace"), {
    type: "doughnut",
    data: {
      labels: laborTaxData.labels,
      datasets: [{
        data: laborTaxData.data,
        backgroundColor: laborTaxData.colors,
        borderColor: "#0a0a0a",
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "55%",
      animation: { duration: 1200, easing: "easeOutQuart" as const },
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const,
          labels: {
            color: "#e0e0e0",
            font: { size: window.innerWidth > 640 ? 12 : 10 },
            boxWidth: 12,
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#fff",
          bodyColor: "#e0e0e0",
          borderColor: "#333",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            label: (ctx: any) => {
              const val = ctx.raw as number;
              const pct = laborTaxData.percentages[ctx.dataIndex];
              return ` ${ctx.label}: ${val.toLocaleString("cs-CZ")} Kč (${pct} %)`;
            },
          },
        },
      },
    },
  }],

  "dane": () => horizontalBarConfig("dane", taxData, "%", 0, 55),
  "potraviny": () => horizontalBarConfig("potraviny", foodData, "% výdajů domácností"),
  "energie": () => horizontalBarConfig("energie", energyData, "ct/kWh"),

  "bydleni": () => [getCanvas("bydleni"), {
    type: "line",
    data: {
      labels: housingData.labels,
      datasets: housingData.datasets.map(ds => lineDataset(ds)),
    },
    options: lineOptions("Index (1998 = 100)"),
  }],

  "najmy": () => [getCanvas("najmy"), {
    type: "line",
    data: {
      labels: rentData.labels,
      datasets: [{
        ...lineDataset(rentData.datasets[0]),
        backgroundColor: rentData.datasets[0].color + "20",
      }],
    },
    options: lineOptions("% čisté mzdy"),
  }],

  "vystavba": () => [getCanvas("vystavba"), {
    type: "line",
    data: {
      labels: constructionData.labels,
      datasets: constructionData.datasets.map(ds => lineDataset(ds)),
    },
    options: lineOptions("Počet bytů"),
  }],

  "demografie": () => [getCanvas("demografie"), {
    type: "line",
    data: {
      labels: demoData.labels,
      datasets: [
        lineDataset(demoData.datasets[0]),
        {
          label: demoData.datasets[1].label,
          data: demoData.datasets[1].data,
          borderColor: demoData.datasets[1].color,
          borderDash: [8, 4],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: lineOptions("Děti na ženu"),
  }],

  "zdravotnictvi": () => [getCanvas("zdravotnictvi"), {
    type: "bar",
    data: {
      labels: healthData.labels,
      datasets: healthData.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.color + "cc",
        borderColor: ds.color,
        borderWidth: 1,
        borderRadius: 4,
      })),
    },
    options: groupedBarOptions(""),
  }],

  "duchody": () => [getCanvas("duchody"), {
    type: "line",
    data: {
      labels: pensionData.labels,
      datasets: [{
        ...lineDataset(pensionData.datasets[0]),
        backgroundColor: pensionData.datasets[0].color + "20",
      }],
    },
    options: lineOptions("% hrubé mzdy"),
  }],

  "vydaje-duchody": () => [getCanvas("vydaje-duchody"), {
    type: "bar",
    data: {
      labels: pensionSpendData.labels,
      datasets: [
        {
          type: "bar" as const,
          label: pensionSpendData.datasets[0].label,
          data: pensionSpendData.datasets[0].data,
          backgroundColor: pensionSpendData.datasets[0].color + "80",
          borderColor: pensionSpendData.datasets[0].color,
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: "y",
        },
        {
          type: "line" as const,
          label: pensionSpendData.datasets[1].label,
          data: pensionSpendData.datasets[1].data,
          borderColor: pensionSpendData.datasets[1].color,
          backgroundColor: "transparent",
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.3,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      ...baseOptions(),
      scales: {
        x: gridStyle(),
        y: {
          ...gridStyle(),
          position: "left" as const,
          title: { display: true, text: "% HDP", color: "#888" },
        },
        y1: {
          ...gridStyle(),
          position: "right" as const,
          title: { display: true, text: "% populace 65+", color: "#888" },
          grid: { display: false },
        },
      },
    },
  }],

  "statni-dluh": () => [getCanvas("statni-dluh"), {
    type: "bar",
    data: {
      labels: debtData.labels,
      datasets: [
        {
          type: "bar" as const,
          label: debtData.datasets[0].label,
          data: debtData.datasets[0].data,
          backgroundColor: debtData.datasets[0].color + "80",
          borderColor: debtData.datasets[0].color,
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: "y",
        },
        {
          type: "line" as const,
          label: debtData.datasets[1].label,
          data: debtData.datasets[1].data,
          borderColor: debtData.datasets[1].color,
          backgroundColor: "transparent",
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.3,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      ...baseOptions(),
      scales: {
        x: gridStyle(),
        y: {
          ...gridStyle(),
          position: "left" as const,
          title: { display: true, text: "mld. Kč", color: "#888" },
        },
        y1: {
          ...gridStyle(),
          position: "right" as const,
          title: { display: true, text: "tis. Kč / obyvatel", color: "#888" },
          grid: { display: false },
        },
      },
    },
  }],

  "obsluha-dluhu": () => [getCanvas("obsluha-dluhu"), {
    type: "bar",
    data: {
      labels: debtServiceData.labels,
      datasets: [{
        label: debtServiceData.datasets[0].label,
        data: debtServiceData.datasets[0].data,
        backgroundColor: debtServiceData.datasets[0].color + "80",
        borderColor: debtServiceData.datasets[0].color,
        borderWidth: 1,
        borderRadius: 4,
      }],
    },
    options: lineOptions("mld. Kč"),
  }],

  "dane-cas": () => [getCanvas("dane-cas"), {
    type: "line",
    data: {
      labels: taxTimeData.labels,
      datasets: taxTimeData.datasets.map(ds => lineDataset(ds)),
    },
    options: lineOptions("Tax wedge (%)"),
  }],

  "produktivita": () => [getCanvas("produktivita"), {
    type: "line",
    data: {
      labels: productivityData.labels,
      datasets: productivityData.datasets.map(ds => lineDataset(ds)),
    },
    options: lineOptions("EUR / hodinu (PPS)"),
  }],

  "skolstvi": () => [getCanvas("skolstvi"), {
    type: "bar",
    data: {
      labels: educationData.labels,
      datasets: educationData.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.color + "cc",
        borderColor: ds.color,
        borderWidth: 1,
        borderRadius: 4,
      })),
    },
    options: groupedBarOptions(""),
  }],

  "vyzkum": () => [getCanvas("vyzkum"), {
    type: "line",
    data: {
      labels: rdData.labels,
      datasets: rdData.datasets.map(ds => lineDataset(ds)),
    },
    options: lineOptions("% HDP"),
  }],

  "korupce-digital": () => [getCanvas("korupce-digital"), {
    type: "line",
    data: {
      labels: corruptionData.labels,
      datasets: corruptionData.datasets.map(ds => lineDataset(ds)),
    },
    options: lineOptions("CPI (0–100)"),
  }],

  "volby-vek": () => [getCanvas("volby-vek"), {
    type: "bar",
    data: {
      labels: votingData.labels,
      datasets: votingData.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.color + "cc",
        borderColor: ds.color,
        borderWidth: 1,
      })),
    },
    options: {
      ...baseOptions(),
      scales: {
        x: { ...gridStyle(), stacked: true },
        y: {
          ...gridStyle(),
          stacked: true,
          title: { display: true, text: "% voličů", color: "#888" },
          max: 100,
        },
      },
      plugins: {
        ...baseOptions().plugins,
        tooltip: {
          ...baseOptions().plugins.tooltip,
          callbacks: { label: (c: any) => `${c.dataset.label}: ${c.raw} %` },
        },
      },
    },
  }],
};
