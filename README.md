# GreenLoop — JWT Authentication Module

This is a complete, working implementation of the **Authentication** feature
(Register / Login / Logout / Forgot Password) from the GreenLoop SRS,
including role-based access control for the five user roles: `household`,
`collector`, `recycling_company`, `business`, and `admin`.

## How the auth flow works

- **Access token**: short-lived JWT (15 min default), returned in the JSON
  response body and kept in memory on the client (not localStorage, to
  reduce XSS token-theft risk). Sent as `Authorization: Bearer <token>`.
- **Refresh token**: long-lived JWT (7 days default), stored in an
  `httpOnly`, `sameSite` cookie. Used to silently reissue access tokens via
  `POST /api/auth/refresh`, including on page reload.
- **Password hashing**: `bcryptjs` with 12 salt rounds.
- **Password reset**: a random token is emailed to the user; only its SHA-256
  hash is stored in the DB with a 10-minute expiry (industry-standard
  pattern, same idea used by Express/Mongoose auth boilerplates).
- **Brute-force protection**: rate limiting on auth routes, plus per-account
  lockout after 5 failed login attempts (15-minute lock).
- **Role-based authorization**: `protect` middleware verifies the JWT,
  `authorize('admin', ...)` middleware restricts a route to specific roles —
  reusable by every other feature module in the SRS (marketplace, rewards,
  admin analytics, etc.).

## Backend setup

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT secrets, SMTP creds
npm run dev            # starts on http://localhost:5000
```

### Connecting to MongoDB Atlas

1. In Atlas, go to your cluster -> **Connect** -> **Drivers**, and copy the
   connection string (starts with `mongodb+srv://`).
2. In **Network Access**, add your current IP address (or `0.0.0.0/0`
   temporarily while developing) — Atlas blocks all connections by default.
3. In **Database Access**, confirm you have a database user with a
   username/password (not just Atlas login credentials).
4. Paste the connection string into `MONGO_URI` in `.env`, replacing
   `<username>` and `<password>` with your database user's credentials, and
   adding `/greenloop` before the `?` so it connects to that database name:
   ```
   MONGO_URI=mongodb+srv://myuser:myPass123@cluster0.xxxxx.mongodb.net/greenloop?retryWrites=true&w=majority
   ```
5. If your password has special characters (`@`, `#`, `%`, etc.), URL-encode
   them or Mongo will fail to parse the connection string.

`config/db.js` fails fast (10s timeout) and prints targeted troubleshooting
tips if the connection fails, so check your terminal output for specifics —
common causes are an unwhitelisted IP, a wrong password, or DNS/VPN issues
blocking the `mongodb+srv://` SRV lookup.

If SMTP is not configured, password reset emails are logged to the console
instead of sent, so you can still test the flow in development.

### Endpoints

| Method | Route                              | Access        | Description                    |
|--------|-------------------------------------|---------------|---------------------------------|
| POST   | `/api/auth/register`                | Public        | Create account                  |
| POST   | `/api/auth/login`                   | Public        | Log in                          |
| POST   | `/api/auth/logout`                  | Private       | Clear refresh token cookie      |
| POST   | `/api/auth/refresh`                 | Public*       | Get a new access token          |
| GET    | `/api/auth/me`                      | Private       | Current user profile            |
| POST   | `/api/auth/forgot-password`         | Public        | Email a reset link              |
| PATCH  | `/api/auth/reset-password/:token`   | Public        | Set new password from link      |
| PATCH  | `/api/auth/update-password`         | Private       | Change password while logged in |

\* requires a valid `refreshToken` cookie.

## Frontend setup

```bash
cd frontend
npm install
npm start                # starts on http://localhost:3000 and opens your browser automatically
```

The `.env` file (already included) sets `REACT_APP_API_URL` — Create React
App requires the `REACT_APP_` prefix on any env var you want to access in
the browser code.

The frontend is Create React App + React Router (standard MERN stack — no
build tools outside plain React). `AuthContext` handles register/login/
logout/forgot-password/reset-password and auto-refreshes the access token
on load and on 401s (see `src/api/axios.js` interceptor). `ProtectedRoute`
guards pages and optionally restricts them by role, e.g.:

```jsx
<Route element={<ProtectedRoute allowedRoles={['admin']} />}>
  <Route path="/admin" element={<AdminAnalytics />} />
</Route>
```

## Extending to other SRS features

Every other feature (waste listings, offers, pickups, rewards, dashboards,
etc.) should reuse `protect` and `authorize` from
`backend/middleware/authMiddleware.js` on its own routers, e.g.:

```js
router.post('/listings', protect, authorize('household', 'business'), createListing);
router.get('/admin/analytics', protect, authorize('admin'), getAnalytics);
```

This keeps authentication and authorization logic centralized and consistent
across the whole app.
