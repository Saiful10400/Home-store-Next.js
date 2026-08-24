// app/Search.tsx
'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term.trim()) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const currentQuery = searchParams.get('q') || '';

  return (
    <div className="w-full lg:mb-5 sticky top-4 mb-6 left-0 z-50  ">
      <div
        className="
          group flex w-full items-center
          overflow-hidden

          rounded-xl sm:rounded-2xl

          border border-emerald-200
          bg-white

          shadow-sm

          transition-all duration-300

          hover:border-emerald-300
          hover:bg-emerald-50
          hover:shadow-md

          focus-within:border-emerald-500
          focus-within:bg-white
          focus-within:ring-4
          focus-within:ring-emerald-500/10

          h-11 sm:h-12 md:h-14
        "
      >
        {/* Search Icon */}
        <div
          className="
            ml-2 sm:ml-2.5
            flex shrink-0
            items-center justify-center

            rounded-lg sm:rounded-xl

            bg-emerald-500
            text-white

            shadow-sm

            transition-all duration-300

            group-focus-within:bg-green-600

            h-8 w-8
            sm:h-9 sm:w-9
            md:h-10 md:w-10

            [&_svg]:h-4
            [&_svg]:w-4

            sm:[&_svg]:h-[18px]
            sm:[&_svg]:w-[18px]

            md:[&_svg]:h-5
            md:[&_svg]:w-5
          "
        >
          <Search strokeWidth={2.5} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="
            min-w-0
            h-full
            w-full

            bg-transparent

            px-2.5
            sm:px-3
            md:px-4

            text-xs
            sm:text-sm
            md:text-base

            font-medium
            text-emerald-950

            outline-none

            placeholder:text-emerald-600/50
          "
        />
 


      </div>
    </div>
  );
}