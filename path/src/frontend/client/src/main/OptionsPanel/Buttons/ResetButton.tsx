import MomentButton from "../interface/MomentButton";

interface ResetButtonProps {
    liveCells: Set<number>;
    onLiveCellsChange: (liveCells: Set<number>) => void;
    onBeforeReset?: () => void;
}

// Backend hookup placeholder — not implemented yet
async function callResetBackend(liveCells: Set<number>): Promise<Set<number>> {
    // TODO: notify backend of reset
    return liveCells;
}

function ResetButton({ liveCells, onLiveCellsChange, onBeforeReset }: ResetButtonProps) {
    const handleReset = () => {
        onBeforeReset?.();
        callResetBackend(liveCells);
        onLiveCellsChange(new Set());
    };

    return <MomentButton label="Reset" onTrigger={handleReset} />;
}

export default ResetButton;