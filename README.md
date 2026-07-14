# Portfolio — Local Setup

## 1. Server
```
cd server
npm install
npm run seed   # populates Projects + Skills with your real content
npm run dev    # starts on http://localhost:5000
```

## 2. Client
```
cd client
npm install
npm run dev    # starts on http://localhost:5173
```

## Admin Login
- URL: http://localhost:5173/admin/login
- Username: `admin`
- Password: `admin123`

**Change this password before deploying** — generate a new bcrypt hash and put it in `server/.env` as `ADMIN_PASSWORD_HASH`:
```
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

## Notes
- `server/.env` and `client/.env` are gitignored — never commit them.
- `mongodb.md` at the repo root has your raw Atlas credentials; delete it once you've confirmed `server/.env` works, or keep this whole folder out of git.
- Contact form messages, Projects, and Skills are all stored in MongoDB Atlas (`portfolioDB` database).
