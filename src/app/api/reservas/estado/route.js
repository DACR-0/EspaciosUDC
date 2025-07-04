import { pool } from "@/app/utils/db";

export async function POST(request) {
  const { idreserva, estado } = await request.json();
  if (!idreserva || !estado) {
    return Response.json({ error: "Faltan datos" }, { status: 400 });
  }
  try {
    await pool.query(
      "UPDATE reserva SET estado = ?, registro_estado = CURRENT_TIMESTAMP WHERE idreserva = ?",
      [estado, idreserva]
    );
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al actualizar estado" }, { status: 500 });
  }
}