import FileUploader from '../../ui/FileUploader';
import PanelButton from '../../ui/PanelButton';

const inputContainerStyles =
  'flex items-center rounded-lg border px-3 py-2 border-[var(--color-slate-500)] transition-all duration-300 focus-within:border-[var(--color-indigo-700)]';
const errorContainerStyles =
  'border-[var(--color-red-700)] focus-within:border-[var(--color-red-700)]';
const inputStyles = 'bg-inherit outline-none w-60 sm:w-80 md:w-96';

function UpdateAvatarForm({ onCloseModal }) {
  const errors = {};

  return (
    <form className="space-y-5">
      <div className="space-y-4">
        <div className={`${inputContainerStyles} ${errors?.firstName && errorContainerStyles}`}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="نام جدید"
            aria-required="true"
            maxLength={30}
            className={inputStyles}
          />
        </div>
        <div className={`${inputContainerStyles} ${errors?.lastName && errorContainerStyles}`}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="نام خانوادگی جدید"
            aria-required="true"
            maxLength={30}
            className={inputStyles}
          />
        </div>
        <FileUploader className={inputContainerStyles} label="انتخاب عکس" />
      </div>
      <div className="flex gap-4">
        <PanelButton extraClasses="px-5 py-2"> تأیید </PanelButton>
        <PanelButton extraClasses="px-5 py-2 bg-[var(--color-red-800)] hover:bg-[var(--color-red-700)]">
          {' '}
          لغو{' '}
        </PanelButton>
      </div>
    </form>
  );
}

export default UpdateAvatarForm;
