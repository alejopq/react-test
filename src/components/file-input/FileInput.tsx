import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "react-feather";

import { ErrorMessage } from "components/error-message/ErrorMessage";

interface FileInputProps {
  onFileLoad: (data: any) => void;
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}

export const FileInput: FC<FileInputProps> = ({
  onFileLoad,
  selectedFile,
  setSelectedFile,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileText = reader.result as string;
      try {
        onFileLoad(fileText);
        setError(null);
      } catch (error) {
        setError(`${error}`);
      }
    };
    if (file) {
      reader.readAsText(file);
      setSelectedFile(file.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: "application/json",
      multiple: false,
      onDrop,
    });

  const acceptedFile =
    acceptedFiles && acceptedFiles[0] ? acceptedFiles[0] : null;

  return (
    <section>
      <div
        {...getRootProps({
          className: `container max-w-full border-dashed border-2 border-purple-400 rounded-xl shadow-md p-4 ${
            isDragActive ? "bg-purple-200" : "bg-purple-50"
          } flex flex-col items-center justify-center h-40`,
        })}
      >
        <input {...getInputProps()} />
        {!isDragActive ? (
          acceptedFile && !!selectedFile && !error ? (
            <>
              <p className="text-gray-700">{acceptedFile.name}</p>
              <button className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-full text-white mt-4">
                Browse files
              </button>
            </>
          ) : (
            <>
              <UploadCloud className="text-purple-700" />
              <p className="italic text-gray-500">
                Drag & drop a valid JSON file here
              </p>
              <p className="italic text-gray-500">or</p>
              <button className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-full text-white">
                Browse files
              </button>
            </>
          )
        ) : (
          <>
            <UploadCloud
              className="text-purple-700 animate-bounce text-12 my-4"
              size="45px"
            />
            <p className="text-gray-700">Drop file here</p>
          </>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
    </section>
  );
};
