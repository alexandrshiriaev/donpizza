import prisma from '@/data/clients/prisma';
import { CreateProductDto } from '@/data/product/create-product-dto';
import { getProductTypeBySlug } from '@/data/product-type';

export async function getAllProducts() {
    return prisma.product.findMany();
}

export async function createProduct(createProductDto: CreateProductDto) {
    const { slug, name, productTypeSlug, image, description } =
        createProductDto;

    const productType = await getProductTypeBySlug(productTypeSlug);

    if (!productType) return null;

    const product = await prisma.product.create({
        data: {
            slug,
            name,
            description,
            image,
            productTypeId: productType.id,
        },
    });

    return product;
}

export async function getProductsByProductTypeSlug(slug: string) {
    const productType = await getProductTypeBySlug(slug);
    return productType?.products;
}
