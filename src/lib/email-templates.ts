const SITE_URL = "https://flacronenterprises.com";
const LOGO_URL = `${SITE_URL}/logo.png`;

const COLORS = {
  navy: "#0f172a",
  orange: "#F97316",
  slate: "#475569",
  muted: "#94a3b8",
  border: "#e2e8f0",
  bg: "#f1f5f9",
  panel: "#f8fafc",
};

type LayoutInput = {
  previewText: string;
  bodyHtml: string;
};

/** Wraps body content in the shared Flacron header/footer chrome used by all transactional emails. */
export function emailLayout({ previewText, bodyHtml }: LayoutInput): string {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${previewText}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${COLORS.border};">
            <tr>
              <td style="background:#ffffff;padding:28px 32px;text-align:center;border-bottom:3px solid ${COLORS.orange};">
                <img src="${LOGO_URL}" alt="Flacron Enterprises" height="40" style="height:40px;width:auto;display:inline-block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background:${COLORS.panel};padding:24px 32px;border-top:1px solid ${COLORS.border};">
                <p style="margin:0 0 8px;color:${COLORS.navy};font-size:13px;font-weight:bold;">Flacron Enterprises</p>
                <p style="margin:0 0 12px;color:${COLORS.muted};font-size:12px;line-height:1.6;">
                  Smart solutions. Endless possibilities.
                </p>
                <p style="margin:0 0 12px;font-size:12px;">
                  <a href="${SITE_URL}" style="color:${COLORS.orange};text-decoration:none;margin-right:12px;">flacronenterprises.com</a>
                  <a href="${SITE_URL}/terms" style="color:${COLORS.muted};text-decoration:none;margin-right:12px;">Terms</a>
                  <a href="${SITE_URL}/privacy" style="color:${COLORS.muted};text-decoration:none;">Privacy</a>
                </p>
                <p style="margin:0;color:${COLORS.muted};font-size:11px;">
                  &copy; ${year} Flacron Enterprises. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

type DashboardLinkEmailInput = {
  orgName: string;
  planName: string;
  priceLabel: string;
  dashboardLink: string;
};

/**
 * Body content for the "your dashboard is ready" provisioning email, wrapped in the shared layout.
 * Contains only a single dashboard link — no credentials. The link logs the customer in and lands
 * them on /dashboard, which redirects to billing first if payment isn't complete yet.
 */
export function dashboardLinkEmailHtml(input: DashboardLinkEmailInput): string {
  const { orgName, planName, priceLabel, dashboardLink } = input;

  const bodyHtml = `
    <h2 style="color:${COLORS.navy};margin:0 0 12px;font-size:20px;">Welcome, ${orgName}!</h2>
    <p style="color:${COLORS.slate};line-height:1.6;margin:0 0 24px;font-size:14px;">
      Your Flacron AI Engine account has been created on the <strong>${planName}</strong> plan (${priceLabel}). Click below to access your dashboard.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="border-radius:8px;background:${COLORS.orange};">
          <a href="${dashboardLink}" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-weight:bold;font-size:14px;">Go to Your Dashboard</a>
        </td>
      </tr>
    </table>
    <p style="color:${COLORS.muted};font-size:12px;line-height:1.6;margin:0;">
      If payment hasn't been completed yet, you'll be asked to finish checkout first — then you'll land straight in your dashboard.
    </p>
  `;

  return emailLayout({
    previewText: `Your Flacron AI Engine dashboard is ready, ${orgName}.`,
    bodyHtml,
  });
}
