import ToggleButton from "../interface/ToggleButton"

interface PlayButtonProps {
    isActive: boolean;
    onActivate: () => void;
}

function PlayButton({ isActive, onActivate }: PlayButtonProps) {
    return (
        <ToggleButton
            lable="Play"
            isActive={isActive}
            onActivate={onActivate}
        />
    );
};

export default PlayButton