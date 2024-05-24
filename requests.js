const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');


function tryYourluck(luckAmount){
    const data = { "coins": parseInt(luckAmount)}
    axios.post(urls.try_your_luck, data, { headers: getHeaders(data) }).then((res) => {
        const { success } = res.data;
        console.log('Lucky draw:', success ? chalk.green('\u2714') : chalk.red('\u2716'));
    }).catch((error) => { logError(error) });
}

async function saveCoins(taps, userInfo) {
    const data = { "coins": taps }
    return await axios.post(urls.save_coins, data, { headers: getHeaders(data) }).then((res) => {
        const { success } = res.data;
        success ? logTap(taps, userInfo) : exitProcess();
    }).catch((error) => {
        logError(error);
    });
}

async function restoreAttemptAndSaveCoins(taps, userInfo){
    return await axios.post(urls.restore, {}, { headers: getHeaders() }).then((res) => { 
        const success = res.data?.success || false;
        success ? saveCoins(taps, userInfo) : false;
        logRestoreAttempt(success);
    }).catch((error) => {   
        logError(error);
    });
}

function logInfo(obj) {
    console.log(
        'First Name:', chalk.blue(obj.first_name),
        '| Coins:', chalk.yellow(Number(obj.balance).toLocaleString()),
        '| X2:', chalk.cyan(obj.gamex2_times),
        '| Attempt Left:', chalk.magenta(obj.daily_attempts)
    );
}

function logRestoreAttempt(success) {
    console.log(success ? chalk.green('Restored attempt') : chalk.red('Failed to restore attempt'));
}

function logTap(taps, userObj) {
    console.log(
        'Taping ...', chalk.blue('->'),
        chalk.cyan(taps), chalk.green('\u2714'), ' | Coins:', 
        chalk.yellow(Number(taps + userObj.balance).toLocaleString()),
        ' | Attempt Left:', chalk.magenta(userObj.daily_attempts - 1)
    );
}


function logError(error) {
    console.log(error.response ? error.response.data : error.request ? error.request : 'Error', error.message);
    process.exit();
}

function exitProcess() {
    console.log(chalk.red('Error collecting coin - Exiting...'));
    process.exit(); //end the process
}

module.exports = {  tryYourluck, saveCoins, restoreAttemptAndSaveCoins, logInfo, logTap, logError, exitProcess }
