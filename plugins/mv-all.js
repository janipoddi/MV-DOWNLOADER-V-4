const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const oce = "`"

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


cmd({
    pattern: "mv",
    alias: ["mvall","search"],
    react: "🎥",
    desc: "Download movie for cinesubz.co, sinhalasub.lk",
    category: "movie",
    use: '.mv < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, apilink, apikey, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

	
if( config.CINE_BLOCK == "true" && sender !== "94743548986@s.whatsapp.net" ) return await reply("```This command only working for Dark Yasiya official ⛔```")
	
if (!q) return await reply(msr.giveme)
	
const movs = await fetchApi(`${apilink}/private/sit1/sc1?text=${q}&apikey=${apikey}`)
var ty2 = ''
let cine = movs.result.data
	
const movs2 = await fetchApi(`${apilink}/movie/sinhalasub/search?text=${q}&apikey=${apikey}`)
var ty = ''
let sinh = movs2.result.data
	
	
let numrep = []
var s_t_1 = ''
var s_t_2 = ''		
const startIndex = cine.length + 1; 	             
		
		

    
 		  cine.forEach((movie, index) => {
				
		  if(movie.type == 'TV' ) ty2 = 'citvjid '
                  if(movie.type == 'Movie' ) ty2 = 'cimvjid ' 
				
                  s_t_1 += ` *${formatNumber( index + 1 )} ||* ${movie.title.replace(/Sinhala Subtitles \| සිංහල උපසිරැසි සමඟ/g , '').replace('Sinhala Subtitle | සිංහල උපසිරැසි සමඟ' , '')} | ${movie.type}\n`
				
                  numrep.push(`${prefix}${ty2} ${movie.link}` )
                  })
		
		
		 sinh.forEach((movie, index) => {
				
		  if(movie.type == 'TV' ) ty = 'sitvjid '
                  if(movie.type == 'Movie' ) ty = 'simvjid ' 
				
                  s_t_2 += ` *${formatNumber( startIndex + index )} ||* ${movie.title.replace(/Sinhala Subtitles \| සිංහල උපසිරසි සමඟ/g , '').replace('Sinhala Subtitle | සිංහල උපසිරසි සමඟ' , '')} | ${movie.type}\n`
				
                  numrep.push(`${prefix}${ty} ${movie.link}` )
                  })	
		

		
if(!s_t_1 && !s_t_2) { return await reply(msr.not_fo) }
		

		
              let cot = `🔮 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖬𝖮𝖵𝖨𝖤 𝖲𝖤𝖠𝖱𝖢𝖧 𝖲𝖸𝖲𝖳𝖤𝖬* 🔮
              

📲 ${oce}Input:${oce} *${q}*


${s_t_1 ? '*Cinesubz.co*\n' + s_t_1 + ( s_t_2 ?  '\n*Sinhalasub.lk*\n' +  s_t_2  : '') : ( s_t_2 ?  '*Sinhalasub.lk*\n' +  s_t_2  : '')}
`
	



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

