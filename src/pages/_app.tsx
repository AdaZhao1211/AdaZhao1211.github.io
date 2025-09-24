// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css"; // imports Tailwind + your custom CSS variables
import NavBar from "@/components/NavBar";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
