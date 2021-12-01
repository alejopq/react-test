import { FC, useState } from "react";

import { BinTreeNode } from "shared/classes/BinTreeNode";
import { FileInput } from "components/file-input/FileInput";
import { FilePreview } from "components/file-preview/FIlePreview";
import { arrayValidator } from "shared/utils/helper";
import { errors } from "shared/utils/constants";
import { parseArrayToTree } from "shared/utils/helper/tree-helper";


interface TreeInputProps {
  binTree: BinTreeNode | null;
  setBinTree: React.Dispatch<React.SetStateAction<BinTreeNode | null>>;
  textError: string | null;
  setTextError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TreeInput: FC<TreeInputProps> = ({
  binTree,
  setBinTree,
  textError,
  setTextError,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [textValue, setTextValue] = useState("");

  const onFileLoad = (data: string) => {
    try {
      if (arrayValidator(data)) {
        const parsedTree = parseArrayToTree(JSON.parse(data));
        setBinTree(parsedTree);
        setTextValue(JSON.stringify(parsedTree, null, 2));
        setTextError(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setTextValue(text);
    try {
      setBinTree(JSON.parse(text));
      setTextError(null);
    } catch (error) {
      setTextError(`${errors.INVALID_JSON} ${error}`);
    }
  };

  const formatText = () => {
    const obj = JSON.parse(textValue);
    setTextValue(JSON.stringify(obj, null, 2));
  };

  const clear = () => {
    setTextValue("");
    setTextError(null);
    setBinTree(null);
    setSelectedFile("");
  };

  return (
    <div>
      <FileInput
        onFileLoad={onFileLoad}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <FilePreview
        onChange={onTextChange}
        onFormat={formatText}
        value={textValue}
        error={textError}
        onClear={clear}
      />
    </div>
  );
};
