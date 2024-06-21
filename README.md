# Distributed Task Scheduler

This project includes both the frontend and backend components of the Distributed Task Scheduler, which allows users to schedule and manage tasks based on cron syntax. The backend handles task scheduling and execution, while the frontend provides a user interface for task management.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 21.x or higher)
- npm (version 10.x or higher)
- MongoDB (version 6.x or higher)

## Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
git clone https://github.com/MikeLiamCode/deep-origin.git
cd server
npm install
cd client
npm install
```


## Configuration

### Backend Configuration
Update dbConfig object keys with your MongoDB URI and other environment-specific settings:

```bash
url: 'mongodb://localhost:27017'
dbName: 'taskScheduler'
collectionName: 'tasks'
```

### Running the Backend
To run the backend, navigate to the backend directory and execute:
```bash
npm run dev
```

This will start the server on http://localhost:3000.

### Backend API Reference
The backend supports the following API endpoints:

- POST /tasks: Register a new task
- GET /tasks: Fetch all tasks
- GET /tasks/:id: Fetch a task by ID

### Frontend Configuration
No additional configuration is needed to run the frontend.

### Running the Frontend
To run the frontend, navigate to the frontend directory and execute:
```bash
npm start
```
This will start the React application on http://localhost:3001.

## Using the Application

The application allows users to:

- Create New Tasks: Specify whether a task is one-time or recurring and set the schedule.
- View Scheduled Tasks: Tasks that are yet to be executed are listed.
- View Executed Tasks: A log of executed tasks is maintained and can be reviewed.

## Contact
If you want to contact me, you can reach me at devlivelymike@gmail.com.

## License
This project uses the following license: MIT.