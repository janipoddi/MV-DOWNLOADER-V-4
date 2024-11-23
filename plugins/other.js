const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { inputMovie, getMovie, resetMovie } = require("../lib/movie_db")
const { updfb } = require('../lib/database')


cmd({
    pattern: "fd",
    react: "⏭️",
    alias: ["f","share","sendfile"],
    desc: "Forward to file jid",
    category: "other",
    use: '.forward < jid >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, isDev, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
if ( !isDev && !isOwner && !isMe && !isMe && !isSudo ) return await reply(msr.own_cmd)
if (!m.quoted) return await reply("*Please mention any file ❓*")
var sjid = ''
    
    if(!q || !q.includes("@")) {
        
await conn.copyNForward(from, m.quoted.fakeObj)
        
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })  

    } else if (q.includes(",")) {

const send = q.split(",")  
    
    	    for (let jids of send ) { 
    
await conn.copyNForward(jids, m.quoted.fakeObj)
sjid += jids + '\n'
}               
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
        
reply('*File Send Successfull ✔*\n\n' + sjid )
} else {

const jids = q || from         
await conn.copyNForward(jids, m.quoted.fakeObj)
reply('*File Send Successfull ✔*\n\n' + '*' + jids + '*' )
        
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })  
}
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "resetmvdb",
    react: "🔄",
    alias: ["rmvdb","resetmv","rmvd"],
    desc: "Reset fro movie upload database",
    category: "owner",
    use: '.resetmvdb',
    filename: __filename
},
    
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, isDev, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
await inputMovie(false, 'none' , new Date().getTime() );
await conn.sendMessage(from, {text : '*MovieDB Reset Done ✔️*' } ,{ quoted: mek })	 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})

 
cmd({
    pattern: "resetdb",
    react: "🔄",
    alias: ["rdb","resetmd","rmd"],
    desc: "Reset fro main database",
    category: "owner",
    use: '.resetdb',
    filename: __filename
},
    
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, isDev, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
if (!isDev && !isSudo && !isOwner && !isMe ) return await reply(msr.own_cmd)
    
await updfb()
await conn.sendMessage(from, {text : '*MainDB Reset Done ✔️*' } ,{ quoted: mek })	 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
