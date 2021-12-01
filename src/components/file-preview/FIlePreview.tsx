import { FC } from "react";
import { Edit, X } from "react-feather";

import { ErrorMessage } from "components/error-message/ErrorMessage";

interface FilePreviewProps {
  onChange: (e: any) => void;
  onClear?: () => void;
  onFormat?: () => void;
  value: string;
  error?: string | null;
}

export const FilePreview: FC<FilePreviewProps> = ({
  onChange,
  value,
  error,
  onClear,
  onFormat,
}) => {
  return (
    <>
      <h2 className="mt-8 text-xl font-bold">JSON Editor</h2>
      <textarea
        className={`border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-xl shadow-md mt-4 p-1 w-full`}
        rows={15}
        wrap="off"
        onChange={onChange}
        value={value}
      ></textarea>
      {error && <ErrorMessage message={error} />}
      <div className={`flex ${!!error ? "mt-2" : "mt-3"}`}>
        <button
          disabled={!!error || !value}
          className="flex disabled:opacity-25 mr-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-3 py-1 rounded-lg"
          onClick={onFormat}
        >
          <Edit className="mr-1" size="1.25rem" />
          Prettify
        </button>
        <button
          className="flex bg-red-500 hover:bg-red-700 text-white font-semibold p-2 py-1 rounded-lg"
          onClick={onClear}
        >
          <X />
          Clear
        </button>
      </div>
    </>
  );
};
