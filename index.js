require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios');
const { taps } = require('./utils.js');
const { urls, getHeaders } = require('./config');
const {  tryYourluck, restoreAttemptAndSaveCoins, saveCoins, logInfo, logError, exitProcess } = require('./requests');

const env = process.env;

axios.post(urls.get_user_info, {}, { headers: getHeaders() })
    .then((res) => {
        const _taps = taps(env);
        const _data = res.data;
        const { id, balance } = _data;
        id ? logInfo(res.data) : exitProcess();
        (id && _data?.gamex2_times > 0) ? tryYourluck(balance) : false;
        (_data?.daily_attempts > 0 ) ? saveCoins(_taps, _data) : restoreAttemptAndSaveCoins(_taps, _data)
        chalk.green('All done!');
    })
    .catch(error => {
        logError(error)
    });
