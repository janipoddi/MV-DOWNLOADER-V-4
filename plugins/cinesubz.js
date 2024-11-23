const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const { inputMovie, getMovie, resetMovie } = require("../lib/movie_db")
const fg = require('api-dylux');
const fetch = require('node-fetch');
var os = require('os');
const fs = require("fs-extra");
const Cinesubz = require("../lib/cinesubz");
const cine = new Cinesubz()

const oce = "`"
const oce3 = "```"
const oce2 = '*'
const pk = "`("
const pk2 = ")`"
const { File } = require('megajs');

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


cmd({
    pattern: "cinesubz",
    alias: ["mv1","cine"],
    react: "🎥",
    desc: "Download movie for cinesubz.co",
    category: "movie",
    use: '.cinesubz < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, isDev, senderNumber, isPreUser, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.giveme)
	
const movs = await fetchApi(`${apilink}/private/sit1/sc1?text=${q}&apikey=${apikey}`)
var ty = ''
let mov = movs.result.data
let numrep = []


		
if (movs.result.data.length < 1) return await reply(msr.not_fo)

		
let cot = `🔮 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖲𝖤𝖠𝖱𝖢𝖧 𝖲𝖸𝖲𝖳𝖤𝖬* 🔮


📲 ${oce}Input:${oce} *${q}*


`
	
	                mov.forEach((movie, index) => {
				
		  if(movie.type == 'TV' ) ty = 'citvjid '
                  if(movie.type == 'Movie' ) ty = 'cimvjid ' 
				
                  cot += `*${formatNumber( index + 1)} ||* ${movie.title.replace(/Sinhala Subtitles \| සිංහල උපසිරැසි සමඟ/g , '').replace('Sinhala Subtitle | සිංහල උපසිරැසි සමඟ' , '')} | ${movie.type}\n`
				
                  numrep.push(`${prefix}${ty} ${movie.link}` )
                  })	      
  
	

	 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`,
					    contextInfo: {
                                        externalAdReply: { 
					title: '🍭 CINESUBZ SEARCH SYSTEM 🍭                       ',
					body: config.BODY,
					mediaType: 1,
					sourceUrl: '',
                                        thumbnailUrl: config.LOGO ,
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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "cimvjid",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/movies')) return await reply(msr.valid_url)

const anu = await fetchApi(`${apilink}/private/sit1/sc2?url=${q}&apikey=${apikey}`)
let mov = anu.result.data
    
var cast = ''
      for (let i of mov.cast ){ 
  cast += i.cast_name + ','
}
    
let cot = `🎬 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🎬


   🎞️ ${oce2}ᴛɪᴛʟᴇ :${oce2} ${mov.title}
   📅 ${oce2}ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ :${oce2} ${mov.date}
   ⏱ ${oce2}ᴅᴜᴀʀᴀᴛɪᴏɴ :${oce2} ${mov.duration}
   🖇️ ${oce2}ᴍᴏᴠɪᴇ ʟɪɴᴋ :${oce2} ${q}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃


*${formatNumber(1)} ||* SEND INBOX
`
  
  let numrep = []
	
	numrep.push(`${prefix}cimvgo ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}cimvgo ${q}🎈${i}` )
                
     }}
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`,
					    
					    contextInfo: {
                                        externalAdReply: { 
					title: mov.title,
					body: config.BODY,
					mediaType: 1,
					sourceUrl: q,
                                        thumbnailUrl: mov.mainImage ,
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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "cimvgo",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")

	
	      var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}    
	

if(!inp) return await reply(msr.err)
    if (!q.includes('cinesubz.co/movies')) return await reply(msr.valid_url)
  
const move = await fetchApi(`${apilink}/private/sit1/sc2?url=${inp}&apikey=${apikey}`)
let mov = move.result.data
	
let cot = `🎬 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🎬


  ${oce2}▫ 🎞️ ᴛɪᴛʟᴇ :${oce2} ${mov.title}
  ${oce2}▫ 📅 ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ :${oce2} ${mov.date}   
  ${oce2}▫ 🌍 ᴄᴏᴜɴᴛʀʏ :${oce2} ${mov.country}
  ${oce2}▫ ⏱ ᴅᴜᴀʀᴀᴛɪᴏɴ :${oce2} ${mov.duration}  
  ${oce2}▫ 🖇️ ᴍᴏᴠɪᴇ ʟɪɴᴋ :${oce2} ${inp}   
  ${oce2}▫ 🎀 ᴄᴀᴛᴀɢᴏʀɪᴇs :${oce2} ${mov.category}
  ${oce2}▫ 🤵 ᴅɪʀᴇᴄᴛᴏʀ :${oce2} ${mov.director}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

*${formatNumber(1)} ||* Details Card
*${formatNumber(2)} ||* Images

`
  
let numrep = []
numrep.push(`${prefix}cimvdet ${q}`) 
//numrep.push(`${prefix}cimvdet2 ${q}`) 	
numrep.push(`${prefix}cineimages ${q}`) 	
	

		                mov.dl_links.forEach((movie, index) => {
				
                  cot += `*${formatNumber( index + 3 )} ||* ${movie.quality} ( ${movie.size} )\n`
				
                  numrep.push(`${prefix}cinedirectdl ${movie.link}🎈${mov.title}🎈${movie.quality}🎈${movie.size}🎈${jidx}🎈${mov.image}` )
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
reply(msr.err)
console.log(e)
}
})




cmd({
    pattern: "citvjid",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if (!q) return await reply(msr.giveme)
  
const move = await fetchApi(`${apilink}/private/sit1/sc3?url=${q}&apikey=${apikey}`)
let mov = move.result.data
    

let cot = `📺 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  🎞 ${oce2}ᴛɪᴛʟᴇ :${oce2} ${mov.title}
  ✨ ${oce2}ꜰɪʀꜱᴛ ᴀɪʀ ᴅᴀᴛᴇ :${oce2} ${mov.first_air_date}
  🎐 ${oce2}ʟᴀꜱᴛ ᴀɪʀ ᴅᴀᴛᴇ :${oce2} ${mov.last_air_date}
  🖇️ ${oce2}ᴛᴠꜱʜᴏᴡ ʟɪɴᴋ :${oce2} ${q}


▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

*${formatNumber(1)} ||* SEND INBOX
`
  
  let numrep = []
	
	numrep.push(`${prefix}citvnew ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}citvnew ${q}🎈${i}` )
                
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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "ciepgo",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/episodes')) return await reply(msr.valid_url)

		                
	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}  
	
  
const move = await fetchApi(`${apilink}/private/sit1/sc4?url=${inp}&apikey=${apikey}`)
let mov = move.result.data
	    
let cot = `📺 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  📽 ${oce3}Episode Name:${oce3} ${mov.episode_name}
  🖇️ ${oce3}Tv Show Link:${oce3} ${inp}
  🧿 ${oce3}Release Date :${oce3} ${mov.date}
  
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃


 *${formatNumber(1)} ||* Details Card
 *${formatNumber(2)} ||* Details Card (2)
 *${formatNumber(3)} ||* Images

`
  
let numrep = []
numrep.push(`${prefix}ciepdet ${q}`)
numrep.push(`${prefix}ciepdet2 ${q}`)
numrep.push(`${prefix}cineimages ${q}`)

	
		                mov.dl_links.forEach((movie, index) => {
				
                  cot += ` *${formatNumber( index + 4)} ||* ${movie.quality} ( ${movie.size} )\n`
				
                  numrep.push(`${prefix}cinedirectdl ${movie.link}🎈${mov.title}🎈${movie.quality}🎈${movie.size}🎈${jidx}` )
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
reply(msr.err)
console.log(e)
}
})


//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "cimvdet",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, backup, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, isBotAdmins, isCreator ,isDev, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/movies')) return await reply(msr.valid_url)

  
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   


const anu = await fetchApi(`${apilink}/private/sit1/sc2?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	

var cast = ''
      for (let i of mov.cast ){ 
  cast += i.name + ','
	  }
const name = mov.title
const date = mov.date
const country = mov.country
const runtime = mov.duration
const cat = mov.category
const imdbrate = mov.imdbRate
const imdbvote = mov.imdbVoteCount
const director = mov.director
	
let yt = `
💦Ｔɪᴛʟᴇ'| _*${name}*_


🧿 ${oce}Release Date:${oce} ➜ ${date}

🌍 ${oce}Country:${oce} ➜ ${country}

⏱️ ${oce}Duration:${oce} ➜ ${runtime}

🎀 ${oce}Categories:${oce} ➜ ${cat}

⭐ ${oce}IMDB:${oce} ➜ ${imdbrate}

🤵‍♂️ ${oce}Director:${oce} ➜ ${director}

🕵️‍♂️ ${oce}Cast:${oce} ➜ ${cast}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

    🥷🏻 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢ https://wa.me/94740952096

  ✨ 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢ https://wa.me/94772098172
  ⚡ 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢ https://wa.me/94777135007


`

	
const jid = jidx || from
//await conn.sendMessage(jid,{image:{url: mov.mainDetails.imageUrl},caption: `${yt}\n\n` + config.FOOTER })   

const movImg = mov.mainImage.replace("fit=", "fit")
	
await conn.sendMessage(jid ,  { image : { url : movImg || mov.images[0] || mov.image || "" } , caption : yt + `${config.CAPTION}` })

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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "cimvdet2",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, backup, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/movies')) return await reply(msr.valid_url)

  
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/private/sit1/sc2?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	

var cast = ''
      for (let i of mov.cast ){ 
  cast += i.name + ','
	  }
const name = mov.title
const date = mov.date
const country = mov.country
const runtime = mov.duration
const cat = mov.category
const imdbrate = mov.imdbRate
const imdbvote = mov.imdbVoteCount
const director = mov.director
	
let yt = `
💦Ｔɪᴛʟᴇ'| _*${name}*_


🧿 ${oce}Release Date:${oce} ➜ ${date}

🌍 ${oce}Country:${oce} ➜ ${country}

⏱️ ${oce}Duration:${oce} ➜ ${runtime}

🎀 ${oce}Categories:${oce} ➜ ${cat}

⭐ ${oce}IMDB:${oce} ➜ ${imdbrate}

🤵‍♂️ ${oce}Director:${oce} ➜ ${director}

🕵️‍♂️ ${oce}Cast:${oce} ➜ ${cast}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

    🥷🏻 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢ https://wa.me/94740952096

  ✨ 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢ https://wa.me/94772098172
  ⚡ 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗠𝗼𝘃𝗶𝗲 ➢ https://wa.me/94777135007


`

	
const jid = jidx || from
//await conn.sendMessage(jid,{image:{url: mov.mainDetails.imageUrl},caption: `${yt}\n\n` + config.FOOTER })   

await conn.sendMessage(jid ,  { image : { url : mov.image } , text : yt + `${config.CAPTION}` })
	
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
reply(msr.err)
console.log(e)
}
})	



cmd({
    pattern: "citvdet",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, msr, backup, creator, isGroup, apilink, apikey, sender, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/tvshow')) return await reply(msr.valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/private/sit1/sc3?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *ᴛɪᴛʟᴇ :* ${mov.title}
✨ *ꜰɪʀꜱᴛ ᴀɪʀ ᴅᴀᴛᴇ :* ${mov.first_air_date}
🎐 *ʟᴀꜱᴛ ᴀɪʀ ᴅᴀᴛᴇ :* ${mov.last_air_date}
🎀 *ᴄᴀᴛᴇɢᴏʀɪᴇꜱ :* ${mov.category}
⭐ *ᴛᴍᴅʙ ʀᴀᴛɪɴ :* ${mov.tmdbRate}
🔮 *ᴛᴍᴅʙ ᴄᴏᴜɴᴛ :* ${mov.tmdbVoteCount}
🎡 *ᴇᴘɪꜱᴏᴅᴇ ᴄᴏᴜɴᴛ :* ${mov.episode_count}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

  💃 *ғᴏʟʟᴏᴡ ᴜs ➢* https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27


`
const jid = jidx || from
const movImg = mov.mainImage.replace("fit=", "fit")
	
await conn.sendMessage(jid ,  { image : { url : movImg || mov.image || '' } , caption : yt + `${config.CAPTION}`})

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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "ciepdet",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, prefix, isCmd, command, args, q, msr, creator, backup, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/episode')) return await reply(msr.valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/private/sit1/sc4?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *Episode Name:* ${mov.episode_name}

🖇️ *Tv Show Link:* ${inp}

🧿 *Release Date :* ${mov.date}
`
	
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.images[0] || "" } , caption : yt + `


${config.CAPTION}`})


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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "ciepdet2",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
	
if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")

	
if(!q) return await reply(msr.url)
    if (!q.includes('cinesubz.co/episode')) return await reply(msr.valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/private/sit1/sc4?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *Episode Name:* ${mov.episode_name}

🖇️ *Tv Show Link:* ${inp}

🧿 *Release Date :* ${mov.date}
`
	
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.image } , text : yt + `


${config.CAPTION}`})

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
reply(msr.err)
console.log(e)
}
})


cmd({
    pattern: "cinedirectdl",
    react: "⬆",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, backup, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, form, isOwner, groupMetadata, groupName, isBotAdmins, isAdmins, reply}) => {
try{
	
if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
		 
				const isProcess = await getMovie();
				if(isProcess.is_download){
				var pmt = isProcess.time
				var pt = ( new Date().getTime() - pmt ) / 36000	
				if (pt < 10) return reply(`_වෙනත් චිත්‍රපටයක් බාගත වෙමින් පවතින අතර එය බාගත වීමෙන් පසු නැවත උත්සහ කරන්න.❗_\n\n_බාගත වෙමින් පවතින චිත්‍රපටය ⬆️_\n\n*${isProcess.name}*`)
				}
	
	
if (!q) return reply("❗ *Please give me valid link*")	
	
                                var typ = ''
				var jidx = ''
				var inp = ''
				var nmf = ''
				var size = ''
			        var quality = ''
	                        var img_s = ''
				var text = q
				if (q.includes('🎈')) nmf = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]
                                                      quality =  text.split('🎈')[2]
							size =  text.split('🎈')[3]
							jidx =  text.split('🎈')[4]
							img_s =  text.split('🎈')[5]}


if (!inp) return await conn.sendMessage(from, { text: "*An error occurred 🧑‍🎨❌*"}, { quoted : mek })

const anu = await cine.download(inp)
const down = anu.result.gdrive || inp
	
var pf = ''			
if (os.hostname().length == 36) pf = 'heroku'
if(pf == 'heroku')  {			
				
if(size.includes('GB')) { return await reply(`*The file is too large to download ⛔*\n*Use this link to download the movie. ❗*\n\n` + down)	
	
} else if(size.includes('MB')) {
					
size = size.replace('MB' ,'')
if ( size > 300 || size == 300) return await reply(`*The file is too large to download ⛔*\n*Use this link to download the movie. ❗*\n\n` + down)	
						       }}
else{
	
if(size.includes('GB')) {
size = size.replace('GB' ,'')
if ( size > config.MAX_SIZE_GB || size == config.MAX_SIZE_GB) return await reply(`*The file is too large to download ⛔*\n*Use this link to download the movie. ❗*\n\n` +  down)	
						       }}
	
	if(anu.result.gdrive !== "null") {
	
await inputMovie(true, nmf , new Date().getTime());
			
const dlk = anu.result.gdrive
var dl_link = dlk
if(dlk.includes("https://drive.usercontent.google.com/")) dl_link = dlk.replace("https://drive.usercontent.google.com/", "https://drive.google.com/");
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
		
 let res = await fg.GDriveDl(dl_link)
 const jid = jidx ? jidx : from
 const f_name = nmf ? nmf : res.fileName
 var ext = ''

		if(res.mimetype == "video/mkv") { ext = "mkv"
						} else { ext = "mp4" }

const mvdoc = await conn.sendMessage( jid , { 
		document : { url : res.downloadUrl } , 
		fileName: `${config.FILE_NAME} ${f_name}.` + ext  , 
		mimetype: res.mimetype, 
		caption: f_name + `\n${pk} ${quality} ${pk2}


` + config.CAPTION
	})		
	
await conn.sendMessage(from, { delete: up_mg.key })

if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) }	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) }
	
	} else if (anu.result.direct !== "null") {
		
await inputMovie(true, nmf , new Date().getTime());
		
const mimeType = require('mime-types');	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})


const bufferdata = await getBuffer( anu.result.direct )	
	
	const { default: fileType } = await import('file-type');
	const type = await fileType.fromBuffer(bufferdata);
	const mime = type ? type.mime : 'video/mp4';
	let ext = mimeType.extension(mime);
        const jid = jidx || from
    
	const mvdoc = await conn.sendMessage( jid , { 
		document : bufferdata , 
		fileName: `${config.FILE_NAME} ${nmf}.` + ext  , 
		mimetype: mime, 
		caption: nmf + `\n${pk} ${quality} ${pk2}


` + config.CAPTION
	})

await conn.sendMessage(from, { delete: up_mg.key })

if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1)}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1)}

		
	} else if (anu.result.mega !== "null") {

	await inputMovie(true, nmf , new Date().getTime());
        const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
        const file = File.fromURL(anu.result.mega)
        await file.loadAttributes()
	const data = await file.downloadBuffer();
        const jid = jidx ? jidx : from
	
            await conn.sendMessage(jid, { 
		    document: data, 
		    mimetype: "video/mp4", 
		    fileName: `${config.FILE_NAME} ${nmf}.mp4`, 
		    caption: nmf + ` ${pk} ${quality} ${pk2}
      
` + config.CAPTION
	    }); 

await conn.sendMessage(from, { delete: up_mg.key })
	
if (jidx === from) { 	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
await sleep(500 * 1) }	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(500 * 1) }

	} else {

return reply(msr.not_fo)
		
	}

await inputMovie(false, nmf , new Date().getTime() );
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
await resetMovie();	
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(msr.err)
console.log(e)
}
})





cmd({
    pattern: "cineimages",
    react: "📽",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
 				
	
	
	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   


const input = inp ? inp : q
	

	if(input.includes("cinesubz.co/movies")) {
		
const anu = await fetchApi(`${apilink}/private/sit1/sc2?url=${input}&apikey=${apikey}`)			
if (anu.result.data.images.length < 1) return await reply(msr.not_fo)		
const jid = jidx ? jidx : from

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}
	
} else if ( input.includes("cinesubz.co/episode")) {

const anu = await fetchApi(`${apilink}/private/sit1/sc4?url=${input}&apikey=${apikey}`)	
if (anu.result.data.images.length < 1) return await reply(msr.not_fo)	
const jid = jidx ? jidx : from
		

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}		
} else if ( input.includes("cinesubz.co/t")) {

const anu = await fetchApi(`https://api-cine-anonymous.vercel.app/api/cinesubz/tvshow?url=${inp}&apikey=yasiyalk`)	
if (anu.data.data.imageUrls.length < 1) return await reply(msr.not_fo)	
const jid = jidx ? jidx : from
		

for (let all of anu.data.data.imageUrls ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
if (jidx === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}		
}
	
} catch (e) {	
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
