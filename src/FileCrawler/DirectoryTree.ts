import * as fs from 'fs';
import { DirectoryNode } from "./DirectoryNode";

export class DirectoryTree {
  constructor(private sourcePath: string) {}

  public crawl<T>(fn: (path: string) => T): T[] {
    const source = new DirectoryNode(this.sourcePath);
    const result = [];

    const stack = [source];

    while (stack.length) {
      const currentElement = stack.shift();

      if (currentElement) {
        const descendants = fs.readdirSync(currentElement.path);

        for (const descendant of descendants) {
          const descendantPath = `${currentElement.path}/${descendant}`;
          const descendantNode = new DirectoryNode(descendantPath);
          currentElement.children.push(descendantNode);

          const fnResult = fn(descendantPath);

          if(fnResult) {
            result.push(fnResult);
          }

          if (fs.statSync(descendantNode.path).isDirectory()) {
            stack.push(descendantNode);
          }
        }
      }
    }

    return result;
  }
}