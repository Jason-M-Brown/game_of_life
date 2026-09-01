import { useState } from "react";

import BoardPanel from "./BoardPanel/BoardPanel";
import "./Main.css"
import OptionsPanel from "./OptionsPanel/OptionsPanel"

const MIN_SIZE = 1;

function Main() {

    const [gridWidth, setGridWidth] = useState(MIN_SIZE);
    const [gridHeight, setGridHeight] = useState(MIN_SIZE);

    return (
        <main className="main">
            <OptionsPanel
                gridWidth={gridWidth}
                gridHeight={gridHeight}
                onGridWidthChange={setGridWidth}
                onGridHeightChange={setGridHeight}
            />
            <BoardPanel
                width={gridWidth}
                height={gridHeight}
            />
        </main>
    );
};

export default Main;