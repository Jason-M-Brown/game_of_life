import { useState } from "react";

export interface ToggleButtonProps {
    lable: string;
    isActive: boolean;
    onActivate: () => void;
    baseColor?: string;
    hoverColor?: string;
    activeColor?: string;
}

const DEFAULT_BASE = "rgb(80, 30, 110)";
const DEFAULT_HOVER = "rgb(110, 50, 150)";
const DEFAULT_ACTIVE = "rgb(150, 0, 237)";

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
                onClick={onActivate}
            >
                {lable}
            </button>
        );
    }

    export default ToggleButton;