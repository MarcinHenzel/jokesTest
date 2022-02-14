import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings-joke',
  templateUrl: './settings-joke.component.html',
  styleUrls: ['./settings-joke.component.css'],
})
export class SettingsJokeComponent implements OnInit {
  pages = [2, 5, 10];
  pickedPage = new FormControl(5);
  @Output() pageChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
  }
  pageSizeChanged(value: any) {
    this.pageChange.emit(value);

  }
}
