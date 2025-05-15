# Hustler 2.0 🚀

> A sleek, modern daily productivity tracker designed to help you crush your goals and stay accountable.

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

## ✨ Features

### 📊 Personal Stats Tracking

-   **Weight monitoring** - Track your daily weight progress
-   **Wake-up time logging** - Build consistent morning routines
-   **Self-assessment scoring** - Rate your daily performance from 1-10

### 🎯 Mission-Based Goal System

-   **4 Core Categories**:
    -   💪 **Fitness** - Cardio, weight training, and weight goals
    -   📚 **Reading** - Non-fiction, technical books, and online tutorials
    -   💰 **Finance** - Budget reviews, monitoring, and investment research
    -   🧘 **Lifestyle** - Intermittent fasting, time tracking, and reflection

### 🏆 Gamification Elements

-   **Point-based progress system** (0-12 points daily)
-   **Visual progress bars** with color-coded performance levels
-   **Achievement tracking** for completed missions
-   **Daily performance summaries**

### 🎨 Modern UI/UX

-   **Dark theme** with gradient backgrounds
-   **Glassmorphism effects** for a premium feel
-   **Smooth animations** and transitions
-   **Responsive design** for all devices
-   **Intuitive iconography** using Font Awesome

## 🚀 Getting Started

### Prerequisites

-   Any modern web browser (Chrome, Firefox, Safari, Edge)
-   Internet connection (for Font Awesome icons)

### Installation

1.  Clone the repository:

```bash
git clone https://github.com/nikdimentiy/simple_web.git
cd simple_web/Hustler\ 2.0

```

2.  Open the HTML file:

```bash
open index.html

```

Or simply drag and drop the HTML file into your browser.

## 💻 Usage

### Daily Workflow

1.  **Start Your Day**
    
    -   Enter your current weight
    -   Log your wake-up time
    -   Rate your initial self-assessment
2.  **Complete Missions**
    
    -   Click on mission categories to expand sub-tasks
    -   Check off completed activities
    -   Watch your progress bar grow!
3.  **Track Progress**
    
    -   Monitor your daily points (0-12)
    -   Review your performance summary
    -   Aim for different achievement levels:
        -   🔴 **Need Improvement** (0-4 points)
        -   🟡 **Good Progress** (5-8 points)
        -   🟢 **Excellent** (9-12 points)
4.  **Save Your Data**
    
    -   Click "COMMIT DAILY LOG" to export your progress
    -   Data is saved as JSON for future analysis

### Data Export Format

The app exports your daily data in the following JSON structure:

```json
{
  "timestamp": "YYYY-MM-DD",
  "trackerData": {
    "weight": "155",
    "wakeTime": "06:00",
    "assessment": "8"
  },
  "missions": [
    {
      "name": "Fitness",
      "subMissions": [
        {"name": "Cardio Session", "completed": true},
        {"name": "Weight Training", "completed": false},
        {"name": "Weight Goal", "completed": true}
      ]
    }
    // ... other missions
  ],
  "totalPoints": "7"
}

```

## 🛠️ Technical Details

### Technologies Used

-   **HTML5** - Semantic markup
-   **CSS3** - Custom properties, Grid, Flexbox, animations
-   **JavaScript** - ES6+, DOM manipulation, event handling
-   **Font Awesome** - Icon library
-   **Google Fonts** - Inter font family

### Key Features Implementation

-   **State Management** - Pure JavaScript object-based state
-   **Dynamic Rendering** - DOM manipulation for reactive UI
-   **Local Data** - Browser-based without backend requirements
-   **Responsive Grid** - CSS Grid with media queries

### Browser Compatibility

-   Chrome 90+
-   Firefox 88+
-   Safari 14+
-   Edge 90+

## 🎨 Customization

### Color Scheme

The app uses CSS custom properties for easy theming:

```css
:root {
  --color-rose-500: #f43f5e;
  --color-rose-400: #fb7185;
  --color-orange-400: #fb923c;
  --color-amber-500: #f59e0b;
  --color-emerald-500: #10b981;
  --color-gray-900: #111827;
  /* ... more colors */
}

```

### Adding New Missions

Modify the `missions` array in the JavaScript section:

```javascript
const missions = [
  {
    id: "custom",
    name: "Custom Category",
    icon: "fas fa-star",
    iconColor: "blue",
    completed: false,
    active: false,
    subMissions: [
      { id: "task1", name: "Custom Task", completed: false }
    ]
  }
];

```

## 📱 Responsive Design

The app is fully responsive with breakpoints at:

-   Mobile: 0-767px
-   Tablet & Desktop: 768px+

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the MIT License

## 🙏 Acknowledgments

-   Font Awesome for the icon library
-   Google Fonts for the Inter typeface
-   The productivity community for inspiration

## 📧 Contact

Nikdimentiy - [GitHub Profile](https://github.com/nikdimentiy)

Project Link: [https://github.com/nikdimentiy/simple_web/tree/main/Hustler%202.0](https://github.com/nikdimentiy/simple_web/tree/main/Hustler%202.0)

----------

<div align="center"> <p>Made with ❤️ for hustlers who want to level up their daily game</p> <p>⭐ Star this repo if you found it helpful!</p> </div>
