import { Component, OnInit } from '@angular/core';
import { Scores, Board } from '../../models/Scores';
import data from '../../../assets/data/data.json'
import {returnData, editData} from '../../../assets/utils/editScoreFunctions'

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.sass']
})

export class ScoreTableComponent implements OnInit {
  playersScores: number[];
  editedScores: (number|string)[];
  UI: Board[];

  constructor() { 
  }
  
  ngOnInit(): void {
    this.playersScores = returnData(data, Scores);
    this.UI = editData(this.playersScores, this.editedScores, Board);
    console.log(this.UI);
  }
  
  

}
