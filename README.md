# 🏋️‍♂️ IronTrack: Dynamic Exercise Explorer

A high-performance web application designed for athletes and trainers to discover, filter, and organize workouts using real-time data from the Exercises API.

---

## 📖 Project Overview
**IronTrack** is a functional exercise discovery tool that fetches data from a library of over 3,000 exercises. It provides users with detailed instructions, equipment requirements, and difficulty ratings through a seamless, industrial-themed interface.

### 🎯 Project Goals Achieved
- **Asynchronous Integration:** Successfully implemented real-time data fetching using the Fetch API with secure header authentication.
- **State Management:** Managed application state (sorting and filtered data) without page reloads.
- **DOM Manipulation:** Developed a dynamic UI that updates instantly based on user input.

---

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3 (Custom Flexbox & CSS Grid)
- **Scripting:** JavaScript ES6+ (Async/Await, Fetch API)
- **Data Source:** [API-Ninjas Exercises API](https://api-ninjas.com/api/exercises)
- **Persistence:** Browser LocalStorage for favorites.

---

## 🚀 Core Features (Milestone 4 Final)

### 🔍 Real-Time Global Search
Implemented a dynamic search bar that utilizes the `.filter()` HOF to match exercise names instantly as the user types, providing a "live results" experience.

### 🛠 Multi-Criteria Smart Filtering
Users can narrow down workouts using three distinct parameters:
- **Muscle Group:** (e.g., Chest, Back, Quads, Biceps)
- **Difficulty Level:** (Beginner, Intermediate, Expert)
- **Exercise Type:** (e.g., Strength, Cardio, Stretching)

### ↕️ Advanced Sorting
A toggle-based sorting system using the `.sort()` and `.localeCompare()` methods allows users to organize results alphabetically (A-Z and Z-A).

### ⭐ Favorites Library
Integrated **LocalStorage** persistence. Users can click the "★" icon on any exercise card to save it. These selections remain saved even after the browser is refreshed.

---

## 🧪 Implementation Logic
To comply with the academic requirements, this project strictly avoids traditional `for` and `while` loops, utilizing only **Higher-Order Functions**:

1. **`.map()`**: Used to transform API objects into styled HTML card components.
2. **`.filter()`**: Powering both the category selectors and the global search bar.
3. **`.sort()`**: Handles the alphabetical reordering of the exercise state.
4. **`.forEach()`**: Used for bulk event listener attachment and managing UI panel visibility.

---

## 📂 Final Project Structure
```text
├── index.html         # Semantic HTML5 structure and UI containers
├── style.css          # Industrial-gym dark theme & responsive breakpoints
├── script.js          # Modular JS: State management, API logic, and HOFs
└── README.md          # Final project documentation
