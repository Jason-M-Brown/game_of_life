import MomentButton from "../interface/MomentButton";
import { fetchNextGeneration } from "../../../api/board";

interface StepButtonProps {
    width: number;
    height: number;
    liveCells: Set<number>;
    onLiveCellsChange: (liveCells: Set<number>) => void;
    onBeforeStep?: () => void; // lets a parent interrupt (e.g. stop Play) before stepping
}

function StepButton({ liveCells, onLiveCellsChange, width, height, onBeforeStep }: StepButtonProps) {
    const handleStep = async () => {
        onBeforeStep?.();
        const nextGeneration = await fetchNextGeneration(liveCells, width, height);
        onLiveCellsChange(nextGeneration);
    };

    return <MomentButton label="Step" onTrigger={handleStep} />;
}

export default StepButton;