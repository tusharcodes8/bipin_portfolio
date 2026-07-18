# Deployment Guide — Bipin Pandey Portfolio

This guide walks through deploying the portfolio:

- **Backend** (Express API) → **Render**
- **Frontend** (React + Vite) → **Vercel**
- **Database** → **MongoDB Atlas** (already set up)

Deploy the **backend first**, because the frontend needs the backend's live URL.

---

## Prerequisites

- The project is pushed to a GitHub repository.
- A [MongoDB Atlas](https://cloud.mongodb.com) cluster (already created).
- Free accounts on [Render](https://render.com) and [Vercel](https://vercel.com).

### Prepare MongoDB Atlas for the cloud

Render and Vercel connect from changing IP addresses, so allow access from anywhere:

1. In Atlas → **Network Access** → **Add IP Address**.
2. Choose **Allow Access from Anywhere** (`0.0.0.0/0`) → **Confirm**.

Keep your connection string handy — you set it as `MONGODB_URI` on Render below.
Use the standard (non-SRV) form that already works locally, or the `mongodb+srv://`
form (Render's DNS resolves SRV records fine).

---

## Part 1 — Deploy the Backend to Render

### 1. Create the Web Service

1. Go to the [Render Dashboard](https://dashboard.render.com) → **New +** → **Web Service**.
2. Connect your GitHub account and select the portfolio repository.
3. Configure:

   | Setting | Value |
   |---|---|
   | **Name** | `bipin-portfolio-api` (or any name) |
   | **Region** | Closest to your users |
   | **Branch** | `main` |
   | **Root Directory** | `server` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | `Free` |

### 2. Add Environment Variables

Under **Environment** → **Add Environment Variable**, add each of these
(from your local `server/.env`):

| Key | Value |
|---|---|
| `MONGODB_URI` | Your Atlas connection string (with `/bipinPortfolioDB` db name) |
| `JWT_SECRET` | Your long random secret |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | The bcrypt hash of the admin password |
| `CORS_ORIGIN` | Leave blank for now — set after Vercel deploy (Part 3) |

> Do **not** set `PORT` — Render provides it automatically and the app reads `process.env.PORT`.

### 3. Deploy

1. Click **Create Web Service**. Render installs, builds, and starts the app.
2. When live, note the URL, e.g. `https://bipin-portfolio-api.onrender.com`.
3. Test it: open `https://<your-render-url>/api/health` → should return `{"status":"ok"}`.

### 4. Seed the production database (one time)

The seed script needs the same `MONGODB_URI`. Easiest option — run it locally
pointed at the production DB (your local `.env` already points there):

```
cd server
npm run seed
```

Or use Render's **Shell** tab (paid feature) to run `npm run seed` on the server.

> **Free tier note:** Render free services spin down after ~15 min of inactivity.
> The first request after idle takes ~30–50 s to wake up. This is normal.

---

## Part 2 — Deploy the Frontend to Vercel

### 1. Import the project

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) → **Add New** → **Project**.
2. Import the same GitHub repository.
3. Configure:

   | Setting | Value |
   |---|---|
   | **Framework Preset** | `Vite` |
   | **Root Directory** | `client` |
   | **Build Command** | `npm run build` (default) |
   | **Output Directory** | `dist` (default) |
   | **Install Command** | `npm install` (default) |

### 2. Add Environment Variable

Under **Environment Variables**, add:

| Key | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://<your-render-url>/api` |

Example: `https://bipin-portfolio-api.onrender.com/api`

> The `/api` suffix is required — all backend routes are mounted under `/api`.

### 3. Deploy

1. Click **Deploy**. Vercel builds and hosts the site.
2. Note the URL, e.g. `https://bipin-portfolio.vercel.app`.

---

## Part 3 — Connect Frontend and Backend (CORS)

The backend only accepts requests from the origin in `CORS_ORIGIN`. Now that you
have the Vercel URL, set it on Render:

1. Render Dashboard → your service → **Environment**.
2. Set `CORS_ORIGIN` = your Vercel URL **without a trailing slash**, e.g.
   `https://bipin-portfolio.vercel.app`.
3. Save. Render redeploys automatically.

---

## Part 4 — Verify Everything Works

1. Open the Vercel site.
2. Home page loads projects and skills (confirms API + DB + CORS all work).
   - If empty, the first request may be waking Render's free service — wait and refresh.
3. Submit the **Contact** form → success toast (confirms writes to the DB).
4. Go to `/admin/login`, sign in with your admin username/password.
5. In the dashboard, add/edit a project and check the contact message appears.

---

## Redeploying After Changes

Both platforms auto-deploy on every push to `main`:

```
git add .
git commit -m "your change"
git push
```

- **Vercel** rebuilds the frontend automatically.
- **Render** rebuilds the backend automatically.

Environment variable changes must be made in each platform's dashboard (they are
**not** read from your local `.env`, which is gitignored).

---

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Frontend loads but no data | `VITE_API_BASE_URL` wrong or missing `/api`; or Render service still waking up |
| CORS error in browser console | `CORS_ORIGIN` on Render doesn't exactly match the Vercel URL (check https + no trailing slash) |
| `MongooseServerSelectionError` | Atlas Network Access not set to `0.0.0.0/0`, or wrong `MONGODB_URI` |
| Admin login fails | `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` not set correctly on Render |
| API 404 on all routes | Root Directory on Render not set to `server` |
| First request very slow | Render free tier cold start (~30–50 s) — expected |

---

## Environment Variables Reference

**Render (backend):**
```
MONGODB_URI=<atlas connection string with /bipinPortfolioDB>
JWT_SECRET=<long random string>
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt hash>
CORS_ORIGIN=https://<your-vercel-app>.vercel.app
```

**Vercel (frontend):**
```
VITE_API_BASE_URL=https://<your-render-app>.onrender.com/api
```
