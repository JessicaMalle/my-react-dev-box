#!/usr/bin/env node
import fs from 'fs';
import readline from 'readline';
import util from 'util';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = util.promisify(rl.question).bind(rl);

async function main() {
  const appName = await question('Entrez le nom de l\'application (par exemple "apps/app-example") : ');
  fs.unlinkSync(`${appName}/.eslintrc.cjs`);

  const packageJsonPath = `${appName}/package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  delete packageJson.scripts.lint;
  packageJson.scripts['lint'] = 'eslint .';
  packageJson.scripts['lint:fix'] = 'eslint . --fix';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('Les modifications ont été effectuées avec succès.');
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error('Une erreur est survenue :', error);
    process.exit(1);
  });
