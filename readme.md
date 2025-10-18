# 📘 C2C Task 7 – Modular Express API

A simple **Node.js + Express + TypeScript** REST API built with a **modular architecture**.  
It follows clean code principles with separation of concerns using **controllers, services, repositories, and validations**.

## 🚀 Features

- Modular folder structure (feature-based).
- Centralized API response format (`UnifiedApiResponse`).
- Generic repository pattern for data access.
- TypeScript with strong typing.
- Input validation ready (Zod).
- Easy scalability (add new modules quickly).
- RESTful CRUD endpoints.

## 📂 Project Structure

```bash
task7/
├─ mongo/
│  └─ seeds/
│     └─ seed.ts
├─ prisma/
│  ├─ migration/
│  ├─ seeds/
│  │  └─ seed.ts
│  └─ schema.prisma
│
├─ src/
│  ├─ __tests__/
│  │  ├─ courses.test.ts
│  │  ├─ users..mongoose.test.ts
│  │  ├─ users.test.ts
│  │  ├─ setup/
│  │  │  └─ global.teardown.ts
│  │  │
│  │  └─ helpers/
│  │     ├─ supertest.helper.mongo.ts
│  │     └─ supertest.helper.ts
│  │
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ types/
│  │  │  │  └─ auth.dto.ts
│  │  │  │
│  │  │  ├─ util/
│  │  │  │  ├─ argon.util.ts
│  │  │  │  ├─ auth.schema.ts
│  │  │  │  └─ jwt.util.ts
│  │  │  │
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.routes.ts
│  │  │  └─ auth.service.ts
│  │  │
│  │  ├─ course/
│  │  │  ├─ types/
│  │  │  │  └─ course.dto.ts
│  │  │  │
│  │  │  ├─ util/
│  │  │  │  └─ course.schema.ts
│  │  │  │
│  │  │  ├─ course.controller.ts
│  │  │  ├─ course.data.ts
│  │  │  ├─ course.entity.ts
│  │  │  ├─ course.repository.ts
│  │  │  ├─ course.routes.ts
│  │  │  └─ course.service.ts
│  │  │
│  │  └─ user/
│  │     ├─ interfaces/
│  │     │  ├─ user_mongoose_repo_interface.ts
│  │     │  └─ user_prisma_repo_interface.ts
│  │     │
│  │     ├─ types/
│  │     │  └─ user.dto.ts
│  │     │
│  │     ├─ util/
│  │     │  ├─ user.schema.ts
│  │     │  └─ user.types.ts
│  │     │
│  │     ├─ user.controller.ts
│  │     ├─ user.data.ts
│  │     ├─ user.entity.ts
│  │     ├─ user.model.ts
│  │     ├─ user.mongoose.repository.ts
│  │     ├─ user.prisma.repository.ts
│  │     ├─ user.routes.ts
│  │     └─ user.service.ts
│  │
│  ├─ seeds/
│  │  ├─ courses.seed.ts
│  │  └─ users.seed.ts
│  │
│  ├─ services/
│  │  ├─ mongoose.service.ts
│  │  └─ prisma.service.ts
│  │
│  └─ shared/
│     ├─ middlewares/
│     │  ├─ auth.middleware.ts
│     │  ├─ response.middleware.ts
│     │  └─ role.middleware.ts
│     │
│     ├─ utils/
│     │  ├─ constants.ts
│     │  ├─ declaration-merging.types.ts
│     │  ├─ exception.ts
│     │  ├─ object.util.ts
│     │  ├─ util.ts
│     │  ├─ util.types.ts
│     │  └─ zod.util.ts
│     │
│     ├─ IGenericRepository.ts
│     ├─ mongoose_repository.ts
│     └─ prisma_repository.ts
│
├─ .example.env
├─ .gitignore
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ readme.md
├─ server.ts
└─ tsconfig.json
```

## ⚡ Getting Started

### 1. Clone the repo

- `git clone https://github.com/IbrahemAtef/C2C-tasks.git`

- `cd C2C-tasks/task7`

### 2. Install dependencies

`npm install`

### 3. Setup environment

Create a .env file:

```bash
PORT=your_port_here
NODE_ENV=your_node_env_here
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_url_here
MONGODB_URL=your_database_url_here
```

### 4. Run the project

```bash
npm run dev   # development (with ts-node-dev / nodemon)
npm run build # compile TypeScript
npm start     # run compiled JS
```

## 🌱 Database Seeding

This project includes a simple **Prisma + Faker.js** seeding script to populate fake data for development and testing.

### Run Seeder

- Prisma

```bash
npm run seed:prisma
```

- Mongoose

```bash
npm run seed:mongo
```

This command will:

- Generate fake users (students & coaches)

- Generate random courses linked to users

- Prepare consistent data for Jest and Supertest tests

💡 You can modify src/seeds/seed.ts to adjust the number or type of records generated.

## 📡 API Endpoints

### Auth Module (/api/v1/auth)

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | register a new user |
| POST   | `/login`    | Authenticate a user |

### Course Module (/api/v1/courses)

| Method | Endpoint | Description                     |
| ------ | -------- | ------------------------------- |
| GET    | `/`      | Get all courses                 |
| GET    | `/:id`   | Get course by ID                |
| POST   | `/`      | Create a new course             |
| patch  | `/:id`   | Update course by ID for creator |
| DELETE | `/:id`   | Delete course by ID for creator |

### User Module (/api/v1/users)

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| GET    | `/me`    | Get my profile    |
| POST   | `/coach` | Create coach user |
| PUT    | `/me`    | Update user data  |

## 🧪 Running Tests

The project uses Jest for testing and Supertest for API endpoint tests. Tests are located under `src/__tests__/`

### 1. Install Dev Dependencies

Make sure you have dev dependencies installed:

```bash
npm install
```

### 2. Seeding data

Before running tests, make sure the database is seeded:

- Prisma

```bash
npm run seed:prisma
```

- Mongoose

```bash
npm run seed:mongo
```

### 3. Example Test Each module

This will run only the **User module tests**.

- Prisma

```bash
npm run test:prisma_user
```

This will run only the **Course module tests**.

```bash
npm run test:prisma_course
```

- Mongoose

```bash
npm run test:mongo_user
```

This will run only the **Course module tests**.

```bash
npm run test:mongo_course
```

### 4. Test Folder Structure

```bash
task7/
├─ src/
│  ├─ __tests__/
│  │  ├─ courses.test.ts
│  │  ├─ users..mongoose.test.ts
│  │  ├─ users.test.ts
│  │  ├─ setup/
│  │  │  └─ global.teardown.ts
│  │  │
│  │  └─ helpers/
│  │     ├─ supertest.helper.mongo.ts
│  │     └─ supertest.helper.ts
```

### 5. Key Testing Features

- **Supertest agents** for authenticated/unauthenticated requests.

- **Seeded dynamic data** using Faker.js.

- **Zod validation checks** for invalid requests.

- **Role-based access control tests** (ADMIN, COACH, STUDENT).

- **CRUD routes** tested for proper success, forbidden, validation, and edge cases.

- **Data cleanup** after tests using `afterAll` / `afterEach` hooks to reset state.

## 🛠️ Tech Stack

- Node.js + Express

- TypeScript

- Prisma ORM

- Zod (for validation)

- Generic Repository Pattern

- REST API Architecture

- Jest + Supertest (for testing)

- Faker.js (for fake data seeding)

## 🧩 Prisma Commands

If you’re using Prisma ORM, the following commands are available:

| Command                              | Description                                    |
| ------------------------------------ | ---------------------------------------------- |
| `npx prisma init`                    | Initialize Prisma in your project              |
| `npx prisma generate`                | Generate the Prisma client after model updates |
| `npx prisma migrate dev --name init` | Create and apply migrations in development     |
| `npx prisma db push`                 | Push schema changes directly to the database   |
| `npx prisma db seed`                 | Run the seed file to populate fake data        |
| `npx prisma studio`                  | Launch Prisma Studio (GUI for your database)   |
| `npx prisma migrate reset`           | Reset the database and reapply migrations      |

## 👨‍💻 Author

Ibrahem Abu Nemer
