export type SearchResultProps = {
    title: string;
    artist: string;
    album: {
        image: string;
    };
    onClick: () => void;
};
export default function SearchResult({
    title,
    artist,
    album,
    onClick,
}: SearchResultProps) {
    return (
        <li key={title}
             className="search__result" onClick={onClick}>
            <img src={album.image} alt={title} />
            <div className="search__result__info">
                <h3>{title}</h3>
                <p>{artist}</p>
            </div>
        </li>
    );
}
