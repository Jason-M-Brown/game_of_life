import MomentButton from "../interface/MomentButton";

interface StepButtonProps {
    width: number;
    height: number;
    liveCells: Set<number>;
    onLiveCellsChange: (liveCells: Set<number>) => void;
}

const API_BASE_URL = "http://localhost:3000/api/board";

// Call to backend
async function callStepBackend(liveCells: Set<number>, width: number, height: number): Promise<Set<number>> {
    const response = await fetch(`${API_BASE_URL}/next`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liveCells: [...liveCells], width, height }),
    });

    if (!response.ok) {
        throw new Error(`Step request failed: ${response.status}`);
    }

    const data = await response.json();
    return new Set(data.liveCells);
}

//
function StepButton({ liveCells, onLiveCellsChange, width, height}: StepButtonProps) {
    const handleStep = async () => {
        const nextGeneration = await callStepBackend(liveCells, width, height);
        onLiveCellsChange(nextGeneration);
    };

    return <MomentButton label="Step" onTrigger={handleStep} />;
}

export default StepButton;