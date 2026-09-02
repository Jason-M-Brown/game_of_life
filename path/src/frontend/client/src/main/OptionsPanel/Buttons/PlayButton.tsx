import ToggleButton from "../interface/ToggleButton"

interface PlayButtonProps {
    isActive: boolean;
    onActivate: () => void;
    liveCells: Set<number>
}

//TO DO: Attach what to do when clicked here
async function callPlayBackend(liveCells: Set<number>) {

}

function PlayButton({isActive, onActivate, liveCells}: PlayButtonProps) {
    const handleClick = () => {
        onActivate();
        callPlayBackend(liveCells);
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
