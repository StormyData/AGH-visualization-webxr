# AGH-visualization-webxr

## Deployment
Application is automatically deployed to Github Pages after push to main branch.
It is available under link: https://stormydata.github.io/AGH-visualization-webxr/

## Build 
To build and run application locally, follow below steps:
1. Ensure you have Node.js environment and Node Package Manager (npm) installed:
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    nvm install --lts
    node --version
    npm --version
    ```
2. Install yarn package manager using npm:
    ```
    npm install -g yarn
    yarn --version
    ```
3. Install project dependencies using yarn:
    ```
    yarn install
    ```
4. Build and run project in development environtment:
    ```
    yarn build
    yarn dev
    ```