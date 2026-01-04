import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * IMPORTANT:
 * Resend Edge runtime support nahi karta
 * is liye Node.js runtime force karna zaroori hai
 */
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 🔑 ENV VARIABLES
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 📧 Resend client
    const resend = new Resend(apiKey);

    // 📩 Request body
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    // ✅ SINGLE, SAFE EMAIL (production friendly)
    await resend.emails.send({
      from: `Portfolio <${contactEmail}>`,
      to: contactEmail,
      subject: `New Contact Message from ${name}`,
      replyTo: `${name} <${email}>`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR 👉", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
