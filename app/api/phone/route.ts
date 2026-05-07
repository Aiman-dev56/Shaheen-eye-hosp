import { supabase } from "@/app/lib/Supabase";

export async function POST(req: Request) {
    const { email, otp } = await req.json();

    const { data } = await supabase
        .from("otp_verifications")
        .select("*")
        .eq("email", email)
        .eq("otp", otp)
        .single();

    if (!data) {
        return Response.json({ error: "Invalid OTP" }, { status: 400 });
    }

    await supabase
        .from("users")
        .update({ is_verified: true })
        .eq("email", email);

    return Response.json({ success: true });
}