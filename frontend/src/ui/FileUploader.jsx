function FileUploader({ className = '', label = '', register }) {
  return (
    <>
      <div className={`${className} items-center gap-4 text-[var(--color-slate-200)]`}>
        <input
          id="avatar"
          type="file"
          className="file:cursor-pointer file:rounded-lg file:border-none file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:outline-none file:transition-colors file:duration-200 file:hover:bg-indigo-500"
          {...register('avatar')}
        />
      </div>
    </>
  );
}

export default FileUploader;
