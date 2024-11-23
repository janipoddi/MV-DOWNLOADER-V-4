const axios = require("axios")
const nexara = require("nexara")
const cheerio = require("cheerio")
require("dotenv").config()
const CREATOR = 'Dark Yasiya'

async function getMovies(query) {
    try {
    const $ = await nexara("https://sinhalasub.lk/?s="+query)
    const movies = []
    
    $("#contenedor > div.module > div.content.rigth.csearch > div > div > article").each((i, el) => {
        const imdb = $(el).find("div.details > div.meta > span.rating").text().toUpperCase()
        const year = $(el).find("div.details > div.meta > span.year").text()
        const title = $(el).find("div.details > div.title > a").text()
        const link = $(el).find("div.details > div.title > a").attr("href")
        const image = $(el).find("div.image > div > a > img").attr("src")
        const type = $(el).find("div.image > div > a > span").text().trim()
        movies.push({title,imdb, year, link, image, type})
    })

    const result = {
        status: true,
        creator: CREATOR,
        result: movies
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
            creator: CREATOR,
            error: error
        }
        console.log(errors)
    }
}

//================================================

async function getMovieDL(query) {
    try {
        const https = /^https:\/\/[^\s/$.?#].[^\s]*$/;
        if (!query || !https.test(query)) {
            console.log("Invalid URL. Please provide a valid HTTPS URL.");
            console.log("මොකක්ද මනුස්සයෝ කරන්නෙ SinhalaSub.lk FILM URL එකක් දාපන්");
            return;
        }

        const $ = await nexara(query);


        const cast = []
        $("#cast > div.persons > div.person").each((i, el) => {
            const cast_name = $(el).find("div.data > div.name > a").text()
            const cast_link = $(el).find("div.data > div.name > a").attr("href")
            cast.push({cast_name, cast_link})
        })

        const title = $("#single > div.content.right > div.sheader > div.data > div.head > h1").text();
        const date = $("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
        const country = $("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text();                                      
        const runtime = $("#single > div.content.right > div.sheader > div.data > div.extra > span.runtime").text();
        const categorydata = $("#single > div.content.right > div.sheader > div.data > div.sgeneros > a").text().trim();
        const category = categorydata.match(/([A-Z][a-z]+|\d+\+?)/g);
        const description = $("#info > div.wp-content > p").text().trim();
        const imdb = $("#repimdb > strong").text();
        const director = $("#cast > div.persons > div.person > div.img > a > img").attr("alt");
        const image = $("#single > div.content.right > div.sheader > div.poster > img").attr("src");
    

        const downlink = [];
        const downloadLinks = $("#download > div > div > table > tbody > tr");

        downloadLinks.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");

            if (quality && size && downloadLinkOut) {
                downlink.push({ quality, size, link: downloadLinkOut });
            }
        });

        const detailedDownlinkPromises = downlink.map(async (item) => {
            try {
                const detailPage = await axios.get(item.link);
                const $detail = cheerio.load(detailPage.data);
                const link = $detail("#link").attr("href")?.trim(); 
                return { ...item, link };
            } catch (error) {
                console.error(`Error fetching details for link ${item.link}: ${error.message}`);
                return item;
            }
        });

        const detailedDownlink = await Promise.all(detailedDownlinkPromises);

        const result = {
            status: true,
            creator: CREATOR,
            result: {
                title: title,
                imdb: imdb,
                date: date,
                country: country,
                runtime: runtime,
                category: category,
                director: director,
                cast: cast,
                description: description,
                image: image,
                dl_links: detailedDownlink
            }
        };

        // console.dir(result, { depth: null, colors: true });
        return result

    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}

//================================================

async function getMoviesSearch(query) {
    try {
    const result = await getMovies(query)
    const firstresultlink = result.result[0].link
    const addfunction = await getMovieDL(firstresultlink)
    return addfunction
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}

//=============================================

async function getEpisodes(query) {
    try {
    const $ = await nexara(query)



    const title = $("#single > div.content.right > div.sheader > div.data > div.head > h1").text();
    const date = $("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
    const categorydata = $("#single > div.content.right > div.sheader > div.data > div.sgeneros > a").text().trim();
    const category = categorydata.match(/([A-Z][a-z]+|\d+\+?)/g);
    const description = $("#info > div.wp-content > p").text().trim();
    const imdb = $("#repimdb > strong").text();
    const director = $("#cast > div.persons > div.person > div.img > a > img").attr("alt");
    const image = $("#single > div.content.right > div.sheader > div.poster > img").attr("src");

    const episodes = []
    
    $("#seasons > div.se-c > div.se-a > ul > li").each((i, el) => {
        const title = $(el).find("div.numerando").text()
        const date = $(el).find("div > span.date").text()
        const episode_link = $(el).find("div > a").attr("href")
        episodes.push({title, date, episode_link})
    })

    const result = {
        status: true,
        creator: CREATOR, 
        result: {
            title: title,
            imdb: imdb,
            date: date,
            category: category,
            director: director,
            description: description,
            image: image,
            episodes: episodes
    }}

    if (episodes.length === 0) {
        console.log("No movies found with the given query.");
    } else {
        //console.log("Movies found:", movies.length);
        return result
    }
    
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
        console.log(errors)
    }
}
//=======================================================

async function getEpiDL(query) {
    try {
        const https = /^https:\/\/[^\s/$.?#].[^\s]*$/;
        if (!query || !https.test(query)) {
            console.log("Invalid URL. Please provide a valid HTTPS URL.");
            console.log("මොකක්ද මනුස්සයෝ කරන්නෙ SinhalaSub.lk FILM URL එකක් දාපන්");
            return;
        }

        const $ = await nexara(query);

        const title = $("#info > h1").text()
        const ep_name = $("#info > div > h3").text();
        const description = $("#info > div.wp-content > p").text().trim();
        const date = $("#info > span.date").text();

        const downlink = [];
        const downloadLinks = $("#download > div > div > table > tbody > tr");

        downloadLinks.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");

            if (quality && size && downloadLinkOut) {
                downlink.push({ quality, size, link: downloadLinkOut });
            }
        });

        const detailedDownlinkPromises = downlink.map(async (item) => {
            try {
                const detailPage = await axios.get(item.link);
                const $detail = cheerio.load(detailPage.data);
                const link = $detail("#link").attr("href")?.trim(); 
                return { ...item, link };
            } catch (error) {
                console.error(`Error fetching details for link ${item.link}: ${error.message}`);
                return item;
            }
        });

        const detailedDownlink = await Promise.all(detailedDownlinkPromises);

        const result = {
            status: true,
            creator: CREATOR,
            result: {
                title: title,
                ep_name: ep_name,
                date: date,
                description: description,
                dl_links: detailedDownlink
            }
        };

        // console.dir(result, { depth: null, colors: true });
        return result

    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}


module.exports = { getMovieDL, getMovies, getMoviesSearch, getEpisodes, getEpiDL }
