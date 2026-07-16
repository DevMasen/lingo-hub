import UserInfoHeader from './UserInfoHeader';
import UserParameter from './UserParameter';
import UserParameterList from './UserParameterList';
//---

function UserInfo() {
  //! Main JSX
  return (
    <div className="space-y-5 border-b border-[var(--color-slate-500)] p-3">
      <UserInfoHeader />
      <section className="space-y-7 rounded-2xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] px-5 py-2">
        <UserParameter>
          <UserParameterList />
        </UserParameter>
      </section>
    </div>
  );
}

export default UserInfo;
