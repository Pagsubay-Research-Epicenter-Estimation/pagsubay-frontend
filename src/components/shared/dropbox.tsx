"use client";
import { IoMdCloudUpload } from "react-icons/io";
import { useCallback, useRef, useState, DragEvent, ChangeEvent } from "react";

interface DropboxProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
}

export default function Dropbox({
  onFilesSelected,
  accept = "*",
  multiple = false,
  maxSizeMB = 10,
  label = "Select files from local drive or drag it here",
}: DropboxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = useCallback(
    (files: File[]): File[] => {
      const maxBytes = maxSizeMB * 1024 * 1024;
      const valid: File[] = [];

      for (const file of files) {
        if (file.size > maxBytes) {
          setError(`"${file.name}" exceeds ${maxSizeMB}MB limit.`);
          return [];
        }
        valid.push(file);
      }

      setError(null);
      return valid;
    },
    [maxSizeMB],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const fileArray = Array.from(files);
      const validated = validateFiles(fileArray);

      if (validated.length > 0) {
        setFileNames(validated.map((f) => f.name));
        setSelectedFiles(validated);
      }
    },
    [validateFiles],
  );

  const handleImport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedFiles.length > 0) {
      onFilesSelected(selectedFiles);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col shadow-xl items-center justify-center gap-3 rounded-xl bg-pagsubay-slate-100 px-8 py-6 cursor-pointer transition-colors ${
        isDragging ? "border-2 border-dashed border-pagsubay-sky-500" : ""
      }`}
    >
      <IoMdCloudUpload className="text-3xl text-pagsubay-sky-700" />
      <p className="text-sm text-pagsubay-slate-400 text-center">{label}</p>

      {fileNames.length > 0 && (
        <ul className="text-xs text-pagsubay-slate-500">
          {fileNames.map((name) => (
            <li key={name}>📄 {name}</li>
          ))}
        </ul>
      )}

      {error && <p className="text-xs text-pagsubay-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleImport}
        disabled={selectedFiles.length === 0}
        className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
          selectedFiles.length > 0
            ? "bg-pagsubay-slate-300 text-white hover:bg-pagsubay-sky-800 cursor-pointer"
            : "bg-pagsubay-sky-700  text-white "
        }`}
      >
        Import selected files
      </button>
    </div>
  );
}
