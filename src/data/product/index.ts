import prisma from '@/data/client';
import { CreateProductDto } from '@/data/product/create-product-dto';
import { getProductTypeById, getProductTypeBySlug } from '@/data/product-type';

export async function getAllProducts() {
    return prisma.product.findMany();
}

export async function createProduct(createProductDto: CreateProductDto) {
    const { slug, name, productTypeId, image, description } = createProductDto;

    const productType = await getProductTypeById(productTypeId);

    if (!productType) return null;

    const product = await prisma.product.create({
        data: {
            slug,
            name,
            description,
            image,
            productTypeId,
        },
    });

    return product;
}

export async function getProductsByProductTypeSlug(slug: string) {
    const productType = await getProductTypeBySlug(slug);
    return productType?.products;
}
