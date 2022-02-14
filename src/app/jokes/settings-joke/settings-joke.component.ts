import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-joke',
  templateUrl: './settings-joke.component.html',
  styleUrls: ['./settings-joke.component.css'],
})
export class SettingsJokeComponent implements OnInit {
  pages = [2, 5, 10];
  pickedPage = this.pages[1];
  @Output() pageChange = new EventEmitter();
  constructor() {
    this.pickedPage = parseInt(window.localStorage.getItem('pageSize') || '5');
  }

  ngOnInit(): void {
    this.pageChange.emit(this.pickedPage)
  ;
  }

  pageSizeChanged(value: any) {
    window.localStorage.setItem('pageSize', value);
    this.pageChange.emit(value);
  }
}
