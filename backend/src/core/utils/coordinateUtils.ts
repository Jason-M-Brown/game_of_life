export function stringToCoord(str: string) :  {x: number, y:number} {
    const parts = str.split(",");

    isCorrectInput(parts);

    const x = Number(parts[0]);
    const y = Number(parts[1]);

    isNumber(x, y);

    return {x, y};

    
}

export function coordToString(x: number, y: number) : string {
    return `${x},${y}`;
}


/*
    Helpers
*/
function isCorrectInput(parts: any) {
    if(parts.length !== 2) {
        throw new Error(`Could not parse coordinates expected "x,y", got "${parts}"`)
    }
}

function isNumber(x: any, y:any) {
    if(Number.isNaN(x) || Number.isNaN(y)) {
        throw new Error(`Could not parase coordinate: "${x},${y}" is not numeric`)
    }
}
