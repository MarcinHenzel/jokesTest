import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { merge,  of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Joke } from 'src/app/models/Joke';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-table-joke',
  templateUrl: './table-joke.component.html',
  styleUrls: ['./table-joke.component.css'],
})
export class TableJokeComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'id', 'jokeContent', 'category'];
  data: Joke[] = [];
  imageToShow: any;
  pageSize!: number ;
  isInit: boolean = false;
  @Input() set changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    if(this.isInit) {this.getJokes()};
  };
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private jokesService: JokesService) {}
 
  ngAfterViewInit() {
    this.isInit = true;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.changePageSize = parseInt(window.localStorage.getItem('pageSize') || '5');
    this.getJokes();
  }
  getJokes(){
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.jokesService
          .getJokes(this.pageSize)
          .pipe(catchError(() => observableOf(null)));
      }),
      map((data) => {
        this.isLoadingResults = false;

        if (data === null) {
          return [];
        }

        this.resultsLength = data.amount;
        return data.jokes.map((joke) => {
          const randomizer = Math.ceil((Math.random() * 1000));
          return {...joke, imgSrc:`https://picsum.photos/id/${randomizer}/200/300`}
        });
       
      })
    )
    .subscribe((jokes) => {
      this.data = jokes
    });
  }
  
}
