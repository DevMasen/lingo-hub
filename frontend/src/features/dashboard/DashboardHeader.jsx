import PanelButton from '../../ui/PanelButton';
//---

function DashboardHeader() {
  //! JSX
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-slate-500)] p-4">
      <span className="text-xl"> داشبورد </span>
      <PanelButton to={`/reserve`} className="px-4 py-2">
        رزرو اتاق
      </PanelButton>
    </div>
  );
}

export default DashboardHeader;
