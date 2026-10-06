'use client';

import { Sidebar } from 'lucide-react';
import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';

/**
 * Collapse/expand toggle placed next to the logo, on the same side as the
 * sidebar (left in English, right in Arabic). The layout's own toggle sits at
 * the far end of the top bar and is hidden in global.css.
 */
export function SidebarToggle() {
  const { slots } = useNotebookLayout();
  const Trigger = slots.sidebar?.collapseTrigger;
  if (!Trigger) return null;

  return (
    <Trigger
      data-kashfy-sidebar-toggle=""
      className={`${buttonVariants({ variant: 'ghost', size: 'icon-sm' })} order-first me-2 -ms-1.5 cursor-pointer text-fd-muted-foreground max-md:hidden`}
    >
      <Sidebar />
    </Trigger>
  );
}
