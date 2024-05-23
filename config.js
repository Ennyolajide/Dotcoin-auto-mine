require('dotenv').config();

const env = process.env;
const baseUrl = 'https://jjvnmoyncmcewnuykyid.supabase.co/rest/v1/rpc';

const urls = {
    save_coins: `${baseUrl}/save_coins`,
    restore: `${baseUrl}/restore_attempt`,
    get_user_info: `${baseUrl}/get_user_info`,
    try_your_luck: `${baseUrl}/try_your_luck`,
}

function getHeaders(data = {}, headers = {}, ContentLength = null) {

    return {
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'Authorization': `Bearer ${env.BEARER_TOKEN}`,
        'Sec-Fetch-Site': 'cross-site',
        'x-telegram-user-id': `${env.TELEGRAM_USER_ID}`,
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'Content-Type': 'application/json',
        'Origin': 'https://dot.dapplab.xyz',
        'apikey': `${env.API_TOKEN}`,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://dot.dapplab.xyz/',
        'x-client-info': 'postgrest-js/1.9.2',
        'content-profile': 'public',
        'Sec-Fetch-Dest': 'empty',
        'Content-Length': ContentLength || JSON.stringify(data).length,
    };

}

module.exports = { urls, getHeaders }
