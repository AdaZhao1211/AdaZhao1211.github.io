type NewsProps = {
  date: string;
  content: string;
  href?: string;
};

export default function News({ date, content, href }: NewsProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    // Parse date components manually to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Parse content to handle partial links
  const renderContent = () => {
    if (!href || href === "#") {
      return <span className="text-gray-700">{content}</span>;
    }

    // Check if content has brackets indicating partial link
    const linkMatch = content.match(/^(.+?)(\[(.+?)\])(.*)$/);
    
    if (linkMatch) {
      const [, beforeText, , linkText, afterText] = linkMatch;
      return (
        <span className="text-gray-700">
          {beforeText}
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline transition-all duration-200"
          >
            {linkText}
          </a>
          {afterText}
        </span>
      );
    }

    // If no brackets, make entire content clickable (original behavior)
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-blue-600 hover:font-semibold transition-all duration-200"
      >
        {content}
      </a>
    );
  };

  return (
    <div className="flex gap-4 items-baseline py-2 px-4 md:px-6 rounded-2xl">
      {/* Date */}
      <div className="text-sm text-gray-500 font-medium min-w-[100px] flex-shrink-0">
        {formatDate(date)}
      </div>
      
      {/* Content */}
      <div className="flex-1 text-sm">
        {renderContent()}
      </div>
    </div>
  );
}