export type Service = {interface?: string, class: string, arguments: string[]}

export type InjectionYml = {services: Record<string, Service>}

export type ClassConstructor = new (...args: any[]) => any;

export type DynamicImportClass = Record<string, ClassConstructor>

export type InstanceDictionary = {interface: string, class: any};

