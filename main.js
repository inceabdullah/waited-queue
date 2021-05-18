const utils = require("./utils");
/**
 * 10/60sec/IP
 */
let periodMs;
let intervalLoaded;
const queue = [];
let lastTimestamp = new Date().getTime();

const main = async (asyncFunc) => {
    queue.push(asyncFunc);
}

main.setPeriod = (ms=10) => {
    periodMs = ms;
    (intervalLoaded || interval());
}

const interval = async () => {
    (intervalLoaded || (intervalLoaded = true));
    const timestamp = new Date().getTime();
    await utils.waitMs(periodMs - (timestamp-lastTimestamp));
    const _asyncFunc = queue.shift();
    if (_asyncFunc){
        await _asyncFunc()
            .catch(err=>{
                console.log("Error in _asyncFunc");
                console.error(err);
            });
    }
    lastTimestamp = new Date().getTime();
    interval();
}

exports.pushFunc = main;