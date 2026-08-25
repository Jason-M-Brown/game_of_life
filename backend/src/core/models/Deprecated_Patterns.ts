import {Grid} from "./Deprecated_Grid.js"
import {stringToCoord} from "../utils/Deprecated_coordinateUtils.js"

export class Pattern extends Grid {

    private static readonly VALUE_NOT_ODD_POSITIVE = "Value provide is not an odd positive number"

    constructor(height: number, columns: number) {
        Pattern.checkInputs(height, columns);
        super(height, columns);
    }

    clone() : Pattern {
        const clone = new Pattern(this.rows, this.columns);
        this.copyStates(clone);
        return clone;
    }
    
    // REQUIRES: pattern contains valid cell coordinates
    // EFFECT: sets each cell represented by pattern to alive
    setPattern(pattern : Set<string>) : Pattern{
        for(const coord of pattern) {
            const {x, y} : {x: number, y:number} = stringToCoord(coord);
            this.setCell(y, x, true);
        }
        return this
    }


    private static checkInputs(height: number, columns: number) : void {
        Pattern.isOddPossitiveValue(height);
        Pattern.isOddPossitiveValue(columns);
    }

    private static isOddPossitiveValue(value: number) :void {
        if(value < 1 || value % 2 !== 0) {
            throw new Error(this.VALUE_NOT_ODD_POSITIVE);
        }
    }
}