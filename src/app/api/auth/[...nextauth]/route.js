import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "../../../utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Buscar usuario solo por email
        const [rows] = await pool.query(
          "SELECT * FROM user WHERE email = ?",
          [credentials.email]
        );

        if (rows.length === 0) {
          return null;
        }

        const user = rows[0];

        // Comparar la contraseña ingresada con el hash almacenado
        const passwordOk = await bcrypt.compare(credentials.password, user.pass);

        if (!passwordOk) {
          return null;
        }

        return {
          id: user.iduser,
          name: user.email,
          email: user.email,
          rol: user.rol,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Exporta los métodos HTTP requeridos por Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };