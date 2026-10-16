Zero-One — Paper Trading Platform
Zero-One is a full-stack paper-trading platform for exploring stock-market workflows, viewing portfolio data, and recording simulated orders. It includes a public React website, a trading dashboard, and an Express API backed by MongoDB.
Disclaimer: Zero-One is an educational simulation, not a brokerage. It does not execute real-money trades. Watchlist prices are sample data; a live market-data feed is not integrated.

Features
- Responsive public website with Home, About, Products, Pricing, Support, sign-up, and sign-in pages.
- Trading dashboard with watchlist search, portfolio summary, holdings, positions, order history, and charts.
- JWT-based authentication and protected backend endpoints.
- Per-user portfolio and order query scoping.
- Salted PBKDF2 password hashing through passport-local-mongoose.
- Backend input validation, authentication rate limiting, request-size limits, security headers, and sanitized error responses.
- Persistent dark/light theme preference.
- Automated backend tests using Node.js's native test runner.
Tech Stack
- Frontend: React, React Router, Bootstrap
- Dashboard: React, Material UI, Chart.js
- Backend: Node.js, Express
- Database: MongoDB Atlas, Mongoose
- Authentication: JWT, Passport-Local-Mongoose, PBKDF2
- Tests: node:test, node:assert/strict
Project Structure
Zero-One/
├── backend/       # Express API, authentication, Mongoose models, tests
├── frontend/      # Public website and authentication pages
├── dashboard/     # Trading dashboard
├── package.json   # Root scripts
└── README.md
Getting Started
Prerequisites
- Node.js and npm
- A MongoDB Atlas cluster or a local MongoDB instance
1. Clone the repository
git clone https://github.com/Ankitt-02/zero-one.git
cd zero-one
2. Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd dashboard && npm install && cd ..
3. Configure environment variables
Create backend/.env using the provided example if it exists:
cp backend/.env.example backend/.env
Set the required values in backend/.env:
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
Keep real credentials in .env; never commit them to Git.
4. Run the services
Run each command in a separate terminal from the project root:
npm run start:backend
npm run start:frontend
npm run start:dashboard
Service	Local URL
Public frontend	http://localhost:3000
Trading dashboard	http://localhost:3001
Backend API	http://localhost:3002
