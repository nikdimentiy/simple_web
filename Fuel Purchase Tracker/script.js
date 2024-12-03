// Store gas purchase records
let gasRecords = [];

// Form submission handler
document.getElementById('gasForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const record = {
        date: document.getElementById('date').value,
        station: document.getElementById('station').value,
        type: document.getElementById('type').value,
        pricePerGallon: parseFloat(document.getElementById('pricePerGallon').value),
        gallons: parseFloat(document.getElementById('gallons').value),
        mileage: parseInt(document.getElementById('mileage').value),
        milesDriven: parseInt(document.getElementById('milesDriven').value),
        totalCost: parseFloat(document.getElementById('pricePerGallon').value) * 
                  parseFloat(document.getElementById('gallons').value)
    };
    
    // Add record to array
    gasRecords.push(record);
    
    // Update table
    updateTable();
    
    // Reset form
    this.reset();
});

// CSV File Import Handler
document.getElementById('csvFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const fileInfo = document.getElementById('fileInfo');
    
    if (file) {
        // Show file info
        fileInfo.textContent = `Selected file: ${file.name}`;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                // Parse CSV content
                const csvData = event.target.result;
                const rows = csvData.split('\n');
                const headers = rows[0].split(',').map(header => header.trim());
                
                // Validate CSV structure
                const requiredHeaders = ['Date', 'Station', 'Type', 'Price Per Gallon', 
                                       'Gallons', 'Mileage', 'Miles Driven', 'Total Cost'];
                
                const hasValidHeaders = requiredHeaders.every(header => 
                    headers.includes(header));
                
                if (!hasValidHeaders) {
                    throw new Error('Invalid CSV format. Please check the column headers.');
                }
                
                // Process data rows
                for (let i = 1; i < rows.length; i++) {
                    if (rows[i].trim() === '') continue;
                    
                    const values = rows[i].split(',');
                    const record = {
                        date: values[headers.indexOf('Date')].trim(),
                        station: values[headers.indexOf('Station')].trim(),
                        type: values[headers.indexOf('Type')].trim(),
                        pricePerGallon: parseFloat(values[headers.indexOf('Price Per Gallon')]),
                        gallons: parseFloat(values[headers.indexOf('Gallons')]),
                        mileage: parseInt(values[headers.indexOf('Mileage')]),
                        milesDriven: parseInt(values[headers.indexOf('Miles Driven')]),
                        totalCost: parseFloat(values[headers.indexOf('Total Cost')])
                    };
                    
                    // Validate record
                    if (Object.values(record).some(val => isNaN(val) && val === '')) {
                        continue; // Skip invalid records
                    }
                    
                    gasRecords.push(record);
                }
                
                // Update table and show success message
                updateTable();
                fileInfo.textContent = `Successfully imported ${gasRecords.length} records from ${file.name}`;
                fileInfo.style.color = 'green';
                
            } catch (error) {
                fileInfo.textContent = `Error: ${error.message}`;
                fileInfo.style.color = 'red';
            }
        };
        
        reader.onerror = function() {
            fileInfo.textContent = 'Error reading file';
            fileInfo.style.color = 'red';
        };
        
        reader.readAsText(file);
    }
});

// Update table with records
function updateTable() {
    const tbody = document.querySelector('#gasTable tbody');
    tbody.innerHTML = '';
    
    gasRecords.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.station}</td>
            <td>${record.type}</td>
            <td>$${record.pricePerGallon.toFixed(2)}</td>
            <td>${record.gallons.toFixed(2)}</td>
            <td>${record.mileage}</td>
            <td>${record.milesDriven}</td>
            <td>$${record.totalCost.toFixed(2)}</td>
            <td>
                <button onclick="deleteRecord(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Delete record
function deleteRecord(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        gasRecords.splice(index, 1);
        updateTable();
    }
}

// Save to CSV
document.getElementById('saveCSV').addEventListener('click', function() {
    if (gasRecords.length === 0) {
        alert('No records to export!');
        return;
    }
    
    const headers = ['Date', 'Station', 'Type', 'Price Per Gallon', 'Gallons', 
                    'Mileage', 'Miles Driven', 'Total Cost'];
    const csvContent = [
        headers.join(','),
        ...gasRecords.map(record => [
            record.date,
            record.station,
            record.type,
            record.pricePerGallon,
            record.gallons,
            record.mileage,
            record.milesDriven,
            record.totalCost
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gas_purchases.csv';
    a.click();
    window.URL.revokeObjectURL(url);
});

// Calculate monthly cost
document.getElementById('calculateMonthly').addEventListener('click', function() {
    if (gasRecords.length === 0) {
        alert('No records to calculate!');
        return;
    }
    
    const monthlyTotals = {};
    
    gasRecords.forEach(record => {
        const monthYear = record.date.substring(0, 7); // Get YYYY-MM
        monthlyTotals[monthYear] = (monthlyTotals[monthYear] || 0) + record.totalCost;
    });
    
    let monthlyReport = '<h2>Monthly Totals</h2>';
    for (const [monthYear, total] of Object.entries(monthlyTotals)) {
        const [year, month] = monthYear.split('-');
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
        monthlyReport += `<p>${monthName} ${year}: $${total.toFixed(2)}</p>`;
    }
    
    document.getElementById('monthlyCost').innerHTML = monthlyReport;
});
