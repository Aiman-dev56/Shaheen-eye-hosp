"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/app/lib/Supabase";

import ChooseStep from "./Steps/ChooseStep";
import EmailStep from "./Steps/EmailStep";
import PhoneStep from "./Steps/PhoneStep";
import StepOtp from "./Steps/StepOtp";

type Step = "choose" | "email" | "phone" | "otp";
type Mode = "email" | "phone";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const OTP_LENGTH = 6;

export default function AuthModal({ isOpen, onClose }: Props) {
    const [name, setName] = useState("");
    const [mounted, setMounted] = useState(false);

    const initialOtp = Array.from({ length: OTP_LENGTH }, () => "");

    const [step, setStep] = useState<Step>("choose");
    const [mode, setMode] = useState<Mode>("email");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [otp, setOtp] = useState<string[]>(initialOtp);

    const [countDown, setCountDown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => setMounted(true), []);

    // OTP timer
    useEffect(() => {
        if (step !== "otp") return;

        setCountDown(60);
        setCanResend(false);

        const timer = setInterval(() => {
            setCountDown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [step]);

    const reset = () => {
        setStep("choose");
        setEmail("");
        setPhone("");
        setOtp(initialOtp);
        setError("");
        setLoading(false);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, "");
        return digits.startsWith("92") ? `+${digits}` : `+92${digits}`;
    };

    // 📧 SEND OTP
    const handleSendOtp = async () => {
        setLoading(true);
        setError("");

        const payload =
            mode === "email"
                ? { email }
                : { phone: formatPhone(phone) };

        const { error } = await supabase.auth.signInWithOtp({
            ...payload,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: window.location.origin
            }
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setOtp(initialOtp);
        setStep("otp");
        setLoading(false);
    };

    // 🔢 VERIFY OTP
    const handleVerifyOtp = async () => {
        const token = otp.join("");

        if (token.length !== OTP_LENGTH) {
            setError("Enter full OTP");
            return;
        }

        setLoading(true);
        setError("");

        let result;

        if (mode === "email") {
            result = await supabase.auth.verifyOtp({
                email,
                token,
                type: "email",
            });
        } else {
            result = await supabase.auth.verifyOtp({
                phone: formatPhone(phone),
                token,
                type: "sms",
            });
        }

        const { error } = result;

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        handleClose();
    };

    const handleResend = async () => {
        setOtp(initialOtp);
        await handleSendOtp();
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* modal */}
            <div className="relative z-10 bg-white rounded-2xl w-full max-w-md p-8">

                {step === "choose" && (
                    <ChooseStep
                        onGoogle={async () => {
                            await supabase.auth.signInWithOAuth({
                                provider: "google",
                                options: { redirectTo: window.location.origin }
                            });
                        }}
                        onEmail={() => {
                            setMode("email");
                            setStep("email");
                        }}
                        onPhone={() => {
                            setMode("phone");
                            setStep("phone");
                        }}
                        onClose={handleClose}
                        error={error}
                    />
                )}

                {step === "email" && (
                    <EmailStep
                        name={name}
                        email={email}
                        onChange={setEmail}
                        onBack={() => setStep("choose")}
                        setStep={setStep}
                        setError={setError}
                        setLoading={setLoading}
                        loading={loading}
                        error={error}
                    />


                )}

                {step === "phone" && (
                    <PhoneStep
                        phone={phone}
                        onChange={setPhone}
                        onSubmit={handleSendOtp}
                        onBack={() => setStep("choose")}
                        error={error}
                        loading={loading}
                    />
                )}

                {step === "otp" && (
                    <StepOtp
                        otp={otp}
                        onChange={setOtp}
                        onBack={() => setStep("email")}
                        email={email}
                        setError={setError}
                        setLoading={setLoading}
                        loading={loading}
                        error={error}
                        handleClose={handleClose}

                    />
                )}
            </div>
        </div>,
        document.body
    );
}