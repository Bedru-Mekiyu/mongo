# Bookstore REST API

A lightweight, performant Node.js and Express REST API for managing a bookstore database stored in MongoDB. The API supports full CRUD operations (Create, Read, Update, Delete) on book records along with server-side pagination.

## Features

- **Book Management**: Full CRUD capabilities for book documents.
- **Pagination**: Efficient server-side pagination for reading collections.
- **Environment Configuration**: Configurable MongoDB connection strings and server port via environment variables.
- **Automated Testing & CI**: Automated testing suite powered by Node.js native test runner and GitHub Actions CI workflow.

---

## Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v5)
- **Database**: MongoDB (Node.js Native Driver v7)
- **Dev Tools**: Nodemon
- **Testing**: Node.js Test Runner (`node --test`)

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow
├── test/
│   ├── app.test.js            # App export and syntax test suite
│   └── db.test.js             # Database module unit tests
├── .env.example               # Template for environment variables
├── .gitignore                 # Git ignore rules
├── app.js                     # Express application & route endpoints
├── db.js                      # MongoDB connection & client module
├── package.json               # Dependencies and npm scripts
└── README.md                  # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) instance (local or MongoDB Atlas connection string)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bookstore-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and adjust the connection details if needed:
   ```bash
   cp .env.example .env
   ```

   `.env` file example:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookstore
   PORT=3000
   ```

---

## Running the Application

### Development Mode (with hot reloading)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start listening at `http://localhost:3000` (or the `PORT` specified in `.env`).

---

## API Endpoints

### 1. Fetch Books (Paginated)
- **GET** `/books`
- **Query Parameters**:
  - `p` *(optional, default: 0)*: Page index number (3 books per page).
- **Response**: `200 OK` — JSON array of book objects.

### 2. Fetch Single Book by ID
- **GET** `/books/:id`
- **Response**:
  - `200 OK` — JSON object of the book document.
  - `500 Internal Server Error` — Invalid ID or error fetching document.

### 3. Add a New Book
- **POST** `/books`
- **Request Body**:
  ```json
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "pages": 310,
    "rating": 9,
    "genres": ["fantasy"]
  }
  ```
- **Response**: `201 Created` — Result object with `insertedId`.

### 4. Update a Book
- **PATCH** `/books/:id`
- **Request Body**: JSON object containing fields to update.
- **Response**: `200 OK` — MongoDB update result.

### 5. Delete a Book
- **DELETE** `/books/:id`
- **Response**: `200 OK` — MongoDB deletion result.

---

## Testing & Continuous Integration

### Running Tests Locally

Execute the native Node.js test runner:

```bash
npm test
```

### CI/CD

This repository utilizes GitHub Actions (`.github/workflows/ci.yml`) to automatically validate pull requests and commits on `main`/`master` branches across Node.js versions (18.x, 20.x, 22.x).

---

## License

ISC License
