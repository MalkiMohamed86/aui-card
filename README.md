# Database Search Application

A web application for searching student records across multiple database tables.

## Features

- Search by ID number across three database tables
- Display results in three separate cards
- Toggle visibility of each card
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Material-UI for UI components
- Axios for API requests

### Backend
- Node.js with Express
- MySQL database

## Setup Instructions

### Database Setup
1. Make sure you have MySQL installed and running
2. Create a database named `database` (or update the .env file with your database name)
3. Import the database schema from `database.sql`
4. Update the `.env` file in the server directory with your MySQL credentials

### Backend Setup
1. Navigate to the server directory:
   ```
   cd database-search-app/server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm run dev
   ```
   The server will run on port 5000 by default.

### Frontend Setup
1. Navigate to the root directory:
   ```
   cd database-search-app
   ```
2. Install dependencies:
   ```
   npm install
   npm install recharts @mui/x-data-grid

   ```
3. Start the React application:
   ```
   npm start
   ```
   The application will run on port 3000 by default.

## Usage

1. Enter a student ID number in the search field
2. Click the Search button
3. View the results in the three cards
4. Use the toggle switches to show/hide specific cards

## API Endpoints

- `GET /api/search/:idNum` - Search for a student by ID number across all tables 