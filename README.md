# Backbase Banking Apps

This project was generated using [Nx](https://nx.dev).

## Documentation

- [Nx Documentation](https://nx.dev/angular)
- [10-minute video showing all Nx features](https://nx.dev/getting-started/intro)
- [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Contribution Guideline

When creating a PR:

> It's highly recommended NOT to update the version manually.
> Because it will be bumped automatically by the pipeline.
>
> But, if you have to bump the version manually:
>
> 1. Update the version in package.json file
> 2. set your git commit message as following: "... bump/0.0.2 ..."

## Development Setup

### Accessing BaaS

By default, api request will be proxying to BaaS env:

- [proxy-bus-un-s.conf.js](./proxy-bus-un-s.conf.js)
- [proxy-bus-us-s.conf.js](./proxy-bus-us-s.conf.js)
- [proxy-ret-us-l.conf.js](./proxy-ret-us-l.conf.js)
- [proxy-wealth.conf.js](./proxy-wealth.conf.js)

Please follow [this guideline](https://backbase.atlassian.net/wiki/spaces/BUSB/pages/3252095286/Starting+out+with+BaaS#Accessing-BaaS-as-an-end-user) to access BaaS from your local

### Install NX Cli

```bash
npm i -g nx
```

## Getting Started

### Development server

Run `nx serve <app-name>` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Example:

```bash
## Business Banking USA
nx serve business-usa

## Business Banking Universal
nx serve business-universal

## Retail USA
nx serve retail-usa

## Wealth
nx serve wealth-app
```

### Build

Run `nx build <app-name>` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Example:

```bash
## Business Banking USA
nx build business-usa

## Business Banking Universal
nx build business-universal

## Retail USA
nx build retail-usa

## Wealth
nx build wealth-app
```

### Build Docker Image

#### For a specific app

```bash
## Prerequisite: Build the app `nx build <app-name>`
## Example:
nx build business-usa

## nx build-docker <app-name> --docker-registry=<your-docker-registry> --image-tag=<tag>
## Example:
nx build-docker business-usa --docker-registry=harbor.backbase.eu/development/business-web-app-test --image-tag=0.0.14
```

#### For the affected Apps

```bash
## Prerequisite: Build the affected project
npm run build:affected

## Build docker image
npm run build:docker
```

By default, it will use:

- docker registry: `harbor.backbase.eu/staging`
- Image name: `<app-name>`
- Image tag: `latest`

If you want to set your own docker registry and image tag, please set the following env vars before you run `npm run build:docker`:

```bash
## export CHANGE_DOCKER_REGISTRY=<your-docker-registry>
## Example:
export CHANGE_DOCKER_REGISTRY=harbor.backbase.eu/development/business-web-app-test

## export CHANGE_IMAGE_TAG=<image.tag>
## Example:
export CHANGE_IMAGE_TAG=0.0.14
```

### Running unit tests

Run `nx test <app-name>` to execute the unit tests.

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `nx e2e <app-name>` to execute the end-to-end

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Generate an application

Run `nx g app my-new-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g lib my-new-lib --directory=custom/directory` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@backbase/my-lib`.

### Code scaffolding

Run `nx g component my-new-component --project=my-new-app` to generate a new component.

## Important!

### If banking application is having locale

See `project.json`, set:

```
  ...
  "baseHref": "${BASE_HREF::-1}",
  ...
```

See `environment.<corresponding configuration file>.ts`. eg: `environment.prod.ts`, then set:

```
  ....
  localize: true,
  ....
```

### If banking application is NOT having locale

See `project.json`, set:

```
  ...
  "baseHref": "${BASE_HREF}"
  ...
```

## Mocking Data

It's only applicable for dev environment by setting up `enableMocks = true` in local storage.

#### CashFlow Journey Mock Data

In order to change or test some states in Cash Flow Journey, you need to pass some values to localStorage.

| Vars                                             | Description                                                     |
| ------------------------------------------------ | --------------------------------------------------------------- |
| localStorage.setItem("enableMocks", true);       | enable/disable mocks in application (disabled if set to false)  |
| localStorage.setItem('smeLinkedStatus', 'true'); | enable/disable accounting software linking flow                 |
| localStorage.setItem('forecastExist', 'true');   | enable/disable initial setup forecast flow                      |
| localStorage.setItem('dataFetched', 'true');     | enable/disable data fetching flow (showing data fetching sceen) |
