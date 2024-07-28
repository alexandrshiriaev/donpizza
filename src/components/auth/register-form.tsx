'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcnui/form';
import { Input } from '@/components/shadcnui/input';
import { Button } from '@/components/shadcnui/button';

import { RegisterSchema } from '@/schemas';
import { register } from '@/actions/register';

export function RegisterForm() {
    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(async () => {
            const data = await register(values);
            if (data.success) setSuccess(data.success);
            if (data.error) setError(data.error);
        });

        form.reset();
        setSuccess('');
        setError('');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@donpizza.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password..."
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Подтвердите пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password..."
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <h2 key="res-message">{error}</h2>}
                {success && <h2 key="res-message">{success}</h2>}
                <Button
                    disabled={isPending}
                    variant="outline"
                    type="submit"
                    className="mt-4"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Form>
    );
}
