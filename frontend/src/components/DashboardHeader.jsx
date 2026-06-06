import { useParams } from 'react-router';
/////////////////////////////////////////
import PanelButton from './PanelButton';
////////////////////////////////////////
function DashboardHeader() {
  //! React Router
  const params = useParams();

  //! JSX
  return (
    <div className="flex items-center justify-between border-b border-slate-500 p-4">
      <span className="text-xl"> داشبورد </span>
      <PanelButton to={`/app/${params.userId}/reserve`} extraClasses="px-4 py-2">
        رزرو اتاق
      </PanelButton>
    </div>
  );
}

export default DashboardHeader;
