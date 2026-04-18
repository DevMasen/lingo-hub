import { useAuth } from '../context/AuthContext';

function LoginTabs() {
  const { activeTab, toggleActiveTab } = useAuth();
  return (
    <div className="flex gap-4 text-sm font-semibold text-slate-800">
      <span
        className={`${activeTab === 'mobile' ? 'active-tab' : ''} cursor-pointer`}
        onClick={toggleActiveTab}
      >
        استفاده از موبایل
      </span>

      <span
        className={`${activeTab === 'email' ? 'active-tab' : ''} cursor-pointer`}
        onClick={toggleActiveTab}
      >
        استفاده از آدرس ایمیل
      </span>
    </div>
  );
}

export default LoginTabs;
