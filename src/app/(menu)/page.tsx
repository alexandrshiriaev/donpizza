import Image from 'next/image';

import { getAllProductTypes } from '@/data/product-type';
import { getProductsByProductTypeSlug } from '@/data/product';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/shadcnui/card';

export default async function MenuPage() {
    const productTypes = await getAllProductTypes();
    const productsByTypes = await Promise.all(
        productTypes.map(
            async type => await getProductsByProductTypeSlug(type.slug),
        ),
    );
    return (
        <div>
            {productsByTypes.map(products =>
                products?.map(product => (
                    <Card key={product.slug}>
                        <CardHeader>
                            <Image
                                src="https://storage.yandexcloud.net/donpizza-media/1.webp"
                                width={250}
                                height={250}
                                alt="product image"
                            />
                        </CardHeader>
                        <CardContent>
                            <p>{product.description}</p>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                )),
            )}
        </div>
    );
}
