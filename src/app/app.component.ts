import { Component } from '@angular/core';
import data from '../assets/data/data.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'app Component'
  text = 'angular app';
  inputText(e: any) {
    return this.text = e.target.value
  }
}
