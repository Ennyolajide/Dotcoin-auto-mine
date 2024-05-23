require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios');
const { taps } = require('./utils.js');
const { urls, getHeaders } = require('./config');
const {  tryYourluck, restoreAttempt, saveCoins, logInfo, logError, exitProcess } = require('./requests');

const env = process.env;

axios.post(urls.get_user_info, {}, { headers: getHeaders() })
    .then((res) => {
        const { id, balance, daily_attempts, gamex2_times } = res.data;
        id ? logInfo(res.data) : false;
        (id && gamex2_times > 0) ? tryYourluck(balance) : false;
        daily_attempts > 0 ? saveCoins(taps(env), balance) : exitProcess;
        chalk.green('All done!');
    })
    .catch(error => {
        logError(error)
    });
