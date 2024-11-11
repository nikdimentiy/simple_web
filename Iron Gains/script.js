// Global variables
let workouts = [];
let prs = {};

// Exercise database
const exercisesByGroup = {
    chest: [
        'Bench Press', 'Incline Bench Press', 'Decline Bench Press',
        'Dumbbell Flyes', 'Push-Ups', 'Cable Flyes', 'Dips',
        'Dumbbell Press', 'Machine Press'
    ],
    back: {
        'upper': [
            'Pull-Ups', 'Lat Pulldowns', 'Face Pulls',
            'Bent Over Rows', 'Shrugs', 'T-Bar Rows'
        ],
        'lower': [
            'Deadlifts', 'Good Mornings', 'Back Extensions',
            'Superman Holds', 'Rack Pulls'
        ]
    },
    shoulders: [
        'Overhead Press', 'Lateral Raises', 'Front Raises',
        'Reverse Flyes', 'Military Press', 'Arnold Press',
        'Face Pulls', 'Upright Rows'
    ],
    arms: {
        'biceps': [
            'Barbell Curls', 'Dumbbell Curls', 'Hammer Curls',
            'Preacher Curls', 'Concentration Curls', 'Cable Curls'
        ],
        'triceps': [
            'Tricep Pushdowns', 'Skull Crushers', 'Diamond Push-Ups',
            'Tricep Extensions', 'Dips', 'Rope Pushdowns'
        ],
        'forearms': [
            'Wrist Curls', 'Reverse Wrist Curls', 'Farmers Walks',
            'Plate Pinches', 'Hammer Curls', 'Dead Hangs'
        ]
    },
    abs: {
        'rectus': [
            'Crunches', 'Sit-Ups', 'Leg Raises',
            'Planks', 'Ab Wheel Rollouts', 'Cable Crunches'
        ],
        'obliques': [
            'Russian Twists', 'Side Planks', 'Woodchoppers',
            'Side Bends', 'Bicycle Crunches'
        ],
        'transverse': [
            'Vacuum Exercise', 'Dead Bug', 'Hollow Body Hold',
            'Plank Variations', 'Bird Dog'
        ]
    },
    legs: {
        'quads': [
            'Squats', 'Leg Press', 'Lunges',
            'Leg Extensions', 'Hack Squats', 'Front Squats'
        ],
        'hamstrings': [
            'Romanian Deadlifts', 'Leg Curls', 'Nordic Curls',
            'Good Mornings', 'Glute-Ham Raises'
        ],
        'glutes': [
            'Hip Thrusts', 'Glute Bridges', 'Cable Kickbacks',
            'Bulgarian Split Squats', 'Step Ups'
        ],
        'calves': [
            'Standing Calf Raises', 'Seated Calf Raises',
            'Jump Rope', 'Donkey Calf Raises'
        ]
    },
    hips: {
        'flexors': [
            'High Knees', 'Mountain Climbers', 'Leg Raises',
            'Hip Flexor Stretches', 'Cable Pull Throughs'
        ],
        'adductors': [
            'Adductor Machine', 'Side Lunges', 'Cossack Squats',
            'Copenhagen Planks', 'Cable Adductions'
        ]
    }
};

// Loading Overlay functions
function showLoading(message = 'Loading your gains...') {
    const overlay = document.getElementById('loadingOverlay');
    const loadingText = overlay.querySelector('.loading-text');
    loadingText.textContent = message;
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}

// Exercise Selection
function updateExerciseList() {
    const muscleGroup = document.getElementById('muscleGroup').value;
    const exerciseSelect = document.getElementById('exercise');
    exerciseSelect.innerHTML = '<option value="">Select Exercise</option>';

    if (!muscleGroup) return;

    const exercises = exercisesByGroup[muscleGroup];

    if (typeof exercises === 'object' && !Array.isArray(exercises)) {
        Object.entries(exercises).forEach(([subgroup, exerciseList]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = subgroup.charAt(0).toUpperCase() + subgroup.slice(1);

            exerciseList.forEach(exercise => {
                const option = document.createElement('option');
                option.value = exercise;
                option.textContent = exercise;
                optgroup.appendChild(option);
            });

            exerciseSelect.appendChild(optgroup);
        });
    } else {
        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise;
            option.textContent = exercise;
            exerciseSelect.appendChild(option);
        });
    }
}

// Notification System
function createNotificationContainer() {
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

function playPRSound() {
    const prSound = new Audio('path/to/arnold-sound.mp3'); // Optional sound effect path
    prSound.play();
}

function showPRNotification(exercise, weight, previousBest) {
    createNotificationContainer();

    const notification = document.createElement('div');
    notification.className = 'pr-notification';

    const improvement = previousBest ?
        ((weight - previousBest.weight) / previousBest.weight * 100).toFixed(1) : 100;

    notification.innerHTML = `
        <div class="pr-notification-content">
            <h3>NEW PERSONAL RECORD! 🏆</h3>
            <p>${exercise}</p>
            <p>${weight}kg - That's ${improvement}% better than your previous best!</p>
            <div class="progress-ring">
                <div class="progress-ring-fill"></div>
            </div>
        </div>
        <button class="close-btn">✕</button>
    `;

    document.querySelector('.notification-container').appendChild(notification);

    playPRSound();

    notification.querySelector('.close-btn').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => notification.remove(), 500);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Data Management Functions
function updateMetrics() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyVolume = workouts
        .filter(w => new Date(w.date) >= weekAgo)
        .reduce((sum, w) => sum + w.sets, 0);

    document.getElementById('weeklyVolume').textContent = weeklyVolume;

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prCount = Object.values(prs)
        .filter(pr => new Date(pr.date) >= monthStart)
        .length;

    document.getElementById('prCount').textContent = prCount;

    let streak = 0;
    let currentDate = new Date();
    const workoutDates = new Set(workouts.map(w => w.date));

    while (workoutDates.has(currentDate.toISOString().split('T')[0])) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    document.getElementById('workoutStreak').textContent = streak;
}

function updateTable() {
    const tbody = document.querySelector('#workoutLog tbody');
    tbody.innerHTML = '';

    workouts.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(workout => {
        const row = document.createElement('tr');
        const volume = workout.sets * workout.reps * workout.weight;
        row.innerHTML = `
            <td>${workout.date}</td>
            <td>${workout.exercise}</td>
            <td>${workout.weight} kg</td>
            <td>${workout.sets}</td>
            <td>${workout.reps}</td>
            <td>${volume}</td>
            <td>${workout.notes || ''}</td>
        `;
        tbody.appendChild(row);
    });
}

function updatePRTable() {
    const prTable = document.getElementById('prTable');
    prTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>EXERCISE</th>
                    <th>WEIGHT</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(prs)
            .sort((a, b) => new Date(b[1].date) - new Date(a[1].date))
            .map(([exercise, pr]) => `
                        <tr>
                            <td>${exercise}</td>
                            <td>${pr.weight} kg</td>
                            <td>${pr.date}</td>
                        </tr>
                    `).join('')}
            </tbody>
        </table>
    `;
}

// Workout Logging
function logWorkout() {
    const date = document.getElementById('workoutDate').value;
    const exercise = document.getElementById('exercise').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const sets = parseInt(document.getElementById('sets').value);
    const reps = parseInt(document.getElementById('reps').value);
    const notes = document.getElementById('notes').value;

    if (!date || !exercise || isNaN(weight) || isNaN(sets) || isNaN(reps)) {
        alert('Please fill in all required fields!');
        return;
    }

    const previousBest = prs[exercise];
    if (!previousBest || weight > previousBest.weight) {
        prs[exercise] = { weight, date };
        showPRNotification(exercise, weight, previousBest);
    }

    workouts.push({ date, exercise, weight, sets, reps, notes });

    updateTable();
    updateMetrics();
    updatePRTable();
    saveToLocalStorage();

    document.getElementById('weight').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('notes').value = '';
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('gymWorkouts', JSON.stringify(workouts));
    localStorage.setItem('gymPRs', JSON.stringify(prs));
}

function loadFromLocalStorage() {
    showLoading();

    setTimeout(() => {
        const savedWorkouts = localStorage.getItem('gymWorkouts');
        const savedPRs = localStorage.getItem('gymPRs');

        if (savedWorkouts) {
            workouts = JSON.parse(savedWorkouts);
        }
        if (savedPRs) {
            prs = JSON.parse(savedPRs);
        }

        updateTable();
        updateMetrics();
        updatePRTable();

        hideLoading();
    }, 1000);
}

// CSV Export/Import Functions
function exportToCSV() {
    showLoading('Preparing your workout data...');

    setTimeout(() => {
        let csv = 'Date,Exercise,Weight,Sets,Reps,Volume,Notes\n';

        workouts.forEach(workout => {
            const volume = workout.sets * workout.reps * workout.weight;
            const notes = workout.notes ? `"${workout.notes.replace(/"/g, '""')}"` : '';
            csv += `${workout.date},${workout.exercise},${workout.weight},${workout.sets},${workout.reps},${volume},${notes}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'workout_log.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        hideLoading();
    }, 1000);
}

function importFromCSV() {
    document.getElementById('csvFileInput').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        showLoading('Importing your workout data...');

        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const rows = text.split('\n');

            workouts = [];

            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(',');
                if (columns.length < 6) continue;

                const date = columns[0];
                const exercise = columns[1];
                const weight = parseFloat(columns[2]);
                const sets = parseInt(columns[3]);
                const reps = parseInt(columns[4]);
                const notes = columns[5] ? columns[5].replace(/"/g, '') : '';

                if (isNaN(weight) || isNaN(sets) || isNaN(reps)) continue;

                workouts.push({ date, exercise, weight, sets, reps, notes });

                const previousBest = prs[exercise];
                if (!previousBest || weight > previousBest.weight) {
                    prs[exercise] = { weight, date };
                }
            }

            updateTable();
            updateMetrics();
            updatePRTable();
            saveToLocalStorage();
            hideLoading();
        };

        reader.readAsText(file);
    }
}

// Set up event listener for CSV import
document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);

// Load data on page load
loadFromLocalStorage();
