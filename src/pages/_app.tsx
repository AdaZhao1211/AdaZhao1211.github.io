import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.variable}>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}