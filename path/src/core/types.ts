

export type GameBoard = {
    height: number
    width: number,
    board: Set<string>,
} 

export type Coords = {
    x: number,
    y: number
}

export type TransitionStates = {
    born: Set<number>
    dead: Set<number>
}

export type PlacementCell = {
        index: number, 
        alive: boolean
}

export type toJSON = {
    rows: number,
    columns: number,
    aliveCells: number[];
}