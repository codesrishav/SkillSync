# AI-Based Job Skill Gap Analyzer

A full-stack web application built with the MERN stack and Google's Gemini API.

## Features
- User authentication (JWT)
- Upload resume (PDF) or paste skills manually
- AI-powered skill extraction and gap analysis using Gemini
- Learning roadmap generation and project suggestions
- View past analysis history

## Prerequisites
- Node.js
- MongoDB (running locally or MongoDB Atlas)
- Gemini API Key

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `server/.env` file with your credentials (add your actual Gemini API Key).
4. Start the server:
   ```bash
   node server.js
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open `http://localhost:5173` in your browser.
2. Sign up or log in.
3. On the Dashboard, select a job role and either upload your resume PDF or paste your skills.
4. Click "Analyze Skill Gap" to view your results.
