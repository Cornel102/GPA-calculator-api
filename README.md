# GPA Calculator API

A simple REST API for managing students, subjects, scores and calculating GPA.

## Features
- Create, list and retrieve **students**
- Create and list **subjects**
- Assign/update scores for a student‑subject pair
- Generate a transcript with GPA for a student

## Tech Stack
- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** (via **Mongoose**)
- **ts-node-dev** for development

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB instance (default URI `mongodb://localhost:27017/gpa-db`)

### Installation
```bash
# clone the repo
git clone <repo-url>
cd GPA-calculator-api

# install dependencies
npm install
```

### Environment
Create a `.env` file at the project root (you can copy from `.env.example` if present):
```
MONGODB_URI=mongodb://localhost:27017/gpa-db
PORT=5000
```

### Run the API
```bash
# development mode (auto‑restart)
npm run dev
```
The server will be available at `http://localhost:5000`.

### Build & Production
```bash
npm run build   # transpile TypeScript to ./dist
npm start       # run compiled code
```

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/students` | Create a new student (all fields required) |
| `GET`  | `/api/v1/students` | List all students |
| `GET`  | `/api/v1/students/:id` | Get a student by ID |
| `POST` | `/api/v1/subjects` | Create a new subject |
| `GET`  | `/api/v1/subjects` | List all subjects |
| `POST` | `/api/v1/scores` | Assign or update a score for a student/subject |
| `GET`  | `/api/v1/scores/transcript/:studentId` | Get transcript + GPA for a student |

## Testing
The project uses **Jest** with **ts‑jest**. Run the test suite with:
```bash
npm test
```
(If you removed the Jest config, you may need to `npm install --save-dev jest ts-jest @types/jest` and add a `jest.config.js`.)

## License
MIT © Your Name

