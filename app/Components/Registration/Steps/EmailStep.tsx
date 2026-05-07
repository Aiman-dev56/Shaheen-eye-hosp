"use client";

import Button from "../../UI/Button";
import Typography from "../../UI/Typography";
import toast from "react-hot-toast";

interface Props {
    name: string;
    email: string;
    onChange: (val: string) => void;
    onBack: () => void;
    setStep: (step: "otp") => void; // 👈 important
    setError: (err: string) => void;
    setLoading: (val: boolean) => void;
    loading: boolean;
    error: string;
}

export default function EmailStep({
    name,
    email,
    onChange,
    onBack,
    setStep,
    setError,
    setLoading,
    loading,
    error,
}: Props) {

    const handleSendOtp = async () => {
        if (!email) {
            toast.error("Email is required");
            return;
        }

        setLoading(true);
        setError("");

        const promise = fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        }).then(async (res) => {
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send OTP");
            }

            return data;
        });

        toast.promise(promise, {
            loading: "Sending OTP...",
            success: "OTP sent successfully 🎉",
            error: (err) => err.message,
        });

        try {
            await promise;

            setStep("otp"); // move to next step
        } catch (err: any) {
            setError(err.message); // optional (for UI)
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                onClick={onBack}
                className="text-muted text-sm self-start transition hover:text-primary"
            >
                Back
            </button>

            <Typography variant="h2" className="flex text-center justify-center m-4">Register Through Email</Typography>

            <input
                type="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />



            <Button
                type="button"
                onClick={handleSendOtp}
                disabled={!email || loading}
            >
                {loading ? "Sending..." : "Send OTP"}
            </Button>
        </div>
    );
}