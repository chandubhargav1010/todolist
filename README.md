# To-Do List Web Application

A modern, feature-rich to-do list application built with vanilla HTML, CSS, and JavaScript. This application provides a clean, responsive interface for managing your daily tasks with advanced features like priority levels, due dates, filtering, and data persistence.

![To-Do List App](https://img.shields.io/badge/Status-Complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🚀 Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with descriptive text
- ✏️ **Edit Tasks**: Modify existing tasks inline or through a modal
- 🗑️ **Delete Tasks**: Remove tasks with confirmation dialog
- ✔️ **Toggle Completion**: Mark tasks as complete/incomplete with visual indicators
- 💾 **Data Persistence**: All tasks are saved to localStorage and persist after page refresh

### Advanced Features
- 🔍 **Search**: Real-time search functionality to find tasks quickly
- 🏷️ **Priority Levels**: Assign high, medium, or low priority with color coding
- 📅 **Due Dates**: Set due dates with overdue indicators
- 🔄 **Filtering**: Filter tasks by status (All, Pending, Completed)
- 📊 **Statistics**: View task counts and completion percentage
- 📤 **Export**: Export tasks to JSON format
- 🧹 **Bulk Actions**: Clear all completed tasks at once
- 🎨 **Animations**: Smooth transitions and micro-interactions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Experience
- ⌨️ **Keyboard Shortcuts**: Ctrl/Cmd + Enter to add tasks, Escape to close modals
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- ♿ **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- 🎯 **Form Validation**: Input validation with helpful error messages
- 🌙 **Print Support**: Print-friendly styles for task lists

## 🏗️ File Structure

```
todo-app/
├── index.html          # Main application file with semantic HTML structure
├── styles.css          # Complete styling with responsive design and animations
├── script.js           # All JavaScript functionality and app logic
└── README.md           # Project documentation (this file)
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Vanilla JavaScript with classes, modules, and modern syntax
- **Font Awesome**: Icons for enhanced visual appeal
- **LocalStorage API**: Client-side data persistence

## 🚀 How to Run

### Option 1: Direct File Opening
1. Download or clone all files to a local directory
2. Open `index.html` in any modern web browser
3. Start adding and managing your tasks!

### Option 2: Local Server (Recommended)
1. Navigate to the project directory in your terminal
2. Start a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open your browser and navigate to `http://localhost:8000`

### Option 3: Live Server Extension (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📱 Browser Compatibility

This application works on all modern browsers:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎯 Usage Guide

### Adding Tasks
1. Type your task description in the input field
2. Select a priority level (Low, Medium, High)
3. Optionally set a due date
4. Click "Add Task" or press Ctrl/Cmd + Enter

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon and confirm deletion

### Filtering and Search
- Use the search box to find specific tasks
- Click filter buttons to view All, Pending, or Completed tasks
- View real-time statistics at the bottom

### Advanced Actions
- **Export**: Download your tasks as a JSON file
- **Clear Completed**: Remove all completed tasks at once
- **Keyboard Navigation**: Use Tab to navigate, Enter to activate buttons

## 🔧 Customization

### Changing Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #667eea;    /* Main theme color */
    --success-color: #10b981;    /* Success/completion color */
    --danger-color: #ef4444;     /* Delete/error color */
    --warning-color: #f59e0b;    /* Warning/medium priority */
}
```

### Adding New Priority Levels
1. Update the priority options in `index.html`
2. Add corresponding CSS classes in `styles.css`
3. Update the priority handling in `script.js`

### Modifying Storage
The app uses localStorage by default. To use a different storage method:
1. Modify the `loadTasks()` and `saveTasks()` methods in `script.js`
2. Implement your preferred storage solution (sessionStorage, IndexedDB, etc.)

## 🔮 Future Enhancement Ideas

- [ ] **Drag & Drop**: Reorder tasks by dragging
- [ ] **Categories/Tags**: Organize tasks with custom categories
- [ ] **Recurring Tasks**: Set up repeating tasks
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Cloud Sync**: Synchronize tasks across devices
- [ ] **Collaboration**: Share task lists with others
- [ ] **Time Tracking**: Track time spent on tasks
- [ ] **Subtasks**: Break down complex tasks into smaller ones
- [ ] **Calendar Integration**: View tasks in calendar format
- [ ] **Notifications**: Browser notifications for due dates
- [ ] **Import/Export**: Support for CSV, PDF formats
- [ ] **Offline Support**: Progressive Web App (PWA) capabilities


---

## 📦 How to Use

1. **Clone the repo**
   ```bash
   git clone https://github.com/chandubhargav1010/todolist.git

2. **Open the app**

   Just open the `index.html` file in any modern browser.


**Happy task managing! 📝✨**

