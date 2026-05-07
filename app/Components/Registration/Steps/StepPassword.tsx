"use client";

import Button from "../../UI/Button";
import Typography from "../../UI/Typography";

interface Props {
    password: string;
    confirmPassword: string;
    onPasswordChange: (val: string) => void;
    onConfirmChange: (val: string) => void;
    onSubmit: () => void;
    loading: boolean;
    error: string;
}

export default function StepPassword({
    password,
    confirmPassword,
    onPasswordChange,
    onConfirmChange,
    onSubmit,
    loading,
    error
}: Props) {
    return (
        <div className="flex flex-col gap-4 items-center">

            <Typography variant="h2" className="text-center">Set Your Password</Typography>
            <Typography variant="p" className="text-center">Create password for your account</Typography>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => onConfirmChange(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            <Button type="button" onClick={onSubmit}
                disabled={loading || password.length < 6 || password !== confirmPassword}
            >
                {loading ? "Saving..." : "Set Password & Continue"}
            </Button>


        </div>
    )
}