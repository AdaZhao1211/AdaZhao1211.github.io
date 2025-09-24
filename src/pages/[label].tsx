import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import papers from "@/data/papers.json";

type Paper = {
  title: string;
  label?: string;
  authors?: string[];
  venue?: string;
  abstract?: string;
  long_abstract?: string;
  imageSrc?: string;
  imageAlt?: string;
  teaser?: string;
  video?: string;
  href?: string;
};

type Props = {
  paper?: Paper;
};

export default function PaperPage({ paper }: Props) {
  if (!paper) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Paper not found</h1>
        <p>
          <Link href="/">Back home</Link>
        </p>
      </main>
    );
  }

  // normalize DOI-like hrefs
  const normalizeHref = (raw?: string) => {
    if (!raw) return undefined;
    const trimmed = raw.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const doiMatch = trimmed.match(/^(?:doi:\s*)?(10\.\S+)/i);
    if (doiMatch) return `https://doi.org/${doiMatch[1]}`;
    return trimmed;
  };

  const doiLink = normalizeHref(paper.href);

  return (
    <>
      <Head>
        <title>{paper.title}</title>
      </Head>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <article>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{paper.title}</h1>
            {paper.authors && (
              <div className="text-sm text-gray-800">{paper.authors.join(", ")}</div>
            )}

            {paper.venue && <div className="text-sm italic text-gray-600">{paper.venue}</div>}

            {doiLink && (
              <div className="text-sm">
                <a href={doiLink} className="text-blue-800" target="_blank" rel="noopener noreferrer">
                  {doiLink}
                </a>
              </div>
            )}
          </div>

          <div className="space-y-8 mt-4">
            {/* Teaser figure */}
            {paper.teaser && (
              <div className="w-full rounded-lg overflow-hidden bg-gray-100">
                <img src={paper.teaser} alt={paper.imageAlt || paper.title} className="w-full object-cover" />
              </div>
            )}

            {/* Introduction: use long_abstract if present */}
            {paper.long_abstract && (
              <div className="prose max-w-none text-gray-900">
                <h2 className="text-lg font-semibold">Abstract</h2>
                <p>{paper.long_abstract}</p>
              </div>
            )}

            {/* Video: embed YouTube links, otherwise use native <video> for file URLs */}
            {paper.video && (() => {
            const url = paper.video as string;
            // helper to extract youtube id and return embed url
            const getYouTubeEmbed = (u: string) => {
              try {
                // handle youtu.be short links
                const short = u.match(/youtu\.be\/([\w-]{11})/i);
                if (short) return `https://www.youtube.com/embed/${short[1]}`;

                // handle youtube watch and shorts links
                const watch = u.match(/[?&]v=([\w-]{11})/i);
                if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
                const shorts = u.match(/youtube\.com\/shorts\/([\w-]{11})/i);
                if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;

                return null;
              } catch (e) {
                return null;
              }
            };

            const embed = getYouTubeEmbed(url);
            if (embed) {
              return (
                <div className="w-full mt-4 aspect-video">
                  <iframe
                    src={embed}
                    title="Teaser video"
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }

            // fallback: native video element (for mp4/webm etc.)
            return (
              <div className="w-full mt-4">
                <video controls className="w-full rounded-lg bg-black">
                  <source src={url} />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          })()}

          </div>

          <p>
            <Link href="/">← Back home</Link>
          </p>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (papers as any[])
    .filter((p) => p.label)
    .map((p) => ({ params: { label: p.label } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const label = ctx.params?.label as string | undefined;
  const paper = (papers as any[]).find((p) => p.label === label) || null;
  return { props: { paper } };
};