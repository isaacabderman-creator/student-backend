import { useState } from "react";
import { authFetch, clearToken, getToken, setToken, type Student } from "./api";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { StudentsTable } from "./components/StudentsTable";
import { CreateStudentForm } from "./components/CreateStudentForm";

function App() {
  const [token, setTokenState] = useState<string | null>(getToken());
  const [students, setStudents] = useState<Student[]>([]);
  const [status, setStatus] = useState("");

  const loadStudents = async (currentToken: string | null = token) => {
    const res = await authFetch(currentToken, "/students");
    if (!res.ok) {
      setStudents([]);
      setStatus("GET /students -> " + res.status);
      return;
    }
    setStudents(await res.json());
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setTokenState(newToken);
    loadStudents(newToken);
  };

  const handleLogout = () => {
    clearToken();
    setTokenState(null);
    setStudents([]);
    setStatus("Logged out.");
  };

  return (
    <div>
      <h1>Student Management</h1>
      <p>{token ? "Logged in." : "Not logged in."}</p>
      <div id="status">{status}</div>

      <section>
        <h2>Register</h2>
        <RegisterForm onStatus={setStatus} />
      </section>

      <section>
        <h2>Login</h2>
        <LoginForm onStatus={setStatus} onLogin={handleLogin} />
        <button onClick={handleLogout}>Logout</button>
      </section>

      <section>
        <h2>Students</h2>
        <button onClick={() => loadStudents()}>Refresh list</button>
        <StudentsTable students={students} token={token} onStatus={setStatus} onChanged={() => loadStudents()} />

        <h3>Add student</h3>
        <CreateStudentForm token={token} onStatus={setStatus} onCreated={() => loadStudents()} />
      </section>
    </div>
  );
}

export default App;
