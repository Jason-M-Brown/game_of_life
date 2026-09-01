import ToggleButton from "../interface/ToggleButton"

interface StepButtonProps {
    isActive: boolean;
    onActivate: () => void;
}

//TO DO: Attach what to do when clicked here
async function callPlayBackend() {

}

function StepButton({isActive, onActivate}: StepButtonProps) {
    const handleClick = () => {
        onActivate();
        callPlayBackend();
    };
    
    
    return (
        <ToggleButton 
            lable="Step" 
            isActive={isActive}
            onActivate={handleClick}
            />
    );
};

export default StepButton