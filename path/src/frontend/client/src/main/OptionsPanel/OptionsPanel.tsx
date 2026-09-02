import { useState, useRef, useEffect } from "react";

import PlayButton from "./Buttons/PlayButton"
import PauseButton from "./Buttons/PauseButton"
import ResetButton from "./Buttons/ResetButton";
import StepButton from "./Buttons/StepButton";
import GridSize from "../GridSize"
import { fetchNextGeneration } from "../../api/board";

type ActiveButton = "play" | "pause" | null;
interface OptionsPanelProps {
    gridWidth: number;
    gridHeight: number;
    onGridWidthChange: (width: number) => void;
    onGridHeightChange: (height: number) => void;
    liveCells: Set<number>;
    onLiveCellsChange: (liveCells: Set<number>) => void;
}

const panelStyle: React.CSSProperties = {
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
    const intervalRef = useRef<number | null>(null);

    // always reflect the latest values, so the interval tick never reads stale state
    const liveCellsRef = useRef(liveCells);
    const dimensionsRef = useRef({ width: gridWidth, height: gridHeight });

    useEffect(() => {
        liveCellsRef.current = liveCells;
        dimensionsRef.current = { width: gridWidth, height: gridHeight };
    }, [liveCells, gridWidth, gridHeight]);

    const stopPlaying = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handlePlay = () => {
        if (intervalRef.current !== null) return; // already running
        setActiveButton("play");
        intervalRef.current = window.setInterval(async () => {
            const { width, height } = dimensionsRef.current;
            const next = await fetchNextGeneration(liveCellsRef.current, width, height);
            onLiveCellsChange(next);
        }, 500); // adjust generation speed here
    };

    const handlePause = () => {
        stopPlaying();
        setActiveButton("pause");
    };

    const handleBeforeStep = () => {
        if (activeButton === "play") {
            stopPlaying();
            setActiveButton(null);
        }
        // StepButton's own handleStep runs right after this, doing the "one last generation"
    };

    const handleBeforeReset = () => {
        stopPlaying();
        setActiveButton(null);
    };

    useEffect(() => stopPlaying, []); // clear interval if the panel unmounts mid-play

    return (
        <main style={panelStyle}>
            <PlayButton
                isActive={activeButton === "play"}
                onActivate={handlePlay}
            />

            <PauseButton
                isActive={activeButton === "pause"}
                onActivate={handlePause}
            />

            <StepButton
                liveCells={liveCells}
                onLiveCellsChange={onLiveCellsChange}
                width={gridWidth}
                height={gridHeight}
                onBeforeStep={handleBeforeStep}
            />

            <GridSize
                width={gridWidth}
                height={gridHeight}
                onWidthChange={onGridWidthChange}
                onHeightChange={onGridHeightChange}
            />

            <div style={{ marginTop: "auto" }}>
                <ResetButton
                    liveCells={liveCells}
                    onLiveCellsChange={onLiveCellsChange}
                    onBeforeReset={handleBeforeReset}
                />
            </div>
        </main>
    );
};

export default OptionsPanel;
