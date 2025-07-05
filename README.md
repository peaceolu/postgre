# Express + PostgreSQL User API

// Description: A simple Express.js application to manage users in a PostgreSQL database.
// This application provides endpoints to create, read, update, and delete users.

## 🚀 How to Run This Project

### Prerequisites

- Node.js
- PostgreSQL installed and running

### 🏗️ Setup Steps

1. **Create database**:
   ```sql
   CREATE DATABASE peacedb;
   ```
2. ### Create users table:

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100),
age INTEGER
); 3. ### Install dependencies:
node index.js

4. ### TEST ENDPOINTS USING NODEMAN

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/users`     | Get all users      |
| GET    | `/users/:id` | Get one user by ID |
| POST   | `/users`     | Add a new user     |
| PUT    | `/users/:id` | Update a user      |
| DELETE | `/users/:id` | Delete a user      |
