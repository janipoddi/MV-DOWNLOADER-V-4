const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var oce = "`" 


const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 

cmd({
    pattern: "menu",
    react: "📂",    
    alias: ["list",'command', 'commadlist', 'moviex'],
    category: "main",
    use: '.menu',
    filename: __filename
},
    
async(conn, mek, m,{from, l, quoted, body, isCmd, msr, command, args, q, isGroup, sender, creator, senderNumber, botNumber2, botNumber, prefix, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
let menuMg = `📑 ＭＯＶＩＥ-Ｘ   ＭＡＩＮ   ＭＥＮＵ 📑


⭐ *Hello, I'm MOVIE-X Watsapp User Bot, this is a hard-working project of our team, and it's strictly forbidden to own anything here without permission.*


*${formatNumber(1)} ||* MOVIE COMMAD LIST
*${formatNumber(2)} ||* DOWNLOAD COMMAD LIST
*${formatNumber(3)} ||* OWNER COMMAD LIST
*${formatNumber(4)} ||* MAIN COMMAD LIST
*${formatNumber(5)} ||* GROUP COMMAD LIST
*${formatNumber(6)} ||* OTHER COMMAD LIST
`
let numrep = []
numrep.push(`${prefix}getcmd movie`)
numrep.push(`${prefix}getcmd download`) 
numrep.push(`${prefix}getcmd owner`) 
numrep.push(`${prefix}getcmd main`) 
numrep.push(`${prefix}getcmd group`) 
numrep.push(`${prefix}getcmd other`) 
    

const svMg = await conn.sendMessage(from, { text: menuMg + `\n\n` + config.FOOTER, 
					contextInfo: {
                                        externalAdReply: { 
					title: `Hellow! ${pushname}`,
					body: config.BODY,
					mediaType: 1,
					sourceUrl: '',
                                        thumbnailUrl: config.LOGO,
	 				renderLargerThumbnail: false
         }}}, { quoted: mek });
	
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})


cmd({
    pattern: "getcmd",
    react: "🔫",    
    dontAddCommandList: true,
    filename: __filename
},
    
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, creator, prefix, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
const img = config.LOGO
const footer = config.FOOTER

let movie_menu = ``
for ( let i=0; i<commands.length; i++ ) { 
if( commands[i].category === 'movie' ) {
  if( !commands[i].dontAddCommandList ) {
movie_menu += `🎪 Pattern: ${commands[i].pattern}\n📚 Desc: ${commands[i].desc}\n🚗 Use: ${commands[i].use}\n\n
`
}}};

let download_menu = ``
for ( let i=0; i<commands.length; i++ ) { 
if( commands[i].category === 'download' ) {
  if( !commands[i].dontAddCommandList ) {
download_menu += `🎪 Pattern: ${commands[i].pattern}\n📚 Desc: ${commands[i].desc}\n🚗 Use: ${commands[i].use}\n\n
`
}}};

let owner_menu = ``
for ( let i=0; i<commands.length; i++ ) { 
if( commands[i].category === 'owner' ) {
  if( !commands[i].dontAddCommandList ) {
owner_menu += `🎪 Pattern: ${commands[i].pattern}\n📚 Desc: ${commands[i].desc}\n🚗 Use: ${commands[i].use}\n\n
`
}}};

let main_menu = ``
for ( let i=0; i<commands.length; i++ ) { 
if( commands[i].category === 'main' ) {
  if( !commands[i].dontAddCommandList ) {
main_menu += `🎪 Pattern: ${commands[i].pattern}\n📚 Desc: ${commands[i].desc}\n🚗 Use: ${commands[i].use}\n\n
`
}}};

let group_menu = ``
for ( let i=0; i<commands.length; i++ ) { 
if( commands[i].category === 'group' ) {
  if( !commands[i].dontAddCommandList ) {
group_menu += `🎪 Pattern: ${commands[i].pattern}\n📚 Desc: ${commands[i].desc}\n🚗 Use: ${commands[i].use}\n\n
`
}}};
	
let other_menu = ``
for ( let i=0; i<commands.length; i++ ) { 
if( commands[i].category === 'other' ) {
  if( !commands[i].dontAddCommandList ) {
other_menu += `🎪 Pattern: ${commands[i].pattern}\n📚 Desc: ${commands[i].desc}\n🚗 Use: ${commands[i].use}\n\n
`
}}};
	

    if(q == "movie") {
	    
let menuMg = `🎥 𝐌𝐎𝐕𝐈𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 🎥


${movie_menu}
----------------------------

*1.1 ||* ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ
*1.2 ||* ʙᴏᴛ\'ꜱ ꜱᴘᴇᴇᴅ
`
let numrep = []
numrep.push(`1.1 ${prefix}system`)
numrep.push(`1.2 ${prefix}ping`)   

const svMg = await conn.sendMessage(from, { image: { url : img }, caption: menuMg + `\n\n` + footer }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '🎥', key: svMg.key } })
	    
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 
	    
    } else if(q == "download") {
	    
let menuMg = `📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 📥


${download_menu}
----------------------------

*1.1 ||* ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ
*1.2 ||* ʙᴏᴛ\'ꜱ ꜱᴘᴇᴇᴅ

`
let numrep = []
numrep.push(`1.1 ${prefix}system`)
numrep.push(`1.2 ${prefix}ping`) 

const svMg = await conn.sendMessage(from, { image: { url : img }, caption: menuMg + `\n\n` + footer }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '📥', key: svMg.key } })
	
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg)
	    
    } else if(q == "owner") {
	    
let menuMg = `👨‍💻 𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 👨‍💻


${owner_menu}
----------------------------

*1.1 ||* ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ
*1.2 ||* ʙᴏᴛ\'ꜱ ꜱᴘᴇᴇᴅ

`
let numrep = []
numrep.push(`1.1 ${prefix}system`)
numrep.push(`1.2 ${prefix}ping`) 

    

const svMg = await conn.sendMessage(from, { image: { url : img }, caption: menuMg + `\n\n` + footer }, { quoted: mek });
	
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg)   
	    
    } else if(q == "main") {
	    
let menuMg = `🧜‍♂️ 𝐌𝐀𝐈𝐍 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 🧜‍♂️


${main_menu}
----------------------------

*1.1 ||* ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ
*1.2 ||* ʙᴏᴛ\'ꜱ ꜱᴘᴇᴇᴅ

`
let numrep = []
numrep.push(`1.1 ${prefix}system`)
numrep.push(`1.2 ${prefix}ping`) 

    

const svMg = await conn.sendMessage(from, { image: { url : img }, caption: menuMg + `\n\n` + footer }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '🧜‍♂️', key: svMg.key } })
	    
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg)   
	    
    } else if(q == "group") {
	    
let menuMg = `⛩ 𝐆𝐑𝐎𝐔𝐏 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ⛩


${group_menu}
----------------------------

*1.1 ||* ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ
*1.2 ||* ʙᴏᴛ\'ꜱ ꜱᴘᴇᴇᴅ

`
let numrep = []
numrep.push(`1.1 ${prefix}system`)
numrep.push(`1.2 ${prefix}ping`) 

const svMg = await conn.sendMessage(from, { image: { url : img }, caption: menuMg + `\n\n` + footer }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '⛩', key: svMg.key } })
	
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg) 
	    
    } else if(q == "other") {
	    
let menuMg = `🎀 𝐎𝐓𝐇𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 🎀


${other_menu}
----------------------------

*1.1 ||* ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ
*1.2 ||* ʙᴏᴛ\'ꜱ ꜱᴘᴇᴇᴅ

`
let numrep = []
numrep.push(`1.1 ${prefix}system`)
numrep.push(`1.2 ${prefix}ping`) 

const svMg = await conn.sendMessage(from, { image: { url : img }, caption: menuMg + `\n\n` + footer }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '🎀', key: svMg.key } })
	
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg)  
	    
    } else { return }	     
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})
