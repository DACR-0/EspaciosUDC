import { pool } from "@/app/utils/db";

export async function POST(request) {
  const data = await request.json();
  console.log("Datos recibidos:", data);

  // 1. Insertar en solicitante
  let idSolicitante = null;
  try {
    const [solicitanteResult] = await pool.query(
      `INSERT INTO solicitante 
        (nombre, tipo_doc, documento_indentidad, entidad, cargo_entidad, telefono, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.tipoDocumento,
        data.identificacion,
        data.organizacion,
        data.cargo,
        data.telefono,
        data.correo,
      ]
    );
    idSolicitante = solicitanteResult.insertId;
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al guardar solicitante" }), { status: 500 });
  }

  // 2. Insertar en form_alquiler
  let idFormAlquiler = null;
  try {
    // Lógica para guardar archivos solo si la respuesta es "si" y hay archivo
    const convenioAnexo = (data.convenio === "si" && data.convenioArchivo) ? data.convenioArchivo : null;
    const archivoAdicionalAnexo = (data.archivoAdicional === "si" && data.archivoAdicionalFile) ? data.archivoAdicionalFile : null;

    const [formResult] = await pool.query(
      `INSERT INTO form_alquiler 
        (p1_detalles, p2_publico, p3_menores, p4_convenio, p5_campus, p6_espacio, p7_fechaInicio, p7_fechaFin, p7_horaInicio, p7_horaFin, p8_asistentes, p9_anexo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.detalleActividad,
        Array.isArray(data.publico) ? data.publico.join(",") : data.publico,
        data.menores,
        convenioAnexo,
        data.campus,
        data.espacio,
        data.fechaHora?.fechaInicio,
        data.fechaHora?.fechaFin,
        data.fechaHora?.horaInicio,
        data.fechaHora?.horaFin,
        data.asistentes,
        archivoAdicionalAnexo,
      ]
    );
    idFormAlquiler = formResult.insertId;
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al guardar formulario de alquiler" }), { status: 500 });
  }

  // 3. Insertar en reserva
  try {
    await pool.query(
      `INSERT INTO reserva (id_solicitante, tipo_solicitud, id_formulario, estado)
       VALUES (?, ?, ?, ?)`,
      [
        idSolicitante,
        data.tipo,
        idFormAlquiler,
        "pendiente"
      ]
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al guardar reserva" }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}