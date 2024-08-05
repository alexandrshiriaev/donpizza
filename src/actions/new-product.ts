'use server';

import s3Client from '@/data/clients/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { CreateProductDto } from '@/data/product/create-product-dto';
import { createProduct } from '@/data/product';
import { NewProductActionSchema } from '@/schemas';

export async function newProduct(values: {
    name: string;
    slug: string;
    description: string;
    uint8Array: Uint8Array;
    filename: string;
}) {
    const normalizedImage = Buffer.from(values.uint8Array);

    const validatedFields = NewProductActionSchema.safeParse({
        ...values,
        image: normalizedImage,
    });

    if (!validatedFields.success) {
        return { error: 'Неверные значения полей.' };
    }

    const { image, slug, name, description, filename } = validatedFields.data;

    await s3Client.send(
        new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: filename,
            Body: image,
        }),
    );

    const createProductDto: CreateProductDto = {
        name,
        slug,
        description,
        productTypeSlug: 'pizzas',
        image: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${filename}`,
    };

    const product = await createProduct(createProductDto);
    if (product) return { success: 'Новый товар успешно создан.' };
    else return { error: 'Что-то пошло не так :(' };
}
