type ButtonProps = {
    variant: string;
    onClick: () => void;
    icon?: string;
    title: string;
    disabled?: boolean;
};

export default function Button({
    variant,
    onClick,
    icon,
    title,
    disabled,
}: ButtonProps) {
    return (
        <button
            className={`button ${variant} ${disabled ? "disabled" : ""}`}
            onClick={onClick}
        >
            {icon && <img src={icon}></img>}
            {title}
        </button>
    );
}
