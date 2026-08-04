import { Bell, Check, CheckCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import EmptyState from './EmptyState';
import { en2fa } from 'num2persian';
//---
const initialUserNotifications = [
  {
    id: 'u1',
    title: 'احراز هویت',
    body: 'مشکل مربوط به احراز هویت شما برطرف شد',
    createdAt: '۲ دقیقه پیش',
    isRead: false,
  },
  {
    id: 'u2',
    title: 'رزرو اتاق',
    body: 'تیکت مربوط به رزرو اتاق شما بررسی و مشکل مربوطه برطرف شد',
    createdAt: '۱ ساعت پیش',
    isRead: false,
  },
  {
    id: 'u3',
    title: 'تأیید رزومه',
    body: 'رزومه شما بررسی و تأیید شد. اکنون امکان رزرو اتاق برای شما فراهم شده است',
    createdAt: '۵ ساعت پیش',
    isRead: true,
  },
];

function NotificationBox() {
  const [userItems, setUserItems] = useState(initialUserNotifications);

  const unreadCounts = useMemo(() => userItems.filter((i) => !i.isRead).length, [userItems]);

  const markAsRead = (id) => {
    setUserItems((prev) => prev.map((i) => (i.id === id ? { ...i, isRead: true } : i)));
  };

  const markAllAsRead = () => {
    setUserItems((prev) => prev.map((i) => ({ ...i, isRead: true })));
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-indigo-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-[var(--color-indigo-700)]" aria-hidden="true" />
          <h2 className="text-sm font-semibold">اعلان ها</h2>
          {unreadCounts > 0 && (
            <span className="rounded-full bg-[var(--color-slate-700)] px-2 py-0.5 text-xs font-medium text-[var(--color-slate-300)]">
              {en2fa(unreadCounts)} جدید
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCounts === 0}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-[var(--color-slate-200)] transition-colors hover:bg-[var(--color-slate-700)] hover:text-[var(--color-slate-200)] disabled:pointer-events-none disabled:opacity-50"
        >
          <CheckCheck className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* List */}
      <div role="tabpanel" className="scrollbar max-h-80 overflow-y-auto">
        {userItems.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-indigo-700">
            {userItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-start gap-3 px-4 py-3 transition-colors ${!item.isRead && 'bg-[var(--color-slate-800)]'}`}
              >
                <span
                  className={
                    'mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-slate-600)] text-indigo-400'
                  }
                  aria-hidden="true"
                >
                  <Bell className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!item.isRead && (
                      <span
                        className="size-2 shrink-0 rounded-full bg-red-700"
                        aria-label="Unread"
                      />
                    )}
                    <p className="truncate text-sm font-medium">{item.title}</p>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-slate-400)]">
                    {item.body}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--color-slate-500)]">{item.createdAt}</p>
                </div>

                <button
                  type="button"
                  onClick={() => markAsRead(item.id)}
                  disabled={item.isRead}
                  aria-label={
                    item.isRead
                      ? 'خوانده شده'
                      : `تنظیم \u201C${item.title}\u201D به عنوان خوانده شده`
                  }
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-[var(--color-slate-200)] transition-colors hover:bg-[var(--color-slate-700)] hover:text-indigo-400 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Check className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
export default NotificationBox;
