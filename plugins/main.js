const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const os = require("os")
const si = require('systeminformation')


cmd({
        pattern: "alive",
        react: "🤖",
        alias: ["online", "test", "bot"],
        desc: "Check bot online or no.",
        category: "main",
        use: '.alive',
        filename: __filename
    },
    async (conn, mek, m, {
        from,
        prefix,
        pushname,
        reply, msr, creator, 
    }) => {
        try {
            if (os.hostname().length == 12) hostname = 'replit'
            else if (os.hostname().length == 36) hostname = 'heroku'
            else if (os.hostname().length == 8) hostname = 'koyeb'
            else hostname = os.hostname()
            let monspace = '```'
            const alive_msg = config.ALIVE_MESSAGE
            const sssf = `👋 Hello..! *${pushname}*,

${alive_msg}`

await conn.sendMessage(from, { text: sssf,
					contextInfo: {
                                        externalAdReply: { 
					title: `Hellow! ${pushname}`,
					body: config.BODY,
					mediaType: 1,
					sourceUrl: '',
                                        thumbnailUrl: config.LOGO,
	 				renderLargerThumbnail: false
         }}}, { quoted: mek })

                
 } catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})


cmd({
    pattern: "system",
    react: "🖥️",
    alias: ["s_info"],
    desc: "To Check bot\'s System information",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const ccp = await si.cpu()
const cinfo = await si.version()
let timee = await si.time()
const plat = os.hostname()


const infomsg = `🖥️  *MOVIE-X SYSTEM INFORMATIONS*  🖥️

➠ _Platform : ${plat}_
➠ _Runtime -: ${runtime(process.uptime())}_
➠ _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
➠ _Bot Version -: ${require("../package.json").version}_
➠ _CPU Speed -: ${ccp.speed}_
➠ _Engine Version -: ${cinfo}_\n`
        

await conn.sendMessage(from, { text: infomsg }, { quoted: mek })

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})


cmd({
    pattern: "ping",
    react: "📟",
    alias: ["speed","cyber_ping"],
    desc: "To Check bot's ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const nima = require("@whiskeysockets/baileys")
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '*_BOTS\'S SPEED CHECKING..._* ❗'  } )
var final = new Date().getTime();
await sleep(1 * 1000)
return await conn.sendMessage(from, { text : '📍️ *Pong ' + (final - inital) + ' Ms* ' , edit : ping.key })
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})


cmd({
        pattern: "restart",
        react: "🔁",
        desc: "To restart bot",
        category: "owner",
        filename: __filename
    },
 async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, isSudo, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {

    try{ 
            if (!isDev && !isOwner && !isMe && !isSudo ) return await reply(msr.own_cmd)
        
            const { exec } = require("child_process")
            reply('Restarting...')
            exec('pm2 restart all')
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})
