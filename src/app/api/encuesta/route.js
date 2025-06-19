import { pool } from "@/app/utils/db";

export async function POST(request) {
  const data = await request.json();
  // Ajusta los campos según tu base de datos
  try {
    await pool.query(
      "INSERT INTO encuesta (tipo, dias, factura, actividad, horas) VALUES (?, ?, ?, ?, ?)",
      [
        data.tipo,
        data.dias || null,
        data.factura || null,
        data.actividad || null,
        data.horas || null,
      ]
    );
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al guardar" }), { status: 500 });
  }
}