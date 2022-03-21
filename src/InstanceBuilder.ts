import { DynamicImportClass, InjectionYml, Service } from "./types";
import yaml from "js-yaml";
import fs from "fs";
import { DiContainer } from "./DiContainer";
import { DirectoryNode } from "./FileCrawler/DirectoryNode";
import { DirectoryTree } from "./FileCrawler/DirectoryTree";

export class InstanceBuilder {
  constructor(private diContainer: DiContainer) {}

  public async execute(): Promise<void> {
    const tree = new DirectoryTree(`${process.cwd()}/../src`);

    const content = tree.crawl(this.readInjectionFile);
    const sortedInjectionFiles = this.mergeInjectionFiles(content);
    console.log(sortedInjectionFiles);
    /*const yml: Yaml = yaml.load(fs.readFileSync(`${process.cwd()}/../src/repositories.yml`, {encoding: 'utf-8'}))
     as Yaml;


    for (const service of Object.keys(yml.services)) {
      const concreteService =  yml.services[service];

      const interfaceName = concreteService.interface;
      const classRoute = concreteService.class;

      const dynamicImport = await import(`./${classRoute}`) as DynamicImportClass;

      const [ instance ] = Object.values(dynamicImport);

      const id = `@${service}`;

      if(interfaceName) {
        this.diContainer.set(id, {interface: interfaceName, class: new instance()});
        continue;
      }

      this.diContainer.set(id, {interface: id, class: instance});
    }*/
  }

  private mergeInjectionFiles(ymlList: InjectionYml[]): Map<string, Service> {
    const acc = {} as Record<string, Service>;
    const result = new Map<string, Service>();

    const sortedAccumulator = ymlList.reduce((result: Record<string, Service>, yml:InjectionYml) => {
      if(yml.hasOwnProperty('services') && Array.isArray(yml.hasOwnProperty('services'))) {
        return {...result, ...yml.services}
      }

      return {...yml.services, ...result}
    }, acc);

    for (const key in sortedAccumulator) {
      result.set(key, sortedAccumulator[key])
    }

    return result;
  }

  private readInjectionFile(path: string): InjectionYml {
    if(path.split('.').includes('di')) {
      return yaml.load(fs.readFileSync(path, {encoding: 'utf-8'})) as InjectionYml;
    }

    return {services: {}};
  }
}