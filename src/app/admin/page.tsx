import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import NewProductForm from '@/components/admin-dashboard/new-product/new-product-form';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/shadcnui/card';

export default async function AdminPage() {
    const session = await auth();

    if (!session) return redirect('/login');
    if (session?.user?.role !== 'ADMIN') return redirect('/');

    return (
        <>
            <main className="flex justify-center w-full pt-16">
                <Card className="max-w-96 ">
                    <CardHeader>
                        <CardTitle>Создать новый товар</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NewProductForm />
                    </CardContent>
                </Card>
            </main>
            <footer>footer</footer>
        </>
    );
}
