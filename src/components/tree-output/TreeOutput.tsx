import { FC } from "react";
import { AlertTriangle, Info } from "react-feather";

import { BinTreeNode } from "shared/classes/BinTreeNode";
import { findDeepestSubtree } from "shared/utils/helper/tree-helper";

import "./TreeOutput.scss";

interface TreeOutputProps {
  treeNode: BinTreeNode | null;
  error?: string | null;
}

interface TreeNodeProps extends TreeOutputProps {
  deepestTree?: BinTreeNode | null;
}

const TreeNode: FC<TreeNodeProps> = ({ treeNode, deepestTree }) => {
  if (!treeNode || !treeNode.id) {
    return <div className="treeNode"></div>;
  }
  const isDeepest = treeNode === deepestTree;
  return (
    <div className={`treeNode ${isDeepest ? "deepestTree" : ""}`}>
      <div className="nodeId">{treeNode.id}</div>
      {treeNode.left || treeNode.right ? (
        <div className="nodeChildren">
          <TreeNode
            treeNode={treeNode.left || null}
            deepestTree={deepestTree}
          />
          <TreeNode
            treeNode={treeNode.right || null}
            deepestTree={deepestTree}
          />
        </div>
      ) : null}
    </div>
  );
};

export const TreeOutput: FC<TreeOutputProps> = ({ error, ...props }) => {
  const noData = !props.treeNode || !props.treeNode.id;
  const deepestSubtree = findDeepestSubtree(props.treeNode, null);

  return (
    <section>
      <h2 className="mt-7 text-xl font-bold mb-4">Tree output</h2>
      {noData ? (
        <div className="container flex bg-blue-100 p-5 rounded-xl">
          <Info className="mr-2" />
          <p>No data to display</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="flex mb-2">
              <AlertTriangle className="text-yellow-500 mr-2" />
              <p className="font-light">
                Parsing errors detected: Showing last-known correct input.
              </p>
            </div>
          )}
          <div className="OutputContainer bg-blue-100">
            <TreeNode deepestTree={deepestSubtree} {...props} />
          </div>
        </>
      )}
    </section>
  );
};
