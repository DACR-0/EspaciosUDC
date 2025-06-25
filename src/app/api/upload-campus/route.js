import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Generar nombre único
  const ext = path.extname(file.name);
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "campus");

  // Crear carpeta si no existe
  await mkdir(uploadDir, { recursive: true });

  // Guardar archivo
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadDir, uniqueName);
  await writeFile(filePath, buffer);

  return NextResponse.json({ fileName: uniqueName });
}