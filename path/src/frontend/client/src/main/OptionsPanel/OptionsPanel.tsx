import {useState} from "react";

import PlayButton from "./Buttons/PlayButton"
import PauseButton from "./Buttons/PauseButton"
import ResetButton from "./Buttons/ResetButton";
import StepButton from "./Buttons/StepButton";
import GridSize from "./GridSize"

const panelStyle : React.CSSProperties = {
    backgroundColor: "rgb(49, 12, 70)",
    position: "absolute",
    left: "3%",
    top: "3%",
    width: "28%",
    height: "90%",
    boxSizing: "border-box",
};

type ActiveButton = "play" | "pause" |  null;

function OptionsPanel() {
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    return (
        <main style={panelStyle}>
            <PlayButton
                isActive={activeButton === "play"}
                onActivate={() => setActiveButton("play")}
            />

            <PauseButton
                isActive={activeButton === "pause"}
                onActivate={() => setActiveButton("pause")}  
            />

            <StepButton/>
            <ResetButton/>


        </main>
    );
};

export default OptionsPanel;