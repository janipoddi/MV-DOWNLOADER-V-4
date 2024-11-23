const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "m",
    desc: "Fetch detailed information about a movie using its name or IMDb ID.",
    category: "utility",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const query = args.join(' ');
        if (!query) {
            return reply("📽 Please provide the movie name or IMDb ID.");
        }

        const apiUrl = query.startsWith("tt")
            ? `https://www.omdbapi.com/?i=${encodeURIComponent(query)}&apikey=76cb7f39`
            : `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=76cb7f39`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *Title*: ${data.Title} | සිංහල හඩකැවූ.
📅 *Released*: ${data.Released}
⏱ *Runtime*: ${data.Runtime}
🌐 *Language*: ${data.Language}
⭐ *IMDB Rating*: ${data.imdbRating}
🎭 *Actors*: ${data.Actors}

📝 *Plot*: ${data.Plot}
        `;

        const imageUrl = data.Poster !== "N/A" ? data.Poster : config.DEFAULT_IMAGE_URL;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: movieInfo,
        }, { quoted: mek });
    } catch (error) {
        console.error("Error fetching movie info:", error.message);
        reply("❌ An error occurred while fetching movie details.");
    }
});
