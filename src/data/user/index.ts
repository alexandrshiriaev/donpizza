import { CreateUserDto } from '@/data/user/create-user-dto';
import { saltAndHashPassword } from '@/lib/password';
import prisma from '@/data/clients/prisma';

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({ where: { email: email } });
    return user;
}

export async function createNewUser({ email, password }: CreateUserDto) {
    let user = await getUserByEmail(email);
    if (user) return null;

    password = saltAndHashPassword(password);

    user = await prisma.user.create({
        data: {
            email,
            password,
        },
    });

    return user;
}
