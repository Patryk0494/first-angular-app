export class Scores {
    playerName: number[];
} 

export class Board {
    player: string;
    scoresUI: (number | string)[][];
    scores: number[][];
    roundPoints: number[]
    finalPoints: number;
}
