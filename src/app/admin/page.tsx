import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
    const session = await auth();

    if (!session) return redirect('/login');
    if (session?.user?.role !== 'ADMIN') return redirect('/');

    return (
        <>
            <aside></aside>
            <main>main</main>
            <footer>footer</footer>
        </>
    );
}
