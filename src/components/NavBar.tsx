import Link from "next/link";
import { useRouter } from "next/router";

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="inline-block font-bold px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

export default function NavBar() {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        {/* Left: logo + name (only show on non-homepage) */}
        {!isHomePage && (
          <Link href="/" className="inline-block px-2 py-1 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Ada Zhao
          </Link>
        )}


        {/* Right: nav items */}
        <div className={`flex items-center gap-6 ${isHomePage ? 'ml-auto' : ''}`}>
          {/* <NavItem href="/projects">Projects</NavItem> */}
          <NavItem href="/about">About</NavItem>
        </div>
      </nav>
    </header>
  );
}
