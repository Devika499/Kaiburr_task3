# Kaiburr Assessment 2025 – Task 3 (Web UI Forms)

**Candidate Name:** R Devika  
**Date:** 19 October 2025

---

## Overview
This task implements a **React 19 + TypeScript + Ant Design** web frontend for the Java backend created in **Task 1** of the Assessment.  
The UI allows users to **create, view, search, delete, and execute tasks** while displaying real-time command outputs stored in MongoDB.

---

## Objectives
- Build a **user-friendly web interface** for the Task Management System.  
- Interact with backend REST APIs (`GET`, `PUT`, `DELETE`, and `TaskExecution` endpoints).  
- Ensure good **usability** and **accessibility**.  
- Display execution output and status dynamically.

---

## Features Implemented
| Feature | Description |
|:--|:--|
| Create Task | Form to add a new task (name, owner, command). |
| View Tasks | Displays all tasks in a table with ID, name, owner, and command. |
| Search Tasks | Allows search by partial task name. |
| Delete Task | Delete a specific task via API. |
| Run Task | Executes the shell command through the backend and shows command output. |
| MongoDB Integration | Data fetched/stored through backend APIs connected to MongoDB. |

---

## Tech Stack
- **Frontend Framework:** React 19 + Vite / CRA (any modern React setup)  
- **Language:** TypeScript  
- **UI Library:** Ant Design  
- **HTTP Client:** Axios / Fetch API  
- **Backend API:** Java (Spring Boot) + MongoDB (from Task 1)  

---

## Installation & Setup

### Prerequisites
- Node.js >= 18  
- npm or yarn  
- Backend API running (Task 1 app on `http://localhost:8080`)

### Steps
1. Clone this repository.

2. Install dependencies:
```bash
npm install
```
3. Configure backend API URL in the environment file

4. npm run dev

---

## Interface

1. Create Task

<img width="1906" height="1027" alt="Screenshot 2025-10-19 105600" src="https://github.com/user-attachments/assets/53749a79-e725-445e-9049-3fc228dfd26d" />

2. View Tasks

<img width="1914" height="1020" alt="Screenshot 2025-10-19 105615" src="https://github.com/user-attachments/assets/e5559e13-c144-4c71-9b2e-3a5c5c508baf" />

3. Run /Execute Task

<img width="1916" height="1021" alt="Screenshot 2025-10-19 105658" src="https://github.com/user-attachments/assets/af54b20a-7b7c-4a37-8986-184500dc3a57" />

4. Delete Tasks

<img width="1911" height="1022" alt="Screenshot 2025-10-19 105903" src="https://github.com/user-attachments/assets/849d0e5a-8d9a-4572-a8a1-55310c04d11c" />

