# Microservice Boilerplate

[![dependencies Status](https://david-dm.org/cristian-azocar/microservice-boilerplate/status.svg)](https://david-dm.org/cristian-azocar/microservice-boilerplate)
[![Actions Status](https://github.com/cristian-azocar/microservice-boilerplate/workflows/Build%20and%20test/badge.svg)](https://github.com/cristian-azocar/microservice-boilerplate/actions)

A **highly opinionated** RESTful microservice boilerplate using [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Typescript](https://www.typescriptlang.org/) and other awesome tools. It's main purpose is to speed the development of new microservices by providing an already configured project, using the best tools and a scalable code structure.

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

- A RESTful microservice developed using Express.
- All code strongly-typed with Typescript.
- Hot-reload with [Nodemon](https://nodemon.io/).
- Unit tests with [Jest](https://jestjs.io/) and [Supertest](http://visionmedia.github.io/superagent/).
- Good and clean code practices using [ESLint](https://eslint.org/) (based on [Airbnb configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)), [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org/).
- A pre-commit [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to prevent dirty code to reach your local and remote repository, using [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Configuration variables ready to be read from the command line arguments, environment variables or `.env` files, thanks to [dotenv](https://github.com/motdotla/dotenv).
- Request validations using [joi](https://hapi.dev/module/joi/).
- API documentation using the [OpenAPI](https://www.openapis.org/) specification and [Swagger](https://swagger.io/).
- CORS support thanks to [CORS](https://github.com/expressjs/cors) middleware.
- CI/CD pipelines support using [GitHub Actions](https://github.com/features/actions).
- And all of this in a [Docker](https://www.docker.com/) container.

## Live demo

You can see a live demo in the following link:

https://microservice-boilerplate.herokuapp.com

The demo is deployed in Heroku and it includes the following endpoints:

| Endpoint    | Method | Description                                         |
| ----------- | ------ | --------------------------------------------------- |
| /api/health | GET    | Gets the health information of the microservice     |
| /api/login  | POST   | Logs a user into the system                         |
| /api/logout | POST   | Logs out a user                                     |
| /api/docs   | GET    | Gets the API documentation rendered with Swagger UI |

For more information about the endpoints, go to the [API documentation](https://microservice-boilerplate.herokuapp.com/api/docs).

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

**Note:** if you are using Powershell, replace `$(pwd)` with `${pwd}`.

Let's see a brief explanation of the volume mount in the second command:

- `-v $(pwd):/usr/src/app`: we are telling Docker to mount a volume between `$(pwd)` (which is the current directory of our computer) and `/usr/src/app` (which is the directory were our code lives inside the container), so that way any change made to the files located in our computer will be applied to the container, without the need to re-build the image.
- `-v /usr/src/app/node_modules`: we are telling Docker to not map the `node_modules` folder inside the container, so that way our local `node_modules` folder (who should not even exist or at least be empty) will not override the one in the container.

The `docker-compose` file exists because is so much cleaner to have a YAML file with the configuration to build and run a container, than to have to write a very long script. Also, you only have to type a very short command to start it and it already takes care of creating the container if it not exists or just runs it if it already exists. Note that the `docker-compose` file is only meant to be used during development.

## Running the tests

The project is configured to run unit and end-to-end tests using Jest. The structure of the tests is as follow:

- Each unit test resides at the same level as the script that is testing.
- The `e2e` folder contains all the end-to-end tests.

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

**Note:** To see the detailed results of the coverage, open the file found in `coverage/Icov-report/index.html`.

#### Mocks

Mocks must be defined before the test itself, so this way the it will use the mocked version, instead of the real one:

```javascript
// In this example we are mocking the "AuthService", to isolate the test
jest.mock('../../services/AuthService');

describe('AuthController', (): void => {
  // The test goes here
});
```

Remember to restore it when the tests are finished:

```javascript
afterAll((): void => {
  jest.restoreAllMocks();
});
```

**Note:** You can also mock external packages.

### End-to-end tests

The E2E tests are used to test that all components of the microservice works as a whole. This can be done by making HTTP requests to the API as it were a client trying to consume the microservice.

The tests uses the URL configured in the `APP_URL` settings, so that way they can be run pointing to a specific environment. In the case of the CI pipeline, it points to `localhost` because the pipeline runs a Docker container.

Run the end-to-end tests

```
npm run test:e2e
```

## ESLint + Prettier

The project uses ESLint and Prettier to analyze, format and find problems in the code. The rules are based on the [Airbnb configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), but further customization can be done in the `.eslintrc.json` file.

If you are using Visual Studio Code, the project is configured to automatically format the code on save without having to run any command. But nevertheless, if you want to manually execute the analysis, run the following command:

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

## Request validation

As you can't be sure that the users will send correct data to the service, the requests must be validated. For this, the project uses `joi` which is a powerful data validator, enabling you to describe the structure of the data that must be provided.

When you create a new endpoint, be sure to validate the user input. To do this, follow the next steps:

1. Create a schema under `src/schemas` folder. In there, describe how the data must be provided.
4. Inject an `ValidatorMiddleware` instance in the routes that you want to validate, under `src/routes` folder, passing the schema previously created.

## API documentation

Almost no one likes to document, is tedious and boring, and for that reason I tried to search a solution that could easier my life. That's where I found about OpenAPI, a specification for describing your service in a very simple way; I highly recommend that you take a look about it before proceeding further. The Swagger tools are used to provide a web page to interact and navigate the documentation, making it easier to discover what provides the API.

The documentation is dynamically generated using Swagger based on the YAML files located in the `src/docs` folder, so when you make new endpoints or update old ones, make sure to keep those files up to date. Each file located under this folder, describes the endpoints (requests and responses).

To see the documentation navigate to `http://localhost:3000/api/docs`.

## CORS

CORS is enabled thanks to the [CORS](https://github.com/expressjs/cors) package. If you want to add rules, check the official documentation for more details.

## Git Hooks

The boilerplate is configured to use git hooks, which are scripts that fires when certain actions occur.

There are various hooks types, and the one that is already integrated is the `pre-commit` hook. The project uses `husky` to execute scripts and `lint-staged` to run the scripts only on staged files. This allow us to analyze the files and decide if they can be commited or not. For example, the project is configured to run `ESLint` on those files, and if there exists syntax problems, the files can not be commited. It is true that the files can be automatically fixed with the `--fix` option, but I think it's best to let the developer manually solve the problem, so he learns why his code didn't pass the linter.

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

This actions are triggered whenever a `push` is made to the `master` branch and it affects files found in the `src` folder, `package.json` or `Dockerfile`, so it only executes when stable changes are ready to be deployed.

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

And then put them wherever you are going to make the deploy.

**Important:** Remember to not copy the `.env` file, as its only meant for development purposes. If you need to do some configuration specific to your environment (for example, you need to change the URL of some external API in production), it's highly recommended that you use an environment variable.

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
- [Express](https://expressjs.com/)
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
- [joi](https://hapi.dev/module/joi/)
- [OpenAPI](https://www.openapis.org/)
- [Swagger](https://swagger.io/)
