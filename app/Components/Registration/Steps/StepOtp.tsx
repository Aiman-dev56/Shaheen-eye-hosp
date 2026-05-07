"use client";

import { useEffect, useRef } from "react";
import Button from "../../UI/Button";
import Typography from "../../UI/Typography";

interface Props {
    otp: string[];
    onChange: (otp: string[]) => void;
    onBack: () => void;
    email: string; // 👈 important
    setError: (err: string) => void;
    setLoading: (val: boolean) => void;
    loading: boolean;
    error: string;
    handleClose: () => void; // 👈 close modal on success
}

export default function StepOtp({
    otp,
    onChange,
    onBack,
    email,
    setError,
    setLoading,
    loading,
    error,
    handleClose,
}: Props) {

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        otpRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        onChange(newOtp);

        if (value && index < otp.length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const token = otp.join("");

        if (token.length < 6) {
            setError("Enter full OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/verifyotp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp: token,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid OTP");
                return;
            }

            // ✅ SUCCESS
            alert("Email Verified Successfully!");
            handleClose();

        } catch (err) {
            setError("Verification failed");
        }

        setLoading(false);
    };

    const handleResend = async () => {
        setLoading(true);
        setError("");

        try {
            await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            alert("OTP Resent!");
        } catch {
            setError("Failed to resend OTP");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center gap-4">

            <button
                type="button"
                onClick={onBack}
                className="text-muted text-sm self-start"
            >
                Back
            </button>

            <Typography variant="h2">Verify OTP</Typography>

            <Typography>
                OTP sent to <strong>{email}</strong>
            </Typography>

            <div className="flex gap-3">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            otpRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 h-12 text-center border rounded-lg"
                    />
                ))}
            </div>

            <Button onClick={handleResend}>
                Resend OTP
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            <Button
                onClick={handleVerifyOtp}
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify"}
            </Button>
        </div>
    );
}