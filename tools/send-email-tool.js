import "dotenv/config";
import { tool } from "@openai/agents";
import { Resend } from "resend";
import { z } from "zod";

export const sendEmailTool = tool({
  name: "send_email",
  description: "Sends email to the given email id with subject and body",
  parameters: z.object({
    from: z.string().describe("email address of 'from'"),
    to: z.array(z.string()).describe("email address of 'to'"),
    subject: z.string().describe("subject for the email"),
    html: z.string().describe("body of the email in html format"),
  }),
  execute: async ({ from, to, subject, html }) => {
    console.log(
      `🛠️ Sending email to ${Array.isArray(to) ? to.join(", ") : to}`
    );

    // Check if RESEND_API_KEY is set
    if (!process.env.RESEND_API_KEY) {
      const errorMsg = "RESEND_API_KEY is not set in environment variables";
      console.error("❌", errorMsg);
      return errorMsg;
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });

      if (error) {
        console.error("❌ Email sending failed:", error);
        return `Failed to send email: ${JSON.stringify(error)}`;
      }

      console.log("✅ Email sent successfully", data);
      return `Email sent successfully to ${
        Array.isArray(to) ? to.join(", ") : to
      }. Email ID: ${data?.id || "unknown"}`;
    } catch (err) {
      console.error("❌ Unexpected error sending email:", err);
      return `Failed to send email: ${err.message}`;
    }
  },
});
