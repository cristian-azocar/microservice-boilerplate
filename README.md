# Microservice Boilerplate

A **highly opinionated** RESTful microservice boilerplate using [Node.js](https://nodejs.org/), [Koa](https://koajs.com/), [Typescript](https://www.typescriptlang.org/) and other awesome tools.
It's main purpose is to speed the development of new microservices by providing an already configured project, using the best tools and a scalable code structure.

## Table of contents

- [What is included in this boilerplate?](#what-is-included-in-this-boilerplate?)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [IDE configuration](#ide-configuration)
- [Running the microservice](#running-the-microservice)
- [Running the tests](#running-the-tests)
  - [Unit tests](#unit-tests)
- [Configuration variables](#configuration-variables)
- [Module imports](#module-imports)
- [Request validation](#request-validation)
- [API documentation](#api-documentation)
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
- Configuration variables ready to be read from the command line arguments, environment variables or YAML files, thanks to [nconf](https://github.com/indexzero/nconf).
- Easy and readable way to import your modules using absolute paths like they were installed into `node_modules` directory, thanks to [app-module-path](https://github.com/patrick-steele-idem/app-module-path-node).
- Request validations using [joi](https://hapi.dev/module/joi/).
- API documentation using the [OpenAPI](https://www.openapis.org/) specification and [Swagger](https://swagger.io/).
- And all of this in a [Docker](https://www.docker.com/) container.

## Getting started

### Prerequisites

You need to have installed the following tools:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (only needed if you want to run the container)

### Installing

Clone the repository

```
git clone https://github.com/CristianAzocar/microservice-boilerplate.git
```

Install the dependencies (only needed if you don't want to use Docker)

```
npm install
```

### IDE configuration

The project is configured to use ESLint, Prettier and EditorConfig to format de code, so it is highly recommended that you enable the auto-format feature in your code editor.

If you are using [Visual Studio Code](https://code.visualstudio.com/), follow this steps:

- Open the command palette with `CTRL + SHIFT + P`
- Type `open settings` and select `Open Workspace Settings (JSON)`
- A JSON file will open. Copy and paste the following:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

Now the IDE will automatically format the code when you save.

## Running the microservice

Run the microservice using Nodemon

```
npm run dev
```

Or using Docker

```
docker-compose up -d
```

If for some reason you want to build the image manually, make sure to specify the development stage

```
docker build --target development .
```

**Note:** By default, the microservice uses the port 3000.

The `docker-compose` file exists because is so much cleaner to have a YAML file with the configuration to build and run a container, than to have to write a very long script. Also, you only have to type a very short command to start it.
Note that the `docker-compose` file is only meant to be used during development.

## Running the tests

### Unit tests

The unit tests test the server, routes, controllers and services.
You might have noticed that there is a `tests/schemas` folder. There goes the values that are expected from the responses.

Run the unit tests

```
npm run test
```

Run the unit tests with coverage included

```
npm run test:coverage
```

## Configuration variables

The microservice is ready to read configuration variables so you can dynamically set parameters without having to re-build the application, either by command line arguments, environment variables, environment-specific files or a default file. All configuration files must be in [YAML](https://yaml.org/) format.

It uses a configuration source based on a hierarchically order, which is a `nconf` feature. This means that some configurations will have a higher priority over the others and will override them. For example, if you set the same two variables in a `default.yml` file and the other on a environment variable, the later one will be used, because environment variables have higher priority. This is really useful when you want to set default values and give the option to override them, or when you want to have different configuration files depending on the environment the service is running (development, production, etc).

The hierarchical order of priority is as follows

- Command line arguments
- Environment variables
- Environment-specific file (`development.yml`, `production.yml`, etc)
- Default file (`default.yml`)

The environment-specific file name is built based on the `NODE_ENV` environment variable value. For example, if your `NODE_ENV` value is `staging`, then the microservice will search for a file named `staging.yml`.

Another thing to notice, is that the `default.yml` file has the least priority, so if you forget to configure the variable in your environment, and also forget to add it to the `default.yml` file, its value will `undefined`, which might bring some unexpected problems. That's why it's highly recommended that for every configuration variable that you create, set a fallback value in the `default.yml` file, unless you actually don't care if it has an `undefined` value.

## Module imports

The project is configured so that you can import your own modules using absolute paths like they were installed into `node_modules` directory. This means that instead of writing `../../../some/deep/directory`, you can simple write `some/deep/directory`.

For example, if we want to import a file located in `src/services/some-service` into a controller located in `src/controllers/some-controller`, we would normally do it this way `import someService from '../services/some-service'`. At first sight this doesn't look bad, but if we start to create nested folders, this could easily get out of hand. And also, when importing modules, you have to think where you are currently standing, and then navigate backwards to a higher level folder, and then go all the way down to the file that you require. This is unnecessary mental work.

To solve this problem the project use a package named `app-module-path`. With it, we can simple do `import someService from 'src/services/some-service'`. This is way cleaner and simple, and you don't have to mentally navigate through the directories to reach your required file, just import it using the root of the project as your starting point.

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

To see the documentation navigate to `http://localhost:3000/docs`.

## Deployment

To deploy the microservice, you have various options.

### Manual deploy

If you want to manually deploy the microservice, first transpile the typescript files

```
npm run build
```

This will create a `dist` folder with the code transpiled to Javascript.
Copy that folder, the `package.json` and the `package-lock.json` files, and put them wherever you are going to make the deploy.

Now, install the dependencies where you copied the files.

```
npm install --production
```

Finally, use a process manager or a web server to run and manage the microservice. I recommend using [pm2](https://pm2.keymetrics.io/).

### Deploy with Docker

The Dockerfile has a multi-stage configuration to be used during development as well in production.

To build the image in production mode, you only have to run the following command

```
# Build the image
docker build -t my-microservice .

# Remove "development" intermediate image
# This step is optional, but nobody likes garbage, right?
docker image prune -f
```

**Note:** The tag `my-microservice` is an example, use whatever name you like.

This will create an image with the code transpiled to plain Javascript and with only the needed dependencies.
The production stage is the last one, so we don't have to specify the `--target` option.

Now, you can upload the image to [Docker Hub](https://hub.docker.com/) and then download it on your server from the repository

```
# 1. Run this command on your local machine
docker tag my-microservice your-company-name/my-microservice
docker push your-company-name/my-microservice

# 2. Run this command on your server
docker pull your-company-name/my-microservice
```

Or alternatively you can zip it and transfer the zipped file to your server and load it

```
# 1. Run this command on your local machine
docker save -o my-microservice.zip my-microservice

# 2. Transfer the zipped file to your server

# 3. Run this command on your server
docker load -i <path-to-image.zip>
```

Finally, you can create and run a container with the image

```
docker run -d -p 3000:3000 my-microservice
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
- [nconf](https://github.com/indexzero/nconf)
- [app-module-path](https://github.com/patrick-steele-idem/app-module-path-node)
- [joi](https://hapi.dev/module/joi/)
- [OpenAPI](https://www.openapis.org/)
- [Swagger](https://swagger.io/)
