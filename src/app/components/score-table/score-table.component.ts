import { Component, OnInit } from '@angular/core';
import { Scores } from '../../models/Scores';
import data from '../../../assets/data/data.json'

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.sass']
})

export class ScoreTableComponent implements OnInit {
  playersScores: Scores[];
  editedScores: (number|string)[][];
  constructor() { 
    this.playersScores = [];
    this.editedScores = []
  }

  
  ngOnInit(): void {
    this.returnData();
    this.editData();
    console.log(this.editedScores);
  }
  
  returnData() {
    let newScores = Object.assign(new Scores(), data)
    return newScores;
  }
  // UI
  editData() {
    (this.returnData()['Krzysztof Król']).map((elent, index, array) => 
    { 
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
            return this.editedScores.push([firstThrow, secondThrow, extraThrow])
          }
        }
        return this.editedScores.push([firstThrow, secondThrow])
      }
    })
  }  

}
