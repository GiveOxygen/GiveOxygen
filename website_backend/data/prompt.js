const inquirer = require('inquirer');
const dbMappings = require('./dbEnvMappings');

module.exports = async () => {
  const answer = await inquirer.prompt([
    { name: 'env', message: 'Which environment?', type: 'list', choices: Object.keys(dbMappings), default: 'tst' },
    { name: 'shouldPurge', message: 'Do you want to purge the tables?', type: 'confirm', default: false },
  ]);

  return Object.assign(answer, {
    hash: dbMappings[answer.env],
  });
};
