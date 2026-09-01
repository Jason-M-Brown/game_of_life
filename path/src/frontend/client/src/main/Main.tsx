import BoardPanel from "./BoardPanel/BoardPanel";
import "./Main.css"

import OptionsPanel from "./OptionsPanel/OptionsPanel"

function main() {
    return (
        <>
        <main className="main">
            <OptionsPanel></OptionsPanel>
            <BoardPanel></BoardPanel>
        </main>
        </>
    );
};

export default main;