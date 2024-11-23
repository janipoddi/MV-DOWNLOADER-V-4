const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
var oce = "`" 


const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


cmd({
    pattern: "apply",
    react: "🗃",
    alias: ["set",'input'],
    category: "owner",
    use: '.apply',
    filename: __filename
},    
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, creator, senderNumber, botNumber2, botNumber, prefix, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)

const input = m.quoted.msg 
if(!m) return await reply(msr.mention_msg)

let text = m.quoted.msg	
const img = config.LOGO
const footer = config.FOOTER
    
let menuMg = `*🗃 ❰ 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤 𝖬𝖠𝖭𝖠𝖦𝖬𝖤𝖭𝖳 ❱ 🗃*


📲 ${oce}Input:${oce}  *${text}*

*01 ||* PREFIX
*02 ||* LOGO
*03 ||* MAX_SIZE
*04 ||* MAX_SIZE_GB
*05 ||* ALIVE_MESSAGE
*06 ||* FILE_NAME
*07 ||* CAPTION
*08 ||* FOOTER
*09 ||* BODY
*10 ||* OWNER_NUMBER
*11 ||* OWNER_NAME
*12 ||* OWNER_REACT
*13 ||* DELETE_MSG_SENDTO
`
let numrep = []
numrep.push(`${prefix}set_prefix ${text}`)
numrep.push(`${prefix}set_logo ${text}`)
numrep.push(`${prefix}set_max_size ${text}`)
numrep.push(`${prefix}set_max_size_gb ${text}`)
numrep.push(`${prefix}set_alive_message ${text}`)
numrep.push(`${prefix}set_filename ${text}`)
numrep.push(`${prefix}set_caption ${text}`)
numrep.push(`${prefix}set_footer ${text}`)
numrep.push(`${prefix}set_body ${text}`)
numrep.push(`${prefix}set_owner_number ${text}`)
numrep.push(`${prefix}set_owner_name ${text}`)
numrep.push(`${prefix}set_owner_react ${text}`)
numrep.push(`${prefix}set_del_send ${text}`)

    

const svMg = await conn.sendMessage(from, { image: { url : img }, text: menuMg + `\n\n` + footer }, { quoted: mek });
	
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
    pattern: "settings",
    react: "⚙",
    alias: ["setting","chang"],
    category: "owner",
    use: '.settings',
    filename: __filename
},   
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, creator, senderNumber, botNumber2, botNumber, prefix, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)

const img = config.LOGO
const footer = config.FOOTER
    
let menuMg = `🗃 *❰ 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤 𝖬𝖠𝖭𝖠𝖦𝖬𝖤𝖭𝖳 ❱* 🗃


[1] ANTI_LINK
    *1.1 ➠* True
    *1.2 ➠* False

[2] ANTI_BAD
    *2.1 ➠* True
    *2.2 ➠* False

[3] ANTI_BOT
    *3.1 ➠* True
    *3.2 ➠* False

[4] AUTO_READ_STATUS
    *4.1 ➠* True
    *4.2 ➠* False

[5] AUTO_MSG_READ
    *5.1 ➠* True
    *5.2 ➠* False

[6] ALWAYS_ONLINE
    *6.1 ➠* True
    *6.2 ➠* False

[7] OWNER_REACT
    *7.1 ➠* True
    *7.2 ➠* False

[8] WORK_TYPE
    *8.1 ➠* Public
    *8.2 ➠* Only_Group
    *8.3 ➠* Only_Inbox
    *8.4 ➠* Private

[9] MESSAGE_TYPE
    *9.1 ➠* Button
    *9.2 ➠* Non_Button

[10] AI_MODE
    *10.1 ➠* True
    *10.2 ➠* False

[11] CINE_BLOCK
    *11.1 ➠* True
    *11.2 ➠* False

[12] ANTI_DELETE
    *12.1 ➠* True
    *12.2 ➠* False
`
let numrep = []
numrep.push(`1.1 ${prefix}anti_link true`)
numrep.push(`1.2 ${prefix}anti_link false`)
	
numrep.push(`2.1 ${prefix}anti_bad true`)
numrep.push(`2.2 ${prefix}anti_bad false`)
	
numrep.push(`3.1 ${prefix}anti_bot true`)
numrep.push(`3.2 ${prefix}anti_bot false`)
	
numrep.push(`4.1 ${prefix}auto_read_status true`)
numrep.push(`4.2 ${prefix}auto_read_status false`)
	
numrep.push(`5.1 ${prefix}auto_msg_read true`)
numrep.push(`5.2 ${prefix}auto_msg_read false`)
	
numrep.push(`6.1 ${prefix}allways_online true`)
numrep.push(`6.2 ${prefix}allways_online false`)
	
numrep.push(`7.1 ${prefix}owner_react true`)
numrep.push(`7.2 ${prefix}owner_react false`)
	
numrep.push(`8.1 ${prefix}work_type public`)
numrep.push(`8.2 ${prefix}work_type only_group`)
numrep.push(`8.3 ${prefix}work_type inbox`)
numrep.push(`8.4 ${prefix}work_type private`)
	
numrep.push(`9.1 ${prefix}set_message_type BUTTON`)
numrep.push(`9.2 ${prefix}set_message_type NON_BUTTON`)
	
numrep.push(`10.1 ${prefix}set_ai_mode true`)
numrep.push(`10.2 ${prefix}set_ai_mode false`)

numrep.push(`11.1 ${prefix}set_cine_block true`)
numrep.push(`11.2 ${prefix}set_cine_block false`) 
	
numrep.push(`12.1 ${prefix}set_anti_delete true`)
numrep.push(`12.2 ${prefix}set_anti_delete false`)
	
const svMg = await conn.sendMessage(from, { image: { url : img }, text: menuMg + `\n\n` + footer }, { quoted: mek });
	
          const jsonmsg = {
            key : svMg.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg)   
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//============================================================================================================


cmd({
    pattern: "set_prefix",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("PREFIX")
let text = q
if(gett === text) return await reply(msr.ald_set)
if(text !== '~' || '@' || '#' || '$' || '%' || '^' || '&' || '*' || '(' || ')' || '_' || '+' || '{' || '}' || '|' || '"' || ':' || '<' || '>' || '?' || '/' || '.' || ',' || "'" || ';' || ']' || '[' || '=' || '-' ) return reply(msr.valid_con)

await input("PREFIX", text)

await reply("*🔁 PREFIX UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_max_size",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("MAX_SIZE")
let text = q
if(gett === Number(text)) return await reply(msr.ald_set)
await input("MAX_SIZE", Number(text))

await reply("*🔁 MAX_SIZE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_max_size_gb",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("MAX_SIZE_GB")
let text = q
if(gett === Number(text)) return await reply(msr.ald_set)
await input("MAX_SIZE_GB", Number(text))

await reply("*🔁 MAX_SIZE_GB UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_owner_number",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
	
let gett = await get("OWNER_NUMBER")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("OWNER_NUMBER", text)

await reply("*🔁 OWNER_NUMBER UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_owner_react_emoji",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("OWNER_REACT_EMOJI")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("OWNER_REACT_EMOJI", text)

await reply("*🔁 OWNER_REACT UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_alive_message",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("ALIVE_MESSAGE")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("ALIVE_MESSAGE", text)

await reply("*🔁 ALIVE_MESSAGE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_footer",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("FOOTER")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("FOOTER", text)

await reply("*🔁 FOOTER UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
}) 

cmd({
    pattern: "set_filename",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("FILE_NAME")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("FILE_NAME", text)

await reply("*🔁 FILE_NAME UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_caption",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, msr, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("CAPTION")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("CAPTION", text)

await reply("*🔁 CAPTION UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_logo",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, msr, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("LOGO")
let text = q
if(gett === text) return await reply(msr.ald_set)
if(!text.includes("https://")) return reply(msr.valid_con)
await input("LOGO", text)

await reply("*🔁 LOGO UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_owner_name",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, msr, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("OWNER_NAME")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("OWNER_NAME", text)

await reply("*🔁 OWNER_NAME UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_del_send",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, msr, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("DELETE_MSG_SENDTO")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("DELETE_MSG_SENDTO", text)

await reply("*🔁 DELETE_MSG_SENDTO UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_body",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, msr, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
let gett = await get("BODY")
let text = q
if(gett === text) return await reply(msr.ald_set)
await input("BODY", text)

await reply("*🔁 BODY UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + text + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
    
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
//========================================================================================================


cmd({
    pattern: "anti_link",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("ANTI_LINK")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_LINK", q)

await reply("*🔁 ANTI_LINK UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("ANTI_LINK")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_LINK", q)

await reply("*🔁 ANTI_LINK UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "anti_bad",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("ANTI_BAD")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_BAD", q)

await reply("*🔁 ANTI_BAD UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("ANTI_BAD")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_BAD", q)

await reply("*🔁 ANTI_BAD UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "anti_bot",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("ANTI_BOT")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_BOT", q)

await reply("*🔁 ANTI_BOT UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("ANTI_BOT")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_BOT", q)

await reply("*🔁 ANTI_BOT UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "auto_read_status",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("AUTO_READ_STATUS")
if(gett === q) return await reply(msr.ald_set)
await input("AUTO_READ_STATUS", q)

await reply("*🔁 AUTO_READ_STATUS UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("AUTO_READ_STATUS")
if(gett === q) return await reply(msr.ald_set)
await input("AUTO_READ_STATUS", q)

await reply("*🔁 AUTO_READ_STATUS UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "auto_msg_read",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("AUTO_MSG_READ")
if(gett === q) return await reply(msr.ald_set)
await input("AUTO_MSG_READ", q)

await reply("*🔁 AUTO_MSG_READ UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("AUTO_MSG_READ")
if(gett === q) return await reply(msr.ald_set)
await input("AUTO_MSG_READ", q)

await reply("*🔁 AUTO_MSG_READ UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "always_online",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("ALWAYS_ONLINE")
if(gett === q) return await reply(msr.ald_set)
await input("ALWAYS_ONLINE", q)

await reply("*🔁 ALWAYS_ONLINE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("ALWAYS_ONLINE")
if(gett === q) return await reply(msr.ald_set)
await input("ALWAYS_ONLINE", q)

await reply("*🔁 ALWAYS_ONLINE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "owner_react",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("OWNER_REACT")
if(gett === q) return await reply(msr.ald_set)
await input("OWNER_REACT", q)

await reply("*🔁 OWNER_REACT UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("OWNER_REACT")
if(gett === q) return await reply(msr.ald_set)
await input("OWNER_REACT", q)

await reply("*🔁 OWNER_REACT UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "work_type",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "private"){
let gett = await get("WORK_TYPE")
if(gett === q) return await reply(msr.ald_set)
await input("WORK_TYPE", q)

await reply("*🔁 WORK_TYPE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "PRIVATE" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "only_group"){
let gett = await get("WORK_TYPE")
if(gett === q) return await reply(msr.ald_set)
await input("WORK_TYPE", q)

await reply("*🔁 WORK_TYPE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "ONLY_GROUP" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "public"){
let gett = await get("WORK_TYPE")
if(gett === q) return await reply(msr.ald_set)
await input("WORK_TYPE", q)

await reply("*🔁 WORK_TYPE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "PUBLIC" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
}  else if (q === "inbox"){
let gett = await get("WORK_TYPE")
if(gett === q) return await reply(msr.ald_set)
await input("WORK_TYPE", q)

await reply("*🔁 WORK_TYPE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "INBOX_ONLY" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_message_type",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "BUTTON"){
let gett = await get("MESSAGE_TYPE")
if(gett === q) return await reply(msr.ald_set)
await input("MESSAGE_TYPE", q)

await reply("*🔁 MESSAGE_TYPE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "BUTTON" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "NON-BUTTON"){
let gett = await get("MESSAGE_TYPE")
if(gett === q) return await reply(msr.ald_set)
await input("MESSAGE_TYPE", q)

await reply("*🔁 MESSAGE_TYPE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "NON-BUTTON" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_ai_mode",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("AI_MODE")
if(gett === q) return await reply(msr.ald_set)
await input("AI_MODE", q)

await reply("*🔁 AI_MODE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("AI_MODE")
if(gett === q) return await reply(msr.ald_set)
await input("AI_MODE", q)

await reply("*🔁 AI_MODE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_cine_block",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("CINE_BLOCK")
if(gett === q) return await reply(msr.ald_set)
await input("CINE_BLOCK", q)

await reply("*🔁 CINE_BLOCK UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("CINE_BLOCK")
if(gett === q) return await reply(msr.ald_set)
await input("CINE_BLOCK", q)

await reply("*🔁 CINE_BLOCK UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "set_anti_delete",
    react: "🔁",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isDev, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if ( !isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
if(!q) return await reply(msr.valid_con)
	
if(q === "true"){
let gett = await get("ANTI_DELETE")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_DELETE", q)

await reply("*🔁 ANTI_DELETE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "true" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
	
} else if (q === "false"){
let gett = await get("ANTI_DELETE")
if(gett === q) return await reply(msr.ald_set)
await input("ANTI_DELETE", q)

await reply("*🔁 ANTI_DELETE UPDATE:*\n\n👨🏻‍🔧 ➠ [ " + "false" + " ]")
await conn.sendMessage(from, { react: { text: `✔`, key: mek.key } })
} else {
const invalid = await conn.sendMessage(from, { text: msr.valid_con }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `❓`, key: invalid.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
