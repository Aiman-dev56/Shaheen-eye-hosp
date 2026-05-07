import { supabase } from "@/app/lib/Supabase"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  const { email, name } = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await supabase.from("users").upsert({ email, name, provider: "email" });

  await supabase.from("otp_verifications").insert({
    email,
    otp,
    expires_at: new Date(Date.now() + 10 * 60 * 1000),
  });

  await transporter.sendMail({
    to: email,
    subject: "OTP Code",
    html: `<h2>Your OTP: ${otp}</h2>`,
  });

  return Response.json({ success: true });
}