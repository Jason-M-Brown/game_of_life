import ToggleButton from "../interface/ToggleButton"

interface PauseButtonProps {
    isActive: boolean;
    onActivate: () => void;
    liveCells: Set<number>;
}

//TO DO: Attach what to do when clicked here
async function callPauseBackend(liveCells: Set<number>) {

}

function PauseButton({isActive, onActivate, liveCells}: PauseButtonProps) {
    const handleClick = () => {
        onActivate();
        callPauseBackend(liveCells);
    };
    
    
    return (
        <ToggleButton 
            lable="Pause" 
            isActive={isActive}
            onActivate={handleClick}
            />
    );
};

export default PauseButton