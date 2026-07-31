# AI Collaboration & Architectural Notes

This document highlights the design patterns, architectural choices, and details of the collaboration between the Developer and the AI coding assistant to build this project.

# AI Usage Notes
## AI Tools Used

During the development of this project, I used **ChatGPT** and **Claude** as development assistants. I primarily used them to understand implementation approaches, generate initial code snippets, review my implementation, and improve documentation. All AI-generated suggestions were reviewed, tested, and modified before being included in the final project.

## 1. Which parts of the code were AI-generated vs. written by me

### AI-Assisted Contributions

During the development of this project, I used **ChatGPT** and **Claude** as AI-assisted development tools. AI primarily assisted with the following:

- Generated the initial Node.js and Express.js project setup.
- Suggested the overall application structure and project organization.
- Provided implementation guidance for building RESTful API endpoints.
- Suggested input validation techniques and error-handling approaches.
- Assisted with JSON file read/write operations using the `fs/promises` module.
- Suggested improvements for code quality, readability, and maintainability.
- Helped identify and resolve bugs, warnings, and integration issues encountered during development.
- Assisted in generating and refining automated integration test examples.
- Guided the complete step-by-step implementation and configuration of **Swagger** documentation.

### My Contributions

- Implemented the core business logic for the REST API endpoints, including **POST**, **GET**, and **DELETE** operations, ensuring they met the assignment requirements for adding, retrieving, filtering, calculating totals, and deleting expenses.
- Developed the filtering logic for retrieving expenses by category and the calculation logic for computing overall and category-wise expense totals.
- Implemented the server startup logic to ensure the application starts only when executed directly.
- Developed the global error-handling middleware for consistent server-side error responses.
- Configured the JSON file path used by the automated test suite.
- Configured and verified the project scripts (`npm install`, `npm start`, and `npm test`) after restructuring.
- Integrated and configured Swagger/OpenAPI documentation within the application and verified that the interactive documentation was accessible at `/api-docs`.
- Performed end-to-end testing using both Postman and the automated test suite.

---

## 2. What you validated, tested, or changed in the AI's output, and why

I have manually reviewed, tested, and refined the generated output before including it in the final project.

- Reviewed the AI-generated code to ensure it followed the required REST API specifications and project requirements.
- Verified that each endpoint (`POST`, `GET`, `DELETE`, and total calculation endpoints) returned the expected responses and appropriate HTTP status codes.
- Reviewed and refined the error-handling logic to ensure consistent HTTP status codes and meaningful error messages for invalid requests and server-side exceptions.
- Improved the category filtering logic to support case-insensitive searches.
- Reviewed and verified the expense total calculation logic for both overall expenses and category-specific expenses.
- Added and refined automated integration tests to verify all API endpoints and validation scenarios.
- Tested every endpoint manually using **Postman** to confirm correct request handling and response data.
- Verified that expense data was correctly written to and retrieved from `expenses.json` after create and delete operations.
- Fixed bugs, warnings, and integration issues that happen during development with the assistance of AI.
- Integrated and tested Swagger/OpenAPI documentation, ensuring that every documented endpoint was accessible and functional through the Swagger UI.

---

## 3. Any AI suggestion you decided not to use, and why

During the development process, AI suggested several additional features and implementation approaches.
The AI suggestions I decided not to use include:

- **Database Integration (MongoDB/MySQL):** AI suggested using a database for data persistence. I chose to use a local `expenses.json` file.

- **Frontend Application:** AI suggested building a frontend interface for interacting with the API. It is focused solely on developing a REST API, I kept the project backend-only.

- **Additional REST Endpoints:** AI recommended implementing features such as updating expenses, monthly summaries, and search functionality. Instead, I implemented **Swagger documentation** it provides interactive API documentation, allows endpoints to be tested directly from the browser, improves developer experience

- **Additional Third-Party Libraries:** AI suggested using extra packages for validation and file handling. I preferred using built-in Node.js modules wherever possible to keep the project lightweight and minimize unnecessary dependencies.

---