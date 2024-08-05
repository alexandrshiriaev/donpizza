import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .string()
        .email('Введите корректную почту.')
        .min(1, 'Введите почту.'),
    password: z.string().min(1, 'Введите пароль.'),
});
