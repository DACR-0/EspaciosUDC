import { pool } from "@/app/utils/db";

// POST: guardar respuestas de la encuesta de alquiler
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      p1_detalles,
      p2_publico,
      p3_menores,
      p4_convenio,
      p4_archivo,
      p5_campus,
      p6_espacio,
      p7_fechaInicio,
      p7_fechaFin,
      p7_horaInicio,
      p7_horaFin,
      p8_asistentes,
      p9_anexo,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO form_alquiler (
        p1_detalles, p2_publico, p3_menores, p4_convenio, p4_archivo,
        p5_campus, p6_espacio, p7_fechaInicio, p7_fechaFin, p7_horaInicio,
        p7_horaFin, p8_asistentes, p9_anexo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p1_detalles,
        p2_publico,
        p3_menores,
        p4_convenio,
        p4_archivo,
        p5_campus,
        p6_espacio,
        p7_fechaInicio,
        p7_fechaFin,
        p7_horaInicio,
        p7_horaFin,
        p8_asistentes,
        p9_anexo,
      ]
    );

    return Response.json({ id: result.insertId, success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}