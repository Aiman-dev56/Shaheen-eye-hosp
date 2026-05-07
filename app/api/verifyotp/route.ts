// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//     process.env.SUPABASE_SERVICE_KEY as string
// );

// export async function POST(request: Request) {
//     try {
//         const { email, otp } = await request.json();

//         const { data } = await supabase
//             .from('otp_verifications')
//             .select('*')
//             .eq('email', email)
//             .eq('otp', otp)
//             .eq('verified', false)
//             .gt('expires_at', new Date().toISOString())
//             .single();

//         if (!data) {
//             return Response.json(
//                 { error: 'Invalid or Expired OTP' },
//                 { status: 400 }
//             );
//         }

//         await supabase
//             .from('otp_verifications')
//             .update({ verified: true })
//             .eq('id', data.id);

//         await supabase
//             .from('users')
//             .update({ is_verified: true })
//             .eq('email', email);

//         return Response.json({ message: "Verified Successfully" });

//     } catch (err: any) {
//         console.error(err);
//         return Response.json(
//             { error: 'Verification failed' },
//             { status: 500 }
//         );
//     }
// }

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