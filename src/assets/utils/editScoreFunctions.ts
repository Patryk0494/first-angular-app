export function returnData(data: Object, scores) {
    let newScores = <typeof scores[]>data
    return newScores;
}

export function editData(playersScores: number[], editedScores:(number | string)[][], Board) {
    let keys: string[] = Object.keys(playersScores);
    const boardsArray: typeof Board[] = [];
    keys.map((player: string) => {
        let playerBoard = new Board;
        const playerScoreList = playersScores[player];        
        playerBoard.player = player;
        playerBoard.scoresUI = getUIScoresArray(playerScoreList, editedScores)
        playerBoard.scores = getScoresArrays(playerScoreList);
        playerBoard.framePoints = countPoints(playerBoard.scores);
        playerBoard.finalPoints = sumUpPoints(playerBoard.framePoints)
        return boardsArray.push(playerBoard);
    })
    return boardsArray;
}

function getUIScoresArray(userAddedScores: number[], editedScores: (number | string)[][]): (number|string)[][] {
    let addedScoresModified: (number | string)[] = userAddedScores;
    editedScores = [];
    let lastIndex = addedScoresModified.length

    for (let i: number = 0; i < 18; i++) {
        if (userAddedScores[i] === 10) {
            addedScoresModified.splice(i + 1, 0, '');
            i++;
        }
    }
    
    addedScoresModified.map((element: string | number, index: number, array: (string | number)[]): (string|number)[][] => {

        let firstThrow: number | string = array[index]
        let secondThrow: number | string = array[index + 1];
        let extraThrow: number | string = array[index + 2];

        if (index%2 === 0 && index < 18) {
            if ((+firstThrow + +secondThrow) !== 10) {
                editedScores.push([firstThrow, secondThrow])
            }
            if ((+firstThrow + +secondThrow) === 10 ) {
                if (firstThrow === 10 ) {
                    firstThrow = "X";
                    secondThrow = " "
                } else {
                    secondThrow = "/"
                }
                editedScores.push([firstThrow, secondThrow])
            } 
        }    
        if ( index === 18) {
            if (extraThrow) {
                editedScores.push([firstThrow, secondThrow, extraThrow])
            } else {
                editedScores.push([firstThrow, secondThrow])
            } 
        }
        return editedScores;
    })
    return editedScores;
}

function getScoresArrays(playerScores: number[] ): number[][] {
    const scoresArrays: number[][] = [];
    playerScores.map((elemt, index, array) => {
        if (index%2 === 0) {
            if (array.length === 21 && index === 18) {
                return scoresArrays.push([array[index], array[index+1], array[index+2]])
            }
            if (index < 19) {
                return scoresArrays.push([array[index], array[index+1]])
            }        
        }
    })
    return scoresArrays;
}

function countPoints(scores:(number |string)[][]): number[]{
    const framePoints: number[] = [];

    scores.map((element: (number|string)[], index: number, array: (number|string)[][]): number[] => {
        const firstThrow = element[0];
        const secondThrow = element[1];
        let frameSum = +firstThrow + +secondThrow;

        if (index < array.length - 1) {
            if (frameSum === 10) {
                if (firstThrow === 10) {
                    if (array[index+1][1] === '') {
                        frameSum += +array[index+1][0] + +array[index+2][0];
                    } else {
                        frameSum += +array[index+1][0] + +array[index+1][1];
                    }
                    framePoints.push(frameSum);
                } else {
                    frameSum += +array[index+1][0];
                    framePoints.push(frameSum);
                }
            }
            if (frameSum < 10) {
                framePoints.push(frameSum);
            }
        } 
        if (index === array.length - 1) {
            if ( element.length>2) {
                frameSum += +array[index][2];
                framePoints.push(frameSum);
            } else {
                framePoints.push(frameSum);
            }
        }
        return framePoints;
    })
    return framePoints;
}

function sumUpPoints(playerFramePoints): number {
    return playerFramePoints.reduce((a: number, b: number) => {
        return a+b;
    })
}