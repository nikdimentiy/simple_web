function saveJourney() {
  const data = {
    date: document.getElementById("date").value,
    wakeTime: document.getElementById("wakeTime").value,
    wentWell: document.getElementById("wentWell").value.replace(/,/g, ";"),
    improvements: document
      .getElementById("improvements")
      .value.replace(/,/g, ";"),
    rituals: {
      fit: document.getElementById("fit").checked,
      books: document.getElementById("books").checked,
      online: document.getElementById("online").checked,
      english: document.getElementById("english").checked,
      wakeup: document.getElementById("wakeup").checked,
    },
  };

  const csvRow =
    `${data.date},${data.wakeTime},${data.wentWell},${data.improvements},` +
    `${data.rituals.fit},${data.rituals.books},${data.rituals.online},` +
    `${data.rituals.english},${data.rituals.wakeup}\n`;

  const headers =
    "Date,Wake Time,What Went Well,Improvements,Fit,Books,Online,English,Wake UP\n";
  const blob = new Blob([headers + csvRow], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "daily-reflection.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  const notification = document.getElementById("notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);

  document.getElementById("date").value = "";
  document.getElementById("wakeTime").value = "";
  document.getElementById("wentWell").value = "";
  document.getElementById("improvements").value = "";
  document.getElementById("fit").checked = false;
  document.getElementById("books").checked = false;
  document.getElementById("online").checked = false;
  document.getElementById("english").checked = false;
  document.getElementById("wakeup").checked = false;
}
