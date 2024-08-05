import React from 'react';
import Link from 'next/link';

export type SidebarNavItem = {
    value: string;
    icon: React.JSX.Element;
    href: string;
};

type SidebarNavProps = {
    items: SidebarNavItem[];
};

export default function SidebarNav({
    items,
    className,
}: SidebarNavProps & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={className}>
            {items.map(item => (
                <Link
                    href={item.href}
                    key={item.value}
                    className="flex gap-x-1"
                >
                    {item.icon}
                    <span>{item.value}</span>
                </Link>
            ))}
        </div>
    );
}
