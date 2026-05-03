🎬 Rwandan Movie Broadcasting Platform

A full-stack web application for streaming and promoting Rwandan movies. Built with Node.js (Express) for the backend and Vite-powered frontend, this platform aims to make local Rwandan films accessible to a global audience.

📌 Features

    🎥 Stream Rwandan movies online
    🔍 Search and filter movies
    👤 User authentication (login/register)
    ❤️ Favorite/watchlist system
    📺 Modern responsive UI (Vite frontend)
    🛠 Admin dashboard for managing movies

Project-Structure

project-root/

    backend/ 

        ├── controllers/
        ├── models/
        ├── routes/
        ├── middleware/
        ├── config/
        ├── uploads/
        ├── server.js
        └── package.json

    frontend/  

        ├── src/
        ├── public/
        ├── index.html
        └── package.json
    .env
    package.json
    README.md
    pnpm_lock.yaml
    

🛠 Tech Stack

Backend

  Node.js
  Express.js
  MongoDB
  JWT Authentication
Frontend

  Vite
  (React / Vue / Vanilla JS — specify yours)
  Axios / Fetch API
  
🚀 Getting Started

1. Clone the Repository
    git clone https://github.com/Silence9630/la-la-movies.git
    cd la-la-movies

⚙️ Backend Setup

    cd backend
    pnpm install
    Create a .env file inside backend/:
      PORT=5000
      DB_URI=your_database_url
      JWT_SECRET=your_secret_key
    Run backend server:
      pnpm run dev

💻 Frontend Setup

    cd frontend
    pnpm install
    Run development server:
      pnpm run dev

🌍 Vision

To promote and digitize the Rwandan film industry by providing a reliable and accessible online movie streaming platform.

👤 Authors

    1.Silence9630
    2.Chris-mucyo
    3.munyengabe-beckham
