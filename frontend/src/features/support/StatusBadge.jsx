function StatusBadge({ status }) {
  const base = 'px-2 py-1 rounded-full text-xs';
  if (status === 'open') return <span className={base + ' bg-green-600'}>باز</span>;
  if (status === 'pending') return <span className={base + ' bg-yellow-500'}>در دست بررسی</span>;
  if (status === 'closed')
    return <span className={base + ' bg-slate-600 text-slate-200'}>بسته شده</span>;
  return <span className={base + ' bg-slate-600 text-slate-200'}>{status}</span>;
}

export default StatusBadge;
