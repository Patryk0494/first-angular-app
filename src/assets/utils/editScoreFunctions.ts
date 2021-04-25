export function returnData(data, scores) {
    let newScores = <typeof scores[]>data
    return newScores;
}

export function editData(playersScores: number[], editedScores:(number|string)[], Board) {
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

function getUIScoresArray(userAddedScores, editedScores) {
    let addedScoresModified: (number | string)[] = userAddedScores;
    editedScores = [];
    let lastIndex = userAddedScores.length
    console.log(addedScoresModified);

    userAddedScores.map((element: number, index: number, array: number[]) => { 
        if (element === 10) {
            if ( array[lastIndex - 1] === 10 && array[lastIndex - 2] === 10) {
                if (array[index - 1] !== 0 && index < lastIndex - 2 && index !== 0) {
                    addedScoresModified.splice(index, 0, ' ')
                    lastIndex++;
                }
                if (index === 0) {
                    addedScoresModified.splice(index, 0, ' ')
                    lastIndex++;
                }
            }
            else if (array[index - 1] !== 0 || index === 0) {
                addedScoresModified.splice(index, 0, '')
                lastIndex++;
            }
        }                
        console.log(addedScoresModified)

        // if (array[index] + array[index+1] <= 10) {
        //     editedScores.push(array[index], array[index + 1])
        // }
    });

    // const userAddedScoresOnlyNumber = userAddedScores.map(element => {
    //     if (element === "") {
    //         element = 0
    //     }
    //     return element
    // })
    
    userAddedScores.map((element, index, array) => {

        let firstThrow: number | string = array[index]
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
    const framePoints: number[] = [];

    const scoresNumber = scores.map(element => {
        if (element ==="") {
            element = 0;
        } 
        return element;
    });

    scoresNumber.map((element, index, array) => {
        const firstThrow = element[0];
        const secondThrow = element[1];
        let frameSum = firstThrow + secondThrow;
        if (index < array.length-1) {
            if (frameSum === 10) {
                if (firstThrow === 10) {
                    frameSum += array[index+1][0] + array[index+1][1];
                    return framePoints.push(frameSum);
                } else {
                    frameSum += array[index+1][0];
                    return framePoints.push(frameSum);
                }
            }
            if (frameSum < 10) {
                return framePoints.push(frameSum);
            }
        } 
        if (index === array.length - 1) {
            if ( frameSum === 10) {
                frameSum += array[index][2];
                return framePoints.push(frameSum);
            } else {
                return framePoints.push(frameSum);
            }
        }
    })
    return framePoints;
}

function sumUpPoints(playerFramePoints) {
    return playerFramePoints.reduce((a, b) => {
        return a+b;
    })
}