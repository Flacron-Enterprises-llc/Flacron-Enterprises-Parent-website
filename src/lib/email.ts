import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

let cachedClient: SESv2Client | null = null;

function getClient(): SESv2Client {
  if (!cachedClient) {
    cachedClient = new SESv2Client({
      region: process.env.SES_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY as string,
      },
    });
  }
  return cachedClient;
}

export function isEmailConfigured(): boolean {
  return !!(
    process.env.SES_ACCESS_KEY_ID &&
    process.env.SES_SECRET_ACCESS_KEY &&
    process.env.SES_FROM_EMAIL
  );
}

export type SendEmailInput = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
};

/**
 * Sends a transactional email via AWS SES. No-ops with a console warning when
 * SES isn't configured, so flows that trigger email (like provisioning a
 * customer) don't hard-fail in environments without it set up.
 */
export async function sendEmail(input: SendEmailInput): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn(`[email] AWS SES not configured — skipping email to ${input.to}: "${input.subject}"`);
    return;
  }

  const fromEmail = process.env.SES_FROM_EMAIL as string;
  const fromName = process.env.SES_FROM_NAME || "Flacron Enterprises";
  const replyTo = process.env.SES_REPLY_TO;

  const command = new SendEmailCommand({
    FromEmailAddress: `${fromName} <${fromEmail}>`,
    Destination: {
      ToAddresses: [input.toName ? `${input.toName} <${input.to}>` : input.to],
    },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
    Content: {
      Simple: {
        Subject: { Data: input.subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: input.html, Charset: "UTF-8" },
        },
      },
    },
  });

  await getClient().send(command);
}
