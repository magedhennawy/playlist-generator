import { durationToString } from "../../lib/durationStrings";
import Button from "../base/Button";
import spotifyIcon from "../../assets/spotify.svg";
import playlistImg from "../../assets/logo.svg";

type PlaylistHeaderProps = {
    title: string;
    numSongs: number;
    duration: number;
    returnPrompt?: string;
};

export default function PlaylistHeader({
    title,
    numSongs,
    duration,
    returnPrompt,
}: PlaylistHeaderProps) {
    return (
        <div className="playlist__header">
            <img className="albumCover" src={playlistImg} alt={title} />
            <div className="playlist__header__info">
                <h2>{title}</h2>
                <h3>{returnPrompt}</h3>
                <p>
                    {numSongs} songs, {durationToString(duration)}
                </p>
            </div>
            <Button
                disabled={true}
                icon={spotifyIcon}
                title="Add to Spotify"
                variant="primary"
                onClick={() => {}}
            />
        </div>
    );
}
