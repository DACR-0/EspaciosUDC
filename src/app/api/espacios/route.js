import { pool } from "@/app/utils/db";

// GET: listar todos los espacios (puedes filtrar por campus_id si lo deseas)
export async function GET(request) {
  const url = new URL(request.url);
  const campus_id = url.searchParams.get("campus_id");
  let query = "SELECT * FROM espacio";
  let params = [];
  if (campus_id) {
    query += " WHERE campus_id = ?";
    params.push(campus_id);
  }
  const [rows] = await pool.query(query, params);
  return Response.json(rows);
}

// POST: crear un espacio
export async function POST(request) {
  try {
    const { nombre, imagen, capacidad, campus_id } = await request.json();
    if (!nombre || !campus_id) {
      return Response.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }
    const [result] = await pool.query(
      "INSERT INTO espacio (nombre, imagen, capacidad, campus_id) VALUES (?, ?, ?, ?)",
      [nombre, imagen, capacidad, campus_id]
    );
    return Response.json({ id: result.insertId, nombre, imagen, capacidad, campus_id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT: editar un espacio
export async function PUT(request) {
  const { id, nombre, imagen, capacidad, campus_id } = await request.json();
  await pool.query(
    "UPDATE espacio SET nombre = ?, imagen = ?, capacidad = ?, campus_id = ? WHERE idespacio = ?",
    [nombre, imagen, capacidad, campus_id, id]
  );
  return Response.json({ id, nombre, imagen, capacidad, campus_id });
}

// DELETE: eliminar un espacio
export async function DELETE(request) {
  const { id } = await request.json();
  await pool.query("DELETE FROM espacio WHERE idespacio = ?", [id]);
  return Response.json({ success: true });
}