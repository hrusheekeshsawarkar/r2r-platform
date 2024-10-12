// 'use client'; // Use 'use client' directive for components with client-side interactivity

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb'; // MongoDB connection

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)
console.log(process.env.NEXTAUTH_SECRET)
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token, user }) {
      session.userId = user.id; // Add user ID to session
      return session;
    },
    async signIn({ account, profile }) {
        if (account.provider === "google") {
          return profile.email_verified && profile.email.endsWith("@gmail.com")
        }
        return true // Do different verification for other providers that don't have `email_verified`
      },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// 'use client'; // Use 'use client' directive for components with client-side interactivity

// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // You can add more providers here
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
