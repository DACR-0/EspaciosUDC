import { pool } from "@/app/utils/db";

// GET: listar todos los campus
export async function GET() {
  const [rows] = await pool.query("SELECT * FROM campus");
  return Response.json(rows);
}

// POST: crear un campus
export async function POST(request) {
  const { nombre, imagen } = await request.json();
  const [result] = await pool.query(
    "INSERT INTO campus (nombre, imagen) VALUES (?, ?)",
    [nombre, imagen]
  );
  return Response.json({ id: result.insertId, nombre, imagen });
}

// PUT: editar un campus
export async function PUT(request) {
  const { id, nombre, imagen } = await request.json();
  await pool.query(
    "UPDATE campus SET nombre = ?, imagen = ? WHERE idcampus = ?",
    [nombre, imagen, id]
  );
  return Response.json({ id, nombre, imagen });
}

// DELETE: eliminar un campus
export async function DELETE(request) {
  const { id } = await request.json();
  await pool.query("DELETE FROM campus WHERE idcampus = ?", [id]);
  return Response.json({ success: true });
}