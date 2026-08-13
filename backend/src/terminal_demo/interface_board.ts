export interface Cell {
    isActive: boolean;
    symbol: string;
};


export type GameState = {
    height: number
    width: number,
    board: Set<string>,

} 
