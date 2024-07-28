'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export async function login(
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Неверные значения полей.' };
    }

    const { email, password } = validatedFields.data;
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            redirect: true,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Неверный логин или пароль.' };
                default:
                    return { error: 'Что-то пошло не так :(' };
            }
        }
        throw error;
    }

    return {
        success: 'Успешный вход',
    };
}
