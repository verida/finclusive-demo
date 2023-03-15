# Verifiable Credential demo with FinClusive

Demonstrating the use of KYC Verifiable Credentials.

This application is a demo and is **not meant to be used in production**.

## Introduction

This repository provides the frontend of an application to be used as a demo illustrating how KYC Verifiable Credentials can be requested by applications.

It allows the following:

- Connect the user with a Verida Identity
- Request the user to provide KYC proof as a Verifiable Credential
- Provide a link to perform a KYC with our partner FinClusive
- Receive and check the credential

## Usage

This frontend application has been bootstrapped by [Create React App](https://create-react-app.dev/).

### Development

Copy/paste the `.env.example` file to `.env.local` and fill the values with your own.

```bash
cp .env.example .env.local
```

Some components works only with certain version of node. We recommend using `nvm` with the provided `.nvmrc` and the following command:

```bash
nvm use
```

Install the dependencies with the following command:

```bash
yarn install
```

Then start the development server with the following command:

```bash
yarn start
```

### Quality

The repository use both eslint and prettier to ensure code quality and conformity to our guidelines.

Ensure your editor is configured to use the provided `.eslintrc` and `.prettierrc` files.

Build will fail if there are linting errors.

### Deployment

Check the file `.env.example` for the list of environment variables that need to be set.

To build the application, run the following command:

```bash
yarn build
```

The destination folder is `build`. It can be served by any web server.
This step is higly dependent on the hosting environment, refer to their documentation and potential plugins for create-react-app based Application.

### Note

The repository has been bootstrapped by create-react-app version `5.0.1` which includes webpack version `^5.0.0`.

Some tweaks were necessary to accomodate the lack of some polyfills in webpack 5. See the following issues for more details: https://github.com/facebook/create-react-app/issues/11756#issuecomment-1184657437

## License

ISC
