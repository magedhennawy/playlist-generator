import { useEffect, useRef, useState } from "react";
import './App.css'
import { Playlist, Song } from "./lib/types";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Landing from "./components/Landing";
import { SelectedSongsContext } from "./components/context/SelectedSongsContext";
import { generatePlaylist } from "./lib/api";
import GeneratedPlaylist from "./components/GeneratedPlaylist";



function App() {
  const selectedSongsState = useState<Song[]>([]);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [loading, setLoading] = useState(false);
    const playlistRef = useRef<HTMLElement>(null);

    const generate = async () => {
        setLoading(true);

        const songs = selectedSongsState[0].map((song) => ({
            title: song.title,
            artist: song.artist,
        }));
        const pl = await generatePlaylist(songs);
        setPlaylist(pl);
        setLoading(false);
    };
    

    useEffect(() => {
        if (playlist != null) {
            playlistRef.current?.scrollIntoView();
        }
    }, [playlist]);

    return (
        <SelectedSongsContext.Provider value={selectedSongsState}>
            {loading && <Loading />}
            <Header />
            <Landing  onClick={generate} />
            {playlist && (
                <GeneratedPlaylist ref={playlistRef} playlist={playlist} />
            )}
        </SelectedSongsContext.Provider>
    );
}

export default App
