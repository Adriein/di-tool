# Symphony like DI tool

> 💡 For people involved in DDD architectures who don't want to have infra leaks 

## 🗿 Philosophy

Every DI solution in node ecosystem are based in decorators or creating some sort of objects

- Extract from Awilix documentation:
```
// We use register coupled with asClass to tell Awilix to
// use `new Database(...)` instead of just `Database(...)`.
// We also want to use `CLASSIC` injection mode for this
// registration. Read more about injection modes below.
container.register({
  db: awilix.asClass(Database).classic()
})

// Lastly we register the connection string and timeout values
// as we need them in the Database constructor.
container.register({
  // We can register things as-is - this is not just
  // limited to strings and numbers, it can be anything,
  // really - they will be passed through directly.
  connectionString: awilix.asValue(process.env.CONN_STR),
  timeout: awilix.asValue(1000)
})
```

- Extract from NestJs documentation:
```
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

These solutions are pretty straight forward but if you are doing clean architectures you will end with a lot of 
infrastructure leaks inside your domain and application layers so di-tool it's a library designed to keep those 
infrastructure leaks away from your inner layers.

## 🌱 How it works 
Di-tool create a directory tree with `src` as the root element, then the crawler start iterating all your files 
searching for `yml` with `.di` extension then the container merges all the files sorting the dependencies by 
arguments in order to instantiate first those dependencies that has no arguments which de container considers the 
bottom of your dependency tree.

Di-tool uses the dynamic import feature to get the exported class of your file and then the instance is created with 
the necessary dependencies and added to the container.
## 🔨 Setup instructions
1. In the main file of your app instantiate the container and initiate it eg:
```
const diContainer = new DiContainer();
    
await diContainer.init();
```
2. Create a yml with di extension eg: `repositories.di.yml`:

Here you can se some samples of yml

![repositories-yml-example](/assets/repository-yml-example.PNG)