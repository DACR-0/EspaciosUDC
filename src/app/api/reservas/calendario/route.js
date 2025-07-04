import { pool } from "@/app/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.idreserva,
        r.estado,
        f.p1_detalles AS titulo,
        f.p7_fechaInicio AS fecha_inicio,
        f.p7_fechaFin AS fecha_fin,
        f.p7_horaInicio AS hora_inicio,
        f.p7_horaFin AS hora_fin,
        e.nombre AS espacio,
        c.nombre AS campus
      FROM espacios.reserva r
      JOIN espacios.form_alquiler f ON r.id_formulario = f.idform_alquiler
      JOIN espacios.espacio e ON f.p6_espacio = e.idespacio
      JOIN espacios.campus c ON f.p5_campus = c.idcampus
      WHERE r.estado IN ('aprobado', 'pendiente')
    `);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al obtener reservas" }), { status: 500 });
  }
}