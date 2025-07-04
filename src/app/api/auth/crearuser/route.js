import { pool } from "@/app/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { correo, password } = await req.json();

    // Validación básica
    if (
      !correo ||
      !password ||
      !/@unicartagena\.edu\.co$/i.test(correo.trim())
    ) {
      return Response.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const [usuarios] = await pool.query(
      "SELECT iduser FROM user WHERE email = ?",
      [correo.trim().toLowerCase()]
    );
    if (usuarios.length > 0) {
      return Response.json({ error: "El usuario ya existe" }, { status: 409 });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Guardar el usuario
    await pool.query(
      "INSERT INTO user (email, pass) VALUES (?, ?)",
      [correo.trim().toLowerCase(), hash]
    );

    return Response.json({ ok: true, mensaje: "Usuario creado correctamente" });
  } catch (error) {
    return Response.json({ error: "Error al crear usuario" }, { status: 500 });
  }
}