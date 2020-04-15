# Microservice Boilerplate

A simple microservice boilerplate using [Node.js](https://nodejs.org/), [Koa](https://koajs.com/), [Typescript](https://www.typescriptlang.org/) and other awesome tools.
It's main purpose is to speed the development of new microservices by providing an already configured project, using the best tools and a scalable code structure.

## What is included in this boilerplate?

- A microservice developed using Koa framework.
- All code typed with Typescript.
- Hot-reload with [Nodemon](https://nodemon.io/).
- Unit tests with [Jest](https://jestjs.io/) and [Supertest](http://visionmedia.github.io/superagent/).
- Good and clean code practices using [ESLint](https://eslint.org/) (based on [Airbnb configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)), [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org/).
- A pre-commit [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to prevent dirty code to reach your local and remote repository, using [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Configuration variables ready to be read from the command line arguments, environment variables or YAML files, thanks to [nconf](https://github.com/indexzero/nconf).
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
You might have noticed that there is a `__matches__` folder. There goes the values that are expected from the responses.

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
