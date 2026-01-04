import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // 🔑 ENV CHECK (Vercel-safe)
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY missing" },
        { status: 500 }
      );
    }

    if (!contactEmail) {
      return NextResponse.json(
        { error: "CONTACT_EMAIL missing" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 📩 Request body
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 📬 Email to YOU
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    // 📬 Auto-reply to USER
    await resend.emails.send({
      from: "Maisam Abbas <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me 👋",
      html: `
        <p>Hi ${name},</p>
        <p>I’ve received your message and will get back to you soon.</p>
        <br />
        <blockquote>${message}</blockquote>
        <br />
        <p>— Maisam</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
