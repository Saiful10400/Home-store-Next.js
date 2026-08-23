// app/Search.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={searchParams.get('q')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full border p-2 rounded"
    />
  );
}