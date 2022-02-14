import { Component, OnInit } from '@angular/core';
import { JokesService } from './jokes.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent implements OnInit {
  pageSize: number = 5;
  constructor(private jokesService: JokesService) {}

  ngOnInit(): void {
    this.jokesService.getJokes().subscribe((first) => {
      console.log(first);
    });
  }
  pageChanged(value: any) {
    console.log(value);
    this.pageSize = value;
  }
}
