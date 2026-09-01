import ToggleButton from "../interface/ToggleButton"

interface PauseButtonProps {
    isActive: boolean;
    onActivate: () => void;
}

//TO DO: Attach what to do when clicked here
async function callPlayBackend() {

}

function PauseButton({isActive, onActivate}: PauseButtonProps) {
    const handleClick = () => {
        onActivate();
        callPlayBackend();
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