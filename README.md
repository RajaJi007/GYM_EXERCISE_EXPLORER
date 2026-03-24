# GYM_EXERCISE_EXPLORER
A dynamic exercise discovery web app built with JS and Fetch API, featuring real-time data filtering, searching, and sorting of 3,000+ workouts.


# 🏋️‍♂️ IronTrack: Dynamic Exercise Explorer

A professional web application designed to help fitness enthusiasts discover, filter, and organize workouts using real-time data from the Exercises API.

---
 📖 Project Overview
 
**IronTrack** is a high-performance exercise discovery tool built for athletes and trainers. The application fetches data from a library of over 3,000 exercises to provide users with detailed instructions, equipment needs, and difficulty ratings. The goal is to provide a seamless interface for users to build their workout routines based on specific physiological targets.

🎯 Project Purpose

The primary objective of this project is to demonstrate advanced JavaScript techniques, specifically:
- **Asynchronous Programming:** Handling real-time data fetching from a third-party REST API.
- **Data Manipulation:** Using Higher-Order Functions (HOFs) to manage complex data sets.
- **Responsive Design:** Creating a mobile-first UI for gym-floor accessibility.

---

🛠 Tech Stack
- **Frontend:** HTML5, CSS3 (Custom Flexbox/Grid Layouts)
- **Scripting:** JavaScript ES6+ (Fetch API, Promises)
- **Data Source:** [API-Ninjas Exercises API](https://api-ninjas.com/api/exercises)
- **Version Control:** Git & GitHub

---

🚀 Key Features (Planned)
- **Global Search:** Instant search functionality to find exercises by name (e.g., "Deadlift", "Bench Press").
- **Smart Filtering:** Multi-select filters to narrow down results by:
  - **Muscle Group:** (e.g., Chest, Back, Quads, Biceps)
  - **Difficulty Level:** (Beginner, Intermediate, Expert)
  - **Equipment:** (Dumbbell, Barbell, Bodyweight)
- **Dynamic Sorting:** Results can be toggled alphabetically (A-Z) or categorized by exercise type.
- **Detail View:** Interactive cards that expand to show step-by-step performance instructions.

---

🧪 Implementation Logic
To meet the academic requirements of this project, I will be implementing the following JavaScript Array Methods:
1. **`.filter()`**: To handle muscle-group and difficulty selections.
2. **`.sort()`**: To organize the exercise list alphabetically.
3. **`.forEach()` / `.map()`**: To dynamically render the exercise cards into the DOM.

---

📂 Project Structure
```text
├── index.html         # Main UI Structure
├── style.css          # Custom styling and layout
├── script.js         # API integration and HOF logic
└── README.md          # Project documentation
