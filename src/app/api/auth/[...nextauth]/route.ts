import { UserModel } from "@/lib/models";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 10,
  },
  callbacks: {
    async redirect() {
      return "/monitor";
    },
    async signIn({ user }) {
      const existingUser = await UserModel.findOne({
        name: user.name,
        email: user.email,
      });
      if (existingUser) {
        return true;
      }
      UserModel.create({
        name: user.name,
        email: user.email,
      });
      return true;
    },
  },
});

export { handler as GET, handler as POST };
