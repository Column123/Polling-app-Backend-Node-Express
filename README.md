# Polling App Backend

This is the backend service for the **Polling App**, built using **Node.js** and **Express.js**. It handles user authentication, poll creation, voting, and other related operations.

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** 
- **Mongoose** 
- **dotenv** for environment configuration

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Column123/Polling-app-Backend-Node-Express.git
cd Polling-App-Backend-NodeJs-ExpressJs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

Make sure to create a .env file in the root directory with the necessary environment variables. Example:

```ini
ACCESS_TOKEN_SECRET=youraccesstoken
REFRESH_TOKEN_SECRET=yourrefreshtoken
BASE_URL=http://localhost:4000/
HOST=smtp.gmail.com
SERVICE=gmail
EMAIL_PORT=587
SECURE=true
USER=userEmail
PASS=gmailAPPkey
DATABASE_URI=your_mongo_connection_string
```


### 4. Run the server

```bash
npm start
```

The server should now be running on http://localhost:4000.

## 📁 Project Structure

```
.
├── server.js          # Main entry point
├── package.json       # Project metadata and scripts
├── .env               # Environment variables (not tracked by Git)
├── .gitignore         # Ignored files and folders
└── LICENSE            # License file
```

## 📜 Available Scripts

```bash
npm start      # Start the server
npm run start:dev    # Start the server with nodemon
```

## ✅ Features

- User authentication
- Create polls
- Delete polls
- Vote on polls
- View poll results
- Secure endpoints

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Port to run the server |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT auth |

## 🧾 License

This project is licensed under the MIT License.

## 📫 Contact

For any issues or contributions, feel free to open an issue or pull request.
