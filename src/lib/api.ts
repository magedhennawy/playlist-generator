import { Playlist, Song } from "./types";

const API_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : "https://playlistai-backend.onrender.com";

console.log(import.meta.env.MODE);

export function generatePlaylist(
    selectedSongs: { title: string; artist: string }[]
): Promise<Playlist | null> {
    return fetch(`${API_URL}/gpt`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedSongs),
    })
        .then((res) => res.json())
        .then((res) => ({
            ...res,
            duration: res.songs.reduce(
                (dur: number, song: Song) => dur + song.duration,
                0
            ),
        }))
        .catch((err) => {
            console.error(err);
            alert("Something went wrong, please try again later");
            return null;
        });
}

export function searchSpotify(query: string) {
    return fetch(`${API_URL}/search?q=${query}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}
