import { DynamicImportClass, InjectionYml, Service } from "./types";
import yaml from "js-yaml";
import fs from "fs";
import { DiContainer } from "./DiContainer";
import { DirectoryTree } from "./FileCrawler/DirectoryTree";

export class InstanceBuilder {
  constructor(private diContainer: DiContainer) {}

  public async execute(): Promise<void> {
    const dependencies = this.getDependencyTree();

    await this.instantiateDependencies(dependencies);
  }

  private mergeInjectionFiles(ymlList: InjectionYml[]): Map<string, Service> {
    const acc = {} as Record<string, Service>;
    const result = new Map<string, Service>();

    const sortedAccumulator = ymlList.reduce((result: Record<string, Service>, yml:InjectionYml) => {
      if(yml.hasOwnProperty('arguments') && Array.isArray(yml.hasOwnProperty('arguments'))) {
        return {...result, ...yml.services}
      }

      return {...yml.services, ...result}
    }, acc);

    for (const key in sortedAccumulator) {
      result.set(`@${key}`, sortedAccumulator[key])
    }

    return result;
  }

  private readInjectionFile(path: string): InjectionYml {
    if(path.split('.').includes('di')) {
      return yaml.load(fs.readFileSync(path, {encoding: 'utf-8'})) as InjectionYml;
    }

    return {services: {}};
  }

  private getDependencyTree(): Map<string, Service> {
    const tree = new DirectoryTree(`${process.cwd()}/../src`);

    const content = tree.crawl(this.readInjectionFile);
    return this.mergeInjectionFiles(content);
  }

  private async getClassFromDirectoryTree(classRoute: string): Promise<any> {
    const dynamicImport = await import(`./${classRoute}`) as DynamicImportClass;

    const [ instance ] = Object.values(dynamicImport);

    return instance;
  }

  private async instantiateDependencies(dependencies: Map<string, Service>): Promise<void> {
    for (const [id, service] of dependencies) {
      const interfaceName = service.interface ?? '';
      const classArguments = service.arguments ?? [];
      const classRoute = service.class;

      const classDefinition = await this.getClassFromDirectoryTree(classRoute);

      if(classArguments.length) {
        const dependencies = [];

        for (const dependencyId of classArguments) {
          const dependency = this.diContainer.get(dependencyId);

          dependencies.push(dependency.class)
        }

        const instance = new classDefinition(...dependencies);

        this.diContainer.set(id, {interface: interfaceName, class: instance});
        continue;
      }

      const instance = new classDefinition();

      this.diContainer.set(id, {interface: interfaceName, class: instance});
    }
  }
}