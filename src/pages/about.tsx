import Head from "next/head";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";

type AboutProps = {
  galleryImages: string[];
};

export default function About({ galleryImages }: AboutProps) {
  return (
    <>
      <Head>
        <title>About - Ada Zhao</title>
        <meta name="description" content="Learn more about Ada Zhao's background, interests, and journey in Computer Science and HCI research." />
      </Head>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <article className="space-y-8">
          {/* Page Title */}
          {/* <header>
            <h1 className="text-3xl font-bold text-gray-900">About Me</h1>
          </header> */}

          {/* About Text Block */}
          <section className="space-y-6">
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                I am a Ph.D. student in Computer Science at the University of Colorado Boulder, advised by Professor Ellen Yi-Luen Do and Professor Ryo Suzuki.
                My research interests include Human-Computer Interaction (HCI), Augmented Reality, and Generative AI.
                In particular, I am passionate about designing and studying interactive systems that bring learning into the physical world, enabling people to explore, experiment, and create through embodied, hands-on experiences.
              </p>
              <p>
                Prior to this, I worked as a Senior Product Manager at{" "}
                <ExternalLink href="https://www.tencent.com/en-us/">
                  Tencent
                </ExternalLink>
                , focusing on video content creation tools.
                I hold a Master&apos;s degree in Creative Technology and Design from the{" "}
                <ExternalLink href="https://www.colorado.edu/atlas/">
                  ATLAS Institute
                </ExternalLink>
                {" "}at the University of Colorado Boulder, as well as a Bachelor&apos;s degree in{" "}
                <ExternalLink href="https://shanghai.nyu.edu/content/interactive-media-arts">
                  Interactive Media Arts
                </ExternalLink>
                {" "}and Computer Science from{" "}
                <ExternalLink href="https://shanghai.nyu.edu/">
                  NYU Shanghai
                </ExternalLink>.
              </p>
              <p>
                In my free time, I enjoy staying active in the outdoors, especially through climbing🧗, snowboarding🏂 and surfing🏄.
              </p>
              <p>
                Feel free to reach out at {" "}
                <ExternalLink
                  href="mailto:ada.zhao@colorado.edu"
                >
                  ada.zhao@colorado.edu
                </ExternalLink>{" "}
                — I’d love to connect and chat about ideas, projects, or just say hi!
              </p>

            </div>
          </section>


          {/* Photo Gallery */}
          <section className="space-y-4 max-w-2xl mx-auto">            
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {galleryImages.map((image, index) => (
                  <div key={image} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                    <Image 
                      src={`/gallery/${image}`}
                      alt={`Ada Zhao - Gallery Photo ${index + 1}`}
                      className="object-cover hover:scale-105 transition-transform duration-300" 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>No photos in the gallery yet. Add some images to the <code className="bg-gray-100 px-2 py-1 rounded">public/gallery</code> folder!</p>
              </div>
            )}
          </section>

          
        </article>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    
    // Check if gallery directory exists
    if (!fs.existsSync(galleryPath)) {
      return {
        props: {
          galleryImages: [],
        },
      };
    }

    const files = fs.readdirSync(galleryPath);
    
    // Filter for common image file extensions
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    // Sort files alphabetically
    imageFiles.sort();

    return {
      props: {
        galleryImages: imageFiles,
      },
    };
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return {
      props: {
        galleryImages: [],
      },
    };
  }
};