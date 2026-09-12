# User Management System (Full Stack)

A simple full-stack CRUD app: **Add / View / Update / Delete** user profiles, with an
optional login (register + JWT-based auth) for extra practice.

## Stack
- **Backend:** Node.js + Express + SQLite (via `better-sqlite3`)
- **Frontend:** Plain HTML/CSS/JavaScript (no build step, no framework)
- **Optional auth:** bcrypt password hashing + JWT tokens

## Project structure
```
user-mgmt-app/
├── server.js          # Express app entry point
├── db.js              # SQLite connection + table setup
├── routes/
│   ├── users.js        # CRUD endpoints for profiles
│   └── auth.js         # Optional register/login endpoints
├── public/
│   ├── index.html       # Frontend UI
│   ├── style.css
│   └── app.js            # Talks to the backend via fetch()
└── package.json
```

## How to run it

1. Make sure you have [Node.js](https://nodejs.org) installed (v18+ recommended).
2. Open a terminal in this folder and install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser to **http://localhost:3000**

A file called `users.db` will be created automatically in this folder the first
time you run it — that's your SQLite database. Delete it any time to reset your data.

## API reference

### Profiles (`/api/users`)
| Method | Route            | Description          |
|--------|-------------------|-----------------------|
| GET    | `/api/users`      | List all profiles     |
| GET    | `/api/users/:id`  | Get one profile       |
| POST   | `/api/users`      | Create a profile      |
| PUT    | `/api/users/:id`  | Update a profile      |
| DELETE | `/api/users/:id`  | Delete a profile      |

`POST`/`PUT` body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "age": 25, "bio": "..." }
```

### Auth (optional) (`/api/auth`)
| Method | Route                | Description                          |
|--------|-----------------------|----------------------------------------|
| POST   | `/api/auth/register`  | Create a profile + password, returns a JWT |
| POST   | `/api/auth/login`     | Verify password, returns a JWT              |

The frontend's login/register panel is separate from the plain CRUD form — you can
use the CRUD form with no login at all, or register/login for the bonus auth practice.
The returned JWT isn't currently required on the CRUD routes; if you want to make
profiles private per-logged-in-user, that's a great next step (see below).

## Ideas to extend this (good next steps for practice)
1. **Protect the CRUD routes** — require the JWT (`requireAuth` in `routes/auth.js`
   is already written) so only the logged-in user can edit their own profile.
2. **Add form validation** — e.g. proper email format checks, required-field styling.
3. **Add pagination or search** to the profiles table.
4. **Switch storage** — swap `better-sqlite3` for PostgreSQL/MySQL to practice a
   client-server database instead of a local file.
5. **Deploy it** — e.g. Render/Railway for the backend, or keep it all-in-one on a
   single Node host.
