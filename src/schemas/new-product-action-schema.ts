import { z } from 'zod';

export const NewProductActionSchema = z.object({
    name: z.string().min(1, {
        message: 'Введите название товара.',
    }),
    description: z.string().min(1, {
        message: 'Введите описание товара.',
    }),
    slug: z
        .string()
        .min(1, {
            message: 'Введите уникальный идентификатор.',
        })
        .regex(/^[a-z\-]+$/, {
            message:
                'Идентификатор товара может содержать только латинские буквы в нижнем регистре и дефисы.',
        }),
    image: z.custom<Buffer>(
        val => val instanceof Buffer,
        'Загрузите изображение товара.',
    ),
    filename: z
        .string()
        .min(1, {
            message: 'Укажите название файла.',
        })
        .refine(filename => filename.endsWith('.webp'), {
            message: 'Неверное расширение файла.',
        }),
});
