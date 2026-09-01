import ToggleButton from "../interface/ToggleButton"

interface PlayButtonProps {
    isActive: boolean;
    onActivate: () => void;
}

//TO DO: Attach what to do when clicked here
async function callPlayBackend() {

}

function PlayButton({isActive, onActivate}: PlayButtonProps) {
    const handleClick = () => {
        onActivate();
        callPlayBackend();
    };
    
    
    return (
        <ToggleButton 
            lable="Play" 
            isActive={isActive}
            onActivate={handleClick}
            />
    );
};

export default PlayButton
