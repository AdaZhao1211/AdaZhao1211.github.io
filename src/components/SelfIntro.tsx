import Image from "next/image";
import React from "react";

type SocialLink = {
  href: string;
  label?: string;
  /** optional icon name ("github" | "linkedin" | "twitter" | "website") or custom JSX */
  icon?: string | React.ReactNode;
};

type SelfIntroProps = {
  bio: string | React.ReactNode;
  imageSrc: string; // /public path or remote
  imageAlt?: string;
  social?: SocialLink[];
  cvHref?: string;
};

export default function SelfIntro({
  bio,
  imageSrc,
  imageAlt = "",
  social = [],
  cvHref,
}: SelfIntroProps) {

  // helper to return SVGs for known icon names
  const renderIcon = (icon?: string | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon !== "string") return icon;

    switch (icon.toLowerCase()) {
      case "x":
      case "twitter":
        // prefer PNG from public/icons for X/twitter if available
        return (
          <Image
            src="/icons/x.svg"
            alt="X"
            width={20}
            height={20}
            className="inline-block filter grayscale brightness-90 transition duration-200 group-hover:grayscale-0 group-hover:brightness-110"
          />
        );
      case "instagram":
        return (
          <Image
            src="/icons/ins.svg"
            alt="Instagram"
            width={20}
            height={20}
            className="inline-block filter grayscale brightness-90 transition duration-200 group-hover:grayscale-0 group-hover:brightness-110"
          />
        );
      case "linkedin":
        return (
          <Image
            src="/icons/linkedin.svg"
            alt="linkedin"
            width={20}
            height={20}
            className="inline-block filter grayscale brightness-90 transition duration-200 group-hover:grayscale-0 group-hover:brightness-110"
          />
        );
      case "email":
        // prefer PNG from public/icons for X/twitter if available
        return (
          <Image
            src="/icons/emailfull.svg"
            alt="X"
            width={20}
            height={20}
            className="inline-block filter grayscale brightness-90 transition duration-200 group-hover:grayscale-0 group-hover:brightness-110"
          />
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z" />
          </svg>
        );
    }
  };
  return (
    <section
      className="mx-auto max-w-4xl grid grid-cols-1 md:[grid-template-columns:1fr_200px] gap-6 items-center px-4 py-10"
    >
      {/* Left: text */}
      <div className="space-y-3 md:order-1">
        {typeof bio === "string" ? (
          bio.split("\n").map((line, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed">
              {line}
            </p>
          ))
        ) : (
          // assume caller provides paragraphs / formatting when passing React nodes
          <div>{bio}</div>
        )}

        {/* Social icons + CV download */}
        <div className="flex items-center gap-3 mt-3">
          {social.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label || s.href}
              className="text-gray-600 hover:text-gray-900 group"
            >
              {renderIcon(s.icon)}
            </a>
          ))}

          {cvHref && (
            <a
              href={cvHref}
              
              className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50"
            >
              
              <span className="text-sm">Download CV</span>
            </a>
          )}
        </div>
      </div>

      {/* Right: profile photo */}
      <div className="relative mx-auto w-40 h-40 overflow-hidden rounded-full bg-gray-100 md:w-full md:aspect-square md:h-auto md:order-2">
        <Image
          src={imageSrc}
          alt={imageAlt || "profile photo"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 160px, 200px"
          priority
        />
      </div>
    </section>
  );
}