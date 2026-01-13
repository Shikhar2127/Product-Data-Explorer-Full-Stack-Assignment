Product Data Explorer

A full-stack web application built as part of an assignment to demonstrate
data scraping, API design, database modeling, and frontend integration.

Backend
- NestJS
- Prisma ORM
- MySQL
- Playwright (for scraping)

Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios

---

Features Implemented

Backend
- Navigation scraping from World of Books
- Category scraping based on navigation
- Product listing API
- Product detail structure
- Prisma schema with relational design
- REST APIs with NestJS

Frontend
- Navigation listing
- Category routing
- Product listing
- Product detail page
- Client-side data fetching

---

 How Scraping Works

- Scraping is triggered on-demand via API calls.
- Data is cached in the database to avoid repeated scraping.
- Playwright is used for reliable browser-based scraping.

---

Running Locally

Backend
```bash
cd backend
npm install
npm run start:dev
backend runs-- http://localhost:3001

Frontend
```bash
cd frontend
npm install
npm run dev
frontend run-- http://localhost:3000


