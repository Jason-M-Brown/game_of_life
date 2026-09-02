interface BoardPanelProps {
    width: number;
    height: number;
    liveCells: Set<number>;
    onLiveCellsChange: (liveCells: Set<number>) => void;
}

const boardStyle: React.CSSProperties = {
    backgroundColor: "rgb(20, 20, 20)",
    position: "absolute",
    right: "3%",
    top: "3%",
    width: "65%",
    height: "90%",
    boxSizing: "border-box",
};

const CELL_ALIVE_COLOR = "rgb(151, 39, 39)";
const CELL_DEAD_COLOR = "rgb(111, 28, 141)";

const cellStyle = (isAlive: boolean): React.CSSProperties => ({
        backgroundColor: isAlive ? CELL_ALIVE_COLOR : CELL_DEAD_COLOR,
        cursor: "pointer",
});

function BoardPanel({ width, height, liveCells, onLiveCellsChange }: BoardPanelProps) {
    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        width: "100%",
        height: "100%",
        gap: "1px",
        backgroundColor: "black",
        boxSizing: "border-box",
    };

    const toggleCell = (index: number) => {
        const next = new Set(liveCells);
        if (next.has(index)) {
            next.delete(index);
        } else {
            next.add(index);
        }
        onLiveCellsChange(next);
    };

    const totalCells = width * height;

    return (
    <main style={boardStyle}>
        <div style={gridStyle}>
            {Array.from({ length: totalCells }).map((_, index) => (
                <div
                    key={index}
                    onClick={() => toggleCell(index)}
                    style={cellStyle(liveCells.has(index))}
                />
            ))}
        </div>
    </main>
    );
}

export default BoardPanel;