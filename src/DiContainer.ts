import { InstanceDictionary } from "./types";

export class DiContainer {
  private container: Map<string, InstanceDictionary> = new Map();

  public has(classId: string): boolean {
    return this.container.has(classId);
  }

  public get(classId: string): InstanceDictionary {
    const item = this.container.get(classId);

    if(!item) {
      throw new Error(`${classId} not exists`);
    }

    return item;
  }

  public set(classId: string, item: InstanceDictionary): void {
    this.container.set(classId, item);
  }

  public debug(): void {
    console.log(this.container);
  }
}