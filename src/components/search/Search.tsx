import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import { Song } from "../../lib/types";
import { searchSpotify } from "../../lib/api";

type SearchProps = {
    isOpen: boolean;
    onSelect: (song: Song) => void;
};

export default function Search({ isOpen, onSelect }: SearchProps) {
    const [results, setResults] = useState<Song[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const search = ({
        currentTarget: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        if (value.length < 3) return setResults([]);
        else {
            console.log(value);
            searchSpotify(value).then((data) => setResults(data));
        }
    };

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    return (
        <div
            className="search"
            style={isOpen ? { display: "block" } : { display: "none" }}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Search for a song or artist..."
                onChange={search}
            />
            <ul className="search__results">
                {results.length > 0 ? (
                    results.map((result, i) => (
                        <SearchResult
                            key={i}
                            {...result}
                            onClick={() => onSelect(result)}
                        />
                    ))
                ) : (
                    <li
                        key={inputRef.current?.value}
                        className="search__results__no-results">
                        {inputRef.current && inputRef.current.value.length > 3
                            ? "No results found."
                            : "Keep typing..."}
                    </li>
                )}
            </ul>
        </div>
    );
}
