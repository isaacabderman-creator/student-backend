import { useState, type FormEvent } from "react";
import { authFetch } from "../api";

interface CreateStudentFormProps {
  token: string | null;
  onStatus: (message: string) => void;
  onCreated: () => void;
}

export function CreateStudentForm({ token, onStatus, onCreated }: CreateStudentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await authFetch(token, "/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const body = await res.json();
    onStatus("POST /students -> " + res.status + " " + JSON.stringify(body));
    if (res.ok) {
      setName("");
      setEmail("");
      onCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
