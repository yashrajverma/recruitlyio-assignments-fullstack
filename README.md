# Recruitlyio Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Steps to Set Up Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Authenticate9/recruitlyio
```

### 2. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### React App

```bash
cd ../recruitlyio
npm install
```

### 3. Configure Environment Variables

- **Server**: Update `server/.env` with your Azure OpenAI API key and endpoint.
- **React App**: Update `recruitlyio/.env` with the backend server URL.

### 4. Start the Server

```bash
cd server
npm start
```

### 5. Start the React App

```bash
cd ../recruitlyio
npm run dev
```

### 6. Access the Application

- Open your browser and navigate to `http://localhost:5173`.

## Additional Notes

- Ensure the backend server is running before accessing the React app.
- For production deployment, configure environment variables securely.

## Demo

- `https://drive.google.com/file/d/1Ykis-WJMtTog6c8BOzsVoOg47z-2K4Bn/view?usp=sharing`
