const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const fetch = require('node-fetch');
var os = require('os')
const { inputMovie, getMovie, resetMovie } = require("../lib/movie_db")

const oce = "`"
const oce3 = "```"
const oce2 = '*'
const pk = "`("
const pk2 = ")`"
const { File } = require('megajs');

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(1, '0');
} 


cmd({
    pattern: "sinhalasub",
    alias: ["mv3","sin"],
    react: "🎥",
    desc: "Download movie for sinhalasub.lk",
    category: "movie",
    use: '.sinhalasub < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, msr, creator, prefix, quoted, body, isCmd, command, args, q, isGroup, apilink, apikey, sender, isDev, senderNumber, isPreUser, botNumber2, botNumber, pushname, isMe, isOwner,  participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.giveme)
	
const movs = await fetchApi(`${apilink}/movie/sinhalasub/search?text=${q}&apikey=${apikey}`)
var ty = ''
let mov = movs.result.data
let numrep = []


		
             if (movs.result.data.length < 1) return await reply(msr.not_fo)

		
              let cot = `🔮 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖲𝖤𝖠𝖱𝖢𝖧 𝖲𝖸𝖲𝖳𝖤𝖬* 🔮


📲 ${oce}Input:${oce} *${q}*


`
	
	                mov.forEach((movie, index) => {
				
		  if(movie.type == 'TV' ) ty = 'sitvjid '
                  if(movie.type == 'Movie' ) ty = 'simvjid ' 
				
                  cot += ` *${formatNumber( index + 1)} ||* ${movie.title} | ${movie.type}\n\n`
				
                  numrep.push(`${prefix}${ty} ${movie.link}` )
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
    pattern: "simvjid",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/movies')) return await reply(msr.valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${q}&apikey=${apikey}`)
let mov = move.result.data
      
    
let cot = `🎬 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🎬


   🎞️ ${oce2}ᴛɪᴛʟᴇ :${oce2} ${mov.title}
   📅 ${oce2}ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ :${oce2} ${mov.date}
   ⏱ ${oce2}ᴅᴜᴀʀᴀᴛɪᴏɴ :${oce2} ${mov.runtime}
   🖇️ ${oce2}ᴍᴏᴠɪᴇ ʟɪɴᴋ :${oce2} ${q}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃


*${formatNumber(1)} ||* SEND INBOX
`
  
  let numrep = []
	
	numrep.push(`${prefix}simvgo ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}simvgo ${q}🎈${i}` )
                
     }}
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`,
					    
					    contextInfo: {
                                        externalAdReply: { 
					title: mov.title,
					body: config.BODY,
					mediaType: 1,
					sourceUrl: q,
                                         thumbnailUrl: mov.image ,
	 				renderLargerThumbnail: false
         }} }, { quoted: mek });
	
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
    pattern: "simvgo",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}    
	

if(!inp) return await reply(msr.err)
    if (!q.includes('sinhalasub.lk/movies')) return await reply(msr.valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${inp}&apikey=${apikey}`)
let mov = move.result.data
	
    
let cot = `🎬 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🎬


  ${oce2}▫ 🎞️ ᴛɪᴛʟᴇ :${oce2} ${mov.title}
  ${oce2}▫ 📅 ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ :${oce2} ${mov.date}   
  ${oce2}▫ 🌍 ᴄᴏᴜɴᴛʀʏ :${oce2} ${mov.country}
  ${oce2}▫ ⏱ ᴅᴜᴀʀᴀᴛɪᴏɴ :${oce2} ${mov.runtime}  
  ${oce2}▫ 🖇️ ᴍᴏᴠɪᴇ ʟɪɴᴋ :${oce2} ${inp}   
  ${oce2}▫ 🎀 ᴄᴀᴛᴀɢᴏʀɪᴇs :${oce2} ${mov.category}
  ${oce2}▫ 🤵 ᴅɪʀᴇᴄᴛᴏʀ :${oce2} ${mov.director}

_Please select the quality you wants to download by replying these numbers,_\n
*${formatNumber(1)} ||* DETAILS NORMAL
*${formatNumber(2)} ||* DETAILS LINK PREVIEW
*${formatNumber(3)} ||* SEND IMAGES

`
  
let numrep = []
numrep.push(`${prefix}simvdet ${q}`) 
numrep.push(`${prefix}simvdet2 ${q}`) 	
numrep.push(`${prefix}sinhimages ${q}`) 
var dl_type = ''	
	

		                mov.dl_links.forEach((movie, index) => {
				
		  if(movie.link.includes('mega.nz')) dl_type = 'MEGA-CLOUD'
                  if(movie.link.includes('pixeldrain.com')) dl_type = 'PIXELDRAIN'
		  if(movie.link.includes('ddl.sinhalasub.net')) dl_type = 'DDL-SINHALASUB'
		  if(movie.link.includes('ssl.sinhalasub01.workers.dev/')) dl_type = 'SINHALASUB01-WORKERS'
		  //if(!movie.link.includes('mega.nz' && 'ddl.sinhalasub.net' && 'pixeldrain.com')) dl_type = '..?'
				
                  cot += `*${formatNumber( index + 4)} ||* ${movie.quality} *( ${movie.size} )*\n[ ${dl_type} ]\n`
				
                  numrep.push(`${prefix}sinedirectdl ${movie.link}🎈${mov.title}🎈${movie.quality}🎈${movie.size}🎈${jidx}🎈${mov.mainImage}` )
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
    pattern: "sitvjid",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/tvshow')) return await reply(msr.valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/tvshow?url=${q}&apikey=${apikey}`)
let mov = move.result.data
      
    
let cot = `📺 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  🎞 ${oce2}ᴛɪᴛʟᴇ :${oce2} ${mov.title}
  
  ✨ ${oce2}ꜰɪʀꜱᴛ ᴀɪʀ ᴅᴀᴛᴇ :${oce2} ${mov.date}
  🤵 ${oce2}ᴅɪʀᴇᴄᴛᴏʀ :${oce2} ${mov.director}
  🖇️ ${oce2}ᴛᴠꜱʜᴏᴡ ʟɪɴᴋ :${oce2} ${q}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃


*${formatNumber(1)} ||* SEND INBOX
`
  
  let numrep = []
	
	numrep.push(`${prefix}sitvnew ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}sitvnew ${q}🎈${i}` )
                
     }}
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`,
					    
					    contextInfo: {
          externalAdReply: { 
					title: mov.title,
					body: config.BODY,
					mediaType: 1,
					sourceUrl: q,
          thumbnailUrl: mov.image ,
	 				renderLargerThumbnail: false
         }} }, { quoted: mek });
	
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
    pattern: "siepgo",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}    
	

if(!inp) return await reply(msr.err)
    if (!q.includes('sinhalasub.lk/episodes')) return await reply(msr.valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${inp}&apikey=${apikey}`)
let mov = move.result.data
    

let cot = `📺 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  📽 ${oce3}Episode Title:${oce3} ${mov.title}
  🎡 ${oce3}Episode Name:${oce3} ${mov.ep_name}
  🖇️ ${oce3}Tv Show Link:${oce3} ${inp}
  🧿 ${oce3}Release Date :${oce3} ${mov.date}
  
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃


*${formatNumber(1)} ||* SEND DETAILS NORMAL IMG
*${formatNumber(2)} ||* SEND DETAILS LINK PREVIEW
*${formatNumber(3)} ||* SEND IMAGES

`
	
var dl_type = ''	  
let numrep = []
numrep.push(`${prefix}siepdet ${q}`)
numrep.push(`${prefix}siepdet2 ${q}`) 
numrep.push(`${prefix}sinhimages ${q}`) 
	

		                mov.dl_links.forEach((movie, index) => {
				
		  if(movie.link.includes('mega.nz')) dl_type = 'MEGA-CLOUD'
                  if(movie.link.includes('pixeldrain.com')) dl_type = 'PIXELDRAIN'
		  if(movie.link.includes('ddl.sinhalasub.net')) dl_type = 'DDL-SINHALASUB' 
                  if(movie.link.includes('ssl.sinhalasub01.workers.dev/')) dl_type = 'SINHALASUB01-WORKERS'

		  //if(!movie.link.includes('mega.nz' && 'ddl.sinhalasub.net' && 'pixeldrain.com')) dl_type = '..?'
				
                  cot += `*${formatNumber( index + 4)} ||* ${movie.quality} *( ${movie.size} )*\n[ ${dl_type} ]\n`
				
                  numrep.push(`${prefix}sinedirectdl ${movie.link}🎈${mov.title}🎈${movie.quality}🎈${movie.size}🎈${jidx}` )
                  })
                 

 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

        await storenumrepdata(jsonmsg) 
	await sleep(1 * 1000) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "simvdet",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, backup, quoted, msr, creator, body, prefix, isCmd, command, args, q, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/movies')) return await reply(msr.valid_url)

  
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	

var cast = ''
      for (let i of mov.cast ){ 
  cast += i.reall_name + ','
	  }
	
  
let yt = `
🍃Ｔɪᴛʟᴇ _*${mov.title}*_


🧿 *𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲:* ➜ ${mov.date}

🌍 *𝗖𝗼𝘂𝗻𝘁𝗿𝘆:* ➜ ${mov.country}

⏰️ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:* ➜ ${mov.runtime}

🎭 *𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀:* ➜ ${mov.category}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${oce}⚠️ ▫️දාන Files දවස් 14ක් ඇතුළත Download කරගන්න.${oce}

  🥷🏻 *𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢* https://wa.me/94740952096

  ✨ *𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢* https://wa.me/94772098172
  ⚡ *𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢* https://wa.me/94777135007

⚠️▫️Phone එකෙන් Films, Series නැරඹීමට MX Player, VLC player භාවිතා කරන්න. 
(Play Store එකෙන් Download කරගන්න)

`
const jid = jidx || from
//await conn.sendMessage(jid,{image:{url: mov.mainDetails.imageUrl},caption: `${yt}\n\n` + config.FOOTER })   

await conn.sendMessage(jid ,  { image : { url : mov.images[0] || mov.image || config.LOGO } , caption : yt + `


> ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` })


if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(1000 * 1) }	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1) }
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})	


cmd({
    pattern: "simvdet2",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, backup, quoted, msr, creator, body, prefix, isCmd, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/movies')) return await reply(msr.valid_url)

  
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	

var cast = ''
      for (let i of mov.cast ){ 
  cast += i.reall_name + ','
	  }
	
  
let yt = `
🍃Ｔɪᴛʟᴇ _*${mov.title}*_


🧿 *𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲:* ➜ ${mov.date}

🌍 *𝗖𝗼𝘂𝗻𝘁𝗿𝘆:* ➜ ${mov.country}

⏰️ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:* ➜ ${mov.runtime}

🎭 *𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀:* ➜ ${mov.category}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

${oce}⚠️ ▫️දාන Files දවස් 14ක් ඇතුළත Download කරගන්න.${oce}

  🥷🏻 *𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢* https://wa.me/94740952096

  ✨ *𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢* https://wa.me/94772098172
  ⚡ *𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢* https://wa.me/94777135007

⚠️▫️Phone එකෙන් Films, Series නැරඹීමට MX Player, VLC player භාවිතා කරන්න. 
(Play Store එකෙන් Download කරගන්න)

`
const jid = jidx || from
//await conn.sendMessage(jid,{image:{url: mov.mainDetails.imageUrl},caption: `${yt}\n\n` + config.FOOTER })   

await conn.sendMessage(jid ,  { image : { url : mov.image } , text : yt + `


> ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ` })	

if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})	

cmd({
    pattern: "sitvdet",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, quoted, msr, creator, body, prefix, isCmd, command, args, q, backup, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{


if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/tvshow')) return await reply(msr.valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/tvshow?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *ᴛɪᴛʟᴇ :* ${mov.title}

✨ *ꜰɪʀꜱᴛ ᴀɪʀ ᴅᴀᴛᴇ :* ${mov.date}

🖇️ *ᴜʀʟ :* ${inp}

🎀 *ᴄᴀᴛᴇɢᴏʀɪᴇꜱ :* ${mov.category}

🤵‍♂️ *ᴅɪʀᴇᴄᴛᴏʀ :* ${mov.director}

⭐ *ɪᴍᴅʙ :* ${mov.imdb}
`
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.image } , text : yt + `


> ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ`})


if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "siepdet",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, msr, creator, body, prefix, isCmd, command, args, q, backup, isGroup, apilink, apikey, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/episode')) return await reply(msr.valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *Episode Title:* ${mov.title}

🎡 *Episode Name:* ${mov.ep_name}

🖇️ *Tv Show Link:* ${inp}

🧿 *Release Date :* ${mov.date}
`
	
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.images[0] || '' } , caption : yt + `


> ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ`})
	

if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "siepdet2",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, msr, creator, quoted, body, prefix, isCmd, command, args, q, backup, isGroup, apilink, apikey, sender, senderNumber, botNumber, pushname, isMe, isOwner, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if(!q) return await reply(msr.url)
    if (!q.includes('sinhalasub.lk/episode')) return await reply(msr.valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *Episode Title:* ${mov.title}

🎡 *Episode Name:* ${mov.ep_name}

🖇️ *Tv Show Link:* ${inp}

🧿 *Release Date :* ${mov.date}
`
	
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.image } , text : yt + `


> ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ`})


if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "sinedirectdl",
    react: "⬆",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, backup, apilink, apikey, sender, senderNumber, botNumber, pushname, isMe, form, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

				const isProcess = await getMovie();
				if(isProcess.is_download){
				var pmt = isProcess.time
				var pt = ( new Date().getTime() - pmt ) / 36000	
				if (pt < 10) return reply(`_වෙනත් චිත්‍රපටයක් බාගත වෙමින් පවතින අතර එය බාගත වීමෙන් පසු නැවත උත්සහ කරන්න.❗_\n\n_බාගත වෙමින් පවතින චිත්‍රපටය ⬆️_\n\n*${isProcess.name}*`)
				}
	
	
if(!q) return reply('*Give me url*')	

                                var typ = ''
				var inp = ''
	                        var jidx = ''
				var nmf = ''
				var size = ''
			        var quality = ''
	                        var imgs = ''
				var text = q
				if (q.includes('🎈')) nmf = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]
                                                      quality =  text.split('🎈')[2]
							size =  text.split('🎈')[3]
							jidx =  text.split('🎈')[4]
							imgs = text.split('🎈')[5]}
	
							 
if (!inp) return reply("*Successful Processing ✅*")

var pf = ''			
if (os.hostname().length == 36) pf = 'heroku'
if(pf == 'heroku')  {			
				
if(size.includes('GB')) { return await reply(`*The file is too large to download ⛔*\n*Use this link to download the movie. ❗*\n\n` + inp)	
	
} else if(size.includes('MB')) {
					
size = size.replace('MB' ,'')
if ( size > 300 || size == 300) return await reply(`*The file is too large to download ⛔*\n*Use this link to download the movie. ❗*\n\n` + inp)	
						       }}
else{
	
if(size.includes('GB')) {
size = size.replace('GB' ,'')
if ( size > config.MAX_SIZE_GB || size == config.MAX_SIZE_GB) return await reply(`*The file is too large to download ⛔*\n*Use this link to download the movie. ❗*\n\n` + inp)	
						       }}

	
const jid = jidx || from
await inputMovie(true, nmf , new Date().getTime());
    
//MEGA.NZ
if(inp.includes("mega.nz")) {
	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
	
	
        const file = File.fromURL(inp)
        await file.loadAttributes()
      //  if (file.size >= config.MAX_SIZE * 1024 * 1024) return reply(`File size exeeded...\nMaximum Upload Size Is ${config.MAX_SIZ} MB`)
	const data = await file.downloadBuffer();
	

	
            await conn.sendMessage(jid, { 
		    document: data, 
		    mimetype: "video/mp4", 
		    fileName: `🎬DSXT🎬 ${nmf}.mp4`, 
		    caption: nmf + ` ${pk} ${quality} ${pk2}
      
` + config.CAPTION
	    });
	
await inputMovie(false, nmf , new Date().getTime());	
await conn.sendMessage(from, { delete: up_mg.key })
	
if (jidx === from) { 	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) 
}
	
} else if(inp.includes("https://pixeldrain.com")){


// PIXELDRAIN
if(inp.includes('https://pixeldrain.com/u/'))   inp = inp.replace('/u/' , '/api/file/')
	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
		     
const mvdoc = await conn.sendMessage( jid , { 
		document : { url: inp }, 
		fileName: `🎬DSXT🎬 ${nmf}.mp4`,
		mimetype: "video/mp4", 
		caption:  nmf + ` ${pk} ${quality} ${pk2}

` + config.CAPTION
	})
	
await inputMovie(false, nmf , new Date().getTime() );
await conn.sendMessage(from, { delete: up_mg.key })
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) 

} else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) 
}
} else {


    // DIRECT   
    const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})              
    const mvdoc = await conn.sendMessage( jid , { 
            document : { url: await getBuffer(inp) }, 
            fileName: `🎬DSXT🎬 ${nmf}.mp4`,
            mimetype: "video/mp4", 
            caption:  nmf + ` ${pk} ${quality} ${pk2}
    
    ` + config.CAPTION
        })
        
    await inputMovie(false, nmf , new Date().getTime() );
    await conn.sendMessage(from, { delete: up_mg.key })
        
    if (jidx === from) { 
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
    await sleep(500 * 1) 
    
    } else {
    await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
    await sleep(500 * 1) 
    }}
		
} catch (e) {
await resetMovie();	 
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})


cmd({
    pattern: "sinhimages",
    react: "📽",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

const msr = (await fetchJson('https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/MESSAGES/mreply.json')).replyMsg

 				
	
	
	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   


const input = inp ? inp : q
	

	if(input.includes("sinhalasub.lk/movies")) {
		
const anu = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${input}&apikey=${apikey}`)			
if (anu.result.data.images.length < 1) return await reply(msr.not_fo)		
const jid = jidx ? jidx : from

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) 
}
	
} else if ( input.includes("sinhalasub.lk/episode")) {

const anu = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${input}&apikey=${apikey}`)	
if (anu.result.data.images.length < 1) return await reply(msr.not_fo)	
const jid = jidx ? jidx : from
		

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) 
}		
} else if ( input.includes("sinhalasub.lk/tv")) {

const anu = await fetchApi(`https://api-cine-anonymous.vercel.app/api/sinhalasubs/episode?url=${input}&apikey=yasiyalk`)	
if (anu.result.data.images.length < 1) return await reply(msr.not_fo)	
const jid = jidx ? jidx : from
		

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) 
}		
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
