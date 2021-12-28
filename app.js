const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const User = require('./db');
require('dotenv').config;

const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ] });

client.on("ready", () => {
    console.log('로그인 완료!');
    client.user.setActivity('딜라이트 스튜디오 관리봇');
})

client.on("messageCreate", (msg) => {
    const splittedMessage = msg.content.split(' ');
    const userId = msg.author.id;
    const moderatorId = ["873134562836893707", "705658715310784522", "586013628075868170", "714665941513928815", "742739457870004315", "586430739407699982", "553793638610501654"];
    const swears = ["씨발", 'ㅆㅂ', 'ㅅㅂ', 'ㅆㅃ', '시바', 'tlqkf', 'Tlqkf', '시발', 'ㅅ발', 'ㅅ바', '십알', '슈발', '련', '또라이', '개새끼', 'ㅈ같다', '병신', 'ㅄ', 'ㅂㅅ', '븅', 'ㄴㄱㅁ', '니엄마', '느금마', '애미', '애비', 'ㅗ', '좆', '게이', '닥쳐', 'ㄷㅊ', '빠가', '한남', '페미', '일베', '메갈', '섹스', '문재인', '문재앙', '박근혜', '홍준표', '윤석열', '이재명', '찢재명', '머가리', '대가리', '아가리', 'ㅇㄱㄹ', '아갈', '헤응', '보지', '자지', '씹'];
    
    User.findOne({userId : userId})
    .then(user => {
        if(user == null){
            const userModel = new User();
            userModel.userId = userId;
            userModel.warning = 0;
            userModel.save().then(() => {
                console.log('신규 유저 등록');
            })
        }
    })

    if(msg.content.length > 1000 && !moderatorId.includes(userId)){
        msg.reply("해당 메시지가 1000자 이상이어서 삭제되었습니다.").then(() => {
            msg.delete();
        });
    };

    for(const swear of swears){
        if(msg.content.includes(swear) && !moderatorId.includes(userId)){
            msg.reply("해당 메시지에 부적절한 단어가 포함되어 있어 삭제 및 경고 처리되었습니다.").then(() => {
                msg.delete();
                User.findOne({userId : userId})
                .then(user => {
                    user.warning++;
                    user.save().then(() => {
                        if(user.warning >= 3 && user.warning < 5){
                            msg.guild.members.kick(userId).then(() => {
                            });
                        };
                        if(user.warning >= 5){
                            msg.guild.members.ban(userId).then(() => {
                            });
                        }
                    });
                    const mentionUser = `<@${userId}>`
                    const content = `**제재 유저**\n${mentionUser}\n**부적절한 채팅**\n${msg.content}\n**누적 경고 회수**\n${user.warning}`;
                    const embed = new MessageEmbed()
                    .setColor("#dba93d")
                    .setAuthor('딜라이트 스튜디오 관리봇')
                    .setTitle('제재 유저 안내')
                    .setDescription(content)
                    .setTimestamp();
                    client.channels.cache.get('925362382484684820').send({embeds : [embed]});
                });
            });
        break;
        }
    }

    if(msg.content == '테스트'){
        msg.reply('이잉');
    }
})

client.login("OTI1MzUxOTAwNjM3OTg2ODU3.Ycr3HQ.Bm-ilXMZBDZfc_4cBGzeu4LlUBo");