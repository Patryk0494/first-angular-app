export function returnData(data, scores) {
    let newScores = <typeof scores[]>data
    return newScores;
  }

  
export function editDataUI(playersScores, editedScores, Board) {
    let keys: string[] = Object.keys(playersScores);
    const boardsArray: typeof Board[] = [];
    keys.map((player: string) => {
        let playerBoard = new Board;
        const playerScoreList = playersScores[player]
        
        playerBoard.player = player;
        playerBoard.scoresUI = getUIScoresArray(playerScoreList, editedScores)
        playerBoard.scores = getScoresArrays(playerScoreList);
        return boardsArray.push(playerBoard);
    })
    return boardsArray;
}

function getUIScoresArray(playerScoreList, editedScores) {
    playerScoreList.map((element, index, array) => { 
        let firstThrow: number | string = array[index];
        let secondThrow: number | string = array[index + 1];
        let extraThrow: number | string = array[index + 2];
        if (index%2==0 && index < 20) {
            if ((+firstThrow + +secondThrow) == 10 ) {
                if (firstThrow == 10) {
                    firstThrow = "X";
                    secondThrow = " "
                } 
                if (secondThrow == 10) {
                    secondThrow = "/"
                } else {
                    secondThrow = "/"
                }
                if (index===18) {
                    editedScores.push([firstThrow, secondThrow, extraThrow])
                }
                editedScores.push([firstThrow, secondThrow])
            } else {
                editedScores.push([firstThrow, secondThrow])
            }
        return editedScores;
        }  
    })

}

  
function getScoresArrays(playerScores){
    const scoresArrays: number[][] = [];
    playerScores.map((elemt, index, array) =>
    {
      if (index%2==0 && index < 20) {
      return scoresArrays.push([array[index], array[index+1]])
      }
      if (index===18) {
        return scoresArrays.push([array[index], array[index+1], array[index+2]])
      }
    })
    return scoresArrays;
  }