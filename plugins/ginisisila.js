const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const fg = require('api-dylux');
var os = require('os')
const oce = "`"
const pk = "("
const pk2 = ")"
const { getCartoons, getCartoonDL, getCartoonsPg } = require("../lib/ginisisila")
const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(1, '0');
} 

cmd({
    pattern: "ginisisila",
    alias: ["cartoon","car"],
    react: "🎎",
    desc: "Download cartoons for ginisisilacartoon.net",
    category: "movie",
    use: '.ginisisila < cartoon Name >',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	if (!q) return reply(msr.giveme)
  
const mov = await getCartoons(q)
if (mov.result.length < 1) return await reply(msr.not_fo)
	
let numrep = []


		
let cot = `🔮 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖲𝖤𝖠𝖱𝖢𝖧 𝖲𝖸𝖲𝖳𝖤𝖬* 🔮
              

📲 ${oce}Input:${oce} *${q}*

*${formatNumber(1)} ||* NEXT PAGE

`
numrep.push( prefix + "gininxt " + mov.next_page )  	
		
 		  mov.result.forEach((i, index) => {
				
                  cot += ` *${formatNumber( index + 2 )} ||* ${i.title}\n`
				
                  numrep.push( prefix + 'ginidet ' + i.link + "🎈" + i.image + "🎈" + i.posted_date + "🎈" + i.title )
                  })


const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 
  

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "gininxt",
    react: "🎎",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	if (!q) return reply('Aye page ne paco..😒')


  
const mov = await getCartoonsPg(q)
if (mov.result.length < 1) return await reply(msr.not_fo)
let numrep = []
	
let cot = `🔮 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖲𝖤𝖠𝖱𝖢𝖧 𝖲𝖸𝖲𝖳𝖤𝖬* 🔮
              

📲 ${oce}Input:${oce} *${q}*

*${formatNumber(1)} ||* NEXT PAGE

`
numrep.push( prefix + "gininxt " + mov.next_page )  	
		
 		  mov.result.forEach((i, index) => {
				
                  cot += ` *${formatNumber( index + 2 )} ||* ${i.title}\n`
				
                  numrep.push( prefix + 'ginidet ' + i.link + "🎈" + i.image + "🎈" + i.posted_date + "🎈" + i.title )
                  })


const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "ginidet",
    react: "🎳",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	if (!q) return reply(msr.url)

	
  

let cot = `


*${formatNumber(1)} ||* SEND INBOX
`
  
  let numrep = []
	
	numrep.push(prefix + `ginidl ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(prefix + `ginidl ${q}🎈${i}`)
                
     }}
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 	   

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})



cmd({
    pattern: "ginidl",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
  
				var name = ''
				var img = ''	
	                        var jidx = ''
	                        var link = ''
				var text = q
				if (q.includes('🎈')) img = text.split('🎈')[1]
				if (text.includes('🎈')) { link = text.split('🎈')[0]
				 date = text.split('🎈')[2]
				 name = text.split('🎈')[3]
				 jidx = text.split('🎈')[4]}
	
   

const inps = await getCartoonDL(link)
	const inp = inps.dl_link
	
if (inp.includes('drive.google.com')) {
let res = await fg.GDriveDl(inp)

		
var pf = ''			
if (os.hostname().length == 36) pf = 'heroku'
if(pf == 'heroku')  {			
				
if(res.fileSize.includes('GB')) { return await reply(`*❗💬 The file is too large to download*`)	
	
} else if(res.fileSize.includes('MB')) {
					
res.fileSize = res.fileSize.replace('MB' ,'')
if ( res.fileSize > 300 || res.fileSize == 300) return await reply(`*❗💬 The file is too large to download*`)	
						       }}
else{
	
if(res.fileSize.includes('GB')) {
res.fileSize = res.fileSize.replace('GB' ,'')
if ( res.fileSize > config.MAX_SIZE_GB || res.fileSize == config.MAX_SIZE_GB) return await reply(`*❗💬 The file is too large to download*`)	
						       }}


let yt = `
🍟 *Cartoon Name : ${name}*

🧿 *Posted Date :* ${date}

🌍 *Language :* Sinhala

🖇️ *Cartoon Link :* ${link}
`
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : img } , text : yt + `


${config.CAPTION} `, contextInfo: {

				externalAdReply: { 
			        title: name,
				body: "©ᴅᴀʀᴋʏᴀsɪʏᴀxᴛᴇᴀᴍ",
				mediaType: 1,
				sourceUrl: link ,
                                thumbnailUrl: img,
				renderLargerThumbnail: true,
showAdAttribution: false}} 
})
	
const up_mg  = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek} )    
await conn.sendMessage(jid, { document: { url: res.downloadUrl }, fileName: config.FILE_NAME + name, mimetype: res.mimetype, caption: `${name}

*සිංහල හඩකවා ඇත.*

${config.CAPTION}` })
	
await conn.sendMessage(from, { delete: up_mg.key })
await conn.sendMessage(from, { text : 'File Send Successfull ✔' }, {quoted: mek} )
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })

} else {
await conn.sendMessage(from, { text: msr.not_fo }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '❓', key: mek.key } })
}
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})	
