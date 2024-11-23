const axios = require('axios');
const { File } = require('megajs');
const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs-extra');
const fg = require('api-dylux');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const oce = "`"  



cmd({
    pattern: "downurl",
    alias: ["upload","file"],
    react: '🚀 ',
    desc: 'Download Directer Link Server 01',
    category: "download",
    use: '.downurl < Direct download link >',
    filename: __filename
},
    
async(conn, mek, m,{from, l, quoted, body, isCmd, isCreator, isMod, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{


if(!q) return reply(msr.giveme)
var link = 'a'
var name = ''
var cap = ''
var jid = from
link = q.includes('\n') ? q.split('\n')[0] : q
var islink =  await isUrl(link) || false
if (!islink) return reply(msr.valid_url)
var res = await axios.get('https://moviedl-api.vercel.app/api/file-info?url=' + link )
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
name = q.includes('name: ') ? ( q.split('name: ')[1].includes('\n') ? q.split('name: ')[1].split("\n")[0] : q.split('name: ')[1]  ) : 'file-name'
cap =  q.includes('cap: ') ? ( q.split('cap: ')[1].includes('\n') ? q.split('cap: ')[1].split("\n")[0] : q.split('cap: ')[1]  ) : q
jid =    q.includes('jid: ') ? ( q.split('jid: ')[1].includes('\n') ? q.split('jid: ')[1].split("\n")[0] : q.split('jid: ')[1]  ) : from
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }});
  await conn.sendMessage(jid , { document : { url : link } , fileName: name , mimetype: res.data.type , caption:  cap + `\n${config.CAPTION}` } )

	
if (jid === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
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
    pattern: "gd",
    alias: ["googledrive","gd","frozen_gd"],
    react: '📑',
    desc: "Download googledrive files.",
    category: "download",
    use: '.gdrive < googledrive link >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
  if (!q) return await reply(msr.url) 

    
	                        var inp = ''
                                var name = ''
				var jidx = ''	                
				var text = q
				if (q.includes(' + ')) jidx = text.split(' + ')[2]
				if (text.includes(' + ')) { inp = text.split(' + ')[0]
                                                            name = text.split(' + ')[1]}   
    


 const dl_link = inp ? inp : q 
 let res = await fg.GDriveDl(dl_link)
 const jid = jidx ? jidx : from
 const f_name = name ? name : res.fileName

		
conn.sendMessage(from, { document: { url: res.downloadUrl }, fileName: f_name, mimetype: res.mimetype, caption: f_name + '\n\n' + config.CAPTION }, { quoted: mek })

if (jid === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
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
    pattern: "downurl2",
    alias: ["upload2","file2"],
    react: '🚀 ',
    desc: 'Download Directer Link Server 02',
    category: "download",
    use: '.downurl2 < Direct download link >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
  if (!q) return await reply(msr.url) 

    
	                        var inp = ''
                                var name = ''
				var jidx = ''	                
				var text = q
				if (q.includes(' + ')) jidx = text.split(' + ')[2]
				if (text.includes(' + ')) { inp = text.split(' + ')[0]
                                                            name = text.split(' + ')[1]}   
    


 const dl_link = inp ? inp : q 
 const jid = jidx ? jidx : from
 const f_name = name ? name : q

	
const mimeType = require('mime-types');	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
	
const bufferdata = await getBuffer(dl_link)	
	
	const { default: fileType } = await import('file-type');
	const type = await fileType.fromBuffer(bufferdata);
	const mime = type ? type.mime : 'video/mp4';
	let ext = mimeType.extension(mime);
    
	await conn.sendMessage( jid , { 
		document : bufferdata , 
		fileName: config.FILE_NAME + ` ${f_name}.` + ext  , 
		mimetype: mime, 
		caption: f_name + `


` + config.CAPTION
	})


await conn.sendMessage(from, { delete: up_mg.key })

if (jid === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
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
    pattern: "downurl3",
    alias: ["upload3","file3"],
    react: '🚀 ',
    desc: 'Download Directer Link Server 03',
    category: "download",
    use: '.downurl3 < Direct download link >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!q) return await reply(msr.url) 

    
	                        var inp = ''
                                var name = ''
				var jidx = ''	                
				var text = q
				if (q.includes(' + ')) jidx = text.split(' + ')[2]
				if (text.includes(' + ')) { inp = text.split(' + ')[0]
                                                            name = text.split(' + ')[1]}   
    


 const dl_link = inp ? inp : q 
 const jid = jidx ? jidx : from
 const f_name = name ? name : q

const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
	
    
	await conn.sendMessage( jid , { 
		document : await getBuffer(dl_link), 
		fileName: config.FILE_NAME + ` ${f_name}.mp4`, 
		mimetype: "video/mp4", 
		caption: f_name + `


` + config.CAPTION
	})


await conn.sendMessage(from, { delete: up_mg.key })

if (jid === from) { 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
//await sleep(1000 * 1) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
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
    pattern: "mega",
    react: "🍟",
    alias: ["megadl","meganz"],
    desc: "Download mega.nz files",
    category: "download",
    use: '.mega < mega.nz url >',
    filename: __filename
}, 
    async (conn, mek, m, { from, q, reply }) => {
        const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
    if (!q) return await reply(msr.url)
        if(!q.includes('mega.nz')) { return await reply(msr.valid_url)} 
    try {
        const file = File.fromURL(q)
        await file.loadAttributes()
     //   if (file.size >= config.MAX_SIZE * 1024 * 1024) return reply(`File size exeeded...\nMaximum Upload Size Is ${config.MAX_SIZ} MB`)
        const data = await file.downloadBuffer();

        if (/mp4/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "video/mp4", fileName: `${file.name}`, caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else if (/pdf/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/pdf", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else if (/zip/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/zip", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else if (/rar/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/x-rar-compressed", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else if (/7z/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/x-7z-compressed", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else if (/jpg|jpeg/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "image/jpeg", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else if (/png/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "image/png", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { document: data, mimetype: "application/octet-stream", fileName: `${file.name}` , caption: `${file.name}\n\n${config.CAPTION}` }, { quoted: mek })
        }

await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
//await sleep(1000 * 1)
	
    } catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
