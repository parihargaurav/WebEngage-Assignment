```markdown
# Express.js CSV Generator with API Integration

This project is an Express.js application that fetches data from three different APIs, combines specific fields into a CSV file, and allows users to query individual records. It also supports generating and downloading the CSV file on the local server.

## Features
- Fetches data from:
  - Users API: `https://jsonplaceholder.typicode.com/users`
  - Posts API: `https://jsonplaceholder.typicode.com/posts`
  - Comments API: `https://jsonplaceholder.typicode.com/comments`
- Supports querying specific records by ID.
- Generates a formatted CSV file containing the combined data.
- Includes proper error handling for API requests and file operations.


## Installation

1. Clone the repository:
   
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the `api/` directory in the root folder:
   ```bash
   mkdir api
   ```

---

## Running the Server

1. Start the Express.js server:
   ```bash
   node index.js
   ```

2. The server will start on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### **1. Query a Specific Record**
Fetch data for a specific `id` from the APIs.

- **Endpoint**: 
  ```
  GET /generate-csv?id=<id>
  ```
- **Example Request**:
  ```
  http://localhost:3000/generate-csv?id=1
  ```
- **Response** (if `id` exists):
  ```json
  {
    "id": 1,
    "name": "Leanne Graham",
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos"
  }
  ```
- **Response** (if `id` is invalid):
  ```json
  {
    "message": "ID <id> not found"
  }
  ```

---

### **2. Generate CSV**
Fetch data from all APIs, combine them, and write to a CSV file.

- **Endpoint**:
  ```
  GET /generate-csv
  ```
- **Response**:
  ```json
  {
    "message": "CSV file generated successfully",
    "filePath": "/path/to/project/csv/data.csv"
  }
  ```
- **CSV File Structure**:
  Each row in the CSV contains:
  - `name` from Users API
  - `title` from Posts API
  - `body` from Comments API
  - Includes a blank line after each row for readability.

---

## Testing with Postman

1. **Install Postman**: Download it from [here](https://www.postman.com/downloads/).
2. **Create Requests**:
   - Query a Specific ID:
     - Set method to `GET`.
     - Use the URL: `http://localhost:3000/generate-csv?id=<id>`.
   - Generate CSV File:
     - Set method to `GET`.
     - Use the URL: `http://localhost:3000/generate-csv`.
3. **Send the Request**:
   - Check the response body for results or the CSV file path.
4. **Verify CSV File**:
   - Navigate to the `csv/` directory in the project folder.
   - Open the generated `data.csv` file to confirm the content.

---

## Error Handling
- If an invalid `id` is provided:
  - The API returns a `404` error with a descriptive message.
- If the APIs fail to respond or any unexpected error occurs:
  - The API returns a `500` error with the error details.

---

## Folder Structure
```
project/
│
├── index.js               # Main server file
├── routes/
│   └── generateCsv.js      # Route for CSV generation and ID querying
├── csv/                    # Directory to store generated CSV files
├── package.json            # Project dependencies and scripts
└── README.md               # Documentation (this file)
```

---

