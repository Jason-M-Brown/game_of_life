import MomentButton from "../interface/MomentButton";

interface StepButtonProps {
    liveCells: Set<number>;
}

// Backend hookup placeholder — not implemented yet
async function callStepBackend(liveCells: Set<number>) {
    // TODO: POST liveCells to backend to advance one generation
}

function StepButton({ liveCells }: StepButtonProps) {
    return (
        <MomentButton label="Step" onTrigger={() => callStepBackend(liveCells)} />
    );
}

export default StepButton;