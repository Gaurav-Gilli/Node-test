Prerequisites

Before you begin:

- Ensure Git, Node.js, npm, and PostgreSQL are installed on your machine.
- Optionally, you can use pgAdmin 4 for graphical database management.

Getting Started

1. Clone the Repository:
   - git clone https://github.com/your-username/your-repo.git
   - cd your-repo

2. Install Node.js Dependencies:
   - npm install

3. Set Up PostgreSQL Database:

   - Create a database named "bitcoinData" using pgAdmin 4.
   - Run the following SQL script in the database Query Tool to create the required table:

     ```
     CREATE TABLE crypto_data (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255),
       last NUMERIC,
       buy NUMERIC,
       sell NUMERIC,
       volume NUMERIC,
       base_unit VARCHAR(10)
     );
     ```

4. Configure Database Connection:
   - In your Node.js server code (server.js), set the database connection details (host, username, password, database name).

5. Start the Node.js Server:
   - npm start
   - Your server will run at http://localhost:3000 (or another specified port).

6. Access the Frontend:
   - Open a web browser and go to http://localhost:3000.
