import { IFakeUserRepository } from "./IFakeUserRepository";

export class FakeUserRepository implements IFakeUserRepository{
  public save(): void {
    console.log('Im saving man');
  }
}