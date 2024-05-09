# 🚀 Frontend Dev Box
[![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white)](https://turborepo.com/)
[![Vite JS](https://img.shields.io/badge/Vite_JS-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

This monorepo was created with [Turborepo](https://turborepo.com/) by Vercel. It contains a Storybook and a React application with Vite in TypeScript.

- [🚀 Monorepo with Turborepo](#monorepo-with-turborepo)
    - [🚪 Application Ports](#application-ports)
    - [🛠️ Installation](#installation)
    - [⚡ Execution](#execution)
    - [🏗️ Project Structure](#project-structure)
    - [📚 Languages and Frameworks](#languages-and-frameworks)
    - [🎯 Usage](#usage)
    - [🤝 Contribution](#contribution)
    - [📜 Commands](#commands)
    - [📄 Scripts](#scripts)
        - [🧹 Format Fresh Vite React App](#format-fresh-vite-react-app)
        - [📦 Generate Package](#generate-package)
    - [🔍 ESLint Configuration](#eslint-configuration)
        - [🧩 Plugins](#plugins)
        - [📏 Custom Rules](#custom-rules)
        - [⚙️ Custom Settings](#custom-settings)
        - [➡️ Extends](#extends)
      
## 🚪 Application Ports

- The Vite JS application runs on port 5173
- The Storybook runs on port 6006

## 🛠️ Installation

To install the project, run the command `npm install` at the root of the project.

## ⚡ Execution

To launch all applications, run the command `npm run dev` from the root of the project.

## 🏗️ Project Structure

The project is structured into workspaces, which are specified in the `package.json` file. The workspaces include packages and apps. The `turbo.json` file defines the build pipeline for the project.

The `example` package, located in `packages/example`, exports several components and has its own set of scripts and dependencies.

## 📚 Languages and Frameworks

The project uses Turborepo, Storybook, JavaScript, npm, React, and TypeScript. The Storybook and the Vite JS application are both based on React and TypeScript.

## 🎯 Usage

This repository is open for use by web developers. You can use it as a reference for setting up your own monorepo with Turborepo, or contribute to it to help improve its configuration.

## 🤝 Contribution

Feel free to use this repository as you see fit. You can fork it, propose improvements, bug fixes, or any other suggestions. I am always looking to improve in terms of configuration, so your contributions are welcome.

## 📜 Commands

- `npm run dev`: Launch all applications
- `npm run build`: Build all applications
- `npm run lint`: Lint all applications
- `npm run lint:fix`: Fix linting issues in all applications
- `npm run test`: Run tests for all applications
- `npm run gen-pkg`: Generate a new package using the script `scripts/gen-pkg.js`
- `npm run format-fresh-app`: Format a fresh Vite React application using the script `scripts/format-fresh-vite-react-app.js`

## 📄 Scripts

### 🧹 Format Fresh Vite React App

This Node.js script is used to format and lint a new Vite React application. Here's a breakdown of its functionality:

1. **Check for uncommitted changes**: The script first checks if there are any uncommitted changes in your Git repository. If there are, it prompts you to confirm whether you want to continue. If you choose not to continue, it cancels the operation.

2. **Prompt for application name**: It then prompts you to enter the name of the application (e.g., "apps/app-example").

3. **Remove existing ESLint configuration**: If an ESLint configuration file (`.eslintrc.cjs`) exists in the application directory, it deletes it.

4. **Update package.json scripts**: It reads the `package.json` file of the application, removes the `lint` script if it exists, and adds two new scripts: `lint` and `lint:fix`. The `lint` script runs ESLint on the application code, and the `lint:fix` script runs ESLint and automatically fixes problems that can be fixed.

5. **Run lint:fix script**: It then runs the `lint:fix` script, which lints the code and fixes any fixable problems.

6. **Commit changes**: After successfully linting and fixing the code, it stages all changes and commits them with the message "build: format and lint [appName] application".

This script is useful for ensuring that the code in a new Vite React application adheres to the project's linting rules and is properly formatted before it's committed to the repository. It automates the process of setting up linting for the application, running the linter, fixing any fixable problems, and committing the changes.

### 📦 Generate Package

This Node.js script is used to generate a new package in the project. Here's a breakdown of its functionality:

1. **Prompt for scope and package name**: The script prompts you to enter the scope (default is "@scope") and the name of the package.

2. **Create package**: It then initializes a new package with the provided scope and name in the `./packages` directory.

3. **Generate .npmignore**: It creates a `.npmignore` file in the package directory, which specifies the files and directories that should not be included when the package is published to npm.

4. **Generate tsconfig for package**: It creates a `tsconfig.pkg.json` file in the package directory, which extends the base TypeScript configuration (`tsconfig.build.json`) and includes all TypeScript files in the `src` directory.

5. **Generate README.md**: It creates a `README.md` file in the package directory, which includes basic information about the package and its contribution guidelines.

6. **Generate index.ts**: It creates an `index.ts` file in the `src` directory of the package, which exports a simple `hello` function.

7. **Generate index.test.ts**: It creates an `index.test.ts` file in the `src` directory of the package, which includes a test for the `hello` function.

8. **Update package.json**: It updates the `package.json` file of the package to include the main entry point (`dist/index.js`), TypeScript definitions (`dist/index.d.ts`), and scripts for building the package.

This script is useful for quickly setting up a new package with a standard structure and configuration. It automates the process of creating the package directory, initializing the package, and generating the necessary files.

## 🔍 ESLint Configuration

This project uses ESLint for static code analysis. The configuration is as follows:

### 🧩 Plugins

- `@eslint/js`: Provides ESLint's recommended rules.
- `eslint-plugin-import`: Helps with validation of proper imports.
- `eslint-plugin-react`: React specific linting rules.

### 📏 Custom Rules

- `react/jsx-uses-react`: Turned off as React import is not necessary in React 17.
- `react/react-in-jsx-scope`: Turned off as React import is not necessary in React 17.
- `semi`: Enforces the use of semicolons.
- `object-curly-spacing`: Enforces consistent spacing inside braces.
- `no-multiple-empty-lines`: Disallows multiple empty lines.
- `indent`: Enforces a consistent indentation style.
- `quotes`: Enforces the consistent use of single quotes.
- `no-unused-vars`: Variables that are declared and not used anywhere in the code are considered to be an error.
- `comma-dangle`: Requires trailing commas in multiline object literals.
- `import/first`: Ensures all imports appear before other statements.
- `import/order`: Enforces a convention in the order of require() / import statements.
- `import/no-duplicates`: Reports if a resolved path is imported more than once.

### ⚙️ Custom Settings

- `react`: Sets the React version to "detect" to automatically detect the version of React in your project.

### ➡️ Extends

- `pluginJs.configs.recommended`: ESLint's recommended rules.
- `tseslint.configs.recommended`: TypeScript specific linting rules from the TypeScript ESLint plugin.
- `pluginReactConfig`: React specific linting rules from the React ESLint plugin.
