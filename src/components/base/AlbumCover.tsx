type AlbumCoverProps = {
    imageURL: string;
    artistName: string;
    songName: string;
    onRemove: () => void;
};

export default function AlbumCover({
    imageURL,
    artistName,
    songName,
    onRemove,
}: AlbumCoverProps) {
    return (
        <div className="albumcover">
            <button onClick={onRemove} className="close">
                &times;
            </button>
            <img src={imageURL} alt={songName} />
            <div className="albumcover__info">
                <h3>{songName}</h3>
                <p>{artistName}</p>
            </div>
        </div>
    );
}