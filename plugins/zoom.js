const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const oce = "`"
const oce3 = "*"

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 

cmd({
    pattern: "zoom",
    alias: ["sub2","subdl2"],
    react: "🔠",
    desc: "Download sub fro zoom.lk",
    category: "movie",
    use: '.zoom < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, quoted, body, isCmd, command, args, q, isGroup, sender, apilink, apikey, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!q) return await reply(msr.giveme)
  
const movs = await fetchJson(`${apilink}/search/zoom?text=${q}&apikey=${apikey}`)
var ty = ''
let mov = movs.result.data

if (mov.length < 1) return await reply(msr.not_fo)


let cot = `🔠 *𝖲𝖴𝖡𝖳𝖨𝖳𝖫𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🔠


📲 ${oce}Input:${oce} *${q}*

`
  
  let numrep = []              

                  mov.forEach(( i, index ) => { 
                  cot += `*${formatNumber( index + 1)} ||* ${i.title.replace(" Sinhala Subtitle (සිංහල උපසිරැසි)", "")}\n`			
                  numrep.push( `${prefix}zoomjidz ${i.url}🎈${i.image}🎈${i.subtitle_author}🎈${i.title}` )
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

cmd({
    pattern: "zoomjidz",
    react: "✈",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, apilink, apikey, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	
        var url = ''
				var img = ''
				var inp = ''
	      var nmf = ''
				var text = q
				if (q.includes('🎈')) img = text.split('🎈')[1]
				if (text.includes('🎈')) { url = text.split('🎈')[0]
							   nmf = text.split('🎈')[3]}





              let cot = `🔠 *𝖲𝖴𝖡𝖳𝖨𝖳𝖫𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🔠


   📽️ ${oce3}Title:${oce3} ${nmf}

*${formatNumber(1)} ||* SEND INBOX       
`	

	
 let numrep = []
numrep.push(`${prefix}dlsub2 ${q}🎈${from}`)  	
	
for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}dlsub2 ${q}🎈${i}` )
                
     }}



const mass = await conn.sendMessage(from, { image: { url: config.LOGO },caption: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
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
    pattern: "dlsub2",
    react: "⬆",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, msr, command, args, q, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, form, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
if (!q) return reply("❗ *Please give zoom url*")
    
  
                                var author = ''
	                        var img = ''
				var jidx = ''
				var inp = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[4]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]
							author = text.split('🎈')[2]
							img = text.split('🎈')[1]
							}
	
if (!inp.includes('zoom.lk')) return await reply(msr.valid_url) 
  
const mov = await fetchApi(`${apilink}/download/zoom?url=${inp}&apikey=${apikey}`)
  

		
const jid = jidx || from
const img_mg =  img || false
	
await conn.sendMessage(from, { image: { url: img_mg }, caption: 
`➠ ${oce}Title:${oce} ${mov.result.data.title}

➠ ${oce}Creator:${oce} ${author} 

➠ ${oce}Download Link:${oce} ${mov.result.data.dl_link}


${config.CAPTION}`}, {quoted: mek});
	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Subtitle File...⬆' }, { quoted: mek }) 			
  
  
	await conn.sendMessage(jid , { 
		document : await getBuffer(mov.result.data.dl_link) , 
		fileName: `${mov.result.data.title}.zip`, 
		mimetype: "application/zip", 
		caption:  `${mov.result.data.title}

` + config.CAPTION
	})

await conn.sendMessage(from, { text : 'Subtitle File Send ✔', edit : up_mg.key}, { quoted: mek }) 	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
reply(msr.err)
console.log(e)
}
})
