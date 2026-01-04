export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 📩 Email to YOU
    await resend.emails.send({
      from: `Portfolio <${contactEmail}>`,
      to: contactEmail,
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    // 📩 Auto-reply to USER
    await resend.emails.send({
      from: `Portfolio <${contactEmail}>`,
      to: email,
      subject: "Thanks for contacting me 👋",
      html: `
        <p>Hi ${name},</p>
        <p>I’ve received your message and will get back to you soon.</p>
        <br />
        <p>— Maisam</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }
}
