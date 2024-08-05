import Image from 'next/image';
import logo from '@/../public/logo.svg';
import { cn } from '@/lib/utils';

export default function Logo({ className }: React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={cn('flex gap-1 items-center', className)}>
            <Image src={logo} alt="DonPizza" className="w-12" />
            <span className="text-xl font-semibold">DonPizza</span>
        </div>
    );
}
