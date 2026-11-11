export default function AppLoading() {
  return (
    <div className="min-h-screen pt-28" aria-busy="true" aria-label="Loading product">
      <section className="pb-20">
        <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl flex-1 space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-[72px] w-[72px] rounded-[20px] shimmer" />
              <div className="space-y-2">
                <div className="h-6 w-16 rounded-full shimmer" />
                <div className="h-4 w-24 rounded-full shimmer" />
              </div>
            </div>
            <div className="h-14 w-2/3 rounded-xl shimmer" />
            <div className="h-5 w-1/2 rounded-xl shimmer" />
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-40 rounded-xl shimmer" />
              <div className="h-12 w-36 rounded-xl shimmer" />
            </div>
          </div>
          <div className="lg:w-80"><div className="h-40 rounded-[1.25rem] shimmer" /></div>
        </div>
      </section>
      <section className="border-y border-border bg-surface-muted py-12">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-44 rounded-[1.25rem] shimmer" />)}
        </div>
      </section>
    </div>
  );
}
