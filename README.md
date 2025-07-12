# Cashly – Simple Finance API

Cashly is a clean and modern RESTful API for managing personal finances. Built with TypeScript, Express, Prisma, SQLite, and JWT-based authentication, it offers a simple way to track income and expenses.

## Features

- **User Authentication:**  
  Register and log in users using JWT tokens to protect routes and manage user sessions.

- **Transaction Management:**  
  - Create, view, and manage financial transactions.
  - Each transaction is categorized as either `INCOME` or `EXPENSE`.

- **Automatic Balance Calculation:**  
  Automatically calculates the balance by subtracting expenses from income.

- **Advanced Transaction Filtering:**  
  Filter transactions by:
  - **Date:**  
    Use the `date` query parameter (e.g., `2025-07-14`) to get transactions for a specific day (using local timezone format).
  - **Type:**  
    Use the `type` query parameter to filter transactions by `INCOME` or `EXPENSE`.

- **Protected Routes:**  
  All transaction and user-related routes are secured and require a valid token.

## Technology Stack

- **Language:** TypeScript  
- **Backend Framework:** Node.js & Express  
- **ORM:** Prisma  
- **Database:** SQLite (ideal for local development)  
- **Authentication:** JSON Web Tokens (JWT)

## API Endpoints

### Authentication and User

- **Register:** `POST /api/auth/register`  
  Registers a new user.

- **Login:** `POST /api/auth/login`  
  Authenticates a user and returns a JWT token.

- **Get User Info:** `GET /api/user/me`  
  Returns the details of the authenticated user.

### Transactions

- **Get Transactions:** `GET /api/data/transactions`  
  Retrieves all transactions for the authenticated user.  
  **Optional Filtering:**  
  - `?date=YYYY-MM-DD` filters transactions by a specific date.
  - `?type=INCOME` or `?type=EXPENSE` filters transactions by type.

- **Create Transaction:** `POST /api/data/createTransaction`  
  Creates a new transaction using the data provided in the request body.

- **Get Balance:** `GET /api/data/balance`  
  Returns the calculated balance (income minus expenses) for the user.

## Usage Example

1. **User Authentication:**
    - Send a POST request to `/api/auth/login` with the user credentials to receive a token.
    - Use the token in your request headers for protected routes as follows:  
      `Authorization: Bearer <your_token>`

2. **Filtering Transactions:**
    - To fetch transactions for July 14, 2025, of type `INCOME`, use:  
      `GET /api/data/transactions?date=2025-07-14&type=INCOME`

## Future Improvements

- Custom categories for transactions.
- Detailed monthly reports and analytics.
- Exporting data in CSV or PDF formats.
- Notifications or alerts for significant transactions or expense thresholds.

---

> Open source and made with ❤️.  
> Contributions and suggestions are welcome!