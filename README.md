# 📱 Task Management App (React Native)

A modern and intuitive **Task Management App** built using **React Native (Expo)** and **Firebase**, designed for gig workers to efficiently manage their daily tasks.

---

## 🚀 Features

### 🔐 User Authentication

- Firebase Email/Password Authentication
- Login & Registration
- Persistent login session
- Error handling for invalid credentials

---

### 📝 Task Management

- Create, edit, delete tasks
- Mark tasks as complete/incomplete
- Each task includes:
  - Title
  - Description
  - Due Date
  - Priority (Low, Medium, High)

---

### 🔍 Task Filtering & Search

- Filter tasks by:
  - Priority
  - Status (Completed / Incomplete)
- Search tasks by title
- Tasks grouped by:
  - Today
  - Tomorrow
  - This Week

---

### 📅 Calendar View

- Monthly calendar view
- Highlights dates with tasks
- Click on a date to view tasks for that day

---

### ⚡ Real-Time Updates

- Uses Firebase Firestore `onSnapshot`
- Instant UI updates without refresh

---

### 🎨 UI/UX

- Clean and modern design (Material-inspired)
- Responsive across Android & iOS
- Smooth onboarding screens with swipe gestures
- Custom components and animations

---

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Firebase
  - Authentication
  - Firestore Database
- **State Management:** React Hooks
- **Navigation:** Expo Router
- **Gestures:** React Native Gesture Handler

---

## 📂 Project Structure

app/
(tabs)/
AddTask.tsx
CurrentTasks.tsx
Calendar.tsx
\_layout.tsx

auth/
sign-in/
sign-up/

configs/
firebaseConfig.ts

services/
taskService.ts

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```
