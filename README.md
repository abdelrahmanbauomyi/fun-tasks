# FunTasks Platform

An event scheduling platform built with NestJS, TypeORM, and PostgreSQL that allows users to create and manage scheduled actions or "events."

## 🚀 Features

- **Event Scheduling**: Schedule actions/events with flexible timing
- **Event Tracking**: View all scheduled events for specific users

## 🛠 Tech Stack

- **Backend Framework**: NestJS
- **Database ORM**: TypeORM
- **Database**: PostgreSQL
- **Runtime**: Node.js

## 📋 Prerequisites

Before running FunTasks, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) database server
- npm or yarn package manager

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/abdelrahmanbauomyi/fun-tasks.git>
cd fun-tasks
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Database Setup
1. Create a PostgreSQL database with your preferred name
2. Make sure your PostgreSQL server is running
3. Note down your database credentials

### 4. Environment Configuration
Create a `.env` file in the root directory of the project with your database and application configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name

# Application Configuration
PORT=3000
```

**Important**: Replace the placeholder values with your actual database credentials and preferred settings.

### 5. Run the Application
```bash
# Development mode
npm run start:dev
# or
yarn start:dev

# Production mode
npm run start:prod
# or
yarn start:prod
```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 👥 User Management

##### Get All Users
```http
GET /users
```
**Description**: Retrieves all users in the system.

```

##### Add a New User
```http
POST /users
```
**Description**: Creates a new user in the system.

**Request Body**:
```json
{
  "name": "Ahmed",
}
```



#### 📅 Event Management

##### Schedule a New Event
```http
POST /events/schedule
```
**Description**: Creates a new scheduled event/action.

**Request Body**:
```json
{
  "event_name": "Team Meeting",
  "execute_at": "2025-08-13T02:45:00Z",
  "user_id": "a8fdb239-d8fb-4d42-abd8-4bd1c63c144d"
}

```

**Response**:
```json
{
    "event_id": "a9737240-ed61-4f52-84bc-165e4868b9f6",
    "event_name": "Team Meeting",
    "execute_at": "2025-08-13T02:45:00Z",
    "status": "pending",
    "executed_at": null,
    "user": {
        "user_id": "a8fdb239-d8fb-4d42-abd8-4bd1c63c144d",
        "name": "Ahmed"
    }
}
```

##### Get User's Scheduled Events
```http
GET /users/{user_id}/events
```
**Description**: Retrieves all scheduled events for a specific user.

**Path Parameters**:
- `user_id` (UUID): The ID of the user

**Example**:
```http
GET /users/a8fdb239-d8fb-4d42-abd8-4bd1c63c144d/events
```

**Response**:
```json
[
 {
        "event_id": "1171fa8f-2081-4103-88ca-112470c550d4",
        "event_name": "Team Meeting",
        "execute_at": "2025-08-13T02:01:00.000Z",
        "status": "executed",
        "executed_at": "2025-08-13T02:11:00.014Z",
        "user": {
            "user_id": "a8fdb239-d8fb-4d42-abd8-4bd1c63c144d",
            "name": "Ahmed"
        }
    },
    {
        "event_id": "261492f6-8fbc-468c-b4fe-c61200b15529",
        "event_name": "Team Meeting",
        "execute_at": "2025-08-13T02:14:00.000Z",
        "status": "executed",
        "executed_at": "2025-08-13T02:14:00.028Z",
        "user": {
            "user_id": "a8fdb239-d8fb-4d42-abd8-4bd1c63c144d",
            "name": "Ahmed"
        }
    },
]
```

### Running Tests
```bash
# Unit tests
npm run test
# or
yarn test

```