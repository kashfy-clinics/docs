'use client';

import Link from 'fumadocs-core/link';
import { usePathname } from 'next/navigation';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { ArrowRight, HomeIcon, SearchIcon } from 'lucide-react';

/** Pages people usually look for, shown under the 404 so they have somewhere to go. */
const POPULAR = [
  { href: '/quickstart', en: 'Quick Start', ar: 'البدء السريع' },
  { href: '/ai-agent/overview', en: 'Clinic Agent', ar: 'وكيل العيادة' },
  { href: '/doctors/assistant', en: 'Doctor Assistant', ar: 'مساعد الطبيب' },
  { href: '/support', en: 'Support', ar: 'الدعم' },
];

/**
 * Any unknown docs URL (the proxy sends every path to [lang]/[[...slug]], whose
 * page calls notFound()). Renders inside the docs layout, in the reader's language.
 */
export default function NotFound() {
  const pathname = usePathname();
  const ar = pathname === '/ar' || pathname.startsWith('/ar/');
  const prefix = ar ? '/ar' : '';
  const { setOpenSearch } = useSearchContext();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-6xl font-bold text-fd-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold">{ar ? 'الصفحة غير موجودة' : 'Page not found'}</h1>
      <p className="max-w-md text-fd-muted-foreground">
        {ar
          ? 'ربما حُذفت هذه الصفحة أو تغيّر عنوانها. ابحث في التوثيق أو ابدأ من إحدى الصفحات أدناه.'
          : 'This page may have been removed or moved. Search the docs or start from one of the pages below.'}
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setOpenSearch(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-fd-primary bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90 cursor-pointer"
        >
          <SearchIcon className="size-4" />
          {ar ? 'ابحث في التوثيق' : 'Search the docs'}
        </button>
        <Link
          href={prefix || '/'}
          className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent cursor-pointer"
        >
          <HomeIcon className="size-4" />
          {ar ? 'الصفحة الرئيسية' : 'Docs home'}
        </Link>
      </div>

      <ul className="mt-6 grid w-full max-w-md gap-2 sm:grid-cols-2">
        {POPULAR.map((p) => (
          <li key={p.href}>
            <Link
              href={`${prefix}${p.href}`}
              className="flex items-center justify-between gap-2 rounded-xl border border-fd-border px-4 py-3 text-sm font-medium transition-colors hover:bg-fd-accent cursor-pointer"
            >
              {ar ? p.ar : p.en}
              <ArrowRight className="size-4 text-fd-muted-foreground rtl:-scale-x-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
