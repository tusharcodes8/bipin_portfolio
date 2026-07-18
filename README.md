# Bipin Pandey — Portfolio

A full-stack personal portfolio for **Bipin Pandey**, featuring a public site (Home, Projects, Contact) and a password-protected admin panel for managing projects, skills, and contact messages. Designed with a clean **Microsoft Fluent UI** aesthetic.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Formik + Yup
- **Backend:** Node.js, Express, JWT authentication
- **Database:** MongoDB Atlas (Mongoose)

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

Both need a `.env` file (not committed to git).

### Backend `.env`
```
PORT=5000
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random string>
CORS_ORIGIN=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt hash of your admin password>
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Seeding the Database

To populate the database with starter projects and skills:
```
cd server
npm run seed
```

## Features

- Public pages: Home, Projects, Contact
- Contact form saves messages to the database
- Admin panel: add/edit/delete projects and skills, view and manage contact messages
- JWT-protected admin routes

## Admin Access

The admin login is available at `/admin/login`. Credentials are configured via the
`ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` environment variables on the backend.

To generate a new password hash:
```
node -e "require('bcryptjs').hash('yourPassword', 10).then(console.log)"
```

## Deployment

- **Frontend:** deploy the `client/` build (`npm run build` → `dist/`) to a static host (Vercel, Netlify).
- **Backend:** deploy the `server/` app to a Node host (Render, Railway). Set all backend `.env` variables in the host's dashboard, and update `CORS_ORIGIN` to the deployed frontend URL.
- Update the frontend `VITE_API_BASE_URL` to point to the deployed API.

## License

© 2024 Bipin Pandey. All rights reserved.
