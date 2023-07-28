# Applicant Management System
The Applicant Management System is a web application that allows users to manage and track job applicants. It provides features for creating, updating, and deleting applicant profiles, as well as viewing a list of all applicants.


## Technologies Used
The following technologies were used to develop the Applicant Management System:

- Node.js
- Express.js
- TypeORM
- PostgreSQL
- Jest (for unit testing)


## Setup

- clone the repo

```
git clone repo-url
```

- create a .env file from .env.example

## Installation
To install the necessary dependencies, run the following command in the root directory of the application:

```
npm install
```

### Database Setup
Before running the application, you need to set up the database. Follow these steps:

#### Make sure you have PostgreSQL installed and running on your system.

#### Create a new database for the application. You can do this using the createdb command:
```
create database applicant_management_system_db;
```

Update the database configuration in the ormconfig.json file located in the root directory of the application. Replace the placeholder values for the host, port, username, password, and database name with your PostgreSQL database configuration.
json

```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your_username",
  "password": "your_password",
  "database": "applicant_management_system",
  "entities": ["dist/entities/**/*.js"], // Update path to your entity files
  "synchronize": true,
  "logging": true
}
```


### Running the Application
To run the application, use the following command:

```
npm start
```
The application will be available at http://localhost:3000.

API Endpoints
The Applicant Management System provides the following API endpoints:

```
GET /api/applicants: Get a list of all applicants.
GET /api/applicants/:id: Get an applicant by ID.
POST /api/applicants: Create a new applicant.
PUT /api/applicants/:id: Update an applicant by ID.
DELETE /api/applicants/:id: Delete an applicant by ID.
```

## Unit Tests
The application includes unit tests to ensure the correctness of its components and functionality. To run the unit tests, use the following command:

```
npx jest
```

