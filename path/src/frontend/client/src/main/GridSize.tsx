interface GridSizeProps {
    width: number;
    height: number;
    onWidthChange: (width: number) => void;
    onHeightChange: (height: number) => void;
}

const MIN_SIZE = 1;

const rowStyle: React.CSSProperties = {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    margin: "5px 5px",
};

const inputStyle: React.CSSProperties = {
    width: "60px",
    boxSizing: "border-box",
};

function clampToMin(value: number): number {
    if (Number.isNaN(value)) return MIN_SIZE;
    return Math.max(MIN_SIZE, value);
}

function GridSize({
    width,
    onWidthChange,
    onHeightChange }: GridSizeProps) {

    const handleSizeChange = (value: number) => {
        const size = clampToMin(value);
        onWidthChange(size);
        onHeightChange(size);
    };

    return (
        <label style={rowStyle}>
            Set Size
            <input
                type="number"
                min={MIN_SIZE}
                value={width}
                style={inputStyle}
                onChange={(e) => handleSizeChange(Number(e.target.value))}
            />
        </label>
    );
};

export default GridSize
