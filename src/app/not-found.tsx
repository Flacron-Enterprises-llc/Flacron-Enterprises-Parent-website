import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <p className="text-[10rem] font-black leading-none text-[#FE4705] sm:text-[14rem]" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-flacron-navy sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-500">
        {"The page you're looking for doesn't exist or has been moved."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-xl bg-[#FE4705] px-7 py-3 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors">
          Go Home
        </Link>
        <Link href="/ecosystem" className="rounded-xl border-2 border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-flacron-navy hover:border-[#FE4705] hover:text-[#FE4705] transition-colors">
          View Ecosystem
        </Link>
      </div>
    </div>
  );
}
