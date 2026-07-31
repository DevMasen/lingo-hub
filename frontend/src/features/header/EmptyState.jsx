import { X } from 'lucide-react';
//---
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-slate-200)]">
        <X className="size-5 text-[var(--color-slate-800)]" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium">به همه رسیدگی شد</p>
      <p className="text-xs text-[var(--color-slate-800)]">اعلانی وجود ندارد</p>
    </div>
  );
}

export default EmptyState;
