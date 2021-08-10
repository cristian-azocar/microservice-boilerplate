# Microservice Boilerplate

[![dependencies Status](https://david-dm.org/cristian-azocar/microservice-boilerplate/status.svg)](https://david-dm.org/cristian-azocar/microservice-boilerplate)
[![Actions Status](https://github.com/cristian-azocar/microservice-boilerplate/workflows/Build%20and%20test/badge.svg)](https://github.com/cristian-azocar/microservice-boilerplate/actions)

A **highly opinionated** RESTful microservice boilerplate using [Node.js](https://nodejs.org/), [Koa](https://koajs.com/), [Typescript](https://www.typescriptlang.org/) and other awesome tools. It's main purpose is to speed the development of new microservices by providing an already configured project, using the best tools and a scalable code structure.

## Table of contents

- [What is included in this boilerplate?](#what-is-included-in-this-boilerplate?)
- [Live demo](#live-demo)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Running the microservice](#running-the-microservice)
- [Running the tests](#running-the-tests)
  - [Unit tests](#unit-tests)
    - [Mocks](#mocks)
- [ESLint + Prettier](#eslint-+-prettier)
- [Configuration variables](#configuration-variables)
- [Module imports](#module-imports)
- [Request validation](#request-validation)
- [API documentation](#api-documentation)
- [CORS](#cors)
- [Git Hooks](#git-hooks)
- [CI/CD pipeline](#ci/cd-pipeline)
- [Deployment](#deployment)
  - [Manual deploy](#manual-deploy)
  - [Deploy with Docker](#deploy-with-docker)
- [Built with](#built-with)

## What is included in this boilerplate?

- A RESTful microservice developed using Koa framework.
- All code typed with Typescript.
- Hot-reload with [Nodemon](https://nodemon.io/).
- Unit tests with [Jest](https://jestjs.io/) and [Supertest](http://visionmedia.github.io/superagent/).
- Good and clean code practices using [ESLint](https://eslint.org/) (based on [Airbnb configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)), [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org/).
- A pre-commit [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to prevent dirty code to reach your local and remote repository, using [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Configuration variables ready to be read from the command line arguments, environment variables or `.env` files, thanks to [dotenv](https://github.com/motdotla/dotenv).
- Easy and readable way to import your modules using absolute paths like they were installed into `node_modules` directory, thanks to TypeScript and [app-module-path](https://github.com/patrick-steele-idem/app-module-path-node).
- Request validations using [joi](https://hapi.dev/module/joi/).
- API documentation using the [OpenAPI](https://www.openapis.org/) specification and [Swagger](https://swagger.io/).
- CORS support thanks to [koa-cors](https://github.com/koajs/cors) middleware.
- CI/CD pipelines support using [GitHub Actions](https://github.com/features/actions).
- And all of this in a [Docker](https://www.docker.com/) container.

## Live demo

You can see a live demo in the following link:

https://microservice-boilerplate.herokuapp.com

The demo is deployed in Heroku and it includes the following endpoints:

| Endpoint        | Method | Description                                         |
| --------------- | ------ | --------------------------------------------------- |
| /api/health     | GET    | Gets the health information of the microservice     |
| /api/auth/login | POST   | Logs a user into the system                         |
| /api/docs       | GET    | Gets the API documentation rendered with Swagger UI |

For more information about the endpoints, go to the [API documentation](https://microservice-boilerplate.herokuapp.com/docs).

## Getting started

### Prerequisites

You need to have installed the following tools:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (only needed if you want to run the container)

### Installing

Clone the repository

```
git clone https://github.com/cristian-azocar/microservice-boilerplate.git
```

Install the dependencies (only needed if you don't want to use Docker)

```
npm install
```

## Running the microservice

Run the microservice using Nodemon

```
npm run dev
```

Or using Docker Compose

```
docker-compose up -d
```

Alternatively, if you have Docker installed and want to see the microservice in action without installing anything else, use the image uploaded in my Docker Hub repository

```
docker run -d -p 3000:3000 cazocar/node-microservice-boilerplate
```

**Note:** By default, the microservice uses the port 3000.

If you want to build and run the image manually, make sure to specify the development stage and don't forget to create a volume so any local change you make will be reflected in the container

```
# 1. Build the image
docker build --target development -t microservice-boilerplate .

# 2. Run a new container with a mounted volume
docker run -d -p 3000:3000 --name microservice-boilerplate -v $(pwd):/usr/src/app -v /usr/src/app/node_modules microservice-boilerplate
```

**Note:** if you are using Powershell, replace `$(pwd)` by `${pwd}`.

Let's see a brief explanation of the volume mount in the second command:

- `-v $(pwd):/usr/src/app`: we are telling Docker to mount a volume between `$(pwd)` (which is the current directory of our computer) and `/usr/src/app` (which is the directory were our code lives inside the container), so that way any change made to the files located in our computer will be applied to the container, without the need to re-build the image.
- `-v /usr/src/app/node_modules`: we are telling Docker to not map the `node_modules` folder inside the container, so that way our local `node_modules` folder (who should not even exist or at least be empty) will not override the one in the container.

The `docker-compose` file exists because is so much cleaner to have a YAML file with the configuration to build and run a container, than to have to write a very long script. Also, you only have to type a very short command to start it and it already takes care of creating the container if it not exists or just runs it if it already exists. Note that the `docker-compose` file is only meant to be used during development.

## Running the tests

The project is configured to run unit and integration tests using Jest. The structure of the `tests` folder is as follow:

- `unit`: this is the root folder for the unit tests.
- `unit/cases`: all the unit tests goes here and are ordered based on the project folder structure. For example, all controllers tests goes in `tests/unit/cases/src/controllers`.
- `unit/fixtures`: the data shared by the tests which simulate external sources. For example, to simulate the data obtained from a database or an external API, it can be stored here.
- `unit/matchers`: the custom matchers used to make assertions. For example, to create a matcher to verify that an object has certain types, it can be stored here.
- `unit/mocks`: the mocks of custom modules or from the `node_modules` folder. Basically here we can change the behaviour of the modules to isolate our tests.
- `unit/schemas`: the schemas which describes the structure of an object. It's used to assert that an object has a valid structure.
- `integration`: this is the root folder for the integration tests.
- `integration/cases`: all the integration tests goes here.
- `integration/jest.config.js`: corresponds to the Jest configuration specific for this type of tests.

### Unit tests

The unit tests are executed with Jest and they cover the server, routes, controllers, middlewares, among other modules. The project also includes coverage test.

Run the unit tests

```
npm run test
```

Run the unit tests with coverage included

```
npm run test:coverage
```

**Note:** To see the detailed results of the coverage, open the file found in `coverage/lcov-report/index.html`.

#### Mocks

The mocks must be imported at the very top of the file, so this way the following imported modules will use the mocked version, instead of the real one:

```javascript
import 'tests/mocks/utils/api-docs';
// All other imports must go below.
// In this example, if a module imports the "api-docs" class, it will use the mocked version.
```

Remember to restore it when the tests are finished:

```javascript
afterAll((): void => {
  jest.restoreAllMocks();
});
```

Some modules in the `node_modules` folder are also mocked, and can be imported one by one, or by only importing `tests/mocks/node-modules/mock-all`. If you create new mocks, be sure to keep that file up to date.

Another thing to notice, is that the mocks constructors are declared using the `function()` syntax, because calling `new` in arrow functions [is not allowed in JavaScript](https://jestjs.io/docs/en/es6-class-mocks#mock-using-module-factory-parameter).

### Integration tests

The integration tests are used to test that all components of the microservice works as a whole. This can be done by making HTTP calls to the API as it were a client trying to consume the microservice.

The tests uses the URL configured in the `APP_URL` settings, so that way they can be run pointing to a specific environment. In the case of the CI pipeline, it points to `localhost` because the pipeline runs a Docker container.

Run the integration tests

```
npm run test:integration
```

## ESLint + Prettier

The project uses ESLint and Prettier to analyze, format and find problems in the code. The rules are based on the [Airbnb configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), but further customization can be done in the `.eslintrc.json` file.

In the [IDE configuration](#ide-configuration) section of the document it's specified that is recommended to enable the `auto-format on save` feature of the IDE that you are using, so that way the code will automatically format without having to run any command. But nevertheless, if you want to manually execute the analysis, run the following command:

```
npm run lint
```

And if you want to automatically fix the problems

```
npm run lint:fix
```

## Configuration variables

The microservice is ready to read configuration variables so you can dynamically set parameters, either by a local file, command line arguments or environment variables. All configuration files must be in the `.env` file.

It uses a configuration source based on a hierarchically order, which is a `dotenv` feature. This means that some configurations will have a higher priority over the others and will override them. For example, if you set the same two variables in a `.env` file and the other on a environment variable, the later one will be used, because environment variables have higher priority. This is really useful when you want to set default values and give the option to override them.

## Module imports

The project is configured so that you can import your own modules using absolute paths like they were installed into `node_modules` directory. This means that instead of writing `../../../some/deep/directory`, you can simple write `some/deep/directory`.

For example, if we want to import a file located in `src/services/some-service` into a controller located in `src/controllers/some-controller`, we would normally do it this way `import someService from '../services/some-service'`. At first sight this doesn't look bad, but if we start to create nested folders, this could easily get out of hand. And also, when importing modules, you have to think where you are currently standing, and then navigate backwards to a higher level folder, and then go all the way down to the file that you require. This is unnecessary mental work.

To solve this problem, the project uses a configuration of TypeScript where we can specify path mapping in the `tsconfig.json` file, specifically in the `paths` property. This allow us to map module paths to physical paths in the filesystem, so for example, we can simple do `import someService from 'src/services/some-service'`. This is way cleaner and simple, and you don't have to mentally navigate through the directories to reach your required file, just import it using the root of the project as your starting point.

There is a problem though, because when the TypeScript files are compiled, JavaScript will not understand those paths as it will try to search those modules in the `node_modules` directory. To solve this, we use a package named `app-module-path`.

**Important:** Jest uses his own module system, so `app-module-path` won't work for the test files. To solve this, the directories have to manually be configured in `jest.config.js`, so if you create a new directory, make sure to add it in the `moduleNameMapper` property.

## Request validation

As you can't be sure that the users will send correct data to the service, the requests must be validated. For this, the project uses `joi` which is a powerful data validator, enabling you to describe the structure of the data that must be provided.

When you create a new endpoint, be sure to validate the user input. To do this, follow the next steps:

1. Create a schema under `src/validators/schemas` folder. In there, describe how the data must be provided.
2. Create a validator under `src/validators` folder. In there, invoke the `validate()` method from the schema created in the previous step, passing the data received from the endpoint.
3. Create a middleware to invoke the validator, under `src/middlewares` folder. If the validator gives an error, you can return an HTTP status code indicating that the request does not have the expected format.
4. Finally, inject the middleware in your routes, under `src/routes` folder.

## API documentation

Almost no one likes to document, is tedious and boring, and for that reason I tried to search a solution that could easier my life. That's where I found about OpenAPI, a specification for describing your service in a very simple way; I highly recommend that you take a look about it before proceeding further. The Swagger tools are used to provide a web page to interact and navigate the documentation, making it easier to discover what provides the API.

The documentation is dynamically generated using Swagger based on the YAML files located in the `docs` folder, so when you make new endpoints or update old ones, make sure to keep those files up to date. The structure of the `docs` directory is as follows:

- `index.yaml`: this is the root file, and where the paths files are referenced.
- `/paths`: here goes the paths files where the endpoints are described.
- `/schemas`: here goes the schemas which describes the objects that the endpoints receives and responds.

The specification is splitted in smaller files because is easier to maintain, but that introduced a little problem. As of the writing of this document, relative paths does not work at all, so when you reference a file, an error is raised indicating that the file could not be found. To fix this, at the moment the documentation is generated, a merge is done, unifying all the files into a single one and so the relative paths dissapear (credits to [json-refs](https://github.com/whitlockjc/json-refs)).

To see the documentation navigate to `http://localhost:3000/docs`

## CORS

CORS is enabled thanks to the [koa-cors](https://github.com/koajs/cors) middleware. If you want to add rules, check the official documentation for more details.

## Git Hooks

The boilerplate is configured to use git hooks, which are scripts that fires when certain actions occur.

There are various hooks types, and the one that is already integrated is the `pre-commit` hook. The project uses `husky` to execute scripts and `lint-staged` to run the scripts only on staged files. This allow us to analyze the files and decide if they can be commited or not. For example, the project is configured to run `ESLint` on those files, and if there exists syntax problems, the files can not be commited. It is true that the files can be automatically fixed with the `--fix` option, but I think it's best to let the developer manually solve the problem, so he learns why his code didn't pass the linter and to configure his IDE to enable the auto-format on save.

## CI/CD pipeline

The project is configured to use GitHub Actions as a CI/CD service. The main reason to use this platform is that it is already integrated into the repository and for free, so there is no need to install or configure anything, just write your pipeline and let GitHub worry for the rest. You can find the pipelines in `.github/workflows`, where two files exists: `ci.yml` and `cd.yml`.

The `ci.yml` pipeline is responsible for the `Continuous Integration` tasks and it does the following:

- Checkout the `master` branch
- Install Node.js
- Install the dependencies
- Build the project
- Run the linter
- Run the unit tests
- Build the Docker image
- Run a Docker container using the previous image
- Run the integration tests on the previous Docker container

This actions are triggered whenever a `push` is made to any branch (except for `*.md` files), so that way we can know if there is a problem with the new changes as soon as posible.

On the other hand, the `cd.yml` pipeline is responsible for the `Continuous Delivery` tasks and it does the following:

- Checkout the `master` branch
- Build a Docker image
- Push the image to Docker Hub
- Deploy the image to Heroku

**Important:** Remember to add the following variables in the `Secrets` section of your GitHub repository configuration:

- `DOCKER_USERNAME`: the Docker Hub username
- `DOCKER_PASSWORD`: the Docker Hub password
- `HEROKU_API_KEY`: the API key generated by Heroku (more info [here](https://devcenter.heroku.com/articles/platform-api-quickstart#authentication))
- `HEROKU_APP_NAME`: the name of your Heroku application

Also don't forget to change the Docker Hub repository name

```yaml
with:
  username: ${{ secrets.DOCKER_USERNAME }}
  password: ${{ secrets.DOCKER_PASSWORD }}
  repository: cazocar/node-microservice-boilerplate # <-- Change here
  tags: latest
```

This actions are triggered whenever a `push` is made to the `master` branch and it affects files found in the `src` folder or in the `package.json` file, so it only executes when stable changes are ready to be deployed.

## Deployment

To deploy the microservice, you have various options.

### Manual deploy

If you want to manually deploy the microservice, first transpile the typescript files

```
npm run build
```

This will create a `dist` folder with the code transpiled to Javascript. Now you have to copy the following files and folders:

- `dist`
- `package.json`
- `package-lock.json`
- `settings`
- `docs`

And then put them wherever you are going to make the deploy.

**Important:** Remember to not copy the `local.yml` file or it will override any other configuration specific for your deployment environment, as its only meant for development purposes. If you need to do some configuration specific to your environment (for example, you need to change the URL of some external API in production), it's highly recommended that you use the environment-specific file (in the previous example, use the `production.yml` file if your `NODE_ENV` variable is set to `production`).

Now, install the dependencies where you copied the files.

```
npm install --production
```

Finally, use a process manager or a web server to run and manage the microservice. I recommend using [pm2](https://pm2.keymetrics.io/).

If you want to manually start it, run the following command

```
npm run start
```

### Deploy with Docker

The Dockerfile has a multi-stage configuration to be used during development as well in production.

To build the image in production mode, you only have to run the following command

```
npm run docker:build
```

Or if you prefer to do it manually, run the following command

```
# 1. Build the image
docker build -t microservice-boilerplate .

# 2. Remove "development" intermediate image
# This step is optional, but nobody likes garbage, right?
docker image prune -f --filter label=stage=intermediate
```

**Note:** The tag `microservice-boilerplate` is an example, use whatever name you like.

This will create an image with the code transpiled to plain Javascript and with only the needed dependencies. The production stage is the last one, so we don't have to specify the `--target` option.

Now, you can upload the image to [Docker Hub](https://hub.docker.com/) and then download it on your server from the repository

```
# 1. Run this command on your local machine
docker tag microservice-boilerplate your-docker-user/your-repository-name
docker push your-docker-user/your-repository-name

# 2. Run this command on your server
docker pull your-docker-user/your-repository-name
```

**Note:** `your-docker-user` is the username of your Docker Hub account, and `your-repository-name` is the name of the repository created in Docker Hub. For more information on how to create a repository, [click here](https://docs.docker.com/docker-hub/repos/#creating-repositories).

Or alternatively you can zip it and transfer the zipped file to your server and load it

```
# 1. Run this command on your local machine
docker save -o microservice-boilerplate.zip microservice-boilerplate

# 2. Transfer the zipped file to your server

# 3. Run this command on your server
docker load -i <path-to-image.zip>
```

Finally, you can create and run a container with the image

```
# If you uploaded the image to Docker Hub
docker run -d -p 3000:3000 your-docker-user/your-repository-name

# Or if you zipped the image
docker run -d -p 3000:3000 microservice-boilerplate
```

## Built with

- [Node.js](https://nodejs.org/)
- [Koa](https://koajs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Supertest](http://visionmedia.github.io/superagent/)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/okonet/lint-staged)
- [dotenv](https://github.com/motdotla/dotenv)
- [app-module-path](https://github.com/patrick-steele-idem/app-module-path-node)
- [joi](https://hapi.dev/module/joi/)
- [OpenAPI](https://www.openapis.org/)
- [Swagger](https://swagger.io/)
