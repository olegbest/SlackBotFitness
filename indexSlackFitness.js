const fs = require("fs");
const Slack = require('slack')
const token = "xoxb-343426990707-433422170887-galBx6XB0WurQLz7LZUkl3Pa";
const bot = new Slack({token});


let onlineUsers = [];
let userOffline = [];

setInterval(async function () {
    let info = require('./info');
    let date = new Date();
    if (date.getHours() > 8 && date.getHours() < 20 && date.getDay() < 6) {
        onlineUsers = [];
        userOffline = [];
        let channels = await bot.channels.list();
        // console.log(channels)
        let users = await bot.users.list({token});
        // console.log(users);

        users.members.forEach(async (user) => {
            let userPre = await bot.users.getPresence({token, user: user.id});
            // console.log(user.name);
            // console.log(userPre);
            if (!user.is_bot) {
                if (userPre.presence === 'active') {
                    onlineUsers.push(user);
                } else if (userPre.presence === 'away') {
                    userOffline.push(user)
                }
            }
        })
        setTimeout(function () {
            // console.log(onlineUsers);
            let userDo = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
            let ex = info.main[Math.floor(Math.random() * info.main.length)];
            console.log(ex)
            if (userDo) {
                console.log(userDo)
                bot.chat.postMessage({
                    token,
                    channel: "CA3KJ6VBP",
                    text: "<@" + userDo.id + ">" + " выполняй " + ex.name.toUpperCase() + " " + ex.value + " раз"
                });
            }
            // let offlineText = "";
            // userOffline.forEach((us)=>{
            //     offlineText+= "@"+us.profile.real_name+"\n";
            // })
            // if(offlineText){
            //     bot.chat.postMessage({
            //         token,
            //         channel: "CA3KJ6VBP",
            //         text: "Позовите \n"+ offlineText +"\n"+ "Они не онлайн"
            //     });
            // }
        }, 1000)

    }
}, 40 * 60 * 1000);

setInterval(() => {
    let date = new Date();
    if (date.getDay() < 6) {
        let file_info = JSON.parse(fs.readFileSync("./info.json", "utf8"));
        // console.log(file_info);
        file_info.main.forEach((el) => {
            el.value++;
        });

        fs.writeFileSync("./info.json", JSON.stringify(file_info));
    }
}, 12 * 60 * 60 * 1000)