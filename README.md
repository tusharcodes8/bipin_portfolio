# Portfolio Website

A full-stack personal portfolio with a public site (Home, Projects, Contact) and a password-protected admin panel for managing projects, skills, and contact messages.

**Live site:** https://subaskathayat-seven.vercel.app
**API:** https://subas-kathayat.onrender.com

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Formik + Yup
- **Backend:** Node.js, Express, JWT authentication
- **Database:** MongoDB Atlas (Mongoose)
- **Hosting:** Vercel (frontend), Render (backend)

## Project Structure

```
client/   — React frontend
server/   — Express API + MongoDB models
```

## Running Locally

**Backend**
```
cd server
npm install
npm run dev
```

**Frontend**
```
cd client
npm install
npm run dev
```

Both need a `.env` file (not committed)

## Features

- Public pages: Home, Projects, Contact
- Contact form saves messages to the database
- Admin panel: add/edit/delete projects and skills, view and manage contact messages
- JWT-protected admin routes

## Admin Access

Admin login is available at `/admin/login`. 
Contact here for credentials: contact@subaskathayat.com.np 