import clockIcon from "../../assets/clock.svg";
import { Song } from "../../lib/types";
import PlaylistTableRow from "./PlaylistTableRow";

type PlaylistTableProps = {
    songs: Song[];
};
export default function PlaylistTable({ songs }: PlaylistTableProps) {
    return (
        <table className="playlist__table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>
                        <img src={clockIcon} alt="Duration" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song, i) => (
                    <PlaylistTableRow key={i} index={i + 1} song={song} />
                ))}
            </tbody>
        </table>
    );
}
