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
├─ src/
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
│  │  │  ├─ course.entity.ts
│  │  │  ├─ course.routes.ts
│  │  │  └─ course.service.ts
│  │  │
│  │  └─ user/
│  │     ├─ types/
│  │     │  └─ user.dto.ts
│  │     │
│  │     ├─ util/
│  │     │  ├─ user.schema.ts
│  │     │  └─ user.types.ts
│  │     │
│  │     ├─ user.controller.ts
│  │     ├─ user.entity.ts
│  │     ├─ user.routes.ts
│  │     └─ user.service.ts
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
│     └─ generic_repository.ts
│
├─ .example.env
├─ package-lock.json
├─ package.json
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
```

### 4. Run the project

```bash
npm run dev   # development (with ts-node-dev / nodemon)
npm run build # compile TypeScript
npm start     # run compiled JS
```

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

## 🛠️ Tech Stack

- Node.js + Express

- TypeScript

- Zod (for validation)

- Generic Repository Pattern

- REST API

## 🧪 Running Tests

The project uses Jest for testing and Supertest for API endpoint tests. Tests are located under `src/__tests__/`

### 1. Install Dev Dependencies

Make sure you have dev dependencies installed:
`bash npm install`

### 2. Run All Tests

`bash npm run test`

- This will run all `.test.ts` files under `src/__tests__/`.

- The tests cover modules such as **Course**, **User**, and **Auth**.

### 3. Test Folder Structure

```bash
task7/
├─ src/
│ ├─ __tests__/
│ │  ├─ courses.test.ts
│ │  ├─ users.test.ts
│ │  └─ helpers/
│ │     └─ supertest.helper.ts
```

### 4. Key Testing Features

- **Supertest agents** for authenticated/unauthenticated requests.

- **Seeded dynamic data** using Faker.js.

- **Zod validation checks** for invalid requests.

- **Role-based access control tests** (ADMIN, COACH, STUDENT).

- **CRUD routes** tested for proper success, forbidden, validation, and edge cases.

- **Data cleanup** after tests using `afterAll` / `afterEach` hooks to reset state.

### 5. Example Test One file

```bash
npm run test -- src/__tests__/courses.test.ts
```

This will run only the **Course module tests**.

## 👨‍💻 Author

Ibrahem Abu Nemer
