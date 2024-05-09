#!/usr/bin/env node
import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import packageJson from '../package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line no-extend-native
String.prototype.toKebabCase = function() {
  return this.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr).trim();
};

async function main() {
  console.log(chalk.green('🚀 Starting package generation...'));

  const { scope } = await inquirer.prompt({
    type: 'input',
    name: 'scope',
    message: '🔭 Enter Scope (default: @scope):',
    default: 'scope',
  });
  const scopeName = scope.toKebabCase();

  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: '📦 What is the name of the package ? ',
  });
  const packageName = name.toKebabCase();

  console.log(chalk.blue('🔧 Creating package...'));
  const cmd = `npm init --scope=@${scopeName} -y -w ./packages/${packageName}`;
  execSync(cmd.toString(), {
    cwd: __dirname,
    stdio: 'inherit',
  });

  console.log(chalk.blue('📝 Generating files...'));
  // Generate npmignore
  await fs.outputFile(`./packages/${packageName}/.npmignore`, `*
    !dist/**
    !package.json
    !readme.md
  `);

  // Generate tsconfig for package
  await fs.writeJSON(`./packages/${packageName}/tsconfig.pkg.json`, {
    extends: '../../tsconfig.build.json',
    include: ['src'],
    exclude: ['node_modules', '**/*.test.ts'],
  }, { spaces: 2 });

  // Generate readme.md
  await fs.outputFile(`./packages/${packageName}/readme.md`, `[![Minimal node version](https://img.shields.io/static/v1?label=node&message=${packageJson.engines.node}&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=${packageJson.engines.npm}&logo=npm&color)](https://github.com/npm/cli/releases)

# ${packageName} 🎉

## Description

${packageName} package 📚

## Contributing

1. npm run build - Build ts 🏗️
`);

  // Generate index.ts
  await fs.outputFile(`./packages/${packageName}/src/index.ts`, `// Hello 👋
export function hello (name: string): string {
  return 'hello ' + name
}

`);

  // Generate index.test.ts
  await fs.outputFile(`./packages/${packageName}/src/index.test.ts`, `import { describe, expect, test } from '@jest/globals'
import { hello } from './index'

describe('[${packageName}] hello()', () => {
  test('When hello("john") then return "hello john', () => {
    // Arrange
    const name = 'john'

    // Act
    const message = hello(name)

    // Assert
    expect(message).toBe('hello john')
  })
})
`);

  // Generate package.json
  const pkgPath = `../packages/${packageName}/package.json`;
  const importedPkg = await import(pkgPath, { assert: { type: 'json' } });
  const pkg = { ...importedPkg.default }; // Create a new object and spread the properties of the imported module into it

  pkg.types = 'dist/index.d.ts';
  pkg.main = 'dist/index.js';
  pkg.type = 'module';
  pkg.private = true;
  pkg.scripts = {
    build: 'rm -rf dist/* && tsc -p tsconfig.pkg.json',
    prepack: 'npm run build',
  };
  pkg.exports = {
    '.': './src/index.ts',
  };
  pkg.publishConfig = {
    access: 'public',
  };
  pkg.description = '';

  await fs.writeJSON(`./packages/${packageName}/package.json`, pkg, { spaces: 2 });

  console.log(chalk.green('🎉 Package generation complete!'));
}

main()
  .then(() => {
    console.log(chalk.green('✅ All done!'));
    process.exit();
  })
  .catch((error) => {
    console.error(chalk.red('❌ An error occurred:'), error);
    process.exit(1);
  });
