import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/utils";
import { UserCredentials } from "../../../../lib/utils";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "mark" },
        email: { label: "Email", type: "text", placeholder: "mark@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: UserCredentials | undefined) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!user) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          // Return user with id as string for NextAuth compatibility
          return {
            ...user,
            id: String(user.id),
          };
        } catch (error) {
          const err = error as Error;
          throw new Error(err.message);
        }
      },
    }),
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
          await prisma.user.create({
            data: {
              email: user.email || "",
              name: user.name || "",
              image: user.image || "",
              password: "",
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/options`;
    },
  },
};
