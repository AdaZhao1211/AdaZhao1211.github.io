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
      className={[
        "relative inline-block px-2 py-1 text-gray-700",
        "after:content-[''] after:absolute after:left-0 after:-bottom-1",
        "after:h-[2px] after:w-0 after:bg-gray-300 after:transition-all",
        "hover:after:w-full focus:after:w-full",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-8">
        {/* Left: logo + name (both link home) */}
        <Link href="/" className="group">
            <span
                className={[
                "text-lg font-semibold text-gray-800",
                "relative",
                "after:content-[''] after:absolute after:left-0 after:-bottom-1",
                "after:h-[2px] after:w-0 after:bg-gray-300 after:transition-all",
                "group-hover:after:w-full group-focus:after:w-full",
                ].join(" ")}
            >
                Ada Zhao
            </span>
        </Link>


        {/* Right: nav items */}
        <div className="flex items-center gap-6">
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/about">About</NavItem>
        </div>
      </nav>
    </header>
  );
}
