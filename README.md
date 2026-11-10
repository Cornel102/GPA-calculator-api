# GPA Calculator API

A complete RESTful API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing students, subjects, score records, and calculating student GPAs and transcripts.

Developed by [Cornel102](https://github.com/Cornel102).

---

## 🚀 Features

- **Full Student CRUD:** Register, view, update, and delete student records.
- **Full Subject CRUD:** Create, list, retrieve by ID, edit, and delete subjects/courses.
- **Full Score CRUD:** Assign/upsert scores, list all records, view by ID, and delete scores.
- **Automated GPA Calculation & Transcript:** Automatically computes letter grades, grade points, total credit units, and weighted GPA.
- **Health Check Endpoint:** Simple monitor for server uptime.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v20+ recommended)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB via Mongoose ORM
- **Dev Tools:** `ts-node-dev` for hot reload

---

## 🏁 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas cluster URI)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Cornel102/GPA-calculator-api.git
cd GPA-calculator-api
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gpa_calculator
```

### 4. Running the Application

- **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Build TypeScript:**
  ```bash
  npm run build
  ```
- **Production Start:**
  ```bash
  npm start
  ```

The server will start on `http://localhost:5000`.

---

## 📌 Complete API Endpoints Overview

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Server health and uptime check |
| **Students** | | |
| `POST` | `/api/v1/students` | Create a new student (all fields required) |
| `GET` | `/api/v1/students` | List all students |
| `GET` | `/api/v1/students/:id` | Get a student by ID |
| `PUT` | `/api/v1/students/:id` | Update student details |
| `DELETE` | `/api/v1/students/:id` | Delete a student |
| **Subjects** | | |
| `POST` | `/api/v1/subjects` | Create a new subject |
| `GET` | `/api/v1/subjects` | List all subjects |
| `GET` | `/api/v1/subjects/:id` | Get a subject by ID |
| `PUT` | `/api/v1/subjects/:id` | Update subject details |
| `DELETE` | `/api/v1/subjects/:id` | Delete a subject |
| **Scores & GPA** | | |
| `POST` | `/api/v1/scores` | Assign or update a score (upsert) |
| `GET` | `/api/v1/scores` | List all score records |
| `GET` | `/api/v1/scores/:id` | Get a single score record by ID |
| `DELETE` | `/api/v1/scores/:id` | Delete a score record |
| `GET` | `/api/v1/students/:id/transcript` | Get full transcript + calculated GPA for a student |

---

## 📖 Detailed API Documentation & Requirements

Base URL: `http://localhost:5000`

---

### 1. System

#### `GET /health`
- **Description:** Checks server health and returns a timestamp.
- **Body / Params:** None
- **Response `200 OK`:**
  ```json
  {
    "status": "OK",
    "timestamp": "2026-11-10T10:45:00.000Z"
  }
  ```

---

### 2. Students (`/api/v1/students`)

#### 1. Create Student
- **Method:** `POST /api/v1/students`
- **Headers:** `Content-Type: application/json`
- **Required Body Fields:**
  | Field | Type | Description |
  |---|---|---|
  | `name` | `string` | Full name of the student *(Required)* |
  | `email` | `string` | Unique email address *(Required)* |
  | `matricNumber` | `string` | Unique matriculation number *(Required)* |
  | `department` | `string` | Department or faculty *(Required)* |

- **Request Example:**
  ```json
  {
    "name": "Cornelius Nkwocha",
    "email": "cornel@example.com",
    "matricNumber": "MAT/2026/001",
    "department": "Information Technology"
  }
  ```
- **Responses:**
  - `201 Created`: Returns newly created student object.
  - `400 Bad Request`: If any field is missing:
    ```json
    { "message": "All fields are required." }
    ```

#### 2. Get All Students
- **Method:** `GET /api/v1/students`
- **Responses:** `200 OK` with an array of student objects.

#### 3. Get Student by ID
- **Method:** `GET /api/v1/students/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Responses:**
  - `200 OK`: Student object.
  - `404 Not Found`: `{ "message": "Student not found." }`

#### 4. Update Student
- **Method:** `PUT /api/v1/students/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Headers:** `Content-Type: application/json`
- **Body Fields (Optional/Partial):** `name`, `email`, `matricNumber`, `department`
- **Request Example:**
  ```json
  {
    "department": "Information Technology",
    "name": "Cornelius N."
  }
  ```
- **Responses:**
  - `200 OK`: Updated student object.
  - `404 Not Found`: `{ "message": "Student not found." }`

#### 5. Delete Student
- **Method:** `DELETE /api/v1/students/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Responses:**
  - `200 OK`:
    ```json
    { "message": "Student deleted successfully." }
    ```
  - `404 Not Found`: `{ "message": "Student not found." }`

---

### 3. Subjects (`/api/v1/subjects`)

#### 1. Create Subject
- **Method:** `POST /api/v1/subjects`
- **Headers:** `Content-Type: application/json`
- **Required Body Fields:**
  | Field | Type | Description |
  |---|---|---|
  | `code` | `string` | Unique course/subject code (e.g. `CSC101`) *(Required)* |
  | `title` | `string` | Full title of the course *(Required)* |
  | `creditUnits` | `number` | Credit unit weight *(Required)* |

- **Request Example:**
  ```json
  {
    "code": "CSC101",
    "title": "Introduction to Computer Science",
    "creditUnits": 3
  }
  ```
- **Responses:**
  - `201 Created`: Created subject object.
  - `400 Bad Request`: `{ "message": "code, title and creditUnits are required." }`

#### 2. Get All Subjects
- **Method:** `GET /api/v1/subjects`
- **Responses:** `200 OK` with an array of subjects.

#### 3. Get Subject by ID
- **Method:** `GET /api/v1/subjects/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Responses:**
  - `200 OK`: Subject object.
  - `404 Not Found`: `{ "message": "Subject not found." }`

#### 4. Update Subject
- **Method:** `PUT /api/v1/subjects/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Headers:** `Content-Type: application/json`
- **Body Fields (Optional/Partial):** `code`, `title`, `creditUnits`
- **Request Example:**
  ```json
  {
    "title": "Advanced Computer Science",
    "creditUnits": 4
  }
  ```
- **Responses:**
  - `200 OK`: Updated subject object.
  - `404 Not Found`: `{ "message": "Subject not found." }`

#### 5. Delete Subject
- **Method:** `DELETE /api/v1/subjects/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Responses:**
  - `200 OK`:
    ```json
    { "message": "Subject deleted successfully." }
    ```
  - `404 Not Found`: `{ "message": "Subject not found." }`

---

### 4. Scores & GPA Transcript

#### 1. Assign or Update Score (Upsert)
- **Method:** `POST /api/v1/scores`
- **Headers:** `Content-Type: application/json`
- **Required Body Fields:**
  | Field | Type | Description |
  |---|---|---|
  | `studentId` | `string` | Valid Mongo ObjectId of an existing student *(Required)* |
  | `subjectId` | `string` | Valid Mongo ObjectId of an existing subject *(Required)* |
  | `score` | `number` | Score between `0` and `100` *(Required)* |

- **Request Example:**
  ```json
  {
    "studentId": "67308bf3b8321d51c356910a",
    "subjectId": "67308bf4b8321d51c356910b",
    "score": 85
  }
  ```
- **Responses:**
  - `200 OK`: Returns the saved/updated `ScoreRecord`.
  - `400 Bad Request`: If missing fields or if `score < 0 || score > 100`.
  - `404 Not Found`: If student or subject does not exist.

#### 2. Get All Score Records
- **Method:** `GET /api/v1/scores`
- **Responses:** `200 OK` with an array of score records (populated with student and subject details).

#### 3. Get Score Record by ID
- **Method:** `GET /api/v1/scores/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Responses:**
  - `200 OK`: Score record object.
  - `404 Not Found`: `{ "message": "Score record not found." }`

#### 4. Delete Score Record
- **Method:** `DELETE /api/v1/scores/:id`
- **URL Parameters:** `id` (MongoDB ObjectId)
- **Responses:**
  - `200 OK`:
    ```json
    { "message": "Score record deleted successfully." }
    ```
  - `404 Not Found`: `{ "message": "Score record not found." }`

#### 5. Get Student Transcript & Calculated GPA
- **Method:** `GET /api/v1/students/:id/transcript`
- **URL Parameters:** `id` (Student MongoDB ObjectId)
- **Responses:**
  - `200 OK`:
    ```json
    {
      "student": {
        "_id": "67308bf3b8321d51c356910a",
        "name": "Cornelius Nkwocha",
        "email": "cornel@example.com",
        "matricNumber": "MAT/2026/001",
        "department": "Information Technology"
      },
      "transcript": [
        {
          "subjectId": "67308bf4b8321d51c356910b",
          "code": "CSC101",
          "title": "Introduction to Computer Science",
          "creditUnits": 3,
          "score": 85,
          "letterGrade": "A",
          "gradePoint": 5
        }
      ],
      "totalCredits": 3,
      "gpa": 5.0
    }
    ```
  - `404 Not Found`: `{ "message": "Student not found." }`

---

## 📊 Grading Scale Reference

| Score Range | Letter Grade | Grade Point |
|---|---|---|
| **70 – 100** | **A** | 5.0 |
| **60 – 69**  | **B** | 4.0 |
| **50 – 59**  | **C** | 3.0 |
| **45 – 49**  | **D** | 2.0 |
| **40 – 44**  | **E** | 1.0 |
| **0 – 39**   | **F** | 0.0 |

$$\text{GPA} = \frac{\sum (\text{Credit Units} \times \text{Grade Point})}{\sum \text{Credit Units}}$$

---

## 👤 Author

- GitHub: [@Cornel102](https://github.com/Cornel102)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
