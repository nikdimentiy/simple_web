let weightData = {
  dates: [new Date().toISOString().split("T")[0]],
  weights: [190.2],
};
const goalWeight = 173.0;
const startWeight = 190.2;

// Initialize Chart
const ctx = document.getElementById("weightChart").getContext("2d");
const weightChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: weightData.dates,
    datasets: [
      {
        label: "Weight (lbs)",
        data: weightData.weights,
        borderColor: "#0066cc",
        tension: 0.1,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weight Progress Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  },
});

function updateMetrics() {
  const currentWeight = weightData.weights[weightData.weights.length - 1];
  const weightToLose = currentWeight - goalWeight;
  const totalWeightToLose = startWeight - goalWeight;
  const progress = (
    ((totalWeightToLose - weightToLose) / totalWeightToLose) *
    100
  ).toFixed(1);

  document.getElementById("currentWeight").textContent = `${currentWeight} lbs`;
  document.getElementById("goalWeight").textContent = `${goalWeight} lbs`;
  document.getElementById("weightToLose").textContent = `${weightToLose.toFixed(
    1
  )} lbs`;
  document.getElementById("progress").textContent = `${progress}%`;
  document.getElementById("progressBar").style.width = `${progress}%`;

  weightChart.data.labels = weightData.dates;
  weightChart.data.datasets[0].data = weightData.weights;
  weightChart.update();
}

function addWeight() {
  const date = document.getElementById("dateInput").value;
  const weight = parseFloat(document.getElementById("weightInput").value);

  if (!date || !weight) {
    alert("Please enter both date and weight");
    return;
  }

  // Insert data in chronological order
  const index = weightData.dates.findIndex((d) => d > date);
  const insertIndex = index === -1 ? weightData.dates.length : index;

  weightData.dates.splice(insertIndex, 0, date);
  weightData.weights.splice(insertIndex, 0, weight);

  updateMetrics();

  // Clear inputs
  document.getElementById("dateInput").value = "";
  document.getElementById("weightInput").value = "";
}

function exportToCSV() {
  const rows = weightData.dates.map(
    (date, i) => `${date},${weightData.weights[i]}`
  );
  const csvContent = "Date,Weight\n" + rows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "weight_data.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importCSV(input) {
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.split("\n").slice(1); // Skip header

    weightData = {
      dates: [],
      weights: [],
    };

    rows.forEach((row) => {
      if (row.trim()) {
        const [date, weight] = row.split(",");
        weightData.dates.push(date.trim());
        weightData.weights.push(parseFloat(weight.trim()));
      }
    });

    updateMetrics();
  };

  reader.readAsText(file);
}

// Initialize with default data
updateMetrics();
