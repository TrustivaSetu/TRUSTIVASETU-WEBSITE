"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin/blog");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }
 
  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>TrustivaSetu Admin</h1>
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
 
const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#07111f",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "12px",
    width: "340px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  title: { margin: "0 0 1.5rem", fontSize: "1.3rem", color: "#07111f" },
  label: { display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#333" },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#111111",
  },
  button: {
    width: "100%",
    padding: "0.7rem",
    background: "#07111f",
    color: "#bef264",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  error: { color: "#c0392b", fontSize: "0.85rem", marginBottom: "0.8rem" },
};
