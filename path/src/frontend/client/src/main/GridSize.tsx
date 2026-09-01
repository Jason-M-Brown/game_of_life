
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
    height,
    onWidthChange,
    onHeightChange }: GridSizeProps) {

    return (
        <>
            <label style={rowStyle}>
                Set Width
                <input
                    type="number"
                    min={MIN_SIZE}
                    value={width}
                    style={inputStyle}
                    onChange={(e) => onWidthChange(clampToMin(Number(e.target.value)))}
                />
            </label>
            <label style={rowStyle}>
                Set Height
                <input
                    type="number"
                    min={MIN_SIZE}
                    value={height}
                    style={inputStyle}
                    onChange={(e) => onHeightChange(clampToMin(Number(e.target.value)))}
                />
            </label>
        </>
    );
};

export default GridSize