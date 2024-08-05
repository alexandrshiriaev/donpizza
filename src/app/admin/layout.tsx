import Sidebar from '@/components/admin-dashboard/sidebar/sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-[300px_1fr] cols-">
            <Sidebar />
            <div>{children}</div>
        </div>
    );
}
