import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("resend-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

   
    const body = await req.text();

    
    type ResendWebhookEvent = {
      type: string;
      data: {
        from?: string;
        subject?: string;
        html?: string | null;
        text?: string | null;
      };
    };

    const event = resend.webhooks.verify({
      payload: body,
      signature,
      secret: WEBHOOK_SECRET,
    } as any) as ResendWebhookEvent;

  
    if (event.type === "email.received") {
      const email = event.data;

      await resend.emails.send({
        from: "Inbox <onboarding@resend.dev>",
        to: ["dayalkhan555@gmail.com"],
        subject: `📩 New Email from ${email.from}`,
        html: `
          <p><b>From:</b> ${email.from}</p>
          <p><b>Subject:</b> ${email.subject}</p>
          <hr />
          ${email.html || `<pre>${email.text}</pre>`}
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return NextResponse.json(
      { error: "Invalid webhook" },
      { status: 400 }
    );
  }
}
