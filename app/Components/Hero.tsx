"use client";

import { Images } from "@/public/Images/Images";
import Image from "next/image";
import Typography from "./UI/Typography";
import Button from "./UI/Button";

export default function Hero() {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden">
            <div className="relative h-full w-full">
                <Image
                    src={Images.Hero}
                    alt="Hospital hero section"
                    height={900}
                    width={1600}
                    className="object-cover w-full"
                />
                <div className="absolute inset-0 bg-[#16332e]/60" />

                <div className="absolute inset-0 z-10 flex items-center">
                    <div className="mx-auto w-full max-w-7xl px-6 pt-20">
                        <div className="max-w-2xl space-y-5 text-white">
                            <Typography variant="label" className="uppercase tracking-[0.3em] text-secondary">
                                Trusted Care For Every Family
                            </Typography>
                            <Typography variant="h1" className="text-5xl font-bold leading-tight text-white">
                                Advanced Healthcare With Compassionate Doctors
                            </Typography>
                            <Typography variant="body" className="max-w-xl text-lg text-white/90">
                                Get expert consultations, modern treatments, and round-the-clock support in one place.
                            </Typography>
                            <div className="flex gap-4">
                                <Button type="button">Book Appointment</Button>
                                <Button type="button" variant="outline" className="border-white text-white hover:bg-white/10">
                                    Explore Services
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
