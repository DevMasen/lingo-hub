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
        className="w-[70%] rounded-xl opacity-[var(--image-opacity)] shadow-lg shadow-[var(--shadow-color)] grayscale-[var(--image-grayscale)] md:w-64"
      />
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl">
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
