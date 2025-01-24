# LastPass Password Management Application

LastPass is a secure and easy-to-use password management application. It helps users securely store, organize, and access their passwords and sensitive information in an encrypted vault. This application is built using the MERN stack (MongoDB, Express, React, and Node.js).

## Features

- Secure storage of passwords and sensitive information
- Encrypted vault accessible only by authorized users
- User-friendly interface for organizing and managing passwords

---

## Prerequisites

Make sure you have the following installed on your system:

1. [Node.js](https://nodejs.org/) (LTS version recommended)
2. [MongoDB](https://www.mongodb.com/try/download/community) (running locally or with a cloud-based service like MongoDB Atlas)
3. [Git](https://git-scm.com/) (for cloning the repository)

---

## Installation

Follow these steps to install and run the application on your computer:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Navigate to the project directory and install the dependencies for both the frontend and backend.

#### Backend Setup

```bash
cd backend
npm install
```

#### Frontend Setup

Open a new terminal, navigate to the frontend folder, and install the dependencies:

```bash
cd frontend
npm install
```

---

## Configuration

### 3. Backend Environment Variables

Create a `.env` file in the `backend` directory and configure the following environment variables:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

- Replace `<your-mongodb-connection-string>` with your MongoDB connection string.
- Replace `<your-jwt-secret>` with a secure key for token generation.

---

## Running the Application

### 4. Start the Backend Server

In the `backend` directory, run:

```bash
npm start
```

This will start the backend server on `http://localhost:5000`.

### 5. Start the Frontend Server

In the `frontend` directory, run:

```bash
npm start
```

This will start the frontend development server on `http://localhost:3000`.

---

## Access the Application

Open your browser and go to:

```
http://localhost:3000
```

---

## Additional Notes

- Ensure MongoDB is running locally or that you have provided a valid MongoDB Atlas connection string in the `.env` file.
- For production deployment, additional steps such as environment variable management and hosting setup may be required.

---

## Contributing

Feel free to fork the repository and submit pull requests for enhancements or bug fixes.

---


## Contact

For any queries or feedback, reach out to **Krish Makadiya | krishmakadiya2005@gmail.com**.

