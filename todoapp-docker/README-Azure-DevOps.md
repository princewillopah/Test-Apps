## Deploy a Todo React App to Azure Container Instance via Azure DevOps Pipeline

### Prerequisite
- Create a Service Connection: `'Azure-Devops-SP-connection'`
- Self Hosted Agent: `'My_Self_Hosted_Agent_Pool'` -  *note that this could be from any subscription where you want to deploy the app to*
- To create a ACR(`Azure Container Registry`), you must have a owner role in your subscription and that subcription email is the same as the one you used for the Azure DevOps account. ***`Service connection`*** cant help you here 

### Steps:
- Create A Project `React-ToDo-App` 
- Go to `Repo` and click `Import` to import the project with the link `https://github.com/piyushsachdeva/todoapp-docker`
- Access the cloned app and add `Dockerfile`
- Add he docker commands in the `Dockerfile`
    ```Yaml
    # Stage 1: Build the React application
    FROM node:18-alpine as installer

    # Set working directory to /app
    WORKDIR /app

    # Copy package*.json to /app
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application code to /app
    COPY . .

    # Build the React application
    RUN npm run build

    # Stage 2: Serve the React application with Nginx
    FROM nginx:latest as deployer

    # Copy the built React application from Stage 1 to /usr/share/nginx/html
    COPY --from=installer /app/build/ /usr/share/nginx/html

    ```
- Create a ACR resource in a resource group
- Creae a  Build pipeline:
 ```Yaml
trigger:
- main

resources:
- repo: self

variables:
  # Container registry service connection established during pipeline creation
  dockerRegistryServiceConnection: 'xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxx'
  imageRepository: 'containers'
  containerRegistry: 'princocontainerimage.azurecr.io'
  dockerfilePath: '$(Build.SourcesDirectory)/Dockerfile'
  tag: '$(Build.BuildId)'
  myServiceConnection: 'Azure-Devops-SP-connection'
  # Agent VM image name
  # vmImageName: 'ubuntu-latest'

stages:
- stage: Build
  displayName: Build and push stage
  jobs:
  - job: Build
    displayName: Build
    pool:
      name: My_Self_Hosted_Agent_Pool
    steps:

    - task: AzureCLI@2
      inputs:
        azureSubscription: 'Visual Studio Enterprise Subscription(xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx)'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: 'az acr login --name=$(containerRegistry)'


    - task: Docker@2
      displayName: Build and push an image to container registry
      inputs:
        command: buildAndPush
        repository: $(imageRepository)
        dockerfile: $(dockerfilePath)
        containerRegistry: $(dockerRegistryServiceConnection)
        tags: |
          $(tag)


    - task: AzureCLI@2
      inputs:
        azureSubscription: $(myServiceConnection)
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          az container create \
            --resource-group Azure-DevOps-RG \
            --name mycontainer \
            --image $(containerRegistry)/$(imageRepository):$(tag) \
            --registry-login-server $(containerRegistry) \
            --registry-username princoContainerImage  \
            --registry-password xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
            --os-type Linux \
            --cpu 1 \
            --memory 1.5 \
            --ports 80 \
            --dns-name-label my-aci-demo-$(tag)
      displayName: 'Create Azure Container Instance'
 ```
#### Note:
- `--registry-password` and `--registry-username` are from the ACR page
- `dockerRegistryServiceConnection` is from the wners subscription
- `princocontainerimage.azurecr.io` is he registry name
- `containers` is the container name
- In `--dns-name-label my-aci-demo-$(tag)`, `my-aci-demo-$(tag)` can be anything. we just use that url to access the app
- You must user Azure CLI to grnrrate the setting in the yaml file

