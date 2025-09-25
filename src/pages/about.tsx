import Head from "next/head";
import Image from "next/image";
import NavBar from "@/components/NavBar";
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
          <header>
            <h1 className="text-3xl font-bold text-gray-900">About Me</h1>
          </header>

          {/* About Text Block */}
          <section className="space-y-6">
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                I'm Ada Zhao, a passionate researcher and PhD student at the University of Colorado Boulder, 
                where I'm exploring the fascinating intersection of Human-Computer Interaction, Augmented Reality, and Generative AI.
              </p>
              
              <p>
                My journey in computer science began with a curiosity about how technology can enhance human experiences and learning. 
                Under the guidance of Prof. Ellen Yi-Luen Do and Prof. Ryo Suzuki, I'm working to bridge the gap between digital 
                innovation and physical learning environments.
              </p>
              
              <p>
                What drives me most is the potential to transform how we learn and interact with information in our physical spaces. 
                I believe that the future of education and human-computer interaction lies in seamlessly integrating digital experiences 
                with our tangible world, making learning more intuitive, engaging, and accessible.
              </p>
              
              <p>
                When I'm not immersed in research, you can find me exploring new technologies, collaborating with fellow researchers, 
                and always looking for ways to make technology more human-centered. I'm excited to share my work and connect with 
                others who share similar passions for innovation and learning.
              </p>

              <p>
                Prior to this, I worked as a Senior Product Manager at Tencent. I graduated with a Bachelor degree with double major in Interactive Media Arts and Computer Science at New York University Shanghai.
              </p>
            </div>
          </section>


          {/* Photo Gallery */}
          <section className="space-y-4">            
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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