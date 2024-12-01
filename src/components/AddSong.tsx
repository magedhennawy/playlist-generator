import { useState } from "react";
import Button from "./base/Button";
import Search from "./search/Search";
import { Song } from "../lib/types";

type AddSongProps = {
    onSelect: (song: Song) => void;
};

export default function AddSong({ onSelect }: AddSongProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="addsong">
            <Button
                variant={"secondary"}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                title={"ADD"}
            />
            <Search
                isOpen={isOpen}
                onSelect={(song: Song) => {
                    setIsOpen(false);
                    onSelect(song);
                }}
            />
        </div>
    );
}
