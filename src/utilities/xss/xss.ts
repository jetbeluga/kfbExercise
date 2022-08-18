import * as xss from 'xss';

export function sanitizeHtml(html: string): string {
  return xss.filterXSS(html);
}

export function escapeUrl(url: string): string {
  return xss.safeAttrValue('a', 'href', url.trim(), xss.cssFilter);
}
