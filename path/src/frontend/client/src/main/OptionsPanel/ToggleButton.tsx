import { useState } from "react";

export interface ToggleButtonProps {
    lable: string;
    isActive: boolean;
    onActivate: () => void;
    baseColor?: string;
    hoverColor?: string;
    activeColor?: string;
}

const DEFAULT_BASE   = "rgb(255, 255, 255)";
const DEFAULT_HOVER  = "rgb(1, 255, 242)";
const DEFAULT_ACTIVE = "rgb(237, 0, 0)";

function ToggleButton({
    lable,
    isActive,
    onActivate,
    baseColor = DEFAULT_BASE,
    hoverColor = DEFAULT_HOVER,
    activeColor = DEFAULT_ACTIVE,
    } : ToggleButtonProps) {
        const [isHovered, setIsHovered] = useState(false);

        const backgroundColor = isActive
            ? activeColor: isHovered
            ? hoverColor: baseColor;

        const style: React.CSSProperties = {
            backgroundColor,
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 16px",
            margin: "4px",
            cursor: "pointer",
            transition: "background-color 0.15s ease-in-out",
        };

        return (
            <button 
                style={style}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onActivate}
            >
                {lable}
            </button>
        );
    }

    export default ToggleButton;