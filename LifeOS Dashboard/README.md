# 🚀 LifeOS Dashboard

<div align="center"> <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version"> <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"> </div> <br> <div align="center"> <h3>✨ Your Integrated Life Management System ✨</h3> <p>A beautiful, modern dashboard to track your productivity, morning routines, and reading habits</p> </div>

----------

## 🌟 Features

### 🎯 **Productivity Hub**

-   **Weekly Mission Tracking**: Monitor 6 core life areas (Fitness, Finance, Learning, Reading, Productivity, Lifestyle)
-   **Visual Progress Ring**: Real-time progress visualization with stunning animations
-   **Daily Stats Input**: Track weight, wake time, and focus time
-   **Smart Week Navigation**: Sunday-based week numbering system
-   **Data Persistence**: Save and load your weekly progress

### 🌅 **Sunrise Routine**

-   **Morning Foundation Tasks**: 6 essential morning habits
-   **Interactive Task Cards**: Beautiful hover effects and smooth animations
-   **Progress Tracking**: Visual progress bar with completion percentage
-   **Celebration Effects**: Confetti animation when all tasks are completed
-   **Reset Functionality**: Easy routine reset for new days

### 📚 **Reading Monitor**

-   **Session Logging**: Track daily reading hours with precise decimal input
-   **Reading History**: Comprehensive log of all reading sessions
-   **Progress Statistics**: Total hours and session count tracking
-   **Data Export/Import**: Save and load reading data for backup

## 🎨 Design Highlights

-   **Dark Theme**: Sleek, modern dark UI that's easy on the eyes
-   **Gradient Effects**: Beautiful color gradients and glowing card effects
-   **Responsive Design**: Fully responsive across all device sizes
-   **Custom Typography**: Professional font combinations (Inter + Orbitron)
-   **Smooth Animations**: Fluid transitions and micro-interactions
-   **Visual Feedback**: Progress rings, bars, and celebration effects

## 🚀 Quick Start

1.  **Clone the repository**
    
    ```bash
    git clone https://github.com/nikdimentiy/simple_web.git
    cd simple_web/LifeOS\ Dashboard
    
    ```
    
2.  **Open the dashboard**
    
    ```bash
    # Simply open in your browser
    open LifeOS\ Dashboard.html
    # Or drag and drop the file into your browser
    
    ```
    
3.  **Start tracking your life!**
    
    -   Switch between tabs using the navigation
    -   Click on day cards to expand and track missions
    -   Log your reading sessions
    -   Set up your morning routine

## 💾 Data Management

### Save Your Progress

-   **Productivity Hub**: Saves weekly data with week number and date
-   **Sunrise Routine**: Exports task completion status
-   **Reading Monitor**: Backs up total hours and session history

### File Formats

All data is saved in JSON format for easy backup and sharing:

```json
{
  "dataType": "productivityHubData",
  "weekNumber": 25,
  "data": { ... }
}

```

## 🛠️ Technical Stack

-   **HTML5**: Semantic markup structure
-   **CSS3**: Custom properties, animations, and responsive design
-   **Vanilla JavaScript**: Modular ES6+ code with no dependencies
-   **Tailwind CSS**: Utility-first CSS framework via CDN
-   **Font Awesome**: Icon library for beautiful UI elements
-   **Google Fonts**: Professional typography (Inter + Orbitron)

## 📱 Browser Compatibility

-   ✅ Chrome 90+
-   ✅ Firefox 88+
-   ✅ Safari 14+
-   ✅ Edge 90+

## 🎯 Use Cases

Perfect for:

-   **Life Optimization Enthusiasts**: Track multiple life areas simultaneously
-   **Productivity Seekers**: Visualize and improve daily habits
-   **Morning Routine Builders**: Establish consistent morning foundations
-   **Reading Enthusiasts**: Monitor and celebrate reading progress
-   **Data-Driven Individuals**: Make decisions based on tracked metrics

## 🔧 Customization

### Adding New Missions

Modify the `missions` array in the Productivity Hub section:

```javascript
const missions = [
  { id: "custom", name: "Custom Mission", icon: "fas fa-star", colorClass: "mission-custom" },
  // ... existing missions
];

```

### Changing Color Themes

Update CSS custom properties in the `:root` selector:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... other properties */
}

```

## 📊 Data Privacy

-   **100% Local**: All data stays in your browser
-   **No Analytics**: Zero tracking or data collection
-   **Offline Ready**: Works completely offline after initial load
-   **Export Control**: You own and control all your data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

-   **Design Inspiration**: Modern productivity apps and life management tools
-   **Color Palette**: Carefully selected for optimal readability and aesthetics
-   **Animation Effects**: Smooth, purposeful animations that enhance user experience

----------

<div align="center"> <p>Made with ❤️ for productivity enthusiasts</p> <p><strong>Start optimizing your life today!</strong></p> </div>
