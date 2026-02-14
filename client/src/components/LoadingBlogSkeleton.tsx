function BlogSkeleton() {
  return (
    <div className="w-full border-b border-slate-200 py-6 animate-pulse">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>

        <div className="h-4 w-16 bg-slate-200 rounded"></div>
      </div>

      {/* Content Row */}
      <div className="mt-4 flex justify-between gap-6">
        <div className="flex-1">
          <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
          <div className="mt-3 h-4 w-full bg-slate-200 rounded"></div>
          <div className="mt-2 h-4 w-5/6 bg-slate-200 rounded"></div>

          <div className="mt-4 flex gap-6">
            <div className="h-4 w-16 bg-slate-200 rounded"></div>
            <div className="h-4 w-16 bg-slate-200 rounded"></div>
            <div className="h-4 w-16 bg-slate-200 rounded"></div>
          </div>
        </div>

        <div className="hidden sm:block w-44 h-28 bg-slate-200 rounded-md"></div>
      </div>
    </div>
  );
}

export default BlogSkeleton;
