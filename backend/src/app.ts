import express, { type Express } from "express";

import { StudentController } from "./controllers/students.controller.ts";

const app: Express = express();

const studentController = new StudentController();
app.use(express.json());

app.get("/students", studentController.getStudents);
app.get("/students/:id", studentController.getStudent);
app.post("/students", studentController.createStudent);
app.put("/students/:id", studentController.updateStudent);
app.delete("/students/:id", studentController.deleteStudent);

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
