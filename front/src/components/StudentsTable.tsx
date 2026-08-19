import { authFetch, type Student } from "../api";

interface StudentsTableProps {
  students: Student[];
  token: string | null;
  onStatus: (message: string) => void;
  onChanged: () => void;
}

export function StudentsTable({ students, token, onStatus, onChanged }: StudentsTableProps) {
  const handleDelete = async (id: number) => {
    const res = await authFetch(token, "/students/" + id, { method: "DELETE" });
    onStatus("DELETE /students/" + id + " -> " + res.status);
    if (res.ok) {
      onChanged();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
