function LoginTabs({ activeTab, onActiveTab }) {
  return (
    <div className="mt-6 flex gap-4 text-sm font-semibold text-slate-800">
      <span
        className={`${activeTab === 'mobile' ? 'active-tab' : ''} cursor-pointer`}
        onClick={() => onActiveTab('mobile')}
      >
        استفاده از موبایل
      </span>

      <span
        className={`${activeTab === 'email' ? 'active-tab' : ''} cursor-pointer`}
        onClick={() => onActiveTab('email')}
      >
        استفاده از آدرس ایمیل
      </span>
    </div>
  );
}

export default LoginTabs;
