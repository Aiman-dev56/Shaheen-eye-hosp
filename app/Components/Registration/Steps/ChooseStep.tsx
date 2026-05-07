"use client";

import Button from "../../UI/Button";
import Typography from "../../UI/Typography";
import { CgCloseO } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";

interface Props {
    onEmail: () => void;
    onPhone: () => void;
    onGoogle: () => void | Promise<void>;
    onClose: () => void;
    error: string;

    appleEnabled?: boolean;
    googleEnabled?: boolean;
}

export default function ChooseStep({
    onEmail,
    onPhone,
    onGoogle,
    onClose,
    error,
    appleEnabled = true,
    googleEnabled = true,
}: Props) {
    return (
        <div className="flex flex-col gap-6">

            {/* Close */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-900 transition"
                >
                    <CgCloseO size={24} />
                </button>
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center gap-2">
                <Typography variant="h1">
                    Login Yourself First
                </Typography>

                <Typography variant="p" className="text-center">
                    Choose your preferred method to login
                </Typography>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">

                <Button
                    type="button"
                    variant="outline"
                    onClick={onEmail}
                    className="flex items-center justify-center gap-2"
                >
                    <MdEmail size={20} />
                    Continue with Email
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={onPhone}
                    className="flex items-center justify-center gap-2"
                >
                    <IoMdPhonePortrait size={20} />
                    Continue with Phone
                </Button>

                <div className="flex items-center gap-2 my-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <Typography variant="p" className="text-gray-500">
                        Or
                    </Typography>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>


                {googleEnabled && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onGoogle}
                        className="flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={20} />
                        Continue with Google
                    </Button>
                )}

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}