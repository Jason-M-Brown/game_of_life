import "./Main.css"

import { useState } from "react";

import BoardPanel from "./BoardPanel/BoardPanel";
import OptionsPanel from "./OptionsPanel/OptionsPanel"

const MIN_SIZE = 1;

function Main() {

    const [gridWidth, setGridWidth] = useState(MIN_SIZE);
    const [gridHeight, setGridHeight] = useState(MIN_SIZE);
    const [liveCells, setLiveCells] = useState<Set<number>>(new Set());

    const handleGridWidthChange = (newWidth: number) => {
        setLiveCells(new Set());
        setGridWidth(newWidth);
    }

    const handleGridHeightChange = (newHeight: number) => {
        setLiveCells(new Set());
        setGridHeight(newHeight);
    }

    return (
        <main className="main">
            <OptionsPanel
                gridWidth={gridWidth}
                gridHeight={gridHeight}
                onGridWidthChange={handleGridWidthChange}
                onGridHeightChange={handleGridHeightChange}
                liveCells={liveCells}
                onLiveCellsChange={setLiveCells}
            />
            <BoardPanel
                width={gridWidth}
                height={gridHeight}
                liveCells={liveCells}
                onLiveCellsChange={setLiveCells}
            />
        </main>
    );
};

export default Main;