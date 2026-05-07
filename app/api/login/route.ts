import { supabase } from "@/app/lib/Supabase";
import bcrypt from "bcrypt";
import { error } from "console";

export async function POST(req: Request) {
    const { identifier, password } = await req.json();

    const { data } = await supabase
        .from("users")
        .select("*")
        .or(`email.eq.${identifier},phone.eq.${identifier}`)
        .single();

    if (!data) {
        return Response.json({
            error: "User Not Found",
        }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, data.password);

    if (!valid) {
        return Response.json({
            error: "Wrong Password"
        }, { status: 400 });
    }

    return Response.json({ user: data })

}