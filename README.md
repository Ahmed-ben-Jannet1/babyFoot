# Babyfoot Manager

Babyfoot Manager is a Real-time Interactive Application (RIA) that allows users to manage babyfoot and chat in real-time.

## Features

- Create, update, and delete babyfoot games.
- Real-time updates and chat functionality using WebSockets.

## Prerequisites

- Node.js and npm
- PostgreSQL

## Installation

1. **Clone the repository**

   ```sh
   git clone <repository-url>
   cd <repository-directory>

   ```

2. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

3. **Set up the PostgreSQL database**

# Open your terminal and create a new PostgreSQL database

```bash
createdb babyfoot
```

# Access the PostgreSQL shell

```bash
psql -U postgres
```

# Connect to the babyfoot database :

```bash
\c babyfoot
```

# Create the party table :

```bash
CREATE TABLE party (
  id SERIAL PRIMARY KEY,
  name_prem VARCHAR(50),
  name_sec VARCHAR(50),
  status BOOLEAN DEFAULT FALSE
);
```

5. **Running the Application**

# Start the server

npm start

# Open your browser

Navigate to http://localhost:3005 to use the application

## Directory Structure

public: Contains the frontend files
server: Contains the backend files
.env: Environment variables for database configuration
package.json: Node.js dependencies and scripts
