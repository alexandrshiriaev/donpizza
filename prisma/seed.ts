import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const pizzaProductType = await prisma.productType.upsert({
        where: {
            slug: 'pizzas',
        },
        update: {},
        create: {
            slug: 'pizzas',
            name: 'Пиццы',
        },
    });

    const cheesePizza = await prisma.product.upsert({
        where: {
            slug: 'cheese-pizza',
        },
        update: {},
        create: {
            slug: 'cheese-pizza',
            image: 'https://donpizza.vercel.app/cheese.webp',
            name: 'Сырная пицца',
            productTypeId: '66a5ee19d6e1bd8bce70c06f',
            description:
                'Mozzarella, cheddar and parmesan cheeses, signature alfredo sauce',
        },
    });
}

main().then(async () => {
    await prisma.$disconnect();
});
