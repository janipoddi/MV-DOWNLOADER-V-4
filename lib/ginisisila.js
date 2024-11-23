const axios = require("axios")
const nexara = require("nexara")
const cheerio = require("cheerio")
require("dotenv").config()

async function getCartoons(query) {
    try {
    const $ = await nexara("https://ginisisilacartoon.net/search.php?q="+query)
    const movies = []
    
    $("#page_panels_ > table > tbody > tr > td > div.inner-video-cell").each((i, el) => {
        const title = $(el).find("div.video-title > a").text()
        const posted_date = $(el).find("div.posted-time").text()
        const image = $(el).find("div.inner-video-thumb-wrapper > a > img").attr("src") 
        const link = $(el).find("div.video-title > a").attr("href")
       movies.push({title, posted_date, link, image})
    })

   const next_pg = $("#inner-center > div.inner-vcat-cell > div.vcat-cell-header > div.vcat-cell-header-text > span.cat-search-link > a.pagenum-next.pagenum-pagelink").attr("href")  || ''
 

    const result = {
        status: true,
        creator: "Dark Yasiya",
        result: movies,
        next_page: next_pg
    }

    if (movies.length === 0) {
        console.log("No movies found with the given query.");
    } else {
        //console.log("Movies found:", movies.length);
        return result
    }
    
    } catch (error) {
        const errors = {
            status: false,
            creator: process.env.CREATOR,
            error: error
        }
        console.log(errors)
    }
}
//===================================================

async function getCartoonsPg(query) {
    try {
    const $ = await nexara("https://ginisisilacartoon.net/"+query)
    const movies = []
    
    $("#page_panels_ > table > tbody > tr > td > div.inner-video-cell").each((i, el) => {
        const title = $(el).find("div.video-title > a").text()
        const posted_date = $(el).find("div.posted-time").text()
        const image = $(el).find("div.inner-video-thumb-wrapper > a > img").attr("src")
        const link = $(el).find("div.video-title > a").attr("href")
       movies.push({title, posted_date, link, image})
    })

   const next_pg = $("#inner-center > div.inner-vcat-cell > div.vcat-cell-header > div.vcat-cell-header-text > span.cat-search-link > a.pagenum-next.pagenum-pagelink").attr("href") || ''
 

    const result = {
        status: true,
        creator: "Dark Yasiya",
        result: movies,
        next_page: next_pg
    }

    if (movies.length === 0) {
        console.log("No movies found with the given query.");
    } else {
        //console.log("Movies found:", movies.length);
        return result
    }
    
    } catch (error) {
        const errors = {
            status: false,
            creator: process.env.CREATOR,
            error: error
        }
        console.log(errors)
    }
}

//================================================

async function getCartoonDL(query) {
    try {

        const $ = await nexara('https://ginisisilacartoon.net/'+query);

        const moviess = []

        const title = $("#watch-contentHd").text();
        const vid_link = $("#url").attr("value");
        const dl_link = $("#player-holder > div.player > iframe").attr("src");
 

        const result = {
            status: true,
            creator: "Dark Yasiya",
            title: title,
            video_link: vid_link,
            dl_link: dl_link
        };

        // console.dir(result, { depth: null, colors: true });
        return result

    } catch (error) {
        const errors = {
            status: false,
            creator: 'Dark Yasiya',
            error: error.  
        
        console.log(errors)
    }}}

//================================================

module.exports = { getCartoons, getCartoonDL, getCartoonsPg }
