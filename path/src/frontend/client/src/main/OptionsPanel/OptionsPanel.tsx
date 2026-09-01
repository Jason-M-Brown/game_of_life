
import PlayButton from "./PlayButton"
import PauseButton from "./PauseButton"
import ResetButton from "./ResetButton";
import StepButton from "./StepButton";
import GridSize from "./GridSize";

const panelStyle : React.CSSProperties = {
    backgroundColor: "rgb(49, 12, 70)",
    position: "absolute",
    left: "3%",
    top: "3%",
    width: "28%",
    height: "90%",
    boxSizing: "border-box",
};

function OptionsPanel() {
    
    return (
        <>
        <main style={panelStyle}>
            <PlayButton></PlayButton>
            <PauseButton></PauseButton>
            <StepButton></StepButton>
            <GridSize></GridSize>
            <ResetButton></ResetButton>
        </main>
        </>
    );
};

export default OptionsPanel;