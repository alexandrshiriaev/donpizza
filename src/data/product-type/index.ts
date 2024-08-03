import prisma from '@/data/clients/prisma';

export async function getAllProductTypes() {
    return prisma.productType.findMany();
}

export async function getProductTypeById(id: string) {
    return prisma.productType.findFirst({
        where: {
            id,
        },
    });
}

export async function getProductTypeBySlug(slug: string) {
    return prisma.productType.findFirst({
        where: {
            slug,
        },
        include: {
            products: true,
        },
    });
}
