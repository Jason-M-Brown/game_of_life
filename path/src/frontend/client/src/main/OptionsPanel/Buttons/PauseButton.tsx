import ToggleButton from "../interface/ToggleButton"

interface PauseButtonProps {
    isActive: boolean;
    onActivate: () => void;
}

function PauseButton({ isActive, onActivate }: PauseButtonProps) {
    return (
        <ToggleButton
            lable="Pause"
            isActive={isActive}
            onActivate={onActivate}
        />
    );
};

export default PauseButton