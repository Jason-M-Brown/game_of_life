import {useState} from "react";

import PlayButton from "./Buttons/PlayButton"
import PauseButton from "./Buttons/PauseButton"
import ResetButton from "./Buttons/ResetButton";
import StepButton from "./Buttons/StepButton";
import GridSize from "../GridSize"

type ActiveButton = "play" | "pause" |  null;
interface OptionsPanelProps {
    gridWidth: number;
    gridHeight: number;
    onGridWidthChange: (width: number) => void;
    onGridHeightChange: (height: number) => void;
    liveCells: Set<number>;
    onLiveCellsChange: (liveCells: Set<number>) => void;
}

const panelStyle : React.CSSProperties = {
    backgroundColor: "rgb(49, 12, 70)",
    position: "absolute",
    left: "3%",
    top: "3%",
    width: "20%",
    height: "90%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
};

function OptionsPanel({
    gridWidth,
    gridHeight,
    onGridWidthChange,
    onGridHeightChange,
    liveCells,
    onLiveCellsChange,
    }: OptionsPanelProps) {

    const [activeButton, setActiveButton] = useState<ActiveButton>(null);

    return (
        <main style={panelStyle}>
            <PlayButton
                isActive={activeButton === "play"}
                onActivate={() => setActiveButton("play")}
                liveCells={liveCells}

            />

            <PauseButton
                isActive={activeButton === "pause"}
                onActivate={() => setActiveButton("pause")}  
                liveCells={liveCells}
            />

            <StepButton 
                liveCells={liveCells}
                onLiveCellsChange={onLiveCellsChange}
                width={gridWidth}
                height={gridHeight}
                />


            <GridSize
                width={gridWidth}
                height={gridHeight}
                onWidthChange={onGridWidthChange}
                onHeightChange={onGridHeightChange}
            />

            <div style={{ marginTop: "auto"}}>
                <ResetButton liveCells={liveCells} onLiveCellsChange={onLiveCellsChange} />
            </div>


        </main>
    );
};

export default OptionsPanel;