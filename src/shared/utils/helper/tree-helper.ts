import { BinTreeNode } from "shared/classes/BinTreeNode";

/**
 * Converts array format binary tree notation to BinTreeNode data structure
 * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
 * @returns TreeNode format
 * */
export const parseArrayToTree = (arrayFormat: any[]): BinTreeNode => {
  const addNode = (acc: BinTreeNode, current: any, index: number) => {
    if (index === 0) {
      acc.id = current;
    } else {
      let node: BinTreeNode | null;
      if (Array.isArray(current)) {
        node = current.reduce(addNode, {});
      } else {
        node = current === null ? null : { id: current };
      }
      if (index === 1) {
        acc.left = node;
      } else if (index === 2) {
        acc.right = node;
      } else {
        throw new Error(`Unexpected node: "${current}".`);
      }
    }
    return acc;
  };
  return arrayFormat.reduce(addNode, {});
};

const treeHeight = (root?: BinTreeNode | null): number => {
  if (root == null) return 0;

  if (root.left == null && root.right == null) return 1;
  return Math.max(treeHeight(root.left), treeHeight(root.right)) + 1;
};

export const findDeepestSubtree = (
  node: BinTreeNode | null,
  subtree: BinTreeNode | null
): BinTreeNode | null => {
  if (node == null) return subtree;

  let leftHeight = treeHeight(node.left);
  let rightHeight = treeHeight(node.right);

  if (leftHeight > rightHeight) {
    subtree = findDeepestSubtree(node.left || null, subtree);
  } else if (rightHeight > leftHeight) {
    subtree = findDeepestSubtree(node.right || null, subtree);
  } else {
    subtree = node;
    return subtree;
  }
  return subtree;
};
