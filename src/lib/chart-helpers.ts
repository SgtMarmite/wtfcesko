const isMobile = () => window.innerWidth <= 640;

export function baseOptions(): any {
  const mobile = isMobile();
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: "easeOutQuart" as const },
    plugins: {
      legend: {
        display: !mobile,
        labels: { color: "#e0e0e0", font: { size: 12 }, boxWidth: 12, padding: 20 },
      },
      tooltip: {
        backgroundColor: "#1a1a1a",
        titleColor: "#fff",
        bodyColor: "#e0e0e0",
        borderColor: "#333",
        borderWidth: 1,
        cornerRadius: 8,
        padding: mobile ? 8 : 12,
      },
    },
  };
}

export function gridStyle(): any {
  const mobile = isMobile();
  return {
    ticks: {
      color: "#666",
      font: { size: mobile ? 9 : 11 },
      maxRotation: mobile ? 45 : 0,
      autoSkip: true,
      maxTicksLimit: mobile ? 8 : 20,
    },
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
