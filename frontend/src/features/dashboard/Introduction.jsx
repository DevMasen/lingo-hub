import { useProfile } from '../setting/useProfile';
import Image from '../../ui/Image';
import Error from '../../ui/Error';
import Skeleton from '../../ui/Skeleton';
//---

function Introduction({ className }) {
  //! React Query
  const { profile, isLoading, error } = useProfile();

  //! Conditional JSX
  if (isLoading) return <Skeleton className={`h-48 lg:col-span-2`} />;
  if (error) return <Error className={`h-48 lg:col-span-2`} error={error?.message} />;

  //! Main JSX
  return (
    <div
      className={`${className} flex flex-col items-center gap-6 md:flex-row md:pl-9 lg:col-span-2`}
    >
      <Image
        src="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon.png"
        placeholderSrc="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon.png?width=20&quality=20"
        alt="logo"
        className="w-[70%] rounded-xl opacity-[var(--image-opacity)] shadow-lg shadow-[var(--shadow-color)] grayscale-[var(--image-grayscale)] md:w-64"
      />
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl">
          <span>{profile?.firstName}</span> به آکادمی زبان لینگوهاب خوش اومدی
        </h2>
        <p className="text-lg font-semibold text-[var(--color-slate-400)]">
          اینجا زبان مزه دیگه ای میده 😉
        </p>
      </div>
    </div>
  );
}

export default Introduction;
