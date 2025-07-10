import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { prisma } from "../../../../lib/utils";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user.email || "",
          },
        });

        if (existingUser) {
          return true;
        } else {
          // Create new user
          await prisma.user.create({
            data: {
              email: user.email || "",
              name: user.name || "",
              image: user.image || "",
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        // Return true to allow sign in even if database operation fails
        return true;
      }
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
