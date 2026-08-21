import express, { type Express } from "express";

import { AuthController } from "./controllers/auth.controller.ts";
import { StudentController } from "./controllers/students.controller.ts";
import { corsMiddleware } from "./middleware/cors.middleware.ts";
import { requireAuth } from "./middleware/auth.middleware.ts";

const app: Express = express();

const studentController = new StudentController();
const authController = new AuthController();
app.use(corsMiddleware);
app.use(express.json());

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

app.get("/students", requireAuth, studentController.getStudents);
app.get("/students/:id", requireAuth, studentController.getStudent);
app.post("/students", requireAuth, studentController.createStudent);
app.put("/students/:id", requireAuth, studentController.updateStudent);
app.delete("/students/:id", requireAuth, studentController.deleteStudent);

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
