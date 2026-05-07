"use client";

import Button from "../../UI/Button";
import Typography from "../../UI/Typography";

interface Props {
    phone: string;
    onChange: (val: string) => void;
    onBack: () => void;
    onSubmit: () => void;
    error: string;
    loading: boolean;
}

export default function PhoneStep({
    phone,
    onChange,
    onBack,
    onSubmit,
    loading,
    error,
}: Props) {
    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                onClick={onBack}
                className="text-muted text-sm self-start transition hover:text-primary"
            >
                Back
            </button>

            <Typography variant="h3">Enter Your Phone Number</Typography>

            <input
                type="tel"
                placeholder="+92 000 1234567"
                value={phone}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {error && (
                <Typography variant="body" className="text-danger">
                    {error}
                </Typography>
            )}

            <Button
                type="button"
                onClick={onSubmit}
                disabled={!phone || loading || phone.length < 10}
            >
                {loading ? "Sending..." : "Send OTP"}
            </Button>
        </div>
    );
}
