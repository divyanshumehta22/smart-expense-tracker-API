## Quick Start

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Run the tests:

```bash
npm test
```

Swagger Documentation:

```
http://localhost:3000/api-docs
```

# Smart Expense Tracker API

The Smart Expense Tracker API is a RESTful backend application developed using **Node.js** and **Express.js** . This application allows users to manage their personal expenses by providing endpoints to add, retrieve, filter, calculate totals, and delete expense records. The project stores all data locally in a JSON file. It has a unique expense identification using UUIDs.

The API follows REST principles and includes proper request validation, error handling, automated integration testing, and interactive Swagger/OpenAPI documentation for easy API exploration and testing.

# Features

The Smart Expense Tracker API provides the following functionality:

- Add a new expense with a unique ID, title, amount, category, and date.
- Retrieve all recorded expenses.
- Filter expenses by category.
- Calculate the total amount of all expenses.
- Calculate the total amount spent within a specific category.
- Delete an expense using its unique ID.
- Store expense data in a local JSON file.
- Validate user input before storing data.
- Interactive Swagger/OpenAPI documentation.
- Automated integration tests covering all API endpoints.

---

# Technologies Used

This project was built using the following technologies:

- Node.js
- Express.js
- UUID
- Node.js File System (fs/promises)
- JSON File Storage
- Swagger UI Express and Docs
- Node.js Built-in Test Runner
- Postman (for API testing)

---

# Running the Application

Start the API server by running:

```bash
npm start
```

The server starts on:

```
http://localhost:3000
```

When the server starts successfully, you should see a message similar to:
```
Smart Expense Tracker API listening on port 3000
```

---

# API Documentation

This project includes interactive API documentation using **Swagger UI**.

Once the server is running, open the following URL in your browser:

```
http://localhost:3000/api-docs
```

Swagger provides:

- Interactive API documentation
- Request and response examples
- Ability to test endpoints directly from the browser
- Complete endpoint descriptions

---

# API Endpoints (Tested in Postman)

### Add Expense

**POST**

```
http://localhost:3000/api/expenses
```

Example Request:

```json
{
    "title": "Lunch",
    "amount": 250,
    "category": "Food",
    "date": "2026-07-31"
}
```

---

### View All Expenses

**GET**

```
http://localhost:3000/api/expenses
```

Returns all stored expenses.

---

### Filter Expenses by Category

**GET**

```
http://localhost:3000/api/expenses?category=Food
```

Returns only expenses belonging to the specified category.

---

### Calculate Overall Total

**GET**

```
http://localhost:3000/api/expenses/total
```

Returns the total amount spent across all expenses.

---

### Calculate Total by Category

**GET**

```
http://localhost:3000/api/expenses/total?category=Food
```

Returns the total amount spent for the specified category.

---

### Delete an Expense

**DELETE**

```
http://localhost:3000/api/expenses/:id
```

Deletes an expense using its unique ID.

---


# Data Storage

Expense data is stored locally in the following file:

```
expenses.json
```

Whenever a new expense is added or an existing expense is deleted, the JSON file is automatically updated. No external database is required.

---

# Input Validation

The API validates all incoming requests before storing data.

Validation includes:

- Expense title must not be empty.
- Amount must be a positive number.
- Category must not be empty.
- Date must be a valid date.
- Every expense receives a unique UUID automatically.

Invalid requests return appropriate HTTP status codes and error messages.

---

# Testing

The project includes automated integration tests to verify all required functionality.

The test suite covers:

- Adding new expenses
- Viewing all expenses
- Filtering expenses by category
- Calculating overall totals
- Calculating category-wise totals
- Deleting expenses
- Validation failures
- Error handling

Run the tests using:

```bash
npm test
```

Expected output:

```bash
> expense-tracker-api@1.0.0 test
> node --test tests/server.test.js

Test server started on port 50126
▶ Smart Expense Tracker API Integration Tests
  ✔ POST /api/expenses - Add first expense (Food) (136.3292ms)
  ✔ POST /api/expenses - Add second expense (Entertainment) (15.4954ms)
  ✔ POST /api/expenses - Add third expense (Food again) (11.191ms)
  ✔ POST /api/expenses - Validation failure (missing title) (11.0673ms)
  ✔ POST /api/expenses - Validation failure (negative amount) (17.6453ms)
  ✔ GET /api/expenses - View all expenses (10.7757ms)
  ✔ GET /api/expenses - Filter expenses by category (Food) (16.0857ms)
  ✔ GET /api/expenses - Filter expenses by category (Entertainment, case-insensitive) (15.3351ms)  ✔ GET /api/expenses/total - Overall total (12.0699ms)
  ✔ GET /api/expenses/total - Total by category (Food) (8.7829ms)
  ✔ GET /api-docs - Swagger docs routing availability (26.0939ms)
  ✔ DELETE /api/expenses/:id - Delete an expense (30.9063ms)
  ✔ DELETE /api/expenses/:id - Delete non-existent expense (10.1517ms)
✔ Smart Expense Tracker API Integration Tests (338.0149ms)
ℹ tests 14
ℹ suites 0
ℹ pass 14
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 707.3083
```

All tests should pass successfully.

---

# Manual API Testing

The API was manually tested using **Postman** and **Swagger UI**.

The following operations were verified:

- Successfully added multiple expenses.
- Retrieved all expenses.
- Filtered expenses by category.
- Calculated overall expense totals.
- Calculated totals by category.
- Deleted existing expenses.
- Verified validation for invalid requests.
- Confirmed JSON file updates correctly after every operation.

---

# HTTP Status Codes

The API uses standard HTTP status codes.

| Status Code | Description |
|-------------|-------------|
| 200 | Request successful |
| 201 | Resource created successfully. |
| 400 | Invalid request data |
| 404 | Resourc not found. |

---

# Author

**Divyanshu Mehta**

---

