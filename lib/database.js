const fetch = require('node-fetch');
const axios = require('axios');
const config = require('../config')

// Replace these with your GitHub credentials
const userName = config.GITHUB_USERNAME;
const token = config.GITHUB_AUTH_TOKEN;
const repoName = 'MOVIE-BOT-DATABASE';
const settings = config.BOT_NUMBER;
const data_info = "movie-x.json";
const button_id = "non-buttonId.json";
const mvdb_data = "mv_db.json";

 
// Function to fetch data from GitHub API
async function githubApiRequest(url, method = 'GET', data = {}) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${userName}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET' || method === 'HEAD') {
      // Remove the body property for GET and HEAD requests
      delete options.body;
    } else {
      // For other methods (POST, PUT, DELETE, etc.), add the JSON.stringify data to the request body
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API request failed: ${error.message}`);
  }
}


async function checkRepoAvailability() {
  try {
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`;
const headers = {
  Authorization: `Bearer ${token}`,
};

    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      return true
    } else {
     return false
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false
    } else {
      console.error('Error:', error.message);
    }
  }
}


// 1. Function to search GitHub file
async function githubSearchFile(filePath, fileName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const data = await githubApiRequest(url);
  return data.find((file) => file.name === fileName);
}

// 2. Function to create a new GitHub file
async function githubCreateNewFile(filePath, fileName, content) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new file: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
  };
  return await githubApiRequest(url, 'PUT', data);
}

// 3. Function to delete a GitHub file
async function githubDeleteFile(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Delete file: ${fileName}`,
    sha: file.sha,
  };
  await githubApiRequest(url, 'DELETE', data);
}

// 4. Function to get GitHub file content
async function githubGetFileContent(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = file.download_url;
  const response = await fetch(url);
  return await response.text();
}

// 5. Function to clear GitHub file content and add new content
async function githubClearAndWriteFile(filePath, fileName, content) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) {
    await githubCreateNewFile(fileName, content);
  } else {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
    const data = {
      message: `Modify file: ${fileName}`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    };
    return await githubApiRequest(url, 'PUT', data);
  }
}

// 6. Function to delete an existing GitHub file and upload a new one
async function githubDeleteAndUploadFile(fileName, newContent) {
  await githubDeleteFile(fileName);
  await githubCreateNewFile(fileName, newContent);
}

//========================================
async function updateCMDStore(MsgID , CmdID) {
try { 
let olds = JSON.parse(await githubGetFileContent(settings, button_id))
olds.push({[MsgID]:CmdID})
var add = await githubClearAndWriteFile(settings, button_id,JSON.stringify(olds, null, 2))
return true
} catch (e) {
console.log( e)
return false
}
}

async function isbtnID(MsgID){
try{
let olds = JSON.parse(await githubGetFileContent(settings, button_id))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
if(foundData) return true
else return false
} catch(e){
return false
}
}

async function getCMDStore(MsgID) {
try { 
let olds = JSON.parse(await githubGetFileContent(settings, button_id))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
return foundData
} catch (e) {
console.log( e)
return false
}
} 

function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

const connectdb = async () => {
  
let availabilityrepo = await checkRepoAvailability()
//const file = await githubGetFileContent(settings, data_info);

  
if(!availabilityrepo){
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repoName,
        private: true, // Set to true for a private repo
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
let inputConfig = {
PREFIX: ".",
ANTI_BAD: "false",
ANTI_LINK: "false",
ANTI_BOT: "false",
AUTO_MSG_READ: "true",
AUTO_READ_STATUS: "true",
ALWAYS_ONLINE: "true",
AI_MODE: "true",
WORK_TYPE: "private",
ALIVE_MESSAGE: "Hellow i am alive now  ! 👋🏻",
LOGO: "https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/IMAGES/images.jpeg",
FILE_NAME: "🎬 𝗗𝗔𝗥𝗞𝗦𝗛𝗔𝗗𝗢𝗪𝗫𝗧𝗘𝗔𝗠 🎬",
FOOTER: "> 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪",
CAPTION: "> ᴜᴘʟᴏᴀᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ",
BODY: "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ᴅᴀʀᴋꜱʜᴀᴅᴏᴡxᴛᴇᴀᴍ",
MAX_SIZE: 100,
MAX_SIZE_GB: 1.5,
SUDO_NUMBER: "94743548986",
OWNER_REACT_EMOJI: `👾`,
OWNER_REACT: "true",
CINE_BLOCK: "false",
OWNER_NUMBER: "94743548986",
MESSAGE_TYPE: "BUTTON",
SUDO: [],
SUDO_GROUP: [],
JIDS: []
}
let inputButton = []  
let inputMvdb = {
CINESUBZ_MV_CARD: ``,
CINESUBZ_TV_CARD: ``,
CINESUBZ_EP_CARD: ``,
SINHALASUB_MV_CARD: ``,
SINHALASUB_TV_CARD: ``,
SINHALASUB_EP_CARD: ``,
MOVIE_INFO_CARD: ``
}
  
await githubCreateNewFile(settings, data_info,JSON.stringify(inputConfig))
await githubCreateNewFile(settings, button_id,JSON.stringify(inputButton))
await githubCreateNewFile(settings, mvdb_data,JSON.stringify(inputMvdb))
 
console.log(`Database "${userName}/${repoName}" Created Successfully ✔`);
  
} else if (availabilityrepo) {
  
let inputConfig = {
PREFIX: ".",
ANTI_BAD: "false",
ANTI_LINK: "false",
ANTI_BOT: "false",
AUTO_MSG_READ: "true",
AUTO_READ_STATUS: "true",
ALWAYS_ONLINE: "true",
AI_MODE: "true",
WORK_TYPE: "private",
ALIVE_MESSAGE: "Hellow i am alive now  ! 👋🏻",
LOGO: "https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/IMAGES/images.jpeg",
FILE_NAME: "🎬 𝗗𝗔𝗥𝗞𝗦𝗛𝗔𝗗𝗢𝗪𝗫𝗧𝗘𝗔𝗠 🎬 ",
FOOTER: "> 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪",
CAPTION: "> ᴜᴘʟᴏᴀᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ",
BODY: "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ᴅᴀʀᴋꜱʜᴀᴅᴏᴡxᴛᴇᴀᴍ",
MAX_SIZE: 100,
MAX_SIZE_GB: 1.5,
SUDO_NUMBER: "94743548986",
OWNER_REACT_EMOJI: `👾`,
OWNER_REACT: "true",
CINE_BLOCK: "false",
OWNER_NUMBER: "94740952096",
MESSAGE_TYPE: "BUTTON",
SUDO: [],
SUDO_GROUP: [],
JIDS: []
}
let inputButton = []  
let inputMvdb = {
CINESUBZ_MV_CARD: ``,
CINESUBZ_TV_CARD: ``,
CINESUBZ_EP_CARD: ``,
SINHALASUB_MV_CARD: ``,
SINHALASUB_TV_CARD: ``,
SINHALASUB_EP_CARD: ``,
MOVIE_INFO_CARD: ``
}

 
await githubCreateNewFile(settings, data_info,JSON.stringify(inputConfig))
await githubCreateNewFile(settings, button_id,JSON.stringify(inputButton))  
await githubCreateNewFile(settings, button_id,JSON.stringify(inputMvdb))
console.log(`${settings}/${data_info} Creat and Database Connected Successfully ✔`)
  
} else {  
 console.log("Database Connected 🗃️")   
};
}  
//=====================================================================
async function input(setting, data){
let get = JSON.parse(await githubGetFileContent(settings, data_info))
 
if (setting == "PREFIX") {
get.PREFIX = data
config.PREFIX = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "ANTI_BAD") {
get.ANTI_BAD = data
config.ANTI_BAD = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "ANTI_LINK") {
get.ANTI_LINK = data
config.ANTI_LINK = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "ANTI_BOT") {
get.ANTI_BOT = data
config.ANTI_BOT = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "AUTO_MSG_READ") {
get.AUTO_MSG_READ = data
config.AUTO_MSG_READ = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "AI_MODE") {
get.AI_MODE = data
config.AI_MODE = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
}else if (setting == "WORK_TYPE") {
get.WORK_TYPE = data
config.WORK_TYPE = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "MAX_SIZE") {
get.MAX_SIZE = data
config.MAX_SIZE = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "SUDO_NUMBER") {
get.SUDO_NUMBER = data
config.SUDO_NUMBER = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "OWNER_REACT_EMOJI") {
get.OWNER_REACT_EMOJI = data
config.OWNER_REACT_EMOJI = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "OWNER_REACT") {
get.OWNER_REACT = data
config.OWNER_REACT = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "OWNER_NUMBER") {
get.OWNER_NUMBER = data
config.OWNER_NUMBER = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "AUTO_READ_STATUS") {
get.AUTO_READ_STATUS = data
config.AUTO_READ_STATUS = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "MAX_SIZE_GB") {
get.MAX_SIZE_GB = data
config.MAX_SIZE_GB = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "JIDS") {
get.JIDS = data
config.JIDS = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "ALWAYS_ONLINE") {
get.ALWAYS_ONLINE = data
config.ALWAYS_ONLINE = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "SUDO") {
get.SUDO = data
config.SUDO = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "ALIVE_MESSAGE") {
get.ALIVE_MESSAGE = data
config.ALIVE_MESSAGE = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "MESSAGE_TYPE") {
get.MESSAGE_TYPE = data
config.MESSAGE_TYPE = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "SUDO_GROUP") {
get.SUDO_GROUP = data
config.SUDO_GROUP = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "FILE_NAME") {
get.FILE_NAME = data
config.FILE_NAME = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "CAPTION") {
get.CAPTION = data
config.CAPTION = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "LOGO") {
get.LOGO = data
config.LOGO = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "CINE_BLOCK") {
get.CINE_BLOCK = data
config.CINE_BLOCK = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "FOOTER") {
get.FOOTER = data
config.FOOTER = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
} else if (setting == "BODY") {
get.BODY = data
config.BODY = data
return await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
}
}

async function get(setting){
let get = JSON.parse(await githubGetFileContent(settings, data_info))
 
if (setting == "PREFIX") {
return get.PREFIX
} else if (setting == "ANTI_BAD") {
return get.ANTI_BAD
} else if (setting == "ANTI_LINK") {
return get.ANTI_LINK
} else if (setting == "ANTI_BOT") {
return get.ANTI_BOT
} else if (setting == "AUTO_MSG_READ") {
return get.AUTO_MSG_READ
} else if (setting == "AI_MODE") {
return get.AI_MODE
} else if (setting == "WORK_TYPE") {
return get.WORK_TYPE
} else if (setting == "MAX_SIZE") {
return get.MAX_SIZE
}else if (setting == "SUDO_NUMBER") {
return get.SUDO_NUMBER
} else if (setting == "OWNER_REACT_EMOJI") {
return get.OWNER_REACT_EMOJI
} else if (setting == "OWNER_REACT") {
return get.OWNER_REACT
} else if (setting == "OWNER_NUMBER") {
return get.OWNER_NUMBER
} else if (setting == "AUTO_READ_STATUS") {
return get.AUTO_READ_STATUS
} else if (setting == "MAX_SIZE_GB") {
return get.MAX_SIZE_GB
} else if (setting == "JIDS") {
return get.JIDS
} else if (setting == "ALWAYS_ONLINE") {
return get.ALWAYS_ONLINE
} else if (setting == "SUDO") {
return get.SUDO
} else if (setting == "ALIVE_MESSAGE") {
return get.ALIVE_MESSAGE
} else if (setting == "MESSAGE_TYPE") {
return get.MESSAGE_TYPE
} else if (setting == "SUDO_GROUP") {
return get.SUDO_GROUP
} else if (setting == "FILE_NAME") {
return get.FILE_NAME
} else if (setting == "CAPTION") {
return get.CAPTION
} else if (setting == "LOGO") {
return get.LOGO
} else if (setting == "CINE_BLOCK") {
return get.CINE_BLOCK
} else if (setting == "FOOTER") {
return get.FOOTER
} else if (setting == "BODY") {
return get.BODY
}
}

async function updb(){
let get = JSON.parse(await githubGetFileContent(settings, data_info))
 
config.PREFIX = get.PREFIX
config.ANTI_BAD = get.ANTI_BAD
config.ANTI_LINK = get.ANTI_LINK
config.ANTI_BOT = get.ANTI_BOT
config.AUTO_MSG_READ = get.AUTO_MSG_READ
config.AUTO_READ_STATUS = get.AUTO_READ_STATUS
config.ALWAYS_ONLINE = get.ALWAYS_ONLINE
config.AI_MODE = get.AI_MODE
config.WORK_TYPE = get.WORK_TYPE 
config.ALIVE_MESSAGE = get.ALIVE_MESSAGE
config.MAX_SIZE = Number(get.MAX_SIZE)
config.MAX_SIZE_GB = Number(get.MAX_SIZE_GB)
config.SUDO_NUMBER = get.SUDO_NUMBER
config.OWNER_REACT_EMOJI = get.OWNER_REACT_EMOJI
config.OWNER_REACT = get.OWNER_REACT
config.OWNER_NUMBER = get.OWNER_NUMBER
config.SUDO = get.SUDO
config.SUDO_GROUP = get.SUDO_GROUP
config.JIDS = get.JIDS
config.MESSAGE_TYPE = get.MESSAGE_TYPE
config.FILE_NAME = get.FILE_NAME
config.FOOTER = get.FOOTER
config.CAPTION = get.CAPTION
config.LOGO = get.LOGO
config.CINE_BLOCK = get.CINE_BLOCK
config.BODY = get.BODY

 
console.log("Database writed ✅")
}


async function updfb(){
let get = {
PREFIX: '.' ,
ANTI_BAD: "false",
ANTI_LINK: "false",
ANTI_BOT: "false",
AUTO_MSG_READ: "true",
AUTO_READ_STATUS: "true",
ALWAYS_ONLINE: "true",
AI_MODE: "true",
WORK_TYPE: "private",
ALIVE_MESSAGE: "Hellow i am alive now  ! 👋🏻",
LOGO: "https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/IMAGES/images.jpeg",
FILE_NAME: "",
FOOTER: "> 𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪",
CAPTION: "> ᴜᴘʟᴏᴀᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ",
BODY: "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ᴅᴀʀᴋꜱʜᴀᴅᴏᴡxᴛᴇᴀᴍ",
MAX_SIZE: 500,
MAX_SIZE_GB: 1.5,
SUDO_NUMBER: "94743548986",
OWNER_REACT_EMOJI: `👾`,
OWNER_REACT: "true",
CINE_BLOCK: "false",
OWNER_NUMBER: "94762714730",
MESSAGE_TYPE: "BUTTON",
SUDO: [],
SUDO_GROUP: [],
JIDS: []
}
await githubClearAndWriteFile(settings, data_info,JSON.stringify(get))
config.PREFIX = '.'
config.ANTI_BAD = "false"
config.ANTI_LINK = "false"
config.ANTI_BOT = "false"
config.AUTO_MSG_READ = "true"
config.AUTO_READ_STATUS = "true"
config.ALWAYS_ONLINE = "true"
config.AI_MODE = "true"
config.WORK_TYPE = "private"
config.ALIVE_MESSAGE = "Hellow i am alive now  ! 👋🏻"
config.LOGO = "https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/IMAGES/images.jpeg"
config.FILE_NAME = ""
config.FOOTER = "> ᴍᴏᴠɪᴇ ᴜᴘʟᴏᴀᴅ ʙʏ ᴅᴀʀᴋꜱʜᴀᴅᴏᴡ ᴡᴀ ʙᴏᴛ",
config.CAPTION = "> 𝗗𝗔𝗥𝗞𝗦𝗛𝗔𝗗𝗢𝗪𝗫𝗧𝗘𝗔𝗠"
config.BODY = "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ"
config.MAX_SIZE = 500
config.MAX_SIZE_GB = 1.9
config.SUDO_NUMBER = "94740952096"
config.OWNER_REACT_EMOJI = `👾`
config.OWNER_REACT = "true"
config.CINE_BLOCK = "false"
config.OWNER_NUMBER = "94740952096"
config.MESSAGE_TYPE = "BUTTON"
config.SUDO = []
config.SUDO_GROUP = []
config.JIDS = []

console.log("Database writed ✅")
}

//=======================================================================================================


async function inputMvdb(setting, data){
let get = JSON.parse(await githubGetFileContent(settings, mvdb_data))
 
if (setting == "CINESUBZ_MV_CARD") {
get.CINESUBZ_MV_CARD = data
config.CINESUBZ_MV_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
} else if (setting == "CINESUBZ_TV_CARD") {
get.CINESUBZ_TV_CARD = data
config.CINESUBZ_TV_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
} else if (setting == "CINESUBZ_EP_CARD") {
get.CINESUBZ_EP_CARD = data
config.CINESUBZ_EP_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
} else if (setting == "SINHALASUB_MV_CARD") {
get.SINHALASUB_MV_CARD = data
config.SINHALASUB_MV_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
} else if (setting == "SINHALASUB_TV_CARD") {
get.SINHALASUB_TV_CARD = data
config.SINHALASUB_TV_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
} else if (setting == "SINHALASUB_EP_CARD") {
get.SINHALASUB_EP_CARD = data
config.SINHALASUB_EP_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
}else if (setting == "MOVIE_INFO_CARD") {
get.MOVIE_INFO_CARD = data
config.MOVIE_INFO_CARD = data
return await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))
}
}

async function getMvdb(setting){
let get = JSON.parse(await githubGetFileContent(settings, mvdb_data))
 
if (setting == "CINESUBZ_MV_CARD") {
return get.CINESUBZ_MV_CARD
} else if (setting == "CINESUBZ_TV_CARD") {
return get.CINESUBZ_TV_CARD
} else if (setting == "CINESUBZ_EP_CARD") {
return get.CINESUBZ_EP_CARD
} else if (setting == "SINHALASUB_MV_CARD") {
return get.SINHALASUB_MV_CARD
} else if (setting == "SINHALASUB_TV_CARD") {
return get.SINHALASUB_TV_CARD
} else if (setting == "SINHALASUB_EP_CARD") {
return get.SINHALASUB_EP_CARD
} else if (setting == "MOVIE_INFO_CARD") {
return get.MOVIE_INFO_CARD
}
}

async function updbMvdb(){
let get = JSON.parse(await githubGetFileContent(settings, mvdb_data))
 
mv_db.CINESUBZ_MV_CARD = get.CINESUBZ_MV_CARD
mv_db.CINESUBZ_TV_CARD = get.CINESUBZ_TV_CARD
mv_db.CINESUBZ_EP_CARD = get.CINESUBZ_EP_CARD
mv_db.SINHALASUB_MV_CARD = get.SINHALASUB_MV_CARD
mv_db.SINHALASUB_TV_CARD = get.SINHALASUB_TV_CARD
mv_db.SINHALASUB_EP_CARD = get.SINHALASUB_EP_CARD
mv_db.MOVIE_INFO_CARD = get.MOVIE_INFO_CARD

 
console.log("𝗗𝗔𝗥𝗞 𝗦𝗛𝗔𝗗𝗢𝗪 DB WRITED ✅")
}


async function updfbMvdb(){
let get = {
CINESUBZ_MV_CARD: ``,
CINESUBZ_TV_CARD: ``,
CINESUBZ_EP_CARD: ``,
SINHALASUB_MV_CARD: ``,
SINHALASUB_TV_CARD: ``,
SINHALASUB_EP_CARD: ``,
MOVIE_INFO_CARD: ``
}
 
await githubClearAndWriteFile(settings, mvdb_data,JSON.stringify(get))

mv_db.CINESUBZ_MV_CARD = ``,
mv_db.CINESUBZ_TV_CARD = ``,
mv_db.CINESUBZ_EP_CARD = ``,
mv_db.SINHALASUB_MV_CARD = ``,
mv_db.SINHALASUB_TV_CARD = ``,
mv_db.SINHALASUB_EP_CARD = ``,
mv_db.MOVIE_INFO_CARD = ``


console.log("MOVIE-X DB WRITED ✅")
}



module.exports = { updateCMDStore, isbtnID, getCMDStore, getCmdForCmdId, connectdb, input, get, updb, updfb, inputMvdb, getMvdb, updbMvdb, updfbMvdb }
