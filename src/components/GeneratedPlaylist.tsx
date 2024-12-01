import { forwardRef } from "react";
import { Playlist } from "../lib/types";
import PlaylistHeader from "./playlist/PlaylistHeader";
import PlaylistTable from "./playlist/PlaylistTable";

type GeneratedPlaylistProps = {
    playlist: Playlist;
};
export default forwardRef(function GeneratedPlaylist(
    { playlist }: GeneratedPlaylistProps,
    ref: React.Ref<HTMLElement>
) {
    return (
        <section ref={ref} id="generatedPlaylist">
            <div className="playlist">
                <PlaylistHeader
                    title={playlist.title}
                    numSongs={playlist.songs.length}
                    duration={playlist.duration}
                    returnPrompt={playlist.returnPrompt}
                />
                <PlaylistTable songs={playlist.songs} />
            </div>
        </section>
    );
});
