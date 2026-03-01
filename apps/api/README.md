# Quiz Builder API

NestJS REST API for the Quiz Builder: quizzes CRUD, cover image upload (Cloudinary), and questions.

## Tech stack

- **NestJS** 11
- **Prisma** + **PostgreSQL**
- **Cloudinary** (cover images)
- **Swagger** (OpenAPI docs)

## Prerequisites

- Node.js 18+
- PostgreSQL
- Cloudinary account

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

| Variable                | Description                  |
| ----------------------- | ---------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key           |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret        |

### 3. Database

```bash
docker-compose up -d
npx prisma migrate dev
```

### 4. Run

```bash
# Development (watch mode)
npm run dev

# Production
npm run build
npm start
```

Default port: **4200**.

## API overview

- Base path: **`/api`**
- Docs: **http://localhost:4200/docs** (Swagger)

### Quizzes

| Method   | Path                            | Description                              |
| -------- | ------------------------------- | ---------------------------------------- |
| `GET`    | `/api/quizzes`                  | List all quizzes                         |
| `GET`    | `/api/quizzes/:id`              | Get one quiz                             |
| `PATCH`  | `/api/quizzes/:id`              | Update quiz                              |
| `DELETE` | `/api/quizzes/:id`              | Delete quiz (cascade deletes questions)  |
| `POST`   | `/api/quizzes/:id/upload-cover` | Upload cover image, stored in Cloudinary |

### Question types

- `boolean`
- `input`
- `checkbox` (answers stored as comma-separated string)

## Scripts

| Script           | Description          |
| ---------------- | -------------------- |
| `npm run dev`    | Start in watch mode  |
| `npm run build`  | Build for production |
| `npm run start`  | Run production build |
| `npm run lint`   | Run ESLint           |
| `npm run format` | Format with Prettier |
