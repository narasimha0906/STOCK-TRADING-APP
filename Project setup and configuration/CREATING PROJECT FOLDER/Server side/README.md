# SB Stocks

SB Stocks is a user-friendly web app for stock market enthusiasts who want to
practice and improve their trading skills without any financial risk. It
provides paper trading with simulated real-time US stock prices, historical
price movement, and a portfolio dashboard so users can buy and sell with
virtual funds, track performance, and test strategies risk-free.

Stack: **React (Vite)** frontend + **Express** backend + **MongoDB** (Mongoose).

---

## Project Structure

```
sb-stocks/
├── client/     # React frontend (Vite)
└── server/     # Express backend + MongoDB models/routes
```

---

## Step 1: Set Up the Frontend (React App)

```bash
cd client
npm install
npm run dev
```

The app will run on: **http://localhost:5173**

## Step 2: Set Up the Backend (Express Server)

Open a new terminal tab/window (or split terminal):

```bash
cd server
npm install
```

## Step 3: Configure Environment Variables

Inside the `server` folder, create a file named `.env` (a template is
provided as `.env.example`) with:

```
MONGO_URI=mongodb://localhost:27017/sbstocks
JWT_SECRET=replace_with_a_long_random_secret
PORT=8000
```

Replace `sbstocks` with whatever database name you'd like, and generate a
random string for `JWT_SECRET`.

## Step 4: Start the Backend Server

```bash
nodemon index.js
```

(If `nodemon` isn't installed globally, run `npx nodemon index.js`, or use
`npm run dev` since it's already wired up in `package.json`.)

The server will start on: **http://localhost:8000**

> Make sure MongoDB is running locally (`mongod`) or point `MONGO_URI` at a
> MongoDB Atlas cluster before starting the server.

---

## Features

- Secure registration & login (JWT auth, bcrypt password hashing)
- Simulated real-time US stock listings (12 popular tickers, prices drift
  every request to mimic live market movement)
- Buy / sell shares with virtual funds ($100,000 starting balance)
- Portfolio dashboard: cash balance, holdings, market value, P&L per position
- Transaction history

> The bundled price feed is simulated so the app works fully offline. To
> wire up real market data, get a free API key from
> [Finnhub](https://finnhub.io) or [Alpha Vantage](https://www.alphavantage.co)
> and swap the functions in `server/utils/stockData.js`.

---

## Pushing This Project to GitHub

From inside the `sb-stocks` folder:

```bash
git init
git add .
git commit -m "Initial commit: SB Stocks paper trading app"
git branch -M main
git remote add origin https://github.com/<your-username>/sb-stocks.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username, and create an empty
repository named `sb-stocks` on GitHub first (no README/license, to avoid
merge conflicts). Once pushed, your repo link will be:

```
https://github.com/<your-username>/sb-stocks
```

---

## Running in VS Code

1. Open the `sb-stocks` folder in VS Code (`File > Open Folder`).
2. Open two integrated terminals (`Terminal > Split Terminal`).
3. Terminal 1:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. Terminal 2:
   ```bash
   cd server
   npm install
   # create .env as described in Step 3
   npm run dev
   ```
5. Visit **http://localhost:5173** in your browser, register an account,
   and start trading.
