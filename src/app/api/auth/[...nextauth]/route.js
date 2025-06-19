import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "../../../utils/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const [rows] = await pool.query(
          "SELECT * FROM user WHERE email = ? AND pass = ?",
          [credentials.email, credentials.password]
        );

        if (rows.length > 0) {
          const user = rows[0];
          return {
            id: user.iduser,
            name: user.email,
            email: user.email,
            rol: user.rol,
          };
        }

        return null;
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