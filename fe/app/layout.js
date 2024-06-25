import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "@/components/footer";
import ClientProvider from "@/app/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Movie Movit",
    description: "Anything about Movies",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientProvider>
                <Navbar />
                {children}
                </ClientProvider>
                <Footer />
            </body>
        </html>
    );
}
