# Monorepo with Turborepo
[![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white)](https://turborepo.com/)
[![Vite JS](https://img.shields.io/badge/Vite_JS-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Create React App](https://img.shields.io/badge/Create_React_App-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://create-react-app.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

This monorepo was created with [Turborepo](https://turborepo.com/) by Vercel.
It contains a Storybook, a React application with Vite in TypeScript, 
and an application with Create React App (CRA).

## Why CRA and Vite JS in the same monorepo?

This was done as part of a POC for another private project.
This private project contains a CRA application, a new Vite JS application,
and a Storybook (also based on Vite JS).

## Application Ports

- The CRA application runs on port 3000
- The Vite JS application runs on port 5173
- The Storybook runs on port 6006

## Installation

To install the project, run the command `npm install` at the root of the project.

## Execution

To launch all applications, run the command `npm run dev` from the root of the project.

## Project Structure

The project is structured into workspaces, which are specified in the `package.json`
file. The workspaces include packages and apps. The `turbo.json` file defines the build
pipeline for the project.

The `ui` package, located in `packages/ui`, exports several components and has its
own set of scripts and dependencies.

## Languages and Frameworks

The project uses Turborepo, Storybook, JavaScript, npm, React, and TypeScript. The Storybook is based on
React and TypeScript, while the Vite JS application is based on React and TypeScript.
The CRA application is based on React and JavaScript.


## Usage

This repository is open for use by web developers. You can use it as a reference
for setting up your own monorepo with Turborepo, or contribute to it to help improve
its configuration.

## Contribution

Feel free to use this repository as you see fit. You can fork it, propose improvements,
bug fixes, or any other suggestions. I am always looking to improve in terms of
configuration, so your contributions are welcome.
