import { useState, type FormEvent } from "react";

import { API_BASE } from "../api";

interface RegisterFormProps {
  onStatus: (message: string) => void;
}

export function RegisterForm({ onStatus }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(API_BASE + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json();
    onStatus("POST /auth/register -> " + res.status + " " + JSON.stringify(body));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
