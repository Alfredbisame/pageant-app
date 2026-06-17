# ELL Pageant API

Production-ready NestJS backend for the ELL 10th Anniversary Pageant voting platform.

## Stack

- **NestJS 11** — modular monolith with feature-first architecture
- **MongoDB** — Mongoose ODM with repository pattern
- **JWT** — access + refresh token rotation (Argon2 password hashing)
- **Socket.IO** — real-time leaderboard updates
- **Swagger** — OpenAPI docs at `/api/v1/docs`

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Start MongoDB (Docker)
docker compose up mongodb -d

# Run in development
pnpm start:dev
```

API: `http://localhost:3001/api/v1`  
Swagger: `http://localhost:3001/api/v1/docs`

## Project Structure

```
src/
├── common/          # Guards, decorators, interceptors, filters, utils
├── config/          # Environment validation (Joi)
├── database/        # Mongoose connection + shared schemas
├── features/        # Domain modules (auth, voting, contestants, etc.)
├── shared/          # Repositories, storage adapters
├── realtime/        # Socket.IO gateway
└── swagger/         # OpenAPI configuration
```

## Features

| Module | Public Endpoints | Admin Endpoints |
|--------|-----------------|-----------------|
| Auth | register, login, refresh, forgot/reset password | — |
| Users | GET/PATCH/DELETE `/users/me` | `/admin/users` |
| Contestants | GET `/contestants` | `/admin/contestants` + image upload |
| Vote Packages | GET `/vote-packages` | `/admin/vote-packages` |
| Voting | quote, confirm, transaction status | — |
| Leaderboard | rankings, top, summary | — |
| Event | `GET /event/public` | `/admin/event-config` |
| Health | `/health` | — |

## Frontend Integration

The voter-facing UI is a **separate Next.js 16 app** (not in this repo). See the full integration guide:

**[docs/FRONTEND_API_INTEGRATION.md](docs/FRONTEND_API_INTEGRATION.md)**

Covers server actions, domain services, Pino logging, all voter-facing endpoints, payment flow (Paystack/Hubtel), Socket.IO realtime, and page-by-page integration for Home, Contestants, Leaderboard, Voting, and About.

## Environment Variables

See `.env.example` for all configuration options.

## Docker

```bash
docker compose up -d
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm start:dev` | Development with hot reload |
| `pnpm build` | Production build |
| `pnpm start:prod` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests |
