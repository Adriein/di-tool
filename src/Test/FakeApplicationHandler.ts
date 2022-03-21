import { IFakeUserRepository } from "./IFakeUserRepository";

export class FakeApplicationHandler {
  constructor(private readonly repository: IFakeUserRepository) {}

  public handle(): void {
    this.repository.save();
  }
}