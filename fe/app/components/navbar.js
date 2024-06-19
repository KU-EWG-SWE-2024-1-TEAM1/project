'use Client';
import Link from 'next/link';
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full bg-transparent shadow-md z-50">
            <ul className="flex justify-around items-center py-4 text-white">
                <li><Link href="/about">ABOUT</Link></li>
                <li><Link href="/recipes">RECIPES</Link></li>
                <li><Link href="/videos">VIDEOS</Link></li>
                <li>
                    <Link href="/">
                        <Image
                            src="/movieMovit.webp"
                            alt="logo"
                            width={100}
                            height={100}
                            className="opacity-30 hover:opacity-100 transition-opacity duration-300"
                        />
                    </Link>
                </li>
                <li><Link href="/cookbook">COOKBOOK</Link></li>
                <li><Link href="/press">PRESS</Link></li>
                <li><Link href="/contact">CONTACT</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;