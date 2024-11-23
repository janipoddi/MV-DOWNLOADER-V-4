const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const fileType = require("file-type")

const imgbbUrl = 'https://imgbb.com/';
const uploadUrl = 'https://imgbb.com/json';
const maxFileSize = 32 * 1024 * 1024;

async function fetchAuthToken() {
    try {
        const response = await axios.get(imgbbUrl);
        const html = response.data;

        const tokenMatch = html.match(/PF\.obj\.config\.auth_token="([a-f0-9]{40})"/);
        if (tokenMatch && tokenMatch[1]) {

            return tokenMatch[1];
        }

        throw new Error('Auth token not found');
    } catch (error) {
        console.error('Error fetching auth token:', error.message);
        throw error;
    }
}

async function uploadFile(filePath) {
    try {

        const fileStats = fs.statSync(filePath);
        if (fileStats.size > maxFileSize) {
            return { error: 'File size exceeds 32MB limit' };
        }

        const authToken = await fetchAuthToken();
        const formData = new FormData();
        formData.append('source', fs.createReadStream(filePath));
        formData.append('type', 'file');
        formData.append('action', 'upload');
        formData.append('timestamp', Date.now());
        formData.append('auth_token', authToken);

        const uploadResponse = await axios.post(uploadUrl, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        if (uploadResponse.data) {
            return uploadResponse.data;
        } else {
            return { error: 'Upload failed, no response data' };
        }
    } catch (error) {
        console.error('Error uploading file:', error.message);
        return { error: error.message };
    }
}





cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl","imgurl","telegraph","imgtourl"],
    desc: 'Converest ',
    category: "other",
    use: '.img2url <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
      
const e = m.quoted ? m.quoted : m
        
let media = await conn.downloadAndSaveMediaMessage(e)  
const result = uploadFile(media);
        
reply(result.image.url)        
} catch (e) {
reply(e);
console.log(e);        
}
})
