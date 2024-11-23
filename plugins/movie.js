const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const oce = "`"


cmd({
    pattern: "movie",
    alias: ["mvs","movieall"],
    react: "🎬",
    desc: "Download movie for any website",
    category: "movie",
    use: '.movie < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    
if (!q) return await reply(msr.giveme)
        
let yt = `*❰ ᴍᴏᴠɪᴇ-✗ ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴀᴅ sʏsᴛᴇᴍ ❱*

📲 ${oce}Input:${oce} *${q}*


_*Select the website you want to search for the movie or tv series,*_
`

  
            const rows = []
                rows.push({
                    title: `CINESUBZ.CO`,
                    description: '',
                    id: prefix + `cinesubz ${q}`
                },{
                    title: `SINHALASUB.LK`,
                    description: '',
                    id: prefix + `sinhalasub ${q}`
                },{
                    title: `FIRE MOVIE`,
                    description: '',
                    id: prefix + `fire ${q}`
                },{
                    title: `YTS.MX`,
                    description: '',
                    id: prefix + `ytsmx ${q}`
                })

	
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
                        title: 'SELECT WEBSITE 🎀',
                        sections: [{
                            title: 'Select to you want',
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
await conn.sendButtonMessage(from, buttons, m, message)  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "movieinfo",  
    alias: ["mvd","mvdet"],
    desc: "Fetch detailed information about a movie.",
    category: "movie",
    react: "🎬",
    use: '.movieinfo < Movie Name >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {


if(!q) return await reply(msr.giveme)
        
        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(q)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply(msr.not_fo);
        }

        const movieInfo = `
🍟 _*Title:* ${data.Title}_

🧿 *Year:* ${data.Year}
📆 *Released:* ${data.Released}
⏳ *Duration:* ${data.Runtime}
🎭 *Genre:* ${data.Genre}
🎬 *Director:* ${data.Director}
✍️ *Writer:* ${data.Writer}
🎭 *Actors:* ${data.Actors}
📝 *Plot:* ${data.Plot}
🌍 *Language:* ${data.Language}
🇺🇸 *Country:* ${data.Country}
⭐ *IMDB Rating:* ${data.imdbRating}
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.LOGO;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}
            
            ${config.CAPTION}`
          
        });
    } catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

