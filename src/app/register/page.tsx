import { RegisterForm } from '@/components/auth/register-form';

export default async function SignUpPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <RegisterForm />
        </div>
    );
}
