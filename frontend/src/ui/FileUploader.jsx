import { useRef, useState } from 'react';

function FileUploader({ className = '', label = '' }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0] || null);
  }

  return (
    <>
      <div className={`${className} items-center gap-4`}>
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-indigo-500"
        >
          {label}
        </button>

        <span className="text-[var(--color-slate-400)]">
          {selectedFile ? selectedFile.name : 'هیچ فایلی انتخاب نشده است'}
        </span>
      </div>

      <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
    </>
  );
}

export default FileUploader;
