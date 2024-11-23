const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const { inputMovie, getMovie, resetMovie } = require("../lib/movie_db")
const fg = require('api-dylux');
const fetch = require('node-fetch');
var os = require('os')

const oce = "`"
const oce3 = "```"
const oce2 = '*'
const pk = "["
const pk2 = "]"
const { File } = require('megajs');

const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(1, '0');
} 



cmd({
    pattern: "citvnew",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, apilink, apikey, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

var numrep = []

	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}  
    
const response = await fetchApi(`https://api-cine-anonymous.vercel.app/api/cinesubz/tvshow?url=${inp}&apikey=yasiyalk`)
const result = response.data.data;              
const mainDetails = result.mainDetails;
const episodesDetails = result.episodesDetails;
const title = mainDetails?.maintitle	
episodes = response.data.data.episodesDetails

let epi_num = '';

// Iterate over each season
episodes.forEach((season, index) => {
  const seasonNumber = index + 1;
  epi_num += `_*Season ${seasonNumber}*_\n`;
  
	
  // Iterate over each episode within the season
  season.episodes.forEach((episode) => {

   var episodeNumber = episode.number.replace(' - ', '.');
   var ep_2 = episodeNumber.includes('.') ? episodeNumber.split('.') : ''
 if((ep_2[1] + '').length == 1 ) ep_3 = ep_2[1]
episodeNumber = `${seasonNumber + 1 }` + '.' + ep_2[1]    

    epi_num += `*${episodeNumber} ||* Season ${seasonNumber} - Episode ${ep_2[1]}\n`; 
	numrep.push( `${ seasonNumber + 1 }` + '.' + `${ep_3 + 1} ${prefix}ciepgo ${episode.url}🎈${jidx}` )
  });

  epi_num += '\n'; // Add a line break between seasons
});     
	
var cast = ''
for (let i = 0; i < result.moviedata.castDetails.cast.length; i++) {
  cast += result.moviedata.castDetails.cast[i].actor.name + ','
}
    
const output = `📺 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


*│ 🎞️ ᴛɪᴛʟᴇ :* ${title}
*│ 🔮 ᴄᴀᴛᴀɢᴏʀɪᴇs :* ${result.mainDetails.genres} 
*│ 🕵️‍♂️ ᴄʜᴀʀᴀᴄᴛᴇʀs :* ${cast}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

1.1 || Details Card
1.2 || Images


${epi_num}

${config.FOOTER}
`
numrep.push(`1.1 ${prefix}citvdet ${q}`)
numrep.push(`1.2 ${prefix}cineimages ${q}`)
	
            const mass = await conn.sendMessage(from, { image: { url : config.LOGO }, caption: output }, { quoted: mek });
            const jsonmsg = {
             key : mass.key,
             numrep,
             method : 'decimal'
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
    pattern: "sitvnew",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, msr, creator, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, apilink, apikey, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

var numrep = []

	                        var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}  
    
const response = await fetchApi(`https://api-cine-anonymous.vercel.app/api/sinhalasubs/tvshow?url=${inp}&apikey=yasiyalk`)
const result = response.data.data;              
const mainDetails = result.mainDetails;
const episodesDetails = result.episodesDetails;
const title = mainDetails?.maintitle	
episodes = response.data.data.episodesDetails

let epi_num = '';

// Iterate over each season
episodes.forEach((season, index) => {
  const seasonNumber = index + 1;
  epi_num += `_*Season ${seasonNumber}*_\n`;
  
	
  // Iterate over each episode within the season
  season.episodes.forEach((episode) => {

   var episodeNumber = episode.number.replace(' - ', '.');
   var ep_2 = episodeNumber.includes('.') ? episodeNumber.split('.') : ''
 if((ep_2[1] + '').length == 1 ) ep_3 = ep_2[1]
episodeNumber = `${seasonNumber + 1 }` + '.' + ep_2[1]    

    epi_num += `*${episodeNumber} ||* Season ${seasonNumber} - Episode ${ep_2[1]}\n`; 
	numrep.push( `${ seasonNumber + 1 }` + '.' + `${ep_3 + 1} ${prefix}siepgo ${episode.url}🎈${jidx}` )
  });

  epi_num += '\n'; // Add a line break between seasons
});     
	
var cast = ''
for (let i = 0; i < result.moviedata.castDetails.cast.length; i++) {
  cast += result.moviedata.castDetails.cast[i].actor.name + ','
}
    
const output = `📺 *𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


*│ 🎞️ ᴛɪᴛʟᴇ :* ${title}
*│ 🔮 ᴄᴀᴛᴀɢᴏʀɪᴇs :* ${result.mainDetails.genres} 
*│ 🕵️‍♂️ ᴄʜᴀʀᴀᴄᴛᴇʀs :* ${cast}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

1.1 || Details Card
1.2 || Images


${epi_num}

${config.FOOTER}
`
numrep.push(`1.1 ${prefix}sitvdet ${q}`)
numrep.push(`1.2 ${prefix}sineimages ${q}`)
	
            const mass = await conn.sendMessage(from, { image: { url : config.LOGO }, caption: output }, { quoted: mek });
            const jsonmsg = {
             key : mass.key,
             numrep,
             method : 'decimal'
            }

	
await storenumrepdata(jsonmsg)
 } catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
