#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const gitStatus = execSync('git status --porcelain', {
    encoding: 'utf8',
  });

  if (gitStatus) {
    console.log(chalk.yellow('There are uncommitted changes in your Git repository.'));
    const { shouldContinue } = await inquirer.prompt({
      type: 'confirm',
      name: 'shouldContinue',
      message: 'Do you want to continue?',
      default: false,
    });

    if (!shouldContinue) {
      console.log(chalk.red('Operation cancelled by the user.'));
      process.exit();
    }
  }

  const { appName } = await inquirer.prompt({
    type: 'input',
    name: 'appName',
    message: 'Enter the name of the application (e.g. "apps/app-example"): ',
  });

  const eslintConfigPath = `${appName}/.eslintrc.cjs`;

  if (fs.existsSync(eslintConfigPath)) {
    fs.unlinkSync(eslintConfigPath);
  }

  const packageJsonPath = `${appName}/package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  delete packageJson.scripts.lint;
  packageJson.scripts['lint'] = 'eslint .';
  packageJson.scripts['lint:fix'] = 'eslint . --fix';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  const lintSpinner = ora('Running npm run lint:fix...').start();
  await delay(2000); // Wait for 2 seconds
  execSync('npm run lint:fix', {
    cwd: appName,
    stdio: 'inherit',
  });
  lintSpinner.succeed('npm run lint:fix completed.');

  console.log(chalk.green('Changes have been successfully made.'));

  const gitSpinner = ora('Running git add and git commit...').start();
  await delay(2000); // Wait for 2 seconds
  execSync('git add .', {
    cwd: appName,
    stdio: 'inherit',
  });
  execSync(`git commit -m "build: format and lint ${appName} application"`, {
    cwd: appName,
    stdio: 'inherit',
  });
  gitSpinner.succeed('git add and git commit completed.');
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(chalk.red('An error occurred:'), error);
    process.exit(1);
  });
