# Symphony like DI tool

> 💡 For people involved in DDD architectures who don't want to have infra leaks 

## 🌱 How it works 


## 🔨 Setup instructions 

- Create a yml with di extension eg: `repositories.di.yml`
- In the main file of your app initiate the container eg:
    ```
    const diContainer = new DiContainer();
    
    const builder = new InstanceBuilder(diContainer);
    ```