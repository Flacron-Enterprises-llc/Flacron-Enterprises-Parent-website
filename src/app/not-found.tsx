import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 text-center">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
      <p
        aria-hidden
        className="font-display text-[8rem] font-semibold leading-none tracking-[-0.06em] text-accent sm:text-[12rem]"
      >
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-text-secondary">
        {"The page you're looking for doesn't exist or has been moved."}
      </p>
      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link href="/" className="btn btn-primary btn-lg">Go Home</Link>
        <Link href="/ecosystem" className="btn btn-secondary btn-lg">View Ecosystem</Link>
      </div>
    </div>
  );
}
