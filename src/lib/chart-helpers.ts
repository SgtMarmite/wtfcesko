export function baseOptions(): any {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: "easeOutQuart" as const },
    plugins: {
      legend: {
        display: window.innerWidth > 640,
        labels: { color: "#e0e0e0", font: { size: 12 }, boxWidth: 12, padding: 20 },
      },
      tooltip: {
        backgroundColor: "#1a1a1a",
        titleColor: "#fff",
        bodyColor: "#e0e0e0",
        borderColor: "#333",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
  };
}

export function gridStyle(): any {
  return {
    ticks: { color: "#666", font: { size: 11 } },
    grid: { color: "#1a1a1a" },
  };
}

export function lineOptions(yTitle: string): any {
  return {
    ...baseOptions(),
    scales: {
      x: gridStyle(),
      y: {
        ...gridStyle(),
        title: { display: true, text: yTitle, color: "#888" },
      },
    },
  };
}

export function lineDataset(ds: any, fill = true) {
  return {
    label: ds.label,
    data: ds.data,
    borderColor: ds.color,
    backgroundColor: ds.color + (fill ? "15" : "00"),
    fill,
    tension: 0.3,
    pointRadius: 3,
    pointHoverRadius: 6,
    borderWidth: 2.5,
  };
}

export function groupedBarOptions(yTitle: string): any {
  return {
    ...baseOptions(),
    scales: {
      x: gridStyle(),
      y: {
        ...gridStyle(),
        title: { display: true, text: yTitle, color: "#888" },
      },
    },
  };
}
