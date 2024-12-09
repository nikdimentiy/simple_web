# 💓 Cardio Fitness Metrics 🏋️‍♀️

## 📝 Overview
The **Cardio Fitness Metrics** project is a lightweight, visually engaging web application that helps users analyze and summarize their cardio fitness data. The app allows users to upload JSON files with workout data and dynamically generates detailed summaries, charts, and insights.

## ✨ Features
- **📊 Data Visualization:** Bar charts for calories burned over time.
- **📋 Workout Summary:** Displays total calories burned, total distance covered, and total workout time.
- **🏆 Max Metrics:** Identifies the workout session with maximum calories burned, longest distance, and maximum duration.
- **🍰 Activity Breakdown:** Percentage distribution of activity types.
- **📑 Interactive Table:** View detailed data for each workout session.

## 🚀 How to Use
1. **📤 Upload JSON File:** Click on the file upload input and select a `.json` file with your workout data. Ensure the JSON file is an array of objects with the following fields:
   - `date` (string): The date of the workout.
   - `calories` (number): Calories burned during the workout.
   - `distance` (number): Distance covered in miles.
   - `time` (number): Time spent in minutes.
   - `type` (string): Type of workout activity.
   Example JSON format:
   ```json
   [
       {
           "date": "2024-01-01",
           "calories": 350,
           "distance": 2.5,
           "time": 30,
           "type": "Running"
       },
       {
           "date": "2024-01-02",
           "calories": 200,
           "distance": 1.2,
           "time": 20,
           "type": "Cycling"
       }
   ]
   ```

2.  **👀 View Analysis:** The app dynamically displays:
    -   A bar chart of calories burned over time.
    -   A summary of total metrics and maximum values.
    -   Activity type percentages.
    -   A detailed table of workout entries.

## 🛠️ Technology Stack
-   **HTML5**: Markup for structure.
-   **CSS3**: Styling for a polished look.
-   **JavaScript**: Logic for data processing and interactivity.
-   **Chart.js**: For generating dynamic and responsive charts.

## 📂 Project Structure
```
Cardio Fitness Metrics/
│
├── index.html   # Main HTML file
├── styles.css   # Inline CSS within HTML
├── app.js       # JavaScript logic (embedded in HTML)
└── README.md    # Project documentation
```

## 💾 Installation
1.  Clone the repository:
    
    ```bash
    git clone https://github.com/nikdimentiy/simple_web.git
    cd simple_web/Cardio Fitness Metrics
    ```
    
2.  Open `Cardio Fitness Metrics.html` in your browser.

## 🔮 Future Improvements
-   Support for more data formats (e.g., CSV).
-   Enhanced charting options (e.g., line charts, pie charts).
-   Save and export summarized data.

## 📄 License
This project is licensed under the MIT License.

## 👨‍💻 Author
D.Nikey 🧑‍💻 (https://github.com/nikdimentiy)  
Feel free to contribute or provide feedback to improve the app! 🚀🌟
