import { useState } from "react";

export interface MomentaryButtonProps {
    label: string;
    onTrigger: () => void;
    baseColor?: string;
    hoverColor?: string;
    activeColor?: string;
    flashDurationMs?: number;
}

const DEFAULT_BASE = "rgb(80, 30, 110)";
const DEFAULT_HOVER = "rgb(110, 50, 150)";
const DEFAULT_ACTIVE = "rgb(150, 0, 237)";
const DEFAULT_FLASH_MS = 150;

function MomentaryButton({
    label,
    onTrigger,
    baseColor = DEFAULT_BASE,
    hoverColor = DEFAULT_HOVER,
    activeColor = DEFAULT_ACTIVE,
    flashDurationMs = DEFAULT_FLASH_MS,
}: MomentaryButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);

    const handleClick = () => {
        setIsFlashing(true);
        onTrigger();
        window.setTimeout(() => setIsFlashing(false), flashDurationMs);
    };

    const backgroundColor = isFlashing
        ? activeColor: isHovered
        ? hoverColor: baseColor;

    const style: React.CSSProperties = {
        //Style Box
        backgroundColor,
        width: "95%",
        height: "10%",
        boxSizing: "border-box",
        display: "flex",


        //Style Text
        color: "white",

        //Location
        justifyContent: "center",
        flexDirection: "column",
        gap: "8px",
        margin: "3%",
        cursor: "pointer",



        //Transition
        transition: "background-color 0.20s ease-in-out",

    };

    return (
        <button
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {label}
        </button>
    );
}

export default MomentaryButton;