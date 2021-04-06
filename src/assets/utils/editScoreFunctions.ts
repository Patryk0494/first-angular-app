export function returnData(data, scores) {
    let newScores = <typeof scores[]>data
    return newScores;
}

export function editData(playersScores, editedScores, Board) {
    let keys: string[] = Object.keys(playersScores);
    const boardsArray: typeof Board[] = [];
    keys.map((player: string) => {
        let playerBoard = new Board;
        const playerScoreList = playersScores[player];        
        playerBoard.player = player;
        playerBoard.scoresUI = getUIScoresArray(playerScoreList, editedScores)
        playerBoard.scores = getScoresArrays(playerScoreList);
        playerBoard.roundPoints = countPoints(playerBoard.scores);
        playerBoard.finalPoints = sumUpPoints(playerBoard.roundPoints)
        return boardsArray.push(playerBoard);
    })
    return boardsArray;
}

function getUIScoresArray(playerScoreList, editedScores) {
    editedScores = [];
    playerScoreList.map((element, index, array) => { 
        let firstThrow: number | string = array[index];
        let secondThrow: number | string = array[index + 1];
        let extraThrow: number | string = array[index + 2];
        if (index%2 === 0 && index < 20) {
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
                if (index === 18) {
                    editedScores.push([firstThrow, secondThrow, extraThrow])
                } else {
                    editedScores.push([firstThrow, secondThrow])
                }
            } 
        }  
    })
    return editedScores;
}

function getScoresArrays(playerScores){
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

function countPoints(scores){
    const roundPoints: number[] = [];
    scores.map((element, index, array) => {
        const firstThrow = element[0];
        const secondThrow = element[1];
        let roundSum = firstThrow + secondThrow;
        if (index < array.length-1) {
            if (roundSum === 10) {
                if (firstThrow === 10) {
                    roundSum += array[index+1][0] + array[index+1][1];
                    return roundPoints.push(roundSum);
                } else {
                    roundSum += array[index+1][0];
                    return roundPoints.push(roundSum);
                }
            }
            if (roundSum < 10) {
                return roundPoints.push(roundSum);
            }
        } 
        if (index === array.length - 1 ) {
            if ( roundSum === 10) {
                roundSum += array[index][2];
                return roundPoints.push(roundSum);
            } else {
                return roundPoints.push(roundSum);
            }
        }
    })
    return roundPoints;
}

function sumUpPoints(playerRoundPoints) {
    return playerRoundPoints.reduce((a, b) => {
        return a+b;
    })
}