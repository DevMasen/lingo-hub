import { BiPencil } from 'react-icons/bi';
//////////////////////////////////////////
import mapToPersian from '../utils/mapToPersian';
/////////////////////////////////////////////////
function UserParameter({
  name = '',
  value = '',
  valueType = '',
  statusBGColor = '',
  statusValue = '',
  reserveRemainRef = null,
  reserveRemainCountBGColor = '',
  isValueEditable = false,
}) {
  return (
    <li className={isValueEditable ? 'flex items-center gap-2' : ''}>
      {valueType === 'reserveCounter' ? (
        <span ref={reserveRemainRef}>{name}</span>
      ) : (
        <span>{name}</span>
      )}
      <span> : </span>
      <span
        className={`rounded-xl px-4 py-2 ${(valueType === 'default' || valueType === 'language' || valueType === 'level') && 'bg-gray-800'} ${valueType === 'status' && statusBGColor} ${valueType === 'reserveCounter' && `transition-colors duration-200 ${reserveRemainCountBGColor}`}`}
      >
        {valueType === 'status' && statusValue}
        {valueType === 'reserveCounter' && mapToPersian(String(value))}
        {(valueType === 'default' || valueType === 'language' || valueType === 'level') && value}
      </span>
      {/* TODO add actio to this */}
      {isValueEditable && (
        <div className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
          <BiPencil className="h-4 w-4" />
        </div>
      )}
    </li>
  );
}

export default UserParameter;
