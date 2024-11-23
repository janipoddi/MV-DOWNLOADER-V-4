const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")

 

cmd({
    pattern: "setjid",
    react: "🗃",
    alias: ["sj","setj"],
    desc: "Save jid database.",
    category: "owner",
    use: '.setjid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isSudo, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

 
if(await isAnti("JIDS")) return await reply(msr.ald_set)
let olddata = await get("JIDS")
olddata.push(from)
await input("JIDS", olddata)
await reply("*JID SAVED DATABASE ✅*\n\n" + from + "\n")
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "removejid",
    alias: ["rjid","removej"],
    react: "🗃",
    desc: "Remove jid database.",
    category: "owner",
    use: '.removejid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isSudo, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
 
if(!await isAnti("JIDS")) return await reply(msr.ald_set)
const array = await get("JIDS")
const itemToRemove = from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("JIDS", array)
await reply("*JID REMOVED DATABASE ✅*\n\n" + from + "\n")
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})

cmd({
    pattern: "setjidq",
    react: "🗃",
    alias: ["sjq","setjq"],
    desc: "Save jid database for text.",
    category: "owner",
    use: '.setjidq < jid >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isSudo, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)
if (!q) return await reply(msr.need_jid)
if(!q.includes('@')) return await reply(msr.valid_jid)
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

 
if(await isAnti("JIDS")) return await reply(msr.ald_set)
let olddata = await get("JIDS")
olddata.push(q)
await input("JIDS", olddata)
await reply("*JID SAVED DATABASE ✅*\n\n" + q + "\n")
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "removejidq",
    alias: ["rjidq","removejq"],
    react: "🗃",
    desc: "Remove jid database for text.",
    category: "owner",
    use: '.removejidq',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isSudo, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)
if (!q) return await reply(msr.need_jid)
if(!q.includes('@')) return await reply(msr.valid_jid)

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}
 
if(!await isAnti("JIDS")) return await reply(msr.ald_set)
const array = await get("JIDS")
const itemToRemove = q
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("JIDS", array)
await reply("*JID REMOVED DATABASE ✅*\n\n" + q + "\n")
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "removejids",
    alias: ["rjids","removejs","rjs"],
    react: "🗃",
    desc: "Remove ALL jid database",
    category: "owner",
    use: '.removejids',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isSudo, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

const jid_rem = []
 
await input("JIDS", jid_rem)
await reply("*ALL JID REMOVED DATABASE ✅*")
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
