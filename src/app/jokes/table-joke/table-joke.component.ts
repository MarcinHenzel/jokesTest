import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Joke } from 'src/app/models/Joke';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-table-joke',
  templateUrl: './table-joke.component.html',
  styleUrls: ['./table-joke.component.css'],
})
export class TableJokeComponent implements AfterViewInit {
  // displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  displayedColumns: string[] = ['image', 'id', 'jokeContent', 'category'];
  data: Joke[] = [];
  pageSize: number = 5;
  @Input() set changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.getJokes(this.pageSize)
  };
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private jokesService: JokesService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.getJokes(this.pageSize);
   
  }
  getJokes(pageSize: number){
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.jokesService
          .getJokes(pageSize)
          .pipe(catchError(() => observableOf(null)));
      }),
      map((data) => {
        this.isLoadingResults = false;

        if (data === null) {
          return [];
        }

        this.resultsLength = data.amount;
        data.jokes.map((joke) => {

          return {...joke, imgSrc:'https://picsum.photos/200/300'}
        });
        return data.jokes;
      })
    )
    .subscribe((jokes) => {
      console.log(jokes);
      this.data = jokes
    });
  }
}
