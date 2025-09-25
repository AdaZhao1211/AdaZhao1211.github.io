import Head from "next/head";
import SelfIntro from "@/components/SelfIntro";
import Paper from "@/components/Paper";
import News from "@/components/News";
import papers from "@/data/papers.json"; // direct JSON import
import news from "@/data/news.json";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ada Zhao</title>
      </Head>

      <SelfIntro
        bio={
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-xl md:text-xl font-semibold">Hello, I&apos;m Ada Zhao 赵艺</p>

            <p className="text-gray-700 leading-relaxed">
              I am a first-year PhD student in Computer Science at the University of Colorado Boulder, advised by{" "}
              <a 
                href="https://www.colorado.edu/atlas/ellen-yi-luen-do" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ellen Yi-Luen Do
              </a>
              {" "}and{" "}
              <a 
                href="https://ryosuzuki.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ryo Suzuki
              </a>
            </p>

            <p className="text-gray-700 leading-relaxed">
              My research interests include Human-Computer Interaction (HCI), Augmented Reality,
              and Generative AI. I am passionate about bringing the learning experience into our
              physical space.
            </p>
          </div>
        }
        imageSrc="/assets/profile.JPG"
        social={[
          { href: "https://www.linkedin.com/in/ada-yi-zhao", label: "LinkedIn", icon: "linkedin" },
          { href: "https://www.instagram.com/aaadazhao/", label: "Instagram", icon: "instagram" },
          { href: "https://x.com/ada_yi_zhao", label: "X", icon: "x" },
        ]}
        cvHref="/assets/Ada_Zhao_CV.pdf"
      />

      {/* News Section */}
      <section className="mx-auto max-w-4xl px-4 py-10 space-y-8 bg-white">
        <h2 className="text-lg font-bold">News</h2>
        
        <div className="space-y-0">
          {news.map((item, idx) => (
            <News key={idx} {...item} />
          ))}
        </div>
      </section>

      {/* Recent Papers Section */}
      <main className="mx-auto max-w-4xl px-4 py-10 space-y-8 bg-white">
        <h1 className="text-lg font-bold">Recent Papers</h1>

        <div className="space-y-6">
          {papers.map((paper, idx) => (
            <Paper key={idx} {...paper} />
          ))}
        </div>
      </main>
    </>
  );
}