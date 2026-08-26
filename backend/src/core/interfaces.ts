export interface BoardState {
    activeCells: ReadonlySet<number>,
    columnSize: number,
    rowSize: number
}

export interface GridState {
    readonly columns: number;
    readonly rows: number;
    readonly maxSize: number;
    has(index: number): boolean;
}

export interface PlaceCell {
    index: number;
    alive: boolean
}