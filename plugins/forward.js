const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "fw",
    alias: [ "fwr" , "forward" ],
    desc: "Forward a quoted msg for a Jid",
    category: "owner",
    react: "🔄",
    use: ".forward <quoted msg>",
    filename: __filename
},
    async (conn, mek, m, { from, l, quoted, body, isCmd, isCreator ,isDev, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, react }) => {
        try { 
        if (!isCreator) { if (!isDev) return reply('❌ *You must be a Moderator frist*') }
            if (!mek.quoted) {
                return reply("please quote a message")
            }
            if (!q) {
                return reply("please specify a jid to forward")
            }
            let chats = q.split(",")

            let message = {}

            message.key = {
                remoteJid: from,
                fromMe: true,
                id: mek.quoted?.fakeObj?.key,
                participant: conn.user.id.split(':')[0]
            }

            if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
                mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName;
            }

            message.message = mek.quoted;

            let mass = '';

            for (let j = 0; j < chats.length; j++) {
                const chat = chats[j];
                try {
                    await conn.forwardMessage(chat, message, false)
                    mass += chat + "\n"
                } catch (e) {
                    reply("cannot forward to" + chat)
                    console.log(e)
                }
            }

            return await reply("✅ *Message forwarded to* \n\n" + mass)
        } catch (e) {
            console.log(e);
            await reply(`${e}`)
        }
    });