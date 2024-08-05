import React from 'react';
import SidebarNav, {
    SidebarNavItem,
} from '@/components/admin-dashboard/sidebar/sidebar-nav';
import { Package } from 'lucide-react';
import Logo from '@/components/logo';
import Link from 'next/link';

const navItems: SidebarNavItem[] = [
    {
        href: '/admin/products',
        value: 'Товары',
        icon: <Package />,
    },
];

export default function Sidebar() {
    return (
        <div className="min-h-screen border-r">
            <Link href="/">
                <Logo className="border-b p-2" />
            </Link>
            <SidebarNav className="p-2" items={navItems} />
            <div>footer</div>
        </div>
    );
}
