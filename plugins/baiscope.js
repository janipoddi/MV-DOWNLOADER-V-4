const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const oce = "`"
const oce3 = "```"
var upname = "🔠 ᴅᴀʀᴋʏᴀꜱɪʏᴀxᴛᴇᴀᴍ 🔠 "

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 

cmd({
    pattern: "baiscope",
    alias: ["sub","sisub","sb"],
    react: "🔠",
    desc: "Download for sinahala sub",
    category: "movie",
    use: '.subdl < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink, apikey, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!q) return await reply(msr.giveme)
  
const mov = await fetchJson(`${apilink}/search/baiscope?text=${q}&apikey=${apikey}`)
var ty = ''

if (mov.result.data < 1) return await reply(msr.not_fo)

	if (config.MESSAGE_TYPE == 'BUTTON') {    
  
let yt = `*❰ ᴍᴏᴠɪᴇ-✗ ꜱᴜʙ ᴅʟ sʏsᴛᴇᴍ ❱*

📲 ${oce}Input:${oce} *${q}*

`
  
 var sections = []    
     for (let i of mov.result.data ){    
          sections.push({
            rows: [{
              title: `${i.title}`,
              description: ``,
              id: prefix + "subjid " + i.url
            }]
          })}
        const buttons = [{
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'SELECT SUB 🔠',
            sections
          })
        }]
        let message = {
            image: "https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/IMAGES/baiscope.lk.jpg",
            header: '',
            footer: config.FOOTER,
            body: yt
        }   
return conn.sendButtonMessage(from, buttons, m, message) 
} else if (config.MESSAGE_TYPE == 'NON-BUTTON') {

let cot = `🔠 *𝖬𝖮𝖵𝖨𝖤-𝖷 𝖲𝖴𝖡𝖳𝖨𝖳𝖫𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🔠


📲 ${oce}Input:${oce} *${q}*

`
  
  let numrep = []              

   mov.result.data.forEach(( i, index ) => { 
                  cot += `*${formatNumber( index + 1)} ||* ${i.title}\n\n`
				
                  numrep.push(`${prefix}subjid ${i.url}` )
                  })
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`,
					    
					    contextInfo: {
                                        externalAdReply: { 
					title: '🍭 BAISCOPE SEARCH SYSTEM 🍭    ',
					body: config.BODY,
					mediaType: 1,
					sourceUrl: q,
                                        thumbnailUrl: config.LOGO ,
	 				renderLargerThumbnail: false
         }} }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 	 
 } else {
	 
return await conn.sendMessage(from, { text: msr.mg_type_inv }, { quoted: mek })
 
}		
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "subjid",
    react: "✈",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, apilink, apikey, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const mov = await fetchJson(`${apilink}/download/baiscope?url=${q}&apikey=${apikey}`)
	
if (config.MESSAGE_TYPE == 'BUTTON') { 
	
let yt = `*❰ ᴍᴏᴠɪᴇ-✗ ꜱᴜʙ ᴅʟ sʏsᴛᴇᴍ ❱*


   📽️ ${oce3}Title:${oce3} ${mov.result.title}
 
`
            const rows = []
                rows.push({
                    title: `SEND SUB INBOX`,
                    description: `` ,
                    id: prefix + `dlsub ${q}🎈${from}`
                })

	            const rows2 = [] 
	for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                rows.push({
                    title: `SEND SUB JID`,
                    description: `${i}` ,
                    id: prefix + `dlsub ${q}🎈${i}`
                })}}

	
        let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: config.BTN,
                        url: config.BTNURL,
                        merchant_url: config.BTNURL
                    }),
                },
                {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                        title: 'SEND SUBS JID',
                        sections: [{
                            title: 'SELECT JID',
                            highlight_label: 'MOVIE-DL-BOT',
                            rows: rows

                        }]
                    }),
                }]


	
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: yt
        }   
return conn.sendButtonMessage(from, buttons, m, message) 
} else if (config.MESSAGE_TYPE == 'NON-BUTTON') {

              let cot = `🔠 *𝖬𝖮𝖵𝖨𝖤-𝖷 𝖲𝖴𝖡𝖳𝖨𝖳𝖫𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🔠


   📽️ ${oce3}Title:${oce3} ${mov.result.title}

*${formatNumber(1)} ||* SEND INBOX       
`	

	
 let numrep = []
numrep.push(`${prefix}dlsub ${q}🎈${from}`)  	
	
for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}dlsub ${q}🎈${i}` )
                
     }}



const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`,
					    contextInfo: {
                                        externalAdReply: { 
					title: mov.result.title,
					body: config.BODY,
					mediaType: 1,
					sourceUrl: '',
                                        thumbnailUrl: mov.result.image || config.LOGO ,
	 				renderLargerThumbnail: false
         }} }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 

	} else {
 await conn.sendMessage(from, { text: msr.mg_type_inv }, { quoted: mek })
	}
	

}catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "dlsub",
    react: "⬆",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, apilink, apikey, botNumber2, botNumber, pushname, isMe, form, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
if (!q) return reply("❗ *Please give baiscope url*")
    
  
        var typ = ''
				var jidx = ''
				var inp = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}
	
if (!inp.includes('www.baiscope.lk')) return await reply(msr.valid_url) 
  
const mov = await fetchJson(`${apilink}/download/baiscope?url=${inp}&apikey=${apikey}`)
  

		
const jid = jidx || from
const img =  mov.result.image || ''
	
await conn.sendMessage(from, { image: { url: img }, caption: 
`➠ ${oce}Title:${oce} ${mov.result.title}

➠ ${oce}Download Link:${oce} ${mov.result.dl_link}


${config.CAPTION}`}, {quoted: mek});
	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Subtitle File...⬆' }, { quoted: mek }) 			
  
  
	await conn.sendMessage( jid , { 
		document : await getBuffer(mov.result.dl_link) , 
		fileName: `${config.FILE_NAME} ${mov.result.title}.zip`, 
		mimetype: "application/zip", 
		caption:  `${mov.result.title}

` + config.CAPTION
	})

await conn.sendMessage(from, { delete: up_mg.key })
	
if (jidx === from) { 	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1) 
}

}catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})
