'use client';

import { NewProductFormSchema } from '@/schemas/new-product-form-schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState, useTransition } from 'react';
import { PenLine } from 'lucide-react';
import { newProduct } from '@/actions/new-product';

export default function NewProductForm() {
    const form = useForm<z.infer<typeof NewProductFormSchema>>({
        resolver: zodResolver(NewProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            slug: '',
            image: undefined,
        },
    });

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = (values: z.infer<typeof NewProductFormSchema>) => {
        startTransition(async () => {
            const uint8Array = new Uint8Array(await values.image.arrayBuffer());
            const data = await newProduct({
                name: values.name,
                slug: values.slug,
                description: values.description,
                filename: values.image.name,
                uint8Array,
            });
            if (data.error) return setError(data.error);
            if (data.success) {
                setSuccess(data.success);
                form.reset();
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Введите название товара..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Введите описание товара..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Идентификатор</FormLabel>
                            <div className="flex">
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        className="rounded-r-[0]"
                                    ></Input>
                                </FormControl>
                                <Button
                                    className="px-2 rounded-l-[0]"
                                    onSubmit={event => event.preventDefault()}
                                >
                                    <PenLine />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({
                        field: { value: _, onChange, ...fieldProps },
                    }) => (
                        <FormItem>
                            <FormLabel>Изображение товара</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    placeholder="Picture"
                                    accept="image/webp"
                                    onChange={event =>
                                        onChange(
                                            event.target.files &&
                                                event.target.files[0],
                                        )
                                    }
                                    {...fieldProps}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <h2 key="res-message">{error}</h2>}
                {success && <h2 key="res-message">{success}</h2>}
                <Button disabled={isPending} type="submit" className="mt-4">
                    Создать товар
                </Button>
            </form>
        </Form>
    );
}
