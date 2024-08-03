import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { comparePasswords } from '@/lib/password';
import { Role } from '@prisma/client';

declare module 'next-auth' {
    interface Session {
        user: {
            role: Role;
        } & DefaultSession['user'];
    }
}

const providers = [
    Credentials({
        credentials: {
            email: {},
            password: {},
        },
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (!validatedFields.success) return null;

            const { email, password } = validatedFields.data;

            const user = await getUserByEmail(email);
            if (
                !user ||
                !user.password ||
                !comparePasswords(password, user.password)
            ) {
                return null;
            }

            return user;
        },
    }),
];

const authConfig = {
    providers: providers,
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token?.role || 'USER',
                },
            };
        },
        async jwt({ token }) {
            if (!token.email) return token;
            const existingUser = await getUserByEmail(token.email);
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
