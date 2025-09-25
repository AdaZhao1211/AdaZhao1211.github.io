export default function Footer() {
  return (
    <footer className="bg-white pb-2">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ada Zhao
        </p>
      </div>
    </footer>
  );
}