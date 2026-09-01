import ToggleButton from "../interface/ToggleButton"

interface ResetButtonProps {
    isActive: boolean;
    onActivate: () => void;
}

//TO DO: Attach what to do when clicked here
async function callPlayBackend() {

}

function ResetButton({isActive, onActivate}: ResetButtonProps) {
    const handleClick = () => {
        onActivate();
        callPlayBackend();
    };
    
    
    return (
        <ToggleButton 
            lable="Reset" 
            isActive={isActive}
            onActivate={handleClick}
            />
    );
};

export default ResetButton