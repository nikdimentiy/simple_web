let totalPages = 0;
let entries = [];

function setBookDetails() {
    const title = document.getElementById('bookTitle').value;
    totalPages = parseInt(document.getElementById('totalPagesInput').value);

    if (!title || isNaN(totalPages) || totalPages <= 0) {
        alert('Please enter a valid book title and page count.');
        return;
    }

    document.querySelector('h1').textContent = `[ Reading Analytics: ${title.toUpperCase()} ]`;
    entries = [];
    updateTable();
    updateMetrics();
}

function updateMetrics() {
    const totalPagesRead = entries.reduce((sum, entry) => sum + entry.pages, 0);
    const completionRate = ((totalPagesRead / totalPages) * 100).toFixed(1);

    document.getElementById('completionRate').textContent = `${completionRate}%`;
    document.getElementById('progressBar').style.width = `${completionRate}%`;
    document.getElementById('totalPagesRead').textContent = totalPagesRead;

    const readingSpeed = parseFloat(document.getElementById('readingSpeed').value);
    document.getElementById('readingVelocity').textContent = readingSpeed;

    const dailyReadingTime = parseFloat(document.getElementById('dailyReadingTime').value);
    const remainingPages = totalPages - totalPagesRead;
    const daysToComplete = Math.ceil(remainingPages / (readingSpeed * dailyReadingTime));
    document.getElementById('estimatedCompletion').textContent = daysToComplete;
}

function updateTable() {
    const tbody = document.querySelector('#readingLog tbody');
    tbody.innerHTML = '';

    entries.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(entry => {
        const row = document.createElement('tr');
        const velocity = (entry.pages / 2).toFixed(1);  // Adjust as needed for velocity calculation
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.pages}</td>
            <td>${velocity} p/h</td>
            <td>${entry.notes}</td>
        `;
        tbody.appendChild(row);
    });
}

function addEntry() {
    const date = document.getElementById('newDate').value;
    const pages = parseInt(document.getElementById('newPages').value);
    const notes = document.getElementById('newNotes').value;

    if (!date || isNaN(pages)) {
        alert('Please fill in both date and pages read!');
        return;
    }

    entries.push({ date, pages, notes });
    updateTable();
    updateMetrics();
    saveToLocalStorage();
}

function exportToCSV() {
    const csvContent = "Date,Pages,Notes\n" +
        entries.map(entry => `${entry.date},${entry.pages},"${entry.notes}"`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reading_progress.csv';
    link.click();
    URL.revokeObjectURL(url);
}

function importFromCSV() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n').slice(1);
        rows.forEach(row => {
            const [date, pages, notes] = row.split(',');
            entries.push({ date: date.trim(), pages: parseInt(pages.trim()), notes: notes.trim() });
        });
        updateTable();
        updateMetrics();
    };
    reader.readAsText(file);
    fileInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    updateMetrics();
});
