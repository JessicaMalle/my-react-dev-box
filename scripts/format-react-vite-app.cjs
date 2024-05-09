#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const util = require('util');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = util.promisify(rl.question).bind(rl);

async function main() {
  const gitStatus = execSync('git status --porcelain', {
    encoding: 'utf8',
  });

  if (gitStatus) {
    console.log('Il y a des modifications non validées dans votre dépôt Git.');
    const answer = await question('Voulez-vous continuer ? (Oui/Non) : ');

    if (answer.toLowerCase() !== 'oui') {
      console.log('Opération annulée par l\'utilisateur.');
      process.exit();
    }
  }

  const appName = await question('Entrez le nom de l\'application (par exemple "apps/app-example") : ');
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

  console.log('Exécution de npm run lint:fix...');
  execSync('npm run lint:fix', {
    cwd: appName,
    stdio: 'inherit',
  });
  console.log('npm run lint:fix terminé.');

  console.log('Les modifications ont été effectuées avec succès.');

  console.log('Exécution de git add et git commit...');
  execSync('git add .', {
    cwd: appName,
    stdio: 'inherit',
  });
  execSync(`git commit -m "build: format and lint ${appName} application"`, {
    cwd: appName,
    stdio: 'inherit',
  });
  console.log('git add et git commit terminés.');
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error('Une erreur est survenue :', error);
    process.exit(1);
  });
