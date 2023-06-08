const moment = require("moment");

let  formatmsg = (username,text)=>{
    return {
        username,
        text,
        time: moment().format("h:mm a")
    }
}

module.exports = {formatmsg}