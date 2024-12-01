import Button from "./base/Button";
import shareIcon from "../assets/share.svg";
import logo from "../assets/logo.svg";

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Playlist.AI" />
            <Button
                variant="primary"
                icon={shareIcon}
                title="Share"
                onClick={() => {}}
            />
        </header>
    );
}
