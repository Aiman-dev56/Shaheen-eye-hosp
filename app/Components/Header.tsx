"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Images } from "@/public/Images/Images";
import { useAuth } from "../Context/AuthContext";
import AuthModel from "./Registration/AuthModel";
import Button from "./UI/Button";
import Links from "./UI/Links";
import Typography from "./UI/Typography";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { user, loading, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className="fixed top-0 left-0 z-50 w-full">
                <div className="flex h-6 w-full items-center justify-center gap-8 bg-background text-primary">
                    <Typography variant="label" className="flex items-center justify-center gap-2">
                        <FaPhone size={20} />
                        Contact Us: +91-9876543210
                    </Typography>
                    <Typography variant="label" className="flex items-center justify-center gap-2">
                        <MdEmail size={20} />
                        Email: m.jamalkhan54@gmail.com
                    </Typography>
                </div>

                <div
                    className={`flex h-22 w-full items-center justify-between px-8 text-background transition-all duration-300 ${scrolled
                            ? "bg-gradient-to-r from-[#3b0963] to-[#754e9f]"
                            : "bg-transparent text-primary shadow-lg"
                        }`}
                >
                    <div>
                        <Links href="/">
                            <Image
                                src={Images.Logo}
                                alt="Logo"
                                width={80}
                                height={80}
                                className="h-auto w-20"
                            />
                        </Links>
                    </div>

                    <nav className="text-purple-500">
                        <ul className="flex gap-8">
                            <Links href="#">About</Links>
                            <Links href="#">Services</Links>
                            <Links href="#">Treatments</Links>
                            <Links href="#">Doctors</Links>
                            <Links href="#">Contact</Links>
                        </ul>
                    </nav>

                    {loading ? (
                        <Button type="button" disabled>
                            Loading...
                        </Button>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <Typography variant="label" className={scrolled ? "text-white" : "text-primary"}>
                                {user.email ?? "Signed in"}
                            </Typography>
                            <Button type="button" variant="outline" onClick={() => void signOut()}>
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button type="button" onClick={() => setModalOpen(true)}>
                            Book Appointment
                        </Button>
                    )}
                </div>
            </header>

            <AuthModel
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}
