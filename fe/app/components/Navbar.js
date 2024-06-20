"use client";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-2 w-full bg-white shadow-md z-50 opacity-80 hover:opacity-100 transition-opacity duration-150">
      <ul className="flex justify-around items-center py-1 text-black">
        <li>
          <Link
            href="/movie"
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            MOVIES
          </Link>
        </li>
        <li>
          <Link
            href="/post"
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            POSTS
          </Link>
        </li>
        <li className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
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
        <li>
          <Link
            href="/signup"
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            SIGN UP
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            LOGIN
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
