import { LoginForm } from '@/components/auth/login-form';
import { Suspense } from 'react';

export default async function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
