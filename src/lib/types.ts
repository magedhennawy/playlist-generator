export type Playlist = {
    title: string;
    duration: number;
    songs: Song[];
    returnPrompt?: string;
};
export type Song = {
    title: string;
    artist: string;
    album: {
        name: string;
        image: string;
    };
    duration: number;
};
