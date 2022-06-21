const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
  console.log(`
By : ${chalk.bold('@nvidia control panel#7435')}
`);
const round = rs.question("0. Eleminated(0 Trophy) \n1. Round1(10 Trophy)\n2. Round2(20 Trophy)\n3. Round3(Winner)\n Input Your Round: ")

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/' + round, {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

  const auth = rs.question('Enter Authentication! : ');
  const delay = rs.question('Enter Delay(MilliSecond)! : ');
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.yellowBright(`\r[${moment().format('HH:mm:ss')}] ${chalk.red(`ERROR : [Maybe Auth Key Expired]`)}`))
    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;
      const skin = data.User.Skins.length
      const purch = data.User.BattlePass.HasPurchased

console.log(chalk.yellowBright(`\r[${moment().format('HH:mm:ss')}] ${chalk.cyan(`User : ${username}`)} | ${chalk.yellow(`Trophy : ${trophy}`)} | ${chalk.red(`Crown : ${crown}`)} | ${chalk.green(`Data : ${data}`)} | ${chalk.blue(`Country: ${country}`)} | ${chalk.greenBright(`Skin Total: ${skin}`)} | ${chalk.redBright(`Has Purchased: ${purch}`)} `));
      await sleep(delay);

    } else if (result == 'BANNED') {
      console.log(chalk.red(`AWOKAWOK KENA BANNED`));
     break;
  }
}
})();