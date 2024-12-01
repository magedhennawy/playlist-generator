import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { spotify } from "./spotify.js";

dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

function generatePrompt(songs, length = 20) {
    return (
        `Generate a dj set of ${length} songs for me based on these ${songs.length} songs that I like, and sort by BPM. And at the end, write a name for the playlist in the format "playlist name: \$\{NAME\}":\n\n` +
        songs
            .map((song, i) => `${i + 1}. ${song.title} - ${song.artist}`)
            .join("\n  ")
    );
}

async function parseResponse(response) {
    const songs = Promise.all(
        response
            .match(/(?<=\d+\.)(.+) - (.+)/gim)
            .map((song) => song.trim())
            .map((song) => spotify(song, 1))
            .map(async (res) => (await res)[0])
    );

    console.log(response);

    return {
        returnPrompt: response
        .match(/^(.*)/m)[0] // Extracts the first line of the response
        .trim(),
        title: response
            .match(/(?<=Playlist name: )(.+)/gim)[0]
            .trim()
            .replace(".", ""),
        songs: await songs,
    };
}

export async function generatePlaylist(songs) {
    let response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "You are an AI that generates playlists based on a list of songs that a user likes.",
            },
            { role: "user", content: generatePrompt(songs) },
        ],
        max_tokens: 500,
        temperature: 0.7, // Maintain efficiency
    });

    // console.log(response.data);

    // console.log('test')
    return response.data.choices[0].finish_reason == "length"
        ? "GPT error. Please try again later. :("
        : parseResponse(response.data.choices[0].message.content);
}
