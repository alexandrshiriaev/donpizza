import { LoginForm } from '@/components/auth/login-form';

export default async function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <LoginForm />
        </div>
    );
}
