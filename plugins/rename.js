const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')



cmd({
    pattern: "rename",
    react: "⏭️",
    alias: ["r","chang","ussamu", "tarahawennaepa"],
    desc: "Chang fule name and caption",
    category: "other",
    use: '.rename file_name + caption',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, isDev, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
if ( !isDev && !isOwner && !isMe && !isMe ) return await reply(msr.own_cmd)
if (!m.quoted) return await reply("*Please mention any file ❓*")

	                        var fileName = ''
                                var cap = ''
				var ft = ''	                
				var text = q
				if (q.includes('+')) cap = text.split('+')[1]
				if (text.includes('+')) { fileName = text.split('+')[0]
                                    ft = text.split('+')[2]}  

let caption = cap || fileName
var message = mek
  		 
  message.key = {
    remoteJid: from,
    fromMe: true,
    id: mek.quoted?.fakeObj?.key?.id,
    participant: botNumber2
  }

	
mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = fileName
mek.quoted.documentWithCaptionMessage.message.documentMessage.caption = caption
message.message = mek.quoted;

await conn.forwardMessage(from, message, false)
 
	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(1000 * 1)	
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
