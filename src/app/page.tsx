import { auth } from '@/auth';
import { LogoutButton } from '@/components/auth/logout-button';

export default async function Home() {
    const session = await auth();
    console.log(session);
    return (
        <div>
            {session?.user?.email
                ? session?.user?.email
                : 'Вы не авторизованы.'}
            {session && <LogoutButton />}
        </div>
    );
}
