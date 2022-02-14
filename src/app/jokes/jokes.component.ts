import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent implements OnInit {
  pageSize: number = 0;
  constructor() {}
  ngOnInit(): void {
    
  }
  pageChanged(value: number) {
    this.pageSize = value;
  }
}
