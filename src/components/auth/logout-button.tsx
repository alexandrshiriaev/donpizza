'use client';

import { Button } from '@/components/shadcnui/button';

import { logout } from '@/actions/logout';

export function LogoutButton() {
    return (
        <Button onClick={async () => await logout()} variant="outline">
            Выйти
        </Button>
    );
}
