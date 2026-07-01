import Image from '../../ui/Image';
//---

function Introduction({ className, userFirstName = '' }) {
  return (
    <div className={className}>
      <Image
        src={'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon.png'}
        placeholderSrc={
          'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon.png?width=20&quality=20'
        }
        alt={'logo'}
        className="w-48 rounded-xl opacity-[var(--image-opacity)] shadow-lg shadow-[var(--shadow-color)] grayscale-[var(--image-grayscale)]"
      />
      {/* <img
        src="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon.png"
        className="w-48 rounded-xl opacity-[var(--image-opacity)] shadow-lg shadow-[var(--shadow-color)] grayscale-[var(--image-grayscale)]"
        alt="logo"
      /> */}
      <div className="space-y-6">
        <h2 className="text-xl">
          <span>{userFirstName}</span> به آکادمی زبان لینگوهاب خوش اومدی
        </h2>
        <p className="text-lg font-semibold text-[var(--color-slate-400)]">
          {' '}
          اینجا زبان مزه دیگه ای میده 😉{' '}
        </p>
      </div>
    </div>
  );
}

export default Introduction;
