/**
 * Renders JSON-LD for search engines — Document 10 §5 / 08 §4.15 support.
 */

import type { JsonLd } from "@/lib/seo/json-ld";

type JsonLdScriptProps = {
  data: JsonLd | JsonLd[] | null | undefined;
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];
  const filtered = payload.filter(Boolean);
  if (filtered.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(filtered.length === 1 ? filtered[0] : filtered),
      }}
    />
  );
}
