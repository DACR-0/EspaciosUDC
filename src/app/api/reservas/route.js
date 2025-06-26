import { pool } from "@/app/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        solicitante.nombre AS solicitante,
        solicitante.documento_indentidad AS documento,
        reserva.registro_solicitud AS fecha_solicitud,
        campus.nombre AS campus,
        espacio.nombre AS espacio,
        reserva.tipo_solicitud,
        reserva.estado,
        reserva.registro_estado,
        reserva.id_solicitante,
        reserva.id_formulario,
        reserva.idreserva
      FROM reserva
      JOIN solicitante ON solicitante.idsolicitante = reserva.id_solicitante
      JOIN form_alquiler ON form_alquiler.idform_alquiler = reserva.id_formulario
      JOIN campus ON campus.idcampus = form_alquiler.p5_campus
      JOIN espacio ON espacio.idespacio = form_alquiler.p6_espacio
      ORDER BY reserva.registro_solicitud DESC
    `);
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: "Error al obtener reservas" }, { status: 500 });
  }
}