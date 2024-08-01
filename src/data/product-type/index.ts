import prisma from '@/data/client';

export async function getAllProductTypes() {
    return prisma.productType.findMany();
}

export async function getProductTypeById(id: string) {
    return prisma.productType.findUnique({
        where: {
            id,
        },
    });
}

export async function getProductTypeBySlug(slug: string) {
    return prisma.productType.findUnique({
        where: {
            slug,
        },
        include: {
            products: true,
        },
    });
}
