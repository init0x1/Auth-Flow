# Auth-Flow

This project is a simple user authentication system that uses Express.js and MongoDB to store user data. The system allows users to sign up and log in, and it also includes session management and rate limiting to prevent brute-force attacks.

## Dependencies
This project uses several dependencies, including:

- `express`: A web framework for Node.js
- `mongoose`: A MongoDB ORM library
- `body-parser`: Middleware for parsing HTTP request bodies
- `cookie-parser`: Middleware for parsing HTTP cookies
- `express-session`: Middleware for managing sessions
- `express-rate-limit`: Middleware for rate limiting HTTP requests
- `morgan`: Middleware for logging HTTP requests

## Getting Started

To get started with this project, follow these steps:

1) Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/0xAbdoAli/Auth-Flow
```
2) Install the dependencies using npm:
```bash
npm install
```
3) Start the server:
```bash
npm run start
```
4) Open a web browser and navigate to `http://localhost:3000`


## Usage
The user authentication system includes several endpoints for signing up, logging in, and logging out. Here is an overview of each endpoint:

- `GET /`: Redirects to either the login page or the home page, depending on whether the user is logged in.
- `GET /login`: Renders the login page.
- `POST /login`: Logs in the user and redirects to the home page.
- `POST /logout`: Logs out the user and redirects to the login page.
- `GET /home`: Renders the home page.
- `GET /signup`: Renders the signup page.
- `POST /signup`: Signs up the user and redirects to the login page.
The system also includes session management to keep users logged in across requests. If a user is not logged in and attempts to access the home page or log out, they will be redirected to the login page.

## Security
To improve the security of the user authentication system, several measures have been implemented:

Session management using `express-session`.
HTTP cookies with the `httpOnly` and `secure` flags.
Rate limiting using `express-rate-limit`.