const { pushFunc } = require("./main");
const utils = require("./utils");
let timestamp = new Date().getTime();
let __timestamp = new Date().getTime();
pushFunc.setPeriod(6000);
Array(4).fill("").forEach((_, i)=>{
    const _timestamp = new Date().getTime();
    const timeDif = _timestamp-timestamp;
    console.log({i, timeDif});
    timestamp = new Date().getTime();
    const asyncFunc = async () => {
        const ___timestamp = new Date().getTime();
        const _timeDif = ___timestamp-__timestamp;
        console.log({_i: i, _timeDif});
        __timestamp = new Date().getTime();
    }
    pushFunc(asyncFunc);
});
(async () => {
    await utils.waitMs(40*1000);
    console.log("waited");
    let timestamp = new Date().getTime();
    Array(4).fill("").forEach((_, i)=>{
        const asyncFunc = async () => {
            const _timestamp = new Date().getTime();
            const timeDif = _timestamp-timestamp;
            console.log({i, timeDif});
            timestamp = new Date().getTime();
        }
        pushFunc(asyncFunc);
    });
})();
