import { hashSync, compareSync } from 'bcrypt-ts';

export function saltAndHashPassword(password: string) {
    return hashSync(password, 8);
}

export function comparePasswords(
    first_password: string,
    second_password: string,
) {
    return compareSync(first_password, second_password);
}
