import { FC } from "react";
import { XCircle } from "react-feather";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex text-sm mt-2">
      <XCircle className="text-red-500 mr-1" size="1.25rem" />
      <p className="font-bold">{message}</p>
    </div>
  );
};
