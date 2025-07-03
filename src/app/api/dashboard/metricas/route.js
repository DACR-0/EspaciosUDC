import { pool } from "@/app/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        (SELECT count(idreserva) FROM espacios.reserva where estado = 'rechazado') AS s_rechazadas,
        (SELECT count(idreserva) FROM espacios.reserva where estado = 'aprobado') AS s_aprobadas,
        (SELECT count(idreserva) FROM espacios.reserva where estado = 'pendiente') AS s_pendientes,
        (SELECT count(idreserva) FROM espacios.reserva) AS s_totales
    `);

    // Formatear los datos para el frontend
    const metricas = [
      { label: "Reservas Rechazadas", valor: rows[0].s_rechazadas },
      { label: "Reservas Aprobadas", valor: rows[0].s_aprobadas },
      { label: "Reservas Pendientes", valor: rows[0].s_pendientes },
      { label: "Total Reservas", valor: rows[0].s_totales },
    ];

    return new Response(JSON.stringify(metricas), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener métricas" }), { status: 500 });
  }
}