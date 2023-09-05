

export function genRandomDec( min: number, max: number ) 
{
    return min + ( max - min ) * Math.random();
}


export function genRandom( min: number, max: number ) 
{
    return min + (max - min + 1) * Math.random() | 0;
}
