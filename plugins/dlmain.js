const axios = require('axios');
const config = require('../config')
const fs = require("fs-extra")
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const oce = "`"
const oce3 = "```"
const oce2 = '*'
const { File } = require('megajs');
const {
  screenshotV1, // Buffer
  screenshotV2, // Buffer
  screenshotV3 // Link
} = require('getscreenshot.js')

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(1, '0');
} 


cmd({
    pattern: "tiktok",
    alias: ["tk","tiktokdl", "tt"],
    react: "💈",
    desc: "Download tiktok video, audio",
    category: "download",
    use: '.tiktok < Tiktok url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.tiktok_url)
if(!q.includes("https://")) return reply(msr.tiktok_url)	
const tt = await fetchApi(`${apilink2}/download/tiktok?url=${q}`)
if(!tt.result) return reply(msr.not_fo)
let tts = tt.result
let numrep = []
		
let cot = `💈 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖨𝖪𝖳𝖮𝖪 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 💈


🖋 *ᴛɪᴛʟᴇ :* ${tts.title}
🧜‍♂️ *ᴀᴜᴛʜᴏʀ :* ${tts.author}
⏱ *ᴅᴜʀᴀᴛɪᴏɴ :* ${tts.duration}
👀 *ᴠɪᴇᴡꜱ :* ${tts.views}
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${msr.nonb_mg}
*1.1 ||* Watermark Video 
*1.2 ||* Non Watermark Video
*1.3 ||* Video Sound
*1.4 ||* Original Sound
`
numrep.push(`1.1 ${prefix}tiktokdl1 wt💈${q}`)
numrep.push(`1.2 ${prefix}tiktokdl1 hd💈${q}`)
numrep.push(`1.3 ${prefix}tiktokdl1 so💈${q}`)
numrep.push(`1.4 ${prefix}tiktokdl1 os💈${q}`)

const mass = await conn.sendMessage(from, { image: { url: tts.cover || tts.avatar }, caption: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)

cmd({
    pattern: "mediafire",
    alias: ["mfire","mf", "mfdl"],
    react: "🔥",
    desc: "Download mediafire files",
    category: "download",
    use: '.mediafire < Mfire url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.mfire_url)
if(!q.includes("https://")) return reply(msr.mfire_url)	
const mff = await fetchApi(`${apilink2}/download/mfire?url=${q}`)
if(!mff.result) return reply(msr.not_fo)
let mf = mff.result
let numrep = []
		
let cot = `🔥 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖤𝖣𝖨𝖠-𝖥𝖨𝖱𝖤 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 🔥


📂 *ɴᴀᴍᴇ :* ${mf.fileName}
📊 *ꜱɪᴢᴇ :* ${mf.size}
📤 *ᴜᴘʟᴏᴀᴅ ʙʏ :* ${mf.date}
`
await conn.sendMessage(from, { image: { url: "https://i.ibb.co/dPw1fHD/mfire.jpg" || "" }, caption: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
await conn.sendMessage(from, { document: { url: url }, mimetype: mf.fileType, fileName: `${mf.fileName}`, caption: `${mf.fileName}\n\n` + config.CAPTION}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "song",
    alias: ["ytmp3","ytsong", "son"],
    react: "🎶",
    desc: "Download Youtube song",
    category: "download",
    use: '.song < Youtube url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.yt_url)
if(q.includes("https://youtu.be/")) q = q.replace("https://youtu.be/", "https://youtube.com/?watch?v=")
if(q.includes("https://youtu.be/")) q = q.replace("?si=", "\n\n")
	
const yt = await fetchApi(`${apilink2}/search/yt?text=${q}`)
let yts = yt.result.data[0]
if(yts.length < 1) return reply(msr.not_fo)
	
let numrep = []
		
let cot = `🎶 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖸𝖳 𝖲𝖮𝖭𝖦 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 🎶


🎵 *ᴛɪᴛʟᴇ :* ${yts.title}
🧜‍♂️ *ᴀᴜᴛʜᴏʀ :* ${yts.author.name}
⏱ *ᴅᴜʀᴀᴛɪᴏɴ :* ${yts.timestamp}
👀 *ᴠɪᴇᴡꜱ :* ${yts.views}
🖇️ *ᴜʀʟ :* ${yts.url}
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${msr.nonb_mg}
*1.1 ||* Audio 🎧
*1.2 ||* Document 📂
`
numrep.push(`1.1 ${prefix}ytm3dl au💈${yts.url}`)
numrep.push(`1.2 ${prefix}ytm3dl do💈${yts.url}`)

const mass = await conn.sendMessage(from, { image: { url: yts.thumbnail || yts.image }, caption: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "video",
    alias: ["ytmp4","ytv", "vid"],
    react: "🎥",
    desc: "Download Youtube video",
    category: "download",
    use: '.video < Youtube url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.yt_url)
	
if(q.includes("https://youtube.com/shorts")) q = q.replace("https://youtube.com/shorts", "https://youtube.com/shorts/watch?v=")	
if(q.includes("https://youtu.be/")) q = q.replace("https://youtu.be/", "https://youtube.com/watch?v=")
if(q.includes("?si=")) q = q.replace("?si=", "\n\n")

	
const yt = await fetchApi(`${apilink2}/search/yt?text=${q}`)
let yts = yt.result.data[0]
if(yts.length < 1) return reply(msr.not_fo)
	
let numrep = []
		
let cot = `🎥 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖸𝖳 𝖵𝖨𝖣𝖤𝖮 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 🎥


🎬 *ᴛɪᴛʟᴇ :* ${yts.title}
🧜‍♂️ *ᴀᴜᴛʜᴏʀ :* ${yts.author.name}
⏱ *ᴅᴜʀᴀᴛɪᴏɴ :* ${yts.timestamp}
👀 *ᴠɪᴇᴡꜱ :* ${yts.views}
🖇️ *ᴜʀʟ :* ${yts.url}
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${msr.nonb_mg}
🎥 Video Type 
 *1.1 ||* 360p
 *1.2 ||* 480p
 *1.3 ||* 720p
 *1.4 ||* 1080p

📂 Document Type
 *2.1 ||* 360p
 *2.2 ||* 480p
 *2.3 ||* 720p
 *2.4 ||* 1080p
`
numrep.push(`1.1 ${prefix}ytm4dl no💈${yts.url}💈${yts.title}💈360p`)
numrep.push(`1.2 ${prefix}ytm4dl no💈${yts.url}💈${yts.title}💈480p`)
numrep.push(`1.3 ${prefix}ytm4dl no💈${yts.url}💈${yts.title}💈720p`)
numrep.push(`1.4 ${prefix}ytm4dl no💈${yts.url}💈${yts.title}💈1080p`)

numrep.push(`2.1 ${prefix}ytm4dl do💈${yts.url}💈${yts.title}💈360p`)
numrep.push(`2.2 ${prefix}ytm4dl do💈${yts.url}💈${yts.title}💈480p`)
numrep.push(`2.3 ${prefix}ytm4dl do💈${yts.url}💈${yts.title}💈720p`)
numrep.push(`2.4 ${prefix}ytm4dl do💈${yts.url}💈${yts.title}💈1080p`)

const mass = await conn.sendMessage(from, { image: { url: yts.thumbnail || yts.image }, caption: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "fb",
    alias: ["facebook","fbdl", "fbd"],
    react: "⚖",
    desc: "Download fb video",
    category: "download",
    use: '.fb < Fb url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.fb_url)

const fb = await fetchApi(`${apilink2}/download/fbdl1?url=${q}`)
if(!fb.result) return reply(msr.not_fo)
let fbs = fb.result

let numrep = []
		
let cot = `⚖ 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖥𝖡 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 ⚖


🎥 *ᴛɪᴛʟᴇ :* ${fbs.title}
🖇️ *ᴜʀʟ :* ${fbs.url}
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${msr.nonb_mg}
*1.1 ||* Sd Video 🪫
*1.2 ||* Hd Video 🔋
`
numrep.push(`1.1 ${prefix}fbvdl sd💈${fbs.url}`)
numrep.push(`1.2 ${prefix}fbvdl hd💈${fbs.url}`)

const mass = await conn.sendMessage(from, { image: { url: fbs.thumbnail || '' }, caption: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "apk",
    alias: ["downapk","apkdl", "playstore"],
    react: "🏷",
    desc: "Download Apks",
    category: "download",
    use: '.apk < App name >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.giveme)
	
const apk = await fetchApi(`${apilink2}/search/apk?text=${q}`)
if(apk.result.data.length < 1) return reply(msr.not_fo)
	
let numrep = []
var app_list = ''
      
      for (let i = 0; i < apk.result.data.length; i++) {	     
      app_list += `*${(i + 1)} ||* ${apk.result.data[i].name}\n`;
      numrep.push(`${prefix}dlapk ${apk.result.data[i].id}`)
      }	
	
	
let cot = `📦 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖠𝖯𝖪 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 📦


${msr.nonb_mg}
${app_list}
`


const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)

cmd({
    pattern: "ss",
    react: "📸",
    alias: ["screenshot","ssweb","ssdesktop"],
    desc: '',
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, apilink2, sender, isDev, senderNumber, botNumber, pushname, isMe, isOwner, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
if(!q.includes("https://")) return reply(msr.valid_url)	
let numrep = []

		
let cot = `📸 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖶𝖤𝖡 𝖲𝖲 𝖣𝖫 𝖲𝖸𝖲𝖳𝖤𝖬 📸

📲 *ɪɴᴘᴜᴛ :* ${q}
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${msr.nonb_mg}
🖼 Normal Type 
 *1.1 ||* SsTab
 *1.2 ||* SsWeb

📂 Document Type
 *2.1 ||* SsTab
 *2.2 ||* SsWeb
`
numrep.push(`1.1 ${prefix}ssdl tb1💈${q}`)
numrep.push(`1.2 ${prefix}ssdl wb1💈${q}`)
numrep.push(`2.1 ${prefix}ssdl tb2💈${q}`)
numrep.push(`2.2 ${prefix}ssdl wb2💈${q}`)

const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)
//===================================================================================
cmd({
    pattern: "ytm3dl",
    react: '⬇',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink2, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return

	                        var inp = ''
				var url = ''	                
				var text = q
				if (q.includes('💈')) url = text.split('💈')[1]
				if (text.includes('💈')) { inp = text.split('💈')[0]}
	
	
if (!url) return reply(msr.rrr)
const ytdl = await fetchApi(`${apilink2}/download/ytmp3?url=${url}`)
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } })
	
if(inp.includes("do")) {
const dom = await conn.sendMessage(from, { document: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg", fileName: ytdl.result.title + '.mp3', caption: `${ytdl.result.title}\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎶', key: dom.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else if(inp.includes("au")) {
const aum = await conn.sendMessage(from, { audio: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎶', key: aum.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
return reply()
}	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "ytm4dl",
    react: '⬇',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink2, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return

	                        var inp = ''
				var url = ''
	                        var title = ''
	                        var qua = ''
				var text = q
				if (q.includes('💈')) url = text.split('💈')[1]
				if (text.includes('💈')) { inp = text.split('💈')[0]
							title = text.split('💈')[2]
							qua = text.split('💈')[3]}
	
	

const ytdl = await fetchApi(`${apilink2}/download/ytmp4?url=${url}&quality=${qua}`)
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } })
if (!ytdl.dl_link) return reply(msr.try)
	
if(inp.includes("do")) {
const dom = await conn.sendMessage(from, { document: { url: ytdl.dl_link }, mimetype: "video/mp4", fileName: title + '.mp4', caption: `${title} ( ${qua} )\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎬', key: dom.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })

	
} else if(inp.includes("no")) {
const aum = await conn.sendMessage(from, { video: { url: ytdl.dl_link }, mimetype: "video/mp4", fileName: title + ".mp4", caption: title + ` ( ${qua} )` + '\n\n' + config.CAPTION }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎬', key: aum.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })

	
} else {
return reply()
}	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)

cmd({
    pattern: "fbvdl",
    react: '⬇',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink2, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return

	                        var inp = ''
				var url = ''	                
				var text = q
				if (q.includes('💈')) url = text.split('💈')[1]
				if (text.includes('💈')) { inp = text.split('💈')[0]}
	
	
if (!url) return reply(msr.rrr)
const fbdl = await fetchApi(`${apilink2}/download/fbdl1?url=${url}`)
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } })
	
if(inp.includes("sd")) {
const dom = await conn.sendMessage(from, { document: { url: fbdl.result.sd }, mimetype: "video/mp4", fileName: fbdl.result.title + '.mp4', caption: `${fbdl.result.title}\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🪫', key: dom.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if(inp.includes("hd")) {
const aum = await conn.sendMessage(from, { document: { url: fbdl.result.hd }, mimetype: "video/mp4", fileName: fbdl.result.title + '.mp4', caption: `${fbdl.result.title}\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🔋', key: aum.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
return reply()
}	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "tiktokdl1",
    react: '⬆',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink2, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!q) return
	                        var inp = ''
				var url = ''	                
				var text = q
				if (q.includes('💈')) url = text.split('💈')[1]
				if (text.includes('💈')) { inp = text.split('💈')[0]}
	
const tt = await fetchApi(`${apilink2}/download/tiktok?url=${url}`)
let tts = tt.result
	
if(inp.includes("wt")) {
await conn.sendMessage(from, { video: { url: tts.wmVideo }, mimetype: "video/mp4", caption: `WATERMARK-VIDEO ✅\n\n${tts.title}\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else if(inp.includes("hd")) {
await conn.sendMessage(from, { video: { url: tts.hdVideo }, mimetype: "video/mp4", caption: `NON-WATERMARK-VIDEO ✅\n\n${tts.title}\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else if(inp.includes("so")) {
await conn.sendMessage(from, { audio: { url: tts.sound }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else if(inp.includes("os")) {
await conn.sendMessage(from, { audio: { url: tts.originalSound }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)


cmd({
    pattern: "dlapk",
    react: '⬇',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink2, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return
	
	

const apkdl = await fetchApi(`${apilink2}/download/apk?id=${q}`)
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } })
if (!apkdl.result) return reply(msr.try)
let msg = `📚 *ᴀᴘᴋ ɴᴀᴍᴇ :* ${apkdl.result.name}
📊 *ᴘᴀᴄᴋᴀɢᴇ :* ${apkdl.result.package}
📥 *ꜱɪᴢᴇ :* ${apkdl.result.size}
🏮 *ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇ :* ${apkdl.result.lastUpdate}
`
	
	
await conn.sendMessage(from, { image: { url: apkdl.result.image || '' }, caption: msg + '\n\n' + config.CAPTION }, { quoted: mek })
const dom = await conn.sendMessage(from, { document: { url: apkdl.result.dl_link }, mimetype: "application/vnd.android.package-archive", fileName: apkdl.result.name + '.apk', caption: `${apkdl.result.name}\n\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '📦', key: dom.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)

cmd({
    pattern: "ssdl",
    react: '⬇',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink2, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return

	                        var inp = ''
				var url = ''	                
				var text = q
				if (q.includes('💈')) url = text.split('💈')[1]
				if (text.includes('💈')) { inp = text.split('💈')[0]}
	
	
if (!url) return reply(msr.err)
let name = getRandom('')
	
var data1 = await screenshotV1(url)
fs.writeFileSync('web.jpg', data1)

var data2 = await screenshotV2(url)
fs.writeFileSync('tab.jpg', data2)
	
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } })
	
if(inp.includes("tb1")) {
const dom = await conn.sendMessage(from, { image: fs.readFileSync('tab.jpg'), caption: `\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '📸', key: dom.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })	
} else if(inp.includes("wb1")) {
const aum = await conn.sendMessage(from, { image: fs.readFileSync('web.jpg'), caption: `\n>ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '📸', key: aum.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })

	
} else if(inp.includes("tb2")) {
const dom = await conn.sendMessage(from, { document: fs.readFileSync('tab.jpg'), mimetype: 'image/jpeg', fileName: 'Screenshot' + '.jpg', caption: config.CAPTION  }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '📸', key: dom.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })	
} else if(inp.includes("wb2")) {
const aum = await conn.sendMessage(from, { document: fs.readFileSync('web.jpg'), mimetype: 'image/jpeg', fileName: 'Screenshot' + '.jpg', caption: config.CAPTION  }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '📸', key: aum.key } })
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else {
return reply()
}	
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}}
)
