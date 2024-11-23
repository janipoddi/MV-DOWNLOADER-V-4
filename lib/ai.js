const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

var desct = "Chat with "

var needus = "*Hellow.! i am frozen md whatsapp user bot. How can i help you.?*" 

var cantf = "*Server is busy. Try again later.!*"


cmd({
    pattern: "chatgpt",
    alias: ["ai","gpt","openai","chat"],
    react: '👾',
    desc: desct + "chatgpt",
    category: "ai",
    use: '.chatgpt <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/chatgpt?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "gemini",
    alias: ["ai2","gpt2","openai2","chat2"],
    react: '👾',
    desc: desct + "gemini",
    category: "ai",
    use: '.gemini <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/gemini?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})


cmd({
    pattern: "toolbot",
    alias: ["ai3","gpt3","openai3","chat3"],
    react: '👾',
    desc: desct + "Toolbot AI",
    category: "ai",
    use: '.toolbot <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/toolbot?q=' + q)

return await reply(res.data.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "lepton",
    alias: ["ai4","gpt4","openai4","chat4"],
    react: '👾',
    desc: desct + "Lepton AI",
    category: "ai",
    use: '.lepton <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/lepton?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "yousearch",
    alias: ["ai5","gpt5","openai5","chat5"],
    react: '👾',
    desc: desct + "You Search AI",
    category: "ai",
    use: '.yousearch <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/yousearch?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "letme",
    alias: ["ai6","gpt6","openai6","chat6"],
    react: '👾',
    desc: desct + "Let Me Gpt",
    category: "ai",
    use: '.letme <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/letme?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "aoyo",
    alias: ["ai7","gpt7","openai7","chat7"],
    react: '👾',
    desc: desct + "Aoyo AI",
    category: "ai",
    use: '.aoyo <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/aoyo?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "useadrenaline",
    alias: ["ai8","gpt8","openai8","chat8"],
    react: '👾',
    desc: desct + "Useadrenaline AI",
    category: "ai",
    use: '.useadrenaline <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/useadrenaline?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "goody",
    alias: ["ai9","gpt9","openai9","chat9"],
    react: '👾',
    desc: desct + "Goody AI",
    category: "ai",
    use: '.goody <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://dark-yasiya-api-new.vercel.app/ai/goody?q=' + q)

return await reply(res.result)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})

cmd({
    pattern: "blaxbox",
    alias: ["ai10","gpt10","openai10","chat10"],
    react: '👾',
    desc: desct + "BlaxBox AI",
    category: "ai",
    use: '.blaxbox <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)

let res = await fetchJson('https://prabath-ytdl-scrapper.koyeb.app/api/blaxbox?q=' + q)
    const resData = res.data
var data = ''

    if(resData.includes("Generated by BLACKBOX.AI, try unlimited chat https://www.blackbox.ai")) { data = resData.replace("Generated by BLACKBOX.AI, try unlimited chat https://www.blackbox.ai\n\n", "")
                                                                                                 } else { data = resData }
    
return await reply(data)
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(cantf)
console.log(e)
}
})
