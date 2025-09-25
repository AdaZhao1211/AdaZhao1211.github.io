type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function ExternalLink({ 
  href, 
  children, 
  className = "text-blue-600 hover:underline transition-all duration-200" 
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}