function FileUploader({ className = '', label = '', register, isUpdatingProfile }) {
  //! Main JSX
  return (
    <>
      <div className={`${className} items-center gap-4 text-center text-[var(--color-slate-200)]`}>
        <input
          id="avatar"
          type="file"
          className="flex w-52 items-center text-center text-xs file:w-24 file:cursor-pointer file:rounded-lg file:border-none file:bg-indigo-600 file:px-4 file:py-2 file:text-xs file:text-white file:outline-none file:transition-colors file:duration-200 file:hover:bg-indigo-500 sm:w-80 sm:text-base file:sm:w-36 file:sm:text-base md:w-96"
          disabled={isUpdatingProfile}
          {...register('avatar')}
        />
      </div>
    </>
  );
}

export default FileUploader;
