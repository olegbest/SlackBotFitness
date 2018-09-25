const fs = require("fs");
const Slack = require('slack')
const token = "xoxb-343426990707-433422170887-galBx6XB0WurQLz7LZUkl3Pa";
const bot = new Slack({token});
let info = require('./info');

let onlineUsers = [];
let userOffline = [];

setInterval(async function () {

    let date = new Date();
    let hour = date.getUTCHours() + 3;
    console.log(hour);
    if (hour > 8 && hour < 20 && date.getDay() < 6) {
        onlineUsers = [];
        userOffline = [];
        let channels = await bot.channels.list();
        // console.log(channels)
        let users = await bot.conversations.members({token: token, channel: 'CA3KJ6VBP'});
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

        setTimeout(async function () {
            // console.log(onlineUsers);
            let randomNumber = Math.floor(Math.random() * onlineUsers.length);
            let userDo = onlineUsers[randomNumber];
            onlineUsers.splice(randomNumber, 1);
            randomNumber = Math.floor(Math.random() * onlineUsers.length);
            let userDo2 = onlineUsers[randomNumber];
            let ex = info.main[Math.floor(Math.random() * info.main.length)];
            let ex2 = info.main[Math.floor(Math.random() * info.main.length)];
            console.log(ex);
            if (userDo) {
                console.log(userDo)
                await bot.chat.postMessage({
                    token,
                    channel: "CA3KJ6VBP",
                    text: "<@" + userDo.id + ">" + " выполняй " + ex.name.toUpperCase() + " " + ex.value + " раз"
                });
            }

            if(userDo2) {
                await bot.chat.postMessage({
                    token,
                    channel: "CA3KJ6VBP",
                    text: "<@" + userDo2.id + ">" + " выполняй " + ex2.name.toUpperCase() + " " + ex2.value + " раз"
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
        info.main.forEach((el) => {
            el.value++;
        });
    }
}, 24 * 60 * 60 * 1000)