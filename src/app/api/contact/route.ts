import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "imranlabs@yahoo.com";
  const from = process.env.CONTACT_FROM_EMAIL || "ImranX <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — falling back to console log only.",
    );
    console.log("[contact] Submission:", parsed.data);
    return NextResponse.json({ ok: true, mocked: true });
  }

  const { name, email, subject, message } = parsed.data;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <h2>${subject}</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
