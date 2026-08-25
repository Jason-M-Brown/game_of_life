export interface BoardState {
    activeCells: ReadonlySet<number>,
    columnSize: number,
    rowSize: number
}