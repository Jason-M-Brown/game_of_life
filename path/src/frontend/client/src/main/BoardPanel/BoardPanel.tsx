interface BoardPanelProps {
    width: number;
    height: number;
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

function BoardPanel({ width, height }: BoardPanelProps) {
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

    const cellStyle: React.CSSProperties = {
        backgroundColor: "rgb(54, 28, 141)",
    };

    const totalCells = width * height;

    return (
        <main style={boardStyle}>
            <div style={gridStyle}>
                {Array.from({ length: totalCells }).map((_, index) => (
                    <div key={index} style={cellStyle} />
                ))}
            </div>
        </main>
    );
}

export default BoardPanel;