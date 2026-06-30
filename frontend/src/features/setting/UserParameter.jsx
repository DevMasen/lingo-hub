import mapToPersian from '../../utils/mapToPersian';
//---

function UserParameter({
  name = '',
  value = '',
  valueType = '',
  statusBGColor = '',
  statusValue = '',
  reserveRemainRef = null,
  reserveRemainCountBGColor = '',
}) {
  return (
    <li>
      {valueType === 'reserveCounter' ? (
        <span ref={reserveRemainRef}>{name}</span>
      ) : (
        <span>{name}</span>
      )}
      <span> : </span>
      <span
        className={`rounded-xl px-4 py-2 ${valueType === 'default' && 'bg-[var(--color-slate-800)]'} ${valueType === 'status' && statusBGColor} ${valueType === 'reserveCounter' && `transition-colors duration-200 ${reserveRemainCountBGColor}`}`}
      >
        {valueType === 'status' && statusValue}
        {valueType === 'reserveCounter' && mapToPersian(String(value))}
        {valueType === 'default' && value}
      </span>
    </li>
  );
}

export default UserParameter;
