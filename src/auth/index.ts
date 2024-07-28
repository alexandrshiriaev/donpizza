import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { comparePasswords } from '@/lib/password';

const authConfig = {
    providers: [
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
    ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
