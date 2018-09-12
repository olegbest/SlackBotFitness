// var SlackBot = require('slackbots');
//
//
// // create a bot
// var bot = new SlackBot({
//     token: 'xoxb-343426990707-433422170887-galBx6XB0WurQLz7LZUkl3Pa', // Add a bot https://my.slack.com/services/new/bot and put the token
//     name: 'Fitness'
// });
//
//
// bot.on('start', function () {
//     // more information about additional params https://api.slack.com/methods/chat.postMessage
//     var params = {
//         icon_emoji: ':cat:'
//     };
//
//     let users = bot.getUsers();
//     console.log(users._value.members)
//
//     // bot.postMessageToChannel('random', 'meow!', params, (res) => {
//     //
//     // });
// });
//
// bot.on('error', (err) => {
//     console.log(err)
// });
//
// bot.on('message', function(data) {
//
//     console.log(data);
// });

const Slack = require('slack')
const token = "xoxb-343426990707-433422170887-galBx6XB0WurQLz7LZUkl3Pa";
const bot = new Slack({token});
const info = require('./info');

let onlineUsers = [];
let userOffline = [];

setInterval(function () {
    onlineUsers = [];
    userOffline = [];
    bot.channels.list().then((res) => {
        // console.log(res)

        bot.users.list({token}).then((users) => {
            // console.log(users);

            users.members.forEach((user) => {
                bot.users.getPresence({token, user: user.id}).then((userPre) => {
                    // console.log(user.name);
                    // console.log(userPre);
                    if (!user.is_bot) {
                        if (userPre.presence === 'active') {

                            // console.log(user);
                            onlineUsers.push(user);
                        } else if (userPre.presence === 'away') {
                            userOffline.push(user)
                        }
                    }
                })
            })
            setTimeout(function () {
                // console.log(onlineUsers);
                let userDo = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
                let ex = info.main[Math.floor(Math.random() * info.main.length)];
                if (userDo) {
                    console.log(userDo)
                    // bot.chat.postMessage({
                    //     token,
                    //     channel: "CA3KJ6VBP",
                    //     text: "<@" + userDo.id + ">" + " выполняй " + ex.name.toUpperCase() + " " + ex.value + " раз"
                    // });
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
        })
    })
},  2000);