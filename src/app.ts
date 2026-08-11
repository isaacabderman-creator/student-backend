import express from "express";
import dotenv from "dotenv";

import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "./controllers/students.controller.ts";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/students", getStudents);
app.get("/students/:id", getStudent);
app.post("/students", createStudent);
app.put("/students/:id", updateStudent);
app.delete("/students/:id", deleteStudent);

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
