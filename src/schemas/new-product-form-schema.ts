import { z } from 'zod';

export const NewProductFormSchema = z.object({
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
    image: z
        .custom<File>(
            val => val instanceof File,
            'Загрузите изображение товара.',
        )
        .refine(file => file.type === 'image/webp', {
            message: 'Загрузите изображение в формате "*.webp".',
        }),
});
