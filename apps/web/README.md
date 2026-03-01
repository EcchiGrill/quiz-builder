# Quiz Builder Web

Next.js frontend for the Quiz Builder: list quizzes, create quizzes (with cover image and questions), and view quiz details with collapsible Q&A.

## Tech stack

- **Next.js** 16 (App Router)
- **React** 19
- **MUI** (Material UI) 7
- **React Hook Form** + **Zod** (forms & validation)
- **Zustand** (quiz list state)
- **Axios** (API client)
- **react-hot-toast** (notifications)

## Prerequisites

- Node.js 18+
- Quiz Builder API running (see [apps/api](../api))

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

| Variable              | Description                                     |
| --------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | API base URL (e.g. `http://localhost:4200/api`) |

### 3. Run

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Default port: **3000**.

## Features

- **`/quizzes`** – List all quizzes; “Create quiz” links to create page.
- **`/quizzes/create`** – Create quiz: title, description, cover image, questions (add/remove). For checkbox questions, add multiple answers (saved as comma-separated).
- **`/quizzes/[id]`** – View quiz: cover image, title, description, collapsible questions with answers (expand to see answer).

## Scripts

| Script          | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint`  | Run ESLint           |
