# Binary Tree Parser

This project is a test as part of the interview process. It parses a JSON file with a valid array into a Binary Tree object, and display it in a more user-friendly way. For the project, I decided to focus mostly on **User Experience** and improved the general look-and-feel of the UI. I also made some code improvements and simplified some things, as per example, the state management library.

## Problem 1: Binary Tree

Implement a function in JavaScript or TypeScript that takes an array as input with format: `[id, leftChild, rightChild]`, and parse this array into a binary tree data structure:

```ts
export interface BinTreeNode {
  id: number | string;
  left?: BinTreeNode | null;
  right?: BinTreeNode | null;
}
```
I decided to implement an interface instead of using a class, with a similar structure. To convert the array to a Tree object, I implemented the following recursive function:

```ts
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
```
I used the `reduce` method and initialized an empty object. The first element of the array corresponds to the `id`. For positions 2 and 3, I check if the current element is an array. If the element is an array, the function will add the corresponding child recursively.

The function also validates that the array doesn't have any unexpected nodes, i.e, more than three elements per array. In that case, it will return an error.

## Problem 2: User Interface

> Some JSON test files can be located in `src/input-samples`

Create a web experience to let the user provide an input file, and display the result. The user will see the JSON-formatted tree in the "JSON Editor" section and will be able to edit it as well. A visual representation will be displayed in the "Tree output" section.

For the UI, I decided to use [Tailwind CSS](https://tailwindcss.com/) to style the app components.

![Problem2](/src/readme-captures/problem2.gif)

First, I implemented a File Input component (`src/components/file-input`) to handle the user file input. It supports "Drag & drop". The component validates the file extension, and the file content.

![Problem2a](/src/readme-captures/problem2a.png)

If the user uploads a valid file, the application will process the array, display the JSON text and generate the visual Tree representation below. The user can also enter a valid JSON text in the editor without uploading a file. 

As the user edits the JSON text, the output will update automatically. If parsing errors are encountered, an error will be displayed and the output will show the last-known valid input. 

![Problem2b](/src/readme-captures/problem2b.png)

### Additional improvements:

- I decided to remove Mobx from the project and simply use local statement management with React Hooks, as the problem didn't require complex state managers.
- Refactored the folder structure to have a cleaner project.
- Updated the Class-based components to Function components and refactored some of them to be more reusable.
- Added a `shared` folder with some reusable code, per example: constants and helper functions.

### Bonus features:

- Improved layout: added responsiveness, a footer and more styles.
- Drag & drop: I decided to improve the way the user uploads the file by adding a drag and drop component. It also opens a traditional dialog box to select a file.
- Added a "Prettify" button to format the text inside the JSON Editor.
- Added a "Clear" button to reset the app state and clean both input and output sections.

## Problem 3
**Find the smallest subtree, with the deepest nodes.**

For this problem, my assumptions were the following: we need to find the Binary Tree height (deepest node), and return the smallest subtree that contains such deepest node. To achieve this, I implemented a helper function that calculates a subtree's height, and a main function that compares each height and return the smallest subtree with the deepest nodes.

The code is located in `src/shared/utils/helper/tree-helper.ts`. Here is an output example:

![Problem 3](/src/readme-captures/problem3.png)

## Next steps
As next steps to improve the project, I'd like to suggest the following:
- Add linting and prettier rules.
- Add unit testing.
- Improve accessibility.

---

## Run the project

> Used node version: **14.18.1**

In the project directory, you must run:

### `1. yarn install`

To install dependencies.

### `2. yarn start`

To start the project.
