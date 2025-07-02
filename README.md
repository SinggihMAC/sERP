# sERP - Smart ERP System

Modern Progressive Web App (PWA) based ERP system with modular architecture and plugin support.

## Features

- Modular and scalable architecture
- Dynamic plugin/module loading (frontend and backend)
- Post-transaction event hook system
- PWA support
- Role-based access control

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- React Router
- Zustand for state management

### Backend
- NestJS (Node.js)
- PostgreSQL
- Prisma ORM

## Project Structure

```
/
├── backend/         # NestJS backend application
├── frontend/        # React frontend application
└── README.md        # This file
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Core Modules

- Authentication & User Management
- Role-based Access Control

## License

MIT