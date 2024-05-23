function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function taps(env){
    return getRandom(parseInt(env.MIN_TAP), parseInt(env.MAX_TAP));
}


module.exports = { taps }