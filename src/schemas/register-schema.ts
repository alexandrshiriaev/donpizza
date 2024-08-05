import { z } from 'zod';

export const RegisterSchema = z
    .object({
        email: z
            .string()
            .email('Введите корректную почту.')
            .min(1, 'Введите почту.'),
        password: z
            .string()
            .min(1, 'Введите пароль.')
            .min(8, 'Пароль должен содердать не меньше 8 символов.')
            .max(32, 'Пароль должен содержать не более 32 символов.'),
        confirm: z.string().min(1, 'Подтвердите пароль.'),
    })
    .refine(data => data.password === data.password);
