import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub!;
      return session;
    },

    async jwt({ token, user, trigger, session }) {
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
