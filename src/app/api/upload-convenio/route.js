import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "convenios");

  // Crea la carpeta si no existe
  await import("fs/promises").then(fs => fs.mkdir(uploadDir, { recursive: true }));

  const filePath = path.join(uploadDir, uniqueName);
  await writeFile(filePath, buffer);

  return NextResponse.json({ fileName: uniqueName });
}