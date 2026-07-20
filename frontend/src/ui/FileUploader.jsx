function FileUploader({
  id = '',
  className = '',
  register = () => {},
  isUpdatingProfile = false,
  accept = '',
  registerParams = [],
}) {
  //! Main JSX
  return (
    <>
      <div className={`${className} items-center gap-4 text-center text-[var(--color-slate-200)]`}>
        <input
          id={id}
          type="file"
          accept={accept}
          className="flex w-52 cursor-pointer items-center file:w-24 file:cursor-pointer file:rounded-lg file:border-none file:bg-indigo-700 file:py-2 file:text-sm file:text-white file:outline-none file:transition-colors file:duration-200 file:hover:bg-indigo-600 disabled:cursor-not-allowed file:disabled:hover:cursor-not-allowed file:disabled:hover:bg-indigo-700 sm:w-80 sm:text-base file:sm:w-32 file:sm:text-base md:w-96"
          disabled={isUpdatingProfile}
          {...register(...registerParams)}
        />
      </div>
    </>
  );
}

export default FileUploader;
