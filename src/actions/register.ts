'use server';

import { z } from 'zod';

import { RegisterSchema } from '@/schemas';
import { createNewUser } from '@/data/user';

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: 'Неверные значения полей.',
        };
    }

    const { email, password } = validatedFields.data;

    const user = await createNewUser({ email, password: password });

    if (!user)
        return {
            error: 'Пользователь с таким email уже существует.',
        };

    return {
        success: 'Пользователь успешно создан.',
    };
}
