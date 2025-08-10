# Historic Bainbridge Island App

This repository contains a full‑stack web application for exploring the people and places of Bainbridge Island, Washington.  
It includes a lightweight **Express** back‑end for managing locations, books, images and authentication, as well as a **Next.js** front‑end built with **React** and **Tailwind CSS** for a polished user experience.

## Features

* **Location Explorer** – browse historic locations on Bainbridge Island. Each location includes a title, description, optional photos and audio narration, a map position, and a curated list of related books.  
* **Book Library** – view a curated collection of books about Bainbridge Island. Each entry contains an author, ISBN, a cover image from Open Library and a purchase/read link.  
* **Image Uploads** – administrators can upload photos for locations. Images are automatically resized into three sizes (full, card and thumb) and stored under `server/public/images/`.  
* **Authentication** – simple JWT‑based login for administrators. Protects POST/PUT/DELETE routes on the API.  
* **Environment‑driven configuration** – customize allowed CORS origins, admin credentials and secrets via `.env` files.  
* **Tailwind UI** – clean, mobile‑friendly pages built with Tailwind CSS.  
* **JSON persistence** – by default, data for locations and books is stored in JSON files under `server/data/`.  You can later swap this for a database without changing the route signatures.

## Getting started

1. **Install dependencies**

   ```sh
   # install root dev dependency (concurrently)
   npm install
   # install server and client dependencies
   npm run install:all
   ```

2. **Configure environment variables**

   Copy the example environment files and fill in the required values:

   ```sh
   cp server/.env.example server/.env
   cp client/.env.local.example client/.env.local
   ```

   Open `server/.env` and set at least the following variables:

   - `ADMIN_EMAIL` – email address used to log in.
   - `ADMIN_PASSWORD` – password used to log in.  **In production you should hash and salt passwords; plaintext is used here only for demonstration.**
   - `JWT_SECRET` – random string used to sign your JWTs. **This is required; the server will not start without it.**
   - `CORS_ALLOWED_ORIGINS` – comma‑separated list of origins allowed to call the API (e.g. `http://localhost:3000`).  Leave empty to allow all origins.

   For the client, open `client/.env.local` and set `NEXT_PUBLIC_API_BASE_URL` to the base URL of your back‑end (e.g. `http://localhost:4000`).

3. **Run in development**

   ```sh
   # start both the server and client with one command
   npm run dev
   ```

   The Express API will run on port **4000** and the Next.js client will run on port **3000** by default.  Open `http://localhost:3000` to browse the site.

4. **Build and start in production**

   To create an optimized production build of the client and run only the back‑end:

   ```sh
   npm run build   # builds the Next.js client
   npm run start   # starts the Express server on port 4000
   ```

   In production mode the client’s static files will be served by Next.js on its own port.  You can configure a reverse proxy (e.g. Nginx or Replit’s web server) to route `/api/*` requests to the Express app and everything else to Next.js.

## File structure

```
historical-bainbridge-app/
├── package.json             # root scripts (dev, build, start)
├── server/                  # Express back‑end
│   ├── index.js             # entry point
│   ├── middleware/          # auth middleware
│   ├── routes/              # API route handlers
│   ├── data/                # JSON persistence for locations and books
│   ├── public/              # uploaded images and audio files
│   └── package.json         # server dependencies and scripts
├── client/                  # Next.js front‑end
│   ├── pages/               # page components
│   │   ├── index.js         # home page
│   │   └── locations/       # dynamic location pages
│   ├── styles/              # Tailwind CSS
│   ├── package.json         # client dependencies and scripts
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   └── .env.local.example   # example client environment variables
└── README.md
```

## Improving book data

The initial book catalogue in `server/data/books.json` uses reliable sources for descriptions and cover images.  Each entry includes:

| Field | Purpose |
| --- | --- |
| `id` | Internal identifier used by locations to reference books |
| `title` | Title of the book |
| `author` | Author(s) |
| `description` | Short synopsis taken from reputable sources【82663020070886†L452-L462】【736129418051730†L56-L68】【258216565877031†L109-L120】 |
| `link` | A link to a page where users can learn more or purchase the book |
| `cover` | A cover image served by the Open Library covers API |
| `isbn` | ISBN or ISBN‑13, if available |

If a book’s link or image is incorrect, you can update these fields directly in the JSON file or via the API.  When adding new books, try to reference authoritative descriptions and use the `covers.openlibrary.org` API for consistent cover art.

## Thoughts on the previous version

The original project blended front‑end, back‑end and media processing into a single codebase.  This rewrite focuses on **clarity, security and data integrity**.  Improvements include:

* A clean separation between server and client folders.  Each has its own `package.json`, making dependency management explicit.
* JSON‑based persistence for ease of development.  You can later migrate to a relational database without changing the API surface.
* A simple authentication mechanism to protect administrative actions.  In production, replace plaintext passwords with bcrypt‑hashed values and add refresh tokens as described in the earlier review.
* A dedicated books route and data file.  Book entries now include accurate links and cover images using the Open Library covers API.  This addresses the mismatches and missing images in the original version.
* Tailwind CSS for rapid styling and responsive design out of the box.

### Audio handling

The back‑end exposes a `public` directory that can host MP3 files (e.g. `public/audio/my-location.mp3`).  The data model for locations includes an optional `audio` field pointing to a file under `/public`.  This allows you to add narration later without changing the API.  When your ElevenLabs integration is ready, generate audio files and place them in `server/public/audio/`, then set the `audio` field on each location to point to the new file.

### Extending the app

The current implementation is intentionally minimal to make it easy to host on platforms like Replit.  You can extend it by:

* Swapping JSON files for a database such as PostgreSQL (via Drizzle ORM) or SQLite.  Replace the `read*` and `write*` helpers in the route files with database queries.
* Adding admin pages in the Next.js client to manage locations, books and uploads.  Use the existing API endpoints and integrate JWT authentication via cookies.
* Integrating map display (e.g. Leaflet or Google Maps) using the `lat`/`lng` coordinates on locations.
* Caching responses and adding rate limiting for improved performance and security.

## License

This project is provided as‑is to illustrate how to structure a small full‑stack app.  You are free to modify and use it for your own purposes.
