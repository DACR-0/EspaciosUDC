import { pool } from "@/app/utils/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const idSolicitante = searchParams.get("id_solicitante");
  const idFormulario = searchParams.get("id_formulario");

  if (!idSolicitante || !idFormulario) {
    return Response.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  try {
    const [solicitanteRows] = await pool.query(
      "SELECT * FROM solicitante WHERE idsolicitante = ?",
      [idSolicitante]
    );
    const [formularioRows] = await pool.query(
      `
     SELECT
  form_alquiler.idform_alquiler,
  form_alquiler.p1_detalles,
  form_alquiler.p2_publico,
  form_alquiler.p3_menores,
  form_alquiler.p4_convenio,
  form_alquiler.p5_campus,
  form_alquiler.p6_espacio,
  form_alquiler.p7_fechaInicio,
  form_alquiler.p7_fechaFin,
  form_alquiler.p7_horaInicio,
  form_alquiler.p7_horaFin,
  form_alquiler.p8_asistentes,
  form_alquiler.p9_anexo,
  campus.nombre AS campus_nombre,
  espacio.nombre AS espacio_nombre
FROM form_alquiler
JOIN campus ON campus.idcampus = form_alquiler.p5_campus
JOIN espacio ON espacio.idespacio = form_alquiler.p6_espacio
WHERE idform_alquiler = ?
    `,
      [idFormulario]
    );

    return Response.json({
      solicitante: solicitanteRows[0] || null,
      formulario: formularioRows[0] || null,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al obtener detalles" }, { status: 500 });
  }
}