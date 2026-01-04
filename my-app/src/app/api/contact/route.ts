import { NextResponse } from "next/server";
import { Resend } from "resend";


export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is missing in environment variables");
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

   
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "maisamabbas1272@gmail.com", 
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    
    await resend.emails.send({
      from: "Maisam Abbas <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me 👋",
      html: `
        <p>Hi ${name},</p>
        <p>I’ve received your message and will get back to you soon.</p>
        <br/>
        <blockquote>${message}</blockquote>
        <br/>
        <p>— Maisam</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}