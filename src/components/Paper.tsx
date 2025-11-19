// src/components/Paper.tsx
import Image from "next/image";
import Link from "next/link";
type PaperProps = {
  title: string;
  authors?: string[];
  venue?: string;
  abstract?: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  label?: string;
  aspect?: string;
};

export default function Paper({
  title,
  authors = [],
  venue,
  abstract,
  imageSrc,
  imageAlt = "",
  href,
  label,
  aspect = "aspect-[4/3]",
}: PaperProps) {
  // normalize DOI-like hrefs to full URLs (e.g., "10.1109/..." -> "https://doi.org/10.1109/...")
  const normalizeHref = (raw?: string) => {
    if (!raw) return undefined;
    const trimmed = raw.trim();
    // already an absolute URL?
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    // doi forms: starts with 10.` or `doi:10.`
    const doiMatch = trimmed.match(/^(?:doi:\s*)?(10\.\S+)/i);
    if (doiMatch) {
      return `https://doi.org/${doiMatch[1]}`;
    }
    // fallback: return as-is (but keep it absolute if possible)
    return trimmed;
  };

  const safeHref = normalizeHref(href);
  // link to a root-level paper page using the paper label, e.g. /GuidedReality
  const internalHref = label ? `/${encodeURIComponent(label)}` : undefined;

  return (
    <article
      className="grid grid-cols-1 md:[grid-template-columns:320px_1fr] gap-6 items-start rounded-2xl p-4 md:p-6"
      itemScope
      itemType="https://schema.org/ScholarlyArticle"
    >
      {/* LEFT: media */}
      {internalHref ? (
        <Link href={internalHref} className={`block w-full overflow-hidden rounded-xl bg-gray-100 ${aspect} relative`} aria-label={title}>
          <Image src={imageSrc} alt={imageAlt || title} className="object-cover" fill sizes="320px" />
        </Link>
      ) : (
        <a
          href={safeHref}
          className={`block w-full overflow-hidden rounded-xl bg-gray-100 ${aspect} relative`}
          aria-label={title}
          {...(safeHref ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Image src={imageSrc} alt={imageAlt || title} className="object-cover" fill sizes="320px" />
        </a>
      )}

      {/* RIGHT: info */}
            <div className="space-y-2 md:space-y-2 leading-snug">
        {/* title */}
        <h3 className="text-lg font-semibold leading-snug" itemProp="name">
          {internalHref ? (
            <Link href={internalHref} className="transition-colors duration-50 hover:text-blue-600 hover:no-underline" itemProp="url">
              {title}
            </Link>
          ) : safeHref ? (
            <a
              href={safeHref}
              itemProp="url"
              className="transition-colors duration-50 hover:text-blue-600 hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {/* authors */}
        {authors.length > 0 && (
          <div className="text-sm text-gray-600">
            <span itemProp="author">
              {authors.map((author, idx) => {
                const norm = author.toLowerCase();
                const isMe = norm.includes("ada yi zhao") || norm.includes("ada zhao");
                const nameEl = isMe ? (
                  <strong key={idx} className="font-bold">
                    {author}
                  </strong>
                ) : (
                  author
                );
                return (
                  <span key={idx}>
                    {nameEl}
                    {idx < authors.length - 1 && ", "}
                  </span>
                );
              })}
            </span>
          </div>
        )}


        {/* venue */}
        {venue && (
          <div className="text-xs italic leading-tight text-gray-600">
            <span itemProp="isPartOf">{venue}</span>
          </div>
        )}

        {/* abstract */}
        {abstract && (
          <p className="text-sm leading-snug text-gray-800" itemProp="abstract">
            {abstract}
          </p>
        )}
      </div>
    </article>
  );
}
