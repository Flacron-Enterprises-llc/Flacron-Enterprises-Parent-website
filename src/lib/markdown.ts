import { absoluteUrl } from "./site";

/**
 * A small Markdown subset for blog posts, rendered to HTML on the server. Everything is HTML-escaped first, so
 * raw HTML in a post is shown as text, never executed. Supported:
 *   ## / ### headings · paragraphs · - or * lists · 1. lists · > quotes · ``` code blocks · --- rules
 *   **bold** · *italic* · `code` · [text](url) · ![alt](image-url)
 * Pass `absolute: true` for RSS, where relative links would break in a feed reader / LinkedIn.
 */

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function safeUrl(raw: string, absolute: boolean): string | null {
  const url = raw.trim();
  if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url;
  if (url.startsWith("/")) return absolute ? absoluteUrl(url) : url;
  if (url.startsWith("#")) return url;
  return null; // javascript:, data:, etc.
}

function inline(text: string, absolute: boolean): string {
  // Pull out code spans first so their contents are not formatted.
  const codes: string[] = [];
  let s = text.replace(/`([^`]+)`/g, (_, c: string) => {
    codes.push(`<code>${escapeHtml(c)}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = escapeHtml(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt: string, src: string) => {
    const url = safeUrl(src.replace(/&amp;/g, "&"), absolute);
    return url ? `<img src="${escapeHtml(url)}" alt="${alt}" loading="lazy" />` : m;
  });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label: string, href: string) => {
    const url = safeUrl(href.replace(/&amp;/g, "&"), absolute);
    if (!url) return label;
    const external = /^https?:\/\//i.test(url) && !url.startsWith(absoluteUrl("/"));
    const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<a href="${escapeHtml(url)}"${rel}>${label}</a>`;
  });
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => codes[Number(i)]);
}

export function renderMarkdown(md: string, opts: { absolute?: boolean } = {}): string {
  const absolute = !!opts.absolute;
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    if (trimmed.startsWith("```")) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++]);
      i++; // closing fence
      out.push(`<pre><code>${escapeHtml(body.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      // A post's title is the page's only h1, so "#" maps to h2.
      const level = Math.min(4, Math.max(2, heading[1].length));
      out.push(`<h${level}>${inline(heading[2], absolute)}</h${level}>`);
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(trimmed)) { out.push("<hr />"); i++; continue; }

    if (/^[-*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      const ordered = /^\d/.test(trimmed);
      const pattern = ordered ? /^\d+[.)]\s+/ : /^[-*]\s+/;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i].trim())) {
        items.push(`<li>${inline(lines[i].trim().replace(pattern, ""), absolute)}</li>`);
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    if (trimmed.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) body.push(lines[i++].trim().replace(/^>\s?/, ""));
      out.push(`<blockquote><p>${inline(body.join(" "), absolute)}</p></blockquote>`);
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4}\s|```|>|[-*]\s|\d+[.)]\s|-{3,}$|\*{3,}$)/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${inline(para.join(" "), absolute)}</p>`);
  }

  return out.join("\n");
}
