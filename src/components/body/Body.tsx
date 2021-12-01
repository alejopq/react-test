import { useState } from "react";

import { TreeInput } from "components/tree-input/TreeInput";
import { TreeOutput } from "components/tree-output/TreeOutput";
import { BinTreeNode } from "shared/classes/BinTreeNode";

import "./Body.scss";

export const Body: React.FunctionComponent<{}> = (props) => {
  const [binaryTree, setBinaryTree] = useState<BinTreeNode | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);

  return (
    <main className="App-body">
      <h2 className="text-xl font-bold">
        Process the input text to a Binary Tree
      </h2>
      <p>
        You can upload a JSON file and edit it in the JSON Editor, or just input
        your JSON text in the text area below.
      </p>
      <TreeInput
        binTree={binaryTree}
        setBinTree={setBinaryTree}
        textError={jsonError}
        setTextError={setJsonError}
      />
      <TreeOutput treeNode={binaryTree} error={jsonError} />
    </main>
  );
};

export default Body;
