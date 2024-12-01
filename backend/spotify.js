import dotenv from "dotenv";

dotenv.config();
var accessToken;
var searchInput = "billionaire";

export const spotify = async (searchQuery, limit = 10) => {
    var getAuth = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
            "grant_type=client_credentials&client_id=" +
            process.env.CLIENT_ID +
            "&client_secret=" +
            process.env.CLIENT_SECRET,
    };

    if (accessToken == null) {
        await getAccessToken(getAuth);
    }
    return search(accessToken, searchQuery, limit);
};

// get access token
const getAccessToken = async (authentication) => {
    let data = await fetch(
        "https://accounts.spotify.com/api/token",
        authentication
    );
    accessToken = (await data.json()).access_token;
    return accessToken;
};

// async search arrow function
const search = async (token, searchQuery, limit) => {
    // var limit = 10;
    var searchParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    };

    try {
        var songs = await fetch(
            "https://api.spotify.com/v1/search?q=" +
                searchQuery +
                "&type=album,track" +
                "&limit=" +
                limit,
            searchParams
        );
        var data = await songs.json();
        // console.log(data);

        // map the song title, artist, album name, album image, duration
        songs = data.tracks.items.map((item) => ({
            title: item.name,
            artist: item.artists.map((artist) => artist.name).join(", "),
            album: {
                name: item.album.name,
                image: item.album.images[0].url,
            },
            duration: item.duration_ms,
        }));
        return songs;
    } catch (error) {
        console.log(error);
    }
};
