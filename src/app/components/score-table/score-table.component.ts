import { Component, OnInit } from '@angular/core';
import { Scores, Board } from '../../models/Scores';
import data from '../../../assets/data/data.json'
import {returnData, editDataUI} from '../../../assets/utils/editScoreFunctions'

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.sass']
})

export class ScoreTableComponent implements OnInit {
  playersScores: any;
  editedScores: (number|string)[];
  scoresArrays: number[][];
  finalPoints: number[];
  UI;
  constructor() { 
    this.editedScores = [];
    this.scoresArrays = [];
    this.finalPoints = [];
  }
  
  ngOnInit(): void {
    this.playersScores = returnData(data, Scores);
    this.UI = editDataUI(this.playersScores, this.editedScores, Board);
    console.log(this.UI);
  }

  countPoints(){
    this.scoresArrays.map((element, index, array) =>
      {
        const firstThrow = element[0];
        const secondThrow = element[1];
        let roundSum = firstThrow + secondThrow;
        if (index < array.length)
        {
          if (roundSum === 10) {
          if (firstThrow === 10) {
            roundSum += array[index+1][0] + array[index+1][1];
            return this.finalPoints.push(roundSum);
          } else {
            roundSum += array[index+1][0];
            return this.finalPoints.push(roundSum);
          }}
          if (roundSum < 10) {
            return this.finalPoints.push(roundSum);
          }
        }
      }
    )
  }
  
}
