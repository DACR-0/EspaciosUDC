'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Cargando sesión...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido, {session.user.name || session.user.email}</h1>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
