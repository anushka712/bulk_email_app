# Bulk Email App

A full-stack **Bulk Email Application** built to send emails efficiently using a queue system, with real-time logs and user authentication.

---

## Features

- **Frontend:** React with Mantine UI components and Tailwind CSS for styling.  
- **Data Fetching & Caching:** TanStack Query.  
- **Backend:** Node.js with Express.js framework.  
- **Database:** MongoDB to store users, emails, and logs.  
- **Queue System:** RabbitMQ for bulk email processing without blocking other threads.  
- **Real-Time Logs:** Socket.IO to notify users about email status instantly.  
- **Authentication:** JWT-based user authentication.

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)  
- npm or yarn  

---

## Setup & Run Instructions

### 1. Clone the Repository

```bash
git clone <https://github.com/anushka712/bulk_email_app.git>
cd <bulk_email_app>
```

---

### 2. Frontend Setup

```bash
cd client
npm install
```

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Update `.env` values as needed.  

3. Start the frontend:

```bash
npm run dev
```


---

### 3. Backend Setup

Open a new terminal:

```bash
cd server
npm install
```

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Update `.env` values with your MongoDB, RabbitMQ, and JWT secrets.  
3. Make sure MongoDB and RabbitMQ are running.  
4. Start the backend:

```bash
npm run dev
```

---

## Notes

- RabbitMQ handles bulk email jobs asynchronously, so sending emails does not block other operations.  
- Socket.IO provides real-time feedback on email processing status.  
- JWT ensures secure user authentication.  
- Both frontend and backend environment variables are provided in `.env.example`.  

---
