import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (payload.type !== "email.received") {
      return NextResponse.json({ ok: true });
    }

    const email = payload.data;

    // 🔁 Forward received email to YOU
    await resend.emails.send({
      from: "Inbox <onboarding@resend.dev>",
      to: ["dayalkhan555@gmail.com"],
      subject: `📩 New Email from ${email.from}`,
      html: `
        <h3>New Email Received</h3>
        <p><b>From:</b> ${email.from}</p>
        <p><b>To:</b> ${email.to}</p>
        <p><b>Subject:</b> ${email.subject}</p>
        <hr />
        ${email.html || `<pre>${email.text}</pre>`}
      `,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook failed:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
